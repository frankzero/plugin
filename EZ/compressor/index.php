<?php 
// su - frank; php /home/frank/www/plugin/EZ/compressor/index.php
error_reporting(E_ALL);

define('ROOT',realpath(__DIR__.'/../').'/');

$code = file_get_contents(ROOT.'EZ.js');
file_put_contents(ROOT.'EZ.min.js',minify_js($code));

$code = file_get_contents(ROOT.'EZ.2.js');
file_put_contents(ROOT.'EZ.2.min.js',minify_js($code));

$fs = glob(ROOT.'src/*' );
for($i=0,$imax=count($fs); $i<$imax; $i++){
    $f = $fs[$i];
    if(strpos($f,'.kill') !== false) continue;
    $tmp = file_get_contents($f);;
    $code.="\n".$tmp;
    //file_put_contents( str_replace('/src/','/src.min/',$f), minify_js($tmp) );
}

file_put_contents(ROOT.'EZ.2.all.js',$code);
file_put_contents(ROOT.'EZ.2.all.min.js',minify_js($code));

/*
    壓縮 javascript
*/
function minify_js($code){
    $postdata = array();
    $postdata[]=array('js_code',$code);
    $postdata[]=array('compilation_level','SIMPLE_OPTIMIZATIONS');
    $postdata[]=array('output_format','json');
    $postdata[]=array('output_info','compiled_code');
    $postdata[]=array('output_info','errors');
    $postdata[]=array('output_info','warnings');
    $postdata[]=array('output_info','statistics');
    $postdata[]=array('output_file_name','default.js');
    $code = post('closure-compiler.appspot.com','http://closure-compiler.appspot.com/compile',$postdata);
    //echo $content;
    $output = json_decode($code,true);
    $code = $output['compiledCode'];
    return $code;
}

/*
    壓縮 css
*/
function minify_css($buffer){
    // Remove comments
    $buffer = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $buffer);
     
    // Remove space after colons
    $buffer = str_replace(': ', ':', $buffer);
     
    // Remove whitespace
    $buffer = str_replace(array("\r\n", "\r", "\n", "\t", '  ', '    ', '    '), '', $buffer);
     
    // Enable GZip encoding.
    ob_start("ob_gzhandler");
     
    // Enable caching
    header('Cache-Control: public');
     
    // Expire in one day
    header('Expires: ' . gmdate('D, d M Y H:i:s', time() + 86400) . ' GMT');
     
    // Set the correct MIME type, because Apache won't set it for us
    header("Content-type: text/css");
     
    // Write everything out
    echo($buffer);
    $content = ob_get_contents();
    ob_end_clean();
    
    return $content;
}

function post($url,$urlPath,$post_data,$type=0)
{
    $response='';
    $post_string = '';
    if($type==0){
        $o="";
        //foreach ($post_data as $k=>$v)
        for($i=0,$imax=count($post_data);$i<$imax;$i++)
        {
            $p=$post_data[$i];
            $o.= "$p[0]=".urlencode($p[1])."&";
            //$o.= "$k=".$v."&";
        }
        $post_string=substr($o,0,-1);
    }else{
        $post_string = $post_data;
    }
    
    $fp = fsockopen($url, 80, $errno, $errstr,3);
    if (!$fp)
    {
        return "fsockopen Error";
    }
    else
    {
        $da ="POST $urlPath  HTTP/1.1\r\n";
        $da.="Host: $url \r\n";
        $da.="User-Agent: PHP Script\r\n";
        $da.="Content-Type: application/x-www-form-urlencoded\r\n";
        $da.="Content-Length: ".strlen($post_string)."\r\n";
        $da.="Connection: close\r\n\r\n";
        $da.=$post_string;
        
        fwrite($fp, $da);
        while (!feof($fp))
        {
            $response.=fgets($fp, 128);
        }
        $response = explode("Connection: close",$response);
        return trim($response[1]);
    }
}
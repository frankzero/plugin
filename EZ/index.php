<?php 
    ob_start();
    $fs = glob('example/*', GLOB_ONLYDIR);
    
?>
<!DOCTYPE>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<link rel='stylesheet' type='text/css' href='css/EZ.css' />
<script type="text/javascript" src="EZ.js"></script>
<title>index</title>
<style type="text/css"> 
<!--
-->
</style>
<script>
function on_load(){
	var now = EZ.Date().show('Y-mm-dd H:ii:ss');
	console.log(now);
	//now = EZ.Date(now).day(-1).hour(5).month(-11).second(-20).show('Y-mm-dd H:ii:ss');
	var watch = new EZ.StopWatch();
	watch.play();
	now = EZ.Date(now).day(-1).hour(5).month(-20).minute(-30).second(-20).show('Y-mm-dd HH:ii:ss');
	console.log(now);
	watch.stop(true);
}

function test(jsdata){


}
// //http://www.cb113.net/pub/gateway.php?cmd={"cmd":100,"parame":{"gtype":"BS","rtype":"R"},"tt":"36991348812747328"}

</script>

</head>
<body onload="on_load()">
    <ul>
    <?php for($i=0,$imax=count($fs);$i<$imax;$i++):?>
        <li><a href="<?php echo $fs[$i];?>/"><?php echo str_replace('example/','',$fs[$i]);?></a></li>
    <?php endfor;?>
    </ul>

</body>
</html>
<?php 
    $content = ob_get_contents();
    ob_end_flush();
    ob_end_clean();
    file_put_contents('./index.html',$content);
    echo $content;
?>
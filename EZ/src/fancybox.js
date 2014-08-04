EZ.fancybox = (new function(){
    var self=this
    ,overlay
    ,box
    ,box_wrapper
    ,id_msg = EZ.id()
    ,id_close = EZ.id()
    ,ccc=0
    ,make_overlay = function(){
        if(typeof overlay=='undefined'){
            overlay = document.createElement('div');
            overlay.style.backgroundColor='rgb(119,119,119)';
            overlay.style.opacity='0.7';
            overlay.style.width='100%';
            overlay.style.height='100%';
            overlay.style.zIndex='1100';
            overlay.style.display='none';
            overlay.style.position='fixed';
            overlay.style.left='0';
            overlay.style.top='0';
            document.body.appendChild(overlay);
            overlay.onclick=Self.hide;
        }
    }
    ,click = function(e){
        e = e || window.event;
        var dom = e.target || e.srcElement;
        var clickfor=  dom.getAttribute('clickfor');
        switch(clickfor){
            case 'close':
                Self.hide();
                break;
            default:
                break;
        }
    }
    ,make_box = function(){
        if(typeof box=='undefined'){
            box_wrapper = document.createElement('div');
            box_wrapper.style.textAlign='center';
            box_wrapper.style.width='100%';
            box_wrapper.style.position='fixed';
            box_wrapper.style.left='0';
            box_wrapper.style.zIndex='1103';
            box_wrapper.style.display='none';
            
            box = document.createElement('div');
            box.style.borderWidth='10px';
            box.style.height='auto';
            box.style.display='inline-block';
            box.style.position='relative';
            //box.style.zIndex='1103';
            
            box.style.backgroundColor='#fff';
            box.style.padding='10px';
            box.style.margin='0 auto';
            //box_wrapper.style.top='50%';
            box.style.borderRadius='6px';
            //box.innerHTML = '<div ><input id="'+id_msg+'" type="text" style="background-color:#fff;border:0;width:400px;"></div>';
            box_wrapper.appendChild(box);
            document.body.appendChild(box_wrapper);
            box_wrapper.addEventListener('click',click);
            box_wrapper.setAttribute('clickfor','close');
            //document.getElementById(id_close).onclick=Self.hide;
        }
    }
    ,adjust = function(){
        var h = EZ.System.height();
        var h2 = box.clientHeight;
        if(h2 > h){
            box_wrapper.style.top='10px';
        }else{
            box_wrapper.style.top=((h/2)-(h2/2))+'px';
        }
        
        if(ccc<300){
            ccc++;
            setTimeout(adjust,0)
        }else{
            ccc=0;
        }
    }
    ,Self={
        show : function(msg,callback){
            make_overlay();
            make_box();
            //overlay.style.height=h+'px';
            overlay.style.display='block';
            box_wrapper.style.display='block';
            msg+='<a clickfor="close" class="fancybox-close"></a>';
            box.innerHTML = msg;
            setTimeout(adjust,0);
            if(typeof callback=='function') callback(Self,box_wrapper);
            //setTimeout(adjust,3000);
            return box;
        }
        ,hide:function(){
            overlay.style.display='none';
            box_wrapper.style.display='none';
        }
    }
    return Self;
}());
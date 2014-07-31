<?php
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>index</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="http://img.sog88.net/share/plugin/EZ/css/EZ.css" />
<script type="text/javascript" src="http://img.sog88.net/share/plugin/pub_library.js"></script>
<script type="text/javascript" src="DD.js"></script>
<!--link rel='stylesheet' type='text/css' href='css/index.css' /-->

<style type="text/css"> 
<!-- 

--> 
</style>
<script>
var mouseCoords = function(e){
	if(e.pageX || e.pageY){
		return {x:e.pageX, y:e.pageY};
	}
	return {
		x:e.clientX + document.body.scrollLeft - document.body.clientLeft,
		y:e.clientY + document.body.scrollTop  - document.body.clientTop
	};
}
var Event1;
var Event2;
function on_load()
{
	EZ.createLog();
	document.onmousemove = function(e){
		e = e || window.event;
		var p = mouseCoords(e);
		log1(e.x+' '+e.y);
	}
	 Event1= document.getElementById('Event1');
	 Event2= document.getElementById('Event2');
	DD('window2').draggable({
		onStartDrag:function(e){event1('onStartDrag')}
		,onDragging:function(e){
			var pos = mouseCoords(e);
			event1(pos.y+" "+pos.y);
		}
		,onStopDrag:function(e){
			event1('onStopDrag');
		}
		,DragZone:'container'
		,proxy:'clone'
		,handle:'title2'
	});
	
	DD('window').draggable({
		onStartDrag:function(e){event1('onStartDrag')}
		,onDragging:function(e){
			var pos = mouseCoords(e);
			event1(pos.y+" "+pos.y);
		}
		,onStopDrag:function(e){
			event1('onStopDrag');
		}
		,handle:'title'
	});
	
	DD('ball1').draggable({
		onStartDrag:function(e){event1('onStartDrag')}
		,onDragging:function(e){
			var pos = mouseCoords(e);
			event1(pos.y+" "+pos.y);
		}
		,onStopDrag:function(e){
			event1('onStopDrag');
		}
		,revert:true
		,proxy:'clone'
	});
	DD('window').droppable({
		onDragEnter:function(e){
			event2('onDragEnter');
		}
		,onDragLeave:function(e){
			event2('onDragLeave');
		}
		,onDrop:function(e){
			event2('onDrop');
		}
		,accept:'#ball1'
	})
	var alls = document.getElementsByTagName('*');
	
	//DD('')
}
var log1 = function(text){
	document.getElementById('log1').innerHTML = text;
}
var log2 = function(text){
	document.getElementById('log2').innerHTML = text;
}
var print_r=function(ArrayData,type){
		var _t='';
		for(var key in ArrayData)
		{
			if(typeof type=='undefined'){
				_t+=key+ ' = ' +ArrayData[key]+"\n";
			}else{
				_t+=key+ ' = ' +ArrayData[key]+"<br />";
			}
		}
		if(typeof type=='undefined'){alert(_t);}
		else
		{
			var aa = window.open();
			aa.document.write(_t);
		}
	};
var event1 = function(text){
	Event1.innerHTML = text;
}
var event2 = function(text){
	Event2.innerHTML = text;
}
function test(){
	var w = document.getElementById('window');
	alert(w.fn);
}
	//alert(on_load);
</script>

</head>
<body onload="on_load()">
<input type="button" value="test" onclick="test();">
<div id="ball1" style="background-color:#ceccee;width:50px;height:50px;position:absolute;left:600px;top:300px;">ball1</div>


<div style="float:left;color:#fff;width:100px;height:100px;background-color:#000;border:1px solid #fff;"><div style="text-align:center;">source Event</div><div id="Event1"></div></div>
<div style="float:left;color:#fff;width:100px;height:100px;background-color:#000;border:1px solid #fff;"><div style="text-align:center;">target Event</div><div id="Event2"></div></div>
<div style="float:left;color:#fff;width:100px;height:100px;background-color:#000;border:1px solid #fff;"><div style="text-align:center;">log1</div><div id="log1"></div></div>
<div style="float:left;color:#fff;width:100px;height:100px;background-color:#000;border:1px solid #fff;"><div style="text-align:center;">log2</div><div id="log2"></div></div>
<div style="clear:both;height:30px;"></div>
	<!--the mouse over and dragging class are defined on each item-->
	<div id="window" style="border:1px solid #000;width:400px;height:400px;">
		<div id="title" style="background-color:#332211;color:#fff;">title</div>
		content
	</div>
	
	
	<div id="container" style="width:500px;height:500px;position:absolute;left:800px;top:500px;background-color:green;">
		<div id="window2" style="border:1px solid #000;width:100px;height:100px;">
			<div id="title2" style="width:50px;height:50px;display:inline-block;background-color:red;position:absolute;top:10px;left:10px;">
				title2
			</div>
		</div>
	</div>
	
	
</body>
</html>
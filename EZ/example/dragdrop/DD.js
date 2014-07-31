//拖曳物件
var DD = new function(){
		var 
		_index = 0
		,_sid
		,debug=false
		,debugDiv
		,nowSource=null // 目前拖曳的Source物件
		,ssids = [] //drag sids
		,Sources = {} //drag object
		,tsids = [] // drop sids
		,Targets = {} //drop object
		,isDragging = false //是否正在拖曳中
		,tmpOnMouseMove
		,tmpOnMouseUp
		,tmpPosition
		,tmpLeft
		,tmpTop
		,init = function(){
			//document.onmousemove = onMouseMove;
			//document.onmouseup = onMouseUp;
			_sid = getSid(5);
		}
		,emptyFN = function(){
		
		}
		,trueFN = function(){
			return true;
		}
		,falseFN = function(){
			return false;
		}
		,onMouseMove = function(e){
			//try{
			e = e || window.event;
			if(isDragging==true){
				for(var i=0,ilen=tsids.length;i<ilen;i++){
					Targets[tsids[i]].moveEvent(e);
				}
			}
			if(nowSource){
				nowSource.moveEvent(e);
			}
			//}catch(e){EZ.log(e.toString());}
		}
		,onMouseUp = function(e){
			document.onmousemove = tmpOnMouseMove
			document.onmouseup = tmpOnMouseUp;
			e = e || window.event;
			if(isDragging==true){
				for(var i=0,ilen=tsids.length;i<ilen;i++){
					Targets[tsids[i]].dropEvent(e);
				}
			}
			if(nowSource){
				nowSource.dropEvent(e);
			}
		}
		,sid = function(){
			_index++;
			return _sid + _index;
		}
		,is_array = function(input){
			return typeof(input)=='object'&&(input instanceof Array);
		}
		,getSid = function(num){
			var t = [
				'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
				,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
				,'0','1','2','3','4','5','6','7','8','9'
			];
			var f=[];
			for(var i=0;i<num;i++)
			{
				if(i==0){
					f[i] = Math.floor((Math.random()*52));
				}else{
					f[i] = Math.floor((Math.random()*62));
				}
			}
			var r = [];
			for(var i=0;i<f.length;i++)
			{
				r[r.length] = t[f[i]];
			}
			return r.join('');
		}
		//給dom設定 ddid
		,setDdid = function(dom){
			var ddid = dom.getAttribute('ddid');
			if(ddid){
				return ddid;
			}else{
				ddid = dom.getAttribute('id') ? dom.getAttribute('id'):sid();
				dom.setAttribute('ddid',ddid);
				return ddid;
			}
		}
		//滑鼠座標
		,mouseCoords = function(e){
			if(e.pageX || e.pageY){
				return {x:e.pageX, y:e.pageY};
			}
			return {
				x:e.clientX + document.body.scrollLeft - document.body.clientLeft,
				y:e.clientY + document.body.scrollTop  - document.body.clientTop
			};
		}
		//取得相對座標 (相對於parent)
		,getOffset = function(elmt){
			return {x:elmt.offsetLeft,y:elmt.offsetTop};
		}
		//取得絕對座標
		,getPos = function(elmt){
			var x = 0;
			var y = 0;
			//繞行 offsetParents
			for (var e = elmt ; e ; e = e.offsetParent) { 
				//把 offsetLeft 值加總
				x += e.offsetLeft; 
				//把 offsetTop 值加總
				y += e.offsetTop; 
			}
			//繞行至 document.body
			for (e = elmt.parentNode; e && e != document.body; e = e.parentNode){
				//減去捲軸值
				if (e.scrollLeft) x -= e.scrollLeft; 
				//減去捲軸值
				if (e.scrollTop) y -= e.scrollTop; 
			}
			return {x:x,y:y};
		}
		,dragSource = function(){
			var myObject = this
			,source
			,dragCount=0
			,draggable = false
			//拖曳物 
			,moveObj
			//拖曳物起點 絕對座標
			,movePos = {x:0,y:0}
			// 相對座標
			,moveOffset = {x:0,y:0}
			//滑鼠起點
			,mouseStart = {x:0,y:0}
			//x,y偏移
			,offset = {x:0,y:0}
			,onStartDrag
			,onStopDrag
			,onDragging
			//代理者
			,proxy_id
			,proxy
			//已經clone過
			,cloneProxy
			,useProxy = false
			//拖曳範圍
			,DragZone = {north:0,west:0,east:0,south:0}
			,useDragZone = false
			//drop 是否復原
			,revert = false
			,isDrop = false //當他為true 不做revert 表示在可drop物件上
			,draggable = false
			//把手
			,handle = null
			,options
			,isInit = false
			,onMouseDown = function(e){
				init();
				if(draggable==false) return;
				isDrop = false;
				isDragging = true;
				e = e || window.event;
				if(useProxy){
					moveObj = proxy;
					moveObj.style.display = "inline-block";
				}else{
					moveObj = source;
				}
				//position keep
				tmpPosition = source.style.position;
				tmpLeft = source.offsetLeft;
				tmpTop = source.offsetTop;
				mouseStart = mouseCoords(e);
				moveOffset = getOffset(source);
				movePos = getPos(source);
				moveObj.style.position = 'absolute';
				moveObj.style.left = tmpLeft+'px';
				moveObj.style.top = tmpTop+'px';
				//nowSource 在 DD層
				nowSource = myObject;
				document.onselectstart = falseFN;
				tmpOnMouseMove = document.onmousemove;
				tmpOnMouseUp = document.onmouseup;
				document.onmousemove = onMouseMove;
				document.onmouseup = onMouseUp;
				//source.style.zIndex=100;
				onStartDrag(e);
			}
			,ccc=0
			//產生被拖曳的代理者   原拖曳目標還是在原地  移動的是代理者
			,createProxy = function(){
				var p = options.proxy;
				if(!p){
					useProxy = false;
				}else if(typeof p == 'string'){
					switch(p)
					{
						case 'clone':
							useProxy = true;
							if(cloneProxy){
								proxy = cloneProxy;
							}else{
								proxy = source.cloneNode(true);
								proxy.style.display="none";
								proxy.style.position = 'absolute';
								proxy.style.left = source.offsetLeft+'px';
								proxy.style.top = source.offsetTop+'px';
								proxy.style.opacity = 10;
								proxy.style.backgroundColor = "green";
								cloneProxy = true;
								source.parentNode.appendChild(proxy);
								//document.body.appendChild(proxy);
							}
							break;
						default:
							useProxy = false;
							break;
					}
				}else if(typeof p == 'object' && p){
					useProxy = true;
					proxy = p;
					proxy.style.display = "none";
				}else{
					useProxy = false;
				}
			}
			//拖曳停止 原拖曳目標 需要移動到代理者位置 並且把代理者隱藏
			,callbackProxy = function(){
				if(useProxy == true)
				{
					var pos = getOffset(proxy);
					source.style.position = 'absolute';
					//EZ.log('left '+moveObj.style.left);
					//EZ.log('top '+moveObj.style.top);
					source.style.left = moveObj.style.left;
					source.style.top = moveObj.style.top;
					//revert true 可以設成static
					//source.style.position = 'static';
					proxy.style.display = "none";
				}
			}
			,doRevert = function(){
				if(revert == true && isDrop == false){
					source.style.position = tmpPosition;
					source.style.left = tmpLeft+'px';
					source.style.top = tmpTop+'px';
				}
			}
			,move = function(_offset){
				//moveObj 原始相對位置 加上 滑鼠偏移
				if(moveObj){
					if(useDragZone == true){
						var left = (movePos.x-0)+(_offset.x-0);
						var top = (movePos.y-0)+(_offset.y-0);
						
						if(left <DragZone.west){
							left = DragZone.west;
						}else if(left > DragZone.east ){
							left = DragZone.east;
						}
						if(top < DragZone.north){
							top = DragZone.north;
						}else if(top > DragZone.south ){
							top = DragZone.south;
						}
						left = (left-0)+(moveOffset.x-movePos.x);
						top = (top-0)+(moveOffset.y-movePos.y);
						moveObj.style.left = left+'px';
						moveObj.style.top = top+'px';
					}else{
						var left = (moveOffset.x-0)+(_offset.x-0);
						var top = (moveOffset.y-0)+(_offset.y-0);
						moveObj.style.left = left+'px';
						moveObj.style.top = top+'px';
					}
					
				}
			}
			//拖曳區域
			,createDragZone = function(dz){
				if(typeof dz == 'undefined' || !dz){
					useDragZone = false;
					return;
				}else{
					useDragZone = true;
					if(typeof dz == 'string') dz = document.getElementById(dz);
					//找出dz座標 跟 寬 高
					var targPos = getPos(dz);
					var targWidth  = parseInt(dz.offsetWidth); 
					var targHeight = parseInt(dz.offsetHeight);
					var north = targPos.y;
					var south = targPos.y+targHeight;
					var west = targPos.x;
					var east = targPos.x+targWidth;
					// EZ.log('targPos.x = ' + targPos.x);
					// EZ.log('targPos.y = ' + targPos.y);
					// EZ.log('targHeight = ' + targHeight);
					// EZ.log('targWidth = ' + targWidth);
					// EZ.log('north = ' + north);
					// EZ.log('south = ' + south);
					// EZ.log('west = ' + west);
					// EZ.log('east = ' + east);
					
					var tmp = getPos(source);
					// EZ.log('source.x = ' + tmp.x);
					// EZ.log('source.y = ' + tmp.y);
					// EZ.log('source.left = ' + source.offsetLeft);
					// EZ.log('source.top = ' + source.offsetTop);
					var sourceWidth = parseInt(source.offsetWidth);
					var sourceHeight = parseInt(source.offsetHeight);
					DragZone.north = north;
					DragZone.south = south-sourceHeight;
					DragZone.west = west;
					DragZone.east = east-sourceWidth;
					//EZ.log('DragZone.north = ' + DragZone.north);
					//EZ.log('DragZone.south = ' + DragZone.south);
					//EZ.log('DragZone.west = ' + DragZone.west);
					//EZ.log('DragZone.east = ' + DragZone.east);
				}
			}
			,setEvent = function(){
				if(handle!=null){
					handle = (typeof handle == 'string') ? document.getElementById(handle) : handle;
					handle.onmousedown = onMouseDown;
					handle.style.cursor = 'move';
				}else{
					source.onmousedown = onMouseDown;
					source.style.cursor = 'move';
				}
			}
			,explainOptions = function(){
				if(options===true){
					draggable = true;
				}else if(options===false){
					draggable = false;
				}else if(typeof options == 'object' && options !=null){
					draggable = true;
					onStartDrag = options.onStartDrag ? options.onStartDrag : emptyFN;
					onStopDrag = options.onStopDrag ? options.onStopDrag : emptyFN;
					onDragging = options.onDragging ? options.onDragging : emptyFN;
					//handle = options.handle ? options.handle : null;
					revert = options.revert ? options.revert : false;
					draggable = options.draggable ? options.draggable : true;
					createProxy();
					createDragZone(options.DragZone);
				}
			}
			,init = function(){
				if(isInit==false){
					isInit = true;
					explainOptions();
					//setEvent();
				}
			}
			return {
				Set : function(_options , dom){
					myObject = this;
					source = dom;
					options = _options;
					handle = options.handle ? options.handle : null;
					//init();
					setEvent();
				}
				,moveEvent : function(e){
					e = e || window.event;
					if(isDragging == false) return;
					//dragCount++;
					//log1(dragCount);
					var mouse = mouseCoords(e);
					offset.x = mouse.x - mouseStart.x;
					offset.y = mouse.y - mouseStart.y;
					move(offset);
					onDragging(e,source);
				}
				,dropEvent : function(e){
					e = e || window.event;
					if(isDragging == false) return;
					isDragging = false;
					document.onselectstart = trueFN;
					callbackProxy();
					doRevert();
					onStopDrag(e,source);
				}
				,setDrop : function(bool){
					isDrop = bool || false;
				}
			};
		}
		//onmousedown 由e 取得 target 再拿ddid去 Targets 找出來 取得觸發function
		,dropTarget = function(){
			var myObject
			,target
			,information
			,droppable=false
			,onDragEnter
			,onDragLeave
			,onDrop
			,accepts = []
			,DropZone = {west:0,east:0,north:0,south:0}
			,status = 0//狀態 0 = onDragLeave  1=onDragenter
			,options
			,isInit = false
			,createAccept = function(accept){
				if(typeof accept == 'undefined' || !accept) return;
				if(typeof accept == 'string'){
					accepts = [];
					var alls = document.getElementsByTagName('*');
					for(var i=0,ilen=alls.length;i<ilen;i++)
					{
						var a = alls[i];
						var id = a.id;
						var cls = a.className;
						if( (typeof id != 'undefined' && id && accept.search('#'+id) != -1 )
							|| (typeof cls != 'undefined' && cls && accept.search('.'+cls) != -1)
						){
							accepts.push(a);
						}
					}
				}else if(is_array(accept)){
					accepts = accept;
				}
			}
			,checkAccept = function(e){
				e = e || window.event;
				var dom = e.srcElement ? e.srcElement:e.target;
				for(var i=0;i<accepts.length;i++)
				{
					var a = accepts[i];
					if(a.getAttribute('ddid') == dom.getAttribute('ddid')){
						return true;
					}
				}
				return false;
			}
			,createDropZone = function(){
				//由target 產生區域範圍 
				//try{
				var targPos = getPos(target);
				//}catch(e){alert(target)}
				var targWidth  = parseInt(target.offsetWidth); 
				var targHeight = parseInt(target.offsetHeight);
				DropZone.north = targPos.y;
				DropZone.south = targPos.y+targHeight;
				DropZone.west = targPos.x;
				DropZone.east = targPos.x+targWidth;
				// EZ.log(
					// "north = "+DropZone.north+"<br />"
					// +"south = "+DropZone.south+"<br />"
					// +"west = "+DropZone.west+"<br />"
					// +"east = "+DropZone.east+"<br />"
				// );
			}
			,explainOptions = function(){
				if(options===true){
					droppable=true;
				}else if(options===false){
					droppable=false;
				}else if(typeof options == 'object'){
					droppable=true;
					onDragEnter = options.onDragEnter ? options.onDragEnter : emptyFN;
					onDragLeave = options.onDragLeave ? options.onDragLeave : emptyFN;
					onDrop = options.onDrop ? options.onDrop : emptyFN;
					createAccept(options.accept);
				}
			}
			,init = function(){
				if(isInit==false){
					isInit=true;
					explainOptions();
					createDropZone();
				}
			}
			
			return {
				Set : function(_options,dom){
					myObject = this;
					target = dom;
					options = _options;
					//explainOptions(options);
					//createDropZone();
				}
				,moveEvent : function(e){
					//target 已經不在body之內
					if(typeof target.offsetParent == 'unknown'){return;}
					init();
					e = e || window.event;
					switch(status)
					{
						case 0:
							//判斷是否進入target Y ==> onDragEnter,status=1
							var mousePos = mouseCoords(e);
							createDropZone();
							// EZ.log(mousePos.x +">="+ DropZone.west 
								// +"<br>"+ mousePos.x +"<="+ DropZone.east
								// +"<br>"+ mousePos.y +">="+ DropZone.north 
								// +"<br>"+ mousePos.y +"<="+ DropZone.south);
							if(
								mousePos.x >= DropZone.west 
								&& mousePos.x <= DropZone.east
								&& mousePos.y >= DropZone.north 
								&& mousePos.y <= DropZone.south
							){
								status=1;
								//if(checkAccept(e)){
									onDragEnter(e,target);
								//}
							}
							break;
						case 1:
							//判斷是否離開target Y ==> onDragLeave,status=0
							var mousePos = mouseCoords(e);
							createDropZone();
							if(
								mousePos.x < DropZone.west 
								|| mousePos.x > DropZone.east
								|| mousePos.y < DropZone.north 
								|| mousePos.y > DropZone.south
							){
								status=0;
								//if(checkAccept(e)){
									onDragLeave(e,target);
								//}
							}
							break;
						default:
							break;
					}
				}
				,dropEvent : function(e){
					init();
					e = e || window.event;
					if(status==1 && checkAccept(e)){
						nowSource.setDrop(true);
						onDrop(e,target);
					}
				}
			};
		}
		,dragdrop = new function(){
			var dom;
			return {
				draggable:function(options){
					var sid = setDdid(dom);
					var source = Sources[sid];
					if(typeof source == 'undefined' || source==null){
						source = new dragSource();
						Sources[sid] = source;
						ssids[ssids.length] = sid;
						source.Set(options,dom);
					}else{
						source.Set(options,dom);
					}
				}
				,droppable:function(options){
					var sid = setDdid(dom);
					var target = Targets[sid];
					if(typeof target == 'undefined' || target==null){
						target = new dropTarget();
						Targets[sid] = target;
						tsids[tsids.length] = sid;
						target.Set(options,dom);
					}else{
						target.Set(options,dom);
					}
				}
				,setDom:function(_dom){
					dom = _dom;
				}
				//清除doms
				,clear:function(){
					ssids = [] //drag sids
					Sources = {} //drag object
					tsids = [] // drop sids
					Targets = {} //drop object
				}
			};
		}
		init();
		return function (d){
			if(typeof d == 'string'){
				d = document.getElementById(d);
			}
			dragdrop.setDom(d);
			return dragdrop;
		};
	}();

//clone 部分 要改良 很多draggable 也只需一份clone 才正確 mousedown的時候再產生
/*
	事件 獨立的 每個source 跟 target 各有一份事件
	#source
		onStartDrag
		onDragging
		onStopDrag
	#target
		onDragEnter (e,source)
		onDragLeave (e,source)
		onDrop (e,source)
	
	METHOD
	#source
		draggable true/false
		proxy 代理者 代替被拖曳的物件
		revert true/false 如果不是停留在droppable物件 就回原地
		handle //拖曳要跟著動的物件 比如拖曳視窗title列 視窗要跟著動
	
	#target
		droppable true/false
		accept: 可接受托放的id or css   (#id,.css)
		
	
	事件流程
	source onmousedown     ==>  (source.onStartDrag => proxy /handle)
	document onmousemove   ==>  source.onDragging / source.DragZone
	document onmouseup     ==>  source.onStopDrag / REVERT
	
	
	question : 在 target 上設定 事件 onmouseover onmouseout 是沒意義的 因為當你拖著source 移動到target上面時，你的滑鼠還是停留在source之上，source浮在target之上
	，所以你的事件還是觸發在source ，target的事件並不會觸發，所以需要使用座標 來判斷 onDragEnter , onDragLeave ,onDrop
	answer: 我的解決方法是 
		1. 在DD層 註冊一個function  DD.onMouseMove 管理所有mousemove行為
		2. 當DD.onMouseMove 每次觸發  ==>遍巡Targets 判斷 是否觸發事件 onDragEnter / onDragLeave /onDrop
	     ==>  target.onDragEnter / (accept=>target.onDrop)
	     ==>  target.onDragLeave
	
*/
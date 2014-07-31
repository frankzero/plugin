
EZ.DD = new function () {
	var
	_index = 0,
	_sid,
	debug = false,
	debugDiv,
	nowSource = null // 目前拖曳的Source物件
,
	ssids = []//drag sids
,
	Sources = {}
	//drag object
,
	tsids = []// drop sids
,
	Targets = {}
	//drop object
,
	isDragging = false //是否正在拖曳中
,
	tmpOnMouseMove,
	tmpOnMouseUp,
	tmpPosition,
	tmpLeft,
	tmpTop,
	init = function () {
		//document.onmousemove = onMouseMove;
		//document.onmouseup = onMouseUp;
		_sid = getSid(5);
	},
	emptyFN = function () {},
	trueFN = function () {
		return true;
	},
	falseFN = function () {
		return false;
	},
	onMouseMove = function (e) {
		//try{
		e = e || window.event;
		if (isDragging == true) {
			for (var i = 0, ilen = tsids.length; i < ilen; i++) {
				Targets[tsids[i]].moveEvent(e);
			}
		}
		if (nowSource) {
			nowSource.moveEvent(e);
		}
		//}catch(e){EZ.log(e.toString());}
	},
	onMouseUp = function (e) {
		document.onmousemove = tmpOnMouseMove
			document.onmouseup = tmpOnMouseUp;
		e = e || window.event;
		if (isDragging == true) {
			for (var i = 0, ilen = tsids.length; i < ilen; i++) {
				Targets[tsids[i]].dropEvent(e);
			}
		}
		if (nowSource) {
			nowSource.dropEvent(e);
		}
	},
	sid = function () {
		_index++;
		return _sid + _index;
	},
	is_array = function (input) {
		return typeof(input) == 'object' && (input instanceof Array);
	},
	getSid = function (num) {
		var t = [
			'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
		];
		var f = [];
		for (var i = 0; i < num; i++) {
			if (i == 0) {
				f[i] = Math.floor((Math.random() * 52));
			} else {
				f[i] = Math.floor((Math.random() * 62));
			}
		}
		var r = [];
		for (var i = 0; i < f.length; i++) {
			r[r.length] = t[f[i]];
		}
		return r.join('');
	}
	//給dom設定 ddid
,
	setDdid = function (dom) {
		var ddid = dom.getAttribute('ddid');
		if (ddid) {
			return ddid;
		} else {
			ddid = dom.getAttribute('id') ? dom.getAttribute('id') : sid();
			dom.setAttribute('ddid', ddid);
			return ddid;
		}
	}
	//滑鼠座標
,
	mouseCoords = function (e) {
		if (e.pageX || e.pageY) {
			return {
				x : e.pageX,
				y : e.pageY
			};
		}
		return {
			x : e.clientX + document.body.scrollLeft - document.body.clientLeft,
			y : e.clientY + document.body.scrollTop - document.body.clientTop
		};
	}
	//取得相對座標 (相對於parent)
,
	getOffset = function (elmt) {
		return {
			x : elmt.offsetLeft,
			y : elmt.offsetTop
		};
	}
	//取得絕對座標
,
	getPos = function (elmt) {
		var x = 0;
		var y = 0;
		//繞行 offsetParents
		for (var e = elmt; e; e = e.offsetParent) {
			//把 offsetLeft 值加總
			x += e.offsetLeft;
			//把 offsetTop 值加總
			y += e.offsetTop;
		}
		//繞行至 document.body
		for (e = elmt.parentNode; e && e != document.body; e = e.parentNode) {
			//減去捲軸值
			if (e.scrollLeft)
				x -= e.scrollLeft;
			//減去捲軸值
			if (e.scrollTop)
				y -= e.scrollTop;
		}
		return {
			x : x,
			y : y
		};
	},
	dragSource = function () {
		var myObject = this,
		source,
		dragCount = 0,
		draggable = false
			//拖曳物
	,
		moveObj
		//拖曳物起點 絕對座標
	,
		movePos = {
			x : 0,
			y : 0
		}
		// 相對座標
	,
		moveOffset = {
			x : 0,
			y : 0
		}
		//滑鼠起點
	,
		mouseStart = {
			x : 0,
			y : 0
		}
		//x,y偏移
	,
		offset = {
			x : 0,
			y : 0
		},
		onStartDrag,
		onStopDrag,
		onDragging
		//代理者
	,
		proxy_id,
		proxy
		//已經clone過
	,
		cloneProxy,
		useProxy = false
			//拖曳範圍
	,
		DragZone = {
			north : 0,
			west : 0,
			east : 0,
			south : 0
		},
		useDragZone = false
			//drop 是否復原
	,
		revert = false,
		isDrop = false //當他為true 不做revert 表示在可drop物件上
	,
		draggable = false
			//把手
	,
		handle = null,
		options,
		isInit = false,
		onMouseDown = function (e) {
			init();
			if (draggable == false)
				return;
			isDrop = false;
			isDragging = true;
			e = e || window.event;
			if (useProxy) {
				moveObj = proxy;
				moveObj.style.display = "inline-block";
			} else {
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
			moveObj.style.left = tmpLeft + 'px';
			moveObj.style.top = tmpTop + 'px';
			//nowSource 在 DD層
			nowSource = myObject;
			document.onselectstart = falseFN;
			tmpOnMouseMove = document.onmousemove;
			tmpOnMouseUp = document.onmouseup;
			document.onmousemove = onMouseMove;
			document.onmouseup = onMouseUp;
			//source.style.zIndex=100;
			onStartDrag(e);
		},
		ccc = 0
			//產生被拖曳的代理者   原拖曳目標還是在原地  移動的是代理者
	,
		createProxy = function () {
			var p = options.proxy;
			if (!p) {
				useProxy = false;
			} else if (typeof p == 'string') {
				switch (p) {
				case 'clone':
					useProxy = true;
					if (cloneProxy) {
						proxy = cloneProxy;
					} else {
						proxy = source.cloneNode(true);
						proxy.style.display = "none";
						proxy.style.position = 'absolute';
						proxy.style.left = source.offsetLeft + 'px';
						proxy.style.top = source.offsetTop + 'px';
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
			} else if (typeof p == 'object' && p) {
				useProxy = true;
				proxy = p;
				proxy.style.display = "none";
			} else {
				useProxy = false;
			}
		}
		//拖曳停止 原拖曳目標 需要移動到代理者位置 並且把代理者隱藏
	,
		callbackProxy = function () {
			if (useProxy == true) {
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
		},
		doRevert = function () {
			if (revert == true && isDrop == false) {
				source.style.position = tmpPosition;
				source.style.left = tmpLeft + 'px';
				source.style.top = tmpTop + 'px';
			}
		},
		move = function (_offset) {
			//moveObj 原始相對位置 加上 滑鼠偏移
			if (moveObj) {
				if (useDragZone == true) {
					var left = (movePos.x - 0) + (_offset.x - 0);
					var top = (movePos.y - 0) + (_offset.y - 0);

					if (left < DragZone.west) {
						left = DragZone.west;
					} else if (left > DragZone.east) {
						left = DragZone.east;
					}
					if (top < DragZone.north) {
						top = DragZone.north;
					} else if (top > DragZone.south) {
						top = DragZone.south;
					}
					left = (left - 0) + (moveOffset.x - movePos.x);
					top = (top - 0) + (moveOffset.y - movePos.y);
					moveObj.style.left = left + 'px';
					moveObj.style.top = top + 'px';
				} else {
					var left = (moveOffset.x - 0) + (_offset.x - 0);
					var top = (moveOffset.y - 0) + (_offset.y - 0);
					moveObj.style.left = left + 'px';
					moveObj.style.top = top + 'px';
				}

			}
		}
		//拖曳區域
	,
		createDragZone = function (dz) {
			if (typeof dz == 'undefined' || !dz) {
				useDragZone = false;
				return;
			} else {
				useDragZone = true;
				if (typeof dz == 'string')
					dz = document.getElementById(dz);
				//找出dz座標 跟 寬 高
				var targPos = getPos(dz);
				var targWidth = parseInt(dz.offsetWidth);
				var targHeight = parseInt(dz.offsetHeight);
				var north = targPos.y;
				var south = targPos.y + targHeight;
				var west = targPos.x;
				var east = targPos.x + targWidth;
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
				DragZone.south = south - sourceHeight;
				DragZone.west = west;
				DragZone.east = east - sourceWidth;
				//EZ.log('DragZone.north = ' + DragZone.north);
				//EZ.log('DragZone.south = ' + DragZone.south);
				//EZ.log('DragZone.west = ' + DragZone.west);
				//EZ.log('DragZone.east = ' + DragZone.east);
			}
		},
		setEvent = function () {
			if (handle != null) {
				handle = (typeof handle == 'string') ? document.getElementById(handle) : handle;
				handle.onmousedown = onMouseDown;
				handle.style.cursor = 'move';
			} else {
				source.onmousedown = onMouseDown;
				source.style.cursor = 'move';
			}
		},
		explainOptions = function () {
			if (options === true) {
				draggable = true;
			} else if (options === false) {
				draggable = false;
			} else if (typeof options == 'object' && options != null) {
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
		},
		init = function () {
			if (isInit == false) {
				isInit = true;
				explainOptions();
				//setEvent();
			}
		}
		return {
			Set : function (_options, dom) {
				myObject = this;
				source = dom;
				options = _options;
				handle = options.handle ? options.handle : null;
				//init();
				setEvent();
			},
			moveEvent : function (e) {
				e = e || window.event;
				if (isDragging == false)
					return;
				//dragCount++;
				//log1(dragCount);
				var mouse = mouseCoords(e);
				offset.x = mouse.x - mouseStart.x;
				offset.y = mouse.y - mouseStart.y;
				move(offset);
				onDragging(e, source);
			},
			dropEvent : function (e) {
				e = e || window.event;
				if (isDragging == false)
					return;
				isDragging = false;
				document.onselectstart = trueFN;
				callbackProxy();
				doRevert();
				onStopDrag(e, source);
			},
			setDrop : function (bool) {
				isDrop = bool || false;
			},
			getSource : function () {
				return source;
			}
		};
	}
	//onmousedown 由e 取得 target 再拿ddid去 Targets 找出來 取得觸發function
,
	dropTarget = function () {
		var myObject,
		target,
		information,
		droppable = false,
		onDragEnter,
		onDragLeave,
		onDrop,
		accepts = [],
		DropZone = {
			west : 0,
			east : 0,
			north : 0,
			south : 0
		},
		status = 0 //狀態 0 = onDragLeave  1=onDragenter
	,
		options,
		isInit = false,
		createAccept = function (accept) {
			if (typeof accept == 'undefined' || !accept)
				return;
			if (typeof accept == 'string') {
				accepts = [];
				var alls = document.getElementsByTagName('*');
				for (var i = 0, ilen = alls.length; i < ilen; i++) {
					var a = alls[i];
					var id = a.id;
					var cls = a.className;
					if ((typeof id != 'undefined' && id && accept.search('#' + id) != -1)
						 || (typeof cls != 'undefined' && cls && accept.search('.' + cls) != -1)) {
						accepts.push(a);
					}
				}
			} else if (is_array(accept)) {
				accepts = accept;
			}
		},
		checkAccept = function (e) {
			e = e || window.event;
			var dom = e.srcElement ? e.srcElement : e.target;
			for (var i = 0; i < accepts.length; i++) {
				var a = accepts[i];
				if (a.getAttribute('ddid') == dom.getAttribute('ddid')) {
					return true;
				}
			}
			return false;
		},
		createDropZone = function () {
			//由target 產生區域範圍
			//try{
			var targPos = getPos(target);
			//}catch(e){alert(target)}
			var targWidth = parseInt(target.offsetWidth);
			var targHeight = parseInt(target.offsetHeight);
			DropZone.north = targPos.y;
			DropZone.south = targPos.y + targHeight;
			DropZone.west = targPos.x;
			DropZone.east = targPos.x + targWidth;
			// EZ.log(
			// "north = "+DropZone.north+"<br />"
			// +"south = "+DropZone.south+"<br />"
			// +"west = "+DropZone.west+"<br />"
			// +"east = "+DropZone.east+"<br />"
			// );
		},
		explainOptions = function () {
			if (options === true) {
				droppable = true;
			} else if (options === false) {
				droppable = false;
			} else if (typeof options == 'object') {
				droppable = true;
				onDragEnter = options.onDragEnter ? options.onDragEnter : emptyFN;
				onDragLeave = options.onDragLeave ? options.onDragLeave : emptyFN;
				onDrop = options.onDrop ? options.onDrop : emptyFN;
				createAccept(options.accept);
			}
		},
		init = function () {
			if (isInit == false) {
				isInit = true;
				explainOptions();
				createDropZone();
			}
		}

		return {
			Set : function (_options, dom) {
				myObject = this;
				target = dom;
				options = _options;
				//explainOptions(options);
				//createDropZone();
			},
			moveEvent : function (e) {
				//target 已經不在body之內
				if (typeof target.offsetParent == 'unknown') {
					return;
				}
				init();
				e = e || window.event;
				switch (status) {
				case 0:
					//判斷是否進入target Y ==> onDragEnter,status=1
					var mousePos = mouseCoords(e);
					createDropZone();
					// EZ.log(mousePos.x +">="+ DropZone.west
					// +"<br>"+ mousePos.x +"<="+ DropZone.east
					// +"<br>"+ mousePos.y +">="+ DropZone.north
					// +"<br>"+ mousePos.y +"<="+ DropZone.south);
					if (
						mousePos.x >= DropZone.west
						 && mousePos.x <= DropZone.east
						 && mousePos.y >= DropZone.north
						 && mousePos.y <= DropZone.south) {
						status = 1;
						//if(checkAccept(e)){
						onDragEnter(e, target);
						//}
					}
					break;
				case 1:
					//判斷是否離開target Y ==> onDragLeave,status=0
					var mousePos = mouseCoords(e);
					createDropZone();
					if (
						mousePos.x < DropZone.west
						 || mousePos.x > DropZone.east
						 || mousePos.y < DropZone.north
						 || mousePos.y > DropZone.south) {
						status = 0;
						//if(checkAccept(e)){
						onDragLeave(e, target);
						//}
					}
					break;
				default:
					break;
				}
			},
			dropEvent : function (e) {
				init();
				e = e || window.event;
				if (status == 1 && checkAccept(e)) {
					nowSource.setDrop(true);
					onDrop(e, target);
				}
			}
		};
	},
	dragdrop = new function () {
		var dom;
		return {
			draggable : function (options) {
				var sid = setDdid(dom);
				var source = Sources[sid];
				if (typeof source == 'undefined' || source == null) {
					source = new dragSource();
					Sources[sid] = source;
					ssids[ssids.length] = sid;
					source.Set(options, dom);
				} else {
					source.Set(options, dom);
				}
			},
			droppable : function (options) {
				var sid = setDdid(dom);
				var target = Targets[sid];
				if (typeof target == 'undefined' || target == null) {
					target = new dropTarget();
					Targets[sid] = target;
					tsids[tsids.length] = sid;
					target.Set(options, dom);
				} else {
					target.Set(options, dom);
				}
			},
			setDom : function (_dom) {
				dom = _dom;
			}
			//清除doms
		,
			clear : function () {
				ssids = []//drag sids
				Sources = {}
				//drag object
				tsids = []// drop sids
				Targets = {}
				//drop object
			}
		};
	}
	init();
	return function (d) {
		if (typeof d == 'string') {
			d = document.getElementById(d);
		}
		dragdrop.setDom(d);
		return dragdrop;
	};
}();



EZ.createLog = new function () {
	var created = false;
	var w = 200;
	var h;
	var l = 0;
	var t = 0;
	var a = 'right';
	var v = '';
	return function (option) {
		if (created == true)
			return;
		h = document.body.offsetHeight;
		if (option) {
			w = option.width || w;
			h = option.height || h;
			l = option.left || l;
			t = option.top || t;
			a = option.align || a;
			v = option.valign || v;
		}
		created = true;
		var div = document.createElement('div');
		div.style.position = 'fixed';
		div.style.width = w + 'px';
		div.style.height = h + 'px';
		div.style.left = l + 'px';
		div.style.top = t + 'px';
		div.style.backgroundColor = '#000';
		div.style.color = '#fff';
		div.style.overflow = "auto";
		switch (a) {
		case "l":
		case "left":
			div.style.left = '0px';
			break;
		case "r":
		case "right":
			var tmpw = div.offsetWidth;
			//var tmph = div.offsetHeight;
			var bodyw = document.body.offsetWidth;
			div.style.left = (bodyw - w) + "px";
			break;
		default:
			break;
		}
		EZ.debugDiv = div;
		document.body.appendChild(EZ.debugDiv);
	}
}();

EZ.log = new function () {
	var c = 0;
	return function (text) {
		if (typeof console != 'undefined' && typeof console.log == 'function') {
			console.log(text);
		}
		if (!EZ.debugDiv)
			return;
		var div = document.createElement('div');
		div.innerHTML = c + ":  " + text;
		c++
		if (EZ.debugDiv.childNodes.length == 0) {
			EZ.debugDiv.appendChild(div);
		} else {
			EZ.debugDiv.insertBefore(div, EZ.debugDiv.childNodes[0]);
		}
	}
}();


EZ.Animation = function (_options) {
	var self = this,
	emptyFN = function () {},
	options = _options || {},
	tweenType,
	onTween,
	tween,
	tt = 0,
	onStart,
	onStop,
	timer_id = 0 //用 0判斷 已經發動
,
	intervalRate = 20,
	delay = 0,
	fromTo = [],
	is_array = function (input) {
		return typeof(input) == 'object' && (input instanceof Array);
	},
	tweenTypes = {
		'default' : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
		'slowMotion' : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
		'slow' : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
		'blast' : [12, 12, 11, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
		'linear' : [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
	},
	Denominator = {
		'default' : 100,
		'slowMotion' : 400,
		'slow' : 10000,
		'blast' : 100,
		'linear' : 100
	},
	createTween = function (fromTo, type) {
		// return array of tween coordinate data (start->end)
		type = (tweenTypes[type]) ? type : 'default';
		var tween = [];
		var tmp = [];
		var diff = [];
		for (var i = 0, ilen = fromTo.length; i < ilen; i++) {
			var start = fromTo[i][0];
			var end = fromTo[i][1];
			tmp[i] = start;
			diff[i] = end - start;
		}
		var x = tweenTypes[type];
		for (var i = 0, ilen = x.length; i < ilen; i++) {
			var result = [];
			for (var j = 0, jlen = fromTo.length; j < jlen; j++) {
				tmp[j] += diff[j] * x[i] / Denominator[type];
				result[j] = Math.round(tmp[j]);
			}
			tween[i] = {
				data : result,
				event : null
			};
		}
		return tween;
	},
	runAnimate = function () {
		if (tween[tt]) {
			var value = tween[tt].data;
			onTween(value);
			tt++;
		} else {
			tt = 0;
			stopAnimate();
		}
	},
	startAnimate = function () {
		if (timer_id !== 0) {
			stopAnimate();
		}
		if (init()) {
			onStart();
			tween = createTween(fromTo, tweenType);
			setTimeout(startInterval, delay);
		}
	},
	startInterval = function () {
		timer_id = setInterval(runAnimate, intervalRate);
	},
	stopAnimate = function () {
		clearInterval(timer_id);
		timer_id = 0;
		onStop();
	},
	init = function () {
		//if(options.from ===null || options.to===null || options.onTween === null){
		if (typeof options.fromTo == 'undefined' || options.fromTo === null || typeof options.onTween == 'undefined' || options.onTween === null || !is_array(options.fromTo)) {
			return false;
		} else {
			fromTo = options.fromTo;
			onTween = options.onTween;
		}
		tweenType = options.tweenType || 'default';
		onStop = options.onStop || emptyFN;
		onStart = options.onStart || emptyFN;
		delay = options.delay || 0;
		intervalRate = options.intervalRate || intervalRate;
		return true;
	};

	return {
		start : function (_options) {
			if (typeof _options != 'undefined' && !_options) {
				options = _options;
			}
			startAnimate();
		},
		stop : function () {
			stopAnimate();
		}
	}
}


//小提示視窗
EZ.tooltip = function () {
	var cacheDiv = [];
	return function (option) {
		var x = option.x;
		var y = option.y;
		var text = option.text;
		//e = e || window.event;
		for (var i = 0; i < cacheDiv.length; i++) {
			var c = cacheDiv[i];
			c.style.display = 'none';
		}
		cacheDiv = [];
		var div = document.createElement('div');
		cacheDiv.push(div);
		div.style.backgroundColor = "#000";
		div.style.color = "#fff";
		div.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
		div.style.MozOpacity = 0;
		div.style.opacity = 0;
		div.style.width = "200px";
		div.style.textShadow = "none";
		div.style.padding = "10px 15px";
		div.style.fontSize = "12px";
		div.style.fontWeight = "bold";
		div.style.boxShadow = "0px 0px 10px #000";
		div.style.border = "2px solid #66CC33";
		div.style.display = "none";
		div.innerHTML = text;

		var open = function () {
			div.style.position = "absolute";
			div.style.top = (y - 0 + 30) + "px";
			div.style.left = (x - 0 - 80) + "px";
			div.style.display = "block";
			document.body.appendChild(div);

			var animate = new EZ.Animation({
					fromTo : [[0, 70]],
					onTween : function (v) {
						div.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + v[0] + ")";
						div.style.MozOpacity = v[0] / 100;
						div.style.opacity = v[0] / 100;
					},
					tweenType : 'default',
					intervalRate : 0,
					onStop : function () {
						setTimeout(close, 2000);
					}
				});
			animate.start();
		}
		var close = function () {
			var animate = new EZ.Animation({
					fromTo : [[70, 0]],
					onTween : function (v) {
						div.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + v[0] + ")";
						div.style.MozOpacity = v[0] / 100;
						div.style.opacity = v[0] / 100;
					},
					tweenType : 'default',
					intervalRate : 0,
					onStop : function () {
						document.body.removeChild(div);
						div = null;
						EZ.clearMemory();
					}
				});
			animate.start();
		}
		open();
		//setTimeout(open,0);
	};
}();

//幻燈片
EZ.Slide = new function () {
	var self = this,
	slide = function () {
		var box,
		pointer,
		proxy,
		box,
		boxWidth,
		boxHeight,
		childs,
		childWidth,
		childHeight,
		step,
		interval = 1000,
		autoPlay = false,
		showType = 0 //0 左右 1 上下
	,
		animateNext,
		animatePrevious,
		timer_id = 0,
		doNext = function () {
			animateNext.start();
		},
		isInit = false; ;
		return {
			init : function (_box) {
				box = _box;
				boxWidth = box.clientWidth;
				boxHeight = box.clientHeight;
				box.style.width = boxWidth + 'px';
				box.style.height = boxHeight + 'px';
				box.style.overflow = "hidden";
				//1. 找出所有子物件
				childs = [];
				var nodes = box.childNodes;
				var totalWidth = 0;
				for (var i = 0, ilen = nodes.length; i < ilen; i++) {
					var n = nodes[i];
					if (typeof n.tagName != 'undefined' && n.tagName != '!') {
						n.style.overflow = 'hidden';
						n.style.display = "inline-block";
						totalWidth += n.clientWidth;
						childs[childs.length] = nodes[i];
					}
				}

				if (childs.length == 0) {
					return;
				}
				childWidth = childs[0].clientWidth;
				childHeight = childs[0].clientHeight;
				var step = Math.round(boxWidth / childWidth);
				EZ.deleteChilds(box);

				//產生proxy
				proxy = document.createElement('div');
				proxy.style.width = totalWidth + "px";
				for (pointer = 0; pointer < step; pointer++) {
					proxy.appendChild(childs[pointer]);
				}
				proxy.appendChild(childs[pointer]);
				box.appendChild(proxy);

				animateNext = new EZ.Animation({
						fromTo : [[childWidth, 0], [0, childWidth]],
						onTween : function (v) {
							proxy.childNodes[0].style.width = v[0] + 'px';
							childs[pointer].style.width = v[1] + 'px';
						},
						tweenType : 'blast' //default blast linear slowMotion
					,
						intervalRate : 0,
						onStop : function () {
							pointer++;
							if (pointer >= childs.length)
								pointer = 0;
							proxy.removeChild(proxy.childNodes[0]);
							proxy.appendChild(childs[pointer]);
						}
					});
				isInit = true;
			},
			next : function () {
				if (isInit == false)
					return;
				try {
					doNext();
				} catch (e) {
					if (timer_id != 0) {
						clearInterval(timer_id);
						timer_id = 0;
					}
					isInit = false;
				}
			},
			previous : function () {
				if (isInit == false)
					return;
			},
			play : function (timeblock) {
				if (isInit == false)
					return;
				if (typeof timeblock == 'undefined')
					timeblock = 3000;

				timer_id = setInterval(doNext, timeblock);
			},
			stop : function () {
				if (isInit == false)
					return;
				clearInterval(timer_id);
				timer_id = 0;
			}
		}
	};
	return function (selector) {
		if (typeof selector == 'string') {
			selector = document.getElementById(selector);
		}
		var tmp = new slide();
		tmp.init(selector);
		return tmp;
	};
}();


EZ.print_r = function (theObj) {
	var retStr = '';
	if (typeof theObj == 'object') {
		retStr += '<div style="font-family:Tahoma; font-size:12px;">';
		for (var p in theObj) {
			if (!theObj.hasOwnProperty(p))
				continue;
			if (typeof theObj[p] == 'object') {
				retStr += '<div>[' + p + '] => ' + typeof(theObj) + '</div>';
				retStr += '<div>{</div>';
				retStr += '<div style="padding-left:50px;">';
				retStr += EZ.print_r(theObj[p]) + '</div>';
				retStr += '<div>}</div>';
			} else {
				retStr += '<div>[' + p + '] => ' + theObj[p] + '</div>';
			}
		}
		retStr += '</div>';
	}
	return retStr;
}


EZ.divGrid = function (o) {
	var self = this
		//設定
,
	opt = {
		//資料
		data : []
		//備份資料 更新時候用
	,
		dataHash : []
		//欄位 id,text,dataIndex,width,height,renender,resizable,draggable,sortable,hidden
	,
		columns : []
		//畫在哪 id
	,
		renderTo : ''
		//css 名稱
	,
		cls : 'divGrid'
		//群組列
	,
		group : {
			field : '',
			enable : false,
			tpl : emptyFN
		}
		// 更新用
	,
		update : {
			unique : ''
			//更新的欄位
		,
			updateField : [],
			updateRow : null,
			removeRow : null,
			insertRow : null
		}
		//最後一列
	,
		foot : {
			field : '',
			enable : false,
			tpl : emptyFN
		},
		event : {
			onLoad : emptyFN
		}
	},
	isInit = false,
	initialize = function (o) {
		opt.update.insertRow = Drawer.insertRow;
		opt.update.removeRow = Drawer.removeRow;
		opt.update.updateRow = Drawer.updateRow;
	},
	option = function (o) {
		if (typeof o == 'undefined')
			return;
		if (typeof o.data != 'undefined') {
			opt.data = o.data;
		}
		if (typeof o.columns != 'undefined') {
			opt.columns = o.columns;
			//format
			for (var i = 0, ilen = opt.columns.length; i < ilen; i++) {
				var c = opt.columns[i];
				//EZ.show(c);
				if (typeof c.renderer == 'undefined' || c.renderer == null) {
					c.renderer = defRender;
				}
				if (typeof c.updateField == 'undefined' || c.updateField == null) {
					c.updateField = [];
				}

			}
		}
		if (typeof o.renderTo != 'undefined' && o.renderTo != null) {
			opt.renderTo = o.renderTo;
			if (typeof opt.renderTo == 'string') {
				var r = document.getElementById(opt.renderTo);
				if (typeof r != 'undefined' && r != null) {
					opt.renderTo = r;
				} else {
					log(opt.renderTo + ' is not exist : function show');
					return;
				}
			}

		}
		if (typeof o.cls != 'undefined') {
			opt.cls = o.cls;
		}
		if (typeof o.group != 'undefined') {
			opt.group.field = (typeof o.group.field == 'undefined') ? opt.group.field : o.group.field;
			opt.group.enable = (typeof o.group.enable == 'undefined') ? true : o.group.enable;
			opt.group.tpl = (typeof o.group.tpl == 'undefined') ? defRender : o.group.tpl;
		}
		if (typeof o.foot != 'undefined') {
			opt.foot.field = (typeof o.group.field == 'undefined') ? opt.group.field : o.group.field;
			opt.foot.enable = (typeof o.group.enable == 'undefined') ? true : o.group.enable;
			opt.foot.tpl = (typeof o.group.tpl == 'undefined') ? opt.group.tpl : o.group.tpl;
		}
		if (typeof o.update != 'undefined') {
			opt.update.unique = (typeof o.update.unique == 'undefined') ? opt.update.unique : o.update.unique;
			opt.update.updateField = (typeof o.update.updateField == 'undefined') ? opt.update.updateField : o.update.updateField;
			opt.update.insertRow = (typeof o.update.insertRow == 'undefined') ? Drawer.insertRow : o.update.insertRow;
			opt.update.removeRow = (typeof o.update.removeRow == 'undefined') ? Drawer.removeRow : o.update.removeRow;
			opt.update.updateRow = (typeof o.update.updateRow == 'undefined') ? Drawer.updateRow : o.update.updateRow;
		}
		if (typeof o.event != 'undefined') {
			if (typeof o.event.onLoad != 'undefined')
				opt.event.onLoad = o.event.onLoad;
		}
	}
	//預設render
,
	defRender = function (value, p, record, rowIndex, columnIndex) {
		return value;
	},
	emptyFN = function () {},
	log = new function () {
		var timeStart = 0;

		return function (text, bool) {
			if (typeof bool == 'boolean' && bool == true) {
				timeStart = new Date().getTime();
			}
			var nowTime = new Date().getTime();
			EZ.log((nowTime - timeStart) + ' : ' + text);
		}
	}
	()
	//畫面處理器
,
	Drawer = new function () {
		var self = this
			//grid dom
	,
		DOM = {
			Grid : null
		}
		//虛擬畫面
	,
		virtual = {
			dom : [],
			hash : {}
		},
		_virtual = {
			dom : [],
			hash : {}
		}
		//這個grid id
	,
		ID = {
			grid : EZ.id(),
			head : EZ.id()
		},
		rc = 0,
		ic = 0,
		uc = 0,
		stack = []//模擬更新用
		//利用columns 計算 width
	,
		Grid_width = 0
			//使用者自訂
	,
		click = function (e) {},
		onclick = function (e) {
			e = e || window.event;
			var dom;
			dom = (typeof e.target != 'undefined') ? e.target : e.srcElement;

			if (typeof dom == 'undefined')
				return;
			if (clickHandle(dom) == false) {
				dom = dom.parentNode;
				if (typeof dom != 'undefined') {
					clickHandle(dom);
				}
			}
			click(e);
		},
		clickHandle = function (dom) {
			var usefor = dom.getAttribute('usefor');
			//群組列 特化
			switch (usefor) {
			case "headCell": //排序
				var sort = dom.getAttribute('sort');
				if (typeof sort != 'undefined') {
					var ds = opt.data;
					Drawer.Sorter.set(sort);
					Drawer.Sorter.reverse(); //反轉
					ds = Drawer.Sorter.sort(ds);
				}
				draw(ds);
				return true;
			case "group": //群組縮放
				var gv = dom.getAttribute('gv');
				var tmp = dom;
				while (tmp = tmp.nextSibling) {
					if (gv == tmp.getAttribute('gv')) {
						if (tmp.style.display == 'none') {
							tmp.style.display = 'block';
						} else {
							tmp.style.display = 'none';
						}
					} else {
						break;
					}
				}
				return true;
			default:
				return false;
			}
		},
		Sorter = new function () {
			var self = this,
			index,
			direct = {},
			fn = {}
			//使用者自定義 排序
		,
			Self = {
				sort : function (ds, _direct) {
					if (typeof fn[index] != 'undefined' && fn[index] != null) {
						return fn[index](ds);
					} else if (typeof index != 'undefined' && index != null) {
						if (direct[index] == 'ASC') {
							ds.sort(function (a, b) {
								return a[index] - b[index];
							});
						} else {
							ds.sort(function (a, b) {
								return b[index] - a[index];
							});
						}
					}
					return ds;
				},
				set : function (_index) {
					index = _index;
				},
				reverse : function () {
					if (typeof direct[index] == 'undefined')
						direct[index] = 'ASC';
					else if (direct[index] == 'ASC')
						direct[index] = 'DESC';
					else
						direct[index] = 'ASC';
				},
				fn : function (_index, _fn) {
					fn[_index] = _fn;
				}
			}
			return Self;
		}
		()
		//如果div 寬度大於100% 需要使用 adjustGrid 調整寬度 ,否則無法大於100%
		//所有cell 高度一樣高 maxCellHeight
	,
		adjustGrid = function (dom) {
			var nowTime = new Date().getTime();
			dom.style.width = '10000px';
			var rowWidth = document.getElementById(ID.head).clientWidth;
			dom.style.width = (rowWidth) + 'px';

			/*
			var divs = dom.getElementsByTagName('div');
			var maxCellHeight = 0; //如果 沒有設 height 屬性 才使用
			for(var i=0,ilength=divs.length;i<ilength;i++){
			var d = divs[i];
			if(d.getAttribute('usefor') == 'group'){
			d.style.width = (rowWidth-1)+'px';
			}
			if(d.getAttribute('usefor') == 'cell'){
			var w = d.clientHeight;
			if(w>maxCellHeight) maxCellHeight = w;
			}
			}
			for(var i=0,ilength=divs.length;i<ilength;i++){
			var d = divs[i];
			if(d.getAttribute('usefor') == 'cell'){
			d.style.height = maxCellHeight+'px';
			}
			}
			 */
			var nodes = DOM.grid.childNodes;
			for (var i = 0, ilen = nodes.length; i < ilen; i++) {
				var node = nodes[i];
				if (node.getAttribute('usefor') == 'row') {
					//adjustRow(node);
				} else if (node.getAttribute('usefor') == 'group') {
					node.style.width = ((rowWidth - 1) < 0) ? 0 : (rowWidth - 1) + 'px';
				}
			}
			//EZ.log('adjust cost '+(new Date().getTime()-nowTime) );
		}
		//把每一格高度都設一樣
	,
		adjustRow = function (row) {
			var maxCellHeight = 0;
			var cells = row.childNodes;
			for (var j = 0, jlen = cells.length; j < jlen; j++) {
				var cell = cells[j];
				if (cell.clientHeight > maxCellHeight)
					maxCellHeight = cell.clientHeight;
			}
			for (var j = 0, jlen = cells.length; j < jlen; j++) {
				var cell = cells[j];
				cell.style.height = maxCellHeight + 'px';
			}
		},
		createVirtualDom = new function () {
			var self = this,
			vHead = function (d, domIndex) {
				var tmp = {
					usefor : 'head',
					domIndex : domIndex,
					rowIndex : 0,
					groupValue : '',
					uniqueValue : '',
					data : d
				};
				return tmp;
			},
			vRow = function (d, domIndex, rowIndex, gValue, uValue) {
				var tmp = {
					usefor : 'row',
					domIndex : domIndex,
					rowIndex : rowIndex,
					groupValue : gValue,
					uniqueValue : uValue,
					data : d
				};
				return tmp;
			},
			vGroup = function (d, domIndex, gValue) {
				var tmp = {
					usefor : 'group',
					groupCount : 0,
					domIndex : domIndex,
					rowIndex : domIndex,
					groupValue : gValue,
					uniqueValue : gValue,
					data : d
				};
				return tmp;
			},
			vFoot = function (d, domIndex) {
				var tmp = {
					usefor : 'foot',
					domIndex : domIndex,
					rowIndex : -1,
					data : d
				};
				return tmp;
			}

			return function (ds) {
				var vd = [];
				var vdIndex = 0;
				//var previousGroupIndex=0;
				var Group = {
					previousIndex : 0,
					count : 0,
					nowGroup : ''
				}
				vd[vdIndex++] = vHead(ds, vdIndex - 1);
				var gf = opt.group.field;
				//enable group
				var ge = opt.group.enable;
				var unique = opt.update.unique;
				var virtualHash = {};
				for (var i = 0, ilen = ds.length; i < ilen; i++) {
					var d = ds[i];
					if (unique != '') {
						opt.dataHash[d[unique]] = d;
					}
					var gValue = '';
					if (ge == true) {
						gValue = d[gf];
						//群組更換
						if (Group.nowGroup == '' || Group.nowGroup != gValue) {
							Group.nowGroup = gValue;
							vd[vdIndex++] = vGroup(d, vdIndex - 1, gValue);
							//if(unique != '') virtualGroup[gValue] = vd[(vdIndex-1)];
							if (unique != '')
								virtualHash['group' + gValue] = vd[(vdIndex - 1)];
							if (Group.previousIndex != 0) {
								vd[Group.previousIndex].groupCount = Group.count;
								Group.count = 0;
							}
							Group.previousIndex = vdIndex - 1;
						}
						Group.count++;
					}
					var uValue = '';
					if (unique != '') {
						uValue = d[opt.update.unique];
					}
					vd[vdIndex++] = vRow(d, vdIndex - 1, i, gValue, uValue);
					//if(unique != '') virtualRow[uValue] = vd[(vdIndex-1)];
					if (unique != '')
						virtualHash['row' + uValue] = vd[(vdIndex - 1)];

				}

				if (ge == true) {
					if (Group.previousIndex != 0) {
						vd[Group.previousIndex].groupCount = Group.count;
						Group.count = 0;
					}
				}
				return {
					dom : vd,
					hash : virtualHash
				};
			};
		}
		(),
		_grid = function (ds, virtual) {
			var tb = [];
			tb[tb.length] = "<div id='" + ID.grid + "' class='" + opt.cls + "'>";
			var cols = opt.columns;
			for (var i = 0, ilen = virtual.dom.length; i < ilen; i++) {
				var d = virtual.dom[i];
				tb[tb.length] = create(d, false);

			}
			tb[tb.length] = "</div>";
			return tb;
		},
		create = function (d, returnDom, i) {
			switch (d.usefor) {
			case "head":
				return _head(d, returnDom);
				break;
			case "row":
				return _row(d, returnDom);
				break;
			case "group":
				return _group(d, returnDom);
				break;
			case "foot":
				return _foot(d, returnDom);
				break;
			default:
				break;
			}
		},
		_head = function (ds, returnDom) {
			var tb = [];
			var cols = opt.columns;
			tb[tb.length] = "<div usefor='head'id='" + ID.head + "' gv='' uv='' class='head'>";
			for (var i = 0, ilen = cols.length; i < ilen; i++) {
				var c = cols[i];
				var width = '';
				var height = '';
				var cls = '';
				var display = '';
				if (typeof c.width != 'undefined') {
					width = 'width:' + c.width + 'px;';
				}
				if (typeof c.height != 'undefined') {
					height = 'width:' + c.height + 'px;';
				}
				if (typeof c.cls != 'undefined') {
					cls = c.cls;
				}
				if (typeof c.hidden != 'undefined' && c.hidden == true) {
					display = 'display:none;';
				}
				tb[tb.length] = "<div usefor='headCell' " + (c.sortable == true ? "sort='" + c.dataIndex + "' direct='asc'" : "") + " class='cell " + cls + "' style='" + width + height + display + "'>" + c.text + "</div>";
			}
			tb[tb.length] = "</div>";
			return tb.join('');
		},
		_row = function (d, returnDom) {
			var tb = [];
			var cols = opt.columns;
			if (returnDom == true) {
				var dom = document.createElement('div');
				/*
				if(d.rowIndex%2 == 0) dom.className = 'row';
				else dom.className = 'row2';
				 */
				dom.className = 'row';
				dom.setAttribute('usefor', 'row');
				dom.setAttribute('gv', d.groupValue);
				dom.setAttribute('uv', d.uniqueValue);
			} else {
				tb[tb.length] = "<div usefor='row' class='row' gv='" + d.groupValue + "' uv='" + d.uniqueValue + "'>";
				/*
				if(d.rowIndex%2 == 0)
				tb[tb.length] = "<div usefor='row' class='row' gv='"+d.groupValue+"' uv='"+d.uniqueValue+"'>";
				else
				tb[tb.length] = "<div usefor='row' class='row2' gv='"+d.groupValue+"' uv='"+d.uniqueValue+"'>";
				 */
			}
			for (var i = 0, ilen = cols.length; i < ilen; i++) {
				var c = cols[i];
				var width = '';
				var height = '';
				var cls = '';
				var display = '';
				if (typeof c.width != 'undefined') {
					width = 'width:' + c.width + 'px;';
				}
				if (typeof c.height != 'undefined') {
					height = 'width:' + c.height + 'px;';
				}
				if (typeof c.cls != 'undefined') {
					cls = c.cls;
				}
				if (typeof c.hidden != 'undefined' && c.hidden == true) {
					display = 'display:none;';
				}
				var value = d.data[c.dataIndex];
				//tb[tb.length] = "<div UseFor='cell' class='cell "+cls+"' uv='"+d.uniqueValue+"' style='"+width+height+display+"'>"+c.renderer.apply(this,[value,d,d,d.domIndex,i])+"</div>";
				tb[tb.length] = "<div usefor='cell' class='cell " + cls + "' gv='" + d.groupValue + "' uv='" + d.uniqueValue + "' style='" + width + height + display + "'";
				var uValue = [];
				for (var j = 0; j < c.updateField.length; j++) {
					var f = c.updateField[j];
					uValue[uValue.length] = d.data[f];
				}
				tb[tb.length] = " uf='" + c.updateField.join(',') + "' udv='" + uValue.join(',') + "'>";
				tb[tb.length] = c.renderer.apply(this, [value, d, d, d.domIndex, i]) + "</div>";
			}
			if (returnDom == true) {
				dom.innerHTML = tb.join('');
				return dom;
			} else {
				tb[tb.length] = "</div>";
				return tb.join('');
			}

		},
		_cell = function (d, returnDom) {},
		_group = function (d, returnDom) {
			var tb = [];
			if (returnDom == true) {
				var dom = document.createElement('div');
				dom.className = 'group';
				dom.setAttribute('usefor', 'group');
				dom.setAttribute('gv', d.groupValue);
				dom.setAttribute('uv', d.groupValue);
				dom.setAttribute('gc', d.groupCount);
			} else {
				tb[tb.length] = "<div usefor='group' class='group' gv='" + d.groupValue + "' uv='" + d.groupValue + "' gc='" + d.groupCount + "'>";
			}
			tb[tb.length] = opt.group.tpl.apply(this, [d.groupValue, d, d.domIndex]);

			if (returnDom == true) {
				dom.innerHTML = tb.join('');
				return dom;
			} else {
				tb[tb.length] = "</div>";
				return tb.join('');
			}
		},
		_foot = function (d, returnDom) {
			var tb = [];

			return tb.join('');
		},
		insertRow = function (dom, vdom, Drawer, opt) {
			var insertDom = Drawer.create(vdom, true);
			if (vdom.usefor == 'row')
				tmpInsert[tmpInsert.length] = insertDom;
			if (!dom) {
				opt.Grid.appendChild(insertDom);
			} else {
				opt.Grid.insertBefore(insertDom, dom);
			}
		},
		removeRow = function (dom, vdom, Drawer, opt) {
			dom.parentNode.removeChild(dom);
		},
		updateRow = function (dom, vdom, Drawer, opt, domIndex) {
			var cloned = Drawer.create(vdom, true);
			dom.parentNode.replaceChild(cloned, dom);
		}
		//比對 增刪修 演算法
	,
		match__ = function () {
			var a = ran(10);
			var b = ran(10);
			EZ.log('a=' + a);
			EZ.log('b=' + b);
			var rc = 0;
			var uc = 0;
			var ic = 0;
			var hash = {};
			for (var i = 0; i < b.length; i++) {
				hash[b[i]] = true;
			}
			//檢查remove
			var hasha = {};
			for (var i = a.length - 1; i >= 0; i--) {
				hasha[a[i]] = a[i];
				if (typeof hash[a[i]] == 'undefined') {
					a.splice(i, 1);
					rc++;
				}
			}
			EZ.log('a=' + a);
			//檢查 insert
			var tmp = {};
			for (var i = 0; i < b.length; i++) {
				//EZ.log(a[i]+' = '+b[i]);
				var log = i + ' ' + a[i] + ' = ' + b[i];
				if (typeof a[i] == 'undefined') {
					if (typeof tmp[b[i]] != 'undefined') {
						uc++;
						log += ' 從暫存區取回 ' + tmp[b[i]];
						a[a.length] = tmp[b[i]];
					} else {
						ic++;
						log += ' s0 append ' + b[i];
						a[a.length] = b[i];
					}
					log += ' | a = ' + a.join(',');
				} else if (a[i] == b[i]) {
					//update
					uc++;
					log += ' s1 update ' + b[i] + ' a = ' + a.join(',');
				} else if (typeof hasha[b[i]] == 'undefined') {
					//新的有 舊的沒有 新增
					ic++;
					log += ' s2 insert ' + i + ' => ' + b[i];
					a.splice(i, 0, b[i]);
					log += ' | a = ' + a.join(',');
				} else {
					//不會是移除 確認一下是不是新增 , 不是新增 則表示排序亂了 先暫存
					if (typeof tmp[b[i]] == 'undefined') {
						//站存到 tmp
						log += ' 暫存 ' + a[i];
						tmp[a[i]] = a[i];
						a.splice(i, 1);
						i--;
						log += ' | a = ' + a.join(',');
					} else {
						//從暫存釋放
						uc++;
						log += ' s4  從暫存區取回 ' + tmp[b[i]];
						a.splice(i, 0, tmp[b[i]]);
						log += ' | a = ' + a.join(',');
					}
				}
				EZ.log(log);
			}
			//多出來的 移除
			for (var i = a.length - 1; i > (b.length - 1); i--) {
				EZ.log('remove ' + a.length + ' ' + i);
				a.splice(i, 1);
			}
			EZ.log('a = ' + a);
			EZ.log('remove ' + rc + ' ,insert ' + ic + ' ,update ' + uc);
		},
		compare = function (nodes) {
			tmpRow = {};
			var _vdoms = _virtual.dom;
			//var insertRow = opt.update.insertRow;
			//var updateRow = opt.update.updateRow;
			for (var i = 0, ilen = _vdoms.length; i < ilen; i++) {
				var node = nodes[i];
				var _vdom = _vdoms[i];
				i = match(i, node, _vdom);
			}
			match_callback(nodes);
		}
		//一步一步做賽事比對用
	,
		_index = 0,
		tmpRow //暫存 dom
	,
		nextStep = function () {
			var _vdom = _virtual.dom[_index];
			if (typeof _vdom == 'undefined') {
				match_callback(DOM.grid.childNodes);
				_index = 0;
				return;
			}
			var node = DOM.grid.childNodes[_index];
			if (typeof node != 'undefined') {
				node.style.backgroundColor = 'green';
			}
			if (typeof DOM.grid.childNodes[(_index - 1)] != 'undefined') {
				DOM.grid.childNodes[(_index - 1)].style.backgroundColor = '#fff';
			}
			_index = match(_index, node, _vdom);
			_index++;
		},
		match = function (i, node, _vdom) {
			var logText = [];
			logText[logText.length] = "<font style='color:#6a5acd;'>" + i + ' : ';
			if (typeof node != 'undefined')
				logText[logText.length] = (node.getAttribute('usefor') + node.getAttribute('uv'));
			logText[logText.length] = ' _' + _vdom.usefor + _vdom.uniqueValue + "</font>";
			//EZ.log(logText.join(''));
			//EZ.log("<font style='color:#6a5acd;'>"+i+' : '+(node.getAttribute('usefor')+node.getAttribute('uv'))+' _'+_vdom.usefor+_vdom.uniqueValue+"</font>");
			if (typeof node != 'undefined' && node.getAttribute('usefor') != 'row' && node.getAttribute('usefor') != 'group') {
				EZ.log('continue ' + node.getAttribute('usefor') + ' ' + node.getAttribute('uv'));
			} else if (typeof node == 'undefined') {
				// node 走到盡頭
				if (typeof tmpRow[_vdom.usefor + _vdom.uniqueValue] == 'undefined') {
					//不在 tmpRow裡面 = > 新增
					//EZ.log(i+' u2 '+"<font color='red'>insert</font> "+(_vdom.usefor=='row' ? 'row '+_vdom.uniqueValue : 'group '+_vdom.groupValue));
					insertRow(node, _vdom, Drawer, opt);
					ic++;
				} else {
					//在 tmpRow裡面 把他從 tmp搬回去 畫面 ,然後走 update
					//EZ.log(i+' u3 update from tmp '+_vdom.usefor+' '+_vdom.uniqueValue);
					DOM.grid.appendChild(tmpRow[_vdom.usefor + _vdom.uniqueValue]);
					node = nodes[i];
					updateRow(node, _vdom, Drawer, opt, i);
					uc++;
					delete tmpRow[_vdom.usefor + _vdom.uniqueValue];
				}
			} else if (node.getAttribute('uv') == _vdom.uniqueValue) {
				//node == _vdom  => update
				//EZ.log(i+' u4 update '+node.getAttribute('usefor')+' '+node.getAttribute('uv'));
				updateRow(node, _vdom, Drawer, opt, i);
				uc++;
			} else if (typeof virtual.hash[_vdom.usefor + _vdom.uniqueValue] == 'undefined') {
				//新的有 舊的沒有 => 新增
				//EZ.log(i+" u5 <font color='red'>insert</font> "+_vdom.usefor+' '+_vdom.uniqueValue);
				insertRow(node, _vdom, Drawer, opt);
				ic++;
				//走到這邊 已經不可能是 新增 跟 移除了,但是虛擬row 又跟實際row 不一樣,只剩下一種可能 新舊排序改變
			} else if (typeof tmpRow[_vdom.usefor + _vdom.uniqueValue] == 'undefined') {
				//如果 tmpRow 裡面 找不到跟虛擬row相同的row , 把畫面上的row 先暫存到 tmpRow
				//EZ.log(i+" u6 tmp row "+node.getAttribute('usefor')+' '+node.getAttribute('uv'));
				tmpRow[node.getAttribute('usefor') + node.getAttribute('uv')] = node;
				DOM.grid.removeChild(node);
				i--;
			} else if (typeof tmpRow[_vdom.usefor + _vdom.uniqueValue] != 'undefined') {
				//如果tmpRow裡面有跟虛擬row相等的row  從tmpRow搬回去畫面=> 走update
				//EZ.log(i+" u7 update from tmp row "+_vdom.usefor+' '+_vdom.uniqueValue);
				DOM.grid.insertBefore(tmpRow[_vdom.usefor + _vdom.uniqueValue], node);
				node = nodes[i];
				updateRow(node, _vdom, Drawer, opt, i);
				uc++;
				delete tmpRow[_vdom.usefor + _vdom.uniqueValue];
			} else {
				//走到這邊表示有error
				//EZ.log(i+" u8 <font color='red'>error</font>");
			}
			return i;
		},
		match_callback = function (nodes) {
			var _vdoms = _virtual.dom;
			//多出來的 移除
			for (var i = nodes.length - 1; i > (_vdoms.length - 1); i--) {
				//EZ.log('err2 remove unnecessary rows');
				DOM.grid.removeChild(nodes[i]);
			}
			//log
			if (nodes.length != _vdoms.length) {
				//EZ.log("<font color='red'>err</font> "+_vdoms.length+' '+nodes.length+' rc='+rc+' uc='+uc+' ic='+ic);
			} else {
				//EZ.log("count "+_vdoms.length+' '+nodes.length+' rc='+rc+' uc='+uc+' ic='+ic);
			}
			virtual = _virtual;
			adjustGrid(DOM.grid);
		}
		//可以一步一步看的版本
	,
		update_bystep = function (ds) {
			//counter
			rc = 0,
			uc = 0,
			ic = 0;
			// 1.建 virtual dom
			_virtual = createVirtualDom(ds);
			// 2 比對 remove
			var nodes = DOM.grid.childNodes;
			log(_virtual.dom.length + ' = ' + nodes.length);
			var removeRow = opt.update.removeRow;
			//從後面走回來 移除
			for (var i = nodes.length - 1; i >= 0; i--) {
				var node = nodes[i];
				var usefor = node.getAttribute('usefor');
				if ((node.getAttribute('usefor') == 'row' || node.getAttribute('usefor') == 'group')
					 && typeof _virtual.hash[node.getAttribute('usefor') + node.getAttribute('uv')] == 'undefined') {
					//舊的有 新的沒有 remove
					EZ.log(i + " u1 <font color='green'>remove</font> " + node.getAttribute('usefor') + ' ' + node.getAttribute('uv'));
					removeRow(node);
					rc++;
				}
			}

			compare(nodes, _virtual);
			return;
			/*
			//3 比對 insert
			if(_virtual.dom.length == nodes.length){
			compare(nodes,_virtual);
			}else{
			//比對模式 走 nextStep
			tmpRow={};
			alert('stop '+_virtual.dom.length+ ' = '+ nodes.length);
			_index = 0;
			}
			 */
		}
		//重畫
	,
		draw = function (ds) {
			virtual = createVirtualDom(ds);
			var tb = _grid(ds, virtual);
			if (typeof opt.renderTo != 'undefined' && opt.renderTo != '' && opt.renderTo != null) {
				//tb[tb.length] = "<div usefor='clear' class='clear'></div>";
				opt.renderTo.innerHTML = tb.join('');

				//微調
				DOM.grid = document.getElementById(ID.grid);
				opt.Grid = DOM.grid;
				//click 事件
				if (DOM.grid.addEventListener) {
					DOM.grid.addEventListener('click', onclick);
				} else if (DOM.grid.attachEvent) {
					DOM.grid.attachEvent('onclick', onclick);
				}
				adjustGrid(DOM.grid);
				opt.event.onLoad.apply(this, [DOM.grid, ds, virtual, this, opt]);
			}
		}
		//更新
	,
		update = function (ds) {
			//counter
			var rc = 0,
			uc = 0,
			ic = 0;
			// 1.建 virtual dom
			var _virtual = createVirtualDom(ds);
			// 2 比對 remove
			var nodes = DOM.grid.childNodes;
			//EZ.log('new '+_virtual.dom.length +' = old ' + nodes.length);
			var insertRow = opt.update.insertRow;
			var updateRow = opt.update.updateRow;
			var removeRow = opt.update.removeRow;
			//從後面走回來 移除
			for (var i = nodes.length - 1; i >= 0; i--) {
				var node = nodes[i];
				var usefor = node.getAttribute('usefor');
				if ((node.getAttribute('usefor') == 'row' || node.getAttribute('usefor') == 'group')
					 && typeof _virtual.hash[node.getAttribute('usefor') + node.getAttribute('uv')] == 'undefined') {
					//舊的有 新的沒有 remove
					//EZ.log(i+" u1 <font color='green'>remove</font> "+node.getAttribute('usefor') + ' ' +node.getAttribute('uv'));
					removeRow(node, null, Drawer, opt);
					rc++;
				}
			}
			//3 比對 insert
			var tmpRow = {}; //暫存 dom
			var _vdoms = _virtual.dom;
			for (var i = 0, ilen = _vdoms.length; i < ilen; i++) {
				var node = nodes[i];
				var _vdom = _vdoms[i];
				var logText = [];
				//logText[logText.length] = "<font style='color:#6a5acd;'>"+i+' : ';
				//if(typeof node != 'undefined') logText[logText.length] = (node.getAttribute('usefor')+node.getAttribute('uv'));
				//logText[logText.length] = ' _'+_vdom.usefor+_vdom.uniqueValue+"</font>";
				//EZ.log(logText.join(''));
				//EZ.log("<font style='color:#6a5acd;'>"+i+' : '+(node.getAttribute('usefor')+node.getAttribute('uv'))+' _'+_vdom.usefor+_vdom.uniqueValue+"</font>");
				if (typeof node != 'undefined' && node.getAttribute('usefor') != 'row' && node.getAttribute('usefor') != 'group') {
					//EZ.log('continue '+node.getAttribute('usefor')+' '+node.getAttribute('uv') );
				} else if (typeof node == 'undefined') {
					// node 走到盡頭
					if (typeof tmpRow[_vdom.usefor + _vdom.uniqueValue] == 'undefined') {
						//不在 tmpRow裡面 = > 新增
						//EZ.log(i+' u2 '+"<font color='red'>insert</font> "+(_vdom.usefor=='row' ? 'row '+_vdom.uniqueValue : 'group '+_vdom.groupValue));
						insertRow(node, _vdom, Drawer, opt);
						ic++;
					} else {
						//在 tmpRow裡面 把他從 tmp搬回去 畫面 ,然後走 update
						//EZ.log(i+' u3 update from tmp '+_vdom.usefor+' '+_vdom.uniqueValue);
						DOM.grid.appendChild(tmpRow[_vdom.usefor + _vdom.uniqueValue]);
						node = nodes[i];
						updateRow(node, _vdom, Drawer, opt, i);
						uc++;
						delete tmpRow[_vdom.usefor + _vdom.uniqueValue];
					}
				} else if (node.getAttribute('uv') == _vdom.uniqueValue) {
					//node == _vdom  => update
					//EZ.log(i+' u4 update '+node.getAttribute('usefor')+' '+node.getAttribute('uv'));
					updateRow(node, _vdom, Drawer, opt, i);
					uc++;
				} else if (typeof virtual.hash[_vdom.usefor + _vdom.uniqueValue] == 'undefined') {
					//新的有 舊的沒有 => 新增
					//EZ.log(i+" u5 <font color='red'>insert</font> "+_vdom.usefor+' '+_vdom.uniqueValue);
					insertRow(node, _vdom, Drawer, opt);
					ic++;
					//走到這邊 已經不可能是 新增 跟 移除了,但是虛擬row 又跟實際row 不一樣,只剩下一種可能 新舊排序改變
				} else if (typeof tmpRow[_vdom.usefor + _vdom.uniqueValue] == 'undefined') {
					//如果 tmpRow 裡面 找不到跟虛擬row相同的row , 把畫面上的row 先暫存到 tmpRow
					//EZ.log(i+" u6 tmp row "+node.getAttribute('usefor')+' '+node.getAttribute('uv'));
					tmpRow[node.getAttribute('usefor') + node.getAttribute('uv')] = node;
					DOM.grid.removeChild(node);
					i--;
				} else if (typeof tmpRow[_vdom.usefor + _vdom.uniqueValue] != 'undefined') {
					//如果tmpRow裡面有跟虛擬row相等的row  從tmpRow搬回去畫面=> 走update
					//EZ.log(i+" u7 update from tmp row "+_vdom.usefor+' '+_vdom.uniqueValue);
					DOM.grid.insertBefore(tmpRow[_vdom.usefor + _vdom.uniqueValue], node);
					node = nodes[i];
					updateRow(node, _vdom, Drawer, opt, i);
					uc++;
					delete tmpRow[_vdom.usefor + _vdom.uniqueValue];
				} else {
					//走到這邊表示有error
					//EZ.log(i+" u8 <font color='red'>error</font>");
				}
			}
			//多出來的 移除 只要unique 有確實 可以不用走這段
			//for(var i=nodes.length-1 ; i>(_vdoms.length-1);i--)
			//{
			//EZ.log('err2 remove unnecessary rows');
			//DOM.grid.removeChild(nodes[i]);
			//}
			//log
			if (nodes.length != _vdoms.length) {
				//EZ.log("<font color='red'>err</font> "+_vdoms.length+' '+nodes.length+' rc='+rc+' uc='+uc+' ic='+ic);
			} else {
				//EZ.log("count "+_vdoms.length+' '+nodes.length+' rc='+rc+' uc='+uc+' ic='+ic);
			}
			virtual = _virtual;
			adjustGrid(DOM.grid);
			opt.event.onLoad.apply(this, [DOM.grid, ds, virtual, this, opt]);
		},
		Self = {
			//第一次畫畫面
			draw : draw
			//更新
		,
			update : update,
			create : create,
			click : function (fn) {
				click = fn;
			},
			Sorter : Sorter,
			insertRow : insertRow,
			updateRow : updateRow,
			removeRow : removeRow,
			virtual : function () {
				return virtual;
			},
			nextStep : nextStep,
			DOM : function () {
				return DOM;
			}
		};
		return Self;
	}
	(),
	update = function (ds, o) {
		if (typeof ds == 'undefined'
			 || typeof opt.update.unique == 'undefined'
			 || opt.update.unique == '')
			return;
		if (typeof o != 'undefined')
			option(o);
		ds = Drawer.Sorter.sort(ds);
		opt.data = ds;
		//opt.backup = opt.data;
		//opt.data = ds;
		//log('更新開始',true);
		Drawer.update(ds);
		//opt.event.onLoad.apply(this,[Drawer.DOM().grid,ds,Drawer.virtual,Drawer,opt]);
		//log('更新結束');
	},
	Self = {
		show : function (ds, o) {
			if (typeof o != 'undefined')
				option(o);
			ds = Drawer.Sorter.sort(ds);
			opt.data = ds;
			Drawer.draw(ds);
			//opt.event.onLoad.apply(this,[Drawer.DOM().grid,ds,Drawer.virtual,Drawer,opt]);
		},
		update : update,
		option : option,
		click : function (fn) {
			Drawer.click(fn);
		},
		Data : opt.dataHash,
		data : function () {
			return opt.data;
		},
		opt : function () {
			return opt;
		},
		showVir : Drawer.virtual,
		nextStep : function () {
			Drawer.nextStep();
		}
	};
	initialize(o);
	option(o);
	return Self;
}
if (typeof console == 'undefined') {
	console = {
		log : function () {},
		trace : function () {}
	}
}

var _onresize = new function () {
	var _e = [];
	this.add = function (func) {
		_e.push(func);
	};
	this.events = function () {
		for (var i = 0; i < _e.length; i++) {
			_e[i].call();
		}
	};
	this.clearEvents = function () {
		_e = [];
	};
}();

if(typeof navigator != 'undefined' && navigator.userAgent && navigator.userAgent.indexOf('MSIE 10') != -1){
//IE 10
	(function(a,w){function f(a){p[p.length]=a}function m(a){q.className=q.className.replace(RegExp("\\b"+a+"\\b"),"")}function k(a,d){for(var b=0,c=a.length;b<c;b++)d.call(a,a[b],b)}function s(){q.className=q.className.replace(/ (w-|eq-|gt-|gte-|lt-|lte-|portrait|no-portrait|landscape|no-landscape)\d+/g,"");var b=a.innerWidth||q.clientWidth,d=a.outerWidth||a.screen.width;h.screen.innerWidth=b;h.screen.outerWidth=d;f("w-"+b);k(c.screens,function(a){b>a?(c.screensCss.gt&&f("gt-"+a),c.screensCss.gte&&f("gte-"+
a)):b<a?(c.screensCss.lt&&f("lt-"+a),c.screensCss.lte&&f("lte-"+a)):b===a&&(c.screensCss.lte&&f("lte-"+a),c.screensCss.eq&&f("e-q"+a),c.screensCss.gte&&f("gte-"+a))});var d=a.innerHeight||q.clientHeight,g=a.outerHeight||a.screen.height;h.screen.innerHeight=d;h.screen.outerHeight=g;h.feature("portrait",d>b);h.feature("landscape",d<b)}function r(){a.clearTimeout(u);u=a.setTimeout(s,100)}var n=a.document,g=a.navigator,t=a.location,q=n.documentElement,p=[],c={screens:[240,320,480,640,768,800,1024,1280,
1440,1680,1920],screensCss:{gt:!0,gte:!1,lt:!0,lte:!1,eq:!1},browsers:[{ie:{min:6,max:10}}],browserCss:{gt:!0,gte:!1,lt:!0,lte:!1,eq:!0},section:"-section",page:"-page",head:"head"};if(a.head_conf)for(var b in a.head_conf)a.head_conf[b]!==w&&(c[b]=a.head_conf[b]);var h=a[c.head]=function(){h.ready.apply(null,arguments)};h.feature=function(a,b,c){if(!a)return q.className+=" "+p.join(" "),p=[],h;"[object Function]"===Object.prototype.toString.call(b)&&(b=b.call());f((b?"":"no-")+a);h[a]=!!b;c||(m("no-"+
a),m(a),h.feature());return h};h.feature("js",!0);b=g.userAgent.toLowerCase();g=/mobile|midp/.test(b);h.feature("mobile",g,!0);h.feature("desktop",!g,!0);b=/(chrome|firefox)[ \/]([\w.]+)/.exec(b)||/(iphone|ipad|ipod)(?:.*version)?[ \/]([\w.]+)/.exec(b)||/(android)(?:.*version)?[ \/]([\w.]+)/.exec(b)||/(webkit|opera)(?:.*version)?[ \/]([\w.]+)/.exec(b)||/(msie) ([\w.]+)/.exec(b)||[];g=b[1];b=parseFloat(b[2]);switch(g){case "msie":g="ie";b=n.documentMode||b;break;case "firefox":g="ff";break;case "ipod":case "ipad":case "iphone":g=
"ios";break;case "webkit":g="safari"}h.browser={name:g,version:b};h.browser[g]=!0;for(var v=0,x=c.browsers.length;v<x;v++)for(var i in c.browsers[v])if(g===i){f(i);for(var A=c.browsers[v][i].max,l=c.browsers[v][i].min;l<=A;l++)b>l?(c.browserCss.gt&&f("gt-"+i+l),c.browserCss.gte&&f("gte-"+i+l)):b<l?(c.browserCss.lt&&f("lt-"+i+l),c.browserCss.lte&&f("lte-"+i+l)):b===l&&(c.browserCss.lte&&f("lte-"+i+l),c.browserCss.eq&&f("eq-"+i+l),c.browserCss.gte&&f("gte-"+i+l))}else f("no-"+i);"ie"===g&&9>b&&k("abbr article aside audio canvas details figcaption figure footer header hgroup mark meter nav output progress section summary time video".split(" "),
function(a){n.createElement(a)});k(t.pathname.split("/"),function(a,b){if(2<this.length&&this[b+1]!==w)b&&f(this.slice(1,b+1).join("-").toLowerCase()+c.section);else{var g=a||"index",h=g.indexOf(".");0<h&&(g=g.substring(0,h));q.id=g.toLowerCase()+c.page;b||f("root"+c.section)}});h.screen={height:a.screen.height,width:a.screen.width};s();var u=0;a.addEventListener?a.addEventListener("resize",r,!1):a.attachEvent("onresize",r)})(window);
(function(a,w){function f(a){var f=a.charAt(0).toUpperCase()+a.substr(1),a=(a+" "+r.join(f+" ")+f).split(" "),c;a:{for(c in a)if(k[a[c]]!==w){c=!0;break a}c=!1}return!!c}var m=a.document.createElement("i"),k=m.style,s=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),r=["Webkit","Moz","O","ms","Khtml"],n=a[a.head_conf&&a.head_conf.head||"head"],g={gradient:function(){k.cssText=("background-image:"+s.join("gradient(linear,left top,right bottom,from(#9f9),to(#fff));background-image:")+s.join("linear-gradient(left top,#eee,#fff);background-image:")).slice(0,
-17);return!!k.backgroundImage},rgba:function(){k.cssText="background-color:rgba(0,0,0,0.5)";return!!k.backgroundColor},opacity:function(){return""===m.style.opacity},textshadow:function(){return""===k.textShadow},multiplebgs:function(){k.cssText="background:url(//:),url(//:),red url(//:)";return/(url\s*\(.*?){3}/.test(k.background)},boxshadow:function(){return f("boxShadow")},borderimage:function(){return f("borderImage")},borderradius:function(){return f("borderRadius")},cssreflections:function(){return f("boxReflect")},
csstransforms:function(){return f("transform")},csstransitions:function(){return f("transition")},touch:function(){return"ontouchstart"in a},retina:function(){return 1<a.devicePixelRatio},fontface:function(){var a=n.browser.version;switch(n.browser.name){case "ie":return 9<=a;case "chrome":return 13<=a;case "ff":return 6<=a;case "ios":return 5<=a;case "android":return!1;case "webkit":return 5.1<=a;case "opera":return 10<=a;default:return!1}}},t;for(t in g)g[t]&&n.feature(t,g[t].call(),!0);n.feature()})(window);
(function(a,w){function f(){}function m(j,a){if(j){"object"===typeof j&&(j=[].slice.call(j));for(var b=0,c=j.length;b<c;b++)a.call(j,j[b],b)}}function k(a,b){var e=Object.prototype.toString.call(b).slice(8,-1);return b!==w&&null!==b&&e===a}function s(a){return k("Function",a)}function r(a){a=a||f;a._done||(a(),a._done=1)}function n(a){var b={};if("object"===typeof a)for(var e in a)a[e]&&(b={name:e,url:a[e]});else b=a.split("/"),b=b[b.length-1],e=b.indexOf("?"),b={name:-1!==e?b.substring(0,e):b,url:a};
return(a=i[b.name])&&a.url===b.url?a:i[b.name]=b}function g(a){var a=a||i,b;for(b in a)if(a.hasOwnProperty(b)&&a[b].state!==y)return!1;return!0}function t(a,b){b=b||f;a.state===y?b():a.state===D?d.ready(a.name,b):a.state===C?a.onpreload.push(function(){t(a,b)}):(a.state=D,q(a,function(){a.state=y;b();m(x[a.name],function(a){r(a)});u&&g()&&m(x.ALL,function(a){r(a)})}))}function q(j,c){var c=c||f,e;/\.css[^\.]*$/.test(j.url)?(e=b.createElement("link"),e.type="text/"+(j.type||"css"),e.rel="stylesheet",
e.href=j.url):(e=b.createElement("script"),e.type="text/"+(j.type||"javascript"),e.src=j.url);e.onload=e.onreadystatechange=function(j){j=j||a.event;if("load"===j.type||/loaded|complete/.test(e.readyState)&&(!b.documentMode||9>b.documentMode))e.onload=e.onreadystatechange=e.onerror=null,c()};e.onerror=function(){e.onload=e.onreadystatechange=e.onerror=null;c()};e.async=!1;e.defer=!1;var d=b.head||b.getElementsByTagName("head")[0];d.insertBefore(e,d.lastChild)}function p(){b.body?u||(u=!0,m(h,function(a){r(a)})):
(a.clearTimeout(d.readyTimeout),d.readyTimeout=a.setTimeout(p,50))}function c(){b.addEventListener?(b.removeEventListener("DOMContentLoaded",c,!1),p()):"complete"===b.readyState&&(b.detachEvent("onreadystatechange",c),p())}var b=a.document,h=[],v=[],x={},i={},A="async"in b.createElement("script")||"MozAppearance"in b.documentElement.style||a.opera,l,u,B=a.head_conf&&a.head_conf.head||"head",d=a[B]=a[B]||function(){d.ready.apply(null,arguments)},C=1,D=3,y=4;d.load=A?function(){var a=arguments,b=a[a.length-
1],e={};s(b)||(b=null);m(a,function(c,d){c!==b&&(c=n(c),e[c.name]=c,t(c,b&&d===a.length-2?function(){g(e)&&r(b)}:null))});return d}:function(){var a=arguments,b=[].slice.call(a,1),c=b[0];if(!l)return v.push(function(){d.load.apply(null,a)}),d;c?(m(b,function(a){if(!s(a)){var b=n(a);b.state===w&&(b.state=C,b.onpreload=[],q({url:b.url,type:"cache"},function(){b.state=2;m(b.onpreload,function(a){a.call()})}))}}),t(n(a[0]),s(c)?c:function(){d.load.apply(null,b)})):t(n(a[0]));return d};d.js=d.load;d.test=
function(a,b,c,g){a="object"===typeof a?a:{test:a,success:b?k("Array",b)?b:[b]:!1,failure:c?k("Array",c)?c:[c]:!1,callback:g||f};(b=!!a.test)&&a.success?(a.success.push(a.callback),d.load.apply(null,a.success)):!b&&a.failure?(a.failure.push(a.callback),d.load.apply(null,a.failure)):g();return d};d.ready=function(a,c){if(a===b)return u?r(c):h.push(c),d;s(a)&&(c=a,a="ALL");if("string"!==typeof a||!s(c))return d;var e=i[a];if(e&&e.state===y||"ALL"===a&&g()&&u)return r(c),d;(e=x[a])?e.push(c):x[a]=[c];
return d};d.ready(b,function(){g()&&m(x.ALL,function(a){r(a)});d.feature&&d.feature("domloaded",!0)});if("complete"===b.readyState)p();else if(b.addEventListener)b.addEventListener("DOMContentLoaded",c,!1),a.addEventListener("load",p,!1);else{b.attachEvent("onreadystatechange",c);a.attachEvent("onload",p);var z=!1;try{z=null==a.frameElement&&b.documentElement}catch(F){}z&&z.doScroll&&function E(){if(!u){try{z.doScroll("left")}catch(b){a.clearTimeout(d.readyTimeout);d.readyTimeout=a.setTimeout(E,50);
return}p()}}()}setTimeout(function(){l=!0;m(v,function(a){a()})},300)})(window);

var EZ = head;

}else{
	(function(a){function l(){var a=window.outerWidth||b.clientWidth;b.className=b.className.replace(/ (w|lt)-\d+/g,""),f("w-"+Math.round(a/100)*100),h(c.screens,function(b){a<=b&&f("lt-"+b)}),i.feature()}function h(a,b){for(var c=0,d=a.length;c<d;c++)b.call(a,a[c],c)}function g(a){var c=new RegExp("\\b"+a+"\\b");b.className=b.className.replace(c,"")}function f(a){d[d.length]=a}var b=a.documentElement,c={screens:[320,480,640,768,1024,1280,1440,1680,1920],section:"-section",page:"-page",head:"EZ"},d=[];if(window.head_conf)for(var e in head_conf)head_conf[e]!==undefined&&(c[e]=head_conf[e]);var i=window[c.head]=function(){i.ready.apply(null,arguments)};i.feature=function(a,c,e){if(!a)b.className+=" "+d.join(" "),d=[];else{Object.prototype.toString.call(c)=="[object Function]"&&(c=c.call()),f((c?"":"no-")+a),i[a]=!!c,e||(g("no-"+a),g(a),i.feature());return i}};var j=navigator.userAgent.toLowerCase();j=/(webkit)[ \/]([\w.]+)/.exec(j)||/(opera)(?:.*version)?[ \/]([\w.]+)/.exec(j)||/(msie) ([\w.]+)/.exec(j)||!/compatible/.test(j)&&/(mozilla)(?:.*? rv:([\w.]+))?/.exec(j)||[],j[1]=="msie"&&(j[1]="ie",j[2]=document.documentMode||j[2]),f(j[1]),i.browser={version:j[2]},i.browser[j[1]]=!0;if(i.browser.ie){f("ie"+parseFloat(j[2]));for(var k=3;k<11;k++)parseFloat(j[2])<k&&f("lt-ie"+k);h("abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video".split("|"),function(b){a.createElement(b)})}h(location.pathname.split("/"),function(a,d){if(this.length>2&&this[d+1]!==undefined)d&&f(this.slice(1,d+1).join("-")+c.section);else{var e=a||"index",g=e.indexOf(".");g>0&&(e=e.substring(0,g)),b.id=e+c.page,d||f("root"+c.section)}}),l(),window.onresize=l,i.feature("js",!0).feature()})(document),function(){function h(a){var b=a.charAt(0).toUpperCase()+a.substr(1),c=(a+" "+d.join(b+" ")+b).split(" ");return!!g(c)}function g(a){for(var c in a)if(b[a[c]]!==undefined)return!0}var a=document.createElement("i"),b=a.style,c=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),d="Webkit Moz O ms Khtml".split(" "),e=window.head_conf&&head_conf.head||"EZ",f=window[e],i={gradient:function(){var a="background-image:",d="gradient(linear,left top,right bottom,from(#9f9),to(#fff));",e="linear-gradient(left top,#eee,#fff);";b.cssText=(a+c.join(d+a)+c.join(e+a)).slice(0,-a.length);return!!b.backgroundImage},rgba:function(){b.cssText="background-color:rgba(0,0,0,0.5)";return!!b.backgroundColor},opacity:function(){return a.style.opacity===""},textshadow:function(){return b.textShadow===""},multiplebgs:function(){b.cssText="background:url(//:),url(//:),red url(//:)";return(new RegExp("(url\\s*\\(.*?){3}")).test(b.background)},boxshadow:function(){return h("boxShadow")},borderimage:function(){return h("borderImage")},borderradius:function(){return h("borderRadius")},cssreflections:function(){return h("boxReflect")},csstransforms:function(){return h("transform")},csstransitions:function(){return h("transition")},fontface:function(){var a=navigator.userAgent,b;if(0)return!0;if(b=a.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/))return b[1]>="4.0.249.4"||1*b[1].split(".")[0]>5;if((b=a.match(/Safari\/(\d+\.\d+)/))&&!/iPhone/.test(a))return b[1]>="525.13";if(/Opera/.test({}.toString.call(window.opera)))return opera.version()>="10.00";if(b=a.match(/rv:(\d+\.\d+\.\d+)[^b].*Gecko\//))return b[1]>="1.9.1";return!1}};for(var j in i)i[j]&&f.feature(j,i[j].call(),!0);f.feature()}(),function(a){function z(){d||(d=!0,s(e,function(a){p(a)}))}function y(c,d){var e=a.createElement("script");e.type="text/"+(c.type||"javascript"),e.src=c.src||c,e.async=!1,e.onreadystatechange=e.onload=function(){var a=e.readyState;!d.done&&(!a||/loaded|complete/.test(a))&&(d.done=!0,d())},(a.body||b).appendChild(e)}function x(a,b){if(a.state==o)return b&&b();if(a.state==n)return k.ready(a.name,b);if(a.state==m)return a.onpreload.push(function(){x(a,b)});a.state=n,y(a.url,function(){a.state=o,b&&b(),s(g[a.name],function(a){p(a)}),u()&&d&&s(g.ALL,function(a){p(a)})})}function w(a,b){a.state===undefined&&(a.state=m,a.onpreload=[],y({src:a.url,type:"cache"},function(){v(a)}))}function v(a){a.state=l,s(a.onpreload,function(a){a.call()})}function u(a){a=a||h;var b;for(var c in a){if(a.hasOwnProperty(c)&&a[c].state!=o)return!1;b=!0}return b}function t(a){return Object.prototype.toString.call(a)=="[object Function]"}function s(a,b){if(!!a){typeof a=="object"&&(a=[].slice.call(a));for(var c=0;c<a.length;c++)b.call(a,a[c],c)}}function r(a){var b;if(typeof a=="object")for(var c in a)a[c]&&(b={name:c,url:a[c]});else b={name:q(a),url:a};var d=h[b.name];if(d&&d.url===b.url)return d;h[b.name]=b;return b}function q(a){var b=a.split("/"),c=b[b.length-1],d=c.indexOf("?");return d!=-1?c.substring(0,d):c}function p(a){a._done||(a(),a._done=1)}var b=a.documentElement,c,d,e=[],f=[],g={},h={},i=a.createElement("script").async===!0||"MozAppearance"in a.documentElement.style||window.opera,j=window.head_conf&&head_conf.head||"EZ",k=window[j]=window[j]||function(){k.ready.apply(null,arguments)},l=1,m=2,n=3,o=4;i?k.js=function(){var a=arguments,b=a[a.length-1],c={};t(b)||(b=null),s(a,function(d,e){d!=b&&(d=r(d),c[d.name]=d,x(d,b&&e==a.length-2?function(){u(c)&&p(b)}:null))});return k}:k.js=function(){var a=arguments,b=[].slice.call(a,1),d=b[0];if(!c){f.push(function(){k.js.apply(null,a)});return k}d?(s(b,function(a){t(a)||w(r(a))}),x(r(a[0]),t(d)?d:function(){k.js.apply(null,b)})):x(r(a[0]));return k},k.ready=function(b,c){if(b==a){d?p(c):e.push(c);return k}t(b)&&(c=b,b="ALL");if(typeof b!="string"||!t(c))return k;var f=h[b];if(f&&f.state==o||b=="ALL"&&u()&&d){p(c);return k}var i=g[b];i?i.push(c):i=g[b]=[c];return k},k.ready(a,function(){u()&&s(g.ALL,function(a){p(a)}),k.feature&&k.feature("domloaded",!0)});if(window.addEventListener)a.addEventListener("DOMContentLoaded",z,!1),window.addEventListener("load",z,!1);else if(window.attachEvent){a.attachEvent("onreadystatechange",function(){a.readyState==="complete"&&z()});var A=1;try{A=window.frameElement}catch(B){}!A&&b.doScroll&&function(){try{b.doScroll("left"),z()}catch(a){setTimeout(arguments.callee,1);return}}(),window.attachEvent("onload",z)}!a.readyState&&a.addEventListener&&(a.readyState="loading",a.addEventListener("DOMContentLoaded",handler=function(){a.removeEventListener("DOMContentLoaded",handler,!1),a.readyState="complete"},!1)),setTimeout(function(){c=!0,s(f,function(a){a()})},300)}(document)
}

EZ.width = 0;
EZ.height = 0;
EZ.scrW = 0;
EZ.scrH = 0;
EZ.connects = 0;
EZ.countID = 1;
EZ.objects = {};
EZ.classes = {};
//語系
EZ.language = new function () {
	var StrVar = {};
	StrVar["zh-tw"] = {};
	StrVar["zh-cn"] = {};
	StrVar["en-us"] = {};
	StrVar["ja-jp"] = {};
	var _langx;

	var Self = {
		get : function (text, l) {
			if (!text)
				return '';
			if (!l) {
				if (typeof _langx == 'undefined') {
					l = (typeof langx == 'undefined' || langx == null) ? 'zh-tw' : langx;
				} else {
					l = _langx;
				}
			}
			if (!StrVar[l])
				return text;
			var newtext = StrVar[l][text];
			return newtext ? newtext : text;
		},
		set : function (l, key, text) {
			StrVar[l][key] = text;
		},
		setLang : function (l) {
			_langx = l;
		},
		getLang : function () {
			return _langx;
		}
	}
	return Self;
}
();
//語系快取
EZ.lang = EZ.language.get;
EZ._GET = function () {
	if (document.location.toString().indexOf('?') == -1) {
		return {};
	}
	var _get = {};
	var t = document.location.toString().split('?');
	var t2 = t[1].split('&');
	for (var i = 0; i < t2.length; i++) {
		var t3 = t2[i].split('=');
		_get[t3[0]] = t3[1];
	}
	return _get;
}
();
//example EZ.StringFormat("{0},{1},{2}",1,2,3)
EZ.StringFormat = new function (arguments) {
	var ____toArray = function (e,F,E) {return Array.prototype.slice.call(e,F||0,E||e.length);}
	var Self =  function(format){var args = ____toArray(arguments, 1);return format.replace(/\{(\d+)\}/g, function(m, i){return args[i];});}
	return Self;
}
(); 


EZ.show = function (ArrayData, type) {
	var _t = '';
	for (var key in ArrayData) {
		if (typeof type == 'undefined') {
			_t += key + ' = ' + ArrayData[key] + "\n";
		} else {
			_t += key + ' = ' + ArrayData[key] + "<br />";
		}
	}
	if (typeof type == 'undefined') {
		alert(_t);
	} else {
		var aa = window.open();
		aa.document.write(_t);
	}
};
EZ.round = function (num, digit) {
	var x = 1;
	if (digit) {
		x = Math.pow(10, digit);
	}
	//alert(num+' '+digit);alert(Math.round(num*x)/x);
	return Math.round(num * x) / x;
};
EZ.innerHTML = function (dom, html) {
	if (!dom) {
		alert("DOM is null in EZ.innerHTML");
		return;
	}
	var cloned = dom.cloneNode(true);
	cloned.innerHTML = html;
	dom.parentNode.replaceChild(cloned, dom);
};
EZ.delegate = function (func, arg, parent) { //function , 參數 , 誰call此function
	return function () {
		func.apply(parent, arg)
	}
};
EZ.getScreenSize = function () {
	if (typeof(window.innerWidth) == 'number') {
		//Non-IE
		this.width = window.innerWidth;
		this.height = window.innerHeight;
	} else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
		//IE 6+ in 'standards compliant mode'
		this.width = document.documentElement.clientWidth;
		this.height = document.documentElement.clientHeight;
	} else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
		//IE 4 compatible
		this.width = document.body.clientWidth;
		this.height = document.body.clientHeight;
	}
};
EZ.getInnerSize = function () {
	if (typeof(window.pageYOffset) == 'number') {
		//Netscape compliant
		this.scrH = window.pageYOffset;
		this.scrW = window.pageXOffset;
	} else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
		//DOM compliant
		this.scrH = document.body.scrollTop;
		this.scrW = document.body.scrollLeft;
	} else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
		//IE6 standards compliant mode
		this.scrH = document.documentElement.scrollTop;
		this.scrW = document.documentElement.scrollLeft;
	}
};
EZ.insertAfter = function (newEl, targetEl) {
	var parentEl = targetEl.parentNode;

	if (parentEl.lastChild == targetEl) {
		parentEl.appendChild(newEl);
	} else {
		parentEl.insertBefore(newEl, targetEl.nextSibling);
	}
}
EZ._debug = new function () {
	//var debug = false;
	var errordata = new Array();
	this.show = function (msg) {
		if (msg != null)
			errordata.push(msg);
		if (typeof debug != 'undefined' && debug == true) {
			if (msg != null) {
				alert(msg);
			} else {
				alert(errordata.join("\n"));
			}
		}
	};
	this.on = function () {
		debug = true;
	};
	this.off = function () {
		debug = false;
	};
	this.push = function (msg) {
		if (debug == true) {
			errordata.push(msg);
		}
	};
}
();
EZ.debug = EZ._debug.show;
EZ.random = function (min, max) {
	return Math.round(Math.random() * (max - min) + min);
};
EZ.randomx = function () {
	var maxNum = 10000;
	var minNum = 1;
	var n = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
	var t = new Date().getTime();
	return n + '' + t;
};
EZ.id = function () {
	var id = EZ.countID;
	EZ.countID++;
	return 'EZ_' + id;
};
EZ.htmlWrite = function (text) {
	document.open();
	document.write(this.lang(text));
	document.close();
};
EZ.in_array = function (find, myArray) {
	if (myArray.length == 0)
		return false;
	for (var i = 0; i < myArray.length; i++) {
		//alert(myArray[i]+ ' | ' +find);
		if (myArray[i] == find)
			return true;
	}
	return false;
};
EZ.in_object = function (find, myArray) {
	if (EZ.is_object(myArray) == false)return false;
	return EZ.in_array(find,Object.keys(myArray));
};
// 自動左邊補0
EZ.padLeft = function (str, lenght) {
	if (typeof(str) == 'number') {
		str = str.toString();
	}
	if (str.length >= lenght)
		return str;
	else
		return this.padLeft("0" + str, lenght);
};
//自動右邊補0
EZ.padRight = function (str, lenght) {
	if (typeof(str) == 'number') {
		str = str.toString();
	}
	if (str.length >= lenght)
		return str;
	else
		return this.padRight(str + "0", lenght);
};
//sleep delay 輸入1=1秒
EZ.sleep = function( ms ){
	if(Number(ms)<0.5){ms=500;//最低秒數不能少於500毫秒
	}else{ms*=1000;}
	var tt= new Date().getTime();
	do{}while((new Date().getTime()-tt)<ms)
}
//url encode
EZ.UrlEncode = function (string) {
	string = string.replace(/\r\n/g, "\n");
	var utftext = "";
	for (var n = 0; n < string.length; n++) {
		var c = string.charCodeAt(n);
		if (c < 128) {
			utftext += String.fromCharCode(c);
		} else if ((c > 127) && (c < 2048)) {
			utftext += String.fromCharCode((c >> 6) | 192);
			utftext += String.fromCharCode((c & 63) | 128);
		} else {
			utftext += String.fromCharCode((c >> 12) | 224);
			utftext += String.fromCharCode(((c >> 6) & 63) | 128);
			utftext += String.fromCharCode((c & 63) | 128);
		}
	}
	return utftext;
};
EZ.UrlDecode = function (utftext) {
	utftext = unescape(unescape);
	var string = "";
	var i = 0;
	var c = c1 = c2 = 0;
	while (i < utftext.length) {
		c = utftext.charCodeAt(i);
		if (c < 128) {
			string += String.fromCharCode(c);
			i++;
		} else if ((c > 191) && (c < 224)) {
			c2 = utftext.charCodeAt(i + 1);
			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
			i += 2;
		} else {
			c2 = utftext.charCodeAt(i + 1);
			c3 = utftext.charCodeAt(i + 2);
			string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}
	}
	return string;
};
EZ.getSendString = function (aryAjax) {
	var strJSON,
	strReturn;
	strJSON = this.proAryToJSON(aryAjax);
	//strReturn = encodeURI(strJSON);
	return strJSON;
};
EZ.proAryToJSON = function (ary) {
	//this.show(ary);
	//alert(Ext.util.JSON.encode(ary));

	var parts = [];
	var is_list = (Object.prototype.toString.apply(ary) === '[object Array]');

	for (var key in ary) {
		if (key == "indexOf" || key == "remove")
			continue;
		var value = ary[key];
		if (typeof(value) == "object") {
			if (is_list) {
				if (typeof(key) != 'number') {
					parts.push('"' + key + '":' + this.proAryToJSON(value));
				} else {
					parts.push('[' + this.proAryToJSON(value) + ']');
				}
			} else {
				parts[key] = this.proAryToJSON(value);
			}
		} else {
			var str = "";

			var ktype = typeof(key);
			if (ktype != 'number') {
				str = '"' + key + '":';
			}

			var vtype = typeof(value);
			switch (vtype) {
			case 'number':
				str += value;
				break;
			case 'boolean':
				str += value.toString();
				break;
			default:
				str += '"' + value + '"';
				break;
			}

			parts.push(str);
		}
	}
	var json = parts.join(",");
	return '{' + json + '}';
};
EZ.ezTimeout = function (callback, timeout, param) {
	var args = Array.prototype.slice.call(arguments, 2);
	var _cb = function () {
		callback.apply(null, args);
	}
	setTimeout(_cb, timeout);
};
// 物件的座標
EZ.posX = function (objID) {
	var elmt = document.getElementById(objID);
	var x = 0;
	//繞行 offsetParents
	for (var e = elmt; e; e = e.offsetParent) {
		//把 offsetLeft 值加總
		x += e.offsetLeft;
	}
	//繞行至 document.body
	for (e = elmt.parentNode; e && e != document.body; e = e.parentNode) {
		//減去捲軸值
		if (e.scrollLeft)
			x -= e.scrollLeft;
	}
	return x;
};
EZ.posY = function (objID) {
	var elmt = document.getElementById(objID);
	var y = 0;
	//繞行 offsetParents
	for (var e = elmt; e; e = e.offsetParent) {
		//把 offsetTop 值加總
		y += e.offsetTop;
	}
	//繞行至 document.body
	for (e = elmt.parentNode; e && e != document.body; e = e.parentNode) {
		//減去捲軸值
		if (e.scrollTop)
			y -= e.scrollTop;
	}
	return y;
};
EZ.doBackIndex = function () {
	EZ.alert('重覆登入或登入已逾時,請重新登入', function () {
		location.href = 'index.php';
	});

};
EZ.importCSS = function (href) {
	var l = document.createElement('link');
	l.setAttribute('type', 'text/css');
	l.setAttribute('rel', 'stylesheet');
	l.setAttribute('href', href);
	var head = document.getElementsByTagName('head')[0];	
	if (head) {
		head.appendChild(l);
	} else {
		document.body.appendChild(l);
	}	
	
};
EZ.importJS = function (src, look_for, onload) //1. 路徑 2.搜尋物件名稱 比如Ext  當物件不存在才載入 3. 載入以後 做什麼事情
{
	var s = document.createElement('script');
	s.setAttribute('type', 'text/javascript');
	s.setAttribute('src', src);
	if (onload)
		this.wait_for_script_load(look_for, onload);
	if (eval("typeof " + look_for) == 'undefined') {
		var head = document.getElementsByTagName('head')[0];
		if (head)
			head.appendChild(s);
		else
			document.body.appendChild(s);
	}
};
EZ.mutiImportJS = function (objs, onload) //1. 路徑 2.搜尋物件名稱 比如Ext  當物件不存在才載入 3. 載入以後 做什麼事情
{
	if (objs.length > 0) {
		var o = objs.shift();
		var _ol = function (thisobj, objs, onload) {
			return function () {
				thisobj.mutiImportJS(objs, onload);
			}
		}
		(this, objs, onload);
		this.importJS(o['src'], o['look_for'], _ol);
	} else if (objs.length == 0) {
		onload();
	}
};
EZ.wait_for_script_load = function (look_for, callback) {
	var interval = setInterval(function () {
			if (eval("typeof " + look_for) != 'undefined') {
				clearInterval(interval);
				callback();
			}
		}, 50);
};
EZ.loadScript = function (src, callback) {
	var head = document.getElementsByTagName('head')[0],
	script = document.createElement('script');
	done = false;
	script.setAttribute('src', src);
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('charset', 'utf-8');
	script.onload = script.onreadystatechange = function () {
		if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
			done = true;
			script.onload = script.onreadystatechange = null;
			if (callback) {
				callback();
			}
		}
	}
	head.insertBefore(script, head.firstChild);
};
EZ.loadScript2 = function (url, callback) {
	var script = document.createElement("script")
		script.type = "text/javascript";
	if (script.readyState) { //IE
		script.onreadystatechange = function () {
			if (script.readyState == "loaded" ||
				script.readyState == "complete") {
				script.onreadystatechange = null;
				callback();
			}
		};
	} else { //Others
		script.onload = function () {
			callback();
		};
	}
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
}
EZ.load = function (look_for, callback) {
	var id = look_for.slice(1);
	var _debug;
	if (typeof debug != 'undefined' && debug == true) {
		id += '_debug';
	}
	EZ.clearFocus(look_for);
	if (!EZ.objects[look_for]) {
		var src = "../js/" + id + ".js?tt=" + new Date().getTime();
		//var src = "../js/"+id+".js";
		EZ.js(src);
		EZ.ready(function () {
			try {
				EZ.objects[look_for] = eval('new ' + look_for + '()');
				if (callback) {
					callback();
				}
				EZ.loadCSS(look_for)
			} catch (e) {
				EZ.debug(e + ' in pub_library.js EZ.load ' + look_for);
			}
		});
	} else {
		if (callback) {
			callback();
		}
	}
};
EZ.loadCSS = function (look_for) {
	var id = '';
	if (typeof debug != 'undefined' && debug == true) {
		look_for += '_debug';
	}
	var src = "../css/" + look_for + ".css?tt=" + new Date().getTime();
	EZ.importCSS(src);
}
EZ.clearFocus = function (objname) {
	for (var name in EZ.objects) {
		try {
			//if(name==objname){continue;}
			EZ.objects[name].lostFocus();
		} catch (e) {}
	}
};
//取得表單的值
EZ.getForm = function (_oForm) {
	var oForm;
	if (typeof(_oForm) == 'string') {
		oForm = document.getElementById(_oForm);
	} else {
		oForm = _oForm;
	}
	var elements = oForm.elements;
	var formData = {};
	for (i = 0; i < elements.length; i++) {
		var field_type = elements[i].type;
		if (typeof field_type == 'undefined')
			continue;
		field_type = field_type.toLowerCase();
		var name = elements[i].name;
		switch (field_type) {
		case "text":
		case "password":
		case "textarea":
		case "hidden":
			formData[name] = elements[i].value;
			break;

		case "radio":
			if (elements[i].checked == true) {
				formData[name] = elements[i].value;
			}
			break;
		case "checkbox": //  如果沒勾也要有值 把值存在一個屬性 叫做noValue
			if (elements[i].checked == true) {
				formData[name] = elements[i].value;
			} else {
				var v = elements[i].getAttribute('noValue')
					if (v) {
						formData[name] = v;
					}
			}
			break;
		case "select-one":
		case "select-multi":
			//elements[i].selectedIndex = -1;
			formData[name] = elements[i].value;
			break;

		default:

			break;
		}
	}
	return formData;
};
EZ.setForm = function (_oForm, formData) {
	var oForm;
	if (typeof(_oForm) == 'string') {
		oForm = document.getElementById(_oForm);
	} else {
		oForm = _oForm;
	}
	var elements = oForm.elements;
	for (i = 0; i < elements.length; i++) {
		var field_type = elements[i].type;
		var name = elements[i].name;
		if (typeof field_type == 'undefined')
			continue;
		field_type = field_type.toLowerCase();
		//var field_type = elements[i].type.toLowerCase();


		switch (field_type) {
		case "text":
		case "password":
		case "textarea":
		case "hidden":
			if (typeof formData[name] != 'undefined') {
				elements[i].value = formData[name];
			}
			break;

		case "radio":
			if (typeof formData[name] != 'undefined' && formData[name] == elements[i].value) {
				elements[i].checked = true;
			}
			break;
		case "checkbox": //  如果沒勾也要有值 把值存在一個屬性 叫做noValue
			var yesValue = elements[i].getAttribute('value');
			var noValue = elements[i].getAttribute('noValue');

			if (typeof formData[name] != 'undefined') {
				if (formData[name] == yesValue) {
					elements[i].checked = true;
				} else if (formData[name] == noValue) {
					elements[i].checked = false;
				}
			}
			break;
		case "select-one":
			var os = elements[i].getElementsByTagName('option');
			for (var j = 0, jmax = os.length; j < jmax; j++) {
				var o = os[j];
				if (o.value == formData[name]) {
					o.selected = true;
				}
			}
			break;
		case "select-multi":
			//elements[i].selectedIndex = -1;
			break;
		default:
			break;
		}
	}
};
//表單驗證 如果驗證失敗 把該dom 存入陣列 result  並且回傳
EZ.checkForm = function (_oForm, formCheck) {
	var oForm;
	if (typeof(_oForm) == 'string') {
		oForm = document.getElementById(_oForm);
	} else {
		oForm = _oForm;
	}
	var elements = oForm.elements;
	var result = [];
	for (i = 0; i < elements.length; i++) {
		var field_type = elements[i].type.toLowerCase();
		var name = elements[i].name;
		switch (field_type) {
		case "text":
		case "password":
		case "textarea":

			if (typeof formCheck[name] == 'function') {
				var value = elements[i].value;
				var rtn = formCheck[name].apply(this, [elements[i]]);
				if (typeof rtn != 'boolean') {
					rtn = true;
				} //fucntion 沒回傳true fasle 就算他驗證通過,管他的
				if (rtn == false) {
					result.push(elements[i]);
				}
			}
			break;
		default:
			break;
		}
	}

	return result;
};
EZ.openWindow2 = function () {
	var aa = window.open('Main.php?uid=' + uid + '&openWindow=true');
	return aa;
}
EZ.recursive = function () {
	var self = this,
	f,
	w,
	p,
	c = 0,
	recur = function () {
		if (typeof w.debug == 'undefined' && c <= 10) {
			//EZ.log(1);
			c++;
			setTimeout(recur, 1000);
		} else {
			//EZ.log(2);
			f();
		}
	},
	Self = {
		go : function (win, func) {
			f = func;
			w = win;
			//p = par;
			recur();
		}
	}
	return Self;
};
EZ.openWindow = function (_p) {
	//clone
	if (typeof _p == 'undefined')
		_p = {};
	var p = {};
	for (var key in _p) {
		if (_p.hasOwnProperty(key)) {
			p[key] = _p[key];
		}
	}
	p['container'] = 'ezGrid';
	var win = window.open('Main.php?uid=' + uid + '&openWindow=true');
	var func = function () {
		win.EZ.load(p.className, EZ.delegate(function (p) {
				win.EZ.objects[p.className].show(p);
			}, [p], this));
	}
	var rec = new EZ.recursive();
	rec.go(win, func);
	//setTimeout(func,1000);
	return win;
};
EZ._openWindow = function (_p) {
	//clone
	if (typeof _p == 'undefined')
		_p = {};
	var p = {};
	for (var key in _p) {
		if (_p.hasOwnProperty(key)) {
			p[key] = _p[key];
		}
	}
	p['container'] = 'ezGrid';
	p = EZ.JSON.encode(p);
	var win = window.open('Main.php?uid=' + uid + '&_openWindow=true&openWindow=true&p=' + p);

	return win;
};
EZ.__openWindow = function (_p) {
	//clone
	if (typeof _p == 'undefined')
		_p = {};
	var p = {};
	for (var key in _p) {
		if (_p.hasOwnProperty(key)) {
			p[key] = _p[key];
		}
	}
	p['container'] = 'ezGrid';
	var __p = EZ.JSON.encode(p);
	var win = window.open('Main.php?uid=' + uid + '&__openWindow=true&openWindow=true&p=' + __p);
	return win;
};
EZ.emptyFN = function () {}
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
}
();
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
}
();

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
}
();
//取得相對座標 (相對於parent)
EZ.getOffset = function (elmt) {
	return {
		x : elmt.offsetLeft,
		y : elmt.offsetTop
	};
};
//取得絕對座標
EZ.getPos = function (elmt) {
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
}
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
EZ.readCookie = function (name) {
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr != null)
		return unescape(arr[2]);
	return null;
}
EZ.setCookie = function (name, value, time) {
	var Days = 1; //此 cookie ?被保存 30 天
	if (typeof time == 'undefined')
		time = Days * 24 * 60 * 60 * 1000;
	var exp = new Date(); //new Date("December 31, 9998");
	exp.setTime(exp.getTime() + time);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
EZ.deleteCookie = function (name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = EZ.readCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
EZ.deleteChilds = function (f) {
	var childs = f.childNodes;
	for (var i = childs.length - 1; i >= 0; i--) {
		f.removeChild(childs[i]);
	}
}
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
}
();
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
//IE 清記憶體
EZ.clearMemory = function () {
	if (typeof CollectGarbage != 'undefined')
		CollectGarbage();
}
//載js
EZ.loadjs = function (look_for) {
	var id = look_for.slice(1);
	var _debug;
	if (typeof debug != 'undefined' && debug == true) {
		id += '_debug';
	}
	var src = "../js/" + id + ".js?tt=" + new Date().getTime();
	EZ.js(src);
}
//滑鼠座標
EZ.mouseCoords = function (e) {
	e = e || window.event;
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
}
();
// 語系對應 key
EZ.langKey = function (langx) {
	switch (langx) {
	case 'zh-tw':
		return 'sname_c';
	case 'zh-cn':
		return 'sname_g';
	case 'en-us':
		return 'sname_e';
	case 'ja-jp':
		return 'sname_j';
	default:
		return 'sname_c';
	}
};
//轉換球頭
EZ.Concede = new function () {
	var cConvert = function () {
		var concede,
		result = {
			con : '',
			rat : '',
			number : 0
		},
		isInit = false,
		cons,
		rats,
		dicCon = {}
		//拆解成con + rat
	,
		divide = function (concede) {
			var result = {
				con : '',
				rat : '',
				original : concede
			};

			//判斷沒有 rat
			var tmp_con = concede.split('');

			if (concede.replace(tmp_con[0], ' ').indexOf('-') < 1 && concede.replace(tmp_con[0], ' ').indexOf('+') < 1) {
				result.con = concede;
				result.rat = 0;
			} else {
				//找出con
				var tmp1 = [];

				for (var i = 0; i < tmp_con.length; i++) {
					var cc = tmp_con[i];
					if (i == 0 || !isNaN(cc)) {
						tmp1[tmp1.length] = cc;
					} else {
						break;
					}
				}
				result.con = tmp1.join('');
				result.rat = concede.replace(result.con, '');
			}
			result.con = isNaN(result.con) || result.con == '' ? 0 : parseInt(result.con);
			result.rat = isNaN(result.rat) || result.rat == '' ? 0 : parseInt(result.rat);
			return result;
		},
		toStrong = function (r) {
			//判斷強弱  if con <0 || (con==0 && rat>0)  弱隊
			if (r.con < 0 || (r.con == 0 && r.rat > 0)) {
				r.con = r.con * -1;
				r.rat = r.rat * -1;
			}
			return r;
		}
		//將球頭 轉成 純量 200進位 0-100 =0 , 0-99 = 1 , 0 + 0 = 100 , 0+100 = 200
	,
		digitized = function (r) {
			var con = r.con * 200;
			var rat = rats[r.rat];
			r.number = con + rat;
			return r;
		}
		//把 con rat 拼回去
	,
		toString = function (r) {
			var rat = (r.rat >= 0) ? '+' + r.rat : r.rat;
			return r.con + '' + rat;
		}
		//所有對應表
	,
		convert = function (type) {
			//type = parseInt(type);
			switch (type) {
			case 'concede':
				return result.con;
				break;
			case 'ratio':
				return result.rat;
				break;
				//弱隊
			case '_concede':
				return result.con * -1;
				break;
			case '_ratio':
				return result.rat * -1;
				break;
			case '1': //足球 讓分
			case 1: //足球 讓分
				if (result.con == 0 && result.rat == 0)
					return '平手';
				if (result.con == 0 && result.rat == 100)
					return '負1輸';
				if (result.con == 0 && result.rat == -100)
					return '負1輸';
				if (result.con == 0 && result.rat == -50)
					return '平手/半球';
				if (result.con == 0 && result.rat == 50)
					return '平手/半球';
				if (result.rat == 0)
					return result.con + '球';
				else if (result.rat == 100 && result.con == 1)
					return '半球';
				else if (result.rat == 100)
					return (result.con - 1) + '球半';
				else if (result.rat == 50 && result.con == 1)
					return '半球/1球';
				else if (result.rat == -50)
					return result.con + '球/' + result.con + '球半';
				else if (result.rat == 50)
					return (result.con - 1) + '球半/' + result.con + '球';
				else if (result.rat < 0)
					return result.con + result.rat;
				else
					return result.con + "+" + result.rat;

			case '2': //棒球類 1+50
			case 2: //棒球類
				if (result.con == 0 && result.rat == 0)
					return "0"; //0平改pk
				if (result.con == 0 && result.rat == 100)
					return '負1輸';
				if (result.con == 0 && result.rat == -100)
					return '負1輸';
				if (result.rat == 0)
					return result.con + '平';
				else if (result.rat == 100) {
					if ((result.con - 1) == 0) {
						//if(gtype=='BS' && rtype=='RE') return '平手';
						//else return '0輸';
						//return '0輸';
						return '0.5';
					} else{
						return (result.con - 1) + '.5';
						//return (result.con - 1) + '輸';						
					}
				} else if (result.rat < 0)
					return result.con + '' + result.rat;
				else
					return result.con + "+" + result.rat;

			case '3': //日本 正常
			case 3: //日本 正常
				if (result.con == 0 && result.rat == 0)
					return "PK"; //0平改pk
				if (result.con == 0 && result.rat == 100)
					return '負1輸';
				if (result.con == 0 && result.rat == -100)
					return '負1輸';
				if (result.rat == 0)
					return result.con + '平';
				else if (result.rat == 100) {
					if ((result.con - 1) == 0)
						return '0.5';
					else
						return (result.con - 1) + '.5';
				} else if (result.rat < 0)
					return result.con + '' + result.rat;
				else
					return result.con + "+" + result.rat;

			case '4': //日本 怪球
			case 4: //日本 怪球
				var jcon;
				var jrat;
				if (result.rat == 0) {
					return result.con + ".0";
				} else if (result.rat == 100) {
					return result.con + "?差";
				} else if (result.rat >= 0) {
					jrat = 100 - result.rat;
					if (jrat % 10 == 0) {
						jrat = jrat / 10;
					}
				} else {
					jrat = result.rat * -1;
					if (jrat % 10 == 0) {
						jrat = jrat / 10;
					}
				}
				jcon = result.con;
				if (result.rat > 0) {
					jcon = result.con - 1;
				}
				if (jcon == 0 || result.rat <= 0) {
					return jcon + "." + jrat;
				} else {
					return jcon + "半" + jrat;
				}
			case '5': //  1/1.5
			case 5:
				var answer = '';
				if (result["rat"] == 100)
					answer = (result["con"] - 1) + ".5";
				else if (result["rat"] == 0)
					answer = result["con"];
				else if (result["rat"] == 50)
					answer = (result["con"] - 1) + ".5/" + result["con"];
				else if (result["rat"] == -50)
					answer = result["con"] + "/" + result["con"] + ".5";
				else if (result["rat"] > 0)
					answer = result["con"] + "+" + result["rat"];
				else
					answer = result["con"] + result["rat"];
				return answer;
			case '0': //正常球
			case 0: //正常球
			default: //正常球
				var answer = '';
				if (result["con"] == 0 && result["rat"] > 0)
					answer = "";
				else if (result["con"] < 0)
					answer = "";
				else if (result["rat"] == 0 && result["con"] == 0)
					answer = 0;
				else if (result["rat"] == '100')
					answer = (result["con"] - 1) + '.5';
				else if (result["rat"] > 0)
					answer = result["con"] + "+" + result["rat"];
				else if (result["rat"] == 0)
					answer = result["con"];
				else
					answer = result["con"] + '' + result["rat"];
				return answer;
			}
		};
		//產生 rats
		rats = {};
		for (var i = -100, c = -1; i <= 100; i++) {
			rats[i] = ++c;
		}

		return {
			show : function (type) {
				if (typeof type == 'undefined')
					type = 0;
				if (typeof dicCon[type] == 'undefined')
					dicCon[type] = {};

				if (typeof dicCon[type][result.original] == 'undefined') {
					var ans = convert(type);
					dicCon[type][result.original] = ans;
					return ans;
				} else {
					return dicCon[type][result.original];
				}
				//return result.original+' '+result.number;
			},
			init : function (_concede) {
				if (isInit == true)
					return;
				concede = _concede;
				//1 將concede 拆成 con , rat
				result = divide(concede);
				//2 轉成強隊
				result = toStrong(result);
				// 數位化
				result = digitized(result);
				isInit = true;
			}
		};
	},
	emptyObj = function (con) {
		return {
			show : function () {
				return '';
			}
		}
	};

	return function (concede, rat) {
		if (typeof rat != 'undefined') {
			rat = parseInt(rat);
			if (rat < 0) {
				concede = concede + '' + rat.toString();
			} else {
				concede = concede + '+' + rat.toString();
			}
		}

		if (typeof concede == 'undefined' || concede == null) {
			return new emptyObj(concede);
		} else if (typeof concede == 'number') {
			concede = concede.toString();
		} else if (typeof concede != 'string') {
			return new emptyObj(concede);
		}
		var rr = new cConvert();
		rr.init(concede);
		return rr;
	}
}
();
//時間 format
EZ.Date = new function () {
	var self = this
	var init = function (date) {
		var self = this,
		obj = date,
		Self = {
			getTime : function () {
				return obj.getTime();
			},
			show : function (mask) {
				return EZ.DateFormat(obj, mask);
			},
			date_diff : function(type,diff,startDay){//  Y或M或D或H或I或S  ,  差距 1 ,  2012-01-01 12:00:00或2012-01-01
				var now;
				var diff_num;
				if(typeof(startDay)=="undefined"){now = new Date(EZ.Date().getTime());}else{now = new Date(EZ.Date(startDay).getTime());}
				if(typeof(type)=="undefined"){type="D";}
				if(typeof(diff)=="undefined"){diff_num=0}else{diff_num=diff;}
				switch(type.toString().toUpperCase()){
					case "Y":now=now.add(Date.YEAR,diff);return EZ.Date(now).show('yyyy-mm-dd');		   break;
					case "M":now=now.add(Date.MONTH,diff);return EZ.Date(now).show('yyyy-mm-dd');		   break;
					case "D":now=now.add(Date.DAY,diff);return EZ.Date(now).show('yyyy-mm-dd');			   break;
					case "H":now=now.add(Date.HOUR,diff);return EZ.Date(now).show('yyyy-mm-dd hh:ii:ss');  break;
					case "I":now=now.add(Date.MINUTE,diff);return EZ.Date(now).show('yyyy-mm-dd hh:ii:ss');break;
					case "S":now=now.add(Date.SECOND,diff);return EZ.Date(now).show('yyyy-mm-dd hh:ii:ss');break;
					default:now=now.add(Date.DAY,diff);return EZ.Date(now).show('yyyy-mm-dd');			   break;
				}			
				// return EZ.Date(now).show('yyyy-mm-dd');		 
			},	
			this_month : function(startDay){//本月
				var now;
				if(typeof(startDay)=="undefined"){now = new Date(EZ.Date().show('Y-mm-dd'));}else{now = new Date(EZ.Date(startDay).show('Y-mm-dd'));}
				var yyyy=now.getFullYear();
				var mm=new Date(now.getTime()).getMonth()+1;mm=(mm.toString().length==1)?"0"+mm:mm;
				var dd_1=new Date(yyyy,mm, 1).getDate();dd_1=(dd_1.toString().length==1)?"0"+dd_1:dd_1;			
				var dd=new Date(yyyy,mm, 0).getDate();dd=(dd.toString().length==1)?"0"+dd:dd;	
				var firstday =yyyy+"-"+mm+"-"+dd_1;
				var lastday=yyyy+"-"+mm+"-"+dd; 
				return [firstday,lastday];				
			},		
			last_month : function(startDay){//上月		
				var now;
				if(typeof(startDay)=="undefined"){now = new Date(EZ.Date().show('Y-mm-dd'));}else{now = new Date(EZ.Date(startDay).show('Y-mm-dd'));}
				now.setDate(1);  
				now.setMonth(now.getMonth()-1);  
				var yyyy = now.getFullYear();  
				var mm = now.getMonth()+1;mm=(mm.toString().length==1)?"0"+mm:mm;
				var dd_1=new Date(yyyy,mm, 1).getDate();dd_1=(dd_1.toString().length==1)?"0"+dd_1:dd_1;			
				var dd=new Date(yyyy,mm, 0).getDate();dd=(dd.toString().length==1)?"0"+dd:dd;
				var firstday =yyyy+"-"+mm+"-"+dd_1;
				var lastday=yyyy+"-"+mm+"-"+dd; 
				return [firstday,lastday];				
			},		
			next_month : function(startDay){//下月				
				var now;
				if(typeof(startDay)=="undefined"){now = new Date(EZ.Date().show('Y-mm-dd'));}else{now = new Date(EZ.Date(startDay).show('Y-mm-dd'));}
				now.setDate(1);  
				now.setMonth(now.getMonth()+1);  
				var yyyy = now.getFullYear();  
				var mm = now.getMonth()+1;mm=(mm.toString().length==1)?"0"+mm:mm;
				var dd_1=new Date(yyyy,mm, 1).getDate();dd_1=(dd_1.toString().length==1)?"0"+dd_1:dd_1;			
				var dd=new Date(yyyy,mm, 0).getDate();dd=(dd.toString().length==1)?"0"+dd:dd;
				var firstday =yyyy+"-"+mm+"-"+dd_1;
				var lastday=yyyy+"-"+mm+"-"+dd; 
				return [firstday,lastday];				
			},	
			this_week : function(startDay){//本周
				var now = new Date();
				startDay = startDay||1; //0=sunday, 1=monday etc.
				var d = now.getDay(); //get the current day
				var weekStart = new Date(now.valueOf() - (d<=0 ? 7-startDay:d-startDay)*86400000); //rewind to start day
				var weekEnd = new Date(weekStart.valueOf() + 6*86400000); //add 6 days to get last day
				var firstday = EZ.Date(weekStart).show('Y-mm-dd');
				var lastday = EZ.Date(weekEnd).show('Y-mm-dd');
				return [firstday,lastday];
			},
			last_week : function(startDay){//上周
				var now = new Date();
				startDay = startDay||1; //0=sunday, 1=monday etc.
				var d = now.getDay(); //get the current day
				var weekStart = new Date(now.valueOf() - (d<=0 ? 7-startDay:d-startDay)*86400000); //rewind to start day
				var weekEnd = new Date(weekStart.valueOf() + 6*86400000); //add 6 days to get last day
				var firstday = EZ.Date(weekStart.getTime()-604800000).show('Y-mm-dd');
				var lastday = EZ.Date(weekEnd.getTime()-604800000).show('Y-mm-dd');
				return [firstday,lastday];
			}
		}
		return Self;
	}
	return function (date) {
		if (typeof date == 'string') {
			date = date.replace('-', '/').replace('-', '/');
			date = new Date(date);
			return init(date);
		} else if (typeof date == 'undefined') {
			date = new Date();
			return init(date);
		} else {
			return init(date);
		}
	}
}
();

EZ.DateFormat = new function () {
	var token = /d{1,4}|m{1,4}|yy(?:yy)?|Y(?:Y)?|([HhMisTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g
		//var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g
,
	timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
	timezoneClip = /[^-+\dA-Z]/g,
	pad = function (val, len) {
		val = String(val);
		len = len || 2;
		while (val.length < len)
			val = "0" + val;
		return val;
	},
	dateFormat = {
		masks : {
			//"default":      "ddd mmm dd yyyy HH:MM:ss",
			"default" : "yyyy-mm-dd HH:MM:ss",
			shortDate : "m/d/yy",
			mediumDate : "mmm d, yyyy",
			longDate : "mmmm d, yyyy",
			fullDate : "dddd, mmmm d, yyyy",
			shortTime : "h:MM TT",
			mediumTime : "h:MM:ss TT",
			longTime : "h:MM:ss TT Z",
			isoDate : "yyyy-mm-dd",
			isoTime : "HH:MM:ss",
			isoDateTime : "yyyy-mm-dd'T'HH:MM:ss",
			isoUtcDateTime : "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
		},
		i18n : {
			dayNames : [
				"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
				"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
			],
			monthNames : [
				"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
				"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
			]
		}
	};

	return function (date, mask, utc) {
		var dF = dateFormat;
		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) {
			EZ.log('date = ' + date);
			throw SyntaxError("invalid date");

		}

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);
		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}
		var _ = utc ? "getUTC" : "get",
		d = date[_ + "Date"](),
		D = date[_ + "Day"](),
		m = date[_ + "Month"](),
		y = date[_ + "FullYear"](),
		H = date[_ + "Hours"](),
		M = date[_ + "Minutes"](),
		s = date[_ + "Seconds"](),
		L = date[_ + "Milliseconds"](),
		o = utc ? 0 : date.getTimezoneOffset(),
		flags = {
			d : d,
			dd : pad(d),
			ddd : dF.i18n.dayNames[D],
			dddd : dF.i18n.dayNames[D + 7],
			m : m + 1,
			mm : pad(m + 1),
			mmm : dF.i18n.monthNames[m],
			mmmm : dF.i18n.monthNames[m + 12],
			y : String(y).slice(2),
			yy : String(y).slice(2),
			yyyy : y,
			Y : y,
			h : H % 12 || 12,
			hh : pad(H % 12 || 12),
			H : H,
			HH : pad(H),
			M : M,
			i : M,
			MM : pad(M),
			ii : pad(M),
			s : s,
			ss : pad(s),
			l : pad(L, 3),
			L : pad(L > 99 ? Math.round(L / 10) : L),
			t : H < 12 ? "a" : "p",
			tt : H < 12 ? "am" : "pm",
			T : H < 12 ? "A" : "P",
			TT : H < 12 ? "AM" : "PM",
			Z : utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
			o : (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
			S : ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
		};
		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	}
}
()
EZ.isEmpty = function (obj) {
	return (typeof obj == 'undefined' || obj == null || obj == '') ? true : false;
}
EZ.Timer = function (o) {
	var self = this,
	now,
	isRunning = false,
	runningId = 0,
	status = 'stop',
	timer_id,
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
	(),
	opt = {
		callback : emptyFN,
		block : 1000,
		direct : 0 //0 逆向 1 正向
	,
		max : 60,
		min : 0,
		renderTo : '',
		debug : 0 //每次跑nextsecond 是否要寫EZ.log
	,
		timer_name : EZ.id() //寫 EZ.log的時候會顯示出來 方便判斷是哪個timer
	},
	option = function (o) {
		if (typeof o == 'undefined')
			return;
		if (typeof o.callback != 'undefined') {
			opt.callback = o.callback;
		}
		if (typeof o.block != 'undefined') {
			opt.block = o.block;
		}
		if (typeof o.direct != 'undefined') {
			opt.direct = o.direct;
		}
		if (typeof o.max != 'undefined') {
			opt.max = o.max;
		}
		if (typeof o.callback != 'undefined') {
			opt.min = o.min;
		}
		if (typeof o.renderTo != 'undefined') {
			opt.renderTo = o.renderTo;
			if (typeof opt.renderTo == 'string') {
				opt.renderTo = document.getElementById(opt.renderTo);
				if (typeof opt.renderTo == 'undefined' || opt.renderTo == null) {
					//opt.renderTo = '';
				}
			}
		}
		if (typeof o.debug != 'undefined') {
			opt.debug = o.debug;
		}
		if (typeof o.timer_name != 'undefined') {
			opt.timer_name = o.timer_name;
		}
	}
	//秒數增加
,
	run = function () {
		var tid = new Date().getTime();
		timer_id = setTimeout(call(tid), opt.block);
	},
	call = function (id) {
		return function () {
			nextSecond(id);
		}
	},
	nextSecond = function (tid) {
		if (opt.debug == '1')
			EZ.log('timer ' + opt.timer_name + ' = ' + now);
		if (isRunning == false) {
			runningId = tid;
			isRunning = true;
		} else if (runningId != tid) {
			return;
		}
		if (opt.direct == 0) {
			now = Math.round((now - (opt.block / 1000)) * 10) / 10;
			// if(typeof opt.renderTo == 'undefined') alert(1);
			// if(opt.renderTo == null) alert(2);
			// if(opt.renderTo == '') alert(3);
			if (typeof opt.renderTo != 'undefined' && opt.renderTo != null) {
				if (opt.renderTo.tagName == 'INPUT') {
					opt.renderTo.value = now;
				} else {
					opt.renderTo.innerHTML = now;
				}
			}
			if (now <= opt.min) {
				//EZ.log('callback');
				opt.callback();
				now = opt.max;
			}
		} else {
			now = Math.round((now + (opt.block / 1000)) * 10) / 10;
			if (typeof opt.renderTo != 'undefined' && opt.renderTo != null) {
				if (opt.renderTo.tagName == 'INPUT') {
					opt.renderTo.value = now;
				} else {
					opt.renderTo.innerHTML = now;
				}
			}
			if (now >= opt.max) {
				opt.callback();
				now = opt.min;
			}
		}
		timer_id = setTimeout(call(tid), opt.block);
	},
	format = function (t) {
		if (opt.direct == 0) {
			t = opt.max;
		} else {
			t = opt.min;
		}
		return t;
	},
	Self = {
		play : function (o) {
			if (typeof o != 'undefined')
				option(o);
			if (status == 'stop')
				now = format(now);
			status = 'play';
			//log('play',true);
			run();
		},
		stop : function () {
			status = 'stop';
			clearTimeout(timer_id);
			isRunning = false;
		},
		pause : function () {
			status = 'pause';
			clearTimeout(timer_id);
			isRunning = false;
		},
		option : option,
		opt : function () {
			return opt;
		}
	};
	option(o);

	return Self;
}
//偵測瀏覽器 browser version OS isIE
EZ.System = new function () {
	var self = this,
	init = function () {
		//瀏覽器
		browser = searchString(dataBrowser) || "unknow browser";
		//版本
		version = searchVersion(navigator.userAgent) || searchVersion(navigator.appVersion) || "unknow version";
		//OS
		OS = searchString(dataOS) || "unknow OS";
		isIE = (browser == 'Explorer') ? true : false;
		isChrome = (browser == 'Chrome') ? true : false;
		isFirefox = (browser == 'Firefox') ? true : false;
		isSafari = (browser == 'Safari') ? true : false;
		isOpera = (browser == 'Opera') ? true : false;

		//是否手機
		var ua = navigator.userAgent.toLowerCase();
		isMobile = false;
		for (var i = 0; i < dataMobiles.length; i++) {
			if (ua.indexOf(dataMobiles[i]) > 0) {
				isMobile = true;
				break;
			}
		}
		Self = {
			show : show,
			browser : browser,
			version : version,
			OS : OS,
			isIE : isIE,
			isChrome : isChrome,
			isFirefox : isFirefox,
			isOpera : isOpera,
			isSafari : isSafari,
			isMobile : isMobile,
			versionSearchString : versionSearchString,
			width : function () {
				if (typeof(window.innerWidth) == 'number') {
					//Non-IE
					return window.innerWidth;
				} else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
					//IE 6+ in 'standards compliant mode'
					return document.documentElement.clientWidth;
				} else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
					//IE 4 compatible
					return document.body.clientWidth;
				}
			},
			height : function () {
				if (typeof(window.innerHeight) == 'number') {
					//Non-IE
					return window.innerHeight;
				} else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
					//IE 6+ in 'standards compliant mode'
					return document.documentElement.clientHeight;
				} else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
					//IE 4 compatible
					return document.body.clientHeight;
				}
			}
		}
	},
	browser,
	version,
	OS,
	isIE,
	isChrome,
	isFirefox,
	isOpera,
	isSafari,
	versionSearchString,
	dataMobiles = [
		"midp", "j2me", "avant", "docomo", "novarra", "palmos", "palmsource",
		"240x320", "opwv", "chtml", "pda", "windows ce", "mmp/",
		"blackberry", "mib/", "symbian", "wireless", "nokia", "hand", "mobi",
		"phone", "cdm", "up.b", "audio", "sie-", "sec-", "samsung", "htc",
		"mot-", "mitsu", "sagem", "sony", "alcatel", "lg", "eric", "vx",
		"NEC", "philips", "mmm", "xx", "panasonic", "sharp", "wap", "sch",
		"rover", "pocket", "benq", "java", "pt", "pg", "vox", "amoi",
		"bird", "compal", "kg", "voda", "sany", "kdd", "dbt", "sendo",
		"sgh", "gradi", "jb", "dddi", "moto", "iphone", "android",
		"iPod", "incognito", "webmate", "dream", "cupcake", "webos",
		"s8000", "bada", "googlebot-mobile"
	],
	dataBrowser = [{
			string : navigator.userAgent,
			subString : "Chrome",
			identity : "Chrome"
		}, {
			string : navigator.userAgent,
			subString : "OmniWeb",
			versionSearch : "OmniWeb/",
			identity : "OmniWeb"
		}, {
			string : navigator.vendor,
			subString : "Apple",
			identity : "Safari",
			versionSearch : "Version"
		}, {
			prop : window.opera,
			identity : "Opera",
			versionSearch : "Version"
		}, {
			string : navigator.vendor,
			subString : "iCab",
			identity : "iCab"
		}, {
			string : navigator.vendor,
			subString : "KDE",
			identity : "Konqueror"
		}, {
			string : navigator.userAgent,
			subString : "Firefox",
			identity : "Firefox"
		}, {
			string : navigator.vendor,
			subString : "Camino",
			identity : "Camino"
		}, { // for newer Netscapes (6+)
			string : navigator.userAgent,
			subString : "Netscape",
			identity : "Netscape"
		}, {
			string : navigator.userAgent,
			subString : "MSIE",
			identity : "Explorer",
			versionSearch : "MSIE"
		}, {
			string : navigator.userAgent,
			subString : "Gecko",
			identity : "Mozilla",
			versionSearch : "rv"
		}, { // for older Netscapes (4-)
			string : navigator.userAgent,
			subString : "Mozilla",
			identity : "Netscape",
			versionSearch : "Mozilla"
		}
	],
	dataOS = [{
			string : navigator.platform,
			subString : "Win",
			identity : "Windows"
		}, {
			string : navigator.platform,
			subString : "Mac",
			identity : "Mac"
		}, {
			string : navigator.userAgent,
			subString : "iPhone",
			identity : "iPhone/iPod"
		}, {
			string : navigator.platform,
			subString : "Linux",
			identity : "Linux"
		}
	],
	searchString = function (data) {
		for (var i = 0; i < data.length; i++) {
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			} else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion = function (dataString) {
		var index = dataString.indexOf(versionSearchString);
		if (index == -1)
			return;
		return parseFloat(dataString.substring(index + versionSearchString.length + 1));
	},
	show = function () {
		return [
			"browser : " + Self.browser, "version : " + Self.version, "OS : " + Self.OS, "isIE : " + Self.isIE, "isChrome : " + Self.isChrome, "isFirefox : " + Self.isFirefox, "isSafari : " + Self.isSafari, "isOpera : " + Self.isOpera, "isMobile : " + Self.isMobile, "versionSearchString : " + Self.versionSearchString, "width : " + Self.width(), "height : " + Self.height()
		]
	},
	Self
	init();
	return Self;
}
EZ.loadMask = function (o) {
	var self = this,
	opt = {
		renderTo : null,
		overflow : '',
		position : '',
		zIndex : 100,
		backgroundColor : '#ccc',
		opacity : 50,
		url : '',
		noMsg : false // true 中間就不會有文字 或者 圈圈
	},
	proxy,
	proxyMsg,
	proxyText,
	toBody = false,
	createProxy = function () {
		proxy = document.createElement('div');
		proxy.className = 'EZloadmask';
		proxy.style.zIndex = opt.zIndex;
		proxy.style.display = "none";
		proxy.style.backgroundColor = opt.backgroundColor;
		proxy.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + opt.opacity + ")";
		proxy.style.MozOpacity = opt.opacity / 100;
		proxy.style.opacity = opt.opacity / 100;

		proxyMsg = document.createElement('div');
		proxyMsg.className = 'EZloadmask-msg';
		proxyMsg.style.zIndex = opt.zIndex + 1;
		proxyMsg.style.display = "none";

		proxyText = document.createElement('div');
		proxyText.style.display = "none";
		proxyText.style.zIndex = opt.zIndex + 2;
		proxyMsg.appendChild(proxyText);
	},
	init = function (o) {
		if (typeof o == 'undefined') {
			return;
		}
		if (typeof o.zIndex != 'undefined' && o.zIndex != '') {
			opt.zIndex = o.zIndex;
		}
		if (typeof o.backgroundColor != 'undefined' && o.backgroundColor != '') {
			opt.backgroundColor = o.backgroundColor;
		}
		if (typeof o.opacity != 'undefined' && o.opacity != '') {
			opt.opacity = o.opacity;
		}
		if (typeof o.url != 'undefined' && o.url != '') {
			opt.url = o.url;
		}
		if (typeof o.noMsg != 'undefined' && o.noMsg != '') {
			opt.noMsg = o.noMsg;
		}
		if (typeof o.renderTo != 'undefined') {
			createProxy();
			if (typeof o.renderTo == 'string' && o.renderTo.toLowerCase() == 'body') {
				opt.renderTo = document.body;
				//proxy.style.width = (document.body.clientWidth>window.screen.availWidth)?document.body.clientWidth:window.screen.availWidth + 'px';
				//proxy.style.height = (document.body.clientHeight>window.screen.availHeight)?document.body.clientHeight:(window.screen.availHeight-window.screenTop) + 'px';
				//proxy.style.width = EZ.System.width();
				//proxy.style.height = EZ.System.height();
				toBody = true;
			} else if (typeof o.renderTo == 'string') {
				opt.renderTo = document.getElementById(o.renderTo);
				var r = opt.renderTo;
				//proxy.style.width = r.clientWidth + 'px';
				//proxy.style.height = r.clientHeight + 'px';
				toBody = false;
			} else {
				opt.renderTo = o.renderTo;
				var r = opt.renderTo;
				//proxy.style.width = r.clientWidth + 'px';
				//proxy.style.height = r.clientHeight + 'px';
				toBody = false;
			}
		}
	},
	adjustCenter = function () {
		var w = proxy.clientWidth;
		var h = proxy.clientHeight;
		var _w = proxyMsg.clientWidth;
		var _h = proxyMsg.clientHeight;
		//置中
		var top = (h - _h) / 2;
		var left = (w - _w) / 2;
		proxyMsg.style.left = left + 'px';
		proxyMsg.style.top = top + 'px';
		//如果parent 不在可是範圍 就置中 否則放在可視範圍中間

		//如果 top 超過可視範圍, 調整回中間
		var minTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
		var maxTop = EZ.System.height() + minTop;
		var posMsg = EZ.getPos(proxyMsg);
		if (posMsg.y < minTop || posMsg.y > maxTop) {
			var pos = EZ.getPos(proxy);
			//alert(minTop+' '+EZ.System.height()+' '+_h+' '+pos.y);
			top = minTop + (EZ.System.height() - _h) / 2 - pos.y;
			proxyMsg.style.left = left + 'px';
			proxyMsg.style.top = top + 'px';
		}
		//alert(left+' = '+top);
	},
	show = function (text, delay) {
		var r = opt.renderTo;
		opt.overflow = r.style.overflow;
		opt.position = r.style.position;
		r.style.overflow = 'hidden';
		r.style.position = 'relative';
		opt.renderTo.appendChild(proxy);
		opt.renderTo.appendChild(proxyMsg);
		proxy.style.display = "block";
		//alert(r.clientWidth+' '+r.clientHeight);
		if (toBody == true) {
			var h = document.body.clientHeight;
			var _h = EZ.System.height();
			if (h < _h)
				h = _h;
			var w = document.body.clientWidth;
			var _w = EZ.System.width();
			if (w < _w)
				w = _w;
			proxy.style.width = w + 'px';
			proxy.style.height = h + 'px';
		} else {
			proxy.style.width = r.clientWidth + 'px';
			proxy.style.height = r.clientHeight + 'px';
		}
		if (typeof text == 'string' && text != '') {
			proxyText.innerHTML = text;
			proxyMsg.style.display = "inline-block";
			proxyText.style.display = "inline-block";
			adjustCenter();
		} else {
			if (opt.noMsg == false)
				proxy.className = proxy.className.toString() + ' EZloading_l';
			if (opt.url != '') {
				proxy.style.backgroundImage = "url('" + opt.url + "')";
				proxy.style.backgroundRepeat = "no-repeat";
				proxy.style.backgroundPosition = "center";
			}
		}
		if (typeof delay == 'number') {
			setTimeout(hide, delay);
		}
	},
	hide = function () {
		var r = opt.renderTo;
		//alert(typeof opt.overflow+' = '+typeof opt.position);
		r.style.overflow = opt.overflow;
		r.style.position = opt.position;
		proxy.style.display = "none";
		proxyMsg.style.display = "none";
		proxyText.style.display = "none";
		try {
			proxy.parentNode.removeChild(proxy);
			proxyMsg.parentNode.removeChild(proxyMsg);
		} catch (e) {}
	},
	Self = {
		show : show,
		hide : hide
	}
	init(o);
	return Self;
};
// 小圈圈
EZ.loading = function (render, bool, o) {
	var opt = {
		attachment : '',
		position : ''
	}
	if (typeof o != 'undefined') {
		if (typeof o.att != 'undefined') {
			opt.attachmemt = o.att;
		}
		if (typeof o.pos != 'undefined') {
			opt.position = o.pos;
		}
	}
	if (typeof render != 'undefined') {
		if (typeof render == 'string') {
			render = document.getElementById(render);
		}
		var cls = render.className.toString();
		if (bool == true) {
			render.className = cls + ' EZloading';

			if (opt.attachment != '')
				render.style.backgroundAttachment = opt.attachment;
			if (opt.position != '')
				render.style.backgroundPosition = opt.position;
		} else {
			render.className = cls.replace(' EZloading', '');
		}
	}
}
//注單內容
/*
game => game_over,result_h,result_c,gamememo,place,GameType,League_id
額外撈 =>team_h,team_c,LeagueName,gtype
wager =>wtype,strong,type,gtype,ioratio,IsSub,concede,ratio,wid,WDT_id,WOU_id,WPS_id,SubWagers,
 */

EZ.WagerContent = new function () {
	var self = this,
	dictionary = {
		"BK" : "籃球",
		"EK" : "國際籃球",
		"WB" : "WNBA",
		"BS" : "美棒",
		"EB" : "國際棒球",
		"FT" : "足球",
		"EF" : "國際足球",
		"CB" : "中華職棒",
		"KB" : "韓棒",
		"CH" : "冠軍賽",
		"BW" : "波膽",
		"AF" : "美式足球",
		"IB" : "NHL",
		"JB" : "日棒",
		"LO" : "彩球",
		"ST" : "指數",
		"ML" : "媽媽樂",
		"GT" : "高爾夫",
		"TN" : "網球",
		"VB" : "排球",
		"BL" : "撞球",
		"RB" : "橄欖球",
		"PO" : "板球",
		"BM" : "羽毛球",
		"TB" : "桌球",
		"BO" : "拳擊",
		"WP" : "水球",
		"HB" : "手球",
		"LA" : "競技",
		"AL" : "袋棍球",
		"FL" : "室內足球",
		"SF" : "沙灘足球",
		"BH" : "籃球半場",
		"BQ" : "籃球四節",
		"BF" : "美棒半場",
		"CF" : "中職半場",
		"JF" : "日職半場",
		"FG" : "先得分",
		"R" : "讓球",
		"OU" : "大小",
		"EO" : "單雙",
		"2R" : "一輸二贏",
		"M" : "獨贏",
		"BD" : "波膽",
		"RE" : "走地讓球",
		"REO" : "走地單雙",
		"PD" : "波膽",
		"T" : "總入球",
		"F" : "半全場",
		"ROU" : "走地大小",
		"PR" : "讓分過關",
		"CPR" : "綜合過關",
		"P" : "標準過關",
		"MP" : "標準過關"
	},
	GetWagerTitle = function (wager, game) {
		if (typeof game == 'undefined')
			return '';
		content = '';
		var result_h = '';
		var result_c = '';
		var sVO = '';
		var strRatio = '';
		var str = '';
		switch (wager['wtype']) {
		case 'R':
		case 'RE':
			if (game['game_over'] == 'Y') {
				result_h = "<B><FONT COLOR='#00cc00'>" + game['result_h'] + "</FONT></B>";
				result_c = "<B><FONT COLOR='#00cc00'>" + game['result_c'] + "</FONT></B>";
			}
			if (game['gamememo'] == "VO")
				sVO = "<B><FONT COLOR='#00cc00'>(" + "提前結束" + ")</FONT></B>";
			if (game['place'] == 'M')
				str = "中";
			else if (game['place'] == 'B')
				str = "補";
			else
				str = "主";

			if (wager['strong'] == "Y") {
				//押強隊
				if (wager['gtype'] == 'FT' || wager['gtype'] == 'EF')
					//strRatio = ShowRadioTitleFT(wager['concede'],wager['ratio']);
					strRatio = EZ.Concede(wager['concede'], wager['ratio']).show(1);
				else
					strRatio = EZ.Concede(wager['concede'], wager['ratio']).show(2);
				if (wager['type'] == "H")
					return game['team_h'] + result_h + "[" + str + "]<SPAN STYLE=\"color:blue;\">" + strRatio + "</SPAN>" + game['team_c'] + result_c + sVO;
				else if (wager['type'] == "C")
					return game['team_c'] + result_c + "<SPAN STYLE=\"color:blue;\">" + strRatio + "</SPAN>" + game['team_h'] + result_h + "[" + str + "]" + sVO;
			} else {
				//押弱隊
				if (wager['gtype'] == 'FT' || wager['gtype'] == 'EF')
					strRatio = EZ.Concede(wager['concede'], wager['ratio']).show(1);
				else
					strRatio = EZ.Concede(wager['concede'], wager['ratio']).show(2);
				if (wager['type'] == "H")
					return game['team_c'] + result_c + "<SPAN STYLE=\"color:blue;\">" + strRatio + "</SPAN>" + game['team_h'] + result_h + "[" + str + "]" + sVO;
				else if (wager['type'] == "C")
					return game['team_h'] + result_h + "[" + str + "]<SPAN STYLE=\"color:blue;\">" + strRatio + "</SPAN>" + game['team_c'] + result_c + sVO;
			}
			break;
		case 'OU':
		case 'ROU':
			if (wager['gtype'] == 'LO' || wager['gtype'] == 'ST') {
				if (game['game_over'] == "Y") {
					result_h = "<B><FONT COLOR='#00cc00'>" + game['result_h'] + "</FONT></B>";
				}
				return "&nbsp;[" + game['league'] + "]&nbsp;&nbsp;" + game['team_h'] + result_h + "<SPAN STYLE=\"color:blue;\"></SPAN>";
			}
			if (game['game_over'] == "Y") {
				result_h = "<B><FONT COLOR='#00cc00'>" + game['result_h'] + "</FONT></B>";
				if (game['gamememo'] != "VO")
					result_c = "<B><FONT COLOR='#00cc00'>" + game['result_c'] + "</FONT></B>";
				else
					result_c = "<B><FONT COLOR='#00cc00'>" + game['result_c'] + "(提前結束)</FONT></B>";
			}
			if (game['place'] == 'M')
				str = "中";
			else if (game['place'] == 'B')
				str = "補";
			else
				str = "主";
			return game['team_h'] + result_h + "[" + str + "]<SPAN STYLE=\"color:blue;\">VS</SPAN>" + game['team_c'] + result_c;
			break;
		case 'M':
			if (game['game_over'] == "Y") {
				result_h = "<B><FONT COLOR='#00cc00'>" + game['result_h'] + "</FONT></B>";
				result_c = "<B><FONT COLOR='#00cc00'>" + game['result_c'] + "</FONT></B>";
			}
			if (game['place'] == 'M')
				str = "中";
			else if (game['place'] == 'B')
				str = "補";
			else
				str = "主";
			if (game['gamememo'] == "VO")
				sVO = "<B><FONT COLOR='#00cc00'>(提前結束)</FONT></B>";
			return game['team_h'] + result_h + "[" + str + "]<SPAN STYLE=\"color:blue;\">VS</SPAN>" + game['team_c'] + result_c + sVO;
			break;
		case 'CPR':
		case 'PR':
		case 'PM':
			break;
		case '2R':
			if (game['game_over'] == "Y") {
				result_h = "<B><FONT COLOR='#00cc00'>" + game['result_h'] + "</FONT></B>";
				if (game['gamememo'] != "VO")
					result_c = "<B><FONT COLOR='#00cc00'>" + game['result_c'] + "</FONT></B>";
				else
					result_c = "<B><FONT COLOR='#00cc00'>" + game['result_c'] + "(提前結束)</FONT></B>";
			}

			if (game['place'] == 'M')
				str = "中";
			else if (game['place'] == 'B')
				str = "補";
			else
				str = "主";

			if (wager['strong'] == "Y") {
				//押強隊
				if (wager['type'] == "H")
					return game['team_h'] + result_h + "[" + str + "]<SPAN STYLE=\"color:blue;\">一輸</SPAN>" + game['team_c'] + result_c;
				else if (wager['type'] == "C")
					return game['team_c'] + result_c + "<SPAN STYLE=\"color:blue;\">一輸</SPAN>" + game['team_h'] + result_h + "[" + str + "]";
			} else {
				//押弱隊
				if (wager['type'] == "H")
					return game['team_c'] + result_c + "<SPAN STYLE=\"color:blue;\">一輸</SPAN>" + game['team_h'] + result_h + "[" + str + "]";
				else if (wager['type'] == "C")
					return game['team_h'] + result_h + "[" + str + "]<SPAN STYLE=\"color:blue;\">一輸</SPAN>" + game['team_c'] + result_c;
			}
			break;
		case 'EO':
			if (game['gtype'] == "LO" || game['gtype'] == "ST") {
				if (game['game_over'] == "Y") {
					result_h = "<B><FONT COLOR='#00cc00'>" + game['result_h'] + "</FONT></B>";
				}
				return "&nbsp;[" + game['league'] + "]&nbsp;&nbsp;" + game['team_h'] + result_h + "<SPAN STYLE=\"color:blue;\"></SPAN>";
			}
			if (game['game_over'] == "Y") {
				result_h = "<B><FONT COLOR='#00cc00'>" + game['result_h'] + "</FONT></B>";
				result_c = "<B><FONT COLOR='#00cc00'>" + game['result_c'] + "</FONT></B>";
			}
			return game['team_h'] + result_h + "[主]<SPAN STYLE=\"color:blue;\">VS</SPAN>" + game['team_c'] + result_c;
			break;
		default:
			break;
		}
		return content;
	},
	GetWagerContent = function (wager, game) {
		content = '';
		var playModeName = '';
		var gameTypeName = '';
		var PName = '';
		var gameType = '';
		var ioratioP;
		switch (wager['wtype']) {
		case 'R':
		case 'RE':
		case 'M':
		case '2R':
			wager['ioratio'] = parseFloat(wager['ioratio']);
			ioratioP = wager['ioratio'];
			ioratioP = ioratioP.toFixed(3);
			if (game['league_id'] > 70) {
				if (game['league_id'] == "73")
					gameTypeName = '上半場';
				else if (game['league_id'] == "74")
					gameTypeName = '下半場';
				else
					gameTypeName = dictionary[wager['gtype']];
				gameType = "<FONT color='gray'><B><" + gameTypeName + "></B></FONT>";
			}
			if (wager['IsSub'] != null)
				PName = "[讓球]";
			if (wager['type'] == "H")
				return PName + "<SPAN STYLE=\"color: rgb(255,0,0);\">" + game['team_h'] + "</SPAN> " + gameType + " &nbsp;@&nbsp; <SPAN STYLE=\"color: rgb(255,0,0);\"><B>" + ioratioP + "</B></SPAN>"; //wager['ioratio']
			else if (wager['type'] == "C")
				return PName + "<SPAN STYLE=\"color: rgb(255,0,0);\">" + game['team_c'] + "</SPAN> " + gameType + " &nbsp;@&nbsp; <SPAN STYLE=\"color: rgb(255,0,0);\"><B>" + ioratioP + "</B></SPAN>";
			else if (wager['type'] == "N")
				return PName + "<SPAN STYLE=\"color: rgb(255,0,0);\">和局</SPAN> " + gameType + " &nbsp;@&nbsp; <SPAN STYLE=\"color: rgb(255,0,0);\"><B>" + ioratioP + "</B></SPAN>";
			break;
		case 'OU':
		case 'ROU':
			gameType = "";
			if (game['league_id'] > 70) {
				if (game['league_id'] == "73")
					gameTypeName = '上半場';
				else if (game['league_id'] == "74")
					gameTypeName = '下半場';
				else
					gameTypeName = dictionary[wager['gtype']];
				gameType = "<FONT color='gray'><B><" + gameTypeName + "></B></FONT>";
			}
			if (wager['type'] == "H")
				return "<SPAN STYLE=\"color: rgb(255,0,0);\">大 " + gameType + " &nbsp;" + EZ.Concede(wager['concede'], wager['ratio']).show(2) + "</SPAN> &nbsp;@&nbsp; <SPAN STYLE=\"color: rgb(255,0,0);\"><B>" + wager['ioratio'] + "</B></SPAN>";
			else
				return "<SPAN STYLE=\"color: rgb(255,0,0);\">小 " + gameType + " &nbsp;" + EZ.Concede(wager['concede'], wager['ratio']).show(2) + "</SPAN> &nbsp;@&nbsp; <SPAN STYLE=\"color: rgb(255,0,0);\"><B>" + wager['ioratio'] + "</B></SPAN>";
			break;
		case 'CPR':
		case 'PR':
		case 'PM':
			break;
		case 'EO':
		case 'REO':
			wager['ioratio'] = parseFloat(wager['ioratio']);
			ioratioP = wager['ioratio'];
			ioratioP = ioratioP.toFixed(3);
			gameType = "";
			if (game['league_id'] > 70) {
				if (game['league_id'] == "73")
					gameTypeName = '上半場';
				else if (game['league_id'] == "74")
					gameTypeName = '下半場';
				else
					gameTypeName = dictionary[wager['gtype']];
				gameType = "<FONT color='gray'><B><" + gameTypeName + "></B></FONT>";
			}
			if (wager['type'] == "ODD" || wager['type'] == "RODD")
				return "<SPAN STYLE=\"color: rgb(255,0,0);\">單 " + gameType + " &nbsp</SPAN> &nbsp;@&nbsp; <SPAN STYLE=\"color: rgb(255,0,0);\"><B>" + ioratioP + "</B></SPAN>";
			else if (wager['type'] == "EVEN" || wager['type'] == "REVE")
				return "<SPAN STYLE=\"color: rgb(255,0,0);\">雙 " + gameType + " &nbsp</SPAN> &nbsp;@&nbsp; <SPAN STYLE=\"color: rgb(255,0,0);\"><B>" + ioratioP + "</B></SPAN>";
			break;
		default:
			break;
		}
		return content;
	},
	init = function () {},
	Self = function (wager, games) {
		if (wager['wid']) {
			wager['wid'] = EZ.padLeft(wager['wid'], 6);
		} else if (wager['WDT_id'])
			wager['wid'] = wager['WDT_id'];
		else if (wager['WOU_id'])
			wager['wid'] = wager['WOU_id'];
		else if (wager['WPS_id'])
			wager['wid'] = wager['wagers_id'];
		else
			wager['wid'] = wager['id'];

		if (wager['wtype'] != 'CPR' && wager['wtype'] != 'PM' && wager['wtype'] != 'PR') {
			var sResult = '';
			sResult += "<FONT COLOR='gray'>[" + wager['gtype'] + wager['gid'] + "]</FONT>";
			var wagertitle = GetWagerTitle(wager, games[wager['site'] + '.' + wager['gtype'] + '.' + wager['gid']]);
			var wagercontent = GetWagerContent(wager, games[wager['site'] + '.' + wager['gtype'] + '.' + wager['gid']]);
			sResult += wagertitle + "<br />" + wagercontent;
			return sResult;

		} else //過關
		{
			var sResult = '';
			for (var i = 0; i < wager['SubWagers'].length; i++) {
				wager['SubWagers'][i]['ioratio'] = wager['SubWagers'][i]['ioratio'] / 1000;
				if (wager['SubWagers'][i]['result'] == "NC") {
					sResult += "<s><FONT COLOR='gray'>[" + wager['SubWagers'][i]['gtype'] + wager['SubWagers'][i]['gid'] + "]</FONT>" + GetWagerTitle(wager['SubWagers'][i], games[wager['site'] + '.' + wager['SubWagers'][i]['gtype'] + '.' + wager['SubWagers'][i]['gid']]) + "<BR>" + GetWagerContent(wager['SubWagers'][i], games[wager['site'] + '.' + wager['SubWagers'][i]['gtype'] + '.' + wager['SubWagers'][i]['gid']]) + "<BR></s>";
				} else {
					sResult += "<FONT COLOR='gray'>[" + wager['SubWagers'][i]['gtype'] + wager['SubWagers'][i]['gid'] + "]</FONT>" + GetWagerTitle(wager['SubWagers'][i], games[wager['site'] + '.' + wager['SubWagers'][i]['gtype'] + '.' + wager['SubWagers'][i]['gid']]) + "<BR>" + GetWagerContent(wager['SubWagers'][i], games[wager['site'] + '.' + wager['SubWagers'][i]['gtype'] + '.' + wager['SubWagers'][i]['gid']]) + "<BR>";
				}
			}
			return sResult;
		}
	}
	init();
	return Self;
}
();
//divGrid
/*
var grid = new EZ.divGrid({
columns : columns()
,width : 760  //鎖定grid寬度,如果 columns 欄位總和寬度比他大 則無視,比他小 則把resizeable 的欄位拉寬 直到grid 寬度為此值
,renderTo : opt.container
,cls : 'divGrid'
,group :{
field:'e'
,enable:true
,tpl:function(value, p , record , rowIndex, columnIndex){
var name = Model.Ratio.ln[gtype][value];
return (typeof name != 'undefined') ? name : value;
}
}
});
grid.show(data);
grid.update(data);
 */
EZ.unique_id_bk = function (num) {
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
};
EZ.unique_id = function (num) {
	var t = [
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
	];
	var f = [];
	for (var i = 0; i < num; i++) {
		f[i] = t[(i != 0) ? Math.floor((Math.random() * 62)) : Math.floor((Math.random() * 52))];
	}
	return f.join('');
};

//複製object
EZ.clone = function (obj) {
	// Handle the 3 simple types, and null or undefined
	if (null == obj || "object" != typeof obj)
		return obj;
	// Handle Date
	if (obj instanceof Date) {
		var copy = new Date();
		copy.setTime(obj.getTime());
		return copy;
	}
	// Handle Array
	if (obj instanceof Array) {
		var copy = [];
		for (var i = 0, len = obj.length; i < len; ++i) {
			copy[i] = this.clone(obj[i]);
		}
		return copy;
	}
	// Handle Object
	if (obj instanceof Object) {
		var copy = {};
		for (var attr in obj) {
			if (obj.hasOwnProperty(attr))
				copy[attr] = this.clone(obj[attr]);
		}
		return copy;
	}
	throw new Error("Unable to copy obj! Its type isn't supported.");
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
// script tag proxy
EZ.script = new function () {
	var scripts = []
	return function (src) {
		if (scripts.length > 30) {
			for (var i = 0; i < 20; i++) {
				var s = scripts.shift();
				s.parentNode.removeChild(s);
				if (EZ.System.isIE == false) {
					for (var prop in s)
						delete s[prop];
				}
				delete s;
			}
			if (typeof CollectGarbage != 'undefined')
				CollectGarbage();
		}
		var s = document.createElement('script');
		s.setAttribute('type', 'text/javascript');
		s.setAttribute('src', src);
		s.setAttribute('charset', 'utf-8');
		var head = document.getElementsByTagName('head')[0];
		if (head)
			head.appendChild(s);
		else
			document.body.appendChild(s);
		scripts[scripts.length] = s;
		/*
		var done = false;
		s.onload = s.onreadystatechange = function(){
		if (!done && (!s.readyState || s.readyState == 'loaded' || s.readyState == 'complete')) {
		done = true;
		s.parentNode.removeChild(s);
		//for(var prop in s) delete s[prop];
		//s.onreadystatechange = null; s.abort = null;s.onload = null; s = null;
		delete s;
		if(typeof CollectGarbage != 'undefined') CollectGarbage();
		}
		}
		 */
	}
}
();
EZ.StopWatch = function () {
	var startTime = null;
	var stopTime = null;
	var running = false;
	this.start = function () {
		if (running == true)
			return;
		else if (startTime != null)
			stopTime = null;

		running = true;
		startTime = getTime();
	}
	this.stop = function () {
		if (running == false)
			return;
		stopTime = getTime();
		running = false;
	}
	this.duration = function () {
		if (startTime == null || stopTime == null)
			return 'Undefined';
		else
			return (stopTime - startTime) / 1000;
	}
	this.isRunning = function () {
		return running;
	}
	function getTime() {
		return new Date().getTime();
	}
}
EZ.is_array = function (obj) {
	return (typeof(obj) == 'object' && (obj instanceof Array));
}
EZ.is_object = function (obj) {
	return (typeof(obj) == 'object' && (obj instanceof Array ==false && obj instanceof Object ==true ));
}
EZ.ConnReady = function () {
	var self = this,
	_ready = EZ.emptyFN,
	sendTime = 0,
	counter = 0,
	connecting = false,
	Waiting = function () {
		if (counter != 0 && (new Date().getTime() - sendTime) < 5000) {
			setTimeout(Waiting, 100);
		} else {
			connecting = false;
			_ready();
		}
	},
	Self = {
		add : function () {
			sendTime = new Date().getTime();
			counter++;
			if (connecting == false) {
				connecting = true;
				setTimeout(Waiting, 100);
			}
		},
		dec : function () {
			counter--;
		},
		Ready : function (cb) {
			_ready = cb;
		}
	}
	return Self;
}

//trigger 系統
EZ._trigger = new function () {
	var events = {}
	return {
		trigger : function (e) {
			if (typeof e.name != 'undefined' && e.name) {
				var fns = events[e.name];
				if (fns) {
					for (var i = 0; i < fns.length; i++) {
						fns[i].apply(this, [e]);
					}
				}
			}
		}
		//註冊事件 e.name e.fn
	,
		setEvent : function (e) {
			if (typeof e.name != 'undefined' && e.name) {
				if (events[e.name]) {
					events[e.name].push(e.fn);
				} else {
					events[e.name] = [];
					events[e.name].push(e.fn);
				}
			}
		}
	}
}
();
EZ.trigger = EZ._trigger.trigger;
EZ.setEvent = EZ._trigger.setEvent;

//變數系統
EZ.global = new function () {
	var global = {}
	return {
		// 存變數
		set : function (k, v) {
			global[k] = v;
		}
		// 取變數
	,
		get : function (key) {
			return global[key] || '';
		}
	}
}
();
EZ.set = EZ.global.set;
EZ.get = EZ.global.get;

//檔案上傳
EZ.FileUpload = function () {
	var self = this,
	uploading = false,
	style = 0,
	loading = function () {
		if (uploading == false) {
			DOM.button.innerHTML = opt.buttonName + EZ.lang('完成');
			setTimeout(function(){
				DOM.button.innerHTML = opt.buttonName;
			},2000);
			DOM.button.style.backgroundColor = '#880000';
			return;
		}
		if (style == 0) {
			style = 1;
			DOM.button.style.backgroundColor = '#880000';
		} else {
			DOM.button.style.backgroundColor = '#CC0000';
			style = 0;
		}
		setTimeout(loading, 500);
	},
	formData = {
		cmd : '969',
		parame : {
			uid : uid
		}
	},
	DOM = {
		form : null,
		button : null,
		iframe : null,
		file : null,
		submit : null,
		cmd : null
	},
	ID = {
		iframe : EZ.id()
	},
	onload = function (Self, e) {
		uploading = false;
		//opt.onload(Self, e);
		opt.onload.apply(Self,[Self,e]);
	},
	opt = {
		buttonName : EZ.lang('上傳檔案')
		//選好檔案
		,onchange : function (Self, e) {
			Self.submit();
		}
		,_onchange : function(Self,e){
			
		}
		//點擊按鈕
		,onclick : function (Self, e) {}
		//載完檔案
		,onload : function (Self, e) {}
		//php路徑
		,url : '../pub/gateway.php'
		,renderTo : null
		,cls:'EZuploadbutton'
	},
	isInit = false,
	init = function () {

		if (isInit == false) {
			DOM.button = document.createElement('a');
			DOM.button.className = opt.cls;
			DOM.button.style.fontSize = '12px';
			DOM.button.onclick = function (e) {
				opt.onclick(Self, e);
			}

			DOM.form = document.createElement('form');
			DOM.form.style.display = 'inline-block';
			//DOM.form.enctype='multipart/form-data';
			DOM.form.setAttribute('enctype', 'multipart/form-data');
			DOM.form.setAttribute('method', 'post');
			DOM.form.setAttribute('target', ID.iframe);
			//DOM.form.method = 'post';
			//DOM.form.target = ID.iframe;
			DOM.form.style.margin = '0';
			DOM.form.style.padding = '0';
			DOM.form.style.position = 'relative';
			DOM.form.style.overflow = 'hidden';
			try {
				DOM.iframe = document.createElement('<iframe name="' + ID.iframe + '">');
			} catch (e) {
				DOM.iframe = document.createElement('iframe');
				DOM.iframe.setAttribute('name', ID.iframe);
			}
			DOM.iframe.style.display = 'none';

			document.body.appendChild(DOM.iframe);
			if (DOM.iframe.attachEvent) {
				var func = function () {
					DOM.iframe.attachEvent("onload", function (e) {
						onload(Self, e);
					});
				}
				setTimeout(func, 1000);
			} else {
				DOM.iframe.onload = function (e) {
					onload(Self, e);
				}
			}
			try {
				DOM.file = document.createElement('<input name="imagefile">');
				DOM.file.setAttribute('type', 'file');
			} catch (e) {
				DOM.file = document.createElement('input');
				DOM.file.setAttribute('name', 'imagefile');
				DOM.file.setAttribute('type', 'file');
			}

			//DOM.file.type='file';
			DOM.file.style.margin = '0';
			DOM.file.style.padding = '0';
			DOM.file.style.fontSize = '118px';
			DOM.file.style.position = 'absolute';
			DOM.file.style.right = '0px';
			DOM.file.style.top = '0px';
			DOM.file.style.cursor = 'pointer';
			DOM.file.className = 'EZopacity0';
			//DOM.file.setAttribute('multiple','multiple');
			//DOM.file.setAttribute('accept','image/*');
			DOM.file.onchange = function (e) {
				opt.onchange(Self, e);
				opt._onchange.apply(Self,[Self,e]);
			}

			//<input type="hidden" name="cmd" value='{"cmd":"969","parame":{"uid":"489443636"}}'>
			try {
				DOM.cmd = document.createElement('<input type="hidden" name="cmd">');
				DOM.cmd.value = '';
			} catch (e) {
				DOM.cmd = document.createElement('input');
				DOM.cmd.setAttribute('type', 'hidden');
				DOM.cmd.setAttribute('name', 'cmd');
				DOM.cmd.setAttribute('value', '');
			}
			DOM.form.appendChild(DOM.cmd);
			DOM.form.appendChild(DOM.button);
			DOM.form.appendChild(DOM.file);

			//DOM.submit = document.createElement('input');
			//DOM.submit.type='submit';
			//DOM.form.appendChild(DOM.submit);

			opt.renderTo.appendChild(DOM.form);
			//document.body.appendChild(DOM.form);
		}
		DOM.form.action = opt.url;
		DOM.button.innerHTML = opt.buttonName;

		//renderTo

		if (isInit == false) {
			//opt.renderTo.appendChild(DOM.button);
		}
		isInit = true;
	},
	Self = {
		init : function (o) {
			opt.buttonName = o.buttonName || opt.buttonName;
			opt._onchange = o.onchange || opt._onchange;
			opt.onclick = o.onclick || opt.onclick;
			opt.onload = o.onload || opt.onload;
			opt.url = o.url || opt.url;
			opt.renderTo = o.renderTo || opt.renderTo;
			opt.cls = o.cls || opt.cls;
			if (typeof opt.renderTo == 'string') {
				opt.renderTo = document.getElementById(opt.renderTo);
			}
			if (typeof opt.renderTo != 'undefined') {
				init();
			}
		},
		GET : {},
		POST : {},
		submit : function () {
			//DOM.form.style.display='block';
			//DOM.iframe.style.display='block';
			uploading = true;
			DOM.button.innerHTML = EZ.lang('上傳中...');
			DOM.cmd.setAttribute('value', EZ.JSON.encode(formData));
			DOM.form.action = opt.url + '?c=' + formData['cmd'];
			loading();
			DOM.form.submit();
			//DOM.form.display='none';
			//DOM.submit.click();
		},
		set : function (k, v) {
			//formData
			formData['parame'][k] = v;
			//'{"cmd":"969","parame":{"uid":""}}'
		},
		cmd : function (cmd) {
			formData['cmd'] = cmd;
		},
		content : function () {
			var iFrame = DOM.iframe;
			var iFrameBody = '';
			if (iFrame.contentDocument) {
				iFrameBody = iFrame.contentDocument.getElementsByTagName('body')[0];
			} else if (iFrame.contentWindow) {
				iFrameBody = iFrame.contentWindow.document.getElementsByTagName('body')[0];
			}
			return iFrameBody.innerHTML;
		}
	}
	return Self;
};

//View , Model
EZ.View = new function () {
	var self = this,
	views = {},
	_constructors = {},
	Self = function (key, _constructor) {
		if (typeof _constructor == 'undefined') {
			if (typeof _constructors[key] == 'undefined') {
				alert('View: ' + key + ' is not defined');
				return;
			}
			if (typeof views[key] == 'undefined') {
				views[key] = new _constructors[key]();
			}
			return views[key];
		} else {
			if (typeof _constructors[key] == 'undefined') {
				_constructors[key] = _constructor;
			} else {
				alert('View key(' + key + ') is already exist. ');
			}
		}
	};
	Self.constructor = function (key) {
		return _constructors[key] || function () {};
	}
	return Self;
}
();

EZ.Model = new function () {
	var self = this,
	models = {},
	_constructors = {},
	Self = function (key, _constructor) {
		if (typeof _constructor == 'undefined') {
			if (typeof _constructors[key] == 'undefined') {
				alert('Model: ' + key + ' is not defined');
				return;
			}
			return new _constructors[key]();
			/*
			if(typeof models[key] == 'undefined'){
			models[key] = new _constructors[key]();
			}
			return models[key];
			 */
		} else {
			if (typeof _constructors[key] == 'undefined') {
				_constructors[key] = _constructor;
			} else {
				alert('Model key(' + key + ') is already exist. ');
			}
		}
	};
	Self.constructor = function (key) {
		return _constructors[key] || function () {};
	}
	return Self;
}
();

EZ.StopWatch = function () {
	var start = 0,
	count = 0,
	status = 'stop',
	Self = {
		play : function () {
			switch (status) {
			case 'play':
				break;
			case 'stop':
				count = 0;
				start = new Date().getTime();
				break;
			case 'pause':
				start = new Date().getTime();
				break;
			default:
				break;
			}
			status = 'play';
			return ((new Date().getTime()) - start);
		},
		stop : function () {
			status = 'stop';
			count += (new Date().getTime()) - start;
			return count;
		},
		pause : function () {
			status = 'pause';
			count += (new Date().getTime()) - start;
			return count;
		},
		show : function () {
			switch (status) {
			case 'play':
				return ((new Date().getTime()) - start);
			case 'stop':
				return 0;
			case 'pause':
				return count;
			default:
				return 0;
			}

		}
	}
	return Self;
}

EZ.this_week = function(){
	var curr = new Date(); // get current date
	var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
	var last = first + 6; // last day is the first day + 6
	var firstday = EZ.Date(new Date(curr.setDate(first))).show('Y-mm-dd');
	var lastday = EZ.Date(new Date(curr.setDate(last))).show('Y-mm-dd');
	return {from:firstday,to:lastday};
}
//plugin
if (typeof Ext != 'undefined') {
	Ext.onReady(function () {
		if (Ext.MessageBox) {
			Ext.MessageBox.buttonText.yes = EZ.lang("確定");
			Ext.MessageBox.buttonText.no = EZ.lang("取消");
			Ext.MessageBox.buttonText.cancel = EZ.lang("取消");
			Ext.MessageBox.buttonText.ok = EZ.lang("確定");
			Ext.MessageBox.buttonText.title = EZ.lang("網頁訊息");
		}
		//1.彈跳訊息
		EZ.alert = function (text, callback) {
			if (typeof callback == 'undefined')
				callback = Ext.emptyFn;
			Ext.MessageBox.show({
				title : Ext.MessageBox.buttonText.title,
				msg : text,
				buttons : Ext.MessageBox.OK, //Ext.MessageBox.OKCANCEL  Ext.MessageBox.YESNOCANCEL  Ext.MessageBox.OK
				fn : callback,
				icon : Ext.MessageBox.WARNING //Ext.MessageBox.WARNING Ext.MessageBox.QUESTION Ext.MessageBox.INFO  Ext.MessageBox.ERROR;
			});
		};
		//2.confirm
		EZ.confirm = function (text, yesFunction, noFunction) {
			var func = function (rtn) {
				if (rtn == 'ok') {
					yesFunction();
				} else if (rtn == 'cancel') {
					noFunction();
				};
			}
			Ext.MessageBox.show({
				title : Ext.MessageBox.buttonText.title,
				msg : text,
				buttons : Ext.MessageBox.OKCANCEL,
				fn : func,
				icon : Ext.MessageBox.QUESTION
			});
		};
		//3. ajax  EZ.ajax(url,_POST,callback);
		EZ.ajax = function (URL, _POST, callback) {
			if (typeof(_POST) == 'undefined') {
				_POST = {};
			}
			Ext.Ajax.request({
				url : URL,
				params : _POST,
				success : function (result, request) {
					if (typeof(callback) != 'undefined') {
						callback(result.responseText);
					}
				},
				faulure : function () {
					EZ.alert(EZ.lang('伺服器無回應'));
				},
				header : {
					'abc' : 'a'
				},
				method : 'post'
			});
		};
		//4 gateway

		EZ.Send = function (cmd, parame, callback, parent) {
			//alert(cmd);
			var allowDraw = true;
			var tmpContainer = '';
			//EZ.log(''+parame.className+'.allowDraw = '+allowDraw);

			EZ.connects++;
			var _post = {};
			//_post['cmd'] = this.getSendString( {cmd:cmd,parame:this.getSendString(parame)} );
			var tt = EZ.randomx();
			_post['cmd'] = Ext.util.JSON.encode({
					cmd : cmd,
					parame : parame,
					tt : tt
				});
			var url;
			if (debug == true) {
				//url='../pub/gateway.php?c='+_post['cmd'];
				url = '../pub/gateway.php?c=' + cmd;
			} else {
				url = '../pub/gateway.php?c=' + cmd;
			}
			Ext.Ajax.timeout = 180000; 
			Ext.Ajax.request({
				url : url,
				params : _post,
				success : function (result, request) {
					//alert(result.responseText);
					var json;
					EZ.connects--;
					if (typeof parame.className != 'undefined' && typeof config != 'undefined') {
						var tmp = {};
						var isFound = false;
						//去設定檔找 className
						var tmpConfig = [];
						for (var i = 0; i < config.length; i++)
							tmpConfig[tmpConfig.length] = config[i];
						if (typeof defaultShow != 'undefined') {
							for (var i = 0; i < defaultShow.length; i++)
								tmpConfig[tmpConfig.length] = defaultShow[i];
						}
						for (var i = 0; i < tmpConfig.length; i++) {
							var c = tmpConfig[i];
							if (c.object == parame.className) {
								tmp = c;
								isFound = true;
								break;
							}
							for (var j = 0; j < c.child.length; j++) {
								var cc = c.child[j];
								if (cc.object == parame.className) {
									tmp = cc;
									isFound = true;
									break;
								}
							}
						}
						if (isFound == true) {
							if (typeof tmp.container != 'undefined' && tmp.container != '' && tmp.container != null) {
								tmpContainer = tmp.container;
								var tmpDom = document.getElementById(tmp.container);
								if (typeof tmpDom != 'undefined' && tmpDom != null && typeof tmpDom.Owner != 'undefined' && tmpDom.Owner != null) {
									if (tmp.object != tmpDom.Owner) {
										//EZ.log(tmp.object + '!=' +tmpDom.Owner);
										allowDraw = false;
									}
								}
							}
						}
					}
					//EZ.log(parame.className+'.'+tmpContainer+'.allowDraw = '+allowDraw);

					try {
						json = Ext.util.JSON.decode(result.responseText);
					} catch (e) {
						// EZ.debug("Json Error! cmd=" + cmd + "\n" + result.responseText);
						EZ.log("Json Error! cmd=" + cmd + "\n" + result.responseText);
						return;
					}
					//判斷登出
					if (json.err == false && json.err_msg == 'logout') {
						// EZ.debug("Json Error! cmd=" + cmd + "\n" + result.responseText); 
						EZ.log("Json Error! cmd=" + cmd + "\n" + result.responseText);
						location.replace('../index.php');
					}

					//EZ.log(parame.className+'.'+tmpContainer+'.allowDraw = '+allowDraw);

					if (typeof(callback) != 'undefined' && allowDraw == true) {
						//EZ.log('cmd='+cmd+':'+parame.className+'.'+tmpContainer+'.callback = '+allowDraw);
						//EZ.log(parame.className+' run callback');
						if (parent) {
							callback.call(parent, json);
						} else {
							callback(json);
						}
					}

				},
				faulure : function () {
					EZ.connects--;
					EZ.alert(EZ.lang('伺服器無回應'));
				},
				header : {
					'abc' : 'a'
				},
				method : 'post'
			});
		};
		//5. ajaxReady
		EZ.ajaxReady = function (callback, parent) {
			if (EZ.connects > 0) {
				var func = EZ.delegate(EZ.ajaxReady, [callback, parent], parent);
				setTimeout(func, 100);
			} else {
				callback.apply(parent);
			}
		};

		//6 create Ext item  如果畫面是用拼的時候 使用此function create Ext item
		EZ.createExtItem = function (parent, item, id, timeblock) {
			timeblock = (timeblock) ? timeblock : 500;
			var func = EZ.delegate(
					function () {
					item.render(id);
				},
					[item, id],
					parent);
			setTimeout(func, timeblock)
		};
		//7 checkboxs 全選
		EZ.selectAll = function (attValue) {
			var chks = Ext.query("input");
			for (var i = 0, ilen = chks.length; i < ilen; i++) {
				var c = chks[i];
				if (c.getAttribute('UseFor') == attValue) {
					c.checked = true;
				}
			}
		};
		//8 checkbox 全取消
		EZ.cancelAll = function (attValue) {
			var chks = Ext.query("input");
			for (var i = 0, ilen = chks.length; i < ilen; i++) {
				var c = chks[i];
				if (c.getAttribute('UseFor') == attValue) {
					c.checked = false;
				}
			}
		};
		//9 checkbox 取得勾選
		EZ.getCheckboxValue = function (attValue) {
			var chks = Ext.query("input");
			var rtn = [],
			r = 0;
			for (var i = 0, ilen = chks.length; i < ilen; i++) {
				var c = chks[i];
				if (c.getAttribute('UseFor') == attValue && c.checked == true) {
					rtn[++r] = c.getAttribute('value');
				}
			}
			return rtn;
		};
		//JSON
		EZ.JSON = Ext.util.JSON;
	});
} else if (typeof jQuery != 'undefined') {
	EZ.ajax = function (URL, _POST, callback) {
		if (typeof(_POST) == 'undefined') {
			_POST = {};
		}
		jQuery.ajax({
			type : 'POST',
			data : _POST,
			cache : false,
			url : URL,
			success : function (result, request) {
				if (typeof(callback) != 'undefined') {
					callback(result.responseText);
				}
			}
		});
	};
	jQuery.JSON = {
		encode : function (o) {
			if (typeof(JSON) == 'object' && JSON.stringify)
				return JSON.stringify(o);

			var type = typeof(o);

			if (o === null)
				return "null";

			if (type == "undefined")
				return undefined;

			if (type == "number" || type == "boolean")
				return o + "";

			if (type == "string")
				return this.quoteString(o);

			if (type == 'object') {
				if (typeof o.toJSON == "function")
					return this.encode(o.toJSON());

				if (o.constructor === Date) {
					var month = o.getUTCMonth() + 1;
					if (month < 10)
						month = '0' + month;

					var day = o.getUTCDate();
					if (day < 10)
						day = '0' + day;

					var year = o.getUTCFullYear();

					var hours = o.getUTCHours();
					if (hours < 10)
						hours = '0' + hours;

					var minutes = o.getUTCMinutes();
					if (minutes < 10)
						minutes = '0' + minutes;

					var seconds = o.getUTCSeconds();
					if (seconds < 10)
						seconds = '0' + seconds;

					var milli = o.getUTCMilliseconds();
					if (milli < 100)
						milli = '0' + milli;
					if (milli < 10)
						milli = '0' + milli;

					return '"' + year + '-' + month + '-' + day + 'T' + hours + ':'
					 + minutes + ':' + seconds + '.' + milli + 'Z"';
				}

				if (o.constructor === Array) {
					var ret = [];
					for (var i = 0; i < o.length; i++)
						ret.push(this.encode(o[i]) || "null");

					return "[" + ret.join(",") + "]";
				}

				var pairs = [];
				for (var k in o) {
					var name;
					var type = typeof k;

					if (type == "number")
						name = '"' + k + '"';
					else if (type == "string")
						name = this.quoteString(k);
					else
						continue; // skip non-string or number keys

					if (typeof o[k] == "function")
						continue; // skip pairs where the value is a function.

					var val = this.encode(o[k]);

					pairs.push(name + ":" + val);
				}

				return "{" + pairs.join(", ") + "}";
			}
		},

		/**
		 * jQuery.JSON.decode(src) Evaluates a given piece of json source.
		 */
		decode : function (src) {
			if (typeof(JSON) == 'object' && JSON.parse)
				return JSON.parse(src);
			return eval("(" + src + ")");
		},

		/**
		 * jQuery.JSON.decodeSecure(src) Evals JSON in a way that is *more* secure.
		 */
		decodeSecure : function (src) {
			if (typeof(JSON) == 'object' && JSON.parse)
				return JSON.parse(src);

			var filtered = src;
			filtered = filtered.replace(/\\["\\\/bfnrtu]/g, '@');
			filtered = filtered
				.replace(
					/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
					']');
			filtered = filtered.replace(/(?:^|:|,)(?:\s*\[)+/g, '');

			if (/^[\],:{}\s]*$/.test(filtered))
				return eval("(" + src + ")");
			else
				throw new SyntaxError("Error parsing JSON, source is not valid.");
		},

		/**
		 * jQuery.JSON.quoteString(string) Returns a string-repr of a string, escaping
		 * quotes intelligently. Mostly a support function for JSON.encode.
		 *
		 * Examples: >>> jQuery.JSON.quoteString("apple") "apple"
		 *
		 * >>> jQuery.JSON.quoteString('"Where are we going?", she asked.') "\"Where
		 * are we going?\", she asked."
		 */
		quoteString : function (string) {
			if (string.match(this._escapeable)) {
				return '"' + string.replace(this._escapeable, function (a) {
					var c = this._meta[a];
					if (typeof c === 'string')
						return c;
					c = a.charCodeAt();
					return '\\u00' + Math.floor(c / 16).toString(16)
					 + (c % 16).toString(16);
				}) + '"';
			}
			return '"' + string + '"';
		},

		_escapeable : /["\\\x00-\x1f\x7f-\x9f]/g,

		_meta : {
			'\b' : '\\b',
			'\t' : '\\t',
			'\n' : '\\n',
			'\f' : '\\f',
			'\r' : '\\r',
			'"' : '\\"',
			'\\' : '\\\\'
		}
	}
	//JSON
	EZ.JSON = jQuery.JSON;
	$(document).ready(function () {
		//1.彈跳訊息
		EZ.alert = new function () {
			var alertDiv = document.createElement('div');
			var button = {
				yes : EZ.lang("確定"),
				no : EZ.lang("取消"),
				cancel : EZ.lang("取消"),
				ok : EZ.lang("確定"),
				title : EZ.lang("系統訊息")
			}
			$(alertDiv).attr('title', button.title);

			var buttons = {};
			buttons[button.ok] = function () {
				$(alertDiv).dialog('close');
			}
			$(alertDiv).dialog({
				autoOpen : false,
				width : 300,
				minHeight : 100,
				modal : true,
				buttons : buttons,
				//hide: { effect: 'drop', direction: "up" },
				//show: { effect: 'drop', direction: "up" },
				// buttons: {
				// "確認": yesButton,
				// "取消": closeTradeWindow
				// },
				//dialogClass: className,
				overlay : {
					opacity : 0.7,
					background : "#FF8899"
				}
			});
			return function (text, callback) {
				$(alertDiv).dialog({
					close : callback
				});
				$(alertDiv).html(text);
				$(alertDiv).dialog('open');
			}
		}
		();

		//2.confirm
		EZ.confirm = new function () {
			var confirmDiv = document.createElement('div');
			//confirmDiv.style.display='none';
			var button = {
				yes : EZ.lang("確定"),
				no : EZ.lang("取消"),
				cancel : EZ.lang("取消"),
				ok : EZ.lang("確定"),
				title : EZ.lang("網頁訊息")
			}
			$(confirmDiv).attr('title', button.title);
			confirmDiv.id = 'ttt';
			var buttons = {};
			buttons[button.yes] = function () {}
			buttons[button.no] = function () {
				$(confirmDiv).dialog('close');
			}
			$(confirmDiv).dialog({
				autoOpen : false,
				width : 300,
				minHeight : 100,
				modal : true,
				buttons : buttons,
				//hide: { effect: 'drop', direction: "up" },
				//show: { effect: 'drop', direction: "up" },
				// buttons: {
				// "確認": yesButton,
				// "取消": closeTradeWindow
				// },
				//dialogClass: className,
				overlay : {
					opacity : 0.7,
					background : "#FF8899"
				}
			});

			var Self = function (text, yesFunction, noFunction) {
				if (typeof text == 'undefined') {
					$(confirmDiv).dialog('close');
					return;
				}
				$(confirmDiv).html(text);
				$(confirmDiv).on("dialogclose", noFunction);
				var buttons = {};
				buttons[button.yes] = function () {
					$(confirmDiv).dialog('close');
					yesFunction();
				}
				buttons[button.no] = function () {
					$(confirmDiv).dialog('close');
					noFunction();
				}
				$(confirmDiv).dialog('option', 'buttons', buttons);
				$(confirmDiv).dialog('open');
			}
			Self.html = function (text) {}
			return Self;
		}
		()

		EZ._confirm = new function () {
			var confirmDiv = document.createElement('div');
			//confirmDiv.style.display='none';
			var button = {
				yes : EZ.lang("確定"),
				no : EZ.lang("取消"),
				cancel : EZ.lang("取消"),
				ok : EZ.lang("確定"),
				title : EZ.lang("網頁訊息")
			}
			$(confirmDiv).attr('title', button.title);
			confirmDiv.id = 'ttt';
			var buttons = {};
			buttons[button.yes] = function () {}
			buttons[button.no] = function () {
				$(confirmDiv).dialog('close');
			}
			$(confirmDiv).dialog({
				autoOpen : false,
				width : 300,
				minHeight : 100,
				modal : true,
				buttons : buttons,
				//hide: { effect: 'drop', direction: "up" },
				//show: { effect: 'drop', direction: "up" },
				// buttons: {
				// "確認": yesButton,
				// "取消": closeTradeWindow
				// },
				//dialogClass: className,
				overlay : {
					opacity : 0.7,
					background : "#FF8899"
				}
			});

			var Self = function (text, yesFunction, noFunction, closeFunction) {
				if (typeof text == 'undefined') {
					$(confirmDiv).dialog('close');
					return;
				}
				$(confirmDiv).html(text);
				$(confirmDiv).on("dialogclose", closeFunction || EZ.emptyFN);
				var buttons = {};
				buttons[button.yes] = function () {
					$(confirmDiv).dialog('close');
					yesFunction();
				}
				buttons[button.no] = function () {
					$(confirmDiv).dialog('close');
					noFunction();
				}
				$(confirmDiv).dialog('option', 'buttons', buttons);
				$(confirmDiv).dialog('open');
			}
			Self.html = function (text) {}
			return Self;
		}
		()
		//EZ.Send
		EZ.Send = function (cmd, parame, callback, parent) {
			//alert(cmd);
			var allowDraw = true;
			var tmpContainer = '';
			//EZ.log(''+parame.className+'.allowDraw = '+allowDraw);

			EZ.connects++;
			var _post = {};
			//_post['cmd'] = this.getSendString( {cmd:cmd,parame:this.getSendString(parame)} );
			var tt = EZ.randomx();
			_post['cmd'] = jQuery.JSON.encode({
					cmd : cmd,
					parame : parame,
					tt : tt
				});
			var url;
			if (debug == true) {
				//url='../pub/gateway.php?c='+_post['cmd'];
				url = '../pub/gateway.php?c=' + cmd;
			} else {
				url = '../pub/gateway.php?c=' + cmd;
			}
			$.ajax({
				type : 'POST',
				data : _post,
				url : url,
				success : function (result) {
					var json;
					EZ.connects--;
					if (typeof parame.className != 'undefined' && typeof config != 'undefined') {
						var tmp = {};
						var isFound = false;
						//去設定檔找 className
						var tmpConfig = [];
						for (var i = 0; i < config.length; i++)
							tmpConfig[tmpConfig.length] = config[i];
						if (typeof defaultShow != 'undefined') {
							for (var i = 0; i < defaultShow.length; i++)
								tmpConfig[tmpConfig.length] = defaultShow[i];
						}
						for (var i = 0; i < tmpConfig.length; i++) {
							var c = tmpConfig[i];
							if (c.object == parame.className) {
								tmp = c;
								isFound = true;
								break;
							}
							for (var j = 0; j < c.child.length; j++) {
								var cc = c.child[j];
								if (cc.object == parame.className) {
									tmp = cc;
									isFound = true;
									break;
								}
							}
						}
						if (isFound == true) {
							if (typeof tmp.container != 'undefined' && tmp.container != '' && tmp.container != null) {
								tmpContainer = tmp.container;
								var tmpDom = document.getElementById(tmp.container);
								if (typeof tmpDom != 'undefined' && tmpDom != null && typeof tmpDom.Owner != 'undefined' && tmpDom.Owner != null) {
									if (tmp.object != tmpDom.Owner) {
										//EZ.log(tmp.object + '!=' +tmpDom.Owner);
										allowDraw = false;
									}
								}
							}
						}
					}
					//EZ.log(parame.className+'.'+tmpContainer+'.allowDraw = '+allowDraw);

					try {
						//json = EZ.JSON.decode(result);
						json = eval('(' + result + ')');
					} catch (e) {
						EZ.debug("Json Error! cmd=" + cmd + "\n" + result);
						return;
					}
					//判斷登出
					if (json.err == false && json.err_msg == 'logout') {
						location.replace('../index.php');
					}

					//EZ.log(parame.className+'.'+tmpContainer+'.allowDraw = '+allowDraw);

					if (typeof(callback) != 'undefined' && allowDraw == true) {
						//EZ.log('cmd='+cmd+':'+parame.className+'.'+tmpContainer+'.callback = '+allowDraw);
						//EZ.log(parame.className+' run callback');
						if (parent) {
							callback.call(parent, json);
						} else {
							callback(json);
						}
					}
				}
			});
		};
	});
} else {
	EZ.ajax = new function (url, _post, callback) {
		var create_ajax = function () {
			var http_request = false;
			if (window.XMLHttpRequest) { // Mozilla, Safari,...
				http_request = new XMLHttpRequest();
			} else if (window.ActiveXObject) { // IE
				try {
					http_request = new ActiveXObject("Msxml2.XMLHTTP");
				} catch (e) {
					try {
						http_request = new ActiveXObject("Microsoft.XMLHTTP");
					} catch (e) {}
				}
			}

			if (!http_request) {
				alert('Giving up :( Cannot create an XMLHTTP instance');
				return false;
			}
			return http_request;
		};

		return function (url, _post, callback) {
			var postdata;
			if (typeof _post != 'undefined') {
				postdata = '';
				for (var key in _post) {
					postdata += '&' + key + '=' + _post[key];
				}
			} else {
				postdata = null;
			}
			var tt = new Date().getTime();
			if (url.indexOf('?') == -1)
				url += '?tt=' + tt;
			else
				url += '&tt=' + tt;

			var xml_request = create_ajax();
			xml_request.open('POST', url, true);
			xml_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xml_request.setRequestHeader("Connection", "close");
			xml_request.send(postdata);
			xml_request.onreadystatechange = function () {
				if (xml_request.readyState == 4) {
					if (xml_request.status == 200) {
						if (typeof callback != 'undefined') {
							callback(xml_request.responseText);
						}
					} else {
						//alert ("伺服器處理錯誤");
						alert("Server is no response");
					}
				}
			}
		}
	}
	();
}

EZ.getScreenSize();
EZ.getInnerSize();
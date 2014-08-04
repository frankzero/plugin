"use strict";
if (typeof console == 'undefined') {
    console = {
        log : function () {},
        trace : function () {}
    }
}

(function(window,undefined){
    var 
    EZ = {},
    document = window.document
    ;
    
    EZ.r20 = /%20/g;
    
    EZ.class2type = {};
    
    EZ.core_toString = EZ.class2type.toString;
    
    var ds = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
    for(var i=0,imax=ds.length; i<imax ;i++){
        var name = ds[i];
        EZ.class2type[ "[object " + name + "]" ] = name.toLowerCase();
    }
    
    EZ.emptyFN = new Function();
    
    EZ.json_encode = JSON.stringify;
    
    EZ.json_decode = JSON.parse;
    
    EZ.loadjs = function(src, async){
        var fjs = document.getElementsByTagName('script')[0]
        ,js = document.createElement('script');
        
        js.type = 'text/javascript';
        
        js.async = (typeof async == 'undefined') ? true : async;
        
        js.src = src;
        
        fjs.parentNode.insertBefore(js,fjs);
        
        //http://faisalman.github.io/ua-parser-js/src/ua-parser.min.js
    }
    
    EZ.scriptUrl = (function() {
        var scripts = document.getElementsByTagName('script');
        var index = scripts.length - 1;
        var myScript = scripts[index];
        var tmp = myScript.src.split('/');
        
        return myScript.src.replace(tmp[tmp.length-1], '');
    })();
    
    /*
        載入lib
    */
    EZ.load = function(lib){
        EZ.loadjs(EZ.scriptUrl+'src/'+lib+'.js');
        return EZ;
    }
    
    EZ.isEmpty = function (obj) {
        return (typeof obj == 'undefined' || obj == null || obj == '') ? true : false;
    }
    
    EZ.typeof = function(obj){
        
        if(obj == null){
            return String(obj);
        }
        
        return typeof obj === "object" || typeof obj === "function" ?
        EZ.class2type[ EZ.core_toString.call(obj) ] || "object": typeof obj;
    }

    EZ.isFunction = function(obj){
        return EZ.typeof(obj) === "function";
    }

    EZ.isArray = Array.isArray || function(obj){
        return EZ.typeof(obj) === "array";
    }

    EZ.isNumeric = function(obj){
        return !isNaN( parseFloat(obj) ) && isFinite( obj );
    }

    EZ.isEmptyObject = function(obj){
        var name;
        for ( name in obj ) {
            return false;
        }
        return true;
    }


    EZ.object_to_querystring = function(a){
        var s = [],
        add = function(key,value){
            value = EZ.isFunction(value) ? value() : (value == null ? "" : value);
            s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
            //s[ s.length ] = key + "=" + value;
        },
        prefix,
        i,
        imax,
        buildParams = function(prefix, obj, add){
            var name,i,imax,v;
            
            if(EZ.isArray(obj)){
                for(i=0,imax=obj.length; i<imax; i++){
                    v = obj[i];
                    buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, add );
                }
            }else if(EZ.typeof(obj) === "object"){
                for(name in obj){
                    if(obj.hasOwnProperty(name)){
                        buildParams( prefix + "[" + name + "]", obj[ name ], add );
                    }
                }
            }else{
                add(prefix, obj);
            }
        }
        ;
        
        if ( EZ.isArray( a )) {
            // Serialize the form elements
            for(i=0,imax=a.length;i<imax;i++){
                add('p['+i+']',a[i]);
            }
        
        } else {
            for(prefix in a){
                buildParams(prefix, a[prefix], add);
            }
        }
        //console.log(s.join( "&" ).replace( EZ.r20, "+" ));
        return s.join( "&" ).replace( EZ.r20, "+" );
    }

    EZ.param = EZ.object_to_querystring;
    
    EZ.GET = function () {
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
    }();
    
    EZ.round = function (num, digit) {
        var x = 1;
        if (digit) {
            x = Math.pow(10, digit);
        }
        return Math.round(num * x) / x;
    };
    
    EZ.random = function (min, max) {
        return Math.round(Math.random() * (max - min) + min);
    };
    EZ.rand = EZ.random;
    
    EZ.unique_id = function (num) {
        var t = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'
            , 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
            , 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'
            , 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
            , '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
        ];
        var f = [];
        for (var i = 0; i < num; i++) {
            f[i] = t[(i != 0) ? Math.floor((Math.random() * 62)) : Math.floor((Math.random() * 52))];
        }
        return f.join('');
    };
    
    EZ.id = (new function () {
        var count=0;
        var token = EZ.unique_id(10)+'_';
        return function(){
            count++;
            return token + count;
        }
    }());
    
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
    
    EZ.inArray = function(value, arr, fromIndex){
        var len,
        core_indexOf=Array.prototype.indexOf,
        i=fromIndex
        ;

        if ( arr ) {
            if ( core_indexOf ) {
                return core_indexOf.call( arr, value, i );
            }

            len = arr.length;
            i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

            for ( ; i < len; i++ ) {
                // Skip accessing in sparse arrays
                if ( i in arr && arr[ i ] === value ) {
                    return i;
                }
            }
        }

        return -1;
    }
    
    EZ.in_array = function (find, myArray) {
        if (myArray.length == 0)
            return false;
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i] == find)
                return true;
        }
        return false;
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
    
    //取得絕對座標
    EZ.getPos = function (elmt) {
    
        if(typeof elmt == 'string') elmt = document.getElementById(elmt);
        
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
            case "checkbox": //    如果沒勾也要有值 把值存在一個屬性 叫做noValue
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
            case "checkbox": //    如果沒勾也要有值 把值存在一個屬性 叫做noValue
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
    
    //表單驗證 如果驗證失敗 把該dom 存入陣列 result    並且回傳
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
    
    EZ.readCookie = function(name){
        var name = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) 
        {
            var c = ca[i].trim();
            if (c.indexOf(name)==0) return c.substring(name.length,c.length);
        }
        return "";
    }

    EZ.getCookie = EZ.readCookie;
    
    EZ.setCookie = function(name,value,time,unit,path){
        unit = unit || '';
        path = path || '/';
        switch(unit){
            case 'day':
                time = time*86400000;
                break;
            case 'hour':
                time = time*3600000;
                break;
            case 'minute':
                time = time*60000;
                break;
            default:
                if(!time){
                    time=86400000;
                }
                break;
        }
        var d = new Date();
        d.setTime(d.getTime()+(time));
        var expires = "expires="+d.toGMTString();
        document.cookie = name + "=" + value + ";path="+path+';' + expires;
    }
    
    EZ.deleteCookie=function(name){
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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
    
     //時間 format
    EZ.Date = (new function () {
        var self = this;
        var init = function (date) {
            var self = this,
            obj = date,
            Self = {
                getTime : function () {
                    return obj.getTime();
                },
                show : function (mask) {
                    return DateFormat(obj, mask);
                },
                this_week : function(startDay){
                    var now = new Date();
                    startDay = startDay||1; //0=sunday, 1=monday etc.
                    var d = now.getDay(); //get the current day
                    var weekStart = new Date(now.valueOf() - (d<=0 ? 7-startDay:d-startDay)*86400000); //rewind to start day
                    var weekEnd = new Date(weekStart.valueOf() + 6*86400000); //add 6 days to get last day
                    var firstday = EZ.Date(weekStart).show('Y-mm-dd');
                    var lastday = EZ.Date(weekEnd).show('Y-mm-dd');
                    return [firstday,lastday];
                },
                last_week : function(startDay){
                    var now = new Date();
                    startDay = startDay||1; //0=sunday, 1=monday etc.
                    var d = now.getDay(); //get the current day
                    var weekStart = new Date(now.valueOf() - (d<=0 ? 7-startDay:d-startDay)*86400000); //rewind to start day
                    var weekEnd = new Date(weekStart.valueOf() + 6*86400000); //add 6 days to get last day
                    var firstday = EZ.Date(weekStart.getTime()-604800000).show('Y-mm-dd');
                    var lastday = EZ.Date(weekEnd.getTime()-604800000).show('Y-mm-dd');
                    return [firstday,lastday];
                },
                year : function(i){
                    obj.setYear(obj.getYear()+i)
                    return Self;
                },
                month : function(i){
                    obj.setMonth(obj.getMonth()+i)
                    return Self;
                },
                week : function(i){
                    obj.setTime(obj.getTime()+i*604800000);
                    return Self;
                },
                day : function(i){
                    obj.setTime(obj.getTime()+i*86400000);
                    return Self;
                },
                hour : function(i){
                    obj.setTime(obj.getTime()+i*3600000);
                    return Self;
                },
                minute : function(i){
                    obj.setTime(obj.getTime()+i*60000);
                    return Self;
                },
                second : function(i){
                    obj.setTime(obj.getTime()+i*1000);
                    return Self;
                }
                
            }
            return Self;
        };
        var DateFormat = (new function () {
            var token = /d{1,4}|m{1,4}|yy(?:yy)?|Y(?:Y)?|([HhMisTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            //var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g
            timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standad|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
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
                    //"default":            "ddd mmm dd yyyy HH:MM:ss",
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
        }());

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
    }());
    
    EZ.parser = function(response){
        var r;
        //console.log(response);
        try{
            //r = eval('('+response+')');
            r = EZ.json_decode(response);
        }catch(e){
            return {success:0,msg:'server response error',data:[]};
        }
        if(r.msg=='login fail'){
            location.replace(location.href);
        }
        return r;
    }
    
    EZ.request = function(url, method, params, callback){
        
        method = method.toUpperCase();
        
        params = params || {};
        
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
            console.log('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
        
        var tt = new Date().getTime();
        if (url.indexOf('?') == -1)
            url += '?tt=' + tt;
        else
            url += '&tt=' + tt;
        
        switch(method){
            case 'POST':
            case 'GET':
            case 'PUT':
            case 'DELETE':
                http_request.open(method, url, true);
                break;
            default:
                http_request.open('POST', url, true);
                break;
        }
        
        
        http_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //http_request.setRequestHeader("Connection", "close");
        
        http_request.send(EZ.object_to_querystring(params));
        
        http_request.onreadystatechange = function () {
            if (http_request.readyState == 4 && http_request.status == 200) {
                if (typeof callback == 'function') callback(http_request.responseText);
            } else if(http_request.readyState == 4 ){
                alert("Server is no response");
            }
        }
    }
    
    EZ.ajax = function(url, params, callback){
        EZ.request(url, 'POST' , params , callback);
    };
    
    EZ.addClass = function (elem,cl){
        var rspaces = /\s+/;
        var classNames = (cl || "").split( rspaces );
        var className = " " + elem.className + " ",
        setClass = elem.className;
        for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
            if ( className.indexOf( " " + classNames[c] + " " ) < 0 ) {
                setClass += " " + classNames[c];
            }
        }
        elem.className = setClass.replace(/^\s+|\s+$/g,'');//trim
    }
    
    EZ.removeClass = function (elem,cl){
        var rspaces = /\s+/;
        var rclass = /[\n\t]/g
        var classNames = (cl || "").split( rspaces );
        var className = (" " + elem.className + " ").replace(rclass, " ");
        for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
        className = className.replace(" " + classNames[c] + " ", " ");
        }
        elem.className = className.replace(/^\s+|\s+$/g,'');//trim
    }
    
    window.EZ = EZ;
    
}(window, undefined));

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
(function(){
/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-512, as defined
 * in FIPS 180-2
 * Version 2.2 Copyright Anonymous Contributor, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_sha512(s)    { return rstr2hex(rstr_sha512(str2rstr_utf8(s))); }
function b64_sha512(s)    { return rstr2b64(rstr_sha512(str2rstr_utf8(s))); }
function any_sha512(s, e) { return rstr2any(rstr_sha512(str2rstr_utf8(s)), e);}
function hex_hmac_sha512(k, d)
  { return rstr2hex(rstr_hmac_sha512(str2rstr_utf8(k), str2rstr_utf8(d))); }
function b64_hmac_sha512(k, d)
  { return rstr2b64(rstr_hmac_sha512(str2rstr_utf8(k), str2rstr_utf8(d))); }
function any_hmac_sha512(k, d, e)
  { return rstr2any(rstr_hmac_sha512(str2rstr_utf8(k), str2rstr_utf8(d)), e);}

/*
 * Perform a simple self-test to see if the VM is working
 */
function sha512_vm_test()
{
  return hex_sha512("abc").toLowerCase() ==
    "ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a" +
    "2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f";
}

/*
 * Calculate the SHA-512 of a raw string
 */
function rstr_sha512(s)
{
  return binb2rstr(binb_sha512(rstr2binb(s), s.length * 8));
}

/*
 * Calculate the HMAC-SHA-512 of a key and some data (raw strings)
 */
function rstr_hmac_sha512(key, data)
{
  var bkey = rstr2binb(key);
  if(bkey.length > 32) bkey = binb_sha512(bkey, key.length * 8);

  var ipad = Array(32), opad = Array(32);
  for(var i = 0; i < 32; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = binb_sha512(ipad.concat(rstr2binb(data)), 1024 + data.length * 8);
  return binb2rstr(binb_sha512(opad.concat(hash), 1024 + 512));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input)
{
  try { hexcase } catch(e) { hexcase=0; }
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var output = "";
  var x;
  for(var i = 0; i < input.length; i++)
  {
    x = input.charCodeAt(i);
    output += hex_tab.charAt((x >>> 4) & 0x0F)
           +  hex_tab.charAt( x        & 0x0F);
  }
  return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input)
{
  try { b64pad } catch(e) { b64pad=''; }
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var output = "";
  var len = input.length;
  for(var i = 0; i < len; i += 3)
  {
    var triplet = (input.charCodeAt(i) << 16)
                | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
                | (i + 2 < len ? input.charCodeAt(i+2)      : 0);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > input.length * 8) output += b64pad;
      else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
    }
  }
  return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding)
{
  var divisor = encoding.length;
  var i, j, q, x, quotient;

  /* Convert to an array of 16-bit big-endian values, forming the dividend */
  var dividend = Array(Math.ceil(input.length / 2));
  for(i = 0; i < dividend.length; i++)
  {
    dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
  }

  /*
   * Repeatedly perform a long division. The binary array forms the dividend,
   * the length of the encoding is the divisor. Once computed, the quotient
   * forms the dividend for the next step. All remainders are stored for later
   * use.
   */
  var full_length = Math.ceil(input.length * 8 /
                                    (Math.log(encoding.length) / Math.log(2)));
  var remainders = Array(full_length);
  for(j = 0; j < full_length; j++)
  {
    quotient = Array();
    x = 0;
    for(i = 0; i < dividend.length; i++)
    {
      x = (x << 16) + dividend[i];
      q = Math.floor(x / divisor);
      x -= q * divisor;
      if(quotient.length > 0 || q > 0)
        quotient[quotient.length] = q;
    }
    remainders[j] = x;
    dividend = quotient;
  }

  /* Convert the remainders to the output string */
  var output = "";
  for(i = remainders.length - 1; i >= 0; i--)
    output += encoding.charAt(remainders[i]);

  return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input)
{
  var output = "";
  var i = -1;
  var x, y;

  while(++i < input.length)
  {
    /* Decode utf-16 surrogate pairs */
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
    {
      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
      i++;
    }

    /* Encode output as utf-8 */
    if(x <= 0x7F)
      output += String.fromCharCode(x);
    else if(x <= 0x7FF)
      output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0xFFFF)
      output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0x1FFFFF)
      output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                    0x80 | ((x >>> 12) & 0x3F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
  }
  return output;
}

/*
 * Encode a string as utf-16
 */
function str2rstr_utf16le(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
                                  (input.charCodeAt(i) >>> 8) & 0xFF);
  return output;
}

function str2rstr_utf16be(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                                   input.charCodeAt(i)        & 0xFF);
  return output;
}

/*
 * Convert a raw string to an array of big-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binb(input)
{
  var output = Array(input.length >> 2);
  for(var i = 0; i < output.length; i++)
    output[i] = 0;
  for(var i = 0; i < input.length * 8; i += 8)
    output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
  return output;
}

/*
 * Convert an array of big-endian words to a string
 */
function binb2rstr(input)
{
  var output = "";
  for(var i = 0; i < input.length * 32; i += 8)
    output += String.fromCharCode((input[i>>5] >>> (24 - i % 32)) & 0xFF);
  return output;
}

/*
 * Calculate the SHA-512 of an array of big-endian dwords, and a bit length
 */
var sha512_k;
function binb_sha512(x, len)
{
  if(sha512_k == undefined)
  {
    //SHA512 constants
    sha512_k = new Array(
new int64(0x428a2f98, -685199838), new int64(0x71374491, 0x23ef65cd),
new int64(-1245643825, -330482897), new int64(-373957723, -2121671748),
new int64(0x3956c25b, -213338824), new int64(0x59f111f1, -1241133031),
new int64(-1841331548, -1357295717), new int64(-1424204075, -630357736),
new int64(-670586216, -1560083902), new int64(0x12835b01, 0x45706fbe),
new int64(0x243185be, 0x4ee4b28c), new int64(0x550c7dc3, -704662302),
new int64(0x72be5d74, -226784913), new int64(-2132889090, 0x3b1696b1),
new int64(-1680079193, 0x25c71235), new int64(-1046744716, -815192428),
new int64(-459576895, -1628353838), new int64(-272742522, 0x384f25e3),
new int64(0xfc19dc6, -1953704523), new int64(0x240ca1cc, 0x77ac9c65),
new int64(0x2de92c6f, 0x592b0275), new int64(0x4a7484aa, 0x6ea6e483),
new int64(0x5cb0a9dc, -1119749164), new int64(0x76f988da, -2096016459),
new int64(-1740746414, -295247957), new int64(-1473132947, 0x2db43210),
new int64(-1341970488, -1728372417), new int64(-1084653625, -1091629340),
new int64(-958395405, 0x3da88fc2), new int64(-710438585, -1828018395),
new int64(0x6ca6351, -536640913), new int64(0x14292967, 0xa0e6e70),
new int64(0x27b70a85, 0x46d22ffc), new int64(0x2e1b2138, 0x5c26c926),
new int64(0x4d2c6dfc, 0x5ac42aed), new int64(0x53380d13, -1651133473),
new int64(0x650a7354, -1951439906), new int64(0x766a0abb, 0x3c77b2a8),
new int64(-2117940946, 0x47edaee6), new int64(-1838011259, 0x1482353b),
new int64(-1564481375, 0x4cf10364), new int64(-1474664885, -1136513023),
new int64(-1035236496, -789014639), new int64(-949202525, 0x654be30),
new int64(-778901479, -688958952), new int64(-694614492, 0x5565a910),
new int64(-200395387, 0x5771202a), new int64(0x106aa070, 0x32bbd1b8),
new int64(0x19a4c116, -1194143544), new int64(0x1e376c08, 0x5141ab53),
new int64(0x2748774c, -544281703), new int64(0x34b0bcb5, -509917016),
new int64(0x391c0cb3, -976659869), new int64(0x4ed8aa4a, -482243893),
new int64(0x5b9cca4f, 0x7763e373), new int64(0x682e6ff3, -692930397),
new int64(0x748f82ee, 0x5defb2fc), new int64(0x78a5636f, 0x43172f60),
new int64(-2067236844, -1578062990), new int64(-1933114872, 0x1a6439ec),
new int64(-1866530822, 0x23631e28), new int64(-1538233109, -561857047),
new int64(-1090935817, -1295615723), new int64(-965641998, -479046869),
new int64(-903397682, -366583396), new int64(-779700025, 0x21c0c207),
new int64(-354779690, -840897762), new int64(-176337025, -294727304),
new int64(0x6f067aa, 0x72176fba), new int64(0xa637dc5, -1563912026),
new int64(0x113f9804, -1090974290), new int64(0x1b710b35, 0x131c471b),
new int64(0x28db77f5, 0x23047d84), new int64(0x32caab7b, 0x40c72493),
new int64(0x3c9ebe0a, 0x15c9bebc), new int64(0x431d67c4, -1676669620),
new int64(0x4cc5d4be, -885112138), new int64(0x597f299c, -60457430),
new int64(0x5fcb6fab, 0x3ad6faec), new int64(0x6c44198c, 0x4a475817));
  }

  //Initial hash values
  var H = new Array(
new int64(0x6a09e667, -205731576),
new int64(-1150833019, -2067093701),
new int64(0x3c6ef372, -23791573),
new int64(-1521486534, 0x5f1d36f1),
new int64(0x510e527f, -1377402159),
new int64(-1694144372, 0x2b3e6c1f),
new int64(0x1f83d9ab, -79577749),
new int64(0x5be0cd19, 0x137e2179));

  var T1 = new int64(0, 0),
    T2 = new int64(0, 0),
    a = new int64(0,0),
    b = new int64(0,0),
    c = new int64(0,0),
    d = new int64(0,0),
    e = new int64(0,0),
    f = new int64(0,0),
    g = new int64(0,0),
    h = new int64(0,0),
    //Temporary variables not specified by the document
    s0 = new int64(0, 0),
    s1 = new int64(0, 0),
    Ch = new int64(0, 0),
    Maj = new int64(0, 0),
    r1 = new int64(0, 0),
    r2 = new int64(0, 0),
    r3 = new int64(0, 0);
  var j, i;
  var W = new Array(80);
  for(i=0; i<80; i++)
    W[i] = new int64(0, 0);

  // append padding to the source string. The format is described in the FIPS.
  x[len >> 5] |= 0x80 << (24 - (len & 0x1f));
  x[((len + 128 >> 10)<< 5) + 31] = len;

  for(i = 0; i<x.length; i+=32) //32 dwords is the block size
  {
    int64copy(a, H[0]);
    int64copy(b, H[1]);
    int64copy(c, H[2]);
    int64copy(d, H[3]);
    int64copy(e, H[4]);
    int64copy(f, H[5]);
    int64copy(g, H[6]);
    int64copy(h, H[7]);

    for(j=0; j<16; j++)
    {
        W[j].h = x[i + 2*j];
        W[j].l = x[i + 2*j + 1];
    }

    for(j=16; j<80; j++)
    {
      //sigma1
      int64rrot(r1, W[j-2], 19);
      int64revrrot(r2, W[j-2], 29);
      int64shr(r3, W[j-2], 6);
      s1.l = r1.l ^ r2.l ^ r3.l;
      s1.h = r1.h ^ r2.h ^ r3.h;
      //sigma0
      int64rrot(r1, W[j-15], 1);
      int64rrot(r2, W[j-15], 8);
      int64shr(r3, W[j-15], 7);
      s0.l = r1.l ^ r2.l ^ r3.l;
      s0.h = r1.h ^ r2.h ^ r3.h;

      int64add4(W[j], s1, W[j-7], s0, W[j-16]);
    }

    for(j = 0; j < 80; j++)
    {
      //Ch
      Ch.l = (e.l & f.l) ^ (~e.l & g.l);
      Ch.h = (e.h & f.h) ^ (~e.h & g.h);

      //Sigma1
      int64rrot(r1, e, 14);
      int64rrot(r2, e, 18);
      int64revrrot(r3, e, 9);
      s1.l = r1.l ^ r2.l ^ r3.l;
      s1.h = r1.h ^ r2.h ^ r3.h;

      //Sigma0
      int64rrot(r1, a, 28);
      int64revrrot(r2, a, 2);
      int64revrrot(r3, a, 7);
      s0.l = r1.l ^ r2.l ^ r3.l;
      s0.h = r1.h ^ r2.h ^ r3.h;

      //Maj
      Maj.l = (a.l & b.l) ^ (a.l & c.l) ^ (b.l & c.l);
      Maj.h = (a.h & b.h) ^ (a.h & c.h) ^ (b.h & c.h);

      int64add5(T1, h, s1, Ch, sha512_k[j], W[j]);
      int64add(T2, s0, Maj);

      int64copy(h, g);
      int64copy(g, f);
      int64copy(f, e);
      int64add(e, d, T1);
      int64copy(d, c);
      int64copy(c, b);
      int64copy(b, a);
      int64add(a, T1, T2);
    }
    int64add(H[0], H[0], a);
    int64add(H[1], H[1], b);
    int64add(H[2], H[2], c);
    int64add(H[3], H[3], d);
    int64add(H[4], H[4], e);
    int64add(H[5], H[5], f);
    int64add(H[6], H[6], g);
    int64add(H[7], H[7], h);
  }

  //represent the hash as an array of 32-bit dwords
  var hash = new Array(16);
  for(i=0; i<8; i++)
  {
    hash[2*i] = H[i].h;
    hash[2*i + 1] = H[i].l;
  }
  return hash;
}

//A constructor for 64-bit numbers
function int64(h, l)
{
  this.h = h;
  this.l = l;
  //this.toString = int64toString;
}

//Copies src into dst, assuming both are 64-bit numbers
function int64copy(dst, src)
{
  dst.h = src.h;
  dst.l = src.l;
}

//Right-rotates a 64-bit number by shift
//Won't handle cases of shift>=32
//The function revrrot() is for that
function int64rrot(dst, x, shift)
{
    dst.l = (x.l >>> shift) | (x.h << (32-shift));
    dst.h = (x.h >>> shift) | (x.l << (32-shift));
}

//Reverses the dwords of the source and then rotates right by shift.
//This is equivalent to rotation by 32+shift
function int64revrrot(dst, x, shift)
{
    dst.l = (x.h >>> shift) | (x.l << (32-shift));
    dst.h = (x.l >>> shift) | (x.h << (32-shift));
}

//Bitwise-shifts right a 64-bit number by shift
//Won't handle shift>=32, but it's never needed in SHA512
function int64shr(dst, x, shift)
{
    dst.l = (x.l >>> shift) | (x.h << (32-shift));
    dst.h = (x.h >>> shift);
}

//Adds two 64-bit numbers
//Like the original implementation, does not rely on 32-bit operations
function int64add(dst, x, y)
{
   var w0 = (x.l & 0xffff) + (y.l & 0xffff);
   var w1 = (x.l >>> 16) + (y.l >>> 16) + (w0 >>> 16);
   var w2 = (x.h & 0xffff) + (y.h & 0xffff) + (w1 >>> 16);
   var w3 = (x.h >>> 16) + (y.h >>> 16) + (w2 >>> 16);
   dst.l = (w0 & 0xffff) | (w1 << 16);
   dst.h = (w2 & 0xffff) | (w3 << 16);
}

//Same, except with 4 addends. Works faster than adding them one by one.
function int64add4(dst, a, b, c, d)
{
   var w0 = (a.l & 0xffff) + (b.l & 0xffff) + (c.l & 0xffff) + (d.l & 0xffff);
   var w1 = (a.l >>> 16) + (b.l >>> 16) + (c.l >>> 16) + (d.l >>> 16) + (w0 >>> 16);
   var w2 = (a.h & 0xffff) + (b.h & 0xffff) + (c.h & 0xffff) + (d.h & 0xffff) + (w1 >>> 16);
   var w3 = (a.h >>> 16) + (b.h >>> 16) + (c.h >>> 16) + (d.h >>> 16) + (w2 >>> 16);
   dst.l = (w0 & 0xffff) | (w1 << 16);
   dst.h = (w2 & 0xffff) | (w3 << 16);
}

//Same, except with 5 addends
function int64add5(dst, a, b, c, d, e)
{
   var w0 = (a.l & 0xffff) + (b.l & 0xffff) + (c.l & 0xffff) + (d.l & 0xffff) + (e.l & 0xffff);
   var w1 = (a.l >>> 16) + (b.l >>> 16) + (c.l >>> 16) + (d.l >>> 16) + (e.l >>> 16) + (w0 >>> 16);
   var w2 = (a.h & 0xffff) + (b.h & 0xffff) + (c.h & 0xffff) + (d.h & 0xffff) + (e.h & 0xffff) + (w1 >>> 16);
   var w3 = (a.h >>> 16) + (b.h >>> 16) + (c.h >>> 16) + (d.h >>> 16) + (e.h >>> 16) + (w2 >>> 16);
   dst.l = (w0 & 0xffff) | (w1 << 16);
   dst.h = (w2 & 0xffff) | (w3 << 16);
}


function hex_sha512(s)    { return rstr2hex(rstr_sha512(str2rstr_utf8(s))); }
function b64_sha512(s)    { return rstr2b64(rstr_sha512(str2rstr_utf8(s))); }
function any_sha512(s, e) { return rstr2any(rstr_sha512(str2rstr_utf8(s)), e);}
function hex_hmac_sha512(k, d)
  { return rstr2hex(rstr_hmac_sha512(str2rstr_utf8(k), str2rstr_utf8(d))); }
function b64_hmac_sha512(k, d)
  { return rstr2b64(rstr_hmac_sha512(str2rstr_utf8(k), str2rstr_utf8(d))); }
function any_hmac_sha512(k, d, e)
  { return rstr2any(rstr_hmac_sha512(str2rstr_utf8(k), str2rstr_utf8(d)), e);}

EZ.hex_sha512 = hex_sha512;
EZ.b64_sha512 = b64_sha512;
EZ.any_sha512 = any_sha512;
EZ.hex_hmac_sha512 = hex_hmac_sha512;
EZ.b64_hmac_sha512 = b64_hmac_sha512;
EZ.any_hmac_sha512 = any_hmac_sha512;
EZ.dohash = hex_sha512;
}(EZ));
EZ.stopwatch = function () {
    var 
    start = 0
    ,keep = 0
    ,total = 0
    ,status = 'stop'
    ,Self = {
        play : function () {
            if(status == 'stop') {
                total = 0;
                keep = 0;
            }else if(status == 'pause'){
                keep = total;
                total = 0;
            }
            
            start = new Date().getTime();
            status = 'play';
            return start;
        },
        stop : function () {
            if(status == 'play'){
                total = (new Date().getTime()) - start;
                total += keep;
            }
            status = 'stop';
            return total;
        },
        pause : function(){
            if(status == 'play'){
                total = (new Date().getTime()) - start;
                total += keep;
            }
            status = 'pause';
            return total;
        },
        getTime : function(){
            if(status == 'play'){
                total = (new Date().getTime()) - start;
                total += keep;
            }
            return total;
        }
    }
    return Self;
};
/*
    * 偵測瀏覽器 browser version OS isIE 
    * https://github.com/faisalman/ua-parser-js/blob/master/src/ua-parser.js
*/
EZ.system = (new function(){
    var self = this,
    EMPTY       = '',
    UNKNOWN     = '?',
    FUNC_TYPE   = 'function',
    UNDEF_TYPE  = 'undefined',
    OBJ_TYPE    = 'object',
    MAJOR       = 'major',
    MODEL       = 'model',
    NAME        = 'name',
    TYPE        = 'type',
    VENDOR      = 'vendor',
    VERSION     = 'version',
    ARCHITECTURE= 'architecture',
    CONSOLE     = 'console',
    MOBILE      = 'mobile',
    TABLET      = 'tablet',
    SMARTTV     = 'smarttv',
    util = {
        has : function (str1, str2) {
          if (typeof str1 === "string") {
            return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
          }
        },
        lowerize : function (str) {
            return str.toLowerCase();
        }
    },
    mapper = {

        rgx : function () {

            // loop through all regexes maps
            for (var result, i = 0, j, k, p, q, matches, match, args = arguments; i < args.length; i += 2) {

                var regex = args[i],       // even sequence (0,2,4,..)
                    props = args[i + 1];   // odd sequence (1,3,5,..)

                // construct object barebones
                if (typeof(result) === UNDEF_TYPE) {
                    result = {};
                    for (p in props) {
                        q = props[p];
                        if (typeof(q) === OBJ_TYPE) {
                            result[q[0]] = undefined;
                        } else {
                            result[q] = undefined;
                        }
                    }
                }

                // try matching uastring with regexes
                for (j = k = 0; j < regex.length; j++) {
                    matches = regex[j].exec(this.getUA());
                    if (!!matches) {
                        for (p = 0; p < props.length; p++) {
                            match = matches[++k];
                            q = props[p];
                            // check if given property is actually array
                            if (typeof(q) === OBJ_TYPE && q.length > 0) {
                                if (q.length == 2) {
                                    if (typeof(q[1]) == FUNC_TYPE) {
                                        // assign modified match
                                        result[q[0]] = q[1].call(this, match);
                                    } else {
                                        // assign given value, ignore regex match
                                        result[q[0]] = q[1];
                                    }
                                } else if (q.length == 3) {
                                    // check whether function or regex
                                    if (typeof(q[1]) === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                                        // call function (usually string mapper)
                                        result[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                                    } else {
                                        // sanitize match using given regex
                                        result[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                                    }
                                } else if (q.length == 4) {
                                        result[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                                }
                            } else {
                                result[q] = match ? match : undefined;
                            }
                        }
                        break;
                    }
                }

                if(!!matches) break; // break the loop immediately if match found
            }
            return result;
        },

        str : function (str, map) {

            for (var i in map) {
                // check if array
                if (typeof(map[i]) === OBJ_TYPE && map[i].length > 0) {
                    for (var j = 0; j < map[i].length; j++) {
                        if (util.has(map[i][j], str)) {
                            return (i === UNKNOWN) ? undefined : i;
                        }
                    }
                } else if (util.has(map[i], str)) {
                    return (i === UNKNOWN) ? undefined : i;
                }
            }
            return str;
        }
    },
    maps = {

        browser : {
            oldsafari : {
                major : {
                    '1' : ['/8', '/1', '/3'],
                    '2' : '/4',
                    '?' : '/'
                },
                version : {
                    '1.0'   : '/8',
                    '1.2'   : '/1',
                    '1.3'   : '/3',
                    '2.0'   : '/412',
                    '2.0.2' : '/416',
                    '2.0.3' : '/417',
                    '2.0.4' : '/419',
                    '?'     : '/'
                }
            }
        },

        device : {
            sprint : {
                model : {
                    'Evo Shift 4G' : '7373KT'
                },
                vendor : {
                    'HTC'       : 'APA',
                    'Sprint'    : 'Sprint'
                }
            }
        },

        os : {
            windows : {
                version : {
                    'ME'        : '4.90',
                    'NT 3.11'   : 'NT3.51',
                    'NT 4.0'    : 'NT4.0',
                    '2000'      : 'NT 5.0',
                    'XP'        : ['NT 5.1', 'NT 5.2'],
                    'Vista'     : 'NT 6.0',
                    '7'         : 'NT 6.1',
                    '8'         : 'NT 6.2',
                    '8.1'       : 'NT 6.3',
                    'RT'        : 'ARM'
                }
            }
        }
    },
    regexes = {

        browser : [[

            /APP-([\w\s-\d]+)\/((\d+)?[\w\.]+)/i                                     // KTA App
            ], [NAME, VERSION, MAJOR], [

            // Presto based
            /(opera\smini)\/((\d+)?[\w\.-]+)/i,                                 // Opera Mini
            /(opera\s[mobiletab]+).+version\/((\d+)?[\w\.-]+)/i,                // Opera Mobi/Tablet
            /(opera).+version\/((\d+)?[\w\.]+)/i,                               // Opera > 9.80
            /(opera)[\/\s]+((\d+)?[\w\.]+)/i                                    // Opera < 9.80

            ], [NAME, VERSION, MAJOR], [

            /\s(opr)\/((\d+)?[\w\.]+)/i                                         // Opera Webkit
            ], [[NAME, 'Opera'], VERSION, MAJOR], [

            // Mixed
            /(kindle)\/((\d+)?[\w\.]+)/i,                                       // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?((\d+)?[\w\.]+)*/i,
                                                                                // Lunascape/Maxthon/Netfront/Jasmine/Blazer

            // Trident based
            /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?((\d+)?[\w\.]*)/i,
                                                                                // Avant/IEMobile/SlimBrowser/Baidu
            /(?:ms|\()(ie)\s((\d+)?[\w\.]+)/i,                                  // Internet Explorer

            // Webkit/KHTML based
            /(rekonq)((?:\/)[\w\.]+)*/i,                                        // Rekonq
            /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron)\/((\d+)?[\w\.-]+)/i
                                                                                // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron
            ], [NAME, VERSION, MAJOR], [

            /(trident).+rv[:\s]((\d+)?[\w\.]+).+like\sgecko/i                   // IE11
            ], [[NAME, 'IE'], VERSION, MAJOR], [

            /(yabrowser)\/((\d+)?[\w\.]+)/i                                     // Yandex
            ], [[NAME, 'Yandex'], VERSION, MAJOR], [

            /(comodo_dragon)\/((\d+)?[\w\.]+)/i                                 // Comodo Dragon
            ], [[NAME, /_/g, ' '], VERSION, MAJOR], [

            /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?((\d+)?[\w\.]+)/i
                                                                                // Chrome/OmniWeb/Arora/Tizen/Nokia
            ], [NAME, VERSION, MAJOR], [

            /(dolfin)\/((\d+)?[\w\.]+)/i                                        // Dolphin
            ], [[NAME, 'Dolphin'], VERSION, MAJOR], [

            /((?:android.+)crmo|crios)\/((\d+)?[\w\.]+)/i                       // Chrome for Android/iOS
            ], [[NAME, 'Chrome'], VERSION, MAJOR], [

            /version\/((\d+)?[\w\.]+).+?mobile\/\w+\s(safari)/i                 // Mobile Safari
            ], [VERSION, MAJOR, [NAME, 'Mobile Safari']], [

            /version\/((\d+)?[\w\.]+).+?(mobile\s?safari|safari)/i              // Safari & Safari Mobile
            ], [VERSION, MAJOR, NAME], [

            /webkit.+?(mobile\s?safari|safari)((\/[\w\.]+))/i                   // Safari < 3.0
            ], [NAME, [MAJOR, mapper.str, maps.browser.oldsafari.major], [VERSION, mapper.str, maps.browser.oldsafari.version]], [

            /(konqueror)\/((\d+)?[\w\.]+)/i,                                    // Konqueror
            /(webkit|khtml)\/((\d+)?[\w\.]+)/i
            ], [NAME, VERSION, MAJOR], [

            // Gecko based
            /(navigator|netscape)\/((\d+)?[\w\.-]+)/i                           // Netscape
            ], [[NAME, 'Netscape'], VERSION, MAJOR], [
            /(swiftfox)/i,                                                      // Swiftfox
            /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?((\d+)?[\w\.\+]+)/i,
                                                                                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
            /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/((\d+)?[\w\.-]+)/i,
                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
            /(mozilla)\/((\d+)?[\w\.]+).+rv\:.+gecko\/\d+/i,                    // Mozilla

            // Other
            /(uc\s?browser|polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|qqbrowser)[\/\s]?((\d+)?[\w\.]+)/i,
                                                                                // UCBrowser/Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/QQBrowser
            /(links)\s\(((\d+)?[\w\.]+)/i,                                      // Links
            /(gobrowser)\/?((\d+)?[\w\.]+)*/i,                                  // GoBrowser
            /(ice\s?browser)\/v?((\d+)?[\w\._]+)/i,                             // ICE Browser
            /(mosaic)[\/\s]((\d+)?[\w\.]+)/i                                    // Mosaic
            ], [NAME, VERSION, MAJOR], [

            /(apple(?:coremedia|))\/((\d+)[\w\._]+)/i,                          // Generic Apple CoreMedia
            /(coremedia) v((\d+)[\w\._]+)/i
            ], [NAME, VERSION, MAJOR], [

            /(aqualung|lyssna|bsplayer)\/((\d+)?[\w\.-]+)/i                     // Aqualung/Lyssna/BSPlayer
            ], [NAME, VERSION], [

            /(ares|ossproxy)\s((\d+)[\w\.-]+)/i                                 // Ares/OSSProxy
            ], [NAME, VERSION, MAJOR], [

            /(audacious|audimusicstream|amarok|bass|core|dalvik|gnomemplayer|music on console|nsplayer|psp-internetradioplayer|videos)\/((\d+)[\w\.-]+)/i,
                                                                                // Audacious/AudiMusicStream/Amarok/BASS/OpenCORE/Dalvik/GnomeMplayer/MoC
                                                                                // NSPlayer/PSP-InternetRadioPlayer/Videos
            /(clementine|music player daemon)\s((\d+)[\w\.-]+)/i,               // Clementine/MPD
            /(lg player|nexplayer)\s((\d+)[\d\.]+)/i,
            /player\/(nexplayer|lg player)\s((\d+)[\w\.-]+)/i                   // NexPlayer/LG Player
            ], [NAME, VERSION, MAJOR], [
            /(nexplayer)\s((\d+)[\w\.-]+)/i                                     // Nexplayer
            ], [NAME, VERSION, MAJOR], [

            /(flrp)\/((\d+)[\w\.-]+)/i                                          // Flip Player
            ], [[NAME, 'Flip Player'], VERSION, MAJOR], [

            /(fstream|nativehost|queryseekspider|ia-archiver|facebookexternalhit)/i
                                                                                // FStream/NativeHost/QuerySeekSpider/IA Archiver/facebookexternalhit
            ], [NAME], [

            /(gstreamer) souphttpsrc (?:\([^\)]+\)){0,1} libsoup\/((\d+)[\w\.-]+)/i
                                                                                // Gstreamer
            ], [NAME, VERSION, MAJOR], [

            /(htc streaming player)\s[\w_]+\s\/\s((\d+)[\d\.]+)/i,              // HTC Streaming Player
            /(java|python-urllib|python-requests|wget|libcurl)\/((\d+)[\w\.-_]+)/i,
                                                                                // Java/urllib/requests/wget/cURL
            /(lavf)((\d+)[\d\.]+)/i                                             // Lavf (FFMPEG)
            ], [NAME, VERSION, MAJOR], [

            /(htc_one_s)\/((\d+)[\d\.]+)/i                                      // HTC One S
            ], [[NAME, /_/g, ' '], VERSION, MAJOR], [

            /(mplayer)(?:\s|\/)(?:(?:sherpya-){0,1}svn)(?:-|\s)(r\d+(?:-\d+[\w\.-]+){0,1})/i
                                                                                // MPlayer SVN
            ], [NAME, VERSION], [

            /(mplayer)(?:\s|\/|[unkow-]+)((\d+)[\w\.-]+)/i                      // MPlayer
            ], [NAME, VERSION, MAJOR], [

            /(mplayer)/i,                                                       // MPlayer (no other info)
            /(yourmuze)/i,                                                      // YourMuze
            /(media player classic|nero showtime)/i                             // Media Player Classic/Nero ShowTime
            ], [NAME], [

            /(nero (?:home|scout))\/((\d+)[\w\.-]+)/i                           // Nero Home/Nero Scout
            ], [NAME, VERSION, MAJOR], [

            /(nokia\d+)\/((\d+)[\w\.-]+)/i                                      // Nokia
            ], [NAME, VERSION, MAJOR], [

            /\s(songbird)\/((\d+)[\w\.-]+)/i                                    // Songbird/Philips-Songbird
            ], [NAME, VERSION, MAJOR], [

            /(winamp)3 version ((\d+)[\w\.-]+)/i,                               // Winamp
            /(winamp)\s((\d+)[\w\.-]+)/i,
            /(winamp)mpeg\/((\d+)[\w\.-]+)/i
            ], [NAME, VERSION, MAJOR], [

            /(ocms-bot|tapinradio|tunein radio|unknown|winamp|inlight radio)/i  // OCMS-bot/tap in radio/tunein/unknown/winamp (no other info)
                                                                                // inlight radio
            ], [NAME], [

            /(quicktime|rma|radioapp|radioclientapplication|soundtap|totem|stagefright|streamium)\/((\d+)[\w\.-]+)/i
                                                                                // QuickTime/RealMedia/RadioApp/RadioClientApplication/
                                                                                // SoundTap/Totem/Stagefright/Streamium
            ], [NAME, VERSION, MAJOR], [

            /(smp)((\d+)[\d\.]+)/i                                              // SMP
            ], [NAME, VERSION, MAJOR], [

            /(vlc) media player - version ((\d+)[\w\.]+)/i,                     // VLC Videolan
            /(vlc)\/((\d+)[\w\.-]+)/i,
            /(xbmc|gvfs|xine|xmms|irapp)\/((\d+)[\w\.-]+)/i,                    // XBMC/gvfs/Xine/XMMS/irapp
            /(foobar2000)\/((\d+)[\d\.]+)/i,                                    // Foobar2000
            /(itunes)\/((\d+)[\d\.]+)/i                                         // iTunes
            ], [NAME, VERSION, MAJOR], [

            /(wmplayer)\/((\d+)[\w\.-]+)/i,                                     // Windows Media Player
            /(windows-media-player)\/((\d+)[\w\.-]+)/i
            ], [[NAME, /-/g, ' '], VERSION, MAJOR], [

            /windows\/((\d+)[\w\.-]+) upnp\/[\d\.]+ dlnadoc\/[\d\.]+ (home media server)/i
                                                                                // Windows Media Server
            ], [VERSION, MAJOR, [NAME, 'Windows']], [

            /(com\.riseupradioalarm)\/((\d+)[\d\.]*)/i                          // RiseUP Radio Alarm
            ], [NAME, VERSION, MAJOR], [

            /(rad.io)\s((\d+)[\d\.]+)/i,                                        // Rad.io
            /(radio.(?:de|at|fr))\s((\d+)[\d\.]+)/i
            ], [[NAME, 'rad.io'], VERSION, MAJOR]

        ],

        cpu : [[

            /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i                     // AMD64
            ], [[ARCHITECTURE, 'amd64']], [

            /(ia32(?=;))/i                                                      // IA32 (quicktime)
            ], [[ARCHITECTURE, util.lowerize]], [

            /((?:i[346]|x)86)[;\)]/i                                            // IA32
            ], [[ARCHITECTURE, 'ia32']], [

            // PocketPC mistakenly identified as PowerPC
            /windows\s(ce|mobile);\sppc;/i
            ], [[ARCHITECTURE, 'arm']], [

            /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i                           // PowerPC
            ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [

            /(sun4\w)[;\)]/i                                                    // SPARC
            ], [[ARCHITECTURE, 'sparc']], [

            /(ia64(?=;)|68k(?=\))|arm(?=v\d+;)|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i
                                                                                // IA64, 68K, ARM, IRIX, MIPS, SPARC, PA-RISC
            ], [ARCHITECTURE, util.lowerize]
        ],

        device : [[

            /\((ipad|playbook);[\w\s\);-]+(rim|apple)/i                         // iPad/PlayBook
            ], [MODEL, VENDOR, [TYPE, TABLET]], [

            /applecoremedia\/[\w\.]+ \((ipad)/                                  // iPad
            ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [

            /(apple\s{0,1}tv)/i                                                 // Apple TV
            ], [[MODEL, 'Apple TV'], [VENDOR, 'Apple']], [

            /(hp).+(touchpad)/i,                                                // HP TouchPad
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /\s(nook)[\w\s]+build\/(\w+)/i,                                     // Nook
            /(dell)\s(strea[kpr\s\d]*[\dko])/i                                  // Dell Streak
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i                               // Kindle Fire HD
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [

            /\((ip[honed|\s\w*]+);.+(apple)/i                                   // iPod/iPhone
            ], [MODEL, VENDOR, [TYPE, MOBILE]], [
            /\((ip[honed|\s\w*]+);/i                                            // iPod/iPhone
            ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [

            /(blackberry)[\s-]?(\w+)/i,                                         // BlackBerry
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola)[\s_-]?([\w-]+)*/i,
                                                                                // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Huawei/Meizu/Motorola
            /(hp)\s([\w\s]+\w)/i,                                               // HP iPAQ
            /(asus)-?(\w+)/i                                                    // Asus
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /\((bb10);\s(\w+)/i                                                 // BlackBerry 10
            ], [[VENDOR, 'BlackBerry'], MODEL, [TYPE, MOBILE]], [
                                                                                // Asus Tablets
            /android.+((transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7))/i
            ], [[VENDOR, 'Asus'], MODEL, [TYPE, TABLET]], [

            /(sony)\s(tablet\s[ps])/i                                           // Sony Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /(nintendo)\s([wids3u]+)/i                                          // Nintendo
            ], [VENDOR, MODEL, [TYPE, CONSOLE]], [

            /((playstation)\s[3portablevi]+)/i                                  // Playstation
            ], [[VENDOR, 'Sony'], MODEL, [TYPE, CONSOLE]], [

            /(sprint\s(\w+))/i                                                  // Sprint Phones
            ], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [

            /(Lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i                         // Lenovo tablets
            ], [[VENDOR, 'Lenovo'], MODEL, [TYPE, TABLET]], [

            /(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,                               // HTC
            /(zte)-(\w+)*/i,                                                    // ZTE
            /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i
                                                                                // Alcatel/GeeksPhone/Huawei/Lenovo/Nexian/Panasonic/Sony
            ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [

                                                                                // Motorola
            /\s((milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?))[\w\s]+build\//i,
            /(mot)[\s-]?(\w+)*/i
            ], [[VENDOR, 'Motorola'], MODEL, [TYPE, MOBILE]], [
            /android.+\s((mz60\d|xoom[\s2]{0,2}))\sbuild\//i
            ], [[VENDOR, 'Motorola'], MODEL, [TYPE, TABLET]], [

            /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9|nexus 10))/i
            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, TABLET]], [                  // Samsung
            /((s[cgp]h-\w+|gt-\w+|galaxy\snexus))/i,
            /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,
            /sec-((sgh\w+))/i
            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, MOBILE]], [
            /(sie)-(\w+)*/i                                                     // Siemens
            ], [[VENDOR, 'Siemens'], MODEL, [TYPE, MOBILE]], [

            /(maemo|nokia).*(n900|lumia\s\d+)/i,                                // Nokia
            /(nokia)[\s_-]?([\w-]+)*/i
            ], [[VENDOR, 'Nokia'], MODEL, [TYPE, MOBILE]], [

            /android\s3\.[\s\w-;]{10}((a\d{3}))/i                               // Acer
            ], [[VENDOR, 'Acer'], MODEL, [TYPE, TABLET]], [

            /android\s3\.[\s\w-;]{10}(lg?)-([06cv9]{3,4})/i                     // LG Tablet
            ], [[VENDOR, 'LG'], MODEL, [TYPE, TABLET]], [
            /(lg) netcast\.tv/i                                                 // LG SmartTV
            ], [VENDOR, [TYPE, SMARTTV]], [
            /((nexus\s[45]))/i,                                                 // LG
            /(lg)[e;\s-\/]+(\w+)*/i
            ], [[VENDOR, 'LG'], MODEL, [TYPE, MOBILE]], [
                
             /android.+((ideatab[a-z0-9\-\s]+))/i                               // Lenovo
            ], [[VENDOR, 'Lenovo'], MODEL, [TYPE, TABLET]], [

            /(mobile|tablet);.+rv\:.+gecko\//i                                  // Unidentifiable
            ], [TYPE, VENDOR, MODEL]
        ],

        engine : [[
            /APP-([\w\s-\d]+)\/((\d+)?[\w\.]+)/i                                     // KTA App
            ], [[NAME, 'Mobile-App'], VERSION], [

            /(presto)\/([\w\.]+)/i,                                             // Presto
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,     // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m
            /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,                          // KHTML/Tasman/Links
            /(icab)[\/\s]([23]\.[\d\.]+)/i                                      // iCab
            ], [NAME, VERSION], [

            /rv\:([\w\.]+).*(gecko)/i                                           // Gecko
            ], [VERSION, NAME]
        ],

        os : [[

            // Windows based
            /microsoft\s(windows)\s(vista|xp)/i                                 // Windows (iTunes)
            ], [NAME, VERSION], [
            /(windows)\snt\s6\.2;\s(arm)/i,                                     // Windows RT
            /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
            ], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [
            /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
            ], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [

            // Mobile/Embedded OS
            /\((bb)(10);/i                                                      // BlackBerry 10
            ], [[NAME, 'BlackBerry'], VERSION], [
            /(blackberry)\w*\/?([\w\.]+)*/i,                                    // Blackberry
            /(tizen)\/([\w\.]+)/i,                                              // Tizen
            /(android|webos|palm\os|qnx|bada|rim\stablet\sos|meego)[\/\s-]?([\w\.]+)*/i
                                                                                // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo
            ], [NAME, VERSION], [
            /(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i                 // Symbian
            ], [[NAME, 'Symbian'], VERSION],[
            /mozilla.+\(mobile;.+gecko.+firefox/i                               // Firefox OS
            ], [[NAME, 'Firefox OS'], VERSION], [

            // Console
            /(nintendo|playstation)\s([wids3portablevu]+)/i,                    // Nintendo/Playstation

            // GNU/Linux based
            /(mint)[\/\s\(]?(\w+)*/i,                                           // Mint
            /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk)[\/\s-]?([\w\.-]+)*/i,
                                                                                // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
                                                                                // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk
            /(hurd|linux)\s?([\w\.]+)*/i,                                       // Hurd/Linux
            /(gnu)\s?([\w\.]+)*/i                                               // GNU
            ], [NAME, VERSION], [

            /(cros)\s[\w]+\s([\w\.]+\w)/i                                       // Chromium OS
            ], [[NAME, 'Chromium OS'], VERSION],[

            // Solaris
            /(sunos)\s?([\w\.]+\d)*/i                                           // Solaris
            ], [[NAME, 'Solaris'], VERSION], [

            // BSD based
            /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i                   // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
            ], [NAME, VERSION],[

            /(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i             // iOS
            ], [[NAME, 'iOS'], [VERSION, /_/g, '.']], [

            /(mac\sos\sx)\s?([\w\s\.]+\w)*/i                                    // Mac OS
            ], [NAME, [VERSION, /_/g, '.']], [

            // Other
            /(haiku)\s(\w+)/i,                                                  // Haiku
            /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,                               // AIX
            /(macintosh|mac(?=_powerpc)|plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos)/i,
                                                                                // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS
            /(unix)\s?([\w\.]+)*/i                                              // UNIX
            ], [NAME, VERSION]
        ]
    },
    UAParser = function (uastring) {

        var ua = uastring || ((window && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);

        if (!(this instanceof UAParser)) {
            return new UAParser(uastring).getResult();
        }
        this.getBrowser = function () {
            return mapper.rgx.apply(this, regexes.browser);
        };
        this.getCPU = function () {
            return mapper.rgx.apply(this, regexes.cpu);
        };
        this.getDevice = function () {
            return mapper.rgx.apply(this, regexes.device);
        };
        this.getEngine = function () {
            return mapper.rgx.apply(this, regexes.engine);
        };
        this.getOS = function () {
            return mapper.rgx.apply(this, regexes.os);
        };
        this.getResult = function() {
            return {
                ua      : this.getUA(),
                browser : this.getBrowser(),
                engine  : this.getEngine(),
                os      : this.getOS(),
                device  : this.getDevice(),
                cpu     : this.getCPU()
            };
        };
        this.getUA = function () {
            return ua;
        };
        this.setUA = function (uastring) {
            ua = uastring;
            return this;
        };
        this.setUA(ua);
    }
    ;
    
    this.init = function(){
        
        var ua = UAParser();
        
        this.ua = ua;
        
        this.browser = ua.browser.name;
        
        this.version = ua.browser.version;
        
        this.user_agent = ua.ua;
        
        this.OS = ua.os.name;
        
        this.isIE = false;
    
        this.isChrome = false;
        
        this.isFirefox = false;
        
        this.isOpera = false;
        
        this.isSafari = false;
        
        this.isMobile = false;
        
        this.isTablet = false;
        
        if(typeof ua.device.type=="mobile") this.isMobile = true;
        else if(typeof ua.device.type=="tableet") this.isTablet = true;
        
        switch(this.browser.toLowerCase()){
            case 'ie':
                this.isIE = true;
                break;
            
            case 'chrome':
                this.isChrome = true;
                break;
            
            case 'firefox':
                this.isFirefox = true;
                break;
                
            case 'opera':
                this.isOpera = true;
                break;
                
            case 'safari':
            case 'mobile safari':
                this.isSafari = true;
                break;
                
            default:
                break;
        }
    }
    
    this.show = function(){
         return [
            "browser : " + self.browser, "version : " + self.version, "OS : " + self.OS, "isIE : " + self.isIE, "isChrome : " + self.isChrome, "isFirefox : " + self.isFirefox, "isSafari : " + self.isSafari, "isOpera : " + self.isOpera, "isMobile : " + self.isMobile, "user_agent : " + self.user_agent, "width : " + self.width(), "height : " + self.height()
        ]
    }
    
    this.width = function(){
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
    }
    
    this.height = function(){
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
    
    this.ua;
    
    this.browser;
    
    this.version;
    
    this.OS;
    
    this.isIE;
    
    this.isChrome;
    
    this.isFirefox;
    
    this.isOpera;
    
    this.isSafari;
    
    this.isMobile;
    
    this.isTablet;
    
    this.user_agent;
    
    this.UAParser = UAParser;
    
    this.init();
    
}());
EZ.window = function(options){
    var self = this;
    
    options = options || {};
    options.window_style = options.window_style || {};
    options.mask_style = options.mask_style || {};
    options.content_style = options.content_style || {};
    options.close_button_style = options.close_button_style || {};
    options.onopen = options.onopen || EZ.emptyFN;
    options.onclose = options.onclose || EZ.emptyFN;
    
    
    this.open = function(e){
        options.onopen(e);
        self.mask.show(e);
        self.window.show(e);
    }
    
    this.close = function(e){
        options.onclose(e);
        self.mask.hide();
        self.window.hide();
    }
    
    this.init = function(){
        var key,v;
        
        for(key in options.window_style){
            if(options.window_style.hasOwnProperty(key)){
                this.window.elem.style[key] = options.window_style[key];
            }
        }
        
        for(key in options.mask_style){
            if(options.mask_style.hasOwnProperty(key)){
                this.mask.elem.style[key] = options.mask_style[key];
            }
        }
        
        for(key in options.content_style){
            if(options.content_style.hasOwnProperty(key)){
                this.window_content.elem.style[key] = options.content_style[key];
            }
        }
        
        for(key in options.close_button_style){
            if(options.close_button_style.hasOwnProperty(key)){
                this.close_button.elem.style[key] = options.close_button_style[key];
            }
        }
    }
    
    this.mouseCoords = function (e) {
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
    
    this.window = {
        elem : document.createElement('div'),
        show : function(e){
            if(typeof e == 'string' || typeof e == 'number'){
              options.content = e;
              self.window_content.elem.innerHTML = options.content;
            }
            document.body.appendChild(self.window.elem);
            self.window.elem.style['visibility'] = 'visible';
            setTimeout(function(){
                self.window.elem.style['top'] = '50%';
                self.window.elem.style['opacity'] = '1';
            },0);
            
        },
        hide : function(e){
            self.window.elem.style['top'] = '40%';
            self.window.elem.style['opacity'] = '0';
            setTimeout(function(){
                if(self.window.elem.parentNode == document.body){
                    document.body.removeChild(self.window.elem);
                    self.window.elem.style['visibility'] = 'hidden';
                }
            },500);
            
        }
    };
    
    this.window.elem.style['background-color'] = '#fff';
    this.window.elem.style['border'] = '3px solid #fff';
    this.window.elem.style['display'] = 'inline-block';
    this.window.elem.style['left'] = '50%';
    this.window.elem.style['padding'] = '15px';
    this.window.elem.style['position'] = 'fixed';
    this.window.elem.style['text-align'] = 'justify';
    this.window.elem.style['z-index'] = '10';
    this.window.elem.style['transform'] = 'translate(-50%, -50%)';
    this.window.elem.style['border-radius'] = '10px';
    this.window.elem.style['box-shadow'] = '0 1px 1px 2px rgba(0, 0, 0, 0.4) inset';
    this.window.elem.style['transition'] = 'opacity .5s, top .5s';
    //this.window.elem.style['-webkit-transition'] = 'opacity .5s, top .5s';
    this.window.elem.style['min-width'] = '200px';
    this.window.elem.style['min-height'] = '200px';
    this.window.elem.style['box-shadow'] = 'rgba(0, 0, 0, 0.8) 0px 4px 16px';
    
    this.window.elem.style.zIndex='1000';
  
    this.window.elem.style['visibility'] = 'hidden';
    this.window.elem.style['opacity'] = '0';
    this.window.elem.style['top'] = '40%';
  
    this.window_content = {
        elem : document.createElement('div')
    };
    this.window_content.elem.innerHTML = options.content || '';
    
    this.mask = {
        elem : document.createElement('div'),
        show : function(){
            document.body.appendChild(self.mask.elem);
            setTimeout(function(){
                self.mask.elem.style.opacity='1';
            },0);
            
        },
        hide : function(){
            self.mask.elem.style.opacity='0';
            setTimeout(function(){ 
                if(self.mask.elem.parentNode == document.body){
                    document.body.removeChild(self.mask.elem);
                }
            },1000);
            
        }
    };
    this.mask.elem.style.position = 'fixed';
    this.mask.elem.style.left='0';
    this.mask.elem.style.right='0';
    this.mask.elem.style.top='0';
    this.mask.elem.style.bottom='0';
    this.mask.elem.style.textAlign='center';
    this.mask.elem.style.backgroundColor='rgba(0, 0, 0, 0.6)';
    this.mask.elem.style.zIndex='999';
    this.mask.elem.setAttribute('close_window','1');
    this.mask.elem.style.opacity='0';
    this.mask.elem.style['transition'] = 'opacity 1s';
    this.mask.elem.onclick = this.close;
    
    this.close_button = {
        elem : document.createElement('a')
    };
    
    this.close_button.elem.style.display='inline-block';
    this.close_button.elem.style.color='rgba(255, 255, 255, 0.9)';
    this.close_button.elem.style.backgroundColor='rgba(0, 0, 0, 0.8)';
    this.close_button.elem.style['cursor']='pointer';
    this.close_button.elem.style['font-size']='24px';
    this.close_button.elem.style['text-shadow']='0 -1px rgba(0, 0, 0, 0.9)';
    this.close_button.elem.style['height'] = '30px';
    this.close_button.elem.style['line-height'] = '30px';
    this.close_button.elem.style['position'] = 'absolute';
    this.close_button.elem.style['right'] = '-15px';
    this.close_button.elem.style['text-align'] = 'center';
    this.close_button.elem.style['text-decoration'] ='none';
    this.close_button.elem.style['top'] = '-15px'; 
    this.close_button.elem.style['width']='30px';
    this.close_button.elem.style['border-radius']='15px';
  
    this.close_button.elem.innerHTML = 'X';
    this.close_button.elem.setAttribute('close_window','1');
    this.close_button.elem.onclick = this.close;
    this.close_button.elem.onmouseover = function(){this.style['background-color']='rgba(64, 128, 128, 0.8)';}
    this.close_button.elem.onmouseout = function(){this.style['background-color']='rgba(0, 0, 0, 0.8)';}
    
    this.window.elem.appendChild(this.close_button.elem);
    this.window.elem.appendChild(this.window_content.elem);
   
   
   this.init();
}
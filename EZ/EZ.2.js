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

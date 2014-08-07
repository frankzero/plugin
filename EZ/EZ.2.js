"use strict";
if (typeof console == 'undefined') {
    console = {
        log : function () {},
        trace : function () {}
    }
}

(function(window, document, undefined){
    var 
    EZ = {},
    r20 = /%20/g,
    core_rnotwhite = /\S+/g,
    rspaces = /\s+/,
    rclass = /[\n\t]/g,
    class2type={},
    core_toString = class2type.toString
    ;
    
    (function(s, class2type){
        var row,name;
        
        s = s.split(" ");
        
        while(name = s.shift()){
            class2type[ "[object " + name + "]" ] = name.toLowerCase();
        }
    }("Boolean Number String Function Array Date RegExp Object Error", class2type));
    
    EZ.stringicon = {
        'close' : '✖'
    };
    
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
    };
    
    /*
        載入lib
    */
    EZ.load = function(lib){
        EZ.loadjs(EZ.scriptUrl+'src/'+lib+'.js');
        return EZ;
    };
    
    EZ.show = function (ArrayData, type) {
        var _t = '';
        for (var key in ArrayData) {
            if (typeof type == 'undefined') {
                _t += key + ' = ' + ArrayData[key] + "\n";
            } else {
                _t += key + ' = ' + ArrayData[key] + "<br />";
            }
        }
        if (typeof type != 'undefined') {
            alert(_t);
        } else {
            var aa = window.open();
            aa.document.write(_t);
        }
    };
    
    /*
        去頭尾空白 
    */
    EZ.trim = function(text){
        //var rtrim = /^\s+|\s+$/g;
        return text.replace(/^\s+|\s+$/g, '');
    }
    
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
        碼表 直接用 不用new 
    */
    EZ.watch = {
        
        init : function(){
            if(!this.watch){
                this.watch = new EZ.stopwatch();
                this.play = this._play;
            }
        },
        
        play : function(){
            this.init();
            return this.watch.play();
        },
        
        _play : function(){
            return this.watch.play();
        },
        
        pause : function(){
            return this.watch.pause();
        },
        
        stop : function(){
            return this.watch.stop();
        }
        
    };
    /*
        合併陣列 
        EZ.merge([1,2,3],[4,5,6],[7,8,9,10,11],12);
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        
        也會合併 疑似陣列 
    */
    EZ.merge = function(){
        
        var i,j,imax,jmax,r=[],arr,a;
        
        for(i=0,imax=arguments.length; i<imax; i++){
            
            arr = arguments[i];
            
            if(this.typeof(arr) == 'array'){
                
                r = r.concat(arr);
                
            }else if(this.canbeArray(arr)){
                /*
                    疑似陣列 手工合併 !
                */
                j=0;
                for(j=0,jmax=arr.length; j<jmax; j++){
                    a = arr[j];
                    r[r.length] = a;
                }
                
            }else if(EZ.typeof(arr) != 'undefined'){
                r[r.length] = arr;
            }
        }
        return r;
    };
    
    EZ.isEmpty = function (obj) {
        return (typeof obj == 'undefined' || obj == null || obj == '') ? true : false;
    };
    
    EZ.typeof = function(obj){
        
        if(obj == null){
            return String(obj);
        }
        
        return typeof obj === "object" || typeof obj === "function" ?
        class2type[ core_toString.call(obj) ] || "object": typeof obj;
    };

    EZ.isFunction = function(obj){
        return EZ.typeof(obj) === "function";
    };

    EZ.isArray = Array.isArray || function(obj){
        return EZ.typeof(obj) === "array";
    };
    
    /*
        querySelector 回傳的東西
        [object NodeList] 
        [object HTMLCollection]
        都可以當陣列只用 所以判定為 true
    */
    EZ.canbeArray = function(arr){
        var 
        type
        ;
        
        type = Object.prototype.toString.call(arr);
        
        if( type === '[object NodeList]' || type === '[object HTMLCollection]' ) return true;
        
        if(arr && EZ.isNumeric(arr.length) && !this.isElem(arr)) return true;
        
        return false;
    };
    
    /*
        判斷是 html 元素
    */
    EZ.isElem = function(el){
        var tagName,nodeType;
        
        tagName = el && el.tagName;
        
        nodeType = el && el.nodeType;
        
        if(tagName && nodeType){
            return true;
        }
        
        return false;
    };
    
    EZ.isNumeric = function(obj){
        return !isNaN( parseFloat(obj) ) && isFinite( obj );
    };

    EZ.isEmptyObject = function(obj){
        var name;
        for ( name in obj ) {
            return false;
        }
        return true;
    };

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
        //console.log(s.join( "&" ).replace( r20, "+" ));
        return s.join( "&" ).replace( r20, "+" );
    };

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
    };
    
    /*
        回傳在陣列的位置 
    */
    EZ.arrayIndexOf = function(value, arr, fromIndex){
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
    };
    
    /*
        回傳bool 
    */
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
        var oForm,
        i,
        elements,
        formData,
        field_type,
        name,
        v
        ;
        
        if (typeof(_oForm) == 'string') {
            oForm = document.getElementById(_oForm);
        } else {
            oForm = _oForm;
        }
        elements = oForm.elements;
        formData = {};
        for (i = 0; i < elements.length; i++) {
            field_type = elements[i].type;
            if (typeof field_type == 'undefined')
                continue;
            field_type = field_type.toLowerCase();
            name = elements[i].name;
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
                    v = elements[i].getAttribute('noValue')
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
        var oForm,
        i,
        imax,
        j,
        jmax,
        elements,
        formData,
        field_type,
        name,
        v
        ;
        
        if (typeof(_oForm) == 'string') {
            oForm = document.getElementById(_oForm);
        } else {
            oForm = _oForm;
        }
        elements = oForm.elements;
        for (i = 0; i < elements.length; i++) {
            field_type = elements[i].type;
            name = elements[i].name;
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
                for (j = 0, jmax = os.length; j < jmax; j++) {
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
        var oForm,
        i,
        imax,
        j,
        jmax,
        elements,
        formData,
        field_type,
        name,
        result,
        rtn,
        value,
        v
        ;
        
        if (typeof(_oForm) == 'string') {
            oForm = document.getElementById(_oForm);
        } else {
            oForm = _oForm;
        }
        elements = oForm.elements;
        result = [];
        for (i = 0; i < elements.length; i++) {
            field_type = elements[i].type.toLowerCase();
            name = elements[i].name;
            switch (field_type) {
            case "text":
            case "password":
            case "textarea":

                if (typeof formCheck[name] == 'function') {
                    value = elements[i].value;
                    rtn = formCheck[name].apply(this, [elements[i]]);
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
    };

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
    };
    
    EZ.deleteCookie=function(name){
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };
    
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
    };
    
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
    
    EZ.parse = function(response){
        var r;
        
        try{
            r = EZ.json_decode(response);
        }catch(e){
            return {success:0,msg:'server response error',data:[]};
        }
        
        return r;
    };
    
    /*
        把文字 轉成 element
    */
    EZ.text_to_html = function(text){
        
        if(this.typeof(text) != 'string') return [];
        
        var div,rs=[],child,i;
        
        div = document.createElement('div');
        div.innerHTML = text;
        
        i=0;
        while(child = div.childNodes[i++]){
            rs[rs.length] = child;
        }
        return rs;
    };
    
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
    };
    
    EZ.ajax = function(url, params, callback){
        EZ.request(url, 'POST' , params , callback);
    };
    
    EZ.event = {
        
        fn : {},
        
        removefn : function(id){
            delete this.fn[id];
        },
        
        /*
            清除所有子元素事件 
        */
        cleanall : function(el){
            //var s = EZ.Date().getTime();
            var els,tmp,i=0;
            
            els = EZ.find('*',el);
            
            while(tmp = els[i++]){
                this.clean(tmp);
            }
            //var e = EZ.Date().getTime();
            //console.log(e-s);
        },
        
        /*
            清除元素所有事件
        */
        clean : function(el){
            var 
            f,
            type,
            id,
            ezid,
            i,
            imax
            ;
            
            ezid = el.ezid || [];
            
            for(i=ezid.length; i>=0 ; i--){
                id = ezid[i];
                f = this.fn[id];
                if(f){
                    for(type in f){
                        EZ.removeEvent(el, type, f[type]);
                    }
                }
            }
        },
        
        add : (function(){
            if(document.addEventListener){
                return function(el, type, handle){
                    el.addEventListener(type, handle);
                }
            }else if(document.attachEvent){
                return function(el, type, handle){
                    el.attachEvent( "on" + type, handle );
                }
            }else{
                return function(el, type, handle){
                    el['on'+type] = handle;
                }
            }
        }()),
        
        remove : (function(){
            if(document.removeEventListener){
                return function(el, type, handle){
                    el.removeEventListener(type, handle );
                }                       
            }else if(document.detachEvent){
                return function(el, type, handle){
                    el.detachEvent( "on" + type, handle );
                }
            }else{
                return function(el, type, handle){
                    el['on'+type] = null;
                }
            }
        }())
    };
    
    
    /*
        元素處理器 
    */
    EZ.elements = {

        addClass : function (elem,cl){
            var classNames = (cl || "").split( rspaces );
            var className = " " + elem.className + " ",
            setClass = elem.className;
            for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
                if ( className.indexOf( " " + classNames[c] + " " ) < 0 ) {
                    setClass += " " + classNames[c];
                }
            }
            //elem.className = setClass.replace(/^\s+|\s+$/g,'');//trim
            elem.className = EZ.trim(setClass);
        },
        
        removeClass : function (elem,cl){
            var classNames = (cl || "").split( rspaces );
            var className = (" " + elem.className + " ").replace(rclass, " ");
            for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
                className = className.replace(" " + classNames[c] + " ", " ");
            }
            
            elem.className = EZ.trim(className);
        },
        
        hasClass : function(el, cls){
            var 
            className,
            i = 0
            ;
            
            className = " " + cls + " ";
            
            if ( el.nodeType === 1 && (" " + el.className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
                return true;
            }
            return false;
        },
        
        toggleClass : function(el, cls){
            var i=0,
            className,
            classNames = cls.match( core_rnotwhite ) || [];
            
            while ( (className = classNames[ i++ ]) ) {
                if(EZ.hasClass(el, className )){
                    EZ.removeClass( el, className );
                }else{
                    EZ.addClass( el, className );
                }
            }
        },
        
        css : function(el, style, value){
            if(EZ.typeof(el) != 'undefined' && EZ.typeof(el.style) == 'object')
            el.style[style] = value;
        },
        
        removeCss : function(el, style){
            el.style[style] = null;
        },
        
        attr : function(el, key, value){
            if(EZ.typeof(value) == 'undefined'){
                return (el && el.getAttribute) ? el.getAttribute(key) : '';
            }else{
                el.setAttribute(key, value);
                return value;
            }
        },
        
        removeAttr : function(el, key){
            el.removeAttribute(key);
        },
        
        addEvent : function(el, type, handle){
            /*
                偷存 handle , clean用 
            */
             var id,
            old_id,
            i,
            imax,
            ezid,
            _handle,
            found
            ;
            
            if( EZ.typeof(el && el.ezid) == 'undefined' ){
                
                id = EZ.id();
                el.ezid = [id];
                EZ.event.fn[id] = EZ.event.fn[id] || {};
                EZ.event.fn[id][type] = handle;
                EZ.event.add(el, type, handle);
                
            }else{
                /*
                    如果 handle 已經註冊過 就不必再註冊事件 
                */
                ezid =el.ezid;
                found = false;
                for(i=0,imax=ezid.length; i<imax; i++){
                    old_id = ezid[i];
                    _handle = EZ.event.fn[old_id] && EZ.event.fn[old_id][type];
                    
                    if(_handle && _handle === handle){
                        found = true;
                        break;
                    }
                }
                
                if( found === false ){
                    id = EZ.id();
                    el.ezid.push(id);
                    EZ.event.fn[id] = EZ.event.fn[id] || {};
                    EZ.event.fn[id][type] = handle;
                    EZ.event.add(el, type, handle);
                }
            }
        },
        
        on : function(el, type, handle){
            this.addEvent(el, type, handle);
        },
        
        removeEvent : function(el, type, handle){
            var 
            ezid,
            i,
            imax,
            id,
            _handle,
            _type,
            fn
            ;
            
            if( EZ.typeof(handle) == 'undefined'){
                // 移除所有 type 事件
                //handle = handle || (EZ.event.fn[el.ezid] && EZ.event.fn[el.ezid][type]);
                
                ezid = el.ezid || [];
                for(i=0,imax=ezid.length; i<imax; i++){
                    
                    id = ezid[i];
                    
                    fn = EZ.event.fn[id] || {};
                    
                    for( _type in fn){
                        
                        if( _type == type && fn.hasOwnProperty(_type)){
                            
                            _handle = fn[_type];
                            EZ.event.removefn(id);
                            EZ.event.remove(el, _type, handle);
                            
                            // 從 id群中 移除 id
                            el.ezid.splice(EZ.arrayIndexOf(id, el.ezid), 1);
                        }
                    }
                }
            }else{
            
                ezid = el.ezid || [];
                
                for(i=0,imax=ezid.length; i<imax; i++){
                    id = ezid[i];
                    _handle = EZ.event.fn[id] && EZ.event.fn[id][type];
                    
                    if( _handle && _handle === handle ){
                        EZ.event.removefn(id);
                        EZ.event.remove(el, type, handle);
                        
                        // 從 id群中 移除 id
                        el.ezid.splice(EZ.arrayIndexOf(id, el.ezid), 1);
                        break;
                    }
                    
                }
            }
        },
        
        off : function(el, type, handle){
            this.removeEvent(el, type, handle);
        },
        
        /*
            找元素 根據 css3 selector 
        */
        find : function(selector, el, results, seed){
            return EZ.Sizzle(selector, el, results, seed);
        },
        
        Sizzle : function(selector, el, results, seed){
            var els
            ;
            
            el = el || document;
            
            els = el.querySelectorAll(selector);
            
            els = EZ.canbeArray(els) ? els : ( EZ.isEmpty(els) ? [] : [els] );
            
            if(EZ.canbeArray(results)){
                els = EZ.merge( results, els);
            }
            
            return els;
            
        },
        
        html : function(el, content){
            
            EZ.empty(el);
            
            if( EZ.isElem(content) ) el.appendChild(content);
            else if(EZ.typeof(content) == 'string') el.innerHTML = content;
        },
        
        /*
            name 跟 nodename 比對名子
        */
        nodeName : function(elem, name){
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        
        /*
            clear element and remove event of all children element
        */
        empty : function(el){
            // Remove element nodes and prevent memory leaks
            if ( el.nodeType === 1 ) {
                EZ.event.cleanall(el);
            }
            
            while(el.firstChild){
                el.removeChild(el.firstChild);
            }
            
            /*
                If this is a select, ensure that it displays empty (#12336)
                Support: IE<9
            */
            if ( el.options && EZ.nodeName( el, "select" ) ) {
                el.options.length = 0;
            }
        },
        
        val : function(el, v){
            var 
            elem_type,
            tagName,
            value
            ;
            
            tagName = (el && el.tagName && el.tagName.toLowerCase()) || '' ;
            
            if(!tagName) return '';
            
            elem_type = (el && el.type && el.type.toLowerCase()) || '';
            
            switch(tagName+'_'+elem_type){
                case "input_text":
                case "input_password":
                case "textarea_textarea":
                case "input_hidden":
                case 'input_radio':
                case "select_select-one":
                case "select_select-multi":
                    
                    if(EZ.typeof(v) != 'undefined'){
                        el.value = v;
                    }
                    
                    value = el.value;
                    
                    break;
                
                case 'input_checkbox':
                    
                    if(EZ.typeof(v) != 'undefined'){
                        el.value = v;
                    }
                    
                    // 如果沒勾也要有值 找 noValue
                    
                    if(el.checked === false && el.hasAttribute('noValue') ){
                        value = EZ.attr(el, 'noValue');
                    }else{
                        value = el.value;
                    }
                        break;
                
                case "form_":
                    if(EZ.typeof(v) != 'undefined'){
                        EZ.setForm(el, v);
                    }
                    value = EZ.getForm(el);
                    break;
                    
                default:
                    if(EZ.typeof(v) != 'undefined'){
                        el.value = v;
                    }
                    value = el.value;
                    break;
            }
            
            return value;
        },
        
        width : function(el){
            var 
            w,
            clone
            ;
            
            if(!EZ.isElem(el)) return 0;
            
            w = el.clientWidth;
            
            if(w == 0){
                clone = el.cloneNode(true);
                clone.style.display='inline-block';
                clone.style.position = 'absolute';
                document.body.appendChild(clone);
                w = clone.clientWidth;
                document.body.removeChild(clone);
                clone = null;
            }
            return w;
            
        },
        
        height : function(el){
            var 
            h,
            clone
            ;
            
            if(!EZ.isElem(el)) return 0;
            
            h = el.clientHeight;
            
            if(h == 0){
                clone = el.cloneNode(true);
                clone.style.display='inline-block';
                clone.style.position = 'absolute';
                document.body.appendChild(clone);
                h = clone.clientHeight;
                document.body.removeChild(clone);
                clone = null;
            }
            return h;
        },
        
        append : function(el, child){
            var
            tmp
            ,els
            ,_child
            ,i
            ;
            
            if(EZ.typeof(child) == 'string'){
                
                tmp = document.createDocumentFragment();
                els = EZ.text_to_html(child);
                i=0;
                while(_child = els[i++]){
                    tmp.appendChild(_child);
                }
                
                el.appendChild(tmp);
                
            }else{
                el.appendChild(child);
            }
            
        }
    };
    
    
    (function(EZ){
        var key;
        for(key in EZ.elements){
            if(EZ.elements.hasOwnProperty(key)){
                EZ[key] = EZ.elements[key];
                //EZ.constructor.prototype[key] = EZ.elements[key];
            }
        }
    }(EZ));
    
    
    
    EZ.grep = function( elems, callback, inv ) {
        var retVal,
            ret = [],
            i = 0,
            length = elems.length;
        inv = !!inv;

        // Go through the array, only saving the items
        // that pass the validator function
        for ( ; i < length; i++ ) {
            retVal = !!callback( elems[ i ], i );
            if ( inv !== retVal ) {
                ret.push( elems[ i ] );
            }
        }

        return ret;
    };
    
    /*
        選擇器
        ff
        EZ.query
    */
    EZ.selector = function(selector, context, results, seed, EZ){
        
        var self = this;
        
        this.els = [];
        
        this.each = function(fn){
            
            var i,imax,el;
            
            for(i=0,imax=this.els.length; i<imax ;i++){
                el = this.els[i];
                fn.apply(this,[i, el]);
            }
            
            return this;
        };
        
        this.addClass = function(cl){
            
            this.each(function(index, el){
                EZ.addClass(el, cl);
            });
            
            return this;
        };
        
        this.removeClass = function(cl){
            
            this.each(function(index, el){
                EZ.removeClass(el, cl);
            });
            
            return this;
        };
        
        this.attr = function(key, value){
            
            if(EZ.typeof(value) == 'undefined'){
                return EZ.attr(this.els[0], key);
            }else{
                this.each(function(index, el){
                    EZ.attr(el, key, value);
                });
            }
            
            return this;
        };
        
        this.removeAttr = function(key){
            this.each(function(index, el){
                EZ.removeAttr(el, key);
            });
            
            return this;
        }
        
        this.css = function(style, value){
            
            this.each(function(index, el){
                EZ.css(el, style, value);
            });
            
            return this;
        };
        
        this.removeCss = function(style){
            
            this.each(function(index, el){
                EZ.removeCss(el, style);
            });
            
            return this;
        };
        
        this.addEvent = function(type, handle){
            this.each(function(index, el){
                EZ.addEvent(el, type, handle);
            });
            
            return this;
        };
        
        this.on = this.addEvent;
        
        this.removeEvent = function(type, handle){
            this.each(function(index, el){
                EZ.removeEvent(el, type, handle);
            });
            
            return this;
        };
        
        this.off = this.removeEvent;
        
        this.hasClass = function(cls){
            if(typeof this.els[0] == 'undefined') return false;
            return EZ.hasClass(this.els[0], cls);
        };
        
        this.toggleClass = function(cls){
            this.each(function(index, el){
                EZ.toggleClass(el, cls);
            });
            
            return this;
        };

        this.get = function(index){
            return this.els[index];
        };
        
        this.init = function(selector, context, results, seed){
            if(EZ.typeof(selector) == 'object'){
                this.els = EZ.canbeArray(selector) ? selector: [selector];
            }else{
                this.els = EZ.find(selector, context, results, seed);
            }
            return this;
        };
        
        this.find = function(selector, results, seed){
            return EZ.query(selector, this.els[0] ,results, seed);
        };
        
        this.html = function(content){
            
            this.each(function(index, el){
                EZ.html(el,content);
            });
            
            return this;
        };
        
        this.empty = function(){
            
            this.each(function(index, el){
                EZ.empty(el);
            });
            
            return this;
        };
        
        this.clean = function(){
            
            this.each(function(index, el){
                EZ.event.clean(el);
            });
            
            return this;
        };
        
        this.val = function(value){
            
            if(EZ.typeof(value) == 'undefined'){
                return EZ.val(this.els[0]);
            }else{
                this.each(function(index, el){
                    EZ.val(el, value);
                });
            }
            return this;
        };
        
        this.width = function(){
            
            return EZ.width(this.els[0]);
            
        };
        
        this.height = function(){
            
            return EZ.height(this.els[0]);
            
        };
        
        this.append = function(child){
            
            this.each(function(index, el){
                EZ.append(el, child);
            });
            
            return this;
        };
        
        this.init(selector, context, results, seed);
        
    };
    
    EZ.query = function(selector, context, results, seed){
        
        return new EZ.selector(selector, context, results, seed, EZ);
        
    };
    
    
    /*
        init
    */
    
    EZ.scriptUrl = (function() {
        var scripts = document.getElementsByTagName('script');
        var index = scripts.length - 1;
        var myScript = scripts[index];
        
        var tmp = myScript.src.split('/');
        
        return myScript.src.replace(tmp[tmp.length-1], '');
    }());
    
    /*
        <script src="/plugin/EZ/EZ.2.js?load=window,system,sha512"></script>
    */
    (function(){
        var scripts = document.getElementsByTagName('script');
        var index = scripts.length - 1;
        var myScript = scripts[index];
        
        var s = myScript.src;
        if(s.indexOf('?') != -1){
            s = s.split('?');
            s = s[1].split('&');
            for(var i=0,imax=s.length; i<imax; i++){
                var t = s[i];
                t = t.split('=');
                if(t[0] == 'load'){
                    var tt = t[1].split(',');
                    for(var j=0,jmax=tt.length; j<jmax; j++){
                        EZ.load(tt[j]);
                    }
                }
            }
        }
    }());
    
    
    window.EZ = EZ;
    
    /*
        懶得打字 EZ.query  縮短成 ff;
    */
    window.ff = EZ.query;
    
}(window, document, undefined));



/*
    Sizzle 選擇器 
*/
(function(EZ){
    
    if( !document.querySelectorAll ){
        EZ.load('sizzle');
    }
    
}(EZ));



/*
(function(){
    var fjs = document.getElementsByTagName('script')[0]
    ,js = document.createElement('script');
    js.type = 'text/javascript';
    js.async = (typeof async == 'undefined') ? true : async;
    js.src = 'http://frankzero.com.tw/plugin/EZ/EZ.2.js';
    fjs.parentNode.insertBefore(js,fjs);
}());
*/
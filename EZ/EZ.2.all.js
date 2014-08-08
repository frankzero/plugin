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
    
    EZ.query = function(selector, context, results, seed){
        
        return new EZ.selector(selector, context, results, seed, EZ);
        
    };
    
    window.EZ = EZ;
    /*
        懶得打字 EZ.query  縮短成 ff;
    */
    window.ff = EZ.query;
    
    EZ.stringicon = {
        'close' : '✖'
    };
    
    EZ.id = function(){
        var count = 0,
        token = EZ.unique_id(10)
        ;
        
        EZ.id =  function(){
            count++;
            return token + count;
        };
        return EZ.id();
    };
    
    EZ.emptyFN = new Function();
    
    EZ.error = function(msg){
        throw new Error( msg );
    };
    
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
    };
    
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
            
            if(this.type(arr) == 'array'){
                
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
                
            }else if(EZ.type(arr) != 'undefined'){
                r[r.length] = arr;
            }
        }
        return r;
    };
    
    EZ.isEmpty = function (obj) {
        return (typeof obj == 'undefined' || obj === null || obj === '') ? true : false;
    };
    
    EZ.type = function(obj){
        
        if(obj === null){
            return String(obj);
        }
        
        return typeof obj === "object" || typeof obj === "function" ?
        class2type[ core_toString.call(obj) ] || "object": typeof obj;
    };
    
    EZ.isJSON = EZ.is_json_string = function(str){
        //JSON RegExp
        var
        rvalidchars = /^[\],:{}\s]*$/,
        rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
        rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g
        ;
        
        if ( rvalidchars.test( str.replace( rvalidescape, "@" )
        .replace( rvalidtokens, "]" )
        .replace( rvalidbraces, "")) ){
            return true;
        }
        return false;
    };
    
    EZ.isFunction = function(obj){
        return EZ.type(obj) === "function";
    };

    EZ.isArray = Array.isArray || function(obj){
        return EZ.type(obj) === "array";
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
    EZ.isElem = EZ.isHtmlElement = function(el){
        /*
            2種方法都可 
        return (Object.prototype.toString.call(el).toUpperCase().indexOf('HTML') != -1) ? true : false;
        */
        return (el && el.tagName && el.nodeType ) ? true : false;
        
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

    EZ.param = EZ.object_to_querystring = function(a){
        var s = [],
        add = function(key,value){
            value = EZ.isFunction(value) ? value() : (value === null ? "" : value);
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
            }else if(EZ.type(obj) === "object"){
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

    EZ.round = function (num, digit) {
        var x = 1;
        if (digit) {
            x = Math.pow(10, digit);
        }
        return Math.round(num * x) / x;
    };
    
    EZ.rand = EZ.random = function (min, max) {
        return Math.round(Math.random() * (max - min) + min);
    };
    
    EZ.unique_id = function (num) {
        var 
        t = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'
            , 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
            , 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'
            , 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
            , '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
        ],
        
        f = []
        
        ;
        
        f[0] = t[ Math.floor( Math.random() * 52 ) ];
        
        for (var i = 1; i < num; i++) {
            f[i] = t[ Math.floor( Math.random() * 62 ) ];
        }
        
        return f.join('');
    };
    
    //複製object
    EZ.clone = function (obj) {
        var copy,i,len,att;
        // Handle the 3 simple types, and null or undefined
        if (null === obj || "object" != typeof obj)
            return obj;
        
        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }
        
        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (i = 0, len = obj.length; i < len; ++i) {
                copy[i] = this.clone(obj[i]);
            }
            return copy;
        }
        
        // html elements
        if(obj.cloneNode){
            return obj.cloneNode(true);
        }
        
        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (attr in obj) {
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
        if (myArray.length === 0)
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
                    if (rtn === false) {
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
    
    EZ.getCookie = EZ.readCookie = function(name){
        name = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) 
        {
            var c = ca[i].trim();
            if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
        }
        return "";
    };

    EZ._setCookie = function(name,value,time,unit,path){
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
        document.cookie = name + "=" + value + ";Path="+path+';' + expires;
    };
    
    EZ.setCookie = function(name, value, day){
        var expires = "expires="+EZ.Date().day(day).dateObject.toGMTString();
        document.cookie = name + "=" + value + ";Path=/;" + expires;
    };
    
    EZ.removeCookie = EZ.deleteCookie = function(name){
        EZ.setCookie(name,'',-1);
        //document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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
                },
                obj : obj,
                dateObject : obj
                
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
    
    EZ.api_decode = function(response){
        var r;
        
        try{
            r = EZ.json_decode(response);
        }catch(e){
            return {success:0,msg:'server response error',data:response};
        }
        
        return r;
    };
    
    /*
        把文字 轉成 element
    */
    EZ.html_decode = function(text){
        
        if(this.type(text) != 'string') return [];
        
        var div,rs=[],child,i;
        
        div = document.createElement('div');
        div.innerHTML = text;
        
        i=0;
        while(child = div.childNodes[i++]){
            rs[rs.length] = child;
        }
        return rs;
    };
    
    EZ.xml_decode = function( data ){
        var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			EZ.error( "Invalid XML: " + data );
		}
		return xml;
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
            
            var els,tmp,i=0;
            
            els = EZ.find('*',el);
            
            while(tmp = els[i++]){
                this.clean(tmp);
            }
            
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
        
        add : function(el, type, handle){
            if(document.addEventListener){
                EZ.event.add = function(el, type, handle){
                    el.addEventListener(type, handle);
                }
            }else if(document.attachEvent){
                EZ.event.add = function(el, type, handle){
                    el.attachEvent( "on" + type, handle );
                }
            }else{
                EZ.event.add = function(el, type, handle){
                    el['on'+type] = handle;
                }
            }
            EZ.event.add(el, type, handle);
        },
        
        remove : function(el, type, handle){
            if(document.removeEventListener){
                EZ.event.remove = function(el, type, handle){
                    el.removeEventListener(type, handle );
                }                       
            }else if(document.detachEvent){
                EZ.event.remove = function(el, type, handle){
                    el.detachEvent( "on" + type, handle );
                }
            }else{
                EZ.event.remove = function(el, type, handle){
                    el['on'+type] = null;
                }
            }
            EZ.event.remove(el, type, handle);
        }
    };
    
    /*
        元素處理器 
    */
    EZ.elements = {

        addClass : function (elem,cl){
            var c;
            var classNames = (cl || "").split( rspaces );
            var className = " " + elem.className + " ",
            setClass = elem.className;
            for ( c = 0, cl = classNames.length; c < cl; c++ ) {
                if ( className.indexOf( " " + classNames[c] + " " ) < 0 ) {
                    setClass += " " + classNames[c];
                }
            }
            //elem.className = setClass.replace(/^\s+|\s+$/g,'');//trim
            elem.className = EZ.trim(setClass);
        },
        
        removeClass : function (elem,cl){
            var c;
            var classNames = (cl || "").split( rspaces );
            var className = (" " + elem.className + " ").replace(rclass, " ");
            for ( c = 0, cl = classNames.length; c < cl; c++ ) {
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
            if(EZ.type(el) != 'undefined' && EZ.type(el.style) == 'object')
            el.style[style] = value;
        },
        
        removeCss : function(el, style){
            el.style[style] = null;
        },
        
        attr : function(el, key, value){
            if(EZ.type(value) == 'undefined'){
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
            
            if( EZ.type(el && el.ezid) == 'undefined' ){
                
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
            
            if( EZ.type(handle) == 'undefined'){
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
                            EZ.event.remove(el, _type, _handle);
                            
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
            else if(EZ.type(content) == 'string') el.innerHTML = content;
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
                    
                    if(EZ.type(v) != 'undefined'){
                        el.value = v;
                    }
                    
                    value = el.value;
                    
                    break;
                
                case 'input_checkbox':
                    
                    if(EZ.type(v) != 'undefined'){
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
                    if(EZ.type(v) != 'undefined'){
                        EZ.setForm(el, v);
                    }
                    value = EZ.getForm(el);
                    break;
                    
                default:
                    if(EZ.type(v) != 'undefined'){
                        el.value = v;
                    }
                    value = el.value || el.innerHTML || '';
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
            
            if(w === 0){
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
            
            if(h === 0){
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
            
            if(EZ.type(child) == 'string'){
                
                tmp = document.createDocumentFragment();
                els = EZ.html_decode(child);
                i=0;
                while(_child = els[i++]){
                    tmp.appendChild(_child);
                }
                
                el.appendChild(tmp);
                
            }else{
                el.appendChild(child);
            }
            
        },
        
        remove : function(el){
            if(el.parentNode)
                el.parentNode.removeChild(el);
        }
    };
    
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
            
            if(EZ.type(value) == 'undefined'){
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
            
            if(EZ.type(type) !== 'undefined'){
                
                this.each(function(index, el){
                    EZ.removeEvent(el, type, handle);
                });
                
            }else{
                
                this.each(function(index, el){
                    EZ.event.clean(el);
                });
                
            }
            
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
            if(EZ.type(selector) == 'object'){
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
            
            if(EZ.type(value) == 'undefined'){
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
        
        this.remove = function(){
            
            this.each(function(index, el){
                EZ.remove(el);
            });
            
            return this;
        };
        
        this.init(selector, context, results, seed);
        
    };
    
    /*
        要先跑 init 在使用
        EZ._GET.init();  
        EZ._GET['a'];
    */
    EZ._GET = {
        init : function(){
            var s,_get,i,imax,d
            ;
            _get={};
            
            s= document.location.toString();
            
            
            if (s.indexOf('?') == -1) {
                return _get;
            }
            
            s = s.split('?');
            s = s[1].split('&');
            for(i=0,imax=s.length; i<imax; i++){
                d = s[i].split('=');
                _get[d[0]] = d[1];
            }
            
            EZ._GET = _get;
        }
    };
    /*
        以上都是 function  執行程式放此之下
        init ***********************************************
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
    (function(EZ){
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
    }(EZ));
    
     
    (function(EZ){
        var key;
        for(key in EZ.elements){
            if(EZ.elements.hasOwnProperty(key)){
                EZ[key] = EZ.elements[key];
            }
        }
    }(EZ));
    
    (function(s, class2type){
        var row,name;
        
        s = s.split(" ");
        
        while(name = s.shift()){
            class2type[ "[object " + name + "]" ] = name.toLowerCase();
        }
    }("Boolean Number String Function Array Date RegExp Object Error", class2type));
    
    
    
    EZ.json_encode = window.JSON && window.JSON.stringify 
    || function (o) {
    
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
                var _type = typeof k;

                if (_type == "number")
                    name = '"' + k + '"';
                else if (_type == "string")
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
    };
    
    EZ.json_decode = window.JSON && window.JSON.parse
    || function(data){
        if ( data === null ) {
			return data;
		}
        
        if ( typeof data === "string" ) {

			// Make sure leading/trailing whitespace is removed (IE can't handle it)
			data = EZ.trim( data );

			if ( data ) {
				// Make sure the incoming data is actual JSON
				// Logic borrowed from http://json.org/json2.js
                if (EZ.is_json_string(data)){
					return ( new Function( "return " + data ) )();
				}
			}
		}
        EZ.error( "Invalid JSON: " + data );
    };
    
    /*
        Sizzle 選擇器 
    */
    (function(EZ){
        
        if( !document.querySelectorAll ){
            EZ.load('sizzle');
        }
        
    }(EZ));

}(window, document, undefined));

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
/*!
 * Sizzle CSS Selector Engine v2.0.1-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-07-01
 */
(function( window, EZ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowcapture=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

/*
    jQuery 加了三個 function  dont ask ! 照加就對了 
*/
Sizzle.selectors.filters['animated'] = function(elem){
    return EZ.grep([], function( fn ) {
        return elem === fn.elem;
    }).length;
};

Sizzle.selectors.filters['hidden'] = function(elem){
    // Support: Opera <= 12.12
    // Opera reports offsetWidths and offsetHeights less than zero on some elements
    return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 || false;
};

Sizzle.selectors.filters['visible'] = function(elem){
    return !Sizzle.selectors.filters.hidden( elem );
}

//window.Sizzle = Sizzle;

EZ.Sizzle = Sizzle;


})( window , EZ);
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
    
    // this.ua;
    
    // this.browser;
    
    // this.version;
    
    // this.OS;
    
    // this.isIE;
    
    // this.isChrome;
    
    // this.isFirefox;
    
    // this.isOpera;
    
    // this.isSafari;
    
    // this.isMobile;
    
    // this.isTablet;
    
    // this.user_agent;
    
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
                this.window.el.style[key] = options.window_style[key];
            }
        }
        
        for(key in options.mask_style){
            if(options.mask_style.hasOwnProperty(key)){
                this.mask.el.style[key] = options.mask_style[key];
            }
        }
        
        for(key in options.content_style){
            if(options.content_style.hasOwnProperty(key)){
                this.window_content.el.style[key] = options.content_style[key];
            }
        }
        
        for(key in options.close_button_style){
            if(options.close_button_style.hasOwnProperty(key)){
                this.close_button.el.style[key] = options.close_button_style[key];
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
        el : document.createElement('div'),
        show : function(e){
            if(typeof e == 'string' || typeof e == 'number'){
              options.content = e;
              self.window_content.el.innerHTML = options.content;
            }
            document.body.appendChild(self.window.el);
            self.window.el.style['visibility'] = 'visible';
            setTimeout(function(){
                self.window.el.style['top'] = '50%';
                self.window.el.style['opacity'] = '1';
            },0);
            
        },
        hide : function(e){
            self.window.el.style['top'] = '40%';
            self.window.el.style['opacity'] = '0';
            setTimeout(function(){
                if(self.window.el.parentNode == document.body){
                    document.body.removeChild(self.window.el);
                    self.window.el.style['visibility'] = 'hidden';
                }
            },500);
            
        }
    };
    
    this.window.el.style['background-color'] = '#fff';
    this.window.el.style['border'] = '3px solid #fff';
    this.window.el.style['display'] = 'inline-block';
    this.window.el.style['left'] = '50%';
    this.window.el.style['padding'] = '15px';
    this.window.el.style['position'] = 'fixed';
    this.window.el.style['text-align'] = 'justify';
    this.window.el.style['z-index'] = '10';
    this.window.el.style['transform'] = 'translate(-50%, -50%)';
    this.window.el.style['border-radius'] = '10px';
    this.window.el.style['box-shadow'] = '0 1px 1px 2px rgba(0, 0, 0, 0.4) inset';
    this.window.el.style['transition'] = 'opacity .5s, top .5s';
    //this.window.el.style['-webkit-transition'] = 'opacity .5s, top .5s';
    this.window.el.style['min-width'] = '200px';
    this.window.el.style['min-height'] = '200px';
    this.window.el.style['box-shadow'] = 'rgba(0, 0, 0, 0.8) 0px 4px 16px';
    
    this.window.el.style.zIndex='1000';
  
    this.window.el.style['visibility'] = 'hidden';
    this.window.el.style['opacity'] = '0';
    this.window.el.style['top'] = '40%';
  
    this.window_content = {
        el : document.createElement('div')
    };
    
    if(typeof options.content == 'object'){
        this.window_content.el.appendChild(options.content);
    }else if(typeof options.content == 'string'){
        this.window_content.el.innerHTML = options.content || '';
    }
    
    
    this.mask = {
        el : document.createElement('div'),
        show : function(){
            document.body.appendChild(self.mask.el);
            setTimeout(function(){
                self.mask.el.style.opacity='1';
            },0);
            
        },
        hide : function(){
            self.mask.el.style.opacity='0';
            document.body.removeChild(self.mask.el);
            /*
            self.mask.el.style.opacity='0';
            setTimeout(function(){ 
                if(self.mask.el.parentNode == document.body){
                    document.body.removeChild(self.mask.el);
                }
            },1000);
            */
            
        }
    };
    this.mask.el.style.position = 'fixed';
    this.mask.el.style.left='0';
    this.mask.el.style.right='0';
    this.mask.el.style.top='0';
    this.mask.el.style.bottom='0';
    this.mask.el.style.textAlign='center';
    this.mask.el.style.backgroundColor='rgba(0, 0, 0, 0.6)';
    this.mask.el.style.zIndex='999';
    this.mask.el.setAttribute('close_window','1');
    this.mask.el.style.opacity='0';
    this.mask.el.style['transition'] = 'opacity 1s';
    this.mask.el.onclick = this.close;
    
    this.make_close_button = function(style){
        
        var close_button
        ;
        
        close_button = {
            el : document.createElement('a')
        };
        
        switch(style){
            case '1':
                close_button.el.style.display='inline-block';
                close_button.el.style.color='rgba(255, 255, 255, 0.9)';
                close_button.el.style.backgroundColor='rgba(0, 0, 0, 0.8)';
                close_button.el.style['cursor']='pointer';
                close_button.el.style['font-size']='24px';
                close_button.el.style['text-shadow']='0 -1px rgba(0, 0, 0, 0.9)';
                close_button.el.style['height'] = '30px';
                close_button.el.style['line-height'] = '30px';
                close_button.el.style['position'] = 'absolute';
                close_button.el.style['right'] = '-15px';
                close_button.el.style['text-align'] = 'center';
                close_button.el.style['text-decoration'] ='none';
                close_button.el.style['top'] = '-15px'; 
                close_button.el.style['width']='30px';
                close_button.el.style['border-radius']='15px';
              
                close_button.el.innerHTML = 'X'; // ✖ 
                
                close_button.el.onmouseover = function(){this.style['background-color']='rgba(64, 128, 128, 0.8)';}
                close_button.el.onmouseout = function(){this.style['background-color']='rgba(0, 0, 0, 0.8)';}
                break;
                
            default:
                close_button.el.style.display='inline-block';
                close_button.el.style.color='gray';
                //close_button.el.style.backgroundColor='rgba(0, 0, 0, 0.8)';
                close_button.el.style['cursor']='pointer';
                close_button.el.style['font-size']='.8rem';
                close_button.el.style['text-shadow']='0 -1px rgba(0, 0, 0, 0.9)';
                close_button.el.style['position'] = 'absolute';
                close_button.el.style['text-align'] = 'center';
                close_button.el.style['text-decoration'] ='none';
                
                close_button.el.style['right'] = '0';
                close_button.el.style['top'] = '0'; 
                
                close_button.el.style['width'] = '20px';
                close_button.el.style['height'] = '20px';
                close_button.el.style['line-height'] = '20px';
                close_button.el.style['border-radius']='10px';
                
                close_button.el.onmouseover = function(){this.style['background-color']='#DA4937';this.style['color']='#fff';}
                close_button.el.onmouseout = function(){this.style['background-color']=null;this.style['color']='gray';}
                close_button.el.innerHTML = '✖'; //  
                break;
        }
        
        close_button.el.setAttribute('close_window','1');
        close_button.el.onclick = this.close;
        return close_button;
    };
    
    this.close_button = this.make_close_button();
    
    this.window.el.appendChild(this.close_button.el);
    this.window.el.appendChild(this.window_content.el);
   
   
   this.init();
}
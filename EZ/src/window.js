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
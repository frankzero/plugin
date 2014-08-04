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
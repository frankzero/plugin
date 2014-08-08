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
    };
    
    this.close = function(e){
        options.onclose(e);
        self.mask.hide();
        self.window.hide();
    };
    
    this.init = function(){
        var key,v;
        
        for(key in options.window_style){
            if(options.window_style.hasOwnProperty(key)){
                ff(this.window.el).css(key, options.window_style[key]);
            }
        }
        
        for(key in options.mask_style){
            if(options.mask_style.hasOwnProperty(key)){
                ff(this.mask.el).css(key, options.mask_style[key]);
            }
        }
        
        for(key in options.content_style){
            if(options.content_style.hasOwnProperty(key)){
                ff(this.window_content.el).css(key, options.content_style[key]);
            }
        }
        
        for(key in options.close_button_style){
            if(options.close_button_style.hasOwnProperty(key)){
                ff(this.close_button.el).css(key, options.close_button_style[key]);
            }
        }
    };
    
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
    };
    
    this.window = {
        
        el : document.createElement('div'),
        
        show : function(e){
            
            e = e || window.event;
            
            if(typeof e == 'string' || typeof e == 'number'){
                options.content = e;
                self.window_content.el.innerHTML = options.content;
            }
            
            //ff(document.body).append(self.window.el);
            ff(self.window.el).css('display', '');
            
            setTimeout(function(){
                ff(self.window.el).css('top','50%');
                ff(self.window.el).css('opacity','1');
            },100);
            
        },
        
        hide : function(e){
            
            ff(self.window.el).css('top','40%');
            
            ff(self.window.el).css('opacity','0');
            
            setTimeout(function(){
                ff(self.window.el).css('display', 'none');
                /*
                if(self.window.el.parentNode == document.body){
                    ff(document.body).remove(self.window.el);
                }
                */
            },500);
            
        },
        
        init : function(){
            var el
            ;
            
            el = this.el;
            
            ff(el).css('background-color','#fff');
            ff(el).css('border' , '3px solid #fff' );
            ff(el).css('display' , 'none' );
            ff(el).css('left' , '50%' );
            ff(el).css('padding' , '15px' );
            ff(el).css('position' , 'fixed' );
            ff(el).css('text-align' , 'justify' );
            ff(el).css('z-index' , '10' );
            ff(el).css('transform' , 'translate(-50%, -50%)' );
            ff(el).css('border-radius' , '10px' );
            ff(el).css('box-shadow' , '0 1px 1px 2px rgba(0, 0, 0, 0.4) inset' );
            ff(el).css('transition' , 'opacity .5s, top .5s' );
            ff(el).css('-webkit-transition' , 'opacity .5s, top .5s' );
            ff(el).css('min-width' , '200px' );
            ff(el).css('min-height' , '200px' );
            ff(el).css('box-shadow' , 'rgba(0, 0, 0, 0.8) 0px 4px 16px' );
            ff(el).css('z-index', 1000 );
            ff(el).css('opacity' , '0' );
            ff(el).css('top' , '40%' );
            
            ff(document.body).append(el);
        }
    };
    
    this.window.init();
  
    this.window_content = {
        el : document.createElement('div'),
        
        init : function(){
            ff(this.el).append(options.content);
        }
    };
    
    this.window_content.init();
    
    this.mask = {
        el : document.createElement('div'),
        show : function(){
            
            ff(document.body).append(self.mask.el);
            
            setTimeout(function(){
                ff(self.mask.el).css('opacity', 1);
            },0);
            
        },
        
        hide : function(){
            
            ff(self.mask.el).css('opacity', 0);
            
            ff(document.body).remove(self.mask.el);
            
        },
        
        init : function(){
            var el = this.el;
            
            ff(el).css('position','fixed');
            ff(el).css('left', '0');
            ff(el).css('right', '0');
            ff(el).css('top', '0');
            ff(el).css('bottom', '0');
            ff(el).css('textAlign', 'center');
            ff(el).css('backgroundColor', 'rgba(0, 0, 0, 0.6)');
            ff(el).css('zIndex', 999);
            ff(el).css('opacity', 0);
            ff(el).css('transition','opacity 1s');
            ff(el).attr('close_window','1');
            
            ff(el).on('click' ,self.close);
        }
    };
    this.mask.init();
    
    this.make_close_button = function(style){
        
        var close_button
        ;
        
        close_button = {
            el : document.createElement('a')
        };
        
        var el = close_button.el;
        
        switch(style){
            case '1':
                ff(el).css('display' , '');
                ff(el).css('color' , 'rgba(255, 255, 255, 0.9)');
                ff(el).css('backgroundColor' , 'rgba(0, 0, 0, 0.8)');
                ff(el).css('cursor' , 'pointer');
                ff(el).css('font-size' , '24px');
                ff(el).css('text-shadow' , '0 -1px rgba(0, 0, 0, 0.9)');
                ff(el).css('height' , '30px');
                ff(el).css('line-height' , '30px');
                ff(el).css('position' , 'absolute');
                ff(el).css('right' , '-15px');
                ff(el).css('text-align' , 'center');
                ff(el).css('text-decoration' , 'none');
                ff(el).css('top' , '-15px'); 
                ff(el).css('width' , '30px');
                ff(el).css('border-radius' , '15px');
              
                ff(el).on('mouseover',function(){
                    ff(this).css('background-color', 'rgba(64, 128, 128, 0.8)');
                });
                
                ff(el).on('mouseout',function(){
                    ff(this).css('background-color' , 'rgba(0, 0, 0, 0.8)' );
                });
                
                ff(el).html(EZ.icon.close);
                
                break;
                
            default:
                ff(el).css('display' , '');
                ff(el).css('color' , 'gray');
                ff(el).css('cursor' , 'pointer');
                ff(el).css('font-size' , '.8rem');
                ff(el).css('text-shadow' , '0 -1px rgba(0, 0, 0, 0.9)');
                ff(el).css('position' , 'absolute');
                ff(el).css('text-align' , 'center');
                ff(el).css('text-decoration' , 'none');
                
                ff(el).css('right' , '0');
                ff(el).css('top' , '0'); 
                
                ff(el).css('width' , '20px');
                ff(el).css('height' , '20px');
                ff(el).css('line-height' , '20px');
                ff(el).css('border-radius' , '10px');
                
                ff(el).on('mouseover',function(){
                
                    ff(this).css('background-color', '#DA4937');
                    ff(this).css('color', '#fff');
                    
                });
                
                ff(el).on('mouseout',function(){
                    ff(this).removeCss('background-color');
                    ff(this).css('color','gray');
                });
                
                ff(el).html(EZ.icon.close);
                break;
        }
        
        ff(el).attr('close_window','1');
        ff(el).on('click',self.close);
        return close_button;
    };
    
    this.close_button = this.make_close_button();
    
    ff(this.window.el).append(this.close_button.el);
    ff(this.window.el).append(this.window_content.el);
   
   this.init();
}
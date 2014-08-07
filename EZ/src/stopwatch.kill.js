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

EZ.watch = {
    
    init : function(){
        if(!this.watch){
            this.watch = new EZ.stopwatch();
            this.play = this._play;
        }
    },
    
    play : function(){
        this.init();
        return this.play();
    },
    
    _play : function(){
        return this.play();
    },
    
    pause : function(){
        return this.pause();
    },
    
    stop : function(){
        return this.stop();
    }
    
};
(function($){
    $.fn.SimulationGif = function(options){
        var defaults = $.extend({
            src:[],
            delay: 0
        }, options);
        var $this = $(this), start = false, curIndex = 0, timer = null;
        var methods = {
            simulation: function(){
                clearInterval(timer);
                function run(){
                    start = true;
                    if(defaults.src && defaults.src instanceof Array) {
                        if(curIndex == defaults.src.length - 1) {
                            curIndex = 0;
                        }else {
                            curIndex++;
                        }
                        $this.find('img').attr('src', defaults.src[curIndex]);
                    }
                }
                timer = setInterval(run, defaults.delay);
            }
        };
        methods.simulation();
    }
})(jQuery);
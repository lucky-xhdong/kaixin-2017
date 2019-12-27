/**
 * Created by xhdong on 15/11/29.
 */
(function(){
    $.fn.lavaLamp = function(options){
        var defaults = $.extend({
            fx: 'linear',
            speed: 200,
            click: function(){},
            conclsname: '',
            index: 0
        }, options || {})
        return $(this).each(function(){
            var _this = $(this);
            $bgImage = $('<li class="bg-nav"><div class="left"></div></li>').appendTo(_this),
            $li = $("li", this),
            cur = $("li.current", this)[0] || $($li[0]).addClass("current")[0];
            noop = function(){ };
            $li.not(".bg-nav").hover(function(){
                move(this);
            }, noop)
            $li.hover(noop, function(){
                move(cur);
            })
            $li.click(function(e){
                defaults.index = $(this).index();
                if(isNaN(defaults.index) || defaults.index == '') {
                    defaults.index = 0;
                }
                $(defaults.conclsname + ' > div').eq(defaults.index).show();
                $(this).addClass("current").siblings().removeClass("current");
                $(defaults.conclsname + ' > div').eq(defaults.index).show().siblings().hide();
                setCurrent(this);
                return defaults.click.apply(this, [e, this]);
            })
            setCurrent(cur);
            function setCurrent(obj){
                $bgImage.css({
                    width: obj.offsetWidth + 10 + 'px',
                    left: obj.offsetLeft - 3 + 'px'
                })
                cur = obj;
            }

            function move(obj){
                $bgImage.each(function(){
                    $.dequeue(this, "fx")
                }).animate({
                    width: obj.offsetWidth + 10,
                    left: obj.offsetLeft - 3
                //}, defaults.speed, defaults.fx)
                }, defaults.speed)
            }
        })
    }
})(jQuery)

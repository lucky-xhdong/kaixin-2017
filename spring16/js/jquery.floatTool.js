/**
 * Created by xiaohong2 on 2015/12/8.
 */
(function($){
    $.fn.floatTool = function(){
        var _this = $(this);
        var _move = false;
        var ismove = false;
        var _x, _y;
        var top = ($(window).height() - _this.height())/6;
        _this.css({
            top: top
        });
        var drag = _this.find('move');
        $(window).on('scroll', function(){
            var offsetTop = parseInt(top + $(window).scrollTop())  + 'px';
            _this.animate({ top: offsetTop },{
                duration: 600,
                queue: false
            });
        })
        drag.on('mousedown', function (e) {
            _move = true;
            _x = e.pageX - parseInt($(this).css("left"));
            _y = e.pageY - parseInt($(this).css("top"));
        })
        $(document).on('mousemove', function(e){
            if (_move) {
                var x = e.pageX - _x;
                var y = e.pageY - _y;
                var wx = $(window).width() - _this.width();
                var dy = $(document).height() - _this.height();
                if(x >= 0 && x <= wx && y > 0 && y <= dy) {
                    _this.css({
                        top: y,
                        left: x
                    });
                    ismove = true;
                }
            }
        }).on('mouseup', function(){
            _move = false;
        })
    }
})(jQuery)

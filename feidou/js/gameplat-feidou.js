;(function ($) {
    var gpFeidou = function (o, options) {
        this.o = o;
        this.options = $.extend({}, gpFeidou.options, options);
        this.carousel = $(".carousel-wrapper");
        this.thumb = $(".carousel-thumb li");
        this.large = $(".carousel-large li");
        this.length = this.thumb.length;
        this.index = 0;
        this.timeout = null;
        this.init();
    };
    gpFeidou.prototype = {
        init: function () {
            this.Carousel();
        },
        Carousel: function () {
            this.cAutoPlay();//自动播放
            this.cHandleHover();//鼠标悬停事件
            this.cBackgroundForIE();
        },
        cPlay: function (index) {
            this.thumb.eq(index).addClass('active').siblings().removeClass('active');
            this.large.eq(index).stop().animate({opacity: 1}, 1000).siblings().stop().animate({opacity: 0}, 1000);
        },
        cAutoPlay: function () {
            var _this = this;
            if(this.timeout) clearInterval(this.timeout);
            this.timeout = setInterval(function () {
                _this.cPlay(_this.index);
                _this.index++;
                if (_this.index == _this.length) _this.index = 0;
            }, 3000);
        },
        cHandleHover: function () {
            var _this = this;
            //鼠标悬停在轮播图，动画停止自动播放
            this.carousel.hover(function () {
                if(_this.timeout) clearInterval(_this.timeout);
            }, function () {
                _this.cAutoPlay();
            });
            //鼠标悬停在缩略图，动画自动播放停止，显示缩略图对应的大图
            this.thumb.hover(function () {
                if(_this.timeout) clearInterval(_this.timeout);
                _this.index = _this.thumb.index(this);
                _this.cPlay(_this.index);
            }, function () {
                _this.cAutoPlay();
            })
        },
        cBackgroundForIE: function () {
            var userAgent = navigator.userAgent;
            var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE浏览器
            var isEdge = userAgent.toLowerCase().indexOf("edge") > -1 && !isIE; //判断是否IE的Edge浏览器
            var isIE11 = (userAgent.toLowerCase().indexOf("trident") > -1 && userAgent.indexOf("rv") > -1); //判断是否IE11
            if(isIE || isEdge || isIE11) {
                $(this.thumb).parent().parent().css({
                    "background":"url('images/half-circle.png') top right no-repeat"
                })
            }
        }
    };
    $.fn.gpFeidou = function (options) {
        options = $.extend({}, $.fn.gpFeidou.options, options);
        this.each(function () {
            new gpFeidou($(this), options);
        })
    };
    gpFeidou.options = {

    };
})(jQuery);
$(document).ready(function () {
    $(".feidou-container").gpFeidou();
});
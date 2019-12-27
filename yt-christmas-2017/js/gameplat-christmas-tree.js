/**
 * Created by dongxiaohong on 2016/12/16.
 */
;(function () {
    $.fn.ChristmasTree = function (options) {
        var args = $.extend({
            btndecorate: '.btn-decorate',
            btnclaim: '.btn-claim'
        }, options);
        var $this = $(this), timer = null;
        var methods = {
            elements: function () {
                for (var i = 0; i < 8; i++) {
                    var star = '<a href="javascript:;" class="decorate  star star-0' + (i + 1) + '"></a>';
                    if ($(".star-0" + (i + 1)).length == 0) $this.append(star);
                }
                for (var i = 0; i < 5; i++) {
                    var balloon = '<a href="javascript:;" class="decorate balloon balloon-0' + (i + 1) + '"></a>';
                    if ($(".balloon-0" + (i + 1)).length == 0) $this.append(balloon);
                }
                for (var i = 0; i < 5; i++) {
                    var dwarf = '<a href="javascript:;" class="decorate dwarf dwarf-0' + (i + 1) + '"></a>';
                    if ($(".dwarf-0" + (i + 1)).length == 0) $this.append(dwarf);
                }
                for (var i = 0; i < 4; i++) {
                    var gift01 = '<a href="javascript:;" class="decorate gift gift-1' + (i + 1) + '"></a>';
                    if ($(".gift-1" + (i + 1)).length == 0) $this.append(gift01);
                }
                for (var i = 0; i < 3; i++) {
                    var gift02 = '<a href="javascript:;" class="decorate gift gift-2' + (i + 1) + '"></a>';
                    if ($(".gift-2" + (i + 1)).length == 0) $this.append(gift02);
                }
            },
            show: function () {
                //装饰品
                methods.elements();
                $(".star").animate({opacity: 1}).fadeOut(400).fadeIn(400);
                $(".balloon").animate({opacity: 1}).fadeOut(600).fadeIn(600);
                $(".dwarf").animate({opacity: 1}).fadeOut(800).fadeIn(800);
                var sUserAgent = navigator.userAgent.toLowerCase();
                if ((sUserAgent.match(/(phone|pad|pod|iphone|ipod|ios|ipad|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|webos|symbian|windows phone|playbook)/i))) {
                    $(".gift").eq(0).animate({opacity: 1, top: "4.8rem", width: "1.6rem", height: "2.2rem"}, 500)
                        .animate({width: "1.12rem", height: "1.536rem"}, 400);
                    $(".gift").eq(1).animate({opacity: 1, top: "13.88rem", width: "1.6rem", height: "2.2rem"}, 600)
                        .animate({width: "1.12rem", height: "1.536rem"}, 500);
                    $(".gift").eq(2).animate({opacity: 1, top: "13.88rem", width: "1.6rem", height: "2.2rem"}, 700)
                        .animate({width: "1.12rem", height: "1.536rem"}, 600);
                    $(".gift").eq(3).animate({opacity: 1, top: "13.88rem", width: "1.6rem", height: "2.2rem"}, 800)
                        .animate({width: "1.12rem", height: "1.536rem"}, 700);
                    $(".gift").eq(4).animate({opacity: 1, top: "5.4rem", width: "1.152rem", height: "1.44rem"}, 900)
                        .animate({width: ".896rem", height: "1.248rem"}, 800);
                    $(".gift").eq(5).animate({opacity: 1, top: "13.88rem", width: "1.12rem", height: "1.58rem"}, 1000)
                        .animate({width: ".896rem", height: "1.248rem"}, 900);
                    $(".gift").eq(6).animate({opacity: 1, top: "13.7rem", width: "1.12rem", height: "1.58rem"}, 1100)
                        .animate({width: ".896rem", height: "1.248rem"}, 1000);
                } else {
                    $(".gift").eq(0).animate({opacity: 1, top: "124px", width: "50px", height: "68px"}, 500)
                        .animate({width: "35px", height: "48px"}, 400);
                    $(".gift").eq(1).animate({opacity: 1, top: "358px", width: "50px", height: "68px"}, 600)
                        .animate({width: "35px", height: "48px"}, 500);
                    $(".gift").eq(2).animate({opacity: 1, top: "358px", width: "50px", height: "68px"}, 700)
                        .animate({width: "35px", height: "48px"}, 600);
                    $(".gift").eq(3).animate({opacity: 1, top: "358px", width: "50px", height: "68px"}, 800)
                        .animate({width: "35px", height: "48px"}, 700);
                    $(".gift").eq(4).animate({opacity: 1, top: "144px", width: "36px", height: "50px"}, 900)
                        .animate({width: "28px", height: "39px"}, 800);
                    $(".gift").eq(5).animate({opacity: 1, top: "360px", width: "36px", height: "50px"}, 1000)
                        .animate({width: "28px", height: "39px"}, 900);
                    $(".gift").eq(6).animate({opacity: 1, top: "352px", width: "36px", height: "50px"}, 1100)
                        .animate({width: "28px", height: "39px"}, 1000);
                }
                clearTimeout(timer);
                timer = setTimeout(function(){
                    $(args.btnclaim).removeClass('btn-gray').addClass('btn-light');
                }, 1500);
            }
        }
        $(args.btndecorate).on('click', function () {
            methods.show();
        })
    }
})(jQuery)
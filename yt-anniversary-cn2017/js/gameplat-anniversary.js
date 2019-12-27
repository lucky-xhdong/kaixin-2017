/**
 * Created by dongxiaohong on 2016/12/16.
 */

//show mask and popover
function showpopover(){
    var arr = [];
    for( var i = 0; i < arguments.length; i++){
        arr.push(arguments[i]);
        arr[i].css({
            "display": "block"
        })
    }
    return arr;
}
//hide mask and popover
function hidepopover() {
    var arr = [];
    for( var i = 0; i < arguments.length; i++){
        arr.push(arguments[i]);
        arr[i].css({
            "display": "none"
        }).removeAttr('style');
    }
    return arr;
}


var popover = function(){
    var $mask, $close,$icongift, $btnstartsource, $btnstartlucky, $sourcelottery, $luckylottery, $popgiftbox, $btntop;
    var bindEvent = function(){

        //礼品箱
        $icongift.on('click', function(){
            showpopover($mask, $popgiftbox);
        });

        //返回顶部
        $btntop.on('click', function(){
            $("body, html").animate({
                scrollTop: 0
            }, 600)
        });


        var mysourceprize = 2,//资源奖
            myluckyprize = 2,//幸运奖
            sUserAgent = navigator.userAgent.toLowerCase();
        if ((sUserAgent.match(/(phone|pad|pod|iphone|ipod|ios|ipad|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|webos|symbian|windows phone|playbook)/i))) {
            $(window).scroll(function () {
                var top = $('html').css('fontSize').split('px')[0] * 11;
                $(window).scrollTop() > top ?
                    $btntop.fadeIn(300).css({display: "block"}) :
                    $btntop.fadeOut(300).css({display: "none"})
                $(window).scrollTop() > top ?
                    $nav.css({"position": "fixed", "top": 0}) :
                    $nav.css({"position": "absolute", "top": "11rem"});
            });
        }

        //资源转盘点击事件 start
        $btnstartsource.click(function(){
            $sourcelottery.lottery({
                myprize: mysourceprize
            });
        });

        //幸运转盘点击事件 start
        $btnstartlucky.click(function(){
            $luckylottery.lottery({
                myprize: myluckyprize
            });
        });

        //click close button hide popover and popovers
        $close.on('click', function(){
            hidepopover($mask, $popgiftbox);
        })

    };
    return {
        init: function(){
            $mask = $(".mask");
            $close = $(".close");//关闭按钮
            $icongift = $(".icon-gift");//礼品箱按钮
            $btnstartsource = $(".btn-start-source");//资源转盘开始按钮
            $btnstartlucky = $(".btn-start-lucky");//资源转盘开始按钮
            $popgiftbox = $(".pop-giftbox");//礼品箱弹窗

            $sourcelottery = $(".source-lottery");//资源转盘
            $luckylottery = $(".lucky-lottery");//幸运转盘
            $btntop = $(".btn-top");
            bindEvent();
        }
    }
}()


$(document).ready(function(){
    popover.init();
    $('.smoove').smoove({offset:'40%'});
})
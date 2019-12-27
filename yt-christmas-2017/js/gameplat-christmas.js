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
    var $giftlists, $mask, $icongift, $btnstart, $lottery, $close, $pop, $happynewyear, $congratulations, $anchor, $nav, $btntop, $flag = true, $timer;
    var bindEvent = function(){

        //点击摇动gift按钮显示礼品码列表弹窗
        $icongift.on('click', function(){
            showpopover($mask, $pop, $giftlists);
        })

        //漂浮导航锚点平滑跳转
        $anchor.on('click', function(){
            var href = $(this).attr('href');
            var pos = $(href).offset().top;
            $(this).parents('li').addClass("active").siblings().removeClass("active");
            $("body, html").animate({
                scrollTop: pos
            }, 800)
        })

        //返回顶部
        $btntop.on('click', function(){
            $("body, html").animate({
                scrollTop: 0
            }, 600)
        })

        //当页面滚动的高度超过漂浮导航的固定，将漂浮导航固定在顶部，此处用在移动端
        var sUserAgent = navigator.userAgent.toLowerCase();
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

        /*
        *抽奖转盘
        *转盘按逆时针顺序转动，转到到的元素上会添加一个高亮效果
        * myprize为中了哪个奖品的索引值，从0开始
        * */
        $btnstart.click(function(){
            var myprize = 3;
            $lottery.lottery({
                myprize: myprize
            });
            if($flag){
                clearTimeout($timer);
                $timer = setTimeout(function(){
                    if(myprize == 3){
                        showpopover($mask, $pop, $happynewyear);
                    }else{
                        showpopover($mask, $pop, $congratulations);
                    }
                }, 4000)
            }
        })

        //click close button hide popover and popovers
        $close.on('click', function(){
            hidepopover($mask, $pop, $giftlists, $happynewyear, $congratulations);
        })

    }
    return {
        init: function(){
            $mask = $(".christmas-mask");//透明遮罩层
            $icongift = $(".icon-gift");//摇动gift图标
            $btnstart = $(".btn-start");//抽奖开始按钮
            $pop = $(".pop-christmas");//弹出框盒子
            $giftlists = $(".gift-lists");//礼品码列表弹框
            $happynewyear = $(".happy-new-year");//happy new year弹出框
            $congratulations = $(".congratulations");//中奖了给出礼品码的弹出框
            $lottery = $(".lottery");//奖品列表盒子
            $btntop = $(".btn-top");//返回顶部按钮
            $nav = $("nav");//漂浮导航
            $anchor = $(".anchor");//锚点列表
            $close = $(".btn-pop-close");//弹出框关闭按钮
            bindEvent();
        }
    }
}()


$(document).ready(function(){
    popover.init();
    $(".christmas-tree").ChristmasTree();
})
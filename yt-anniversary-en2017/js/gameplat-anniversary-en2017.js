
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
    var $mask, $giftbox, $close, $popgiftcode, $popblessing, $popgiftlists, $anchor, $floatnav, $gototop;
    var bindEvent = function(){

        //点击gift box显示礼品码列表弹窗
        $giftbox.on('click', function(){
            showpopover($mask, $popgiftlists);
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
        $gototop.on('click', function(){
            $("body, html").animate({
                scrollTop: 0
            }, 600)
            $anchor.parents('li').removeClass("active")
        })

        //当页面滚动的高度超过漂浮导航的固定，将漂浮导航固定在顶部，此处用在移动端
        var sUserAgent = navigator.userAgent.toLowerCase();
        if ((sUserAgent.match(/(phone|pad|pod|iphone|ipod|ios|ipad|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|webos|symbian|windows phone|playbook)/i))) {
            $(window).scroll(function () {
                var top = $('html').css('fontSize').split('px')[0] * 12;
                $(window).scrollTop() > top ?
                    $gototop.fadeIn(300).css({display: "block"}) :
                    $gototop.fadeOut(300).css({display: "none"});
                if($(window).scrollTop() > top) {
                    $floatnav.css({"position": "fixed", "top": 0});
                    $(".reel-wrapper, #blessingbags").css({"padding-top": "3rem"});
                    $("#winner").css({"padding-top": "1rem"});
                }else {
                    $floatnav.css({"position": "absolute", "top": "12rem"});
                    $(".reel-wrapper,#blessingbags").css({"padding-top": "0"});
                    $("#winner").css({"padding-top": "0"});
                }
            });
        }


        //click close button hide popover and popovers
        $close.on('click', function(){
            hidepopover($mask, $popgiftlists, $popgiftcode, $popblessing);
        })

    }
    return {
        init: function(){
            $mask = $(".mask");//透明遮罩层
            $giftbox = $(".giftbox");//gift box链接
            $popgiftlists = $(".pop-giftcode-lists");//礼品码列表弹框
            $popgiftcode = $(".pop-giftcode");//礼品码弹出框
            $popblessing = $(".pop-blessing");//祝福语弹出框
            $gototop = $(".gototop");//返回顶部按钮
            $floatnav = $(".float-nav");//漂浮导航
            $anchor = $(".anchor");//锚点列表
            $close = $(".close");//弹出框关闭按钮
            bindEvent();
        }
    }
}()
$(document).ready(function(){
    popover.init();
    $(".blessing-words").marquee();
    $(".participants-lists").marquee();
    $(".smoove").smoove({ offset: '40%' });
})
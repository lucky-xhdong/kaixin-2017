/**
 * Created by xhdong on 15/11/15.
 */

var myprize = 6;

//显示遮罩层和弹出框
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
//隐藏遮罩层和弹出框
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
    var $popgiftcode, //获得礼品码
        $popgiftbox, //礼品箱
        $popright, //回答正确
        $popwrong, //回答错误
        $popphysical, //获得实物奖填写信息
        $popsuccess, //信息提交成功
        $mask, //遮罩
        $btngiftbox, //查看礼品箱按钮
        $btnlottery, //开始抽奖按钮
        $btnmodifyaddress, //修改/补填地址
        $btngotolottery, //立即抽奖
        $btnconfirm, //确定按钮
        $lottery, // 抽奖转盘
        $close, //关闭按钮
        $flag = true, $click = false, $timer;
    var bindEvent = function(){

        //查看礼品箱
        $btngiftbox.on('click', function(){
            showpopover($mask, $popgiftbox);
            hidepopover( $popphysical);
        })

        //修改/补填地址
        $btnmodifyaddress.on('click', function(){
            showpopover($mask, $popphysical);
            hidepopover( $popgiftcode, $popgiftbox);
        })

        //立即抽奖
        $btngotolottery.on('click', function(){
            hidepopover($mask, $popright);
            var top = $lottery.offset().top;
            $("html, body").animate({
                scrollTop: top
            }, 500);
        })

        //确定按钮
        $btnconfirm.on('click', function(){
            hidepopover($mask, $popwrong);
        })

        //抽奖开始
        $btnlottery.click(function(){
            if($click) {
                return false;
            }else {
                $lottery.lottery({
                    myprize: 6
                });
                if($flag){
                    clearTimeout($timer);
                    $timer = setTimeout(function(){
                        if(myprize == 6){
                            showpopover($mask, $popphysical);
                        }
                    }, 4000)
                }
            }
        })

        //关闭弹出框
        $close.on('click', function(){
            hidepopover($mask, $popgiftcode, $popgiftbox, $popright, $popwrong, $popphysical, $popsuccess);
        })

    }
    return {
        init: function(){
            $mask = $(".spring16-mask");
            $popright = $(".spring16-right-popover");
            $popwrong = $(".spring16-wrong-popover");
            $popgiftcode = $(".spring16-giftcode-popover");
            $popphysical = $(".spring16-physical-poppver");
            $popsuccess = $(".spring16-info-success");
            $popgiftbox = $(".spring16-box-poppver");
            $btngiftbox = $(".btn-giftbox");
            $btnmodifyaddress = $(".btn-modify-address");
            $btngotolottery = $(".btn-goto-lottery");
            $btnconfirm = $(".btn-confirm");
            $btnlottery = $(".btn-lottery");
            $lottery = $(".spring16-lottery");
            $close = $(".spring16-close");
            bindEvent();
        }
    }
}()

$(document).ready(function(){
    popover.init();
    $(".spring-qrcode").floatTool();
    $(window).resize(function(){
        $(".spring-qrcode").floatTool();
    })
})

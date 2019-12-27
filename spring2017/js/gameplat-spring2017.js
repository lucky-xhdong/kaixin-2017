/**
 * Created by dongxiaohong on 2016/12/16.
 */

//show mask and popover
function showpopover() {
    var arr = [];
    for (var i = 0; i < arguments.length; i++) {
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
    for (var i = 0; i < arguments.length; i++) {
        arr.push(arguments[i]);
        arr[i].css({
            "display": "none"
        }).removeAttr('style');
    }
    return arr;
}


var popover = function () {
    var $mask, //遮罩
        $btnstart, //抽奖开始按钮
        $btngiftbox,  //礼品箱链接
        $btnbeast,//年兽链接
        $btnlottery,//抽奖链接
        $arrow, //用户信息提示框三角

        $poplottery,//抽奖转盘弹框
        $popbeast, //年兽弹框
        $popgoods, //实物奖弹框
        $popgiftbox, //礼品箱弹框
        $popsubmitsuccess,//信息提交成功弹框
        $popgiftcode1,//礼品码有按钮弹框
        $popgiftcode2,//礼品码无按钮弹框
        $popquestions,//小问题弹框
        $popright,//答对弹框
        $popwrong,//答错弹框
        $popattack,//攻击年兽弹框
        $popattackfail,//攻击失败弹框

        $close,//关闭按钮
        $lottery, //抽奖转盘
        $userinfo, //用户信息提示框
        $wishtrees, //许愿树
        $flag = true, $timer;
    var bindEvent = function () {

        //点击礼品箱 显示礼品码弹框
        $btngiftbox.on('click', function () {
            showpopover($mask, $popgiftbox);
        })

        //点击年兽 显示年兽弹框
        $btnbeast.on('click', function () {
            showpopover($mask, $popbeast);
        })

        //点击抽奖 显示抽奖转盘
        $btnlottery.on('click', function () {
            showpopover($mask, $poplottery);
        })

        //点击许愿树显示用户信息
        $wishtrees.on('click', function () {
            var width = $(this).width();
            var win_width = $(window).width();
            var height = $(this).height();
            var li_left = $(this).position().left;
            var left, $this = $(this);
            $userinfo.hide();

            var sUserAgent = navigator.userAgent.toLowerCase();
            if ((sUserAgent.match(/(phone|pad|pod|iphone|ipod|ios|ipad|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|webos|symbian|windows phone|playbook)/i))) {

                if ((li_left + $userinfo.width()) > win_width) {
                    left = -($userinfo.width());
                    $arrow.css({"background-position": "-4.944rem -.544rem", "left": "6.93rem"});
                } else {
                    left = width + 10;
                    $arrow.css({"background-position": "-4.944rem 0", "left": "-.25rem"});
                }
                $this.find($userinfo).css({
                    left: left + 'px',
                    top: (height / 2) + 'px'
                }).show();

            }else {
                if ((li_left + $userinfo.width()) > 1000) {
                    left = -($userinfo.width());
                    $arrow.css({"background-position": "-309px -34px", "left": "435px"});
                } else {
                    left = width + 10;
                    $arrow.css({"background-position": "-309px 0", "left": "-16px"});
                }
                $this.find($userinfo).css({
                    left: left + 'px',
                    top: (height / 2) + 'px'
                }).show();
            }
            $this.find('.close').on('click', function (e) {
                e.stopPropagation();
                $(this).parent('.userinfo').hide();
            })
        })

        /*
         *抽奖转盘
         *转盘按逆时针顺序转动，转到到的元素上会添加一个高亮效果
         * myprize为中了哪个奖品的索引值，从0开始
         * */
        $btnstart.click(function () {
            var myprize = 3;
            $lottery.lottery({
                myprize: myprize
            });
            if ($flag) {
                clearTimeout($timer);
                $timer = setTimeout(function () {
                    if (myprize == 3) {
                        hidepopover($mask, $popgiftcode1);
                        showpopover($mask, $popgoods);
                    } else {
                        hidepopover($mask, $poplottery);
                        showpopover($mask, $popgoods);
                    }
                }, 4000)
            }
        })

        //click close button hide popover and popovers
        $close.on('click', function () {
            hidepopover($mask, $popbeast, $poplottery, $popgoods, $popgiftbox);
        })

    }
    return {
        init: function () {

            $mask = $(".mask");//透明遮罩层
            $btnstart = $(".btn-start");//抽奖开始按钮
            $btnbeast = $(".btn-beast");//年兽链接
            $btngiftbox = $(".btn-gift-box");//礼品箱链接/按钮
            $btnlottery = $(".btn-lottery");//抽奖开始按钮
            $arrow = $(".arrow");//用户信息提示框三角

            $popbeast = $(".pop-beast");//年兽弹框
            $poplottery = $(".pop-lottery");//抽奖弹框
            $popgoods = $(".pop-goods");//实物奖弹框
            $popgiftbox = $(".pop-gift-box");//礼品箱弹框
            $popsubmitsuccess = $(".pop-submit-success");//信息提交成功弹框
            $popgiftcode1 = $(".pop-gift-code1");//礼品码有按钮弹框
            $popgiftcode2 = $(".pop-gift-code2");//礼品码无按钮弹框
            $popquestions = $(".pop-questions");//小问题弹框
            $popright = $(".pop-right");//答对弹框
            $popwrong = $(".pop-wrong");//答错弹框
            $popattack = $(".pop-attack");//攻击年兽弹框
            $popattackfail = $(".pop-attack-fail");//攻击失败弹框

            $lottery = $(".lottery");//抽奖转盘
            $userinfo = $(".userinfo");//用户信息提示框
            $wishtrees = $(".wish-trees li");//许愿树
            $close = $(".close");//弹出框关闭按钮
            bindEvent();
        }
    }
}();

$(document).ready(function () {
    popover.init();

    $(".beast-lists li a").click(function () {
        if($(this).hasClass('attack-normal')) {
            var num = $(".beast-lists li a").index($(this));
            $(this).removeClass('attack-normal').addClass('attack-gray')
            console.log(num)
        }else {
            console.log(22)
            return false;
        }
    })
});
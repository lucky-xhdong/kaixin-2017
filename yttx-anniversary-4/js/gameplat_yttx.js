/**
 * Created by xhdong on 16/5/14.
 */
/**
 * Created by xhdong on 15/11/15.
 */

var myprize = 6;

//显示遮罩层和弹出框
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
//隐藏遮罩层和弹出框
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
    var $code, $mask,
        $btngiftcode, $btnstart, $rewarded, $lottery, $btnlottery, $failed, $close, $successed,$btnsign,$btnviewbox,$giftbox,
        $flag = false, $timer;
    var bindEvent = function () {

        //我的礼品码
        $btngiftcode.on('click', function () {
            showpopover($mask, $codelists);
        })

        //抽奖开始
        $btnstart.click(function () {
            $lottery.lottery({
                myprize: myprize
            });
            if ($flag) {
                return false;
            }
            else {
                clearTimeout($timer);
                $timer = setTimeout(function () {
                    if (myprize == 2) {
                        showpopover($mask, $code);
                    } else if (myprize == 6) {
                        showpopover($mask, $failed);
                    }
                }, 4000)
                $flag = true;
                return false;
            }
        })
        //补签
        $btnsign.on('click', function () {
            showpopover($mask, $failed);
        })

        $btnlottery.on('click', function () {
            var href = $(this).attr('href');
            var pos = $(href).offset().top;
            $("body, html").animate({
                scrollTop: pos
            }, 800)
        })

        //礼品箱
        $btnviewbox.on('click', function () {
            showpopover($mask, $giftbox);
            hidepopover($rewarded);
        })

        //关闭弹出框
        $close.on('click', function () {
            hidepopover($mask, $code, $failed, $successed,$giftbox, $rewarded, $lottery);
        })

    }
    return {
        init: function () {
            $mask = $(".anniversary-mask");
            $code = $(".anniversary-popover-code");//礼品码
            $rewarded = $(".anniversary-popover-rewarded");//获得奖励
            $failed = $(".anniversary-popover-failed");//身份识别失败
            $successed = $(".anniversary-popover-successed");//信息提交成功
            $giftbox = $(".anniversary-popover-giftbox");//信息提交成功
            $btngiftcode = $(".mygiftcode");
            $btnlottery = $(".btn-lottery");//抽奖按钮
            $btnsign = $(".btn-sign");//补签按钮
            $btnstart = $(".btn-start");
            $btnviewbox = $(".btn-view-box");//查看礼品箱
            $lottery = $(".anniversary-lottery");//抽奖
            $close = $(".anniversary-popover-close");
            bindEvent();
        }
    }
}()


$(document).ready(function () {
    popover.init();
})


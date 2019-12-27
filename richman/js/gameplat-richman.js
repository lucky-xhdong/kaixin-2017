/**
 1、转盘可以循环转
 ---1)、骰子的总和大于所有格子的长度
 ---2)、骰子刚好走到开始位置
 2、前进6步
 ---在指定位置停顿1秒，向前走6步到格子10，下一次从格子10作为起点
 3、前进到10
 ---在指定位置停顿1秒，向前走4步到格子10，下一次从格子10作为起点
 4、选择步数
 ---1)、打开选择步数弹窗，执行选择步数任务
 ---2)、如果打开了弹窗但未做选择，下一次从‘选择步数’作为起点
 ---3)、如果选择了步数，从‘选择步数’作为起点，到选择步数的位置+选择的步数作为终点停止
 5、后退到6
 ---1)、从‘后退到6’作为起点，向后倒退6步，到格子6也就是‘前进到10’
 ---2)、因为‘前进到10’是后退的终点位置，所以在此处停顿1秒，再向前走4步到格子10
 ---3)、下一次摇骰子从格子10作为起点
 6、后退2步
 ---后退2步到‘后退到6’为终点，在此处停顿1衍，执行‘后退到6’
 7、答题惩罚
 ---显示答题弹窗，执行答题任务，下一次从‘答题惩罚’也就是格子17作为起点
 8、随机奖励
 ---显示奖励弹窗，领取获得的奖励，下一次从‘随机奖励’也就是格子19作为起点
 **/
var RichmanOpitons = {
    index: 12,
    //number: Math.floor(Math.random() * 6 + 1)
    number: 0
};
(function ($) {
    var Richman = function (o, options) {
        this.o = o;
        this.options = $.extend({}, Richman.options, options);
        this.dice = this.options.dice;
        this.btnRoll = this.options.btnRoll;
        this.mask = this.options.mask;                          //遮罩
        this.popsteps = this.options.popsteps;                  //选择步数弹窗
        this.popquestions = this.options.popquestions;          //答题惩罚弹窗
        this.popprize = this.options.popprize;                  //随机奖励弹窗
        this.forwardIndex = this.options.forwardIndex;          //前进几步索引值
        this.forwardNum = this.options.forwardNum;              //前进几步
        this.forwardToIndex = this.options.forwardToIndex;      //前进到几步索引值
        this.forwardTargetIndex = this.options.forwardTargetIndex;//前进到目标位置的索引值
        this.forwardToNum = this.options.forwardToNum;          //前进到几步
        this.stepIndex = this.options.stepIndex;                //选择步数
        this.backToIndex = this.options.backToIndex;            //后退到几步索引值
        this.backToNum = this.options.backToNum;                //后退到几步
        this.backIndex = this.options.backIndex;                //后退步数索引值
        this.backNum = this.options.backNum;                    //后退几步
        this.questionIndex = this.options.questionIndex;        //答题惩罚
        this.prizeIndex = this.options.prizeIndex;              //随机奖励
        this.index = this.options.index;                        //初始转动值
        this.backIndex = this.options.backIndex;                //后退索引值
        this.choosesteps = 0;                                    //记住选择的步数
        this.length = $(this.o).find(".nr-gird").length;
        this.direction = this.options.direction;
        this.targetIndex = 0;
        this.overTimeFlag = false;                              //是否超过1次转圈
        this.overTime = 0;                                      //如果超过一次，存放超过部分的差值
        this.timeInterval = null;
        this.init();
    };
    Richman.prototype = {
        init: function () {
            console.log(RichmanOpitons.number)
            this.gridRoll(RichmanOpitons.number);
        },
        gridRoll: function () {
            var _this = this,
                newBackToIndex = this.backToIndex,//记住要后退到的步数
                newBackIndex = this.backIndex;//记住要后退到的步数
            this.targetIndex = RichmanOpitons.index + RichmanOpitons.number;//骰子落子的位置
            if (this.targetIndex > this.length) {    //如果骰子总和超过整个格子的长度，将数组清空；计算超过的数字并赋值给diceSum
                this.overTime = RichmanOpitons.number - (this.length - RichmanOpitons.index);
                this.overTimeFlag = true;
                this.targetIndex = this.overTime;
            }
            else if (this.targetIndex == this.length) { //如果骰子总和刚好等于整个格子的长度，也将数组清空并且将超过的值赋值为0,也就是相当于重新从第一次开始循环执行
                this.overTime = 0;
                this.overTimeFlag = true;
                this.targetIndex = this.overTime;
            }
            (RichmanOpitons.index == this.backToIndex && this.targetIndex == this.backToIndex) || (RichmanOpitons.index == this.backIndex && this.targetIndex == this.backIndex) ? this.direction = 'back' :this.direction = 'forwards';
            function rotate() {
                switch (_this.direction) {
                    case 'forwards':
                        RichmanOpitons.index++;
                        $(".nr-gird-" + RichmanOpitons.index).addClass('current').siblings().removeClass('current');
                        if (RichmanOpitons.index > _this.length - 1) {
                            RichmanOpitons.index = RichmanOpitons.index - _this.length;
                            $(".nr-gird-" + RichmanOpitons.index).addClass('current').siblings().removeClass('current');
                        }
                        if (RichmanOpitons.index == _this.targetIndex) {
                            clearInterval(_this.timeInterval);
                        }
                        break;
                    case 'back' :
                        //后退到第backToNum步
                        if (RichmanOpitons.index == _this.backToIndex) {
                            newBackToIndex--;
                            $(".nr-gird-" + newBackToIndex).addClass('current').siblings().removeClass('current');
                            if (newBackToIndex == _this.backToNum) {
                                RichmanOpitons.index = newBackToIndex;
                            }
                        }
                        //后退backNum步
                        if (RichmanOpitons.index == _this.backIndex) {
                            newBackIndex--;
                            $(".nr-gird-" + newBackIndex).addClass('current').siblings().removeClass('current');
                            if (newBackIndex == _this.backNum) {
                                RichmanOpitons.index = newBackIndex;
                            }
                        }
                        break;
                }
                switch (true) {
                    case RichmanOpitons.index == _this.forwardIndex && _this.targetIndex == _this.forwardIndex://前进6步：当小人走到’前进6步‘(也就是图中格子4)，在格子4停顿1秒再向前走6步，到格子10
                        clearInterval(_this.timeInterval);
                        _this.targetIndex = RichmanOpitons.index + _this.forwardNum;
                        setTimeout(function () {
                            _this.timeInterval = setInterval(rotate, 500);
                        }, 1000);
                        _this.forwardFlag = true;
                        break;
                    case RichmanOpitons.index == _this.forwardToIndex && _this.targetIndex == _this.forwardToIndex://前进到10：当小人走到’前进到10‘(也就是图中格子6)，在格子6停顿1秒走到格子10
                        _this.backToFlag = false;
                        _this.direction = 'forwards';
                        clearInterval(_this.timeInterval);
                        _this.targetIndex = RichmanOpitons.index + _this.forwardToNum;
                        setTimeout(function () {
                            _this.timeInterval = setInterval(rotate, 500);
                        }, 1000);
                        _this.forwardToFlag = true;
                        break;
                    case RichmanOpitons.index == _this.stepIndex && _this.targetIndex == _this.stepIndex://选择步数：当小人走到’选择步数‘(也就是格子8)，就执行选择步数的任务--显示’选择步数‘弹窗
                        clearInterval(_this.timeInterval);
                        _this.targetIndex = _this.stepIndex;
                        var selfStep = _this, newStepDiceNumber = 0;
                        $(_this.mask).add(_this.popsteps).show();
                        //点击li，也就是说他选了步数，将开始按钮放开，并记住他选择的步数值
                        $(".pop-steps li").off('click').on('click', function () {
                            $(this).addClass('active').siblings().removeClass();
                            $(".pop-steps .btn-group").removeClass('btn-mask');
                            newStepDiceNumber = $(this).index() + 1;
                            $.ajax({
                                url: "http://award.feidou.com/national/index.php/Home/Index/selstep",
                                type: 'post',
                                dataType: 'json',
                                data: 'step='+ newStepDiceNumber +'&type=2',
                                success: function(msg) {

                                }
                            })
                        });
                        $(".pop-steps .btn-start, .pop-steps .close").off('click').on('click', function () {
                            $(_this.mask).add(_this.popsteps).hide().removeAttr('style');
                            //如果self.choosesteps为0，也就是说没有选择步数，那么弹窗关闭之后掷骰按钮得恢复成可点击状态
                            //反之，如果选了步数，就按选择的步数向前走
                            if (newStepDiceNumber == 0) {
                                $(_this.btn).parent().removeClass('btn-mask');
                            } else {
                                _this.targetIndex += newStepDiceNumber;
                                selfStep.choosesteps = newStepDiceNumber;
                                _this.timeInterval = setInterval(rotate, 500);
                                $(".pop-steps li").removeClass('active');
                                $(".pop-steps .btn-group").addClass('btn-mask');
                            }
                        });
                        _this.stepFlag = true;
                        _this.overTimeFlag = false;
                        _this.forwardFlag = false;
                        _this.forwardToFlag = false;
                        _this.choosesteps = 0;
                        _this.backToFlag = false;
                        _this.backFlag = false;
                        _this.questionFlag = false;
                        _this.prizeFlag = false;
                        break;
                    case RichmanOpitons.index == _this.backToIndex && _this.targetIndex == _this.backToIndex: //后退到6：如果走到’后退到6‘，回到’前进到10‘的位置，中间经过‘选择步数’继续后退不做处理
                        _this.direction = 'back';
                        clearInterval(_this.timeInterval);
                        _this.targetIndex = _this.backToNum;
                        setTimeout(function () {
                            _this.timeInterval = setInterval(rotate, 500);
                        }, 1000);
                        _this.backToFlag = true;
                        break;
                    case RichmanOpitons.index == _this.backIndex && _this.targetIndex == _this.backIndex: //后退2步：当选完步数走到’后退2步‘，向后退两步，再次回到’后退到6‘，执行(2)
                        _this.direction = 'back';
                        clearInterval(_this.timeInterval);
                        _this.targetIndex = _this.backNum;
                        setTimeout(function () {
                            _this.timeInterval = setInterval(rotate, 500);
                        }, 1000);
                        _this.backFlag = true;
                        break;
                    case RichmanOpitons.index == _this.questionIndex && _this.targetIndex == _this.questionIndex: //答题惩罚：显示答题惩罚弹窗
                        _this.targetIndex = _this.questionIndex;
                        clearInterval(_this.timeInterval);
                        $(_this.mask).add(_this.questions).show();
                        $(_this.btn).parent().removeClass('btn-mask');
                        _this.questionFlag = true;
                        break;
                    case RichmanOpitons.index == _this.prizeIndex && _this.targetIndex == _this.prizeIndex: //随机奖励：显示随机奖励弹窗
                        _this.targetIndex = _this.prizeIndex;
                        clearInterval(_this.timeInterval);
                        $(_this.mask).add(_this.popprize).show();
                        $(_this.btn).parent().removeClass('btn-mask');
                        _this.prizeFlag = true;
                        var selfPrize = _this, newPrizeDiceNumber = 0;
                        $(".pop-prize li").off('click').on('click', function () {
                            $(".pop-prize .btn-group").removeClass('btn-mask');
                            newPrizeDiceNumber = $(this).index() + 1;
                        });
                        $(".pop-prize li, .pop-prize .btn-start, .pop-prize .close").off('click').on('click', function () {
                            //如果说没有选择奖励，那么弹窗关闭之后掷骰按钮得恢复成可点击状态
                            //反之，如果选了奖励，就按选择的奖励向前走
                            if (newPrizeDiceNumber == 0) {
                                $(_this.btn).parent().removeClass('btn-mask');
                            } else {
                                _this.targetIndex += newPrizeDiceNumber;
                                _this.timeInterval = setInterval(rotate, 500);
                                $(".pop-prize li").removeClass('active');
                                $(".pop-prize .btn-group").addClass('btn-mask');
                            }
                        });
                        $(".pop-prize .btn-start, .pop-prize .close").off('click').on('click', function () {
                            $(_this.mask).add(_this.popprize).hide().removeAttr('style');
                        });
                        break;
                }
            }

            if(RichmanOpitons.number == '' || RichmanOpitons.number == 0) {
                $(".nr-gird-" + RichmanOpitons.index).addClass('current').siblings().removeClass('current');
            }else {
                clearInterval(this.timeInterval);
                this.timeInterval = setInterval(rotate, 500);
            }
        }
    };

    $.fn.Richman = function (options) {
        options = $.extend({}, $.fn.Richman.options, options);
        this.each(function () {
            new Richman($(this), options);
        })
    };
    Richman.options = {
        dice: '.dice',
        btnRoll: '.btn-roll',
        direction: 'forwards',          //行走方向：前进/后退
        mask: '.mask',                  //遮罩
        popsteps: '.pop-steps',         //选择步数弹窗
        popquestions: '.pop-questions', //答题惩罚弹窗
        popprize: '.pop-prize',         //随机奖励弹窗
        forwardIndex: 4,                //前进几步索引值
        forwardNum: 6,                  //前进步数
        forwardToIndex: 6,              //前进到几步索引值
        forwardTargetIndex: 10,         //前进到目标位置的索引值
        forwardToNum: 4,                //前进到第几步
        stepIndex: 8,                   //选择步数
        backToIndex: 12,                //后退到几步索引值
        backToNum: 6,                   //后退到第几步
        backIndex: 14,                  //后退步数索引值
        backNum: 12,                    //后退步数
        questionIndex: 17,              //答题惩罚
        prizeIndex: 19,                 //随机奖励
        choosesteps: 0                 //记住选择的步数
    }
})(jQuery);
$(document).ready(function () {
    $(".national-richman").Richman();
    $(".btn-roll").on('click', function(){
        RichmanOpitons.number = 4;
        console.log(11)
        $(".national-richman").Richman();
    })
    //签到成功
    var dice = $('.dice');
    $('.pop-signin .btn-start').on('click', function () {
        $(this).hide();
        var pids = $("#pids").attr("class");
        $(".pop-signin .btn-ok").css('display', 'block');

        $.ajax({
            url: "http://award.feidou.com/national/index.php/Home/Index/ysz",
            type: 'post',
            dataType: 'json',
            success: function(msg) {
                console.log(msg);

                if(msg != false){

                    speed(msg['step']);
                    $(".pop-signin .btn-ok, .pop-signin .close").on('click', function () {
                        $(".mask, .pop-signin, .pop-signin .btn-ok").hide().removeAttr('style');
                        dice.attr('class', 'dice');
                        $(".pop-signin .btn-start").show();
                        RichmanOpitons.number = msg['step'];
                        $(".national-richman").Richman();
                    });
                }

            }
        })
    });


    //答题成功
    $('.pop-right .btn-start').on('click', function () {
        $(this).hide();
        $(".pop-right .btn-ok").css('display', 'block');
        var dice = $('.dice');

        $.ajax({
            url: "http://award.feidou.com/national/index.php/Home/Index/ysz",
            type: 'post',
            dataType: 'json',
            success: function(msg) {
                console.log(msg);

                if(msg != false){

                    speed(msg['step']);
                    $(".pop-right .btn-ok, .pop-right .close").on('click', function () {
                        $(".mask, .pop-right").hide().removeAttr('style');
                        RichmanOpitons.number = msg['step'];
                        $('.national-richman').Richman();
                        //随机获取一道题目
                        var pids = $("#pids").attr("class");
                        $.ajax({
                            url: "http://award.feidou.com/national/index.php/Home/Index/TodaygetAsk",
                            type: 'post',
                            dataType: 'json',
                            data: 'eid=5'+ '&pid='+pids,
                            success: function(msg) {

                                if(msg['s'] != 1) {
                                    $("#ask").html(msg['ask']['ask']);
                                    $("#answa").html(msg['ans']['0']['answer']);
                                    $("#answb").html(msg['ans']['1']['answer']);
                                    $("#answa").attr("class", msg['ans']['0']['sid']);
                                    $("#answb").attr("class", msg['ans']['1']['sid']);
                                    $(".pop-questions-cls").show();
                                }else{
                                    $(".national-richman-panel .btn-group").html('<a style="display: block" href="javascript:;" class="btn-compeleted">已完成</a>');
                                }
                            }
                        })
                        $(".pop-right .btn-ok").css('display', 'none');
                    });
                }

            }
        })

    })



    function speed(number) {

        dice.attr("class", "dice").animate({opacity: 'fast'}, 100, function () {
            $(".dice").addClass('dice-t');
        }).delay(200).animate({opacity: 'fast'}, 100, function () {
            dice.removeClass('dice-t').addClass('dice-s');
        }).delay(200).animate({opacity: 'show'}, 100, function () {
            dice.removeClass('dice-s').addClass('dice-e');
        }).delay(200).animate({opacity: 'fast'}, 100, function () {
            dice.removeClass('dice-e').addClass('dice-0' + number);
        });

    }


})
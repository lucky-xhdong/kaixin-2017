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
        this.number = this.options.number;                      //初始步数
        this.diceArr = [];                                       //用来存放骰子显示的点
        this.forwardFlag = false;                               //标志是否前进了指定步数
        this.forwardToFlag = false;                             //标志是否前进到指定的步数
        this.choosesteps = 0;                                    //记住选择的步数
        this.stepFlag = false;                                  //是否走到选择步数
        this.backToFlag = false;                                //标志是否后退到的步数
        this.backFlag = false;                                  //记住后退的步数
        this.questionFlag = false;                              //记住答题惩罚
        this.prizeFlag = false;                                 //记住随机奖励
        this.direction = this.options.direction;
        this.length = $(this.o).find(".nr-gird").length;
        this.timeInterval = null;
        this.start = 0;
        this.overTimeFlag = false;                              //是否超过1次转圈
        this.overTime = 0;                                      //如果超过一次，存放超过部分的差值
        this.init();
    };
    Richman.prototype = {
        init: function () {
            var _this = this;
            $(this.btnRoll).on('click', function () {
                var number = _this.number == 0 ? Math.floor(Math.random() * 6 + 1) : _this.number;
                $(this).parent().addClass('btn-mask');//添加遮罩防止重复点击
                _this.diceRoll($(_this.dice), number);
                _this.gridRoll(_this.index, number);
            })
        },
        diceRoll: function (dice, num) {
            dice.attr("class", "dice").animate({left: 0}, 100, function () {
                dice.addClass('dice-t');
            }).delay(200).animate({top: 0}, 100, function () {
                dice.removeClass('dice-t').addClass('dice-s');
            }).delay(200).animate({opacity: 'show'}, 100, function () {
                dice.removeClass('dice-s').addClass('dice-e');
            }).delay(200).animate({top: 0}, 100, function () {
                dice.removeClass('dice-e').addClass('dice-0' + num);
            });
        },
        gridRoll: function (index, number) {
            var _this = this,
                diceSum = 0,
                newBackToIndex = this.backToIndex,//记住要后退到的步数
                newBackIndex = this.backIndex;//记住要后退到的步数
            this.index = index;//记住当前走到哪一步
            //是前进还是后退
            (this.index == this.backToIndex && diceSum == this.backToIndex) || (this.index == this.backIndex && diceSum == this.backIndex) ? this.direction = 'back' :this.direction = 'forwards';
            if(this.overTimeFlag == true) {
                this.diceArr.push(number + this.overTime);//将走过的步数(也就是骰子显示转动结束后的数字)，存放在数组中
            }
            else if(this.index == this.forwardTargetIndex || diceSum == this.forwardTargetIndex) {
                this.diceArr.length = 0;//前进到目标位置，将前面存放的骰子和删除，从目标位置出发，存放目标位置的索引值和骰子落子的索引值
                this.diceArr.push(number + this.index);
            }
            else if
            (      (this.index == this.forwardIndex && diceSum == this.forwardIndex)
                || (this.index == this.forwardToIndex && diceSum == this.forwardToIndex)
                || (this.index == this.stepIndex && diceSum == this.stepIndex)
                || (this.index == this.backToIndex && diceSum == this.backToIndex)
                || (this.index == this.backIndex && diceSum == this.backIndex)
                || (this.index == this.questionIndex && diceSum == this.questionIndex)
                || (this.index == this.prizeIndex && diceSum == this.prizeIndex)
            ) {
            // else if (this.forwardFlag == true || (this.forwardToFlag == true || this.index == this.forwardToIndex) || this.choosesteps > 0 || this.backToFlag == true || this.questionFlag == true || this.prizeFlag == true ) {
                this.diceArr.push(this.index);//将走过的步数(也就是骰子显示转动结束后的数字)，存放在数组中
            }
            else {
                this.diceArr.push(number);//将走过的步数(也就是骰子显示转动结束后的数字)，存放在数组中
            }
            for (var i = 0; i < this.diceArr.length; i++) {
                diceSum += this.diceArr[i];
            }
            if (diceSum > this.length) {    //如果骰子总和超过整个格子的长度，将数组清空；计算超过的数字并赋值给diceSum
                this.diceArr.length = 0;
                this.overTime = number - (this.length - this.index);
                this.overTimeFlag = true;
                diceSum = this.overTime;
            }
            else if (diceSum == this.length) { //如果骰子总和刚好等于整个格子的长度，也将数组清空并且将超过的值赋值为0,也就是相当于重新从第一次开始循环执行
                this.diceArr.length = 0;
                this.overTime = 0;
                this.overTimeFlag = true;
                diceSum = this.overTime;
            }
            else if (
                (this.index == this.forwardIndex && diceSum == this.forwardIndex) ||
                (this.index == this.forwardToIndex && diceSum == this.forwardToIndex) ||
                (this.index == this.backToIndex && diceSum == this.backToIndex) ||
                (this.index == this.backIndex && diceSum == this.backIndex) ||
                (this.index == this.stepIndex && diceSum == this.stepIndex) ||
                (this.index == this.questionIndex && diceSum == this.questionIndex) ||
                (this.index == this.prizeIndex && diceSum == this.prizeIndex)
            ) {
                this.forwardFlag = true;
                this.forwardToFlag = true;
                this.stepFlag = true;
                this.backToFlag = true;
                this.backFlag = true;
                this.questionFlag = true;
                this.prizeFlag = true;
            }
            else {
                this.overTimeFlag = false;
                this.forwardFlag = false;
                this.forwardToFlag = false;
                this.stepFlag = false;
                this.choosesteps = 0;
                this.backToFlag = false;
                this.backFlag = false;
                this.questionFlag = false;
                this.prizeFlag = false;
            }

            function rotate() {
                switch (_this.direction) {
                    case 'forwards':
                        //前进
                        _this.index++;
                        if (_this.index > _this.length - 1) {
                            _this.index = _this.index - _this.length;
                            $(".nr-gird-" + _this.index).addClass('current').siblings().removeClass('current');
                        }
                        $(".nr-gird-" + _this.index).addClass('current').siblings().removeClass('current');
                        //如果到达指定位置则停止
                        if (_this.index == diceSum) {
                            clearInterval(_this.timeInterval);
                            $(_this.btnRoll).parent().removeClass('btn-mask');
                        }
                        break;
                    case 'back' :
                        //后退到第backToNum步
                        if (_this.index == _this.backToIndex) {
                            newBackToIndex--;
                            $(".nr-gird-" + newBackToIndex).addClass('current').siblings().removeClass('current');
                            if (newBackToIndex == _this.backToNum) {
                                _this.index = newBackToIndex;
                            }
                        }
                        //后退backNum步
                        if (_this.index == _this.backIndex) {
                            newBackIndex--;
                            $(".nr-gird-" + newBackIndex).addClass('current').siblings().removeClass('current');
                            if (newBackIndex == _this.backNum) {
                                _this.index = newBackIndex;
                            }
                        }
                    break;
                }
                switch (true) {
                    case _this.index == _this.forwardIndex && diceSum == _this.forwardIndex://前进6步：当小人走到’前进6步‘(也就是图中格子4)，在格子4停顿1秒再向前走6步，到格子10
                        clearInterval(_this.timeInterval);
                        diceSum = _this.index + _this.forwardNum;
                        setTimeout(function () {
                            _this.timeInterval = setInterval(rotate, 500);
                        }, 1000);
                        _this.forwardFlag = true;
                        break;
                    case _this.index == _this.forwardToIndex && diceSum == _this.forwardToIndex://前进到10：当小人走到’前进到10‘(也就是图中格子6)，在格子6停顿1秒走到格子10
                        _this.backToFlag = false;
                        _this.direction = 'forwards';
                        clearInterval(_this.timeInterval);
                        diceSum = _this.index + _this.forwardToNum;
                        setTimeout(function () {
                            _this.timeInterval = setInterval(rotate, 500);
                        }, 1000);
                        _this.forwardToFlag = true;
                        break;
                    case _this.index == _this.stepIndex && diceSum == _this.stepIndex://选择步数：当小人走到’选择步数‘(也就是格子8)，就执行选择步数的任务--显示’选择步数‘弹窗
                        clearInterval(_this.timeInterval);
                        diceSum = _this.stepIndex;
                        var selfStep = _this, newStepDiceNumber = 0;
                        $(_this.mask).add(_this.popsteps).show();
                        //点击li，也就是说他选了步数，将开始按钮放开，并记住他选择的步数值
                        $(".pop-steps li").off('click').on('click', function () {
                            $(this).addClass('active').siblings().removeClass();
                            $(".pop-steps .btn-group").removeClass('btn-mask');
                            newStepDiceNumber = $(this).index() + 1;
                        });
                        $(".pop-steps .btn-start, .pop-steps .close").off('click').on('click', function () {
                            $(_this.mask).add(_this.popsteps).hide().removeAttr('style');
                            //如果self.choosesteps为0，也就是说没有选择步数，那么弹窗关闭之后掷骰按钮得恢复成可点击状态
                            //反之，如果选了步数，就按选择的步数向前走
                            if (newStepDiceNumber == 0) {
                                $(_this.btn).parent().removeClass('btn-mask');
                            } else {
                                diceSum = selfStep.index + newStepDiceNumber;
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
                    case _this.index == _this.backToIndex && diceSum == _this.backToIndex: //后退到6：如果走到’后退到6‘，回到’前进到10‘的位置，中间经过‘选择步数’继续后退不做处理
                        _this.direction = 'back';
                        clearInterval(_this.timeInterval);
                        diceSum = _this.backToNum;
                        setTimeout(function () {
                            _this.timeInterval = setInterval(rotate, 500);
                        }, 1000);
                        _this.backToFlag = true;
                        break;
                    case _this.index == _this.backIndex && diceSum == _this.backIndex: //后退2步：当选完步数走到’后退2步‘，向后退两步，再次回到’后退到6‘，执行(2)
                        _this.direction = 'back';
                        clearInterval(_this.timeInterval);
                        diceSum = _this.backNum;
                        setTimeout(function () {
                            _this.timeInterval = setInterval(rotate, 500);
                        }, 1000);
                        _this.backFlag = true;
                        break;
                    case _this.index == _this.questionIndex && diceSum == _this.questionIndex: //答题惩罚：显示答题惩罚弹窗
                        diceSum = _this.questionIndex;
                        clearInterval(_this.timeInterval);
                        $(_this.mask).add(_this.questions).show();
                        $(_this.btn).parent().removeClass('btn-mask');
                        _this.questionFlag = true;
                        break;
                    case _this.index == _this.prizeIndex && diceSum == _this.prizeIndex: //随机奖励：显示随机奖励弹窗
                        diceSum = _this.prizeIndex;
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
                                diceSum = selfPrize.index + newPrizeDiceNumber;
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

            clearInterval(this.timeInterval);
            this.timeInterval = setInterval(rotate, 500);
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
        index: 0,                       //初始转动值
        choosesteps: 0,                 //记住选择的步数
        number: 0                       //初始步数
    }
})(jQuery);
$(document).ready(function () {
    $(".national-richman").Richman({
        number: 4
    });
});

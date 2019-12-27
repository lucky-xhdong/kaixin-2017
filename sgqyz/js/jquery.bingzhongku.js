;(function () {
    $.fn.categorySwitch = function (options) {
        var defaults = $.extend({
            //兵种库轮播默认参数
            bingzhongku: '',//兵种库容器
            //公共参数
            avatar: '',//头像
            bControls: true,//兵种库控制按钮
            bAutoPlay: true//兵种库自动播放
        }, options);
        var bTimeInterval,//兵种库定时器
            bTargetIndex = 0,//兵种库目标索引
            bHasStarted = false;

        //兵种库轮播模块
        var bMethods = {
            init: function () {
                if (defaults.bAutoPlay == true) {
                    bHasStarted = true;
                    bMethods.start();
                }
            },
            /**
             * 渐隐渐现自动播放
             * 显示滑到currentIndex的那一页
             */
            playFade: function (currentIndex) {
                $('.arms-switch > div').eq(currentIndex).fadeIn(1000).siblings().fadeOut(1000);
                $('.arms-nav li').removeClass('active').eq(currentIndex).addClass('active');
            },
            /**
             * 渐隐渐现向后翻页
             */
            nextFade: function () {
                bTargetIndex++;
                if (bTargetIndex == $('.arms-switch > div').length) {
                    bTargetIndex = 0;
                }
                bMethods.playFade(bTargetIndex);
            },
            /**
             * 动画开始
             */
            start: function () {
                bHasStarted = true;
                clearInterval(bTimeInterval);
                bTimeInterval = setInterval(bMethods.nextFade, 5000);
            },
            /**
             * 动画停止
             */
            stop: function () {
                clearInterval(bTimeInterval);
                bHasStarted = false;
            }
        };

        return {
            /**
             * 武将库/兵种库切换
             */
            bindEvent: function () {
                $(".arms-nav li").on('click', function () {
                    bTargetIndex = $(this).index();
                    bMethods.playFade(bTargetIndex);
                })
                $(".arms-nav li").parents('.bingzhongku').hover(function () {
                    bMethods.stop();
                }, function () {
                    bMethods.start();
                });
                $('.sgqyz-moudle-03').undelegate('.avatar', 'click').delegate('.avatar', 'click', function () {
                    var avatar = $(this).data('avatar');
                    switch (avatar) {
                        case 'avatar-wujiangku':
                            bMethods.stop();
                            $(this).addClass('active').siblings().removeClass('active');
                            $('.cascade-wujiangku').fadeIn(1000);
                            $('.bingzhongku').fadeOut(1000);
                            break;
                        case 'avatar-bingzhongku':
                            bMethods.init();
                            $(this).addClass('active').siblings().removeClass('active');
                            $('.cascade-wujiangku').fadeOut(1000);
                            $('.bingzhongku').fadeIn(1000);
                            break;
                    }
                })
            }
        }
    }
})(jQuery);
$.fn.categorySwitch().bindEvent();

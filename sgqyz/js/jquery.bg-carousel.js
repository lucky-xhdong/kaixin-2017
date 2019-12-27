;(function () {
    $.fn.bgCarousel = function (options) {
        var defaults = $.extend({
            pageWrapper: '',
            delay: 5000,
            pager: false
        }, options);
        var $this = $(this),
            $ul = $this.find('ul'),
            bgTimeInterval,//定时器
            bgTargetIndex = 0,//武将库目标索引
            bgHasStarted = true;
        //兵种库轮播模块
        var bgMethods = {
            init: function () {
                $this.css({
                    'height':$ul.find('li').height()
                });
                bgHasStarted = true;
                bgMethods.start();
                bgMethods.createPager();
                $this.hover(function () {
                    bgMethods.stop();
                }, function () {
                    bgHasStarted = true;
                    bgMethods.start();
                })
            },
            /**
             * 渐隐渐现自动播放
             * 显示滑到currentIndex的那一页
             */
            play: function (currentIndex) {
                $ul.find('li').eq(currentIndex).fadeIn(1000).siblings().fadeOut(1000);
                $(defaults.pageWrapper).find('li').removeClass('active').eq(currentIndex).addClass('active');
            },
            /**
             * 渐隐渐现向前翻页
             */
            prev: function () {
                bgTargetIndex--;
                if (bgTargetIndex == -1) {
                    bgTargetIndex = $ul.find('li').length - 1;
                }
                bgMethods.play(bgTargetIndex);
            },
            /**
             * 渐隐渐现向后翻页
             */
            next: function () {
                bgTargetIndex++;
                if (bgTargetIndex == $ul.find('li').length) {
                    bgTargetIndex = 0;
                }
                bgMethods.play(bgTargetIndex);
            },
            /**
             * 动画开始
             */
            start: function () {
                bgHasStarted = true;
                clearInterval(bgTimeInterval);
                bgTimeInterval = setInterval(bgMethods.next, defaults.delay);
            },
            /**
             * 动画停止
             */
            stop: function () {
                clearInterval(bgTimeInterval);
                bgHasStarted = false;
            },
            /**
             * 动画停止
             */
            createPager: function () {
                if(defaults.pager == true) {
                    $(defaults.pageWrapper).show();
                    var html = '<ul>';
                    for(var i = 0; i < $ul.find('li').length; i++) {
                        if(i == 0) {
                            html += '<li class="active"><a href="javascript:;">';
                        }else {
                            html += '<li><a href="javascript:;">';
                        }
                        html += i;
                        html += '</a></li>';
                    }
                    html += '</ul>';
                    if(!$(defaults.pageWrapper).has('ul').length) {
                        $(defaults.pageWrapper).append(html);
                    }
                    $(defaults.pageWrapper).find('li').hover(function () {
                        bgMethods.stop();
                        bgTargetIndex = $(this).index();
                        bgMethods.play(bgTargetIndex);
                    }, function () {
                        bgHasStarted = true;
                        bgMethods.start();
                    })
                }
            }
        };

        bgMethods.init();
    }
})(jQuery);
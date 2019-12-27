;(function () {
    $.fn.fsCarousel = function (options) {
        var defaults = $.extend({
            delay: 5000,
            pager: true
        }, options);
        var $this = $(this),
            $ul = $(this).find('ul'),
            $li = $ul.find('li'),
            sTimeInterval,//定时器
            sTargetIndex = 0,//目标索引
            sHasStarted = true;
        //兵种库轮播模块
        var sMethods = {
            init: function () {
                // var firstNode = $ul.find('li').first().clone();//复制第一张图片
                //第一张图片放到最后一张图片后，设置外层容器的宽度为图片张数*图片宽度
                var wrapper = $('<div class="slide-wrapper"></div>');
                $ul.wrap(wrapper);
                // $ul.append(firstNode).css({
                $ul.css({
                    'width': $li.length * $li.width(),
                    'height': $li.height()
                });
                sMethods.start();
                sMethods.createPager();
                $this.hover(function () {
                    sMethods.stop();
                }, function () {
                    bgHasStarted = true;
                    sMethods.start();
                })
            },
            /**
             * 左右滑动自动播放
             * 显示滑到currentIndex的那一页
             */
            play: function (currentIndex) {
                $ul.stop().animate({left: -currentIndex * $li.width()}, 1000);
                $('.fs-carousel-pager li').removeClass('active').eq(currentIndex).addClass('active');
            },
            /**
             * 左右滑动向前翻页
             */
            prev: function () {
                sTargetIndex--;
                if (sTargetIndex == -1) {
                    sTargetIndex = $li.length - 2;
                    $ul.css({left: -($li.length - 1) * $li.width()});
                }
                sMethods.play(sTargetIndex);
            },
            /**
             * 左右滑动向后翻页
             */
            next: function () {
                sTargetIndex++;
                if (sTargetIndex == $ul.find('li').length) {
                    sTargetIndex = 0;
                }
                sMethods.play(sTargetIndex);
            },
            /**
             * 动画开始
             */
            start: function () {
                sHasStarted = true;
                clearInterval(sTimeInterval);
                sTimeInterval = setInterval(sMethods.next, defaults.delay);
            },
            /**
             * 动画停止
             */
            stop: function () {
                clearInterval(sTimeInterval);
                sHasStarted = false;
            },
            /**
             * 分页器
             */
            createPager: function () {
                if(defaults.pager == true) {
                    var html = '<div class="fs-carousel-pager"><ul>';
                    for(var i = 0; i < $li.length; i++) {
                        if(i == 0) {
                            html += '<li class="active"><a href="javascript:;">';
                        }else {
                            html += '<li><a href="javascript:;">';
                        }
                        html += i;
                        html += '</a></li>';
                    }
                    html += '</ul></div>';
                    if(!$this.has('.fs-carousel-pager').length) {
                        $this.append(html);
                    }
                    $('.fs-carousel-pager li').hover(function () {
                        sMethods.stop();
                        sTargetIndex = $(this).index();
                        sMethods.play(sTargetIndex);
                    }, function () {
                        sHasStarted = true;
                        sMethods.start();
                    })
                }
            }
        };

        sMethods.init();
    }
})(jQuery);

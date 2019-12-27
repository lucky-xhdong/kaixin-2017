;(function () {
    $.fn.categorySlide = function (options) {
        var defaults = $.extend({
            animateImgs: [],
            animateDelay: 200,//gif图默认播放时间
            sControls: true
            //公共参数
        }, options);
        var $this = $(this),
            $ul = $(this).find('ul'),
            sTimeInterval,//兵种库定时器
            sTargetIndex = 0,//兵种库目标索引
            sHasStarted = false
        //兵种库轮播模块
        var sMethods = {
            init: function () {
                var firstNode = $ul.find('li').first().clone();//复制第一张图片
                //第一张图片放到最后一张图片后，设置外层容器的宽度为图片张数*图片宽度
                var wrapper = $('<div class="slide-wrapper"></div>');
                $ul.wrap(wrapper);
                $ul.append(firstNode).css({
                    'width': $ul.find('li').length * $ul.find('li').width()
                });
                sMethods.createControl();
                // sMethods.start();
            },
            /**
             * 左右按钮
             */
            createControl: function () {
                var self = $this;
                if (defaults.sControls) {
                    var html = '';
                    html += '<div class="carousel-controls">';
                    html += '<a href="javascript:;" data-attr="btn-prev" class="btn-control btn-prev"></a>';
                    html += '<a href="javascript:;" data-attr="btn-next" class="btn-control btn-next"></a>';
                    html += '</div>';
                    if (!$(self).has(".carousel-controls").length) {
                        $(self).append(html);
                        $(self).undelegate('.btn-control', 'click').delegate('.btn-control', 'click', function () {
                            var attr = $(this).data('attr');
                            if (attr == "btn-prev") {
                                sHasStarted = true;
                                sMethods.prevSlide();
                            } else if (attr == "btn-next") {
                                sHasStarted = true;
                                sMethods.nextSlide();
                            }
                        })
                    }
                }
            },
            /**
             * 左右滑动自动播放
             * 显示滑到currentIndex的那一页
             */
            playSlide: function (currentIndex) {
                $ul.stop().animate({left: -currentIndex * $ul.find('li').width()}, 1000);
            },
            /**
             * 左右滑动向前翻页
             */
            prevSlide: function () {
                sTargetIndex--;
                if (sTargetIndex == -1) {
                    sTargetIndex = $ul.find('li').length - 2;
                    $ul.css({left: -($ul.find('li').length - 1) * $ul.find('li').width()});
                }
                sMethods.playSlide(sTargetIndex);
            },
            /**
             * 左右滑动向后翻页
             */
            nextSlide: function () {
                sTargetIndex++;
                if (sTargetIndex == $ul.find('li').length) {
                    sTargetIndex = 1;
                    $ul.css({left: 0});
                }
                sMethods.playSlide(sTargetIndex);
            },
            /**
             * 动画开始
             */
            start: function () {
                sHasStarted = true;
                clearInterval(sTimeInterval);
                sTimeInterval = setInterval(sMethods.nextSlide, 5000);
            },
            /**
             * 动画停止
             */
            stop: function () {
                clearInterval(sTimeInterval);
                sHasStarted = false;
            }
        };

        sMethods.init();
    }
})(jQuery);

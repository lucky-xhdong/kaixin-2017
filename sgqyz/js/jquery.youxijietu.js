(function ($) {
    var Youxijietu = function (o, options) {
        this.o = $("#" + o);
        if (typeof(options) == 'object') {
            this.options = $.extend({}, Youxijietu.options, options);
        }
        this.init();
    };
    Youxijietu.prototype = {
        init: function () {
            this.oWidth = this.options.oWidth;
            this.oHeight = this.options.oHeight;
            this.bWidth = this.options.bWidth;
            this.bHeight = this.options.bHeight;
            this.sWidth = this.options.sWidth;
            this.sHeight = this.options.sHeight;
            this.ul = $(this.o).find('ul');
            this.ul.wrap('<div class="slide-wrapper"></div>');
            this.wrap = $('.slide-wrapper');
            this.li = this.ul.children('li');
            this.liLength = this.li.length;
            this.currentPage = this.options.currentPage;
            this.prevLeft = 0;
            this.nextLeft = this.options.oWidth - this.options.sWidth;
            this.prevNLeft = -this.options.oWidth;
            this.nextNLeft = this.options.oWidth;
            this.currentPageLeft = (this.options.oWidth - this.options.bWidth) / 2;
            this.draw();
            this.bind();
            this.createControl();
        },
        draw: function () {
            var prev, next;
            prev = this.currentPage > 1 ? this.currentPage - 1 : this.liLength;
            next = this.currentPage == this.liLength ? 1 : this.currentPage + 1;
            $(this.o).css({
                width: this.options.oWidth,
                height: this.options.oHeight,
                position: 'relative'
            });
            $(this.o).find(this.wrap).css({
                width: this.options.oWidth,
                height: this.options.oHeight,
                position: 'relative',
                overflow: 'hidden'
            });
            $(this.li).css({
                width: 0,
                height: 0,
                opacity: 0,
                left: this.options.oWidth / 2 + 'px',
                zIndex: 0,
                marginTop: 50 + 'px'
            });
            $(this.li).eq(prev - 1).css({
                width: this.options.sWidth,
                height: this.options.sHeight,
                opacity: 1,
                left: this.prevLeft + 'px',
                zIndex: 0,
                marginTop: 50 + 'px'
            });
            $(this.li).eq(this.currentPage - 1).attr('class','current').css({
                width: this.options.bWidth,
                height: this.options.bHeight,
                opacity: 1,
                left: this.currentPageLeft + 'px',
                zIndex: 3,
                marginTop: 0
            });
            $(this.li).eq(next - 1).attr('class','right').css({
                width: this.options.sWidth,
                height: this.options.sHeight,
                opacity: 1,
                left: this.nextLeft + 'px',
                zIndex: 0,
                marginTop: 50 + 'px'
            });
        },
        bind: function () {
            var _this = this, index, prevIndex, nextIndex, direction;
            $(this.li).on('click', function (e) {
                index = $(this).data('index');
                if (_this.currentPage == index) {
                    return true;
                } else {
                    e.stopPropagation();
                }
                if (_this.currentPage < index) {
                    nextIndex = index - _this.currentPage;
                    prevIndex = _this.currentPage + _this.liLength - index;
                } else {
                    nextIndex = _this.liLength - _this.currentPage + index;
                    prevIndex = _this.currentPage - index;
                }
                if (prevIndex < nextIndex) {
                    direction = 'right';
                } else {
                    direction = 'left';
                }
                _this.turnPage(index, direction);
            })
        },
        turn: function (direction) {
            var _this = this, page;
            if (direction == 'right') {
                page = _this.currentPage - 1;
                if (page <= 0) {
                    page = _this.liLength;
                }
            } else {
                page = _this.currentPage + 1;
                if (page > _this.liLength) {
                    page = 1;
                }
            }
            _this.turnPage(page, direction);
        },
        start: function () {
            var _this = this;
            if (_this.interval) _this.stop();
            _this.interval = setInterval(function () {
                if (_this.options.direction == 'left') {
                    _this.turn('left');
                } else {
                    _this.turn('right');
                }
            }, _this.options.delay);
        },
        stop: function () {
            clearInterval(this.interval);
        },
        createControl: function () {
            var html = '', _this = this;
            html += '<div class="carousel-controls yxjt-controls">';
            html += '<a class="btn-prev" href="javascript:;">prev</a>';
            html += '<a class="btn-next" href="javascript:;">next</a>';
            html += '</div>';
            if (!$(this.o).has('.control').length) {
                $(this.o).append(html);
            }
            $('.yxjt-controls').undelegate('.btn-prev', 'click').delegate('.btn-prev', 'click', function () {
                _this.turn('right');
            });
            $('.yxjt-controls').undelegate('.btn-next', 'click').delegate('.btn-next', 'click', function () {
                _this.turn('left');
            });
        },
        turnPage: function (page, direction) {
            var _this = this;
            if (_this.locked) return false;
            _this.locked = true;
            if (_this.currentPage == page) return false;

            var play = function (page, direction, time) {
                var prev, next, prevP, nextN;
                prev = page > 1 ? page - 1 : _this.liLength;
                next = page == _this.liLength ? 1 : page + 1;
                prevP = prev - 1 >= 1 ? prev - 1 : _this.liLength;
                nextN = next + 1 > _this.liLength ? 1 : next + 1;
                if (prev != _this.currentPage && next != _this.currentPage) {
                    var currentPrev = _this.currentPage > 1 ? _this.currentPage - 1 : _this.length;
                    var currentNext = _this.currentPage == _this.liLength ? 1 : _this.currentPage + 1;
                    $(_this.li).eq(currentPrev - 1).attr('class','left').animate({
                        width: 0,
                        height: 0,
                        opacity: 0,
                        left: _this.options.oWidth / 2 + 'px',
                        zIndex: 0,
                        marginTop: _this.options.bHeight / 2 + 'px'
                    }, time);
                    $(_this.li).eq(_this.currentPage - 1).attr('class','current').animate({
                        width: 0,
                        height: 0,
                        opacity: 0,
                        left: _this.options.oWidth / 2 + 'px',
                        zIndex: 0,
                        marginTop: _this.options.bHeight / 2 + 'px'
                    }, time);
                    $(_this.li).eq(currentNext - 1).attr('class','right').animate({
                        width: 0,
                        height: 0,
                        opacity: 0,
                        left: _this.options.oWidth / 2 + 'px',
                        zIndex: 0,
                        marginTop: _this.options.bHeight / 2 + 'px'
                    }, time);
                }
                if (direction == 'left') {
                    $(_this.li).eq(_this.currentPage - 1).css({zIndex: 0});
                    $(_this.li).eq(prev - 1).attr('class','left').animate({
                        opacity: 1,
                        left: _this.prevLeft + 'px',
                        height: _this.options.sHeight,
                        width: _this.options.sWidth,
                        zIndex: 2,
                        marginTop: 50 + 'px'
                    }, time);
                    $(_this.li).eq(page - 1).attr('class','current').css({zIndex: 3}).animate({
                        opacity: 1,
                        left: _this.currentPageLeft + 'px',
                        height: _this.options.bHeight,
                        width: _this.options.bWidth,
                        zIndex: 3,
                        marginTop: 0
                    }, time);
                    $(_this.li).eq(next - 1).attr('class','right').css({
                        opacity: 0,
                        left: _this.nextNLeft + 'px',
                        height: _this.options.sHeight,
                        width: _this.options.sWidth,
                        zIndex: 2,
                        marginTop: 50 + 'px'
                    }).animate({
                        opacity: 1,
                        left: _this.nextLeft + 'px',
                        height: _this.options.sHeight,
                        width: _this.options.sWidth,
                        zIndex: 2,
                        marginTop: 50 + 'px'
                    }, time);
                    $(_this.li).eq(prevP - 1).css({zIndex: 0}).animate({
                        height: 0,
                        width: 0,
                        opacity: 0,
                        left: 0,
                        zIndex: 0,
                        marginTop: _this.options.sHeight / 2 + 'px'
                    }, time, "", function () {
                        _this.locked = false;
                    });
                } else {
                    $(_this.li).eq(_this.currentPage - 1).css({zIndex: 0});
                    $(_this.li).eq(next - 1).attr('class','right').css({zIndex: 2}).animate({
                        opacity: 1,
                        left: _this.nextLeft + 'px',
                        height: _this.options.sHeight,
                        width: _this.options.sWidth,
                        zIndex: 2,
                        marginTop: 50 + 'px'
                    }, time);
                    $(_this.li).eq(page - 1).attr('class','current').css({zIndex: 3}, time).animate({
                        opacity: 1,
                        left: _this.currentPageLeft + 'px',
                        height: _this.options.bHeight,
                        width: _this.options.bWidth,
                        zIndex: 3,
                        marginTop: 0
                    }, time);
                    $(_this.li).eq(prev - 1).attr('class','left').css({
                        opacity: 0,
                        left: _this.prevNLeft + 'px',
                        height: _this.options.sHeight,
                        width: _this.options.sWidth,
                        zIndex: 2,
                        marginTop: 50 + 'px'
                    }).animate({
                        opacity: 1,
                        left: _this.prevLeft + 'px',
                        height: _this.options.sHeight,
                        width: _this.options.sWidth,
                        zIndex: 2,
                        marginTop: 50 + 'px'
                    }, time);
                    $(_this.li).eq(nextN-1).css({zIndex: 0}).animate({
                        height: 0,
                        width: 0,
                        opacity: 0,
                        left: _this.nextNLeft + 'px',
                        zIndex: 0,
                        marginTop: _this.options.sHeight / 2 + 'px'
                    }, time, "", function () {
                        _this.locked = false;
                    });
                }
                _this.currentPage = page;
            };
            play(page, direction, _this.options.speed)
        }
    };
    Youxijietu.options = {
        offsetPages: 3,//默认可视最大条数
        direction: "left",//滚动的方向
        currentPage: 1,//默认当前显示第几条
        oWidth: 0,//外框宽度
        oHeight: 0,//外框高度
        bWidth: 0,//大图宽度
        bHeight: 0,//大图高度
        sWidth: 0,//小图宽度
        sHeight: 0,//小图高度
        delay: 5000,//滚动间隔（毫秒）
        speed: 500 //滚动速度毫秒
    };
    window.Youxijietu = Youxijietu;
})(jQuery);
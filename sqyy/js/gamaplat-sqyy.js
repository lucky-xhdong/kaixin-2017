(function ($) {
    var Sqyy = function (o, options) {
        this.o = o;
        this.options = $.extend({}, Sqyy.options, options);
        this.nav = $(this.o).find(this.options.nav);
        this.con = $(this.o).find(this.options.con);
        this.cur = this.options.cur;
        this.animate = this.options.animate;
        this.top = this.options.top;
        this.tabSwitch(this.options.index);
        this.goToTop();
    };
    Sqyy.prototype = {
        tabSwitch: function (index) {
            var _this = this;
            if(index == '' || isNaN(index)){
                index = 0;
            }
            $(this.con).eq(index).show().siblings().hide();
            $(this.nav).eq(index).addClass(_this.options.cur);
            this.nav.click(function(){
                index = $(this).index();
                $(_this.nav).eq(index).addClass(_this.cur).siblings().removeClass(_this.cur);
                $(_this.con).eq(index).show().siblings().hide();
                $(_this.con).eq(index).addClass(_this.animate).siblings().removeClass(_this.animate);
            })
        },
        goToTop: function () {
            $(this.top).on('click', function () {
                $("html, body").animate({
                    scrollTop: 0
                }, 200)
            })
        }
    };
    $.fn.Sqyy = function (options) {
        options = $.extend($.fn.Sqyy.options, options);
        this.each(function () {
            new Sqyy($(this), options);
        })
    };
    $.fn.Sqyy.options = {
        nav: ".sqyy-nav li",//导航
        con: ".switch-wrapper > div",//需要切换的div
        cur: "active",//导航当前样式
        top: ".go-to-top",//返回顶部
        index: 0,//当前是第几个元素显示
        animate: "fadeInUp animated"//切换的div动画效果
    };
})(jQuery);
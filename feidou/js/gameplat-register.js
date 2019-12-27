;(function ($) {
    var gpRegister = function (o, options) {
        this.o = o;
        this.options = $.extend({}, gpRegister.options, options);
        this.init();
    };
    gpRegister.prototype = {
        init: function () {
            this.Register();
        },
        /**
         * 注册--注册方式切换
         */
        Register: function () {
            this.rTab();
        },
        rTab: function () {
            $(".rw-tab li").on('click', function () {
                var index = $(this).index();
                $(this).addClass('active').siblings().removeClass('active');
                $(".rw-switch > div").eq(index).show().siblings().hide();
            })
        }
    };
    $.fn.gpRegister = function (options) {
        options = $.extend({}, $.fn.gpRegister.options, options);
        this.each(function () {
            new gpRegister($(this), options);
        })
    };
    gpRegister.options = {
    };
})(jQuery);
$(document).ready(function () {
    $(".register-container").gpRegister();
});
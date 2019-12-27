;(function ($) {
    var gpProfile = function (o, options) {
        this.o = o;
        this.options = $.extend({}, gpProfile.options, options);
        this.init();
    };
    gpProfile.prototype = {
        init: function () {
            this.Profile();
            this.City();
            this.UploadFile();
        },
        /**
         * 个人资料--左侧菜单
         */
        Profile: function () {
            this.pMenu();
        },
        pMenu: function () {
            //设置昵称
            $(".btn-edit").on('click', function () {
                $(this).hide();
                $(".set-nickname").show()
            });
            $(".btn-cancel").on('click', function () {
                $('.set-nickname').hide();
                $(".btn-edit").show();
            });

            //菜单
            var bg = $(".pm-bg"),
                menu = $(".profile-menu li"),
                activeMenu = $(".profile-menu li.active");
            bg.css({ "top": (menu.height() * activeMenu.index()) + (activeMenu.index() * 24) });
            menu.on('click', function () {
                $(this).addClass('active').siblings().removeClass();
            }).on('mouseover', function () {
                var index  = $(this).index();
                bg.stop().animate({ top: menu.height() * index + (index * 24) }, 200);//24是li元素中间的间距
            })
            .on('mouseleave', function () {
                var index  = activeMenu.index();
                bg.stop().animate({ top: menu.height() * index + (index * 24) }, 200);//24是li元素中间的间距
            });
        },
        UploadFile: function () {
            this.ufAdd();
        },
        ufAdd: function () {
            $(".file-wrapper .btn-file, .file-thumb .btn-change").on('click', function () {
                $(".input-file").click();
            })
        },
        /**
         * 居住地区--下拉菜单
         */
        City: function () {
            this.cDropdown();
        },
        cDropdown: function () {
            $(".city-wrapper").undelegate(".select-wrapper", 'click').delegate(".select-wrapper", 'click', function (e) {
                e.stopPropagation();
                $(".city-dropdown").show();
            });
            $(".city-dropdown").on( 'click', function (e) {
                e.stopPropagation();
            });
            $(document).add(".btn-close").on('click', function () {
                $(".city-dropdown").hide();
            });
        }
    };
    $.fn.gpProfile = function (options) {
        options = $.extend({}, $.fn.gpProfile.options, options);
        this.each(function () {
            new gpProfile($(this), options);
        })
    };
    gpProfile.options = {

    };
})(jQuery);
$(document).ready(function () {
    $(".profile-container").gpProfile();
});
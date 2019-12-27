var RichmanOpitons = {
    index: 0,
    number: 4
};
(function ($) {
    var Richman = function (o, options) {
        this.o = o;
        this.options = $.extend({}, Richman.options, options);
        this.diceArr = [];
        this.targetIndex = 0;
        this.timer = null;
        this.init();
    };
    Richman.prototype = {
        init: function () {
            this.gridRoll(RichmanOpitons.number);
        },
        gridRoll: function () {
            var _this = this;
            this.targetIndex = RichmanOpitons.index + RichmanOpitons.number;
            function rotate() {
                $(".item-" + RichmanOpitons.index).addClass('active').siblings().removeClass('active');
                RichmanOpitons.index++;
                if (RichmanOpitons.index == _this.targetIndex) {
                    clearInterval(_this.timer);
                }
            }

            clearInterval(this.timer);
            this.timer = setInterval(rotate, 500);
        }
    };
    $.fn.Richman = function (options) {
        options = $.extend({}, $.fn.Richman.options, options);
        this.each(function () {
            new Richman($(this), options);
        })
    };

})(jQuery);
$(document).ready(function(){
    $(".btn-start").on('click', function () {
        $(".wrap").Richman();
    })
})
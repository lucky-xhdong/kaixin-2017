(function () {
    $.fn.marquee = function () {
        var scrtime, $this = $(this);
        $this.hover(function () {
            clearInterval(scrtime);
        }, function () {
            scrtime = setInterval(function () {
                var $ul = $this.find("ul");
                var liHeight = $ul.find("li:last").height();
                $ul.animate({marginTop: liHeight + 40 + "px"}, 1000, function () {
                    $ul.find("li:last").prependTo($ul);
                    $ul.find("li:first").hide();
                    $ul.css({marginTop: 0});
                    $ul.find("li:first").fadeIn(1000);
                });
            }, 3000);
        }).trigger("mouseleave");
    }
})(jQuery);

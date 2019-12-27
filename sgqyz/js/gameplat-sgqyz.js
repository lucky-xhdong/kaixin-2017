//新闻列表切换
function tabSwitchEvent(nav, con) {
    nav.click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        var index = $(this).index();
        con.eq(index).show().siblings().hide();
    })
}

//游戏截图根据尺寸控制图片大小
function changeWindowSize() {
    var width = $(window).width();
    if(width && width < 1200) {
        new Youxijietu('gameScreenshots',
            {
                oWidth:1000,//外框宽度
                oHeight: 290,//外框高度
                bWidth: 375,//大图宽度
                bHeight: 210,//大图高度
                sWidth: 275,//小图宽度
                sHeight: 155//小图高度
            }
        );
    }else {
        new Youxijietu('gameScreenshots',
            {
                oWidth: 1200,//外框宽度
                oHeight: 290,//外框高度
                bWidth: 435,//大图宽度
                bHeight: 245,//大图高度
                sWidth: 345,//小图宽度
                sHeight: 195//小图高度
            }
        );
    }
}

//开始按钮动画
function btnStartEffect(obj){
    var left = 0, timer=null, start = false;
    clearInterval(timer);
    function run(){
        if(typeof obj != 'undefined') {
            start = true;
            left += 307;
            if (left == 1535) {
                left = 0;
            }
            $(obj).css({
                'background-position': -left + 'px 0px',
                'background-size': '1535px 144px'
            })
        }
    }
    timer = setInterval(run, 250);
    $(obj).hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(run, 250);
    })
}

$(document).ready(function () {
    //武将库
    new Wujiangku('wujiangku',
        {
            oWidth:688,//外框宽度
            oHeight: 370,//外框高度
            bWidth: 211,//大图宽度
            bHeight: 304,//大图高度
            sWidth: 168,//小图宽度
            sHeight: 258,//小图高度
            animateImgs: [
                'images/gongsunzan.gif',
                'images/zhurong.gif',
                'images/sunshangxiang.gif',
                'images/guanyu.gif',
                'images/zhangfei.gif',
                'images/huangzhong.gif'
            ],
            animateDelay: 200//gif图默认播放时间
        }
    );
    $(".sgqyz-moudle-03, .smoove-wrapper").addClass( 'moduleEffect' );
    $(window).on( 'scroll', function(){
        scrollTop = $(window).scrollTop();

        scrollTop > 100 && $(".sgqyz-moudle-03").addClass( 'moduleEffect' );
        scrollTop < 20 && $(".sgqyz-moudle-03").removeClass( 'moduleEffect' );

        scrollTop > 600 && $(".smoove-wrapper").addClass( 'moduleEffect');
        scrollTop < 100 && $(".smoove-wrapper").removeClass( 'moduleEffect' );

    });
    changeWindowSize();//根据尺寸控制图片大小
    tabSwitchEvent($(".news-lists nav li"), $(".news-lists .con > div"));//新闻列表切换

    //开始按钮动画
    btnStartEffect(".bg-start-lg");

    //步兵/攻兵/骑兵/机械兵切换
    $(".arms-bubing").categorySlide();
    $(".arms-gongbing").categorySlide();
    $(".arms-qibing").categorySlide();
    $(".arms-jixie").categorySlide();

    //背景图轮播
    $('.bg-carousel').bgCarousel({
        items: '.bg-carousel li',
        pageWrapper: '.bg-carousel-pager',
        pager: true
    });
    //第一屏轮播图
    $('.bxslider-01').fsCarousel({
        pager: true
    });
    //合作媒体轮播图
    $('.bxslider-05').bxSlider({
        slideWidth: 150,
        minSlides: 1,
        maxSlides: 2,
        ticker: true,
        speed: 10000
    });
});
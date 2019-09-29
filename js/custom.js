/* JS Document */

/******************************

 [Table of Contents]

 1. Vars and Inits
 2. Init Menu
 3. Init Home SLider
 4. Init Isotope


 ******************************/


(function($) {
    
    $(document).ready(function() {
        "use strict";
        ss.init();
        window.initlOwlCarousel = ss.initlOwlCarousel;
        window.initCountd = ss.initCountd;
        window.initMagnificPopup = ss.initMagnificPopup;
        
    });

    var ss = {
        init: function() {
            //this.initInstafeed();
            this.initMagnificPopup();
            this.initOnTop();
        },
        initMagnificPopup:function(){
            $('.iframe-link').magnificPopup({
                type:'iframe',
                fixedContentPos: true,
                fixedBgPos: true,
                overflowY: 'auto',
                closeBtnInside: true,
                closeOnContentClick: true,
                preloader: true,
                midClick: true,
                removalDelay: 300,
                mainClass: 'my-mfp-zoom-in',
                gallery: {  enabled: false }
            });
        },
        initCountd: function() {
            $('[data-date]').each(function() {
                var $this = $(this), finalDate = $(this).data('date');
                $this.countdown(finalDate, function(event) {
                $this.html(event.strftime('<div class="deals-time day"><div class="num-time">%D</div><div class="title-time">days</div></div> <div class="deals-time hour"><div class="num-time">%H</div> <div class="title-time">hours</div></div><div class="deals-time minute"><div class="num-time">%M</div><div class="title-time">mins</div></div><div class="deals-time second"><div class="num-time">%S</div><div class="title-time">secs</div></div>'));
                });
            }); 
        },
        initInstafeed:function(){
            if ($('.instagram-slide').length) {
                var feed = new Instafeed({
                get: 'user',
                userId: '7703552354',
                accessToken: '7703552354.1677ed0.3e0ef38604284bc18f32f20fead87821',
                resolution: 'low_resolution',
                template: '<div className="instagram-item"><a href="{'+'{link}}" id="{'+'{id}}"><img className="card-image" src="{'+'{image}}" /></a></div>',
                sortBy: 'most-recent',
                limit: 4,
                links: true,
                after: function() {
                
                    $('.instagram-slide').owlCarousel(
                        {
                        nav: 					true,
                        dots:					false,
                        speed:				5000,
                        loop:					false,
                        addClassActive:		true,
                        lazyLoad:				true,
                        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                        navClass: ["owl-prev", "owl-next"],
                        items:1,
                        margin: 0
                        
                    });
                }
                });
                feed.run();
            }
            
        },
        initlOwlCarousel: function() {
           
            $(".ss-carousel").each(function(){
              var slider = $(this);
              var nav 		= slider.data("nav"),
                  dots		= slider.data("dots"),
                  autoplay 	= slider.data("autoplay"),
                  autospeed 	= slider.data("autospeed"),
                  speed 		= slider.data("speed"),
                  column1 	= slider.data("column1"),
                  column2 	= slider.data("column2"),
                  column3 	= slider.data("column3"),
                  column4 	= slider.data("column4"),
                  column5 	= slider.data("column5"),
                  margin		= slider.data("margin"),
                  lazyLoad	= slider.data("lazyLoad"),
                  rtl         = slider.data("rtl");
               
                  slider.owlCarousel(
                    {
                    nav: 					nav,
                    dots:					dots,
                    margin:				margin,
                    autoplay:				autoplay,
                    autospeed: 			autospeed,
                    speed:				speed,
                    loop:					false,
                    addClassActive:		true,
                    lazyLoad:				lazyLoad,
                    rtl:					 rtl,
                    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                    navClass: ["owl-prev", "owl-next"],
                    afterAction: 			FirstLastActiveItem,
                    responsive:{
                    0:{
                        items:1,
                        margin: 10
                    },
                    321:{
                        items:column5,
                        margin: 10
                    },
                    568:{
                        items:column4,
                        margin: 16
                    },
                    768:{
                        items:column3,
                        margin: 16
                    },
                    992:{
                        items:column2,
                        nav: nav,
                    },
                    1200:{
                        items:column1,
                        nav: nav,
                    }
                    }
                
                });
                function FirstLastActiveItem(el){
                    el.find(".owl-item").removeClass("first");
                    el.find(".owl-item.active").first().addClass("first");
                    el.find(".owl-item").removeClass("last");
                    el.find(".owl-item.active").last().addClass("last");
                }
             
            });
        },
        initHomeSlider:function(){
            if ($('.home_slider').length) {
                
                var homeSlider = $('.home_slider');
                homeSlider.owlCarousel(
                    {
                        items: 1,
                        loop: false,
                        autoplay: false,
                        nav : true,
                        navClass: ["owl-prev", "owl-next"],
                        navText: [' ', ' '],
                        smartSpeed: 1200
                    });
    
               
    
            }
        },
        initBannerSlider:function(){
            var bannerSlider = $('.image-slider');
            bannerSlider.slick({
                dots: true,
                arrows: false,
                vertical: true,
                verticalSwiping:true,
                infinite: true,
                autoplay: true,
                    autoplaySpeed: 2000,
                customPaging : function(slider, i) {
                    var thumb = $(slider.$slides[i]).data();
                    var value = '<span>'+(i+1)+'</span>';
                    if (($(slider).length) <= 8) {
                    value = '<span>0'+(i+1)+'</span>';
                    }
                    return value;
                },
            })
    
            
        },
        initOnTop:function(){
            $("#goToTop").addClass("hidden-top");
            $(window).scroll(function () {
            if ($(this).scrollTop() === 0) {
                $("#goToTop").addClass("hidden-top")
            } else {
                $("#goToTop").removeClass("hidden-top")
            }
            });
            $('#goToTop').click(function () {
            $('body,html').animate({scrollTop:0}, 1200);
            return false;
            });
        
        }
    };
})(jQuery)


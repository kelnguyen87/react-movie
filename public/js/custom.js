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

        window.initlOwlCarousel = ss.initlOwlCarousel;
        window.initHomeSlider = ss.initHomeSlider;
        window.initOnTop = ss.initOnTop();
        window.init = ss.init();

    });

    var ss = {
        init: function() {

            this.toggleSearch();
            this.initSmartSearch();
        },
        mymodal:function(){

            $('[data-toggle]').click(function (e) {
                var $this   = $(this),
                 target = $this.attr('data-target');  // strip for ie7
                if ($this.is('a')) e.preventDefault()

                $(target).on('show.bs.modal', function (showEvent) {

                    if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
                    /*$(target).one('hidden.bs.modal', function () {
                        $this.is(':visible') && $this.trigger('focus')
                    })*/
                })
            })

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
            var $instances = $('[data-zs-src]');
            if ($instances.length > 0) {
                $instances.each( function(index) {
                    var $this = $(this);
                    $this.zoomSlider();
                });
            }
        },
        toggleSearch:function () {
            var MqL = 1170;
            $('.cd-search-trigger').on('click', function(event){
                event.preventDefault();

                //toggle search visibility
                $('.cd-search').toggleClass('is-visible');
                $('.cd-search-trigger').toggleClass('search-is-visible');
                $('.cd-overlay').toggleClass('search-is-visible');
                if($(window).width() > MqL && $('.cd-search').hasClass('is-visible')) $('.cd-search').find('input[type="search"]').focus();
                ($('.cd-search').hasClass('is-visible')) ? $('.cd-overlay').addClass('is-visible') : $('.cd-overlay').removeClass('is-visible') ;
            });

        },
        initSmartSearch:function (){
            $('body').bind('click', function(){
                $('.box-results').removeClass('active');
            });
            $('.box-results').on('click', function(e){
                e.stopPropagation();
            });
            $('input[name="Search"]').bind('keyup change', function() {
                var form = $(this).closest('form');
                var resultsList = form.find('.box-results');
                resultsList.addClass('active');
            });

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


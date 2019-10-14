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
        ss.init();
        window.initlOwlCarousel = ss.initlOwlCarousel;
        window.initHomeSlider = ss.initHomeSlider;
        window.initZoomSlider = ss.initZoomSlider;
    });

    var ss = {
        init: function() {
            //this.initInstafeed();
            //this.initMagnificPopup();
            this.initOnTop();
            this.toggleSearch();
            this.initSmartSearch();
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

        initZoomSlider:function(){
            !function(s){function t(i,t){this.element=i,this.$el=s(i),this._defaults=n,this._name=e;var a=this.$el.data(),l={};for(var o in a)if(a.hasOwnProperty(o)&&o.match(/zs[A-Z]/)){var r=o.substr(2);r=r.charAt(0).toLowerCase()+r.slice(1),l[r]=a[o]}return this.settings=s.extend({},n,l,t),null==this.settings.src||this.settings.src.length<1?(console.log("ZoomSlider terminated - invalid input."),void 0):(this.init(),void 0)}var e="zoomSlider",n={src:null,speed:8e3,switchSpeed:800,interval:4500,autoplay:!0,bullets:!0,overlay:"plain"};s.extend(t.prototype,{init:function(){0==s.isArray(this.settings.src)&&(this.settings.src=[this.settings.src]),this.transEndEventNames={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"},this.transEndEventName=this.transEndEventNames[Modernizr.prefixed("transition")],this.support=Modernizr.csstransitions&&Modernizr.csstransforms;var i=Modernizr.prefixed("transform");switch(i=i.replace(/([A-Z])/g,function(s,i){return"-"+i.toLowerCase()}).replace(/^ms-/,"-ms-"),this.transitionProp={transition:i+" "+this.settings.speed+"ms ease-out, opacity "+this.settings.switchSpeed+"ms"},this.numSlides=this.settings.src.length,this.$el.css("position")){case"relative":case"absolute":case"fixed":break;default:this.$el.css("position","relative")}var t=this,e=s("<img />");e.load(function(){1==t.numSlides?t.initSingle():t.initSlideshow()}),e.attr("src",this.settings.src[0])},initSlideshow:function(){var t=this,e=s('<div class="zs-slideshow"></div>'),n=s('<div class="zs-slides"></div>'),a=s('<div class="zs-bullets"></div>');for(i=0;i<this.numSlides;i++){var l=s('<div class="zs-slide zs-slide-'+i+'"></div>');l.css({"background-image":"url('"+this.settings.src[i]+"')"}).appendTo(n);var o=s('<div class="zs-bullet zs-bullet-'+i+'"></div>');o.appendTo(a),0==i&&(l.addClass("active").css("opacity",1),o.addClass("active"))}if(e.append(n).prependTo(this.$el),1==this.settings.bullets&&(e.append(a),e.on("click",".zs-bullet",function(){t.jump(s(this).index())})),this.pos=0,this.pending=null,this.switching=!1,this.$slideshow=e,this.$slides=n.children(".zs-slide"),this.$bullets=a.children(".zs-bullet"),this.$el.addClass("zs-enabled"),"dots"==this.settings.overlay?this.$el.addClass("overlay-dots"):"plain"==this.settings.overlay&&this.$el.addClass("overlay-plain"),this.support){var r=this.$slides.eq(0);r.css("opacity",0).css(this.transitionProp),setTimeout(function(){r.css({opacity:1,transform:"scale(1.0, 1.0)","z-index":2})},50)}1==this.settings.autoplay&&this.play()},initSingle:function(){var i=s('<div class="zs-slideshow"></div>'),t=s('<div class="zs-slides"></div>'),e=s('<div class="zs-slide zs-slide-0"></div>');e.css({"background-image":"url('"+this.settings.src[0]+"')"}).appendTo(t),e.addClass("active").css("opacity",1),i.append(t).prependTo(this.$el),this.$el.addClass("zs-enabled"),"dots"==this.settings.overlay?this.$el.addClass("overlay-dots"):"plain"==this.settings.overlay&&this.$el.addClass("overlay-plain"),this.support&&(e.css("opacity",0).css(this.transitionProp),setTimeout(function(){e.css({opacity:1,transform:"scale(1.0, 1.0)","z-index":2})},50))},jump:function(s){if(s>=this.numSlides)return console.log("ZoomSlider: jump(pos) aborted. supplied index out of range."),void 0;if(this.pos!=s){if(this.switching)return this.pending=s,void 0;var i=this,t=this.$slides.eq(this.pos),e=this.$slides.eq(s);this.support?(this.switching=!0,t.css("z-index",1),e.addClass("active").css(this.transitionProp).css({opacity:1,transform:"scale(1.0, 1.0)","z-index":2}).on(this.transEndEventName,function(s){"opacity"==s.originalEvent.propertyName&&(lastSlideBg=t.css("background-image"),t.removeClass("active").removeAttr("style").css("background-image",lastSlideBg),e.off(i.transEndEventName),i.switching=!1,null!=i.pending&&setTimeout(function(){var s=i.pending;i.pending=null,i.$bullets.eq(s).click()},30))})):(t.removeClass("active"),e.addClass("active")),this.$bullets.eq(this.pos).removeClass("active"),this.$bullets.eq(s).addClass("active"),this.pos=s,this.settings.autoplay&&this.play()}},prev:function(){var s=this.pos-1;0>s&&(s=this.numSlides-1),this.jump(s)},next:function(){var s=this.pos+1;s>=this.numSlides&&(s=0),this.jump(s)},play:function(){null!=this.timer&&clearInterval(this.timer);var s=this;this.settings.autoplay=!0,this.timer=setInterval(function(){s.next()},this.settings.interval)},stop:function(){this.settings.autoplay=!1,clearInterval(this.timer),this.timer=null}}),s.fn[e]=function(i){return this.each(function(){s.data(this,"plugin_"+e)||s.data(this,"plugin_"+e,new t(this,i))})};var a=s("[data-zs-src]");a.length>0&&a.each(function(){var i=s(this);i.zoomSlider()})}(jQuery,window,document);
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


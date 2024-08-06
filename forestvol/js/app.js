"use strict";


$(function () {


    // detect webP support
    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src =
            "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    testWebP(function (support) {
        if (support == true) {
            $("body").addClass("webp");
        } else {
            $("body").addClass("no-webp");
        }
    });

    const isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (
                isMobile.Android() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows()
            );
        },
    };

    function getNavigator() {
        if (isMobile.any() || window.innerWidth < 992) {
            $("body").removeClass("_pc").addClass("_touch");
        } else {
            $("body").removeClass("_touch").addClass("_pc");
        }
    }

    getNavigator();

    $(window).on("resize", () => getNavigator());



    // click handler
    $(document).on('click', function (e) {

        let $target = $(e.target);


        // menu
        if ($target.hasClass('icon-menu')) {
            $(".header").toggleClass("open-menu");
            $("body").toggleClass("lock-menu");
        }

        if ($target.is('.menu')) {
            $(".header").removeClass("open-menu");
            $("body").removeClass("lock-menu");
        }

        // open contacts
        if ($target.is('.header__callback-btn')) {
            $target.toggleClass('active');
            $('.header__body').toggleClass('open-contacts');
            $('.header__callback-body').slideToggle()
        }

        // submenu
        if ($target.is('.menu__link') && $('body').hasClass('_touch')) {

            let $submenu = $target.next();
            if ($submenu.length > 0) {
                e.preventDefault();
            }

            if ($target.hasClass('active')) {

                $target.removeClass('active');
                $submenu.removeClass('active');

            } else {

                $('.menu__link').removeClass('active');
                $('.submenu').removeClass('active');

                $target.addClass('active');
                $submenu.addClass('active');
            }

        }


        // examples tabs
        if ($target.is('.examples__btn')) {
            $target.addClass('active').siblings().removeClass('active');
            $('.examples__image').eq($target.index()).addClass('active fade').siblings().removeClass('active fade')
        }

        //  visual block 
        if ($target.is('.visual__info-btn')) {
            let $currentAction = $target.parent(".visual__info-action");
            let $currentList = $target.next(".visual__info-list");

            if ($target.hasClass('active')) {
                $currentAction.removeClass('active');
                $target.removeClass('active');
                $currentList.slideUp();
            } else {

                $('.visual__info-action').removeClass('active');
                $('.visual__info-btn').removeClass('active');
                $('.visual__info-list').slideUp();


                $currentAction.addClass('active');
                $target.addClass('active');
                $currentList.slideDown();
            }
        }

        //  configurator
        if ($target.is('[data-tab]')) {
            let currentTab = $target.data('tab');
            let tabBtn = $(`[name="config"][value="${currentTab}"]`);
            tabBtn.trigger('change');
            tabBtn.trigger('click');
        }

        if ($target.is('[data-option]')) {
            let currentTab = $target.data('option');
            let tabBtn = $(`[value="${currentTab}"]`);
            tabBtn.trigger('change');
            tabBtn.trigger('click');
            $.fancybox.getInstance().close()
        }

        //  quiz
        if ($target.is('.quiz__controls-next')) {
            updateQuiz()
        }

        if ($target.is('.quiz__controls-prev')) {
            updateQuiz('prev')
        }

        if ($target.is('.quiz__controls-submit')) {
            $('.quiz__main').addClass('hidden');
            $('.quiz__form').removeClass('hidden');
        }


    });


    function updateQuiz(direction = 'next') {

        let currentQuestion = $('.quiz__progressbar-current').text();
        let totalQuestions = $('.quiz__progressbar-total').text();
        let $progressBlock = $('.quiz__progressbar-progress');
        let $prevBtn = $('.quiz__controls-prev');
        let $nextBtn = $('.quiz__controls-next');
        let $submitBtn = $('.quiz__controls-submit');

        if (direction == 'next') {
            +currentQuestion++;
            $('.quiz__progressbar-current').text(currentQuestion);
            $('.quiz__block.active').removeClass('active').next().addClass('active');
            $prevBtn.removeClass('disabled');

            if (currentQuestion == totalQuestions) {

                $submitBtn.removeClass('hidden');
                $nextBtn.addClass('hidden')
            }
        }
        if (direction == 'prev') {
            +currentQuestion--;
            $('.quiz__progressbar-current').text(currentQuestion);
            $('.quiz__block.active').removeClass('active').prev().addClass('active');
            $nextBtn.removeClass('hidden');
            $submitBtn.addClass('hidden');
            if (currentQuestion === 1) {
                $prevBtn.addClass('disabled');
            }
        }

        $progressBlock.css('--progress', ((currentQuestion / totalQuestions) * 100) + "%");

    }


    if ($('[name="config"]').length > 0) {
        $('[name="config"]').on('change', (e) => {

            let $target = $(e.target);
            let currentValue = $target.val()

            $(`.order-more__content#${currentValue}`).addClass('active').siblings().removeClass('active')


        })
    }


    if ($('.materials__item').length > 0) {
        $('.materials__item').on('mouseenter', function (e) {
            $(this).addClass('active');
            $('.materials__point').eq($(this).index()).addClass('active');
        })
        $('.materials__item').on('mouseleave', function (e) {
            $('.materials__item').removeClass('active')
            $('.materials__point').removeClass('active');
        })
        $('.materials__point').on('mouseenter', function (e) {
            $(this).addClass('active');
            $('.materials__item').eq($(this).index()).addClass('active');

        })
        $('.materials__point').on('mouseleave', function (e) {
            $('.materials__item').removeClass('active')
            $('.materials__point').removeClass('active');
        })
    }



    // fancybox settings

    $('[data-fancybox]').fancybox({
        touch: false,
    });




    // sliders

    if ($('.completed-projects__slider').length > 0) {
        $('.completed-projects__slider').slick({
            infinite: false,
            variableWidth: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 576,
                    settings: {
                        variableWidth: false,
                        slidesToShow: 1,
                    }
                }
            ]
        });

    }

    if ($('.projects__slider').length > 0) {
        $('.projects__slider').slick({
            infinite: false,
            variableWidth: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 576,
                    settings: {
                        variableWidth: false,
                        slidesToShow: 1,
                    }
                }
            ]
        });

    }

    if ($('.projects__item-slider').length > 0) {

        $('.projects__item-slider').each(function () {

            $(this).on('init', function (e) {
                let $slider = $(e.target)
                let slides = $slider.find('.projects__item-slide');

                if (slides.length > 0) {
                    getSlickMouseNavbar($slider, slides.length)
                }

            })

            $(this).slick({
                infinite: false,
                variableWidth: true,
                arrows: false,
                dots: true,

                swipe: false
            });


            function getSlickMouseNavbar($slider, quantity) {

                $slider.on('mousemove', function (event) {

                    if (event.target.closest('.slick-dots')) {
                        return;
                    }



                    let sliderWidth = $slider.width();
                    let mouseX = event.pageX - $slider.offset().left;

                    let areaWidth = sliderWidth / quantity;
                    let index = Math.floor(mouseX / areaWidth);

                    $slider.slick('slickSetOption', 'speed', 0, true);
                    $slider.slick('slickGoTo', index);

                    setTimeout(function () {
                        $slider.slick('slickSetOption', 'speed', 300, true);
                    }, 0);
                });
            }

        })

    }


    // header height

    getHeaderHeight();

    function getHeaderHeight() {
        const headerHeight = $('.header').outerHeight();
        $("body").css('--header-height', headerHeight + "px");
        return headerHeight;
    }

    window.addEventListener('resize', () => getHeaderHeight());


    $(window).on('scroll', function () {
        if ($(this).scrollTop() > getHeaderHeight()) {
            $('header').addClass('scroll');
        } else {
            $('header').removeClass('scroll');
        }
    });


    // animation
    gsap.registerPlugin(ScrollTrigger);

    let mainTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".promo",
            start: "top top",
            end: "+=65%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
            onUpdate: function (self) {
                self.animation.timeScale(self.progress);
            },
        }
    });

    mainTl
        .to('.promo__image', {
            marginLeft: "-25%",
            marginRight: "-25%",
            stagger: 0
        })
        .to('.promo__main', {
            y: "100%",
            opacity: 0,
            stagger: 0
        }, 0)
        .to('.promo__overlay', {
            opacity: 0,
            stagger: 0
        }, 0);

    function initGallerySlider() {
        const slides = document.querySelectorAll('.gallery__slide');
        const totalSlides = slides.length;

        gsap.to(slides, {
            xPercent: -100 * (totalSlides - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".gallery__slider",
                pin: true,
                scrub: 1,
                snap: 1 / (totalSlides - 1),
                end: () => "+=" + document.querySelector(".gallery__slider").offsetWidth
            }
        });
    }

    function initProjectCardAnimation() {
        gsap.to('.project-card__main img', {
            yPercent: -15,
            scrollTrigger: {
                trigger: '.project-card',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        });
    }

    function startAnimations() {
        if (window.innerWidth > 992) {
            if ($('.promo').length > 0) {
                mainTl.scrollTrigger.enable();
            }
            if ($('.gallery__slider').length > 0) {
                initGallerySlider();
            }
            if ($('.project-card__main').length > 0) {
                initProjectCardAnimation();
            }
        } else {
            mainTl.scrollTrigger.disable();

        }
    }



    startAnimations();

    window.addEventListener('resize', function () {
        startAnimations();
    });


    // map

    if ($('#map').length > 0) {




        ymaps.ready(function () {
            var myMap = new ymaps.Map('map', {
                center: [55.651344, 37.618423],
                zoom: 10, //
                controls: []
            });



            myMap.controls.remove('geolocationControl');
            myMap.controls.remove('searchControl');
            myMap.controls.remove('trafficControl');
            myMap.controls.remove('typeSelector');
            myMap.controls.remove('fullscreenControl');
            myMap.controls.remove('zoomControl');
            myMap.controls.remove('rulerControl');



        });
    }


});

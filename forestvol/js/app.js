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



        if ($target.hasClass('icon-menu')) {
            $(".header").toggleClass("open-menu");
            $("body").toggleClass("lock-menu");
        }

        if ($target.is('.menu')) {
            $(".header").removeClass("open-menu");
            $("body").removeClass("lock-menu");
        }


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

        //  visual block ++
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



    });


    $('.submenu__link').on('mouseenter', function (e) {
        let $target = $(e.target);
        let $wrapper = $target.closest('.submenu');
        let $imagesWrapper = $wrapper.find('.submenu__images');

        if ($imagesWrapper.length > 0) {
            let $images = $imagesWrapper.find('.submenu__image');
            let indexLink = $target.parent().index();

            $images.eq(indexLink).addClass('active').siblings().removeClass('active');
        }

    });



    // fancybox settings

    $('[data-fancybox]').fancybox({
        touch: false,
    });



    // sliders



    if ($('.gallery__slider').length > 0) {
        let gallerySlider = $('.gallery__slider').slick({
            infinite: false,
            variableWidth: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 576,
                    settings: {
                        variableWidth: false,
                        slidesToShow: 0.95,
                    }
                }
            ]
        });

    }

    if ($('.projects__slider').length > 0) {
        let projects = $('.projects__slider').slick({
            infinite: false,
            variableWidth: true,
            arrows: false,
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









});

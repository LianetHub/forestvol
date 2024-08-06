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


    });



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
    // gsap.registerPlugin(ScrollTrigger);

    // let mainTl = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: ".promo",
    //         start: "top top",
    //         end: "+=65%",
    //         scrub: true,
    //         pin: true,
    //         anticipatePin: 1,
    //         onUpdate: function (self) {
    //             self.animation.timeScale(self.progress);
    //         },
    //     }
    // });

    // mainTl
    //     .to('.promo__image', {
    //         marginLeft: "-25%",
    //         marginRight: "-25%",
    //         stagger: 0
    //     })
    //     .to('.promo__main', {
    //         y: "100%",
    //         opacity: 0,
    //         stagger: 0
    //     }, 0)
    //     .to('.promo__overlay', {
    //         opacity: 0,
    //         stagger: 0
    //     }, 0);

    // function initGallerySlider() {
    //     const slides = document.querySelectorAll('.gallery__slide');
    //     const totalSlides = slides.length;

    //     gsap.to(slides, {
    //         xPercent: -100 * (totalSlides - 1),
    //         ease: "none",
    //         scrollTrigger: {
    //             trigger: ".gallery__slider",
    //             pin: true,
    //             scrub: 1,
    //             snap: 1 / (totalSlides - 1),
    //             end: () => "+=" + document.querySelector(".gallery__slider").offsetWidth
    //         }
    //     });
    // }

    // function initProjectCardAnimation() {
    //     gsap.to('.project-card__main img', {
    //         yPercent: -15,
    //         scrollTrigger: {
    //             trigger: '.project-card',
    //             start: 'top top',
    //             end: 'bottom top',
    //             scrub: true,
    //         }
    //     });
    // }

    // function startAnimations() {
    //     if (window.innerWidth > 992) {
    //         if (document.querySelector('.promo')) {
    //             mainTl.scrollTrigger.enable();
    //         }
    //         if (document.querySelector('.gallery__slider')) {

    //             initGallerySlider();
    //         }
    //         if (document.querySelector('.project-card__main')) {
    //             initProjectCardAnimation();
    //         }
    //     } else {
    //         mainTl.scrollTrigger.disable();

    //     }
    // }



    // startAnimations();

    // window.addEventListener('resize', function () {
    //     startAnimations();
    // });


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






    // move block on adaptive

    function DynamicAdapt(type) {
        this.type = type;
    }

    DynamicAdapt.prototype.init = function () {
        const _this = this;
        this.оbjects = [];
        this.daClassname = "_dynamic_adapt_";
        this.nodes = document.querySelectorAll("[data-da]");


        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            const data = node.dataset.da.trim();
            const dataArray = data.split(",");
            const оbject = {};
            оbject.element = node;
            оbject.parent = node.parentNode;
            оbject.destination = document.querySelector(dataArray[0].trim());
            оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
            оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.оbjects.push(оbject);
        }

        this.arraySort(this.оbjects);


        this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
            return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
        }, this);
        this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
            return Array.prototype.indexOf.call(self, item) === index;
        });


        for (let i = 0; i < this.mediaQueries.length; i++) {
            const media = this.mediaQueries[i];
            const mediaSplit = String.prototype.split.call(media, ',');
            const matchMedia = window.matchMedia(mediaSplit[0]);
            const mediaBreakpoint = mediaSplit[1];


            const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
                return item.breakpoint === mediaBreakpoint;
            });
            matchMedia.addListener(function () {
                _this.mediaHandler(matchMedia, оbjectsFilter);
            });
            this.mediaHandler(matchMedia, оbjectsFilter);
        }
    };

    DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
        if (matchMedia.matches) {
            for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            }
        } else {
            for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                if (оbject.element.classList.contains(this.daClassname)) {
                    this.moveBack(оbject.parent, оbject.element, оbject.index);
                }
            }
        }
    };


    DynamicAdapt.prototype.moveTo = function (place, element, destination) {
        element.classList.add(this.daClassname);
        if (place === 'last' || place >= destination.children.length) {
            destination.insertAdjacentElement('beforeend', element);
            return;
        }
        if (place === 'first') {
            destination.insertAdjacentElement('afterbegin', element);
            return;
        }
        destination.children[place].insertAdjacentElement('beforebegin', element);
    }


    DynamicAdapt.prototype.moveBack = function (parent, element, index) {
        element.classList.remove(this.daClassname);
        if (parent.children[index] !== undefined) {
            parent.children[index].insertAdjacentElement('beforebegin', element);
        } else {
            parent.insertAdjacentElement('beforeend', element);
        }
    }


    DynamicAdapt.prototype.indexInParent = function (parent, element) {
        const array = Array.prototype.slice.call(parent.children);
        return Array.prototype.indexOf.call(array, element);
    };


    DynamicAdapt.prototype.arraySort = function (arr) {
        if (this.type === "min") {
            Array.prototype.sort.call(arr, function (a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) {
                        return 0;
                    }

                    if (a.place === "first" || b.place === "last") {
                        return -1;
                    }

                    if (a.place === "last" || b.place === "first") {
                        return 1;
                    }

                    return a.place - b.place;
                }

                return a.breakpoint - b.breakpoint;
            });
        } else {
            Array.prototype.sort.call(arr, function (a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) {
                        return 0;
                    }

                    if (a.place === "first" || b.place === "last") {
                        return 1;
                    }

                    if (a.place === "last" || b.place === "first") {
                        return -1;
                    }

                    return b.place - a.place;
                }

                return b.breakpoint - a.breakpoint;
            });
            return;
        }
    };

    const da = new DynamicAdapt("max");
    da.init();






});

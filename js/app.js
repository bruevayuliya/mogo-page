$(function () {

    var header = $("#header"),
        introH = $("#intro").innerHeight(),
        scrollOffset = $(window).scrollTop();


    /* Fixed Header */
    checkScroll(scrollOffset);

    $(window).on("scroll", function () {
        scrollOffset = $(this).scrollTop();

        checkScroll(scrollOffset);
    });

    function checkScroll(scrollOffset) {
        if (scrollOffset >= introH) {
            header.addClass("fixed");
        } else {
            header.removeClass("fixed");
        }
    }



    /* Smooth scroll */
    $("[data-scroll]").on("click", function (event) {
        event.preventDefault();
        let $this = $(this);
        let blockId = $this.data('scroll');
        let blockOffset = $(blockId).offset().top;

        $("#nav a").removeClass("active");
        $this.addClass("active");

        $("html, body").animate({
            scrollTop: blockOffset
        },1000);

        toggle_menu_active();

    });



    /* Menu nav toggle */
    $("#nav_toggle").on("click", function (event) { 
        event.preventDefault();
        toggle_menu_active();
    });

    function toggle_menu_active() {
        $("#nav_toggle").toggleClass("active"); 
        $("#nav").toggleClass("active"); 
    }



    /* Collapse */
    $("[data-collapse]").on("click", function (event) {
        event.preventDefault();

        var $this = $(this),
            blockId = $this.data('collapse');

        $this.toggleClass("active");
    });


    /* Slider */
    $("[data-slider]").slick({
        infinite: true,
        fade: false,
        slidesToShow: 1,
        slidesToScroll: 1
    });


    $(window).on('resize scroll', function () {
        if (isInViewport($('#statistics'))) {
            update_statistics();
        }
    });


    function update_statistics() {
        let wrapper = $('#statistics');
        if (!wrapper.hasClass("executed")) {
            $(".stat_count").each(function () {
                $(this).prop("Counter", 0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 4000,
                    easing: "swing",
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
            wrapper.addClass("executed");
        }

    }

});


function isInViewport(element) {
    var elementTop = element.offset().top;
    var elementBottom = elementTop + element.outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};
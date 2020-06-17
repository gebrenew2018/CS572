$(document).ready(function() {

    // banner
    $("#banner-area .owl-carousel").owlCarousel({
        dots: true,
        items: 1
    });

    $("#top-sale .owl-carousel").owlCarousel({
        loop: true,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });
    // var nav = document.getElementById('topNav');
    // window.onscroll = () => {
    // if (window.pageYOffset > 100) {
    //     nav.style.position = "fixed";
    //     nav.style.top = 0;
    // } else {
    //     nav.style.position = "absolute";
    // }
    // }
    $(window).on('scroll', function() {
            if ($(window).scrollTop()) {
                $('nav').addClass('black');
            } else {
                $('nav').removeClass('black');
            }
        })
        // var doc = new jsPDF();

    // function saveDiv(divId, title) {
    //     doc.fromHTML(`<html><head><title>${title}</title></head><body>` + document.getElementById(divId).innerHTML + `</body></html>`);
    //     doc.save('div.pdf');
    // }
});
$(function(){

    $(".gnb").mouseenter(function(){

        $(".gnb-bg, .depth2")
            .stop(true, true)
            .slideDown(400);

    });

    $("#header").mouseleave(function(){

        $(".gnb-bg, .depth2")
            .stop(true, true)
            .slideUp(400);

    });

});

/* =========================
   Swiper Slide
========================= */

const mainSwiper = new Swiper(".mainSwiper", {

    /* 무한 반복 */
    loop: true,


    /* 자동 슬라이드 */
    autoplay: {

        /* 3초마다 실행 */
        delay: 3000,

        /* 사용자가 버튼을 눌러도 자동재생 유지 */
        disableOnInteraction: false,

    },


    /* 슬라이드 속도 */
    speed: 700,


    /* 좌우 버튼 */
    navigation: {

        nextEl: ".swiper-button-next",

        prevEl: ".swiper-button-prev",

    },


    /* 슬라이드가 바뀔 때 */
    on: {

        slideChange: function(){

            /* 현재 슬라이드 번호 */
            const currentNumber = this.realIndex + 1;

            $(".slide-count .current").text(currentNumber);

        }

    }

});
$(function(){


    /* =========================================
        메인 메뉴 hover

        slideDown / slideUp이 아닌
        fadeIn / fadeOut 사용
    ========================================== */

    $(".gnb").mouseenter(function(){

        $(".depth2")
            .stop(true, true)
            .fadeIn(180);

        $(".sub-bg")
            .stop(true, true)
            .fadeIn(180);

    });



    /* =========================================
        메뉴에서 마우스가 빠지면
        2차 메뉴 숨김
    ========================================== */

    $(".header-bottom, .sub-bg").mouseleave(function(){

        $(".depth2")
            .stop(true, true)
            .fadeOut(180);

        $(".sub-bg")
            .stop(true, true)
            .fadeOut(180);

    });



    /* =========================================
        메인 배너 슬라이드 개수

        현재 5개
    ========================================== */

    const bannerTotal =
        $(".main-banner-swiper .swiper-slide").length;


    $(".banner-total").text(bannerTotal);



    /* =========================================
        메인 배너 Swiper
    ========================================== */

    const mainBannerSwiper = new Swiper(
        ".main-banner-swiper",
        {

            /* 무한 반복 */
            loop: true,


            /* 슬라이드 속도 */
            speed: 700,


            /* =========================================
                3초마다 자동 실행

                웹페이지 로딩 직후
                자동으로 시작
            ========================================== */
            autoplay: {

                delay: 3000,

                disableOnInteraction: false

            },


            /* =========================================
                좌우 방향 버튼
            ========================================== */
            navigation: {

                prevEl: ".banner-prev",

                nextEl: ".banner-next"

            },


            /* =========================================
                초기 페이지 번호
            ========================================== */
            on: {

                init: function(){

                    $(".banner-current").text(
                        this.realIndex + 1
                    );

                },


                /* =========================================
                    슬라이드가 변경될 때마다
                    현재 번호 변경
                ========================================== */
                slideChange: function(){

                    $(".banner-current").text(
                        this.realIndex + 1
                    );

                }

            }

        }
    );



    /* =========================================
        자동재생 상태
    ========================================== */

    let bannerPlaying = true;



    /* =========================================
        정지 / 재생 버튼
    ========================================== */

    $(".banner-stop").click(function(){

        /* 현재 재생 중일 경우 */
        if(bannerPlaying === true){

            /* 자동재생 정지 */
            mainBannerSwiper.autoplay.stop();

            bannerPlaying = false;

            $(this)
                .addClass("play")
                .attr(
                    "aria-label",
                    "자동재생 시작"
                );

        }


        /* 현재 정지 상태일 경우 */
        else{

            /* 자동재생 다시 시작 */
            mainBannerSwiper.autoplay.start();

            bannerPlaying = true;

            $(this)
                .removeClass("play")
                .attr(
                    "aria-label",
                    "자동재생 정지"
                );

        }

    });


});

/* =========================================
    쿠폰 Swiper

    - 한 화면에 4개
    - 3초마다 1개씩 이동
    - 마지막에서 처음으로 자연스럽게 연결
    - 자동재생은 항상 다음 방향
========================================= */

const couponSwiper = new Swiper(".coupon-swiper", {

    /* 한 화면에 보여줄 카드 수 */
    slidesPerView: 4,


    /* 카드 사이 간격 */
    spaceBetween: 14,


    /* 한 번에 1개씩 이동 */
    slidesPerGroup: 1,


    /* =========================================
        무한 반복

        마지막 카드 다음에
        첫 번째 카드가 자연스럽게 이어짐
    ========================================== */
    loop: true,


    /* 이동 애니메이션 속도 */
    speed: 600,


    /* =========================================
        3초마다 자동으로
        다음 카드 1개 이동
    ========================================== */
    autoplay: {

        delay: 3000,

        disableOnInteraction: false,

        /* 역방향 금지 */
        reverseDirection: false

    },


    /* =========================================
        좌우 버튼
    ========================================== */
    navigation: {

        prevEl: ".coupon-prev",

        nextEl: ".coupon-next"

    }

});


/* =========================================
    이달의 핫메뉴 탭
========================================= */

$(".hot-tabs a").click(function(e){

    /* 링크 기본 이동 막기 */
    e.preventDefault();


    /* 클릭한 탭의 콘텐츠 ID 가져오기 */
    const tabId = $(this).attr("data-tab");


    /* =========================================
        탭 활성 상태 변경
    ========================================== */

    $(".hot-tabs li").removeClass("active");

    $(this)
        .parent()
        .addClass("active");


    /* =========================================
        모든 콘텐츠 숨김
    ========================================== */

    $(".hot-tab-content")
        .removeClass("active")
        .hide();


    /* =========================================
        선택한 콘텐츠만 표시
    ========================================== */

    $("#" + tabId)
        .addClass("active")
        .fadeIn(200);

});

/* =========================================
    Family Site

    클릭하면 리스트를 위쪽으로
    slideToggle 방식으로 열기 / 닫기
========================================= */
$(".family-btn").click(function(){

    $(".family-list")
        .stop()
        .slideToggle(250);

});


/* =========================================
    TOP 버튼

    스크롤을 내리면 버튼 표시
    클릭하면 페이지 맨 위로 이동
========================================= */
$(window).scroll(function(){

    if($(this).scrollTop() > 300){

        $(".top-btn")
            .stop()
            .fadeIn(200);

    }else{

        $(".top-btn")
            .stop()
            .fadeOut(200);

    }

});


/* =========================================
    TOP 버튼 클릭
========================================= */
$(".top-btn").click(function(){

    $("html, body")
        .stop()
        .animate({
            scrollTop: 0
        }, 500);

});

/* =========================================
    팝업창

    웹페이지가 로딩되면 팝업창을 보여준다.

    단,
    오늘 하루 닫기를 클릭한 경우에는
    오늘 날짜 동안 팝업창을 보여주지 않는다.
========================================= */

$(document).ready(function(){


    /* =========================================
        오늘 날짜 구하기
    ========================================== */

    var today = new Date();

    var todayDate =
        today.getFullYear() + "-" +
        (today.getMonth() + 1) + "-" +
        today.getDate();


    /* =========================================
        저장되어 있는 팝업 닫기 날짜 가져오기
    ========================================== */

    var popupDate = localStorage.getItem("popupDate");


    /* =========================================
        저장된 날짜와 오늘 날짜가 다르면
        팝업창 보여주기
    ========================================== */

    if(popupDate !== todayDate){

        $(".popup-bg")
            .css("display", "flex")
            .hide()
            .fadeIn(300);

    }


    /* =========================================
        일반 닫기 버튼

        팝업창만 닫는다.
        새로고침하면 다시 보여진다.
    ========================================== */

    $(".popup-close-btn").click(function(){

        $(".popup-bg").fadeOut(300);

    });


    /* =========================================
        오늘 하루 닫기 버튼

        오늘 날짜를 localStorage에 저장하고
        팝업창을 닫는다.
    ========================================== */

    $(".popup-today-btn").click(function(){

        localStorage.setItem(
            "popupDate",
            todayDate
        );

        $(".popup-bg").fadeOut(300);

    });


});
const mainBannerSwiper = new Swiper(".main-banner", {
    // 가로 방향 슬라이드
    direction: "horizontal",

    // 무한 반복
    loop: true,

    // 슬라이드 전환 속도
    speed: 700,

    // 자동 재생
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    // 페이지 표시
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    // 이전·다음 버튼
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
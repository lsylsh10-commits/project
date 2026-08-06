// 내가만든 자바 스크립트 코드 안에 붙여넣기 한다.
const swiper = new Swiper('.swiper', {
  // Optional parameters
//   슬라이드 애니메이션 방향
  direction: 'horizontal',

// 슬라이드를 페이드인 아웃
//  effect:'fade',

//   반복재생
  loop: true,

//   자동슬라이드 실행
 autoplay:{
    delay:3000,
 },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    // 페이지 버튼에 하이퍼링크 거는 설정
    clickable:true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});
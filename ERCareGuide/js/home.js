"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const app = document.querySelector(".app");
  const menuWrap = document.querySelector(".mobile-menu-wrap");
  const menuPanel = document.querySelector(".mobile-menu-panel");
  const menuOpenButton = document.querySelector(".menu-open-button");
  const menuCloseButton = document.querySelector(".menu-close-button");
  const menuOverlay = document.querySelector(".menu-overlay");

  let previouslyFocusedElement = null;

  /*
    메인 배너 Swiper
    - 4초 간격 자동재생
    - 사용자 조작 후 자동재생 유지
    - 페이지네이션 클릭 이동
  */
  if (typeof Swiper !== "undefined") {
    new Swiper(".main-banner-swiper", {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 600,
      loop: true,
      grabCursor: true,

      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false
      },

      pagination: {
        el: ".main-banner-swiper .swiper-pagination",
        clickable: true
      },

      keyboard: {
        enabled: true,
        onlyInViewport: true
      },

      a11y: {
        enabled: true,
        prevSlideMessage: "이전 배너",
        nextSlideMessage: "다음 배너",
        firstSlideMessage: "첫 번째 배너입니다",
        lastSlideMessage: "마지막 배너입니다",
        paginationBulletMessage: "{{index}}번째 배너로 이동"
      }
    });
  }

  function openMenu() {
    if (!menuWrap || !menuOpenButton || !app) {
      return;
    }

    previouslyFocusedElement = document.activeElement;

    menuWrap.classList.add("open");
    app.classList.add("menu-active");
    document.body.classList.add("menu-open");

    menuWrap.setAttribute("aria-hidden", "false");
    menuOpenButton.setAttribute("aria-expanded", "true");

    window.setTimeout(function () {
      if (menuPanel) {
        menuPanel.focus();
      }
    }, 320);
  }

  function closeMenu() {
    if (!menuWrap || !menuOpenButton || !app) {
      return;
    }

    menuWrap.classList.remove("open");
    app.classList.remove("menu-active");
    document.body.classList.remove("menu-open");

    menuWrap.setAttribute("aria-hidden", "true");
    menuOpenButton.setAttribute("aria-expanded", "false");

    if (
      previouslyFocusedElement &&
      typeof previouslyFocusedElement.focus === "function"
    ) {
      previouslyFocusedElement.focus();
    }
  }

  if (menuOpenButton) {
    menuOpenButton.addEventListener("click", openMenu);
  }

  if (menuCloseButton) {
    menuCloseButton.addEventListener("click", closeMenu);
  }

  if (menuOverlay) {
    menuOverlay.addEventListener("click", closeMenu);
  }

  /*
    키보드 Esc를 누르면 메뉴 닫기
  */
  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Escape" &&
      menuWrap &&
      menuWrap.classList.contains("open")
    ) {
      closeMenu();
    }
  });
});
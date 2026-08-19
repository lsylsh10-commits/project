const hamburger = document.querySelector(".mobile-hamburger");
const mobileMenuPanel = document.querySelector(".mobile-menu-panel");

hamburger.addEventListener("click", function () {
    mobileMenuPanel.classList.toggle("active");
});
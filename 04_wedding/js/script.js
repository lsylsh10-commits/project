// =========================================
// 기본 설정
// =========================================

// Google Apps Script 배포 URL
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyXQ_zl50MwzlB360MQIZ1F7jXpHnbHm9g-Wv4IODVnXnEzJvPkVYvR7TD4QXnYh0XCSQ/exec";

// 결혼식 목표 시간: 2026-09-05 12:00 (KST)
const WEDDING_TIME = new Date("2026-09-05T12:00:00+09:00").getTime();


// =========================================
// 스크롤 Fade Up 애니메이션
// 화면 아래에 있던 요소가 부드럽게 위로 올라오며 나타납니다.
// =========================================
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -4% 0px"
    }
  );

  revealElements.forEach(function(element) {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(function(element) {
    element.classList.add("is-visible");
  });
}


// =========================================
// 실시간 결혼식 카운트다운
// =========================================
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const countdownMessage = document.getElementById("countdownMessage");

function animateNumber(element, value) {
  const nextValue = String(value).padStart(2, "0");

  if (element.textContent !== nextValue) {
    element.classList.add("tick");

    setTimeout(function() {
      element.textContent = nextValue;
      element.classList.remove("tick");
    }, 120);
  }
}

function updateCountdown() {
  const distance = WEDDING_TIME - Date.now();

  if (distance <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    countdownMessage.textContent = "함께 축복해 주셔서 감사합니다.";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  animateNumber(daysEl, days);
  animateNumber(hoursEl, hours);
  animateNumber(minutesEl, minutes);
  animateNumber(secondsEl, seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);


// =========================================
// 카카오맵
// index.html의 YOUR_KAKAO_JAVASCRIPT_KEY에 키를 입력하세요.
// =========================================
const mapContainer = document.getElementById("map");

function initKakaoMap() {
  if (!mapContainer) return;

  if (
    typeof kakao === "undefined" ||
    !kakao.maps ||
    typeof kakao.maps.load !== "function"
  ) {
    return;
  }

  kakao.maps.load(function() {
    // 서울 신라호텔 영빈관 부근
    const venuePosition = new kakao.maps.LatLng(37.5565, 127.0052);

    const mapOption = {
      center: venuePosition,
      level: 3
    };

    mapContainer.innerHTML = "";

    const map = new kakao.maps.Map(mapContainer, mapOption);

    const marker = new kakao.maps.Marker({
      position: venuePosition
    });

    marker.setMap(map);

    const infoWindow = new kakao.maps.InfoWindow({
      content:
        '<div style="padding:8px 10px;font-size:12px;white-space:nowrap;">서울 신라호텔 영빈관</div>'
    });

    infoWindow.open(map, marker);

    // 지도가 숨겨진 reveal 상태에서 생성되어도 크기가 어긋나지 않도록 보정
    setTimeout(function() {
      map.relayout();
      map.setCenter(venuePosition);
    }, 500);

    window.addEventListener("resize", function() {
      map.relayout();
      map.setCenter(venuePosition);
    });
  });
}

initKakaoMap();


// =========================================
// 갤러리 라이트박스
// =========================================
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.querySelector(".lightbox__close");
const galleryItems = document.querySelectorAll(".gallery__item");

galleryItems.forEach(function(item) {
  item.addEventListener("click", function() {
    lightboxImage.src = item.dataset.full;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", function(event) {
    if (event.target === lightbox) closeLightbox();
  });
}


// =========================================
// 계좌번호 아코디언
// =========================================
document.querySelectorAll(".accordion__button").forEach(function(button) {
  button.addEventListener("click", function() {
    const accordion = button.closest(".accordion");
    const isOpen = accordion.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});


// =========================================
// 클립보드 복사
// =========================================
async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    alert(successMessage);
  } catch (error) {
    const temp = document.createElement("textarea");
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    temp.remove();
    alert(successMessage);
  }
}

document.querySelectorAll(".copy-account").forEach(function(button) {
  button.addEventListener("click", function() {
    copyText(button.dataset.account, "계좌번호가 복사되었습니다.");
  });
});

const copyAddressButton = document.getElementById("copyAddress");

if (copyAddressButton) {
  copyAddressButton.addEventListener("click", function() {
    copyText("서울특별시 중구 동호로 249", "주소가 복사되었습니다.");
  });
}


// =========================================
// 모바일 공유 기능
// =========================================
const shareButton = document.getElementById("shareButton");

if (shareButton) {
  shareButton.addEventListener("click", async function() {
    const shareData = {
      title: "김민혁 ♥ 이서영 결혼합니다",
      text: "2026년 9월 5일 토요일 낮 12시, 서울 신라호텔 영빈관",
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await copyText(window.location.href, "청첩장 링크가 복사되었습니다.");
      }
    } catch (error) {
      // 사용자가 공유창을 닫은 경우 별도 동작 없음
    }
  });
}


// =========================================
// 방명록 - Google Spreadsheet 저장
// =========================================
const guestbookForm = document.getElementById("guestbookForm");
const formStatus = document.getElementById("formStatus");
const guestbookList = document.getElementById("guestbookList");

if (guestbookForm) {
  guestbookForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const submitButton = guestbookForm.querySelector('button[type="submit"]');
    const formData = new FormData(guestbookForm);
    const name = String(formData.get("name") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !message) {
      formStatus.textContent = "이름과 축하 메시지를 모두 입력해 주세요.";
      return;
    }

    if (!SCRIPT_URL) {
      formStatus.textContent =
        "js/script.js의 SCRIPT_URL에 Google Apps Script 배포 주소를 입력해 주세요.";
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "등록 중...";
    formStatus.textContent = "";

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors"
      });

      guestbookForm.reset();
      formStatus.textContent = "따뜻한 축하 메시지가 등록되었습니다.";
      await loadGuestbook();
    } catch (error) {
      formStatus.textContent =
        "등록 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "축하 메시지 남기기";
    }
  });
}


// =========================================
// 방명록 목록 불러오기
// =========================================
async function loadGuestbook() {
  if (!SCRIPT_URL || !guestbookList) return;

  try {
    const response = await fetch(`${SCRIPT_URL}?action=list`);
    const result = await response.json();

    if (!Array.isArray(result.data)) return;

    guestbookList.innerHTML = "";

    if (result.data.length === 0) {
      guestbookList.innerHTML = `
        <article class="guest-message guest-message--empty">
          <p>아직 등록된 방명록이 없습니다.<br>첫 번째 축하 메시지를 남겨주세요.</p>
        </article>
      `;
      return;
    }

    result.data.slice().reverse().forEach(function(item) {
      const article = document.createElement("article");
      article.className = "guest-message";

      const nameEl = document.createElement("strong");
      nameEl.textContent = item.name || "익명";

      const messageEl = document.createElement("p");
      messageEl.textContent = item.message || "";

      const timeEl = document.createElement("time");
      timeEl.textContent = item.timestamp || "";

      article.appendChild(nameEl);
      article.appendChild(messageEl);
      article.appendChild(timeEl);
      guestbookList.appendChild(article);
    });
  } catch (error) {
    // Google Apps Script 연결 전에는 기본 빈 상태 유지
  }
}

loadGuestbook();

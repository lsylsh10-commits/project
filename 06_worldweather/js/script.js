/* =========================================
   OpenWeather API 설정
   아래 API_KEY 값만 본인의 키로 교체하세요.
========================================= */
const API_KEY = "26b006077b7280b1a5cef8d59146fea8";

const GEO_BASE_URL = "https://api.openweathermap.org/geo/1.0";
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";

/* =========================================
   DOM 요소
========================================= */
const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const locationBtn = document.getElementById("locationBtn");
const statusMessage = document.getElementById("statusMessage");
const loadingOverlay = document.getElementById("loadingOverlay");
const toast = document.getElementById("toast");

const cityName = document.getElementById("cityName");
const currentDate = document.getElementById("currentDate");
const currentWeatherIcon = document.getElementById("currentWeatherIcon");
const iconPlaceholder = document.getElementById("iconPlaceholder");
const currentTemp = document.getElementById("currentTemp");
const weatherDescription = document.getElementById("weatherDescription");
const feelsLike = document.getElementById("feelsLike");
const maxTemp = document.getElementById("maxTemp");
const minTemp = document.getElementById("minTemp");

const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const pressure = document.getElementById("pressure");
const cloudiness = document.getElementById("cloudiness");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const hourlyList = document.getElementById("hourlyList");
const weeklyList = document.getElementById("weeklyList");

const favoriteBtn = document.getElementById("favoriteBtn");
const favoriteIcon = document.getElementById("favoriteIcon");
const favoriteText = document.getElementById("favoriteText");
const favoritesList = document.getElementById("favoritesList");
const recentList = document.getElementById("recentList");
const clearRecentBtn = document.getElementById("clearRecentBtn");
const unitButtons = document.querySelectorAll(".unit-btn");
const tabItems = document.querySelectorAll(".tab-item");
const appScreens = document.querySelectorAll(".app-screen");
const exampleCities = document.querySelectorAll(".example-city");

/* =========================================
   앱 상태
========================================= */
let currentUnit = localStorage.getItem("weatherUnit") || "metric";
let currentLocation = null;
let currentWeatherData = null;
let currentForecastData = null;

let favorites = JSON.parse(localStorage.getItem("weatherFavorites")) || [];
let recentSearches = JSON.parse(localStorage.getItem("weatherRecent")) || [];

/* =========================================
   국가명 표시
========================================= */
const regionNames = new Intl.DisplayNames(["ko"], { type: "region" });

/* =========================================
   초기 실행
========================================= */
document.addEventListener("DOMContentLoaded", () => {
    updateUnitButtons();
    renderFavorites();
    renderRecentSearches();

    // API Key를 넣기 전에는 실제 API를 호출하지 않습니다.
    if (!isApiKeyReady()) {
        setStatus("js/script.js 상단의 API_KEY를 본인의 OpenWeather API 키로 교체해주세요.");
        console.info("OpenWeather API 키를 입력하면 날씨 데이터 호출이 시작됩니다.");
        return;
    }

    // 초기 도시는 서울
    searchCity("서울", false);
});

/* =========================================
   이벤트
========================================= */
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const keyword = cityInput.value.trim();

    if (!keyword) {
        showToast("도시명을 입력해주세요.");
        cityInput.focus();
        return;
    }

    searchCity(keyword, true);
});

locationBtn.addEventListener("click", getCurrentLocationWeather);

favoriteBtn.addEventListener("click", () => {
    if (!currentLocation) {
        showToast("먼저 도시를 검색해주세요.");
        return;
    }

    toggleFavorite();
});

clearRecentBtn.addEventListener("click", () => {
    recentSearches = [];
    localStorage.setItem("weatherRecent", JSON.stringify(recentSearches));
    renderRecentSearches();
    showToast("최근 검색 기록을 삭제했습니다.");
});

unitButtons.forEach((button) => {
    button.addEventListener("click", async () => {
        const nextUnit = button.dataset.unit;

        if (currentUnit === nextUnit) {
            return;
        }

        currentUnit = nextUnit;
        localStorage.setItem("weatherUnit", currentUnit);
        updateUnitButtons();

        // 현재 보고 있는 도시가 있으면 동일 좌표로 다시 요청
        if (currentLocation && isApiKeyReady()) {
            await loadWeatherByCoordinates(
                currentLocation.lat,
                currentLocation.lon,
                currentLocation
            );
        }
    });
});

/* =========================================
   하단 탭바 화면 전환
========================================= */
function switchScreen(screenName) {
    appScreens.forEach((screen) => {
        screen.classList.toggle(
            "active",
            screen.dataset.screen === screenName
        );
    });

    tabItems.forEach((tab) => {
        tab.classList.toggle(
            "active",
            tab.dataset.screenTarget === screenName
        );
    });

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

    if (screenName === "search") {
        setTimeout(() => cityInput.focus(), 120);
    }
}

tabItems.forEach((tab) => {
    tab.addEventListener("click", () => {
        switchScreen(tab.dataset.screenTarget);
    });
});

/* 예시 도시 버튼 */
exampleCities.forEach((button) => {
    button.addEventListener("click", () => {
        const city = button.dataset.city;
        cityInput.value = city;
        searchCity(city, true);
    });
});

/* =========================================
   API Key 체크
========================================= */
function isApiKeyReady() {
    return API_KEY &&
        API_KEY !== "여기에_OPENWEATHER_API_KEY_입력" &&
        API_KEY.length > 10;
}

/* =========================================
   한글 / 영문 도시 검색
   OpenWeather Geocoding API에 검색어를 그대로 전달합니다.
========================================= */
async function searchCity(keyword, saveHistory = true) {
    if (!isApiKeyReady()) {
        showToast("먼저 API_KEY를 입력해주세요.");
        setStatus("js/script.js 상단의 API_KEY를 본인의 OpenWeather API 키로 교체해주세요.", true);
        return;
    }

    showLoading(true);
    setStatus("");

    try {
        console.log("사용자 검색어:", keyword);

        const geoUrl =
            `${GEO_BASE_URL}/direct?q=${encodeURIComponent(keyword)}&limit=5&appid=${API_KEY}`;

        const response = await fetch(geoUrl);

        if (!response.ok) {
            throw new Error(`Geocoding API 오류: ${response.status}`);
        }

        const locationData = await response.json();

        // PRD 요구사항: 서버 응답을 화면 출력 전에 console.log()로 확인
        console.log("검색된 도시 정보:", locationData);

        if (!locationData.length) {
            throw new Error("CITY_NOT_FOUND");
        }

        // 첫 번째 검색 결과를 기본 선택
        const location = normalizeLocation(locationData[0], keyword);

        if (saveHistory) {
            saveRecentSearch(location);
        }

        cityInput.value = "";
        await loadWeatherByCoordinates(location.lat, location.lon, location);

    } catch (error) {
        console.error("도시 검색 오류:", error);

        if (error.message === "CITY_NOT_FOUND") {
            setStatus("검색한 도시를 찾을 수 없습니다. 도시명을 다시 확인해주세요.", true);
            showToast("도시를 찾을 수 없습니다.");
        } else {
            handleApiError(error);
        }
    } finally {
        showLoading(false);
    }
}

/* =========================================
   좌표 기반 현재 날씨 + 5일 예보 호출
========================================= */
async function loadWeatherByCoordinates(lat, lon, locationInfo = null) {
    showLoading(true);

    try {
        const units = currentUnit;
        const lang = "kr";

        const currentUrl =
            `${WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}&lang=${lang}`;

        const forecastUrl =
            `${WEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}&lang=${lang}`;

        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            const status = !currentResponse.ok
                ? currentResponse.status
                : forecastResponse.status;

            throw new Error(`WEATHER_API_${status}`);
        }

        const weatherData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        // PRD 요구사항: API 데이터 Console 확인
        console.log("OpenWeather 현재 날씨 API 응답:", weatherData);
        console.log("OpenWeather 5일/3시간 예보 API 응답:", forecastData);

        currentWeatherData = weatherData;
        currentForecastData = forecastData;

        currentLocation = locationInfo || {
            name: weatherData.name,
            displayName: weatherData.name,
            country: weatherData.sys?.country || "",
            lat,
            lon
        };

        displayCurrentWeather(weatherData, currentLocation);
        displayWeatherDetails(weatherData);
        displayHourlyWeather(forecastData);
        displayForecast(forecastData);
        updateFavoriteButton();
        changeWeatherTheme(weatherData);
        switchScreen("home");

        setStatus(`마지막 업데이트: ${formatLocalDateTime(weatherData.dt, weatherData.timezone)}`);

    } catch (error) {
        console.error("날씨 API 오류:", error);
        handleApiError(error);
    } finally {
        showLoading(false);
    }
}

/* =========================================
   현재 위치 날씨
========================================= */
function getCurrentLocationWeather() {
    if (!isApiKeyReady()) {
        showToast("먼저 API_KEY를 입력해주세요.");
        return;
    }

    if (!navigator.geolocation) {
        setStatus("이 브라우저에서는 현재 위치 기능을 사용할 수 없습니다.", true);
        return;
    }

    showLoading(true);
    setStatus("현재 위치를 확인하고 있습니다...");

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;

            console.log("현재 위치 좌표:", {
                lat: latitude,
                lon: longitude
            });

            try {
                const reverseUrl =
                    `${GEO_BASE_URL}/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;

                const response = await fetch(reverseUrl);

                if (!response.ok) {
                    throw new Error(`Reverse Geocoding API 오류: ${response.status}`);
                }

                const data = await response.json();

                console.log("현재 위치 Reverse Geocoding 응답:", data);

                const fallbackLocation = {
                    name: "현재 위치",
                    displayName: "현재 위치",
                    country: "",
                    lat: latitude,
                    lon: longitude
                };

                const location = data.length
                    ? normalizeLocation(data[0], "현재 위치")
                    : fallbackLocation;

                await loadWeatherByCoordinates(latitude, longitude, location);
                saveRecentSearch(location);

            } catch (error) {
                console.error("현재 위치 검색 오류:", error);
                handleApiError(error);
            } finally {
                showLoading(false);
            }
        },
        (error) => {
            console.error("Geolocation 오류:", error);
            showLoading(false);
            setStatus("현재 위치 정보를 사용할 수 없습니다. 위치 권한을 확인하거나 도시명을 직접 검색해주세요.", true);
            showToast("현재 위치를 불러오지 못했습니다.");
        },
        {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000
        }
    );
}

/* =========================================
   위치 데이터 정리
   local_names.ko 값이 있으면 한글 도시명을 우선 표시
========================================= */
function normalizeLocation(data, originalKeyword = "") {
    const localNames = data.local_names || {};

    return {
        name: data.name || originalKeyword,
        displayName:
            localNames.ko ||
            data.name ||
            originalKeyword,
        englishName:
            localNames.en ||
            data.name ||
            originalKeyword,
        country: data.country || "",
        state: data.state || "",
        lat: data.lat,
        lon: data.lon
    };
}

/* =========================================
   현재 날씨 출력
========================================= */
function displayCurrentWeather(data, location) {
    const countryText = getCountryName(location.country);
    const displayCity = location.displayName || data.name || "현재 위치";

    cityName.textContent = countryText
        ? `${displayCity}, ${countryText}`
        : displayCity;

    currentDate.textContent = formatLocalFullDate(data.dt, data.timezone);

    const iconCode = data.weather?.[0]?.icon;
    const description = data.weather?.[0]?.description || "날씨 정보 없음";

    if (iconCode) {
        currentWeatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        currentWeatherIcon.alt = description;
        currentWeatherIcon.hidden = false;
        iconPlaceholder.hidden = true;
    }

    currentTemp.textContent = `${Math.round(data.main.temp)}°`;
    weatherDescription.textContent = capitalize(description);
    feelsLike.textContent = `체감온도 ${Math.round(data.main.feels_like)}°`;
    maxTemp.textContent = `${Math.round(data.main.temp_max)}°`;
    minTemp.textContent = `${Math.round(data.main.temp_min)}°`;
}

/* =========================================
   상세 날씨 출력
========================================= */
function displayWeatherDetails(data) {
    humidity.textContent = `${data.main.humidity}%`;
    pressure.textContent = `${data.main.pressure} hPa`;
    cloudiness.textContent = `${data.clouds?.all ?? 0}%`;

    if (currentUnit === "metric") {
        windSpeed.textContent = `${formatNumber(data.wind.speed)} m/s`;
    } else {
        windSpeed.textContent = `${formatNumber(data.wind.speed)} mph`;
    }

    sunrise.textContent = formatTime(data.sys.sunrise, data.timezone);
    sunset.textContent = formatTime(data.sys.sunset, data.timezone);
}

/* =========================================
   시간별 날씨 출력
   무료 5일/3시간 예보에서 앞쪽 데이터를 사용
========================================= */
function displayHourlyWeather(data) {
    hourlyList.innerHTML = "";

    const items = data.list.slice(0, 9);

    items.forEach((item, index) => {
        const pop = Math.round((item.pop || 0) * 100);
        const icon = item.weather?.[0]?.icon || "01d";
        const description = item.weather?.[0]?.description || "";

        const card = document.createElement("article");
        card.className = "hour-card";

        card.innerHTML = `
            <span class="time">${index === 0 ? "가까운 시간" : formatTime(item.dt, data.city.timezone)}</span>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${escapeHtml(description)}">
            <strong>${Math.round(item.main.temp)}°</strong>
            <span class="rain">강수 ${pop}%</span>
        `;

        hourlyList.appendChild(card);
    });
}

/* =========================================
   5일 예보 출력
   3시간 간격 데이터를 날짜별로 묶어 최고/최저 계산
========================================= */
function displayForecast(data) {
    weeklyList.innerHTML = "";

    const grouped = groupForecastByLocalDate(data.list, data.city.timezone);
    const days = Object.values(grouped).slice(0, 5);

    days.forEach((day, index) => {
        const temps = day.items.map(item => item.main.temp);
        const max = Math.max(...temps);
        const min = Math.min(...temps);

        const representative =
            day.items.find(item => {
                const hour = getLocalHour(item.dt, data.city.timezone);
                return hour >= 11 && hour <= 15;
            }) || day.items[Math.floor(day.items.length / 2)];

        const icon = representative.weather?.[0]?.icon || "01d";
        const description = representative.weather?.[0]?.description || "";

        const row = document.createElement("article");
        row.className = "weekly-row";

        row.innerHTML = `
            <div class="weekly-date">
                <strong>${index === 0 ? "오늘" : formatWeekday(representative.dt, data.city.timezone)}</strong>
                <span>${formatMonthDay(representative.dt, data.city.timezone)}</span>
            </div>

            <div class="weekly-condition">
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${escapeHtml(description)}">
                <span>${escapeHtml(capitalize(description))}</span>
            </div>

            <div class="weekly-temp">
                <strong>${Math.round(max)}°</strong>
                <span>${Math.round(min)}°</span>
            </div>
        `;

        weeklyList.appendChild(row);
    });
}

/* =========================================
   예보 날짜별 그룹핑
========================================= */
function groupForecastByLocalDate(list, timezoneOffset) {
    return list.reduce((grouped, item) => {
        const key = getLocalDateKey(item.dt, timezoneOffset);

        if (!grouped[key]) {
            grouped[key] = {
                dateKey: key,
                items: []
            };
        }

        grouped[key].items.push(item);
        return grouped;
    }, {});
}

/* =========================================
   최근 검색
========================================= */
function saveRecentSearch(location) {
    if (!location || !location.lat || !location.lon) {
        return;
    }

    const item = {
        name: location.name,
        displayName: location.displayName,
        englishName: location.englishName,
        country: location.country,
        state: location.state,
        lat: location.lat,
        lon: location.lon
    };

    recentSearches = recentSearches.filter(saved => !isSameLocation(saved, item));
    recentSearches.unshift(item);
    recentSearches = recentSearches.slice(0, 8);

    localStorage.setItem("weatherRecent", JSON.stringify(recentSearches));
    renderRecentSearches();
}

function renderRecentSearches() {
    recentList.innerHTML = "";

    if (!recentSearches.length) {
        recentList.innerHTML = `<span class="saved-empty">최근 검색 기록이 없습니다.</span>`;
        return;
    }

    recentSearches.forEach(location => {
        recentList.appendChild(createLocationChip(location));
    });
}

/* =========================================
   즐겨찾기
========================================= */
function toggleFavorite() {
    const exists = favorites.some(item => isSameLocation(item, currentLocation));

    if (exists) {
        favorites = favorites.filter(item => !isSameLocation(item, currentLocation));
        showToast("즐겨찾기에서 삭제했습니다.");
    } else {
        favorites.unshift({
            name: currentLocation.name,
            displayName: currentLocation.displayName,
            englishName: currentLocation.englishName,
            country: currentLocation.country,
            state: currentLocation.state,
            lat: currentLocation.lat,
            lon: currentLocation.lon
        });

        favorites = favorites.slice(0, 12);
        showToast("즐겨찾기에 추가했습니다.");
    }

    localStorage.setItem("weatherFavorites", JSON.stringify(favorites));
    renderFavorites();
    updateFavoriteButton();
}

function renderFavorites() {
    favoritesList.innerHTML = "";

    if (!favorites.length) {
        favoritesList.innerHTML = `<span class="saved-empty">저장된 도시가 없습니다.</span>`;
        return;
    }

    favorites.forEach(location => {
        favoritesList.appendChild(createLocationChip(location, true));
    });
}

function updateFavoriteButton() {
    if (!currentLocation) {
        return;
    }

    const exists = favorites.some(item => isSameLocation(item, currentLocation));

    favoriteIcon.textContent = exists ? "★" : "☆";
    favoriteText.textContent = exists ? "저장됨" : "즐겨찾기";
    favoriteBtn.setAttribute(
        "aria-label",
        exists ? "즐겨찾기 삭제" : "즐겨찾기 추가"
    );
}

/* =========================================
   도시 Chip 생성
========================================= */
function createLocationChip(location, isFavorite = false) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "city-chip";

    const country = location.country ? ` · ${location.country}` : "";
    button.textContent = `${isFavorite ? "★ " : ""}${location.displayName || location.name}${country}`;

    button.addEventListener("click", async () => {
        await loadWeatherByCoordinates(location.lat, location.lon, location);
        saveRecentSearch(location);
    });

    return button;
}

/* =========================================
   온도 단위 버튼
========================================= */
function updateUnitButtons() {
    unitButtons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.unit === currentUnit
        );
    });
}

/* =========================================
   날씨 테마 변경
========================================= */
function changeWeatherTheme(data) {
    const weatherMain = (data.weather?.[0]?.main || "").toLowerCase();
    const iconCode = data.weather?.[0]?.icon || "";
    const isNight = iconCode.endsWith("n");

    const themeClasses = [
        "theme-clear",
        "theme-clouds",
        "theme-rain",
        "theme-drizzle",
        "theme-thunderstorm",
        "theme-snow",
        "theme-mist",
        "theme-night"
    ];

    document.body.classList.remove(...themeClasses);

    if (isNight) {
        document.body.classList.add("theme-night");
        return;
    }

    if (["mist", "smoke", "haze", "dust", "fog", "sand", "ash", "squall", "tornado"].includes(weatherMain)) {
        document.body.classList.add("theme-mist");
        return;
    }

    if (themeClasses.includes(`theme-${weatherMain}`)) {
        document.body.classList.add(`theme-${weatherMain}`);
    } else {
        document.body.classList.add("theme-clear");
    }
}

/* =========================================
   오류 처리
========================================= */
function handleApiError(error) {
    const message = error.message || "";

    if (message.includes("401")) {
        setStatus("OpenWeather API 연결에 실패했습니다. API Key를 확인해주세요.", true);
        showToast("API Key를 확인해주세요.");
        return;
    }

    if (message.includes("429")) {
        setStatus("API 요청 횟수가 너무 많습니다. 잠시 후 다시 시도해주세요.", true);
        showToast("API 요청 한도를 확인해주세요.");
        return;
    }

    setStatus("날씨 정보를 불러오지 못했습니다. 인터넷 연결과 API 설정을 확인해주세요.", true);
    showToast("날씨 정보를 불러오지 못했습니다.");
}

/* =========================================
   UI 유틸리티
========================================= */
function showLoading(isVisible) {
    loadingOverlay.hidden = !isVisible;
}

function setStatus(message, isError = false) {
    statusMessage.textContent = message;
    statusMessage.classList.toggle("error", isError);
}

let toastTimer;

function showToast(message) {
    clearTimeout(toastTimer);

    toast.textContent = message;
    toast.classList.add("show");

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

/* =========================================
   날짜 / 시간
   OpenWeather timezone은 UTC 기준 초 단위 offset
========================================= */
function getLocalDate(timestamp, timezoneOffset) {
    return new Date((timestamp + timezoneOffset) * 1000);
}

function getLocalDateKey(timestamp, timezoneOffset) {
    const date = getLocalDate(timestamp, timezoneOffset);

    return [
        date.getUTCFullYear(),
        String(date.getUTCMonth() + 1).padStart(2, "0"),
        String(date.getUTCDate()).padStart(2, "0")
    ].join("-");
}

function getLocalHour(timestamp, timezoneOffset) {
    return getLocalDate(timestamp, timezoneOffset).getUTCHours();
}

function formatTime(timestamp, timezoneOffset) {
    const date = getLocalDate(timestamp, timezoneOffset);

    return new Intl.DateTimeFormat("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "UTC"
    }).format(date);
}

function formatLocalDateTime(timestamp, timezoneOffset) {
    const date = getLocalDate(timestamp, timezoneOffset);

    return new Intl.DateTimeFormat("ko-KR", {
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "UTC"
    }).format(date);
}

function formatLocalFullDate(timestamp, timezoneOffset) {
    const date = getLocalDate(timestamp, timezoneOffset);

    return new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        timeZone: "UTC"
    }).format(date);
}

function formatWeekday(timestamp, timezoneOffset) {
    const date = getLocalDate(timestamp, timezoneOffset);

    return new Intl.DateTimeFormat("ko-KR", {
        weekday: "long",
        timeZone: "UTC"
    }).format(date);
}

function formatMonthDay(timestamp, timezoneOffset) {
    const date = getLocalDate(timestamp, timezoneOffset);

    return new Intl.DateTimeFormat("ko-KR", {
        month: "numeric",
        day: "numeric",
        timeZone: "UTC"
    }).format(date);
}

/* =========================================
   기타 유틸리티
========================================= */
function getCountryName(countryCode) {
    if (!countryCode) {
        return "";
    }

    try {
        return regionNames.of(countryCode) || countryCode;
    } catch (error) {
        return countryCode;
    }
}

function isSameLocation(a, b) {
    return Number(a.lat).toFixed(3) === Number(b.lat).toFixed(3) &&
           Number(a.lon).toFixed(3) === Number(b.lon).toFixed(3);
}

function capitalize(text) {
    if (!text) {
        return "";
    }

    return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatNumber(value) {
    return Number(value).toFixed(1).replace(".0", "");
}

function escapeHtml(text) {
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

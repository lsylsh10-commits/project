/* =========================================
   API KEY
========================================= */

const SERVICE_KEY =
  "%2Fjk9Y7KN4jKnVImNXwk9H9PX03jqBFVeGoUtz8AZvCG5P5hBSByWVULOaT4UtWIvqL0V%2BCiPImNBbK6tdvX%2FSA%3D%3D";


const KAKAO_JAVASCRIPT_KEY =
  "96a7a58d2bdc24d0dc8c4cb3a1420557";


/* =========================================
   부산 맛집 API
========================================= */

const FOOD_API_BASE_URL =
  "https://apis.data.go.kr/6260000/FoodService";


const LANGUAGE_ENDPOINTS = {

  kr:"getFoodKr",

  en:"getFoodEn",

  ja:"getFoodJa",

  zhs:"getFoodZhs",

  zht:"getFoodZht"

};


/* =========================================
   UI 언어
========================================= */

const I18N = {

  kr:{

    appTitle:"부산 맛집",

    heroKicker:"부산에서 오늘 뭐 먹지?",

    heroTitle:
      "지역, 메뉴, 내 위치까지<br>한 번에 찾아보세요.",

    searchPlaceholder:
      "맛집 또는 메뉴를 검색하세요",

    nearbyTitle:"내 주변 맛집",

    useLocation:"내 위치 사용",

    locationGuideTitle:
      "현재 위치를 기준으로 찾아드려요.",

    locationGuideText:
      "위치 권한을 허용하면 가까운 맛집부터 확인할 수 있습니다.",

    areaTitle:"지역별 맛집",

    menuTitle:"메뉴별 맛집",

    randomTitle:"오늘 뭐 먹지?",

    randomButton:"랜덤 추천",

    randomGuide:
      "버튼을 누르면 부산 맛집 하나를 골라드려요.",

    recommendTitle:"부산 추천 맛집",

    recentTitle:"최근 본 맛집",

    searchTitle:"부산 맛집 찾기",

    areaFilter:"지역별",

    menuFilter:"메뉴별",

    reset:"초기화",

    listView:"목록",

    mapView:"지도",

    loadMore:"더보기",

    favoriteTitle:"즐겨찾기",

    favoriteEmptyTitle:
      "아직 저장한 맛집이 없습니다.",

    favoriteEmptyText:
      "마음에 드는 맛집의 하트 버튼을 눌러보세요.",

    settingsTitle:"설정",

    themeTitle:"테마",

    themeText:"화면 모드를 선택하세요.",

    languageTitle:"언어",

    languageText:"앱 화면 언어를 변경합니다.",

    locationTitle:"현재 위치",

    locationText:
      "내 주변 맛집과 가까운 순 정렬에 사용됩니다.",

    checkLocation:"위치 확인",

    navHome:"홈",

    navSearch:"검색",

    navFavorite:"즐겨찾기",

    navSettings:"설정",

    all:"전체",

    result:"검색 결과",

    noResult:"검색 결과가 없습니다.",

    noResultText:
      "다른 지역이나 메뉴를 검색해보세요.",

    favoriteAdded:
      "즐겨찾기에 저장했습니다.",

    favoriteRemoved:
      "즐겨찾기에서 삭제했습니다.",

    menuUnknown:
      "대표메뉴 정보 없음",

    imagePreparing:
      "맛집 이미지 준비중",

    currentDistance:
      "현재 위치에서",

    restaurantName:
      "상호명",

    address:
      "주소",

    restaurantIntro:
      "소개",

    representativeMenu:
      "대표메뉴",

    phoneNumber:
      "문의",

    operatingHours:
      "운영시간",

    homepage:
      "공식 홈페이지",

    noHomepage:
      "공식 홈페이지 없음",

    noInfo:
      "정보 없음"

  },


  en:{

    appTitle:"Busan Food",

    heroKicker:
      "What should I eat in Busan today?",

    heroTitle:
      "Search by area, menu,<br>or your current location.",

    searchPlaceholder:
      "Search restaurants or menus",

    nearbyTitle:
      "Nearby Restaurants",

    useLocation:
      "Use My Location",

    locationGuideTitle:
      "Find restaurants near you.",

    locationGuideText:
      "Allow location access to sort nearby restaurants.",

    areaTitle:
      "Browse by Area",

    menuTitle:
      "Browse by Menu",

    randomTitle:
      "What to Eat Today?",

    randomButton:
      "Random Pick",

    randomGuide:
      "Tap the button for a random restaurant.",

    recommendTitle:
      "Recommended in Busan",

    recentTitle:
      "Recently Viewed",

    searchTitle:
      "Find Busan Restaurants",

    areaFilter:"Area",

    menuFilter:"Menu",

    reset:"Reset",

    listView:"List",

    mapView:"Map",

    loadMore:"Load More",

    favoriteTitle:"Favorites",

    favoriteEmptyTitle:
      "No saved restaurants yet.",

    favoriteEmptyText:
      "Tap the heart icon to save a restaurant.",

    settingsTitle:"Settings",

    themeTitle:"Theme",

    themeText:
      "Choose display mode.",

    languageTitle:"Language",

    languageText:
      "Change the app language.",

    locationTitle:
      "Current Location",

    locationText:
      "Used to sort nearby restaurants.",

    checkLocation:
      "Check Location",

    navHome:"Home",

    navSearch:"Search",

    navFavorite:"Favorites",

    navSettings:"Settings",

    all:"All",

    result:"Results",

    noResult:
      "No results found.",

    noResultText:
      "Try another area or menu.",

    favoriteAdded:
      "Saved to favorites.",

    favoriteRemoved:
      "Removed from favorites.",

    menuUnknown:
      "No menu information",

    imagePreparing:
      "Image unavailable",

    currentDistance:
      "From your location",

    restaurantName:
      "Restaurant",

    address:
      "Address",

    restaurantIntro:
      "About",

    representativeMenu:
      "Menu",

    phoneNumber:
      "Contact",

    operatingHours:
      "Hours",

    homepage:
      "Official Website",

    noHomepage:
      "No official website",

    noInfo:
      "No information"

  },


  ja:{

    appTitle:"釜山グルメ",

    searchPlaceholder:
      "店名またはメニューを検索",

    areaFilter:"地域",

    menuFilter:"メニュー",

    reset:"リセット",

    listView:"リスト",

    mapView:"地図",

    loadMore:"もっと見る",

    navHome:"ホーム",

    navSearch:"検索",

    navFavorite:"お気に入り",

    navSettings:"設定",

    all:"全体",

    result:"検索結果",

    restaurantName:"店名",

    address:"住所",

    restaurantIntro:"紹介",

    representativeMenu:"代表メニュー",

    phoneNumber:"問い合わせ",

    operatingHours:"営業時間",

    homepage:"公式ホームページ",

    noHomepage:"公式ホームページなし",

    noInfo:"情報なし",

    favoriteAdded:"お気に入りに保存しました。",

    favoriteRemoved:"お気に入りから削除しました。",

    menuUnknown:"メニュー情報なし",

    imagePreparing:"画像なし"

  },


  zhs:{

    appTitle:"釜山美食",

    searchPlaceholder:
      "搜索餐厅或菜单",

    areaFilter:"地区",

    menuFilter:"菜单",

    reset:"重置",

    listView:"列表",

    mapView:"地图",

    loadMore:"查看更多",

    navHome:"首页",

    navSearch:"搜索",

    navFavorite:"收藏",

    navSettings:"设置",

    all:"全部",

    result:"搜索结果",

    restaurantName:"店名",

    address:"地址",

    restaurantIntro:"介绍",

    representativeMenu:"菜单",

    phoneNumber:"咨询",

    operatingHours:"营业时间",

    homepage:"官方网站",

    noHomepage:"无官方网站",

    noInfo:"暂无信息",

    favoriteAdded:"已收藏。",

    favoriteRemoved:"已取消收藏。",

    menuUnknown:"暂无菜单信息",

    imagePreparing:"暂无图片"

  },


  zht:{

    appTitle:"釜山美食",

    searchPlaceholder:
      "搜尋餐廳或菜單",

    areaFilter:"地區",

    menuFilter:"菜單",

    reset:"重設",

    listView:"列表",

    mapView:"地圖",

    loadMore:"查看更多",

    navHome:"首頁",

    navSearch:"搜尋",

    navFavorite:"收藏",

    navSettings:"設定",

    all:"全部",

    result:"搜尋結果",

    restaurantName:"店名",

    address:"地址",

    restaurantIntro:"介紹",

    representativeMenu:"菜單",

    phoneNumber:"諮詢",

    operatingHours:"營業時間",

    homepage:"官方網站",

    noHomepage:"無官方網站",

    noInfo:"暫無資訊",

    favoriteAdded:"已收藏。",

    favoriteRemoved:"已取消收藏。",

    menuUnknown:"暫無菜單資訊",

    imagePreparing:"暫無圖片"

  }

};


/* =========================================
   메뉴 카테고리
========================================= */

const MENU_CATEGORIES = {

  "전체":[],

  "한식":[
    "한식",
    "국밥",
    "갈비",
    "불고기",
    "밀면",
    "냉면",
    "korean",
    "gukbap",
    "galbi"
  ],

  "일식":[
    "일식",
    "초밥",
    "스시",
    "라멘",
    "우동",
    "japanese",
    "sushi",
    "ramen"
  ],

  "중식":[
    "중식",
    "짜장",
    "짬뽕",
    "탕수육",
    "chinese"
  ],

  "양식":[
    "양식",
    "파스타",
    "피자",
    "스테이크",
    "western",
    "pasta",
    "pizza"
  ],

  "고기":[
    "고기",
    "갈비",
    "삼겹",
    "한우",
    "beef",
    "pork",
    "meat"
  ],

  "해산물":[
    "해산물",
    "회",
    "조개",
    "장어",
    "생선",
    "seafood",
    "fish"
  ],

  "국·탕":[
    "국",
    "탕",
    "찌개",
    "전골",
    "soup",
    "stew"
  ],

  "카페·디저트":[
    "카페",
    "커피",
    "디저트",
    "빵",
    "cafe",
    "coffee",
    "dessert"
  ]

};


const MENU_LABELS = {

  kr:{
    "전체":"전체",
    "한식":"한식",
    "일식":"일식",
    "중식":"중식",
    "양식":"양식",
    "고기":"고기",
    "해산물":"해산물",
    "국·탕":"국·탕",
    "카페·디저트":"카페·디저트"
  },

  en:{
    "전체":"All",
    "한식":"Korean",
    "일식":"Japanese",
    "중식":"Chinese",
    "양식":"Western",
    "고기":"Meat",
    "해산물":"Seafood",
    "국·탕":"Soup",
    "카페·디저트":"Cafe & Dessert"
  }

};


/* =========================================
   지역
========================================= */

const AREA_FALLBACK = [

  "전체",

  "강서구",
  "금정구",
  "기장군",
  "남구",
  "동구",
  "동래구",
  "부산진구",
  "북구",
  "사상구",
  "사하구",
  "서구",
  "수영구",
  "연제구",
  "영도구",
  "중구",
  "해운대구"

];


/* =========================================
   상태
========================================= */

const state = {

  language:
    localStorage.getItem(
      "busan-food-language"
    ) || "kr",

  theme:
    localStorage.getItem(
      "busan-food-theme"
    ) || "system",

  restaurants:[],

  filteredRestaurants:[],

  apiTotalCount:null,

  favorites:
    loadLocalArray(
      "busan-food-favorites"
    ),

  recent:
    loadLocalArray(
      "busan-food-recent"
    ),

  visibleCount:10,

  homeVisibleCount:10,

  selectedArea:"전체",

  selectedMenu:"전체",

  searchKeyword:"",

  sort:"default",

  viewMode:"list",

  userLocation:null,

  currentDetailId:null,

  kakaoReady:false,

  searchMap:null,

  detailMap:null

};


/* =========================================
   DOM
========================================= */

const $ =
  selector =>
    document.querySelector(
      selector
    );


const $$ =
  selector =>
    [
      ...document.querySelectorAll(
        selector
      )
    ];


const els = {

  homeRestaurantList:
    $("#homeRestaurantList"),

  searchRestaurantList:
    $("#searchRestaurantList"),

  favoriteList:
    $("#favoriteList"),

  nearbyList:
    $("#nearbyList"),

  recentList:
    $("#recentList"),

  recentSection:
    $("#recentSection"),

  randomResult:
    $("#randomResult"),

  homeAreaChips:
    $("#homeAreaChips"),

  homeMenuChips:
    $("#homeMenuChips"),

  searchAreaChips:
    $("#searchAreaChips"),

  searchMenuChips:
    $("#searchMenuChips"),

  searchForm:
    $("#searchForm"),

  searchInput:
    $("#searchInput"),

  sortSelect:
    $("#sortSelect"),

  resultCount:
    $("#resultCount"),

  resetFiltersBtn:
    $("#resetFiltersBtn"),

  loadMoreBtn:
    $("#loadMoreBtn"),

  listModeBtn:
    $("#listModeBtn"),

  mapModeBtn:
    $("#mapModeBtn"),

  searchListPanel:
    $("#searchListPanel"),

  searchMapPanel:
    $("#searchMapPanel"),

  requestLocationBtn:
    $("#requestLocationBtn"),

  settingsLocationBtn:
    $("#settingsLocationBtn"),

  locationState:
    $("#locationState"),

  homeSearchBtn:
    $("#homeSearchBtn"),

  randomBtn:
    $("#randomBtn"),

  favoriteEmpty:
    $("#favoriteEmpty"),

  languageSelect:
    $("#languageSelect"),

  quickLanguageSelect:
    $("#quickLanguageSelect"),

  themeOptions:
    $("#themeOptions"),

  clearFavoritesBtn:
    $("#clearFavoritesBtn"),

  clearRecentBtn:
    $("#clearRecentBtn"),

  detailModal:
    $("#detailModal"),

  detailContent:
    $("#detailContent"),

  toast:
    $("#toast"),

  homeTotalCount:
    $("#homeTotalCount"),

  homeLoadMoreBtn:
    $("#homeLoadMoreBtn")

};


/* =========================================
   시작
========================================= */

init();


async function init(){

  bindEvents();

  applyTheme(
    state.theme
  );

  syncLanguageSelects();

  applyLanguage();

  renderMenuChips();

  renderAreaChips(
    AREA_FALLBACK
  );

  loadKakaoMapSdk();

  await loadRestaurants();

}


/* =========================================
   이벤트
========================================= */

function bindEvents(){


  /* 하단 메뉴 */
  $$(".nav-btn").forEach(

    button => {

      button.addEventListener(

        "click",

        () => {

          switchView(
            button.dataset.target
          );

        }

      );

    }

  );


  /* 홈 검색 */
  els.homeSearchBtn
    ?.addEventListener(

      "click",

      () => {

        switchView(
          "search"
        );

        setTimeout(
          () =>
            els.searchInput.focus(),
          100
        );

      }

    );


  /* 검색 */
  els.searchForm
    ?.addEventListener(

      "submit",

      event => {

        event.preventDefault();

        state.searchKeyword =
          els.searchInput.value.trim();

        state.visibleCount =
          10;

        applyFilters();

      }

    );


  /* 정렬 */
  els.sortSelect
    ?.addEventListener(

      "change",

      () => {

        state.sort =
          els.sortSelect.value;

        applyFilters();

      }

    );


  /* 초기화 */
  els.resetFiltersBtn
    ?.addEventListener(

      "click",

      () => {

        state.searchKeyword =
          "";

        state.selectedArea =
          "전체";

        state.selectedMenu =
          "전체";

        state.sort =
          "default";

        state.visibleCount =
          10;

        els.searchInput.value =
          "";

        els.sortSelect.value =
          "default";

        renderAreaChips(
          getAreaList()
        );

        renderMenuChips();

        applyFilters();

      }

    );


  /* 더보기 */
  els.loadMoreBtn
    ?.addEventListener(

      "click",

      () => {

        state.visibleCount +=
          10;

        renderSearchResults();

      }

    );


  /* 홈 추천 맛집 더보기 */
  els.homeLoadMoreBtn
    ?.addEventListener(

      "click",

      () => {

        state.homeVisibleCount +=
          10;

        renderHome();

      }

    );


  /* 목록 */
  els.listModeBtn
    ?.addEventListener(

      "click",

      () =>
        setSearchViewMode(
          "list"
        )

    );


  /* 지도 */
  els.mapModeBtn
    ?.addEventListener(

      "click",

      () =>
        setSearchViewMode(
          "map"
        )

    );


  /* 위치 */
  els.requestLocationBtn
    ?.addEventListener(

      "click",

      requestUserLocation

    );


  els.settingsLocationBtn
    ?.addEventListener(

      "click",

      requestUserLocation

    );


  /* 랜덤 */
  els.randomBtn
    ?.addEventListener(

      "click",

      showRandomRestaurant

    );


  /* 언어 */
  els.quickLanguageSelect
    ?.addEventListener(

      "change",

      () =>
        setLanguage(
          els.quickLanguageSelect.value
        )

    );


  els.languageSelect
    ?.addEventListener(

      "change",

      () =>
        setLanguage(
          els.languageSelect.value
        )

    );


  /* 테마 */
  els.themeOptions
    ?.addEventListener(

      "click",

      event => {

        const button =
          event.target.closest(
            "[data-theme]"
          );

        if(!button){
          return;
        }

        state.theme =
          button.dataset.theme;

        localStorage.setItem(
          "busan-food-theme",
          state.theme
        );

        applyTheme(
          state.theme
        );

      }

    );


  /* 즐겨찾기 초기화 */
  els.clearFavoritesBtn
    ?.addEventListener(

      "click",

      () => {

        state.favorites =
          [];

        saveLocalArray(
          "busan-food-favorites",
          []
        );

        renderAllLists();

      }

    );


  /* 최근 본 초기화 */
  els.clearRecentBtn
    ?.addEventListener(

      "click",

      () => {

        state.recent =
          [];

        saveLocalArray(
          "busan-food-recent",
          []
        );

        renderRecent();

      }

    );


  /* 상세 닫기 */
  els.detailModal
    ?.addEventListener(

      "click",

      event => {

        if(
          event.target.matches(
            "[data-close-modal]"
          )
        ){

          closeDetail();

        }

      }

    );

}


/* =========================================
   번역
========================================= */

function t(key){

  return (
    I18N[state.language]?.[key]
    ??
    I18N.kr[key]
    ??
    key
  );

}


function applyLanguage(){

  document.documentElement.lang =
    state.language === "kr"
      ? "ko"
      : state.language;


  $$("[data-i18n]")
    .forEach(

      element => {

        element.textContent =
          t(
            element.dataset.i18n
          );

      }

    );


  $$("[data-i18n-html]")
    .forEach(

      element => {

        element.innerHTML =
          t(
            element.dataset.i18nHtml
          );

      }

    );


  $$("[data-i18n-placeholder]")
    .forEach(

      element => {

        element.placeholder =
          t(
            element.dataset.i18nPlaceholder
          );

      }

    );

}


/* =========================================
   언어 변경
========================================= */

async function setLanguage(
  language
){

  state.language =
    I18N[language]
      ? language
      : "kr";


  localStorage.setItem(
    "busan-food-language",
    state.language
  );


  state.searchKeyword =
    "";

  state.selectedArea =
    "전체";

  state.selectedMenu =
    "전체";

  state.visibleCount =
    10;

  state.homeVisibleCount =
    10;


  syncLanguageSelects();

  applyLanguage();

  renderMenuChips();

  renderAreaChips(
    AREA_FALLBACK
  );


  await loadRestaurants();

}


function syncLanguageSelects(){

  if(
    els.quickLanguageSelect
  ){

    els.quickLanguageSelect.value =
      state.language;

  }


  if(
    els.languageSelect
  ){

    els.languageSelect.value =
      state.language;

  }

}


/* =========================================
   맛집 API
========================================= */

async function loadRestaurants(){

  showLoading();


  const key =
    normalizeServiceKey(
      SERVICE_KEY
    );


  const endpoint =
    LANGUAGE_ENDPOINTS[
      state.language
    ]
    ||
    "getFoodKr";


  /*
     API 서버에 한 번에 너무 많은 값을 요청하지 않고
     100개씩 페이지 단위로 전체 데이터를 가져옵니다.
  */
  const rowsPerPage =
    100;


  try{

    /* =========================================
       1페이지 호출
    ========================================= */
    const firstParams =
      new URLSearchParams({

        serviceKey:key,

        pageNo:"1",

        numOfRows:
          String(
            rowsPerPage
          ),

        resultType:"json"

      });


    const firstUrl =
      `${FOOD_API_BASE_URL}/${endpoint}?${firstParams.toString()}`;


    console.log(
      "부산 맛집 API:",
      endpoint
    );


    const firstResponse =
      await fetch(
        firstUrl
      );


    const firstText =
      await firstResponse.text();


    if(
      !firstResponse.ok
    ){

      throw new Error(
        `HTTP ${firstResponse.status}`
      );

    }


    const firstData =
      JSON.parse(
        firstText
      );


    console.log(
      "부산 맛집 API 1페이지 응답:",
      firstData
    );


    const firstItems =
      normalizeApiResponse(
        firstData
      );


    /* =========================================
       실제 전체 데이터 개수
       API 응답의 totalCount만 사용
       특정 숫자 하드코딩 없음
    ========================================= */
    const totalCount =
      findTotalCount(
        firstData
      );


    if(
      totalCount === null
    ){

      throw new Error(
        "API 응답에서 totalCount를 찾지 못했습니다."
      );

    }


    state.apiTotalCount =
      totalCount;


    console.log(
      "API 실제 totalCount:",
      state.apiTotalCount
    );


    const totalPages =
      Math.max(
        1,
        Math.ceil(
          state.apiTotalCount
          /
          rowsPerPage
        )
      );


    console.log(
      "호출할 전체 페이지 수:",
      totalPages
    );


    let allItems =
      [
        ...firstItems
      ];


    /* =========================================
       2페이지부터 마지막 페이지까지 호출
    ========================================= */
    for(
      let page = 2;
      page <= totalPages;
      page++
    ){

      const params =
        new URLSearchParams({

          serviceKey:key,

          pageNo:
            String(page),

          numOfRows:
            String(
              rowsPerPage
            ),

          resultType:"json"

        });


      const url =
        `${FOOD_API_BASE_URL}/${endpoint}?${params.toString()}`;


      const response =
        await fetch(
          url
        );


      const text =
        await response.text();


      if(
        !response.ok
      ){

        throw new Error(
          `HTTP ${response.status} / ${page}페이지`
        );

      }


      const data =
        JSON.parse(
          text
        );


      const pageItems =
        normalizeApiResponse(
          data
        );


      console.log(
        `${page}페이지 불러온 데이터:`,
        pageItems.length
      );


      allItems.push(
        ...pageItems
      );

    }


    /*
       API에서 같은 UC_SEQ가 중복으로 내려오는 경우만 제거.
       화면의 총 개수 표시는 API의 실제 totalCount를 그대로 사용합니다.
    */
    const uniqueMap =
      new Map();


    allItems.forEach(
      (item,index) => {

        const id =
          String(
            item?.UC_SEQ
            ??
            `${item?.MAIN_TITLE || ""}_${item?.ADDR1 || ""}_${index}`
          );


        if(
          !uniqueMap.has(id)
        ){

          uniqueMap.set(
            id,
            item
          );

        }

      }
    );


    const parsed =
      [
        ...uniqueMap.values()
      ];


    console.log(
      "실제로 화면에 사용할 맛집 데이터:",
      parsed.length
    );


    if(
      !parsed.length
    ){

      throw new Error(
        "맛집 데이터가 없습니다."
      );

    }


    state.restaurants =
      parsed.map(
        normalizeRestaurant
      );


    state.filteredRestaurants =
      [
        ...state.restaurants
      ];


    /* 새 데이터 불러오면 처음 10개부터 */
    state.homeVisibleCount =
      10;

    state.visibleCount =
      10;


    renderAreaChips(
      getAreaList()
    );


    renderMenuChips();


    applyFilters();


    renderHome();


    renderFavorites();


    renderRecent();


  }catch(error){

    state.apiTotalCount =
      null;


    console.error(
      "부산 맛집 API 호출 오류:",
      error
    );


    renderApiError(
      error
    );

  }

}

/* =========================================
   서비스 키
========================================= */

function normalizeServiceKey(
  key
){

  const value =
    String(key).trim();


  try{

    return decodeURIComponent(
      value
    );

  }catch{

    return value;

  }

}


/* =========================================
   API 배열 찾기
========================================= */

function normalizeApiResponse(
  data
){

  const candidates = [

    data?.response?.body?.items?.item,

    data?.response?.body?.items,

    data?.body?.items?.item,

    data?.body?.items,

    data?.items?.item,

    data?.items,

    data?.item

  ];


  for(
    const value
    of candidates
  ){

    if(
      Array.isArray(
        value
      )
    ){

      return value;

    }


    if(
      value
      &&
      typeof value === "object"
    ){

      return [
        value
      ];

    }

  }


  function findItems(
    object
  ){

    if(
      !object
      ||
      typeof object !== "object"
    ){

      return null;

    }


    if(
      Array.isArray(
        object.item
      )
    ){

      return object.item;

    }


    if(
      object.item
      &&
      typeof object.item === "object"
    ){

      return [
        object.item
      ];

    }


    if(
      object.MAIN_TITLE
      ||
      object.PLACE
      ||
      object.UC_SEQ
    ){

      return [
        object
      ];

    }


    for(
      const key
      in object
    ){

      const result =
        findItems(
          object[key]
        );

      if(result){

        return result;

      }

    }


    return null;

  }


  return (
    findItems(data)
    ||
    []
  );

}



/* =========================================
   API 응답에서 실제 totalCount 찾기
   하드코딩 숫자 사용하지 않음
========================================= */
function findTotalCount(data){

  if(
    !data
    ||
    typeof data !== "object"
  ){
    return null;
  }


  if(
    Object.prototype.hasOwnProperty.call(
      data,
      "totalCount"
    )
  ){

    const count =
      Number(
        data.totalCount
      );


    if(
      Number.isFinite(count)
      &&
      count >= 0
    ){
      return count;
    }

  }


  for(
    const key in data
  ){

    const result =
      findTotalCount(
        data[key]
      );


    if(
      result !== null
    ){
      return result;
    }

  }


  return null;
}


/* =========================================
   데이터 정리
========================================= */

function normalizeRestaurant(
  item,
  index
){

  const text = [

    item.MAIN_TITLE,

    item.PLACE,

    item.TITLE,

    item.SUBTITLE,

    item.ITEMCNTNTS

  ].join(" ");


  return {

    id:
      String(
        item.UC_SEQ
        ??
        index
      ),


    title:
      cleanText(
        item.MAIN_TITLE
        ??
        item.PLACE
        ??
        "이름 없음"
      ),


    area:
      cleanText(
        item.GUGUN_NM
        ??
        inferAreaFromText(
          text
        )
        ??
        ""
      ),


    address1:
      cleanText(
        item.ADDR1
        ??
        ""
      ),


    address2:
      cleanText(
        item.ADDR2
        ??
        ""
      ),


    menu:
      cleanText(
        item.RPRSNTV_MENU
        ??
        ""
      ),


    phone:
      cleanText(
        item.CNTCT_TEL
        ??
        ""
      ),


    hours:
      cleanText(
        item.USAGE_DAY_WEEK_AND_TIME
        ??
        ""
      ),


    homepage:
      cleanText(
        item.HOMEPAGE_URL
        ??
        ""
      ),


    description:
      cleanText(
        item.ITEMCNTNTS
        ??
        item.SUBTITLE
        ??
        ""
      ),


    image:
      normalizeImageUrl(
        item.MAIN_IMG_NORMAL
        ??
        ""
      ),


    thumb:
      normalizeImageUrl(
        item.MAIN_IMG_THUMB
        ??
        ""
      ),


    lat:
      toNumber(
        item.LAT
      ),


    lng:
      toNumber(
        item.LNG
      ),


    distance:null

  };

}


/* =========================================
   텍스트
========================================= */

function cleanText(
  value
){

  return (
    value == null
      ? ""
      : String(value)

        .replace(
          /<[^>]*>/g,
          ""
        )

        .replace(
          /&amp;/g,
          "&"
        )

        .replace(
          /&nbsp;/g,
          " "
        )

        .replace(
          /\s+/g,
          " "
        )

        .trim()
  );

}


function normalizeImageUrl(
  value
){

  const url =
    cleanText(
      value
    );


  if(!url){

    return "";

  }


  if(
    /^https?:\/\//i.test(
      url
    )
  ){

    return url;

  }


  if(
    url.startsWith("/")
  ){

    return (
      `https://www.visitbusan.net${url}`
    );

  }


  return url;

}


function toNumber(
  value
){

  const number =
    Number(
      value
    );


  return (
    Number.isFinite(
      number
    )
      ? number
      : null
  );

}


function inferAreaFromText(
  text
){

  return (
    AREA_FALLBACK

      .filter(
        area =>
          area !== "전체"
      )

      .find(
        area =>
          String(text)
            .includes(area)
      )

    ||
    ""
  );

}


/* =========================================
   홈
========================================= */

function renderHome(){

  const list =
    withDistances(
      [
        ...state.restaurants
      ]
    );


  /* =========================================
     현재 표시 개수 / API 실제 전체 개수
  ========================================= */
  if(
    els.homeTotalCount
  ){

    const currentCount =
      Math.min(
        state.homeVisibleCount,
        list.length
      );


    els.homeTotalCount.textContent =
      state.apiTotalCount !== null
        ? `${currentCount} / ${state.apiTotalCount}`
        : `${currentCount} / -`;

  }


  /* =========================================
     처음 10개,
     더보기 클릭 시 10개씩 추가
  ========================================= */
  const visibleList =
    list.slice(
      0,
      state.homeVisibleCount
    );


  renderCards(
    els.homeRestaurantList,
    visibleList
  );


  /* 더보기 버튼 */
  if(
    els.homeLoadMoreBtn
  ){

    els.homeLoadMoreBtn.hidden =
      state.homeVisibleCount >=
      list.length;


    els.homeLoadMoreBtn.textContent =
      state.language === "kr"
        ? "더보기"
        : "Load More";

  }


  /* 내 주변 맛집 */
  if(
    state.userLocation
  ){

    const nearby =
      [
        ...list
      ]

      .filter(
        item =>
          item.distance !== null
      )

      .sort(
        (a,b) =>
          a.distance -
          b.distance
      )

      .slice(
        0,
        8
      );


    renderCards(
      els.nearbyList,
      nearby
    );

  }else{

    renderCards(
      els.nearbyList,
      []
    );

  }

}

/* =========================================
   랜덤
========================================= */

function showRandomRestaurant(){

  if(
    !state.restaurants.length
  ){
    return;
  }


  const index =
    Math.floor(
      Math.random()
      *
      state.restaurants.length
    );


  const item =
    state.restaurants[
      index
    ];


  els.randomResult.innerHTML =
    "";


  els.randomResult.appendChild(
    createRestaurantCard(
      item
    )
  );

}


/* =========================================
   필터
========================================= */

function applyFilters(){

  let result =
    withDistances(
      [
        ...state.restaurants
      ]
    );


  if(
    state.searchKeyword
  ){

    const keyword =
      state.searchKeyword
        .toLowerCase();


    result =
      result.filter(

        item => {

          const target = [

            item.title,

            item.address1,

            item.address2,

            item.menu,

            item.area,

            item.description

          ]

          .join(" ")

          .toLowerCase();


          return (
            target.includes(
              keyword
            )
          );

        }

      );

  }


  if(
    state.selectedArea !==
    "전체"
  ){

    result =
      result.filter(
        item =>
          item.area ===
          state.selectedArea
      );

  }


  if(
    state.selectedMenu !==
    "전체"
  ){

    result =
      result.filter(

        item =>
          matchesMenuCategory(
            item,
            state.selectedMenu
          )

      );

  }


  if(
    state.sort ===
    "name"
  ){

    result.sort(

      (a,b) =>
        a.title.localeCompare(
          b.title
        )

    );

  }


  if(
    state.sort ===
    "distance"
    &&
    state.userLocation
  ){

    result.sort(

      (a,b) =>
        (
          a.distance
          ??
          99999
        )
        -
        (
          b.distance
          ??
          99999
        )

    );

  }


  state.filteredRestaurants =
    result;


  renderSearchResults();

}


/* =========================================
   검색 결과
========================================= */

function renderSearchResults(){

  const visible =
    state.filteredRestaurants
      .slice(
        0,
        state.visibleCount
      );


  const currentCount =
    Math.min(
      state.visibleCount,
      state.filteredRestaurants.length
    );


  els.resultCount.textContent =
    `${t("result")} ${currentCount} / ${state.filteredRestaurants.length}`;


  renderCards(
    els.searchRestaurantList,
    visible
  );


  els.loadMoreBtn.hidden =
    state.visibleCount >=
    state.filteredRestaurants.length;


  if(
    !state.filteredRestaurants.length
  ){

    els.searchRestaurantList.innerHTML = `

      <div class="empty-state">

        <strong>
          ${escapeHtml(
            t("noResult")
          )}
        </strong>

        <p>
          ${escapeHtml(
            t("noResultText")
          )}
        </p>

      </div>

    `;

  }

}


/* =========================================
   지역
========================================= */

function getAreaList(){

  const areas =
    [
      ...new Set(

        state.restaurants

          .map(
            item =>
              item.area
          )

          .filter(Boolean)

      )
    ];


  return (

    areas.length

      ? [
          "전체",
          ...areas.sort()
        ]

      : AREA_FALLBACK
  );

}


function renderAreaChips(
  areas
){

  [
    els.homeAreaChips,
    els.searchAreaChips
  ]

  .filter(Boolean)

  .forEach(

    container => {

      container.innerHTML =
        "";


      areas.forEach(

        area => {

          const button =
            document.createElement(
              "button"
            );


          button.type =
            "button";


          button.className =
            `chip ${
              state.selectedArea ===
              area
                ? "is-active"
                : ""
            }`;


          button.textContent =
            area === "전체"
              ? t("all")
              : area;


          button.addEventListener(

            "click",

            () => {

              state.selectedArea =
                area;

              state.visibleCount =
                10;


              renderAreaChips(
                getAreaList()
              );


              if(
                container ===
                els.homeAreaChips
              ){

                switchView(
                  "search"
                );

              }


              applyFilters();

            }

          );


          container.appendChild(
            button
          );

        }

      );

    }

  );

}


/* =========================================
   메뉴
========================================= */

function renderMenuChips(){

  [
    els.homeMenuChips,
    els.searchMenuChips
  ]

  .filter(Boolean)

  .forEach(

    container => {

      container.innerHTML =
        "";


      Object.keys(
        MENU_CATEGORIES
      )
      .forEach(

        menu => {

          const button =
            document.createElement(
              "button"
            );


          button.type =
            "button";


          button.className =
            `chip ${
              state.selectedMenu ===
              menu
                ? "is-active"
                : ""
            }`;


          button.textContent =
            MENU_LABELS[
              state.language
            ]?.[menu]
            ??
            menu;


          button.addEventListener(

            "click",

            () => {

              state.selectedMenu =
                menu;

              state.visibleCount =
                10;


              renderMenuChips();


              if(
                container ===
                els.homeMenuChips
              ){

                switchView(
                  "search"
                );

              }


              applyFilters();

            }

          );


          container.appendChild(
            button
          );

        }

      );

    }

  );

}


function matchesMenuCategory(
  item,
  category
){

  const keywords =
    MENU_CATEGORIES[
      category
    ];


  if(
    !keywords.length
  ){

    return true;

  }


  const text = [

    item.menu,

    item.title,

    item.description

  ]

  .join(" ")

  .toLowerCase();


  return (
    keywords.some(

      keyword =>
        text.includes(
          keyword.toLowerCase()
        )

    )
  );

}


/* =========================================
   리스트 출력
========================================= */

function renderCards(
  container,
  items
){

  if(!container){
    return;
  }


  container.innerHTML =
    "";


  items.forEach(

    item => {

      container.appendChild(
        createRestaurantCard(
          item
        )
      );

    }

  );

}


/* =========================================
   선생님 시안 리스트형
========================================= */

function createRestaurantCard(
  item
){

  const card =
    document.createElement(
      "article"
    );


  card.className =
    "restaurant-card";


  const favorite =
    state.favorites.includes(
      item.id
    );


  const address =
    [
      item.address1,
      item.address2
    ]

    .filter(Boolean)

    .join(" ");


  card.innerHTML = `

    <div class="restaurant-card-body">

      <h4>
        ${escapeHtml(
          item.title
        )}
      </h4>


      <p class="restaurant-address">

        ${escapeHtml(
          address
          ||
          t("noInfo")
        )}

      </p>


      <p class="restaurant-menu">

        ${escapeHtml(
          item.menu
          ||
          t("menuUnknown")
        )}

      </p>


      ${
        item.distance !== null

          ? `

            <p class="restaurant-distance">

              ${formatDistance(
                item.distance
              )}

            </p>

          `

          : ""
      }

    </div>


    <div class="restaurant-actions">

      <button
        type="button"
        class="list-detail-btn"
        title="상세보기"
      >
        ⌕
      </button>


      <button
        type="button"
        class="favorite-btn ${
          favorite
            ? "is-active"
            : ""
        }"
        title="즐겨찾기"
      >

        ${
          favorite
            ? "♥"
            : "♡"
        }

      </button>

    </div>

  `;


  /* 리스트 전체 클릭 */
  card.addEventListener(

    "click",

    event => {

      if(
        event.target.closest(
          ".favorite-btn"
        )
      ){

        return;

      }


      openDetail(
        item.id
      );

    }

  );


  card
    .querySelector(
      ".favorite-btn"
    )
    .addEventListener(

      "click",

      event => {

        event.stopPropagation();

        toggleFavorite(
          item.id
        );

      }

    );


  return card;

}


/* =========================================
   즐겨찾기
========================================= */

function toggleFavorite(
  id
){

  const index =
    state.favorites.indexOf(
      id
    );


  if(
    index >= 0
  ){

    state.favorites.splice(
      index,
      1
    );

    showToast(
      t(
        "favoriteRemoved"
      )
    );

  }else{

    state.favorites.unshift(
      id
    );

    showToast(
      t(
        "favoriteAdded"
      )
    );

  }


  saveLocalArray(
    "busan-food-favorites",
    state.favorites
  );


  renderAllLists();


  if(
    state.currentDetailId ===
    id
    &&
    !els.detailModal.hidden
  ){

    openDetail(
      id,
      false
    );

  }

}


/* =========================================
   즐겨찾기 화면
========================================= */

function renderFavorites(){

  const items =
    state.favorites

      .map(

        id =>
          state.restaurants.find(
            item =>
              item.id === id
          )

      )

      .filter(Boolean);


  els.favoriteEmpty.hidden =
    items.length > 0;


  renderCards(
    els.favoriteList,
    items
  );

}


/* =========================================
   최근 본
========================================= */

function addRecent(
  id
){

  state.recent =
    state.recent.filter(
      item =>
        item !== id
    );


  state.recent.unshift(
    id
  );


  state.recent =
    state.recent.slice(
      0,
      10
    );


  saveLocalArray(
    "busan-food-recent",
    state.recent
  );

}


function renderRecent(){

  const items =
    state.recent

      .map(

        id =>
          state.restaurants.find(
            item =>
              item.id === id
          )

      )

      .filter(Boolean);


  els.recentSection.hidden =
    !items.length;


  renderCards(
    els.recentList,
    items
  );

}


/* =========================================
   상세 페이지
========================================= */

function openDetail(
  id,
  addToRecent = true
){

  const item =
    state.restaurants.find(

      restaurant =>
        restaurant.id ===
        String(id)

    );


  if(!item){
    return;
  }


  state.currentDetailId =
    item.id;


  if(
    addToRecent
  ){

    addRecent(
      item.id
    );

  }


  const favorite =
    state.favorites.includes(
      item.id
    );


  const address =
    [
      item.address1,
      item.address2
    ]

    .filter(Boolean)

    .join(" ");


  els.detailContent.innerHTML = `

    <!-- =========================================
         상단 이미지 + 정보
    ========================================== -->
    <section class="detail-layout">


      <!-- 이미지 -->
      <div class="detail-image-wrap">

        ${
          item.image
          ||
          item.thumb

            ? `

              <img
                src="${escapeHtml(
                  item.image
                  ||
                  item.thumb
                )}"
                alt="${escapeHtml(
                  item.title
                )}"
              >

            `

            : `

              <div class="image-fallback">
                ${escapeHtml(
                  t("imagePreparing")
                )}
              </div>

            `
        }


        <button
          id="detailFavoriteBtn"
          class="detail-favorite ${
            favorite
              ? "is-active"
              : ""
          }"
          type="button"
        >

          ${
            favorite
              ? "♥"
              : "♡"
          }

        </button>

      </div>


      <!-- 정보 -->
      <div class="detail-info-area">


        <div class="detail-info-row">

          <span class="detail-label">
            ${escapeHtml(
              t("restaurantName")
            )}
          </span>


          <p class="detail-value">

            ${escapeHtml(
              item.title
            )}

          </p>

        </div>


        <div class="detail-info-row">

          <span class="detail-label">
            ${escapeHtml(
              t("address")
            )}
          </span>


          <p class="detail-value">

            ${escapeHtml(
              address
              ||
              t("noInfo")
            )}

          </p>

        </div>


        <div class="detail-info-row">

          <span class="detail-label">
            ${escapeHtml(
              t("restaurantIntro")
            )}
          </span>


          <p class="detail-value detail-description">

            ${escapeHtml(
              item.description
              ||
              t("noInfo")
            )}

          </p>

        </div>


        <div class="detail-info-row">

          <span class="detail-label">
            ${escapeHtml(
              t("representativeMenu")
            )}
          </span>


          <p class="detail-value">

            ${escapeHtml(
              item.menu
              ||
              t("noInfo")
            )}

          </p>

        </div>


        <div class="detail-info-row">

          <span class="detail-label">
            ${escapeHtml(
              t("phoneNumber")
            )}
          </span>


          <p class="detail-value">

            ${
              item.phone

                ? `

                  <a href="tel:${escapeHtml(
                    item.phone.replace(
                      /[^\d+]/g,
                      ""
                    )
                  )}">

                    ${escapeHtml(
                      item.phone
                    )}

                  </a>

                `

                : escapeHtml(
                    t("noInfo")
                  )
            }

          </p>

        </div>


        <div class="detail-info-row">

          <span class="detail-label">
            ${escapeHtml(
              t("operatingHours")
            )}
          </span>


          <p class="detail-value">

            ${escapeHtml(
              item.hours
              ||
              t("noInfo")
            )}

          </p>

        </div>


        ${
          item.homepage

            ? `

              <a
                href="${escapeHtml(
                  item.homepage
                )}"
                target="_blank"
                rel="noopener"
                class="detail-homepage"
              >

                ${escapeHtml(
                  t("homepage")
                )}

              </a>

            `

            : `

              <span
                class="detail-homepage disabled"
              >

                ${escapeHtml(
                  t("noHomepage")
                )}

              </span>

            `
        }

      </div>

    </section>


    <!-- =========================================
         지도
    ========================================== -->
    <section class="detail-map-area">

      <div
        id="detailMap"
        class="detail-map"
      ></div>


      <div class="detail-route">

        <button
          id="detailRouteBtn"
          type="button"
        >
          카카오맵 길찾기
        </button>

      </div>

    </section>

  `;


  els.detailModal.hidden =
    false;


  document.body.style.overflow =
    "hidden";


  $("#detailFavoriteBtn")
    .addEventListener(

      "click",

      () => {

        toggleFavorite(
          item.id
        );

      }

    );


  $("#detailRouteBtn")
    .addEventListener(

      "click",

      () => {

        openRoute(
          item
        );

      }

    );


  setTimeout(

    () => {

      renderDetailMap(
        item
      );

    },

    100

  );

}


/* =========================================
   상세 닫기
========================================= */

function closeDetail(){

  els.detailModal.hidden =
    true;


  document.body.style.overflow =
    "";


  state.currentDetailId =
    null;

}


/* =========================================
   카카오 SDK
========================================= */

function loadKakaoMapSdk(){

  if(
    !KAKAO_JAVASCRIPT_KEY
    ||
    KAKAO_JAVASCRIPT_KEY.includes(
      "여기에"
    )
  ){

    console.warn(
      "카카오 JavaScript 키를 입력해주세요."
    );

    return;

  }


  if(
    window.kakao?.maps
  ){

    state.kakaoReady =
      true;

    return;

  }


  const script =
    document.createElement(
      "script"
    );


  script.src =
    `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(KAKAO_JAVASCRIPT_KEY)}&autoload=false`;


  script.onload =
    () => {

      kakao.maps.load(

        () => {

          state.kakaoReady =
            true;

        }

      );

    };


  document.head.appendChild(
    script
  );

}


/* =========================================
   상세 카카오 지도
========================================= */

function renderDetailMap(
  item
){

  const container =
    $("#detailMap");


  if(!container){
    return;
  }


  if(
    !state.kakaoReady
    ||
    !window.kakao?.maps
  ){

    container.innerHTML = `

      <div class="image-fallback">
        카카오 지도 API KEY를 확인해주세요.
      </div>

    `;

    return;

  }


  if(
    item.lat === null
    ||
    item.lng === null
  ){

    container.innerHTML = `

      <div class="image-fallback">
        위치정보가 없습니다.
      </div>

    `;

    return;

  }


  const position =
    new kakao.maps.LatLng(

      item.lat,

      item.lng

    );


  state.detailMap =
    new kakao.maps.Map(

      container,

      {

        center:position,

        level:4

      }

    );


  const marker =
    new kakao.maps.Marker({

      map:
        state.detailMap,

      position

    });


  const info =
    new kakao.maps.InfoWindow({

      content:`

        <div
          style="
            padding:10px;
            min-width:150px;
            font-size:13px;
          "
        >

          <strong>
            ${escapeHtml(
              item.title
            )}
          </strong>

          <br>

          <a
            href="https://map.kakao.com/link/map/${encodeURIComponent(item.title)},${item.lat},${item.lng}"
            target="_blank"
          >
            큰지도보기
          </a>

          /

          <a
            href="https://map.kakao.com/link/to/${encodeURIComponent(item.title)},${item.lat},${item.lng}"
            target="_blank"
          >
            길찾기
          </a>

        </div>

      `

    });


  info.open(

    state.detailMap,

    marker

  );

}


/* =========================================
   검색 지도
========================================= */

function renderSearchMap(){

  const container =
    $("#searchMap");


  if(
    !state.kakaoReady
    ||
    !window.kakao?.maps
  ){

    container.innerHTML =
      "카카오 지도 API KEY를 확인해주세요.";

    return;

  }


  container.innerHTML =
    "";


  const points =
    state.filteredRestaurants
      .filter(

        item =>
          item.lat !== null
          &&
          item.lng !== null

      );


  const center =
    points.length

      ? new kakao.maps.LatLng(

          points[0].lat,

          points[0].lng

        )

      : new kakao.maps.LatLng(

          35.1796,

          129.0756

        );


  const map =
    new kakao.maps.Map(

      container,

      {

        center,

        level:7

      }

    );


  const bounds =
    new kakao.maps.LatLngBounds();


  points.forEach(

    item => {

      const position =
        new kakao.maps.LatLng(

          item.lat,

          item.lng

        );


      const marker =
        new kakao.maps.Marker({

          map,

          position

        });


      bounds.extend(
        position
      );


      kakao.maps.event.addListener(

        marker,

        "click",

        () => {

          openDetail(
            item.id
          );

        }

      );

    }

  );


  if(
    !bounds.isEmpty()
  ){

    map.setBounds(
      bounds
    );

  }

}


/* =========================================
   목록 / 지도
========================================= */

function setSearchViewMode(
  mode
){

  state.viewMode =
    mode;


  els.listModeBtn
    .classList.toggle(
      "is-active",
      mode === "list"
    );


  els.mapModeBtn
    .classList.toggle(
      "is-active",
      mode === "map"
    );


  els.searchListPanel.hidden =
    mode !== "list";


  els.searchMapPanel.hidden =
    mode !== "map";


  if(
    mode === "map"
  ){

    setTimeout(
      renderSearchMap,
      100
    );

  }

}


/* =========================================
   길찾기
========================================= */

function openRoute(
  item
){

  if(
    item.lat === null
    ||
    item.lng === null
  ){

    return;

  }


  window.open(

    `https://map.kakao.com/link/to/${encodeURIComponent(item.title)},${item.lat},${item.lng}`,

    "_blank"

  );

}


/* =========================================
   현재 위치
========================================= */

function requestUserLocation(){

  if(
    !navigator.geolocation
  ){

    return;

  }


  navigator.geolocation
    .getCurrentPosition(

      position => {

        state.userLocation = {

          lat:
            position.coords.latitude,

          lng:
            position.coords.longitude

        };


        renderAllLists();

        applyFilters();

      },

      error => {

        console.warn(
          error
        );

      }

    );

}


/* =========================================
   거리
========================================= */

function withDistances(
  items
){

  if(
    !state.userLocation
  ){

    return (
      items.map(
        item => ({
          ...item,
          distance:null
        })
      )
    );

  }


  return (

    items.map(

      item => ({

        ...item,

        distance:
          item.lat === null
          ||
          item.lng === null

            ? null

            : haversine(

                state.userLocation.lat,

                state.userLocation.lng,

                item.lat,

                item.lng

              )

      })

    )

  );

}


function haversine(
  lat1,
  lng1,
  lat2,
  lng2
){

  const R =
    6371;


  const rad =
    value =>
      value *
      Math.PI /
      180;


  const dLat =
    rad(
      lat2 -
      lat1
    );


  const dLng =
    rad(
      lng2 -
      lng1
    );


  const a =

    Math.sin(
      dLat / 2
    ) ** 2

    +

    Math.cos(
      rad(lat1)
    )

    *

    Math.cos(
      rad(lat2)
    )

    *

    Math.sin(
      dLng / 2
    ) ** 2;


  return (

    R *
    2 *
    Math.atan2(

      Math.sqrt(a),

      Math.sqrt(
        1-a
      )

    )

  );

}


function formatDistance(
  km
){

  return (
    km < 1

      ? `${Math.round(
          km * 1000
        )}m`

      : `${km.toFixed(1)}km`
  );

}


/* =========================================
   화면 전환
========================================= */

function switchView(
  target
){

  $$(".view")
    .forEach(

      view => {

        view.classList.toggle(

          "is-active",

          view.dataset.view ===
          target

        );

      }

    );


  $$(".nav-btn")
    .forEach(

      button => {

        button.classList.toggle(

          "is-active",

          button.dataset.target ===
          target

        );

      }

    );


  window.scrollTo(
    0,
    0
  );

}


/* =========================================
   테마
========================================= */

function applyTheme(
  theme
){

  let selected =
    theme;


  if(
    theme === "system"
  ){

    selected =
      window.matchMedia(
        "(prefers-color-scheme:dark)"
      ).matches

        ? "dark"

        : "light";

  }


  document.documentElement
    .dataset
    .theme =
      selected;

}


/* =========================================
   로딩
========================================= */

function showLoading(){

  const html = `

    <div class="loading-card">
      부산 맛집 정보를 불러오는 중입니다...
    </div>

  `;


  els.homeRestaurantList.innerHTML =
    html;


  els.searchRestaurantList.innerHTML =
    html;

}


/* =========================================
   오류
========================================= */

function renderApiError(
  error
){

  const html = `

    <div class="error-card">

      <strong>
        맛집 정보를 불러오지 못했습니다.
      </strong>

      <p>
        ${escapeHtml(
          error.message
        )}
      </p>

    </div>

  `;


  els.homeRestaurantList.innerHTML =
    html;


  els.searchRestaurantList.innerHTML =
    html;

}


/* =========================================
   전체 재출력
========================================= */

function renderAllLists(){

  renderHome();

  renderSearchResults();

  renderFavorites();

  renderRecent();

}


/* =========================================
   localStorage
========================================= */

function loadLocalArray(
  key
){

  try{

    const value =
      JSON.parse(
        localStorage.getItem(
          key
        )
      );


    return (
      Array.isArray(
        value
      )
        ? value.map(
            String
          )

        : []
    );

  }catch{

    return [];

  }

}


function saveLocalArray(
  key,
  value
){

  localStorage.setItem(

    key,

    JSON.stringify(
      value
    )

  );

}


/* =========================================
   토스트
========================================= */

let toastTimer;


function showToast(
  message
){

  clearTimeout(
    toastTimer
  );


  els.toast.textContent =
    message;


  els.toast.classList.add(
    "is-show"
  );


  toastTimer =
    setTimeout(

      () => {

        els.toast.classList.remove(
          "is-show"
        );

      },

      2200

    );

}


/* =========================================
   HTML 특수문자
========================================= */

function escapeHtml(
  value
){

  return (
    String(
      value ?? ""
    )

    .replaceAll(
      "&",
      "&amp;"
    )

    .replaceAll(
      "<",
      "&lt;"
    )

    .replaceAll(
      ">",
      "&gt;"
    )

    .replaceAll(
      '"',
      "&quot;"
    )

    .replaceAll(
      "'",
      "&#039;"
    )
  );

}
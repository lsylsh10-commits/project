/* =========================================
   부산 맛집 정보 서비스
   HTML / CSS / Vanilla JavaScript
========================================= */

/* =========================================
   1. API KEY 설정
========================================= */

// 공공데이터포털 인증키
const SERVICE_KEY = "%2Fjk9Y7KN4jKnVImNXwk9H9PX03jqBFVeGoUtz8AZvCG5P5hBSByWVULOaT4UtWIvqL0V%2BCiPImNBbK6tdvX%2FSA%3D%3D";

// 카카오 Developers JavaScript 키
const KAKAO_JAVASCRIPT_KEY = "96a7a58d2bdc24d0dc8c4cb3a1420557";


/* =========================================
   부산 맛집 서비스
   다국어 API + 검색 + 즐겨찾기 + 지도
========================================= */


/* =========================================
   1. 부산맛집 다국어 API
========================================= */

const FOOD_API_BASE_URL =
  "https://apis.data.go.kr/6260000/FoodService";


const LANGUAGE_ENDPOINTS = {

  kr: "getFoodKr",

  en: "getFoodEn",

  ja: "getFoodJa",

  zhs: "getFoodZhs",

  zht: "getFoodZht"

};


/* =========================================
   2. UI 다국어
========================================= */

const I18N = {

  kr: {

    appTitle: "부산 맛집",

    heroKicker:
      "부산에서 오늘 뭐 먹지?",

    heroTitle:
      "지역, 메뉴, 내 위치까지<br>한 번에 찾아보세요.",

    searchPlaceholder:
      "맛집 또는 메뉴를 검색하세요",

    nearbyTitle:
      "내 주변 맛집",

    useLocation:
      "내 위치 사용",

    locationGuideTitle:
      "현재 위치를 기준으로 찾아드려요.",

    locationGuideText:
      "위치 권한을 허용하면 가까운 맛집부터 확인할 수 있습니다.",

    areaTitle:
      "지역별 맛집",

    menuTitle:
      "메뉴별 맛집",

    randomTitle:
      "오늘 뭐 먹지?",

    randomButton:
      "랜덤 추천",

    randomGuide:
      "버튼을 누르면 부산 맛집 하나를 골라드려요.",

    recommendTitle:
      "부산 추천 맛집",

    recentTitle:
      "최근 본 맛집",

    searchTitle:
      "부산 맛집 찾기",

    areaFilter:
      "지역별",

    menuFilter:
      "메뉴별",

    reset:
      "초기화",

    sortDefault:
      "기본순",

    sortDistance:
      "가까운순",

    sortName:
      "이름순",

    listView:
      "목록",

    mapView:
      "지도",

    loadMore:
      "더보기",

    favoriteTitle:
      "즐겨찾기",

    favoriteEmptyTitle:
      "아직 저장한 맛집이 없습니다.",

    favoriteEmptyText:
      "마음에 드는 맛집의 하트 버튼을 눌러보세요.",

    settingsTitle:
      "설정",

    themeTitle:
      "테마",

    themeText:
      "화면 모드를 선택하세요.",

    light:
      "라이트",

    dark:
      "다크",

    system:
      "시스템",

    languageTitle:
      "언어",

    languageText:
      "앱 화면 언어를 변경합니다.",

    locationTitle:
      "현재 위치",

    locationText:
      "내 주변 맛집과 가까운 순 정렬에 사용됩니다.",

    checkLocation:
      "위치 확인",

    clearFavoriteTitle:
      "즐겨찾기 초기화",

    clearFavoriteText:
      "저장한 맛집을 모두 삭제합니다.",

    clearRecentTitle:
      "최근 본 맛집 초기화",

    clearRecentText:
      "최근 조회 기록을 모두 삭제합니다.",

    dataGuideTitle:
      "데이터 안내",

    dataGuideText:
      "운영시간 등은 부산광역시 제공 공공데이터 기준이며 실제 정보와 차이가 있을 수 있습니다.",

    navHome:
      "홈",

    navSearch:
      "검색",

    navFavorite:
      "즐겨찾기",

    navSettings:
      "설정",

    all:
      "전체",

    detail:
      "상세보기",

    menuUnknown:
      "대표메뉴 정보 없음",

    timeUnknown:
      "운영시간 정보 없음",

    imagePreparing:
      "맛집 이미지 준비중",

    result:
      "검색 결과",

    countUnit:
      "개",

    apiKeyRequired:
      "공공데이터 API 인증키가 필요합니다.",

    apiKeyGuide:
      "js/script.js 파일의 SERVICE_KEY 값을 발급받은 인증키로 교체해주세요.",

    apiFailTitle:
      "맛집 정보를 불러오지 못했습니다.",

    apiRetry:
      "다시 시도",

    api403:
      "API 접근이 거부되었습니다. 인증키와 활용신청 상태를 확인해주세요.",

    noResult:
      "검색 결과가 없습니다.",

    noResultText:
      "다른 지역이나 메뉴를 검색해보세요.",

    favoriteAdded:
      "즐겨찾기에 저장했습니다.",

    favoriteRemoved:
      "즐겨찾기에서 삭제했습니다.",

    currentDistance:
      "현재 위치에서",

    phone:
      "전화하기",

    homepage:
      "홈페이지",

    route:
      "현재 위치에서 길찾기",

    share:
      "공유하기",

    representativeMenu:
      "대표메뉴",

    operatingHours:
      "운영시간",

    address:
      "주소",

    phoneNumber:
      "전화번호",

    location:
      "위치",

    restaurantIntro:
      "맛집 소개",

    noInfo:
      "정보 없음"

  },


  en: {

    appTitle:
      "Busan Food",

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
      "Tap the button for a random Busan restaurant.",

    recommendTitle:
      "Recommended in Busan",

    recentTitle:
      "Recently Viewed",

    searchTitle:
      "Find Busan Restaurants",

    areaFilter:
      "Area",

    menuFilter:
      "Menu",

    reset:
      "Reset",

    sortDefault:
      "Default",

    sortDistance:
      "Nearest",

    sortName:
      "Name",

    listView:
      "List",

    mapView:
      "Map",

    loadMore:
      "Load More",

    favoriteTitle:
      "Favorites",

    favoriteEmptyTitle:
      "No saved restaurants yet.",

    favoriteEmptyText:
      "Tap the heart button to save a restaurant.",

    settingsTitle:
      "Settings",

    themeTitle:
      "Theme",

    themeText:
      "Choose a display theme.",

    light:
      "Light",

    dark:
      "Dark",

    system:
      "System",

    languageTitle:
      "Language",

    languageText:
      "Change the app interface language.",

    locationTitle:
      "Current Location",

    locationText:
      "Used for nearby restaurants and distance sorting.",

    checkLocation:
      "Check Location",

    clearFavoriteTitle:
      "Clear Favorites",

    clearFavoriteText:
      "Delete all saved restaurants.",

    clearRecentTitle:
      "Clear Recent",

    clearRecentText:
      "Delete recently viewed history.",

    dataGuideTitle:
      "Data Notice",

    dataGuideText:
      "Operating hours are based on Busan public data and may differ from actual information.",

    navHome:
      "Home",

    navSearch:
      "Search",

    navFavorite:
      "Favorites",

    navSettings:
      "Settings",

    all:
      "All",

    detail:
      "View Details",

    menuUnknown:
      "No menu information",

    timeUnknown:
      "No hours information",

    imagePreparing:
      "Image unavailable",

    result:
      "Results",

    countUnit:
      "",

    apiKeyRequired:
      "Public Data API key is required.",

    apiKeyGuide:
      "Replace SERVICE_KEY with your issued API key.",

    apiFailTitle:
      "Could not load restaurant information.",

    apiRetry:
      "Retry",

    api403:
      "API access was denied.",

    noResult:
      "No results found.",

    noResultText:
      "Try another area or menu.",

    favoriteAdded:
      "Saved to favorites.",

    favoriteRemoved:
      "Removed from favorites.",

    currentDistance:
      "From your location",

    phone:
      "Call",

    homepage:
      "Website",

    route:
      "Directions",

    share:
      "Share",

    representativeMenu:
      "Menu",

    operatingHours:
      "Hours",

    address:
      "Address",

    phoneNumber:
      "Phone",

    location:
      "Location",

    restaurantIntro:
      "About",

    noInfo:
      "No information"

  },


  ja: {

    appTitle:
      "釜山グルメ",

    heroKicker:
      "釜山で今日は何を食べる？",

    heroTitle:
      "地域・メニュー・現在地から<br>一度に探せます。",

    searchPlaceholder:
      "店名またはメニューを検索",

    nearbyTitle:
      "近くのグルメ",

    useLocation:
      "現在地を使用",

    locationGuideTitle:
      "現在地を基準に探します。",

    locationGuideText:
      "位置情報を許可すると近い順に確認できます。",

    areaTitle:
      "地域別",

    menuTitle:
      "メニュー別",

    randomTitle:
      "今日は何を食べる？",

    randomButton:
      "ランダム",

    randomGuide:
      "釜山のお店をランダムにおすすめします。",

    recommendTitle:
      "釜山おすすめグルメ",

    recentTitle:
      "最近見たお店",

    searchTitle:
      "釜山グルメ検索",

    areaFilter:
      "地域",

    menuFilter:
      "メニュー",

    reset:
      "リセット",

    sortDefault:
      "基本順",

    sortDistance:
      "近い順",

    sortName:
      "名前順",

    listView:
      "リスト",

    mapView:
      "地図",

    loadMore:
      "もっと見る",

    favoriteTitle:
      "お気に入り",

    favoriteEmptyTitle:
      "保存したお店はまだありません。",

    favoriteEmptyText:
      "ハートボタンでお気に入りに追加できます。",

    settingsTitle:
      "設定",

    themeTitle:
      "テーマ",

    themeText:
      "画面モードを選択してください。",

    light:
      "ライト",

    dark:
      "ダーク",

    system:
      "システム",

    languageTitle:
      "言語",

    languageText:
      "アプリの表示言語を変更します。",

    locationTitle:
      "現在地",

    locationText:
      "近くのお店と距離順の表示に使用します。",

    checkLocation:
      "位置確認",

    clearFavoriteTitle:
      "お気に入り初期化",

    clearFavoriteText:
      "保存したお店を削除します。",

    clearRecentTitle:
      "履歴初期化",

    clearRecentText:
      "最近見た履歴を削除します。",

    dataGuideTitle:
      "データ案内",

    dataGuideText:
      "営業時間などは釜山市の公開データを基準にしています。",

    navHome:
      "ホーム",

    navSearch:
      "検索",

    navFavorite:
      "お気に入り",

    navSettings:
      "設定",

    all:
      "全体",

    detail:
      "詳細を見る",

    menuUnknown:
      "代表メニュー情報なし",

    timeUnknown:
      "営業時間情報なし",

    imagePreparing:
      "画像準備中",

    result:
      "検索結果",

    countUnit:
      "件",

    apiKeyRequired:
      "公共データAPIキーが必要です。",

    apiKeyGuide:
      "SERVICE_KEYを確認してください。",

    apiFailTitle:
      "グルメ情報を読み込めませんでした。",

    apiRetry:
      "再試行",

    api403:
      "APIアクセスが拒否されました。",

    noResult:
      "検索結果がありません。",

    noResultText:
      "別の地域やメニューで検索してください。",

    favoriteAdded:
      "お気に入りに保存しました。",

    favoriteRemoved:
      "お気に入りから削除しました。",

    currentDistance:
      "現在地から",

    phone:
      "電話",

    homepage:
      "ホームページ",

    route:
      "ルート",

    share:
      "共有",

    representativeMenu:
      "代表メニュー",

    operatingHours:
      "営業時間",

    address:
      "住所",

    phoneNumber:
      "電話番号",

    location:
      "位置",

    restaurantIntro:
      "お店紹介",

    noInfo:
      "情報なし"

  },


  zhs: {

    appTitle:
      "釜山美食",

    heroKicker:
      "今天在釜山吃什么？",

    heroTitle:
      "按地区、菜单和当前位置<br>一次查找。",

    searchPlaceholder:
      "搜索餐厅或菜单",

    nearbyTitle:
      "附近美食",

    useLocation:
      "使用当前位置",

    locationGuideTitle:
      "根据当前位置查找。",

    locationGuideText:
      "允许定位后可查看附近餐厅。",

    areaTitle:
      "按地区",

    menuTitle:
      "按菜单",

    randomTitle:
      "今天吃什么？",

    randomButton:
      "随机推荐",

    randomGuide:
      "随机推荐一家釜山餐厅。",

    recommendTitle:
      "釜山推荐美食",

    recentTitle:
      "最近浏览",

    searchTitle:
      "查找釜山美食",

    areaFilter:
      "地区",

    menuFilter:
      "菜单",

    reset:
      "重置",

    sortDefault:
      "默认",

    sortDistance:
      "距离最近",

    sortName:
      "名称",

    listView:
      "列表",

    mapView:
      "地图",

    loadMore:
      "查看更多",

    favoriteTitle:
      "收藏",

    favoriteEmptyTitle:
      "还没有收藏的餐厅。",

    favoriteEmptyText:
      "点击心形按钮即可收藏。",

    settingsTitle:
      "设置",

    themeTitle:
      "主题",

    themeText:
      "选择显示模式。",

    light:
      "浅色",

    dark:
      "深色",

    system:
      "系统",

    languageTitle:
      "语言",

    languageText:
      "更改应用界面语言。",

    locationTitle:
      "当前位置",

    locationText:
      "用于附近美食和距离排序。",

    checkLocation:
      "确认位置",

    clearFavoriteTitle:
      "清空收藏",

    clearFavoriteText:
      "删除所有收藏。",

    clearRecentTitle:
      "清空浏览记录",

    clearRecentText:
      "删除浏览记录。",

    dataGuideTitle:
      "数据说明",

    dataGuideText:
      "营业时间等信息基于釜山市公共数据。",

    navHome:
      "首页",

    navSearch:
      "搜索",

    navFavorite:
      "收藏",

    navSettings:
      "设置",

    all:
      "全部",

    detail:
      "查看详情",

    menuUnknown:
      "暂无菜单信息",

    timeUnknown:
      "暂无营业时间",

    imagePreparing:
      "暂无图片",

    result:
      "搜索结果",

    countUnit:
      "个",

    apiKeyRequired:
      "需要公共数据API密钥。",

    apiKeyGuide:
      "请确认SERVICE_KEY。",

    apiFailTitle:
      "无法加载美食信息。",

    apiRetry:
      "重试",

    api403:
      "API访问被拒绝。",

    noResult:
      "没有搜索结果。",

    noResultText:
      "请尝试其他地区或菜单。",

    favoriteAdded:
      "已添加到收藏。",

    favoriteRemoved:
      "已从收藏中删除。",

    currentDistance:
      "距当前位置",

    phone:
      "电话",

    homepage:
      "官网",

    route:
      "路线",

    share:
      "分享",

    representativeMenu:
      "代表菜单",

    operatingHours:
      "营业时间",

    address:
      "地址",

    phoneNumber:
      "电话",

    location:
      "位置",

    restaurantIntro:
      "餐厅介绍",

    noInfo:
      "暂无信息"

  },


  zht: {

    appTitle:
      "釜山美食",

    heroKicker:
      "今天在釜山吃什麼？",

    heroTitle:
      "按地區、菜單和目前位置<br>一次查找。",

    searchPlaceholder:
      "搜尋餐廳或菜單",

    nearbyTitle:
      "附近美食",

    useLocation:
      "使用目前位置",

    locationGuideTitle:
      "依目前位置查找。",

    locationGuideText:
      "允許定位後可查看附近餐廳。",

    areaTitle:
      "按地區",

    menuTitle:
      "按菜單",

    randomTitle:
      "今天吃什麼？",

    randomButton:
      "隨機推薦",

    randomGuide:
      "隨機推薦一家釜山餐廳。",

    recommendTitle:
      "釜山推薦美食",

    recentTitle:
      "最近瀏覽",

    searchTitle:
      "搜尋釜山美食",

    areaFilter:
      "地區",

    menuFilter:
      "菜單",

    reset:
      "重設",

    sortDefault:
      "預設",

    sortDistance:
      "最近",

    sortName:
      "名稱",

    listView:
      "列表",

    mapView:
      "地圖",

    loadMore:
      "查看更多",

    favoriteTitle:
      "收藏",

    favoriteEmptyTitle:
      "目前沒有收藏的餐廳。",

    favoriteEmptyText:
      "點擊愛心即可收藏。",

    settingsTitle:
      "設定",

    themeTitle:
      "主題",

    themeText:
      "選擇顯示模式。",

    light:
      "淺色",

    dark:
      "深色",

    system:
      "系統",

    languageTitle:
      "語言",

    languageText:
      "變更應用程式介面語言。",

    locationTitle:
      "目前位置",

    locationText:
      "用於附近美食和距離排序。",

    checkLocation:
      "確認位置",

    clearFavoriteTitle:
      "清空收藏",

    clearFavoriteText:
      "刪除所有收藏。",

    clearRecentTitle:
      "清空瀏覽紀錄",

    clearRecentText:
      "刪除瀏覽紀錄。",

    dataGuideTitle:
      "資料說明",

    dataGuideText:
      "營業時間等資訊依釜山市公共資料提供。",

    navHome:
      "首頁",

    navSearch:
      "搜尋",

    navFavorite:
      "收藏",

    navSettings:
      "設定",

    all:
      "全部",

    detail:
      "查看詳情",

    menuUnknown:
      "暫無菜單資訊",

    timeUnknown:
      "暫無營業時間",

    imagePreparing:
      "暫無圖片",

    result:
      "搜尋結果",

    countUnit:
      "個",

    apiKeyRequired:
      "需要公共資料API金鑰。",

    apiKeyGuide:
      "請確認SERVICE_KEY。",

    apiFailTitle:
      "無法載入美食資訊。",

    apiRetry:
      "重試",

    api403:
      "API存取被拒絕。",

    noResult:
      "沒有搜尋結果。",

    noResultText:
      "請嘗試其他地區或菜單。",

    favoriteAdded:
      "已加入收藏。",

    favoriteRemoved:
      "已從收藏移除。",

    currentDistance:
      "距目前位置",

    phone:
      "電話",

    homepage:
      "官網",

    route:
      "路線",

    share:
      "分享",

    representativeMenu:
      "代表菜單",

    operatingHours:
      "營業時間",

    address:
      "地址",

    phoneNumber:
      "電話",

    location:
      "位置",

    restaurantIntro:
      "餐廳介紹",

    noInfo:
      "暫無資訊"

  }

};


/* =========================================
   3. 메뉴 카테고리 표시명
========================================= */

const MENU_LABELS = {

  kr: {

    "전체": "전체",
    "한식": "한식",
    "일식": "일식",
    "중식": "중식",
    "양식": "양식",
    "고기": "고기",
    "해산물": "해산물",
    "국·탕": "국·탕",
    "카페·디저트": "카페·디저트"

  },


  en: {

    "전체": "All",
    "한식": "Korean",
    "일식": "Japanese",
    "중식": "Chinese",
    "양식": "Western",
    "고기": "Meat",
    "해산물": "Seafood",
    "국·탕": "Soup",
    "카페·디저트": "Cafe & Dessert"

  },


  ja: {

    "전체": "全体",
    "한식": "韓国料理",
    "일식": "日本料理",
    "중식": "中華料理",
    "양식": "洋食",
    "고기": "肉料理",
    "해산물": "海鮮",
    "국·탕": "スープ・鍋",
    "카페·디저트": "カフェ・デザート"

  },


  zhs: {

    "전체": "全部",
    "한식": "韩餐",
    "일식": "日餐",
    "중식": "中餐",
    "양식": "西餐",
    "고기": "肉类",
    "해산물": "海鲜",
    "국·탕": "汤类",
    "카페·디저트": "咖啡·甜点"

  },


  zht: {

    "전체": "全部",
    "한식": "韓餐",
    "일식": "日餐",
    "중식": "中餐",
    "양식": "西餐",
    "고기": "肉類",
    "해산물": "海鮮",
    "국·탕": "湯類",
    "카페·디저트": "咖啡·甜點"

  }

};


/* =========================================
   4. 메뉴 검색용 키워드
========================================= */

const MENU_CATEGORIES = {

  "전체": [],


  "한식": [

    "한식",
    "정식",
    "비빔",
    "국밥",
    "갈비",
    "불고기",
    "보쌈",
    "족발",
    "냉면",
    "밀면",
    "돼지국밥",

    "korean",
    "bibimbap",
    "bulgogi",
    "galbi",
    "gukbap",

    "韓国料理",
    "韓食",
    "ビビンバ",
    "プルコギ",

    "韩餐",
    "韩国料理",

    "韓餐",
    "韓國料理"

  ],


  "일식": [

    "초밥",
    "스시",
    "사시미",
    "우동",
    "소바",
    "돈카츠",
    "돈까스",
    "라멘",
    "일식",

    "japanese",
    "sushi",
    "sashimi",
    "udon",
    "soba",
    "ramen",

    "日本料理",
    "寿司",
    "刺身",
    "ラーメン",

    "日餐",
    "寿司",

    "日餐",
    "壽司"

  ],


  "중식": [

    "짬뽕",
    "짜장",
    "탕수육",
    "중식",
    "중국",
    "딤섬",
    "마라",

    "chinese",
    "jajang",
    "jjamppong",
    "dim sum",
    "mala",

    "中華",
    "中華料理",
    "麻辣",

    "中餐",
    "中国菜",

    "中餐",
    "中國菜"

  ],


  "양식": [

    "파스타",
    "스테이크",
    "피자",
    "리조또",
    "이탈리아",
    "양식",
    "브런치",

    "western",
    "pasta",
    "steak",
    "pizza",
    "risotto",
    "brunch",

    "洋食",
    "パスタ",
    "ステーキ",
    "ピザ",

    "西餐",
    "牛排",
    "披萨",

    "西餐",
    "牛排",
    "披薩"

  ],


  "고기": [

    "갈비",
    "삼겹",
    "한우",
    "고기",
    "오리",
    "불고기",
    "수육",
    "구이",

    "meat",
    "beef",
    "pork",
    "bbq",
    "barbecue",

    "肉",
    "牛肉",
    "豚肉",
    "焼肉",

    "肉类",
    "牛肉",
    "猪肉",

    "肉類",
    "牛肉",
    "豬肉"

  ],


  "해산물": [

    "회",
    "조개",
    "생선",
    "장어",
    "해물",
    "문어",
    "낙지",
    "전복",
    "게",
    "랍스터",

    "seafood",
    "fish",
    "shellfish",
    "eel",
    "octopus",
    "abalone",
    "crab",
    "lobster",

    "海鮮",
    "魚",
    "貝",
    "うなぎ",

    "海鲜",
    "鱼",
    "贝类",

    "海鮮",
    "魚",
    "貝類"

  ],


  "국·탕": [

    "국",
    "탕",
    "전골",
    "찌개",
    "샤브",

    "soup",
    "stew",
    "hot pot",

    "スープ",
    "鍋",
    "チゲ",

    "汤",
    "锅",
    "火锅",

    "湯",
    "鍋",
    "火鍋"

  ],


  "카페·디저트": [

    "카페",
    "커피",
    "라떼",
    "케이크",
    "디저트",
    "베이커리",
    "빵",
    "차",

    "cafe",
    "coffee",
    "latte",
    "cake",
    "dessert",
    "bakery",
    "bread",

    "カフェ",
    "コーヒー",
    "ケーキ",
    "デザート",

    "咖啡",
    "蛋糕",
    "甜点",

    "咖啡",
    "蛋糕",
    "甜點"

  ]

};


/* =========================================
   5. 부산 지역
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
   6. 앱 상태
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

  restaurants: [],

  filteredRestaurants: [],

  visibleCount: 12,

  selectedArea: "전체",

  selectedMenu: "전체",

  searchKeyword: "",

  sort: "default",

  viewMode: "list",

  favorites:
    loadLocalArray(
      "busan-food-favorites"
    ),

  recent:
    loadLocalArray(
      "busan-food-recent"
    ),

  userLocation: null,

  currentDetailId: null,

  kakaoReady: false,

  searchMap: null,

  detailMap: null

};


/* =========================================
   7. DOM 선택
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
    $("#toast")

};


/* =========================================
   8. 시작
========================================= */

init();


async function init(){

  bindEvents();

  applyTheme(
    state.theme
  );

  updateThemeButtons();

  syncLanguageSelects();

  applyLanguage();

  renderMenuChips();

  renderAreaChips(
    AREA_FALLBACK
  );

  await loadRestaurants();

  renderFavorites();

  renderRecent();

  loadKakaoMapSdk();

}


/* =========================================
   9. 이벤트
========================================= */

function bindEvents(){


  /* 하단 메뉴 */
  $$(".nav-btn").forEach(

    btn => {

      btn.addEventListener(

        "click",

        () => {

          switchView(
            btn.dataset.target
          );

        }

      );

    }

  );


  /* 홈 검색 버튼 */
  if(els.homeSearchBtn){

    els.homeSearchBtn.addEventListener(

      "click",

      () => {

        switchView(
          "search"
        );

        setTimeout(

          () => {

            els.searchInput.focus();

          },

          80

        );

      }

    );

  }


  /* 검색 */
  if(els.searchForm){

    els.searchForm.addEventListener(

      "submit",

      event => {

        event.preventDefault();

        state.searchKeyword =
          els.searchInput.value.trim();

        state.visibleCount = 12;

        applyFilters();

      }

    );

  }


  /* 정렬 */
  if(els.sortSelect){

    els.sortSelect.addEventListener(

      "change",

      () => {

        state.sort =
          els.sortSelect.value;

        applyFilters();

      }

    );

  }


  /* 필터 초기화 */
  if(els.resetFiltersBtn){

    els.resetFiltersBtn.addEventListener(

      "click",

      () => {

        state.searchKeyword = "";

        state.selectedArea = "전체";

        state.selectedMenu = "전체";

        state.sort = "default";

        state.visibleCount = 12;

        els.searchInput.value = "";

        els.sortSelect.value =
          "default";

        renderAreaChips(
          getAreaList()
        );

        renderMenuChips();

        applyFilters();

      }

    );

  }


  /* 더보기 */
  if(els.loadMoreBtn){

    els.loadMoreBtn.addEventListener(

      "click",

      () => {

        state.visibleCount += 12;

        renderSearchResults();

      }

    );

  }


  /* 목록 */
  if(els.listModeBtn){

    els.listModeBtn.addEventListener(

      "click",

      () => {

        setSearchViewMode(
          "list"
        );

      }

    );

  }


  /* 지도 */
  if(els.mapModeBtn){

    els.mapModeBtn.addEventListener(

      "click",

      () => {

        setSearchViewMode(
          "map"
        );

      }

    );

  }


  /* 위치 */
  if(els.requestLocationBtn){

    els.requestLocationBtn.addEventListener(

      "click",

      requestUserLocation

    );

  }


  if(els.settingsLocationBtn){

    els.settingsLocationBtn.addEventListener(

      "click",

      requestUserLocation

    );

  }


  /* 랜덤 */
  if(els.randomBtn){

    els.randomBtn.addEventListener(

      "click",

      showRandomRestaurant

    );

  }


  /* 상단 언어 */
  if(els.quickLanguageSelect){

    els.quickLanguageSelect.addEventListener(

      "change",

      () => {

        setLanguage(
          els.quickLanguageSelect.value
        );

      }

    );

  }


  /* 설정 언어 */
  if(els.languageSelect){

    els.languageSelect.addEventListener(

      "change",

      () => {

        setLanguage(
          els.languageSelect.value
        );

      }

    );

  }


  /* 테마 */
  if(els.themeOptions){

    els.themeOptions.addEventListener(

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

        updateThemeButtons();

      }

    );

  }


  /* 즐겨찾기 초기화 */
  if(els.clearFavoritesBtn){

    els.clearFavoritesBtn.addEventListener(

      "click",

      () => {

        if(
          !confirm(
            state.language === "kr"
              ? "즐겨찾기를 모두 삭제할까요?"
              : "Clear favorites?"
          )
        ){
          return;
        }

        state.favorites = [];

        saveLocalArray(
          "busan-food-favorites",
          []
        );

        renderAllLists();

      }

    );

  }


  /* 최근 본 초기화 */
  if(els.clearRecentBtn){

    els.clearRecentBtn.addEventListener(

      "click",

      () => {

        if(
          !confirm(
            state.language === "kr"
              ? "최근 본 맛집 기록을 삭제할까요?"
              : "Clear recent history?"
          )
        ){
          return;
        }

        state.recent = [];

        saveLocalArray(
          "busan-food-recent",
          []
        );

        renderRecent();

      }

    );

  }


  /* 모달 */
  if(els.detailModal){

    els.detailModal.addEventListener(

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

}


/* =========================================
   10. 번역
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


/* =========================================
   11. 언어 변경
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


  /* 이전 언어 검색조건 초기화 */
  state.searchKeyword = "";

  state.selectedArea = "전체";

  state.selectedMenu = "전체";

  state.visibleCount = 12;


  if(els.searchInput){

    els.searchInput.value = "";

  }


  syncLanguageSelects();

  applyLanguage();

  renderMenuChips();

  renderAreaChips(
    AREA_FALLBACK
  );


  /* =========================================
     중요

     언어가 바뀌면
     음식점 데이터 API도 다시 호출
  ========================================= */

  await loadRestaurants();

}


/* =========================================
   12. 언어 셀렉트 동기화
========================================= */

function syncLanguageSelects(){

  if(els.quickLanguageSelect){

    els.quickLanguageSelect.value =
      state.language;

  }


  if(els.languageSelect){

    els.languageSelect.value =
      state.language;

  }

}


/* =========================================
   13. UI 문구 변경
========================================= */

function applyLanguage(){

  document.documentElement.lang =
    state.language === "kr"
      ? "ko"
      : state.language;


  $$("[data-i18n]").forEach(

    element => {

      element.textContent =
        t(
          element.dataset.i18n
        );

    }

  );


  $$("[data-i18n-html]").forEach(

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
            element.dataset
              .i18nPlaceholder
          );

      }

    );


  if(els.randomResult){

    els.randomResult.textContent =
      t("randomGuide");

  }

}


/* =========================================
   14. 맛집 API 호출
========================================= */

async function loadRestaurants(){

  showLoading();


  if(
    !SERVICE_KEY
    ||
    SERVICE_KEY ===
      "YOUR_SERVICE_KEY"
  ){

    state.restaurants = [];

    state.filteredRestaurants = [];

    renderApiKeyRequired();

    return;

  }


  const normalizedKey =
    normalizeServiceKey(
      SERVICE_KEY
    );


  const params =
    new URLSearchParams({

      serviceKey:
        normalizedKey,

      pageNo:
        "1",

      numOfRows:
        "100",

      resultType:
        "json"

    });


  /* =========================================
     언어별 API 선택
  ========================================= */

  const endpoint =
    LANGUAGE_ENDPOINTS[
      state.language
    ]
    ||
    LANGUAGE_ENDPOINTS.kr;


  const url =
    `${FOOD_API_BASE_URL}/${endpoint}?${params.toString()}`;


  console.log(
    "현재 언어:",
    state.language
  );


  console.log(
    "현재 API:",
    endpoint
  );


  console.log(
    "부산 맛집 API 요청 URL:",
    url.replace(
      encodeURIComponent(
        normalizedKey
      ),
      "SERVICE_KEY_HIDDEN"
    )
  );


  try{


    const response =
      await fetch(url);


    const rawText =
      await response.text();


    console.log(
      "부산맛집 OpenAPI 원본 응답:",
      rawText
    );


    if(
      !response.ok
    ){

      const error =
        new Error(
          response.status === 403
            ? t("api403")
            : `HTTP ${response.status}`
        );

      error.status =
        response.status;

      throw error;

    }


    let data;


    try{

      data =
        JSON.parse(
          rawText
        );

    }catch(error){

      throw new Error(
        "API 응답이 JSON 형식이 아닙니다."
      );

    }


    console.log(
      "부산맛집 OpenAPI JSON 응답:",
      data
    );


    const apiError =
      getPublicDataApiError(
        data
      );


    if(apiError){

      throw new Error(
        apiError
      );

    }


    const parsed =
      normalizeApiResponse(
        data
      );


    console.log(
      "최종 맛집 데이터:",
      parsed
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


    renderAreaChips(
      getAreaList()
    );


    renderMenuChips();


    applyFilters();


    renderHome();


    renderFavorites();


    renderRecent();


  }catch(error){


    console.error(
      "부산맛집 API 호출 오류:",
      error
    );


    renderApiError(
      error
    );

  }

}


/* =========================================
   15. 서비스키 처리
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

  }catch(error){

    return value;

  }

}


/* =========================================
   16. API 오류코드 확인
========================================= */

function getPublicDataApiError(
  data
){

  const code =
    data?.response?.header?.resultCode
    ??
    data?.header?.resultCode
    ??
    data?.resultCode;


  const message =
    data?.response?.header?.resultMsg
    ??
    data?.header?.resultMsg
    ??
    data?.resultMsg;


  if(
    code
    &&
    String(code) !== "00"
  ){

    return (
      `${message || "OpenAPI 오류"} (${code})`
    );

  }


  return null;

}


/* =========================================
   17. API 배열 찾기
========================================= */

function normalizeApiResponse(
  data
){

  console.log(
    "API 전체 구조 확인:",
    data
  );


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
      Array.isArray(value)
    ){

      return value;

    }


    if(
      value
      &&
      typeof value ===
        "object"
    ){

      return [value];

    }

  }


  /* =========================================
     응답 구조가 달라도
     내부에서 item을 찾아냄
  ========================================= */

  function findItems(
    object
  ){

    if(
      !object
      ||
      typeof object !==
        "object"
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
      typeof object.item ===
        "object"
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

      return [object];

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


  const result =
    findItems(
      data
    );


  console.log(
    "찾아낸 맛집 배열:",
    result
  );


  return (
    result || []
  );

}


/* =========================================
   18. 맛집 데이터 정리
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
        item.ucSeq
        ??
        index
      ),


    title:
      cleanText(
        item.MAIN_TITLE
        ??
        item.mainTitle
        ??
        item.PLACE
        ??
        item.place
        ??
        "이름 없음"
      ),


    place:
      cleanText(
        item.PLACE
        ??
        item.place
        ??
        ""
      ),


    introTitle:
      cleanText(
        item.TITLE
        ??
        item.title
        ??
        ""
      ),


    area:
      cleanText(
        item.GUGUN_NM
        ??
        item.gugunNm
        ??
        inferAreaFromText(
          text
        )
        ??
        ""
      )
      ||
      "부산",


    address1:
      cleanText(
        item.ADDR1
        ??
        item.addr1
        ??
        ""
      ),


    address2:
      cleanText(
        item.ADDR2
        ??
        item.addr2
        ??
        ""
      ),


    phone:
      cleanText(
        item.CNTCT_TEL
        ??
        item.cntctTel
        ??
        ""
      ),


    homepage:
      cleanText(
        item.HOMEPAGE_URL
        ??
        item.homepageUrl
        ??
        ""
      ),


    hours:
      cleanText(
        item.USAGE_DAY_WEEK_AND_TIME
        ??
        item.usageDayWeekAndTime
        ??
        ""
      ),


    menu:
      cleanText(
        item.RPRSNTV_MENU
        ??
        item.rprsntvMenu
        ??
        inferMenuText(
          text
        )
        ??
        ""
      ),


    image:
      normalizeImageUrl(
        item.MAIN_IMG_NORMAL
        ??
        item.mainImgNormal
        ??
        ""
      ),


    thumb:
      normalizeImageUrl(
        item.MAIN_IMG_THUMB
        ??
        item.mainImgThumb
        ??
        ""
      ),


    description:
      cleanText(
        item.ITEMCNTNTS
        ??
        item.itemcntnts
        ??
        ""
      ),


    lat:
      toNumber(
        item.LAT
        ??
        item.lat
      ),


    lng:
      toNumber(
        item.LNG
        ??
        item.lng
      ),


    distance:
      null

  };

}


/* =========================================
   19. 지역 추출
========================================= */

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
   20. 대표메뉴 보조 추출
========================================= */

function inferMenuText(
  text
){

  const keywords = [

    "돼지국밥",
    "밀면",
    "갈비",
    "불고기",
    "회",
    "해산물",
    "카페",
    "커피",
    "초밥",
    "스시",
    "파스타",
    "짜장",
    "짬뽕",

    "gukbap",
    "milmyeon",
    "galbi",
    "bulgogi",
    "sushi",
    "seafood",
    "coffee",
    "pasta"

  ];


  return (
    keywords
      .filter(
        keyword =>
          String(text)
            .toLowerCase()
            .includes(
              keyword.toLowerCase()
            )
      )
      .slice(
        0,
        3
      )
      .join(", ")
  );

}


/* =========================================
   21. 텍스트 정리
========================================= */

function cleanText(
  value
){

  if(
    value === null
    ||
    value === undefined
  ){

    return "";

  }


  return (
    String(value)

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


/* =========================================
   22. 이미지 URL
========================================= */

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


/* =========================================
   23. 숫자 변환
========================================= */

function toNumber(
  value
){

  const number =
    Number(
      value
    );


  return (
    Number.isFinite(number)
      ? number
      : null
  );

}


/* =========================================
   24. 홈
========================================= */

function renderHome(){

  const source =
    withDistances(
      [
        ...state.restaurants
      ]
    );


  renderCards(
    els.homeRestaurantList,
    source.slice(
      0,
      9
    )
  );


  let nearby = [];


  if(
    state.userLocation
  ){

    nearby =
      [
        ...source
      ]

      .filter(
        item =>
          item.distance !==
            null
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

  }


  renderCards(
    els.nearbyList,
    nearby
  );

}


/* =========================================
   25. 랜덤 추천
========================================= */

function showRandomRestaurant(){

  if(
    !state.restaurants.length
  ){

    showToast(
      state.language === "kr"
        ? "맛집 데이터가 없습니다."
        : "No restaurant data."
    );

    return;

  }


  const index =
    Math.floor(
      Math.random()
      *
      state.restaurants.length
    );


  const item =
    withDistances(
      [
        state.restaurants[
          index
        ]
      ]
    )[0];


  els.randomResult.innerHTML =
    "";


  els.randomResult
    .appendChild(
      createRestaurantCard(
        item
      )
    );

}


/* =========================================
   26. 검색 / 필터
========================================= */

function applyFilters(){

  let result =
    withDistances(
      [
        ...state.restaurants
      ]
    );


  /* 검색어 */
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

            item.place,

            item.menu,

            item.area,

            item.introTitle,

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


  /* 지역 */
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


  /* 메뉴 */
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


  /* 이름순 */
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


  /* 거리순 */
  if(
    state.sort ===
      "distance"
  ){

    if(
      !state.userLocation
    ){

      showToast(
        state.language === "kr"
          ? "가까운순 정렬에는 현재 위치가 필요합니다."
          : "Location is required."
      );

      state.sort =
        "default";

      els.sortSelect.value =
        "default";

    }else{

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

  }


  state.filteredRestaurants =
    result;


  renderSearchResults();


  if(
    state.viewMode ===
      "map"
  ){

    renderSearchMap();

  }

}


/* =========================================
   27. 검색 결과
========================================= */

function renderSearchResults(){

  const visible =
    state.filteredRestaurants
      .slice(
        0,
        state.visibleCount
      );


  if(els.resultCount){

    els.resultCount.textContent =
      `${t("result")} ${state.filteredRestaurants.length}${t("countUnit")}`;

  }


  renderCards(
    els.searchRestaurantList,
    visible
  );


  if(els.loadMoreBtn){

    els.loadMoreBtn.hidden =
      (
        state.filteredRestaurants.length === 0
        ||
        state.visibleCount >=
          state.filteredRestaurants.length
      );

  }


  if(
    !state.filteredRestaurants.length
  ){

    els.searchRestaurantList.innerHTML = `

      <div class="empty-state">

        <div class="empty-icon">
          ⌕
        </div>

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
   28. 지역 목록
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


  if(
    !areas.length
  ){

    return (
      AREA_FALLBACK
    );

  }


  return [

    "전체",

    ...areas
      .filter(
        area =>
          area !== "부산"
      )
      .sort()

  ];

}


/* =========================================
   29. 지역 버튼
========================================= */

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
                12;


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
   30. 메뉴 버튼
========================================= */

function renderMenuChips(){

  const menus =
    Object.keys(
      MENU_CATEGORIES
    );


  [
    els.homeMenuChips,
    els.searchMenuChips
  ]

  .filter(Boolean)

  .forEach(

    container => {

      container.innerHTML =
        "";


      menus.forEach(

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
            MENU_LABELS.kr[
              menu
            ]
            ??
            menu;


          button.addEventListener(

            "click",

            () => {

              state.selectedMenu =
                menu;

              state.visibleCount =
                12;


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


/* =========================================
   31. 메뉴 카테고리 판별
========================================= */

function matchesMenuCategory(
  item,
  category
){

  const keywords =
    MENU_CATEGORIES[
      category
    ];


  if(
    !keywords
    ||
    !keywords.length
  ){

    return true;

  }


  const target = [

    item.menu,

    item.title,

    item.introTitle,

    item.description

  ]

  .join(" ")

  .toLowerCase();


  return (
    keywords.some(

      keyword =>
        target.includes(
          keyword.toLowerCase()
        )

    )
  );

}


/* =========================================
   32. 카드 출력
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
   33. 맛집 카드
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


  card.innerHTML = `

    <div class="restaurant-card-image">

      ${
        imageMarkup(
          item.thumb
          ||
          item.image,
          item.title
        )
      }

      <button
        type="button"
        class="favorite-btn ${
          favorite
            ? "is-active"
            : ""
        }"
      >

        ${
          favorite
            ? "♥"
            : "♡"
        }

      </button>

    </div>


    <div class="restaurant-card-body">

      <h4>

        ${escapeHtml(
          item.title
        )}

      </h4>


      <p class="restaurant-meta">

        ${escapeHtml(
          item.area
          ||
          "Busan"
        )}

      </p>


      <p class="restaurant-menu">

        ${escapeHtml(
          item.menu
          ||
          item.introTitle
          ||
          t("menuUnknown")
        )}

      </p>


      <p class="restaurant-time">

        ${escapeHtml(
          item.hours
          ||
          t("timeUnknown")
        )}

      </p>


      ${
        item.distance !== null

          ? `

            <p class="restaurant-distance">

              ${escapeHtml(
                t("currentDistance")
              )}

              ${formatDistance(
                item.distance
              )}

            </p>

          `

          : ""
      }


      <button
        type="button"
        class="detail-btn"
      >

        ${escapeHtml(
          t("detail")
        )}

      </button>

    </div>

  `;


  card
    .querySelector(
      ".favorite-btn"
    )
    .addEventListener(

      "click",

      () => {

        toggleFavorite(
          item.id
        );

      }

    );


  card
    .querySelector(
      ".detail-btn"
    )
    .addEventListener(

      "click",

      () => {

        openDetail(
          item.id
        );

      }

    );


  return card;

}


/* =========================================
   34. 이미지
========================================= */

function imageMarkup(
  url,
  alt
){

  if(!url){

    return `

      <div class="image-fallback">

        ${escapeHtml(
          t("imagePreparing")
        )}

      </div>

    `;

  }


  return `

    <img

      src="${escapeHtml(url)}"

      alt="${escapeHtml(alt)}"

      loading="lazy"

      onerror="
        this.style.display='none';
        this.parentElement.insertAdjacentHTML(
          'beforeend',
          '<div class=&quot;image-fallback&quot;>${escapeHtml(t("imagePreparing"))}</div>'
        );
      "

    >

  `;

}


/* =========================================
   35. 즐겨찾기
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
   36. 즐겨찾기 출력
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


  if(els.favoriteEmpty){

    els.favoriteEmpty.hidden =
      items.length > 0;

  }


  renderCards(
    els.favoriteList,
    withDistances(
      items
    )
  );

}


/* =========================================
   37. 최근 본 맛집
========================================= */

function addRecent(
  id
){

  state.recent =
    state.recent.filter(

      itemId =>
        itemId !== id

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


  renderRecent();

}


/* =========================================
   38. 최근 본 출력
========================================= */

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


  if(els.recentSection){

    els.recentSection.hidden =
      !items.length;

  }


  renderCards(
    els.recentList,
    withDistances(
      items
    )
  );

}


/* =========================================
   39. 현재 위치
========================================= */

function requestUserLocation(){

  if(
    !navigator.geolocation
  ){

    showToast(
      state.language === "kr"
        ? "현재 위치를 확인할 수 없습니다."
        : "Location unavailable."
    );

    return;

  }


  if(els.locationState){

    els.locationState.innerHTML = `

      <div class="location-icon">
        …
      </div>

      <div>

        <strong>
          ${
            state.language === "kr"
              ? "현재 위치를 확인하고 있습니다."
              : "Checking your location..."
          }
        </strong>

      </div>

    `;

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


        if(els.locationState){

          els.locationState.innerHTML = `

            <div class="location-icon">
              ✓
            </div>

            <div>

              <strong>
                ${
                  state.language === "kr"
                    ? "현재 위치를 확인했습니다."
                    : "Location confirmed."
                }
              </strong>

            </div>

          `;

        }


        renderAllLists();

        applyFilters();

      },


      error => {

        console.warn(
          error
        );


        showToast(
          state.language === "kr"
            ? "위치 권한을 확인해주세요."
            : "Check location permission."
        );

      },


      {

        enableHighAccuracy:
          true,

        timeout:
          10000,

        maximumAge:
          300000

      }

    );

}


/* =========================================
   40. 거리 추가
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
          distance:
            null
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


/* =========================================
   41. 거리 계산
========================================= */

function haversine(
  lat1,
  lng1,
  lat2,
  lng2
){

  const R =
    6371;


  const toRad =
    value =>
      value
      *
      Math.PI
      /
      180;


  const dLat =
    toRad(
      lat2 -
      lat1
    );


  const dLng =
    toRad(
      lng2 -
      lng1
    );


  const a =

    Math.sin(
      dLat / 2
    ) ** 2

    +

    Math.cos(
      toRad(lat1)
    )

    *

    Math.cos(
      toRad(lat2)
    )

    *

    Math.sin(
      dLng / 2
    ) ** 2;


  return (

    R
    *
    2
    *
    Math.atan2(

      Math.sqrt(a),

      Math.sqrt(
        1 - a
      )

    )

  );

}


/* =========================================
   42. 거리 표시
========================================= */

function formatDistance(
  km
){

  if(
    km < 1
  ){

    return (
      `${Math.round(
        km * 1000
      )}m`
    );

  }


  return (
    `${km.toFixed(1)}km`
  );

}


/* =========================================
   43. 카카오 지도 SDK
========================================= */

function loadKakaoMapSdk(){

  if(
    !KAKAO_JAVASCRIPT_KEY
    ||
    KAKAO_JAVASCRIPT_KEY ===
      "YOUR_KAKAO_JAVASCRIPT_KEY"
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


          if(
            state.viewMode ===
              "map"
          ){

            renderSearchMap();

          }

        }

      );

    };


  script.onerror =
    () => {

      console.error(
        "카카오 지도 SDK 로드 실패"
      );

    };


  document.head.appendChild(
    script
  );

}


/* =========================================
   44. 목록 / 지도
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
      80
    );

  }

}


/* =========================================
   45. 검색 지도
========================================= */

function renderSearchMap(){

  const container =
    $("#searchMap");


  if(!container){
    return;
  }


  if(
    !state.kakaoReady
    ||
    !window.kakao?.maps
  ){

    container.innerHTML = `

      <div class="api-guide-card">

        <strong>
          Kakao Map API
        </strong>

        <p>
          KAKAO_JAVASCRIPT_KEY를 확인해주세요.
        </p>

      </div>

    `;

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


  state.searchMap =
    new kakao.maps.Map(

      container,

      {

        center,

        level:
          7

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

          map:
            state.searchMap,

          position

        });


      bounds.extend(
        position
      );


      const content =
        document.createElement(
          "div"
        );


      content.style.cssText =
        "min-width:180px;padding:10px;font-size:13px;";


      content.innerHTML = `

        <strong>
          ${escapeHtml(
            item.title
          )}
        </strong>

        <br>

        <button
          type="button"
          style="
            margin-top:7px;
            padding:6px 9px;
          "
        >

          ${escapeHtml(
            t("detail")
          )}

        </button>

      `;


      content
        .querySelector(
          "button"
        )
        .addEventListener(

          "click",

          () => {

            openDetail(
              item.id
            );

          }

        );


      const infoWindow =
        new kakao.maps.InfoWindow({

          content

        });


      kakao.maps.event.addListener(

        marker,

        "click",

        () => {

          infoWindow.open(

            state.searchMap,

            marker

          );

        }

      );

    }

  );


  if(
    !bounds.isEmpty()
  ){

    state.searchMap.setBounds(
      bounds
    );

  }

}


/* =========================================
   46. 상세보기
========================================= */

function openDetail(
  id,
  addToRecent = true
){

  const base =
    state.restaurants.find(

      item =>
        item.id ===
        String(id)

    );


  if(!base){
    return;
  }


  const item =
    withDistances(
      [base]
    )[0];


  const favorite =
    state.favorites.includes(
      item.id
    );


  state.currentDetailId =
    item.id;


  if(addToRecent){

    addRecent(
      item.id
    );

  }


  els.detailContent.innerHTML = `

    <div class="detail-hero">

      ${
        imageMarkup(
          item.image
          ||
          item.thumb,
          item.title
        )
      }

    </div>


    <div class="detail-body">

      <div class="detail-title-row">

        <div>

          <h2 id="detailTitle">

            ${escapeHtml(
              item.title
            )}

          </h2>


          <p class="detail-sub">

            ${escapeHtml(
              item.area
            )}

            ${
              item.distance !== null

                ? ` · ${escapeHtml(t("currentDistance"))} ${formatDistance(item.distance)}`

                : ""
            }

          </p>

        </div>


        <button
          id="detailFavoriteBtn"
          type="button"
          class="detail-fav-btn ${
            favorite
              ? "is-active"
              : ""
          }"
        >

          ${
            favorite
              ? "♥"
              : "♡"
          }

        </button>

      </div>


      <div class="detail-info-grid">

        <div class="detail-info">

          <span>
            ${escapeHtml(
              t("representativeMenu")
            )}
          </span>

          <strong>
            ${escapeHtml(
              item.menu
              ||
              t("noInfo")
            )}
          </strong>

        </div>


        <div class="detail-info">

          <span>
            ${escapeHtml(
              t("operatingHours")
            )}
          </span>

          <strong>
            ${escapeHtml(
              item.hours
              ||
              t("noInfo")
            )}
          </strong>

        </div>


        <div class="detail-info">

          <span>
            ${escapeHtml(
              t("address")
            )}
          </span>

          <strong>

            ${escapeHtml(

              [
                item.address1,
                item.address2
              ]

              .filter(Boolean)

              .join(" ")

              ||

              t("noInfo")

            )}

          </strong>

        </div>


        <div class="detail-info">

          <span>
            ${escapeHtml(
              t("phoneNumber")
            )}
          </span>

          <strong>

            ${escapeHtml(
              item.phone
              ||
              t("noInfo")
            )}

          </strong>

        </div>

      </div>


      <div class="detail-actions">

        ${
          item.phone

            ? `

              <a
                href="tel:${escapeHtml(
                  item.phone.replace(
                    /[^\d+]/g,
                    ""
                  )
                )}"
              >

                ${escapeHtml(
                  t("phone")
                )}

              </a>

            `

            : `

              <button
                type="button"
                disabled
              >

                ${escapeHtml(
                  t("phone")
                )}

              </button>

            `
        }


        ${
          item.homepage

            ? `

              <a
                class="secondary-action"
                href="${escapeHtml(
                  item.homepage
                )}"
                target="_blank"
                rel="noopener"
              >

                ${escapeHtml(
                  t("homepage")
                )}

              </a>

            `

            : `

              <button
                type="button"
                class="secondary-action"
                disabled
              >

                ${escapeHtml(
                  t("homepage")
                )}

              </button>

            `
        }


        <button
          id="routeBtn"
          type="button"
        >

          ${escapeHtml(
            t("route")
          )}

        </button>


        <button
          id="shareBtn"
          type="button"
          class="secondary-action"
        >

          ${escapeHtml(
            t("share")
          )}

        </button>

      </div>


      <section class="detail-section">

        <h3>

          ${escapeHtml(
            t("location")
          )}

        </h3>


        <div
          id="detailMap"
          class="detail-map"
        ></div>

      </section>


      <section class="detail-section">

        <h3>

          ${escapeHtml(
            t("restaurantIntro")
          )}

        </h3>


        <p class="detail-description">

          ${escapeHtml(
            item.description
            ||
            item.introTitle
            ||
            t("noInfo")
          )}

        </p>

      </section>

    </div>

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


  $("#routeBtn")
    .addEventListener(

      "click",

      () => {

        openRoute(
          item
        );

      }

    );


  $("#shareBtn")
    .addEventListener(

      "click",

      () => {

        shareRestaurant(
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

    80

  );

}


/* =========================================
   47. 상세 닫기
========================================= */

function closeDetail(){

  els.detailModal.hidden =
    true;


  document.body.style.overflow =
    "";


  state.currentDetailId =
    null;


  state.detailMap =
    null;

}


/* =========================================
   48. 상세 지도
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

        Kakao Map API key

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

        ${
          state.language === "kr"
            ? "위치정보가 없습니다."
            : "Location unavailable."
        }

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

        center:
          position,

        level:
          4

      }

    );


  new kakao.maps.Marker({

    map:
      state.detailMap,

    position

  });

}


/* =========================================
   49. 길찾기
========================================= */

function openRoute(
  item
){

  if(
    item.lat === null
    ||
    item.lng === null
  ){

    showToast(
      state.language === "kr"
        ? "맛집 위치정보가 없습니다."
        : "Location unavailable."
    );

    return;

  }


  const url =
    `https://map.kakao.com/link/to/${encodeURIComponent(item.title)},${item.lat},${item.lng}`;


  window.open(

    url,

    "_blank",

    "noopener"

  );

}


/* =========================================
   50. 공유
========================================= */

async function shareRestaurant(
  item
){

  const text =

    `${item.title}\n`

    +

    `${item.address1}\n`

    +

    `${t("representativeMenu")}: ${item.menu || t("noInfo")}`;


  if(
    navigator.share
  ){

    try{

      await navigator.share({

        title:
          item.title,

        text

      });

    }catch(error){

      console.log(
        error
      );

    }

  }else{

    showToast(
      state.language === "kr"
        ? "이 브라우저에서는 공유 기능을 지원하지 않습니다."
        : "Sharing is not supported."
    );

  }

}


/* =========================================
   51. 화면 전환
========================================= */

function switchView(
  target
){

  $$(".view").forEach(

    view => {

      view.classList.toggle(

        "is-active",

        view.dataset.view ===
          target

      );

    }

  );


  $$(".nav-btn").forEach(

    button => {

      button.classList.toggle(

        "is-active",

        button.dataset.target ===
          target

      );

    }

  );


  window.scrollTo({

    top:
      0,

    behavior:
      "smooth"

  });


  if(
    target === "favorite"
  ){

    renderFavorites();

  }


  if(
    target === "search"
    &&
    state.viewMode === "map"
  ){

    setTimeout(
      renderSearchMap,
      100
    );

  }

}


/* =========================================
   52. 테마
========================================= */

function applyTheme(
  theme
){

  let result =
    theme;


  if(
    theme === "system"
  ){

    result =
      window
        .matchMedia(
          "(prefers-color-scheme: dark)"
        )
        .matches

        ? "dark"

        : "light";

  }


  document.documentElement.dataset.theme =
    result;

}


/* =========================================
   53. 테마 버튼
========================================= */

function updateThemeButtons(){

  $$("#themeOptions [data-theme]")
    .forEach(

      button => {

        button.classList.toggle(

          "is-active",

          button.dataset.theme ===
            state.theme

        );

      }

    );

}


/* =========================================
   54. 로딩
========================================= */

function showLoading(){

  const markup = `

    <div class="loading-card">

      ${
        state.language === "kr"
          ? "부산 맛집 정보를 불러오는 중입니다..."
          : "Loading restaurant information..."
      }

    </div>

  `;


  if(
    els.homeRestaurantList
  ){

    els.homeRestaurantList.innerHTML =
      markup;

  }


  if(
    els.searchRestaurantList
  ){

    els.searchRestaurantList.innerHTML =
      markup;

  }

}


/* =========================================
   55. API 키 안내
========================================= */

function renderApiKeyRequired(){

  const markup = `

    <div class="api-guide-card">

      <strong>

        ${escapeHtml(
          t("apiKeyRequired")
        )}

      </strong>


      <p>

        ${escapeHtml(
          t("apiKeyGuide")
        )}

      </p>

    </div>

  `;


  els.homeRestaurantList.innerHTML =
    markup;


  els.searchRestaurantList.innerHTML =
    markup;


  els.resultCount.textContent =
    `${t("result")} 0${t("countUnit")}`;


  els.loadMoreBtn.hidden =
    true;

}


/* =========================================
   56. API 오류
========================================= */

function renderApiError(
  error
){

  const status =
    error.status
    ||
    "";


  const message =
    status === 403

      ? t("api403")

      : (
          error.message
          ||
          t("apiFailTitle")
        );


  const markup = `

    <div class="error-card">

      <strong>

        ${escapeHtml(
          t("apiFailTitle")
        )}

      </strong>


      ${
        status

          ? `

            <span class="error-code">

              HTTP ${escapeHtml(
                status
              )}

            </span>

          `

          : ""
      }


      <p>

        ${escapeHtml(
          message
        )}

      </p>


      <button
        class="outline-btn"
        type="button"
        data-retry
      >

        ${escapeHtml(
          t("apiRetry")
        )}

      </button>

    </div>

  `;


  if(
    els.homeRestaurantList
  ){

    els.homeRestaurantList.innerHTML =
      markup;

  }


  if(
    els.searchRestaurantList
  ){

    els.searchRestaurantList.innerHTML =
      markup;

  }


  if(
    els.resultCount
  ){

    els.resultCount.textContent =
      `${t("result")} 0${t("countUnit")}`;

  }


  if(
    els.loadMoreBtn
  ){

    els.loadMoreBtn.hidden =
      true;

  }


  $$("[data-retry]")
    .forEach(

      button => {

        button.addEventListener(

          "click",

          loadRestaurants

        );

      }

    );

}


/* =========================================
   57. 전체 다시 출력
========================================= */

function renderAllLists(){

  renderHome();

  renderSearchResults();

  renderFavorites();

  renderRecent();

}


/* =========================================
   58. localStorage 불러오기
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
      Array.isArray(value)

        ? value.map(
            String
          )

        : []
    );

  }catch(error){

    return [];

  }

}


/* =========================================
   59. localStorage 저장
========================================= */

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
   60. 토스트
========================================= */

let toastTimer;


function showToast(
  message
){

  if(!els.toast){
    return;
  }


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
   61. HTML 특수문자 처리
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
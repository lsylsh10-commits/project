# Global Weather App

OpenWeather API를 이용한 전 세계 날씨 정보 웹앱입니다.

## 파일 구조

```text
global-weather-app/
├─ index.html
├─ css/
│  └─ style.css
├─ js/
│  └─ script.js
└─ images/
```

## 실행 방법

1. `js/script.js` 파일을 엽니다.
2. 파일 상단의 아래 코드를 찾습니다.

```javascript
const API_KEY = "여기에_OPENWEATHER_API_KEY_입력";
```

3. 문자열 안쪽을 본인의 OpenWeather API Key로 교체합니다.

```javascript
const API_KEY = "본인의_API_KEY";
```

4. 저장 후 `index.html`을 브라우저에서 실행합니다.

가능하면 VS Code의 Live Server와 같은 로컬 서버 환경에서 실행하는 것을 권장합니다.

## Console 확인

개발자도구(F12) → Console에서 아래 데이터가 출력됩니다.

- 사용자 검색어
- OpenWeather Geocoding API 응답
- 현재 날씨 API 응답
- 5일/3시간 예보 API 응답
- 현재 위치 좌표 및 Reverse Geocoding 응답
- 오류 정보

## 구현 기능

- 한글 / 영문 도시 검색
- OpenWeather Geocoding API 기반 도시 → 좌표 변환
- 현재 날씨
- 습도 / 풍속 / 기압 / 구름량
- 일출 / 일몰
- 3시간 간격 예보
- 5일 예보
- 현재 위치 날씨
- 즐겨찾기
- 최근 검색
- LocalStorage 저장
- 섭씨 / 화씨 변경
- 날씨 / 밤 상태에 따른 화면 테마 변경
- PC / 태블릿 / 모바일 반응형
- API 오류 / 검색 오류 / 위치 권한 오류 처리

## 참고

OpenWeather의 무료 5 Day / 3 Hour Forecast 데이터를 날짜별로 묶어
주간 카드의 최고/최저 기온을 계산하도록 구현되어 있습니다.

- 모바일 하단 고정 탭바 (홈 / 검색 / 즐겨찾기 / 최근검색)

- 하단 탭바 화면 전환형 구조 (홈 / 검색 / 즐겨찾기 / 최근검색)
- 탭 클릭 시 스크롤 이동이 아니라 해당 화면만 표시
- 도시 검색/즐겨찾기/최근검색 선택 후 홈 화면으로 자동 전환

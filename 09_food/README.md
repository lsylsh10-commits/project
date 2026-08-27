# 부산 맛집 정보 서비스

## 폴더 구조

```text
09_food/
├─ css/
│  └─ style.css
├─ images/
├─ js/
│  └─ script.js
├─ index.html
└─ README.md
```

## 1. 공공데이터 API 키

`js/script.js` 맨 위에서 아래 값을 교체합니다.

```javascript
const SERVICE_KEY = "YOUR_SERVICE_KEY";
```

현재 프로젝트는 공공데이터포털에 공개된 현재 주소를 사용합니다.

```text
https://apis.data.go.kr/6260000/FoodieService/getFoodieKr
```

요청 파라미터도 현재 명세에 맞춰 `ServiceKey`로 수정했습니다.
기존 프로젝트의 `FoodService/getFoodKr` 및 소문자 `serviceKey` 호출은 사용하지 않습니다.

Encoding 키 / Decoding 키 어느 쪽을 붙여도 한 번 정리한 뒤 요청하도록 작성했습니다.

## 2. HTTP 403 오류 처리

API 호출 실패 시 단순히 `HTTP 403`만 표시하지 않고 활용신청/서비스키 확인 안내가 표시됩니다.
개발자도구 Console에서도 원본 응답과 JSON 응답을 확인할 수 있습니다.

## 3. 카카오 지도 API 키

`js/script.js`에서 아래 값을 교체합니다.

```javascript
const KAKAO_JAVASCRIPT_KEY = "YOUR_KAKAO_JAVASCRIPT_KEY";
```

카카오 Developers의 **JavaScript 키**를 사용해야 합니다.
REST API 키가 아닙니다.

카카오 Developers 웹 플랫폼에 로컬 주소 또는 배포 주소도 등록해야 합니다.

예:

```text
http://127.0.0.1:5500
http://localhost:5500
```

## 4. 상단 언어 변경

상단의 기존 다크모드 버튼 자리를 언어 선택으로 변경했습니다.

- 한국어
- English
- 日本語
- 中文简体
- 中文繁體

설정 탭의 언어 선택과 서로 연동됩니다.
현재 공개된 부산푸디투어 API 데이터는 국문 `getFoodieKr`를 사용하고, 언어 선택은 앱 UI 문구를 바꿉니다.
다크모드는 설정 탭 안에서 유지됩니다.

## 5. 실행

VS Code Live Server 사용을 권장합니다.
`index.html` → 우클릭 → Open with Live Server로 확인하세요.

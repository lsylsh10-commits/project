# 모바일 청첩장 최종 수정본

현재 확정한 HTML 구조 기준입니다.

## 폴더 구조
- index.html
- css/style.css
- js/script.js
- images/

## 카카오맵 API 키
index.html의 아래 문자열을 검색하세요.

YOUR_KAKAO_JAVASCRIPT_KEY

해당 부분을 Kakao Developers에서 발급받은 JavaScript 키로 교체하면 됩니다.

## 스크롤 애니메이션
`.reveal` 요소가 화면에 진입하면 `IntersectionObserver`가 `.is-visible` 클래스를 추가합니다.
CSS에서 opacity 0 → 1, translateY(42px) → 0으로 1초 동안 부드럽게 올라옵니다.

## 이미지
HTML에 연결된 이미지 파일명을 그대로 images 폴더에 넣어주세요.

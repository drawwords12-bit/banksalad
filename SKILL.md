---
name: design-to-vanilla
description: 제공된 피그마 디자인을 기존 뱅크샐러드 HTML, CSS, JavaScript 프로젝트로 정확하게 구현하거나 수정할 때 사용합니다.
---

# Design to Vanilla Web (뱅크샐러드 프로젝트 전용)

## 목표

제공된 피그마(Figma) 디자인 시안과 추출된 실제 에셋(`assets/` 또는 `images/`)을 기준으로, 프레임워크 없이 순수 웹 스택(Vanilla HTML5, CSS3, JavaScript ES6+) 기반의 반응형 랜딩 페이지를 오차 없이 구현합니다.

---

## 작업 순서 (Step-by-Step)

1. **사전 문서 및 규칙 분석:** `PRD.md`, `AGENTS.md`, `PROJECT_RULES.md`를 우선 정독합니다.
2. **기존 리소스 확인:** 기존 폴더 구조(`css/`, `js/`), 공통 CSS 변수(컬러 토큰, 폰트), 추출된 이미지/아이콘(`ic_bank_temple`, `logo_symbol` 등)을 확인합니다.
3. **구조 및 상태 정리:** 화면 레이아웃, 공통 UI 컴포넌트, 인터랙션 상태(`is_active`, `is_selected`, `has_error`), 사용자 이동 흐름을 정리합니다.
4. **Figma 컨텍스트 분석:** Figma MCP 또는 디자인 스크린샷을 통해 레이어 구조, 간격(Margin/Padding), 색상 값, 실제 다운로드 가능한 SVG/PNG 에셋을 확인합니다.
5. **재사용 및 구현 범위 구분:** 기존 코드/공통 스타일 중 재사용할 부분과 신규 작성할 최소 범위를 구별합니다.
6. **시맨틱 HTML 마크업:** 의미에 맞는 `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` 태그를 작성하고, 단순 클릭 동작은 `<button>`, 링크는 `<a>`로 구성합니다.
7. **CSS & 반응형 구현:** 기존 디자인 토큰(CSS 변수)을 활용하여 스타일을 정의하고, **모바일(360px), 태블릿(768px), 데스크톱(1280px)** 반응형 레이아웃을 구현합니다.
8. **Vanilla JS 인터랙션:** 피그마 시안에 실제 명시된 탭 전환, 모달, 데이터 리포트 시뮬레이션 인터랙션만 순수 JavaScript로 구현합니다.
9. **UI 상태 구현:** 로딩(Skeleton/Spinner), 빈 상태(Empty), 오류 상태(`has_error`), 비활성 상태(`disabled`)를 누락 없이 반영합니다.
10. **교차 검증:** 360px, 768px, 1280px 해상도에서 시안과 브라우저 화면을 1:1로 비교하고, 가로 스크롤(`overflow-x`) 발생 여부를 체크합니다.
11. **접근성 & 콘솔 체크:** 키보드 포커스(`:focus-visible`), 모션 감축 설정(`prefers-reduced-motion`), 브라우저 콘솔 에러 유무를 확인합니다.
12. **보고서 작성:** 변경된 파일 목록, 구현 내용, 주요 판단 사항, 검증 결과를 구체적으로 보고합니다.

---

## 금지 사항 (Strict Prohibitions)

- **프레임워크/유틸리티 CSS 금지:** React, Vue, TypeScript, Tailwind CSS 등 승인되지 않은 프레임워크나 패키지를 추가하지 않습니다.
- **임의 패키지 설치 금지:** 사전 요청이나 승인 없이 `npm install` 등의 외부 라이브러리를 설치하지 않습니다.
- **임의 디자인/기능 추가 금지:** 피그마 시안에 없는 가상의 화면, 기능, 아이콘, 3D 그래픽, 과도한 애니메이션을 제작하지 않습니다.
- **Figma 자동 생성 코드 직붙 금지:** 피그마에서 자동 생성된 코드를 그대로 복사-붙여넣기 하지 않고, 프로젝트의 HTML/CSS/JS 구조에 맞춰 재작성합니다.
- **부적절한 레이아웃 방식 금지:** 모든 요소를 `position: absolute`로 배치하거나, 디자인 시안 통배경 이미지를 단일 `background-image`로 때우는 방식을 절대 금지합니다.
- **허위 보고 금지:** 직접 브라우저에서 검증하지 않은 결과를 통과했다고 보고하지 않습니다.

---

## 뱅크샐러드 프로젝트 코딩 컨벤션

### HTML & CSS 명명 규칙
- CSS class 및 HTML id: `snake_case` (예: `logo_container`, `bank_temple_icon`, `data_chart_section`)
- UI 상태 class: `is_active`, `is_open`, `is_selected`
- UI 오류 class: `has_error`
- 불필요한 `!important` 사용 금지

### JavaScript 명명 규칙
- 변수 및 함수: `camelCase` (예: `currentTab`, `renderReportCard`)
- 불리언(Boolean) 변수: `is`, `has`, `can`, `should`로 시작 (예: `isLoaded`, `hasData`)
- 이벤트 핸들러 함수: `handleXxx` (예: `handleTabClick`, `handleOptionSelect`)
- 전역 상수: `UPPER_SNAKE_CASE` (예: `DEFAULT_BREAKPOINT`)

---

## 검증 및 완료 보고서 양식

구현 완료 후 아래 항목을 점검하고 보고서에 반영합니다.

- [ ] 360px, 768px, 1280px 해상도 레이아웃 깨짐 및 가로 스크롤 여부 확인
- [ ] 버튼/탭/링크 동작 및 `:focus-visible` 키보드 접근성 확인
- [ ] 브라우저 개발자 도구 콘솔 오류(404 에셋 누락, JS 스크립트 에러) 0건 확인
- [ ] `PROJECT_CONTEXT.md` 완료 상태 동기화 완료
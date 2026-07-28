[뱅크샐러드 브랜드 리디자인] 작업 규칙
작업 전 확인
PRD.md 문서와 피그마(Figma) 디자인 시안을 우선적으로 정독합니다.

프로젝트 내 기존 폴더 구조(css/, js/, assets/ 또는 images/)와 에셋 목록을 확인합니다.

기존 공통 스타일(reset.css, common.css), CSS 변수(컬러 토큰, 폰트 규격), 컴포넌트, 추출된 이미지/아이콘(ic_bank_temple, logo_symbol 등)을 확인합니다.

확정된 디자인/개발 스펙과 추정 요소를 분명히 구분하여 작업에 착수합니다.

변경 원칙
요청된 뱅크샐러드 랜딩 페이지 및 로고 인터랙션 범위 내의 코드만 수정합니다.

기존 코드 스타일과 피그마에 정의된 디자인 시스템 규칙을 엄격히 유지합니다.

불필요한 리팩터링, 파일명/경로 임의 변경, 기존 구조의 재작성을 금지합니다.

assets/ 폴더에 이미 존재하거나 추출된 에셋과 공통 스타일을 최우선으로 재사용합니다.

존재하지 않는 API 경로, 임의의 에셋, 가상의 외부 URL을 생성하지 않습니다.

별도의 요청이나 승인 없이 새로운 외부 라이브러리/패키지를 설치하지 않습니다.

기술 스택
HTML5 (시맨틱 마크업)

CSS3 (CSS 변수, Flexbox, Grid, Media Queries)

JavaScript (Vanilla ES6+)

선택적 인터랙션 라이브러리: GSAP, ScrollTrigger, Swiper (디자인 시안 상 복잡한 스크롤 모션/슬라이더 구현 필요 시에만 제한적으로 사용)

금지 스택: React, Vue, TypeScript, Tailwind CSS 등 프레임워크 및 유틸리티 CSS 추가 금지

HTML
웹 접근성과 구조화를 위해 의미에 맞는 <header>, <nav>, <main>, <section>, <article>, <footer> 시맨틱 태그를 사용합니다.

단순 클릭 동작/상태 변경은 <button>을 사용하고, 페이지 이동 및 외부 링크는 <a> 요소를 사용합니다.

모든 <input>, <select>, <textarea> 요소는 <label>과 for-id로 명확히 연결합니다.

아이콘 위치에 이모지(Emoji)를 임의로 사용하지 않으며, assets/에 준비된 SVG/PNG 에셋을 사용합니다.

CSS
기존에 선언된 CSS 변수(--main-navy, --fresh-green, --sub-yellow 등)와 디자인 토큰을 최우선 적용합니다.

CSS class와 HTML id는 snake_case를 사용합니다. (예: logo_container, bank_temple_icon, data_chart_section)

UI 상태 표현 class는 is_active, is_open, is_selected 형식을 엄격히 준수합니다.

오류 상태 class는 has_error 형식을 사용합니다.

스타일 우선순위 왜곡을 방지하기 위해 불필요한 !important 사용을 금지합니다.

Mobile-First 또는 Desktop-First 기준을 통일하되, 360px, 768px, 1280px 해상도를 반드시 검증합니다.

JavaScript
변수명과 함수명은 camelCase를 사용합니다. (예: currentTab, renderReportCard)

불리언(Boolean) 변수는 is, has, can, should로 시작합니다. (예: isLoaded, hasData)

이벤트 핸들러 함수는 handleXxx 형식을 준수합니다. (예: handleTabClick, handleOptionSelect)

전역 고정 상수는 UPPER_SNAKE_CASE를 사용합니다. (예: DEFAULT_BREAKPOINT, MAX_ITEM_COUNT)

반복되는 중복 로직은 단일 책임 원칙에 따라 명확한 목적을 가진 함수로 분리합니다.

사용자 입력값 및 localStorage 데이터(bs_selected_tab, bs_theme_mode 등)는 사용 전에 항상 유효성을 검증합니다.

개발 단계에서 사용한 임시 console.log 및 디버깅 코드는 최종 완료 전에 전량 제거합니다.

디자인 구현
피그마 디자인 원본을 1:1 시각적 기준으로 삼아 레이아웃을 구현합니다.

화면 구조, 여백(Margin/Padding), 정렬, 색상, 폰트, 호버/클릭 상태를 임의로 재해석하거나 변경하지 않습니다.

제공된 assets/ 폴더 내 실제 SVG/PNG 파일을 우선 사용하며, 외부 Placeholder 이미지를 사용하지 않습니다.

디자인 시안에 명시되어 있지 않은 과도한 장식 모션이나 불필요한 인터랙션을 임의로 추가하지 않습니다.

Figma MCP
피그마 내 레이어 구조, 스크린샷, 디자인 변수, 컨텍스트를 순서대로 확인합니다.

생성되거나 추출된 코드를 그대로 복사-붙여넣기 하지 않고, 프로젝트의 Vanilla HTML/CSS/JS 스택에 맞게 다듬어 적용합니다.

디자인 에셋은 피그마의 Export 기능을 통해 적절한 포맷(SVG/PNG)으로 내보내어 assets/ 경로에 저장합니다.

구현 완료 후 실제 브라우저 랜더링 화면을 피그마 디자인 스크린샷과 1:1로 비교 검증합니다.

접근성과 상태
키보드 탭(Tab) 이동 시 포커스가 시각적으로 명확히 보이도록 :focus-visible 스타일을 필수 적용합니다.

각 UI 요소의 로딩 상태(Skeleton/Spinner), 빈 상태(Empty), 오류 상태(has_error), 비활성 상태(disabled)를 완벽히 구현합니다.

단순 색상 변화만으로 정보나 상태를 전달하지 않으며, 텍스트나 아이콘 등의 보조 수단을 함께 제공합니다.

애니메이션 및 모션 적용 시 @media (prefers-reduced-motion: reduce) 환경을 고려하여 필수 모션 외 동작을 제어합니다.

검증과 결과 보고
검증 항목:

크롬 개발자 도구를 통한 콘솔 오류(Uncaught TypeError 등) 및 404 에셋 누락 여부 확인

360px, 768px, 1280px 반응형 환경에서의 가로 스크롤 발생 여부 및 레이아웃 깨짐 검증

키보드 접근성(Tab, Enter, Space) 및 :focus-visible 포커스 링 동작 확인

탭 전환, 모달, 데이터 리포트 선택 등 주요 인터랙션의 정상 작동 여부 검증

결과 보고서 작성:

작업 완료 후 보고서에 [변경 파일 목록], [주요 구현 내용], [디자인/개발 판단 사항], [검증 결과], [미확인/추후 논의 필요 사항]을 구체적으로 구분하여 제출합니다.
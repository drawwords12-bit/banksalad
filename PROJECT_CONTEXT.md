[뱅크샐러드 브랜드 리디자인] 현재 상태
마지막 업데이트: 2026-07-27

구현 완료

브랜드 기획 & 리디자인 방향성 수립: 전통적 은행 신전(Bank Temple) 모티프와 '성장 데이터 그래프/유전자 나선'을 결합한 브랜드 콘셉트("Solid Foundation & Flexible Data") 정의 완료 


프로젝트 가이드라인 문서화: PRD.md, AGENTS.md, PROJECT_RULES.md, design-to-vanilla 스킬 가이드 작성 완료 


Figma 에셋 추출 규격 정의: Pure 그래픽 에셋(SVG/PNG) 및 텍스트 분리 추출 기준 수립 완료 


기본 HTML/CSS 마크업 체계 구성: index.html 시맨틱 구조 작성 및 css/common.css 내 디자인 토큰(Navy, Fresh Green, Sub Yellow) 기본 선언 

구현 중

Hero 섹션 로고 인터랙션 & 레이아웃: 뱅크샐러드 신전 심볼 아이콘(ic_bank_temple.svg)과 반응형 헤더/메인 비주얼 연동 작업 진행 중 


자산/건강 데이터 전환 탭 컴포넌트: Vanilla JS 기반 탭 전환 이벤트 핸들러 및 UI 상태 클래스(is_selected, is_active) 제어 코드 작성 중 

확정된 UX 정책
모바일(360px) 및 태블릿(768px) 환경에서 모바일 메뉴 및 FAQ 아코디언 요소는 기본적으로 닫힌 상태(is_open 미적용)로 시작 

자산/건강 데이터 선택 탭 변경 시, 사용자가 선택한 상태는 localStorage(bs_selected_tab)에 즉시 저장되어 재방문 시에도 유지 

데이터 리포트 체험 시 선택된 조건의 결과 데이터가 없는 경우, 빈 상태 안내(empty_state) 및 조건 초기화 버튼을 표시 

사용 중인 라이브러리

Vanilla HTML5 / CSS3 / JavaScript (ES6+): 프레임워크(React, Vue, Tailwind 등) 없이 순수 웹 표준 스택으로 전체 레이아웃 및 기능 구현 


(적용 대기) GSAP & ScrollTrigger: Hero 섹션 로고 등장 모션 구현 시, 복잡한 스크롤 연동 인터랙션 필요 여부에 따라 제한적 사용 검토 중 

저장 데이터

localStorage key: bs_selected_tab - 사용자가 마지막으로 선택한 메인 서비스 탭 (asset 또는 health) 


localStorage key: bs_theme_mode - 사용자가 선택한 화면 테마 모드 (light 또는 dark) 

알려진 문제

360px 모바일 화면 여백 미세 이탈: 360px 이하 극소형 해상도에서 Hero 섹션 텍스트 영역과 로고 심볼의 패딩이 일부 겹치는 현상 발생 (미디어 쿼리 Breakpoint 세부 조정 작업 진행 중) 

다음 작업

360px 모바일 반응형 화면의 가로 스크롤(overflow-x) 방지 및 레이아웃 여백 재조정 

자산/건강 데이터 리포트 시뮬레이션 카드의 동적 DOM 업데이트 기능 JS 작성 

키보드 접근성 focus링(:focus-visible) 및 콘솔 오류(404/스크립트 에러) 점검 

마지막 검증 결과

실행 명령: Chrome DevTools를 통한 반응형 해상도(360px, 768px, 1280px) 1:1 레이아웃 검증 


결과: 부분 통과 (360px 분기점 내 패딩/마진 미세 조정 필요) 


확인 화면: 360px (수정 진행 중), 768px (정상 확인), 1280px (정상 확인) 


확인하지 못한 부분: 스크린 리더 음성 지원(NVDA) 탭 이동 순서 정밀 검증
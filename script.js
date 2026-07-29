/**
 * ============================================================================
 * 뱅크샐러드 랜딩 페이지 인터랙션
 * Figma: 김지현_뱅크샐러드 / node 613-648 "main_page"
 * ----------------------------------------------------------------------------
 * 기능
 *   1) 모바일 GNB 토글      : 햄버거 버튼으로 내비게이션 열고 닫기
 *   2) 헤더 스크롤 그림자   : 스크롤 시 헤더에 그림자 부여
 *   3) 스크롤 리빌          : IntersectionObserver로 요소 등장 애니메이션
 *   4) 지표 카운트업        : stats 섹션 숫자 애니메이션
 *
 * 모든 기능은 대상 요소가 없어도 안전하게 종료되도록 방어 코드를 넣었습니다.
 * ============================================================================
 */

(function () {
  'use strict';

  /** 사용자가 "동작 최소화"를 설정했는지 여부 (애니메이션 생략 판단용) */
  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* ==========================================================================
     1) 모바일 GNB 토글
     ========================================================================== */
  function initGnbToggle() {
    var toggle = document.querySelector('.gnb-toggle');
    var gnb = document.getElementById('gnb');
    if (!toggle || !gnb) return;

    /** 열림/닫힘 상태를 aria-expanded와 클래스에 동시에 반영 */
    function setOpen(isOpen) {
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
      gnb.classList.toggle('is-open', isOpen);
    }

    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });

    // 메뉴 링크 클릭 시 자동으로 닫기
    gnb.addEventListener('click', function (e) {
      if (e.target.closest('.gnb__link')) setOpen(false);
    });

    // ESC 키로 닫기
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });

    // 데스크톱 폭으로 돌아가면 상태 초기화
    var desktopQuery = window.matchMedia('(min-width: 1025px)');
    desktopQuery.addEventListener('change', function (e) {
      if (e.matches) setOpen(false);
    });
  }

  /* ==========================================================================
     2) 헤더 스크롤 그림자
     ========================================================================== */
  function initHeaderShadow() {
    var header = document.getElementById('header');
    if (!header) return;

    var ticking = false;

    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
      ticking = false;
    }

    window.addEventListener(
      'scroll',
      function () {
        // rAF로 스크롤 핸들러 호출 빈도를 프레임 단위로 제한
        if (!ticking) {
          window.requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );

    update(); // 새로고침 시 스크롤 위치 반영
  }

  /* ==========================================================================
     3) 스크롤 리빌 (.js-reveal → .is-visible)
     ========================================================================== */
  function initScrollReveal() {
    var targets = document.querySelectorAll('.js-reveal');
    if (!targets.length) return;

    // 모션 최소화 설정이거나 구형 브라우저면 즉시 노출
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // 한 번만 실행
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ==========================================================================
     4) 지표 카운트업 (.stats__value[data-count])
     ========================================================================== */
  function initCountUp() {
    var values = document.querySelectorAll('.stats__value[data-count]');
    if (!values.length) return;

    /**
     * 0 → target 까지 숫자를 증가시키며 화면에 그린다.
     * @param {HTMLElement} el 대상 요소
     */
    function animate(el) {
      var target = Number(el.dataset.count) || 0;
      var suffix = el.dataset.suffix || '';
      var duration = 1400; // ms
      var start = null;

      // 목표가 0이면 애니메이션 없이 확정 표시
      if (target === 0) {
        el.textContent = '0' + suffix;
        return;
      }

      function step(timestamp) {
        if (start === null) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        // easeOutCubic : 빠르게 시작해 부드럽게 감속
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased).toLocaleString('ko-KR') + suffix;

        if (progress < 1) window.requestAnimationFrame(step);
      }

      window.requestAnimationFrame(step);
    }

    // 모션 최소화 설정이면 최종값만 표시
    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animate(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );

    values.forEach(function (el) {
      el.textContent = '0' + (el.dataset.suffix || ''); // 시작값
      observer.observe(el);
    });
  }

  /* ==========================================================================
     초기화
     ========================================================================== */
  function init() {
    initGnbToggle();
    initHeaderShadow();
    initScrollReveal();
    initCountUp();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

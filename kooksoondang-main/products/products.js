/*
 * Products 페이지 인터랙션
 * - 카테고리 선택 (MAKGEOLLI / BEKSEJU / YEDAMCHEONG / SOJU)
 * - Experience / Taste 태그 선택 (#Vegan #Beginner #Intermediate #Advanced)
 * - 검색어 입력
 * - VIEW ALL / VIEW DETAILS
 * - TOP 버튼
 *
 * 각 제품의 data-experience 값은 시안에서 실제로 확인되는 정보만으로 정했다.
 *   vegan        : 카드에 #VEGAN 이 적힌 제품 (Draft / Rice / 100 Billion Prebiotics)
 *   beginner     : Beginner's Starter Kit 에 제시된 제품 (Strawberry / Banana / White Grape)
 *   intermediate / advanced : 남은 제품을 Taste Keyword 기준으로 나눔
 * 시안에 필터 기준이 명시되어 있지 않아 임의의 제품이나 등급을 새로 만들지는 않았다.
 */

(() => {
    const grid = document.querySelector('[data-product-grid]');

    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.product_card'));
    const categoryList = document.querySelector('[data-product-category]');
    const categoryButtons = categoryList ? Array.from(categoryList.querySelectorAll('.category_button')) : [];
    const tagList = document.querySelector('[data-experience-tags]');
    const tagButtons = tagList ? Array.from(tagList.querySelectorAll('.experience_tag')) : [];
    const searchForm = document.querySelector('[data-craving-search]');
    const searchInput = document.querySelector('[data-craving-input]');
    const emptyMessage = document.querySelector('[data-product-empty]');
    const viewAllButton = document.querySelector('[data-view-all]');
    const viewDetailsButton = document.querySelector('[data-view-details]');
    const showcase = document.getElementById('product_showcase');

    const state = {
        category: 'makgeolli',
        experience: '',
        keyword: ''
    };

    function matchesCard(card) {
        const category = card.dataset.category || '';
        const experience = (card.dataset.experience || '').split(/\s+/);
        const name = (card.querySelector('.product_name')?.textContent || '').toLowerCase();
        const taste = (card.querySelector('.product_taste')?.textContent || '').toLowerCase();

        if (state.category && category !== state.category) return false;
        if (state.experience && !experience.includes(state.experience)) return false;
        if (state.keyword && !name.includes(state.keyword) && !taste.includes(state.keyword)) return false;

        return true;
    }

    function renderProducts() {
        let visibleCount = 0;

        cards.forEach((card) => {
            const isVisible = matchesCard(card);

            card.hidden = !isVisible;
            if (isVisible) visibleCount += 1;
        });

        if (emptyMessage) emptyMessage.hidden = visibleCount > 0;
    }

    function setPressed(button, isPressed) {
        button.classList.toggle('is_active', isPressed);
        button.setAttribute('aria-pressed', String(isPressed));
    }

    function handleCategoryClick(event) {
        const button = event.target.closest('.category_button');

        if (!button) return;

        state.category = button.dataset.category || '';
        categoryButtons.forEach((item) => setPressed(item, item === button));
        renderProducts();
    }

    function handleTagClick(event) {
        const button = event.target.closest('.experience_tag');

        if (!button) return;

        // 같은 태그를 다시 누르면 해제
        const nextExperience = state.experience === button.dataset.experience ? '' : button.dataset.experience;

        state.experience = nextExperience || '';
        tagButtons.forEach((item) => setPressed(item, item.dataset.experience === state.experience));
        renderProducts();
    }

    function handleSearchSubmit(event) {
        event.preventDefault();
        state.keyword = (searchInput?.value || '').trim().toLowerCase();
        renderProducts();
    }

    function handleSearchInput() {
        // 입력을 지우면 곧바로 전체가 다시 보이도록
        if (searchInput.value !== '') return;

        state.keyword = '';
        renderProducts();
    }

    // 시안에 VIEW ALL 의 이동 목적지가 없어서 새 페이지를 만들지 않고
    // 적용된 조건을 모두 풀어 전체 제품을 보여주는 동작으로 구현했다.
    function handleViewAllClick() {
        state.category = '';
        state.experience = '';
        state.keyword = '';

        categoryButtons.forEach((item) => setPressed(item, false));
        tagButtons.forEach((item) => setPressed(item, false));
        if (searchInput) searchInput.value = '';

        renderProducts();
    }

    // VIEW DETAILS 역시 목적지가 확인되지 않아, Starter Kit 에 제시된
    // 입문자용 제품을 제품 영역에서 바로 확인하도록 연결했다.
    function handleViewDetailsClick() {
        state.category = 'makgeolli';
        state.experience = 'beginner';
        state.keyword = '';

        categoryButtons.forEach((item) => setPressed(item, item.dataset.category === 'makgeolli'));
        tagButtons.forEach((item) => setPressed(item, item.dataset.experience === 'beginner'));
        if (searchInput) searchInput.value = '';

        renderProducts();

        if (!showcase) return;

        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

        if (window.siteLenis) window.siteLenis.scrollTo(showcase);
        else showcase.scrollIntoView({ behavior, block: 'start' });
    }

    categoryList?.addEventListener('click', handleCategoryClick);
    tagList?.addEventListener('click', handleTagClick);
    searchForm?.addEventListener('submit', handleSearchSubmit);
    searchInput?.addEventListener('input', handleSearchInput);
    viewAllButton?.addEventListener('click', handleViewAllClick);
    viewDetailsButton?.addEventListener('click', handleViewDetailsClick);

    renderProducts();
})();

(() => {
    const topButton = document.querySelector('[data-top-button]');

    if (!topButton) return;

    const revealPoint = 400;
    let scrollFrame = 0;

    function updateTopButton() {
        scrollFrame = 0;
        topButton.classList.toggle('is_visible', window.scrollY > revealPoint);
    }

    function handleScroll() {
        if (scrollFrame) return;

        scrollFrame = window.requestAnimationFrame(updateTopButton);
    }

    function handleTopClick() {
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

        if (window.siteLenis) window.siteLenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    topButton.addEventListener('click', handleTopClick);
    updateTopButton();
})();

/* =========================================================
   Products Hero Intro Animation
   1. 제목 등장
   2. 주변 막걸리 병 등장
   3. Splash 등장
   4. 중앙 백세주 등장
========================================================= */

(() => {
    const hero = document.querySelector('.products_hero');

    if (!hero) return;

    if (typeof gsap === 'undefined') {
        console.warn('[products hero] GSAP이 로드되지 않았습니다.');
        return;
    }

    const titleLines = hero.querySelectorAll('.products_hero_title span');

    const rice = hero.querySelector('.hero_bottle_rice');
    const draft = hero.querySelector('.hero_bottle_draft');
    const prebiotics = hero.querySelector('.hero_bottle_prebiotics');
    const strawberry = hero.querySelector('.hero_bottle_strawberry');

    const splash = hero.querySelector('.hero_splash');
    const center = hero.querySelector('.hero_bottle_center');

    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;


    /* =====================================================
       모션 감소 설정
    ===================================================== */

    if (prefersReducedMotion) {
        gsap.set(
            [
                ...titleLines,
                rice,
                draft,
                prebiotics,
                strawberry,
                splash,
                center
            ].filter(Boolean),
            {
                opacity: 1
            }
        );

        return;
    }


    /* =====================================================
       Hero 등장 Timeline
    ===================================================== */

    const introTl = gsap.timeline({
        defaults: {
            ease: 'power3.out'
        }
    });


    /* 1. 제목 */

    if (titleLines.length) {
        introTl.fromTo(
            titleLines,
            {
                y: -55,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,

                duration: 0.9,

                stagger: 0.12
            }
        );
    }


    /* 2. Rice - 왼쪽 밖에서 */

    if (rice) {
        introTl.fromTo(
            rice,
            {
                x: -320,
                y: -80,
                opacity: 0
            },
            {
                x: 0,
                y: 0,
                opacity: 1,

                duration: 1.05
            },

            '-=0.2'
        );
    }


    /* 3. Prebiotics - 오른쪽 위 */

    if (prebiotics) {
        introTl.fromTo(
            prebiotics,
            {
                x: 300,
                y: -130,
                opacity: 0
            },
            {
                x: 0,
                y: 0,
                opacity: 1,

                duration: 1.05
            },

            '-=0.82'
        );
    }


    /* 4. Draft - 왼쪽 아래 */

    if (draft) {
        introTl.fromTo(
            draft,
            {
                x: -270,
                y: 230,
                opacity: 0
            },
            {
                x: 0,
                y: 0,
                opacity: 1,

                duration: 1.05
            },

            '-=0.78'
        );
    }


    /* 5. Strawberry - 오른쪽 아래 */

    if (strawberry) {
        introTl.fromTo(
            strawberry,
            {
                x: 270,
                y: 230,
                opacity: 0
            },
            {
                x: 0,
                y: 0,
                opacity: 1,

                duration: 1.05
            },

            '-=0.78'
        );
    }


    /* =====================================================
       6. Splash
    ===================================================== */

    if (splash) {
        introTl.fromTo(
            splash,
            {
                scale: 0.25,
                opacity: 0
            },
            {
                scale: 1,
                opacity: 1,

                duration: 0.8,

                ease: 'back.out(1.7)'
            },

            '-=0.3'
        );
    }


    /* =====================================================
       7. 가운데 백세주
    ===================================================== */

    if (center) {
        introTl.fromTo(
            center,
            {
                y: 280,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,

                duration: 1.15,

                ease: 'back.out(1.25)'
            },

            '-=0.5'
        );
    }

})();

/* =========================================================
   PRODUCTS HERO → CONTENT SCROLL TRANSITION

   1. Hero 고정
   2. Hero 비주얼 1 → 1.2 확대
   3. 검정 Dim
   4. 다음 콘텐츠가 아래에서 위로 Hero를 덮음

   Desktop / Tablet / Mobile 동일 적용
========================================================= */

(() => {
    const hero = document.querySelector('.products_hero');

    const heroInner = hero?.querySelector('.products_hero_inner');
    const heroStage = hero?.querySelector('.products_hero_stage');
    const heroDim = hero?.querySelector('.products_hero_dim');

    const contentLayer = document.querySelector('.products_content_layer');

    if (
        !hero ||
        !heroInner ||
        !heroStage ||
        !contentLayer
    ) {
        return;
    }


    if (
        typeof gsap === 'undefined' ||
        typeof ScrollTrigger === 'undefined'
    ) {
        console.warn(
            '[products scroll] GSAP 또는 ScrollTrigger가 로드되지 않았습니다.'
        );

        return;
    }


    gsap.registerPlugin(ScrollTrigger);


    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;


    /* -----------------------------------------------------
       다음 콘텐츠 초기 위치

       Hero 바로 아래에 있지만
       화면 높이만큼 아래에서 시작
    ----------------------------------------------------- */

    gsap.set(contentLayer, {
        yPercent: 100
    });


    /* -----------------------------------------------------
       Scroll Timeline
    ----------------------------------------------------- */

    const tl = gsap.timeline({

        scrollTrigger: {

            trigger: hero,

            start: 'top top',

            /*
             * Hero 고정 상태에서
             * 약 1~2회 정도 스크롤하는 느낌
             */
            end: '+=180%',

            scrub: 1,

            pin: true,

            pinSpacing: true,

            anticipatePin: 1,

            invalidateOnRefresh: true
        }

    });


    /* =====================================================
       1. Hero 확대

       처음 약 60% 동안 1 → 1.2
    ===================================================== */

    tl.to(
        [heroInner, heroStage],
        {
            scale: 1.2,

            ease: 'none',

            duration: 0.62
        },
        0
    );


    /* =====================================================
       2. 검정 Fade

       확대 중후반부터 살짝 어두워짐
    ===================================================== */

    if (heroDim) {

        tl.to(
            heroDim,
            {
                opacity: 0.35,

                ease: 'none',

                duration: 0.25
            },
            0.48
        );

    }


    /* =====================================================
       3. 다음 Product 콘텐츠가 위로 덮기

       아래 100% → 화면 제자리
    ===================================================== */

    tl.to(
        contentLayer,
        {
            yPercent: 0,

            ease: 'none',

            duration: 0.48
        },
        0.52
    );


    /* 이미지 로딩 후 ScrollTrigger 위치 보정 */

    window.addEventListener(
        'load',
        () => {
            ScrollTrigger.refresh();
        },
        {
            once: true
        }
    );




    /* =====================================================
       모션 감소 설정
    ===================================================== */

    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;


    /* =====================================================
       다음 섹션 초기 위치

       처음부터 완전히 100% 밑으로 보내면
       현재 페이지 레이아웃에서 간격이 너무 커질 수 있어서
       18%만 아래로 둠
    ===================================================== */

    gsap.set(nextSection, {
        yPercent: 18
    });


    /* =====================================================
       ScrollTrigger Timeline
    ===================================================== */

    const scrollTl = gsap.timeline({

        scrollTrigger: {

            trigger: hero,

            /* Hero가 상단에 도달 */
            start: 'top top',

            /*
             * 스크롤 약 두 화면
             *
             * 150% = 빠름
             * 200% = 추천
             * 250% = 느림
             */
            end: '+=200%',

            /* 스크롤과 애니메이션 연결 */
            scrub: 1,

            /* Hero 화면 고정 */
            pin: true,

            pinSpacing: true,

            anticipatePin: 1,

            invalidateOnRefresh: true
        }

    });


    /* =====================================================
       1. Hero 확대

       Hero 자체에 scale을 거는 것이 아니라
       안쪽 두 레이어를 확대함.
    ===================================================== */

    scrollTl.to(
        [heroInner, heroStage],
        {
            scale: 1.2,

            ease: 'none',

            duration: 1
        },

        0
    );


    /* =====================================================
       2. 검정 Fade

       전체 스크롤의 약 60% 지점부터 시작
    ===================================================== */

    if (heroDim) {

        scrollTl.to(
            heroDim,
            {
                opacity: 0.38,

                ease: 'none',

                duration: 0.35
            },

            0.6
        );

    }


    /* =====================================================
       3. 다음 섹션이 위로 올라오기

       확대가 거의 끝날 때 시작
    ===================================================== */

    scrollTl.to(
        nextSection,
        {
            yPercent: 0,

            ease: 'none',

            duration: 0.4
        },

        0.68
    );


    /* =====================================================
       이미지 로딩 후 위치 재계산
    ===================================================== */

    window.addEventListener(
        'load',
        () => {
            ScrollTrigger.refresh();
        },
        {
            once: true
        }
    );

})();

/* =====================================================
   등장 완료 후 Floating Animation
===================================================== */

tl.call(() => {

    /* Rice */
    if (rice) {
        gsap.to(rice, {
            y: 10,
            rotation: -45,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

    /* 1000 */
    if (prebiotics) {
        gsap.to(prebiotics, {
            y: 12,
            rotation: 10,
            duration: 3.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

    /* Draft */
    if (draft) {
        gsap.to(draft, {
            y: -10,
            rotation: 13,
            duration: 3.6,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

    /* Strawberry */
    if (strawberry) {
        gsap.to(strawberry, {
            y: -12,
            rotation: -14,
            duration: 3.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

    /* 중앙 백세주 */
    if (center) {
        gsap.to(center, {
            y: -10,
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

    /* Splash도 아주 살짝 움직임 */
    if (splash) {
        gsap.to(splash, {
            scale: 1.03,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

});

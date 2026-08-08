/* =========================================================
   Products 페이지 인터랙션
   - 카테고리 선택 (MAKGEOLLI / BEKSEJU / YEDAMCHEONG / SOJU)
   - Experience / Taste 태그 선택 (#Vegan #Beginner #Intermediate #Advanced)
   - 검색어 입력
   - VIEW ALL / VIEW DETAILS
   - TOP 버튼
========================================================= */

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
        if (searchInput.value !== '') return;

        state.keyword = '';
        renderProducts();
    }

    function handleViewAllClick() {
        state.category = '';
        state.experience = '';
        state.keyword = '';

        categoryButtons.forEach((item) => setPressed(item, false));
        tagButtons.forEach((item) => setPressed(item, false));
        if (searchInput) searchInput.value = '';

        renderProducts();
    }

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

/* =========================================================
   TOP 버튼 인터랙션
========================================================= */

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
   Products Hero Intro Animation & Floating Animation
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
            { opacity: 1 }
        );
        return;
    }

    const introTl = gsap.timeline({
        defaults: {
            ease: 'power3.out'
        }
    });

    /* 1. 제목 */
    if (titleLines.length) {
        introTl.fromTo(
            titleLines,
            { y: -55, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 }
        );
    }

    /* 2. Rice */
    if (rice) {
        introTl.fromTo(
            rice,
            { x: -320, y: -80, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 1.05 },
            '-=0.2'
        );
    }

    /* 3. Prebiotics */
    if (prebiotics) {
        introTl.fromTo(
            prebiotics,
            { x: 300, y: -130, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 1.05 },
            '-=0.82'
        );
    }

    /* 4. Draft */
    if (draft) {
        introTl.fromTo(
            draft,
            { x: -270, y: 230, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 1.05 },
            '-=0.78'
        );
    }

    /* 5. Strawberry */
    if (strawberry) {
        introTl.fromTo(
            strawberry,
            { x: 270, y: 230, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 1.05 },
            '-=0.78'
        );
    }

    /* 6. Splash */
    if (splash) {
        introTl.fromTo(
            splash,
            { scale: 0.25, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
            '-=0.3'
        );
    }

    /* 7. 가운데 백세주 */
    if (center) {
        introTl.fromTo(
            center,
            { y: 280, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.15, ease: 'back.out(1.25)' },
            '-=0.5'
        );
    }

    /* 등장 완료 후 Floating Animation 연결 */
    introTl.call(() => {
        if (rice) {
            gsap.to(rice, { y: 10, rotation: -45, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        }
        if (prebiotics) {
            gsap.to(prebiotics, { y: 12, rotation: 10, duration: 3.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        }
        if (draft) {
            gsap.to(draft, { y: -10, rotation: 13, duration: 3.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        }
        if (strawberry) {
            gsap.to(strawberry, { y: -12, rotation: -14, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        }
        if (center) {
            gsap.to(center, { y: -10, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        }
        if (splash) {
            gsap.to(splash, { scale: 1.03, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        }
    });
})();

/* =========================================================
   PRODUCTS HERO → CONTENT SCROLL TRANSITION
========================================================= */

(() => {
    const hero = document.querySelector('.products_hero');
    const heroInner = hero?.querySelector('.products_hero_inner');
    const heroStage = hero?.querySelector('.products_hero_stage');
    const heroDim = hero?.querySelector('.products_hero_dim');
    const contentLayer = document.querySelector('.products_content_layer');

    if (!hero || !heroInner || !heroStage || !contentLayer) {
        return;
    }

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('[products scroll] GSAP 또는 ScrollTrigger가 로드되지 않았습니다.');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    /* 다음 콘텐츠 초기 위치 설정 */
    gsap.set(contentLayer, {
        yPercent: 100
    });

    /* 스크롤 트릭거 타임라인 설정 */
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: '+=180%',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    });

    /* 1. Hero 확대 */
    tl.to(
        [heroInner, heroStage],
        {
            scale: 1.2,
            ease: 'none',
            duration: 0.62
        },
        0
    );

    /* 2. 검정 Dim 페이드 */
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

    /* 3. 다음 Product 콘텐츠가 위로 덮기 */
    tl.to(
        contentLayer,
        {
            yPercent: 0,
            ease: 'none',
            duration: 0.48
        },
        0.52
    );

    window.addEventListener(
        'load',
        () => {
            ScrollTrigger.refresh();
        },
        { once: true }
    );
})();
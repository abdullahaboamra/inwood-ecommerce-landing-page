/* ==========================================================================
   INWOOD Landing Page — combined script.js
   Merged from: index.js, Page02.js, main.js, Page004.js, page05.js, page06.js
   Each section's behavior is preserved exactly; only two id references were
   renamed to avoid collisions created by merging (see notes below).
   ========================================================================== */

/* ==========================================================================
   1. Hero / Header (from index.js)
   Mobile nav toggle for the main site header.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  // Toggle mobile navigation menu
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }
});

/* ==========================================================================
   2. Explore by Category (from Page02.js)
   Sidebar category navigation + active card state + mobile menu toggle.
   NOTE: the mobile toggle button's id was renamed from "menuToggle" to
   "categoryMenuToggle" in index.html/script.js because Page00's header
   toggle already uses id="menuToggle" — two elements can't share one id in
   a single merged document. The class name (used for styling) is unchanged.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const categoryNav = document.getElementById('categoryNav');
  const categoryList = categoryNav ? categoryNav.querySelector('.category-list') : null;
  const cardsGrid = document.querySelector('.cards-grid');
  const featureCards = document.querySelectorAll('.feature-card');
  const menuToggle = document.getElementById('categoryMenuToggle');
  const activeIndicator = document.querySelector('.active-indicator');

  if (!categoryList || !cardsGrid) return;

  /**
   * Updates Active Category and Card State
   * @param {string} targetCategory - The data-target value of selected item
   * @param {HTMLElement} clickedLink - The clicked anchor element
   */
  function setActiveCategory(targetCategory, clickedLink) {
    // 1. Update Navigation Links Active State & Accessibility
    const links = categoryList.querySelectorAll('.category-link');
    links.forEach(link => {
      const isActive = link === clickedLink;
      link.classList.toggle('active', isActive);
      link.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // 2. Update Feature Cards Active State
    featureCards.forEach(card => {
      const isTarget = card.dataset.category === targetCategory;
      card.classList.toggle('active', isTarget);
    });

    // 3. Move Desktop Vertical Bar Indicator position if applicable
    if (activeIndicator && clickedLink) {
      const linkRect = clickedLink.getBoundingClientRect();
      const parentRect = categoryList.getBoundingClientRect();
      const topOffset = linkRect.top - parentRect.top;
      activeIndicator.style.top = `${topOffset}px`;
    }
  }

  /**
   * Event Delegation for Navigation Links Click
   */
  categoryList.addEventListener('click', (event) => {
    const targetLink = event.target.closest('.category-link');
    if (!targetLink) return;

    event.preventDefault();
    const targetCategory = targetLink.dataset.target;

    if (targetCategory) {
      setActiveCategory(targetCategory, targetLink);
    }
  });

  /**
   * Mobile Menu Toggle Handler
   */
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = categoryNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
});

/* ==========================================================================
   3. Popular Products (from main.js)
   Horizontal product slider: prev/next buttons + progress thumb.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const sliderWrapper = document.querySelector('.slider-wrapper');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const progressThumb = document.getElementById('progressThumb');

  if (sliderWrapper && prevBtn && nextBtn) {
    // التمرير جهة اليمين واليسار عند النقر على الأزرار
    const scrollAmount = 290;

    nextBtn.addEventListener('click', () => {
      sliderWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      sliderWrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    // تحديث مؤشر خط التقدم الأخضر تفاعلياً مع السحب والتمرير
    sliderWrapper.addEventListener('scroll', () => {
      const maxScroll = sliderWrapper.scrollWidth - sliderWrapper.clientWidth;
      if (maxScroll > 0) {
        const scrollPercent = (sliderWrapper.scrollLeft / maxScroll) * 75; // الحد الأقصى لنقطة البداية
        progressThumb.style.left = `${scrollPercent}%`;
      }
    });
  }
});

/* ==========================================================================
   4. Special Package (from Page004.js)
   Expand/collapse for the description text and related-product excerpts.
   Each toggle button uses aria-controls to point at the text it expands,
   so this works for any number of them without extra wiring. Runs on all
   matching elements document-wide, so it needs no changes for the merge.
   ========================================================================== */
document.querySelectorAll('[data-toggle="expand"]').forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const targetId = toggle.getAttribute("aria-controls");
    const target = document.getElementById(targetId);
    if (!target) return;

    const isExpanded = toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute("aria-expanded", String(!isExpanded));
    target.classList.toggle("is-expanded", !isExpanded);

    const label = toggle.querySelector(".toggle-label");
    if (label) {
      label.textContent = isExpanded ? "See More" : "See Less";
    }
  });
});

/* ==========================================================================
   5. Our Own Creation (from page05.js)
   Horizontal cards track: prev/next buttons.
   NOTE: the prev/next button ids were renamed from "prevBtn"/"nextBtn" to
   "creationPrevBtn"/"creationNextBtn" in index.html/script.js because the
   Popular Products section (main.js, above) already uses those ids — two
   elements can't share one id in a single merged document.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const cardsTrack = document.getElementById('cardsTrack');
  const prevBtn = document.getElementById('creationPrevBtn');
  const nextBtn = document.getElementById('creationNextBtn');

  // التحقق من وجود العناصر لتجنب الأخطاء
  if (cardsTrack && prevBtn && nextBtn) {

    // تحديد مسافة التمرير (بكسل) عند الضغط على السهم
    // يفضل جعلها تعادل عرض بطاقة الصورة + المسافة gap (24px) للتمرير بطاقة بطاقة
    const scrollAmount = 300 + 24;

    // تفعيل سهم Next لكافة الشاشات (على أنهم images لأعلى ولأسفل في الـ HTML الأصلي)
    nextBtn.addEventListener('click', () => {
      // تمرير الحاوية لليسار (Next)
      cardsTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // تفعيل سهم Previous
    prevBtn.addEventListener('click', () => {
      // تمرير الحاوية لليمين (Previous)
      cardsTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }
});

/* ==========================================================================
   6. Benefits (from page06.js)
   Click-to-select state for benefit cards (useful on mobile, no hover).
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const benefitCards = document.querySelectorAll('.benefit-card');

  // تفعيل التحديد عند الضغط على الكرت (خاصة في الجوال حيث لا يوجد هوفر)
  benefitCards.forEach(card => {
    card.addEventListener('click', () => {
      // إزالة الكلاس active من كل الكروت
      benefitCards.forEach(btn => btn.classList.remove('active'));

      // إضافته للكرت المضغوط
      card.classList.add('active');
    });
  });
});
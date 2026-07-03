/* ============================================================
   SRI MANJU AMBULANCE SERVICE - GLOBAL INTERACTIVITY
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initBackToTop();
  initGalleryFilter();
  initLightbox();
  initCountUp();
  initHeroCarousel();
  initContactForm();
});

/* ── 1. MOBILE MENU TOGGLE & DROPDOWN ── */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger') || document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu .close-btn');
  const dropdownTrigger = document.querySelector('.mob-dropdown-trigger');
  const mobSub = document.querySelector('.mob-sub');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
  }

  if (closeBtn && mobileMenu && hamburger) {
    closeBtn.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Toggle mobile dropdown submenu
  if (dropdownTrigger && mobSub) {
    dropdownTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isHidden = mobSub.style.display === 'none' || !mobSub.style.display;
      mobSub.style.display = isHidden ? 'block' : 'none';
      const icon = dropdownTrigger.querySelector('i');
      if (icon) {
        icon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
        icon.style.transition = 'transform 0.3s ease';
      }
    });
  }

  // Close menu on click of mobile nav link
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger && mobileMenu) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });
}

/* ── 2. BACK TO TOP BUTTON ── */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top') || document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── 3. GALLERY FILTER ── */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length === 0 || galleryItems.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ── 4. LIGHTBOX MODAL ── */
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item img');
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-inner img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  const lightboxPrev = lightbox.querySelector('.lightbox-nav.prev');
  const lightboxNext = lightbox.querySelector('.lightbox-nav.next');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');

  let activeIndex = -1;
  const visibleImages = [];

  function updateVisibleImages() {
    visibleImages.length = 0;
    document.querySelectorAll('.gallery-item').forEach(item => {
      if (item.style.display !== 'none') {
        const img = item.querySelector('img');
        if (img) visibleImages.push(img);
      }
    });
  }

  function showImage(index) {
    if (index < 0 || index >= visibleImages.length) return;
    activeIndex = index;
    const img = visibleImages[activeIndex];
    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.alt || 'Sri Manju Ambulance Service';
  }

  galleryItems.forEach(img => {
    img.addEventListener('click', (e) => {
      updateVisibleImages();
      const currentIdx = visibleImages.indexOf(e.target);
      if (currentIdx !== -1) {
        showImage(currentIdx);
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      let prevIdx = activeIndex - 1;
      if (prevIdx < 0) prevIdx = visibleImages.length - 1;
      showImage(prevIdx);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      let nextIdx = activeIndex + 1;
      if (nextIdx >= visibleImages.length) nextIdx = 0;
      showImage(nextIdx);
    });
  }

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    } else if (e.key === 'ArrowLeft' && lightboxPrev) {
      lightboxPrev.click();
    } else if (e.key === 'ArrowRight' && lightboxNext) {
      lightboxNext.click();
    }
  });
}

/* ── 5. STATS COUNT-UP ANIMATION ── */
function initCountUp() {
  const counters = document.querySelectorAll('.countup, [data-count]');
  if (counters.length === 0) return;

  const options = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-count') || counter.getAttribute('data-target'), 10) || 0;
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000;
        let start = 0;
        const increment = target / (duration / 16);

        const updateCount = () => {
          start += increment;
          if (start < target) {
            counter.textContent = Math.ceil(start) + suffix;
            requestAnimationFrame(updateCount);
          } else {
            counter.textContent = target + suffix;
          }
        };

        updateCount();
        observer.unobserve(counter);
      }
    });
  }, options);

  counters.forEach(counter => observer.observe(counter));
}

/* ── 6. DYNAMIC HERO CAROUSEL ── */
function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-section-slide');
  const indicators = document.querySelectorAll('.carousel-indicators span');
  if (slides.length <= 1) return;

  let currentSlide = 0;
  let slideInterval = setInterval(nextSlide, 6000);

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  indicators.forEach((indicator, idx) => {
    indicator.addEventListener('click', () => {
      goToSlide(idx);
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 6000);
    });
  });
}

/* ── 7. CONTACT FORM TO WHATSAPP REDIRECTION ── */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phoneNum').value.trim();
    const serviceSelect = document.getElementById('serviceType');
    const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
    const message = document.getElementById('message').value.trim();

    // Format the text string for WhatsApp
    const whatsappMessage = `*New Query Request - Sri Manju Ambulance*\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Service:* ${serviceText}\n` +
      `*Message/Location:* ${message}`;

    const encodedText = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/917013512755?text=${encodedText}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  });
}

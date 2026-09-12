const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    });
  });
}

document.getElementById('year').textContent = new Date().getFullYear();


// Wedding gallery lightbox
const weddingGalleries = {
  garden: {
    title: 'Garden Celebration',
    images: [
      'images/garden-01.jpg',
      'images/garden-10.jpg',
      'images/garden-02.jpg',
      'images/garden-03.jpg',
      'images/garden-04.jpg',
      'images/garden-05.jpg',
      'images/garden-06.jpg',
      'images/garden-07.jpg',
      'images/garden-08.jpg',
      'images/garden-09.jpg'
    ]
  },
  ivory: {
    title: 'Ivory Radiance',
    images: [
      'images/ivory-1.jpg',
      'images/ivory-2.jpg',
      'images/ivory-3.jpg',
      'images/ivory-4.jpg',
      'images/ivory-5.jpg',
      'images/ivory-6.jpg',
      'images/ivory-7.jpg'
    ]
  },
  city: {
    title: 'City Romance',
    images: [
      'images/cr10.jpg',
      'images/cr11.jpg',
      'images/cr12.jpg',
      'images/cr13.jpg',
      'images/cr2.jpg',
      'images/cr3.jpg',
      'images/cr4.jpg',
      'images/cr5.jpg',
      'images/cr7.jpg',
      'images/cr8.jpg',
      'images/cr9.jpg'
    ]
  },
  golden: {
    title: 'Golden Glow',
    images: [
      'images/gg1.jpg',
      'images/gg2.jpg',
      'images/gg3.jpg',
      'images/gg4.jpg',
      'images/gg5.jpg',
      'images/gg6.jpg'
    ]
  },
  editorial: {
    title: 'Editorial Elegance',
    images: [
      'images/ee1.jpg',
      'images/ee2.jpg',
      'images/ee3.jpg',
      'images/ee4.jpg',
      'images/ee5.jpg'
    ]
  },
  veiled: {
    title: 'Veiled Romance',
    images: [
      'images/vr1.jpg',
      'images/vr2.jpg',
      'images/vr3.jpg',
      'images/vr4.jpg',
      'images/vr5.jpg',
      'images/vr6.jpg'
    ]
  }
};

const lightbox = document.getElementById('wedding-lightbox');
if (lightbox) {
  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const lightboxCounter = lightbox.querySelector('.lightbox-counter');
  const prevButton = lightbox.querySelector('.lightbox-prev');
  const nextButton = lightbox.querySelector('.lightbox-next');
  let activeGallery = null;
  let activeIndex = 0;
  let lastFocused = null;
  let touchStartX = 0;

  function renderLightbox() {
    const gallery = weddingGalleries[activeGallery];
    if (!gallery) return;
    lightboxImage.src = gallery.images[activeIndex];
    lightboxImage.alt = `${gallery.title} — photo ${activeIndex + 1} of ${gallery.images.length}`;
    lightboxTitle.textContent = gallery.title;
    lightboxCounter.textContent = `${activeIndex + 1} / ${gallery.images.length}`;
  }

  function openLightbox(galleryKey, startIndex = 0) {
    if (!weddingGalleries[galleryKey]) return;
    activeGallery = galleryKey;
    activeIndex = Math.max(0, Math.min(startIndex, weddingGalleries[galleryKey].images.length - 1));
    lastFocused = document.activeElement;
    renderLightbox();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    lightbox.querySelector('.lightbox-close').focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    lightboxImage.src = '';
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  function showRelative(delta) {
    const gallery = weddingGalleries[activeGallery];
    if (!gallery) return;
    activeIndex = (activeIndex + delta + gallery.images.length) % gallery.images.length;
    renderLightbox();
  }

  document.querySelectorAll('.gallery-trigger[data-gallery]').forEach(trigger => {
    trigger.addEventListener('click', () => openLightbox(trigger.dataset.gallery, 0));
  });

  prevButton.addEventListener('click', () => showRelative(-1));
  nextButton.addEventListener('click', () => showRelative(1));
  lightbox.querySelectorAll('[data-lightbox-close]').forEach(el => el.addEventListener('click', closeLightbox));

  document.addEventListener('keydown', event => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showRelative(-1);
    if (event.key === 'ArrowRight') showRelative(1);
  });

  lightbox.addEventListener('touchstart', event => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', event => {
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 45) showRelative(deltaX > 0 ? -1 : 1);
  }, { passive: true });
}


// Expand/collapse the second row of recent weddings without navigating away.
const portfolioMore = document.getElementById('portfolio-more');
const portfolioMoreToggle = document.querySelector('.portfolio-more-toggle');
const portfolioMoreClose = document.querySelector('.portfolio-more-close');

if (portfolioMore && portfolioMoreToggle && portfolioMoreClose) {
  function openPortfolioMore() {
    if (portfolioMore.classList.contains('is-open')) return;
    portfolioMore.classList.add('is-open');
    portfolioMore.setAttribute('aria-hidden', 'false');
    portfolioMoreToggle.setAttribute('aria-expanded', 'true');
  }

  function closePortfolioMore() {
    portfolioMore.classList.remove('is-open');
    portfolioMore.setAttribute('aria-hidden', 'true');
    portfolioMoreToggle.setAttribute('aria-expanded', 'false');
    portfolioMoreToggle.focus({ preventScroll: true });
  }

  portfolioMoreToggle.addEventListener('click', openPortfolioMore);
  portfolioMoreClose.addEventListener('click', closePortfolioMore);
}

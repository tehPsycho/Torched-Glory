const carouselTrack = document.querySelector('.carousel-track');
const previousButton = document.querySelector('.carousel-button-prev');
const nextButton = document.querySelector('.carousel-button-next');
const lightbox = document.querySelector('#gallery-lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrevious = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const galleryImages = Array.from(document.querySelectorAll('.carousel-slide img, .gallery-grid img'));

let activeImageIndex = 0;
let touchStartX = 0;
let touchStartY = 0;

function scrollCarousel(direction) {
  if (!carouselTrack) {
    return;
  }

  const slide = carouselTrack.querySelector('.carousel-slide');
  const slideWidth = slide ? slide.getBoundingClientRect().width : carouselTrack.clientWidth;
  carouselTrack.scrollBy({ left: direction * (slideWidth + 24), behavior: 'smooth' });
}

function setLightboxImage(index) {
  if (!lightboxImage || galleryImages.length === 0) {
    return;
  }

  activeImageIndex = (index + galleryImages.length) % galleryImages.length;
  const selectedImage = galleryImages[activeImageIndex];
  lightboxImage.src = selectedImage.currentSrc || selectedImage.src;
  lightboxImage.alt = selectedImage.alt;
}

function openLightbox(index) {
  if (!lightbox) {
    return;
  }

  setLightboxImage(index);
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
  lightboxClose?.focus();
}

function closeLightbox() {
  if (!lightbox) {
    return;
  }

  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
}

function showLightboxImage(direction) {
  setLightboxImage(activeImageIndex + direction);
}

previousButton?.addEventListener('click', () => scrollCarousel(-1));
nextButton?.addEventListener('click', () => scrollCarousel(1));

galleryImages.forEach((image, index) => {
  image.addEventListener('click', () => openLightbox(index));
  image.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openLightbox(index);
    }
  });
  image.setAttribute('tabindex', '0');
  image.setAttribute('role', 'button');
});

lightboxClose?.addEventListener('click', closeLightbox);
lightboxPrevious?.addEventListener('click', () => showLightboxImage(-1));
lightboxNext?.addEventListener('click', () => showLightboxImage(1));

lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

lightbox?.addEventListener('touchstart', (event) => {
  const touch = event.changedTouches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
});

lightbox?.addEventListener('touchend', (event) => {
  const touch = event.changedTouches[0];
  const xDistance = touch.clientX - touchStartX;
  const yDistance = touch.clientY - touchStartY;

  if (Math.abs(xDistance) > 60 && Math.abs(xDistance) > Math.abs(yDistance)) {
    showLightboxImage(xDistance > 0 ? -1 : 1);
  }
});

document.addEventListener('keydown', (event) => {
  if (!lightbox?.classList.contains('is-open')) {
    return;
  }

  if (event.key === 'Escape') {
    closeLightbox();
  }

  if (event.key === 'ArrowLeft') {
    showLightboxImage(-1);
  }

  if (event.key === 'ArrowRight') {
    showLightboxImage(1);
  }
});

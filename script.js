const carouselTrack = document.querySelector('.carousel-track');
const previousButton = document.querySelector('.carousel-button-prev');
const nextButton = document.querySelector('.carousel-button-next');

function scrollCarousel(direction) {
  if (!carouselTrack) {
    return;
  }

  const slide = carouselTrack.querySelector('.carousel-slide');
  const slideWidth = slide ? slide.getBoundingClientRect().width : carouselTrack.clientWidth;
  carouselTrack.scrollBy({ left: direction * (slideWidth + 24), behavior: 'smooth' });
}

previousButton?.addEventListener('click', () => scrollCarousel(-1));
nextButton?.addEventListener('click', () => scrollCarousel(1));

const slider = document.querySelector('[data-slider]');
const breakpointDesktop = window.matchMedia('(max-width:1023px)');
const breakpointTablet = window.matchMedia('(max-width:767px)');

const initSlider = () => {
  if(!slider) {
    return;
  }

  const buttonPrev = slider.querySelector('.arrow--prev');
  const buttonNext = slider.querySelector('.arrow--next');
  const sliderList =slider.querySelector('.faq__list');
  
  let touchstartX = 0;
  let touchendX = 0;
  let sliderCount;

  const removeClassActive = () => {
    const slides = slider.querySelectorAll('.faq__item');
    
    slides.forEach((el) => {
      if (el.classList.contains('is-active')) {
        el.classList.remove('is-active');
      }
    });
  };

  const addClassActive = () => {
    const slides = slider.querySelectorAll('.faq__item');

    for (let i = 0; i < sliderCount; i++) {
      slides[i].classList.add('is-active');
    }
  };

  const breakpointChecker = () => {
    removeClassActive();
    if (breakpointTablet.matches) {
      sliderCount = 1;
    } else if (breakpointDesktop.matches) {
      sliderCount = 2;
    } else {
      sliderCount = 4;
    }
    addClassActive();
  };

  const showPrevSlide = () => {
    let firstSlide = sliderList.firstElementChild;
    let lastSlide = sliderList.lastElementChild;
  
    removeClassActive();
    sliderList.insertBefore(lastSlide.cloneNode(true), firstSlide);
    lastSlide.remove();
    addClassActive();
  };
  
  const showNextSlide = () => {
    let firstSlide = sliderList.firstElementChild;
  
    removeClassActive();
    sliderList.appendChild(firstSlide.cloneNode(true));
    firstSlide.remove();
    addClassActive();
  };

  const handleGesture = () => {
    if (touchendX < touchstartX) {
      showNextSlide();
    }
  
    if (touchendX > touchstartX) {
      showPrevSlide();
    }
  };
  
  breakpointTablet.addListener(breakpointChecker);
  breakpointDesktop.addListener(breakpointChecker);
  breakpointChecker();
  
  buttonNext.addEventListener('click', showNextSlide);
  buttonPrev.addEventListener('click', showPrevSlide);
  
  slider.addEventListener('touchstart', (e) => {
    touchstartX = e.changedTouches[0].screenX;
  });
  
  slider.addEventListener('touchend', (e) => {
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
  });
};

initSlider();

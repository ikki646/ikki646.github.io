const swiper = new Swiper('.swiper', {
    slidesPerView: "auto",
    centeredSlides: true,
    centerInsufficientSlides: true,
    spaceBetween: 30,
    parallax: true, // Enable parallax effect
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    effect: 'coverflow',
    coverflowEffect: {
        rotate: 0,
        stretch: 200,
        depth: 600,
        modifier: 0.6,
        slideShadows: true,
    },
  });

  // Define target index (you can modify this as per requirement)
  const targetIndex = 2; // e.g., always return to the 3rd slide (index 2)

  // Set the time interval (in milliseconds) after which swiper resets to the target index
  const resetInterval = 10000; // 5 seconds

  // Reset swiper to the target index after the specified interval
  function resetSwiperToTargetIndex() {
    swiper.slideTo(targetIndex);
  }

  // Set a timer to reset swiper after a delay
  setInterval(resetSwiperToTargetIndex, resetInterval);

  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');

  swiper.on('slideChange', () => {
    prevButton.disabled = swiper.isBeginning;
    nextButton.disabled = swiper.isEnd;
  });

  prevButton.addEventListener('click', () => swiper.slidePrev());
  nextButton.addEventListener('click', () => swiper.slideNext());
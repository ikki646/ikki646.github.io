// Define target index (you can modify this as per requirement)
let targetIndex = 2; // e.g., always return to the 3rd slide (index 2)
let handlingSwipe = false;

// Set the time interval (in milliseconds) after which swiper resets to the target index
const resetInterval = 10000; // 5 seconds

function markActiveCard(index) {
  targetIndex = index;
  // Remove 'active-card' from all slides
  console.log("hello")
  document.querySelectorAll('.swiper-slide').forEach((slide) => {
    console.log("removing active card")
    slide.classList.remove('active-card');
  });

  // Add 'active-card' to the target slide
  const activeSlide = document.querySelectorAll('.swiper-slide')[index];
  if (activeSlide) {
    activeSlide.classList.add('active-card');
    swiper.slideTo(index);
  }
}

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
  on: {
    slideChange: () => {
      if (handlingSwipe) return;
      handlingSwipe = true;
      setInterval(() => {
        swiper.slideTo(targetIndex);
        handlingSwipe = false;
      }, resetInterval);
    },
  },
});

markActiveCard(1);
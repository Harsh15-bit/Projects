$(document).ready(function () {
  // Initialize AOS
  AOS.init({
    duration: 800,
    once: true,
    offset: 50,
  });

  // Navbar scroll effect
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $('#navbar').addClass('scrolled');
    } else {
      $('#navbar').removeClass('scrolled');
    }
  });

  // Scroll to Top Button Logic
  const scrollToTopBtn = $('#scrollToTopBtn');

  $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
          scrollToTopBtn.addClass('show');
      } else {
          scrollToTopBtn.removeClass('show');
      }
  });

  scrollToTopBtn.on('click', function () {
      // Add the animation class
      $(this).addClass('is-boosting');

      // Scroll to top
      $('html, body').animate({ scrollTop: 0 }, 800); // 800ms for smooth scroll

      // Remove the animation class after it finishes
      setTimeout(() => {
          $(this).removeClass('is-boosting');
      }, 800);
  });

  // Counter Up Animation
  const counters = document.querySelectorAll('.counter');
  const speed = 200; // The lower the slower

  const animateCounters = () => {
    counters.forEach((counter) => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 1);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  // Intersection Observer for counters
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const counterSection = document.getElementById('why-choose-us');
  if (counterSection) {
    observer.observe(counterSection);
  }

  // Hero Car Slider
  var heroCarSwiper = new Swiper('.hero-car-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 80,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    },
    navigation: {
      nextEl: '.hero-slider-nav .swiper-button-next',
      prevEl: '.hero-slider-nav .swiper-button-prev',
    },
  });

  // Testimonial Slider Initialization
  var testimonialSwiper = new Swiper('.testimonial-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
    },
  });
});


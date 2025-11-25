gsap.registerPlugin(ScrollTrigger);

// Animate background on scroll
gsap.to("#bg_city", {
  scale: 1.5,
  opacity: 0.2,
  scrollTrigger: {
    trigger: ".banner",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

// Fade and move text on scroll
gsap.from(".banner .content", {
  y: 100,
  opacity: 0,
  duration: 1.5,
  scrollTrigger: {
    trigger: ".banner",
    start: "top 80%",
    end: "bottom top",
    scrub: true
  }
});

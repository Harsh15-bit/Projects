/* ===============================
   script.js — Portfolio Scripts
   =============================== */

/* ---------- 1. Smooth Scroll for Nav Links ---------- */
document.querySelectorAll("nav a[href^='#']").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 60,
                behavior: "smooth"
            });
        }
    });
});

/* ---------- 2. Scroll Reveal Animation ---------- */
const revealElements = document.querySelectorAll('.fade-up');

function revealOnScroll() {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            el.classList.add('in');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

/* ---------- 3. Typing Animation (Typed.js style but custom) ---------- */
const typedTextEl = document.querySelector(".typed-text");
if (typedTextEl) {
    const words = ["Web Developer", "Web Designer", "Coder",];
    let wordIndex = 0;
    let charIndex = 0;
    let erasing = false;

    function typeEffect() {
        const current = words[wordIndex];
        if (!erasing) {
            typedTextEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === current.length) {
                setTimeout(() => erasing = true, 1200);
            }
        } else {
            typedTextEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                erasing = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }
        setTimeout(typeEffect, erasing ? 60 : 120);
    }

    typeEffect();
}

/* ---------- 4. Particles Background (tsParticles) ---------- */
tsParticles.load("particles-js", {
    background: { color: "transparent" },
    fpsLimit: 60,
    particles: {
        number: { value: 60 },
        color: { value: "#6c6c6c" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        links: {
            enable: true,
            distance: 140,
            color: "#6c6c6c",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 1.3
        }
    },
    interactivity: {
        events: {
            onHover: { enable: true, mode: "grab" },
            resize: true
        },
        modes: {
            grab: { distance: 160, links: { opacity: 0.6 } }
        }
    },
    retina_detect: true
});

/* ---------- 5. Modal Logic for Certificates ---------- */
const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal-img");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".cert-img").forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
    });
});

if (closeBtn) {
    closeBtn.onclick = () => modal.style.display = "none";
}

window.onclick = e => {
    if (e.target === modal)
        modal.style.display = "none";
};

// ------------------------------
// DARK MODE TOGGLE
// ------------------------------

const toggle = document.getElementById("darkModeToggle");
const body = document.body;

// Load saved mode
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggle.checked = true;
}

// Toggle theme
toggle.addEventListener("change", () => {
    if (toggle.checked) {
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
    } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
    }
});

// ===== Scroll Active Navbar Links =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider-wrapper");
    const slides = document.querySelectorAll(".project-slide");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    if (!slider || slides.length === 0) {
        console.error("Slider HTML missing!");
        return;
    }

    let index = 0;

    function getSlideWidth() {
        return slides[0].offsetWidth + 25; // 25 = gap
    }

    function updateSlider() {
        slider.style.transform = `translateX(${-index * getSlideWidth()}px)`;
    }

    nextBtn?.addEventListener("click", () => {
        index = (index < slides.length - 1) ? index + 1 : 0;
        updateSlider();
    });

    prevBtn?.addEventListener("click", () => {
        index = (index > 0) ? index - 1 : slides.length - 1;
        updateSlider();
    });

    // Auto Slide
    setInterval(() => {
        index = (index < slides.length - 1) ? index + 1 : 0;
        updateSlider();
    }, 4000);

    window.addEventListener("load", updateSlider);
});

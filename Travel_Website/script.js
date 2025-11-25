AOS.init({
    duration: 800,
    once: true,
    offset: 50,
});

document.addEventListener('DOMContentLoaded', function () {

    // 1. Navbar Scroll Behavior
    const navbar = document.getElementById('navbar');
    const logo = document.getElementById('logo');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
            navbar.classList.remove('nav-transparent');
            logo.classList.remove('text-white');
            logo.classList.add('text-teal-800');
            navLinks.forEach(link => {
                link.classList.remove('text-white');
                link.classList.add('text-teal-800');
            });
        } else {
            navbar.classList.remove('nav-scrolled');
            navbar.classList.add('nav-transparent');
            logo.classList.add('text-white');
            logo.classList.remove('text-teal-800');
            navLinks.forEach(link => {
                link.classList.add('text-white');
                link.classList.remove('text-teal-800');
            });
        }
    });

    // 2. Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // 3. Testimonial Slider
    const slider = document.getElementById('testimonial-slider');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    if (slider) {
        let currentIndex = 0;
        const testimonials = slider.children;
        const totalTestimonials = testimonials.length;

        function updateSliderPosition() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalTestimonials;
            updateSliderPosition();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
            updateSliderPosition();
        });

        setInterval(() => { nextBtn.click(); }, 6000);
    }

    // 4. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const wasOpen = item.classList.contains('open');

            // Close all other items
            faqItems.forEach(i => {
                i.classList.remove('open');
                i.querySelector('.faq-answer').classList.add('hidden');
            });

            // Toggle current item
            if (!wasOpen) {
                item.classList.add('open');
                answer.classList.remove('hidden');
            }
        });
    });

    // 5. Photo Gallery Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const galleryImages = document.querySelectorAll('.gallery-img');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.classList.remove('hidden');
            lightboxImg.src = img.src;
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) { closeLightbox(); }
    });

    // 6. Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        formFeedback.innerHTML = `<div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong class="font-bold">Thank you!</strong>
                        <span class="block sm:inline"> Your message has been sent. We'll be in touch shortly.</span>
                    </div>`;
        contactForm.reset();
    });
});
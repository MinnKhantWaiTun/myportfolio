document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    const dayIcon = document.getElementById('day');
    const nightIcon = document.getElementById('night');
    const body = document.body;

    // Check for saved theme in localStorage or default to night mode
    const savedTheme = localStorage.getItem('theme') || 'night';
    if (savedTheme === 'day') {
        body.classList.add('day-theme');
        dayIcon.style.display = 'none';
        nightIcon.style.display = 'block';
    } else {
        body.classList.remove('day-theme');
        dayIcon.style.display = 'block';
        nightIcon.style.display = 'none';
    }

    // Theme switch toggle
    themeSwitch.addEventListener('click', () => {
        body.classList.toggle('day-theme');
        const isDayTheme = body.classList.contains('day-theme');
        
        // Update icon visibility
        dayIcon.style.display = isDayTheme ? 'none' : 'block';
        nightIcon.style.display = isDayTheme ? 'block' : 'none';
        
        // Save theme preference
        localStorage.setItem('theme', isDayTheme ? 'day' : 'night');
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight active nav link based on scroll position
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links li a');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const currentSection = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === currentSection) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Show/hide and update scroll to top button based on scroll progress
        const scrollToTopBtn = document.querySelector('.scroll-to-top');
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollTop = window.scrollY;
        const scrollProgress = (scrollTop + clientHeight) / scrollHeight;

        if (scrollTop > 0) {
            scrollToTopBtn.style.display = 'block';
            scrollToTopBtn.style.opacity = 1;
            scrollToTopBtn.style.setProperty('--fill-height', `${(scrollProgress * 100)}%`);
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.style.opacity = 0;
            setTimeout(() => {
                if (scrollTop === 0) {
                    scrollToTopBtn.style.display = 'none';
                    scrollToTopBtn.classList.remove('visible');
                }
            }, 300);
        }
    });

    // Scroll to top functionality
    document.querySelector('.scroll-to-top').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Experience card slider
    const cardsWrapper = document.querySelector('.cards-wrapper');
    const cards = document.querySelectorAll('.experience-card');
    const leftArrow = document.querySelector('.arrow.left');
    const rightArrow = document.querySelector('.arrow.right');
    const radioButtons = document.querySelectorAll('input[name="card"]');
    let currentIndex = 0;

    function updateSlider() {
        cardsWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        radioButtons.forEach((radio, index) => {
            radio.checked = index === currentIndex;
        });
        leftArrow.style.display = currentIndex === 0 ? 'none' : 'block';
        rightArrow.style.display = currentIndex === cards.length - 1 ? 'none' : 'block';
    }

    leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    rightArrow.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    radioButtons.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            if (radio.checked) {
                currentIndex = index;
                updateSlider();
            }
        });
    });

    updateSlider();

    // Slideshow
    let slideIndex = 0;
    const slides = document.getElementsByClassName("slides");

    function showSlides() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1; }
        slides[slideIndex - 1].style.display = "block";
        slides[slideIndex - 1].classList.add("fade");
        setTimeout(() => {
            slides[slideIndex - 1].classList.remove("fade");
        }, 2000);
        setTimeout(showSlides, 3000);
    }

    showSlides();
});
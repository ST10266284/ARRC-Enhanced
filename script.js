// Preloader
window.addEventListener('load', () => {
    document.getElementById('preloader').style.display = 'none';
});

// Smooth Scroll
document.querySelectorAll('.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        toggleMenu();
    });
});

// Hamburger Menu
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.getElementById('nav-links');
    const overlay = document.getElementById('menu-overlay');
    sidebar.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Scroll Animations
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Trigger counters when About section is visible
            if (entry.target.id === 'about') {
                animateCounters();
            }
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

// Sticky Navigation Highlights
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    document.querySelectorAll('#nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Back to Top
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Testimonials Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
let autoSlide = setInterval(nextSlide, 5000);

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

document.querySelector('.carousel').addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
});

document.querySelector('.carousel').addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 5000);
});

// Touch Swipe for Carousel
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.carousel').addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.carousel').addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) nextSlide();
    if (touchEndX - touchStartX > 50) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }
});

// Card Flip Effect
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('touchstart', e => {
        e.preventDefault();
        card.classList.toggle('tapped');
    });
});

// Progress Rings
document.querySelectorAll('.progress-ring .progress').forEach(circle => {
    const percent = circle.getAttribute('data-percent');
    const circumference = 2 * Math.PI * 50;
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
});

// Donation Slider
const donationSlider = document.getElementById('donation-amount');
const amountDisplay = document.getElementById('amount-display');
donationSlider.addEventListener('input', () => {
    amountDisplay.textContent = `R${donationSlider.value}`;
});

// Starfield Animation
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
for (let i = 0; i < (window.innerWidth < 768 ? 20 : 50); i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5
    });
}

function animateStarfield() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 196, 48, ${star.opacity})`;
        ctx.fill();
        star.opacity += Math.random() * 0.02 - 0.01;
        if (star.opacity < 0.3) star.opacity = 0.3;
        if (star.opacity > 1) star.opacity = 1;
    });
    requestAnimationFrame(animateStarfield);
}

if (window.innerWidth >= 768) animateStarfield();

// Paw Print Burst
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => {
        for (let i = 0; i < 5; i++) {
            const paw = document.createElement('div');
            paw.className = 'paw-burst';
            paw.style.left = `${e.clientX}px`;
            paw.style.top = `${e.clientY}px`;
            const angle = (i / 5) * Math.PI * 2;
            paw.style.animation = `burstPaw 0.5s ease-out ${i * 0.05}s`;
            paw.style.transform = `translate(${Math.cos(angle) * 20}px, ${Math.sin(angle) * 20}px)`;
            document.body.appendChild(paw);
            setTimeout(() => paw.remove(), 600);
        }
    });

    btn.addEventListener('touchstart', e => {
        e.preventDefault();
        const touch = e.touches[0];
        for (let i = 0; i < 5; i++) {
            const paw = document.createElement('div');
            paw.className = 'paw-burst';
            paw.style.left = `${touch.clientX}px`;
            paw.style.top = `${touch.clientY}px`;
            const angle = (i / 5) * Math.PI * 2;
            paw.style.animation = `burstPaw 0.5s ease-out ${i * 0.05}s`;
            paw.style.transform = `translate(${Math.cos(angle) * 20}px, ${Math.sin(angle) * 20}px)`;
            document.body.appendChild(paw);
            setTimeout(() => paw.remove(), 600);
        }
    });
});

const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes burstPaw {
        0% { opacity: 0.7; transform: translate(0, 0) scale(0.5); }
        100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(1.5); }
    }
`;
document.head.appendChild(styleSheet);

// Typewriter Effect
const typewriter = document.querySelector('.typewriter');
if (typewriter) {
    const text = typewriter.textContent;
    typewriter.textContent = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            const span = document.createElement('span');
            span.textContent = text[i];
            typewriter.appendChild(span);
            i++;
            setTimeout(type, 100);
        }
    }

    type();
}

// Lightbox for Images
document.querySelectorAll('.card img, .fund-breakdown, .map img').forEach(img => {
    img.addEventListener('click', () => {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
    });
});

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Modal Handling
function openModal(id) {
    document.getElementById(`${id}-modal`).style.display = 'flex';
}

function closeModal(id) {
    document.getElementById(`${id}-modal`).style.display = 'none';
}

// Form Submission
document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Message sent! We will get back to you soon.');
});

document.getElementById('visitor-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Visit request submitted! We will confirm your visit soon.');
});

document.getElementById('volunteer-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Volunteer application submitted! Thank you for your interest.');
});

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        counter.textContent = '0';
        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const current = +counter.textContent;
            const increment = target / 100;
            if (current < target) {
                counter.textContent = Math.ceil(current + increment);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
}

// Collapsible Sections
function toggleCollapse(element) {
    const content = element.nextElementSibling;
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
}

// Cat Fact Generator
const catFacts = [
    "Cats can jump up to five times their own height in a single leap.",
    "A group of cats is called a clowder.",
    "Cats spend about 70% of their lives sleeping.",
    "A cat’s nose print is unique, like a human’s fingerprint.",
    "Cats have over 20 vocalizations, including the purr and meow."
];

function showCatFact() {
    const factElement = document.getElementById('cat-fact');
    const randomFact = catFacts[Math.floor(Math.random() * catFacts.length)];
    factElement.textContent = randomFact;
    factElement.style.display = 'block';
    factElement.style.opacity = '0';
    let opacity = 0;
    const fadeIn = setInterval(() => {
        opacity += 0.05;
        factElement.style.opacity = opacity;
        if (opacity >= 1) clearInterval(fadeIn);
    }, 50);
}

// Donation Tracker Animation
const progressFill = document.querySelector('.progress-fill');
const donationGoal = 50000;
const currentDonation = 30000; // Placeholder
progressFill.style.width = `${(currentDonation / donationGoal) * 100}%`;

// Image Drift
document.querySelectorAll('.drift').forEach(img => {
    if (window.innerWidth >= 768) {
        window.addEventListener('scroll', () => {
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const scrollY = window.scrollY / 50;
                img.style.transform = `translateY(${scrollY % 10}px) translateX(${scrollY % 5}px)`;
            }
        });
    }
});
// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide/show navbar on scroll direction
    if (currentScroll > 400) {
        if (currentScroll > lastScroll + 5) {
            navbar.classList.add('nav-hidden');
        } else if (currentScroll < lastScroll - 5) {
            navbar.classList.remove('nav-hidden');
        }
    } else {
        navbar.classList.remove('nav-hidden');
    }

    lastScroll = currentScroll;
});

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Scroll Reveal Animations =====
function createObserver(selector, options = {}) {
    const {
        threshold = 0.15,
        rootMargin = '0px 0px -60px 0px',
        stagger = 0,
        className = 'revealed'
    } = options;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (stagger > 0) {
                    // Get all siblings that are also being observed
                    const parent = entry.target.parentElement;
                    const siblings = parent ? Array.from(parent.querySelectorAll(selector)) : [entry.target];
                    const index = siblings.indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add(className);
                    }, index * stagger);
                } else {
                    entry.target.classList.add(className);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold, rootMargin });

    document.querySelectorAll(selector).forEach(el => observer.observe(el));
}

// Fade up elements
createObserver('.fade-up', { stagger: 120 });
createObserver('.fade-up-slow', { stagger: 200 });

// Fade in elements
createObserver('.fade-in');

// Scale reveal
createObserver('.scale-reveal');

// Slide from left/right
createObserver('.slide-left');
createObserver('.slide-right');

// Image reveal
createObserver('.img-reveal');

// ===== Hero Parallax =====
const heroImage = document.querySelector('.hero-image img');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroHeight = window.innerHeight;

    if (scrolled < heroHeight) {
        const parallaxSpeed = 0.4;
        const opacity = 1 - (scrolled / heroHeight) * 0.6;

        if (heroImage) {
            heroImage.style.transform = `scale(1.1) translateY(${scrolled * parallaxSpeed}px)`;
        }
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroContent.style.opacity = opacity;
        }
    }
});

// ===== Counter Animation for Stats =====
function animateStats() {
    const stats = document.querySelectorAll('.stat');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('stat-animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach((stat, i) => {
        stat.style.transitionDelay = `${i * 150}ms`;
        observer.observe(stat);
    });
}
animateStats();

// ===== Gallery Hover Tilt Effect =====
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        item.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(600px) rotateY(0) rotateX(0) scale(1)';
    });
});

// ===== Magnetic Button Effect =====
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ===== Featured Logos Marquee Auto-scroll =====
const featuredLogos = document.querySelector('.featured-logos');
if (featuredLogos) {
    // Clone logos for infinite scroll effect
    const logos = featuredLogos.innerHTML;
    featuredLogos.innerHTML = logos + logos;
    featuredLogos.classList.add('marquee-active');
}

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== Hero text animation on load =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

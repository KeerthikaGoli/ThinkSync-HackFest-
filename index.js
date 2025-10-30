// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu after clicking a link
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        }
    });
});

// Toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    // Check if click is outside menu and button
    if (mobileMenu && menuBtn && 
        !mobileMenu.contains(e.target) && 
        !menuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
});

// FAQ Toggle functionality
function toggleFAQ(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('span:last-child');

    answer.classList.toggle('active');

    if (answer.classList.contains('active')) {
        icon.textContent = '−';
    } else {
        icon.textContent = '+';
    }
}

// Form submission handler
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    alert('Thank you! Your message has been sent.');
    form.reset();
}

// Add animation on scroll for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Optional: stop observing after animation
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
    // Initialize interactive UI components
    initThemesCarousel();
});


// ===============================================
// NEW: Animated Background Particles Script
// ===============================================
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
let particlesArray;

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray = [];
    const numberOfParticles = (canvas.width * canvas.height) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.speedY = Math.random() * 0.6 - 0.3;
        // Using a color palette that matches the theme
        this.color = `rgba(${Math.random() * 100}, ${Math.random() * 255}, ${Math.random() * 155 + 100}, 0.8)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}

// Initial setup and event listeners for the canvas
window.addEventListener("resize", init);
init();
animate();

/* Problem Themes carousel: buttons, drag-to-scroll and keyboard support */
function initThemesCarousel() {
    const track = document.getElementById('themesTrack');
    if (!track) return;

    const leftBtn = document.querySelector('.scroll-btn.left');
    const rightBtn = document.querySelector('.scroll-btn.right');

    // Button click behavior
    if (leftBtn) leftBtn.addEventListener('click', () => {
        track.scrollBy({ left: -Math.round(track.clientWidth * 0.75), behavior: 'smooth' });
        track.focus();
    });

    if (rightBtn) rightBtn.addEventListener('click', () => {
        track.scrollBy({ left: Math.round(track.clientWidth * 0.75), behavior: 'smooth' });
        track.focus();
    });

    // Pointer drag support
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('pointerdown', (e) => {
        isDown = true;
        track.setPointerCapture(e.pointerId);
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
        track.classList.add('dragging');
    });

    track.addEventListener('pointermove', (e) => {
        if (!isDown) return;
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.2; // scroll-fast
        track.scrollLeft = scrollLeft - walk;
    });

    const endDrag = (e) => {
        isDown = false;
        try { track.releasePointerCapture(e.pointerId); } catch (err) { /* ignore */ }
        track.classList.remove('dragging');
    };

    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);
    track.addEventListener('pointerleave', () => { isDown = false; track.classList.remove('dragging'); });

    // Keyboard support
    track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            track.scrollBy({ left: -220, behavior: 'smooth' });
            e.preventDefault();
        } else if (e.key === 'ArrowRight') {
            track.scrollBy({ left: 220, behavior: 'smooth' });
            e.preventDefault();
        }
    });

    // Optional: hide/show buttons based on scroll position
    const updateButtons = () => {
        if (!leftBtn || !rightBtn) return;
        leftBtn.style.opacity = track.scrollLeft > 10 ? '1' : '0.4';
        const maxScroll = track.scrollWidth - track.clientWidth - 1;
        rightBtn.style.opacity = track.scrollLeft < maxScroll ? '1' : '0.4';
    };

    track.addEventListener('scroll', () => { updateButtons(); });
    updateButtons();
}
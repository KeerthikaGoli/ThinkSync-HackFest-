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
    const navLinks = document.querySelector('.nav-links');
    
    // Check if click is outside menu and button
    if (mobileMenu && menuBtn && 
        !mobileMenu.contains(e.target) && 
        !menuBtn.contains(e.target) &&
        !navLinks?.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
});

// FAQ Toggle functionality
function toggleFAQ(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('span:last-child');
    
    // Toggle active class
    answer.classList.toggle('active');
    
    // Change icon
    if (answer.classList.contains('active')) {
        icon.textContent = '−';
    } else {
        icon.textContent = '+';
    }
    
    // Close other FAQs (optional - uncomment if you want accordion behavior)
    /*
    const allFAQs = document.querySelectorAll('.faq-answer');
    const allButtons = document.querySelectorAll('.faq-btn');
    
    allFAQs.forEach((faq, index) => {
        if (faq !== answer && faq.classList.contains('active')) {
            faq.classList.remove('active');
            allButtons[index].querySelector('span:last-child').textContent = '+';
        }
    });
    */
}

// Form submission handler
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const form = event.target;
    const formData = new FormData(form);
    
    // Show success message
    alert('Thank you! We will contact you soon.');
    
    // Reset form
    form.reset();
    
    // Here you can add actual form submission logic
    // For example, sending data to a server using fetch:
    /*
    fetch('your-api-endpoint', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Thank you! We will contact you soon.');
        form.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Oops! Something went wrong. Please try again.');
    });
    */
}

// Add scroll effect to navbar
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    }
    
    lastScroll = currentScroll;
});

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
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Theme persistence (save theme preference)
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
    
    // Save theme on toggle
    const themeBtn = document.querySelector('.theme-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            if (document.body.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
});
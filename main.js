document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Initialize Swiper carousels
    if (typeof Swiper !== 'undefined') {
        // WealthAlgo carousel
        const wealthAlgoSwiper = new Swiper('.wealthalgo-carousel', {
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'slide',
            speed: 600,
        });
        
        // ProductifiSync carousel
        const productifiSyncSwiper = new Swiper('.productifisync-carousel', {
            loop: true,
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'slide',
            speed: 600,
        });
    }
    
    // Typing animation for hero section
    const typingContainer = document.querySelector('.typing-container h1');
    if (typingContainer) {
        typingContainer.classList.add('typing-text');
    }
    
    // Animate skill bars when in viewport
    const skillLevels = document.querySelectorAll('.skill-level');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const targetWidth = skillBar.getAttribute('data-width') || '90%';
                skillBar.style.width = targetWidth;
            }
        });
    }, observerOptions);
    
    skillLevels.forEach(skill => {
        skillObserver.observe(skill);
    });
    
    // Hero stats counter animation
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + (element.dataset.suffix || '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + (element.dataset.suffix || '');
            }
        }, 16);
    };
    
    // Observe hero stats for counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target.querySelector('.number');
                const target = parseInt(number.dataset.target);
                animateCounter(number, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-item').forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Fade-in animations for sections
    document.querySelectorAll('.section-title').forEach(el => el.classList.add('fade-in'));
    document.querySelectorAll('.project-card').forEach(el => el.classList.add('scale-in'));
    document.querySelectorAll('.skills-category').forEach(el => el.classList.add('fade-in'));
    document.querySelectorAll('.about-image, .about-text').forEach(el => el.classList.add('fade-in'));
    document.querySelectorAll('.contact-item').forEach(el => el.classList.add('fade-in'));
    document.querySelectorAll('.icon-container').forEach(el => el.classList.add('scale-in'));
    document.querySelectorAll('.expertise-card').forEach(el => el.classList.add('scale-in'));
    
    // Get all elements that need animation
    const animatedElements = document.querySelectorAll('.fade-in, .scale-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, appearOptions);
    
    // Observe all animated elements
    animatedElements.forEach(element => {
        appearOnScroll.observe(element);
    });
    
    // Contact form submission with loading state
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const submitBtn = contactForm.querySelector('.btn');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.classList.add('disabled');
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Simulate form submission
            setTimeout(() => {
                formMessage.textContent = 'Thanks for your message! I\'ll get back to you soon.';
                formMessage.className = 'success';
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('disabled');
                
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, 2000);
        });
    }
    
    // Enhanced project card interactions
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        // Add floating animation to some cards
        if (Math.random() > 0.5) {
            card.classList.add('floating');
        }
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Add pulse animation to important elements
    setTimeout(() => {
        document.querySelectorAll('.btn').forEach(btn => {
            if (btn.textContent.includes('Hire') || btn.textContent.includes('Contact')) {
                btn.classList.add('pulse');
            }
        });
    }, 3000);
    
    // Create enhanced space stars
    function createStars() {
        const starsContainer = document.querySelector('.stars');
        if (!starsContainer) return;
        
        const numStars = 150;
        
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.width = `${Math.random() * 3 + 1}px`;
            star.style.height = star.style.width;
            star.style.animationDuration = `${Math.random() * 10 + 5}s`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            
            starsContainer.appendChild(star);
        }
    }
    
    // Initialize enhanced features
    createStars();
    
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
    
    // Preload carousel images for better performance
    const carouselImages = document.querySelectorAll('.swiper img');
    carouselImages.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const preloadImg = new Image();
            preloadImg.src = src;
        }
    });
});

// Add CSS for dynamic stars
const starStyle = document.createElement('style');
starStyle.textContent = `
.star {
    position: absolute;
    background-color: white;
    border-radius: 50%;
    opacity: 0.6;
    animation: twinkle 5s infinite ease-in-out;
}

@keyframes twinkle {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
}
`;
document.head.appendChild(starStyle);

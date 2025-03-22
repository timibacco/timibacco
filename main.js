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
    
    // Typing animation for hero section
    const typingContainer = document.querySelector('.typing-container h1');
    typingContainer.classList.add('typing-text');
    
    // Animate skill bars when in viewport
    const skillLevels = document.querySelectorAll('.skill-level');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                // Initially set width to 0
                skillBar.style.width = '0';
                // Force reflow
                void skillBar.offsetWidth;
                // Set the actual width to animate to
                skillBar.style.width = width;
                observer.unobserve(skillBar);
            }
        });
    }, observerOptions);
    
    skillLevels.forEach(skill => {
        skillObserver.observe(skill);
    });
    
    // Fade-in animations for sections
    const faders = document.querySelectorAll('.fade-in');
    const scalers = document.querySelectorAll('.scale-in');
    
    // Add animation classes to elements
    document.querySelectorAll('.section-title').forEach(el => el.classList.add('fade-in'));
    document.querySelectorAll('.project-card').forEach(el => el.classList.add('scale-in'));
    document.querySelectorAll('.skills-category').forEach(el => el.classList.add('fade-in'));
    document.querySelectorAll('.about-image, .about-text').forEach(el => el.classList.add('fade-in'));
    document.querySelectorAll('.contact-item').forEach(el => el.classList.add('fade-in'));
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    
    scalers.forEach(scaler => {
        appearOnScroll.observe(scaler);
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
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
                
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, 1000);
            
            // In a real implementation, you would send the data to your backend here
            // Example:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData),
            // })
            // .then(response => response.json())
            // .then(data => {
            //     formMessage.textContent = 'Thanks for your message! I\'ll get back to you soon.';
            //     formMessage.className = 'success';
            //     contactForm.reset();
            // })
            // .catch((error) => {
            //     formMessage.textContent = 'Oops! Something went wrong. Please try again later.';
            //     formMessage.className = 'error';
            // });
        });
    }
    
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Tech stack icons animation
    const techIcons = document.querySelectorAll('.icon-container');
    techIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.1}s`;
        icon.classList.add('scale-in');
        appearOnScroll.observe(icon);
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
    
    // Create space stars dynamically
    function createStars() {
        const starsContainer = document.querySelector('.stars');
        const numStars = 100;
        
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.width = `${Math.random() * 2 + 1}px`;
            star.style.height = star.style.width;
            star.style.animationDuration = `${Math.random() * 10 + 5}s`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            
            starsContainer.appendChild(star);
        }
    }
    
    // Initialize stars
    createStars();
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

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    setTimeout(function() {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.classList.add('fade-out');
        setTimeout(function() {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links li a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').substring(1) === current) {
                li.classList.add('active');
            }
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

    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animate progress bars when in viewport
    const progressBars = document.querySelectorAll('.progress-bar');
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    function animateProgressBars() {
        progressBars.forEach(bar => {
            if (isInViewport(bar)) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }
        });
    }
    
    window.addEventListener('scroll', animateProgressBars);
    animateProgressBars(); // Initial check

    // Animate stats counters when in viewport
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateCounters() {
        if (isInViewport(document.querySelector('.about-stats')) && !animated) {
            animated = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                let count = 0;
                const interval = setInterval(() => {
                    if (count < target) {
                        count++;
                        stat.textContent = count;
                    } else {
                        clearInterval(interval);
                    }
                }, 100);
            });
        }
    }
    
    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Initial check

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show a success message
            alert('Thanks for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function animateTimeline() {
        timelineItems.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', animateTimeline);
    animateTimeline(); // Initial check

    // Project cards hover effect enhancement
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.overlay').style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.overlay').style.opacity = '0';
        });
    });

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Typing animation for hero section (optional)
    const professionElement = document.querySelector('.profession');
    const professionText = "Front-End Developer";
    let i = 0;
    
    function typeWriter() {
        if (i < professionText.length) {
            professionElement.textContent += professionText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    // Optional: Uncomment below to enable typing animation
    // professionElement.textContent = '';
    // setTimeout(typeWriter, 1000);

    // Add animation class to elements when they enter viewport
    const animateElements = document.querySelectorAll('.hero-content, .about-text, .education-item, .skill-item, .project-card, .contact-info, .contact-form');
    
    function animateOnScroll() {
        animateElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Preload images (optional)
    function preloadImages() {
        const projectImages = document.querySelectorAll('.project-image img');
        projectImages.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                const newImg = new Image();
                newImg.src = src;
            }
        });
    }
    
    preloadImages();
});
// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCourseFiltering();
    initializeScrollAnimations();
    initializeCTAButtons();
    initializeNavbarScroll();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger?.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger?.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger?.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Course filtering functionality
function initializeCourseFiltering() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const courseCards = document.querySelectorAll('.course-card');
    const coursesGrid = document.querySelector('.courses-grid');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Add loading animation
            coursesGrid?.classList.add('loading');
            
            setTimeout(() => {
                // Filter courses
                courseCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
                
                // Remove loading animation
                coursesGrid?.classList.remove('loading');
                coursesGrid?.classList.add('loaded');
                
                setTimeout(() => {
                    coursesGrid?.classList.remove('loaded');
                }, 300);
            }, 200);
        });
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger animations for grid items
                if (entry.target.classList.contains('courses-grid') || 
                    entry.target.classList.contains('services-grid') || 
                    entry.target.classList.contains('portfolio-grid')) {
                    
                    const items = entry.target.children;
                    Array.from(items).forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.course-card, .service-card, .portfolio-item, .section-title, .section-subtitle'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Special observer for grids
    const grids = document.querySelectorAll('.courses-grid, .services-grid, .portfolio-grid');
    grids.forEach(grid => observer.observe(grid));
}

// CTA Button functionality
function initializeCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-primary, #startTrialBtn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show modal or redirect to signup
            showSignupModal();
        });
    });
}

// Navbar scroll effect
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 100) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Signup modal functionality
function showSignupModal() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'signup-modal-overlay';
    modal.innerHTML = `
        <div class="signup-modal">
            <div class="modal-header">
                <h2>Start Your Free Trial</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-content">
                <p>Ready to transform your career? Sign up now and get:</p>
                <ul class="modal-benefits">
                    <li>✓ 7-day free trial</li>
                    <li>✓ Access to 350+ courses</li>
                    <li>✓ Professional certificates</li>
                    <li>✓ Career support</li>
                </ul>
                <div class="modal-buttons">
                    <a href="signup.html" class="modal-cta">Create Account</a>
                    <a href="login.html" class="modal-login">Already have an account?</a>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .signup-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            animation: fadeIn 0.3s ease forwards;
        }
        
        .signup-modal {
            background: white;
            border-radius: 16px;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            transform: scale(0.8);
            animation: modalScale 0.3s ease 0.1s forwards;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem 2rem 1rem;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .modal-header h2 {
            color: #1f2937;
            margin: 0;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #6b7280;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-content {
            padding: 2rem;
        }
        
        .modal-content p {
            margin-bottom: 1.5rem;
            color: #6b7280;
            font-size: 1.1rem;
        }
        
        .modal-benefits {
            list-style: none;
            margin-bottom: 2rem;
        }
        
        .modal-benefits li {
            padding: 0.5rem 0;
            color: #374151;
            font-weight: 500;
        }
        
        .modal-buttons {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .modal-cta {
            background: #2563eb;
            color: white;
            text-decoration: none;
            padding: 1rem 2rem;
            border-radius: 8px;
            text-align: center;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .modal-cta:hover {
            background: #1d4ed8;
            transform: translateY(-2px);
        }
        
        .modal-login {
            text-align: center;
            color: #2563eb;
            text-decoration: none;
            font-weight: 500;
        }
        
        .modal-login:hover {
            text-decoration: underline;
        }
        
        @keyframes fadeIn {
            to { opacity: 1; }
        }
        
        @keyframes modalScale {
            to { transform: scale(1); }
        }
    `;
    
    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal functionality
    const closeModal = () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.head.removeChild(modalStyles);
            document.body.style.overflow = 'auto';
        }, 300);
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation to course cards on hover
document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Portfolio item hover effects
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.querySelector('.portfolio-placeholder').style.transform = 'scale(1.1)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.querySelector('.portfolio-placeholder').style.transform = 'scale(1)';
    });
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.service-icon').style.transform = 'scale(1.2) rotate(10deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.service-icon').style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add parallax effect to hero section (optional)
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Initialize typing animation for hero title (optional)
function initializeTypingAnimation() {
    const title = document.querySelector('.hero-title');
    if (!title) return;
    
    const text = title.textContent;
    const highlightText = title.querySelector('.highlight')?.textContent;
    
    if (highlightText) {
        title.innerHTML = text.replace(highlightText, `<span class="highlight typing">${highlightText}</span>`);
    }
}

// Add bounce animation to CTA buttons
document.querySelectorAll('.cta-primary').forEach(button => {
    setInterval(() => {
        button.style.animation = 'none';
        setTimeout(() => {
            button.style.animation = 'bounce 0.6s ease';
        }, 10);
    }, 5000);
});

// Add CSS for bounce animation
const bounceStyles = document.createElement('style');
bounceStyles.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(bounceStyles);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Scroll-based animations here
}, 10);

window.addEventListener('scroll', debouncedScroll);

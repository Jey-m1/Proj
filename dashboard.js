// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const logoutBtn = document.getElementById('logoutBtn');
const courseButtons = document.querySelectorAll('.course-btn');
const paymentModal = document.getElementById('paymentModal');
const closeModal = document.querySelector('.close');
const paymentForm = document.getElementById('paymentForm');
const selectedCourseDiv = document.getElementById('selectedCourse');
const paymentBtn = document.querySelector('.payment-btn');

// Mobile Navigation
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Close mobile menu if open
        navMenu.classList.remove('active');
    });
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
    const confirmLogout = confirm('Are you sure you want to logout?');
    if (confirmLogout) {
        // In a real app, this would clear session/token
        alert('Logged out successfully!');
        window.location.href = 'index.html';
    }
});

// Scroll animations
const observeElements = () => {
    const elements = document.querySelectorAll('.certificate-card, .process-step, .course-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
};

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', observeElements);

// Course unlock functionality
let selectedCourse = '';
let selectedPrice = '';

courseButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        selectedCourse = button.getAttribute('data-course');
        const courseCard = button.closest('.course-card');
        const courseTitle = courseCard.querySelector('h3').textContent;
        const coursePrice = courseCard.querySelector('.course-price').textContent;
        
        selectedPrice = coursePrice;
        
        // Update modal content
        selectedCourseDiv.innerHTML = `
            <h4>${courseTitle}</h4>
            <p style="color: #666; margin: 0.5rem 0;">Course Price: <strong style="color: #667eea;">${coursePrice}</strong></p>
        `;
        
        // Show modal
        paymentModal.style.display = 'block';
    });
});

// Close modal functionality
closeModal.addEventListener('click', () => {
    paymentModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
        paymentModal.style.display = 'none';
    }
});

// Payment method switching
const paymentRadios = document.querySelectorAll('input[name="payment"]');
const cardForm = document.getElementById('cardForm');

paymentRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        if (e.target.value === 'card') {
            cardForm.style.display = 'block';
        } else {
            cardForm.style.display = 'none';
        }
    });
});

// Form input formatting
const cardNumberInput = cardForm.querySelector('input[placeholder="1234 5678 9012 3456"]');
const expiryInput = cardForm.querySelector('input[placeholder="MM/YY"]');
const cvvInput = cardForm.querySelector('input[placeholder="123"]');

// Card number formatting
cardNumberInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
    let formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
    if (formattedValue.length > 19) {
        formattedValue = formattedValue.substring(0, 19);
    }
    e.target.value = formattedValue;
});

// Expiry date formatting
expiryInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
});

// CVV formatting
cvvInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
});

// Payment form submission
paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    if (paymentMethod === 'card') {
        // Validate card form
        const cardNumber = cardNumberInput.value.replace(/\s/g, '');
        const expiry = expiryInput.value;
        const cvv = cvvInput.value;
        const cardholderName = cardForm.querySelector('input[placeholder="John Doe"]').value;
        
        if (!cardNumber || cardNumber.length < 13) {
            alert('Please enter a valid card number');
            return;
        }
        
        if (!expiry || expiry.length < 5) {
            alert('Please enter a valid expiry date');
            return;
        }
        
        if (!cvv || cvv.length < 3) {
            alert('Please enter a valid CVV');
            return;
        }
        
        if (!cardholderName.trim()) {
            alert('Please enter the cardholder name');
            return;
        }
    }
    
    // Show loading state
    paymentBtn.classList.add('loading');
    
    // Simulate payment processing
    setTimeout(() => {
        paymentBtn.classList.remove('loading');
        
        // Find the course card and update it
        const courseCards = document.querySelectorAll('.course-card');
        courseCards.forEach(card => {
            const button = card.querySelector('.course-btn');
            if (button.getAttribute('data-course') === selectedCourse) {
                // Update course card to show as unlocked
                card.classList.add('course-unlocked');
                button.innerHTML = '✅ Course Unlocked';
                button.classList.remove('locked');
                button.classList.add('unlocked');
                
                // Remove click event
                button.replaceWith(button.cloneNode(true));
            }
        });
        
        // Close modal
        paymentModal.style.display = 'none';
        
        // Show success message
        showSuccessMessage(`Payment successful! ${selectedCourse} course has been unlocked.`);
        
        // Reset form
        paymentForm.reset();
        cardForm.style.display = 'block';
        
    }, 2000);
});

// Success message function
function showSuccessMessage(message) {
    // Create success notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #27ae60, #2ecc71);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 15px 30px rgba(39, 174, 96, 0.3);
        z-index: 3000;
        font-weight: 500;
        max-width: 300px;
        animation: slideInRight 0.5s ease-out;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 4000);
}

// Active nav link highlighting
window.addEventListener('scroll', () => {
    const sections = ['portfolio', 'certificates', 'process', 'courses'];
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = sectionId;
            }
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Add active nav link styles
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: #667eea !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(navStyle);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animations to main elements
    setTimeout(() => {
        document.querySelectorAll('.certificate-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            }, index * 100);
        });
    }, 500);
});
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

// Profile Elements
const profileAvatar = document.getElementById('profileAvatar');
const profileDropdown = document.getElementById('profileDropdown');
const editProfileBtn = document.getElementById('editProfileBtn');
const profileModal = document.getElementById('profileModal');
const profileModalClose = document.getElementById('profileModalClose');
const profileForm = document.getElementById('profileForm');

// Profile data store
let profileData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior Training Specialist',
    department: 'training',
    bio: 'Experienced training specialist with 5+ years in corporate training and professional development. Passionate about helping individuals achieve their career goals through comprehensive certification programs.',
    linkedin: '',
    website: '',
    joinDate: 'January 2020'
};

// Initialize profile data on page load
function initializeProfile() {
    // Update navigation profile info
    const initials = profileData.firstName.charAt(0) + profileData.lastName.charAt(0);
    profileAvatar.textContent = initials;
    document.querySelector('.avatar-large').textContent = initials;
    document.querySelector('.avatar').textContent = initials;
    
    // Update profile dropdown
    document.getElementById('profileName').textContent = `${profileData.firstName} ${profileData.lastName}`;
    document.getElementById('profileEmail').textContent = profileData.email;
    document.getElementById('profileFullName').textContent = `${profileData.firstName} ${profileData.lastName}`;
    document.getElementById('profileEmailValue').textContent = profileData.email;
    document.getElementById('profilePhone').textContent = profileData.phone;
    document.getElementById('profilePosition').textContent = profileData.position;
    document.getElementById('profileJoinDate').textContent = profileData.joinDate;
    
    // Update main profile section
    document.querySelector('.profile-name-main').textContent = `${profileData.firstName} ${profileData.lastName}`;
    
    // Populate form fields
    document.getElementById('firstName').value = profileData.firstName;
    document.getElementById('lastName').value = profileData.lastName;
    document.getElementById('email').value = profileData.email;
    document.getElementById('phone').value = profileData.phone;
    document.getElementById('position').value = profileData.position;
    document.getElementById('department').value = profileData.department;
    document.getElementById('bio').value = profileData.bio;
    document.getElementById('linkedin').value = profileData.linkedin;
    document.getElementById('website').value = profileData.website;
}

// Profile dropdown toggle
profileAvatar.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle('active');
});

// Close profile dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!profileDropdown.contains(e.target) && !profileAvatar.contains(e.target)) {
        profileDropdown.classList.remove('active');
    }
});

// Edit Profile Modal
editProfileBtn.addEventListener('click', () => {
    profileModal.style.display = 'block';
    profileDropdown.classList.remove('active');
});

profileModalClose.addEventListener('click', () => {
    profileModal.style.display = 'none';
});

// Close profile modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === profileModal) {
        profileModal.style.display = 'none';
    }
});

// Profile form submission
profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(profileForm);
    
    // Update profile data
    profileData.firstName = formData.get('firstName');
    profileData.lastName = formData.get('lastName');
    profileData.email = formData.get('email');
    profileData.phone = formData.get('phone');
    profileData.position = formData.get('position');
    profileData.department = formData.get('department');
    profileData.bio = formData.get('bio');
    profileData.linkedin = formData.get('linkedin');
    profileData.website = formData.get('website');
    
    // Update UI with new data
    initializeProfile();
    
    // Close modal
    profileModal.style.display = 'none';
    
    // Show success message
    showSuccessMessage('Profile updated successfully!');
});

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
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
    initializeProfile();
});

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

// Profile data persistence (using localStorage simulation in memory)
function saveProfile() {
    // In a real application, this would save to a database
    // For demo purposes, we'll just keep it in memory
    console.log('Profile saved:', profileData);
}

function loadProfile() {
    // In a real application, this would load from a database
    // For demo purposes, we'll use the default data
    return profileData;
}

// Phone number formatting
document.getElementById('phone').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';
    
    if (value.length > 0) {
        if (value.length <= 3) {
            formattedValue = `+1 (${value}`;
        } else if (value.length <= 6) {
            formattedValue = `+1 (${value.substring(0, 3)}) ${value.substring(3)}`;
        } else {
            formattedValue = `+1 (${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 10)}`;
        }
    }
    
    e.target.value = formattedValue;
});

// Form validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateForm() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (!firstName || !lastName) {
        alert('Please enter both first and last name');
        return false;
    }
    
    if (!email || !validateEmail(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    return true;
}

// Enhanced profile form submission with validation
profileForm.removeEventListener('submit', profileForm.onsubmit);
profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    // Get form data
    const formData = new FormData(profileForm);
    
    // Update profile data
    profileData.firstName = formData.get('firstName');
    profileData.lastName = formData.get('lastName');
    profileData.email = formData.get('email');
    profileData.phone = formData.get('phone');
    profileData.position = formData.get('position');
    profileData.department = formData.get('department');
    profileData.bio = formData.get('bio');
    profileData.linkedin = formData.get('linkedin');
    profileData.website = formData.get('website');
    
    // Save profile (in a real app, this would be an API call)
    saveProfile();
    
    // Update UI with new data
    initializeProfile();
    
    // Close modal
    profileModal.style.display = 'none';
    
    // Show success message
    showSuccessMessage('Profile updated successfully!');
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Load profile data
    profileData = loadProfile();
    
    // Initialize profile UI
    initializeProfile();
    
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

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ESC key to close modals
    if (e.key === 'Escape') {
        if (profileModal.style.display === 'block') {
            profileModal.style.display = 'none';
        }
        if (paymentModal.style.display === 'block') {
            paymentModal.style.display = 'none';
        }
        if (profileDropdown.classList.contains('active')) {
            profileDropdown.classList.remove('active');
        }
    }
    
    // Ctrl/Cmd + E to edit profile
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        profileModal.style.display = 'block';
        profileDropdown.classList.remove('active');
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left - close profile dropdown
        if (profileDropdown.classList.contains('active')) {
            profileDropdown.classList.remove('active');
        }
    }
    
    if (touchEndX > touchStartX + 50) {
        // Swipe right - could be used for navigation
        // Currently not implemented
    }
}

// Profile avatar color based on name
function getAvatarColor(name) {
    const colors = [
        'linear-gradient(135deg, #667eea, #764ba2)',
        'linear-gradient(135deg, #f093fb, #f5576c)',
        'linear-gradient(135deg, #4facfe, #00f2fe)',
        'linear-gradient(135deg, #43e97b, #38f9d7)',
        'linear-gradient(135deg, #fa709a, #fee140)',
        'linear-gradient(135deg, #a8edea, #fed6e3)',
        'linear-gradient(135deg, #ff9a9e, #fecfef)'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
}

// Update avatar colors based on name
function updateAvatarColors() {
    const fullName = `${profileData.firstName} ${profileData.lastName}`;
    const color = getAvatarColor(fullName);
    
    // Update all avatar elements
    const avatars = [profileAvatar, document.querySelector('.avatar-large'), document.querySelector('.avatar')];
    avatars.forEach(avatar => {
        if (avatar) {
            avatar.style.background = color;
        }
    });
}

// footer.js

document.addEventListener('DOMContentLoaded', function() {
    
    // Set current year in copyright
    function setCurrentYear() {
        const currentYearElement = document.getElementById('currentYear');
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear();
        }
    }

    // Back to top functionality
    function initBackToTop() {
        const backToTopButton = document.getElementById('backToTop');
        
        if (!backToTopButton) return;

        // Show/hide back to top button based on scroll position
        function toggleBackToTopButton() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        }

        // Smooth scroll to top
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Event listeners
        window.addEventListener('scroll', toggleBackToTopButton);
        backToTopButton.addEventListener('click', scrollToTop);
    }

    // Newsletter form functionality
    function initNewsletterForm() {
        const newsletterForm = document.getElementById('newsletterForm');
        
        if (!newsletterForm) return;

        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            const submitButton = this.querySelector('.newsletter-btn');
            const email = emailInput.value.trim();
            
            if (!email) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Disable button and show loading state
            submitButton.disabled = true;
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Subscribing...';
            
            // Simulate API call (replace with your actual newsletter subscription logic)
            setTimeout(() => {
                showNotification('Thank you for subscribing!', 'success');
                emailInput.value = '';
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 2000);
        });
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show notification
    function showNotification(message, type = 'info') {
        // Remove existing notification if present
        const existingNotification = document.querySelector('.footer-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `footer-notification footer-notification--${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        `;

        // Add styles for notification
        const notificationStyles = `
            .footer-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 5px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 15px;
                min-width: 300px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                animation: slideInRight 0.3s ease;
            }
            .footer-notification--success {
                background: linear-gradient(135deg, #27ae60, #2ecc71);
            }
            .footer-notification--error {
                background: linear-gradient(135deg, #e74c3c, #c0392b);
            }
            .footer-notification--info {
                background: linear-gradient(135deg, #3498db, #2980b9);
            }
            .notification-message {
                flex: 1;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
            .notification-close:hover {
                opacity: 0.7;
            }
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
            @media (max-width: 768px) {
                .footer-notification {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    min-width: auto;
                }
            }
        `;

        // Add styles to head if not already present
        if (!document.querySelector('#footer-notification-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'footer-notification-styles';
            styleSheet.textContent = notificationStyles;
            document.head.appendChild(styleSheet);
        }

        // Add notification to page
        document.body.appendChild(notification);

        // Close notification functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });

        // Auto-remove notification after 5 seconds
        setTimeout(() => {
            if (notification && notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('.site-footer a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if href is just "#"
                if (href === '#') return;
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Social media sharing functionality (optional)
    function initSocialSharing() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // If href is "#", prevent default and show placeholder message
                if (href === '#') {
                    e.preventDefault();
                    showNotification('Social media link not configured yet.', 'info');
                }
            });
        });
    }

    // Animate footer sections on scroll
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }
            });
        }, observerOptions);

        // Observe footer sections
        const footerSections = document.querySelectorAll('.footer-section');
        footerSections.forEach(section => {
            observer.observe(section);
        });
    }

    // Initialize all functionality
    function init() {
        setCurrentYear();
        initBackToTop();
        initNewsletterForm();
        initSmoothScrolling();
        initSocialSharing();
        initScrollAnimations();
        
        console.log('Footer functionality initialized');
    }

    // Run initialization
    init();
});

// Additional utility functions
const FooterUtils = {
    // Update social media links
    updateSocialLinks: function(links) {
        const socialLinksContainer = document.querySelector('.social-links');
        if (!socialLinksContainer || !links) return;

        const socialLinks = socialLinksContainer.querySelectorAll('.social-link');
        
        Object.keys(links).forEach((platform, index) => {
            if (socialLinks[index] && links[platform]) {
                socialLinks[index].setAttribute('href', links[platform]);
            }
        });
    },

    // Update contact information
    updateContactInfo: function(contactData) {
        if (!contactData) return;

        const contactItems = document.querySelectorAll('.contact-item span');
        
        if (contactData.address && contactItems[0]) {
            contactItems[0].textContent = contactData.address;
        }
        if (contactData.phone && contactItems[1]) {
            contactItems[1].textContent = contactData.phone;
        }
        if (contactData.email && contactItems[2]) {
            contactItems[2].textContent = contactData.email;
        }
    },

    // Update company name in copyright
    updateCompanyName: function(companyName) {
        const copyrightText = document.querySelector('.copyright');
        if (copyrightText && companyName) {
            const currentYear = new Date().getFullYear();
            copyrightText.innerHTML = `&copy; <span id="currentYear">${currentYear}</span> ${companyName}. All rights reserved.`;
        }
    }
};
// ADD this to your existing dashboard.js file

// Store purchased courses
let purchasedCourses = [];

// Course training pages mapping
const courseTrainingPages = {
    'pm-fundamentals': 'project-management.html',
    'cloud-essentials': 'cloud-computing.html',
    'cybersecurity-fundamentals': 'cybersecurity.html',
    'digital-marketing': 'digital-marketing.html',
    'agile-scrum': 'agile-scrum.html',
    'quality-management': 'quality-management.html'
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeCourseSystem();
});

// Initialize course system
function initializeCourseSystem() {
    // Load purchased courses from storage
    const saved = localStorage.getItem('purchasedCourses');
    if (saved) {
        purchasedCourses = JSON.parse(saved);
        purchasedCourses.forEach(courseId => {
            showCourseAsUnlocked(courseId);
        });
    }
    
    setupCourseButtons();
    setupSuccessModal();
}

// Setup course button events
function setupCourseButtons() {
    // Handle unlock course buttons
    document.querySelectorAll('.course-btn.locked').forEach(button => {
        button.addEventListener('click', function() {
            const courseName = this.getAttribute('data-course');
            const courseId = this.getAttribute('data-course-id');
            const price = this.getAttribute('data-price');
            
            // Here you would normally open your payment modal
            // For demo purposes, let's simulate payment after 2 seconds
            simulatePayment(courseName, courseId, price);
        });
    });
    
    // Handle start training buttons
    document.querySelectorAll('.course-btn.access-btn').forEach(button => {
        button.addEventListener('click', function() {
            const courseId = this.getAttribute('data-course-id');
            startTraining(courseId);
        });
    });
}

// Simulate payment (replace this with your actual payment integration)
function simulatePayment(courseName, courseId, price) {
    // Show loading state
    const button = document.querySelector(`[data-course-id="${courseId}"].locked`);
    const originalText = button.innerHTML;
    button.innerHTML = '⏳ Processing...';
    button.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // Reset button
        button.innerHTML = originalText;
        button.disabled = false;
        
        // Handle successful payment
        handlePaymentSuccess(courseName, courseId, price);
    }, 2000);
}

// Handle successful payment
function handlePaymentSuccess(courseName, courseId, price) {
    // Add to purchased courses
    if (!purchasedCourses.includes(courseId)) {
        purchasedCourses.push(courseId);
        localStorage.setItem('purchasedCourses', JSON.stringify(purchasedCourses));
    }
    
    // Update UI
    showCourseAsUnlocked(courseId);
    showSuccessModal(courseName, courseId);
}

// Show course as unlocked
function showCourseAsUnlocked(courseId) {
    const courseCard = document.querySelector(`[data-course-id="${courseId}"]`).closest('.course-card');
    const lockButton = courseCard.querySelector('.course-btn.locked');
    const accessButton = courseCard.querySelector('.course-btn.access-btn');
    
    if (lockButton && accessButton) {
        // Hide lock button, show access button
        lockButton.classList.add('hidden');
        accessButton.classList.remove('hidden');
        
        // Add purchased styling
        courseCard.classList.add('purchased');
    }
}

// Show success modal
function showSuccessModal(courseName, courseId) {
    // Create success modal if it doesn't exist
    if (!document.getElementById('successModal')) {
        createSuccessModal();
    }
    
    const modal = document.getElementById('successModal');
    const courseName_span = document.getElementById('unlockedCourseName');
    const startBtn = document.getElementById('startTrainingBtn');
    
    courseName_span.textContent = courseName;
    startBtn.setAttribute('data-course-id', courseId);
    modal.style.display = 'block';
}

// Create success modal
function createSuccessModal() {
    const modalHTML = `
        <div id="successModal" class="modal">
            <div class="modal-content success-modal">
                <h2>🎉 Payment Successful!</h2>
                <p>Congratulations! You now have access to <span id="unlockedCourseName"></span></p>
                <div class="success-actions">
                    <button class="success-btn start-now" id="startTrainingBtn">Start Training Now</button>
                    <button class="success-btn close-modal" id="closeSuccessModal">Continue Browsing</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Setup success modal events
function setupSuccessModal() {
    // Use event delegation since modal might be created dynamically
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'startTrainingBtn') {
            const courseId = e.target.getAttribute('data-course-id');
            document.getElementById('successModal').style.display = 'none';
            startTraining(courseId);
        }
        
        if (e.target && e.target.id === 'closeSuccessModal') {
            document.getElementById('successModal').style.display = 'none';
        }
        
        // Close modal when clicking outside
        if (e.target && e.target.id === 'successModal') {
            e.target.style.display = 'none';
        }
    });
}

// Start training
function startTraining(courseId) {
    if (purchasedCourses.includes(courseId)) {
        const trainingPage = courseTrainingPages[courseId];
        if (trainingPage) {
            window.location.href = trainingPage;
        } else {
            alert('Training page not found. Please contact support.');
        }
    } else {
        alert('You need to purchase this course first!');
    }
}

// Utility function to reset purchases (for testing)
function resetPurchases() {
    purchasedCourses = [];
    localStorage.removeItem('purchasedCourses');
    location.reload();
}

// Export functions for external use
window.courseSystem = {
    resetPurchases,
    purchasedCourses: () => [...purchasedCourses],
    handlePaymentSuccess
};

// Make FooterUtils available globally if needed
window.FooterUtils = FooterUtils;


// Dashboard JavaScript with Course Navigation
document.addEventListener('DOMContentLoaded', function() {
    
    // Course mapping for navigation
    const coursePages = {
        'pm-fundamentals': 'project-management-course.html',
        'cloud-essentials': 'cloud-computing-course.html',
        'cybersecurity-fundamentals': 'cybersecurity-course.html',
        'digital-marketing': 'digital-marketing-course.html',
        'agile-scrum': 'agile-scrum-course.html',
        'quality-management': 'quality-management-course.html'
    };

    // Handle "Start Training" button clicks
    function initializeCourseNavigation() {
        document.querySelectorAll('.access-btn').forEach(button => {
            button.addEventListener('click', function() {
                const courseId = this.getAttribute('data-course-id');
                const coursePage = coursePages[courseId];
                
                if (coursePage) {
                    // You can add a loading animation here
                    this.innerHTML = '<div class="spinner"></div> Loading...';
                    
                    // Simulate a brief loading time for better UX
                    setTimeout(() => {
                        window.location.href = coursePage;
                    }, 500);
                } else {
                    alert('Course page not found. Please contact support.');
                }
            });
        });
    }

    // Handle course unlock functionality
    function initializeCourseUnlock() {
        // Get payment modal elements
        const paymentModal = document.getElementById('paymentModal');
        const closeModal = document.querySelector('.close');
        const paymentForm = document.getElementById('paymentForm');
        const selectedCourseDiv = document.getElementById('selectedCourse');

        // Handle unlock button clicks
        document.querySelectorAll('.locked').forEach(button => {
            button.addEventListener('click', function() {
                const courseName = this.getAttribute('data-course');
                const coursePrice = this.getAttribute('data-price');
                const courseId = this.getAttribute('data-course-id');

                // Store current course info
                paymentModal.setAttribute('data-current-course-id', courseId);

                // Update modal content
                selectedCourseDiv.innerHTML = `
                    <div class="course-selection">
                        <h3>${courseName}</h3>
                        <p class="course-price-display">$${coursePrice}</p>
                        <p class="course-description">Get lifetime access to this comprehensive training course</p>
                    </div>
                `;

                paymentModal.style.display = 'block';
            });
        });

        // Close modal functionality
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                paymentModal.style.display = 'none';
            });
        }

        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === paymentModal) {
                paymentModal.style.display = 'none';
            }
        });

        // Handle payment form submission
        if (paymentForm) {
            paymentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitButton = this.querySelector('.payment-btn');
                const courseId = paymentModal.getAttribute('data-current-course-id');
                
                // Show loading state
                submitButton.classList.add('loading');
                submitButton.querySelector('.btn-text').textContent = 'Processing...';

                // Simulate payment processing
                setTimeout(() => {
                    // Mark course as purchased
                    unlockCourse(courseId);
                    
                    // Close modal
                    paymentModal.style.display = 'none';
                    
                    // Reset button state
                    submitButton.classList.remove('loading');
                    submitButton.querySelector('.btn-text').textContent = 'Complete Payment';
                    
                    // Show success message
                    showSuccessMessage('Payment successful! Course unlocked.');
                    
                }, 2000);
            });
        }
    }

    // Unlock course functionality
    function unlockCourse(courseId) {
        // Find the course card
        const courseCard = document.querySelector(`[data-course-id="${courseId}"]`).closest('.course-card');
        const lockedButton = courseCard.querySelector('.locked');
        const accessButton = courseCard.querySelector('.access-btn');

        if (lockedButton && accessButton) {
            // Hide locked button and show access button
            lockedButton.classList.add('hidden');
            accessButton.classList.remove('hidden');

            // Add purchased indicator
            const courseBadge = courseCard.querySelector('.course-badge');
            if (courseBadge) {
                courseBadge.textContent = 'Purchased';
                courseBadge.style.background = '#28a745';
            }

            // Store purchase status in localStorage
            localStorage.setItem(`course-${courseId}-purchased`, 'true');
        }
    }

    // Check for previously purchased courses
    function checkPurchasedCourses() {
        document.querySelectorAll('[data-course-id]').forEach(button => {
            const courseId = button.getAttribute('data-course-id');
            const isPurchased = localStorage.getItem(`course-${courseId}-purchased`);
            
            if (isPurchased) {
                unlockCourse(courseId);
            }
        });
    }

    // Show success message
    function showSuccessMessage(message) {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="success-icon">✓</span>
                <span class="success-message">${message}</span>
            </div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Show with animation
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Profile functionality
    function initializeProfileFeatures() {
        const profileAvatar = document.getElementById('profileAvatar');
        const profileDropdown = document.getElementById('profileDropdown');
        const editProfileBtn = document.getElementById('editProfileBtn');
        const profileModal = document.getElementById('profileModal');
        const profileModalClose = document.getElementById('profileModalClose');
        const profileForm = document.getElementById('profileForm');

        // Toggle profile dropdown
        if (profileAvatar && profileDropdown) {
            profileAvatar.addEventListener('click', function(e) {
                e.stopPropagation();
                profileDropdown.classList.toggle('show');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', function() {
                profileDropdown.classList.remove('show');
            });

            // Prevent dropdown from closing when clicking inside
            profileDropdown.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }

        // Edit profile functionality
        if (editProfileBtn && profileModal) {
            editProfileBtn.addEventListener('click', function() {
                profileModal.style.display = 'flex';
                profileDropdown.classList.remove('show');
            });
        }

        // Close profile modal
        if (profileModalClose) {
            profileModalClose.addEventListener('click', function() {
                profileModal.style.display = 'none';
            });
        }

        // Handle profile form submission
        if (profileForm) {
            profileForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const firstName = formData.get('firstName');
                const lastName = formData.get('lastName');
                const email = formData.get('email');
                
                // Update profile information
                updateProfileDisplay(firstName, lastName, email);
                
                // Close modal
                profileModal.style.display = 'none';
                
                // Show success message
                showSuccessMessage('Profile updated successfully!');
            });
        }
    }

    // Update profile display
    function updateProfileDisplay(firstName, lastName, email) {
        const fullName = `${firstName} ${lastName}`;
        const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

        // Update all profile elements
        document.getElementById('profileName').textContent = fullName;
        document.getElementById('profileEmail').textContent = email;
        document.getElementById('profileFullName').textContent = fullName;
        document.getElementById('profileEmailValue').textContent = email;
        document.querySelector('.profile-name-main').textContent = fullName;
        
        // Update avatars
        document.querySelectorAll('.avatar, .avatar-large, .profile-avatar').forEach(avatar => {
            avatar.textContent = initials;
        });

        // Save to localStorage
        localStorage.setItem('userProfile', JSON.stringify({
            firstName,
            lastName,
            email,
            fullName,
            initials
        }));
    }

    // Load saved profile
    function loadSavedProfile() {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            const profile = JSON.parse(savedProfile);
            updateProfileDisplay(profile.firstName, profile.lastName, profile.email);
        }
    }

    // Mobile menu functionality
    function initializeMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
    }

    // Smooth scrolling for navigation
    function initializeSmoothScrolling() {
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
    }

    // Initialize all functionality
    initializeCourseNavigation();
    initializeCourseUnlock();
    initializeProfileFeatures();
    initializeMobileMenu();
    initializeSmoothScrolling();
    checkPurchasedCourses();
    loadSavedProfile();

    // Add CSS for success notification (inject into head)
    const notificationCSS = `
        <style>
            .success-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #28a745;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                transform: translateX(400px);
                transition: transform 0.3s ease;
                z-index: 10000;
            }
            
            .success-notification.show {
                transform: translateX(0);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .success-icon {
                background: rgba(255,255,255,0.2);
                border-radius: 50%;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
            }
            
            .spinner {
                width: 20px;
                height: 20px;
                border: 2px solid rgba(255,255,255,0.3);
                border-top: 2px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                display: inline-block;
                margin-right: 0.5rem;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .payment-btn.loading .spinner {
                display: inline-block;
            }
            
            .payment-btn:not(.loading) .spinner {
                display: none;
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', notificationCSS);
});


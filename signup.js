const signupForm = document.getElementById('signupForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const termsCheckbox = document.getElementById('terms');
const signupBtn = document.getElementById('signupBtn');
const successMessage = document.getElementById('successMessage');

// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateName(name) {
    return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function showSuccess(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    errorElement.classList.remove('show');
}

function clearValidation(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.remove('error', 'success');
    errorElement.classList.remove('show');
}

// Real-time validation
fullNameInput.addEventListener('blur', function() {
    const name = this.value.trim();
    
    if (!name) {
        showError(this, 'Full name is required');
    } else if (name.length < 2) {
        showError(this, 'Name must be at least 2 characters');
    } else if (!validateName(name)) {
        showError(this, 'Please enter a valid name (letters only)');
    } else {
        showSuccess(this);
    }
});

fullNameInput.addEventListener('input', function() {
    if (this.value.trim()) {
        clearValidation(this);
    }
});

emailInput.addEventListener('blur', function() {
    const email = this.value.trim();
    
    if (!email) {
        showError(this, 'Email is required');
    } else if (!validateEmail(email)) {
        showError(this, 'Please enter a valid email address');
    } else {
        showSuccess(this);
    }
});

emailInput.addEventListener('input', function() {
    if (this.value.trim()) {
        clearValidation(this);
    }
});

passwordInput.addEventListener('blur', function() {
    const password = this.value;
    
    if (!password) {
        showError(this, 'Password is required');
    } else if (!validatePassword(password)) {
        showError(this, 'Password must be 8+ chars with uppercase, lowercase & number');
    } else {
        showSuccess(this);
    }
});

passwordInput.addEventListener('input', function() {
    if (this.value) {
        clearValidation(this);
    }
    // Re-validate confirm password if it has a value
    if (confirmPasswordInput.value) {
        validateConfirmPassword();
    }
});

function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (!confirmPassword) {
        showError(confirmPasswordInput, 'Please confirm your password');
        return false;
    } else if (password !== confirmPassword) {
        showError(confirmPasswordInput, 'Passwords do not match');
        return false;
    } else {
        showSuccess(confirmPasswordInput);
        return true;
    }
}

confirmPasswordInput.addEventListener('blur', validateConfirmPassword);

confirmPasswordInput.addEventListener('input', function() {
    if (this.value) {
        clearValidation(this);
    }
});

// Form submission
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const termsAccepted = termsCheckbox.checked;
    let hasErrors = false;

    // Validate full name
    if (!fullName) {
        showError(fullNameInput, 'Full name is required');
        hasErrors = true;
    } else if (fullName.length < 2) {
        showError(fullNameInput, 'Name must be at least 2 characters');
        hasErrors = true;
    } else if (!validateName(fullName)) {
        showError(fullNameInput, 'Please enter a valid name (letters only)');
        hasErrors = true;
    } else {
        showSuccess(fullNameInput);
    }

    // Validate email
    if (!email) {
        showError(emailInput, 'Email is required');
        hasErrors = true;
    } else if (!validateEmail(email)) {
        showError(emailInput, 'Please enter a valid email address');
        hasErrors = true;
    } else {
        showSuccess(emailInput);
    }

    // Validate password
    if (!password) {
        showError(passwordInput, 'Password is required');
        hasErrors = true;
    } else if (!validatePassword(password)) {
        showError(passwordInput, 'Password must be 8+ chars with uppercase, lowercase & number');
        hasErrors = true;
    } else {
        showSuccess(passwordInput);
    }

    // Validate confirm password
    if (!confirmPassword) {
        showError(confirmPasswordInput, 'Please confirm your password');
        hasErrors = true;
    } else if (password !== confirmPassword) {
        showError(confirmPasswordInput, 'Passwords do not match');
        hasErrors = true;
    } else {
        showSuccess(confirmPasswordInput);
    }

    // Validate terms acceptance
    if (!termsAccepted) {
        alert('Please accept the Terms & Conditions to continue.');
        hasErrors = true;
    }

    // If no errors, proceed with signup simulation
    if (!hasErrors) {
        // Show loading state
        signupBtn.classList.add('loading');
        
        // Simulate API call
        setTimeout(() => {
            signupBtn.classList.remove('loading');
            successMessage.classList.add('show');
            signupForm.style.opacity = '0.5';
            signupForm.style.pointerEvents = 'none';
            
            // Simulate redirect after success
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }, 2000);
    }
});

// Add some interactive effects
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Terms & Conditions link handler
document.querySelector('.forgot-password').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Terms & Conditions page would be implemented here!');
});
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const emailInput = document.getElementById('email');
const resetBtn = document.getElementById('resetBtn');
const successMessage = document.getElementById('successMessage');

// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

// Form submission
forgotPasswordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    let hasErrors = false;

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

    // If no errors, proceed with password reset simulation
    if (!hasErrors) {
        // Show loading state
        resetBtn.classList.add('loading');
        
        // Simulate API call
        setTimeout(() => {
            resetBtn.classList.remove('loading');
            successMessage.classList.add('show');
            forgotPasswordForm.style.opacity = '0.5';
            forgotPasswordForm.style.pointerEvents = 'none';
            
            // Show success message and provide next steps
            setTimeout(() => {
                alert('Password reset link has been sent to your email. Please check your inbox and follow the instructions.');
                
                // Reset form for demo purposes
                forgotPasswordForm.style.opacity = '1';
                forgotPasswordForm.style.pointerEvents = 'auto';
                successMessage.classList.remove('show');
                forgotPasswordForm.reset();
                document.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('error', 'success');
                });
                document.querySelectorAll('.error-message').forEach(error => {
                    error.classList.remove('show');
                });
            }, 3000);
        }, 1500);
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
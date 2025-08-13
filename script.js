const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const googleLoginBtn = document.getElementById('googleLoginBtn');
const successMessage = document.getElementById('successMessage');

// Replace with your actual Google Client ID
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE';

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

passwordInput.addEventListener('blur', function() {
    const password = this.value;
    
    if (!password) {
        showError(this, 'Password is required');
    } else if (password.length < 6) {
        showError(this, 'Password must be at least 6 characters');
    } else {
        showSuccess(this);
    }
});

passwordInput.addEventListener('input', function() {
    if (this.value) {
        clearValidation(this);
    }
});

// Form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
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

    // Validate password
    if (!password) {
        showError(passwordInput, 'Password is required');
        hasErrors = true;
    } else if (password.length < 6) {
        showError(passwordInput, 'Password must be at least 6 characters');
        hasErrors = true;
    } else {
        showSuccess(passwordInput);
    }

    // If no errors, proceed with login simulation
    if (!hasErrors) {
        // Show loading state
        loginBtn.classList.add('loading');
        
        // Simulate API call
        setTimeout(() => {
            loginBtn.classList.remove('loading');
            successMessage.classList.add('show');
            loginForm.style.opacity = '0.5';
            loginForm.style.pointerEvents = 'none';
            
            // Simulate redirect after success
            setTimeout(() => {
                // In a real app, redirect to dashboard
                window.location.href = 'dashboard.html';
                
                // For demo purposes, show alert and reset
                // alert('Demo: Regular login successful! In a real app, you would be redirected to dashboard.');
                // loginForm.style.opacity = '1';
                // loginForm.style.pointerEvents = 'auto';
                // successMessage.classList.remove('show');
                // loginForm.reset();
                // clearValidation(emailInput);
                // clearValidation(passwordInput);
            }, 2000);
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

// Google OAuth Integration
function handleCredentialResponse(response) {
    // Show loading state
    googleLoginBtn.classList.add('loading');
    
    // Decode the JWT token to get user info
    const userInfo = parseJwt(response.credential);
    console.log('Google Login Success:', userInfo);
    
    // Simulate API call to your backend
    setTimeout(() => {
        googleLoginBtn.classList.remove('loading');
        successMessage.classList.add('show');
        loginForm.style.opacity = '0.5';
        loginForm.style.pointerEvents = 'none';
        googleLoginBtn.style.opacity = '0.5';
        googleLoginBtn.style.pointerEvents = 'none';
        
        setTimeout(() => {
            // In a real app, you would redirect to dashboard
            window.location.href = 'dashboard.html';
            
            // For demo purposes, show user info
            // alert(`Google login successful! Welcome ${userInfo.name} (${userInfo.email})`);
            // loginForm.style.opacity = '1';
            // loginForm.style.pointerEvents = 'auto';
            // googleLoginBtn.style.opacity = '1';
            // googleLoginBtn.style.pointerEvents = 'auto';
            // successMessage.classList.remove('show');
        }, 2000);
    }, 1000);
}

// Helper function to parse JWT token
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

// Custom Google button click handler
googleLoginBtn.addEventListener('click', function() {
    // Show user that they need to set up Google OAuth
    if (GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID_HERE') {
        alert('To use Google Login, please:\n\n1. Go to Google Cloud Console (https://console.cloud.google.com/)\n2. Create a new project or select existing\n3. Enable Google+ API\n4. Create OAuth 2.0 credentials\n5. Add your domain to authorized origins\n6. Replace YOUR_GOOGLE_CLIENT_ID_HERE in script.js with your actual Client ID');
        return;
    }
    
    // Show loading state
    this.classList.add('loading');
    
    try {
        // Method 1: Try using the prompt method (One Tap)
        google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                // If One Tap fails, try redirect method
                initiateGoogleRedirect();
            }
        });
        
        // Remove loading state after a short delay if no response
        setTimeout(() => {
            this.classList.remove('loading');
        }, 3000);
        
    } catch (error) {
        console.error('Google Sign-In error:', error);
        this.classList.remove('loading');
        
        // Fallback to redirect method
        initiateGoogleRedirect();
    }
});

// Alternative: Redirect-based Google OAuth (no popup)
function initiateGoogleRedirect() {
    if (GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID_HERE') {
        return;
    }
    
    const redirectUri = window.location.origin + window.location.pathname;
    const scope = 'openid email profile';
    const responseType = 'code';
    const state = generateRandomState();
    
    // Store state for verification
    sessionStorage.setItem('oauth_state', state);
    
    const authUrl = `https://accounts.google.com/oauth/authorize?` +
        `client_id=${GOOGLE_CLIENT_ID}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `scope=${encodeURIComponent(scope)}&` +
        `response_type=${responseType}&` +
        `state=${state}&` +
        `access_type=offline&` +
        `prompt=consent`;
    
    window.location.href = authUrl;
}

// Generate random state for OAuth security
function generateRandomState() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
}

// Handle redirect callback
function handleRedirectCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');
    
    if (error) {
        console.error('OAuth error:', error);
        alert('Google login failed: ' + error);
        return;
    }
    
    if (code && state) {
        const storedState = sessionStorage.getItem('oauth_state');
        
        if (state !== storedState) {
            console.error('Invalid state parameter');
            alert('Security error: Invalid state parameter');
            return;
        }
        
        // Clear the state
        sessionStorage.removeItem('oauth_state');
        
        // Exchange code for token (this should be done on your backend)
        exchangeCodeForToken(code);
        
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

// Exchange authorization code for access token (mock implementation)
function exchangeCodeForToken(code) {
    // In a real app, send the code to your backend server
    // Your backend should exchange the code for tokens
    console.log('Authorization code received:', code);
    
    // Mock successful login
    setTimeout(() => {
        successMessage.classList.add('show');
        loginForm.style.opacity = '0.5';
        loginForm.style.pointerEvents = 'none';
        googleLoginBtn.style.opacity = '0.5';
        googleLoginBtn.style.pointerEvents = 'none';
        
        setTimeout(() => {
            alert('Google login successful! (Demo mode - code received)');
            // window.location.href = 'dashboard.html';
            
            // Reset for demo
            loginForm.style.opacity = '1';
            loginForm.style.pointerEvents = 'auto';
            googleLoginBtn.style.opacity = '1';
            googleLoginBtn.style.pointerEvents = 'auto';
            successMessage.classList.remove('show');
        }, 2000);
    }, 1000);
}

// Initialize Google Sign-In when the page loads
window.onload = function() {
    // Check if we're returning from Google OAuth redirect
    handleRedirectCallback();
    
    // Only initialize if we have a valid client ID
    if (GOOGLE_CLIENT_ID !== 'YOUR_GOOGLE_CLIENT_ID_HERE') {
        try {
            google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse,
                auto_select: false,
                cancel_on_tap_outside: true
            });
        } catch (error) {
            console.warn('Google Sign-In initialization failed:', error);
        }
    }
};
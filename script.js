// Theme Toggler Functionality
const themeSwitcher = document.getElementById('theme-switcher');
const toggleText = document.querySelector('.toggle-text');

themeSwitcher.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        toggleText.textContent = 'Dark Mode';
    } else {
        toggleText.textContent = 'Light Mode';
    }
});

// Counter Functionality
const counter = document.getElementById('counter');
const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');
const resetBtn = document.getElementById('reset');
let count = 0;

incrementBtn.addEventListener('click', () => {
    count++;
    counter.textContent = count;
});

decrementBtn.addEventListener('click', () => {
    count--;
    counter.textContent = count;
});

resetBtn.addEventListener('click', () => {
    count = 0;
    counter.textContent = count;
});

// FAQ Accordion Functionality
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const toggle = question.querySelector('.faq-toggle');
        
        // Close all other open FAQs
        document.querySelectorAll('.faq-answer').forEach(item => {
            if (item !== answer && item.classList.contains('open')) {
                item.classList.remove('open');
                item.previousElementSibling.querySelector('.faq-toggle').textContent = '+';
            }
        });
        
        // Toggle current FAQ
        answer.classList.toggle('open');
        toggle.textContent = answer.classList.contains('open') ? '-' : '+';
    });
});

// Form Validation Functionality
const form = document.getElementById('validation-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const confirmPasswordError = document.getElementById('confirm-password-error');
const toast = document.getElementById('toast');

// Show error message
function showError(input, errorElement, message) {
    input.classList.add('invalid');
    input.classList.remove('valid');
    errorElement.style.display = 'block';
    errorElement.textContent = message;
}

// Show success state
function showSuccess(input, errorElement) {
    input.classList.remove('invalid');
    input.classList.add('valid');
    errorElement.style.display = 'none';
}

// Validate name
function validateName() {
    const nameValue = nameInput.value.trim();
    if (nameValue.length < 3) {
        showError(nameInput, nameError, 'Name must be at least 3 characters');
        return false;
    } else {
        showSuccess(nameInput, nameError);
        return true;
    }
}

// Validate email
function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(emailValue)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        return false;
    } else {
        showSuccess(emailInput, emailError);
        return true;
    }
}

// Validate password
function validatePassword() {
    const passwordValue = passwordInput.value;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    
    if (!passwordRegex.test(passwordValue)) {
        showError(passwordInput, passwordError, 'Password must be at least 8 characters with one uppercase letter and one number');
        return false;
    } else {
        showSuccess(passwordInput, passwordError);
        return true;
    }
}

// Validate confirm password
function validateConfirmPassword() {
    const passwordValue = passwordInput.value;
    const confirmPasswordValue = confirmPasswordInput.value;
    
    if (passwordValue !== confirmPasswordValue) {
        showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match');
        return false;
    } else {
        showSuccess(confirmPasswordInput, confirmPasswordError);
        return true;
    }
}

// Show toast notification
function showToast(message, isSuccess = true) {
    toast.textContent = message;
    toast.style.background = isSuccess ? '#23d160' : '#ff3860';
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Event listeners for real-time validation
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);
confirmPasswordInput.addEventListener('input', validateConfirmPassword);

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    
    if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        showToast('Form submitted successfully!', true);
        
        // Reset form
        form.reset();
        document.querySelectorAll('input').forEach(input => {
            input.classList.remove('valid');
        });
    } else {
        showToast('Please fix the errors in the form', false);
    }
});
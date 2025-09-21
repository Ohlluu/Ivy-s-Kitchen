// Ivy's Kitchen JavaScript - Nigerian Catering Website

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('nav-menu-active');
    navToggle.classList.toggle('nav-toggle-active');
});

// Close mobile menu when clicking on nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('nav-menu-active');
        navToggle.classList.remove('nav-toggle-active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Order Form Functionality
const orderForm = document.getElementById('order-form');
const orderTypeSelect = document.getElementById('order-type');
const eventDetailsSection = document.getElementById('event-details');
const eventDateInput = document.getElementById('event-date');
const guestCountInput = document.getElementById('guest-count');

// Show/hide event details based on order type
orderTypeSelect.addEventListener('change', function() {
    if (this.value === 'event-catering') {
        eventDetailsSection.style.display = 'flex';
        eventDateInput.required = true;
        guestCountInput.required = true;
    } else {
        eventDetailsSection.style.display = 'none';
        eventDateInput.required = false;
        guestCountInput.required = false;
        eventDateInput.value = '';
        guestCountInput.value = '';
    }
});

// Set minimum date for event date picker (tomorrow)
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 3); // 48 hours notice + buffer
eventDateInput.min = tomorrow.toISOString().split('T')[0];

// Form validation and submission
orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const orderData = {
        customerName: formData.get('customer-name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        location: formData.get('location'),
        orderType: formData.get('order-type'),
        items: formData.get('items'),
        eventDate: formData.get('event-date'),
        guestCount: formData.get('guest-count'),
        specialRequests: formData.get('special-requests'),
        timestamp: new Date().toISOString()
    };
    
    // Validate required fields based on order type
    if (!validateOrderForm(orderData)) {
        return;
    }
    
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<span>Submitting Order...</span>';
    submitButton.disabled = true;
    
    // Simulate form submission (placeholder for email integration)
    setTimeout(() => {
        // TODO: Replace with actual email integration
        console.log('Order submitted:', orderData);
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        orderForm.reset();
        eventDetailsSection.style.display = 'none';
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Scroll to top of form
        document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
        
    }, 2000);
});

// Form validation function
function validateOrderForm(data) {
    const errors = [];
    
    // Basic validation
    if (!data.customerName.trim()) errors.push('Full name is required');
    if (!data.phone.trim()) errors.push('Phone number is required');
    if (!data.email.trim() || !isValidEmail(data.email)) errors.push('Valid email address is required');
    if (!data.location.trim()) errors.push('Delivery location is required');
    if (!data.orderType) errors.push('Please select an order type');
    if (!data.items.trim()) errors.push('Please specify items and quantities');
    
    // Event catering specific validation
    if (data.orderType === 'event-catering') {
        if (!data.eventDate) errors.push('Event date is required for catering orders');
        if (!data.guestCount) errors.push('Number of guests is required for catering orders');
        
        // Check if event date meets 48-hour notice requirement
        if (data.eventDate) {
            const eventDate = new Date(data.eventDate);
            const minDate = new Date();
            minDate.setDate(minDate.getDate() + 2); // 48 hours notice
            
            if (eventDate < minDate) {
                errors.push('Event catering requires at least 48 hours notice');
            }
        }
    }
    
    // Show errors if any
    if (errors.length > 0) {
        showErrorMessage(errors);
        return false;
    }
    
    return true;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show success message
function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'form-message success-message';
    message.innerHTML = `
        <div class="message-content">
            <span class="message-icon">✅</span>
            <h4>Order Submitted Successfully!</h4>
            <p>Thank you for choosing Ivy's Kitchen! We'll contact you within 24 hours to confirm your order and discuss pricing and delivery details.</p>
        </div>
    `;
    
    // Insert message at top of form
    const orderSection = document.getElementById('order');
    orderSection.insertBefore(message, orderSection.firstChild);
    
    // Remove message after 8 seconds
    setTimeout(() => {
        message.remove();
    }, 8000);
}

// Show error message
function showErrorMessage(errors) {
    // Remove existing error messages
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(msg => msg.remove());
    
    const message = document.createElement('div');
    message.className = 'form-message error-message';
    message.innerHTML = `
        <div class="message-content">
            <span class="message-icon">❌</span>
            <h4>Please fix the following errors:</h4>
            <ul>${errors.map(error => `<li>${error}</li>`).join('')}</ul>
        </div>
    `;
    
    // Insert message before form
    const form = document.getElementById('order-form');
    form.parentNode.insertBefore(message, form);
    
    // Scroll to error message
    message.scrollIntoView({ behavior: 'smooth' });
    
    // Remove message after 10 seconds
    setTimeout(() => {
        message.remove();
    }, 10000);
}

// Phone number formatting (Nigerian format)
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    
    // Handle Nigerian phone number formatting
    if (value.startsWith('234')) {
        // International format: +234 XXX XXX XXXX
        value = value.substring(0, 13);
        if (value.length > 3) {
            value = '+234 ' + value.substring(3);
        }
        if (value.length > 8) {
            value = value.substring(0, 8) + ' ' + value.substring(8);
        }
        if (value.length > 12) {
            value = value.substring(0, 12) + ' ' + value.substring(12);
        }
    } else if (value.startsWith('0')) {
        // Local format: 0XXX XXX XXXX
        value = value.substring(0, 11);
        if (value.length > 4) {
            value = value.substring(0, 4) + ' ' + value.substring(4);
        }
        if (value.length > 8) {
            value = value.substring(0, 8) + ' ' + value.substring(8);
        }
    }
    
    this.value = value;
});

// Add fade-in animation for sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all main sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Food card hover effects
const foodCards = document.querySelectorAll('.food-card');
foodCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set hero section as immediately visible
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }
    
    console.log('Ivy\'s Kitchen website loaded successfully! 🇳🇬');
});
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const ctaButton = document.querySelector('.cta-button');

    // Create mobile menu overlay
    const mobileMenuOverlay = document.createElement('div');
    mobileMenuOverlay.className = 'mobile-menu-overlay';
    mobileMenuOverlay.innerHTML = `
        <div class="mobile-menu-content">
            <div class="mobile-nav-links">
                <a href="#features" class="mobile-nav-link">Features</a>
                <a href="#how-it-works" class="mobile-nav-link">How It Works</a>
                <a href="#pricing" class="mobile-nav-link">Shop</a>
                <a href="#faq" class="mobile-nav-link">FAQ</a>
            </div>
            <button class="mobile-cta-button">Order Now</button>
        </div>
    `;

    // Add mobile menu styles
    const mobileMenuStyles = `
        .mobile-menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(107, 70, 193, 0.95);
            backdrop-filter: blur(10px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .mobile-menu-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        .mobile-menu-content {
            text-align: center;
            color: white;
        }

        .mobile-nav-links {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            margin-bottom: 3rem;
        }

        .mobile-nav-link {
            color: white;
            text-decoration: none;
            font-size: 1.5rem;
            font-weight: 500;
            transition: color 0.3s ease;
        }

        .mobile-nav-link:hover {
            color: #FCD34D;
        }

        .mobile-cta-button {
            background: #FCD34D;
            color: #4C1D95;
            border: none;
            padding: 1rem 2rem;
            border-radius: 12px;
            font-size: 1.2rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }

        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;

    const style = document.createElement('style');
    style.textContent = mobileMenuStyles;
    document.head.appendChild(style);
    document.body.appendChild(mobileMenuOverlay);

    mobileMenuToggle.addEventListener('click', function() {
        mobileMenuToggle.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on overlay or links
    mobileMenuOverlay.addEventListener('click', function(e) {
        if (e.target === mobileMenuOverlay || e.target.classList.contains('mobile-nav-link')) {
            mobileMenuToggle.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const answer = faqItem.querySelector('.faq-answer');

        // Toggle active state
        faqItem.classList.toggle('active');

        // Close other open FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
    });
});

// Add FAQ styles for accordion
const faqStyles = `
    .faq-question {
        position: relative;
        padding-right: 2rem;
    }

    .faq-question::after {
        content: '+';
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1.5rem;
        color: var(--primary-purple);
        transition: transform 0.3s ease;
    }

    .faq-item.active .faq-question::after {
        transform: translateY(-50%) rotate(45deg);
    }

    .faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: all 0.3s ease;
        opacity: 0;
    }

    .faq-item.active .faq-answer {
        max-height: 200px;
        opacity: 1;
        margin-top: 1rem;
    }
`;

const faqStyle = document.createElement('style');
faqStyle.textContent = faqStyles;
document.head.appendChild(faqStyle);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .testimonial, .step, .faq-item').forEach(el => {
    observer.observe(el);
});

// Order button functionality
function initOrderButtons() {
    const orderButtons = document.querySelectorAll('.primary-button, .order-button, .final-cta-button, .mobile-cta-button');

    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add loading state
            this.classList.add('loading');
            this.textContent = 'Processing...';

            // Simulate order process (replace with actual order logic)
            setTimeout(() => {
                // Remove loading state
                this.classList.remove('loading');
                this.textContent = 'Order Now - $60';

                // Show success message (you can replace this with actual order flow)
                showOrderModal();
            }, 1500);
        });
    });
}

function showOrderModal() {
    const modalHTML = `
        <div class="order-modal-overlay">
            <div class="order-modal">
                <div class="modal-header">
                    <h3>Ready to Order?</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-content">
                    <p>Thank you for your interest in Little Light Bible Projector!</p>
                    <p>You're about to join thousands of families transforming their faith journey.</p>
                    <div class="modal-buttons">
                        <button class="proceed-button">Proceed to Checkout</button>
                        <button class="cancel-button">Continue Browsing</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const modalStyles = `
        .order-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }

        .order-modal {
            background: white;
            border-radius: 20px;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
            animation: modalSlideIn 0.3s ease-out;
        }

        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem 2rem 1rem;
            border-bottom: 1px solid #E5E7EB;
        }

        .modal-header h3 {
            color: #4C1D95;
            margin: 0;
        }

        .modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #6B7280;
            padding: 0;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s ease;
        }

        .modal-close:hover {
            background: #F3F4F6;
        }

        .modal-content {
            padding: 2rem;
        }

        .modal-content p {
            color: #64748B;
            margin-bottom: 1rem;
        }

        .modal-buttons {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 2rem;
        }

        .proceed-button {
            background: linear-gradient(135deg, #6B46C1, #8B5CF6);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .cancel-button {
            background: white;
            color: #6B46C1;
            border: 2px solid #6B46C1;
            padding: 1rem 2rem;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        @media (min-width: 480px) {
            .modal-buttons {
                flex-direction: row;
            }
        }
    `;

    // Add modal styles
    const modalStyle = document.createElement('style');
    modalStyle.textContent = modalStyles;
    document.head.appendChild(modalStyle);

    // Add modal to DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modalOverlay = document.querySelector('.order-modal-overlay');

    // Close modal functionality
    function closeModal() {
        modalOverlay.remove();
        modalStyle.remove();
    }

    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.querySelector('.cancel-button').addEventListener('click', closeModal);

    // Close on overlay click
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Proceed button (replace with actual checkout logic)
    document.querySelector('.proceed-button').addEventListener('click', function() {
        alert('This would redirect to the actual checkout page. For demo purposes only.');
        closeModal();
    });

    // Prevent body scrolling
    document.body.style.overflow = 'hidden';

    // Restore body scrolling when modal closes
    const originalCloseModal = closeModal;
    closeModal = function() {
        document.body.style.overflow = '';
        originalCloseModal();
    };
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'white';
        header.style.backdropFilter = 'none';
    }
});

// Initialize all functionality
initOrderButtons();

// Form validation (if contact forms are added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Analytics tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    console.log('Analytics Event:', eventName, properties);
    // Replace with actual analytics implementation
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('primary-button')) {
        trackEvent('cta_clicked', { location: 'hero' });
    } else if (e.target.classList.contains('order-button')) {
        trackEvent('order_clicked', { location: 'pricing' });
    } else if (e.target.classList.contains('final-cta-button')) {
        trackEvent('final_cta_clicked', { location: 'bottom' });
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    trackEvent('page_loaded', {
        load_time: performance.now()
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    trackEvent('js_error', {
        message: e.error.message,
        filename: e.filename,
        line: e.lineno
    });
});
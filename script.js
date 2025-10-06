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

// Order button functionality - Contact-based approach for platform-managed Stripe
function initOrderButtons() {
    const orderButtons = document.querySelectorAll('.primary-button, .order-button, .final-cta-button, .mobile-cta-button');

    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Add loading state
            this.classList.add('loading');
            const originalText = this.textContent;
            this.textContent = 'Opening order form...';

            // Since your Stripe is platform-managed and Payment Links are disabled,
            // let's create a simple order form that emails you the details
            setTimeout(() => {
                const orderForm = `
                    <div id="orderFormOverlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px;">
                        <div style="max-width: 500px; width: 100%; background: white; border-radius: 20px; padding: 30px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h2 style="color: #6B46C1; margin-bottom: 10px;">Order Little Light Bible Projector</h2>
                                <p style="color: #64748B;">$62.99 - Adult Version + FREE Gifts</p>
                            </div>

                            <form id="orderForm" style="display: flex; flex-direction: column; gap: 15px;">
                                <input type="text" name="name" placeholder="Full Name *" required style="padding: 12px; border: 2px solid #E5E7EB; border-radius: 8px; font-size: 16px;">
                                <input type="email" name="email" placeholder="Email Address *" required style="padding: 12px; border: 2px solid #E5E7EB; border-radius: 8px; font-size: 16px;">
                                <input type="tel" name="phone" placeholder="Phone Number *" required style="padding: 12px; border: 2px solid #E5E7EB; border-radius: 8px; font-size: 16px;">
                                <textarea name="address" placeholder="Shipping Address *" required style="padding: 12px; border: 2px solid #E5E7EB; border-radius: 8px; font-size: 16px; min-height: 80px; resize: vertical;"></textarea>

                                <div style="background: #F3F4F6; padding: 15px; border-radius: 8px; margin: 10px 0;">
                                    <h4 style="color: #6B46C1; margin-bottom: 10px;">🎁 FREE Gifts Included:</h4>
                                    <ul style="color: #64748B; margin: 0; padding-left: 20px;">
                                        <li>📔 Premium Faith Journal</li>
                                        <li>💳 Extra Affirmation Cards</li>
                                        <li>📝 Branded Sticky Note Set</li>
                                    </ul>
                                </div>

                                <div style="display: flex; gap: 15px; margin-top: 20px;">
                                    <button type="submit" style="flex: 1; background: linear-gradient(135deg, #6B46C1, #8B5CF6); color: white; border: none; padding: 15px; border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 16px;">
                                        Submit Order - $62.99
                                    </button>
                                    <button type="button" onclick="document.getElementById('orderFormOverlay').remove()" style="background: white; color: #6B46C1; border: 2px solid #6B46C1; padding: 15px 20px; border-radius: 12px; font-weight: 600; cursor: pointer;">
                                        Cancel
                                    </button>
                                </div>
                            </form>

                            <p style="text-align: center; color: #9CA3AF; font-size: 14px; margin-top: 20px;">
                                We'll contact you within 24 hours to process payment and shipping.
                            </p>
                        </div>
                    </div>
                `;

                document.body.insertAdjacentHTML('beforeend', orderForm);

                // Handle form submission
                document.getElementById('orderForm').addEventListener('submit', function(e) {
                    e.preventDefault();

                    const formData = new FormData(this);
                    const orderDetails = {
                        name: formData.get('name'),
                        email: formData.get('email'),
                        phone: formData.get('phone'),
                        address: formData.get('address'),
                        product: 'Little Light Bible Projector - Adult Version',
                        price: '$62.99',
                        timestamp: new Date().toISOString()
                    };

                    // Create mailto link
                    const subject = encodeURIComponent('New Order - Little Light Bible Projector');
                    const body = encodeURIComponent(`
New Order Details:

Customer: ${orderDetails.name}
Email: ${orderDetails.email}
Phone: ${orderDetails.phone}
Address: ${orderDetails.address}

Product: ${orderDetails.product}
Price: ${orderDetails.price}
Includes: Premium Faith Journal, Affirmation Cards, Sticky Notes

Order Time: ${new Date().toLocaleString()}

Please process payment and shipping for this order.
                    `);

                    const mailtoLink = `mailto:hello@thelittlelightfamily.com?subject=${subject}&body=${body}`;
                    window.location.href = mailtoLink;

                    // Show confirmation
                    document.getElementById('orderFormOverlay').innerHTML = `
                        <div style="max-width: 400px; background: white; border-radius: 20px; padding: 40px; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
                            <div style="font-size: 4rem; margin-bottom: 20px;">✅</div>
                            <h2 style="color: #6B46C1; margin-bottom: 15px;">Order Submitted!</h2>
                            <p style="color: #64748B; margin-bottom: 25px;">Thank you! We'll contact you within 24 hours to process your payment and arrange shipping.</p>
                            <button onclick="this.closest('#orderFormOverlay').remove()" style="background: #6B46C1; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer;">Close</button>
                        </div>
                    `;
                });

                button.classList.remove('loading');
                button.textContent = originalText;
            }, 1000);
        });
    });
}

// Show error message
function showErrorMessage(message) {
    const errorHTML = `
        <div class="error-modal-overlay">
            <div class="error-modal">
                <div class="error-header">
                    <h3>Payment Error</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="error-content">
                    <p>${message}</p>
                    <p>Please try again or contact support if the problem persists.</p>
                    <div class="error-buttons">
                        <button class="retry-button">Try Again</button>
                        <button class="contact-button">Contact Support</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add error modal styles
    const errorStyles = `
        .error-modal-overlay {
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

        .error-modal {
            background: white;
            border-radius: 20px;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 25px 80px rgba(239, 68, 68, 0.3);
            animation: modalSlideIn 0.3s ease-out;
        }

        .error-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem 2rem 1rem;
            border-bottom: 1px solid #FEE2E2;
        }

        .error-header h3 {
            color: #DC2626;
            margin: 0;
        }

        .error-content {
            padding: 2rem;
        }

        .error-content p {
            color: #64748B;
            margin-bottom: 1rem;
        }

        .error-buttons {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
            flex-direction: column;
        }

        .retry-button {
            background: linear-gradient(135deg, #6B46C1, #8B5CF6);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
        }

        .contact-button {
            background: white;
            color: #6B46C1;
            border: 2px solid #6B46C1;
            padding: 1rem 2rem;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
        }

        @media (min-width: 480px) {
            .error-buttons {
                flex-direction: row;
            }
        }
    `;

    const errorStyle = document.createElement('style');
    errorStyle.textContent = errorStyles;
    document.head.appendChild(errorStyle);

    document.body.insertAdjacentHTML('beforeend', errorHTML);
    const errorOverlay = document.querySelector('.error-modal-overlay');

    function closeError() {
        errorOverlay.remove();
        errorStyle.remove();
        document.body.style.overflow = '';
    }

    document.querySelector('.modal-close').addEventListener('click', closeError);
    document.querySelector('.retry-button').addEventListener('click', closeError);

    document.querySelector('.contact-button').addEventListener('click', function() {
        window.location.href = 'mailto:hello@thelittlelightfamily.com';
    });

    errorOverlay.addEventListener('click', function(e) {
        if (e.target === errorOverlay) {
            closeError();
        }
    });

    document.body.style.overflow = 'hidden';
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

// Magical Interactive Elements
function createFloatingStars() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create floating stars that respond to mouse movement
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'floating-star';
        star.textContent = '⭐';
        star.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 10}px;
            color: rgba(252, 211, 77, ${Math.random() * 0.08 + 0.02});
            pointer-events: none;
            z-index: 3;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatStars ${Math.random() * 3 + 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(star);
    }

    // Mouse movement parallax effect
    hero.addEventListener('mousemove', (e) => {
        const stars = hero.querySelectorAll('.floating-star');
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        stars.forEach((star, index) => {
            const speed = (index % 5 + 1) * 0.02;
            const translateX = (x - rect.width / 2) * speed;
            const translateY = (y - rect.height / 2) * speed;
            star.style.transform = `translate(${translateX}px, ${translateY}px)`;
        });
    });
}

// Add magical sparkle effect when hovering over buttons
function addSparkleEffects() {
    const buttons = document.querySelectorAll('.primary-button, .final-cta-button, .order-button');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', createSparkles);
        button.addEventListener('mouseleave', removeSparkles);
    });

    function createSparkles(e) {
        const button = e.target;
        const sparkleCount = 8;

        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('span');
            sparkle.className = 'sparkle';
            sparkle.textContent = '✨';
            sparkle.style.cssText = `
                position: absolute;
                font-size: 12px;
                color: rgba(252, 211, 77, 0.8);
                pointer-events: none;
                z-index: 1000;
                animation: sparkleEffect 1s ease-out forwards;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            button.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    function removeSparkles(e) {
        const sparkles = e.target.querySelectorAll('.sparkle');
        sparkles.forEach(sparkle => sparkle.remove());
    }
}

// Add sparkle animation CSS
const sparkleCSS = `
    @keyframes sparkleEffect {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = sparkleCSS;
document.head.appendChild(sparkleStyle);

// Add gentle background music simulation with visual feedback
function addAmbientEffects() {
    const features = document.querySelectorAll('.feature-card');

    features.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            // Add gentle glow effect
            card.style.boxShadow = `
                0 25px 60px rgba(107, 70, 193, 0.3),
                0 0 40px rgba(252, 211, 77, 0.5),
                inset 0 0 30px rgba(252, 211, 77, 0.1)
            `;

            // Trigger gentle pulse animation
            card.style.animation = 'gentleGlow 2s ease-in-out infinite';
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
            card.style.animation = '';
        });
    });
}

// Create constellation pattern in background
function createConstellation() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create constellation lines
    for (let i = 0; i < 5; i++) {
        const line = document.createElement('div');
        line.className = 'constellation-line';
        line.style.cssText = `
            position: absolute;
            width: ${Math.random() * 200 + 50}px;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(252, 211, 77, 0.4), transparent);
            top: ${Math.random() * 80 + 10}%;
            left: ${Math.random() * 80 + 10}%;
            transform: rotate(${Math.random() * 360}deg);
            animation: twinkle 4s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            z-index: 1;
        `;
        hero.appendChild(line);
    }
}

// Story book page turn effect for testimonials
function addStoryBookEffects() {
    const testimonials = document.querySelectorAll('.testimonial');

    testimonials.forEach(testimonial => {
        testimonial.addEventListener('mouseenter', () => {
            testimonial.style.transform = 'rotateY(-5deg) translateZ(20px)';
            testimonial.style.boxShadow = '0 20px 40px rgba(107, 70, 193, 0.3)';
        });

        testimonial.addEventListener('mouseleave', () => {
            testimonial.style.transform = '';
            testimonial.style.boxShadow = '';
        });
    });
}

// Initialize all magical functionality
createFloatingStars();
addSparkleEffects();
addAmbientEffects();
createConstellation();
addStoryBookEffects();
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
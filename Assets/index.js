// JavaScript functionality for the landing page

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    setupFaqAccordion();
    
    // Countdown Timer
    setupCountdownTimer();
    
    // CTA Button click events
    setupCtaButtons();
    
    // Smooth scrolling for navigation
    setupSmoothScrolling();
});

/**
 * Sets up the FAQ accordion functionality
 */
function setupFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle active class on the clicked item
            item.classList.toggle('active');
            
            // Close other open FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
}

/**
 * Sets up the countdown timer functionality
 */
function setupCountdownTimer() {
    // Set the countdown date (7 days from now)
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 7);
    
    // Update the countdown every second
    const countdownTimer = setInterval(function() {
        // Get current date and time
        const now = new Date().getTime();
        
        // Calculate the time remaining
        const distance = countdownDate - now;
        
        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update the countdown display
        document.querySelector('.countdown-item:nth-child(1) .countdown-number').textContent = days;
        document.querySelector('.countdown-item:nth-child(2) .countdown-number').textContent = hours;
        document.querySelector('.countdown-item:nth-child(3) .countdown-number').textContent = minutes;
        document.querySelector('.countdown-item:nth-child(4) .countdown-number').textContent = seconds;
        
        // If the countdown is finished, clear the interval
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.querySelector('.countdown-container').innerHTML = "<p>The offer has expired!</p>";
        }
    }, 1000);
}

/**
 * Sets up CTA button click events
 */
function setupCtaButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // In a real implementation, this would open a form or redirect to a booking page
            // For now, we'll just show an alert
            alert('Thank you for your interest! The application form would open here.');
            
            // You could also implement a modal popup with a form here
            // showApplicationForm();
        });
    });
}

/**
 * Sets up smooth scrolling for navigation
 */
function setupSmoothScrolling() {
    // Get all links that have hash (#) in them
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Smooth scroll to the target element
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Example function for showing an application form modal
 * This would be implemented in a real landing page
 */
function showApplicationForm() {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'application-modal';
    
    // Create modal content
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>Apply for a Free Strategy Call</h2>
            <form id="application-form">
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" required>
                </div>
                <div class="form-group">
                    <label for="business">Business Name</label>
                    <input type="text" id="business" name="business" required>
                </div>
                <div class="form-group">
                    <label for="revenue">Current Monthly Revenue</label>
                    <select id="revenue" name="revenue" required>
                        <option value="">Select an option</option>
                        <option value="0-5k">$0 - $5,000</option>
                        <option value="5k-10k">$5,000 - $10,000</option>
                        <option value="10k-20k">$10,000 - $20,000</option>
                        <option value="20k+">$20,000+</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="goals">What are your main business goals?</label>
                    <textarea id="goals" name="goals" rows="4" required></textarea>
                </div>
                <button type="submit" class="cta-button primary-cta">Submit Application</button>
            </form>
        </div>
    `;
    
    // Add modal to the body
    document.body.appendChild(modal);
    
    // Show the modal
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close button functionality
    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    // Form submission
    const form = modal.querySelector('#application-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // In a real implementation, this would send the form data to a server
        alert('Thank you for your application! We will contact you shortly.');
        
        // Close the modal
        modal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
}

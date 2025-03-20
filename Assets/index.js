// JavaScript functionality for the landing page

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    setupFaqAccordion();
    setupCountdownTimer();
    setupCtaButtons();
    setupSmoothScrolling();
});

// FAQ accordion setup
function setupFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
}

// Countdown timer setup
function setupCountdownTimer() {
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 7);

    const countdownTimer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.querySelector('.countdown-item:nth-child(1) .countdown-number').textContent = days;
        document.querySelector('.countdown-item:nth-child(2) .countdown-number').textContent = hours;
        document.querySelector('.countdown-item:nth-child(3) .countdown-number').textContent = minutes;
        document.querySelector('.countdown-item:nth-child(4) .countdown-number').textContent = seconds;

        if (distance < 0) {
            clearInterval(countdownTimer);
            document.querySelector('.countdown-container').innerHTML = "<p>The offer has expired!</p>";
        }
    }, 1000);
}

// CTA Buttons setup
function setupCtaButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showApplicationForm(); // Trigger modal form
        });
    });
}

// Smooth scrolling setup
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Modal form with Netlify submission
function showApplicationForm() {
    const modal = document.createElement('div');
    modal.className = 'application-modal';

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>Apply for a Free Strategy Call</h2>
            <form id="application-form" name="strategy-call" method="POST" data-netlify="true">
                <input type="hidden" name="form-name" value="strategy-call">
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
                    <label for="goals">Main Business Goals</label>
                    <textarea id="goals" name="goals" rows="4" required></textarea>
                </div>
                <button type="submit" class="cta-button primary-cta">Submit Application</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => { modal.style.opacity = '1'; }, 10);

    modal.querySelector('.close-button').addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => { document.body.removeChild(modal); }, 300);
    });

    modal.querySelector('#application-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        fetch('/', {
            method: 'POST',
            headers: { 'Accept': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            alert('Thank you! Your submission was successful.');
            modal.style.opacity = '0';
            setTimeout(() => { document.body.removeChild(modal); }, 300);
        })
        .catch(() => alert('Submission failed. Please try again.'));
    });
}

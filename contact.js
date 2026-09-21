/**
 * ShopEase - Contact & FAQ Logic (contact.js)
 * Form submission with toast feedback, FAQ accordion toggles
 */

document.addEventListener('DOMContentLoaded', () => {
  setupContactForm();
  setupFAQAccordions();
});

function setupContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      if (typeof Store !== 'undefined') {
        Store.showToast('Please fill out all required fields.', 'danger');
      }
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';

      if (typeof Store !== 'undefined') {
        Store.showToast(`Thank you, ${name}! Your inquiry regarding "${subject}" has been received. Our team will respond to ${email} within 24 hours.`, 'success');
      }

      form.reset();
    }, 900);
  });
}

function setupFAQAccordions() {
  const items = document.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const btn = item.querySelector('.accordion-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close other items
        items.forEach(i => i.classList.remove('active'));

        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

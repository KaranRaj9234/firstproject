/**
 * ShopEase - Checkout Page Logic (checkout.js)
 * Form validation, payment method selector, safe mock payment, order placement
 */

let selectedPaymentMethod = 'card';

document.addEventListener('DOMContentLoaded', () => {
  verifyCartNotEmpty();
  renderCheckoutSummary();
  setupPaymentMethodSelector();
  setupCheckoutForm();
  prefillExistingUserData();
});

// Ensure cart isn't empty before checkout
function verifyCartNotEmpty() {
  if (typeof Store === 'undefined') return;
  const cart = Store.getCart();
  if (cart.length === 0) {
    Store.showToast('Your cart is empty! Redirecting to products...', 'warning');
    setTimeout(() => {
      window.location.href = 'products.html';
    }, 1200);
  }
}

// Prefill user data if logged in
function prefillExistingUserData() {
  if (typeof Store === 'undefined') return;
  const user = Store.getCurrentUser();
  if (user) {
    const nameInput = document.getElementById('checkout-name');
    const emailInput = document.getElementById('checkout-email');
    if (nameInput && !nameInput.value) nameInput.value = user.name;
    if (emailInput && !emailInput.value) emailInput.value = user.email;
  }
}

// Render Order Summary in Checkout
function renderCheckoutSummary() {
  if (typeof Store === 'undefined') return;

  const cart = Store.getCart();
  const summary = Store.getCartSummary();

  const previewContainer = document.getElementById('checkout-items-preview');
  if (previewContainer) {
    previewContainer.innerHTML = cart.map(item => `
      <div class="mini-cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="info">
          <h5>${item.name}</h5>
          <span>Qty: ${item.quantity} &times; $${item.price.toFixed(2)}</span>
        </div>
        <div class="price">$${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `).join('');
  }

  // Cost lines
  const subtotalEl = document.getElementById('checkout-subtotal');
  const discountRow = document.getElementById('checkout-discount-row');
  const discountVal = document.getElementById('checkout-discount-val');
  const shippingVal = document.getElementById('checkout-shipping');
  const taxVal = document.getElementById('checkout-tax');
  const totalVal = document.getElementById('checkout-total');

  if (subtotalEl) subtotalEl.textContent = `$${summary.subtotal.toFixed(2)}`;
  
  if (discountRow && discountVal) {
    if (summary.couponDiscount > 0) {
      discountRow.style.display = 'flex';
      discountVal.textContent = `-$${summary.couponDiscount.toFixed(2)}`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  if (shippingVal) {
    shippingVal.innerHTML = summary.shipping === 0 
      ? '<span style="color: var(--accent); font-weight: 700;">FREE</span>' 
      : `$${summary.shipping.toFixed(2)}`;
  }

  if (taxVal) taxVal.textContent = `$${summary.tax.toFixed(2)}`;
  if (totalVal) totalVal.textContent = `$${summary.finalTotal.toFixed(2)}`;
}

// Setup Payment Method Switcher
function setupPaymentMethodSelector() {
  const cards = document.querySelectorAll('.payment-method-card');
  const panes = {
    card: document.getElementById('card-payment-pane'),
    upi: document.getElementById('upi-payment-pane'),
    netbanking: document.getElementById('netbanking-payment-pane'),
    cod: document.getElementById('cod-payment-pane')
  };

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      selectedPaymentMethod = card.getAttribute('data-method');

      // Toggle panes
      Object.keys(panes).forEach(method => {
        if (panes[method]) {
          panes[method].style.display = (method === selectedPaymentMethod) ? 'block' : 'none';
        }
      });
    });
  });
}

// Checkout Form Submission
function setupCheckoutForm() {
  const form = document.getElementById('checkout-form');
  const placeOrderBtn = document.getElementById('place-order-btn');

  if (!form || !placeOrderBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic Validation
    const fullName = document.getElementById('checkout-name').value.trim();
    const email = document.getElementById('checkout-email').value.trim();
    const phone = document.getElementById('checkout-phone').value.trim();
    const address = document.getElementById('checkout-address').value.trim();
    const city = document.getElementById('checkout-city').value.trim();
    const state = document.getElementById('checkout-state').value.trim();
    const pinCode = document.getElementById('checkout-pin').value.trim();

    if (!fullName || !email || !phone || !address || !city || !state || !pinCode) {
      Store.showToast('Please fill out all required shipping fields.', 'danger');
      return;
    }

    // Card specifics check if card method selected
    if (selectedPaymentMethod === 'card') {
      const cardNum = document.getElementById('mock-card-num')?.value.trim();
      const cardExp = document.getElementById('mock-card-exp')?.value.trim();
      const cardCvv = document.getElementById('mock-card-cvv')?.value.trim();
      if (!cardNum || !cardExp || !cardCvv) {
        Store.showToast('Please enter mock card details (demo numbers work).', 'warning');
        return;
      }
    }

    // Processing animation
    placeOrderBtn.disabled = true;
    placeOrderBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Securing & Placing Order...';

    setTimeout(() => {
      const summary = Store.getCartSummary();
      const cart = Store.getCart();

      const orderData = {
        shippingAddress: {
          fullName,
          email,
          phone,
          address,
          city,
          state,
          pinCode
        },
        paymentMethod: getReadablePaymentMethod(selectedPaymentMethod),
        paymentStatus: selectedPaymentMethod === 'cod' ? 'Pending (COD)' : 'Paid (Mock)',
        items: cart,
        subtotal: summary.subtotal,
        discount: summary.couponDiscount,
        shipping: summary.shipping,
        tax: summary.tax,
        total: summary.finalTotal
      };

      const createdOrder = Store.createOrder(orderData);

      // Show confirmation modal
      showOrderConfirmationModal(createdOrder);
    }, 1200);
  });
}

function getReadablePaymentMethod(method) {
  switch(method) {
    case 'card': return 'Credit / Debit Card (Mock)';
    case 'upi': return 'UPI / QR Code (Mock)';
    case 'netbanking': return 'Net Banking';
    case 'cod': return 'Cash on Delivery';
    default: return 'Demo Payment';
  }
}

// Order Confirmation Modal
function showOrderConfirmationModal(order) {
  let modalOverlay = document.getElementById('order-confirmation-modal');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'order-confirmation-modal';
    modalOverlay.className = 'modal-overlay active';
    document.body.appendChild(modalOverlay);
  } else {
    modalOverlay.classList.add('active');
  }

  modalOverlay.innerHTML = `
    <div class="modal-dialog" style="max-width: 550px; text-align: center; padding: 2.5rem;">
      <div style="width: 5rem; height: 5rem; border-radius: 50%; background: #dcfce7; color: #16a34a; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto 1.5rem;">
        <i class="fa-solid fa-check"></i>
      </div>

      <span style="font-size: 0.85rem; font-weight: 700; color: var(--accent); text-transform: uppercase; letter-spacing: 0.05em;">Order Placed Successfully!</span>
      <h2 style="font-size: 1.85rem; font-weight: 800; color: var(--secondary); margin: 0.5rem 0 1rem;">Thank you for your order!</h2>
      
      <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.95rem;">
        Your order <strong>#${order.id}</strong> has been registered. We've sent a confirmation email to <strong>${order.shippingAddress.email}</strong>.
      </p>

      <div style="background: var(--bg-subtle); border-radius: var(--radius-md); padding: 1.25rem; text-align: left; margin-bottom: 2rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem;">
          <span style="color: var(--text-muted);">Amount Paid:</span>
          <strong>$${order.total.toFixed(2)}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem;">
          <span style="color: var(--text-muted);">Payment Method:</span>
          <strong>${order.paymentMethod}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
          <span style="color: var(--text-muted);">Deliver to:</span>
          <strong>${order.shippingAddress.city}, ${order.shippingAddress.state}</strong>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <a href="orders.html" class="btn btn-primary btn-lg">
          <i class="fa-solid fa-box"></i> Track Order
        </a>
        <a href="products.html" class="btn btn-outline btn-lg">
          Continue Shopping
        </a>
      </div>
    </div>
  `;
}

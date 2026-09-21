/**
 * ShopEase - Shopping Cart Page Logic (cart.js)
 * Item listing, quantity management, promo codes, shipping threshold meter
 */

document.addEventListener('DOMContentLoaded', () => {
  renderCart();

  // Listen for global cart updates
  window.addEventListener('shopease:cart-updated', () => {
    renderCart();
  });

  setupCouponForm();
});

function renderCart() {
  if (typeof Store === 'undefined') return;

  const cart = Store.getCart();
  const summary = Store.getCartSummary();

  const emptyView = document.getElementById('cart-empty-view');
  const filledView = document.getElementById('cart-filled-view');
  const itemsContainer = document.getElementById('cart-items-container');

  if (!emptyView || !filledView) return;

  if (cart.length === 0) {
    emptyView.style.display = 'block';
    filledView.style.display = 'none';
    return;
  }

  emptyView.style.display = 'none';
  filledView.style.display = 'grid';

  // Render items
  if (itemsContainer) {
    itemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item-row" data-id="${item.id}">
        <div class="cart-item-thumb">
          <a href="product-detail.html?id=${item.id}">
            <img src="${item.image}" alt="${item.name}" />
          </a>
        </div>

        <div class="cart-item-details">
          <h4><a href="product-detail.html?id=${item.id}">${item.name}</a></h4>
          <span class="item-unit-price">$${item.price.toFixed(2)} each</span>
          <div class="item-stock-tag"><i class="fa-solid fa-circle-check"></i> In Stock</div>
        </div>

        <div class="cart-item-stepper-col">
          <div class="quantity-stepper">
            <button type="button" onclick="updateItemQuantity('${item.id}', ${item.quantity - 1})" aria-label="Decrease">&minus;</button>
            <input type="number" value="${item.quantity}" min="1" max="99" 
                   onchange="updateItemQuantity('${item.id}', parseInt(this.value) || 1)" />
            <button type="button" onclick="updateItemQuantity('${item.id}', ${item.quantity + 1})" aria-label="Increase">&plus;</button>
          </div>
        </div>

        <div class="cart-item-price-col">
          <span class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</span>
          <button class="btn-remove-item" onclick="removeItem('${item.id}')" title="Remove item" aria-label="Remove">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>
    `).join('');
  }

  // Update Free Shipping Progress Bar
  updateShippingMeter(summary);

  // Update Order Summary Breakdown
  updateSummaryBox(summary);
}

// Shipping Meter Update
function updateShippingMeter(summary) {
  const textEl = document.getElementById('free-shipping-text');
  const fillEl = document.getElementById('free-shipping-fill');

  if (!textEl || !fillEl) return;

  if (summary.remainingForFreeShipping <= 0 || (summary.couponCode && Store.COUPONS[summary.couponCode]?.type === 'shipping')) {
    textEl.innerHTML = '<i class="fa-solid fa-circle-check" style="color: var(--accent);"></i> <strong>Congratulations!</strong> You have unlocked <strong>Free Express Shipping!</strong>';
    fillEl.style.width = '100%';
    fillEl.style.backgroundColor = 'var(--accent)';
  } else {
    textEl.innerHTML = `<i class="fa-solid fa-truck-fast"></i> Add <strong>$${summary.remainingForFreeShipping.toFixed(2)}</strong> more to unlock <strong>FREE Express Shipping!</strong>`;
    fillEl.style.width = `${summary.freeShippingProgress}%`;
    fillEl.style.backgroundColor = 'var(--primary)';
  }
}

// Order Summary Update
function updateSummaryBox(summary) {
  const subtotalEl = document.getElementById('summary-subtotal');
  const discountRow = document.getElementById('summary-discount-row');
  const discountValEl = document.getElementById('summary-discount-val');
  const shippingValEl = document.getElementById('summary-shipping-val');
  const taxValEl = document.getElementById('summary-tax-val');
  const finalTotalEl = document.getElementById('summary-final-total');
  const appliedCouponContainer = document.getElementById('applied-coupon-display');

  if (subtotalEl) subtotalEl.textContent = `$${summary.subtotal.toFixed(2)}`;

  // Discount Row
  if (discountRow && discountValEl) {
    if (summary.couponDiscount > 0) {
      discountRow.style.display = 'flex';
      discountValEl.textContent = `-$${summary.couponDiscount.toFixed(2)}`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  // Shipping
  if (shippingValEl) {
    if (summary.shipping === 0) {
      shippingValEl.innerHTML = '<span style="color: var(--accent); font-weight: 700;">FREE</span>';
    } else {
      shippingValEl.textContent = `$${summary.shipping.toFixed(2)}`;
    }
  }

  // Tax
  if (taxValEl) taxValEl.textContent = `$${summary.tax.toFixed(2)}`;

  // Total
  if (finalTotalEl) finalTotalEl.textContent = `$${summary.finalTotal.toFixed(2)}`;

  // Coupon badge
  if (appliedCouponContainer) {
    if (summary.couponCode) {
      appliedCouponContainer.innerHTML = `
        <div class="active-coupon-badge">
          <span><i class="fa-solid fa-tag"></i> <strong>${summary.couponCode}</strong> applied</span>
          <button type="button" onclick="Store.removeCoupon()">&times;</button>
        </div>
      `;
    } else {
      appliedCouponContainer.innerHTML = '';
    }
  }
}

// Coupon input handler
function setupCouponForm() {
  const btn = document.getElementById('apply-coupon-btn');
  const input = document.getElementById('coupon-code-input');

  if (btn && input) {
    btn.addEventListener('click', () => {
      const code = input.value.trim();
      if (code) {
        Store.applyCoupon(code);
        input.value = '';
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        btn.click();
      }
    });
  }
}

// Global actions
window.updateItemQuantity = function(id, qty) {
  if (typeof Store !== 'undefined') {
    Store.updateCartQuantity(id, qty);
  }
};

window.removeItem = function(id) {
  if (typeof Store !== 'undefined') {
    Store.removeFromCart(id);
  }
};

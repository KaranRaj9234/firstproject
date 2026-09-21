/**
 * ShopEase - Orders Page Logic (orders.js)
 * Order history rendering, progress tracking timeline, invoice modal, reordering
 */

document.addEventListener('DOMContentLoaded', () => {
  renderOrders();
});

function renderOrders() {
  if (typeof Store === 'undefined') return;

  const orders = Store.getOrders();
  const container = document.getElementById('orders-list-container');
  const emptyView = document.getElementById('orders-empty-view');

  if (!container || !emptyView) return;

  if (orders.length === 0) {
    emptyView.style.display = 'block';
    container.style.display = 'none';
    return;
  }

  emptyView.style.display = 'none';
  container.style.display = 'block';

  container.innerHTML = orders.map(order => renderSingleOrderCard(order)).join('');
}

function renderSingleOrderCard(order) {
  const formattedDate = new Date(order.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const statusCode = order.statusCode || 1; // 1: Confirmed, 2: Processing, 3: Shipped, 4: Delivered
  let statusClass = 'status-confirmed';
  if (statusCode === 2) statusClass = 'status-processing';
  if (statusCode === 3) statusClass = 'status-shipped';
  if (statusCode === 4) statusClass = 'status-delivered';

  return `
    <div class="order-card" data-order-id="${order.id}">
      <div class="order-card-header">
        <div class="order-meta-group">
          <div class="order-meta-col">
            <span class="lbl">Order ID</span>
            <span class="val">#${order.id}</span>
          </div>
          <div class="order-meta-col">
            <span class="lbl">Date Placed</span>
            <span class="val">${formattedDate}</span>
          </div>
          <div class="order-meta-col">
            <span class="lbl">Total Amount</span>
            <span class="val" style="color: var(--primary);">$${order.total.toFixed(2)}</span>
          </div>
          <div class="order-meta-col">
            <span class="lbl">Payment Method</span>
            <span class="val">${order.paymentMethod}</span>
          </div>
        </div>

        <div>
          <span class="status-pill ${statusClass}">
            <i class="fa-solid fa-circle-dot"></i> ${order.status}
          </span>
        </div>
      </div>

      <!-- Order Tracking Timeline Bar -->
      <div class="order-tracker-bar">
        <div class="tracker-steps">
          <div class="tracker-step ${statusCode >= 1 ? (statusCode === 1 ? 'active' : 'completed') : ''}">
            <div class="step-dot">${statusCode > 1 ? '✓' : '1'}</div>
            <span class="step-text">Placed</span>
          </div>
          <div class="tracker-step ${statusCode >= 2 ? (statusCode === 2 ? 'active' : 'completed') : ''}">
            <div class="step-dot">${statusCode > 2 ? '✓' : '2'}</div>
            <span class="step-text">Processing</span>
          </div>
          <div class="tracker-step ${statusCode >= 3 ? (statusCode === 3 ? 'active' : 'completed') : ''}">
            <div class="step-dot">${statusCode > 3 ? '✓' : '3'}</div>
            <span class="step-text">Shipped</span>
          </div>
          <div class="tracker-step ${statusCode >= 4 ? 'completed' : ''}">
            <div class="step-dot">4</div>
            <span class="step-text">Delivered</span>
          </div>
        </div>
      </div>

      <!-- Items List -->
      <div class="order-items-body">
        ${order.items.map(item => `
          <div class="order-item-entry">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <img src="${item.image}" alt="${item.name}" style="width: 55px; height: 55px; border-radius: var(--radius-sm); object-fit: cover; border: 1px solid var(--border-color);" />
              <div>
                <h5 style="font-size: 0.95rem; font-weight: 700; color: var(--secondary); margin-bottom: 0.2rem;">${item.name}</h5>
                <span style="font-size: 0.8rem; color: var(--text-muted);">Qty: ${item.quantity} &bull; Unit: $${item.price.toFixed(2)}</span>
              </div>
            </div>
            <div style="font-weight: 800; font-size: 1rem; color: var(--secondary);">
              $${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Footer Actions -->
      <div class="order-actions-bar">
        <button class="btn btn-outline btn-sm" onclick="showInvoiceModal('${order.id}')">
          <i class="fa-solid fa-file-invoice"></i> View Invoice
        </button>
        <button class="btn btn-primary btn-sm" onclick="reorderItems('${order.id}')">
          <i class="fa-solid fa-rotate-right"></i> Reorder All
        </button>
      </div>
    </div>
  `;
}

// Reorder functionality
window.reorderItems = function(orderId) {
  if (typeof Store === 'undefined') return;
  const order = Store.getOrderById(orderId);
  if (!order) return;

  order.items.forEach(item => {
    Store.addToCart(item.id, item.quantity, false);
  });

  Store.showToast(`Added ${order.items.length} items from #${order.id} to your cart!`, 'success');
  setTimeout(() => {
    window.location.href = 'cart.html';
  }, 600);
};

// Invoice Modal Viewer
window.showInvoiceModal = function(orderId) {
  if (typeof Store === 'undefined') return;
  const order = Store.getOrderById(orderId);
  if (!order) return;

  let modal = document.getElementById('invoice-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'invoice-modal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  const formattedDate = new Date(order.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  modal.innerHTML = `
    <div class="modal-dialog" style="padding: 2.5rem; max-width: 650px;">
      <button class="modal-close-btn" onclick="document.getElementById('invoice-modal').classList.remove('active')">&times;</button>
      
      <div style="display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 1.5rem; border-bottom: 2px solid var(--border-color); margin-bottom: 1.5rem;">
        <div>
          <div class="brand-logo" style="margin-bottom: 0.5rem;">
            <div class="logo-icon"><i class="fa-solid fa-bag-shopping"></i></div>
            <span>Shop<span class="accent-dot">Ease</span></span>
          </div>
          <p style="font-size: 0.8rem; color: var(--text-muted);">Official Purchase Invoice</p>
        </div>
        <div style="text-align: right;">
          <h3 style="font-size: 1.15rem; color: var(--secondary);">Invoice #${order.id}</h3>
          <span style="font-size: 0.85rem; color: var(--text-muted);">${formattedDate}</span>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
        <div>
          <h5 style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.35rem;">Billed & Shipped To:</h5>
          <strong style="display: block; font-size: 0.95rem; color: var(--secondary);">${order.shippingAddress.fullName}</strong>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4;">
            ${order.shippingAddress.address}<br/>
            ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.pinCode}<br/>
            ${order.shippingAddress.phone}
          </p>
        </div>
        <div style="text-align: right;">
          <h5 style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.35rem;">Payment Information:</h5>
          <strong style="display: block; font-size: 0.95rem; color: var(--secondary);">${order.paymentMethod}</strong>
          <span style="display: inline-block; background: #dcfce7; color: #15803d; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: var(--radius-full); margin-top: 0.3rem;">
            ${order.paymentStatus}
          </span>
        </div>
      </div>

      <!-- Items Table -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem;">
        <thead>
          <tr style="border-bottom: 1.5px solid var(--border-color); font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); text-align: left;">
            <th style="padding: 0.5rem 0;">Item</th>
            <th style="padding: 0.5rem; text-align: center;">Qty</th>
            <th style="padding: 0.5rem; text-align: right;">Price</th>
            <th style="padding: 0.5rem 0; text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${order.items.map(item => `
            <tr style="border-bottom: 1px solid var(--border-color); font-size: 0.875rem;">
              <td style="padding: 0.75rem 0; color: var(--secondary); font-weight: 600;">${item.name}</td>
              <td style="padding: 0.75rem; text-align: center; color: var(--text-muted);">${item.quantity}</td>
              <td style="padding: 0.75rem; text-align: right; color: var(--text-muted);">$${item.price.toFixed(2)}</td>
              <td style="padding: 0.75rem 0; text-align: right; font-weight: 700; color: var(--secondary);">$${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- Total Breakdown -->
      <div style="max-width: 280px; margin-left: auto; font-size: 0.875rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
          <span style="color: var(--text-muted);">Subtotal:</span>
          <span>$${order.subtotal.toFixed(2)}</span>
        </div>
        ${order.discount > 0 ? `
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; color: #16a34a; font-weight: 600;">
            <span>Discount:</span>
            <span>-$${order.discount.toFixed(2)}</span>
          </div>
        ` : ''}
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
          <span style="color: var(--text-muted);">Shipping:</span>
          <span>${order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
          <span style="color: var(--text-muted);">Tax (8%):</span>
          <span>$${order.tax.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 1.15rem; font-weight: 800; color: var(--primary); padding-top: 0.5rem; border-top: 1.5px dashed var(--border-color); margin-top: 0.5rem;">
          <span>Total:</span>
          <span>$${order.total.toFixed(2)}</span>
        </div>
      </div>

      <div style="text-align: center; margin-top: 2rem;">
        <button class="btn btn-secondary btn-sm" onclick="window.print()">
          <i class="fa-solid fa-print"></i> Print Invoice
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');

  modal.onclick = (e) => {
    if (e.target === modal) modal.classList.remove('active');
  };
};

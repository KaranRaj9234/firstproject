/**
 * ShopEase - Unified State & LocalStorage Store
 * Handles Cart, Wishlist, Orders, Auth, and Toast Notifications
 */

const Store = {
  // --- KEYS ---
  CART_KEY: 'shopease_cart',
  WISHLIST_KEY: 'shopease_wishlist',
  ORDERS_KEY: 'shopease_orders',
  AUTH_KEY: 'shopease_user',
  APPLIED_COUPON_KEY: 'shopease_coupon',

  // Config
  FREE_SHIPPING_THRESHOLD: 50.00,
  STANDARD_SHIPPING_FEE: 4.99,
  TAX_RATE: 0.08, // 8%

  COUPONS: {
    'SAVE10': { type: 'percent', value: 10, label: '10% OFF' },
    'SHOPEASE20': { type: 'percent', value: 20, label: '20% OFF Special' },
    'FREESHIP': { type: 'shipping', value: 100, label: 'Free Shipping' }
  },

  // ===================== CART =====================
  getCart() {
    try {
      const data = localStorage.getItem(this.CART_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading cart', e);
      return [];
    }
  },

  saveCart(cart) {
    try {
      localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
      this.notifyCartChanged();
    } catch (e) {
      console.error('Error saving cart', e);
    }
  },

  addToCart(productId, quantity = 1, showToastNotification = true) {
    const product = (typeof PRODUCTS !== 'undefined') 
      ? PRODUCTS.find(p => p.id === productId) 
      : null;

    if (!product) {
      this.showToast('Product not found!', 'danger');
      return false;
    }

    const cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.discountPrice,
        originalPrice: product.originalPrice,
        image: product.image,
        quantity: quantity,
        maxStock: product.stock
      });
    }

    this.saveCart(cart);

    if (showToastNotification) {
      this.showToast(`"${product.name.substring(0, 28)}..." added to cart!`, 'success');
    }
    return true;
  },

  updateCartQuantity(productId, quantity) {
    let cart = this.getCart();
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const item = cart.find(i => i.id === productId);
    if (item) {
      item.quantity = Math.min(quantity, item.maxStock || 99);
      this.saveCart(cart);
    }
  },

  removeFromCart(productId) {
    let cart = this.getCart();
    const item = cart.find(i => i.id === productId);
    cart = cart.filter(i => i.id !== productId);
    this.saveCart(cart);
    if (item) {
      this.showToast(`Removed "${item.name.substring(0, 24)}..." from cart`, 'info');
    }
  },

  clearCart() {
    localStorage.removeItem(this.CART_KEY);
    localStorage.removeItem(this.APPLIED_COUPON_KEY);
    this.notifyCartChanged();
  },

  getCartCount() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  getCartSummary() {
    const cart = this.getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const originalSubtotal = cart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
    const savings = Math.max(0, originalSubtotal - subtotal);

    // Coupon logic
    const couponCode = this.getAppliedCoupon();
    let couponDiscount = 0;
    let couponInfo = null;

    if (couponCode && this.COUPONS[couponCode]) {
      couponInfo = this.COUPONS[couponCode];
      if (couponInfo.type === 'percent') {
        couponDiscount = (subtotal * couponInfo.value) / 100;
      }
    }

    // Shipping logic
    let shipping = subtotal >= this.FREE_SHIPPING_THRESHOLD || (couponInfo && couponInfo.type === 'shipping')
      ? 0
      : (subtotal > 0 ? this.STANDARD_SHIPPING_FEE : 0);

    const discountedSubtotal = Math.max(0, subtotal - couponDiscount);
    const tax = discountedSubtotal * this.TAX_RATE;
    const finalTotal = discountedSubtotal + shipping + tax;

    const remainingForFreeShipping = Math.max(0, this.FREE_SHIPPING_THRESHOLD - subtotal);
    const freeShippingProgress = Math.min(100, Math.round((subtotal / this.FREE_SHIPPING_THRESHOLD) * 100));

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      originalSubtotal: parseFloat(originalSubtotal.toFixed(2)),
      productSavings: parseFloat(savings.toFixed(2)),
      couponCode,
      couponDiscount: parseFloat(couponDiscount.toFixed(2)),
      totalSavings: parseFloat((savings + couponDiscount).toFixed(2)),
      shipping: parseFloat(shipping.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      finalTotal: parseFloat(finalTotal.toFixed(2)),
      itemCount: this.getCartCount(),
      remainingForFreeShipping: parseFloat(remainingForFreeShipping.toFixed(2)),
      freeShippingProgress
    };
  },

  applyCoupon(code) {
    const cleanCode = code ? code.trim().toUpperCase() : '';
    if (this.COUPONS[cleanCode]) {
      localStorage.setItem(this.APPLIED_COUPON_KEY, cleanCode);
      this.showToast(`Coupon "${cleanCode}" applied successfully!`, 'success');
      this.notifyCartChanged();
      return { success: true, coupon: this.COUPONS[cleanCode] };
    } else {
      this.showToast('Invalid coupon code. Try SAVE10 or SHOPEASE20', 'danger');
      return { success: false, message: 'Invalid coupon code' };
    }
  },

  removeCoupon() {
    localStorage.removeItem(this.APPLIED_COUPON_KEY);
    this.showToast('Coupon removed', 'info');
    this.notifyCartChanged();
  },

  getAppliedCoupon() {
    return localStorage.getItem(this.APPLIED_COUPON_KEY) || null;
  },

  notifyCartChanged() {
    window.dispatchEvent(new CustomEvent('shopease:cart-updated', { detail: this.getCartSummary() }));
    this.updateBadges();
  },

  // ===================== WISHLIST =====================
  getWishlist() {
    try {
      const data = localStorage.getItem(this.WISHLIST_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  isInWishlist(productId) {
    const list = this.getWishlist();
    return list.includes(productId);
  },

  toggleWishlist(productId) {
    let list = this.getWishlist();
    const product = (typeof PRODUCTS !== 'undefined') ? PRODUCTS.find(p => p.id === productId) : null;
    const name = product ? product.name.substring(0, 24) : 'Item';

    if (list.includes(productId)) {
      list = list.filter(id => id !== productId);
      localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(list));
      this.showToast(`"${name}..." removed from wishlist`, 'info');
    } else {
      list.push(productId);
      localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(list));
      this.showToast(`"${name}..." added to your wishlist!`, 'success');
    }

    window.dispatchEvent(new CustomEvent('shopease:wishlist-updated', { detail: { count: list.length } }));
    this.updateBadges();
    return this.isInWishlist(productId);
  },

  getWishlistCount() {
    return this.getWishlist().length;
  },

  // ===================== ORDERS =====================
  getOrders() {
    try {
      const data = localStorage.getItem(this.ORDERS_KEY);
      if (!data) {
        // Populate sample past orders for an authentic look on first load
        const demoOrders = this.createDemoOrders();
        localStorage.setItem(this.ORDERS_KEY, JSON.stringify(demoOrders));
        return demoOrders;
      }
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  },

  createDemoOrders() {
    return [
      {
        id: "SE-92418",
        date: "2026-09-15T10:30:00Z",
        status: "Delivered",
        statusCode: 4,
        shippingAddress: {
          fullName: "Alex Morgan",
          email: "alex.morgan@example.com",
          phone: "+1 (555) 234-5678",
          address: "742 Evergreen Terrace, Apt 4B",
          city: "Springfield",
          state: "OR",
          pinCode: "97477"
        },
        paymentMethod: "Credit Card (Mock)",
        paymentStatus: "Paid",
        items: [
          {
            id: "prod-el-1",
            name: "Sony WH-1000XM5 Wireless Headphones",
            price: 329.99,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=80"
          },
          {
            id: "prod-bk-3",
            name: "Atomic Habits: Proven Way to Build Good Habits",
            price: 18.90,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&q=80"
          }
        ],
        subtotal: 348.89,
        discount: 34.89,
        shipping: 0.00,
        tax: 25.12,
        total: 339.12
      }
    ];
  },

  createOrder(orderData) {
    const orders = this.getOrders();
    const newOrder = {
      id: "SE-" + Math.floor(10000 + Math.random() * 90000),
      date: new Date().toISOString(),
      status: "Confirmed",
      statusCode: 1, // 1: Confirmed, 2: Processing, 3: Shipped, 4: Delivered
      ...orderData
    };

    orders.unshift(newOrder);
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
    this.clearCart();
    return newOrder;
  },

  getOrderById(id) {
    const orders = this.getOrders();
    return orders.find(o => o.id === id) || null;
  },

  // ===================== AUTH =====================
  getCurrentUser() {
    try {
      const data = localStorage.getItem(this.AUTH_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  login(email, name = 'Alex Morgan') {
    const user = {
      email,
      name: name || email.split('@')[0],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
      joinedDate: '2026-09-01'
    };
    localStorage.setItem(this.AUTH_KEY, JSON.stringify(user));
    this.showToast(`Welcome back, ${user.name}!`, 'success');
    window.dispatchEvent(new CustomEvent('shopease:auth-changed', { detail: user }));
    this.updateBadges();
    return user;
  },

  logout() {
    localStorage.removeItem(this.AUTH_KEY);
    this.showToast('You have been logged out.', 'info');
    window.dispatchEvent(new CustomEvent('shopease:auth-changed', { detail: null }));
    this.updateBadges();
  },

  // ===================== TOAST NOTIFICATIONS =====================
  showToast(message, type = 'success') {
    let container = document.getElementById('shopease-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'shopease-toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    
    let iconClass = 'fa-circle-check';
    if (type === 'danger') iconClass = 'fa-circle-xmark';
    if (type === 'info') iconClass = 'fa-circle-info';
    if (type === 'warning') iconClass = 'fa-triangle-exclamation';

    toast.innerHTML = `
      <i class="fa-solid ${iconClass}"></i>
      <div class="toast-content">${message}</div>
      <button class="toast-close" aria-label="Close">&times;</button>
    `;

    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 300);
    });

    container.appendChild(toast);

    // Auto dismiss
    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
      }
    }, 3800);
  },

  // ===================== UI BADGE SYNC =====================
  updateBadges() {
    const cartBadges = document.querySelectorAll('.cart-count-badge');
    const count = this.getCartCount();
    cartBadges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    });

    const wishlistBadges = document.querySelectorAll('.wishlist-count-badge');
    const wishCount = this.getWishlistCount();
    wishlistBadges.forEach(badge => {
      badge.textContent = wishCount;
      badge.style.display = wishCount > 0 ? 'inline-flex' : 'none';
    });

    // Auth status update in nav
    const user = this.getCurrentUser();
    const authLinks = document.querySelectorAll('.nav-auth-slot');
    authLinks.forEach(slot => {
      if (user) {
        slot.innerHTML = `
          <a href="orders.html" class="nav-user-btn" title="View Account & Orders">
            <i class="fa-regular fa-user"></i>
            <span class="user-greeting">Hi, ${user.name.split(' ')[0]}</span>
          </a>
        `;
      } else {
        slot.innerHTML = `
          <a href="login.html" class="btn btn-outline-nav btn-sm">
            <i class="fa-regular fa-user"></i> Login
          </a>
        `;
      }
    });
  }
};

// Initialize badges on load
document.addEventListener('DOMContentLoaded', () => {
  Store.updateBadges();
});

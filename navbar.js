/**
 * ShopEase - Shared Navigation, Mobile Drawer & Global UI Helpers
 */

// Helper to generate standard Product Card HTML
function createProductCardHTML(product) {
  const isWish = typeof Store !== 'undefined' ? Store.isInWishlist(product.id) : false;
  
  let badgeHTML = '';
  if (product.discountPercent > 15) {
    badgeHTML += `<span class="badge-tag badge-discount">-${product.discountPercent}%</span>`;
  }
  if (product.isBestSeller) {
    badgeHTML += `<span class="badge-tag badge-bestseller">Best Seller</span>`;
  } else if (product.isNew) {
    badgeHTML += `<span class="badge-tag badge-new">New Arrival</span>`;
  }

  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image-container">
        <a href="product-detail.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
        </a>
        <div class="card-badges">
          ${badgeHTML}
        </div>
        <button class="btn-wishlist ${isWish ? 'active' : ''}" 
                onclick="event.stopPropagation(); window.toggleWishlist('${product.id}')"
                aria-label="Save to Wishlist" 
                title="Add to Wishlist">
          <i class="${isWish ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>
      </div>

      <div class="product-card-body">
        <div class="product-card-meta">
          <span class="product-category-label">${product.categoryName}</span>
          <div class="product-rating">
            <i class="fa-solid fa-star"></i>
            <span>${product.rating}</span>
            <span class="count">(${product.reviewCount})</span>
          </div>
        </div>

        <h3 class="product-title">
          <a href="product-detail.html?id=${product.id}" title="${product.name}">${product.name}</a>
        </h3>

        <div class="product-pricing">
          <span class="price-current">$${product.discountPrice.toFixed(2)}</span>
          <span class="price-original">$${product.originalPrice.toFixed(2)}</span>
          <span class="price-discount-pill">Save ${(product.originalPrice - product.discountPrice).toFixed(0)}$</span>
        </div>

        <div class="product-card-actions">
          <button class="btn btn-outline btn-sm" onclick="window.addToCart('${product.id}')">
            <i class="fa-solid fa-cart-plus"></i> Cart
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.buyNow('${product.id}')">
            <i class="fa-solid fa-bolt"></i> Buy Now
          </button>
        </div>
      </div>
    </div>
  `;
}

// Global action delegates
window.addToCart = function(productId, qty = 1) {
  if (typeof Store !== 'undefined') {
    Store.addToCart(productId, qty);
  }
};

window.buyNow = function(productId) {
  if (typeof Store !== 'undefined') {
    Store.addToCart(productId, 1, false);
    window.location.href = 'checkout.html';
  }
};

window.toggleWishlist = function(productId) {
  if (typeof Store !== 'undefined') {
    const isNowInWish = Store.toggleWishlist(productId);
    // Update all matching wishlist heart buttons on the page
    document.querySelectorAll(`.product-card[data-id="${productId}"] .btn-wishlist`).forEach(btn => {
      if (isNowInWish) {
        btn.classList.add('active');
        btn.innerHTML = '<i class="fa-solid fa-heart"></i>';
      } else {
        btn.classList.remove('active');
        btn.innerHTML = '<i class="fa-regular fa-heart"></i>';
      }
    });
  }
};

// Setup search bar submission
function setupSearchInputs() {
  const searchForms = document.querySelectorAll('.nav-search-form');
  searchForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (input && input.value.trim()) {
        window.location.href = `products.html?search=${encodeURIComponent(input.value.trim())}`;
      }
    });
  });
}

// Setup Mobile Drawer
function setupMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
  const closeBtn = document.querySelector('.mobile-drawer-close');

  if (toggleBtn && drawerOverlay) {
    toggleBtn.addEventListener('click', () => {
      drawerOverlay.classList.add('active');
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        drawerOverlay.classList.remove('active');
      });
    }

    drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) {
        drawerOverlay.classList.remove('active');
      }
    });
  }
}

// Highlight current page active link
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-drawer-links a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupSearchInputs();
  setupMobileMenu();
  highlightActiveNav();
});

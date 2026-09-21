/**
 * ShopEase - Single Product Detail Page (product-detail.js)
 * Dynamic data rendering, thumbnail gallery, quantity controls, and related items
 */

let currentProduct = null;
let selectedQuantity = 1;

document.addEventListener('DOMContentLoaded', () => {
  loadProductDetails();
});

function loadProductDetails() {
  if (typeof PRODUCTS === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id') || PRODUCTS[0].id;

  currentProduct = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

  renderProductDetailsDOM();
  renderRelatedProducts();
}

function renderProductDetailsDOM() {
  if (!currentProduct) return;

  // Title & Document Title
  document.title = `${currentProduct.name} | ShopEase`;

  // Breadcrumbs
  const breadcrumbCat = document.getElementById('breadcrumb-category');
  const breadcrumbTitle = document.getElementById('breadcrumb-title');
  if (breadcrumbCat) {
    breadcrumbCat.textContent = currentProduct.categoryName;
    breadcrumbCat.href = `products.html?category=${currentProduct.category}`;
  }
  if (breadcrumbTitle) {
    breadcrumbTitle.textContent = currentProduct.name;
  }

  // Gallery
  const mainImg = document.getElementById('detail-main-img');
  const thumbsContainer = document.getElementById('gallery-thumbnails');
  if (mainImg) {
    mainImg.src = currentProduct.image;
    mainImg.alt = currentProduct.name;
  }

  if (thumbsContainer) {
    const images = currentProduct.images && currentProduct.images.length > 0 
      ? currentProduct.images 
      : [currentProduct.image];

    thumbsContainer.innerHTML = images.map((imgSrc, idx) => `
      <div class="thumb-item ${idx === 0 ? 'active' : ''}" onclick="switchPreviewImage('${imgSrc}', this)">
        <img src="${imgSrc}" alt="${currentProduct.name} preview ${idx+1}" />
      </div>
    `).join('');
  }

  // Info details
  const catBadge = document.getElementById('detail-cat-badge');
  if (catBadge) catBadge.textContent = currentProduct.categoryName;

  const titleEl = document.getElementById('detail-title');
  if (titleEl) titleEl.textContent = currentProduct.name;

  const ratingVal = document.getElementById('detail-rating-val');
  if (ratingVal) ratingVal.textContent = currentProduct.rating;

  const reviewCount = document.getElementById('detail-reviews-count');
  if (reviewCount) reviewCount.textContent = `(${currentProduct.reviewCount} customer reviews)`;

  const stockStatus = document.getElementById('detail-stock-status');
  if (stockStatus) {
    stockStatus.innerHTML = `<i class="fa-solid fa-circle-check"></i> In Stock (${currentProduct.stock} units left)`;
  }

  // Pricing
  const curPrice = document.getElementById('detail-current-price');
  if (curPrice) curPrice.textContent = `$${currentProduct.discountPrice.toFixed(2)}`;

  const origPrice = document.getElementById('detail-original-price');
  if (origPrice) origPrice.textContent = `$${currentProduct.originalPrice.toFixed(2)}`;

  const saveTag = document.getElementById('detail-save-tag');
  if (saveTag) {
    const savings = currentProduct.originalPrice - currentProduct.discountPrice;
    saveTag.textContent = `Save $${savings.toFixed(2)} (${currentProduct.discountPercent}% OFF)`;
  }

  const descEl = document.getElementById('detail-description');
  if (descEl) descEl.textContent = currentProduct.description;

  // Features
  const featuresList = document.getElementById('detail-features-list');
  if (featuresList && currentProduct.features) {
    featuresList.innerHTML = currentProduct.features.map(f => `
      <li><i class="fa-solid fa-circle-check"></i> <span>${f}</span></li>
    `).join('');
  }

  // Specs Table
  const specsTable = document.getElementById('detail-specs-table');
  if (specsTable && currentProduct.specs) {
    specsTable.innerHTML = Object.entries(currentProduct.specs).map(([k, v]) => `
      <tr>
        <td class="spec-name">${k}</td>
        <td class="spec-val">${v}</td>
      </tr>
    `).join('');
  }

  // Wishlist button state
  syncWishlistBtnState();

  // Quantity Stepper setup
  setupQuantityStepper();
}

// Switch main preview image
window.switchPreviewImage = function(src, thumbElement) {
  const mainImg = document.getElementById('detail-main-img');
  if (mainImg) mainImg.src = src;

  document.querySelectorAll('.thumb-item').forEach(el => el.classList.remove('active'));
  if (thumbElement) thumbElement.classList.add('active');
};

// Quantity Stepper
function setupQuantityStepper() {
  const minusBtn = document.getElementById('qty-minus');
  const plusBtn = document.getElementById('qty-plus');
  const inputEl = document.getElementById('qty-input');

  if (!minusBtn || !plusBtn || !inputEl) return;

  minusBtn.onclick = () => {
    if (selectedQuantity > 1) {
      selectedQuantity--;
      inputEl.value = selectedQuantity;
    }
  };

  plusBtn.onclick = () => {
    if (selectedQuantity < (currentProduct.stock || 50)) {
      selectedQuantity++;
      inputEl.value = selectedQuantity;
    }
  };

  inputEl.onchange = () => {
    let val = parseInt(inputEl.value) || 1;
    val = Math.max(1, Math.min(val, currentProduct.stock || 50));
    selectedQuantity = val;
    inputEl.value = selectedQuantity;
  };
}

// Add to Cart handler
window.addCurrentProductToCart = function() {
  if (!currentProduct || typeof Store === 'undefined') return;
  Store.addToCart(currentProduct.id, selectedQuantity);
};

// Buy Now handler
window.buyCurrentProductNow = function() {
  if (!currentProduct || typeof Store === 'undefined') return;
  Store.addToCart(currentProduct.id, selectedQuantity, false);
  window.location.href = 'checkout.html';
};

// Toggle Wishlist for current product
window.toggleCurrentWishlist = function() {
  if (!currentProduct || typeof Store === 'undefined') return;
  Store.toggleWishlist(currentProduct.id);
  syncWishlistBtnState();
};

function syncWishlistBtnState() {
  const btn = document.getElementById('detail-wishlist-btn');
  if (!btn || !currentProduct || typeof Store === 'undefined') return;

  const inWish = Store.isInWishlist(currentProduct.id);
  if (inWish) {
    btn.classList.add('active');
    btn.innerHTML = '<i class="fa-solid fa-heart"></i>';
    btn.title = 'Remove from Wishlist';
  } else {
    btn.classList.remove('active');
    btn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    btn.title = 'Save to Wishlist';
  }
}

// Related Products Carousel / Grid
function renderRelatedProducts() {
  if (!currentProduct || typeof PRODUCTS === 'undefined' || typeof createProductCardHTML !== 'function') return;

  const container = document.getElementById('related-products-grid');
  if (!container) return;

  // Products from same category, excluding current
  let related = PRODUCTS.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id);
  if (related.length < 4) {
    // Fill up with other featured products
    const extras = PRODUCTS.filter(p => p.id !== currentProduct.id && !related.includes(p));
    related = related.concat(extras).slice(0, 4);
  } else {
    related = related.slice(0, 4);
  }

  container.innerHTML = related.map(p => createProductCardHTML(p)).join('');
}

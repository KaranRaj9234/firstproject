/**
 * ShopEase - Products Catalog Page Logic (products.js)
 * Search, Category Filtering, Price Slider, Rating Filter, Sorting, Quick View
 */

let activeFilters = {
  search: '',
  categories: [],
  maxPrice: 800,
  minRating: 0,
  sortBy: 'featured',
  specialFilter: null // 'deals', 'wishlist'
};

document.addEventListener('DOMContentLoaded', () => {
  parseURLParams();
  setupFilterEventListeners();
  renderProducts();
});

// Parse query params like ?search=shoes or ?category=electronics or ?filter=deals
function parseURLParams() {
  const params = new URLSearchParams(window.location.search);
  
  if (params.has('search')) {
    activeFilters.search = params.get('search');
    const searchInputs = document.querySelectorAll('.catalog-search-input, .nav-search-form input');
    searchInputs.forEach(input => input.value = activeFilters.search);
  }

  if (params.has('category')) {
    const cat = params.get('category');
    activeFilters.categories = [cat];
    const checkbox = document.querySelector(`.filter-category-checkbox[value="${cat}"]`);
    if (checkbox) checkbox.checked = true;
  }

  if (params.has('filter')) {
    activeFilters.specialFilter = params.get('filter');
  }

  if (params.has('sort')) {
    activeFilters.sortBy = params.get('sort');
    const sortSelect = document.getElementById('catalog-sort-select');
    if (sortSelect) sortSelect.value = activeFilters.sortBy;
  }
}

// Event Listeners for Filter Controls
function setupFilterEventListeners() {
  // Category checkboxes
  const catCheckboxes = document.querySelectorAll('.filter-category-checkbox');
  catCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const selected = Array.from(catCheckboxes)
        .filter(c => c.checked)
        .map(c => c.value);
      activeFilters.categories = selected;
      renderProducts();
    });
  });

  // Price Range Slider
  const priceSlider = document.getElementById('price-range-slider');
  const priceDisplay = document.getElementById('price-range-display');
  if (priceSlider && priceDisplay) {
    priceSlider.addEventListener('input', (e) => {
      activeFilters.maxPrice = parseFloat(e.target.value);
      priceDisplay.textContent = `$${activeFilters.maxPrice}`;
      renderProducts();
    });
  }

  // Rating Radios
  const ratingRadios = document.querySelectorAll('input[name="filter-rating"]');
  ratingRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      activeFilters.minRating = parseFloat(e.target.value);
      renderProducts();
    });
  });

  // Sort Dropdown
  const sortSelect = document.getElementById('catalog-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeFilters.sortBy = e.target.value;
      renderProducts();
    });
  }

  // Live Catalog Search Input
  const catalogSearchInput = document.getElementById('catalog-search-input');
  if (catalogSearchInput) {
    catalogSearchInput.addEventListener('input', (e) => {
      activeFilters.search = e.target.value.trim();
      renderProducts();
    });
  }

  // Clear All Filters Button
  const clearBtn = document.getElementById('clear-filters-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', resetAllFilters);
  }

  // Mobile Filter Drawer Toggle
  const mobileFilterBtn = document.getElementById('mobile-filter-btn');
  const filtersSidebar = document.querySelector('.filters-sidebar');
  const closeFilterBtn = document.getElementById('close-mobile-filter');
  
  if (mobileFilterBtn && filtersSidebar) {
    mobileFilterBtn.addEventListener('click', () => {
      filtersSidebar.classList.add('mobile-open');
    });
    if (closeFilterBtn) {
      closeFilterBtn.addEventListener('click', () => {
        filtersSidebar.classList.remove('mobile-open');
      });
    }
  }
}

// Reset Filters
function resetAllFilters() {
  activeFilters = {
    search: '',
    categories: [],
    maxPrice: 800,
    minRating: 0,
    sortBy: 'featured',
    specialFilter: null
  };

  // Reset inputs
  document.querySelectorAll('.filter-category-checkbox').forEach(cb => cb.checked = false);
  
  const priceSlider = document.getElementById('price-range-slider');
  const priceDisplay = document.getElementById('price-range-display');
  if (priceSlider) priceSlider.value = 800;
  if (priceDisplay) priceDisplay.textContent = '$800';

  const defaultRating = document.querySelector('input[name="filter-rating"][value="0"]');
  if (defaultRating) defaultRating.checked = true;

  const catalogSearch = document.getElementById('catalog-search-input');
  if (catalogSearch) catalogSearch.value = '';

  const sortSelect = document.getElementById('catalog-sort-select');
  if (sortSelect) sortSelect.value = 'featured';

  // Update URL history without page reload
  window.history.replaceState({}, '', 'products.html');

  renderProducts();
}

// Render Products Grid & Chips
function renderProducts() {
  if (typeof PRODUCTS === 'undefined') return;

  const container = document.getElementById('catalog-products-grid');
  const countEl = document.getElementById('catalog-results-count');
  const chipsContainer = document.getElementById('active-filter-chips');
  const emptyState = document.getElementById('catalog-empty-state');

  if (!container) return;

  // Filter pipeline
  let filtered = PRODUCTS.filter(product => {
    // Search query
    if (activeFilters.search) {
      const q = activeFilters.search.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchCat = product.categoryName.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat) return false;
    }

    // Category filter
    if (activeFilters.categories.length > 0) {
      if (!activeFilters.categories.includes(product.category)) return false;
    }

    // Max Price
    if (product.discountPrice > activeFilters.maxPrice) {
      return false;
    }

    // Min Rating
    if (product.rating < activeFilters.minRating) {
      return false;
    }

    // Special Filters
    if (activeFilters.specialFilter === 'deals') {
      if (!product.isDeal && product.discountPercent < 20) return false;
    } else if (activeFilters.specialFilter === 'wishlist') {
      const isWish = typeof Store !== 'undefined' ? Store.isInWishlist(product.id) : false;
      if (!isWish) return false;
    }

    return true;
  });

  // Sorting pipeline
  filtered.sort((a, b) => {
    switch (activeFilters.sortBy) {
      case 'price-low':
        return a.discountPrice - b.discountPrice;
      case 'price-high':
        return b.discountPrice - a.discountPrice;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case 'featured':
      default:
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }
  });

  // Update counts
  if (countEl) {
    countEl.innerHTML = `Showing <strong>${filtered.length}</strong> of ${PRODUCTS.length} products`;
  }

  // Render Active Filter Chips
  renderFilterChips(chipsContainer);

  // Render Grid or Empty State
  if (filtered.length === 0) {
    container.style.display = 'none';
    if (emptyState) emptyState.style.display = 'block';
  } else {
    container.style.display = 'grid';
    if (emptyState) emptyState.style.display = 'none';
    container.innerHTML = filtered.map(p => createProductCardHTML(p)).join('');
  }
}

// Render active filter chips
function renderFilterChips(container) {
  if (!container) return;

  let chips = [];

  if (activeFilters.search) {
    chips.push({
      label: `Search: "${activeFilters.search}"`,
      remove: () => {
        activeFilters.search = '';
        const input = document.getElementById('catalog-search-input');
        if (input) input.value = '';
        renderProducts();
      }
    });
  }

  activeFilters.categories.forEach(catId => {
    const catObj = typeof CATEGORIES_DATA !== 'undefined' ? CATEGORIES_DATA.find(c => c.id === catId) : null;
    const catName = catObj ? catObj.name : catId;
    chips.push({
      label: `Category: ${catName}`,
      remove: () => {
        activeFilters.categories = activeFilters.categories.filter(c => c !== catId);
        const cb = document.querySelector(`.filter-category-checkbox[value="${catId}"]`);
        if (cb) cb.checked = false;
        renderProducts();
      }
    });
  });

  if (activeFilters.maxPrice < 800) {
    chips.push({
      label: `Under $${activeFilters.maxPrice}`,
      remove: () => {
        activeFilters.maxPrice = 800;
        const slider = document.getElementById('price-range-slider');
        const display = document.getElementById('price-range-display');
        if (slider) slider.value = 800;
        if (display) display.textContent = '$800';
        renderProducts();
      }
    });
  }

  if (activeFilters.minRating > 0) {
    chips.push({
      label: `${activeFilters.minRating}★ & Above`,
      remove: () => {
        activeFilters.minRating = 0;
        const defaultRadio = document.querySelector('input[name="filter-rating"][value="0"]');
        if (defaultRadio) defaultRadio.checked = true;
        renderProducts();
      }
    });
  }

  if (activeFilters.specialFilter) {
    chips.push({
      label: activeFilters.specialFilter === 'deals' ? 'Special: Hot Deals' : 'Special: Wishlist Only',
      remove: () => {
        activeFilters.specialFilter = null;
        renderProducts();
      }
    });
  }

  if (chips.length === 0) {
    container.innerHTML = '';
    return;
  }

  window.removeChip = function(index) {
    if (chips[index]) chips[index].remove();
  };

  container.innerHTML = chips.map((chip, idx) => `
    <span class="filter-chip">
      ${chip.label}
      <button onclick="window.removeChip(${idx})" aria-label="Remove filter">&times;</button>
    </span>
  `).join('');
}

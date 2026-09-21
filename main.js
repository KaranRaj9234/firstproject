/**
 * ShopEase - Home Page Scripts (main.js)
 * Deal of the Day Timer, Category rendering, Featured/New/Best Seller Grids
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdownTimer();
  renderHomeProducts();
  renderHomeCategories();
});

// Countdown Timer for Deal of the Day
function initCountdownTimer() {
  const hoursEl = document.getElementById('deal-hours');
  const minsEl = document.getElementById('deal-mins');
  const secsEl = document.getElementById('deal-secs');

  if (!hoursEl || !minsEl || !secsEl) return;

  // Set deal target to midnight or 14 hours ahead
  let remainingSeconds = 14 * 3600 + 45 * 60 + 20;

  function updateTimer() {
    if (remainingSeconds <= 0) {
      remainingSeconds = 24 * 3600; // Reset
    }

    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(minutes).padStart(2, '0');
    secsEl.textContent = String(seconds).padStart(2, '0');

    remainingSeconds--;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// Render dynamic product sections on Home
function renderHomeProducts() {
  if (typeof PRODUCTS === 'undefined' || typeof createProductCardHTML !== 'function') return;

  // Featured Grid
  const featuredContainer = document.getElementById('featured-products-grid');
  if (featuredContainer) {
    const featuredList = PRODUCTS.filter(p => p.isFeatured).slice(0, 4);
    featuredContainer.innerHTML = featuredList.map(p => createProductCardHTML(p)).join('');
  }

  // New Arrivals Grid
  const newArrivalsContainer = document.getElementById('new-arrivals-grid');
  if (newArrivalsContainer) {
    const newList = PRODUCTS.filter(p => p.isNew).slice(0, 4);
    newArrivalsContainer.innerHTML = newList.map(p => createProductCardHTML(p)).join('');
  }

  // Best Sellers Grid
  const bestSellersContainer = document.getElementById('best-sellers-grid');
  if (bestSellersContainer) {
    const bestList = PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);
    bestSellersContainer.innerHTML = bestList.map(p => createProductCardHTML(p)).join('');
  }
}

// Render Home Categories Cards
function renderHomeCategories() {
  if (typeof CATEGORIES_DATA === 'undefined') return;

  const container = document.getElementById('home-categories-grid');
  if (!container) return;

  container.innerHTML = CATEGORIES_DATA.map(cat => `
    <a href="products.html?category=${cat.id}" class="category-card">
      <div class="icon-wrapper">
        <i class="fa-solid ${cat.icon}"></i>
      </div>
      <h3>${cat.name}</h3>
      <span>${cat.itemCount} Items</span>
    </a>
  `).join('');
}

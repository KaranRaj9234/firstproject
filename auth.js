/**
 * ShopEase - Authentication Page Logic (auth.js)
 * Tab switching (Sign In vs Sign Up), Demo quick-fill, user state sync
 */

document.addEventListener('DOMContentLoaded', () => {
  checkAuthState();
  setupAuthTabs();
  setupAuthForms();
});

function checkAuthState() {
  if (typeof Store === 'undefined') return;

  const user = Store.getCurrentUser();
  const authCard = document.getElementById('auth-card-view');
  const loggedInCard = document.getElementById('logged-in-view');

  if (!authCard || !loggedInCard) return;

  if (user) {
    authCard.style.display = 'none';
    loggedInCard.style.display = 'block';

    const userNameEl = document.getElementById('profile-user-name');
    const userEmailEl = document.getElementById('profile-user-email');
    if (userNameEl) userNameEl.textContent = user.name;
    if (userEmailEl) userEmailEl.textContent = user.email;
  } else {
    authCard.style.display = 'block';
    loggedInCard.style.display = 'none';
  }
}

// Tab Switching
function setupAuthTabs() {
  const loginTabBtn = document.getElementById('tab-login-btn');
  const signupTabBtn = document.getElementById('tab-signup-btn');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  if (!loginTabBtn || !signupTabBtn || !loginForm || !signupForm) return;

  loginTabBtn.onclick = () => {
    loginTabBtn.classList.add('active');
    signupTabBtn.classList.remove('active');
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
  };

  signupTabBtn.onclick = () => {
    signupTabBtn.classList.add('active');
    loginTabBtn.classList.remove('active');
    signupForm.style.display = 'block';
    loginForm.style.display = 'none';
  };
}

// Setup Auth Forms
function setupAuthForms() {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  if (loginForm) {
    loginForm.onsubmit = (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      if (email) {
        Store.login(email);
        setTimeout(() => {
          checkAuthState();
        }, 400);
      }
    };
  }

  if (signupForm) {
    signupForm.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById('signup-name').value.trim();
      const email = document.getElementById('signup-email').value.trim();
      if (email && name) {
        Store.login(email, name);
        setTimeout(() => {
          checkAuthState();
        }, 400);
      }
    };
  }
}

// Demo One-Click Login
window.quickDemoLogin = function() {
  if (typeof Store === 'undefined') return;
  Store.login('alex.morgan@example.com', 'Alex Morgan');
  checkAuthState();
};

// Logout
window.logoutUser = function() {
  if (typeof Store === 'undefined') return;
  Store.logout();
  checkAuthState();
};

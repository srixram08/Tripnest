import {
  PROPERTY_TYPES,
  HOTELS_DATA,
  TRENDING_DESTINATIONS,
  TRIP_PLANNER,
  EXPLORE_INDIA,
  HOMES_GUESTS_LOVE,
  POPULAR_LOCATIONS,
  SUGGESTIONS,
  FLIGHTS_DATA,
  PACKAGES_DATA,
  CARS_DATA,
  ATTRACTIONS_DATA,
  TAXIS_DATA
} from './data.js';

// ============================================================================
// State Management & LocalStorage Persistence
// ============================================================================

const STORAGE_KEYS = {
  USER: 'booking_user_session',
  BOOKINGS: 'booking_my_trips',
  WISHLIST: 'booking_wishlist',
  RECENT_SEARCHES: 'booking_recent_searches'
};

const defaultUser = {
  name: 'Rohit',
  email: 'rohit@example.com',
  isGenius: true,
  geniusLevel: 1
};

const defaultBookings = [
  {
    id: 'TN-48291',
    pin: '4892',
    hotelId: 'hotel-che-01',
    hotelName: 'Grand Chennai Hotel & Luxury Suites',
    hotelAddress: 'T. Nagar, Chennai, India',
    hotelImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    roomName: 'Deluxe King Room with City View',
    checkIn: '2026-03-20',
    checkOut: '2026-03-22',
    nights: 2,
    guests: '2 adults',
    totalPrice: 8010,
    status: 'confirmed',
    bookingDate: '2026-03-10'
  }
];

const state = {
  user: JSON.parse(localStorage.getItem(STORAGE_KEYS.USER)) || null,
  bookings: JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS)) || defaultBookings,
  wishlist: new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.WISHLIST)) || ['hotel-che-01', 'stay-1']),
  recentSearches: JSON.parse(localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES)) || ['Chennai', 'New Delhi', 'Goa'],
  hotels: JSON.parse(localStorage.getItem('tripnest_custom_hotels')) || [...HOTELS_DATA],
  activeServiceTab: 'stays',
  
  // Active search parameters
  destination: 'Chennai',
  checkIn: new Date(2026, 2, 20),
  checkOut: new Date(2026, 2, 22),
  adults: 2,
  children: 0,
  rooms: 1,
  
  // Results view filters & sorting
  filters: {
    maxPrice: 20000,
    breakfast: false,
    freeCancellation: false,
    pool: false,
    spa: false,
    stars: [],
    propertyTypes: [],
    minRating: 0
  },
  sortBy: 'popularity',
  
  // Current active selections
  selectedHotel: null,
  selectedRoom: null,
  activeBooking: null,
  currentView: 'home',
  
  // Map instances
  resultsMap: null,
  mapMarkers: [],
  detailsMiniMap: null
};

function saveState() {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(state.user));
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(state.bookings));
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify([...state.wishlist]));
  localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(state.recentSearches));
}

// Formatting helpers
function formatDate(d) {
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  return d.toLocaleDateString('en-GB', options);
}

function formatFullDate(d) {
  const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
  return d.toLocaleDateString('en-GB', options);
}

function getNightsCount() {
  const diffTime = Math.abs(state.checkOut - state.checkIn);
  return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
}

function formatINR(amount) {
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  toastMsg.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// ============================================================================
// Single Page Router / View Switcher
// ============================================================================

function switchView(viewName, updateHistory = true) {
  state.currentView = viewName;
  
  const views = ['viewHome', 'viewLogin', 'viewResults', 'viewDetails', 'viewCheckout', 'viewConfirmation', 'viewDashboard'];
  views.forEach(vId => {
    const el = document.getElementById(vId);
    if (el) {
      el.style.display = (vId === `view${viewName.charAt(0).toUpperCase() + viewName.slice(1)}`) ? 'block' : 'none';
    }
  });

  const header = document.querySelector('.b-header');
  const heroHomeHeader = document.getElementById('heroHomeHeader');
  const searchSection = document.getElementById('globalSearchSection');
  const searchCheckboxes = document.getElementById('searchCheckboxes');

  // Configure header appearance based on view
  if (viewName === 'home') {
    header.classList.remove('compact-header');
    heroHomeHeader.style.display = 'block';
    searchSection.classList.remove('compact-mode');
    searchSection.style.display = 'block';
    if (typeof updateSearchFormsVisibility === 'function') {
      updateSearchFormsVisibility();
    }
  } else if (viewName === 'results') {
    header.classList.add('compact-header');
    heroHomeHeader.style.display = 'none';
    searchSection.classList.add('compact-mode');
    searchCheckboxes.style.display = 'none';
    if (typeof showSearchFormOnly === 'function') {
      showSearchFormOnly('searchForm');
    }
    searchSection.style.display = 'block';
  } else {
    // Login, Details, Checkout, Confirmation, Dashboard
    header.classList.add('compact-header');
    heroHomeHeader.style.display = 'none';
    searchSection.style.display = 'none';
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (updateHistory) {
    history.pushState({ view: viewName }, '', `#${viewName}`);
  }
}

window.addEventListener('popstate', (e) => {
  if (e.state && e.state.view) {
    switchView(e.state.view, false);
  } else {
    switchView('home', false);
  }
});

// ============================================================================
// Header & User Authentication
// ============================================================================

function updateHeaderAuth() {
  const authContainer = document.getElementById('headerAuthContainer');
  const savedBadge = document.getElementById('savedBadgeCount');
  savedBadge.textContent = state.wishlist.size;

  if (state.user) {
    authContainer.innerHTML = `
      <div class="user-pill-btn" id="userProfileBtn" title="Go to Dashboard">
        <div class="user-pill-avatar">${state.user.name.charAt(0)}</div>
        <span>${state.user.name}</span>
        <span class="genius-chip">Genius Lvl ${state.user.geniusLevel}</span>
      </div>
    `;

    document.getElementById('userProfileBtn').addEventListener('click', () => {
      switchView('dashboard');
      renderDashboard();
    });
  } else {
    authContainer.innerHTML = `
      <button class="btn-auth btn-register" id="openRegisterBtn">Register</button>
      <button class="btn-auth btn-signin" id="openSignInBtn">Sign in</button>
    `;

    document.getElementById('openRegisterBtn').addEventListener('click', () => {
      document.getElementById('pageLoginTitle').textContent = 'Create an account';
      document.getElementById('pageLoginSub').textContent = 'Register to unlock Genius rewards and manage your trips in your Dashboard.';
      switchView('login');
    });

    document.getElementById('openSignInBtn').addEventListener('click', () => {
      document.getElementById('pageLoginTitle').textContent = 'Sign in to your account';
      document.getElementById('pageLoginSub').textContent = 'Sign in with your email to access your personal Dashboard and saved trips.';
      switchView('login');
    });
  }
}

function setupLoginViewAndFlow() {
  const loginForm = document.getElementById('pageLoginForm');
  const oneClickBtn = document.getElementById('oneClickLoginBtn');
  const cancelBtn = document.getElementById('cancelLoginBtn');
  const googleBtn = document.getElementById('socialGoogleBtn');
  const appleBtn = document.getElementById('socialAppleBtn');
  const facebookBtn = document.getElementById('socialFacebookBtn');

  function completeLogin(name, email) {
    state.user = {
      name: name || 'Rohit',
      email: email || 'rohit@example.com',
      isGenius: true,
      geniusLevel: 1
    };
    saveState();
    updateHeaderAuth();
    showToast(`Welcome, ${state.user.name}!`);
    // Flow: Landing page -> Login -> Dashboard
    switchView('dashboard');
    renderDashboard();
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('pageLoginName').value.trim() || 'Rohit';
    const email = document.getElementById('pageLoginEmail').value.trim() || 'rohit@example.com';
    completeLogin(name, email);
  });

  oneClickBtn.addEventListener('click', () => {
    completeLogin('Rohit', 'rohit@example.com');
  });

  googleBtn.addEventListener('click', () => completeLogin('Rohit (Google)', 'rohit@gmail.com'));
  appleBtn.addEventListener('click', () => completeLogin('Rohit (Apple)', 'rohit@icloud.com'));
  facebookBtn.addEventListener('click', () => completeLogin('Rohit (Facebook)', 'rohit@facebook.com'));

  cancelBtn.addEventListener('click', () => {
    switchView('home');
  });
}


// ============================================================================
// Intelligent Search Engine
// ============================================================================

function setupSearchEngine() {
  const form = document.getElementById('searchForm');
  const destinationInput = document.getElementById('destinationInput');
  const suggestionsDropdown = document.getElementById('suggestionsDropdown');
  const suggestionsList = document.getElementById('suggestionsList');
  const recentSearchesList = document.getElementById('recentSearchesList');
  const recentHeader = document.getElementById('recentSearchesHeader');
  const nearMeBtn = document.getElementById('nearMeBtn');

  function renderRecentSearches() {
    if (state.recentSearches.length > 0) {
      recentHeader.style.display = 'block';
      recentSearchesList.innerHTML = state.recentSearches.slice(0, 4).map(city => `
        <div class="suggestion-item recent-search-item" data-name="${city}">
          <div class="sugg-icon">🕒</div>
          <div>
            <div class="sugg-name">${city}</div>
            <div class="sugg-region">Recent search</div>
          </div>
        </div>
      `).join('');

      recentSearchesList.querySelectorAll('.recent-search-item').forEach(item => {
        item.addEventListener('click', () => {
          destinationInput.value = item.dataset.name;
          state.destination = item.dataset.name;
          suggestionsDropdown.classList.remove('show');
          performSearch();
        });
      });
    } else {
      recentHeader.style.display = 'none';
      recentSearchesList.innerHTML = '';
    }
  }

  function renderSuggestions(query = '') {
    const q = query.toLowerCase().trim();
    const filtered = SUGGESTIONS.filter(s =>
      s.name.toLowerCase().includes(q) || s.region.toLowerCase().includes(q)
    );

    suggestionsList.innerHTML = filtered.map(s => `
      <div class="suggestion-item" data-name="${s.name}">
        <div class="sugg-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </div>
        <div>
          <div class="sugg-name">${s.name}</div>
          <div class="sugg-region">${s.region}</div>
        </div>
      </div>
    `).join('');

    suggestionsList.querySelectorAll('.suggestion-item').forEach(item => {
      item.addEventListener('click', () => {
        destinationInput.value = item.dataset.name;
        state.destination = item.dataset.name;
        suggestionsDropdown.classList.remove('show');
        performSearch();
      });
    });
  }

  destinationInput.addEventListener('focus', () => {
    renderRecentSearches();
    renderSuggestions(destinationInput.value);
    suggestionsDropdown.classList.add('show');
  });

  destinationInput.addEventListener('input', (e) => {
    renderSuggestions(e.target.value);
    suggestionsDropdown.classList.add('show');
  });

  nearMeBtn.addEventListener('click', () => {
    destinationInput.value = 'Chennai';
    state.destination = 'Chennai';
    suggestionsDropdown.classList.remove('show');
    showToast('Detected current location: Chennai, Tamil Nadu');
    performSearch();
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#destinationBox')) {
      suggestionsDropdown.classList.remove('show');
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = destinationInput.value.trim() || 'Chennai';
    state.destination = val;
    performSearch();
  });
}

function performSearch() {
  // Add to recent searches
  if (!state.recentSearches.includes(state.destination)) {
    state.recentSearches.unshift(state.destination);
    if (state.recentSearches.length > 5) state.recentSearches.pop();
    saveState();
  }

  switchView('results');
  renderSearchResults();
}

// ============================================================================
// Date Picker & Validation
// ============================================================================

function setupDatePicker() {
  const dateBox = document.getElementById('dateBox');
  const popup = document.getElementById('datePickerPopup');
  const display = document.getElementById('dateDisplay');
  const closeBtn = document.getElementById('closeDatepicker');
  const applyBtn = document.getElementById('applyDatesBtn');
  const summary = document.getElementById('dateRangeSummary');
  const calendarsWrapper = document.getElementById('calendarsWrapper');

  let pickingStep = 0;

  function updateDisplay() {
    display.textContent = `${formatDate(state.checkIn)} — ${formatDate(state.checkOut)}`;
    const nights = getNightsCount();
    summary.textContent = `${nights} night${nights === 1 ? '' : 's'} selected`;
  }

  function renderCalendars() {
    const month1 = new Date(2026, 2, 1);
    const month2 = new Date(2026, 3, 1);

    function genMonth(monthDate) {
      const year = monthDate.getFullYear();
      const month = monthDate.getMonth();
      const monthName = monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      const firstDay = new Date(year, month, 1).getDay();
      const daysCount = new Date(year, month + 1, 0).getDate();

      let daysHtml = '';
      for (let i = 0; i < firstDay; i++) {
        daysHtml += `<div class="day-cell disabled"></div>`;
      }

      for (let d = 1; d <= daysCount; d++) {
        const curDate = new Date(year, month, d);
        const isStart = curDate.toDateString() === state.checkIn.toDateString();
        const isEnd = curDate.toDateString() === state.checkOut.toDateString();
        const inRange = curDate > state.checkIn && curDate < state.checkOut;

        let classes = 'day-cell';
        if (isStart || isEnd) classes += ' selected';
        else if (inRange) classes += ' in-range';

        daysHtml += `<div class="${classes}" data-date="${curDate.toISOString()}">${d}</div>`;
      }

      return `
        <div class="month-view">
          <div class="month-title">${monthName}</div>
          <div class="weekdays-row">
            <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
          </div>
          <div class="days-grid">${daysHtml}</div>
        </div>
      `;
    }

    calendarsWrapper.innerHTML = genMonth(month1) + genMonth(month2);

    calendarsWrapper.querySelectorAll('.day-cell:not(.disabled)').forEach(cell => {
      cell.addEventListener('click', () => {
        const d = new Date(cell.dataset.date);
        if (pickingStep === 0) {
          state.checkIn = d;
          state.checkOut = new Date(d.getTime() + 86400000);
          pickingStep = 1;
        } else {
          if (d <= state.checkIn) {
            state.checkIn = d;
            state.checkOut = new Date(d.getTime() + 86400000);
          } else {
            state.checkOut = d;
          }
          pickingStep = 0;
        }
        updateDisplay();
        renderCalendars();
        if (state.currentView === 'results') renderSearchResults();
      });
    });
  }

  dateBox.addEventListener('click', (e) => {
    if (!e.target.closest('#datePickerPopup')) {
      popup.classList.toggle('show');
      renderCalendars();
    }
  });

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.classList.remove('show');
  });

  applyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.classList.remove('show');
    updateDisplay();
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#dateBox')) {
      popup.classList.remove('show');
    }
  });

  updateDisplay();
}

// ============================================================================
// Occupancy Stepper
// ============================================================================

function setupOccupancy() {
  const box = document.getElementById('occupancyBox');
  const popup = document.getElementById('occupancyPopup');
  const display = document.getElementById('occupancyDisplay');
  const applyBtn = document.getElementById('applyOccupancyBtn');

  const adultVal = document.getElementById('adultCount');
  const adultDec = document.getElementById('adultDec');
  const adultInc = document.getElementById('adultInc');

  const childVal = document.getElementById('childCount');
  const childDec = document.getElementById('childDec');
  const childInc = document.getElementById('childInc');

  const roomVal = document.getElementById('roomCount');
  const roomDec = document.getElementById('roomDec');
  const roomInc = document.getElementById('roomInc');

  function updateDisplay() {
    display.textContent = `${state.adults} adult${state.adults > 1 ? 's' : ''} · ${state.children} child${state.children === 1 ? '' : 'ren'} · ${state.rooms} room${state.rooms > 1 ? 's' : ''}`;
    adultVal.textContent = state.adults;
    childVal.textContent = state.children;
    roomVal.textContent = state.rooms;

    adultDec.disabled = state.adults <= 1;
    childDec.disabled = state.children <= 0;
    roomDec.disabled = state.rooms <= 1;
  }

  adultDec.addEventListener('click', (e) => { e.stopPropagation(); if (state.adults > 1) { state.adults--; updateDisplay(); } });
  adultInc.addEventListener('click', (e) => { e.stopPropagation(); state.adults++; updateDisplay(); });
  childDec.addEventListener('click', (e) => { e.stopPropagation(); if (state.children > 0) { state.children--; updateDisplay(); } });
  childInc.addEventListener('click', (e) => { e.stopPropagation(); state.children++; updateDisplay(); });
  roomDec.addEventListener('click', (e) => { e.stopPropagation(); if (state.rooms > 1) { state.rooms--; updateDisplay(); } });
  roomInc.addEventListener('click', (e) => { e.stopPropagation(); state.rooms++; updateDisplay(); });

  box.addEventListener('click', (e) => {
    if (!e.target.closest('#occupancyPopup')) popup.classList.toggle('show');
  });

  applyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.classList.remove('show');
    if (state.currentView === 'results') renderSearchResults();
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#occupancyBox')) popup.classList.remove('show');
  });

  updateDisplay();
}

// ============================================================================
// Dedicated Search Results Page Logic & Leaflet Map
// ============================================================================

function filterAndSortHotels() {
  const nights = getNightsCount();
  const destLower = state.destination.toLowerCase().trim();

  let list = state.hotels.filter(h => {
    // City or country match (or show top hotels if query generic)
    const matchLocation = h.city.toLowerCase().includes(destLower) ||
                          h.area.toLowerCase().includes(destLower) ||
                          h.name.toLowerCase().includes(destLower);

    // Price filter
    const matchPrice = h.pricePerNight <= state.filters.maxPrice;

    // Amenities
    if (state.filters.breakfast && !h.amenities.includes('Free Breakfast')) return false;
    if (state.filters.freeCancellation && !h.amenities.includes('Free Cancellation')) return false;
    if (state.filters.pool && !h.amenities.includes('Swimming Pool')) return false;
    if (state.filters.spa && !h.amenities.includes('Spa & Wellness')) return false;

    // Stars
    if (state.filters.stars.length > 0 && !state.filters.stars.includes(h.stars)) return false;

    // Property types
    if (state.filters.propertyTypes.length > 0 && !state.filters.propertyTypes.includes(h.propertyType)) return false;

    // Review Score
    if (state.filters.minRating > 0 && h.rating < state.filters.minRating) return false;

    return matchLocation && matchPrice;
  });

  // If no direct city match, fallback to showing all top rated hotels for discovery
  if (list.length === 0) {
    list = state.hotels.filter(h => h.pricePerNight <= state.filters.maxPrice);
  }

  // Sorting
  if (state.sortBy === 'price-asc') {
    list.sort((a, b) => a.pricePerNight - b.pricePerNight);
  } else if (state.sortBy === 'price-desc') {
    list.sort((a, b) => b.pricePerNight - a.pricePerNight);
  } else if (state.sortBy === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  }

  return list;
}

function renderSearchResults() {
  const container = document.getElementById('hotelsResultsList');
  const headline = document.getElementById('resultsMainHeadline');
  const subheadline = document.getElementById('resultsSubheadline');
  const breadcrumbCity = document.getElementById('breadcrumbCity');
  const nights = getNightsCount();

  breadcrumbCity.textContent = state.destination;
  const filtered = filterAndSortHotels();

  headline.textContent = `${state.destination}: ${filtered.length} properties found`;
  subheadline.textContent = `Showing verified available stays for ${formatDate(state.checkIn)} – ${formatDate(state.checkOut)} (${nights} night${nights > 1 ? 's' : ''}, ${state.adults} adults)`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state-box">
        <div class="empty-state-icon">🔍</div>
        <h3 class="empty-state-title">No properties found matching your filters</h3>
        <p class="empty-state-text">Try resetting filters or searching with wider budget settings.</p>
        <button class="btn-primary" id="emptyResetBtn">Reset all filters</button>
      </div>
    `;
    document.getElementById('emptyResetBtn')?.addEventListener('click', resetFilters);
    return;
  }

  container.innerHTML = filtered.map(hotel => {
    const isSaved = state.wishlist.has(hotel.id);
    const totalPrice = hotel.pricePerNight * nights;

    return `
      <div class="hotel-result-card" data-id="${hotel.id}">
        <div class="card-img-col">
          <img src="${hotel.images[0]}" alt="${hotel.name}" loading="lazy">
          <button class="wishlist-btn ${isSaved ? 'active' : ''}" data-id="${hotel.id}" aria-label="Save hotel">
            <svg width="18" height="18" viewBox="0 0 24 24" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <span class="card-badge-tag">${hotel.propertyType}</span>
        </div>

        <div class="card-info-col">
          <div class="card-title-row">
            <h3 class="card-hotel-name">${hotel.name}</h3>
            <span class="card-stars">${'★'.repeat(hotel.stars)}</span>
          </div>

          <div class="card-location-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>${hotel.area}</span>
            <span class="card-map-link" data-id="${hotel.id}">· Show on map</span>
            <span>· ${hotel.distanceFromCenter}</span>
          </div>

          <p class="card-desc-snippet">${hotel.description}</p>

          <div class="card-amenities-tags">
            ${hotel.amenities.slice(0, 4).map(a => `<span class="amenity-tag">✓ ${a}</span>`).join('')}
          </div>
        </div>

        <div class="card-pricing-col">
          <div class="card-review-header">
            <div>
              <div class="card-review-text">${hotel.ratingText}</div>
              <div class="card-review-sub">${hotel.reviewsCount.toLocaleString()} reviews</div>
            </div>
            <div class="card-review-score">${hotel.rating}</div>
          </div>

          <div class="card-price-bottom">
            <div class="stay-duration-label">${nights} night${nights > 1 ? 's' : ''}, ${state.adults} adults</div>
            <div class="card-grand-price">${formatINR(totalPrice)}</div>
            <div class="card-taxes-note">+ ₹${Math.round(totalPrice * 0.12)} taxes and charges</div>
            <button class="btn-see-avail" data-id="${hotel.id}">See availability &rsaquo;</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Attach card event listeners
  container.querySelectorAll('.btn-see-avail, .card-hotel-name').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = el.closest('.hotel-result-card');
      openHotelDetails(card.dataset.id);
    });
  });

  container.querySelectorAll('.card-map-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.stopPropagation();
      openResultsMap(link.dataset.id);
    });
  });

  container.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWishlist(btn.dataset.id, btn);
    });
  });

  // Sync Leaflet map pins
  updateResultsMapMarkers(filtered);
}

function toggleWishlist(hotelId, btnElement) {
  if (state.wishlist.has(hotelId)) {
    state.wishlist.delete(hotelId);
    if (btnElement) btnElement.classList.remove('active');
    showToast('Removed from saved properties');
  } else {
    state.wishlist.add(hotelId);
    if (btnElement) btnElement.classList.add('active');
    showToast('Saved to your wishlist!');
  }
  saveState();
  updateHeaderAuth();
}

function openResultsMap(highlightHotelId = null) {
  const panel = document.getElementById('interactiveMapPanel');
  const toggleText = document.getElementById('mapToggleText');
  panel.style.display = 'block';
  toggleText.textContent = 'Hide Map';

  if (!state.resultsMap && window.L) {
    state.resultsMap = L.map('resultsLeafletMap').setView([13.0418, 80.2341], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(state.resultsMap);
  }

  setTimeout(() => {
    if (state.resultsMap) {
      state.resultsMap.invalidateSize();
      const filtered = filterAndSortHotels();
      updateResultsMapMarkers(filtered, highlightHotelId);
    }
  }, 200);

  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function updateResultsMapMarkers(hotels, highlightHotelId = null) {
  if (!state.resultsMap || !window.L) return;

  // Clear previous markers
  state.mapMarkers.forEach(m => state.resultsMap.removeLayer(m));
  state.mapMarkers = [];

  const bounds = [];

  hotels.forEach(h => {
    if (!h.coordinates) return;
    const isHighlight = h.id === highlightHotelId;

    const customIcon = L.divIcon({
      className: 'custom-pill-icon',
      html: `<div class="leaflet-pill-marker ${isHighlight ? 'active-pin' : ''}">${formatINR(h.pricePerNight)}</div>`,
      iconSize: [60, 24],
      iconAnchor: [30, 12]
    });

    const marker = L.marker([h.coordinates.lat, h.coordinates.lng], { icon: customIcon }).addTo(state.resultsMap);

    marker.bindPopup(`
      <div style="font-family: var(--b-font); width: 180px;">
        <img src="${h.images[0]}" style="width:100%; height:90px; object-fit:cover; border-radius:4px; margin-bottom:6px;">
        <strong style="font-size:13px; color:var(--b-blue); display:block;">${h.name}</strong>
        <span style="font-size:11px; color:#64748b;">${h.area}</span>
        <div style="margin-top:6px; font-size:13px; font-weight:700;">${formatINR(h.pricePerNight)} <span style="font-size:10px; font-weight:400;">/ night</span></div>
      </div>
    `);

    marker.on('click', () => {
      // Highlight matching hotel card
      document.querySelectorAll('.hotel-result-card').forEach(c => c.classList.remove('highlighted'));
      const card = document.querySelector(`.hotel-result-card[data-id="${h.id}"]`);
      if (card) {
        card.classList.add('highlighted');
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    state.mapMarkers.push(marker);
    bounds.push([h.coordinates.lat, h.coordinates.lng]);
  });

  if (bounds.length > 0) {
    state.resultsMap.fitBounds(bounds, { padding: [40, 40] });
  }
}

function resetFilters() {
  state.filters = {
    maxPrice: 20000,
    breakfast: false,
    freeCancellation: false,
    pool: false,
    spa: false,
    stars: [],
    propertyTypes: [],
    minRating: 0
  };

  document.getElementById('priceRangeInput').value = 20000;
  document.getElementById('priceRangeDisplay').textContent = 'Up to ₹20,000';
  document.getElementById('filterBreakfast').checked = false;
  document.getElementById('filterCancellation').checked = false;
  document.getElementById('filterPool').checked = false;
  document.getElementById('filterSpa').checked = false;
  document.querySelectorAll('.filter-star').forEach(c => c.checked = false);
  document.querySelectorAll('.filter-prop-type').forEach(c => c.checked = false);
  const anyRatingRadio = document.querySelector('.filter-rating-radio[value="0"]');
  if (anyRatingRadio) anyRatingRadio.checked = true;

  renderSearchResults();
}

function setupResultsFiltersAndSorting() {
  // Price Slider
  const priceSlider = document.getElementById('priceRangeInput');
  const priceDisplay = document.getElementById('priceRangeDisplay');
  priceSlider.addEventListener('input', (e) => {
    state.filters.maxPrice = parseInt(e.target.value, 10);
    priceDisplay.textContent = `Up to ${formatINR(state.filters.maxPrice)}`;
    renderSearchResults();
  });

  // Popular Filters
  document.getElementById('filterBreakfast').addEventListener('change', (e) => {
    state.filters.breakfast = e.target.checked;
    renderSearchResults();
  });
  document.getElementById('filterCancellation').addEventListener('change', (e) => {
    state.filters.freeCancellation = e.target.checked;
    renderSearchResults();
  });
  document.getElementById('filterPool').addEventListener('change', (e) => {
    state.filters.pool = e.target.checked;
    renderSearchResults();
  });
  document.getElementById('filterSpa').addEventListener('change', (e) => {
    state.filters.spa = e.target.checked;
    renderSearchResults();
  });

  // Star Ratings
  document.querySelectorAll('.filter-star').forEach(cb => {
    cb.addEventListener('change', () => {
      const selected = Array.from(document.querySelectorAll('.filter-star:checked')).map(c => parseInt(c.value, 10));
      state.filters.stars = selected;
      renderSearchResults();
    });
  });

  // Property Type
  document.querySelectorAll('.filter-prop-type').forEach(cb => {
    cb.addEventListener('change', () => {
      const selected = Array.from(document.querySelectorAll('.filter-prop-type:checked')).map(c => c.value);
      state.filters.propertyTypes = selected;
      renderSearchResults();
    });
  });

  // Review Rating Radios
  document.querySelectorAll('.filter-rating-radio').forEach(r => {
    r.addEventListener('change', (e) => {
      state.filters.minRating = parseFloat(e.target.value);
      renderSearchResults();
    });
  });

  // Reset Filters
  document.getElementById('resetFiltersBtn').addEventListener('click', resetFilters);

  // Sorting Dropdown
  document.getElementById('sortDropdown').addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderSearchResults();
  });

  // Map Trigger Buttons
  document.getElementById('mapToggleBtn').addEventListener('click', () => {
    const panel = document.getElementById('interactiveMapPanel');
    if (panel.style.display === 'none') {
      openResultsMap();
    } else {
      panel.style.display = 'none';
      document.getElementById('mapToggleText').textContent = 'Show Map';
    }
  });

  document.getElementById('sidebarMapCard').addEventListener('click', () => {
    openResultsMap();
  });

  document.getElementById('closeMapPanelBtn').addEventListener('click', () => {
    document.getElementById('interactiveMapPanel').style.display = 'none';
    document.getElementById('mapToggleText').textContent = 'Show Map';
  });

  document.getElementById('breadcrumbHome').addEventListener('click', (e) => {
    e.preventDefault();
    switchView('home');
  });
}

// ============================================================================
// Hotel Details Page
// ============================================================================

function openHotelDetails(hotelId) {
  const hotel = state.hotels.find(h => h.id === hotelId) || HOTELS_DATA.find(h => h.id === hotelId);
  if (!hotel) return;

  state.selectedHotel = hotel;
  switchView('details');

  const nights = getNightsCount();

  // Populate Header
  document.getElementById('detailsHotelName').textContent = hotel.name;
  document.getElementById('detailsStars').textContent = '★'.repeat(hotel.stars);
  document.getElementById('detailsAddress').textContent = `${hotel.area}, ${hotel.country}`;
  document.getElementById('detailsLocationDist').textContent = `· ${hotel.distanceFromCenter} · Excellent location`;
  document.getElementById('detailsRatingText').textContent = hotel.ratingText;
  document.getElementById('detailsReviewsCount').textContent = `${hotel.reviewsCount.toLocaleString()} verified reviews`;
  document.getElementById('detailsRatingScore').textContent = hotel.rating;

  // Photo Gallery
  const gallery = document.getElementById('detailsPhotoGallery');
  gallery.innerHTML = `
    <div class="gallery-photo-main">
      <img src="${hotel.images[0]}" alt="${hotel.name} main view">
    </div>
    ${hotel.images.slice(1, 5).map((img, idx) => `
      <div class="gallery-photo-sub">
        <img src="${img}" alt="${hotel.name} view ${idx + 2}">
      </div>
    `).join('')}
  `;

  // Highlights Bar
  const highlightsBar = document.getElementById('detailsAmenitiesBar');
  highlightsBar.innerHTML = hotel.amenities.map(a => `
    <span class="highlight-pill-tag">✓ ${a}</span>
  `).join('');

  // Description
  document.getElementById('detailsDescription').textContent = hotel.description;

  // Facilities Grid
  const facGrid = document.getElementById('detailsFacilitiesGrid');
  facGrid.innerHTML = hotel.amenities.map(a => `
    <div class="facility-badge-item">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${a}</span>
    </div>
  `).join('');

  // Rooms Selection Table
  document.getElementById('roomsDateSummary').textContent = `Prices for ${nights} night${nights > 1 ? 's' : ''} (${formatDate(state.checkIn)} — ${formatDate(state.checkOut)}) for ${state.adults} adults`;
  const tableBody = document.getElementById('roomsTableBody');

  tableBody.innerHTML = hotel.rooms.map(room => {
    const totalRoomPrice = room.price * nights;
    return `
      <tr data-room-id="${room.id}">
        <td>
          <div class="room-type-title">${room.name}</div>
          <div class="room-specs">
            <div>🛏️ ${room.bed}</div>
            <div>📐 ${room.size} · City / Garden view</div>
          </div>
        </td>
        <td>
          <div class="room-guests-icons">${'👤'.repeat(room.maxGuests)}</div>
          <span style="font-size:12px; color:var(--b-text-secondary);">${room.maxGuests} guests</span>
        </td>
        <td>
          <div class="room-price-stay">${formatINR(totalRoomPrice)}</div>
          <div class="room-price-sub">+ ₹${Math.round(totalRoomPrice * 0.12)} taxes</div>
        </td>
        <td>
          ${room.inclusions.map(inc => `
            <div class="room-choice-tick">✓ ${inc}</div>
          `).join('')}
        </td>
        <td>
          <select class="select-room-quantity">
            <option value="1">1 room</option>
            <option value="2">2 rooms</option>
            <option value="3">3 rooms</option>
          </select>
          <button class="btn-reserve-room" data-room-id="${room.id}">I'll reserve</button>
        </td>
      </tr>
    `;
  }).join('');

  tableBody.querySelectorAll('.btn-reserve-room').forEach(btn => {
    btn.addEventListener('click', () => {
      const roomId = btn.dataset.roomId;
      const room = hotel.rooms.find(r => r.id === roomId);
      proceedToCheckout(hotel, room);
    });
  });

  // Reviews Breakdown
  const revContainer = document.getElementById('reviewsBreakdown');
  const scores = hotel.reviewsBreakdown || { cleanliness: 9.0, comfort: 9.1, location: 9.3, staff: 9.0, value: 8.8 };
  revContainer.innerHTML = Object.entries(scores).map(([category, val]) => `
    <div class="review-bar-item">
      <div class="review-bar-labels">
        <span style="text-transform: capitalize;">${category}</span>
        <span>${val}</span>
      </div>
      <div class="review-progress-track">
        <div class="review-progress-fill" style="width: ${val * 10}%;"></div>
      </div>
    </div>
  `).join('');

  // Mini Leaflet Map
  if (window.L && hotel.coordinates) {
    if (state.detailsMiniMap) {
      state.detailsMiniMap.remove();
    }
    setTimeout(() => {
      state.detailsMiniMap = L.map('detailsMiniMap').setView([hotel.coordinates.lat, hotel.coordinates.lng], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(state.detailsMiniMap);

      L.marker([hotel.coordinates.lat, hotel.coordinates.lng]).addTo(state.detailsMiniMap)
        .bindPopup(`<strong>${hotel.name}</strong><br>${hotel.area}`)
        .openPopup();
    }, 200);
  }
}

function setupHotelDetailsEvents() {
  document.getElementById('backToResultsBtn').addEventListener('click', () => {
    switchView('results');
  });

  document.getElementById('jumpToRoomsBtn').addEventListener('click', () => {
    document.getElementById('roomsSection').scrollIntoView({ behavior: 'smooth' });
  });
}

// ============================================================================
// Checkout Flow & Price Intelligence
// ============================================================================

function proceedToCheckout(hotel, room) {
  state.selectedHotel = hotel;
  state.selectedRoom = room;

  switchView('checkout');

  const nights = getNightsCount();
  const roomTotal = room.price * nights;
  const geniusDiscount = state.user?.isGenius ? Math.round(roomTotal * 0.10) : 0;
  const taxes = Math.round((roomTotal - geniusDiscount) * 0.12);
  const serviceFee = 350;
  const grandTotal = (roomTotal - geniusDiscount) + taxes + serviceFee;

  // Pre-fill user data if available
  if (state.user) {
    const parts = state.user.name.split(' ');
    document.getElementById('guestFirstName').value = parts[0] || 'Rohit';
    document.getElementById('guestLastName').value = parts.slice(1).join(' ') || 'Sharma';
    document.getElementById('guestEmail').value = state.user.email || 'rohit@example.com';
  }

  // Populate Summary Card
  const summaryCard = document.getElementById('checkoutSummaryCard');
  summaryCard.innerHTML = `
    <div class="summary-hotel-header">
      <div class="summary-hotel-name">${hotel.name}</div>
      <div class="summary-hotel-loc">${hotel.area}</div>
      <span class="card-stars">${'★'.repeat(hotel.stars)}</span>
    </div>

    <div class="summary-dates-box">
      <div class="summary-date-col">
        <span class="date-lbl">Check-in</span>
        <strong>${formatDate(state.checkIn)}</strong>
        <span class="time-lbl">From 14:00</span>
      </div>
      <div class="nights-arrow-box">
        <span>${nights} night${nights > 1 ? 's' : ''}</span>
        &rarr;
      </div>
      <div class="summary-date-col">
        <span class="date-lbl">Check-out</span>
        <strong>${formatDate(state.checkOut)}</strong>
        <span class="time-lbl">Until 12:00</span>
      </div>
    </div>

    <div style="margin-bottom: 14px; font-size:13px;">
      <strong>Room:</strong> ${room.name}<br>
      <strong>Guests:</strong> ${state.adults} adults · ${state.rooms} room
    </div>

    <h4 style="font-size:14px; font-weight:700; margin-bottom:10px;">Price Details</h4>
    
    <div class="summary-price-row">
      <span>${room.name} (${nights} nights):</span>
      <span>${formatINR(roomTotal)}</span>
    </div>

    ${state.user?.isGenius ? `
      <div class="summary-price-row discount">
        <span>🎁 Genius Discount (10% off):</span>
        <span>- ${formatINR(geniusDiscount)}</span>
      </div>
    ` : ''}

    <div class="summary-price-row">
      <span>Goods & Services Tax (12%):</span>
      <span>${formatINR(taxes)}</span>
    </div>

    <div class="summary-price-row">
      <span>Booking service fee:</span>
      <span>${formatINR(serviceFee)}</span>
    </div>

    <div class="summary-grand-total">
      <span>Total Price:</span>
      <span>${formatINR(grandTotal)}</span>
    </div>

    <div style="margin-top: 12px; font-size: 11px; color: var(--b-green-deal); font-weight: 600;">
      ✓ Free cancellation until 24 hours before check-in<br>
      ✓ No prepayment needed
    </div>
  `;

  // Payment Option selection
  document.querySelectorAll('.payment-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      opt.querySelector('input').checked = true;
    });
  });
}

function setupCheckoutForm() {
  const form = document.getElementById('checkoutForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = document.getElementById('guestFirstName').value.trim();
    const lastName = document.getElementById('guestLastName').value.trim();
    const email = document.getElementById('guestEmail').value.trim();
    const phone = document.getElementById('guestPhone').value.trim();
    const payMethod = document.querySelector('input[name="payMethod"]:checked').value;

    const nights = getNightsCount();
    const roomTotal = state.selectedRoom.price * nights;
    const geniusDiscount = state.user?.isGenius ? Math.round(roomTotal * 0.10) : 0;
    const taxes = Math.round((roomTotal - geniusDiscount) * 0.12);
    const serviceFee = 350;
    const grandTotal = (roomTotal - geniusDiscount) + taxes + serviceFee;

    // Generate random booking ID & PIN
    const bookingId = 'TN-' + Math.floor(10000 + Math.random() * 90000);
    const pin = String(Math.floor(1000 + Math.random() * 9000));

    const newBooking = {
      id: bookingId,
      pin: pin,
      hotelId: state.selectedHotel.id,
      hotelName: state.selectedHotel.name,
      hotelAddress: state.selectedHotel.area,
      hotelImage: state.selectedHotel.images[0],
      roomName: state.selectedRoom.name,
      checkIn: state.checkIn.toISOString().split('T')[0],
      checkOut: state.checkOut.toISOString().split('T')[0],
      nights: nights,
      guests: `${state.adults} adults`,
      guestName: `${firstName} ${lastName}`,
      guestEmail: email,
      guestPhone: phone,
      roomSubtotal: roomTotal,
      geniusDiscount: geniusDiscount,
      taxes: taxes,
      totalPrice: grandTotal,
      payMethod: payMethod === 'pay_at_property' ? 'Pay at property' : 'Instant Payment',
      status: 'confirmed',
      bookingDate: new Date().toISOString().split('T')[0]
    };

    // Save to state
    state.bookings.unshift(newBooking);
    state.activeBooking = newBooking;
    saveState();

    // Show Confirmation Voucher
    showConfirmationVoucher(newBooking);
  });
}

// ============================================================================
// Official Booking Confirmation Voucher
// ============================================================================

function showConfirmationVoucher(booking) {
  switchView('confirmation');

  document.getElementById('confBookingId').textContent = booking.id;
  document.getElementById('confPinCode').textContent = `PIN: ${booking.pin}`;
  document.getElementById('confEmailNotice').textContent = `We've sent your confirmation receipt to ${booking.guestEmail}`;
  document.getElementById('confHotelName').textContent = booking.hotelName;
  document.getElementById('confHotelAddress').textContent = booking.hotelAddress;
  document.getElementById('confRoomName').textContent = booking.roomName;
  document.getElementById('confCheckInDate').textContent = formatFullDate(new Date(booking.checkIn));
  document.getElementById('confCheckOutDate').textContent = formatFullDate(new Date(booking.checkOut));
  document.getElementById('confNightsBadge').textContent = `${booking.nights} night${booking.nights > 1 ? 's' : ''}`;
  document.getElementById('confGuestName').textContent = booking.guestName;
  document.getElementById('confGuestEmail').textContent = booking.guestEmail;
  document.getElementById('confGuestPhone').textContent = booking.guestPhone;
  document.getElementById('confGuestsSummary').textContent = booking.guests;
  document.getElementById('confRoomSubtotal').textContent = formatINR(booking.roomSubtotal);
  document.getElementById('confGeniusDiscount').textContent = `- ${formatINR(booking.geniusDiscount)}`;
  document.getElementById('confTaxes').textContent = formatINR(booking.taxes);
  document.getElementById('confGrandTotal').textContent = formatINR(booking.totalPrice);
  document.getElementById('confPayMethod').textContent = booking.payMethod;
  document.getElementById('confBarcodeNum').textContent = `${booking.id}-2026-CONF`;

  showToast('Booking successfully confirmed!');
}

function setupConfirmationActions() {
  document.getElementById('printVoucherBtn').addEventListener('click', () => {
    window.print();
  });

  document.getElementById('viewMyTripsBtn').addEventListener('click', () => {
    switchView('dashboard');
  });

  document.getElementById('bookAnotherTripBtn').addEventListener('click', () => {
    switchView('home');
  });
}

// ============================================================================
// User Dashboard & My Trips
// ============================================================================

function renderDashboard() {
  const tripsCount = document.getElementById('dashTripsCount');
  const wishlistCount = document.getElementById('dashWishlistCount');
  const myTripsList = document.getElementById('myTripsList');
  const myWishlistGrid = document.getElementById('myWishlistGrid');
  const myRecentSearchesGrid = document.getElementById('myRecentSearchesGrid');
  const metricTrips = document.getElementById('metricTripsCount');
  const metricWish = document.getElementById('metricWishlistCount');

  if (tripsCount) tripsCount.textContent = state.bookings.length;
  if (wishlistCount) wishlistCount.textContent = state.wishlist.size;
  if (metricTrips) metricTrips.textContent = state.bookings.length;
  if (metricWish) metricWish.textContent = state.wishlist.size;

  if (state.user) {
    document.getElementById('dashUserName').textContent = state.user.name;
    document.getElementById('dashUserEmail').textContent = state.user.email;
    document.getElementById('dashAvatar').textContent = state.user.name.charAt(0);
  } else {
    // If not logged in, redirect to login
    switchView('login');
    return;
  }

  // Render My Bookings
  if (state.bookings.length === 0) {
    myTripsList.innerHTML = `
      <div class="empty-state-box">
        <div class="empty-state-icon">✈️</div>
        <h3 class="empty-state-title">You don't have any bookings yet</h3>
        <p class="empty-state-text">Explore amazing stays and plan your next journey.</p>
        <button class="btn-primary" id="dashExploreStaysBtn">Explore stays</button>
      </div>
    `;
    document.getElementById('dashExploreStaysBtn')?.addEventListener('click', () => switchView('home'));
  } else {
    myTripsList.innerHTML = state.bookings.map(b => `
      <div class="trip-card" data-id="${b.id}">
        <div class="trip-card-left">
          <img src="${b.hotelImage}" alt="${b.hotelName}" class="trip-hotel-img">
          <div>
            <h4 class="trip-hotel-name">${b.hotelName}</h4>
            <div class="trip-stay-dates">📅 ${formatDate(new Date(b.checkIn))} — ${formatDate(new Date(b.checkOut))} (${b.nights} nights)</div>
            <span class="trip-id-badge">ID: ${b.id}</span>
            <span style="font-size:12px; color:var(--b-text-secondary); margin-left:8px;">${b.roomName}</span>
          </div>
        </div>

        <div class="trip-card-right">
          <span class="trip-status-tag ${b.status}">${b.status === 'confirmed' ? '✓ Confirmed' : '✕ Cancelled'}</span>
          <div style="font-size:16px; font-weight:800;">${formatINR(b.totalPrice)}</div>
          ${b.status === 'confirmed' ? `
            <button class="btn-cancel-trip" data-id="${b.id}">Cancel reservation</button>
          ` : ''}
        </div>
      </div>
    `).join('');

    myTripsList.querySelectorAll('.btn-cancel-trip').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        if (confirm(`Are you sure you want to cancel booking ${id}? Free cancellation policy applies.`)) {
          const booking = state.bookings.find(b => b.id === id);
          if (booking) {
            booking.status = 'cancelled';
            saveState();
            renderDashboard();
            showToast(`Booking ${id} was cancelled successfully.`);
          }
        }
      });
    });
  }

  // Render Saved Properties
  const savedHotels = HOTELS_DATA.filter(h => state.wishlist.has(h.id));
  if (savedHotels.length === 0) {
    myWishlistGrid.innerHTML = `
      <div class="empty-state-box">
        <div class="empty-state-icon">❤️</div>
        <h3 class="empty-state-title">No saved properties yet</h3>
        <p class="empty-state-text">Click the heart icon on any property card to save it for later.</p>
      </div>
    `;
  } else {
    myWishlistGrid.innerHTML = `
      <div class="hotels-results-list">
        ${savedHotels.map(h => `
          <div class="hotel-result-card" data-id="${h.id}">
            <div class="card-img-col">
              <img src="${h.images[0]}" alt="${h.name}">
              <span class="card-badge-tag">${h.propertyType}</span>
            </div>
            <div class="card-info-col">
              <h3 class="card-hotel-name">${h.name}</h3>
              <div class="card-location-row">${h.area} · ${h.distanceFromCenter}</div>
              <p class="card-desc-snippet">${h.description}</p>
            </div>
            <div class="card-pricing-col">
              <div class="card-review-header">
                <div class="card-review-score">${h.rating}</div>
              </div>
              <div class="card-price-bottom">
                <div class="card-grand-price">${formatINR(h.pricePerNight)} <span style="font-size:12px; font-weight:400;">/ night</span></div>
                <button class="btn-see-avail" onclick="openHotelDetails('${h.id}')">Book now &rsaquo;</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Render Recent Searches
  myRecentSearchesGrid.innerHTML = `
    <div style="display:flex; flex-wrap:wrap; gap:12px;">
      ${state.recentSearches.map(s => `
        <button class="btn-secondary recent-search-btn" data-city="${s}">
          <span>🔍</span> ${s}
        </button>
      `).join('')}
    </div>
  `;

  myRecentSearchesGrid.querySelectorAll('.recent-search-btn').forEach(b => {
    b.addEventListener('click', () => {
      state.destination = b.dataset.city;
      document.getElementById('destinationInput').value = b.dataset.city;
      performSearch();
    });
  });
}

function setupDashboardTabs() {
  document.querySelectorAll('.dash-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.dataset.tab;
      document.getElementById('tabContentTrips').style.display = target === 'trips' ? 'block' : 'none';
      document.getElementById('tabContentWishlist').style.display = target === 'wishlist' ? 'block' : 'none';
      document.getElementById('tabContentSearches').style.display = target === 'searches' ? 'block' : 'none';
    });
  });

  // Action: Search & Book Stays from Dashboard
  document.getElementById('dashStartBookingBtn').addEventListener('click', () => {
    switchView('home');
    document.getElementById('destinationInput').focus();
  });

  // Action: Sign Out from Dashboard (returns to Landing Page)
  document.getElementById('dashSignOutBtn').addEventListener('click', () => {
    state.user = null;
    saveState();
    updateHeaderAuth();
    showToast('Signed out successfully.');
    // Return back to Landing Page
    switchView('home');
  });

  document.getElementById('headerSavedBtn').addEventListener('click', () => {
    if (!state.user) {
      showToast('Please sign in to view your saved properties.');
      switchView('login');
      return;
    }
    switchView('dashboard');
    renderDashboard();
    const wishlistTab = document.querySelector('.dash-tab[data-tab="wishlist"]');
    if (wishlistTab) wishlistTab.click();
  });

  document.getElementById('headerTripsBtn').addEventListener('click', () => {
    if (!state.user) {
      showToast('Please sign in to view your trips.');
      switchView('login');
      return;
    }
    switchView('dashboard');
    renderDashboard();
    const tripsTab = document.querySelector('.dash-tab[data-tab="trips"]');
    if (tripsTab) tripsTab.click();
  });
}


// ============================================================================
// Homepage Components Initializer
// ============================================================================

function setupHomepageComponents() {
  // Logo returns to home
  document.getElementById('headerHomeLogo').addEventListener('click', (e) => {
    e.preventDefault();
    switchView('home');
  });

  document.getElementById('navPillStays').addEventListener('click', (e) => {
    e.preventDefault();
    switchView('home');
  });

  // Property Types Carousel
  const ptContainer = document.getElementById('propertyTypesCarousel');
  ptContainer.innerHTML = PROPERTY_TYPES.map(item => `
    <div class="property-type-card" data-type="${item.title}">
      <img src="${item.image}" alt="${item.title}" class="property-type-img" loading="lazy">
      <div class="property-type-title">${item.title}</div>
      <div class="property-type-count">${item.count}</div>
    </div>
  `).join('');

  ptContainer.querySelectorAll('.property-type-card').forEach(c => {
    c.addEventListener('click', () => {
      const type = c.dataset.type;
      state.filters.propertyTypes = [type.slice(0, -1)]; // 'Hotels' -> 'Hotel'
      performSearch();
    });
  });

  // Trending Destinations
  const trendingContainer = document.getElementById('trendingGrid');
  trendingContainer.innerHTML = TRENDING_DESTINATIONS.map(item => `
    <div class="trending-card span-${item.span}" data-destination="${item.name}">
      <img src="${item.image}" alt="${item.name}" class="trending-card-img" loading="lazy">
      <div class="trending-card-overlay">
        <div class="trending-header">
          <h3 class="trending-title">${item.name}</h3>
          <span class="trending-flag">${item.flag}</span>
        </div>
        <p class="trending-subtitle">${item.subtitle}</p>
      </div>
    </div>
  `).join('');

  trendingContainer.querySelectorAll('.trending-card').forEach(c => {
    c.addEventListener('click', () => {
      state.destination = c.dataset.destination;
      document.getElementById('destinationInput').value = state.destination;
      performSearch();
    });
  });

  // Trip Planner Vibe Tabs
  const plannerTabs = document.getElementById('plannerTabs');
  const plannerCards = document.getElementById('plannerCards');

  let activeVibe = 'beach';
  plannerTabs.innerHTML = TRIP_PLANNER.categories.map(cat => `
    <button class="planner-tab-btn ${cat.id === activeVibe ? 'active' : ''}" data-cat="${cat.id}">
      ${cat.label}
    </button>
  `).join('');

  function updatePlannerCards(catId) {
    const items = TRIP_PLANNER.items[catId] || [];
    plannerCards.innerHTML = items.map(place => `
      <div class="planner-card" data-place="${place.name}">
        <img src="${place.image}" alt="${place.name}" class="planner-card-img" loading="lazy">
        <div class="planner-card-title">${place.name}</div>
        <div class="planner-card-dist">${place.distance}</div>
      </div>
    `).join('');

    plannerCards.querySelectorAll('.planner-card').forEach(pc => {
      pc.addEventListener('click', () => {
        state.destination = pc.dataset.place;
        document.getElementById('destinationInput').value = state.destination;
        performSearch();
      });
    });
  }

  updatePlannerCards(activeVibe);

  plannerTabs.querySelectorAll('.planner-tab-btn').forEach(b => {
    b.addEventListener('click', () => {
      plannerTabs.querySelectorAll('.planner-tab-btn').forEach(btn => btn.classList.remove('active'));
      b.classList.add('active');
      updatePlannerCards(b.dataset.cat);
    });
  });

  // Explore India
  const exploreContainer = document.getElementById('exploreGrid');
  exploreContainer.innerHTML = EXPLORE_INDIA.map(city => `
    <div class="explore-card" data-city="${city.name}">
      <img src="${city.image}" alt="${city.name}" class="explore-card-img" loading="lazy">
      <div class="explore-card-name">${city.name}</div>
      <div class="explore-card-count">${city.count}</div>
    </div>
  `).join('');

  exploreContainer.querySelectorAll('.explore-card').forEach(ec => {
    ec.addEventListener('click', () => {
      state.destination = ec.dataset.city;
      document.getElementById('destinationInput').value = state.destination;
      performSearch();
    });
  });

  // Homes Guests Love
  const homesContainer = document.getElementById('homesGrid');
  homesContainer.innerHTML = HOMES_GUESTS_LOVE.map(home => {
    const isSaved = state.wishlist.has(home.id);
    return `
      <div class="home-card" data-id="${home.id}">
        <div class="home-img-wrapper">
          <img src="${home.image}" alt="${home.name}" class="home-card-img" loading="lazy">
          <button class="wishlist-btn ${isSaved ? 'active' : ''}" data-id="${home.id}">
            <svg width="18" height="18" viewBox="0 0 24 24" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
        <div class="home-name">${home.name}</div>
        <div class="home-city">${home.city}</div>
        <div class="home-rating-row">
          <span class="rating-badge">${home.rating}</span>
          <span class="rating-text">${home.ratingText}</span>
          <span class="reviews-count">· ${home.reviews}</span>
        </div>
        <div class="home-pricing">
          <div class="price-label">Starting from</div>
          <div class="price-amount">${formatINR(home.price)}</div>
        </div>
      </div>
    `;
  }).join('');

  homesContainer.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWishlist(btn.dataset.id, btn);
    });
  });

  // Directory Tabs
  const dirTabs = document.getElementById('directoryTabs');
  const dirLinks = document.getElementById('directoryLinks');

  function updateDirLinks(tabKey) {
    const list = POPULAR_LOCATIONS[tabKey] || [];
    dirLinks.innerHTML = list.map(item => `
      <div class="directory-link-item" data-query="${item}">${item}</div>
    `).join('');

    dirLinks.querySelectorAll('.directory-link-item').forEach(link => {
      link.addEventListener('click', () => {
        const q = link.dataset.query.replace(' Hotels', '').replace(' Resorts', '');
        state.destination = q;
        document.getElementById('destinationInput').value = q;
        performSearch();
      });
    });
  }

  updateDirLinks('domestic');

  dirTabs.querySelectorAll('.dir-tab').forEach(t => {
    t.addEventListener('click', () => {
      dirTabs.querySelectorAll('.dir-tab').forEach(tab => tab.classList.remove('active'));
      t.classList.add('active');
      updateDirLinks(t.dataset.tab);
    });
  });



  // Genius Banner CTAs
  document.getElementById('geniusSignIn').addEventListener('click', () => {
    document.getElementById('openSignInBtn')?.click();
  });
  document.getElementById('geniusRegister').addEventListener('click', () => {
    document.getElementById('openRegisterBtn')?.click();
  });

  document.getElementById('saveOnStaysBtn').addEventListener('click', () => {
    showToast('Early 2026 Deal: 15% discount will be applied at checkout!');
    performSearch();
  });

  document.getElementById('currencyBtn').addEventListener('click', () => showToast('Currency: INR (₹)'));
  document.getElementById('langBtn').addEventListener('click', () => showToast('Language: English (India)'));
  document.getElementById('footerListProperty').addEventListener('click', (e) => {
    e.preventDefault();
    openHostPropertyWizard();
  });
  document.getElementById('listPropertyLink').addEventListener('click', (e) => {
    e.preventDefault();
    openHostPropertyWizard();
  });
  document.getElementById('footerMyAccountLink').addEventListener('click', () => switchView('dashboard'));
  document.getElementById('footerMyBookingsLink').addEventListener('click', () => switchView('dashboard'));
}

// ============================================================================
// Travel Services Tabs & Host Portal Module
// ============================================================================

function showSearchFormOnly(activeFormId) {
  const forms = ['searchForm', 'searchFormFlights', 'searchFormPackages', 'searchFormCars', 'searchFormAttractions', 'searchFormTaxis'];
  forms.forEach(fId => {
    const el = document.getElementById(fId);
    if (el) el.style.display = (fId === activeFormId) ? 'flex' : 'none';
  });
}

function updateSearchFormsVisibility() {
  const tab = state.activeServiceTab || 'stays';
  const checkboxes = document.getElementById('searchCheckboxes');
  
  if (tab === 'stays') {
    showSearchFormOnly('searchForm');
    if (checkboxes) checkboxes.style.display = 'flex';
  } else if (tab === 'flights') {
    showSearchFormOnly('searchFormFlights');
    if (checkboxes) checkboxes.style.display = 'none';
  } else if (tab === 'packages') {
    showSearchFormOnly('searchFormPackages');
    if (checkboxes) checkboxes.style.display = 'none';
  } else if (tab === 'cars') {
    showSearchFormOnly('searchFormCars');
    if (checkboxes) checkboxes.style.display = 'none';
  } else if (tab === 'attractions') {
    showSearchFormOnly('searchFormAttractions');
    if (checkboxes) checkboxes.style.display = 'none';
  } else if (tab === 'taxis') {
    showSearchFormOnly('searchFormTaxis');
    if (checkboxes) checkboxes.style.display = 'none';
  }
}

function switchServiceTab(tabName) {
  state.activeServiceTab = tabName;

  // Update nav pills active styling
  const pillMap = {
    stays: 'navPillStays',
    flights: 'navPillFlights',
    packages: 'navPillPackages',
    cars: 'navPillCars',
    attractions: 'navPillAttractions',
    taxis: 'navPillTaxis'
  };

  Object.entries(pillMap).forEach(([k, pillId]) => {
    const el = document.getElementById(pillId);
    if (el) {
      if (k === tabName) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    }
  });

  // Update Hero Titles
  const heroTitles = {
    stays: { title: 'Find your next stay', sub: 'Search deals on hotels, homes, and much more...' },
    flights: { title: 'Compare and book flights with ease', sub: 'Discover your next adventure with top airlines & transparent fares' },
    packages: { title: 'Book Flight + Hotel together and save', sub: 'Handcrafted holiday bundles with guaranteed savings & luxury stays' },
    cars: { title: 'Car hire for any kind of trip', sub: 'Great cars at great prices, from the biggest car rental companies' },
    attractions: { title: 'Top attractions, activities & experiences', sub: 'Discover the best things to do wherever you travel' },
    taxis: { title: 'Reliable airport transfers, fixed price', sub: 'Flight tracking, free waiting time, and meet & greet included' }
  };

  const heroTitleEl = document.getElementById('heroMainTitle');
  const heroSubEl = document.getElementById('heroMainSubtitle');
  if (heroTitleEl && heroSubEl && heroTitles[tabName]) {
    heroTitleEl.textContent = heroTitles[tabName].title;
    heroSubEl.textContent = heroTitles[tabName].sub;
  }

  // Update Home Content Sections
  const contentMap = {
    stays: 'homeContentStays',
    flights: 'homeContentFlights',
    packages: 'homeContentPackages',
    cars: 'homeContentCars',
    attractions: 'homeContentAttractions',
    taxis: 'homeContentTaxis'
  };

  Object.entries(contentMap).forEach(([k, cId]) => {
    const el = document.getElementById(cId);
    if (el) el.style.display = (k === tabName) ? 'block' : 'none';
  });

  // Show right search form
  updateSearchFormsVisibility();

  // If not currently on home view, switch back to home view
  if (state.currentView !== 'home') {
    switchView('home', false);
  }

  // Render tab contents
  if (tabName === 'flights') renderFlights('all');
  if (tabName === 'packages') renderPackages();
  if (tabName === 'cars') renderCars('all');
  if (tabName === 'attractions') renderAttractions('all');
  if (tabName === 'taxis') renderTaxis();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 1. FLIGHTS MODULE
function renderFlights(routeFilter = 'all') {
  const grid = document.getElementById('flightsListGrid');
  if (!grid) return;

  let list = [...FLIGHTS_DATA];
  if (routeFilter !== 'all') {
    const [orig, dest] = routeFilter.split('-');
    list = list.filter(f => f.originCode === orig && f.destCode.startsWith(dest.slice(0, 2)));
    if (list.length === 0) list = [...FLIGHTS_DATA];
  }

  grid.innerHTML = list.map(f => `
    <div class="flight-card">
      <div class="flight-airline-col">
        <div class="airline-badge" style="background-color: ${f.logoColor};">${f.airline.charAt(0)}</div>
        <div class="airline-info">
          <h4>${f.airline}</h4>
          <span>${f.flightNumber} · ${f.cabinClass}</span>
        </div>
      </div>

      <div class="flight-schedule-col">
        <div class="flight-point">
          <div class="point-time">${f.departureTime}</div>
          <div class="point-code">${f.originCode} (${f.originCity})</div>
        </div>

        <div class="flight-route-duration">
          <span class="duration-text">${f.duration}</span>
          <div class="flight-timeline-bar"></div>
          <span class="stops-badge">${f.stops}</span>
        </div>

        <div class="flight-point">
          <div class="point-time">${f.arrivalTime}</div>
          <div class="point-code">${f.destCode} (${f.destCity})</div>
        </div>
      </div>

      <div class="flight-baggage-col">
        <div>🧳 ${f.baggage}</div>
        <div style="color: var(--b-green-dark); font-weight: 600; margin-top: 4px;">✓ ${f.refundable ? 'Refundable' : 'Standard Fare'}</div>
      </div>

      <div class="flight-price-col">
        <div class="flight-price">${formatINR(f.price)}</div>
        <div class="flight-fare-type">Includes taxes & fees</div>
        <button type="button" class="btn-primary-sm btn-book-flight" data-id="${f.id}">Select flight &rsaquo;</button>
      </div>
    </div>
  `).join('');

  // Book Flight buttons
  grid.querySelectorAll('.btn-book-flight').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const flightId = e.currentTarget.getAttribute('data-id');
      const flight = FLIGHTS_DATA.find(f => f.id === flightId);
      if (!flight) return;

      openServiceBookingVoucher({
        title: 'Flight Reservation Confirmed!',
        sub: 'Electronic ticket receipt sent to ' + (state.user ? state.user.email : 'rohit@example.com'),
        refPrefix: 'TN-FL-',
        icon: '✈️',
        itemHeading: `${flight.airline} Flight ${flight.flightNumber}`,
        itemSub: `${flight.originCity} (${flight.originCode}) ➔ ${flight.destCity} (${flight.destCode}) · ${flight.duration} (${flight.stops})`,
        details: [
          { label: 'Departure', val: `${flight.departureTime} (${flight.originCode})` },
          { label: 'Arrival', val: `${flight.arrivalTime} (${flight.destCode})` },
          { label: 'Cabin Class', val: flight.cabinClass },
          { label: 'Baggage', val: flight.baggage }
        ],
        price: flight.price,
        guestName: state.user ? state.user.name : 'Rohit'
      });
    });
  });
}

// 2. PACKAGES MODULE
function renderPackages() {
  const grid = document.getElementById('packagesGrid');
  if (!grid) return;

  grid.innerHTML = PACKAGES_DATA.map(pkg => `
    <div class="package-card">
      <div class="pkg-card-img-wrap">
        <img src="${pkg.image}" alt="${pkg.title}" class="pkg-card-img" loading="lazy">
        <span class="pkg-card-badge">${pkg.badge}</span>
      </div>
      <div class="pkg-card-body">
        <span class="pkg-nights-pill">${pkg.nights} · ${pkg.destination}</span>
        <h3 class="pkg-card-title">${pkg.title}</h3>
        <p class="pkg-hotel-name">🏨 ${pkg.hotelName} · ★ ${pkg.rating} (${pkg.reviews} reviews)</p>
        <p style="font-size: 12px; color: var(--b-blue-dark); margin-bottom: 8px;">✈️ ${pkg.flightSummary}</p>
        
        <div class="pkg-inclusions-list">
          ${pkg.includes.map(inc => `<span class="pkg-inclusion-chip">✓ ${inc}</span>`).join('')}
        </div>

        <div class="pkg-pricing-row">
          <div>
            <div class="pkg-orig-price">${formatINR(pkg.originalPrice)}</div>
            <div class="pkg-final-price">${formatINR(pkg.price)}</div>
            <div class="pkg-savings-note">You save ${formatINR(pkg.savings)}!</div>
          </div>
          <button type="button" class="btn-primary btn-book-package" data-id="${pkg.id}">Book Package &rsaquo;</button>
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.btn-book-package').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pkgId = e.currentTarget.getAttribute('data-id');
      const pkg = PACKAGES_DATA.find(p => p.id === pkgId);
      if (!pkg) return;

      openServiceBookingVoucher({
        title: 'Holiday Package Confirmed!',
        sub: 'Complete vacation itinerary generated for ' + (state.user ? state.user.email : 'rohit@example.com'),
        refPrefix: 'TN-PKG-',
        icon: '🧳',
        itemHeading: pkg.title,
        itemSub: `${pkg.hotelName} · ${pkg.nights} in ${pkg.destination}`,
        details: [
          { label: 'Destination', val: pkg.destination },
          { label: 'Duration', val: pkg.nights },
          { label: 'Hotel Rating', val: `★ ${pkg.rating} Superb` },
          { label: 'Flights', val: pkg.flightSummary }
        ],
        price: pkg.price,
        guestName: state.user ? state.user.name : 'Rohit'
      });
    });
  });
}

// 3. CAR RENTALS MODULE
function renderCars(categoryFilter = 'all') {
  const grid = document.getElementById('carsGrid');
  if (!grid) return;

  let list = [...CARS_DATA];
  if (categoryFilter !== 'all') {
    list = list.filter(c => c.category.toLowerCase().includes(categoryFilter.toLowerCase()));
    if (list.length === 0) list = [...CARS_DATA];
  }

  grid.innerHTML = list.map(car => `
    <div class="car-card">
      <div class="car-card-img-wrap">
        <img src="${car.image}" alt="${car.name}" class="car-card-img" loading="lazy">
        <span class="car-supplier-tag">${car.supplier}</span>
      </div>
      <div class="car-card-body">
        <span class="car-category-pill">${car.category}</span>
        <h3 class="car-card-title">${car.name}</h3>

        <div class="car-specs-grid">
          <span class="car-spec-chip">👤 ${car.seats} seats</span>
          <span class="car-spec-chip">⚙️ ${car.transmission}</span>
          <span class="car-spec-chip">❄️ A/C</span>
          <span class="car-spec-chip">🛣️ ${car.mileage}</span>
        </div>

        <div class="car-cancel-policy">✓ ${car.cancellation}</div>

        <div class="car-price-row">
          <div>
            <div class="car-rate-day">${formatINR(car.pricePerDay)}</div>
            <div class="car-rate-sub">per day / taxes incl.</div>
          </div>
          <button type="button" class="btn-primary-sm btn-book-car" data-id="${car.id}">Rent Car &rsaquo;</button>
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.btn-book-car').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const carId = e.currentTarget.getAttribute('data-id');
      const car = CARS_DATA.find(c => c.id === carId);
      if (!car) return;

      openServiceBookingVoucher({
        title: 'Car Rental Reserved!',
        sub: 'Digital voucher ready for pickup at Chennai Airport (MAA)',
        refPrefix: 'TN-CAR-',
        icon: '🚗',
        itemHeading: `${car.name} (${car.category})`,
        itemSub: `Supplier: ${car.supplier} · Unlimited Kilometers included`,
        details: [
          { label: 'Transmission', val: car.transmission },
          { label: 'Capacity', val: `${car.seats} Passengers, ${car.bags} Bags` },
          { label: 'Fuel & AC', val: `${car.fuel} · Air Conditioned` },
          { label: 'Insurance', val: 'Collision Damage Waiver Included' }
        ],
        price: car.pricePerDay * 2,
        guestName: state.user ? state.user.name : 'Rohit'
      });
    });
  });
}

// 4. ATTRACTIONS MODULE
function renderAttractions(catFilter = 'all') {
  const grid = document.getElementById('attractionsGrid');
  if (!grid) return;

  let list = [...ATTRACTIONS_DATA];
  if (catFilter !== 'all') {
    list = list.filter(a => a.category.toLowerCase().includes(catFilter.toLowerCase()));
    if (list.length === 0) list = [...ATTRACTIONS_DATA];
  }

  grid.innerHTML = list.map(att => `
    <div class="attraction-card">
      <div class="att-card-img-wrap">
        <img src="${att.image}" alt="${att.title}" class="att-card-img" loading="lazy">
        <span class="att-card-badge">${att.badge}</span>
      </div>
      <div class="att-card-body">
        <span class="att-cat-pill">${att.category} · ${att.city}</span>
        <h3 class="att-card-title">${att.title}</h3>

        <div class="att-rating-row">
          <span class="att-score-badge">${att.rating}</span>
          <span class="att-reviews-count">${att.reviews.toLocaleString()} reviews</span>
          <span style="font-size: 11px; color: var(--b-text-secondary); margin-left: auto;">⏱ ${att.duration}</span>
        </div>

        <div class="att-features-list">
          ${att.features.slice(0, 3).map(f => `<div class="att-feature-item">✓ ${f}</div>`).join('')}
        </div>

        <div class="att-price-row">
          <div>
            <div style="font-size: 11px; color: var(--b-text-muted); text-decoration: line-through;">${formatINR(att.originalPrice)}</div>
            <div style="font-size: 20px; font-weight: 800; color: var(--b-text);">${formatINR(att.price)}</div>
            <div style="font-size: 11px; color: var(--b-text-secondary);">per adult</div>
          </div>
          <button type="button" class="btn-primary-sm btn-book-attraction" data-id="${att.id}">Book Tickets &rsaquo;</button>
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.btn-book-attraction').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const attId = e.currentTarget.getAttribute('data-id');
      const att = ATTRACTIONS_DATA.find(a => a.id === attId);
      if (!att) return;

      openServiceBookingVoucher({
        title: 'Experience Tickets Confirmed!',
        sub: 'Instant mobile QR voucher issued for ' + (state.user ? state.user.email : 'rohit@example.com'),
        refPrefix: 'TN-EXP-',
        icon: '🎡',
        itemHeading: att.title,
        itemSub: `${att.city} · ${att.duration} · ${att.category}`,
        details: [
          { label: 'Activity Date', val: 'Flexible / Valid 30 days' },
          { label: 'Tickets', val: '2 Adults (Fastrack)' },
          { label: 'Rating', val: `★ ${att.rating} (${att.reviews} reviews)` },
          { label: 'Cancellation', val: 'Free cancellation up to 24h' }
        ],
        price: att.price * 2,
        guestName: state.user ? state.user.name : 'Rohit'
      });
    });
  });
}

// 5. AIRPORT TAXIS MODULE
function renderTaxis() {
  const grid = document.getElementById('taxisGrid');
  if (!grid) return;

  grid.innerHTML = TAXIS_DATA.map(taxi => `
    <div class="taxi-card">
      <div class="taxi-card-top">
        <div>
          <h3 class="taxi-card-title">${taxi.name}</h3>
          <p class="taxi-card-model">${taxi.model}</p>
        </div>
        <span class="badge-discount" style="font-size: 11px;">${taxi.badge}</span>
      </div>

      <div class="taxi-cap-chips">
        <span class="taxi-cap-chip">👤 Max ${taxi.passengers}</span>
        <span class="taxi-cap-chip">🧳 ${taxi.luggage} bags</span>
      </div>

      <div class="taxi-features-list">
        ${taxi.features.map(f => `<div class="taxi-feature-bullet"><span style="color: var(--b-green-dark); font-weight: bold;">✓</span> <span>${f}</span></div>`).join('')}
      </div>

      <div class="taxi-price-box">
        <div>
          <div class="taxi-price-amount">${formatINR(taxi.priceEstimate)}</div>
          <span style="font-size: 11px; color: var(--b-text-secondary);">Fixed fare (tolls incl.)</span>
        </div>
        <button type="button" class="btn-primary-sm btn-book-taxi" data-id="${taxi.id}">Book Transfer &rsaquo;</button>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.btn-book-taxi').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const taxiId = e.currentTarget.getAttribute('data-id');
      const taxi = TAXIS_DATA.find(t => t.id === taxiId);
      if (!taxi) return;

      openServiceBookingVoucher({
        title: 'Airport Transfer Confirmed!',
        sub: 'Driver assigned with flight tracking for ' + (state.user ? state.user.email : 'rohit@example.com'),
        refPrefix: 'TN-TAXI-',
        icon: '🚕',
        itemHeading: `${taxi.name} (${taxi.model})`,
        itemSub: 'Pickup: Chennai Airport (MAA) ➔ Destination: T. Nagar, Chennai',
        details: [
          { label: 'Date & Time', val: 'Fri, 20 Mar · 14:30' },
          { label: 'Passengers', val: `${taxi.passengers} Passengers, ${taxi.luggage} Luggage` },
          { label: 'Driver Service', val: 'Meet & Greet inside arrivals with nameboard' },
          { label: 'Waiting Policy', val: '45 mins free waiting time from landing' }
        ],
        price: taxi.priceEstimate,
        guestName: state.user ? state.user.name : 'Rohit'
      });
    });
  });
}

// 6. GENERIC SERVICE BOOKING VOUCHER MODAL
function openServiceBookingVoucher(data) {
  const modal = document.getElementById('modalServiceBooking');
  if (!modal) return;

  const randId = data.refPrefix + Math.floor(10000 + Math.random() * 90000);

  document.getElementById('svcVoucherIcon').textContent = data.icon || '✈️';
  document.getElementById('svcVoucherTitle').textContent = data.title || 'Reservation Complete!';
  document.getElementById('svcVoucherSub').textContent = data.sub || '';
  document.getElementById('svcBookingRef').textContent = randId;
  document.getElementById('svcItemHeading').textContent = data.itemHeading || '';
  document.getElementById('svcItemSub').textContent = data.itemSub || '';
  document.getElementById('svcGuestName').textContent = data.guestName || (state.user ? state.user.name : 'Rohit');
  document.getElementById('svcTotalAmount').textContent = formatINR(data.price || 0);

  const grid = document.getElementById('svcDetailsGrid');
  grid.innerHTML = (data.details || []).map(d => `
    <div><span style="color: var(--b-text-secondary);">${d.label}:</span> <strong>${d.val}</strong></div>
  `).join('');

  modal.style.display = 'flex';
  showToast(`🎉 Reservation confirmed! Reference: ${randId}`);
}

// 7. LIST YOUR PROPERTY WIZARD (Host Onboarding Portal)
let currentWizardStep = 1;

function openHostPropertyWizard() {
  currentWizardStep = 1;
  const modal = document.getElementById('modalListProperty');
  if (!modal) return;

  modal.style.display = 'flex';
  updateWizardUI();
}

function updateWizardUI() {
  // Step indicator
  document.querySelectorAll('.wizard-steps-indicator .step-dot').forEach(dot => {
    const s = parseInt(dot.getAttribute('data-step'), 10);
    if (s < currentWizardStep) {
      dot.classList.remove('active');
      dot.classList.add('completed');
    } else if (s === currentWizardStep) {
      dot.classList.add('active');
      dot.classList.remove('completed');
    } else {
      dot.classList.remove('active', 'completed');
    }
  });

  // Panels
  for (let s = 1; s <= 4; s++) {
    const p = document.getElementById(`wizardStep${s}`);
    if (p) p.style.display = (s === currentWizardStep) ? 'block' : 'none';
  }
  const successP = document.getElementById('wizardStepSuccess');
  if (successP) successP.style.display = (currentWizardStep === 5) ? 'block' : 'none';

  // Navigation Footer
  const footer = document.getElementById('wizardNavFooter');
  const prevBtn = document.getElementById('wizardPrevBtn');
  const nextBtn = document.getElementById('wizardNextBtn');
  const submitBtn = document.getElementById('wizardSubmitBtn');

  if (currentWizardStep === 5) {
    if (footer) footer.style.display = 'none';
  } else {
    if (footer) footer.style.display = 'flex';
    if (prevBtn) prevBtn.style.display = (currentWizardStep > 1) ? 'inline-block' : 'none';
    if (nextBtn) nextBtn.style.display = (currentWizardStep < 4) ? 'inline-block' : 'none';
    if (submitBtn) submitBtn.style.display = (currentWizardStep === 4) ? 'inline-block' : 'none';
  }
}

function setupTravelServicesAndHostPortal() {
  // 1. Navigation Pills
  document.getElementById('navPillStays')?.addEventListener('click', (e) => { e.preventDefault(); switchServiceTab('stays'); });
  document.getElementById('navPillFlights')?.addEventListener('click', (e) => { e.preventDefault(); switchServiceTab('flights'); });
  document.getElementById('navPillPackages')?.addEventListener('click', (e) => { e.preventDefault(); switchServiceTab('packages'); });
  document.getElementById('navPillCars')?.addEventListener('click', (e) => { e.preventDefault(); switchServiceTab('cars'); });
  document.getElementById('navPillAttractions')?.addEventListener('click', (e) => { e.preventDefault(); switchServiceTab('attractions'); });
  document.getElementById('navPillTaxis')?.addEventListener('click', (e) => { e.preventDefault(); switchServiceTab('taxis'); });

  // 2. Flight Route Chips
  document.querySelectorAll('#flightRouteChips .filter-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      document.querySelectorAll('#flightRouteChips .filter-chip').forEach(c => c.classList.remove('active'));
      e.currentTarget.classList.add('active');
      renderFlights(e.currentTarget.getAttribute('data-route'));
    });
  });

  // 3. Car Type Chips
  document.querySelectorAll('#carTypeChips .filter-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      document.querySelectorAll('#carTypeChips .filter-chip').forEach(c => c.classList.remove('active'));
      e.currentTarget.classList.add('active');
      renderCars(e.currentTarget.getAttribute('data-car'));
    });
  });

  // 4. Attraction Chips
  document.querySelectorAll('#attractionChips .filter-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      document.querySelectorAll('#attractionChips .filter-chip').forEach(c => c.classList.remove('active'));
      e.currentTarget.classList.add('active');
      renderAttractions(e.currentTarget.getAttribute('data-att'));
    });
  });

  // 5. Search forms submit handlers
  document.getElementById('searchFormFlights')?.addEventListener('submit', (e) => {
    e.preventDefault();
    renderFlights('all');
    showToast('Found 6 matching flights for your journey!');
  });

  document.getElementById('searchFormPackages')?.addEventListener('submit', (e) => {
    e.preventDefault();
    renderPackages();
    showToast('Found 4 curated holiday packages for your dates!');
  });

  document.getElementById('searchFormCars')?.addEventListener('submit', (e) => {
    e.preventDefault();
    renderCars('all');
    showToast('Found 5 rental vehicles ready for pickup!');
  });

  document.getElementById('searchFormAttractions')?.addEventListener('submit', (e) => {
    e.preventDefault();
    renderAttractions('all');
    showToast('Found top activities and guided tours!');
  });

  document.getElementById('searchFormTaxis')?.addEventListener('submit', (e) => {
    e.preventDefault();
    renderTaxis();
    showToast('Fixed-fare airport transfer rates calculated!');
  });

  // 6. Service Booking Modal Close
  document.getElementById('closeServiceModalBtn')?.addEventListener('click', () => {
    document.getElementById('modalServiceBooking').style.display = 'none';
  });
  document.getElementById('closeServiceVoucherDone')?.addEventListener('click', () => {
    document.getElementById('modalServiceBooking').style.display = 'none';
  });

  // 7. Host Wizard Controls
  document.querySelectorAll('.prop-type-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.prop-type-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  document.querySelectorAll('.photo-theme-selector .photo-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.photo-theme-selector .photo-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });

  document.getElementById('wizardNextBtn')?.addEventListener('click', () => {
    if (currentWizardStep === 2) {
      const name = document.getElementById('newPropName').value.trim();
      const city = document.getElementById('newPropCity').value.trim();
      if (!name || !city) {
        showToast('Please enter your property name and city');
        return;
      }
    } else if (currentWizardStep === 3) {
      const price = parseFloat(document.getElementById('newPropPrice').value);
      if (!price || price < 500) {
        showToast('Please enter a valid nightly rate (min ₹500)');
        return;
      }
    }
    currentWizardStep = Math.min(4, currentWizardStep + 1);
    updateWizardUI();
  });

  document.getElementById('wizardPrevBtn')?.addEventListener('click', () => {
    currentWizardStep = Math.max(1, currentWizardStep - 1);
    updateWizardUI();
  });

  document.getElementById('wizardCancelBtn')?.addEventListener('click', () => {
    document.getElementById('modalListProperty').style.display = 'none';
  });
  document.getElementById('closeListPropModalBtn')?.addEventListener('click', () => {
    document.getElementById('modalListProperty').style.display = 'none';
  });
  document.getElementById('btnCloseWizardSuccess')?.addEventListener('click', () => {
    document.getElementById('modalListProperty').style.display = 'none';
  });

  // Publish Listing Form Submit
  document.getElementById('listPropertyForm')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const selectedCat = document.querySelector('input[name="propCategory"]:checked')?.value || 'Hotel';
    const propName = document.getElementById('newPropName').value.trim() || 'Ocean Palms Luxury Villa';
    const city = document.getElementById('newPropCity').value.trim() || 'Chennai';
    const area = document.getElementById('newPropArea').value.trim() || 'East Coast Road';
    const price = parseFloat(document.getElementById('newPropPrice').value) || 5200;
    const bio = document.getElementById('newPropBio').value.trim() || 'Experience panoramic sea views and comfort.';

    const selectedAmenities = Array.from(document.querySelectorAll('input[name="propAmenity"]:checked')).map(c => c.value);
    if (selectedAmenities.length === 0) selectedAmenities.push('Free WiFi', 'Air Conditioning');

    const photoTheme = document.querySelector('input[name="propPhotoTheme"]:checked')?.value || 'villa';
    const themeImages = {
      luxury: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
      ],
      villa: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
      ],
      apartment: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
      ],
      resort: [
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'
      ]
    };

    const hostId = 'TN-HOST-' + Math.floor(10000 + Math.random() * 90000);
    const newId = 'hotel-user-' + Date.now();

    const newHotel = {
      id: newId,
      name: propName,
      city: city,
      area: `${area}, ${city}`,
      country: 'India',
      distanceFromCenter: '0.8 km from centre',
      rating: 9.6,
      ratingText: 'Exceptional (New Host)',
      reviewsCount: 1,
      pricePerNight: price,
      propertyType: selectedCat,
      stars: 5,
      coordinates: { lat: 13.0827, lng: 80.2707 },
      badge: 'Brand New Host',
      description: bio,
      amenities: selectedAmenities,
      images: themeImages[photoTheme] || themeImages.luxury
    };

    // Add to state and persistence
    state.hotels.unshift(newHotel);
    localStorage.setItem('tripnest_custom_hotels', JSON.stringify(state.hotels));

    // Update success panel
    document.getElementById('successHostId').textContent = hostId;
    document.getElementById('successHotelName').textContent = propName;
    document.getElementById('successHotelLoc').textContent = `${city}, India`;
    document.getElementById('successRate').textContent = `${formatINR(price)} / night`;

    currentWizardStep = 5;
    updateWizardUI();

    showToast(`🎉 Congratulations! ${propName} is now published on TripNest!`);
  });

  // Action to view published listing
  document.getElementById('btnViewPublishedListing')?.addEventListener('click', () => {
    document.getElementById('modalListProperty').style.display = 'none';
    switchServiceTab('stays');
    state.destination = document.getElementById('newPropCity').value.trim() || 'Chennai';
    document.getElementById('destinationInput').value = state.destination;
    performSearch();
    showToast('Showing your newly listed property in search results!');
  });
}

// ============================================================================
// Initialization
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  updateHeaderAuth();
  setupLoginViewAndFlow();
  setupSearchEngine();
  setupDatePicker();
  setupOccupancy();
  setupResultsFiltersAndSorting();
  setupHotelDetailsEvents();
  setupCheckoutForm();
  setupConfirmationActions();
  setupDashboardTabs();
  setupHomepageComponents();
  setupTravelServicesAndHostPortal();

  // Handle direct hash navigation on initial page load (without creating skippable history entries)
  const hash = window.location.hash.replace('#', '');
  if (hash === 'login') {
    switchView('login', false);
  } else if (hash === 'dashboard' && state.user) {
    switchView('dashboard', false);
    renderDashboard();
  } else if (hash === 'results') {
    performSearch();
  } else if (['flights', 'packages', 'cars', 'attractions', 'taxis'].includes(hash)) {
    switchServiceTab(hash);
  } else {
    switchView('home', false);
  }
});

// Expose openHotelDetails globally for onclick handlers
window.openHotelDetails = openHotelDetails;

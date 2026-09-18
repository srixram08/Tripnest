# TripNest — Your complete travel & stay hub

[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/ES6+-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vercel](https://img.shields.io/badge/Vercel-Deployable-black?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=flat&logo=leaflet&logoColor=white)](https://leafletjs.com/)

**TripNest** is a full-featured, responsive, all-in-one travel and accommodation platform inspired by industry leaders like Booking.com. Discover, compare, and book over **2,000,000+ verified hotels, luxury villas, beachfront resorts, flights, rental cars, holiday packages, and airport transfers** with instant voucher generation and zero hidden fees.

---

## 🧭 Application Flow

TripNest features a seamless, end-to-end user journey:

```text
       ┌────────────────────────────────────────────────────────┐
    1. │              🏠 ENHANCED LANDING PAGE                  │
       │  • Comprehensive Platform Showcase (What TripNest Is)  │
       │  • 3 Core Value Pillars (2M+ Stays, Genius, Flexibility)│
       │  • Interactive 3-Step Flow Banner                      │
       └───────────────────────────┬────────────────────────────┘
                                   │ Click "Sign in" or "Sign In to Dashboard"
                                   ▼
       ┌────────────────────────────────────────────────────────┐
    2. │             🔐 DEDICATED SEPARATE LOGIN                │
       │  • Centered authentication card with TripNest branding │
       │  • ⚡ 1-Click Quick Demo Login as Rohit (Genius Lvl 1)  │
       │  • Form validation & return to landing page action     │
       └───────────────────────────┬────────────────────────────┘
                                   │ Authenticate
                                   ▼
       ┌────────────────────────────────────────────────────────┐
    3. │              👤 ROHIT'S USER DASHBOARD                 │
       │  • Personalized profile with "R" gold avatar & perks   │
       │  • Metrics: Active Bookings, Saved Stays, 10% Discount │
       │  • Tabs: My Bookings (`TN-48291`), Wishlist Stays      │
       │  • "Search & Book Stays" and "Sign Out" actions        │
       └────────────────────────────────────────────────────────┘
```

---

## 🌟 Comprehensive Features

### 1. 🛏️ Stays & Accommodations
* **Intelligent Autocomplete**: Dynamic suggestions across popular cities (Chennai, Goa, Mumbai, Delhi, Bengaluru, Dubai, etc.) with recent searches caching.
* **Flexible Date Validation**: Interactive check-in/out calendars with dynamic night calculation and occupancy modal (Adults, Children, Rooms).
* **Interactive Leaflet Map**: Custom price pins with popups and synced hotel preview cards.
* **Granular Filtering & Sorting**: Filter by budget slider, property types (Hotels, Resorts, Villas, Apartments), guest review score, and amenities (Free WiFi, Pool, Free Breakfast, Free Parking, AC).
* **Complete Checkout Flow**: Prefilled guest information for Rohit, payment method options (Credit/Debit Card, UPI, Pay at Property), and instant confirmation voucher (`TN-XXXXX`) with printable receipts.

### 2. ✈️ Flights
* Search domestic & international routes (`DEL`, `BOM`, `MAA`, `BLR`, `GOX`, `DXB`).
* Quick route filters (`DEL ➔ BOM`, `MAA ➔ BLR`, `BLR ➔ GOA`, `BOM ➔ DXB`).
* Live flight comparison cards featuring **IndiGo**, **Air India**, **Vistara**, **Akasa Air**, and **Emirates**.
* Duration timeline bars, stops badges, cabin & check-in baggage allowances, and refundable tags.
* Instant e-ticket generation with confirmed reference IDs (`TN-FL-XXXXX`).

### 3. 🧳 Flight + Hotel (Holiday Packages)
* Curated vacation bundles saving up to 25% compared to separate bookings.
* Bundled destinations: Goa Coastal Getaway, Dubai Glamour & Marina Hotel, Kerala Backwaters, and Bali Tropical Haven.
* Inclusions breakdown: Return flights, 5-star verified resort, daily buffet breakfast, and airport transfers.
* Instant package voucher issuance (`TN-PKG-XXXXX`).

### 4. 🚗 Car Rentals
* Diverse rental fleet: Economy Hatchbacks (Swift), Comfort Sedans (City), Compact SUVs (Creta), 7-Seater Family MPVs (Innova Crysta), and Luxury Executive vehicles (Mercedes C-Class).
* Transparent rental specs: Transmission (Auto/Manual), fuel type, A/C, seating, luggage capacity, unlimited kilometers, and free cancellation up to 48 hours.
* Trusted suppliers: Avis, Hertz, Zoomcar, Europcar, and Sixt.

### 5. 🎡 Attractions & Experiences
* Destination activity search across top vacation hubs.
* Category filter chips: Water & Adventure Sports, Cultural & Heritage Tours, Iconic Landmarks, and Theme Parks.
* Highlights: Scuba diving & parasailing in Goa, sunrise Taj Mahal guided tour, Burj Khalifa 124th/125th floor observation deck, and Wonderla amusement park fastrack passes.
* Instant mobile QR barcode vouchers.

### 6. 🚕 Airport Taxis
* Guaranteed fixed-fare transfers from major airports (MAA, BLR, BOM, DEL, GOI).
* Transparent pricing inclusive of highway tolls and parking fees.
* Includes 45-minute complimentary waiting time from flight touchdown, real-time flight tracking, and meet & greet service inside the arrivals terminal.

### 7. 🏨 "List Your Property" Host Onboarding Portal
* Dedicated multi-step wizard accessible from the header and footer:
  1. **Category Selection**: Hotel, Apartment / Flat, Luxury Villa, Beach Resort, or Homestay/B&B.
  2. **Location Details**: Property name, city, neighborhood, and address with validation.
  3. **Pricing & Amenities**: Set nightly rate in INR, guest capacity, bedrooms, and amenities checklist.
  4. **Bio & Photo Themes**: Description and visual themes (Luxury Suites, Villa, Modern Flat, Tropical Resort).
  5. **Instant Live Publication**: Generates unique Host ID (`TN-HOST-XXXXX`) and inserts newly listed property directly into live search results!

---

## 🛠️ Tech Stack & Architecture

- **Core**: Semantic HTML5, Vanilla ES6+ JavaScript (Modular architecture, state management, LocalStorage persistence).
- **Styling**: Vanilla CSS3 using curated HSL & HEX design tokens, BEM conventions, custom scrollbars, and modern glassmorphic elevation.
- **Mapping**: [Leaflet.js](https://leafletjs.com/) with OpenStreetMap raster tiles and custom DOM markers.
- **Tooling & Bundling**: [Vite](https://vitejs.dev/) for high-speed local dev and optimized production builds.
- **Deployment**: Configured for seamless 1-click deployment on [Vercel](https://vercel.com/) with client-side SPA routing (`vercel.json`).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/srixram08/Tripnest.git
   cd Tripnest
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173/`.

4. **Create a production build**:
   ```bash
   npm run build
   ```

---

## ☁️ Deploy to Vercel

1. Push your repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com/).
3. Vercel automatically detects the Vite configuration:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. The included `vercel.json` ensures all single-page application routes resolve cleanly without 404s.

---

## 👤 Demo User Credentials

For testing authentication, member pricing, and dashboard features:
- **Name**: Rohit
- **Email**: `rohit@example.com`
- **Password**: `password123`
- **Genius Level**: Level 1 (10% lifetime discount)

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

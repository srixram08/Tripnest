// Comprehensive realistic dataset for Booking.com platform

export const PROPERTY_TYPES = [
  {
    id: 'hotels',
    title: 'Hotels',
    count: '912,414 hotels',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'apartments',
    title: 'Apartments',
    count: '942,842 apartments',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'resorts',
    title: 'Resorts',
    count: '38,241 resorts',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'villas',
    title: 'Villas',
    count: '481,230 villas',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cabins',
    title: 'Cabins',
    count: '39,410 cabins',
    image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=600&q=80'
  }
];

export const HOTELS_DATA = [
  {
    id: 'hotel-che-01',
    name: 'Grand Chennai Hotel & Luxury Suites',
    city: 'Chennai',
    area: 'T. Nagar, Chennai',
    country: 'India',
    distanceFromCenter: '1.2 km from centre',
    rating: 8.9,
    ratingText: 'Fabulous',
    reviewsCount: 2840,
    pricePerNight: 3800,
    propertyType: 'Hotel',
    stars: 5,
    coordinates: { lat: 13.0418, lng: 80.2341 },
    badge: 'Genius discount available',
    description: 'Centrally located in the heart of shopping hub T. Nagar, Grand Chennai Hotel offers opulent rooms, an indoor temperature-controlled pool, luxury wellness spa, and 3 premier restaurants serving international and authentic South Indian cuisine.',
    amenities: [
      'Free WiFi', 'Swimming Pool', 'Airport Shuttle', 'Spa & Wellness', 'Free Breakfast',
      'Free Cancellation', 'Free Parking', 'Fitness Centre', 'Restaurant', 'Air Conditioning'
    ],
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'
    ],
    rooms: [
      {
        id: 'room-che-deluxe',
        name: 'Deluxe King Room with City View',
        bed: '1 extra-large double bed',
        size: '38 m²',
        maxGuests: 2,
        price: 3800,
        inclusions: ['Free cancellation until 24h before', 'Breakfast included', 'No prepayment needed'],
        available: 4
      },
      {
        id: 'room-che-suite',
        name: 'Executive Premier Suite',
        bed: '1 large double bed + 1 sofa bed',
        size: '56 m²',
        maxGuests: 3,
        price: 6200,
        inclusions: ['Free cancellation', 'Breakfast & Dinner included', 'Lounge access'],
        available: 2
      },
      {
        id: 'room-che-family',
        name: 'Family Two-Bedroom Suite',
        bed: '2 extra-large double beds',
        size: '72 m²',
        maxGuests: 4,
        price: 8900,
        inclusions: ['Free cancellation', 'Free airport taxi transfer', 'Breakfast included'],
        available: 1
      }
    ],
    reviewsBreakdown: { cleanliness: 9.2, comfort: 9.1, location: 9.4, staff: 9.0, value: 8.7 }
  },
  {
    id: 'hotel-che-02',
    name: 'The Marina Bay Resort & Spa',
    city: 'Chennai',
    area: 'Mylapore / Marina Beach, Chennai',
    country: 'India',
    distanceFromCenter: '2.5 km from centre',
    rating: 9.2,
    ratingText: 'Exceptional',
    reviewsCount: 1950,
    pricePerNight: 5100,
    propertyType: 'Resort',
    stars: 5,
    coordinates: { lat: 13.0489, lng: 80.2785 },
    badge: 'Beachfront property',
    description: 'Overlooking the azure waters of the Bay of Bengal, The Marina Bay Resort provides a seaside escape with infinity beach views, colonial-inspired architecture, coastal seafood grill, and ayurvedic massage pavilions.',
    amenities: [
      'Free WiFi', 'Swimming Pool', 'Beachfront', 'Free Breakfast',
      'Free Cancellation', 'Free Parking', 'Spa & Wellness', 'Sea View'
    ],
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
    ],
    rooms: [
      {
        id: 'room-marina-ocean',
        name: 'Ocean View Balcony Room',
        bed: '1 large double bed',
        size: '42 m²',
        maxGuests: 2,
        price: 5100,
        inclusions: ['Free cancellation', 'Complimentary sunrise breakfast', 'Sea facing balcony'],
        available: 3
      },
      {
        id: 'room-marina-villa',
        name: 'Private Beach Chalet',
        bed: '1 king bed',
        size: '65 m²',
        maxGuests: 2,
        price: 9400,
        inclusions: ['Free cancellation', 'Private plunge pool', 'Butler service'],
        available: 1
      }
    ],
    reviewsBreakdown: { cleanliness: 9.4, comfort: 9.3, location: 9.6, staff: 9.2, value: 8.9 }
  },
  {
    id: 'hotel-del-01',
    name: 'The Imperial Heritage Hotel',
    city: 'New Delhi',
    area: 'Connaught Place, New Delhi',
    country: 'India',
    distanceFromCenter: '0.5 km from centre',
    rating: 9.3,
    ratingText: 'Exceptional',
    reviewsCount: 4210,
    pricePerNight: 7500,
    propertyType: 'Hotel',
    stars: 5,
    coordinates: { lat: 28.6289, lng: 77.2185 },
    badge: 'Top Rated in New Delhi',
    description: 'An iconic museum hotel blending Victorian and Art Deco grandeur with classical Indian royal motifs. Located steps away from Connaught Place and India Gate, featuring award-winning dining and curated royal gardens.',
    amenities: [
      'Free WiFi', 'Swimming Pool', 'Airport Shuttle', 'Spa & Wellness',
      'Free Breakfast', 'Free Cancellation', 'Fine Dining', 'Historic'
    ],
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ],
    rooms: [
      {
        id: 'room-del-heritage',
        name: 'Heritage Grand Room',
        bed: '1 large double bed',
        size: '45 m²',
        maxGuests: 2,
        price: 7500,
        inclusions: ['Free cancellation', 'Full English & Indian breakfast included', 'Welcome champagne'],
        available: 5
      },
      {
        id: 'room-del-royal',
        name: 'Viceroy Presidential Suite',
        bed: '1 royal king bed',
        size: '90 m²',
        maxGuests: 2,
        price: 18500,
        inclusions: ['Free cancellation', 'Private dining chef', 'Chauffeur airport transfer'],
        available: 1
      }
    ],
    reviewsBreakdown: { cleanliness: 9.6, comfort: 9.5, location: 9.7, staff: 9.4, value: 9.0 }
  },
  {
    id: 'hotel-del-02',
    name: 'AeroCity Boutique Hotel & Suites',
    city: 'New Delhi',
    area: 'Aerocity, Indira Gandhi Intl Airport, New Delhi',
    country: 'India',
    distanceFromCenter: '12 km from centre (Near Airport)',
    rating: 8.7,
    ratingText: 'Fabulous',
    reviewsCount: 3120,
    pricePerNight: 3200,
    propertyType: 'Hotel',
    stars: 4,
    coordinates: { lat: 28.5529, lng: 77.1218 },
    badge: 'Free Airport Shuttle',
    description: 'Designed for international flyers and business travelers, AeroCity Boutique Hotel provides soundproof suites, express check-in, 24-hour room dining, and rapid shuttle service to Terminal 3.',
    amenities: [
      'Free WiFi', 'Airport Shuttle', 'Free Breakfast', 'Free Cancellation',
      '24/7 Front Desk', 'Soundproof Rooms', 'Free Parking'
    ],
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
    ],
    rooms: [
      {
        id: 'room-del-trans',
        name: 'Transit Comfort Room',
        bed: '1 queen bed',
        size: '30 m²',
        maxGuests: 2,
        price: 3200,
        inclusions: ['Free cancellation', 'Continental breakfast', 'Free terminal drop-off'],
        available: 8
      }
    ],
    reviewsBreakdown: { cleanliness: 8.9, comfort: 8.8, location: 9.2, staff: 8.8, value: 8.9 }
  },
  {
    id: 'hotel-blr-01',
    name: 'Garden City Luxury Villas & Suites',
    city: 'Bengaluru',
    area: 'Indiranagar / MG Road, Bengaluru',
    country: 'India',
    distanceFromCenter: '1.8 km from centre',
    rating: 9.1,
    ratingText: 'Exceptional',
    reviewsCount: 2410,
    pricePerNight: 4600,
    propertyType: 'Hotel',
    stars: 5,
    coordinates: { lat: 12.9716, lng: 77.5946 },
    badge: 'Popular with business travellers',
    description: 'Immersed in lush greenery right by Indiranagar, this 5-star haven offers rooftop solar-heated pools, award-winning microbrewery pairings, ultra-fast gigabit fiber WiFi, and ergonomic workstations.',
    amenities: [
      'Free WiFi', 'Swimming Pool', 'Fitness Centre', 'Free Breakfast',
      'Free Cancellation', 'Rooftop Bar', 'Business Center'
    ],
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'
    ],
    rooms: [
      {
        id: 'room-blr-deluxe',
        name: 'Executive Studio with Garden Terrace',
        bed: '1 king bed',
        size: '40 m²',
        maxGuests: 2,
        price: 4600,
        inclusions: ['Free cancellation', 'Full breakfast', 'Express laundry service'],
        available: 6
      },
      {
        id: 'room-blr-villa',
        name: 'Private Pool Villa',
        bed: '2 double beds',
        size: '80 m²',
        maxGuests: 4,
        price: 9900,
        inclusions: ['Free cancellation', 'Private garden', 'All meals included'],
        available: 2
      }
    ],
    reviewsBreakdown: { cleanliness: 9.3, comfort: 9.2, location: 9.3, staff: 9.1, value: 8.8 }
  },
  {
    id: 'hotel-bom-01',
    name: 'The Gateway Waterfront Hotel Mumbai',
    city: 'Mumbai',
    area: 'Colaba, Mumbai',
    country: 'India',
    distanceFromCenter: '0.4 km from Gateway of India',
    rating: 9.4,
    ratingText: 'Wonderful',
    reviewsCount: 3890,
    pricePerNight: 8200,
    propertyType: 'Hotel',
    stars: 5,
    coordinates: { lat: 18.9220, lng: 72.8347 },
    badge: 'Overlooks Gateway of India',
    description: 'Standing proudly across from the Arabian Sea, this heritage luxury hotel offers legendary Indian hospitality, rooms decorated with hand-knotted silk rugs, an outdoor pool deck, and world-class pastry boutiques.',
    amenities: [
      'Free WiFi', 'Swimming Pool', 'Sea View', 'Airport Shuttle',
      'Free Breakfast', 'Free Cancellation', 'Spa & Wellness'
    ],
    images: [
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ],
    rooms: [
      {
        id: 'room-bom-sea',
        name: 'Luxury Sea-Facing Chamber',
        bed: '1 extra-large king bed',
        size: '48 m²',
        maxGuests: 2,
        price: 8200,
        inclusions: ['Free cancellation', 'Harbour view breakfast', 'Complimentary high tea'],
        available: 4
      }
    ],
    reviewsBreakdown: { cleanliness: 9.7, comfort: 9.6, location: 9.8, staff: 9.5, value: 9.0 }
  },
  {
    id: 'hotel-goa-01',
    name: 'Candolim Sunset Palm Beach Resort',
    city: 'Goa',
    area: 'Candolim Beach, North Goa',
    country: 'India',
    distanceFromCenter: '0.1 km from beach',
    rating: 9.0,
    ratingText: 'Superb',
    reviewsCount: 2280,
    pricePerNight: 3900,
    propertyType: 'Resort',
    stars: 4,
    coordinates: { lat: 15.5173, lng: 73.7635 },
    badge: '1 minute walk to beach',
    description: 'Set amidst swaying coconut groves right on Candolim golden sands. Enjoy beach shack cocktails, live Goan acoustic music, poolside cabanas, and watersports arrangements.',
    amenities: [
      'Free WiFi', 'Swimming Pool', 'Beachfront', 'Free Breakfast',
      'Free Cancellation', 'Poolside Bar', 'Free Parking'
    ],
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'
    ],
    rooms: [
      {
        id: 'room-goa-deluxe',
        name: 'Poolside Tropical Cottage',
        bed: '1 queen bed',
        size: '35 m²',
        maxGuests: 2,
        price: 3900,
        inclusions: ['Free cancellation', 'Goan breakfast spread', 'Direct pool access'],
        available: 7
      }
    ],
    reviewsBreakdown: { cleanliness: 9.1, comfort: 9.0, location: 9.5, staff: 9.2, value: 9.1 }
  },
  {
    id: 'hotel-jai-01',
    name: 'The Pink City Palace Heritage Suites',
    city: 'Jaipur',
    area: 'Civil Lines, Jaipur',
    country: 'India',
    distanceFromCenter: '2.0 km from Hawa Mahal',
    rating: 9.3,
    ratingText: 'Exceptional',
    reviewsCount: 1740,
    pricePerNight: 4200,
    propertyType: 'Hotel',
    stars: 5,
    coordinates: { lat: 26.9124, lng: 75.7873 },
    badge: 'Historic Royal Property',
    description: 'A restored 19th-century royal mansion featuring intricate marble jalis, fresco-painted courtyards, traditional folk dances every evening, and authentic Rajasthani thali feasts.',
    amenities: [
      'Free WiFi', 'Swimming Pool', 'Spa & Wellness', 'Free Breakfast',
      'Free Cancellation', 'Cultural Performances', 'Free Parking'
    ],
    images: [
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ],
    rooms: [
      {
        id: 'room-jai-haveli',
        name: 'Royal Haveli Room',
        bed: '1 hand-carved four poster bed',
        size: '42 m²',
        maxGuests: 2,
        price: 4200,
        inclusions: ['Free cancellation', 'Royal Rajasthani breakfast', 'Palace tour'],
        available: 5
      }
    ],
    reviewsBreakdown: { cleanliness: 9.4, comfort: 9.3, location: 9.2, staff: 9.5, value: 9.2 }
  },
  {
    id: 'hotel-hyd-01',
    name: 'The Nizam Grand Residences',
    city: 'Hyderabad',
    area: 'Banjara Hills, Hyderabad',
    country: 'India',
    distanceFromCenter: '3.5 km from centre',
    rating: 9.0,
    ratingText: 'Superb',
    reviewsCount: 2150,
    pricePerNight: 3600,
    propertyType: 'Hotel',
    stars: 5,
    coordinates: { lat: 17.4126, lng: 78.4482 },
    badge: 'Famous for Hyderabadi Dum Biryani',
    description: 'Set on the scenic heights of Banjara Hills with panoramic views of the city lakes. Features an iconic specialty restaurant famous for royal Hyderabadi Biryani and a glass-enclosed fitness center.',
    amenities: [
      'Free WiFi', 'Swimming Pool', 'Fitness Centre', 'Free Breakfast',
      'Free Cancellation', 'Restaurant', 'Free Parking'
    ],
    images: [
      'https://images.unsplash.com/photo-1605007493699-ce65834f8a00?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ],
    rooms: [
      {
        id: 'room-hyd-deluxe',
        name: 'Lake View Deluxe King',
        bed: '1 king bed',
        size: '36 m²',
        maxGuests: 2,
        price: 3600,
        inclusions: ['Free cancellation', 'Buffet breakfast included', 'High speed WiFi'],
        available: 6
      }
    ],
    reviewsBreakdown: { cleanliness: 9.2, comfort: 9.0, location: 9.1, staff: 9.1, value: 8.9 }
  }
];

export const TRENDING_DESTINATIONS = [
  {
    id: 'delhi',
    name: 'New Delhi',
    flag: '🇮🇳',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80',
    subtitle: 'India Gate & vibrant heritage',
    span: 'large'
  },
  {
    id: 'bangalore',
    name: 'Bengaluru',
    flag: '🇮🇳',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1000&q=80',
    subtitle: 'Silicon Valley & garden city',
    span: 'large'
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    flag: '🇮🇳',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80',
    subtitle: 'Gateway of India & Marine Drive',
    span: 'small'
  },
  {
    id: 'chennai',
    name: 'Chennai',
    flag: '🇮🇳',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
    subtitle: 'Historic architecture & coastal charm',
    span: 'small'
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    flag: '🇮🇳',
    image: 'https://images.unsplash.com/photo-1605007493699-ce65834f8a00?auto=format&fit=crop&w=600&q=80',
    subtitle: 'Charminar & royal culinary delights',
    span: 'small'
  }
];

export const TRIP_PLANNER = {
  categories: [
    { id: 'beach', label: 'Beach vibe' },
    { id: 'monuments', label: 'Monuments & shopping' },
    { id: 'cultural', label: 'Cultural & historic' },
    { id: 'romantic', label: 'Romantic' },
    { id: 'nature', label: 'Nature lovers' },
    { id: 'food', label: 'Foodie tour' }
  ],
  items: {
    beach: [
      { name: 'Chennai', distance: '120 km away', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=500&q=80' },
      { name: 'Goa', distance: '540 km away', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=500&q=80' },
      { name: 'Cochin', distance: '202 km away', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=500&q=80' },
      { name: 'Varkala', distance: '153 km away', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80' },
      { name: 'Pondicherry', distance: '150 km away', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=500&q=80' },
      { name: 'Gokarna', distance: '690 km away', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80' }
    ],
    monuments: [
      { name: 'Jaipur', distance: '240 km away', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=500&q=80' },
      { name: 'Agra', distance: '210 km away', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=500&q=80' },
      { name: 'New Delhi', distance: '180 km away', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=500&q=80' },
      { name: 'Udaipur', distance: '390 km away', image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=500&q=80' }
    ],
    cultural: [
      { name: 'Varanasi', distance: '320 km away', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=500&q=80' },
      { name: 'Madurai', distance: '430 km away', image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=500&q=80' },
      { name: 'Hampi', distance: '350 km away', image: 'https://images.unsplash.com/photo-1600100397608-f010f4438df3?auto=format&fit=crop&w=500&q=80' }
    ],
    romantic: [
      { name: 'Munnar', distance: '130 km away', image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=500&q=80' },
      { name: 'Ooty', distance: '270 km away', image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=500&q=80' },
      { name: 'Udaipur', distance: '420 km away', image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=500&q=80' }
    ],
    nature: [
      { name: 'Coorg', distance: '250 km away', image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=500&q=80' },
      { name: 'Wayanad', distance: '280 km away', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80' },
      { name: 'Manali', distance: '530 km away', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=500&q=80' }
    ],
    food: [
      { name: 'Hyderabad', distance: '500 km away', image: 'https://images.unsplash.com/photo-1605007493699-ce65834f8a00?auto=format&fit=crop&w=500&q=80' },
      { name: 'Chennai', distance: '120 km away', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=500&q=80' },
      { name: 'Kolkata', distance: '620 km away', image: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=500&q=80' }
    ]
  }
};

export const EXPLORE_INDIA = [
  { name: 'Chennai', count: '1,431 properties', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=500&q=80' },
  { name: 'New Delhi', count: '4,395 properties', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=500&q=80' },
  { name: 'Bengaluru', count: '3,150 properties', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=500&q=80' },
  { name: 'Mumbai', count: '1,845 properties', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=500&q=80' },
  { name: 'Hyderabad', count: '2,147 properties', image: 'https://images.unsplash.com/photo-1605007493699-ce65834f8a00?auto=format&fit=crop&w=500&q=80' },
  { name: 'Goa', count: '2,890 properties', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=500&q=80' }
];

export const HOMES_GUESTS_LOVE = [
  {
    id: 'stay-1',
    name: 'Aparthotel Stare Miasto',
    city: 'Old Town, Krakow',
    country: 'Poland',
    rating: 8.9,
    ratingText: 'Fabulous',
    reviews: '2,341 reviews',
    price: 8470,
    badge: 'Preferred Plus',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'stay-2',
    name: '7Seasons Apartments Budapest',
    city: '06. Terézváros, Budapest',
    country: 'Hungary',
    rating: 9.1,
    ratingText: 'Exceptional',
    reviews: '1,920 reviews',
    price: 14200,
    badge: 'Superb location',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'stay-3',
    name: 'Tina-view Apartments Budapest',
    city: '01. Budavár, Budapest',
    country: 'Hungary',
    rating: 9.4,
    ratingText: 'Wonderful',
    reviews: '2,079 reviews',
    price: 12300,
    badge: 'Panoramic views',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'stay-4',
    name: 'Sugar Loft Apartments',
    city: 'Santa Teresa, Rio de Janeiro',
    country: 'Brazil',
    rating: 9.0,
    ratingText: 'Superb',
    reviews: '980 reviews',
    price: 9800,
    badge: 'Free cancellation',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
  }
];

export const POPULAR_LOCATIONS = {
  domestic: [
    'Chennai Hotels', 'Goa Hotels', 'Mumbai Hotels', 'Bengaluru Hotels', 'Delhi Hotels', 'Jaipur Hotels',
    'Shimla Hotels', 'Manali Hotels', 'Ooty Hotels', 'Kodaikanal Hotels', 'Pondicherry Hotels',
    'Hyderabad Hotels', 'Kolkata Hotels', 'Agra Hotels', 'Udaipur Hotels', 'Munnar Hotels'
  ],
  international: [
    'Dubai Hotels', 'Singapore Hotels', 'Bangkok Hotels', 'London Hotels', 'Paris Hotels',
    'New York Hotels', 'Bali Resorts', 'Phuket Hotels', 'Kuala Lumpur Hotels', 'Rome Hotels',
    'Tokyo Hotels', 'Amsterdam Hotels', 'Barcelona Hotels', 'Maldives Resorts'
  ],
  regions: [
    'Tamil Nadu', 'Kerala', 'Rajasthan', 'Goa', 'Himachal Pradesh', 'Uttarakhand',
    'Karnataka', 'Maharashtra', 'Kashmir Valley', 'Sikkim', 'Andaman & Nicobar'
  ],
  countries: [
    'India', 'United Arab Emirates', 'Thailand', 'United States', 'United Kingdom',
    'Singapore', 'Indonesia', 'Malaysia', 'France', 'Italy', 'Switzerland'
  ],
  placesToStay: [
    'Hotels in Chennai', 'Beach Resorts in Goa', 'Hotels in North Goa', 'Villas in Lonavala',
    'Resorts in Coorg', 'Heritage Hotels in Jaipur', 'Houseboats in Kerala', 'Luxury Resorts in Udaipur'
  ]
};

export const SUGGESTIONS = [
  { name: 'Chennai', region: 'Tamil Nadu, India', type: 'City', icon: 'map-pin' },
  { name: 'New Delhi', region: 'National Capital Territory of India, India', type: 'City', icon: 'map-pin' },
  { name: 'Bengaluru', region: 'Karnataka, India', type: 'City', icon: 'map-pin' },
  { name: 'Mumbai', region: 'Maharashtra, India', type: 'City', icon: 'map-pin' },
  { name: 'Goa', region: 'Goa, India', type: 'Region', icon: 'sun' },
  { name: 'Jaipur', region: 'Rajasthan, India', type: 'City', icon: 'map-pin' },
  { name: 'Hyderabad', region: 'Telangana, India', type: 'City', icon: 'map-pin' },
  { name: 'Dubai', region: 'United Arab Emirates', type: 'City', icon: 'globe' },
  { name: 'Singapore', region: 'Singapore', type: 'Country', icon: 'globe' },
  { name: 'London', region: 'United Kingdom', type: 'City', icon: 'globe' },
  { name: 'Paris', region: 'France', type: 'City', icon: 'globe' }
];

export const FLIGHTS_DATA = [
  {
    id: 'fl-6e-204',
    airline: 'IndiGo',
    flightNumber: '6E-204',
    logoColor: '#002f6c',
    originCity: 'New Delhi',
    originCode: 'DEL',
    destCity: 'Mumbai',
    destCode: 'BOM',
    departureTime: '06:30',
    arrivalTime: '08:45',
    duration: '2h 15m',
    stops: 'Non-stop',
    price: 4320,
    cabinClass: 'Economy',
    baggage: '7 kg cabin + 15 kg check-in',
    refundable: true,
    badge: 'Cheapest'
  },
  {
    id: 'fl-ai-865',
    airline: 'Air India',
    flightNumber: 'AI-865',
    logoColor: '#e01e26',
    originCity: 'New Delhi',
    originCode: 'DEL',
    destCity: 'Mumbai',
    destCode: 'BOM',
    departureTime: '09:15',
    arrivalTime: '11:35',
    duration: '2h 20m',
    stops: 'Non-stop',
    price: 4890,
    cabinClass: 'Economy',
    baggage: '7 kg cabin + 25 kg check-in (Free hot meal)',
    refundable: true,
    badge: 'Popular'
  },
  {
    id: 'fl-uk-991',
    airline: 'Vistara',
    flightNumber: 'UK-991',
    logoColor: '#531b46',
    originCity: 'New Delhi',
    originCode: 'DEL',
    destCity: 'Mumbai',
    destCode: 'BOM',
    departureTime: '17:40',
    arrivalTime: '19:55',
    duration: '2h 15m',
    stops: 'Non-stop',
    price: 5240,
    cabinClass: 'Economy',
    baggage: '7 kg cabin + 15 kg check-in (In-flight dining)',
    refundable: true,
    badge: 'Fastest'
  },
  {
    id: 'fl-6e-551',
    airline: 'IndiGo',
    flightNumber: '6E-551',
    logoColor: '#002f6c',
    originCity: 'Chennai',
    originCode: 'MAA',
    destCity: 'Bengaluru',
    destCode: 'BLR',
    departureTime: '07:10',
    arrivalTime: '08:05',
    duration: '0h 55m',
    stops: 'Non-stop',
    price: 2850,
    cabinClass: 'Economy',
    baggage: '7 kg cabin + 15 kg check-in',
    refundable: false,
    badge: 'Best Value'
  },
  {
    id: 'fl-qp-133',
    airline: 'Akasa Air',
    flightNumber: 'QP-1331',
    logoColor: '#ff6200',
    originCity: 'Bengaluru',
    originCode: 'BLR',
    destCity: 'Goa (Mopa)',
    destCode: 'GOX',
    departureTime: '11:20',
    arrivalTime: '12:35',
    duration: '1h 15m',
    stops: 'Non-stop',
    price: 3190,
    cabinClass: 'Economy',
    baggage: '7 kg cabin + 15 kg check-in',
    refundable: true,
    badge: 'Genius 10% off'
  },
  {
    id: 'fl-ek-501',
    airline: 'Emirates',
    flightNumber: 'EK-501',
    logoColor: '#d71921',
    originCity: 'Mumbai',
    originCode: 'BOM',
    destCity: 'Dubai',
    destCode: 'DXB',
    departureTime: '04:30',
    arrivalTime: '06:15',
    duration: '3h 15m',
    stops: 'Non-stop',
    price: 18450,
    cabinClass: 'Economy',
    baggage: '7 kg cabin + 30 kg check-in (Gourmet meals)',
    refundable: true,
    badge: 'International'
  }
];

export const PACKAGES_DATA = [
  {
    id: 'pkg-goa-01',
    title: 'Goa Coastal Getaway & Sunset Beach Villa',
    destination: 'Goa, India',
    nights: '3 Nights / 4 Days',
    hotelName: 'Taj Holiday Village Resort & Spa',
    flightSummary: 'IndiGo round-trip flight included',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    rating: 9.3,
    reviews: 1420,
    originalPrice: 28900,
    price: 21990,
    savings: 6910,
    badge: 'Save 24%',
    includes: ['Round-trip Flights', '5-Star Beach Resort', 'Daily Buffet Breakfast', 'Airport Transfer']
  },
  {
    id: 'pkg-dubai-02',
    title: 'Dubai Glamour: Marina Hotel & Skyline Tour',
    destination: 'Dubai, UAE',
    nights: '4 Nights / 5 Days',
    hotelName: 'Address Dubai Marina Hotel',
    flightSummary: 'Emirates direct return flight included',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
    rating: 9.5,
    reviews: 2180,
    originalPrice: 72000,
    price: 54990,
    savings: 17010,
    badge: 'Save 25%',
    includes: ['Emirates Flights', 'Luxury Marina Suite', 'Desert Safari + BBQ', 'Burj Khalifa Tickets']
  },
  {
    id: 'pkg-kerala-03',
    title: 'Kerala Backwaters & Munnar Hills Escape',
    destination: 'Kerala, India',
    nights: '4 Nights / 5 Days',
    hotelName: 'Kumarakom Lake Resort & Heritage Villa',
    flightSummary: 'Air India direct flight included',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80',
    rating: 9.2,
    reviews: 980,
    originalPrice: 34500,
    price: 26900,
    savings: 7600,
    badge: 'Save 22%',
    includes: ['Return Flights', 'Houseboat Cruise', 'Ayurvedic Spa Voucher', 'Private Cab Transfer']
  },
  {
    id: 'pkg-bali-04',
    title: 'Bali Tropical Haven: Ubud Villa & Seminyak Beach',
    destination: 'Bali, Indonesia',
    nights: '5 Nights / 6 Days',
    hotelName: 'Kamandalu Ubud Private Pool Villa',
    flightSummary: 'Return flight via Singapore Airlines',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
    rating: 9.6,
    reviews: 1840,
    originalPrice: 65000,
    price: 48990,
    savings: 16010,
    badge: 'Save 25%',
    includes: ['International Flights', 'Private Pool Villa', 'Floating Breakfast', 'Full Day Island Tour']
  }
];

export const CARS_DATA = [
  {
    id: 'car-swift',
    name: 'Maruti Suzuki Swift',
    category: 'Economy Hatchback',
    supplier: 'Zoomcar / Avis',
    seats: 5,
    doors: 4,
    bags: 2,
    transmission: 'Manual',
    fuel: 'Petrol',
    ac: true,
    mileage: 'Unlimited km',
    cancellation: 'Free cancellation up to 48h',
    pricePerDay: 1450,
    rating: 8.8,
    reviews: 640,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    badge: 'Most Popular'
  },
  {
    id: 'car-city',
    name: 'Honda City',
    category: 'Comfort Sedan',
    supplier: 'Hertz Drive',
    seats: 5,
    doors: 4,
    bags: 3,
    transmission: 'Automatic (CVT)',
    fuel: 'Petrol',
    ac: true,
    mileage: 'Unlimited km',
    cancellation: 'Free cancellation up to 24h',
    pricePerDay: 2200,
    rating: 9.1,
    reviews: 820,
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=600&q=80',
    badge: 'Top Pick'
  },
  {
    id: 'car-creta',
    name: 'Hyundai Creta',
    category: 'Compact SUV',
    supplier: 'Avis Premium',
    seats: 5,
    doors: 5,
    bags: 4,
    transmission: 'Automatic',
    fuel: 'Diesel',
    ac: true,
    mileage: 'Unlimited km',
    cancellation: 'Free cancellation',
    pricePerDay: 2950,
    rating: 9.0,
    reviews: 1120,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    badge: 'Great for Hills'
  },
  {
    id: 'car-innova',
    name: 'Toyota Innova Crysta',
    category: '7-Seater Family MPV',
    supplier: 'Europcar Fleet',
    seats: 7,
    doors: 5,
    bags: 5,
    transmission: 'Manual',
    fuel: 'Diesel',
    ac: true,
    mileage: 'Unlimited km',
    cancellation: 'Free cancellation',
    pricePerDay: 3800,
    rating: 9.4,
    reviews: 1450,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=600&q=80',
    badge: 'Best for Groups'
  },
  {
    id: 'car-merc',
    name: 'Mercedes-Benz C-Class',
    category: 'Luxury Executive',
    supplier: 'Sixt Prestige',
    seats: 5,
    doors: 4,
    bags: 3,
    transmission: 'Automatic',
    fuel: 'Petrol',
    ac: true,
    mileage: 'Unlimited km',
    cancellation: 'Free cancellation up to 24h',
    pricePerDay: 8900,
    rating: 9.6,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80',
    badge: 'Luxury Experience'
  }
];

export const ATTRACTIONS_DATA = [
  {
    id: 'att-goa-scuba',
    title: 'Scuba Diving & Island Watersports with Parasailing',
    city: 'Goa',
    category: 'Water & Adventure Sports',
    duration: '6 hours',
    rating: 9.2,
    reviews: 2150,
    price: 1899,
    originalPrice: 2800,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    badge: 'Bestseller',
    features: ['Instant Confirmation', 'Certified PADI Instructor', 'GoPro HD Video Included', 'Free Hotel Pickup']
  },
  {
    id: 'att-taj-tour',
    title: 'Skip-the-Line Taj Mahal & Agra Fort Private Sunrise Tour',
    city: 'Agra / Delhi',
    category: 'Cultural & Heritage Tours',
    duration: '8 hours',
    rating: 9.7,
    reviews: 3840,
    price: 1450,
    originalPrice: 2100,
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80',
    badge: 'Must Visit',
    features: ['Skip the ticket line', 'Expert Historian Guide', 'Air-conditioned vehicle', 'Free cancellation']
  },
  {
    id: 'att-burj-sky',
    title: 'Burj Khalifa At The Top: 124th & 125th Floor Observation Deck',
    city: 'Dubai',
    category: 'Iconic Landmarks',
    duration: '2 hours',
    rating: 9.5,
    reviews: 8420,
    price: 3650,
    originalPrice: 4200,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
    badge: 'Top Worldwide',
    features: ['High-speed elevators', 'Panoramic 360° views', 'Telescopes access', 'Mobile barcode voucher']
  },
  {
    id: 'att-wonderla-blr',
    title: 'Wonderla Amusement Park All-Day Entry Pass with Fastrack',
    city: 'Bengaluru',
    category: 'Theme Parks & Entertainment',
    duration: 'Full day',
    rating: 9.1,
    reviews: 1680,
    price: 1299,
    originalPrice: 1650,
    image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&w=600&q=80',
    badge: 'Family Favorite',
    features: ['60+ land & water rides', 'Free Locker Access', 'Instant QR code entry', 'Rain disco & wave pool']
  }
];

export const TAXIS_DATA = [
  {
    id: 'taxi-standard',
    name: 'Standard Sedan Transfer',
    model: 'Toyota Etios / Suzuki Dzire or similar',
    passengers: 4,
    luggage: 3,
    priceEstimate: 1190,
    features: [
      'Meet & Greet with name sign inside terminal',
      'Flight tracked in real-time for delays',
      '45 minutes complimentary waiting time',
      'Free cancellation up to 24 hours before pickup',
      'Air-conditioned clean vehicle with verified driver'
    ],
    badge: 'Most Economical'
  },
  {
    id: 'taxi-executive',
    name: 'Executive Comfort Sedan',
    model: 'Skoda Octavia / Honda City or similar',
    passengers: 4,
    luggage: 4,
    priceEstimate: 1850,
    features: [
      'Priority VIP terminal pickup',
      'Leather interior & onboard bottled water & WiFi',
      '60 minutes complimentary waiting time',
      'Flight tracked live',
      'Top-rated chauffeur'
    ],
    badge: 'Business Choice'
  },
  {
    id: 'taxi-van',
    name: 'People Carrier / Family Van',
    model: 'Toyota Innova Crysta / Ertiga',
    passengers: 6,
    luggage: 6,
    priceEstimate: 2450,
    features: [
      'Spacious seating for groups & family luggage',
      'Terminal meet & greet with baggage assistance',
      'Flight delay guarantee',
      'Fixed transparent price (toll & parking inclusive)',
      'Free cancellation'
    ],
    badge: 'Best for Groups'
  },
  {
    id: 'taxi-luxury',
    name: 'Luxury Premium SUV',
    model: 'Audi Q7 / BMW X5 or similar',
    passengers: 4,
    luggage: 4,
    priceEstimate: 5490,
    features: [
      'Uniformed personal chauffeur service',
      'Luxury leather reclining seats & refreshments',
      '90 minutes complimentary waiting time',
      'Complimentary highway tolls & airport parking'
    ],
    badge: 'First Class'
  }
];


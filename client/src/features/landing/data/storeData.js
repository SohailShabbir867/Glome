export const topBarData = {
  perks: ['Free shipping on orders over $50', 'Easy 30-day returns', 'Secure payments'],
  links: [
    { label: 'Track Order', href: '/track-order' },
    { label: 'Help', href: '/help' },
    { label: 'Login / Register', href: '/login' },
  ],
};

export const navLinks = [
  { label: 'Home', href: '/', active: true },
  { label: 'Shop', href: '/shop', hasDropdown: true },
  { label: 'Men', href: '/explore?cat=men', hasDropdown: true },
  { label: 'Women', href: '/explore?cat=women', hasDropdown: true },
  { label: 'Shoes', href: '/explore?cat=shoes', hasDropdown: true },
  { label: 'Accessories', href: '/explore?cat=accessories', hasDropdown: true },
  { label: 'New Arrivals', href: '/explore?filter=new' },
  { label: 'Sale', href: '/explore?filter=sale' },
];

export const heroData = {
  badge: 'NEW SEASON COLLECTION',
  titlePart1: 'Style That',
  titlePart2: 'Fits ',
  titleAccent: 'Your Story',
  description:
    'Discover premium clothing, trendy footwear and lifestyle essentials designed for your everyday adventures.',
  primaryCta: 'Shop Now',
  secondaryCta: 'Explore Collection',
  trustPoints: [
    {
      title: 'Free Shipping',
      subtitle: 'on orders over $50',
      icon: 'Truck',
    },
    {
      title: 'Secure Payments',
      subtitle: '100% safe & trusted',
      icon: 'ShieldCheck',
    },
    {
      title: 'Easy Returns',
      subtitle: 'within 30 days',
      icon: 'RotateCcw',
    },
  ],
  modelImage:
    'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85',
  scriptText: 'Better Style Bigger Dreams',
  sideCards: [
    {
      title: "Men's Wear",
      link: '/explore?cat=men',
      image:
        'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=500&q=80',
    },
    {
      title: 'Footwear',
      link: '/explore?cat=shoes',
      image:
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=500&q=80',
    },
    {
      title: 'Accessories',
      link: '/explore?cat=accessories',
      image:
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=500&q=80',
    },
  ],
};

export const circleCategories = [
  {
    id: 'men',
    title: "Men's Clothing",
    subtitle: 'Shirts, Tees, Jackets',
    image:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80',
    link: '/explore?cat=men',
  },
  {
    id: 'women',
    title: "Women's Clothing",
    subtitle: 'Dresses, Tops, Sets',
    image:
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=400&q=80',
    link: '/explore?cat=women',
  },
  {
    id: 'shoes',
    title: 'Shoes',
    subtitle: 'Sneakers, Boots, Sandals',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
    link: '/explore?cat=shoes',
  },
  {
    id: 'accessories',
    title: 'Accessories',
    subtitle: 'Bags, Watches, Sunglasses',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80',
    link: '/explore?cat=accessories',
  },
  {
    id: 'beauty',
    title: 'Beauty & Personal Care',
    subtitle: 'Skincare, Fragrance',
    image:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80',
    link: '/explore?cat=beauty',
  },
  {
    id: 'home',
    title: 'Home & Living',
    subtitle: 'Decor, Essentials',
    image:
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=400&q=80',
    link: '/explore?cat=home',
  },
  {
    id: 'electronics',
    title: 'Electronics',
    subtitle: 'Headphones, Gadgets',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
    link: '/explore?cat=electronics',
  },
  {
    id: 'sports',
    title: 'Sports & Fitness',
    subtitle: 'Activewear, Gear',
    image:
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=400&q=80',
    link: '/explore?cat=sports',
  },
];

export const bestSellers = [
  {
    id: 'bs-1',
    name: 'Premium Hoodie',
    price: 49.99,
    rating: 4.8,
    reviews: 142,
    badge: 'best seller',
    image:
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    colors: ['#0b3b2c', '#d5c4b1', '#1f2937'],
  },
  {
    id: 'bs-2',
    name: 'Classic Sneakers',
    price: 69.99,
    rating: 4.7,
    reviews: 98,
    image:
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80',
    colors: ['#ffffff', '#0ea5e9', '#111827', '#e5d0b5'],
  },
  {
    id: 'bs-3',
    name: 'Linen Shirt',
    price: 39.99,
    rating: 4.6,
    reviews: 76,
    image:
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    colors: ['#e6dbca', '#556b2f', '#ffffff'],
  },
  {
    id: 'bs-4',
    name: 'Luxury Watch',
    price: 129.99,
    rating: 4.9,
    reviews: 215,
    isGhostButton: true,
    image:
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80',
    colors: ['#111827', '#7c3aed', '#b45309'],
  },
  {
    id: 'bs-5',
    name: 'Leather Handbag',
    price: 79.99,
    rating: 4.7,
    reviews: 110,
    image:
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
    colors: ['#92400e', '#000000', '#f5f5f4'],
  },
  {
    id: 'bs-6',
    name: 'Baseball Cap',
    price: 24.99,
    rating: 4.6,
    reviews: 64,
    image:
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80',
    colors: ['#4b5320', '#d2b48c', '#18181b'],
  },
];

export const promoBanners = [
  {
    id: 'promo-1',
    variant: 'light',
    title: "Women's Fashion",
    subtitle: 'Elegant Looks for Every Moment',
    ctaText: 'Shop Now',
    link: '/explore?cat=women',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'promo-2',
    variant: 'green',
    title: 'Footwear Collection',
    eyebrow: 'Step Into Comfort & Style',
    discount: 'Up to 40% Off',
    ctaText: 'Shop Now',
    link: '/explore?cat=shoes',
    image:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'promo-3',
    variant: 'neutral',
    title: 'Accessories That Complete You',
    subtitle: 'Small Details. Big Impact.',
    ctaText: 'Explore',
    link: '/explore?cat=accessories',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
  },
];

export const popularProducts = [
  {
    id: 'pop-1',
    name: 'Varsity Jacket',
    price: 59.99,
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'pop-2',
    name: 'High Top Sneakers',
    price: 74.99,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'pop-3',
    name: 'Oversized Sweater',
    price: 44.99,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'pop-4',
    name: 'Shoulder Bag',
    price: 54.99,
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'pop-5',
    name: 'Sunglasses',
    price: 29.99,
    rating: 4.5,
    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'pop-6',
    name: 'Smart Watch',
    price: 89.99,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=500&q=80',
  },
];

export const partnerBrands = [
  { name: 'NIKE', symbol: 'Nike' },
  { name: 'ADIDAS', symbol: 'Adidas' },
  { name: 'ZARA', symbol: 'ZARA' },
  { name: 'H&M', symbol: 'H&M' },
  { name: 'PUMA', symbol: 'Puma' },
  { name: "LEVI'S", symbol: "Levi's" },
  { name: 'CONVERSE', symbol: 'Converse' },
];

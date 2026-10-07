export const trustFeatures = [
  {
    id: 'free-shipping',
    title: 'Free Shipping',
    description: 'On orders over $50',
    icon: 'Truck',
  },
  {
    id: 'easy-returns',
    title: 'Easy Returns',
    description: 'Within 7 days',
    icon: 'RotateCcw',
  },
  {
    id: 'secure-payment',
    title: 'Secure Payment',
    description: '100% secure checkout',
    icon: 'ShieldCheck',
  },
  {
    id: '247-support',
    title: '24/7 Support',
    description: "We're here to help",
    icon: 'Headphones',
  },
];

export const topCategories = [
  {
    id: 'men',
    name: "Men's Clothing",
    slug: 'mens-clothing',
    image:
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    link: '/explore?category=men',
  },
  {
    id: 'women',
    name: "Women's Clothing",
    slug: 'womens-clothing',
    image: '/images/category-womens-dress.jpg',
    link: '/explore?category=women',
  },
  {
    id: 'shoes',
    name: 'Shoes',
    slug: 'shoes',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    link: '/explore?category=shoes',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    image:
      'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?auto=format&fit=crop&w=600&q=80',
    link: '/explore?category=accessories',
  },
];

export const featuredProducts = [
  {
    id: 'prod-1',
    name: 'Classic Hoodie',
    price: 49.99,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 124,
    badge: 'Popular',
    badgeType: 'neutral',
    image:
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    category: "Men's Clothing",
  },
  {
    id: 'prod-2',
    name: 'Running Shoes',
    price: 79.99,
    originalPrice: 99.99,
    discount: '20% OFF',
    rating: 4.7,
    reviewsCount: 98,
    badge: 'Sale',
    badgeType: 'danger',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    category: 'Shoes',
  },
  {
    id: 'prod-3',
    name: 'Denim Jacket',
    price: 69.99,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 85,
    badge: 'Trending',
    badgeType: 'brand',
    image:
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=600&q=80',
    category: "Men's Clothing",
  },
  {
    id: 'prod-4',
    name: 'Everyday Backpack',
    price: 39.99,
    originalPrice: null,
    rating: 4.6,
    reviewsCount: 62,
    badge: 'Essential',
    badgeType: 'neutral',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    category: 'Accessories',
  },
];

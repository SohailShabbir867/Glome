import { useState } from 'react';
import {
  Wallet,
  ShoppingBag,
  Users,
  TrendingUp,
  ArrowUpRight,
  AlertTriangle,
  Plus,
  Tag,
  Sparkles,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data matching Image 1
const INITIAL_ORDERS = [
  { id: '#ORD-1042', customer: 'Ayesha Khan', amount: 89.99, status: 'Delivered', date: 'Oct 31, 2026', items: 2 },
  { id: '#ORD-1041', customer: 'Usman Ali', amount: 54.50, status: 'Processing', date: 'Oct 31, 2026', items: 1 },
  { id: '#ORD-1040', customer: 'Sara Malik', amount: 129.99, status: 'Shipped', date: 'Oct 30, 2026', items: 3 },
  { id: '#ORD-1039', customer: 'Ali Raza', amount: 76.00, status: 'Pending', date: 'Oct 30, 2026', items: 1 },
  { id: '#ORD-1038', customer: 'Fatima Noor', amount: 45.99, status: 'Delivered', date: 'Oct 30, 2026', items: 1 },
];

const INITIAL_LOW_STOCK = [
  { id: 1, name: 'Classic Hoodie', category: "Men's Fashion", stock: 8, threshold: 10, image: '/images/hero-fashion-rack.jpg' },
  { id: 2, name: 'White Sneakers', category: 'Shoes', stock: 12, threshold: 15, image: '/images/category-womens-dress.jpg' },
  { id: 3, name: 'Leather Handbag', category: 'Accessories', stock: 6, threshold: 10, image: '/images/promo-banner-items.jpg' },
  { id: 4, name: 'Baseball Cap', category: 'Accessories', stock: 15, threshold: 20, image: '/images/lookbook-1.jpg' },
];

const TOP_PRODUCTS = [
  { rank: 1, name: 'Classic Hoodie', sales: 342, growth: '+12%', price: 49.99, image: '/images/hero-fashion-rack.jpg' },
  { rank: 2, name: 'White Sneakers', sales: 298, growth: '+10%', price: 79.99, image: '/images/category-womens-dress.jpg' },
  { rank: 3, name: 'Leather Handbag', sales: 245, growth: '+8%', price: 89.99, image: '/images/promo-banner-items.jpg' },
  { rank: 4, name: 'Denim Jacket', sales: 198, growth: '+6%', price: 69.99, image: '/images/lookbook-2.jpg' },
  { rank: 5, name: 'Baseball Cap', sales: 156, growth: '+5%', price: 24.99, image: '/images/lookbook-3.jpg' },
];

const SALESMEN_STAFF = [
  { name: 'Ali Raza', orders: 124, sales: 4820, conv: '4.2%', rating: '4.9', avatar: 'AR' },
  { name: 'Usman Khan', orders: 98, sales: 3620, conv: '3.8%', rating: '4.8', avatar: 'UK' },
  { name: 'Ahmed Shah', orders: 76, sales: 2980, conv: '3.4%', rating: '4.7', avatar: 'AS' },
  { name: 'Hassan Ali', orders: 54, sales: 2150, conv: '2.9%', rating: '4.6', avatar: 'HA' },
  { name: 'Zainab Malik', orders: 38, sales: 1420, conv: '2.6%', rating: '4.5', avatar: 'ZM' },
];

const ISSUE_REPORTS = [
  { id: '#ISS-1042', issue: 'Size exchange request', customer: 'Sara Malik', priority: 'Medium', status: 'Open', date: 'Oct 30, 2026' },
  { id: '#ISS-1041', issue: 'Payment not reflected', customer: 'Usman Ali', priority: 'Medium', status: 'In Progress', date: 'Oct 29, 2026' },
  { id: '#ISS-1040', issue: 'Wrong item received', customer: 'Ayesha Khan', priority: 'High', status: 'Open', date: 'Oct 28, 2026' },
  { id: '#ISS-1039', issue: 'Damaged product', customer: 'Bilal Ahmed', priority: 'High', status: 'Resolved', date: 'Oct 27, 2026' },
  { id: '#ISS-1038', issue: 'Late delivery inquiry', customer: 'Zainab Tariq', priority: 'Low', status: 'Resolved', date: 'Oct 26, 2026' },
];

const CONTACT_MESSAGES = [
  { customer: 'Ayesha Khan', type: 'Incoming call - 2m 34s', time: '10:24 AM', status: 'Connected', badge: 'bg-emerald-100 text-emerald-800' },
  { customer: 'Usman Ali', type: 'Hi, I want to track my order #ORD-1041', time: '09:17 AM', status: 'Unread', badge: 'bg-rose-100 text-rose-800' },
  { customer: 'Sara Malik', type: 'Can I get a discount on this outfit?', time: '08:52 AM', status: 'Replied', badge: 'bg-stone-100 text-stone-800' },
  { customer: 'Zainab Tariq', type: 'Missed customer call', time: 'Yesterday', status: 'Missed', badge: 'bg-amber-100 text-amber-800' },
  { customer: 'Bilal Ahmed', type: 'Is this jacket available in size L?', time: 'Yesterday', status: 'Replied', badge: 'bg-stone-100 text-stone-800' },
];

export default function AdminDashboardPage() {
  const [timeline, setTimeline] = useState('30D');
  const [orders] = useState(INITIAL_ORDERS);
  const [lowStock, setLowStock] = useState(INITIAL_LOW_STOCK);
  const [restockItem, setRestockItem] = useState(null);
  const [restockAmount, setRestockAmount] = useState(50);
  const [quickActionModal, setQuickActionModal] = useState(null);

  // Status badge styling helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
      case 'Resolved':
      case 'In Stock':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Processing':
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Shipped':
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Pending':
      case 'Open':
      case 'Low Stock':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleRestock = () => {
    if (!restockItem) return;
    setLowStock((prev) =>
      prev.map((item) =>
        item.id === restockItem.id ? { ...item, stock: item.stock + Number(restockAmount) } : item
      )
    );
    setRestockItem(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Welcome Greeting Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0b3b2c] via-[#124e3b] to-[#07241b] text-white p-6 sm:p-8 shadow-sm">
        {/* Ambient background decoration */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
          <img
            src="/images/hero-fashion-rack.jpg"
            alt="Wardrobe"
            className="h-full w-full object-cover object-right"
          />
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-200 backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Glome Store Administration</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
              Good Morning, Sohail Shabbir 👋
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-lg">
              Here is what is happening across your mall today. Sales are up{' '}
              <span className="font-bold text-white">+12.5%</span> with 12 new orders ready for
              dispatch.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setQuickActionModal('product')}
              className="inline-flex items-center gap-1.5 rounded-full bg-white text-[#0b3b2c] px-4 py-2.5 text-xs font-bold shadow-md hover:bg-emerald-50 transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </button>
            <button
              type="button"
              onClick={() => setQuickActionModal('discount')}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white px-4 py-2.5 text-xs font-bold border border-white/20 transition-all cursor-pointer"
            >
              <Tag className="h-3.5 w-3.5" />
              <span>Create Discount</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top 4 Metric KPI Cards matching Image 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales */}
        <div className="rounded-3xl bg-white p-5 border border-gray-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Sales</span>
            <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Wallet className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#14211d]">
              $12,458
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>+12.5%</span>
              <span className="text-gray-400 font-normal">vs last month</span>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="rounded-3xl bg-white p-5 border border-gray-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Orders</span>
            <div className="h-10 w-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#14211d]">
              342
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>+8.3%</span>
              <span className="text-gray-400 font-normal">vs last month</span>
            </div>
          </div>
        </div>

        {/* Total Customers */}
        <div className="rounded-3xl bg-white p-5 border border-gray-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Customers</span>
            <div className="h-10 w-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#14211d]">
              1,248
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>+15.2%</span>
              <span className="text-gray-400 font-normal">vs last month</span>
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="rounded-3xl bg-white p-5 border border-gray-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Conversion Rate</span>
            <div className="h-10 w-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#14211d]">
              3.6%
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>+2.8%</span>
              <span className="text-gray-400 font-normal">vs last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Middle Grid: Sales Overview Chart, Sales by Category & Low Stock Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Chart Area (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Sales Overview Area Chart */}
          <div className="rounded-3xl bg-white p-6 border border-gray-200/80 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#14211d]">Sales Overview</h3>
                <p className="text-xs text-gray-500">Revenue performance timeline</p>
              </div>
              <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs font-bold">
                {['7D', '30D', '3M', '6M', '1Y'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTimeline(t)}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      timeline === t ? 'bg-[#0b3b2c] text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive SVG Smooth Area/Line Chart */}
            <div className="relative h-64 w-full pt-4">
              <svg className="h-full w-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0b3b2c" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#0b3b2c" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                <line x1="0" y1="20" x2="600" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="65" x2="600" y2="65" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="110" x2="600" y2="110" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="155" x2="600" y2="155" stroke="#f1f5f9" strokeWidth="1" />

                {/* Shaded Area */}
                <path
                  d="M 0 170 Q 50 140, 100 150 T 200 130 T 300 140 T 400 60 T 500 120 T 600 70 L 600 200 L 0 200 Z"
                  fill="url(#salesGrad)"
                />

                {/* Line Path */}
                <path
                  d="M 0 170 Q 50 140, 100 150 T 200 130 T 300 140 T 400 60 T 500 120 T 600 70"
                  fill="none"
                  stroke="#0b3b2c"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Peak dot at Oct 18 ($3,248) */}
                <circle cx="400" cy="60" r="6" fill="#0b3b2c" stroke="#ffffff" strokeWidth="3" />
              </svg>

              {/* Peak Tooltip Pill matching Image 1 */}
              <div className="absolute top-4 left-[60%] -translate-x-1/2 rounded-xl bg-white border border-gray-200 shadow-md px-3 py-1.5 text-center pointer-events-none">
                <span className="text-[10px] text-gray-500 block">Oct 18, 2026</span>
                <span className="font-bold text-xs text-[#0b3b2c]">$3,248</span>
              </div>

              {/* Bottom Date labels */}
              <div className="flex justify-between text-[11px] text-gray-400 pt-2 font-medium">
                <span>Oct 1</span>
                <span>Oct 5</span>
                <span>Oct 10</span>
                <span>Oct 15</span>
                <span>Oct 20</span>
                <span>Oct 25</span>
                <span>Oct 31</span>
              </div>
            </div>
          </div>

          {/* Sales by Category (Donut + Legend) */}
          <div className="rounded-3xl bg-white p-6 border border-gray-200/80 shadow-2xs">
            <h3 className="font-serif text-lg font-bold text-[#14211d] mb-4">Sales by Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Donut Chart representation */}
              <div className="md:col-span-5 flex flex-col items-center justify-center">
                <div className="relative h-44 w-44 flex items-center justify-center">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="transparent" stroke="#f1f5f9" strokeWidth="4.5" />
                    {/* Men's Fashion: 42% */}
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="transparent"
                      stroke="#0b3b2c"
                      strokeWidth="4.5"
                      strokeDasharray="42 100"
                      strokeDashoffset="0"
                    />
                    {/* Women's Fashion: 28% */}
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="transparent"
                      stroke="#22c55e"
                      strokeWidth="4.5"
                      strokeDasharray="28 100"
                      strokeDashoffset="-42"
                    />
                    {/* Shoes: 15% */}
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="transparent"
                      stroke="#3b82f6"
                      strokeWidth="4.5"
                      strokeDasharray="15 100"
                      strokeDashoffset="-70"
                    />
                    {/* Accessories: 10% */}
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="transparent"
                      stroke="#f59e0b"
                      strokeWidth="4.5"
                      strokeDasharray="10 100"
                      strokeDashoffset="-85"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Sales</span>
                    <span className="font-serif text-xl font-extrabold text-[#14211d]">$12,458</span>
                  </div>
                </div>
              </div>

              {/* Legend List */}
              <div className="md:col-span-7 grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50">
                  <span className="h-3 w-3 rounded-full bg-[#0b3b2c]" />
                  <span className="text-gray-600">Men&apos;s Fashion:</span>
                  <span className="font-bold text-[#14211d] ml-auto">42%</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50">
                  <span className="h-3 w-3 rounded-full bg-emerald-500" />
                  <span className="text-gray-600">Women&apos;s:</span>
                  <span className="font-bold text-[#14211d] ml-auto">28%</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50">
                  <span className="h-3 w-3 rounded-full bg-blue-500" />
                  <span className="text-gray-600">Shoes:</span>
                  <span className="font-bold text-[#14211d] ml-auto">15%</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50">
                  <span className="h-3 w-3 rounded-full bg-amber-500" />
                  <span className="text-gray-600">Accessories:</span>
                  <span className="font-bold text-[#14211d] ml-auto">10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Low Stock Alert & Top Selling (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Low Stock Alert matching Image 1 */}
          <div className="rounded-3xl bg-white p-6 border border-gray-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-600">
                <AlertTriangle className="h-4 w-4" />
                <h3 className="font-serif text-base font-bold text-[#14211d]">Low Stock Alert</h3>
              </div>
              <button
                type="button"
                onClick={() => setQuickActionModal('stock')}
                className="text-[11px] font-bold text-[#0b3b2c] hover:underline"
              >
                View All
              </button>
            </div>

            <div className="divide-y divide-gray-100 space-y-3">
              {lowStock.map((prod) => (
                <div key={prod.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={prod.image} alt={prod.name} className="h-10 w-10 rounded-xl object-cover bg-stone-100" />
                    <div className="truncate">
                      <div className="text-xs font-bold text-[#14211d] truncate">{prod.name}</div>
                      <div className="text-[11px] text-rose-600 font-semibold">Stock: {prod.stock} units</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRestockItem(prod)}
                    className="rounded-xl bg-[#0b3b2c] hover:bg-[#124e3b] text-white px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-2xs"
                  >
                    Restock
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Top Selling Products */}
          <div className="rounded-3xl bg-white p-6 border border-gray-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-[#14211d]">Top Selling Products</h3>
              <span className="text-[11px] text-gray-400">By Volume</span>
            </div>

            <div className="divide-y divide-gray-100 space-y-3">
              {TOP_PRODUCTS.map((prod) => (
                <div key={prod.rank} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-bold text-gray-400 w-4">{prod.rank}</span>
                    <img src={prod.image} alt={prod.name} className="h-9 w-9 rounded-xl object-cover bg-stone-100" />
                    <div className="truncate">
                      <div className="text-xs font-bold text-[#14211d] truncate">{prod.name}</div>
                      <div className="text-[10px] text-emerald-600 font-semibold">{prod.sales} sold ({prod.growth})</div>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-[#14211d] shrink-0">${prod.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary Box */}
          <div className="rounded-3xl bg-white p-6 border border-gray-200/80 shadow-2xs space-y-4">
            <h3 className="font-serif text-base font-bold text-[#14211d]">Payment Summary</h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-2xl bg-stone-50">
                <span className="text-[10px] text-gray-400 font-bold uppercase block">Received</span>
                <span className="text-xs font-bold text-[#0b3b2c] block mt-0.5">$12,458</span>
                <span className="text-[9px] text-emerald-600 font-semibold">+12.5%</span>
              </div>
              <div className="p-3 rounded-2xl bg-stone-50">
                <span className="text-[10px] text-gray-400 font-bold uppercase block">Pending</span>
                <span className="text-xs font-bold text-amber-700 block mt-0.5">$1,248</span>
                <span className="text-[9px] text-amber-600 font-semibold">+3.2%</span>
              </div>
              <div className="p-3 rounded-2xl bg-stone-50">
                <span className="text-[10px] text-gray-400 font-bold uppercase block">Refunds</span>
                <span className="text-xs font-bold text-rose-700 block mt-0.5">$342</span>
                <span className="text-[9px] text-rose-600 font-semibold">-1.1%</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => alert('Opening Full Transactions Ledger')}
              className="w-full rounded-2xl bg-[#0b3b2c] hover:bg-[#124e3b] text-white py-2.5 text-xs font-bold transition-colors cursor-pointer"
            >
              View Transactions
            </button>
          </div>
        </div>
      </div>

      {/* 4. Bottom Grid: Recent Orders, Salesmen Performance, Customer Contacts & Issue Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Orders (6 cols) */}
        <div className="lg:col-span-6 rounded-3xl bg-white p-6 border border-gray-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-[#14211d]">Recent Orders</h3>
            <span className="text-xs font-bold text-[#0b3b2c] cursor-pointer hover:underline">View All (342)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-gray-100 text-gray-400 uppercase text-[10px]">
                <tr>
                  <th className="pb-2 font-bold">Order ID</th>
                  <th className="pb-2 font-bold">Customer</th>
                  <th className="pb-2 font-bold">Amount</th>
                  <th className="pb-2 font-bold">Status</th>
                  <th className="pb-2 font-bold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 font-mono font-bold text-[#0b3b2c]">{ord.id}</td>
                    <td className="py-3 font-semibold text-gray-900">{ord.customer}</td>
                    <td className="py-3 font-bold text-gray-900">${ord.amount.toFixed(2)}</td>
                    <td className="py-3">
                      <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${getStatusBadge(ord.status)}`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500 text-[11px]">{ord.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Salesmen Performance (6 cols) */}
        <div className="lg:col-span-6 rounded-3xl bg-white p-6 border border-gray-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-[#14211d]">Salesmen Performance</h3>
            <span className="text-xs font-bold text-[#0b3b2c] cursor-pointer hover:underline">Manage Staff</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-gray-100 text-gray-400 uppercase text-[10px]">
                <tr>
                  <th className="pb-2 font-bold">Name</th>
                  <th className="pb-2 font-bold">Orders</th>
                  <th className="pb-2 font-bold">Sales</th>
                  <th className="pb-2 font-bold">Conversion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {SALESMEN_STAFF.map((staff) => (
                  <tr key={staff.name} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 flex items-center gap-2.5 font-bold text-gray-900">
                      <span className="h-7 w-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-extrabold">
                        {staff.avatar}
                      </span>
                      <span>{staff.name}</span>
                    </td>
                    <td className="py-3 font-semibold text-gray-700">{staff.orders}</td>
                    <td className="py-3 font-bold text-[#0b3b2c]">${staff.sales.toLocaleString()}</td>
                    <td className="py-3 font-semibold text-emerald-700">{staff.conv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 5. Contacts & Issue Reports Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Customer Contacts & Messages (6 cols) */}
        <div className="lg:col-span-6 rounded-3xl bg-white p-6 border border-gray-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-[#14211d]">Customer Contacts & Messages</h3>
            <span className="text-[11px] font-bold text-[#0b3b2c]">Inbox (24)</span>
          </div>

          <div className="divide-y divide-gray-100 space-y-3">
            {CONTACT_MESSAGES.map((msg, i) => (
              <div key={i} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-bold text-xs text-[#14211d]">{msg.customer}</div>
                  <div className="text-[11px] text-gray-500 truncate">{msg.type}</div>
                </div>
                <div className="text-right shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${msg.badge}`}>
                    {msg.status}
                  </span>
                  <div className="text-[10px] text-gray-400 mt-1">{msg.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Issue Reports & Exchange Requests (6 cols) */}
        <div className="lg:col-span-6 rounded-3xl bg-white p-6 border border-gray-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-[#14211d]">Customer Issues & Exchange Requests</h3>
            <span className="text-[11px] font-bold text-rose-600">3 Pending</span>
          </div>

          <div className="divide-y divide-gray-100 space-y-3">
            {ISSUE_REPORTS.map((rep) => (
              <div key={rep.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0">
                  <div className="font-bold text-[#14211d] flex items-center gap-2">
                    <span>{rep.issue}</span>
                    <span className="text-[10px] font-mono text-gray-400 font-normal">{rep.id}</span>
                  </div>
                  <div className="text-[11px] text-gray-500">Customer: {rep.customer} • {rep.date}</div>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(rep.status)}`}>
                    {rep.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Restock Interactive Modal */}
      <AnimatePresence>
        {restockItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-gray-200 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-[#14211d]">
                  Restock Inventory
                </h3>
                <button type="button" onClick={() => setRestockItem(null)} className="p-1 text-gray-400 hover:text-gray-900">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <img src={restockItem.image} alt={restockItem.name} className="h-12 w-12 rounded-xl object-cover bg-stone-100" />
                <div>
                  <div className="font-bold text-sm text-[#14211d]">{restockItem.name}</div>
                  <div className="text-xs text-rose-600 font-semibold">Current stock: {restockItem.stock} units</div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700">Units to Add to Warehouse</label>
                <div className="flex gap-2">
                  {[20, 50, 100].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setRestockAmount(amt)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        restockAmount === amt
                          ? 'border-[#0b3b2c] bg-[#0b3b2c] text-white'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      +{amt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setRestockItem(null)}
                  className="flex-1 rounded-full border border-gray-300 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleRestock}
                  className="flex-1 rounded-full bg-[#0b3b2c] py-2.5 text-xs font-bold text-white hover:bg-[#124e3b] shadow-sm cursor-pointer"
                >
                  Confirm Restock
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quick Action Modal */}
      <AnimatePresence>
        {quickActionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-gray-200 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-[#14211d] capitalize">
                  {quickActionModal === 'product'
                    ? 'Add New Product'
                    : quickActionModal === 'discount'
                    ? 'Create Seasonal Discount'
                    : 'Warehouse Stock Manager'}
                </h3>
                <button
                  type="button"
                  onClick={() => setQuickActionModal(null)}
                  className="p-1 text-gray-400 hover:text-gray-900 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {quickActionModal === 'product' &&
                  'Configure product specifications, high-resolution lifestyle images, variants, and wholesale pricing.'}
                {quickActionModal === 'discount' &&
                  'Create custom percentage promo coupon codes (e.g., GLOME20) with expiration timestamps.'}
                {quickActionModal === 'stock' &&
                  'Central warehouse inventory is monitored via automated RFID scanners across all distribution centers.'}
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setQuickActionModal(null)}
                  className="w-full rounded-full bg-[#0b3b2c] py-2.5 text-xs font-bold text-white hover:bg-[#124e3b] shadow-sm cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

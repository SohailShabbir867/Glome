import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
  ShieldAlert,
  Camera,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EcommercePerformanceChart from '@/components/dashboard/EcommercePerformanceChart';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { hasPermission, ROLES } from '@/constants/roles';

// RoomBridge Exact Design Tokens
const DK = '#012D1D';
const BTN = '#8E4E14';
const ACC = '#FFAB69';
const BORDER = '#E8E2D9';

// Import Modular Admin Sub-Pages
import AdminOrdersTab from '../components/AdminOrdersTab';
import AdminProductsTab from '../components/AdminProductsTab';
import AdminInventoryTab from '../components/AdminInventoryTab';
import AdminCustomersTab from '../components/AdminCustomersTab';
import AdminStaffTab from '../components/AdminStaffTab';
import AdminMessagesTab from '../components/AdminMessagesTab';
import AdminReportsTab from '../components/AdminReportsTab';
import AdminPaymentsTab from '../components/AdminPaymentsTab';
import AdminDiscountsTab from '../components/AdminDiscountsTab';
import AdminSettingsTab from '../components/AdminSettingsTab';
import SecurityDashboardPage from '@/features/security/pages/SecurityDashboardPage';


// Mock Data for Overview
const INITIAL_ORDERS = [
  { id: '#ORD-1042', customer: 'Ayesha Khan', amount: 89.99, status: 'Delivered', date: 'Oct 31, 2026', items: 2 },
  { id: '#ORD-1041', customer: 'Usman Ali', amount: 54.50, status: 'Processing', date: 'Oct 31, 2026', items: 1 },
  { id: '#ORD-1040', customer: 'Sara Malik', amount: 129.99, status: 'Shipped', date: 'Oct 30, 2026', items: 3 },
  { id: '#ORD-1039', customer: 'Ali Raza', amount: 76.00, status: 'Pending', date: 'Oct 30, 2026', items: 1 },
  { id: '#ORD-1038', customer: 'Fatima Noor', amount: 45.99, status: 'Delivered', date: 'Oct 30, 2026', items: 1 },
];

const INITIAL_LOW_STOCK = [
  { id: 1, name: 'Classic Leather Loafers', category: 'Shoes', stock: 8, threshold: 10, image: '/images/hero-fashion-rack.jpg' },
  { id: 2, name: 'Minimalist White Sneakers', category: 'Shoes', stock: 12, threshold: 15, image: '/images/category-womens-dress.jpg' },
  { id: 3, name: 'Italian Leather Handbag', category: 'Accessories', stock: 6, threshold: 10, image: '/images/promo-banner-items.jpg' },
  { id: 4, name: 'Heritage Baseball Cap', category: 'Accessories', stock: 15, threshold: 20, image: '/images/lookbook-1.jpg' },
];

const TOP_PRODUCTS = [
  { rank: 1, name: 'Classic Leather Loafers', sales: 342, growth: '+12%', price: 89.99, image: '/images/hero-fashion-rack.jpg' },
  { rank: 2, name: 'Minimalist White Sneakers', sales: 298, growth: '+10%', price: 79.99, image: '/images/category-womens-dress.jpg' },
  { rank: 3, name: 'Italian Leather Handbag', sales: 245, growth: '+8%', price: 129.99, image: '/images/promo-banner-items.jpg' },
  { rank: 4, name: 'Tailored Cotton Oxford Shirt', sales: 198, growth: '+6%', price: 49.99, image: '/images/lookbook-1.jpg' },
  { rank: 5, name: 'Monogram Wool Blazer', sales: 156, growth: '+5%', price: 219.00, image: '/images/lookbook-2.jpg' },
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
  { id: '#ISS-1039', issue: 'Damaged packaging', customer: 'Bilal Ahmed', priority: 'High', status: 'Resolved', date: 'Oct 27, 2026' },
  { id: '#ISS-1038', issue: 'Late delivery inquiry', customer: 'Zainab Tariq', priority: 'Low', status: 'Resolved', date: 'Oct 26, 2026' },
];

const CONTACT_MESSAGES = [
  { customer: 'Ayesha Khan', type: 'Incoming call - 2m 34s', time: '10:24 AM', status: 'Connected', badge: 'bg-emerald-100 text-emerald-800' },
  { customer: 'Usman Ali', type: 'Hi, I want to track my order #ORD-1041', time: '09:17 AM', status: 'Unread', badge: 'bg-rose-100 text-rose-800' },
  { customer: 'Sara Malik', type: 'Can I get a discount on this outfit?', time: '08:52 AM', status: 'Replied', badge: 'bg-stone-100 text-stone-800' },
  { customer: 'Zainab Tariq', type: 'Missed customer call', time: 'Yesterday', status: 'Missed', badge: 'bg-amber-100 text-amber-800' },
  { customer: 'Bilal Ahmed', type: 'Is this blazer available in size 40R?', time: 'Yesterday', status: 'Replied', badge: 'bg-stone-100 text-stone-800' },
];

export default function AdminDashboardPage() {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'dashboard';
  const user = useSelector(selectCurrentUser);

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

  // RBAC Access Control Guard: check if current user has permission for the requested sub-page
  if (activeTab !== 'dashboard' && !hasPermission(user, activeTab)) {
    return (
      <div
        className="rounded-3xl bg-white p-8 sm:p-12 border text-center max-w-xl mx-auto space-y-4 my-12 shadow-sm"
        style={{ borderColor: BORDER }}
      >
        <div
          className="h-16 w-16 rounded-2xl mx-auto flex items-center justify-center font-bold text-2xl shadow-sm"
          style={{ backgroundColor: `${ACC}25`, color: DK }}
        >
          <ShieldAlert className="h-8 w-8 text-rose-600" />
        </div>
        <h2 className="font-serif text-2xl font-bold" style={{ color: DK }}>
          Access Restricted
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Your staff account (<strong>{user?.name || 'Staff Member'}</strong>) does not currently have permission to access the{' '}
          <strong className="uppercase">{activeTab}</strong> module.
        </p>
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-left">
          <strong>Need Access?</strong> Please contact the Super Administrator (
          <strong>Sohail Shabbir</strong>) to have this dashboard module assigned to your role permissions.
        </div>
        <div className="pt-2">
          <Link
            to="/admin"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm hover:opacity-90 transition-all cursor-pointer"
            style={{ backgroundColor: DK }}
          >
            Return to Overview Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Render Sub-Pages when tab query param is present
  if (activeTab === 'security') return <SecurityDashboardPage />;
  if (activeTab === 'orders') return <AdminOrdersTab />;
  if (activeTab === 'products') return <AdminProductsTab />;
  if (activeTab === 'inventory') return <AdminInventoryTab />;
  if (activeTab === 'customers') return <AdminCustomersTab />;
  if (activeTab === 'staff') return <AdminStaffTab />;
  if (activeTab === 'messages') return <AdminMessagesTab />;
  if (activeTab === 'reports') return <AdminReportsTab />;
  if (activeTab === 'payments') return <AdminPaymentsTab />;
  if (activeTab === 'discounts') return <AdminDiscountsTab />;
  if (activeTab === 'settings') return <AdminSettingsTab />;

  // Default: Overview Dashboard
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Welcome Greeting Banner (RoomBridge Deep Obsidian Gradient) */}
      <div
        className="relative overflow-hidden rounded-2xl text-white p-6 sm:p-7 shadow-sm"
        style={{ background: `linear-gradient(120deg, ${DK} 60%, #024a2e)` }}
      >
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
          <img
            src="/images/hero-fashion-rack.jpg"
            alt="Wardrobe"
            className="h-full w-full object-cover object-right"
          />
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold"
              style={{ backgroundColor: `${ACC}25`, color: ACC }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>
                {user?.role === ROLES.SUPER_ADMIN
                  ? 'Super Administrator Authority'
                  : user?.role === ROLES.ADMIN
                  ? 'Store Administrator Portal'
                  : 'Operational Management Portal'}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
              Good Morning, {user?.name || 'Sohail Shabbir'} 👋
            </h1>
            <p className="text-xs sm:text-sm text-white/70 max-w-lg">
              Here is what is happening across your mall today. Sales are up{' '}
              <span className="font-bold text-white">+12.5%</span> with 12 new orders ready for dispatch.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/admin?tab=security"
              className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 min-h-[44px] text-xs font-bold border transition-all hover:bg-white/10 cursor-pointer"
              style={{
                backgroundColor: 'rgba(255, 171, 105, 0.15)',
                color: '#ffffff',
                borderColor: 'rgba(255, 171, 105, 0.35)',
              }}
            >
              <Camera className="h-3.5 w-3.5" style={{ color: ACC }} />
              <span>CCTV Surveillance</span>
            </Link>
            <Link
              to="/admin?tab=products"
              className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 min-h-[44px] text-xs font-bold shadow-md transition-all hover:opacity-90 active:scale-98 cursor-pointer"
              style={{ backgroundColor: BTN, color: '#ffffff' }}
            >
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </Link>
            <Link
              to="/admin?tab=discounts"
              className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 min-h-[44px] text-xs font-bold border transition-all cursor-pointer"
              style={{
                backgroundColor: 'rgba(255, 171, 105, 0.15)',
                color: '#ffffff',
                borderColor: 'rgba(255, 171, 105, 0.35)',
              }}
            >
              <Tag className="h-3.5 w-3.5" style={{ color: ACC }} />
              <span>Create Discount</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Top 4 Metric KPI Cards (RoomBridge Card Token) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales */}
        <div
          className="rounded-2xl bg-white p-5 border shadow-sm space-y-3"
          style={{ borderColor: BORDER }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Sales</span>
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${ACC}25`, color: BTN }}
            >
              <Wallet className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold" style={{ color: DK }}>
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
        <Link
          to="/admin?tab=orders"
          className="rounded-2xl bg-white p-5 border shadow-sm space-y-3 hover:shadow-md transition-all cursor-pointer block"
          style={{ borderColor: BORDER }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Orders</span>
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${ACC}25`, color: BTN }}
            >
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold" style={{ color: DK }}>
              342
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>+8.3%</span>
              <span className="text-gray-400 font-normal">vs last month</span>
            </div>
          </div>
        </Link>

        {/* Total Customers */}
        <Link
          to="/admin?tab=customers"
          className="rounded-2xl bg-white p-5 border shadow-sm space-y-3 hover:shadow-md transition-all cursor-pointer block"
          style={{ borderColor: BORDER }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Customers</span>
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${ACC}25`, color: BTN }}
            >
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold" style={{ color: DK }}>
              1,280
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>+18.2%</span>
              <span className="text-gray-400 font-normal">active accounts</span>
            </div>
          </div>
        </Link>

        {/* Active Staff */}
        <Link
          to="/admin?tab=staff"
          className="rounded-2xl bg-white p-5 border shadow-sm space-y-3 hover:shadow-md transition-all cursor-pointer block"
          style={{ borderColor: BORDER }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Sales Representatives</span>
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${ACC}25`, color: BTN }}
            >
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold" style={{ color: DK }}>
              18 Active
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>94.8%</span>
              <span className="text-gray-400 font-normal">satisfaction rate</span>
            </div>
          </div>
        </Link>
      </div>

      {/* 3. Middle Section: Advanced Sales Performance Chart & Category Donut + Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Sales Chart & Donut (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Interactive E-Commerce Sales Performance Chart (RoomBridge Architecture) */}
          <EcommercePerformanceChart
            title="Sales & Revenue Analytics"
            subtitle="Interactive transaction volume, conversion metrics, and period breakdown"
            accentColor={ACC}
          />

          {/* Sales by Category (Donut + Legend) */}
          <div
            className="rounded-2xl bg-white p-5 sm:p-6 border shadow-sm"
            style={{ borderColor: BORDER }}
          >
            <h3 className="font-serif text-lg font-bold text-[#14211d] mb-4">Sales by Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Donut Chart */}
              <div className="md:col-span-5 flex flex-col items-center justify-center">
                <div className="relative h-44 w-44 flex items-center justify-center">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="transparent" stroke="#f1f5f9" strokeWidth="4.5" />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="transparent"
                      stroke="#012D1D"
                      strokeWidth="4.5"
                      strokeDasharray="42 100"
                      strokeDashoffset="0"
                    />
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
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Sales</span>
                    <span className="font-serif text-xl font-extrabold text-[#14211d]">$12,458</span>
                  </div>
                </div>
              </div>

              {/* Legend List */}
              <div className="md:col-span-7 grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50">
                  <span className="h-3 w-3 rounded-full bg-[#012D1D]" />
                  <span className="text-gray-600">Shoes:</span>
                  <span className="font-bold text-[#14211d] ml-auto">42%</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50">
                  <span className="h-3 w-3 rounded-full bg-emerald-500" />
                  <span className="text-gray-600">Men&apos;s:</span>
                  <span className="font-bold text-[#14211d] ml-auto">28%</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50">
                  <span className="h-3 w-3 rounded-full bg-blue-500" />
                  <span className="text-gray-600">Women&apos;s:</span>
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
          {/* Low Stock Alert */}
          <div className="rounded-3xl bg-white p-6 border border-gray-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-600">
                <AlertTriangle className="h-4 w-4" />
                <h3 className="font-serif text-base font-bold text-[#14211d]">Low Stock Alert</h3>
              </div>
              <Link
                to="/admin?tab=inventory"
                className="text-xs font-bold text-[#012D1D] hover:underline"
              >
                View Inventory
              </Link>
            </div>

            <div className="divide-y divide-gray-100 space-y-3">
              {lowStock.map((prod) => (
                <div key={prod.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={prod.image} alt={prod.name} className="h-10 w-10 rounded-xl object-cover bg-stone-100 shrink-0" />
                    <div className="truncate">
                      <div className="text-xs font-bold text-[#14211d] truncate">{prod.name}</div>
                      <div className="text-xs text-rose-600 font-semibold">Stock: {prod.stock} units</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRestockItem(prod)}
                    className="rounded-xl bg-[#012D1D] hover:bg-[#124e3b] text-white px-3 py-1.5 min-h-[44px] text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-2xs"
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
              <span className="text-xs text-gray-400">By Volume</span>
            </div>

            <div className="divide-y divide-gray-100 space-y-3">
              {TOP_PRODUCTS.map((prod) => (
                <div key={prod.rank} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-bold text-gray-400 w-4">{prod.rank}</span>
                    <img src={prod.image} alt={prod.name} className="h-9 w-9 rounded-xl object-cover bg-stone-100 shrink-0" />
                    <div className="truncate">
                      <div className="text-xs font-bold text-[#14211d] truncate">{prod.name}</div>
                      <div className="text-xs text-emerald-600 font-semibold">{prod.sales} sold ({prod.growth})</div>
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
                <span className="text-xs text-gray-400 font-bold uppercase block">Received</span>
                <span className="text-xs font-bold text-[#012D1D] block mt-0.5">$12,458</span>
                <span className="text-xs text-emerald-600 font-semibold">+12.5%</span>
              </div>
              <div className="p-3 rounded-2xl bg-stone-50">
                <span className="text-xs text-gray-400 font-bold uppercase block">Pending</span>
                <span className="text-xs font-bold text-amber-700 block mt-0.5">$1,248</span>
                <span className="text-xs text-amber-600 font-semibold">+3.2%</span>
              </div>
              <div className="p-3 rounded-2xl bg-stone-50">
                <span className="text-xs text-gray-400 font-bold uppercase block">Refunds</span>
                <span className="text-xs font-bold text-rose-700 block mt-0.5">$342</span>
                <span className="text-xs text-rose-600 font-semibold">-1.1%</span>
              </div>
            </div>
            <Link
              to="/admin?tab=payments"
              className="w-full flex items-center justify-center rounded-2xl bg-[#012D1D] hover:bg-[#124e3b] text-white py-2.5 min-h-[44px] text-xs font-bold transition-colors cursor-pointer"
            >
              View Full Transactions
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Bottom Grid: Recent Orders, Salesmen Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Orders (6 cols) */}
        <div className="lg:col-span-6 rounded-3xl bg-white p-6 border border-gray-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-[#14211d]">Recent Orders</h3>
            <Link to="/admin?tab=orders" className="text-xs font-bold text-[#012D1D] hover:underline">
              View All (342)
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-gray-100 text-gray-400 uppercase text-xs">
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
                    <td className="py-3 font-mono font-bold text-[#012D1D]">{ord.id}</td>
                    <td className="py-3 font-semibold text-gray-900">{ord.customer}</td>
                    <td className="py-3 font-bold text-gray-900">${ord.amount.toFixed(2)}</td>
                    <td className="py-3">
                      <span className={`px-2.5 py-0.5 rounded-full border text-xs font-bold ${getStatusBadge(ord.status)}`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500 text-xs">{ord.date}</td>
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
            <Link to="/admin?tab=staff" className="text-xs font-bold text-[#012D1D] hover:underline">
              Manage Staff
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-gray-100 text-gray-400 uppercase text-xs">
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
                      <span className="h-7 w-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-extrabold shrink-0">
                        {staff.avatar}
                      </span>
                      <span>{staff.name}</span>
                    </td>
                    <td className="py-3 font-semibold text-gray-700">{staff.orders}</td>
                    <td className="py-3 font-bold text-[#012D1D]">${staff.sales.toLocaleString()}</td>
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
            <Link to="/admin?tab=messages" className="text-xs font-bold text-[#012D1D] hover:underline">
              Inbox (24)
            </Link>
          </div>

          <div className="divide-y divide-gray-100 space-y-3">
            {CONTACT_MESSAGES.map((msg, i) => (
              <div key={i} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-bold text-xs text-[#14211d]">{msg.customer}</div>
                  <div className="text-xs text-gray-500 truncate">{msg.type}</div>
                </div>
                <div className="text-right shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${msg.badge}`}>
                    {msg.status}
                  </span>
                  <div className="text-xs text-gray-400 mt-1">{msg.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Issue Reports & Exchange Requests (6 cols) */}
        <div className="lg:col-span-6 rounded-3xl bg-white p-6 border border-gray-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-[#14211d]">Customer Issues & Exchange Requests</h3>
            <Link to="/sales?tab=exchanges" className="text-xs font-bold text-rose-600 hover:underline">
              3 Pending
            </Link>
          </div>

          <div className="divide-y divide-gray-100 space-y-3">
            {ISSUE_REPORTS.map((rep) => (
              <div key={rep.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0">
                  <div className="font-bold text-[#14211d] flex items-center gap-2">
                    <span>{rep.issue}</span>
                    <span className="text-xs font-mono text-gray-400 font-normal">{rep.id}</span>
                  </div>
                  <div className="text-xs text-gray-500">Customer: {rep.customer} • {rep.date}</div>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(rep.status)}`}>
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
                <button type="button" onClick={() => setRestockItem(null)} className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400 hover:text-gray-900">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <img src={restockItem.image} alt={restockItem.name} className="h-12 w-12 rounded-xl object-cover bg-stone-100 shrink-0" />
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
                      className={`flex-1 py-2 min-h-[44px] rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        restockAmount === amt
                          ? 'border-[#012D1D] bg-[#012D1D] text-white'
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
                  className="flex-1 rounded-full border border-gray-300 py-2.5 min-h-[44px] text-xs font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleRestock}
                  className="flex-1 rounded-full bg-[#012D1D] py-2.5 min-h-[44px] text-xs font-bold text-white hover:bg-[#124e3b] shadow-sm cursor-pointer"
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
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400 hover:text-gray-900 cursor-pointer"
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
                  className="w-full rounded-full bg-[#012D1D] py-2.5 min-h-[44px] text-xs font-bold text-white hover:bg-[#124e3b] shadow-sm cursor-pointer"
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

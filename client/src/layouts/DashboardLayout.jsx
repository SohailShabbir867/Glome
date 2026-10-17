import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Users,
  UserCheck,
  MessageSquare,
  FileText,
  CreditCard,
  Percent,
  Settings,
  Search,
  Calendar,
  Bell,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
  Box,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowRightLeft,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { selectCurrentUser, switchRole } from '@/features/auth/authSlice';

export default function DashboardLayout({ title: _title }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  // Admin Navigation Menu
  const adminNav = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Orders', path: '/admin?tab=orders', icon: ShoppingBag, badge: '12' },
    { label: 'Products', path: '/admin?tab=products', icon: Package },
    { label: 'Inventory', path: '/admin?tab=inventory', icon: Layers },
    { label: 'Customers', path: '/admin?tab=customers', icon: Users },
    { label: 'Salesmen / Staff', path: '/admin?tab=staff', icon: UserCheck },
    { label: 'Contacts & Messages', path: '/admin?tab=messages', icon: MessageSquare, badge: '8' },
    { label: 'Reports', path: '/admin?tab=reports', icon: FileText },
    { label: 'Payments', path: '/admin?tab=payments', icon: CreditCard },
    { label: 'Discounts', path: '/admin?tab=discounts', icon: Percent },
    { label: 'Settings', path: '/admin?tab=settings', icon: Settings },
  ];

  // Salesman Navigation Menu
  const salesNav = [
    { label: 'Dashboard', path: '/sales', icon: LayoutDashboard },
    { label: 'Orders', path: '/sales?tab=orders', icon: ShoppingBag, badge: '18' },
    { label: 'My Sales', path: '/sales?tab=sales', icon: FileText },
    { label: 'Customers', path: '/sales?tab=customers', icon: Users },
    { label: 'Inventory (Stock)', path: '/sales?tab=inventory', icon: Layers },
    { label: 'Packing Requests', path: '/sales?tab=packing', icon: Box, badge: '6' },
    { label: 'Deliveries', path: '/sales?tab=deliveries', icon: Truck, badge: '4' },
    { label: 'Reported Issues & Exchanges', path: '/sales?tab=exchanges', icon: RotateCcw, badge: '3' },
    { label: 'Messages', path: '/sales?tab=messages', icon: MessageSquare, badge: '5' },
    { label: 'Earnings', path: '/sales?tab=earnings', icon: CreditCard },
    { label: 'Settings', path: '/sales?tab=settings', icon: Settings },
  ];

  const currentNav = isAdmin ? adminNav : salesNav;

  const handleToggleRole = () => {
    if (isAdmin) {
      dispatch(switchRole('sales'));
      navigate('/sales');
    } else {
      dispatch(switchRole('admin'));
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f7] text-[#14211d] flex font-sans">
      {/* 1. Desktop Dark Luxury Sidebar */}
      <aside className="hidden lg:flex w-64 xl:w-72 flex-col justify-between bg-[#07241b] text-white border-r border-[#0d3b2e] shrink-0 sticky top-0 h-screen select-none">
        {/* Top: Brand Header */}
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#07241b] shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="font-serif text-2xl font-black tracking-tight text-white leading-none">
                GLOME
              </div>
              <div className="text-xs tracking-widest uppercase text-emerald-200/80 font-semibold mt-1">
                {isAdmin ? 'Store Administration' : 'Sales Representative'}
              </div>
            </div>
          </Link>
        </div>

        {/* Center: Scrollable Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5 scrollbar-thin scrollbar-thumb-white/10">
          <div className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-emerald-300/70">
            Navigation Menu
          </div>
          {currentNav.map((item) => {
            const [itemPath, itemQuery] = item.path.split('?');
            const isActive = itemQuery
              ? location.pathname === itemPath && location.search === `?${itemQuery}`
              : location.pathname === itemPath && (!location.search || location.search === '?tab=dashboard');
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 min-h-[44px] rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#124e3b] text-white shadow-xs'
                    : 'text-emerald-100/75 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-emerald-300' : 'text-emerald-400/80'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      isActive ? 'bg-white text-[#0b3b2c]' : 'bg-rose-500 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom: Context Box & View Storefront */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="rounded-2xl bg-gradient-to-br from-[#0c3c2e] to-[#124e3b] p-3.5 border border-white/10 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <ShoppingBag className="h-4 w-4 text-emerald-300" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white truncate">
                  {isAdmin ? 'Glome Online Mall' : `${user?.name || 'Ali Raza'} (Sales)`}
                </h4>
                <p className="text-xs text-emerald-200/80 truncate">
                  {isAdmin ? 'Fashion • Style • You' : 'Active & Taking Orders'}
                </p>
              </div>
            </div>
            <Link
              to="/"
              className="mt-3 flex items-center justify-center gap-1.5 w-full rounded-xl bg-white/15 hover:bg-white/25 py-2 min-h-[44px] text-xs font-bold text-white transition-colors"
            >
              <span>View Live Storefront</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200/90 px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 shadow-2xs">
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open sidebar"
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Search Bar matching screenshot */}
          <div className="relative flex-1 max-w-md hidden sm:block">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders, customers, products, or anything... (Ctrl + K)"
              className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] py-2 pl-9 pr-14 text-xs text-[#14211d] placeholder-gray-400 focus:border-[#0b3b2c] focus:bg-white focus:outline-none transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono bg-gray-200/80 px-1.5 py-0.5 rounded text-gray-600">
              ⌘K
            </span>
          </div>

          {/* Right Header Badges & Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Portal Switcher */}
            <button
              type="button"
              onClick={handleToggleRole}
              title="Click to toggle between Admin & Salesman views"
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 px-3.5 py-2 min-h-[44px] text-xs font-bold text-[#14211d] transition-colors cursor-pointer"
            >
              <ArrowRightLeft className="h-4 w-4 text-[#0b3b2c]" />
              <span className="hidden md:inline">
                {isAdmin ? 'Switch to Sales Portal' : 'Switch to Admin Portal'}
              </span>
            </button>

            {/* Date Indicator Badge */}
            <div className="hidden xl:flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-xs font-semibold text-gray-700">
              <Calendar className="h-4 w-4 text-[#0b3b2c]" />
              <span>{isAdmin ? 'Oct 1, 2026 - Oct 31, 2026' : 'Oct 27, 2026 (Today)'}</span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="Notifications"
                className="relative p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-xs font-bold text-white shadow-2xs">
                  {isAdmin ? '3' : '5'}
                </span>
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 rounded-2xl bg-white shadow-xl border border-gray-100 py-3 z-50 text-xs"
                  >
                    <div className="px-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                      <span className="font-bold text-gray-900 text-xs">Notifications</span>
                      <span className="text-xs text-emerald-700 font-semibold cursor-pointer">
                        Mark all read
                      </span>
                    </div>
                    <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
                      <div className="p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="font-bold text-[#14211d] text-xs">New Order #ORD-1042</div>
                        <p className="text-gray-500 text-xs">Ayesha Khan placed an order for $89.99</p>
                        <span className="text-xs text-gray-400">10 mins ago</span>
                      </div>
                      <div className="p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="font-bold text-rose-600 text-xs">Low Stock Alert: Classic Hoodie</div>
                        <p className="text-gray-500 text-xs">Only 8 units left in warehouse</p>
                        <span className="text-xs text-gray-400">1 hour ago</span>
                      </div>
                      <div className="p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="font-bold text-amber-600 text-xs">Product Exchange Request</div>
                        <p className="text-gray-500 text-xs">Sara Malik requested size change on #ORD-1040</p>
                        <span className="text-xs text-gray-400">2 hours ago</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Avatar & Info */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2.5 p-1.5 min-h-[44px] rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="h-8 w-8 rounded-full bg-[#0b3b2c] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {user?.name ? user.name[0] : 'U'}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-[#14211d] leading-none">
                    {user?.name || 'Sohail Shabbir'}
                  </span>
                  <span className="text-xs text-gray-500 font-medium capitalize mt-0.5">
                    {isAdmin ? 'Administrator' : 'Sales Representative'}
                  </span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-gray-400 hidden sm:block" />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-52 rounded-2xl bg-white shadow-xl border border-gray-100 py-2 z-50 text-xs"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="font-bold text-gray-900">{user?.name}</div>
                      <div className="text-gray-400 truncate">{user?.email}</div>
                    </div>
                    <button
                      type="button"
                      onClick={handleToggleRole}
                      className="w-full text-left px-4 py-2 text-emerald-800 hover:bg-emerald-50 flex items-center gap-2 font-semibold"
                    >
                      <ArrowRightLeft className="h-3.5 w-3.5" />
                      <span>{isAdmin ? 'Switch to Sales View' : 'Switch to Admin View'}</span>
                    </button>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Customer Storefront
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dynamic Nested Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* 3. Mobile Slide-out Drawer */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Sidebar content */}
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative w-72 bg-[#07241b] text-white flex flex-col justify-between h-full shadow-2xl z-10"
            >
              <div className="p-5 flex items-center justify-between border-b border-white/10">
                <div className="font-serif text-xl font-bold text-white">GLOME</div>
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 text-gray-300 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
                {currentNav.map((item) => {
                  const [itemPath, itemQuery] = item.path.split('?');
                  const isActive = itemQuery
                    ? location.pathname === itemPath && location.search === `?${itemQuery}`
                    : location.pathname === itemPath && (!location.search || location.search === '?tab=dashboard');
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 min-h-[44px] rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-[#124e3b] text-white shadow-xs'
                          : 'text-emerald-100/75 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-emerald-300' : 'text-emerald-400/80'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            isActive ? 'bg-white text-[#0b3b2c]' : 'bg-rose-500 text-white'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="p-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    handleToggleRole();
                    setMobileSidebarOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/15 py-2.5 text-xs font-bold text-white"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                  <span>{isAdmin ? 'Switch to Sales' : 'Switch to Admin'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

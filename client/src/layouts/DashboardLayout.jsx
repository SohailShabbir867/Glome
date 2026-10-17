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
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // RoomBridge Exact Design Tokens
  const DK = '#012D1D'; // Obsidian Dark Green
  const BTN = '#8E4E14'; // Cognac Leather / Warm Brown
  const ACC = '#FFAB69'; // Peach Gold Accent
  const CR = '#F7F4EF'; // Cream Background
  const BORDER = '#E8E2D9'; // Stone Warm Border

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
    <div className="min-h-screen text-[#012D1D] flex font-sans" style={{ backgroundColor: CR }}>
      {/* 1. Desktop Placeholder to reserve 80px space when sidebar is collapsed */}
      <div className="hidden lg:block w-20 shrink-0" />

      {/* 2. Desktop Hover-Expanding Dark Luxury Sidebar (RoomBridge #012D1D) */}
      <aside
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
        className={`hidden lg:flex fixed top-0 bottom-0 left-0 z-40 flex-col justify-between text-white border-r transition-all duration-300 ease-in-out select-none shadow-2xl ${
          isSidebarHovered ? 'w-68' : 'w-20'
        }`}
        style={{ backgroundColor: DK, borderColor: 'rgba(255,255,255,0.08)' }}
      >
        {/* Top: Brand Header */}
        <div className="p-4 border-b border-white/10 flex items-center min-h-[72px]">
          <Link to="/" className="flex items-center group w-full">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl shrink-0 shadow-md group-hover:scale-105 transition-transform"
              style={{ backgroundColor: ACC, color: DK }}
            >
              <Sparkles className="h-5 w-5" />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isSidebarHovered ? 'opacity-100 max-w-[190px] ml-3' : 'opacity-0 max-w-0 pointer-events-none'
              }`}
            >
              <div className="font-serif text-2xl font-black tracking-tight text-white leading-none">
                GLOME
              </div>
              <div className="text-[11px] tracking-wider uppercase font-semibold mt-1 truncate" style={{ color: ACC }}>
                {isAdmin ? 'Store Administration' : 'Sales Representative'}
              </div>
            </div>
          </Link>
        </div>

        {/* Center: Scrollable Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-2.5 py-4 space-y-1 scrollbar-thin scrollbar-thumb-white/10">
          {isSidebarHovered && (
            <div className="px-3 pb-2 text-[11px] font-black uppercase tracking-wider transition-opacity" style={{ color: `${ACC}cc` }}>
              Navigation Menu
            </div>
          )}
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
                title={!isSidebarHovered ? item.label : undefined}
                className={`relative flex items-center min-h-[46px] rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isSidebarHovered ? 'px-3.5 justify-between' : 'px-0 justify-center'
                } ${
                  isActive
                    ? 'shadow-xs font-bold'
                    : 'text-white/70 hover:text-white hover:bg-white/8'
                }`}
                style={
                  isActive
                    ? { backgroundColor: `${ACC}22`, color: ACC }
                    : {}
                }
              >
                <div className={`flex items-center ${isSidebarHovered ? 'gap-3 min-w-0' : 'justify-center'}`}>
                  <Icon
                    className="h-5 w-5 shrink-0 transition-transform"
                    style={{ color: isActive ? ACC : 'rgba(255,255,255,0.7)' }}
                  />
                  {isSidebarHovered && (
                    <span className="truncate whitespace-nowrap">{item.label}</span>
                  )}
                </div>
                {isSidebarHovered && item.badge && (
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-bold shrink-0 shadow-2xs"
                    style={
                      isActive
                        ? { backgroundColor: ACC, color: DK }
                        : { backgroundColor: '#ef4444', color: '#ffffff' }
                    }
                  >
                    {item.badge}
                  </span>
                )}
                {!isSidebarHovered && item.badge && (
                  <span
                    className="absolute top-2 right-2.5 w-2 h-2 rounded-full"
                    style={{ backgroundColor: isActive ? ACC : '#ef4444' }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom User Info (View Sales button removed completely as requested) */}
        <div className="p-3 border-t border-white/10">
          <div className={`flex items-center ${isSidebarHovered ? 'gap-3 px-2 py-1.5' : 'justify-center py-2'}`}>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden shrink-0 font-bold text-xs shadow-xs"
              style={{ backgroundColor: `${ACC}25`, color: ACC }}
            >
              {user?.name ? user.name[0].toUpperCase() : (isAdmin ? 'A' : 'S')}
            </div>
            {isSidebarHovered && (
              <div className="min-w-0 flex-1">
                <p className="text-white text-xs font-semibold truncate leading-tight">
                  {user?.name || (isAdmin ? 'Sohail Shabbir' : 'Ali Raza')}
                </p>
                <p className="text-[11px] truncate mt-0.5" style={{ color: `${ACC}cc` }}>
                  {isAdmin ? 'Administrator' : 'Sales Representative'}
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* 3. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header
          className="sticky top-0 z-20 bg-white border-b px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 shadow-2xs"
          style={{ borderColor: BORDER }}
        >
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
              className="w-full rounded-xl border py-2 pl-9 pr-14 text-xs placeholder-gray-400 focus:bg-white focus:outline-none transition-all"
              style={{
                backgroundColor: `${CR}`,
                borderColor: BORDER,
                color: DK,
              }}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <span
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono px-1.5 py-0.5 rounded border text-gray-600"
              style={{ backgroundColor: '#ffffff', borderColor: BORDER }}
            >
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
              className="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 min-h-[44px] text-xs font-bold transition-all cursor-pointer shadow-2xs hover:shadow-xs"
              style={{
                backgroundColor: '#ffffff',
                borderColor: BORDER,
                color: DK,
              }}
            >
              <ArrowRightLeft className="h-4 w-4" style={{ color: BTN }} />
              <span className="hidden md:inline">
                {isAdmin ? 'Switch to Sales Portal' : 'Switch to Admin Portal'}
              </span>
            </button>

            {/* Date Indicator Badge */}
            <div
              className="hidden xl:flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold"
              style={{
                backgroundColor: '#ffffff',
                borderColor: BORDER,
                color: DK,
              }}
            >
              <Calendar className="h-4 w-4" style={{ color: BTN }} />
              <span>{isAdmin ? 'Oct 1, 2026 - Oct 31, 2026' : 'Oct 27, 2026 (Today)'}</span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="Notifications"
                className="relative p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer border"
                style={{ borderColor: BORDER, backgroundColor: '#ffffff' }}
              >
                <Bell className="h-5 w-5" style={{ color: DK }} />
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
                    className="absolute right-0 mt-2 w-80 rounded-2xl bg-white shadow-xl border py-3 z-50 text-xs"
                    style={{ borderColor: BORDER }}
                  >
                    <div className="px-4 pb-2 border-b flex items-center justify-between" style={{ borderColor: BORDER }}>
                      <span className="font-bold text-xs" style={{ color: DK }}>Notifications</span>
                      <span className="text-xs font-semibold cursor-pointer" style={{ color: BTN }}>
                        Mark all read
                      </span>
                    </div>
                    <div className="divide-y max-h-64 overflow-y-auto" style={{ borderColor: BORDER }}>
                      <div className="p-3 hover:bg-stone-50 transition-colors cursor-pointer">
                        <div className="font-bold text-xs" style={{ color: DK }}>New Order #ORD-1042</div>
                        <p className="text-gray-500 text-xs">Ayesha Khan placed an order for $89.99</p>
                        <span className="text-xs text-gray-400">10 mins ago</span>
                      </div>
                      <div className="p-3 hover:bg-stone-50 transition-colors cursor-pointer">
                        <div className="font-bold text-rose-600 text-xs">Low Stock Alert: Classic Loafers</div>
                        <p className="text-gray-500 text-xs">Only 8 units left in warehouse</p>
                        <span className="text-xs text-gray-400">1 hour ago</span>
                      </div>
                      <div className="p-3 hover:bg-stone-50 transition-colors cursor-pointer">
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
                className="flex items-center gap-2.5 p-1.5 min-h-[44px] rounded-xl hover:bg-gray-100 transition-colors cursor-pointer border"
                style={{ borderColor: BORDER, backgroundColor: '#ffffff' }}
              >
                <div
                  className="h-8 w-8 rounded-full text-white flex items-center justify-center font-bold text-xs shadow-xs"
                  style={{ backgroundColor: DK }}
                >
                  {user?.name ? user.name[0] : (isAdmin ? 'S' : 'A')}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold leading-none" style={{ color: DK }}>
                    {user?.name || (isAdmin ? 'Sohail Shabbir' : 'Ali Raza')}
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
                    className="absolute right-0 mt-2 w-52 rounded-2xl bg-white shadow-xl border py-2 z-50 text-xs"
                    style={{ borderColor: BORDER }}
                  >
                    <div className="px-4 py-2 border-b" style={{ borderColor: BORDER }}>
                      <div className="font-bold" style={{ color: DK }}>{user?.name || (isAdmin ? 'Sohail Shabbir' : 'Ali Raza')}</div>
                      <div className="text-gray-400 truncate">{user?.email || 'admin@glomemall.com'}</div>
                    </div>
                    <button
                      type="button"
                      onClick={handleToggleRole}
                      className="w-full text-left px-4 py-2 hover:bg-stone-50 flex items-center gap-2 font-semibold"
                      style={{ color: DK }}
                    >
                      <ArrowRightLeft className="h-3.5 w-3.5" style={{ color: BTN }} />
                      <span>{isAdmin ? 'Switch to Sales View' : 'Switch to Admin View'}</span>
                    </button>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-gray-700 hover:bg-stone-50"
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

      {/* 4. Mobile Slide-out Drawer */}
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

            {/* Sidebar content (RoomBridge #012D1D) */}
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative w-72 text-white flex flex-col justify-between h-full shadow-2xl z-10 border-r border-white/10"
              style={{ backgroundColor: DK }}
            >
              <div className="p-5 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl shadow-md"
                    style={{ backgroundColor: ACC, color: DK }}
                  >
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-serif text-xl font-black text-white leading-none">GLOME</div>
                    <div className="text-[11px] font-semibold tracking-wider uppercase mt-0.5" style={{ color: ACC }}>
                      {isAdmin ? 'Store Admin' : 'Sales Rep'}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  aria-label="Close sidebar"
                  className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-1">
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
                          ? 'shadow-xs font-bold'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                      style={
                        isActive
                          ? { backgroundColor: `${ACC}22`, color: ACC }
                          : {}
                      }
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 shrink-0" style={{ color: isActive ? ACC : 'rgba(255,255,255,0.7)' }} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-bold shadow-2xs"
                          style={
                            isActive
                              ? { backgroundColor: ACC, color: DK }
                              : { backgroundColor: '#ef4444', color: '#ffffff' }
                          }
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
                  className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 min-h-[44px] text-xs font-bold transition-all shadow-sm"
                  style={{ backgroundColor: BTN, color: '#ffffff' }}
                >
                  <ArrowRightLeft className="h-4 w-4" />
                  <span>{isAdmin ? 'Switch to Sales Portal' : 'Switch to Admin Portal'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

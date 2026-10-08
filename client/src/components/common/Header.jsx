import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  LogOut,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { selectCurrentUser, clearCredentials } from '@/features/auth/authSlice';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Men', href: '/explore?cat=men' },
  { label: 'Women', href: '/explore?cat=women' },
  { label: 'Shoes', href: '/explore?cat=shoes' },
  { label: 'Accessories', href: '/explore?cat=accessories' },
  { label: 'Sale', href: '/explore?filter=sale', isBadge: true },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  // Track window scroll to switch button dynamically
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 280);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(clearCredentials());
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100">
      {/* Main Classical Navbar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 lg:gap-8">
        {/* Brand Logo - GLOME */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b3b2c] text-white shadow-sm group-hover:bg-[#124e3b] transition-colors">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-extrabold tracking-tight text-[#0b3b2c] leading-none">
              GLOME
            </span>
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#708077] font-semibold mt-0.5">
              Online Mall
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 shrink-0">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`whitespace-nowrap text-sm font-medium transition-colors py-2 flex items-center gap-1.5 ${
                  isActive ? 'text-[#0b3b2c] font-semibold' : 'text-[#14211d] hover:text-[#0b3b2c]'
                }`}
              >
                <span>{item.label}</span>
                {item.isBadge && (
                  <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-[9px] font-bold text-white uppercase tracking-wider">
                    Hot
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Search Bar, Wishlist, Cart & Dynamic Auth CTA */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          {/* Search Box */}
          <div className="relative hidden md:block w-44 lg:w-52 xl:w-60">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-gray-200 bg-[#f8f9fa] py-2 pl-3.5 pr-8 text-xs text-[#14211d] placeholder-gray-400 focus:border-[#0b3b2c] focus:bg-white focus:outline-none transition-all"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
          </div>

          {/* Wishlist Icon */}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="p-2 text-[#14211d] hover:text-[#0b3b2c] hover:bg-gray-100 rounded-full transition-colors hidden sm:flex"
          >
            <Heart className="h-5 w-5" />
          </Link>

          {/* Cart Icon with badge */}
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative p-2 text-[#14211d] hover:text-[#0b3b2c] hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute top-0.5 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0b3b2c] px-1 text-[9px] font-bold text-white shadow-xs">
              0
            </span>
          </Link>

          {/* User Auth CTA Logic:
              - If user is logged in -> Profile Avatar & dropdown
              - If NOT logged in:
                - At top of page -> Show "Sign In" button
                - When scrolled down -> Show "Get Started" / "Shop Now" button */}
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-[#0b3b2c] text-white flex items-center justify-center text-xs font-bold uppercase">
                  {user.name ? user.name[0] : 'U'}
                </div>
                <span className="hidden sm:inline text-xs font-semibold text-[#14211d]">
                  {user.name?.split(' ')[0]}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-gray-500 hidden sm:inline" />
              </button>

              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 rounded-2xl bg-white shadow-xl border border-gray-100 py-2 z-50 text-xs"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="font-semibold text-gray-900">{user.name}</div>
                      <div className="text-gray-400 truncate">{user.email}</div>
                    </div>
                    <Link
                      to={user.role === 'admin' ? '/admin' : '/orders'}
                      className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <AnimatePresence mode="wait">
                {isScrolled ? (
                  <motion.div
                    key="get-started-cta"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to="/shop"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#0b3b2c] hover:bg-[#124e3b] px-4.5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:scale-103 active:scale-97"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    key="login-cta"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-1 rounded-full border border-[#0b3b2c] text-[#0b3b2c] hover:bg-[#0b3b2c] hover:text-white px-4 py-1.5 sm:px-4.5 sm:py-2 text-xs font-semibold transition-all hover:shadow-xs active:scale-97"
                    >
                      <User className="h-3.5 w-3.5" />
                      <span>Sign In</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open menu"
            className="lg:hidden p-2 text-[#14211d] hover:bg-gray-100 rounded-lg transition-colors ml-1"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-100 bg-white px-5 py-5 space-y-4"
          >
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-full border border-gray-200 bg-[#f8f9fa] py-2 pl-4 pr-10 text-xs text-[#14211d] focus:border-[#0b3b2c] focus:outline-none"
              />
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            </div>

            {/* Links */}
            <nav className="flex flex-col space-y-1 pt-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-sm font-medium py-2 px-3 rounded-lg text-[#14211d] hover:bg-gray-50 hover:text-[#0b3b2c]"
                >
                  <span>{item.label}</span>
                  {item.isBadge && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-500 text-[10px] font-bold text-white">
                      HOT
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Auth CTA in Mobile */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <Link
                to="/wishlist"
                className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-[#0b3b2c]"
              >
                <Heart className="h-4 w-4" /> Wishlist
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0b3b2c] px-4 py-2 text-xs font-semibold text-white shadow-xs"
              >
                <User className="h-3.5 w-3.5" /> Sign In / Register
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

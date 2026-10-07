import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  ChevronDown,
  Menu,
  X,
  ShoppingBag as BagIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { topBarData, navLinks } from '@/features/landing/data/storeData';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-xs">
      {/* 1. Announcement Top Bar */}
      <div className="bg-[#0b3b2c] text-white text-[11px] sm:text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-[#082e22]">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
          {/* Left Perks */}
          <div className="flex items-center gap-3 text-white/90 font-light tracking-wide text-center sm:text-left">
            <span>Free shipping on orders over $50</span>
            <span className="text-white/40">|</span>
            <span>Easy 30-day returns</span>
            <span className="text-white/40 hidden md:inline">|</span>
            <span className="hidden md:inline">Secure payments</span>
          </div>

          {/* Right Links */}
          <div className="flex items-center gap-4 text-white/90">
            {topBarData.links.map((item, idx) => (
              <span key={item.label} className="flex items-center gap-3">
                <Link to={item.href} className="hover:text-[#d4a373] transition-colors">
                  {item.label}
                </Link>
                {idx < topBarData.links.length - 1 && <span className="text-white/40">|</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b3b2c] text-white shadow-md shadow-black/10 group-hover:bg-[#124e3b] transition-colors">
            <BagIcon className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#0b3b2c] leading-none">
              RoomBridge
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#596b63] font-medium mt-0.5">
              Style Your Life
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = link.active || location.pathname === link.href;
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`relative flex items-center gap-1 text-[13px] font-medium transition-colors py-2 ${
                  isActive ? 'text-[#0b3b2c] font-semibold' : 'text-[#14211d] hover:text-[#0b3b2c]'
                }`}
              >
                <span>{link.label}</span>
                {link.hasDropdown && <ChevronDown className="h-3.5 w-3.5 text-[#596b63]" />}
                {isActive && (
                  <motion.div
                    layoutId="headerActiveIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0b3b2c] rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Search & Utilities */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Input Box (matching design pill search) */}
          <div className="relative hidden md:block w-56 lg:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full rounded-full border border-gray-200 bg-[#f8f9fa] py-2 pl-4 pr-10 text-xs text-[#14211d] placeholder-gray-400 focus:border-[#0b3b2c] focus:bg-white focus:outline-none transition-all"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0b3b2c]"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>

          {/* User Icon */}
          <Link
            to="/login"
            aria-label="Account"
            className="p-2 text-[#14211d] hover:text-[#0b3b2c] hover:bg-gray-100 rounded-full transition-colors"
          >
            <User className="h-5 w-5" />
          </Link>

          {/* Wishlist Heart Icon */}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="p-2 text-[#14211d] hover:text-[#0b3b2c] hover:bg-gray-100 rounded-full transition-colors relative"
          >
            <Heart className="h-5 w-5" />
          </Link>

          {/* Cart Icon with dark green badge */}
          <Link
            to="/cart"
            aria-label="Shopping Cart"
            className="relative p-2 text-[#14211d] hover:text-[#0b3b2c] hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute 0 top-0.5 right-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#0b3b2c] px-1 text-[10px] font-bold text-white shadow-sm">
              0
            </span>
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="xl:hidden p-2 text-[#14211d] hover:text-[#0b3b2c] hover:bg-gray-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden border-t border-gray-100 bg-white px-5 py-6 space-y-4"
          >
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-full border border-gray-200 bg-[#f8f9fa] py-2.5 pl-4 pr-10 text-xs text-[#14211d] focus:border-[#0b3b2c] focus:outline-none"
              />
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            <nav className="flex flex-col space-y-2 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-sm font-medium py-2.5 px-3 rounded-lg text-[#14211d] hover:bg-gray-50 hover:text-[#0b3b2c]"
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && <ChevronDown className="h-4 w-4 text-gray-400" />}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

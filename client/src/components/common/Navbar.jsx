import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, Sparkles } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Explore', path: '/explore' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#144e3b] bg-[#0b3b2c]/95 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-18">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#cf7a3a] to-[#e09156] text-white shadow-md shadow-black/20 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-[#d4a373] transition-colors">
            Glome
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm tracking-wide transition-colors relative py-1 ${
                  isActive ? 'text-white font-semibold' : 'text-[#e2ece7] hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#cf7a3a] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right utility actions */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Search Toggle */}
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Toggle search"
            className="p-2 text-[#e2ece7] hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="p-2 text-[#e2ece7] hover:text-white hover:bg-white/10 rounded-full transition-colors relative hidden sm:flex"
          >
            <Heart className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cf7a3a] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#cf7a3a]"></span>
            </span>
          </Link>

          {/* Cart Icon with badge */}
          <Link
            to="/cart"
            aria-label="Shopping Cart"
            className="relative flex items-center justify-center p-2 text-[#e2ece7] hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#cf7a3a] px-1 text-[10px] font-bold text-white shadow-sm">
              0
            </span>
          </Link>

          {/* RoomBridge signature Caramel Pill Login Button */}
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#cf7a3a] hover:bg-[#b8672e] px-5 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 active:scale-98 ml-1"
          >
            Login
          </Link>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open main menu"
            className="md:hidden p-2 text-[#e2ece7] hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-1"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {searchOpen && (
        <div className="border-t border-[#144e3b] bg-[#06261b] px-4 py-3 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  window.location.href = `/explore?search=${encodeURIComponent(searchQuery.trim())}`;
                }
              }}
              className="relative flex items-center"
            >
              <Search className="absolute left-3.5 h-4 w-4 text-[#8a9c94]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search premium shoes, outerwear, linen shirts..."
                className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder-[#8a9c94] focus:border-[#cf7a3a] focus:bg-white/10 focus:outline-none"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-[#8a9c94] hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#144e3b] bg-[#06261b] px-5 py-6 space-y-4">
          <nav className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-base px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-[#e2ece7] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[#144e3b] flex items-center justify-between text-sm text-[#e2ece7]">
            <Link to="/wishlist" className="flex items-center gap-2 hover:text-white">
              <Heart className="h-4 w-4" /> Wishlist
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#cf7a3a] px-5 py-2 text-xs font-semibold text-white"
            >
              <User className="h-3.5 w-3.5" /> Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

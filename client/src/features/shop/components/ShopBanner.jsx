import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ShopBanner({ activeCategoryName, totalCount }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#f8f4ec] via-[#f4eee2] to-[#ede5d6] border-b border-[#e5dcce] pt-8 pb-10 sm:pt-10 sm:pb-14">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 -z-0 h-64 w-64 rounded-full bg-[#0b3b2c]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-0 h-64 w-64 rounded-full bg-[#cf7a3a]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-[#708077] mb-4">
          <Link to="/" className="hover:text-[#0b3b2c] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/shop" className="hover:text-[#0b3b2c] transition-colors">
            Shop
          </Link>
          {activeCategoryName && activeCategoryName !== 'All Products' && (
            <>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-semibold text-[#0b3b2c]">{activeCategoryName}</span>
            </>
          )}
        </nav>

        {/* Content & Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-3"
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0b3b2c]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0b3b2c]">
                <Sparkles className="h-3.5 w-3.5" />
                Curated Collection
              </span>
              <span className="text-xs font-semibold text-[#708077]">
                {totalCount} Premium Essentials
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#14211d] leading-tight">
              {activeCategoryName && activeCategoryName !== 'All Products'
                ? activeCategoryName
                : 'Explore Our Collection'}
            </h1>

            <p className="text-sm sm:text-base text-[#596b63] leading-relaxed">
              Find the perfect style for every moment. From casual streetwear to tailored evening
              silhouettes, designed with artisanal precision.
            </p>
          </motion.div>

          {/* Quick Perks Chips */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden sm:flex items-center gap-3 shrink-0"
          >
            <div className="flex items-center gap-2 rounded-2xl bg-white/80 backdrop-blur-xs px-3.5 py-2 text-xs font-medium text-[#14211d] shadow-xs border border-white/80">
              <Truck className="h-4 w-4 text-[#0b3b2c]" />
              <span>Free Delivery &gt; $50</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-white/80 backdrop-blur-xs px-3.5 py-2 text-xs font-medium text-[#14211d] shadow-xs border border-white/80">
              <ShieldCheck className="h-4 w-4 text-[#0b3b2c]" />
              <span>Authenticity Guaranteed</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

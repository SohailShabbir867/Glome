import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PromoBannersSection() {
  return (
    <section className="bg-white py-14 sm:py-18 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {/* 1. Left Banner: Women's Fashion */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="group relative overflow-hidden rounded-3xl bg-[#f4ece1] p-6 sm:p-7 flex flex-col justify-between border border-[#e5d8c8] shadow-xs hover:shadow-xl hover:shadow-black/5"
          >
            <div className="flex items-center gap-4">
              {/* Model Cutout Image */}
              <div className="w-1/2 aspect-3/4 overflow-hidden rounded-2xl bg-white shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                  alt="Women's Fashion"
                  className="h-full w-full object-cover group-hover:scale-106 transition-transform duration-500"
                />
              </div>

              {/* Text info */}
              <div className="w-1/2 space-y-3">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14211d] leading-tight">
                  Women&apos;s Fashion
                </h3>
                <p className="text-xs text-[#596b63] leading-relaxed">
                  Elegant Looks for Every Moment
                </p>
                <Link
                  to="/explore?cat=women"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#0b3b2c] hover:bg-[#124e3b] px-4 py-2 text-[11px] font-semibold text-white shadow-xs transition-colors"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* 2. Center Banner: Footwear Collection (Deep Forest Green) */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="group relative overflow-hidden rounded-3xl bg-[#0b3b2c] text-white p-6 sm:p-7 flex flex-col justify-between border border-[#082e22] shadow-xl shadow-black/10"
          >
            <div className="space-y-2 z-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4a373]">
                Footwear Collection
              </span>
              <p className="text-xs text-[#dce7e2]">Step Into Comfort &amp; Style</p>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#fbf8f2] pt-1">
                Up to 40% Off
              </div>
            </div>

            {/* Sneakers on Blocks Image */}
            <div className="relative my-3 w-full h-32 sm:h-36 overflow-hidden rounded-2xl bg-[#06261b]">
              <img
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80"
                alt="Sneakers on Blocks"
                className="h-full w-full object-cover group-hover:scale-106 transition-transform duration-500"
              />
            </div>

            <div className="pt-1 z-10">
              <Link
                to="/explore?cat=shoes"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#f4ece1] hover:bg-white text-[#0b3b2c] px-5 py-2 text-xs font-bold shadow-xs transition-colors"
              >
                <span>Shop Now</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* 3. Right Banner: Accessories That Complete You */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="group relative overflow-hidden rounded-3xl bg-[#ebe3d7] p-6 sm:p-7 flex flex-col justify-between border border-[#d8cdbf] shadow-xs hover:shadow-xl hover:shadow-black/5"
          >
            <div className="space-y-2">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14211d] leading-tight">
                Accessories That Complete You
              </h3>
              <p className="text-xs text-[#596b63]">Small Details. Big Impact.</p>
            </div>

            {/* Flatlay Accessories Image */}
            <div className="relative my-3 w-full h-32 sm:h-36 overflow-hidden rounded-2xl bg-white shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
                alt="Accessories Flatlay"
                className="h-full w-full object-cover group-hover:scale-106 transition-transform duration-500"
              />
            </div>

            <div className="pt-1">
              <Link
                to="/explore?cat=accessories"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0b3b2c] hover:bg-[#124e3b] px-4 py-2 text-[11px] font-semibold text-white shadow-xs transition-colors"
              >
                <span>Explore</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

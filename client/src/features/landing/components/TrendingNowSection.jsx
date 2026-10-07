import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { popularProducts } from '../data/storeData';

export default function TrendingNowSection() {
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="bg-white py-16 sm:py-20 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#cf7a3a]">
              TRENDING NOW
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#14211d] mt-1">
              Popular Right Now
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#708077]">
              The styles everyone&apos;s loving.
            </p>
          </div>

          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#14211d] hover:text-[#0b3b2c] transition-colors group"
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Carousel / Grid with Controls */}
        <div className="relative">
          {/* Side arrow controls */}
          <button
            type="button"
            aria-label="Previous"
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 hidden lg:flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md border border-gray-200 text-[#14211d] hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next"
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 hidden lg:flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md border border-gray-200 text-[#14211d] hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            {popularProducts.map((product) => {
              const isLiked = !!wishlist[product.id];

              return (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="group flex flex-col rounded-2xl bg-white p-3 border border-gray-100 hover:border-[#e8ded0] hover:shadow-lg hover:shadow-black/5 transition-all"
                >
                  {/* Image */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#faf7f2] p-3 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain object-center group-hover:scale-108 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Wishlist */}
                    <button
                      type="button"
                      onClick={(e) => toggleWishlist(product.id, e)}
                      aria-label="Wishlist"
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-rose-500 shadow-2xs transition-colors"
                    >
                      <Heart
                        className={`h-3.5 w-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="mt-3 flex flex-col flex-1">
                    <Link
                      to={`/product/${product.id}`}
                      className="hover:text-[#0b3b2c] transition-colors"
                    >
                      <h3 className="text-xs sm:text-[13px] font-bold text-[#14211d] line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="mt-1 font-serif text-sm sm:text-base font-bold text-[#14211d]">
                      ${product.price.toFixed(2)}
                    </div>

                    <div className="mt-1 flex items-center gap-1 text-[11px] text-amber-500">
                      <Star className="h-3 w-3 fill-amber-400" />
                      <span className="font-semibold text-[#14211d]">{product.rating}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

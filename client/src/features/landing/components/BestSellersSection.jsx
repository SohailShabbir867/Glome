import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { bestSellers } from '../data/storeData';

export default function BestSellersSection() {
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="bg-[#faf7f2] py-16 sm:py-20 border-b border-[#e8ded0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#596b63]">
                FEATURED PRODUCTS
              </span>
              <span className="h-px w-14 bg-[#c4b5a3]" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#14211d]">
              Best Sellers
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#708077]">
              Loved by thousands. Handpicked for you.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous products"
              className="p-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-[#14211d] shadow-2xs hover:scale-105 active:scale-95 transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next products"
              className="p-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-[#14211d] shadow-2xs hover:scale-105 active:scale-95 transition-all"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 6 Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {bestSellers.map((product) => {
            const isLiked = !!wishlist[product.id];

            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="group flex flex-col rounded-2xl bg-white p-3 shadow-xs hover:shadow-xl hover:shadow-black/5 border border-[#e8ded0] transition-all duration-300"
              >
                {/* Product Image Box */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#f8f6f0] p-3 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain object-center group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 rounded-full bg-[#0b3b2c] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-xs">
                      {product.badge}
                    </span>
                  )}

                  {/* Wishlist Heart Icon */}
                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(product.id, e)}
                    aria-label="Add to wishlist"
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-rose-500 shadow-2xs transition-colors"
                  >
                    <Heart
                      className={`h-3.5 w-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`}
                    />
                  </button>
                </div>

                {/* Details */}
                <div className="mt-3 flex flex-col flex-1 justify-between">
                  <div>
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

                    {/* Star Rating */}
                    <div className="mt-1.5 flex items-center gap-1 text-[11px] text-amber-500">
                      <Star className="h-3 w-3 fill-amber-400" />
                      <span className="font-semibold text-[#14211d]">{product.rating}</span>
                      <span className="text-[#8a9c94] text-[10px]">({product.reviews})</span>
                    </div>

                    {/* Color Swatch Dots */}
                    <div className="mt-2 flex items-center gap-1.5">
                      {product.colors.map((color, cIdx) => (
                        <span
                          key={cIdx}
                          className="h-2.5 w-2.5 rounded-full border border-gray-300 shadow-2xs"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => alert(`Added ${product.name} to cart!`)}
                    className={`mt-3 w-full py-2 rounded-lg text-xs font-semibold transition-all ${
                      product.isGhostButton
                        ? 'border border-[#0b3b2c] text-[#0b3b2c] hover:bg-[#0b3b2c] hover:text-white'
                        : 'bg-[#0b3b2c] text-white hover:bg-[#124e3b]'
                    }`}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

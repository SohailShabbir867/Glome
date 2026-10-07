import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, ShoppingBag, Star } from 'lucide-react';
import { featuredProducts } from '../data/mockData';

export default function FeaturedProducts() {
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-16 sm:py-20 bg-[#faf7f2]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#cf7a3a]">
              Best Of The Season
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#14211d] mt-1">
              Featured Products
            </h2>
            <p className="mt-1 text-sm text-[#596b63]">
              Handcrafted staples with verified five-star comfort and longevity
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0b3b2c] hover:text-[#cf7a3a] transition-colors group"
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => {
            const isLiked = !!wishlist[product.id];

            return (
              <div
                key={product.id}
                className="group relative flex flex-col rounded-3xl bg-white border border-[#e8e4db] p-4 hover:shadow-xl hover:shadow-black/5 hover:border-[#cf7a3a]/40 transition-all duration-300"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#fbf9f4] p-4 flex items-center justify-center border border-[#e8e4db]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain object-center group-hover:scale-106 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.badge && (
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${
                          product.badgeType === 'danger'
                            ? 'bg-[#cf7a3a] text-white'
                            : product.badgeType === 'brand'
                              ? 'bg-[#0b3b2c] text-white'
                              : 'bg-[#14211d] text-white'
                        }`}
                      >
                        {product.discount || product.badge}
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(product.id, e)}
                    aria-label="Add to wishlist"
                    className={`absolute top-3 right-3 p-2 rounded-full shadow-sm transition-all duration-200 ${
                      isLiked
                        ? 'bg-rose-50 text-rose-500'
                        : 'bg-white/90 text-gray-500 hover:text-rose-500 hover:bg-white'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-rose-500' : ''}`} />
                  </button>

                  {/* Quick Add To Cart Button in Caramel */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Added ${product.name} to cart!`);
                    }}
                    className="absolute bottom-3 right-3 p-2.5 rounded-full bg-[#cf7a3a] hover:bg-[#b8672e] text-white shadow-md opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105 active:scale-95"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </button>
                </div>

                {/* Product Meta */}
                <div className="mt-4 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#cf7a3a] mb-1">
                    <Star className="h-3.5 w-3.5 fill-[#cf7a3a]" />
                    <span className="font-semibold text-[#14211d]">{product.rating}</span>
                    <span className="text-[#8a9c94]">({product.reviewsCount})</span>
                  </div>

                  <Link
                    to={`/product/${product.id}`}
                    className="group-hover:text-[#0b3b2c] transition-colors"
                  >
                    <h3 className="font-serif text-base font-bold text-[#14211d] line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-bold text-[#0b3b2c]">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#8a9c94] line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

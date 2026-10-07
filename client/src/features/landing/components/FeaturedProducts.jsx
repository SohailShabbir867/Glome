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
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Featured Products
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Top trending items loved by thousands of happy customers
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors group"
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
                className="group relative flex flex-col rounded-3xl bg-[#f8f9fa] border border-gray-100 p-4 hover:shadow-xl hover:shadow-gray-200/50 hover:bg-white transition-all duration-300"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white p-4 flex items-center justify-center border border-gray-100">
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
                            ? 'bg-rose-500 text-white'
                            : product.badgeType === 'brand'
                              ? 'bg-emerald-500 text-white'
                              : 'bg-gray-900 text-white'
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

                  {/* Quick Add To Cart Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Added ${product.name} to cart!`);
                    }}
                    className="absolute bottom-3 right-3 p-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-md opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105 active:scale-95"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </button>
                </div>

                {/* Product Meta */}
                <div className="mt-4 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-xs text-amber-500 mb-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    <span className="font-semibold text-gray-800">{product.rating}</span>
                    <span className="text-gray-400">({product.reviewsCount})</span>
                  </div>

                  <Link
                    to={`/product/${product.id}`}
                    className="group-hover:text-emerald-600 transition-colors"
                  >
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
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

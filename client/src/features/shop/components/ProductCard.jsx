import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  toggleWishlist,
  selectIsWishlisted,
} from '@/features/cart/cartSlice';

export default function ProductCard({ product, onQuickView }) {
  const dispatch = useDispatch();
  const isWishlisted = useSelector(selectIsWishlisted(product.id));

  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.name || ''
  );
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        product,
        selectedSize: product.sizes?.[0] || 'Standard',
        selectedColor: selectedColor || product.colors?.[0]?.name,
        quantity: 1,
      })
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  const displayImage =
    isHovered && product.secondaryImage
      ? product.secondaryImage
      : product.image;

  const productUrl = `/product/${product.slug || product.id}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between rounded-2xl bg-white p-3 sm:p-4 border border-gray-100/90 shadow-2xs hover:shadow-md hover:border-gray-200/80 transition-all duration-300"
    >
      <div>
        {/* Image Container */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#f8f7f5]">
          <Link to={productUrl} className="block h-full w-full">
            <img
              src={displayImage}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
            />
          </Link>

          {/* Badges on Top Left */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
            {product.badge && (
              <span
                className={`rounded-full px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-xs ${
                  product.badgeType === 'caramel'
                    ? 'bg-[#cf7a3a]'
                    : product.badge === 'HOT' || product.badge === 'SALE'
                      ? 'bg-rose-500'
                      : 'bg-[#0b3b2c]'
                }`}
              >
                {product.badge}
              </span>
            )}
            {product.discount && !product.badge && (
              <span className="rounded-full bg-[#cf7a3a] px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-xs">
                {product.discount}
              </span>
            )}
          </div>

          {/* Wishlist Button on Top Right */}
          <button
            type="button"
            onClick={handleToggleWishlist}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className="absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-xs text-[#14211d] shadow-xs hover:scale-110 active:scale-95 transition-all"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isWishlisted
                  ? 'fill-rose-500 text-rose-500'
                  : 'text-gray-500 hover:text-rose-500'
              }`}
            />
          </button>

          {/* Quick View Button (hover overlay) */}
          <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="w-full flex items-center justify-center gap-1.5 rounded-full bg-white/95 backdrop-blur-xs py-2 px-3 text-xs font-semibold text-[#14211d] shadow-md hover:bg-[#0b3b2c] hover:text-white transition-all"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Quick View</span>
            </button>
          </div>
        </div>

        {/* Product Meta */}
        <div className="pt-3.5 space-y-1.5">
          {/* Brand & Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#708077]">
            <span className="uppercase tracking-wider font-semibold">
              {product.brand}
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-[#14211d]">{product.rating}</span>
              <span className="text-gray-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <Link to={productUrl} className="block group">
            <h3 className="font-sans text-xs sm:text-[13.5px] font-semibold text-[#14211d] line-clamp-1 group-hover:text-[#0b3b2c] transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 pt-0.5">
              {product.colors.map((color) => {
                const isSelected = selectedColor === color.name;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedColor(color.name);
                    }}
                    title={color.name}
                    className={`h-3.5 w-3.5 rounded-full border border-black/15 transition-transform ${
                      isSelected ? 'ring-1.5 ring-[#0b3b2c] scale-115' : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Price & Add to Cart Action */}
      <div className="pt-3 border-t border-gray-100/80 mt-3 flex items-center justify-between gap-2">
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm sm:text-base font-bold text-[#14211d]">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-[11px] text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className={`flex items-center justify-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-95 ${
            justAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-[#0b3b2c] text-white hover:bg-[#124e3b] shadow-xs'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Added</span>
            </>
          ) : (
            <>
              <ShoppingBag className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Add</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

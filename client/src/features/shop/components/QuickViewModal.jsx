import { useState } from 'react';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Truck,
  RotateCcw,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  toggleWishlist,
  selectIsWishlisted,
} from '@/features/cart/cartSlice';

export default function QuickViewModal({ product, onClose }) {
  const dispatch = useDispatch();
  const isWishlisted = useSelector(
    product ? selectIsWishlisted(product.id) : () => false
  );

  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0]?.name || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) return null;

  const images = [product.image, product.secondaryImage].filter(Boolean);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        selectedSize,
        selectedColor,
        quantity,
      })
    );
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 1200);
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-100 max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Left: Gallery (Image & Thumbnails) */}
          <div className="w-full md:w-1/2 p-6 bg-[#f9f8f5] flex flex-col justify-between">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white shadow-xs">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center transition-all duration-300"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 rounded-full bg-[#0b3b2c] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-xs">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 mt-4">
                {images.map((img, idx) => (
                  <button
                    key={img + idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative h-16 w-16 overflow-hidden rounded-xl border-2 transition-all ${
                      (selectedImage || product.image) === img
                        ? 'border-[#0b3b2c] scale-105'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details & Purchase Actions */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Brand & Rating */}
              <div className="flex items-center justify-between text-xs text-[#708077]">
                <span className="uppercase font-bold tracking-wider text-[#0b3b2c]">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-current" />
                  </div>
                  <span className="font-semibold text-[#14211d]">{product.rating}</span>
                  <span>({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14211d] leading-snug">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl font-extrabold text-[#0b3b2c]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.discount && (
                  <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-600">
                    {product.discount}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#596b63] leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#14211d]">Color:</span>
                    <span className="text-[#596b63]">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => {
                      const isSelected = selectedColor === c.name;
                      return (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c.name)}
                          className={`relative flex h-7 w-7 items-center justify-center rounded-full transition-transform ${
                            isSelected ? 'ring-2 ring-[#0b3b2c] ring-offset-2 scale-110' : ''
                          }`}
                        >
                          <span
                            className="h-6 w-6 rounded-full border border-black/10 shadow-xs flex items-center justify-center"
                            style={{ backgroundColor: c.hex }}
                          >
                            {isSelected && (
                              <Check
                                className={`h-3 w-3 ${
                                  c.hex === '#ffffff' || c.hex === '#f4efe9'
                                    ? 'text-gray-900'
                                    : 'text-white'
                                }`}
                              />
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#14211d]">Size:</span>
                    <span className="text-[#596b63]">{selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => {
                      const isSelected = selectedSize === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                            isSelected
                              ? 'border-[#0b3b2c] bg-[#0b3b2c] text-white shadow-xs'
                              : 'border-gray-200 bg-white text-[#14211d] hover:border-gray-400'
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-xs font-bold text-[#14211d]">Quantity:</span>
                <div className="flex items-center rounded-xl border border-gray-200 bg-[#f8f9fa] p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-7 w-7 rounded-lg hover:bg-white text-[#14211d] font-bold flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-[#14211d]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-7 w-7 rounded-lg hover:bg-white text-[#14211d] font-bold flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions: Add to Cart + Wishlist */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-full py-3.5 px-6 text-xs sm:text-sm font-bold text-white shadow-md transition-all active:scale-98 ${
                    justAdded
                      ? 'bg-emerald-600'
                      : 'bg-[#0b3b2c] hover:bg-[#124e3b]'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Added to Shopping Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      <span>Add to Bag • ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleToggleWishlist}
                  aria-label="Toggle wishlist"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 hover:border-gray-400 text-[#14211d] transition-colors"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-[#708077] text-center">
                <div className="flex items-center justify-center gap-1">
                  <Truck className="h-3.5 w-3.5 text-[#0b3b2c]" />
                  <span>Free shipping</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <RotateCcw className="h-3.5 w-3.5 text-[#0b3b2c]" />
                  <span>30-day returns</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#0b3b2c]" />
                  <span>100% genuine</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

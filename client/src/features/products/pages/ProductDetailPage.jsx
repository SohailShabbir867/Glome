import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ChevronRight,
  Star,
  ShoppingBag,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  ChevronDown,
  Ruler,
  ZoomIn,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PRODUCTS_CATALOG } from '@/features/shop/data/productsData';
import ProductCard from '@/features/shop/components/ProductCard';
import QuickViewModal from '@/features/shop/components/QuickViewModal';
import {
  addToCart,
  toggleWishlist,
  selectIsWishlisted,
} from '@/features/cart/cartSlice';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  // Find product by slug or id
  const product = useMemo(() => {
    return (
      PRODUCTS_CATALOG.find((p) => p.slug === slug || p.id === slug) ||
      PRODUCTS_CATALOG[0]
    );
  }, [slug]);

  const isWishlisted = useSelector(selectIsWishlisted(product?.id));

  // Local interaction states
  const [activeImage, setActiveImage] = useState(product?.image);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState('details');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [quickViewProd, setQuickViewProd] = useState(null);

  // Cursor detailing zoom states
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setZoomPos({ x: 50, y: 50 });
  };

  // Sync state when product changes
  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setSelectedSize(product.sizes?.[0] || 'Standard');
      setSelectedColor(product.colors?.[0]?.name || '');
      setQuantity(1);
      setIsZoomed(false);
      setZoomPos({ x: 50, y: 50 });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product]);

  // Related products from the same category
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return PRODUCTS_CATALOG.filter(
      (p) => p.category === product.category && p.id !== product.id
    ).slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#14211d]">Product Not Found</h2>
          <Link
            to="/shop"
            className="mt-4 inline-block rounded-full bg-[#0b3b2c] text-white px-6 py-2.5 text-xs font-semibold"
          >
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages = [product.image, product.secondaryImage].filter(Boolean);

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
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] pb-16">
      {/* 1. Breadcrumbs */}
      <div className="border-b border-gray-200/80 bg-white shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-1.5 text-xs text-[#708077] overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-[#0b3b2c] transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <Link to="/shop" className="hover:text-[#0b3b2c] transition-colors">
              Shop
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <Link
              to={`/${product.category}`}
              className="hover:text-[#0b3b2c] transition-colors"
            >
              {product.categoryLabel}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="font-semibold text-[#0b3b2c] truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* 2. Main Product Showcase */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 sm:gap-6">
            {/* Thumbnails Column */}
            {galleryImages.length > 1 && (
              <div className="flex sm:flex-col gap-3 shrink-0 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
                {galleryImages.map((img, idx) => {
                  const isActive = activeImage === img;
                  return (
                    <button
                      key={img + idx}
                      type="button"
                      onClick={() => {
                        setActiveImage(img);
                        setIsZoomed(false);
                      }}
                      className={`relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-2xl border-2 transition-all ${
                        isActive
                          ? 'border-[#0b3b2c] ring-2 ring-[#0b3b2c]/20 scale-103'
                          : 'border-transparent opacity-75 hover:opacity-100 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Main Stage Image with Interactive Cursor Detailing Zoom */}
            <div
              className="relative flex-1 aspect-square sm:aspect-4/5 w-full overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100/90 cursor-crosshair sm:cursor-zoom-in select-none group"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={activeImage}
                alt={product.name}
                style={{
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: isZoomed ? 'scale(2.4)' : 'scale(1)',
                  transition: isZoomed ? 'transform 0.08s ease-out' : 'transform 0.35s ease-out',
                }}
                className="h-full w-full object-cover object-center pointer-events-none will-change-transform"
              />

              {/* Badge */}
              {product.badge && (
                <span className="absolute top-4 left-4 z-10 rounded-full bg-[#0b3b2c] px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-sm pointer-events-none">
                  {product.badge}
                </span>
              )}

              {/* Floating Wishlist Button */}
              <button
                type="button"
                onClick={handleToggleWishlist}
                aria-label="Wishlist"
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-xs text-[#14211d] shadow-md hover:scale-110 active:scale-95 transition-all pointer-events-auto"
              >
                <Heart
                  className={`h-5 w-5 ${
                    isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-600'
                  }`}
                />
              </button>

              {/* Detailing Zoom Hint Pill */}
              <div
                className={`absolute bottom-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-black/65 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-white transition-opacity duration-300 pointer-events-none ${
                  isZoomed ? 'opacity-0' : 'opacity-90'
                }`}
              >
                <ZoomIn className="h-3.5 w-3.5 text-white/90" />
                <span>Roll over to zoom details</span>
              </div>
            </div>
          </div>

          {/* Right Column: Purchasing Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header: Brand & Rating */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#708077]">
                <span className="font-bold uppercase tracking-widest text-[#0b3b2c]">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center text-amber-400">
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <span className="font-bold text-[#14211d]">{product.rating}</span>
                  <span>({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#14211d] leading-tight">
                {product.name}
              </h1>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-3xl font-extrabold text-[#0b3b2c]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.discount && (
                  <span className="rounded-full bg-[#cf7a3a] px-3 py-0.5 text-xs font-bold text-white shadow-2xs">
                    {product.discount}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#596b63] leading-relaxed">
              {product.description}
            </p>

            {/* Color Swatch Picker */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2.5 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#14211d]">
                    Color: <span className="font-semibold text-[#596b63]">{selectedColor}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor === color.name;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={`group relative flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-110 ${
                          isSelected ? 'ring-2 ring-[#0b3b2c] ring-offset-2' : ''
                        }`}
                      >
                        <span
                          className="h-7 w-7 rounded-full border border-black/10 shadow-2xs flex items-center justify-center"
                          style={{ backgroundColor: color.hex }}
                        >
                          {isSelected && (
                            <Check
                              className={`h-3.5 w-3.5 ${
                                color.hex === '#ffffff' || color.hex === '#f4efe9'
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

            {/* Size Picker */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#14211d]">
                    Size: <span className="font-semibold text-[#596b63]">{selectedSize}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="inline-flex items-center gap-1 text-[#0b3b2c] hover:underline font-semibold"
                  >
                    <Ruler className="h-3.5 w-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'border-[#0b3b2c] bg-[#0b3b2c] text-white shadow-xs'
                            : 'border-gray-200 bg-white text-[#14211d] hover:border-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity & CTA Buttons */}
            <div className="space-y-3 pt-3">
              <div className="flex items-center gap-3">
                {/* Quantity Box */}
                <div className="flex items-center rounded-2xl border border-gray-200 bg-white p-1.5 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-8 w-8 rounded-xl hover:bg-gray-100 text-[#14211d] font-bold flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <span className="w-9 text-center text-xs font-bold text-[#14211d]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-8 w-8 rounded-xl hover:bg-gray-100 text-[#14211d] font-bold flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-full py-4 px-6 text-xs sm:text-sm font-bold text-white shadow-md transition-all active:scale-98 ${
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
              </div>

              {/* View Cart Pill button if just added */}
              {justAdded && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between rounded-2xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-900"
                >
                  <span>Item added to your shopping bag!</span>
                  <Link
                    to="/cart"
                    className="font-bold underline text-emerald-950 hover:text-[#0b3b2c]"
                  >
                    View Bag &amp; Checkout &rarr;
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Perks Strip */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 text-[11px] text-[#596b63] text-center">
              <div className="flex flex-col items-center gap-1">
                <Truck className="h-4 w-4 text-[#0b3b2c]" />
                <span>Free shipping &gt; $50</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="h-4 w-4 text-[#0b3b2c]" />
                <span>30-day returns</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-[#0b3b2c]" />
                <span>100% genuine</span>
              </div>
            </div>

            {/* Collapsible Accordions (Product Details, Shipping, Reviews) */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              {/* 1. Product Details */}
              <div className="rounded-2xl border border-gray-200/80 bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() =>
                    setActiveAccordion(activeAccordion === 'details' ? '' : 'details')
                  }
                  className="w-full flex items-center justify-between p-4 text-xs font-bold text-[#14211d] text-left"
                >
                  <span>Product Details &amp; Materials</span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform ${
                      activeAccordion === 'details' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeAccordion === 'details' && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#596b63] space-y-2 border-t border-gray-100">
                    <ul className="list-disc pl-4 space-y-1">
                      {product.features?.map((f, i) => (
                        <li key={i}>{f}</li>
                      )) || (
                        <>
                          <li>Premium material sourcing and double-needle reinforced seams</li>
                          <li>Pre-washed finish to prevent shrinkage and retain color depth</li>
                          <li>Designed in Europe and ethically assembled in certified workshops</li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* 2. Size Guide */}
              <div className="rounded-2xl border border-gray-200/80 bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() =>
                    setActiveAccordion(activeAccordion === 'size' ? '' : 'size')
                  }
                  className="w-full flex items-center justify-between p-4 text-xs font-bold text-[#14211d] text-left"
                >
                  <span>Size &amp; Fit Recommendations</span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform ${
                      activeAccordion === 'size' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeAccordion === 'size' && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#596b63] space-y-2 border-t border-gray-100">
                    <p>
                      True to size fit. If you prefer an oversized or slouchy drape, we recommend
                      ordering one size up.
                    </p>
                    <div className="grid grid-cols-4 gap-2 pt-1 text-center font-semibold text-[11px]">
                      <div className="bg-gray-50 p-1.5 rounded-lg">S: 36-38&quot;</div>
                      <div className="bg-gray-50 p-1.5 rounded-lg">M: 38-40&quot;</div>
                      <div className="bg-gray-50 p-1.5 rounded-lg">L: 40-42&quot;</div>
                      <div className="bg-gray-50 p-1.5 rounded-lg">XL: 42-44&quot;</div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Shipping & Returns */}
              <div className="rounded-2xl border border-gray-200/80 bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() =>
                    setActiveAccordion(activeAccordion === 'shipping' ? '' : 'shipping')
                  }
                  className="w-full flex items-center justify-between p-4 text-xs font-bold text-[#14211d] text-left"
                >
                  <span>Shipping &amp; Hassle-Free Returns</span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform ${
                      activeAccordion === 'shipping' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeAccordion === 'shipping' && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#596b63] space-y-1.5 border-t border-gray-100">
                    <p>
                      <strong>Standard Shipping:</strong> 2-4 business days. Free on all orders
                      above $50.
                    </p>
                    <p>
                      <strong>Express Delivery:</strong> 1-2 business days available at checkout.
                    </p>
                    <p>
                      <strong>Easy Returns:</strong> Return within 30 days of receiving your item for
                      a full refund or exchange.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Related Products: "You May Also Like" */}
        {relatedProducts.length > 0 && (
          <div className="pt-20 sm:pt-28 space-y-8">
            <div className="flex items-end justify-between border-b border-gray-200/80 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0b3b2c]">
                  Curated For You
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#14211d] mt-1">
                  You May Also Like
                </h2>
              </div>
              <Link
                to={`/${product.category}`}
                className="text-xs font-bold text-[#0b3b2c] hover:underline"
              >
                View all in {product.categoryLabel} &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relProd) => (
                <ProductCard
                  key={relProd.id}
                  product={relProd}
                  onQuickView={(p) => setQuickViewProd(p)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProd && (
        <QuickViewModal
          product={quickViewProd}
          onClose={() => setQuickViewProd(null)}
        />
      )}
    </div>
  );
}

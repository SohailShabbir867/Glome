import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Heart, ArrowRight, ShoppingBag, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { PRODUCTS_CATALOG } from '@/features/shop/data/productsData';
import ProductCard from '@/features/shop/components/ProductCard';
import QuickViewModal from '@/features/shop/components/QuickViewModal';
import { selectWishlist, addToCart } from '@/features/cart/cartSlice';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const wishlistIds = useSelector(selectWishlist);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const wishlistedProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  const handleMoveAllToBag = () => {
    wishlistedProducts.forEach((product) => {
      dispatch(
        addToCart({
          product,
          selectedSize: product.sizes?.[0] || 'Standard',
          selectedColor: product.colors?.[0]?.name || '',
          quantity: 1,
        })
      );
    });
    alert('All wishlisted items moved to your shopping bag!');
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] pb-16">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200/80 bg-white shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-1.5 text-xs text-[#708077]">
            <Link to="/" className="hover:text-[#0b3b2c] transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/shop" className="hover:text-[#0b3b2c] transition-colors">
              Shop
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-[#0b3b2c]">My Wishlist</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#14211d]">
              Saved Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-[#596b63] mt-1">
              Your favorite silhouettes and curated pieces saved for later.
            </p>
          </div>

          {wishlistedProducts.length > 0 && (
            <button
              type="button"
              onClick={handleMoveAllToBag}
              className="inline-flex items-center gap-2 rounded-full bg-[#0b3b2c] hover:bg-[#124e3b] px-6 py-2.5 text-xs font-bold text-white shadow-sm transition-all"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Move All to Bag</span>
            </button>
          )}
        </div>

        {wishlistedProducts.length > 0 ? (
          <div className="pt-8">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {wishlistedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-white p-12 sm:p-16 text-center shadow-xs border border-gray-100 max-w-xl mx-auto my-12 space-y-5"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-rose-50 text-rose-500">
              <Heart className="h-10 w-10 fill-rose-500" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#14211d]">
                Your Wishlist is Empty
              </h2>
              <p className="text-xs sm:text-sm text-[#596b63] max-w-md mx-auto">
                Explore our catalog and click the heart icon on any product to save it to your
                personal collection.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-[#0b3b2c] hover:bg-[#124e3b] px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:scale-103"
              >
                <span>Discover Products</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}

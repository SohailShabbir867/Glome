import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Trash2,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Tag,
  Check,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  selectCartItems,
  selectCartSubtotal,
  updateQuantity,
  removeFromCart,
} from '@/features/cart/cartSlice';

const FREE_SHIPPING_THRESHOLD = 50;

export default function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 5.99;
  const discountAmount = (subtotal * discountPercent) / 100;
  const estimatedTotal = Math.max(0, subtotal - discountAmount + shippingCost);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const clean = promoCode.trim().toUpperCase();
    if (clean === 'GLOME20' || clean === 'WELCOME20') {
      setDiscountPercent(20);
      setPromoSuccess('Promo code GLOME20 applied! You saved 20%.');
    } else if (clean === 'GLOME10') {
      setDiscountPercent(10);
      setPromoSuccess('Promo code GLOME10 applied! You saved 10%.');
    } else {
      setPromoError('Invalid promo code. Try "GLOME20" for 20% off.');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] pb-16">
      {/* Breadcrumb */}
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
            <span className="font-semibold text-[#0b3b2c]">Shopping Bag</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="flex items-center justify-between border-b border-gray-200/80 pb-5">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#14211d]">
              Shopping Bag
            </h1>
            <p className="text-xs sm:text-sm text-[#596b63] mt-1">
              Review your items, apply promo codes, and proceed to secure checkout.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#708077]">
            {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
          </span>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 items-start">
            {/* Left Column: Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Shipping Progress Meter */}
              <div className="rounded-2xl bg-white p-4 sm:p-5 border border-gray-100 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#14211d] flex items-center gap-1.5">
                    <Truck className="h-4 w-4 text-[#0b3b2c]" />
                    {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                      <span className="text-emerald-700 font-bold">
                        🎉 You&apos;ve unlocked Free Express Shipping!
                      </span>
                    ) : (
                      <span>
                        Add{' '}
                        <strong className="text-[#0b3b2c]">
                          ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)}
                        </strong>{' '}
                        more to unlock <strong>Free Express Shipping</strong>
                      </span>
                    )}
                  </span>
                  <span className="text-[11px] font-bold text-[#708077]">
                    {Math.round(progressPercent)}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#0b3b2c] transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="rounded-3xl bg-white p-4 sm:p-6 border border-gray-100 shadow-sm divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    {/* Item Details with Thumbnail */}
                    <div className="flex items-center gap-4">
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#f8f7f5] border border-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0b3b2c]">
                          {item.brand}
                        </span>
                        <h3 className="text-xs sm:text-sm font-semibold text-[#14211d] line-clamp-1">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-[#708077]">
                          <span className="bg-gray-100 px-2 py-0.5 rounded-md font-medium text-[11px]">
                            Size: {item.size}
                          </span>
                          <span className="bg-gray-100 px-2 py-0.5 rounded-md font-medium text-[11px]">
                            Color: {item.color}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-[#14211d] sm:hidden block pt-1">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Quantity & Pricing Controls */}
                    <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 pt-2 sm:pt-0">
                      {/* Price per item */}
                      <span className="text-sm font-bold text-[#14211d] hidden sm:block">
                        ${item.price.toFixed(2)}
                      </span>

                      {/* Quantity Controller */}
                      <div className="flex items-center rounded-xl border border-gray-200 bg-[#fbf9f5] p-1 shadow-2xs">
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                size: item.size,
                                color: item.color,
                                quantity: item.quantity - 1,
                              })
                            )
                          }
                          aria-label="Decrease quantity"
                          className="h-8 w-8 sm:h-7 sm:w-7 rounded-lg hover:bg-white text-[#14211d] font-bold flex items-center justify-center transition-colors text-sm cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-[#14211d]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                size: item.size,
                                color: item.color,
                                quantity: item.quantity + 1,
                              })
                            )
                          }
                          aria-label="Increase quantity"
                          className="h-8 w-8 sm:h-7 sm:w-7 rounded-lg hover:bg-white text-[#14211d] font-bold flex items-center justify-center transition-colors text-sm cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Total for item */}
                      <span className="text-sm font-extrabold text-[#0b3b2c]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            removeFromCart({
                              id: item.id,
                              size: item.size,
                              color: item.color,
                            })
                          )
                        }
                        aria-label="Remove item"
                        className="p-2 sm:p-1.5 text-gray-400 hover:text-rose-600 transition-colors rounded-xl hover:bg-rose-50 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Link */}
              <div className="pt-2">
                <Link
                  to="/shop"
                  className="text-xs font-semibold text-[#0b3b2c] hover:underline inline-flex items-center gap-1.5"
                >
                  &larr; Continue Shopping
                </Link>
              </div>
            </div>

            {/* Right Column: Order Summary (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-3xl bg-white p-6 sm:p-7 border border-gray-100 shadow-sm space-y-6 sticky top-28">
                <h2 className="font-serif text-xl font-bold text-[#14211d]">Order Summary</h2>

                {/* Subtotal, Shipping, Discount Calculations */}
                <div className="space-y-3 text-xs sm:text-sm text-[#596b63]">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#14211d]">${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Shipping</span>
                    <span>
                      {shippingCost === 0 ? (
                        <strong className="text-emerald-700">FREE</strong>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-rose-600">
                      <span>Discount ({discountPercent}%)</span>
                      <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[#708077] text-xs">
                    <span>Sales Tax</span>
                    <span>Calculated at checkout</span>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-base sm:text-lg font-extrabold text-[#14211d]">
                    <span>Estimated Total</span>
                    <span className="text-[#0b3b2c]">${estimatedTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="space-y-2 pt-2 border-t border-gray-100">
                  <label className="block text-xs font-bold text-[#14211d]">Promo Code</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Try GLOME20"
                        className="w-full rounded-xl border border-gray-200 bg-[#fbf9f5] py-2 pl-8 pr-3 text-xs uppercase text-[#14211d] placeholder-gray-400 focus:border-[#0b3b2c] focus:bg-white focus:outline-none"
                      />
                      <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                    </div>
                    <button
                      type="submit"
                      className="rounded-xl bg-[#0b3b2c] px-4 py-2 text-xs font-bold text-white hover:bg-[#124e3b] transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>

                  {promoSuccess && (
                    <p className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" />
                      {promoSuccess}
                    </p>
                  )}
                  {promoError && (
                    <p className="text-[11px] font-semibold text-rose-600">{promoError}</p>
                  )}
                </form>

                {/* Checkout Button */}
                <button
                  type="button"
                  onClick={() =>
                    navigate('/checkout', {
                      state: {
                        discountPercent,
                        appliedPromo: promoSuccess ? promoCode.trim().toUpperCase() : '',
                      },
                    })
                  }
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-[#0b3b2c] hover:bg-[#124e3b] py-4 text-xs sm:text-sm font-bold text-white shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                {/* Guarantees & Accepted Payment Methods */}
                <div className="space-y-3 pt-2 text-center">
                  <div className="flex items-center justify-center gap-2 text-[11px] text-[#708077]">
                    <ShieldCheck className="h-4 w-4 text-[#0b3b2c]" />
                    <span>256-Bit SSL Encrypted Checkout</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
                    <span>VISA</span> • <span>MASTERCARD</span> • <span>APPLE PAY</span> •{' '}
                    <span>PAYPAL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-white p-12 sm:p-16 text-center shadow-xs border border-gray-100 max-w-xl mx-auto my-12 space-y-5"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#0b3b2c]/10 text-[#0b3b2c]">
              <ShoppingBag className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#14211d]">
                Your Shopping Bag is Empty
              </h2>
              <p className="text-xs sm:text-sm text-[#596b63] max-w-md mx-auto">
                Explore our new season apparel, premium shoes, and handcrafted lifestyle essentials
                to find pieces tailored for you.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-[#0b3b2c] hover:bg-[#124e3b] px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:scale-103"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

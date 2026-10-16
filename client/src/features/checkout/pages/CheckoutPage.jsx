import { useState, useMemo, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  ShieldCheck,
  Lock,
  Truck,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  CreditCard,
  Wallet,
  Smartphone,
  Check,
  Copy,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  selectCartItems,
  selectCartSubtotal,
  clearCart,
} from '@/features/cart/cartSlice';
import { selectCurrentUser } from '@/features/auth/authSlice';

// Helper to detect card brand
function detectCardBrand(number) {
  const clean = number.replace(/\s+/g, '');
  if (/^4/.test(clean)) return 'visa';
  if (/^(5[1-5]|2[2-7])/.test(clean)) return 'mastercard';
  if (/^3[47]/.test(clean)) return 'amex';
  if (/^6(011|5)/.test(clean)) return 'discover';
  return 'generic';
}

// Brand SVG Badges
function BrandBadge({ brand }) {
  if (brand === 'visa') {
    return (
      <span className="font-sans font-extrabold italic tracking-wider text-white text-lg drop-shadow-sm">
        VISA
      </span>
    );
  }
  if (brand === 'mastercard') {
    return (
      <div className="flex -space-x-2">
        <span className="h-6 w-6 rounded-full bg-rose-500/90 inline-block drop-shadow-sm" />
        <span className="h-6 w-6 rounded-full bg-amber-400/90 inline-block drop-shadow-sm" />
      </div>
    );
  }
  if (brand === 'amex') {
    return (
      <span className="font-mono font-black text-white text-sm bg-blue-600/80 px-2 py-0.5 rounded tracking-widest border border-white/20">
        AMEX
      </span>
    );
  }
  if (brand === 'discover') {
    return (
      <span className="font-sans font-black text-amber-300 text-sm tracking-wider">
        DISCOVER
      </span>
    );
  }
  return (
    <span className="font-serif font-bold text-white/70 text-xs tracking-widest uppercase">
      CARD
    </span>
  );
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const cartSubtotal = useSelector(selectCartSubtotal);
  const currentUser = useSelector(selectCurrentUser);

  // Initial discounts from cart navigation if any
  const locationState = location.state || {};
  const [promoCode, setPromoCode] = useState(locationState.appliedPromo || '');
  const [discountPercent, setDiscountPercent] = useState(
    locationState.discountPercent || 0
  );
  const [promoMessage, setPromoMessage] = useState(
    locationState.discountPercent ? `Promo ${locationState.appliedPromo} applied!` : ''
  );

  // Form Fields
  const [formData, setFormData] = useState({
    email: currentUser?.email || '',
    phone: '',
    marketingConsent: true,
    firstName: currentUser?.name?.split(' ')[0] || '',
    lastName: currentUser?.name?.split(' ').slice(1).join(' ') || '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
  });

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState('standard');

  // Payment Options: 'card' | 'digital_wallet' | 'paypal' | 'cod'
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Card details
  const [cardData, setCardData] = useState({
    number: '',
    name: currentUser?.name ? currentUser.name.toUpperCase() : '',
    expiry: '',
    cvc: '',
    saveCard: true,
  });

  // UI state
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderData, setConfirmedOrderData] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [copiedOrderId, setCopiedOrderId] = useState(false);

  // Redirect if cart is empty and not confirmed
  useEffect(() => {
    if (cartItems.length === 0 && !orderConfirmed) {
      navigate('/cart');
    }
  }, [cartItems, orderConfirmed, navigate]);

  // Card number input formatting (4 blocks of 4)
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 16);
    const parts = value.match(/.{1,4}/g);
    const formatted = parts ? parts.join(' ') : value;
    setCardData((prev) => ({ ...prev, number: formatted }));
    if (formErrors.cardNumber) {
      setFormErrors((prev) => ({ ...prev, cardNumber: '' }));
    }
  };

  // Expiry input formatting (MM/YY)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setCardData((prev) => ({ ...prev, expiry: value }));
    if (formErrors.cardExpiry) {
      setFormErrors((prev) => ({ ...prev, cardExpiry: '' }));
    }
  };

  // CVC input (3-4 digits)
  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardData((prev) => ({ ...prev, cvc: value }));
    if (formErrors.cardCvc) {
      setFormErrors((prev) => ({ ...prev, cardCvc: '' }));
    }
  };

  const cardBrand = useMemo(
    () => detectCardBrand(cardData.number),
    [cardData.number]
  );

  // Calculations
  const shippingCost = useMemo(() => {
    if (shippingMethod === 'express') return 14.99;
    if (shippingMethod === 'vip') return 24.99;
    return cartSubtotal >= 50 ? 0 : 5.99;
  }, [shippingMethod, cartSubtotal]);

  const discountAmount = useMemo(() => {
    return (cartSubtotal * discountPercent) / 100;
  }, [cartSubtotal, discountPercent]);

  const taxAmount = useMemo(() => {
    return Math.max(0, cartSubtotal - discountAmount) * 0.05; // 5% est tax
  }, [cartSubtotal, discountAmount]);

  const grandTotal = useMemo(() => {
    return Math.max(0, cartSubtotal - discountAmount + shippingCost + taxAmount);
  }, [cartSubtotal, discountAmount, shippingCost, taxAmount]);

  // Promo Code handling
  const handleApplyPromo = (e) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'GLOME20' || clean === 'WELCOME20') {
      setDiscountPercent(20);
      setPromoMessage('Promo code GLOME20 applied (20% OFF)');
    } else if (clean === 'GLOME10') {
      setDiscountPercent(10);
      setPromoMessage('Promo code GLOME10 applied (10% OFF)');
    } else {
      setPromoMessage('Invalid code. Try "GLOME20"');
    }
  };

  // Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please provide a valid email address';
    }
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.address.trim()) errors.address = 'Street address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.postalCode.trim()) errors.postalCode = 'Postal code is required';

    if (paymentMethod === 'card') {
      const cleanNum = cardData.number.replace(/\s+/g, '');
      if (cleanNum.length < 15) errors.cardNumber = 'Enter a valid card number';
      if (!cardData.name.trim()) errors.cardName = 'Name on card is required';
      if (cardData.expiry.length < 5) errors.cardExpiry = 'Enter MM/YY';
      if (cardData.cvc.length < 3) errors.cardCvc = 'Enter CVC';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Payment / Order
  const handleProcessPayment = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);
    setProcessingStep('Encrypting sensitive credentials (256-bit SSL)...');

    setTimeout(() => {
      setProcessingStep('Connecting to payment gateway...');
    }, 900);

    setTimeout(() => {
      setProcessingStep('Authorizing card transaction...');
    }, 1800);

    setTimeout(() => {
      // Order created successfully
      const orderId = `GLM-${Math.floor(100000 + Math.random() * 900000)}`;
      const confirmedData = {
        orderId,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        items: [...cartItems],
        subtotal: cartSubtotal,
        discount: discountAmount,
        shipping: shippingCost,
        tax: taxAmount,
        total: grandTotal,
        shippingAddress: { ...formData },
        shippingMethod,
        paymentMethod,
        cardLast4:
          paymentMethod === 'card'
            ? cardData.number.replace(/\s+/g, '').slice(-4) || '4242'
            : null,
      };

      setConfirmedOrderData(confirmedData);
      setOrderConfirmed(true);
      setIsProcessing(false);
      dispatch(clearCart());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2800);
  };

  const copyOrderId = () => {
    if (confirmedOrderData?.orderId) {
      navigator.clipboard.writeText(confirmedOrderData.orderId);
      setCopiedOrderId(true);
      setTimeout(() => setCopiedOrderId(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#14211d]">
      {/* 1. Header Bar with Security Shield */}
      <div className="border-b border-[#e5dcce] bg-white sticky top-0 z-30 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link to="/cart" className="flex items-center gap-2 text-xs font-semibold text-[#596b63] hover:text-[#0b3b2c] transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Return to Bag</span>
          </Link>

          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0b3b2c] text-white shadow-xs">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-black tracking-tight text-[#0b3b2c] leading-none">
                GLOME
              </span>
              <span className="text-[8px] uppercase tracking-[0.24em] text-[#708077] font-bold">
                Secure Checkout
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/80 rounded-full px-3 py-1">
            <Lock className="h-3 w-3 text-emerald-700" />
            <span className="hidden md:inline font-semibold">256-Bit SSL Encrypted</span>
            <span className="md:hidden font-semibold">Secure</span>
          </div>
        </div>
      </div>

      {/* 2. Mobile Order Summary Accordion Bar */}
      <div className="lg:hidden border-b border-[#e5dcce] bg-stone-50 px-4 py-3.5">
        <button
          type="button"
          onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}
          className="w-full flex items-center justify-between text-xs font-bold text-[#14211d]"
        >
          <div className="flex items-center gap-2 text-[#0b3b2c]">
            <ShoppingBag className="h-4 w-4" />
            <span>{orderSummaryOpen ? 'Hide order summary' : 'Show order summary'}</span>
            {orderSummaryOpen ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </div>
          <span className="font-serif text-sm font-bold text-[#0b3b2c]">
            ${grandTotal.toFixed(2)}
          </span>
        </button>

        <AnimatePresence>
          {orderSummaryOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden pt-4 space-y-4"
            >
              {/* Item List */}
              <div className="divide-y divide-gray-200 max-h-60 overflow-y-auto space-y-3">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center gap-3 pt-3">
                    <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-white border border-gray-200 shrink-0">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0b3b2c] text-[10px] font-bold text-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#14211d] truncate">{item.name}</h4>
                      <p className="text-[11px] text-gray-500">{item.size} • {item.color}</p>
                    </div>
                    <span className="text-xs font-bold text-[#14211d]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total rows */}
              <div className="space-y-1.5 pt-2 border-t border-gray-200 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-rose-600 font-semibold">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Tax</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Main Checkout Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <form onSubmit={handleProcessPayment}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Form Details & Payment (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Customer Contact */}
              <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-xs border border-gray-200/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#14211d]">
                    1. Contact Information
                  </h2>
                  {!currentUser && (
                    <Link to="/login" className="text-xs font-bold text-[#0b3b2c] hover:underline">
                      Log In for 1-Click Fill
                    </Link>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-xs text-[#14211d] bg-[#fbf9f5] focus:bg-white focus:outline-none transition-colors ${
                        formErrors.email ? 'border-rose-500' : 'border-gray-200 focus:border-[#0b3b2c]'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Phone Number (for Courier SMS alerts)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs text-[#14211d] bg-[#fbf9f5] focus:border-[#0b3b2c] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={formData.marketingConsent}
                      onChange={(e) =>
                        setFormData({ ...formData, marketingConsent: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-[#0b3b2c] focus:ring-[#0b3b2c]"
                    />
                    <span className="text-[11px] text-gray-600">
                      Email me news, exclusive seasonal drops, and promotional discounts
                    </span>
                  </label>
                </div>
              </div>

              {/* Step 2: Shipping Address */}
              <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-xs border border-gray-200/80 space-y-4">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#14211d]">
                  2. Shipping Address
                </h2>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Country / Region</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-[#fbf9f5] px-3.5 py-2.5 text-xs text-[#14211d] focus:border-[#0b3b2c] focus:bg-white focus:outline-none"
                    >
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Pakistan">Pakistan</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="John"
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-xs text-[#14211d] bg-[#fbf9f5] focus:bg-white focus:outline-none ${
                          formErrors.firstName ? 'border-rose-500' : 'border-gray-200 focus:border-[#0b3b2c]'
                        }`}
                      />
                      {formErrors.firstName && (
                        <p className="mt-1 text-[11px] font-semibold text-rose-600">{formErrors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Doe"
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-xs text-[#14211d] bg-[#fbf9f5] focus:bg-white focus:outline-none ${
                          formErrors.lastName ? 'border-rose-500' : 'border-gray-200 focus:border-[#0b3b2c]'
                        }`}
                      />
                      {formErrors.lastName && (
                        <p className="mt-1 text-[11px] font-semibold text-rose-600">{formErrors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Street Address *</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="123 Luxury Avenue"
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-xs text-[#14211d] bg-[#fbf9f5] focus:bg-white focus:outline-none ${
                        formErrors.address ? 'border-rose-500' : 'border-gray-200 focus:border-[#0b3b2c]'
                      }`}
                    />
                    {formErrors.address && (
                      <p className="mt-1 text-[11px] font-semibold text-rose-600">{formErrors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Apartment, Suite, Unit (optional)</label>
                    <input
                      type="text"
                      value={formData.apartment}
                      onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                      placeholder="Suite 4B"
                      className="w-full rounded-xl border border-gray-200 bg-[#fbf9f5] px-3.5 py-2.5 text-xs text-[#14211d] focus:border-[#0b3b2c] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">City *</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="New York"
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-xs text-[#14211d] bg-[#fbf9f5] focus:bg-white focus:outline-none ${
                          formErrors.city ? 'border-rose-500' : 'border-gray-200 focus:border-[#0b3b2c]'
                        }`}
                      />
                      {formErrors.city && (
                        <p className="mt-1 text-[11px] font-semibold text-rose-600">{formErrors.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">State / Province</label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        placeholder="NY"
                        className="w-full rounded-xl border border-gray-200 bg-[#fbf9f5] px-3.5 py-2.5 text-xs text-[#14211d] focus:border-[#0b3b2c] focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Postal Code *</label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        placeholder="10001"
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-xs text-[#14211d] bg-[#fbf9f5] focus:bg-white focus:outline-none ${
                          formErrors.postalCode ? 'border-rose-500' : 'border-gray-200 focus:border-[#0b3b2c]'
                        }`}
                      />
                      {formErrors.postalCode && (
                        <p className="mt-1 text-[11px] font-semibold text-rose-600">{formErrors.postalCode}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Shipping Method */}
              <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-xs border border-gray-200/80 space-y-4">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#14211d]">
                  3. Delivery Speed
                </h2>

                <div className="space-y-3">
                  <label
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      shippingMethod === 'standard'
                        ? 'border-[#0b3b2c] bg-[#0b3b2c]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="h-4 w-4 text-[#0b3b2c] focus:ring-[#0b3b2c]"
                      />
                      <div>
                        <div className="font-bold text-xs text-[#14211d]">
                          Standard Courier (3-5 business days)
                        </div>
                        <div className="text-[11px] text-gray-500">
                          {cartSubtotal >= 50
                            ? 'Free promotion unlocked for orders over $50'
                            : 'Standard tracked shipping with SMS notifications'}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#0b3b2c]">
                      {cartSubtotal >= 50 ? 'FREE' : '$5.99'}
                    </span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      shippingMethod === 'express'
                        ? 'border-[#0b3b2c] bg-[#0b3b2c]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="h-4 w-4 text-[#0b3b2c] focus:ring-[#0b3b2c]"
                      />
                      <div>
                        <div className="font-bold text-xs text-[#14211d]">
                          Express Air Cargo (1-2 business days)
                        </div>
                        <div className="text-[11px] text-gray-500">
                          Priority dispatch and customs clearance
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#14211d]">$14.99</span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      shippingMethod === 'vip'
                        ? 'border-[#0b3b2c] bg-[#0b3b2c]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === 'vip'}
                        onChange={() => setShippingMethod('vip')}
                        className="h-4 w-4 text-[#0b3b2c] focus:ring-[#0b3b2c]"
                      />
                      <div>
                        <div className="font-bold text-xs text-[#14211d]">
                          VIP Next Morning White-Glove
                        </div>
                        <div className="text-[11px] text-gray-500">
                          Guaranteed morning arrival with signature on delivery
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#14211d]">$24.99</span>
                  </label>
                </div>
              </div>

              {/* Step 4: Card Payment & Payment Methods (The Core Feature) */}
              <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-xs border border-gray-200/80 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-lg sm:text-xl font-bold text-[#14211d]">
                      4. Payment Method
                    </h2>
                    <p className="text-xs text-gray-500">
                      All transactions are secured with military-grade SSL encryption.
                    </p>
                  </div>
                  <ShieldCheck className="h-6 w-6 text-[#0b3b2c]" />
                </div>

                {/* Payment Option Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#0b3b2c] bg-[#0b3b2c]/5 text-[#0b3b2c] font-bold shadow-2xs'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className="h-5 w-5" />
                    <span className="text-xs">Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('digital_wallet')}
                    className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'digital_wallet'
                        ? 'border-[#0b3b2c] bg-[#0b3b2c]/5 text-[#0b3b2c] font-bold shadow-2xs'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <Smartphone className="h-5 w-5" />
                    <span className="text-xs">Apple / G Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'paypal'
                        ? 'border-[#0b3b2c] bg-[#0b3b2c]/5 text-[#0b3b2c] font-bold shadow-2xs'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <Wallet className="h-5 w-5" />
                    <span className="text-xs">PayPal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#0b3b2c] bg-[#0b3b2c]/5 text-[#0b3b2c] font-bold shadow-2xs'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <Truck className="h-5 w-5" />
                    <span className="text-xs">Cash on Delivery</span>
                  </button>
                </div>

                {/* Method 1: Credit / Debit Card Interactive Visualizer & Inputs */}
                {paymentMethod === 'card' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 pt-2"
                  >
                    {/* Interactive Luxury Holographic Card Visualizer */}
                    <div className="relative mx-auto w-full max-w-sm aspect-[1.586/1] rounded-2xl p-5 sm:p-6 text-white shadow-xl bg-gradient-to-tr from-[#0b3b2c] via-[#124e3b] to-[#082b20] border border-white/20 overflow-hidden flex flex-col justify-between">
                      {/* Ambient card sheen */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_60%)] pointer-events-none" />
                      <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />

                      {/* Card Top: Chip & Brand Logo */}
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Gold Metallic EMV Chip */}
                          <div className="h-8 w-11 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-0.5 shadow-xs border border-amber-300/60">
                            <div className="h-full w-full border border-black/20 rounded-[4px] grid grid-cols-3 grid-rows-2 opacity-80" />
                          </div>
                          {/* Contactless Wave */}
                          <svg className="h-5 w-5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M8.5 16.5a5 5 0 0 1 0-7" />
                            <path d="M12 19a8.5 8.5 0 0 0 0-12" />
                            <path d="M15.5 21.5a12 12 0 0 0 0-17" />
                          </svg>
                        </div>

                        {/* Card Brand Badge */}
                        <div className="flex items-center">
                          <BrandBadge brand={cardBrand} />
                        </div>
                      </div>

                      {/* Card Middle: 16-Digit Number */}
                      <div className="relative z-10 space-y-1">
                        <span className="text-[9px] uppercase tracking-widest text-emerald-200/80 font-bold">
                          Card Number
                        </span>
                        <div className="font-mono text-base sm:text-lg font-bold tracking-[0.18em] text-white drop-shadow-sm truncate">
                          {cardData.number || '•••• •••• •••• ••••'}
                        </div>
                      </div>

                      {/* Card Bottom: Holder Name & Expiry */}
                      <div className="relative z-10 flex items-end justify-between">
                        <div className="space-y-0.5 max-w-[65%]">
                          <span className="text-[8px] uppercase tracking-widest text-emerald-200/80 font-bold block">
                            Card Holder
                          </span>
                          <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase truncate block">
                            {cardData.name || 'YOUR NAME'}
                          </span>
                        </div>

                        <div className="space-y-0.5 text-right">
                          <span className="text-[8px] uppercase tracking-widest text-emerald-200/80 font-bold block">
                            Expires
                          </span>
                          <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider block">
                            {cardData.expiry || 'MM/YY'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Input Fields */}
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Card Number *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={cardData.number}
                            onChange={handleCardNumberChange}
                            placeholder="4532 0000 0000 0000"
                            maxLength={19}
                            className={`w-full rounded-xl border pl-10 pr-12 py-2.5 text-xs font-mono text-[#14211d] bg-[#fbf9f5] focus:bg-white focus:outline-none ${
                              formErrors.cardNumber ? 'border-rose-500' : 'border-gray-200 focus:border-[#0b3b2c]'
                            }`}
                          />
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <BrandBadge brand={cardBrand} />
                          </div>
                        </div>
                        {formErrors.cardNumber && (
                          <p className="mt-1 text-[11px] font-semibold text-rose-600">
                            {formErrors.cardNumber}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          value={cardData.name}
                          onChange={(e) => {
                            setCardData({ ...cardData, name: e.target.value.toUpperCase() });
                            if (formErrors.cardName) setFormErrors({ ...formErrors, cardName: '' });
                          }}
                          placeholder="JANE DOE"
                          className={`w-full rounded-xl border px-3.5 py-2.5 text-xs text-[#14211d] bg-[#fbf9f5] focus:bg-white focus:outline-none ${
                            formErrors.cardName ? 'border-rose-500' : 'border-gray-200 focus:border-[#0b3b2c]'
                          }`}
                        />
                        {formErrors.cardName && (
                          <p className="mt-1 text-[11px] font-semibold text-rose-600">
                            {formErrors.cardName}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Expiration Date (MM/YY) *
                          </label>
                          <input
                            type="text"
                            value={cardData.expiry}
                            onChange={handleExpiryChange}
                            placeholder="12/28"
                            maxLength={5}
                            className={`w-full rounded-xl border px-3.5 py-2.5 text-xs font-mono text-[#14211d] bg-[#fbf9f5] focus:bg-white focus:outline-none ${
                              formErrors.cardExpiry ? 'border-rose-500' : 'border-gray-200 focus:border-[#0b3b2c]'
                            }`}
                          />
                          {formErrors.cardExpiry && (
                            <p className="mt-1 text-[11px] font-semibold text-rose-600">
                              {formErrors.cardExpiry}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Security Code (CVC) *
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              value={cardData.cvc}
                              onChange={handleCvcChange}
                              placeholder="123"
                              maxLength={4}
                              className={`w-full rounded-xl border px-3.5 py-2.5 text-xs font-mono text-[#14211d] bg-[#fbf9f5] focus:bg-white focus:outline-none ${
                                formErrors.cardCvc ? 'border-rose-500' : 'border-gray-200 focus:border-[#0b3b2c]'
                              }`}
                            />
                            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                          </div>
                          {formErrors.cardCvc && (
                            <p className="mt-1 text-[11px] font-semibold text-rose-600">
                              {formErrors.cardCvc}
                            </p>
                          )}
                        </div>
                      </div>

                      <label className="flex items-center gap-2 cursor-pointer pt-2">
                        <input
                          type="checkbox"
                          checked={cardData.saveCard}
                          onChange={(e) =>
                            setCardData({ ...cardData, saveCard: e.target.checked })
                          }
                          className="h-4 w-4 rounded border-gray-300 text-[#0b3b2c] focus:ring-[#0b3b2c]"
                        />
                        <span className="text-[11px] text-gray-600 flex items-center gap-1">
                          <Lock className="h-3 w-3 text-emerald-700" />
                          Save card securely for seamless 1-click checkout next time
                        </span>
                      </label>
                    </div>
                  </motion.div>
                )}

                {/* Method 2: Digital Wallets */}
                {paymentMethod === 'digital_wallet' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-2xl bg-stone-50 border border-gray-200 text-center space-y-4"
                  >
                    <Smartphone className="h-10 w-10 text-[#0b3b2c] mx-auto" />
                    <div>
                      <h4 className="font-bold text-sm text-[#14211d]">
                        Instant 1-Tap Biometric Payment
                      </h4>
                      <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">
                        Authorizing will open Apple Pay or Google Pay on your device using Face ID,
                        Touch ID, or stored passkeys.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-3 rounded-full bg-black text-white text-xs font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Pay with</span>
                        <span className="font-serif italic font-bold">Pay</span>
                      </button>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-3 rounded-full border border-gray-300 bg-white text-gray-800 text-xs font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Pay with</span>
                        <span className="font-bold text-[#4285F4]">G</span>
                        <span className="font-bold">Pay</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Method 3: PayPal */}
                {paymentMethod === 'paypal' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-2xl bg-blue-50/50 border border-blue-200 text-center space-y-3"
                  >
                    <Wallet className="h-10 w-10 text-blue-700 mx-auto" />
                    <h4 className="font-bold text-sm text-[#14211d]">
                      PayPal Express Checkout
                    </h4>
                    <p className="text-xs text-gray-600 max-w-sm mx-auto">
                      You will be securely redirected to PayPal to complete your authorization
                      before returning to GLOME for final confirmation.
                    </p>
                  </motion.div>
                )}

                {/* Method 4: Cash on Delivery */}
                {paymentMethod === 'cod' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200 text-left space-y-2 text-xs"
                  >
                    <div className="font-bold text-amber-900 flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      Pay with Cash Upon Delivery
                    </div>
                    <p className="text-amber-800 leading-relaxed">
                      Please have the exact cash amount (${grandTotal.toFixed(2)}) ready for the
                      courier when your package arrives. Our courier accepts local currency.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right Column: Order Summary & Pay Button (5 cols sticky) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-xs border border-gray-200/80 space-y-6">
                <h3 className="font-serif text-lg font-bold text-[#14211d] flex items-center justify-between">
                  <span>Order Summary</span>
                  <span className="text-xs font-sans font-normal text-gray-500">
                    {cartItems.reduce((acc, i) => acc + i.quantity, 0)} item(s)
                  </span>
                </h3>

                {/* Desktop Item Thumbnails List */}
                <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto space-y-3 pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.size}-${item.color}`}
                      className="flex items-center gap-3.5 pt-3 first:pt-0"
                    >
                      <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-stone-100 border border-gray-200 shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0b3b2c] text-[10px] font-bold text-white shadow-2xs">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#14211d] truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-gray-500">
                          Size: {item.size} • Color: {item.color}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[#14211d]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo Code (GLOME20)"
                      className="flex-1 rounded-xl border border-gray-200 bg-[#fbf9f5] px-3.5 py-2 text-xs uppercase text-[#14211d] focus:border-[#0b3b2c] focus:bg-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="rounded-xl bg-[#0b3b2c] px-4 py-2 text-xs font-bold text-white hover:bg-[#124e3b] transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <p
                      className={`text-[11px] font-semibold flex items-center gap-1 ${
                        discountPercent > 0 ? 'text-emerald-700' : 'text-rose-600'
                      }`}
                    >
                      {discountPercent > 0 && <Check className="h-3 w-3" />}
                      {promoMessage}
                    </p>
                  )}
                </div>

                {/* Financial Breakdown */}
                <div className="space-y-2 pt-2 border-t border-gray-100 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">${cartSubtotal.toFixed(2)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-rose-600 font-semibold">
                      <span>Discount ({discountPercent}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-gray-900">
                      {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Estimated Tax (5%)</span>
                    <span className="font-semibold text-gray-900">${taxAmount.toFixed(2)}</span>
                  </div>

                  <div className="pt-3 border-t border-gray-200 flex items-center justify-between text-base font-extrabold text-[#14211d]">
                    <span>Total Due</span>
                    <span className="text-[#0b3b2c] font-serif text-xl sm:text-2xl">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Submit Payment Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-[#0b3b2c] hover:bg-[#124e3b] disabled:bg-gray-400 py-4 px-6 text-sm font-bold text-white shadow-lg shadow-[#0b3b2c]/20 transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>{processingStep}</span>
                    </div>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      <span>Pay ${grandTotal.toFixed(2)}</span>
                    </>
                  )}
                </button>

                {/* Trust and Guarantee Seals */}
                <div className="space-y-2.5 pt-2 text-center text-[11px] text-gray-500">
                  <div className="flex items-center justify-center gap-2 font-medium">
                    <ShieldCheck className="h-4 w-4 text-[#0b3b2c]" />
                    <span>30-Day Hassle-Free Returns Guaranteed</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
                    <span>VISA</span> • <span>MASTERCARD</span> • <span>APPLE PAY</span> •{' '}
                    <span>PAYPAL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* 4. Order Confirmation Modal / Success Screen */}
      <AnimatePresence>
        {orderConfirmed && confirmedOrderData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-xl rounded-3xl bg-white p-6 sm:p-10 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto space-y-6"
            >
              {/* Success Icon */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700 shadow-xs">
                <CheckCircle2 className="h-9 w-9" />
              </div>

              {/* Title & Order ID */}
              <div className="text-center space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0b3b2c]">
                  Order Placed Successfully
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#14211d]">
                  Thank You for Your Order!
                </h2>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  We have sent a full confirmation receipt and tracking link to{' '}
                  <span className="font-bold text-[#14211d]">
                    {confirmedOrderData.shippingAddress.email}
                  </span>
                  .
                </p>

                <div className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-4 py-1.5 mt-2 border border-gray-200">
                  <span className="text-xs font-mono font-bold text-[#0b3b2c]">
                    Order {confirmedOrderData.orderId}
                  </span>
                  <button
                    type="button"
                    onClick={copyOrderId}
                    className="p-1 text-gray-500 hover:text-[#0b3b2c] transition-colors"
                    title="Copy Order ID"
                  >
                    {copiedOrderId ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Summary of Purchase */}
              <div className="rounded-2xl bg-stone-50 p-4 border border-gray-200/80 space-y-3 text-xs">
                <div className="flex justify-between items-center font-bold text-[#14211d] border-b border-gray-200 pb-2">
                  <span>Purchased Items ({confirmedOrderData.items.length})</span>
                  <span>Total Paid: ${confirmedOrderData.total.toFixed(2)}</span>
                </div>

                <div className="divide-y divide-gray-100 max-h-48 overflow-y-auto space-y-2 pr-1">
                  {confirmedOrderData.items.map((item) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center gap-3 pt-2">
                      <img src={item.image} alt={item.name} className="h-10 w-10 rounded-lg object-cover" />
                      <div className="flex-1 truncate">
                        <p className="font-bold text-gray-900 truncate">{item.name}</p>
                        <p className="text-[11px] text-gray-500">
                          Qty: {item.quantity} • {item.size} • {item.color}
                        </p>
                      </div>
                      <span className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-gray-200 space-y-1 text-gray-600 text-[11px]">
                  <p>
                    <span className="font-semibold text-gray-800">Delivering to: </span>
                    {confirmedOrderData.shippingAddress.address},{' '}
                    {confirmedOrderData.shippingAddress.city},{' '}
                    {confirmedOrderData.shippingAddress.postalCode}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">Payment: </span>
                    {confirmedOrderData.paymentMethod === 'card'
                      ? `Credit Card ending in •••• ${confirmedOrderData.cardLast4}`
                      : confirmedOrderData.paymentMethod.toUpperCase()}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">Estimated Delivery: </span>
                    3-5 business days via Tracked Courier
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 rounded-full border border-gray-300 bg-white py-3 px-4 text-xs font-bold text-[#14211d] hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Print Receipt
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/shop')}
                  className="flex-1 rounded-full bg-[#0b3b2c] py-3 px-4 text-xs font-bold text-white hover:bg-[#124e3b] transition-colors cursor-pointer shadow-sm"
                >
                  Continue Shopping
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

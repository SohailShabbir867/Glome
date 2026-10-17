import { useState } from 'react';
import {
  Plus,
  Search,
  Tag,
  CheckCircle2,
  X,
  Trash2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_COUPONS = [
  {
    id: 1,
    code: 'GLOME20',
    type: 'Percentage',
    value: 20,
    minSpend: 50.00,
    uses: 245,
    maxUses: 1000,
    status: 'Active',
    expiry: 'Dec 31, 2026',
    description: '20% off storewide on orders over $50',
  },
  {
    id: 2,
    code: 'FREESHIP',
    type: 'Free Shipping',
    value: 15,
    minSpend: 75.00,
    uses: 412,
    maxUses: 2000,
    status: 'Active',
    expiry: 'Nov 30, 2026',
    description: 'Free expedited nationwide shipping on orders over $75',
  },
  {
    id: 3,
    code: 'SPRING10',
    type: 'Percentage',
    value: 10,
    minSpend: 30.00,
    uses: 118,
    maxUses: 500,
    status: 'Active',
    expiry: 'Nov 15, 2026',
    description: '10% off fashion apparel and accessories',
  },
  {
    id: 4,
    code: 'VIP50',
    type: 'Fixed Amount',
    value: 50,
    minSpend: 250.00,
    uses: 42,
    maxUses: 100,
    status: 'Active',
    expiry: 'Dec 15, 2026',
    description: 'Flat $50 off on luxury Italian leather and wool collections',
  },
  {
    id: 5,
    code: 'SUMMER25',
    type: 'Percentage',
    value: 25,
    minSpend: 60.00,
    uses: 500,
    maxUses: 500,
    status: 'Expired',
    expiry: 'Aug 31, 2026',
    description: 'End of summer clearance discount',
  },
];

export default function AdminDiscountsTab() {
  const [coupons, setCoupons] = useState(INITIAL_COUPONS);
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  // New coupon form state
  const [code, setCode] = useState('');
  const [type, setType] = useState('Percentage');
  const [value, setValue] = useState('');
  const [minSpend, setMinSpend] = useState('50');
  const [maxUses, setMaxUses] = useState('500');
  const [expiry, setExpiry] = useState('Dec 31, 2026');
  const [description, setDescription] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!code || !value) return;

    const newCoupon = {
      id: Date.now(),
      code: code.toUpperCase().trim(),
      type,
      value: parseFloat(value),
      minSpend: parseFloat(minSpend) || 0,
      uses: 0,
      maxUses: parseInt(maxUses) || 500,
      status: 'Active',
      expiry,
      description: description || `${value}${type === 'Percentage' ? '%' : '$'} discount code`,
    };

    setCoupons([newCoupon, ...coupons]);
    setShowCreateModal(false);
    setCode('');
    setValue('');
    setDescription('');
    showToast(`Coupon "${newCoupon.code}" created successfully!`);
  };

  const handleToggleStatus = (id) => {
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'Active' ? 'Expired' : 'Active' } : c
      )
    );
  };

  const handleDelete = (id, couponCode) => {
    setCoupons(coupons.filter((c) => c.id !== id));
    showToast(`Deleted coupon "${couponCode}".`);
  };

  const filteredCoupons = coupons.filter(
    (c) =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 rounded-2xl bg-[#012D1D] text-white px-5 py-3 shadow-xl text-xs font-bold flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-300" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header and Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#14211d]">
            Discounts & Promotional Campaigns
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Configure promotional promo codes, flash sale coupons, free shipping rules, and seasonal discounts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#012D1D] text-white px-5 py-2.5 min-h-[44px] text-xs font-bold shadow-md hover:bg-[#124e3b] transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Create Coupon</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div className="relative max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search promo code or campaign..."
            className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] py-2.5 pl-10 pr-4 min-h-[44px] text-xs text-[#14211d] placeholder-gray-400 focus:border-[#012D1D] focus:outline-none"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Coupons Table */}
      <div className="rounded-3xl bg-white border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-[#f9fafb] text-gray-500 uppercase tracking-wider font-bold">
                <th className="py-3.5 px-5">Promo Code</th>
                <th className="py-3.5 px-5">Discount Type & Value</th>
                <th className="py-3.5 px-5">Minimum Spend</th>
                <th className="py-3.5 px-5">Redemptions</th>
                <th className="py-3.5 px-5">Expiry Date</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCoupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-[#012D1D]" />
                      <span className="font-mono font-bold text-sm text-[#012D1D] bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                        {coupon.code}
                      </span>
                    </div>
                    <div className="text-gray-500 text-xs mt-1">{coupon.description}</div>
                  </td>
                  <td className="py-4 px-5 font-bold text-[#14211d]">
                    {coupon.type === 'Percentage' && `${coupon.value}% Off`}
                    {coupon.type === 'Fixed Amount' && `$${coupon.value} Flat Off`}
                    {coupon.type === 'Free Shipping' && 'Free Delivery'}
                  </td>
                  <td className="py-4 px-5 text-gray-700">
                    {coupon.minSpend > 0 ? `$${coupon.minSpend.toFixed(2)}` : 'No minimum'}
                  </td>
                  <td className="py-4 px-5">
                    <span className="font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded-lg">
                      {coupon.uses} / {coupon.maxUses} used
                    </span>
                  </td>
                  <td className="py-4 px-5 text-gray-500">{coupon.expiry}</td>
                  <td className="py-4 px-5">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(coupon.id)}
                      className={`px-3 py-1 min-h-[44px] rounded-full border text-xs font-bold transition-all cursor-pointer ${
                        coupon.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-gray-100 text-gray-500 border-gray-200'
                      }`}
                    >
                      {coupon.status}
                    </button>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(coupon.id, coupon.code)}
                      aria-label={`Delete ${coupon.code}`}
                      className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Coupon Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreateModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-emerald-50 text-[#012D1D] flex items-center justify-center">
                    <Tag className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#14211d]">
                      Create Promotional Coupon
                    </h3>
                    <p className="text-xs text-gray-500">Configure new discount rules</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreateCoupon} className="space-y-4 my-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Promo Code (Uppercase)</label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="e.g. FLASH25"
                    className="w-full rounded-xl border border-gray-200 py-2.5 px-3 min-h-[44px] font-mono font-bold focus:border-[#012D1D] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Discount Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 py-2.5 px-3 min-h-[44px] bg-white focus:border-[#012D1D] focus:outline-none"
                    >
                      <option value="Percentage">Percentage (%)</option>
                      <option value="Fixed Amount">Fixed Amount ($)</option>
                      <option value="Free Shipping">Free Shipping</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Value ({type === 'Percentage' ? '%' : '$'})
                    </label>
                    <input
                      type="number"
                      required
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder={type === 'Percentage' ? '20' : '15'}
                      className="w-full rounded-xl border border-gray-200 py-2.5 px-3 min-h-[44px] focus:border-[#012D1D] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Min Spend ($)</label>
                    <input
                      type="number"
                      value={minSpend}
                      onChange={(e) => setMinSpend(e.target.value)}
                      placeholder="50"
                      className="w-full rounded-xl border border-gray-200 py-2.5 px-3 min-h-[44px] focus:border-[#012D1D] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Max Uses</label>
                    <input
                      type="number"
                      value={maxUses}
                      onChange={(e) => setMaxUses(e.target.value)}
                      placeholder="500"
                      className="w-full rounded-xl border border-gray-200 py-2.5 px-3 min-h-[44px] focus:border-[#012D1D] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="Dec 31, 2026"
                      className="w-full rounded-xl border border-gray-200 py-2.5 px-3 min-h-[44px] focus:border-[#012D1D] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Campaign Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. 25% off flash sale on footwear"
                    className="w-full rounded-xl border border-gray-200 py-2.5 px-3 min-h-[44px] focus:border-[#012D1D] focus:outline-none"
                  />
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2.5 min-h-[44px] rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 min-h-[44px] rounded-xl bg-[#012D1D] text-white font-bold hover:bg-[#124e3b] shadow-md"
                  >
                    Save Coupon
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

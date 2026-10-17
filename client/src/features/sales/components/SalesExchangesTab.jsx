import { useState } from 'react';
import {
  CheckCircle2,
  Search,
  Check,
  Phone,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_EXCHANGE_REQUESTS = [
  {
    id: '#EXC-2042',
    orderId: '#ORD-1042',
    type: 'Size Exchange',
    product: 'Classic Leather Loafers',
    fromVariant: 'Size 41 • Espresso Brown',
    toVariant: 'Size 42 • Espresso Brown',
    customer: 'Ayesha Khan',
    phone: '+92 300 1234567',
    reason: 'Shoe is slightly snug around the heel. Need size 42 for comfortable fit.',
    status: 'Pending Review',
    availableStockInSize: 14,
    replacementSku: 'SH-LOA-001-42',
    date: 'Oct 31, 2026',
    image: '/images/hero-fashion-rack.jpg',
  },
  {
    id: '#EXC-2041',
    orderId: '#ORD-1040',
    type: 'Color Replacement',
    product: 'Italian Leather Handbag',
    fromVariant: 'Caramel Brown • One Size',
    toVariant: 'Onyx Black • One Size',
    customer: 'Sara Malik',
    phone: '+92 302 4567890',
    reason: 'Client requested Onyx Black color after seeing the item in person.',
    status: 'Pending Review',
    availableStockInSize: 6,
    replacementSku: 'AC-BAG-003-BLK',
    date: 'Oct 30, 2026',
    image: '/images/promo-banner-items.jpg',
  },
  {
    id: '#EXC-2040',
    orderId: '#ORD-1039',
    type: 'Size Exchange',
    product: 'Heritage Running Sneakers',
    fromVariant: 'Size 43 • Slate Grey',
    toVariant: 'Size 44 • Slate Grey',
    customer: 'Ali Raza',
    phone: '+92 303 1122334',
    reason: 'Prefers slightly wider toe box for sports activities.',
    status: 'Approved & Dispatched',
    availableStockInSize: 8,
    replacementSku: 'SH-RUN-009-44',
    date: 'Oct 29, 2026',
    image: '/images/lookbook-1.jpg',
  },
  {
    id: '#EXC-2039',
    orderId: '#ORD-1037',
    type: 'Size Exchange',
    product: 'Monogram Wool Blazer',
    fromVariant: 'Size 40R • Navy',
    toVariant: 'Size 38R • Navy',
    customer: 'Bilal Ahmed',
    phone: '+92 305 6677889',
    reason: 'Sleeves are 1 inch too long. Needs slim fitted 38R.',
    status: 'Approved & Dispatched',
    availableStockInSize: 4,
    replacementSku: 'MN-BLZ-005-38R',
    date: 'Oct 28, 2026',
    image: '/images/lookbook-3.jpg',
  },
];

export default function SalesExchangesTab() {
  const [exchanges, setExchanges] = useState(INITIAL_EXCHANGE_REQUESTS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleApprove = (id, prodName, toSize) => {
    setExchanges((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'Approved & Dispatched' } : item
      )
    );
    showToast(`Approved exchange ${id}! Replacement ${prodName} (${toSize}) scheduled for dispatch.`);
  };

  const handleDecline = (id) => {
    setExchanges((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Declined' } : item))
    );
    showToast(`Exchange request ${id} declined.`);
  };

  const filteredExchanges = exchanges.filter((ex) => {
    const matchesSearch =
      ex.id.toLowerCase().includes(search.toLowerCase()) ||
      ex.customer.toLowerCase().includes(search.toLowerCase()) ||
      ex.product.toLowerCase().includes(search.toLowerCase()) ||
      ex.orderId.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === 'All' || ex.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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

      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#14211d]">
          Reported Issues & Product Exchanges
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Review customer size and color replacement requests, inspect warehouse replacement stock availability, and approve dispatches.
        </p>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-1.5">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Pending Exchanges
          </span>
          <div className="font-serif text-2xl font-extrabold text-amber-600">
            {exchanges.filter((e) => e.status === 'Pending Review').length} Requests
          </div>
          <p className="text-xs text-gray-400">Needs salesman phone review</p>
        </div>

        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-1.5">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Approved & Dispatched
          </span>
          <div className="font-serif text-2xl font-extrabold text-[#012D1D]">
            {exchanges.filter((e) => e.status === 'Approved & Dispatched').length} Exchanges
          </div>
          <p className="text-xs text-emerald-600 font-semibold">Replacements sent with courier</p>
        </div>

        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-1.5">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Stock Verification Policy
          </span>
          <div className="font-serif text-lg font-bold text-emerald-800 flex items-center gap-1.5 mt-1">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <span>Live Stock Check Active</span>
          </div>
          <p className="text-xs text-gray-400">Real-time warehouse verification</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ticket #, order ID, customer, or product..."
            className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] py-2.5 pl-10 pr-4 min-h-[44px] text-xs text-[#14211d] placeholder-gray-400 focus:border-[#012D1D] focus:outline-none"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Pending Review', 'Approved & Dispatched', 'Declined'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-2 min-h-[44px] rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterStatus === st
                  ? 'bg-[#012D1D] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Exchange Cards List */}
      <div className="space-y-4">
        {filteredExchanges.map((ex) => (
          <div
            key={ex.id}
            className="rounded-3xl bg-white border border-gray-200/80 p-5 sm:p-6 shadow-2xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-xs text-[#012D1D] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                  {ex.id}
                </span>
                <span className="text-xs text-gray-400 font-mono">Order {ex.orderId}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full border text-xs font-bold ${
                    ex.status === 'Approved & Dispatched'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : ex.status === 'Declined'
                      ? 'bg-gray-100 text-gray-500 border-gray-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  {ex.status}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${ex.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] rounded-xl bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-[#012D1D] text-xs font-bold transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Call {ex.customer}</span>
                </a>
              </div>
            </div>

            {/* Exchange Item Comparison Box */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Product Thumbnail */}
              <div className="md:col-span-3 flex items-center gap-3">
                <img
                  src={ex.image}
                  alt={ex.product}
                  className="h-14 w-14 rounded-xl object-cover bg-stone-100 shrink-0 border border-gray-100"
                />
                <div>
                  <h4 className="font-bold text-xs text-[#14211d]">{ex.product}</h4>
                  <p className="text-xs text-gray-400">{ex.type}</p>
                </div>
              </div>

              {/* From Variant -> To Variant */}
              <div className="md:col-span-5 flex items-center gap-2.5 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <div className="flex-1">
                  <span className="text-xs text-gray-400 block font-semibold">Delivered Item:</span>
                  <span className="text-xs font-bold text-gray-800 line-through">
                    {ex.fromVariant}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-[#012D1D] shrink-0" />
                <div className="flex-1">
                  <span className="text-xs text-emerald-700 block font-semibold">
                    Requested Replacement:
                  </span>
                  <span className="text-xs font-bold text-[#012D1D]">{ex.toVariant}</span>
                </div>
              </div>

              {/* Live Warehouse Stock Check */}
              <div className="md:col-span-4 p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 block font-semibold">
                    Live Stock Check
                  </span>
                  <span className="text-xs font-bold text-[#012D1D]">
                    {ex.availableStockInSize} units in stock
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-xs font-bold">
                  Available
                </span>
              </div>
            </div>

            {/* Reason Statement */}
            <div className="p-3 rounded-xl bg-[#fafafa] border border-gray-100 text-xs text-gray-600">
              <span className="font-bold text-gray-700">Customer Reason:</span> &ldquo;{ex.reason}&rdquo;
            </div>

            {/* Salesman Action Buttons */}
            {ex.status === 'Pending Review' && (
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleDecline(ex.id)}
                  className="px-4 py-2 min-h-[44px] rounded-xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 cursor-pointer"
                >
                  Decline Request
                </button>
                <button
                  type="button"
                  onClick={() => handleApprove(ex.id, ex.product, ex.toVariant)}
                  className="inline-flex items-center gap-2 px-5 py-2 min-h-[44px] rounded-xl bg-[#012D1D] text-white font-bold text-xs hover:bg-[#124e3b] shadow-md cursor-pointer"
                >
                  <Check className="h-4 w-4" />
                  <span>Approve & Dispatch Replacement</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

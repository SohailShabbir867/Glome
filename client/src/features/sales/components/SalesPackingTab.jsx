import { useState } from 'react';
import {
  CheckCircle2,
  Printer,
  Search,
  PackageCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PACKING_QUEUE = [
  {
    id: '#ORD-1041',
    customer: 'Usman Ali',
    product: 'Minimalist White Sneakers',
    variant: 'Size 42 • Chalk White',
    packageType: 'Double-Boxed Luxury Shoe Box',
    notes: 'Customer requested extra cushioning on heels.',
    status: 'In Packing Queue',
    date: 'Oct 31, 2026',
    image: '/images/category-womens-dress.jpg',
  },
  {
    id: '#ORD-1040',
    customer: 'Sara Malik',
    product: 'Italian Leather Handbag',
    variant: 'Caramel Brown • One Size',
    packageType: 'Glome Ribbon Gift Packaging',
    notes: 'Include handwritten anniversary message card.',
    status: 'In Packing Queue',
    date: 'Oct 30, 2026',
    image: '/images/promo-banner-items.jpg',
  },
  {
    id: '#ORD-1042',
    customer: 'Ayesha Khan',
    product: 'Classic Leather Loafers',
    variant: 'Size 41 • Espresso Brown',
    packageType: 'Standard Glome Velvet Dust Bag',
    notes: 'Verified size label before sealing.',
    status: 'Packed & Ready',
    date: 'Oct 31, 2026',
    image: '/images/hero-fashion-rack.jpg',
  },
];

export default function SalesPackingTab() {
  const [queue, setQueue] = useState(PACKING_QUEUE);
  const [search, setSearch] = useState('');
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleMarkPacked = (id) => {
    setQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Packed & Ready' } : item))
    );
    showToast(`Order ${id} sealed in packaging and transferred to courier dispatch dock!`);
  };

  const filteredQueue = queue.filter(
    (item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.customer.toLowerCase().includes(search.toLowerCase()) ||
      item.product.toLowerCase().includes(search.toLowerCase())
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

      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#14211d]">
          Warehouse Packing Requests
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Prepare verified client orders into signature GLOME luxury boxes, attach RFID barcode tags, and print shipping labels.
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div className="relative max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order ID or customer..."
            className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] py-2.5 pl-10 pr-4 min-h-[44px] text-xs text-[#14211d] placeholder-gray-400 focus:border-[#012D1D] focus:outline-none"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Packing Cards */}
      <div className="space-y-4">
        {filteredQueue.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-white border border-gray-200/80 p-5 sm:p-6 shadow-2xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-xs text-[#012D1D] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                  {item.id}
                </span>
                <span className="font-bold text-xs text-[#14211d]">{item.customer}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full border text-xs font-bold ${
                    item.status === 'Packed & Ready'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <button
                type="button"
                onClick={() => showToast(`Printing packing slip for ${item.id}...`)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Printer className="h-3.5 w-3.5 text-[#012D1D]" />
                <span>Print Slip & Barcode</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-4 flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.product}
                  className="h-14 w-14 rounded-xl object-cover bg-stone-100 shrink-0 border border-gray-100"
                />
                <div>
                  <h4 className="font-bold text-xs text-[#14211d]">{item.product}</h4>
                  <p className="text-xs text-gray-500">{item.variant}</p>
                </div>
              </div>

              <div className="md:col-span-5 space-y-1">
                <span className="text-xs text-gray-400 font-semibold block">Packaging Standard:</span>
                <span className="text-xs font-bold text-gray-800">{item.packageType}</span>
                <p className="text-xs text-gray-500">{item.notes}</p>
              </div>

              <div className="md:col-span-3 flex justify-end">
                {item.status === 'In Packing Queue' ? (
                  <button
                    type="button"
                    onClick={() => handleMarkPacked(item.id)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-md cursor-pointer"
                  >
                    <PackageCheck className="h-4 w-4" />
                    <span>Confirm Packed</span>
                  </button>
                ) : (
                  <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Ready for Courier</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

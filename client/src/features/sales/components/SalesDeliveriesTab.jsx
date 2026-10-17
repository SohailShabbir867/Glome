import { useState } from 'react';
import {
  CheckCircle2,
  Search,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DELIVERIES_LIST = [
  {
    id: '#ORD-1039',
    customer: 'Ali Raza',
    phone: '+92 303 1122334',
    address: 'Sector C, Bahria Town, Rawalpindi',
    courier: 'TCS Express',
    trackingNumber: 'TCS-7718294',
    eta: 'Today, 04:00 PM',
    status: 'Out for Delivery',
    itemsCount: 1,
    amount: 76.00,
  },
  {
    id: '#ORD-1040',
    customer: 'Sara Malik',
    phone: '+92 302 4567890',
    address: 'House 12, DHA Phase 5, Karachi',
    courier: 'Leopards Courier',
    trackingNumber: 'LEO-9918231',
    eta: 'Tomorrow Morning',
    status: 'In Transit',
    itemsCount: 1,
    amount: 129.99,
  },
  {
    id: '#ORD-1038',
    customer: 'Fatima Noor',
    phone: '+92 304 9988776',
    address: 'Cantt Avenue, Peshawar, KPK',
    courier: 'Glome Direct Fleet',
    trackingNumber: 'GLM-44102',
    eta: 'Oct 30, 02:30 PM',
    status: 'Delivered',
    itemsCount: 1,
    amount: 45.99,
  },
];

export default function SalesDeliveriesTab() {
  const [deliveries, setDeliveries] = useState(DELIVERIES_LIST);
  const [search, setSearch] = useState('');
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleMarkDelivered = (id) => {
    setDeliveries((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'Delivered' } : d))
    );
    showToast(`Order ${id} confirmed delivered to client!`);
  };

  const filteredDeliveries = deliveries.filter(
    (d) =>
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.customer.toLowerCase().includes(search.toLowerCase()) ||
      d.trackingNumber.toLowerCase().includes(search.toLowerCase())
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
            className="fixed top-6 right-6 z-50 rounded-2xl bg-[#0b3b2c] text-white px-5 py-3 shadow-xl text-xs font-bold flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-300" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#14211d]">
          Out for Delivery & Courier Tracking
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Monitor active courier consignments, live tracking codes, and customer delivery receipts.
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div className="relative max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order #, tracking ID, or recipient..."
            className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] py-2.5 pl-10 pr-4 min-h-[44px] text-xs text-[#14211d] placeholder-gray-400 focus:border-[#0b3b2c] focus:outline-none"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Deliveries Table */}
      <div className="rounded-3xl bg-white border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-[#f9fafb] text-gray-500 uppercase tracking-wider font-bold">
                <th className="py-3.5 px-5">Order ID</th>
                <th className="py-3.5 px-5">Customer & Phone</th>
                <th className="py-3.5 px-5">Courier & Tracking ID</th>
                <th className="py-3.5 px-5">Destination Address</th>
                <th className="py-3.5 px-5">Estimated Arrival</th>
                <th className="py-3.5 px-5">Delivery Status</th>
                <th className="py-3.5 px-5 text-right">Confirm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDeliveries.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-4 px-5 font-mono font-bold text-[#0b3b2c]">{d.id}</td>
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#14211d]">{d.customer}</div>
                    <div className="text-gray-400">{d.phone}</div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#14211d]">{d.courier}</div>
                    <div className="font-mono text-emerald-700">{d.trackingNumber}</div>
                  </td>
                  <td className="py-4 px-5 max-w-[200px] truncate text-gray-600">
                    {d.address}
                  </td>
                  <td className="py-4 px-5 font-medium text-gray-700">{d.eta}</td>
                  <td className="py-4 px-5">
                    <span
                      className={`px-2.5 py-1 rounded-full border text-xs font-bold ${
                        d.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : d.status === 'Out for Delivery'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    {d.status !== 'Delivered' ? (
                      <button
                        type="button"
                        onClick={() => handleMarkDelivered(d.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] rounded-xl bg-[#0b3b2c] text-white text-xs font-bold hover:bg-[#124e3b] shadow-sm cursor-pointer"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Confirm Receipt</span>
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-bold text-xs flex items-center justify-end gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Completed</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

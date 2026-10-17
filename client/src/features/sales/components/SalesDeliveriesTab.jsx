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

// RoomBridge Exact Design Tokens
const DK = '#012D1D';
const BTN = '#8E4E14';
const ACC = '#FFAB69';
const CR = '#F7F4EF';
const BORDER = '#E8E2D9';

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
            className="fixed top-6 right-6 z-50 rounded-2xl text-white px-5 py-3 shadow-xl text-xs font-bold flex items-center gap-2 border border-white/10"
            style={{ backgroundColor: DK }}
          >
            <CheckCircle2 className="h-4 w-4" style={{ color: ACC }} />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold" style={{ color: DK }}>
          Out for Delivery & Courier Tracking
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Monitor active courier consignments, live tracking codes, and customer delivery receipts.
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border shadow-sm" style={{ borderColor: BORDER }}>
        <div className="relative max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order #, tracking ID, or recipient..."
            className="w-full rounded-xl border py-2.5 pl-10 pr-4 min-h-[44px] text-xs placeholder-gray-400 focus:bg-white focus:outline-none transition-all"
            style={{
              backgroundColor: CR,
              borderColor: BORDER,
              color: DK,
            }}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Deliveries Table */}
      <div className="rounded-2xl bg-white border shadow-sm overflow-hidden" style={{ borderColor: BORDER }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr
                className="border-b text-gray-500 uppercase tracking-wider font-bold"
                style={{ backgroundColor: CR, borderColor: BORDER }}
              >
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
                <tr key={d.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-4 px-5 font-mono font-bold" style={{ color: DK }}>{d.id}</td>
                  <td className="py-4 px-5">
                    <div className="font-bold" style={{ color: DK }}>{d.customer}</div>
                    <div className="text-gray-400">{d.phone}</div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="font-bold" style={{ color: DK }}>{d.courier}</div>
                    <div className="font-mono font-bold" style={{ color: BTN }}>{d.trackingNumber}</div>
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
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 min-h-[44px] rounded-xl text-white text-xs font-bold shadow-sm hover:opacity-90 cursor-pointer transition-all"
                        style={{ backgroundColor: DK }}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" style={{ color: ACC }} />
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

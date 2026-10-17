import { useState } from 'react';
import {
  CheckCircle2,
  Box,
  Truck,
  Search,
  Check,
  X,
  Phone,
  MapPin,
  Eye,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_SALES_ORDERS = [
  {
    id: '#ORD-1042',
    product: 'Classic Leather Loafers',
    variant: 'Size 41 • Espresso Brown',
    image: '/images/hero-fashion-rack.jpg',
    customer: 'Ayesha Khan',
    phone: '+92 300 1234567',
    address: 'B-14 Gulberg III, Lahore, Punjab',
    amount: 89.99,
    status: 'Pending',
    payment: 'COD',
    date: 'Oct 31, 2026',
    notes: 'Requested urgent evening delivery.',
  },
  {
    id: '#ORD-1041',
    product: 'Minimalist White Sneakers',
    variant: 'Size 42 • Chalk White',
    image: '/images/category-womens-dress.jpg',
    customer: 'Usman Ali',
    phone: '+92 301 9876543',
    address: 'Street 4, Sector F-7/2, Islamabad',
    amount: 79.99,
    status: 'Confirmed',
    payment: 'Online Paid',
    date: 'Oct 31, 2026',
    notes: 'Phone verified. Needs double-boxed packaging.',
  },
  {
    id: '#ORD-1040',
    product: 'Italian Leather Handbag',
    variant: 'Caramel Brown • One Size',
    image: '/images/promo-banner-items.jpg',
    customer: 'Sara Malik',
    phone: '+92 302 4567890',
    address: 'House 12, DHA Phase 5, Karachi',
    amount: 129.99,
    status: 'Packing',
    payment: 'COD',
    date: 'Oct 30, 2026',
    notes: 'Gift wrapping requested.',
  },
  {
    id: '#ORD-1039',
    product: 'Heritage Running Sneakers',
    variant: 'Size 43 • Slate Grey',
    image: '/images/lookbook-1.jpg',
    customer: 'Ali Raza',
    phone: '+92 303 1122334',
    address: 'Sector C, Bahria Town, Rawalpindi',
    amount: 76.00,
    status: 'Dispatched',
    payment: 'Online Paid',
    date: 'Oct 30, 2026',
    notes: 'Courier tracking #TCS-8921849.',
  },
  {
    id: '#ORD-1038',
    product: 'Monogram Wool Blazer',
    variant: 'Size 40R • Navy',
    image: '/images/lookbook-2.jpg',
    customer: 'Fatima Noor',
    phone: '+92 304 9988776',
    address: 'Cantt Avenue, Peshawar, KPK',
    amount: 219.00,
    status: 'Delivered',
    payment: 'EasyPaisa',
    date: 'Oct 29, 2026',
    notes: 'Signed and accepted by client.',
  },
];

export default function SalesOrdersTab() {
  const [orders, setOrders] = useState(INITIAL_SALES_ORDERS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Workflow transition
  // Pending -> Confirmed -> Packing -> Dispatched -> Delivered
  const handleAdvanceStatus = (orderId, nextStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: nextStatus } : ord))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, status: nextStatus }));
    }
    showToast(`Order ${orderId} moved to ${nextStatus}!`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Packing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Dispatched':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Pending':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.id.toLowerCase().includes(search.toLowerCase()) ||
      ord.customer.toLowerCase().includes(search.toLowerCase()) ||
      ord.phone.includes(search) ||
      ord.product.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = statusFilter === 'All' || ord.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Toast feedback */}
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
          Client Order Processing & Dispatch
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Verify customer addresses, confirm telephone orders, request warehouse packing, and mark orders dispatched.
        </p>
      </div>

      {/* Workflow Step Indicator */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-3xl border border-gray-200/80 shadow-2xs">
        <div className="p-3 rounded-2xl bg-rose-50/60 border border-rose-100 flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold text-xs">
            1
          </div>
          <div>
            <div className="font-bold text-xs text-rose-900">1. Confirm Order</div>
            <div className="text-xs text-rose-600">
              {orders.filter((o) => o.status === 'Pending').length} Pending Call
            </div>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
            2
          </div>
          <div>
            <div className="font-bold text-xs text-blue-900">2. Request Packing</div>
            <div className="text-xs text-blue-600">
              {orders.filter((o) => o.status === 'Confirmed' || o.status === 'Packing').length} in Queue
            </div>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
            3
          </div>
          <div>
            <div className="font-bold text-xs text-purple-900">3. Dispatch Courier</div>
            <div className="text-xs text-purple-600">
              {orders.filter((o) => o.status === 'Dispatched').length} On Road
            </div>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-[#0b3b2c] text-white flex items-center justify-center font-bold text-xs">
            4
          </div>
          <div>
            <div className="font-bold text-xs text-emerald-900">4. Mark Delivered</div>
            <div className="text-xs text-emerald-700">
              {orders.filter((o) => o.status === 'Delivered').length} Completed
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID, customer name, product, or phone..."
            className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] py-2.5 pl-10 pr-4 min-h-[44px] text-xs text-[#14211d] placeholder-gray-400 focus:border-[#0b3b2c] focus:bg-white focus:outline-none transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Pending', 'Confirmed', 'Packing', 'Dispatched', 'Delivered'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-2 min-h-[44px] rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                statusFilter === status
                  ? 'bg-[#0b3b2c] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-3xl bg-white border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-[#f9fafb] text-gray-500 uppercase tracking-wider font-bold">
                <th className="py-3.5 px-5">Order ID</th>
                <th className="py-3.5 px-5">Product Details</th>
                <th className="py-3.5 px-5">Customer & Phone</th>
                <th className="py-3.5 px-5">City & Destination</th>
                <th className="py-3.5 px-5">Amount & Payment</th>
                <th className="py-3.5 px-5">Current Status</th>
                <th className="py-3.5 px-5 text-right">Workflow Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-4 px-5 font-mono font-bold text-[#0b3b2c]">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(ord)}
                      className="hover:underline cursor-pointer"
                    >
                      {ord.id}
                    </button>
                    <div className="text-gray-400 text-xs font-normal">{ord.date}</div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={ord.image}
                        alt={ord.product}
                        className="h-10 w-10 rounded-xl object-cover bg-stone-100 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-[#14211d] text-xs">{ord.product}</div>
                        <div className="text-gray-500 text-xs">{ord.variant}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#14211d]">{ord.customer}</div>
                    <div className="text-emerald-700 font-medium flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span>{ord.phone}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 max-w-[180px] truncate text-gray-600">
                    {ord.address}
                  </td>
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#14211d]">${ord.amount.toFixed(2)}</div>
                    <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-semibold text-xs">
                      {ord.payment}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span className={`px-2.5 py-1 rounded-full border text-xs font-bold ${getStatusBadge(ord.status)}`}>
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {ord.status === 'Pending' && (
                        <button
                          type="button"
                          onClick={() => handleAdvanceStatus(ord.id, 'Confirmed')}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-sm transition-all cursor-pointer"
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>Confirm Order</span>
                        </button>
                      )}

                      {ord.status === 'Confirmed' && (
                        <button
                          type="button"
                          onClick={() => handleAdvanceStatus(ord.id, 'Packing')}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-sm transition-all cursor-pointer"
                        >
                          <Box className="h-3.5 w-3.5" />
                          <span>Mark Packed</span>
                        </button>
                      )}

                      {ord.status === 'Packing' && (
                        <button
                          type="button"
                          onClick={() => handleAdvanceStatus(ord.id, 'Dispatched')}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 shadow-sm transition-all cursor-pointer"
                        >
                          <Truck className="h-3.5 w-3.5" />
                          <span>Dispatch Order</span>
                        </button>
                      )}

                      {ord.status === 'Dispatched' && (
                        <button
                          type="button"
                          onClick={() => handleAdvanceStatus(ord.id, 'Delivered')}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] rounded-xl bg-[#0b3b2c] text-white text-xs font-bold hover:bg-[#124e3b] shadow-sm transition-all cursor-pointer"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Mark Delivered</span>
                        </button>
                      )}

                      {ord.status === 'Delivered' && (
                        <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Completed</span>
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => setSelectedOrder(ord)}
                        className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Salesman Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-lg font-bold text-[#14211d]">
                      Order {selectedOrder.id}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full border text-xs font-bold ${getStatusBadge(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Sales verification and dispatch review</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4 my-5 text-xs">
                {/* Product details */}
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-3">
                  <img
                    src={selectedOrder.image}
                    alt={selectedOrder.product}
                    className="h-14 w-14 rounded-xl object-cover bg-stone-100 shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-[#14211d]">{selectedOrder.product}</h4>
                    <p className="text-xs text-gray-500">{selectedOrder.variant}</p>
                    <div className="font-bold text-xs text-[#0b3b2c] mt-0.5">
                      ${selectedOrder.amount.toFixed(2)} • {selectedOrder.payment}
                    </div>
                  </div>
                </div>

                {/* Customer and phone call */}
                <div className="p-4 rounded-2xl border border-gray-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-800">{selectedOrder.customer}</span>
                    <a
                      href={`tel:${selectedOrder.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1 min-h-[44px] rounded-lg bg-emerald-50 text-[#0b3b2c] font-bold hover:bg-emerald-100"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      <span>Call Client</span>
                    </a>
                  </div>
                  <div className="text-gray-600 flex items-start gap-1.5 pt-1">
                    <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0 mt-0.5" />
                    <span>{selectedOrder.address}</span>
                  </div>
                  {selectedOrder.notes && (
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-800 text-xs border border-amber-100 mt-2">
                      <span className="font-bold">Customer Note:</span> {selectedOrder.notes}
                    </div>
                  )}
                </div>

                {/* Workflow Action Bar inside Modal */}
                <div className="p-4 rounded-2xl bg-[#f8faf9] border border-emerald-100 space-y-2">
                  <span className="font-bold text-[#0b3b2c] block">Order State Machine:</span>
                  <div className="flex flex-wrap gap-2">
                    {['Confirmed', 'Packing', 'Dispatched', 'Delivered'].map((step) => (
                      <button
                        key={step}
                        type="button"
                        onClick={() => handleAdvanceStatus(selectedOrder.id, step)}
                        className={`px-3 py-1.5 min-h-[44px] rounded-xl font-bold text-xs cursor-pointer transition-all ${
                          selectedOrder.status === step
                            ? 'bg-[#0b3b2c] text-white shadow-xs'
                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-emerald-50'
                        }`}
                      >
                        {step}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 py-2.5 min-h-[44px] rounded-xl bg-[#0b3b2c] text-white font-bold hover:bg-[#124e3b]"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

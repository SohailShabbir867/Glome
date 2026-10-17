import { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle2,
  X,
  Phone,
  MapPin,
  CreditCard,
  User,
  ShoppingBag,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_ORDERS = [
  {
    id: '#ORD-1042',
    customer: 'Ayesha Khan',
    email: 'ayesha.k@example.com',
    phone: '+92 300 1234567',
    address: 'B-14 Gulberg III, Lahore, Punjab',
    amount: 89.99,
    status: 'Delivered',
    payment: 'Credit Card (Visa)',
    date: 'Oct 31, 2026',
    items: [
      { name: 'Classic Leather Loafers', size: '41', color: 'Espresso Brown', price: 89.99, qty: 1, image: '/images/hero-fashion-rack.jpg' },
    ],
  },
  {
    id: '#ORD-1041',
    customer: 'Usman Ali',
    email: 'usman.ali@example.com',
    phone: '+92 301 9876543',
    address: 'Street 4, Sector F-7/2, Islamabad',
    amount: 154.50,
    status: 'Processing',
    payment: 'Cash On Delivery',
    date: 'Oct 31, 2026',
    items: [
      { name: 'Minimalist White Sneakers', size: '42', color: 'Chalk White', price: 79.99, qty: 1, image: '/images/category-womens-dress.jpg' },
      { name: 'Tailored Cotton Oxford Shirt', size: 'L', color: 'Sky Blue', price: 74.51, qty: 1, image: '/images/promo-banner-items.jpg' },
    ],
  },
  {
    id: '#ORD-1040',
    customer: 'Sara Malik',
    email: 'sara.malik@example.com',
    phone: '+92 302 4567890',
    address: 'House 12, DHA Phase 5, Karachi, Sindh',
    amount: 129.99,
    status: 'Shipped',
    payment: 'Online Payment (Mastercard)',
    date: 'Oct 30, 2026',
    items: [
      { name: 'Italian Leather Handbag', size: 'One Size', color: 'Caramel Brown', price: 129.99, qty: 1, image: '/images/promo-banner-items.jpg' },
    ],
  },
  {
    id: '#ORD-1039',
    customer: 'Ali Raza',
    email: 'ali.raza@example.com',
    phone: '+92 303 1122334',
    address: 'Sector C, Bahria Town, Rawalpindi',
    amount: 76.00,
    status: 'Pending',
    payment: 'Cash On Delivery',
    date: 'Oct 30, 2026',
    items: [
      { name: 'Heritage Running Sneakers', size: '43', color: 'Slate Grey', price: 76.00, qty: 1, image: '/images/lookbook-1.jpg' },
    ],
  },
  {
    id: '#ORD-1038',
    customer: 'Fatima Noor',
    email: 'fatima.noor@example.com',
    phone: '+92 304 9988776',
    address: 'Cantt Avenue, Peshawar, KPK',
    amount: 45.99,
    status: 'Delivered',
    payment: 'EasyPaisa',
    date: 'Oct 30, 2026',
    items: [
      { name: 'Embroidered Silk Scarf', size: 'Standard', color: 'Emerald Green', price: 45.99, qty: 1, image: '/images/lookbook-2.jpg' },
    ],
  },
  {
    id: '#ORD-1037',
    customer: 'Bilal Ahmed',
    email: 'bilal.ahmed@example.com',
    phone: '+92 305 6677889',
    address: 'Model Town Block J, Lahore',
    amount: 219.00,
    status: 'Processing',
    payment: 'Credit Card',
    date: 'Oct 29, 2026',
    items: [
      { name: 'Monogram Wool Blazer', size: '40R', color: 'Midnight Navy', price: 219.00, qty: 1, image: '/images/lookbook-3.jpg' },
    ],
  },
];

export default function AdminOrdersTab() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
    }
    showToast(`Order ${orderId} updated to ${newStatus}`);
  };

  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.id.toLowerCase().includes(search.toLowerCase()) ||
      ord.customer.toLowerCase().includes(search.toLowerCase()) ||
      ord.phone.includes(search);
    const matchesFilter = statusFilter === 'All' || ord.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Processing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Shipped':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Pending':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

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

      {/* Top Header & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#14211d]">Orders Management</h2>
          <p className="text-xs text-gray-500 mt-1">
            Track, update statuses, inspect invoices, and manage customer shipments.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => showToast('Orders list exported as orders-oct-2026.csv')}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 px-4 py-2.5 min-h-[44px] text-xs font-bold text-gray-700 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="h-4 w-4 text-[#0b3b2c]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl bg-white p-4 border border-gray-100 shadow-2xs">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Orders</div>
          <div className="font-serif text-xl font-bold text-[#14211d] mt-1">{orders.length}</div>
        </div>
        <div className="rounded-2xl bg-white p-4 border border-gray-100 shadow-2xs">
          <div className="text-xs font-bold text-rose-500 uppercase tracking-wider">Pending</div>
          <div className="font-serif text-xl font-bold text-rose-600 mt-1">
            {orders.filter((o) => o.status === 'Pending').length}
          </div>
        </div>
        <div className="rounded-2xl bg-white p-4 border border-gray-100 shadow-2xs">
          <div className="text-xs font-bold text-blue-500 uppercase tracking-wider">Processing</div>
          <div className="font-serif text-xl font-bold text-blue-600 mt-1">
            {orders.filter((o) => o.status === 'Processing').length}
          </div>
        </div>
        <div className="rounded-2xl bg-white p-4 border border-gray-100 shadow-2xs">
          <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Delivered</div>
          <div className="font-serif text-xl font-bold text-emerald-700 mt-1">
            {orders.filter((o) => o.status === 'Delivered').length}
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID, customer name or phone..."
            className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] py-2.5 pl-10 pr-4 min-h-[44px] text-xs text-[#14211d] placeholder-gray-400 focus:border-[#0b3b2c] focus:bg-white focus:outline-none transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="h-4 w-4 text-gray-400 shrink-0 hidden sm:block" />
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map((status) => (
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
                <th className="py-3.5 px-5">Customer</th>
                <th className="py-3.5 px-5">Date</th>
                <th className="py-3.5 px-5">Payment Method</th>
                <th className="py-3.5 px-5">Items</th>
                <th className="py-3.5 px-5">Total</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    No orders found matching your search.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-4 px-5 font-bold text-[#0b3b2c] font-mono">{ord.id}</td>
                    <td className="py-4 px-5">
                      <div className="font-bold text-[#14211d]">{ord.customer}</div>
                      <div className="text-gray-400 text-xs">{ord.phone}</div>
                    </td>
                    <td className="py-4 px-5 text-gray-500">{ord.date}</td>
                    <td className="py-4 px-5 text-gray-600 font-medium">{ord.payment}</td>
                    <td className="py-4 px-5">
                      <span className="font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-lg">
                        {ord.items.length} {ord.items.length > 1 ? 'items' : 'item'}
                      </span>
                    </td>
                    <td className="py-4 px-5 font-bold text-[#14211d]">${ord.amount.toFixed(2)}</td>
                    <td className="py-4 px-5">
                      <span className={`px-2.5 py-1 rounded-full border text-xs font-bold ${getStatusBadge(ord.status)}`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(ord)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] rounded-xl bg-gray-100 hover:bg-[#0b3b2c] hover:text-white text-gray-700 font-bold transition-all cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>View Details</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
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
              className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif text-xl font-bold text-[#14211d]">
                      Order Details {selectedOrder.id}
                    </h3>
                    <span className={`px-3 py-1 rounded-full border text-xs font-bold ${getStatusBadge(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">Placed on {selectedOrder.date}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Status Update Quick Bar */}
              <div className="my-5 p-4 rounded-2xl bg-[#f8faf9] border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-bold text-[#0b3b2c]">Update Order Status:</span>
                <div className="flex flex-wrap items-center gap-2">
                  {['Pending', 'Processing', 'Shipped', 'Delivered'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(selectedOrder.id, st)}
                      className={`px-3 py-1.5 min-h-[44px] rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedOrder.status === st
                          ? 'bg-[#0b3b2c] text-white shadow-xs'
                          : 'bg-white border border-gray-200 text-gray-600 hover:bg-emerald-50'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer and Shipping Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
                <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                    <User className="h-4 w-4 text-[#0b3b2c]" />
                    <span>Customer Information</span>
                  </div>
                  <div className="font-bold text-[#14211d] text-xs">{selectedOrder.customer}</div>
                  <div className="text-xs text-gray-500">{selectedOrder.email}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-600 font-medium">
                    <Phone className="h-3.5 w-3.5 text-emerald-600" />
                    <span>{selectedOrder.phone}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                    <MapPin className="h-4 w-4 text-[#0b3b2c]" />
                    <span>Delivery Address</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{selectedOrder.address}</p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 pt-1">
                    <CreditCard className="h-3.5 w-3.5 text-[#0b3b2c]" />
                    <span>{selectedOrder.payment}</span>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                  <ShoppingBag className="h-4 w-4 text-[#0b3b2c]" />
                  <span>Purchased Items ({selectedOrder.items.length})</span>
                </div>
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="p-3.5 flex items-center justify-between gap-3 bg-white">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-12 w-12 rounded-xl object-cover bg-stone-100 border border-gray-100"
                        />
                        <div>
                          <div className="font-bold text-xs text-[#14211d]">{item.name}</div>
                          <div className="text-xs text-gray-500">
                            Size: {item.size} • Color: {item.color}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xs text-[#14211d]">${item.price.toFixed(2)}</div>
                        <div className="text-xs text-gray-400">Qty: {item.qty}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Summary */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500">Total Invoice Amount:</span>
                  <div className="font-serif text-2xl font-extrabold text-[#0b3b2c]">
                    ${selectedOrder.amount.toFixed(2)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 py-2.5 min-h-[44px] rounded-xl bg-[#0b3b2c] text-white text-xs font-bold hover:bg-[#124e3b] transition-all cursor-pointer"
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

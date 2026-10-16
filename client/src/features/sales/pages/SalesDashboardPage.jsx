import { useState } from 'react';
import {
  ShoppingBag,
  CheckCircle2,
  Clock,
  Box,
  Truck,
  Search,
  Check,
  X,
  Phone,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Orders for Salesman
const INITIAL_SALES_ORDERS = [
  {
    id: '#ORD-1042',
    product: 'Classic Hoodie',
    variant: 'Black • L',
    image: '/images/hero-fashion-rack.jpg',
    customer: 'Ayesha Khan',
    phone: '+92 300 1234567',
    address: 'B-14 Gulberg III, Lahore',
    amount: 49.99,
    status: 'Confirmed',
    payment: 'COD',
    date: 'Oct 27, 2026',
  },
  {
    id: '#ORD-1041',
    product: 'White Sneakers',
    variant: 'Size 42',
    image: '/images/category-womens-dress.jpg',
    customer: 'Usman Ali',
    phone: '+92 301 9876543',
    address: 'Street 4, F-7/2, Islamabad',
    amount: 79.99,
    status: 'Packing',
    payment: 'Online',
    date: 'Oct 27, 2026',
  },
  {
    id: '#ORD-1040',
    product: 'Leather Handbag',
    variant: 'Caramel Brown',
    image: '/images/promo-banner-items.jpg',
    customer: 'Sara Malik',
    phone: '+92 302 4567890',
    address: 'House 12, DHA Phase 5, Karachi',
    amount: 89.99,
    status: 'Pending',
    payment: 'COD',
    date: 'Oct 27, 2026',
  },
  {
    id: '#ORD-1039',
    product: 'Baseball Cap',
    variant: 'Navy Blue',
    image: '/images/lookbook-1.jpg',
    customer: 'Ali Raza',
    phone: '+92 303 1122334',
    address: 'Sector C, Bahria Town, Rawalpindi',
    amount: 24.99,
    status: 'Shipped',
    payment: 'Online',
    date: 'Oct 26, 2026',
  },
  {
    id: '#ORD-1038',
    product: 'Denim Jacket',
    variant: 'Blue • M',
    image: '/images/lookbook-2.jpg',
    customer: 'Fatima Noor',
    phone: '+92 304 9988776',
    address: 'Cantt Avenue, Peshawar',
    amount: 69.99,
    status: 'Delivered',
    payment: 'Online',
    date: 'Oct 26, 2026',
  },
];

// Product Exchanges & Customer Issues
const INITIAL_EXCHANGE_REQUESTS = [
  {
    id: '#ISS-1042',
    type: 'Size Exchange',
    product: 'Classic Hoodie',
    fromVariant: 'Size L',
    toVariant: 'Size XL',
    customer: 'Sara Malik',
    phone: '+92 302 4567890',
    reason: 'Size is slightly too tight around chest. Need 1 size larger.',
    status: 'Pending Review',
    availableStock: 14,
    date: 'Oct 27, 2026',
  },
  {
    id: '#ISS-1041',
    type: 'Delivery Delay',
    product: 'White Sneakers',
    fromVariant: 'Size 42',
    toVariant: 'Same',
    customer: 'Usman Ali',
    phone: '+92 301 9876543',
    reason: 'Courier delayed delivery by 2 days, requested expedited delivery.',
    status: 'In Progress',
    availableStock: 8,
    date: 'Oct 27, 2026',
  },
  {
    id: '#ISS-1040',
    type: 'Color Replacement',
    product: 'Leather Handbag',
    fromVariant: 'Caramel',
    toVariant: 'Onyx Black',
    customer: 'Ayesha Khan',
    phone: '+92 300 1234567',
    reason: 'Client preferred black color after opening packaging.',
    status: 'Pending Review',
    availableStock: 6,
    date: 'Oct 26, 2026',
  },
];

// Warehouse Available Stock (Viewable by Salesman)
const WAREHOUSE_STOCK = [
  { id: 1, name: 'Classic Hoodie', category: 'Men', stock: 8, status: 'Low Stock', availableSizes: ['S', 'M', 'XL'] },
  { id: 2, name: 'White Sneakers', category: 'Shoes', stock: 12, status: 'Low Stock', availableSizes: ['40', '41', '42', '44'] },
  { id: 3, name: 'Leather Handbag', category: 'Accessories', stock: 6, status: 'Critical Low', availableSizes: ['One Size'] },
  { id: 4, name: 'Baseball Cap', category: 'Accessories', stock: 15, status: 'In Stock', availableSizes: ['Adjustable'] },
  { id: 5, name: 'Denim Jacket', category: 'Men', stock: 32, status: 'In Stock', availableSizes: ['S', 'M', 'L', 'XL'] },
  { id: 6, name: 'Floral Midi Dress', category: 'Women', stock: 24, status: 'In Stock', availableSizes: ['XS', 'S', 'M'] },
];

export default function SalesDashboardPage() {
  const [orders, setOrders] = useState(INITIAL_SALES_ORDERS);
  const [exchanges, setExchanges] = useState(INITIAL_EXCHANGE_REQUESTS);
  const [orderFilter, setOrderFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [stockSearch, setStockSearch] = useState('');
  const [activeTabSection, setActiveTabSection] = useState('orders'); // 'orders' | 'exchanges' | 'stock'

  // Status badge styling helper
  const getBadgeStyle = (status) => {
    switch (status) {
      case 'Confirmed':
      case 'Approved':
      case 'Delivered':
      case 'In Stock':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Packing':
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Shipped':
      case 'Dispatched':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Pending':
      case 'Pending Review':
      case 'Low Stock':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Critical Low':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Order workflow state changes:
  // Pending -> Confirmed -> Packing -> Shipped -> Delivered
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // Exchange approval
  const handleApproveExchange = (issueId) => {
    setExchanges((prev) =>
      prev.map((ex) => (ex.id === issueId ? { ...ex, status: 'Approved & Dispatched' } : ex))
    );
  };

  // Filtered orders
  const filteredOrders = orders.filter((ord) => {
    if (orderFilter === 'All') return true;
    return ord.status.toLowerCase() === orderFilter.toLowerCase();
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Welcome Greeting Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0b3b2c] via-[#124e3b] to-[#07241b] text-white p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-200">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Sales Representative Portal</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
              Hello Ali Raza 👋
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-lg">
              Here is your daily order processing dispatch queue and customer exchange portal.
              You have <span className="font-bold text-white">4 pending orders</span> waiting for
              verification.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setActiveTabSection('orders')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTabSection === 'orders'
                  ? 'bg-white text-[#0b3b2c] shadow-md'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              Order Processing
            </button>
            <button
              type="button"
              onClick={() => setActiveTabSection('exchanges')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTabSection === 'exchanges'
                  ? 'bg-white text-[#0b3b2c] shadow-md'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              Exchanges ({exchanges.filter((e) => e.status === 'Pending Review').length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTabSection('stock')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTabSection === 'stock'
                  ? 'bg-white text-[#0b3b2c] shadow-md'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              Stock Check
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top 5 KPI Metric Cards matching Image 2 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Total Orders */}
        <div className="rounded-3xl bg-white p-4 sm:p-5 border border-gray-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500">
            <span>Total Orders</span>
            <ShoppingBag className="h-4 w-4 text-emerald-700" />
          </div>
          <div className="font-serif text-2xl font-extrabold text-[#14211d]">12</div>
          <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <span>+33%</span>
            <span className="text-gray-400 font-normal">vs yesterday</span>
          </div>
        </div>

        {/* Confirmed Orders */}
        <div className="rounded-3xl bg-white p-4 sm:p-5 border border-gray-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500">
            <span>Confirmed</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-700" />
          </div>
          <div className="font-serif text-2xl font-extrabold text-[#14211d]">8</div>
          <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <span>+60%</span>
            <span className="text-gray-400 font-normal">vs yesterday</span>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="rounded-3xl bg-white p-4 sm:p-5 border border-gray-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500">
            <span>Pending</span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <div className="font-serif text-2xl font-extrabold text-amber-700">4</div>
          <div className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
            <span>-20%</span>
            <span className="text-gray-400 font-normal">vs yesterday</span>
          </div>
        </div>

        {/* Packed Orders */}
        <div className="rounded-3xl bg-white p-4 sm:p-5 border border-gray-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500">
            <span>Packed</span>
            <Box className="h-4 w-4 text-blue-600" />
          </div>
          <div className="font-serif text-2xl font-extrabold text-[#14211d]">6</div>
          <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <span>+50%</span>
            <span className="text-gray-400 font-normal">vs yesterday</span>
          </div>
        </div>

        {/* Delivered Today */}
        <div className="rounded-3xl bg-white p-4 sm:p-5 border border-gray-200/80 shadow-2xs space-y-2 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500">
            <span>Delivered Today</span>
            <Truck className="h-4 w-4 text-purple-600" />
          </div>
          <div className="font-serif text-2xl font-extrabold text-[#14211d]">5</div>
          <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <span>+67%</span>
            <span className="text-gray-400 font-normal">vs yesterday</span>
          </div>
        </div>
      </div>

      {/* 3. Section Switcher: Orders vs Exchanges vs Stock Check */}
      {activeTabSection === 'orders' && (
        <div className="space-y-6">
          {/* Main Orders Table Card */}
          <div className="rounded-3xl bg-white p-6 border border-gray-200/80 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#14211d]">
                  Client Order Dispatch Queue
                </h3>
                <p className="text-xs text-gray-500">
                  Verify customer details, confirm orders, and dispatch courier packages.
                </p>
              </div>

              {/* Status Filter Tabs matching Image 2 */}
              <div className="flex flex-wrap gap-1 bg-stone-100 p-1 rounded-2xl text-xs font-bold">
                {['All', 'Confirmed', 'Pending', 'Packing', 'Shipped', 'Delivered'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setOrderFilter(st)}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                      orderFilter === st
                        ? 'bg-[#0b3b2c] text-white shadow-2xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-gray-100 text-gray-400 uppercase text-[10px]">
                  <tr>
                    <th className="pb-3 font-bold">Order ID</th>
                    <th className="pb-3 font-bold">Product Details</th>
                    <th className="pb-3 font-bold">Customer Contact</th>
                    <th className="pb-3 font-bold">Amount</th>
                    <th className="pb-3 font-bold">Status</th>
                    <th className="pb-3 font-bold">Payment</th>
                    <th className="pb-3 font-bold text-right">Workflow Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-4 font-mono font-bold text-[#0b3b2c]">{ord.id}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={ord.image}
                            alt={ord.product}
                            className="h-10 w-10 rounded-xl object-cover bg-stone-100"
                          />
                          <div>
                            <div className="font-bold text-[#14211d]">{ord.product}</div>
                            <div className="text-[11px] text-gray-500">{ord.variant}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="font-bold text-gray-900">{ord.customer}</div>
                        <div className="text-[11px] text-gray-500 flex items-center gap-1">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span>{ord.phone}</span>
                        </div>
                      </td>
                      <td className="py-4 font-extrabold text-gray-900">${ord.amount.toFixed(2)}</td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full border text-[10px] font-bold ${getBadgeStyle(
                            ord.status
                          )}`}
                        >
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="font-bold text-[10px] bg-stone-100 px-2.5 py-1 rounded-lg text-gray-700">
                          {ord.payment}
                        </span>
                      </td>
                      <td className="py-4 text-right space-x-1.5">
                        {ord.status === 'Pending' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateOrderStatus(ord.id, 'Confirmed')}
                            className="rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                          >
                            Confirm Order
                          </button>
                        )}
                        {ord.status === 'Confirmed' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateOrderStatus(ord.id, 'Packing')}
                            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                          >
                            Mark Packed
                          </button>
                        )}
                        {ord.status === 'Packing' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateOrderStatus(ord.id, 'Shipped')}
                            className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white px-3 py-1.5 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                          >
                            Dispatch Order
                          </button>
                        )}
                        {ord.status === 'Shipped' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateOrderStatus(ord.id, 'Delivered')}
                            className="rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                          >
                            Mark Delivered
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(ord)}
                          className="rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-700 px-2.5 py-1.5 text-xs font-bold transition-colors cursor-pointer"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. Exchanges & Product Issue Requests Section */}
      {activeTabSection === 'exchanges' && (
        <div className="rounded-3xl bg-white p-6 border border-gray-200/80 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#14211d]">
                Product Exchange & Replacement Center
              </h3>
              <p className="text-xs text-gray-500">
                Customers requesting size exchanges, replacement colors, or product inspections.
              </p>
            </div>
            <span className="rounded-full bg-rose-50 border border-rose-200 px-3 py-1 text-xs font-bold text-rose-700">
              {exchanges.filter((e) => e.status === 'Pending Review').length} Pending Requests
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exchanges.map((issue) => (
              <div
                key={issue.id}
                className="rounded-2xl border border-gray-200 p-5 space-y-4 hover:shadow-md transition-shadow bg-stone-50/50"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#0b3b2c] block">
                      {issue.id}
                    </span>
                    <h4 className="font-bold text-sm text-[#14211d] mt-0.5">{issue.type}</h4>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${getBadgeStyle(
                      issue.status
                    )}`}
                  >
                    {issue.status}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="text-gray-600">
                    Product: <strong className="text-gray-900">{issue.product}</strong>
                  </div>
                  <div className="flex items-center gap-2 font-semibold">
                    <span className="text-rose-600 line-through">{issue.fromVariant}</span>
                    <ArrowRight className="h-3 w-3 text-gray-400" />
                    <span className="text-emerald-700 font-bold">{issue.toVariant}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 text-[11px] leading-relaxed">
                    &ldquo;{issue.reason}&rdquo;
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-gray-500 block text-[10px]">Warehouse Stock</span>
                    <span className="font-bold text-emerald-700">
                      {issue.availableStock} units ready
                    </span>
                  </div>

                  {issue.status === 'Pending Review' ? (
                    <button
                      type="button"
                      onClick={() => handleApproveExchange(issue.id)}
                      className="rounded-xl bg-[#0b3b2c] hover:bg-[#124e3b] text-white px-3.5 py-2 text-xs font-bold shadow-xs transition-colors cursor-pointer"
                    >
                      Approve & Dispatch
                    </button>
                  ) : (
                    <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                      <Check className="h-4 w-4" /> Dispatched
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Warehouse Stock Inspection Section (Salesman View Only - Cannot add stock) */}
      {activeTabSection === 'stock' && (
        <div className="rounded-3xl bg-white p-6 border border-gray-200/80 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#14211d]">
                Live Warehouse Stock Availability
              </h3>
              <p className="text-xs text-gray-500">
                Inspect live inventory counts and available sizes to advise customers accurately.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={stockSearch}
                onChange={(e) => setStockSearch(e.target.value)}
                placeholder="Filter stock by name..."
                className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] py-2 pl-9 pr-3 text-xs text-[#14211d] focus:border-[#0b3b2c] focus:outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-gray-100 text-gray-400 uppercase text-[10px]">
                <tr>
                  <th className="pb-3 font-bold">Product Item</th>
                  <th className="pb-3 font-bold">Category</th>
                  <th className="pb-3 font-bold">Available Quantity</th>
                  <th className="pb-3 font-bold">Status</th>
                  <th className="pb-3 font-bold">Sizes Ready to Ship</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {WAREHOUSE_STOCK.filter((s) =>
                  s.name.toLowerCase().includes(stockSearch.toLowerCase())
                ).map((stock) => (
                  <tr key={stock.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3.5 font-bold text-gray-900">{stock.name}</td>
                    <td className="py-3.5 text-gray-500">{stock.category}</td>
                    <td className="py-3.5 font-extrabold text-[#0b3b2c]">{stock.stock} units</td>
                    <td className="py-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${getBadgeStyle(
                          stock.status
                        )}`}
                      >
                        {stock.status}
                      </span>
                    </td>
                    <td className="py-3.5 flex flex-wrap gap-1">
                      {stock.availableSizes.map((sz) => (
                        <span
                          key={sz}
                          className="px-2 py-0.5 rounded-md bg-stone-100 text-gray-700 text-[10px] font-bold"
                        >
                          {sz}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3 text-xs text-amber-900">
            <ShieldAlert className="h-5 w-5 text-amber-700 shrink-0" />
            <span>
              <strong>Sales Representative Notice:</strong> Inventory is synchronized directly with
              central warehouse RFID tags. Adding or adjusting stock requires Administrator
              privileges.
            </span>
          </div>
        </div>
      )}

      {/* 6. Order Details Inspection Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-200 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <span className="font-mono text-xs font-bold text-[#0b3b2c]">
                    Order {selectedOrder.id}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#14211d]">
                    Customer Order Verification
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="p-1 text-gray-400 hover:text-gray-900 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                {/* Product info */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 border border-gray-200">
                  <img
                    src={selectedOrder.image}
                    alt={selectedOrder.product}
                    className="h-12 w-12 rounded-xl object-cover bg-white"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-[#14211d]">{selectedOrder.product}</h4>
                    <p className="text-gray-500">{selectedOrder.variant}</p>
                    <span className="font-extrabold text-[#0b3b2c]">
                      ${selectedOrder.amount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Customer info */}
                <div className="space-y-1.5 p-3 rounded-2xl bg-stone-50 border border-gray-200">
                  <div className="font-bold text-gray-900">{selectedOrder.customer}</div>
                  <div className="text-gray-600">Phone: {selectedOrder.phone}</div>
                  <div className="text-gray-600">Address: {selectedOrder.address}</div>
                  <div className="text-gray-600">Payment: {selectedOrder.payment}</div>
                </div>

                {/* Workflow Status Buttons */}
                <div className="space-y-2 pt-2">
                  <span className="block text-xs font-bold text-gray-700">Change Status</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Confirmed', 'Packing', 'Shipped', 'Delivered'].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, st)}
                        className={`py-2 px-3 rounded-xl font-bold text-xs border transition-colors cursor-pointer ${
                          selectedOrder.status === st
                            ? 'bg-[#0b3b2c] text-white border-[#0b3b2c]'
                            : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="w-full rounded-full bg-[#0b3b2c] py-3 text-xs font-bold text-white hover:bg-[#124e3b] transition-colors cursor-pointer"
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

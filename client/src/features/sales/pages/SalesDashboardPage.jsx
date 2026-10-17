import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
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
import EcommercePerformanceChart from '@/components/dashboard/EcommercePerformanceChart';

// RoomBridge Exact Design Tokens
const DK = '#012D1D';
const BTN = '#8E4E14';
const ACC = '#FFAB69';
const CR = '#F7F4EF';
const BORDER = '#E8E2D9';

// Import Modular Sales Sub-Pages
import SalesOrdersTab from '../components/SalesOrdersTab';
import SalesExchangesTab from '../components/SalesExchangesTab';
import SalesInventoryTab from '../components/SalesInventoryTab';
import SalesEarningsTab from '../components/SalesEarningsTab';
import SalesPackingTab from '../components/SalesPackingTab';
import SalesDeliveriesTab from '../components/SalesDeliveriesTab';
import SalesCustomersTab from '../components/SalesCustomersTab';
import SalesMessagesTab from '../components/SalesMessagesTab';
import SalesSettingsTab from '../components/SalesSettingsTab';

// Mock Orders for Salesman
const INITIAL_SALES_ORDERS = [
  {
    id: '#ORD-1042',
    product: 'Classic Leather Loafers',
    variant: 'Size 41 • Espresso Brown',
    image: '/images/hero-fashion-rack.jpg',
    customer: 'Ayesha Khan',
    phone: '+92 300 1234567',
    address: 'B-14 Gulberg III, Lahore',
    amount: 89.99,
    status: 'Confirmed',
    payment: 'COD',
    date: 'Oct 31, 2026',
  },
  {
    id: '#ORD-1041',
    product: 'Minimalist White Sneakers',
    variant: 'Size 42 • Chalk White',
    image: '/images/category-womens-dress.jpg',
    customer: 'Usman Ali',
    phone: '+92 301 9876543',
    address: 'Street 4, F-7/2, Islamabad',
    amount: 79.99,
    status: 'Packing',
    payment: 'Online',
    date: 'Oct 31, 2026',
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
    status: 'Pending',
    payment: 'COD',
    date: 'Oct 30, 2026',
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
    payment: 'Online',
    date: 'Oct 30, 2026',
  },
  {
    id: '#ORD-1038',
    product: 'Monogram Wool Blazer',
    variant: 'Size 40R • Navy',
    image: '/images/lookbook-2.jpg',
    customer: 'Fatima Noor',
    phone: '+92 304 9988776',
    address: 'Cantt Avenue, Peshawar',
    amount: 219.00,
    status: 'Delivered',
    payment: 'Online',
    date: 'Oct 29, 2026',
  },
];

// Product Exchanges & Customer Issues
const INITIAL_EXCHANGE_REQUESTS = [
  {
    id: '#EXC-2042',
    orderId: '#ORD-1042',
    type: 'Size Exchange',
    product: 'Classic Leather Loafers',
    fromVariant: 'Size 41',
    toVariant: 'Size 42',
    customer: 'Ayesha Khan',
    phone: '+92 300 1234567',
    reason: 'Size is slightly too tight around heel. Need 1 size larger.',
    status: 'Pending Review',
    availableStock: 14,
    date: 'Oct 31, 2026',
  },
  {
    id: '#EXC-2041',
    orderId: '#ORD-1040',
    type: 'Color Replacement',
    product: 'Italian Leather Handbag',
    fromVariant: 'Caramel Brown',
    toVariant: 'Onyx Black',
    customer: 'Sara Malik',
    phone: '+92 302 4567890',
    reason: 'Client requested Onyx Black color after opening packaging.',
    status: 'Pending Review',
    availableStock: 6,
    date: 'Oct 30, 2026',
  },
  {
    id: '#EXC-2040',
    orderId: '#ORD-1039',
    type: 'Size Exchange',
    product: 'Heritage Running Sneakers',
    fromVariant: 'Size 43',
    toVariant: 'Size 44',
    customer: 'Ali Raza',
    phone: '+92 303 1122334',
    reason: 'Needs wider toe box for sports running.',
    status: 'Approved & Dispatched',
    availableStock: 8,
    date: 'Oct 29, 2026',
  },
];

// Warehouse Available Stock (Viewable by Salesman - Read Only)
const WAREHOUSE_STOCK = [
  { id: 1, name: 'Classic Leather Loafers', category: 'Shoes', stock: 24, status: 'In Stock', availableSizes: ['40', '41', '42', '43', '44'] },
  { id: 2, name: 'Minimalist White Sneakers', category: 'Shoes', stock: 12, status: 'Low Stock', availableSizes: ['39', '40', '41', '42'] },
  { id: 3, name: 'Italian Leather Handbag', category: 'Accessories', stock: 6, status: 'Critical Low', availableSizes: ['One Size'] },
  { id: 4, name: 'Tailored Cotton Oxford Shirt', category: "Men's Fashion", stock: 35, status: 'In Stock', availableSizes: ['S', 'M', 'L', 'XL'] },
  { id: 5, name: 'Monogram Wool Blazer', category: "Men's Fashion", stock: 8, status: 'Low Stock', availableSizes: ['38R', '40R'] },
  { id: 6, name: 'Heritage Baseball Cap', category: 'Accessories', stock: 15, status: 'In Stock', availableSizes: ['Adjustable'] },
];

export default function SalesDashboardPage() {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'dashboard';

  const [orders, setOrders] = useState(INITIAL_SALES_ORDERS);
  const [exchanges, setExchanges] = useState(INITIAL_EXCHANGE_REQUESTS);
  const [orderFilter, setOrderFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [stockSearch, setStockSearch] = useState('');
  const [activeTabSection, setActiveTabSection] = useState('orders'); // 'orders' | 'exchanges' | 'stock'

  // Sub-pages routing
  if (activeTab === 'orders') return <SalesOrdersTab />;
  if (activeTab === 'sales' || activeTab === 'earnings') return <SalesEarningsTab />;
  if (activeTab === 'customers') return <SalesCustomersTab />;
  if (activeTab === 'inventory') return <SalesInventoryTab />;
  if (activeTab === 'packing') return <SalesPackingTab />;
  if (activeTab === 'deliveries') return <SalesDeliveriesTab />;
  if (activeTab === 'exchanges') return <SalesExchangesTab />;
  if (activeTab === 'messages') return <SalesMessagesTab />;
  if (activeTab === 'settings') return <SalesSettingsTab />;

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

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleApproveExchange = (issueId) => {
    setExchanges((prev) =>
      prev.map((ex) => (ex.id === issueId ? { ...ex, status: 'Approved & Dispatched' } : ex))
    );
  };

  const filteredOrders = orders.filter((ord) => {
    if (orderFilter === 'All') return true;
    return ord.status.toLowerCase() === orderFilter.toLowerCase();
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Welcome Greeting Banner (RoomBridge Deep Obsidian Gradient) */}
      <div
        className="relative overflow-hidden rounded-2xl text-white p-6 sm:p-7 shadow-sm"
        style={{ background: `linear-gradient(120deg, ${DK} 60%, #024a2e)` }}
      >
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold"
              style={{ backgroundColor: `${ACC}25`, color: ACC }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Sales Representative Portal</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
              Hello Ali Raza 👋
            </h1>
            <p className="text-xs sm:text-sm text-white/70 max-w-lg">
              Here is your daily order processing dispatch queue and customer exchange portal.
              You have <span className="font-bold text-white">4 pending orders</span> waiting for
              verification.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setActiveTabSection('orders')}
              className={`px-4 py-2 min-h-[44px] rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTabSection === 'orders'
                  ? 'shadow-md font-black'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
              style={activeTabSection === 'orders' ? { backgroundColor: ACC, color: DK } : {}}
            >
              Order Processing
            </button>
            <button
              type="button"
              onClick={() => setActiveTabSection('exchanges')}
              className={`px-4 py-2 min-h-[44px] rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTabSection === 'exchanges'
                  ? 'shadow-md font-black'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
              style={activeTabSection === 'exchanges' ? { backgroundColor: ACC, color: DK } : {}}
            >
              Exchanges ({exchanges.filter((e) => e.status === 'Pending Review').length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTabSection('stock')}
              className={`px-4 py-2 min-h-[44px] rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTabSection === 'stock'
                  ? 'shadow-md font-black'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
              style={activeTabSection === 'stock' ? { backgroundColor: ACC, color: DK } : {}}
            >
              Stock Check
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top 5 KPI Metric Cards (RoomBridge Token) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Total Orders */}
        <Link
          to="/sales?tab=orders"
          className="rounded-2xl bg-white p-4 sm:p-5 border shadow-sm space-y-2 hover:shadow-md transition-all block cursor-pointer"
          style={{ borderColor: BORDER }}
        >
          <div className="flex items-center justify-between text-xs font-bold text-gray-500">
            <span>Total Orders</span>
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${ACC}25`, color: BTN }}
            >
              <ShoppingBag className="h-4 w-4" />
            </div>
          </div>
          <div className="font-serif text-2xl font-extrabold" style={{ color: DK }}>12</div>
          <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
            <span>+33%</span>
            <span className="text-gray-400 font-normal">vs yesterday</span>
          </div>
        </Link>

        {/* Confirmed Orders */}
        <div
          className="rounded-2xl bg-white p-4 sm:p-5 border shadow-sm space-y-2"
          style={{ borderColor: BORDER }}
        >
          <div className="flex items-center justify-between text-xs font-bold text-gray-500">
            <span>Confirmed</span>
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${ACC}25`, color: BTN }}
            >
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="font-serif text-2xl font-extrabold" style={{ color: DK }}>8</div>
          <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
            <span>+60%</span>
            <span className="text-gray-400 font-normal">vs yesterday</span>
          </div>
        </div>

        {/* Pending Orders */}
        <div
          className="rounded-2xl bg-white p-4 sm:p-5 border shadow-sm space-y-2"
          style={{ borderColor: BORDER }}
        >
          <div className="flex items-center justify-between text-xs font-bold text-gray-500">
            <span>Pending</span>
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${ACC}25`, color: BTN }}
            >
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="font-serif text-2xl font-extrabold text-amber-700">4</div>
          <div className="text-xs font-semibold text-rose-600 flex items-center gap-1">
            <span>Needs verification</span>
          </div>
        </div>

        {/* Packed Orders */}
        <Link
          to="/sales?tab=packing"
          className="rounded-2xl bg-white p-4 sm:p-5 border shadow-sm space-y-2 hover:shadow-md transition-all block cursor-pointer"
          style={{ borderColor: BORDER }}
        >
          <div className="flex items-center justify-between text-xs font-bold text-gray-500">
            <span>Packing Queue</span>
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${ACC}25`, color: BTN }}
            >
              <Box className="h-4 w-4" />
            </div>
          </div>
          <div className="font-serif text-2xl font-extrabold" style={{ color: DK }}>6</div>
          <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
            <span>In warehouse box</span>
          </div>
        </Link>

        {/* Delivered Today */}
        <Link
          to="/sales?tab=deliveries"
          className="rounded-2xl bg-white p-4 sm:p-5 border shadow-sm space-y-2 col-span-2 sm:col-span-1 hover:shadow-md transition-all block cursor-pointer"
          style={{ borderColor: BORDER }}
        >
          <div className="flex items-center justify-between text-xs font-bold text-gray-500">
            <span>Dispatched</span>
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${ACC}25`, color: BTN }}
            >
              <Truck className="h-4 w-4" />
            </div>
          </div>
          <div className="font-serif text-2xl font-extrabold" style={{ color: DK }}>5</div>
          <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
            <span>With courier rider</span>
          </div>
        </Link>
      </div>

      {/* 3. Sales Representative Performance & Commission Velocity Chart */}
      <EcommercePerformanceChart
        title="Sales Representative Performance & Velocity"
        subtitle="Daily closed orders, target progress, and 5% commission earnings"
        accentColor={ACC}
        gradientId="salesmanPerfGrad"
      />

      {/* 4. Section Switcher: Orders vs Exchanges vs Stock Check */}
      {activeTabSection === 'orders' && (
        <div className="space-y-6">
          {/* Main Orders Table Card */}
          <div
            className="rounded-2xl bg-white p-5 sm:p-6 border shadow-sm space-y-6"
            style={{ borderColor: BORDER }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg font-bold" style={{ color: DK }}>
                  Client Order Dispatch Queue
                </h3>
                <p className="text-xs text-gray-500">
                  Verify customer details, confirm orders, and dispatch courier packages.
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div
                className="flex flex-wrap gap-1 p-1 rounded-xl text-xs font-bold border"
                style={{ backgroundColor: CR, borderColor: BORDER }}
              >
                {['All', 'Confirmed', 'Pending', 'Packing', 'Dispatched', 'Delivered'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setOrderFilter(st)}
                    className={`px-3 py-1.5 min-h-[44px] rounded-lg transition-all cursor-pointer ${
                      orderFilter === st
                        ? 'shadow-xs font-extrabold'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    style={
                      orderFilter === st
                        ? { backgroundColor: DK, color: '#ffffff' }
                        : {}
                    }
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-gray-100 text-gray-400 uppercase text-xs">
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
                      <td className="py-4 font-mono font-bold text-[#012D1D]">{ord.id}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={ord.image}
                            alt={ord.product}
                            className="h-10 w-10 rounded-xl object-cover bg-stone-100 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-[#14211d]">{ord.product}</div>
                            <div className="text-xs text-gray-500">{ord.variant}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="font-bold text-gray-900">{ord.customer}</div>
                        <div className="text-xs text-emerald-700 flex items-center gap-1 font-medium">
                          <Phone className="h-3 w-3" />
                          <span>{ord.phone}</span>
                        </div>
                      </td>
                      <td className="py-4 font-extrabold text-gray-900">${ord.amount.toFixed(2)}</td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full border text-xs font-bold ${getBadgeStyle(
                            ord.status
                          )}`}
                        >
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="font-bold text-xs bg-stone-100 px-2.5 py-1 rounded-lg text-gray-700">
                          {ord.payment}
                        </span>
                      </td>
                      <td className="py-4 text-right space-x-1.5">
                        {ord.status === 'Pending' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateOrderStatus(ord.id, 'Confirmed')}
                            className="rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 min-h-[44px] text-xs font-bold transition-all shadow-2xs cursor-pointer"
                          >
                            Confirm Order
                          </button>
                        )}
                        {ord.status === 'Confirmed' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateOrderStatus(ord.id, 'Packing')}
                            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 min-h-[44px] text-xs font-bold transition-all shadow-2xs cursor-pointer"
                          >
                            Mark Packed
                          </button>
                        )}
                        {ord.status === 'Packing' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateOrderStatus(ord.id, 'Dispatched')}
                            className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white px-3 py-1.5 min-h-[44px] text-xs font-bold transition-all shadow-2xs cursor-pointer"
                          >
                            Dispatch Order
                          </button>
                        )}
                        {ord.status === 'Dispatched' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateOrderStatus(ord.id, 'Delivered')}
                            className="rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 min-h-[44px] text-xs font-bold transition-all shadow-2xs cursor-pointer"
                          >
                            Mark Delivered
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(ord)}
                          className="rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-700 px-2.5 py-1.5 min-h-[44px] text-xs font-bold transition-colors cursor-pointer"
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
                    <span className="font-mono text-xs font-bold text-[#012D1D] block">
                      {issue.id}
                    </span>
                    <h4 className="font-bold text-sm text-[#14211d] mt-0.5">{issue.type}</h4>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full border text-xs font-bold ${getBadgeStyle(
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
                  <div className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 text-xs leading-relaxed">
                    &ldquo;{issue.reason}&rdquo;
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-gray-500 block text-xs">Warehouse Stock</span>
                    <span className="font-bold text-emerald-700">
                      {issue.availableStock} units ready
                    </span>
                  </div>

                  {issue.status === 'Pending Review' ? (
                    <button
                      type="button"
                      onClick={() => handleApproveExchange(issue.id)}
                      className="rounded-xl bg-[#012D1D] hover:bg-[#124e3b] text-white px-3.5 py-2 min-h-[44px] text-xs font-bold shadow-xs transition-colors cursor-pointer"
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
                className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] py-2 pl-9 pr-3 min-h-[44px] text-xs text-[#14211d] focus:border-[#012D1D] focus:outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-gray-100 text-gray-400 uppercase text-xs">
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
                    <td className="py-3.5 font-extrabold text-[#012D1D]">{stock.stock} units</td>
                    <td className="py-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full border text-xs font-bold ${getBadgeStyle(
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
                          className="px-2 py-0.5 rounded-md bg-stone-100 text-gray-700 text-xs font-bold"
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
                  <span className="font-mono text-xs font-bold text-[#012D1D]">
                    Order {selectedOrder.id}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#14211d]">
                    Customer Order Verification
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400 hover:text-gray-900 cursor-pointer"
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
                    className="h-12 w-12 rounded-xl object-cover bg-white shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-[#14211d]">{selectedOrder.product}</h4>
                    <p className="text-gray-500">{selectedOrder.variant}</p>
                    <span className="font-extrabold text-[#012D1D]">
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
                    {['Confirmed', 'Packing', 'Dispatched', 'Delivered'].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, st)}
                        className={`py-2 px-3 min-h-[44px] rounded-xl font-bold text-xs border transition-colors cursor-pointer ${
                          selectedOrder.status === st
                            ? 'bg-[#012D1D] text-white border-[#012D1D]'
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
                  className="w-full rounded-full bg-[#012D1D] py-3 min-h-[44px] text-xs font-bold text-white hover:bg-[#124e3b] transition-colors cursor-pointer"
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

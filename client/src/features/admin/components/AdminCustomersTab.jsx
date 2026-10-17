import { useState } from 'react';
import {
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Eye,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_CUSTOMERS = [
  {
    id: 1,
    name: 'Ayesha Khan',
    email: 'ayesha.k@example.com',
    phone: '+92 300 1234567',
    city: 'Lahore',
    totalOrders: 14,
    totalSpent: 1240.50,
    status: 'VIP',
    lastActive: 'Today',
    avatar: 'AK',
  },
  {
    id: 2,
    name: 'Usman Ali',
    email: 'usman.ali@example.com',
    phone: '+92 301 9876543',
    city: 'Islamabad',
    totalOrders: 8,
    totalSpent: 680.00,
    status: 'Active',
    lastActive: 'Yesterday',
    avatar: 'UA',
  },
  {
    id: 3,
    name: 'Sara Malik',
    email: 'sara.malik@example.com',
    phone: '+92 302 4567890',
    city: 'Karachi',
    totalOrders: 21,
    totalSpent: 2150.00,
    status: 'VIP',
    lastActive: '2 days ago',
    avatar: 'SM',
  },
  {
    id: 4,
    name: 'Bilal Ahmed',
    email: 'bilal.ahmed@example.com',
    phone: '+92 305 6677889',
    city: 'Lahore',
    totalOrders: 5,
    totalSpent: 420.00,
    status: 'Active',
    lastActive: 'Oct 28, 2026',
    avatar: 'BA',
  },
  {
    id: 5,
    name: 'Fatima Noor',
    email: 'fatima.noor@example.com',
    phone: '+92 304 9988776',
    city: 'Peshawar',
    totalOrders: 3,
    totalSpent: 185.00,
    status: 'Active',
    lastActive: 'Oct 25, 2026',
    avatar: 'FN',
  },
  {
    id: 6,
    name: 'Zainab Tariq',
    email: 'zainab.t@example.com',
    phone: '+92 308 1122445',
    city: 'Rawalpindi',
    totalOrders: 1,
    totalSpent: 49.99,
    status: 'New',
    lastActive: 'Oct 20, 2026',
    avatar: 'ZT',
  },
];

export default function AdminCustomersTab() {
  const [customers] = useState(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState('');
  const [filterTag, setFilterTag] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter((cust) => {
    const matchesSearch =
      cust.name.toLowerCase().includes(search.toLowerCase()) ||
      cust.email.toLowerCase().includes(search.toLowerCase()) ||
      cust.city.toLowerCase().includes(search.toLowerCase()) ||
      cust.phone.includes(search);
    const matchesFilter = filterTag === 'All' || cust.status === filterTag;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#14211d]">Customer Directory</h2>
        <p className="text-xs text-gray-500 mt-1">
          Review customer buying histories, lifetime values, and VIP status tiers across your client base.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-1.5">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Total Client Base
          </span>
          <div className="font-serif text-2xl font-extrabold text-[#14211d]">1,280 Registered</div>
          <p className="text-xs text-emerald-600 font-semibold">+18% new accounts this month</p>
        </div>

        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-1.5">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Average Lifetime Value (LTV)
          </span>
          <div className="font-serif text-2xl font-extrabold text-[#14211d]">$284.50</div>
          <p className="text-xs text-gray-400">Based on repeat purchase metrics</p>
        </div>

        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-1.5">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            VIP Tier Accounts
          </span>
          <div className="font-serif text-2xl font-extrabold text-amber-600">142 Clients</div>
          <p className="text-xs text-gray-400">Over $1,000 spend threshold</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, email, phone or city..."
            className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] py-2.5 pl-10 pr-4 min-h-[44px] text-xs text-[#14211d] placeholder-gray-400 focus:border-[#012D1D] focus:bg-white focus:outline-none transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400 shrink-0 hidden sm:block" />
          {['All', 'VIP', 'Active', 'New'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setFilterTag(tag)}
              className={`px-3.5 py-2 min-h-[44px] rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterTag === tag
                  ? 'bg-[#012D1D] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Customers Table */}
      <div className="rounded-3xl bg-white border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-[#f9fafb] text-gray-500 uppercase tracking-wider font-bold">
                <th className="py-3.5 px-5">Customer Profile</th>
                <th className="py-3.5 px-5">Contact Details</th>
                <th className="py-3.5 px-5">City</th>
                <th className="py-3.5 px-5">Orders</th>
                <th className="py-3.5 px-5">Lifetime Spend</th>
                <th className="py-3.5 px-5">Tier</th>
                <th className="py-3.5 px-5 text-right">Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 text-[#012D1D] flex items-center justify-center font-extrabold text-xs shrink-0">
                        {cust.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-[#14211d] text-xs">{cust.name}</div>
                        <div className="text-gray-400 text-xs">Last active: {cust.lastActive}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="text-gray-700">{cust.email}</div>
                    <div className="text-gray-400">{cust.phone}</div>
                  </td>
                  <td className="py-4 px-5 font-medium text-gray-700">{cust.city}</td>
                  <td className="py-4 px-5">
                    <span className="font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded-lg">
                      {cust.totalOrders} orders
                    </span>
                  </td>
                  <td className="py-4 px-5 font-bold text-[#012D1D]">
                    ${cust.totalSpent.toFixed(2)}
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`px-2.5 py-1 rounded-full border text-xs font-bold ${
                        cust.status === 'VIP'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : cust.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      {cust.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedCustomer(cust)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] rounded-xl bg-gray-100 hover:bg-[#012D1D] hover:text-white text-gray-700 font-bold transition-all cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile Modal */}
      <AnimatePresence>
        {selectedCustomer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCustomer(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 text-[#012D1D] flex items-center justify-center font-extrabold text-sm">
                    {selectedCustomer.avatar}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#14211d]">
                      {selectedCustomer.name}
                    </h3>
                    <span className="text-xs font-semibold text-amber-700">
                      Tier: {selectedCustomer.status} Member
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCustomer(null)}
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3.5 my-5 text-xs">
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4 text-[#012D1D]" />
                    <span>{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4 text-[#012D1D]" />
                    <span>{selectedCustomer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4 text-[#012D1D]" />
                    <span>{selectedCustomer.city}, Pakistan</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                    <span className="text-gray-500 block">Total Completed Orders</span>
                    <span className="font-serif text-xl font-bold text-[#012D1D]">
                      {selectedCustomer.totalOrders}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                    <span className="text-gray-500 block">Lifetime Purchases</span>
                    <span className="font-serif text-xl font-bold text-[#012D1D]">
                      ${selectedCustomer.totalSpent.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedCustomer(null)}
                  className="px-6 py-2.5 min-h-[44px] rounded-xl bg-[#012D1D] text-white font-bold hover:bg-[#124e3b]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

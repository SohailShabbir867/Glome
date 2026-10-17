import { useState } from 'react';
import {
  Search,
  Star,
} from 'lucide-react';

const INITIAL_STAFF = [
  {
    id: 1,
    name: 'Ali Raza',
    role: 'Lead Sales Representative',
    email: 'ali.raza@glomemall.com',
    phone: '+92 300 1122334',
    territory: 'Lahore & Punjab Central',
    orders: 124,
    sales: 4820.00,
    commissionRate: 5,
    commissionEarned: 241.00,
    convRate: '4.2%',
    rating: '4.9',
    status: 'Active',
    avatar: 'AR',
  },
  {
    id: 2,
    name: 'Usman Khan',
    role: 'Senior Sales Representative',
    email: 'usman.khan@glomemall.com',
    phone: '+92 301 4455667',
    territory: 'Islamabad & Rawalpindi',
    orders: 98,
    sales: 3620.00,
    commissionRate: 5,
    commissionEarned: 181.00,
    convRate: '3.8%',
    rating: '4.8',
    status: 'Active',
    avatar: 'UK',
  },
  {
    id: 3,
    name: 'Ahmed Shah',
    role: 'Sales Representative',
    email: 'ahmed.shah@glomemall.com',
    phone: '+92 302 7788990',
    territory: 'Karachi South & DHA',
    orders: 76,
    sales: 2980.00,
    commissionRate: 5,
    commissionEarned: 149.00,
    convRate: '3.4%',
    rating: '4.7',
    status: 'Active',
    avatar: 'AS',
  },
  {
    id: 4,
    name: 'Hassan Ali',
    role: 'Junior Sales Representative',
    email: 'hassan.ali@glomemall.com',
    phone: '+92 303 9900112',
    territory: 'Faisalabad & Multan',
    orders: 54,
    sales: 2150.00,
    commissionRate: 5,
    commissionEarned: 107.50,
    convRate: '2.9%',
    rating: '4.6',
    status: 'Active',
    avatar: 'HA',
  },
  {
    id: 5,
    name: 'Zainab Malik',
    role: 'Sales Representative',
    email: 'zainab.malik@glomemall.com',
    phone: '+92 304 2233445',
    territory: 'Peshawar & KPK',
    orders: 38,
    sales: 1420.00,
    commissionRate: 5,
    commissionEarned: 71.00,
    convRate: '2.6%',
    rating: '4.5',
    status: 'On Leave',
    avatar: 'ZM',
  },
];

export default function AdminStaffTab() {
  const [staff] = useState(INITIAL_STAFF);
  const [search, setSearch] = useState('');

  const filteredStaff = staff.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.territory.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalSalesVolume = staff.reduce((acc, curr) => acc + curr.sales, 0);
  const totalCommission = staff.reduce((acc, curr) => acc + curr.commissionEarned, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#14211d]">Salesmen & Staff Management</h2>
        <p className="text-xs text-gray-500 mt-1">
          Monitor sales representative conversion rates, commission disbursements, and client orders closed.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-1.5">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Total Staff Sales Volume
          </span>
          <div className="font-serif text-2xl font-extrabold text-[#14211d]">
            ${totalSalesVolume.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-emerald-600 font-semibold">+14.2% quota progress</p>
        </div>

        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-1.5">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Total Commission Paid
          </span>
          <div className="font-serif text-2xl font-extrabold text-[#012D1D]">
            ${totalCommission.toFixed(2)}
          </div>
          <p className="text-xs text-gray-400">At standard 5% sales incentive</p>
        </div>

        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-1.5">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Top Performing Representative
          </span>
          <div className="font-serif text-2xl font-extrabold text-amber-600">Ali Raza</div>
          <p className="text-xs text-gray-400">124 orders verified & dispatched</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div className="relative max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by salesman name, region, or email..."
            className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] py-2.5 pl-10 pr-4 min-h-[44px] text-xs text-[#14211d] placeholder-gray-400 focus:border-[#012D1D] focus:bg-white focus:outline-none transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Staff Table */}
      <div className="rounded-3xl bg-white border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-[#f9fafb] text-gray-500 uppercase tracking-wider font-bold">
                <th className="py-3.5 px-5">Sales Representative</th>
                <th className="py-3.5 px-5">Assigned Region</th>
                <th className="py-3.5 px-5">Orders Closed</th>
                <th className="py-3.5 px-5">Gross Sales</th>
                <th className="py-3.5 px-5">Commission (5%)</th>
                <th className="py-3.5 px-5">Conversion</th>
                <th className="py-3.5 px-5">Customer Rating</th>
                <th className="py-3.5 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStaff.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 text-[#012D1D] flex items-center justify-center font-extrabold text-xs shrink-0">
                        {member.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-[#14211d] text-xs">{member.name}</div>
                        <div className="text-gray-400 text-xs">{member.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-gray-600 font-medium">{member.territory}</td>
                  <td className="py-4 px-5">
                    <span className="font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded-lg">
                      {member.orders} orders
                    </span>
                  </td>
                  <td className="py-4 px-5 font-bold text-[#14211d]">${member.sales.toFixed(2)}</td>
                  <td className="py-4 px-5 font-bold text-emerald-700">
                    ${member.commissionEarned.toFixed(2)}
                  </td>
                  <td className="py-4 px-5 font-medium text-gray-700">{member.convRate}</td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1 font-bold text-amber-600">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span>{member.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <span
                      className={`px-3 py-1 rounded-full border text-xs font-bold ${
                        member.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-gray-100 text-gray-500 border-gray-200'
                      }`}
                    >
                      {member.status}
                    </span>
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

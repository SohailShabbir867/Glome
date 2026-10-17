import { useState } from 'react';
import {
  CheckCircle2,
  ArrowUpRight,
  Download,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SALES_COMMISSION_LEDGER = [
  { id: '#ORD-1042', customer: 'Ayesha Khan', saleAmount: 89.99, rate: 5, commission: 4.50, status: 'Cleared', date: 'Oct 31, 2026' },
  { id: '#ORD-1041', customer: 'Usman Ali', saleAmount: 154.50, rate: 5, commission: 7.73, status: 'Pending Delivery', date: 'Oct 31, 2026' },
  { id: '#ORD-1040', customer: 'Sara Malik', saleAmount: 129.99, rate: 5, commission: 6.50, status: 'Cleared', date: 'Oct 30, 2026' },
  { id: '#ORD-1039', customer: 'Ali Raza', saleAmount: 76.00, rate: 5, commission: 3.80, status: 'Pending Delivery', date: 'Oct 30, 2026' },
  { id: '#ORD-1038', customer: 'Fatima Noor', saleAmount: 45.99, rate: 5, commission: 2.30, status: 'Cleared', date: 'Oct 30, 2026' },
  { id: '#ORD-1037', customer: 'Bilal Ahmed', saleAmount: 219.00, rate: 5, commission: 10.95, status: 'Cleared', date: 'Oct 29, 2026' },
];

export default function SalesEarningsTab() {
  const [ledger] = useState(SALES_COMMISSION_LEDGER);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const totalSales = 4820.00;
  const totalCommission = 241.00;
  const clearedCommission = 180.00;
  const pendingCommission = 61.00;

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#14211d]">
            My Sales Performance & Earnings
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Personal sales commission ledger, verified orders, and weekly bank remittance schedule.
          </p>
        </div>

        <button
          type="button"
          onClick={() => showToast('Commission payslip downloaded.')}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 px-4 py-2.5 min-h-[44px] text-xs font-bold text-gray-700 shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Download className="h-4 w-4 text-[#012D1D]" />
          <span>Download Payslip</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Gross Sales Volume
          </span>
          <div className="font-serif text-2xl font-extrabold text-[#14211d]">
            ${totalSales.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span>124 closed client orders</span>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Commission Rate
          </span>
          <div className="font-serif text-2xl font-extrabold text-[#012D1D]">5.0%</div>
          <p className="text-xs text-gray-400">Total: ${totalCommission.toFixed(2)} earned</p>
        </div>

        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Cleared Commission
          </span>
          <div className="font-serif text-2xl font-extrabold text-emerald-700">
            ${clearedCommission.toFixed(2)}
          </div>
          <p className="text-xs text-emerald-600 font-semibold">Available for Friday withdrawal</p>
        </div>

        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Pending Delivery Escrow
          </span>
          <div className="font-serif text-2xl font-extrabold text-amber-600">
            ${pendingCommission.toFixed(2)}
          </div>
          <p className="text-xs text-gray-400">Releases upon order receipt</p>
        </div>
      </div>

      {/* Commission Breakdown Table */}
      <div className="rounded-3xl bg-white border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-serif text-base font-bold text-[#14211d]">
            Recent Closed Deals & Commission Statements
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-[#f9fafb] text-gray-500 uppercase tracking-wider font-bold">
                <th className="py-3.5 px-5">Order ID</th>
                <th className="py-3.5 px-5">Client</th>
                <th className="py-3.5 px-5">Sale Volume</th>
                <th className="py-3.5 px-5">Incentive Rate</th>
                <th className="py-3.5 px-5">My Commission</th>
                <th className="py-3.5 px-5">Date</th>
                <th className="py-3.5 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ledger.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-4 px-5 font-mono font-bold text-[#012D1D]">{item.id}</td>
                  <td className="py-4 px-5 font-bold text-[#14211d]">{item.customer}</td>
                  <td className="py-4 px-5 font-bold text-gray-800">${item.saleAmount.toFixed(2)}</td>
                  <td className="py-4 px-5 font-semibold text-gray-600">{item.rate}%</td>
                  <td className="py-4 px-5 font-serif font-bold text-sm text-[#012D1D]">
                    ${item.commission.toFixed(2)}
                  </td>
                  <td className="py-4 px-5 text-gray-500">{item.date}</td>
                  <td className="py-4 px-5 text-right">
                    <span
                      className={`px-2.5 py-1 rounded-full border text-xs font-bold ${
                        item.status === 'Cleared'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {item.status}
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

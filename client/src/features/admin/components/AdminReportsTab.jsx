import { useState } from 'react';
import {
  Download,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminReportsTab() {
  const [period, setPeriod] = useState('October 2026');
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const categoryBreakdown = [
    { name: 'Luxury Footwear & Shoes', revenue: 24150.00, percent: 50, color: 'bg-[#0b3b2c]' },
    { name: "Men's Fashion & Outerwear", revenue: 14200.00, percent: 30, color: 'bg-emerald-600' },
    { name: "Women's Designer Wear", revenue: 6800.00, percent: 14, color: 'bg-teal-500' },
    { name: 'Leather Accessories & Caps', revenue: 3100.00, percent: 6, color: 'bg-amber-500' },
  ];

  const regionalPerformance = [
    { city: 'Lahore (Punjab Central)', orders: 154, revenue: 21250.00, share: '44%' },
    { city: 'Karachi (Sindh South)', orders: 98, revenue: 13510.00, share: '28%' },
    { city: 'Islamabad / Rawalpindi', orders: 64, revenue: 8685.00, share: '18%' },
    { city: 'Faisalabad, Multan & Others', orders: 36, revenue: 4805.00, share: '10%' },
  ];

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

      {/* Header and Period Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#14211d]">
            Financial & Performance Reports
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Aggregated gross revenue, net margin, category profitability, and regional distribution analysis.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 min-h-[44px] text-xs font-bold text-gray-700 shadow-2xs focus:border-[#0b3b2c] focus:outline-none"
          >
            <option value="October 2026">October 2026</option>
            <option value="Q3 2026">Q3 2026 (Jul - Sep)</option>
            <option value="Year 2026">Full Year 2026</option>
          </select>

          <button
            type="button"
            onClick={() => showToast(`Report for ${period} exported successfully as PDF.`)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0b3b2c] text-white px-4 py-2.5 min-h-[44px] text-xs font-bold shadow-md hover:bg-[#124e3b] transition-all cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 4 Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Gross Revenue
          </span>
          <div className="font-serif text-2xl font-extrabold text-[#14211d]">$48,250.00</div>
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span>+14.5% vs previous period</span>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Discounts & Coupons
          </span>
          <div className="font-serif text-2xl font-extrabold text-amber-600">-$3,420.00</div>
          <p className="text-xs text-gray-400">Total promotional code deductions</p>
        </div>

        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Net Sales Settled
          </span>
          <div className="font-serif text-2xl font-extrabold text-[#0b3b2c]">$44,830.00</div>
          <p className="text-xs text-emerald-700 font-medium">92.9% gross conversion margin</p>
        </div>

        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Returns / Exchanges
          </span>
          <div className="font-serif text-2xl font-extrabold text-[#14211d]">2.4%</div>
          <p className="text-xs text-emerald-600 font-semibold">Well below 5% industry benchmark</p>
        </div>
      </div>

      {/* Category Performance & Visual Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Card: Category Revenue */}
        <div className="rounded-3xl bg-white p-6 border border-gray-100 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#14211d]">
              Revenue by Product Category
            </h3>
            <span className="text-xs text-gray-400">{period}</span>
          </div>

          <div className="space-y-4 pt-2">
            {categoryBreakdown.map((cat, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-700">{cat.name}</span>
                  <span className="font-bold text-[#14211d]">
                    ${cat.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })} ({cat.percent}%)
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${cat.color}`}
                    style={{ width: `${cat.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card: Regional Distribution */}
        <div className="rounded-3xl bg-white p-6 border border-gray-100 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#14211d]">
              Regional Market Performance
            </h3>
            <span className="text-xs text-gray-400">Dispatch Locations</span>
          </div>

          <div className="divide-y divide-gray-100">
            {regionalPerformance.map((region, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#14211d]">{region.city}</div>
                  <div className="text-gray-400">{region.orders} orders completed</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#0b3b2c]">
                    ${region.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-gray-500 font-medium">{region.share} market share</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

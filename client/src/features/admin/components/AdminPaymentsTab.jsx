import { useState } from 'react';
import {
  Search,
  Filter,
  Eye,
  X,
  FileCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_TRANSACTIONS = [
  {
    id: 'TXN-9042',
    orderId: '#ORD-1042',
    customer: 'Ayesha Khan',
    gateway: 'Visa Credit Card',
    amount: 89.99,
    fee: 2.15,
    net: 87.84,
    status: 'Completed',
    date: 'Oct 31, 2026, 10:14 AM',
  },
  {
    id: 'TXN-9041',
    orderId: '#ORD-1041',
    customer: 'Usman Ali',
    gateway: 'Cash On Delivery (COD)',
    amount: 154.50,
    fee: 0.00,
    net: 154.50,
    status: 'Pending Collection',
    date: 'Oct 31, 2026, 09:25 AM',
  },
  {
    id: 'TXN-9040',
    orderId: '#ORD-1040',
    customer: 'Sara Malik',
    gateway: 'Mastercard Debit',
    amount: 129.99,
    fee: 3.12,
    net: 126.87,
    status: 'Completed',
    date: 'Oct 30, 2026, 04:45 PM',
  },
  {
    id: 'TXN-9039',
    orderId: '#ORD-1039',
    customer: 'Ali Raza',
    gateway: 'Cash On Delivery (COD)',
    amount: 76.00,
    fee: 0.00,
    net: 76.00,
    status: 'Pending Collection',
    date: 'Oct 30, 2026, 02:18 PM',
  },
  {
    id: 'TXN-9038',
    orderId: '#ORD-1038',
    customer: 'Fatima Noor',
    gateway: 'EasyPaisa Wallet',
    amount: 45.99,
    fee: 0.90,
    net: 45.09,
    status: 'Completed',
    date: 'Oct 30, 2026, 11:05 AM',
  },
  {
    id: 'TXN-9037',
    orderId: '#ORD-1037',
    customer: 'Bilal Ahmed',
    gateway: 'Visa Credit Card',
    amount: 219.00,
    fee: 5.25,
    net: 213.75,
    status: 'Completed',
    date: 'Oct 29, 2026, 06:30 PM',
  },
];

export default function AdminPaymentsTab() {
  const [transactions] = useState(INITIAL_TRANSACTIONS);
  const [search, setSearch] = useState('');
  const [gatewayFilter, setGatewayFilter] = useState('All');
  const [selectedTxn, setSelectedTxn] = useState(null);

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.id.toLowerCase().includes(search.toLowerCase()) ||
      txn.orderId.toLowerCase().includes(search.toLowerCase()) ||
      txn.customer.toLowerCase().includes(search.toLowerCase());
    const matchesGateway =
      gatewayFilter === 'All' || txn.gateway.toLowerCase().includes(gatewayFilter.toLowerCase());
    return matchesSearch && matchesGateway;
  });

  const totalSettled = transactions
    .filter((t) => t.status === 'Completed')
    .reduce((acc, curr) => acc + curr.net, 0);

  const totalPending = transactions
    .filter((t) => t.status.includes('Pending'))
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#14211d]">
          Payments & Transactions Ledger
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Settlement gateway records, credit card verifications, COD reconciliation, and digital wallet deposits.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-1.5">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Total Settled Online
          </span>
          <div className="font-serif text-2xl font-extrabold text-[#0b3b2c]">
            ${totalSettled.toFixed(2)}
          </div>
          <p className="text-xs text-emerald-600 font-semibold">Directly deposited to merchant account</p>
        </div>

        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-1.5">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Pending COD in Courier Escrow
          </span>
          <div className="font-serif text-2xl font-extrabold text-amber-600">
            ${totalPending.toFixed(2)}
          </div>
          <p className="text-xs text-gray-400">To be remitted upon delivery confirmation</p>
        </div>

        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-1.5">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Gateway Processing Fees
          </span>
          <div className="font-serif text-2xl font-extrabold text-gray-800">$11.42</div>
          <p className="text-xs text-gray-400">Average 2.2% processing rate</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by transaction ID, order #, or customer..."
            className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] py-2.5 pl-10 pr-4 min-h-[44px] text-xs text-[#14211d] placeholder-gray-400 focus:border-[#0b3b2c] focus:bg-white focus:outline-none transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400 shrink-0 hidden sm:block" />
          {['All', 'Visa', 'Mastercard', 'COD', 'EasyPaisa'].map((gw) => (
            <button
              key={gw}
              type="button"
              onClick={() => setGatewayFilter(gw)}
              className={`px-3.5 py-2 min-h-[44px] rounded-xl text-xs font-bold transition-all cursor-pointer ${
                gatewayFilter === gw
                  ? 'bg-[#0b3b2c] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {gw}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-3xl bg-white border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-[#f9fafb] text-gray-500 uppercase tracking-wider font-bold">
                <th className="py-3.5 px-5">Transaction ID</th>
                <th className="py-3.5 px-5">Order #</th>
                <th className="py-3.5 px-5">Customer</th>
                <th className="py-3.5 px-5">Payment Method</th>
                <th className="py-3.5 px-5">Gross Amount</th>
                <th className="py-3.5 px-5">Net Settled</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTransactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-4 px-5 font-mono font-bold text-[#0b3b2c]">{txn.id}</td>
                  <td className="py-4 px-5 font-mono text-gray-700">{txn.orderId}</td>
                  <td className="py-4 px-5 font-bold text-[#14211d]">{txn.customer}</td>
                  <td className="py-4 px-5 text-gray-600">{txn.gateway}</td>
                  <td className="py-4 px-5 font-bold text-[#14211d]">${txn.amount.toFixed(2)}</td>
                  <td className="py-4 px-5 font-bold text-emerald-700">${txn.net.toFixed(2)}</td>
                  <td className="py-4 px-5">
                    <span
                      className={`px-2.5 py-1 rounded-full border text-xs font-bold ${
                        txn.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedTxn(txn)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] rounded-xl bg-gray-100 hover:bg-[#0b3b2c] hover:text-white text-gray-700 font-bold transition-all cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Receipt Modal */}
      <AnimatePresence>
        {selectedTxn && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTxn(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-emerald-50 text-[#0b3b2c] flex items-center justify-center">
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#14211d]">
                      Payment Receipt
                    </h3>
                    <p className="text-xs text-gray-500 font-mono">{selectedTxn.id}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTxn(null)}
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3.5 my-5 text-xs">
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Order Reference:</span>
                    <span className="font-mono font-bold text-gray-800">{selectedTxn.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Payer Name:</span>
                    <span className="font-bold text-gray-800">{selectedTxn.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Payment Gateway:</span>
                    <span className="font-medium text-gray-800">{selectedTxn.gateway}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Processed At:</span>
                    <span className="text-gray-800">{selectedTxn.date}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/40 border border-emerald-100 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gross Charge:</span>
                    <span className="font-bold text-gray-800">${selectedTxn.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interchange Fee:</span>
                    <span className="text-rose-600 font-medium">-${selectedTxn.fee.toFixed(2)}</span>
                  </div>
                  <div className="pt-2 border-t border-emerald-200/60 flex justify-between items-center">
                    <span className="font-bold text-[#0b3b2c]">Net Settlement:</span>
                    <span className="font-serif text-lg font-extrabold text-[#0b3b2c]">
                      ${selectedTxn.net.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedTxn(null)}
                  className="px-6 py-2.5 min-h-[44px] rounded-xl bg-[#0b3b2c] text-white font-bold hover:bg-[#124e3b]"
                >
                  Close Receipt
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

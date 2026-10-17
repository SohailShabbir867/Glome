import { useState } from 'react';
import {
  Layers,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Search,
  Filter,
  X,
  Warehouse,
  TrendingUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_INVENTORY = [
  {
    id: 1,
    name: 'Classic Leather Loafers',
    sku: 'SH-LOA-001',
    category: 'Shoes',
    location: 'Aisle 2, Bin C-14',
    stock: 24,
    minThreshold: 15,
    maxCapacity: 100,
    costPrice: 42.00,
    retailPrice: 89.99,
    status: 'In Stock',
  },
  {
    id: 2,
    name: 'Minimalist White Sneakers',
    sku: 'SH-SNK-002',
    category: 'Shoes',
    location: 'Aisle 2, Bin B-08',
    stock: 12,
    minThreshold: 15,
    maxCapacity: 80,
    costPrice: 38.00,
    retailPrice: 79.99,
    status: 'Low Stock',
  },
  {
    id: 3,
    name: 'Italian Leather Handbag',
    sku: 'AC-BAG-003',
    category: 'Accessories',
    location: 'Aisle 4, Bin D-02',
    stock: 6,
    minThreshold: 10,
    maxCapacity: 50,
    costPrice: 65.00,
    retailPrice: 129.99,
    status: 'Low Stock',
  },
  {
    id: 4,
    name: 'Tailored Cotton Oxford Shirt',
    sku: 'MN-SHT-004',
    category: "Men's Fashion",
    location: 'Aisle 1, Bin A-05',
    stock: 35,
    minThreshold: 20,
    maxCapacity: 120,
    costPrice: 22.00,
    retailPrice: 49.99,
    status: 'In Stock',
  },
  {
    id: 5,
    name: 'Monogram Wool Blazer',
    sku: 'MN-BLZ-005',
    category: "Men's Fashion",
    location: 'Aisle 1, Bin C-01',
    stock: 8,
    minThreshold: 10,
    maxCapacity: 40,
    costPrice: 110.00,
    retailPrice: 219.00,
    status: 'Low Stock',
  },
  {
    id: 6,
    name: 'Heritage Baseball Cap',
    sku: 'AC-CAP-007',
    category: 'Accessories',
    location: 'Aisle 4, Bin A-12',
    stock: 15,
    minThreshold: 20,
    maxCapacity: 100,
    costPrice: 9.50,
    retailPrice: 24.99,
    status: 'Low Stock',
  },
];

export default function AdminInventoryTab() {
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState('All');
  const [restockModalItem, setRestockModalItem] = useState(null);
  const [restockQty, setRestockQty] = useState(50);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleRestockSubmit = (e) => {
    e.preventDefault();
    if (!restockModalItem) return;

    const addAmount = parseInt(restockQty) || 0;
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === restockModalItem.id) {
          const newStock = item.stock + addAmount;
          return {
            ...item,
            stock: newStock,
            status: newStock >= item.minThreshold ? 'In Stock' : 'Low Stock',
          };
        }
        return item;
      })
    );

    showToast(`Successfully added +${addAmount} units to ${restockModalItem.name}!`);
    setRestockModalItem(null);
    setRestockQty(50);
  };

  const filteredItems = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filterMode === 'All'
        ? true
        : filterMode === 'Low Stock'
        ? item.stock <= item.minThreshold
        : item.stock > item.minThreshold;
    return matchesSearch && matchesFilter;
  });

  const totalUnits = inventory.reduce((acc, curr) => acc + curr.stock, 0);
  const totalValuation = inventory.reduce((acc, curr) => acc + curr.stock * curr.retailPrice, 0);
  const lowStockCount = inventory.filter((item) => item.stock <= item.minThreshold).length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
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

      {/* Header and Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#14211d]">
            Warehouse Inventory & RFID Stock
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Real-time multi-aisle stock counts, automated re-order thresholds, and warehouse restock management.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Total Units in Stock
            </span>
            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Warehouse className="h-4 w-4" />
            </div>
          </div>
          <div className="font-serif text-2xl font-extrabold text-[#14211d]">{totalUnits} units</div>
          <p className="text-xs text-gray-400">Across 6 active warehouse bays</p>
        </div>

        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Inventory Valuation
            </span>
            <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="font-serif text-2xl font-extrabold text-[#14211d]">
            ${totalValuation.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-emerald-600 font-medium">Estimated retail gross value</p>
        </div>

        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Low Stock Warnings
            </span>
            <div className="h-9 w-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="font-serif text-2xl font-extrabold text-rose-600">
            {lowStockCount} items
          </div>
          <p className="text-xs text-gray-400">Items below minimum re-order threshold</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search SKU, item name, or aisle location..."
            className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] py-2.5 pl-10 pr-4 min-h-[44px] text-xs text-[#14211d] placeholder-gray-400 focus:border-[#0b3b2c] focus:bg-white focus:outline-none transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400 shrink-0 hidden sm:block" />
          {['All', 'Low Stock', 'In Stock'].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setFilterMode(mode)}
              className={`px-3.5 py-2 min-h-[44px] rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterMode === mode
                  ? 'bg-[#0b3b2c] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="rounded-3xl bg-white border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-[#f9fafb] text-gray-500 uppercase tracking-wider font-bold">
                <th className="py-3.5 px-5">Item & SKU</th>
                <th className="py-3.5 px-5">Category</th>
                <th className="py-3.5 px-5">Warehouse Bay</th>
                <th className="py-3.5 px-5">Stock Level</th>
                <th className="py-3.5 px-5">Threshold</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredItems.map((item) => {
                const stockPercent = Math.min(Math.round((item.stock / item.maxCapacity) * 100), 100);
                const isLow = item.stock <= item.minThreshold;

                return (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-bold text-[#14211d] text-xs">{item.name}</div>
                      <div className="text-gray-400 font-mono text-xs">{item.sku}</div>
                    </td>
                    <td className="py-4 px-5 text-gray-600">{item.category}</td>
                    <td className="py-4 px-5 font-medium text-gray-700">{item.location}</td>
                    <td className="py-4 px-5 min-w-[180px]">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`font-bold text-xs ${isLow ? 'text-rose-600' : 'text-gray-800'}`}>
                          {item.stock} / {item.maxCapacity} units
                        </span>
                        <span className="text-gray-400 text-xs">{stockPercent}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isLow ? 'bg-rose-500' : 'bg-emerald-600'
                          }`}
                          style={{ width: `${stockPercent}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-4 px-5 text-gray-500">Min {item.minThreshold} units</td>
                    <td className="py-4 px-5">
                      <span
                        className={`px-2.5 py-1 rounded-full border text-xs font-bold ${
                          isLow
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button
                        type="button"
                        onClick={() => setRestockModalItem(item)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 min-h-[44px] rounded-xl bg-emerald-50 text-[#0b3b2c] font-bold hover:bg-[#0b3b2c] hover:text-white transition-all cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Restock</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Restock Modal */}
      <AnimatePresence>
        {restockModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setRestockModalItem(null)}
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
                    <Layers className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#14211d]">
                      Restock Inventory
                    </h3>
                    <p className="text-xs text-gray-500">{restockModalItem.name}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setRestockModalItem(null)}
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleRestockSubmit} className="space-y-4 my-5 text-xs">
                <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                  <span className="text-gray-500">Current Warehouse Stock:</span>
                  <span className="font-bold text-[#14211d] text-sm">
                    {restockModalItem.stock} units
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1.5">
                    Select Restock Quantity
                  </label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {[25, 50, 100].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setRestockQty(amt)}
                        className={`py-2 min-h-[44px] rounded-xl font-bold border transition-all cursor-pointer ${
                          restockQty === amt
                            ? 'bg-[#0b3b2c] text-white border-[#0b3b2c]'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        +{amt}
                      </button>
                    ))}
                  </div>

                  <input
                    type="number"
                    min="1"
                    value={restockQty}
                    onChange={(e) => setRestockQty(parseInt(e.target.value) || 0)}
                    placeholder="Or enter custom units"
                    className="w-full rounded-xl border border-gray-200 py-2.5 px-3 min-h-[44px] focus:border-[#0b3b2c] focus:outline-none"
                  />
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setRestockModalItem(null)}
                    className="px-4 py-2.5 min-h-[44px] rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 min-h-[44px] rounded-xl bg-[#0b3b2c] text-white font-bold hover:bg-[#124e3b] shadow-md"
                  >
                    Confirm Restock
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

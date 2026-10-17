import { useState } from 'react';
import {
  Search,
  Lock,
  Warehouse,
} from 'lucide-react';

const WAREHOUSE_INSPECTION_STOCK = [
  {
    id: 1,
    name: 'Classic Leather Loafers',
    sku: 'SH-LOA-001',
    category: 'Shoes',
    stock: 24,
    status: 'In Stock',
    availableSizes: ['40', '41', '42', '43', '44'],
    location: 'Aisle 2, Bin C-14',
    maxStock: 80,
    image: '/images/hero-fashion-rack.jpg',
  },
  {
    id: 2,
    name: 'Minimalist White Sneakers',
    sku: 'SH-SNK-002',
    category: 'Shoes',
    stock: 12,
    status: 'Low Stock',
    availableSizes: ['39', '40', '41', '42'],
    location: 'Aisle 2, Bin B-08',
    maxStock: 80,
    image: '/images/category-womens-dress.jpg',
  },
  {
    id: 3,
    name: 'Italian Leather Handbag',
    sku: 'AC-BAG-003',
    category: 'Accessories',
    stock: 6,
    status: 'Critical Low',
    availableSizes: ['One Size'],
    location: 'Aisle 4, Bin D-02',
    maxStock: 50,
    image: '/images/promo-banner-items.jpg',
  },
  {
    id: 4,
    name: 'Tailored Cotton Oxford Shirt',
    sku: 'MN-SHT-004',
    category: "Men's Fashion",
    stock: 35,
    status: 'In Stock',
    availableSizes: ['S', 'M', 'L', 'XL'],
    location: 'Aisle 1, Bin A-05',
    maxStock: 120,
    image: '/images/lookbook-1.jpg',
  },
  {
    id: 5,
    name: 'Monogram Wool Blazer',
    sku: 'MN-BLZ-005',
    category: "Men's Fashion",
    stock: 8,
    status: 'Low Stock',
    availableSizes: ['38R', '40R'],
    location: 'Aisle 1, Bin C-01',
    maxStock: 40,
    image: '/images/lookbook-2.jpg',
  },
  {
    id: 6,
    name: 'Heritage Baseball Cap',
    sku: 'AC-CAP-007',
    category: 'Accessories',
    stock: 15,
    status: 'In Stock',
    availableSizes: ['Adjustable Strap'],
    location: 'Aisle 4, Bin A-12',
    maxStock: 60,
    image: '/images/lookbook-3.jpg',
  },
];

export default function SalesInventoryTab() {
  const [stockList] = useState(WAREHOUSE_INSPECTION_STOCK);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredStock = stockList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.availableSizes.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesFilter =
      filterStatus === 'All'
        ? true
        : filterStatus === 'Low Stock'
        ? item.stock <= 12
        : item.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* 1. Prominent Salesman Read-Only Security Notice */}
      <div className="rounded-3xl bg-amber-50/80 border border-amber-200/90 p-5 sm:p-6 flex items-start gap-3.5 text-amber-900 shadow-2xs">
        <div className="h-10 w-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
          <Lock className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-serif text-sm font-bold text-amber-950">
            Read-Only Warehouse Stock Inspection
          </h4>
          <p className="text-xs text-amber-900/90 leading-relaxed">
            As a Sales Representative, you have full real-time inspection access to verify available shoe and apparel sizes for customer calls.
            <span className="font-bold underline ml-1">
              Adding new stock and warehouse restocking is restricted exclusively to Store Administration.
            </span>
          </p>
        </div>
      </div>

      {/* Header and Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#14211d]">
            Warehouse Stock Availability
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Check current units and available sizes before confirming customer orders or promising exchanges.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-1.5">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Total Available SKUs
          </span>
          <div className="font-serif text-2xl font-extrabold text-[#14211d]">
            {stockList.length} Products
          </div>
          <p className="text-xs text-gray-400">Tracked in live central database</p>
        </div>

        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-1.5">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Low Stock Warnings
          </span>
          <div className="font-serif text-2xl font-extrabold text-rose-600">
            {stockList.filter((s) => s.stock <= 12).length} Low Items
          </div>
          <p className="text-xs text-rose-700 font-semibold">Verify sizes carefully before booking</p>
        </div>

        <div className="rounded-3xl bg-white p-5 border border-gray-100 shadow-2xs space-y-1.5">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Restock Status
          </span>
          <div className="font-serif text-lg font-bold text-gray-800 flex items-center gap-1.5 mt-1">
            <Warehouse className="h-5 w-5 text-[#0b3b2c]" />
            <span>Managed by Head Admin</span>
          </div>
          <p className="text-xs text-gray-400">Automatic purchase orders active</p>
        </div>
      </div>

      {/* Search and Size Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product name, category, or size (e.g., 42, XL)..."
            className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] py-2.5 pl-10 pr-4 min-h-[44px] text-xs text-[#14211d] placeholder-gray-400 focus:border-[#0b3b2c] focus:outline-none"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-2">
          {['All', 'In Stock', 'Low Stock'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-2 min-h-[44px] rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterStatus === st
                  ? 'bg-[#0b3b2c] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStock.map((item) => {
          const isCritical = item.stock <= 6;
          const isLow = item.stock <= 12;

          return (
            <div
              key={item.id}
              className="rounded-3xl bg-white border border-gray-200/80 p-5 shadow-2xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 rounded-xl object-cover bg-stone-100 border border-gray-100 shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-[#14211d]">{item.name}</h4>
                      <div className="text-gray-400 font-mono text-xs">{item.sku}</div>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full border text-xs font-bold shrink-0 ${
                      isCritical
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : isLow
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Stock Level Bar */}
                <div className="space-y-1.5 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 font-semibold">Available Units:</span>
                    <span className={`font-bold ${isLow ? 'text-rose-600' : 'text-[#0b3b2c]'}`}>
                      {item.stock} / {item.maxStock} units
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isLow ? 'bg-rose-500' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${Math.min((item.stock / item.maxStock) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400 font-medium pt-1">
                    Location: {item.location}
                  </div>
                </div>

                {/* Available Sizes Chips */}
                <div>
                  <span className="text-xs text-gray-500 font-semibold block mb-1.5">
                    Available Sizes in Stock:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.availableSizes.map((sz, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-xl bg-stone-100 text-gray-800 font-mono text-xs font-bold border border-gray-200"
                      >
                        {sz}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Read Only Indicator Badge at bottom */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1 font-semibold text-gray-500">
                  <Lock className="h-3 w-3 text-gray-400" />
                  <span>Admin Managed Stock</span>
                </span>
                <span className="font-medium">{item.category}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

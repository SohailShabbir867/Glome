import { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Package,
  CheckCircle2,
  X,
  Trash2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Classic Leather Loafers',
    sku: 'SH-LOA-001',
    category: 'Shoes',
    price: 89.99,
    originalPrice: 119.99,
    stock: 24,
    status: 'Active',
    sizes: ['40', '41', '42', '43', '44'],
    image: '/images/hero-fashion-rack.jpg',
  },
  {
    id: 2,
    name: 'Minimalist White Sneakers',
    sku: 'SH-SNK-002',
    category: 'Shoes',
    price: 79.99,
    originalPrice: 99.99,
    stock: 12,
    status: 'Active',
    sizes: ['39', '40', '41', '42', '43'],
    image: '/images/category-womens-dress.jpg',
  },
  {
    id: 3,
    name: 'Italian Leather Handbag',
    sku: 'AC-BAG-003',
    category: 'Accessories',
    price: 129.99,
    originalPrice: 159.99,
    stock: 6,
    status: 'Active',
    sizes: ['One Size'],
    image: '/images/promo-banner-items.jpg',
  },
  {
    id: 4,
    name: 'Tailored Cotton Oxford Shirt',
    sku: 'MN-SHT-004',
    category: "Men's Fashion",
    price: 49.99,
    originalPrice: 65.00,
    stock: 35,
    status: 'Active',
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/images/lookbook-1.jpg',
  },
  {
    id: 5,
    name: 'Monogram Wool Blazer',
    sku: 'MN-BLZ-005',
    category: "Men's Fashion",
    price: 219.00,
    originalPrice: 280.00,
    stock: 8,
    status: 'Active',
    sizes: ['38R', '40R', '42R'],
    image: '/images/lookbook-2.jpg',
  },
  {
    id: 6,
    name: 'Embroidered Silk Evening Gown',
    sku: 'WM-DRS-006',
    category: "Women's Fashion",
    price: 189.50,
    originalPrice: 240.00,
    stock: 14,
    status: 'Draft',
    sizes: ['XS', 'S', 'M', 'L'],
    image: '/images/lookbook-3.jpg',
  },
];

export default function AdminProductsTab() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  // New product form state
  const [newTitle, setNewTitle] = useState('');
  const [newSku, setNewSku] = useState('');
  const [newCategory, setNewCategory] = useState('Shoes');
  const [newPrice, setNewPrice] = useState('');
  const [newOriginalPrice, setNewOriginalPrice] = useState('');
  const [newStock, setNewStock] = useState('20');
  const [newSizes, setNewSizes] = useState('40, 41, 42, 43');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    const newProd = {
      id: Date.now(),
      name: newTitle,
      sku: newSku || `GL-${Math.floor(1000 + Math.random() * 9000)}`,
      category: newCategory,
      price: parseFloat(newPrice),
      originalPrice: newOriginalPrice ? parseFloat(newOriginalPrice) : parseFloat(newPrice) * 1.25,
      stock: parseInt(newStock) || 10,
      status: 'Active',
      sizes: newSizes.split(',').map((s) => s.trim()),
      image: '/images/hero-fashion-rack.jpg',
    };

    setProducts([newProd, ...products]);
    setShowAddModal(false);
    setNewTitle('');
    setNewSku('');
    setNewPrice('');
    setNewOriginalPrice('');
    showToast(`"${newProd.name}" added to catalog!`);
  };

  const handleDeleteProduct = (id, name) => {
    setProducts(products.filter((p) => p.id !== id));
    showToast(`Removed "${name}" from catalog.`);
  };

  const handleToggleStatus = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === 'Active' ? 'Draft' : 'Active' } : p
      )
    );
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

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

      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#14211d]">Products Catalog</h2>
          <p className="text-xs text-gray-500 mt-1">
            Create, edit, toggle visibility, and maintain inventory thresholds for your fashion lineup.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#012D1D] text-white px-5 py-2.5 min-h-[44px] text-xs font-bold shadow-md hover:bg-[#124e3b] transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, SKU, or keyword..."
            className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] py-2.5 pl-10 pr-4 min-h-[44px] text-xs text-[#14211d] placeholder-gray-400 focus:border-[#012D1D] focus:bg-white focus:outline-none transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="h-4 w-4 text-gray-400 shrink-0 hidden sm:block" />
          {['All', 'Shoes', "Men's Fashion", "Women's Fashion", 'Accessories'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-2 min-h-[44px] rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                categoryFilter === cat
                  ? 'bg-[#012D1D] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-3xl bg-white border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-[#f9fafb] text-gray-500 uppercase tracking-wider font-bold">
                <th className="py-3.5 px-5">Product</th>
                <th className="py-3.5 px-5">SKU</th>
                <th className="py-3.5 px-5">Category</th>
                <th className="py-3.5 px-5">Price</th>
                <th className="py-3.5 px-5">Stock</th>
                <th className="py-3.5 px-5">Sizes Available</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="h-12 w-12 rounded-xl object-cover bg-stone-100 border border-gray-100 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-[#14211d] text-xs">{prod.name}</div>
                        <div className="text-gray-400 text-xs">ID: #{prod.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5 font-mono text-gray-500 font-medium">{prod.sku}</td>
                  <td className="py-4 px-5">
                    <span className="px-2.5 py-1 rounded-full bg-stone-100 text-gray-700 font-semibold text-xs">
                      {prod.category}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#14211d]">${prod.price.toFixed(2)}</div>
                    {prod.originalPrice > prod.price && (
                      <div className="text-gray-400 line-through text-xs">
                        ${prod.originalPrice.toFixed(2)}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-bold text-xs ${
                          prod.stock < 10 ? 'text-rose-600' : 'text-[#14211d]'
                        }`}
                      >
                        {prod.stock} units
                      </span>
                      {prod.stock < 10 && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 text-xs font-bold border border-rose-200">
                          Low
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex flex-wrap gap-1 max-w-[160px]">
                      {prod.sizes.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 font-mono text-xs"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(prod.id)}
                      className={`px-3 py-1 min-h-[44px] rounded-full border text-xs font-bold transition-all cursor-pointer ${
                        prod.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-gray-100 text-gray-500 border-gray-200'
                      }`}
                    >
                      {prod.status}
                    </button>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(prod.id, prod.name)}
                        aria-label={`Delete ${prod.name}`}
                        className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-emerald-50 text-[#012D1D] flex items-center justify-center">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#14211d]">Add New Product</h3>
                    <p className="text-xs text-gray-500">Add an item to the GLOME store catalog</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-4 my-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Oxford Derby Shoes"
                    className="w-full rounded-xl border border-gray-200 py-2.5 px-3 min-h-[44px] focus:border-[#012D1D] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">SKU Code</label>
                    <input
                      type="text"
                      value={newSku}
                      onChange={(e) => setNewSku(e.target.value)}
                      placeholder="e.g. SH-OXF-102"
                      className="w-full rounded-xl border border-gray-200 py-2.5 px-3 min-h-[44px] focus:border-[#012D1D] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 py-2.5 px-3 min-h-[44px] bg-white focus:border-[#012D1D] focus:outline-none"
                    >
                      <option value="Shoes">Shoes</option>
                      <option value="Men's Fashion">Men's Fashion</option>
                      <option value="Women's Fashion">Women's Fashion</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Sale Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="89.99"
                      className="w-full rounded-xl border border-gray-200 py-2.5 px-3 min-h-[44px] focus:border-[#012D1D] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Original Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newOriginalPrice}
                      onChange={(e) => setNewOriginalPrice(e.target.value)}
                      placeholder="119.99"
                      className="w-full rounded-xl border border-gray-200 py-2.5 px-3 min-h-[44px] focus:border-[#012D1D] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Initial Stock Units</label>
                    <input
                      type="number"
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 py-2.5 px-3 min-h-[44px] focus:border-[#012D1D] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Available Sizes (comma-separated)</label>
                    <input
                      type="text"
                      value={newSizes}
                      onChange={(e) => setNewSizes(e.target.value)}
                      placeholder="40, 41, 42, 43"
                      className="w-full rounded-xl border border-gray-200 py-2.5 px-3 min-h-[44px] focus:border-[#012D1D] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2.5 min-h-[44px] rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 min-h-[44px] rounded-xl bg-[#012D1D] text-white font-bold hover:bg-[#124e3b] shadow-md"
                  >
                    Save Product
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

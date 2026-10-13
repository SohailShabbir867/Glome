import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import {
  SlidersHorizontal,
  Search,
  Grid3X3,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  X,
  PackageOpen,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ShopBanner from '../components/ShopBanner';
import ShopFilters from '../components/ShopFilters';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import {
  PRODUCTS_CATALOG,
  SHOP_CATEGORIES,
} from '../data/productsData';

const ITEMS_PER_PAGE = 9;

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const productsContainerRef = useRef(null);

  // Read URL query or pathname
  const getCategoryFromLocation = () => {
    if (location.pathname === '/men') return 'men';
    if (location.pathname === '/women') return 'women';
    if (location.pathname === '/shoes') return 'shoes';
    if (location.pathname === '/accessories') return 'accessories';
    return searchParams.get('cat') || searchParams.get('category') || 'all';
  };

  const initialCategory = getCategoryFromLocation();
  const initialSearch = searchParams.get('search') || '';
  const initialFilter = searchParams.get('filter') || '';

  // Local filter states
  const [category, setCategory] = useState(initialCategory);
  const [searchKeyword, setSearchKeyword] = useState(initialSearch);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [minPrice, setMinPrice] = useState(20);
  const [maxPrice, setMaxPrice] = useState(200);
  const [onlySale, setOnlySale] = useState(initialFilter === 'sale');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [gridCols, setGridCols] = useState(3); // 3 or 4 columns
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Sync state when URL pathname or search params change
  useEffect(() => {
    const activeCat = getCategoryFromLocation();
    setCategory(activeCat);
    const search = searchParams.get('search');
    if (search !== null) setSearchKeyword(search);
    const filter = searchParams.get('filter');
    if (filter === 'sale') setOnlySale(true);
  }, [location.pathname, searchParams]);

  // Handle generic filter change
  const handleFilterChange = (key, value) => {
    setCurrentPage(1);
    if (key === 'category') {
      setCategory(value);
      if (['/men', '/women', '/shoes', '/accessories'].includes(location.pathname)) {
        if (value === 'all') navigate('/shop');
        else navigate(`/${value}`);
      } else {
        const newParams = new URLSearchParams(searchParams);
        if (value === 'all') {
          newParams.delete('cat');
          newParams.delete('category');
        } else {
          newParams.set('cat', value);
        }
        setSearchParams(newParams);
      }
    } else if (key === 'selectedBrands') setSelectedBrands(value);
    else if (key === 'selectedSizes') setSelectedSizes(value);
    else if (key === 'selectedColor') setSelectedColor(value);
    else if (key === 'minPrice') setMinPrice(value);
    else if (key === 'maxPrice') setMaxPrice(value);
    else if (key === 'onlySale') setOnlySale(value);
    else if (key === 'onlyInStock') setOnlyInStock(value);
  };

  const handleResetFilters = () => {
    setCategory('all');
    setSearchKeyword('');
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColor('');
    setMinPrice(20);
    setMaxPrice(200);
    setOnlySale(false);
    setOnlyInStock(false);
    setCurrentPage(1);
    if (['/men', '/women', '/shoes', '/accessories'].includes(location.pathname)) {
      navigate('/shop');
    } else {
      setSearchParams({});
    }
  };

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((item) => {
      // 1. Category
      if (category !== 'all' && item.category !== category) {
        return false;
      }
      // 2. Search
      if (searchKeyword.trim()) {
        const query = searchKeyword.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesBrand = item.brand.toLowerCase().includes(query);
        const matchesCategory = item.categoryLabel.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCategory) return false;
      }
      // 3. Brands
      if (selectedBrands.length > 0 && !selectedBrands.includes(item.brandId)) {
        return false;
      }
      // 4. Sizes
      if (
        selectedSizes.length > 0 &&
        !selectedSizes.some((size) => item.sizes?.includes(size))
      ) {
        return false;
      }
      // 5. Color
      if (
        selectedColor &&
        !item.colors?.some((c) => c.name.toLowerCase() === selectedColor.toLowerCase())
      ) {
        return false;
      }
      // 6. Price
      if (item.price < minPrice || item.price > maxPrice) {
        return false;
      }
      // 7. On Sale
      if (onlySale && !item.originalPrice) {
        return false;
      }
      // 8. In Stock
      if (onlyInStock && !item.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      // default: popular
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || b.reviewsCount - a.reviewsCount;
    });
  }, [
    category,
    searchKeyword,
    selectedBrands,
    selectedSizes,
    selectedColor,
    minPrice,
    maxPrice,
    onlySale,
    onlyInStock,
    sortBy,
  ]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (productsContainerRef.current) {
      productsContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Active filters count
  const activeFiltersCount = [
    category !== 'all',
    searchKeyword.trim() !== '',
    selectedBrands.length > 0,
    selectedSizes.length > 0,
    selectedColor !== '',
    minPrice > 20 || maxPrice < 200,
    onlySale,
    onlyInStock,
  ].filter(Boolean).length;

  const activeCategoryObj = SHOP_CATEGORIES.find((c) => c.id === category);

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      {/* 1. Shop Hero Banner */}
      <ShopBanner
        activeCategoryName={activeCategoryObj?.label}
        totalCount={filteredProducts.length}
      />

      {/* 2. Top Quick Category Chips Bar */}
      <div className="border-b border-gray-200/80 bg-white shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {SHOP_CATEGORIES.map((cat) => {
              const isSelected = category === cat.id || (cat.id === 'all' && !category);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleFilterChange('category', cat.id)}
                  className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-[#0b3b2c] text-white shadow-xs'
                      : 'bg-[#f4efe9] text-[#14211d] hover:bg-[#eae2d7]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-white text-gray-500'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Main Catalog Section */}
      <div ref={productsContainerRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block">
            <ShopFilters
              filters={{
                category,
                selectedBrands,
                selectedSizes,
                selectedColor,
                minPrice,
                maxPrice,
                onlySale,
                onlyInStock,
              }}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalResultsCount={filteredProducts.length}
            />
          </div>

          {/* Right Product Grid Area */}
          <div className="flex-1 w-full space-y-6">
            {/* Toolbar: Search, Count, Mobile Filter Trigger, Sort & Layout Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-xs border border-gray-100">
              {/* Left: Mobile Filter Button & Search Box */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Mobile Filter Button */}
                <button
                  type="button"
                  onClick={() => setMobileDrawerOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-[#f8f9fa] px-3.5 py-2 text-xs font-bold text-[#14211d] hover:bg-gray-100 transition-colors"
                >
                  <SlidersHorizontal className="h-4 w-4 text-[#0b3b2c]" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0b3b2c] text-[10px] text-white">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {/* Inline Search Bar */}
                <div className="relative flex-1 sm:w-64">
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => {
                      setSearchKeyword(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search in collection..."
                    className="w-full rounded-xl border border-gray-200 bg-[#f8f9fa] py-2 pl-3.5 pr-8 text-xs text-[#14211d] placeholder-gray-400 focus:border-[#0b3b2c] focus:bg-white focus:outline-none transition-all"
                  />
                  {searchKeyword ? (
                    <button
                      type="button"
                      onClick={() => setSearchKeyword('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
                  )}
                </div>
              </div>

              {/* Right: Count, Sort Dropdown & Grid View Toggle */}
              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                <span className="text-xs text-[#708077] hidden md:inline">
                  Showing <strong className="text-[#14211d]">{filteredProducts.length}</strong> products
                </span>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-400 hidden sm:inline">
                    Sort by:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-xl border border-gray-200 bg-[#f8f9fa] py-2 px-3 text-xs font-semibold text-[#14211d] focus:border-[#0b3b2c] focus:outline-none cursor-pointer"
                  >
                    <option value="popular">Popular</option>
                    <option value="newest">Newest Drops</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                {/* Grid Switcher (Desktop) */}
                <div className="hidden sm:flex items-center rounded-xl border border-gray-200 bg-[#f8f9fa] p-1 gap-1">
                  <button
                    type="button"
                    onClick={() => setGridCols(3)}
                    aria-label="3 column grid"
                    className={`p-1.5 rounded-lg transition-colors ${
                      gridCols === 3
                        ? 'bg-white text-[#0b3b2c] shadow-xs'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setGridCols(4)}
                    aria-label="4 column grid"
                    className={`p-1.5 rounded-lg transition-colors ${
                      gridCols === 4
                        ? 'bg-white text-[#0b3b2c] shadow-xs'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Pill Bar */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-medium text-[#708077]">Active filters:</span>
                {category !== 'all' && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#0b3b2c]/10 px-3 py-1 text-xs font-medium text-[#0b3b2c]">
                    Category: {activeCategoryObj?.label}
                    <button
                      type="button"
                      onClick={() => handleFilterChange('category', 'all')}
                      className="hover:text-rose-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {searchKeyword && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-800">
                    &quot;{searchKeyword}&quot;
                    <button
                      type="button"
                      onClick={() => setSearchKeyword('')}
                      className="hover:text-rose-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedBrands.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1 rounded-full bg-[#cf7a3a]/15 px-3 py-1 text-xs font-medium text-[#cf7a3a]"
                  >
                    Brand: {b}
                    <button
                      type="button"
                      onClick={() =>
                        handleFilterChange(
                          'selectedBrands',
                          selectedBrands.filter((brand) => brand !== b)
                        )
                      }
                      className="hover:text-rose-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {selectedColor && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-800">
                    Color: {selectedColor}
                    <button
                      type="button"
                      onClick={() => handleFilterChange('selectedColor', '')}
                      className="hover:text-rose-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {onlySale && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
                    Sale Items
                    <button
                      type="button"
                      onClick={() => handleFilterChange('onlySale', false)}
                      className="hover:text-rose-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-[#0b3b2c] underline hover:text-[#cf7a3a]"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Product Cards Grid */}
            {paginatedProducts.length > 0 ? (
              <div
                className={`grid grid-cols-2 ${
                  gridCols === 4
                    ? 'sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                    : 'sm:grid-cols-2 md:grid-cols-3'
                } gap-4 sm:gap-6`}
              >
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(prod) => setQuickViewProduct(prod)}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl bg-white p-12 text-center shadow-xs border border-gray-100 space-y-4 my-8"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-[#0b3b2c]">
                  <PackageOpen className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#14211d]">
                  No products match your filters
                </h3>
                <p className="mx-auto max-w-md text-sm text-[#596b63]">
                  Try loosening your filter criteria or searching with a different term.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0b3b2c] px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#124e3b] transition-all"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Reset All Filters</span>
                </button>
              </motion.div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-8 flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  aria-label="Previous page"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:border-[#0b3b2c] hover:text-[#0b3b2c] disabled:opacity-40 disabled:hover:border-gray-200 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => handlePageChange(pageNum)}
                    className={`h-10 w-10 rounded-xl text-xs font-bold transition-all ${
                      currentPage === pageNum
                        ? 'bg-[#0b3b2c] text-white shadow-sm scale-105'
                        : 'border border-gray-200 bg-white text-[#14211d] hover:border-gray-400'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  aria-label="Next page"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:border-[#0b3b2c] hover:text-[#0b3b2c] disabled:opacity-40 disabled:hover:border-gray-200 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Mobile Filter Slide-over Drawer */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <ShopFilters
            filters={{
              category,
              selectedBrands,
              selectedSizes,
              selectedColor,
              minPrice,
              maxPrice,
              onlySale,
              onlyInStock,
            }}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalResultsCount={filteredProducts.length}
            isMobileDrawer={true}
            onCloseMobileDrawer={() => setMobileDrawerOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* 5. Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}

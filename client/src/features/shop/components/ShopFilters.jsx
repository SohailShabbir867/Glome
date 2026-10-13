import { X, RotateCcw, Check, Sparkles } from 'lucide-react';
import {
  SHOP_CATEGORIES,
  SHOP_BRANDS,
  SHOP_SIZES,
  SHOP_COLORS,
} from '../data/productsData';

export default function ShopFilters({
  filters,
  onFilterChange,
  onResetFilters,
  totalResultsCount,
  isMobileDrawer = false,
  onCloseMobileDrawer,
}) {
  const {
    category,
    selectedBrands,
    selectedSizes,
    selectedColor,
    minPrice,
    maxPrice,
    onlySale,
    onlyInStock,
  } = filters;

  const handleCategorySelect = (catId) => {
    onFilterChange('category', catId === category ? 'all' : catId);
  };

  const handleBrandToggle = (brandId) => {
    const nextBrands = selectedBrands.includes(brandId)
      ? selectedBrands.filter((b) => b !== brandId)
      : [...selectedBrands, brandId];
    onFilterChange('selectedBrands', nextBrands);
  };

  const handleSizeToggle = (size) => {
    const nextSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    onFilterChange('selectedSizes', nextSizes);
  };

  const handleColorSelect = (colorName) => {
    onFilterChange('selectedColor', colorName === selectedColor ? '' : colorName);
  };

  const hasActiveFilters =
    category !== 'all' ||
    selectedBrands.length > 0 ||
    selectedSizes.length > 0 ||
    selectedColor !== '' ||
    minPrice > 20 ||
    maxPrice < 200 ||
    onlySale ||
    onlyInStock;

  const content = (
    <div className="space-y-7">
      {/* 1. Header with Reset Button */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <h3 className="font-serif text-lg font-bold text-[#14211d]">Filters</h3>
          {hasActiveFilters && (
            <span className="flex h-2 w-2 rounded-full bg-[#0b3b2c]" />
          )}
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0b3b2c] hover:text-[#cf7a3a] transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* 2. Categories */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#14211d]">
          Categories
        </h4>
        <div className="space-y-1.5">
          {SHOP_CATEGORIES.map((cat) => {
            const isSelected = category === cat.id || (cat.id === 'all' && !category);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#0b3b2c] text-white shadow-xs font-semibold'
                    : 'text-[#596b63] hover:bg-gray-100/80 hover:text-[#14211d]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Price Range Slider & Numeric Inputs */}
      <div className="space-y-3.5 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#14211d]">
            Price Range
          </h4>
          <span className="text-xs font-semibold text-[#0b3b2c]">
            ${minPrice} - ${maxPrice}
          </span>
        </div>

        <input
          type="range"
          min="20"
          max="200"
          step="5"
          value={maxPrice}
          onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
          className="w-full accent-[#0b3b2c] cursor-pointer"
        />

        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center rounded-xl border border-gray-200 bg-[#f8f9fa] px-3 py-1.5 text-xs">
            <span className="text-gray-400 mr-1">$</span>
            <input
              type="number"
              min="0"
              max={maxPrice - 5}
              value={minPrice}
              onChange={(e) => onFilterChange('minPrice', Number(e.target.value))}
              className="w-full bg-transparent font-medium text-[#14211d] focus:outline-none"
            />
          </div>
          <span className="text-gray-400 text-xs">to</span>
          <div className="flex-1 flex items-center rounded-xl border border-gray-200 bg-[#f8f9fa] px-3 py-1.5 text-xs">
            <span className="text-gray-400 mr-1">$</span>
            <input
              type="number"
              min={minPrice + 5}
              max="300"
              value={maxPrice}
              onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
              className="w-full bg-transparent font-medium text-[#14211d] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 4. Sizes */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#14211d]">
            Size
          </h4>
          {selectedSizes.length > 0 && (
            <button
              type="button"
              onClick={() => onFilterChange('selectedSizes', [])}
              className="text-[11px] text-[#708077] hover:text-[#0b3b2c]"
            >
              Clear
            </button>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {SHOP_SIZES.map((size) => {
            const isSelected = selectedSizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeToggle(size)}
                className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'border-[#0b3b2c] bg-[#0b3b2c] text-white shadow-xs'
                    : 'border-gray-200 bg-white text-[#14211d] hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Colors */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#14211d]">
            Color
          </h4>
          {selectedColor && (
            <button
              type="button"
              onClick={() => onFilterChange('selectedColor', '')}
              className="text-[11px] text-[#708077] hover:text-[#0b3b2c]"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2.5">
          {SHOP_COLORS.map((col) => {
            const isSelected = selectedColor === col.name;
            return (
              <button
                key={col.name}
                type="button"
                onClick={() => handleColorSelect(col.name)}
                title={col.name}
                className={`group relative flex h-7 w-7 items-center justify-center rounded-full transition-transform hover:scale-110 ${
                  isSelected ? 'ring-2 ring-[#0b3b2c] ring-offset-2' : ''
                }`}
              >
                <span
                  className="h-6 w-6 rounded-full border border-black/10 shadow-xs flex items-center justify-center"
                  style={{ backgroundColor: col.hex }}
                >
                  {isSelected && (
                    <Check
                      className={`h-3.5 w-3.5 ${
                        col.hex === '#ffffff' || col.hex === '#f4efe9'
                          ? 'text-gray-900'
                          : 'text-white'
                      }`}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Brands */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#14211d]">
          Brands
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {SHOP_BRANDS.map((brand) => {
            const isSelected = selectedBrands.includes(brand.id);
            return (
              <label
                key={brand.id}
                className="flex items-center justify-between text-xs font-medium text-[#596b63] hover:text-[#14211d] cursor-pointer py-1"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleBrandToggle(brand.id)}
                    className="h-4 w-4 rounded border-gray-300 text-[#0b3b2c] focus:ring-[#0b3b2c] cursor-pointer"
                  />
                  <span>{brand.label}</span>
                </div>
                <span className="text-[11px] text-gray-400">({brand.count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 7. Special Toggles */}
      <div className="space-y-2 pt-4 border-t border-gray-100">
        <label className="flex items-center gap-2.5 text-xs font-medium text-[#14211d] cursor-pointer py-1">
          <input
            type="checkbox"
            checked={onlySale}
            onChange={(e) => onFilterChange('onlySale', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-[#0b3b2c] focus:ring-[#0b3b2c] cursor-pointer"
          />
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            On Sale Items Only
          </span>
        </label>

        <label className="flex items-center gap-2.5 text-xs font-medium text-[#14211d] cursor-pointer py-1">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => onFilterChange('onlyInStock', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-[#0b3b2c] focus:ring-[#0b3b2c] cursor-pointer"
          />
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            In Stock Only
          </span>
        </label>
      </div>
    </div>
  );

  // If rendering inside mobile slide-over drawer
  if (isMobileDrawer) {
    return (
      <div className="fixed inset-0 z-50 flex">
        {/* Backdrop */}
        <div
          role="button"
          tabIndex={0}
          onClick={onCloseMobileDrawer}
          onKeyDown={(e) => e.key === 'Escape' && onCloseMobileDrawer()}
          aria-label="Close filters backdrop"
          className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        />

        {/* Drawer Panel */}
        <div className="relative ml-auto flex h-full w-full max-w-xs flex-col bg-white shadow-2xl p-6 overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#0b3b2c]" />
              <h2 className="font-serif text-lg font-bold text-[#14211d]">Filter Products</h2>
            </div>
            <button
              type="button"
              onClick={onCloseMobileDrawer}
              aria-label="Close filters drawer"
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1">{content}</div>

          <div className="pt-4 border-t border-gray-100 mt-6 sticky bottom-0 bg-white">
            <button
              type="button"
              onClick={onCloseMobileDrawer}
              className="w-full rounded-full bg-[#0b3b2c] py-3 text-xs font-bold text-white shadow-sm hover:bg-[#124e3b]"
            >
              Show {totalResultsCount} Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop sticky sidebar container
  return (
    <aside className="w-64 xl:w-72 shrink-0">
      <div className="sticky top-28 rounded-3xl bg-white p-6 shadow-sm border border-gray-100/80">
        {content}
      </div>
    </aside>
  );
}

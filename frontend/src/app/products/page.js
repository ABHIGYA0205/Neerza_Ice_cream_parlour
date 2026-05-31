'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { productAPI, categoryAPI } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'name', label: 'Name A-Z' },
];

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-3 border-amul-red border-t-transparent rounded-full animate-spin" /></div>}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('newest');
  const [showAvailable, setShowAvailable] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  require('react').useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          productAPI.getAll(),
          categoryAPI.getAll()
        ]);
        setProducts(prodRes.data?.products || prodRes.data || []);
        setCategories(catRes.data?.categories || catRes.data || []);
      } catch (err) {
        console.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory) {
      result = result.filter((p) => {
        const catSlug = p.category?.slug || p.category?.name?.toLowerCase().replace(/[\s&]+/g, '-');
        return catSlug === selectedCategory;
      });
    }

    // Availability
    if (showAvailable) {
      result = result.filter((p) => p.availability && p.stock > 0);
    }

    // Sort
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => (b.orderCount || 0) - (a.orderCount || 0));
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy, showAvailable]);

  const activeCategoryName = categories.find(
    (c) => c.slug === selectedCategory || c.name.toLowerCase().replace(/[\s&]+/g, '-') === selectedCategory
  )?.name;

  return (
    <div className="page-enter min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Page Header */}
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary font-[family-name:var(--font-heading)]">
            {activeCategoryName || 'All Products'}
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            {loading ? 'Loading products...' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ice cream, milk, butter, cheese..."
            className="w-full pl-10 pr-10 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amul-red/20 focus:border-amul-red transition-all"
            id="products-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Chips - Horizontal Scroll */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-3 mb-3">
          <button
            onClick={() => setSelectedCategory('')}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              !selectedCategory
                ? 'bg-amul-red text-white border-amul-red'
                : 'bg-white text-text-primary border-border hover:border-amul-red'
            }`}
          >
            All
          </button>
          {categories.map((cat) => {
            const slug = cat.slug || cat.name.toLowerCase().replace(/[\s&]+/g, '-');
            return (
              <button
                key={cat._id}
                onClick={() => setSelectedCategory(selectedCategory === slug ? '' : slug)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                  selectedCategory === slug
                    ? 'bg-amul-red text-white border-amul-red'
                    : 'bg-white text-text-primary border-border hover:border-amul-red'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Filter / Sort Bar */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1.5 text-xs font-semibold text-text-primary bg-white border border-border rounded-lg px-3 py-2 hover:border-amul-red transition-colors"
          >
            <SlidersHorizontal size={14} />
            Filters
            {showAvailable && <span className="w-1.5 h-1.5 bg-amul-red rounded-full" />}
          </button>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none text-xs font-semibold text-text-primary bg-white border border-border rounded-lg px-3 py-2 pr-7 hover:border-amul-red focus:outline-none focus:ring-2 focus:ring-amul-red/20 transition-colors cursor-pointer"
              id="products-sort-select"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-white rounded-xl border border-border p-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showAvailable}
                    onChange={(e) => setShowAvailable(e.target.checked)}
                    className="w-4 h-4 rounded accent-amul-red"
                  />
                  <span className="text-sm text-text-primary font-medium">Show only available products</span>
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-3 border-amul-red border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {filtered.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">🔍</p>
            <h3 className="text-lg font-semibold text-text-primary mb-2">No products found</h3>
            <p className="text-sm text-text-secondary mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory(''); setShowAvailable(false); }}
              className="btn-primary text-sm"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

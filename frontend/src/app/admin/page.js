'use client';

import { useState, useEffect } from 'react';
import { Package, Grid3X3, CheckCircle, AlertTriangle, Eye, ShoppingCart, MessageCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { productAPI, categoryAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          productAPI.getAll({ limit: 100 }),
          categoryAPI.getAll()
        ]);
        setProducts(prodRes.data.products || prodRes.data);
        setCategories(catRes.data.categories || catRes.data);
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const totalProducts = products.length;
  const totalCategories = categories.length;
  const available = products.filter((p) => p.availability && p.stock > 0).length;
  const outOfStock = products.filter((p) => !p.availability || p.stock === 0).length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 5);

  const stats = [
    { label: 'Total Products', value: totalProducts, icon: Package, color: 'bg-sky-light text-sky', link: '/admin/products' },
    { label: 'Categories', value: totalCategories, icon: Grid3X3, color: 'bg-light-yellow text-warning', link: '/admin/categories' },
    { label: 'In Stock', value: available, icon: CheckCircle, color: 'bg-success-light text-success', link: '/admin/inventory' },
    { label: 'Out of Stock', value: outOfStock, icon: AlertTriangle, color: 'bg-danger-light text-danger', link: '/admin/inventory' },
  ];

  return (
    <div className="page-enter">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-heading)]">
          Dashboard
        </h1>
        <p className="text-sm text-text-secondary">Welcome back! Here&apos;s your store overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={stat.link} className="block bg-white rounded-2xl border border-border p-4 hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                  <Icon size={20} />
                </div>
                <p className="text-2xl font-bold text-text-primary font-[family-name:var(--font-heading)]">{stat.value}</p>
                <p className="text-xs text-text-muted">{stat.label}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Low Stock Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-border p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-text-primary flex items-center gap-2">
              <AlertTriangle size={16} className="text-warning" />
              Low Stock Alerts
            </h3>
            <Link href="/admin/inventory" className="text-xs text-amul-red font-semibold hover:underline">
              View All
            </Link>
          </div>

          {lowStock > 0 ? (
            <div className="space-y-3">
              {products
                .filter((p) => p.stock > 0 && p.stock <= 5)
                .slice(0, 5)
                .map((product) => (
                  <div key={product._id} className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">{product.name}</p>
                      <p className="text-xs text-text-muted">{product.quantity}</p>
                    </div>
                    <span className="badge-low-stock shrink-0 ml-2">{product.stock} left</span>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-sm text-text-secondary text-center py-6">✅ All products are well-stocked!</p>
          )}
        </motion.div>

        {/* Best Sellers */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border border-border p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-text-primary flex items-center gap-2">
              <TrendingUp size={16} className="text-amul-red" />
              Best Sellers
            </h3>
            <Link href="/admin/products" className="text-xs text-amul-red font-semibold hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {bestSellers.map((product, i) => (
              <div key={product._id} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-cream flex items-center justify-center text-xs font-bold text-text-muted shrink-0">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-text-primary truncate">{product.name}</p>
                  <p className="text-xs text-text-muted">{product.category?.name} · ₹{product.price}</p>
                </div>
                <span className="badge-in-stock shrink-0">In Stock</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl border border-border p-5"
        >
          <h3 className="text-base font-semibold text-text-primary mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/admin/products/new"
              className="flex flex-col items-center gap-2 bg-cream rounded-xl p-4 hover:bg-cream-dark transition-colors"
            >
              <Package size={24} className="text-amul-red" />
              <span className="text-xs font-semibold text-text-primary">Add Product</span>
            </Link>
            <Link
              href="/admin/categories"
              className="flex flex-col items-center gap-2 bg-cream rounded-xl p-4 hover:bg-cream-dark transition-colors"
            >
              <Grid3X3 size={24} className="text-sky" />
              <span className="text-xs font-semibold text-text-primary">Add Category</span>
            </Link>
            <Link
              href="/admin/inventory"
              className="flex flex-col items-center gap-2 bg-cream rounded-xl p-4 hover:bg-cream-dark transition-colors"
            >
              <AlertTriangle size={24} className="text-warning" />
              <span className="text-xs font-semibold text-text-primary">Low Stock</span>
            </Link>
            <Link
              href="/"
              className="flex flex-col items-center gap-2 bg-cream rounded-xl p-4 hover:bg-cream-dark transition-colors"
            >
              <Eye size={24} className="text-success" />
              <span className="text-xs font-semibold text-text-primary">View Store</span>
            </Link>
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl border border-border p-5"
        >
          <h3 className="text-base font-semibold text-text-primary mb-4">Products by Category</h3>
          <div className="space-y-3">
            {categories.slice(0, 8).map((cat) => {
              const count = products.filter((p) => {
                const slug = p.category?.slug || '';
                const catSlug = cat.slug || cat.name?.toLowerCase().replace(/[\s&]+/g, '-');
                return slug === catSlug;
              }).length;
              const maxCount = Math.max(...categories.map((c) => {
                const s = c.slug || c.name?.toLowerCase().replace(/[\s&]+/g, '-');
                return products.filter((p) => (p.category?.slug || '') === s).length;
              }), 1);
              const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;

              return (
                <div key={cat._id} className="flex items-center gap-3">
                  <span className="text-lg w-6 text-center">{cat.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-text-primary truncate">{cat.name}</span>
                      <span className="text-text-muted shrink-0 ml-2">{count}</span>
                    </div>
                    <div className="h-2 bg-cream rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amul-red rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

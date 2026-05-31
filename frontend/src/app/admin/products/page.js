'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Edit, Trash2, Eye, Package } from 'lucide-react';
import { productAPI } from '@/lib/api';
import { formatPrice, getStockStatus } from '@/lib/utils';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const { data } = await productAPI.getAll();
      setProducts(data.products || data);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.delete(id);
        setProducts(products.filter((p) => p._id !== id));
        toast.success('Product deleted');
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-heading)]">Products</h1>
          <p className="text-sm text-text-secondary">{products.length} total products</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amul-red/20 focus:border-amul-red"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-cream border-b border-border">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted">Product</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted">Category</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted">Price</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted">Stock</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted">Status</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => {
              const stock = getStockStatus(product.stock, product.availability);
              return (
                <tr key={product._id} className="border-b border-border last:border-0 hover:bg-cream/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-cream shrink-0">
                        <Image src={product.images?.[0] || '/images/icecream.jpeg'} alt="" fill sizes="40px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-text-primary truncate">{product.name}</p>
                        <p className="text-xs text-text-muted">{product.quantity}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{product.category?.name || '-'}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-text-primary">{formatPrice(product.price)}</td>
                  <td className="px-4 py-3 text-sm text-text-primary">{product.stock}</td>
                  <td className="px-4 py-3"><span className={stock.className}>{stock.label}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/products/${product._id}`} className="p-2 rounded-lg hover:bg-cream transition-colors text-text-muted" title="Edit product">
                        <Eye size={16} />
                      </Link>
                      <Link href={`/admin/products/${product._id}`} className="p-2 rounded-lg hover:bg-cream transition-colors text-text-muted">
                        <Edit size={16} />
                      </Link>
                      <button onClick={() => handleDelete(product._id)} className="p-2 rounded-lg hover:bg-danger-light transition-colors text-text-muted hover:text-danger">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((product, i) => {
          const stock = getStockStatus(product.stock, product.availability);
          return (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white rounded-xl border border-border p-3 flex gap-3"
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-cream shrink-0">
                <Image src={product.images?.[0] || '/images/icecream.jpeg'} alt="" fill sizes="64px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text-primary truncate">{product.name}</p>
                    <p className="text-xs text-text-muted">{product.category?.name} · {product.quantity}</p>
                  </div>
                  <span className={stock.className}>{stock.label}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-text-primary">{formatPrice(product.price)}</span>
                  <div className="flex gap-1">
                    <Link href={`/admin/products/${product._id}`} className="p-1.5 rounded-lg hover:bg-cream text-text-muted">
                      <Edit size={14} />
                    </Link>
                    <button onClick={() => handleDelete(product._id)} className="p-1.5 rounded-lg hover:bg-danger-light text-text-muted hover:text-danger">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-text-muted mb-3" />
          <p className="text-text-secondary">No products found</p>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Save, Filter } from 'lucide-react';
import { productAPI } from '@/lib/api';
import { formatPrice, getStockStatus } from '@/lib/utils';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function AdminInventoryPage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all'); // all, low, out
  const [editedStocks, setEditedStocks] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await productAPI.getAll({ limit: 100 });
      setProducts(data.products || data);
    } catch (error) {
      toast.error('Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  const filtered = products.filter((p) => {
    if (filter === 'low') return p.stock > 0 && p.stock <= 5;
    if (filter === 'out') return p.stock === 0 || !p.availability;
    return true;
  });

  const handleStockChange = (id, value) => {
    setEditedStocks({ ...editedStocks, [id]: Math.max(0, parseInt(value) || 0) });
  };

  const handleSaveAll = async () => {
    const updates = Object.entries(editedStocks).map(([id, stock]) => ({
      id,
      stock,
    }));

    try {
      await productAPI.bulkStock(updates);
      toast.success('Stock updated successfully!');
      setEditedStocks({});
      fetchProducts(); // Refresh to get updated data
    } catch (error) {
      toast.error('Failed to update stock');
    }
  };

  const totalIn = products.filter((p) => p.availability && p.stock > 0).length;
  const totalLow = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const totalOut = products.filter((p) => !p.availability || p.stock === 0).length;
  const hasEdits = Object.keys(editedStocks).length > 0;

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-heading)]">Inventory</h1>
          <p className="text-sm text-text-secondary">Manage product stock levels</p>
        </div>
        {hasEdits && (
          <button onClick={handleSaveAll} className="btn-primary flex items-center gap-2 text-sm">
            <Save size={16} /> Save Changes ({Object.keys(editedStocks).length})
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`rounded-2xl p-4 border transition-all ${filter === 'all' ? 'border-amul-red bg-white shadow-md' : 'border-border bg-white'}`}
        >
          <CheckCircle size={20} className="text-success mb-2" />
          <p className="text-xl font-bold text-text-primary">{totalIn}</p>
          <p className="text-xs text-text-muted">In Stock</p>
        </button>
        <button
          onClick={() => setFilter('low')}
          className={`rounded-2xl p-4 border transition-all ${filter === 'low' ? 'border-amul-red bg-white shadow-md' : 'border-border bg-white'}`}
        >
          <AlertTriangle size={20} className="text-warning mb-2" />
          <p className="text-xl font-bold text-text-primary">{totalLow}</p>
          <p className="text-xs text-text-muted">Low Stock</p>
        </button>
        <button
          onClick={() => setFilter('out')}
          className={`rounded-2xl p-4 border transition-all ${filter === 'out' ? 'border-amul-red bg-white shadow-md' : 'border-border bg-white'}`}
        >
          <XCircle size={20} className="text-danger mb-2" />
          <p className="text-xl font-bold text-text-primary">{totalOut}</p>
          <p className="text-xs text-text-muted">Out of Stock</p>
        </button>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-cream border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted">Product</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted">Price</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted">Current Stock</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted">New Stock</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => {
                const stock = getStockStatus(product.stock, product.availability);
                const currentStockVal = editedStocks[product._id] !== undefined ? editedStocks[product._id] : product.stock;
                const isEdited = editedStocks[product._id] !== undefined;

                return (
                  <tr key={product._id} className={`border-b border-border last:border-0 transition-colors ${isEdited ? 'bg-light-yellow/50' : 'hover:bg-cream/50'}`}>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-text-primary">{product.name}</p>
                      <p className="text-xs text-text-muted">{product.quantity}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-text-secondary">{product.category?.name || '-'}</td>
                    <td className="px-4 py-3 text-sm font-medium text-text-primary">{formatPrice(product.price)}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-semibold text-text-primary">{product.stock}</span>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={currentStockVal}
                        onChange={(e) => handleStockChange(product._id, e.target.value)}
                        className={`w-20 mx-auto block text-center px-2 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amul-red/20 ${
                          isEdited ? 'border-amul-red bg-light-yellow' : 'border-border'
                        }`}
                        min="0"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={stock.className}>{stock.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle size={48} className="mx-auto text-success mb-3" />
          <p className="text-text-secondary">No products in this category</p>
        </div>
      )}
    </div>
  );
}

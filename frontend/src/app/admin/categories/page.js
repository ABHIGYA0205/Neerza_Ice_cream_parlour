'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Edit, Trash2, Grid3X3, Upload } from 'lucide-react';
import { categoryAPI, uploadAPI } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', image: '' });

  const fetchCategories = async () => {
    try {
      const res = await categoryAPI.getAll();
      setCategories(res.data.categories || res.data);
    } catch (err) {
      toast.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('image', file);
    const toastId = toast.loading('Uploading image...');
    try {
      const res = await uploadAPI.single(fd);
      setFormData(prev => ({ ...prev, image: res.data.url }));
      toast.success('Image uploaded', { id: toastId });
    } catch (err) {
      toast.error('Upload failed', { id: toastId });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) { toast.error('Category name is required'); return; }

    try {
      if (editingId) {
        await categoryAPI.update(editingId, formData);
        toast.success('Category updated');
      } else {
        await categoryAPI.create(formData);
        toast.success('Category created');
      }
      fetchCategories();
      setFormData({ name: '', image: '' });
      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      toast.error('Failed to save category');
    }
  };

  const handleEdit = (cat) => {
    setFormData({ name: cat.name, image: cat.image || '' });
    setEditingId(cat._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this category?')) {
      try {
        await categoryAPI.delete(id);
        toast.success('Category deleted');
        fetchCategories();
      } catch (err) {
        toast.error('Failed to delete category');
      }
    }
  };

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-heading)]">Categories</h1>
          <p className="text-sm text-text-secondary">{categories.length} categories</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ name: '', image: '' }); }} className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} /> Add Category
        </button>
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-border p-5 mb-6 overflow-hidden"
          >
            <h3 className="text-base font-semibold text-text-primary mb-4">{editingId ? 'Edit Category' : 'New Category'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-text-primary mb-1 block">Name *</label>
                <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Category name" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amul-red/20 focus:border-amul-red" required />
              </div>
              <label className="block border-2 border-dashed border-border rounded-xl p-4 text-center hover:border-amul-red transition-colors cursor-pointer relative overflow-hidden">
                {formData.image ? (
                  <div className="relative w-full h-16 rounded bg-cream">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={formData.image.startsWith('/uploads') ? (process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5001') + formData.image : formData.image} alt="Preview" className="w-full h-full object-contain" />
                  </div>
                ) : (
                  <>
                    <Upload size={20} className="mx-auto text-text-muted mb-1" />
                    <p className="text-xs text-text-muted">Upload image</p>
                  </>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary text-sm">{editingId ? 'Update' : 'Create'}</button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="btn-secondary text-sm">Cancel</button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {categories.map((cat, i) => (
          <motion.div
            key={cat._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-white rounded-2xl border border-border p-4 group relative"
          >
            <div className="text-center">
              {cat.image ? (
                <div className="relative w-16 h-16 mx-auto rounded-xl overflow-hidden bg-cream mb-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cat.image.startsWith('/uploads') ? (process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5001') + cat.image : cat.image} alt={cat.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-16 h-16 mx-auto rounded-xl bg-cream flex items-center justify-center mb-2 text-text-muted">
                  <Grid3X3 size={24} />
                </div>
              )}
              <p className="text-sm font-semibold text-text-primary">{cat.name}</p>
              <p className="text-xs text-text-muted">{cat.slug}</p>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <button onClick={() => handleEdit(cat)} className="p-1.5 rounded-lg bg-white shadow-sm hover:bg-cream text-text-muted">
                <Edit size={12} />
              </button>
              <button onClick={() => handleDelete(cat._id)} className="p-1.5 rounded-lg bg-white shadow-sm hover:bg-danger-light text-text-muted hover:text-danger">
                <Trash2 size={12} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

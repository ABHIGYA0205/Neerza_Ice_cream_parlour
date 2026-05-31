'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Trash2, Plus, GripVertical, Image as ImageIcon, Upload, Check, X, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { bannerAPI, uploadAPI } from '@/lib/api';
import toast from 'react-hot-toast';

const sampleBanners = [
  { _id: 'b1', title: 'Summer Special', subtitle: 'Cool down with premium ice cream', image: '/images/icecream.jpeg', isActive: true },
  { _id: 'b2', title: 'Fresh Dairy Every Day', subtitle: 'Farm fresh products daily', image: '/images/amul.jpeg', isActive: true },
  { _id: 'b3', title: 'Chocolate Paradise', subtitle: 'Explore Amul chocolates', image: '/images/chocalates.jpeg', isActive: true },
];

export default function AdminBannersPage() {
  const [banners, setBanners] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', subtitle: '', image: '', link: '', isActive: true });

  const fetchBanners = async () => {
    try {
      const res = await bannerAPI.getAll(true); // get all including inactive if supported
      setBanners(res.data.banners || res.data);
    } catch (error) {
      toast.error('Failed to fetch banners');
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleToggle = async (id) => {
    const banner = banners.find(b => b._id === id);
    if (!banner) return;
    try {
      await bannerAPI.update(id, { isActive: !banner.isActive });
      setBanners(banners.map((b) => b._id === id ? { ...b, isActive: !b.isActive } : b));
      toast.success('Banner updated');
    } catch (error) {
      toast.error('Failed to update banner');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this banner?')) {
      try {
        await bannerAPI.delete(id);
        setBanners(banners.filter((b) => b._id !== id));
        toast.success('Banner deleted');
      } catch (error) {
        toast.error('Failed to delete banner');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.image) {
      toast.error('Title and image are required');
      return;
    }
    try {
      await bannerAPI.create(formData);
      toast.success('Banner created successfully');
      setFormData({ title: '', subtitle: '', image: '', link: '', isActive: true });
      setShowForm(false);
      fetchBanners();
    } catch (err) {
      toast.error('Failed to create banner');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.append('image', file);

    const toastId = toast.loading('Uploading image...');
    try {
      const res = await uploadAPI.single(fd);
      setFormData((prev) => ({ ...prev, image: res.data.url }));
      toast.success('Image uploaded successfully', { id: toastId });
    } catch (err) {
      toast.error('Failed to upload image', { id: toastId });
    }
  };

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-heading)]">Banners</h1>
          <p className="text-sm text-text-secondary">Manage homepage promotional banners</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} /> Add Banner
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-border p-5 mb-6">
          <div className="space-y-4 mb-4">
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">Title *</label>
              <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Banner title" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amul-red/20 focus:border-amul-red" required />
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">Subtitle</label>
              <input value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} placeholder="Short description" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amul-red/20 focus:border-amul-red" />
            </div>
            <label className="block border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-amul-red transition-colors cursor-pointer relative overflow-hidden">
              {formData.image ? (
                <div className="relative w-full h-32 rounded bg-cream">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') + formData.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <>
                  <Upload size={24} className="mx-auto text-text-muted mb-2" />
                  <p className="text-xs text-text-muted">Click to upload banner image</p>
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn-primary text-sm">Create Banner</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">Cancel</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {banners.map((banner, i) => (
          <motion.div
            key={banner._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-white rounded-2xl border border-border overflow-hidden ${!banner.isActive ? 'opacity-60' : ''}`}
          >
            <div className="relative aspect-[2/1]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={banner.image || '/images/amul.jpeg'} 
                alt={banner.title} 
                className="w-full h-full object-cover absolute inset-0" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <p className="text-base font-bold">{banner.title}</p>
                {banner.subtitle && <p className="text-xs opacity-80">{banner.subtitle}</p>}
              </div>
              {!banner.isActive && (
                <span className="absolute top-3 left-3 bg-gray-800/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  HIDDEN
                </span>
              )}
            </div>
            <div className="p-3 flex items-center justify-between">
              <span className={`text-xs font-semibold ${banner.isActive ? 'text-success' : 'text-text-muted'}`}>
                {banner.isActive ? '● Active' : '○ Inactive'}
              </span>
              <div className="flex gap-1">
                <button onClick={() => handleToggle(banner._id)} className="p-2 rounded-lg hover:bg-cream text-text-muted transition-colors">
                  {banner.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button onClick={() => handleDelete(banner._id)} className="p-2 rounded-lg hover:bg-danger-light text-text-muted hover:text-danger transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

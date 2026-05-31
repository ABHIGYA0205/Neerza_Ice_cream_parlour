'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { categoryAPI, productAPI, uploadAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '', description: '', price: '', discount: '0', quantity: '',
    brand: 'Amul', category: '', stock: '', availability: true,
    isFeatured: false, isBestSeller: false, isNewArrival: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          productAPI.getById(id),
          categoryAPI.getAll()
        ]);
        setProduct(prodRes.data);
        setCategories(catRes.data.categories || catRes.data);
      } catch (err) {
        toast.error('Failed to load product data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        discount: product.discount?.toString() || '0',
        quantity: product.quantity || '',
        brand: product.brand || 'Amul',
        category: product.category?._id || product.category?.name || '',
        stock: product.stock?.toString() || '',
        availability: product.availability ?? true,
        isFeatured: product.isFeatured || false,
        isBestSeller: product.isBestSeller || false,
        isNewArrival: product.isNewArrival || false,
      });
    }
  }, [product]);

  if (loading) {
    return (
      <div className="page-enter min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-amul-red border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page-enter min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Product Not Found</h2>
          <Link href="/admin/products" className="btn-primary text-sm mt-4 inline-block">Back to Products</Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      toast.error('Please fill required fields');
      return;
    }
    try {
      await productAPI.update(id, formData);
      toast.success('Product updated successfully!');
      router.push('/admin/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update product');
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
      // Assuming product uses 'images' array in backend
      setFormData((prev) => ({ ...prev, images: [res.data.url] }));
      setProduct((prev) => ({ ...prev, images: [res.data.url] }));
      toast.success('Image uploaded successfully', { id: toastId });
    } catch (err) {
      toast.error('Failed to upload image', { id: toastId });
    }
  };

  return (
    <div className="page-enter">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/products" className="p-2 rounded-full hover:bg-cream-dark transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-heading)]">Edit Product</h1>
          <p className="text-sm text-text-secondary">{product.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        {/* Current Image */}
        <div className="bg-white rounded-2xl border border-border p-5 mb-4">
          <h3 className="text-base font-semibold text-text-primary mb-4">Current Image</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-cream border border-border">
              <Image src={product.images?.[0] || '/images/icecream.jpeg'} alt={product.name} fill sizes="96px" className="object-cover" />
            </div>
            <label className="border-2 border-dashed border-border rounded-xl p-4 flex-1 text-center hover:border-primary transition-colors cursor-pointer relative overflow-hidden block">
              <Upload size={20} className="mx-auto text-text-muted mb-1" />
              <p className="text-xs text-text-muted">Click to replace image</p>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border p-5 mb-4">
          <h3 className="text-base font-semibold text-text-primary mb-4">Basic Info</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">Product Name *</label>
              <input name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" required />
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-text-primary mb-1 block">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white">
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary mb-1 block">Brand</label>
                <input name="brand" value={formData.brand} onChange={handleChange} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border p-5 mb-4">
          <h3 className="text-base font-semibold text-text-primary mb-4">Pricing & Stock</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">Price (INR) *</label>
              <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" required min="0" />
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">Discount (%)</label>
              <input name="discount" type="number" value={formData.discount} onChange={handleChange} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" min="0" max="100" />
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">Size / Quantity</label>
              <input name="quantity" value={formData.quantity} onChange={handleChange} placeholder="e.g. 500ml, 200g" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">Stock Count</label>
              <input name="stock" type="number" value={formData.stock} onChange={handleChange} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" min="0" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border p-5 mb-6">
          <h3 className="text-base font-semibold text-text-primary mb-4">Options</h3>
          <div className="space-y-3">
            {[
              { name: 'availability', label: 'Available for ordering', checked: formData.availability },
              { name: 'isFeatured', label: 'Featured product', checked: formData.isFeatured },
              { name: 'isBestSeller', label: 'Best seller', checked: formData.isBestSeller },
              { name: 'isNewArrival', label: 'New arrival', checked: formData.isNewArrival },
            ].map((opt) => (
              <label key={opt.name} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name={opt.name} checked={opt.checked} onChange={handleChange} className="w-4 h-4 accent-primary rounded" />
                <span className="text-sm text-text-primary">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="btn-primary flex-1 py-3 text-center flex items-center justify-center gap-2">
            <Save size={16} /> Save Changes
          </button>
          <Link href="/admin/products" className="btn-secondary flex-1 py-3 text-center">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

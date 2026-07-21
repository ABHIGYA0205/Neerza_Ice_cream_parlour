"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { uploadAPI, productAPI, categoryAPI } from "@/lib/api";
import toast from "react-hot-toast";
import Image from "next/image";

export default function NewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "0",
    quantity: "",
    brand: "Amul",
    category: "",
    stock: "",
    availability: true,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    images: [],
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryAPI
      .getAll()
      .then((res) => setCategories(res.data.categories || res.data))
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) {
      toast.error("Please fill required fields");
      return;
    }

    if (!formData.images.length) {
      toast.error("Please upload a product image");
      return;
    }
    try {
      console.log(formData);
      await productAPI.create(formData);
      toast.success("Product created successfully!");
      router.push("/admin/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create product");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("image", file);

    const toastId = toast.loading("Uploading image...");
    try {
      const res = await uploadAPI.single(fd);
      console.log("Cloudinary URL:", res.data.url);
      // Assuming product uses 'images' array in backend
      setFormData((prev) => ({ ...prev, images: [res.data.url] }));
      toast.success("Image uploaded successfully", { id: toastId });
    } catch (err) {
      toast.error("Failed to upload image", { id: toastId });
    }
  };

  return (
    <div className="page-enter">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/products"
          className="p-2 rounded-full hover:bg-cream-dark transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-heading)]">
            Add Product
          </h1>
          <p className="text-sm text-text-secondary">
            Create a new product listing
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-2xl border border-border p-5 mb-4">
          <h3 className="text-base font-semibold text-text-primary mb-4">
            Basic Info
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">
                Product Name *
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Amul Chocolate Cone"
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amul-red/20 focus:border-amul-red"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Product description..."
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amul-red/20 focus:border-amul-red resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-text-primary mb-1 block">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amul-red/20 focus:border-amul-red bg-white"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary mb-1 block">
                  Brand
                </label>
                <input
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Amul"
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amul-red/20 focus:border-amul-red"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border p-5 mb-4">
          <h3 className="text-base font-semibold text-text-primary mb-4">
            Pricing & Stock
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">
                Price (₹) *
              </label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amul-red/20 focus:border-amul-red"
                required
                min="0"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">
                Discount (%)
              </label>
              <input
                name="discount"
                type="number"
                value={formData.discount}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amul-red/20 focus:border-amul-red"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">
                Quantity/Size
              </label>
              <input
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g. 500ml, 200g"
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amul-red/20 focus:border-amul-red"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">
                Stock Count
              </label>
              <input
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amul-red/20 focus:border-amul-red"
                min="0"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border p-5 mb-4">
          <h3 className="text-base font-semibold text-text-primary mb-4">
            Product Image
          </h3>
          <label className="block border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-amul-red transition-colors cursor-pointer relative overflow-hidden">
            {formData.images?.[0] ? (
              <div className="relative w-full h-40 rounded bg-cream">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={formData.images[0]}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <>
                <Upload size={32} className="mx-auto text-text-muted mb-3" />
                <p className="text-sm font-medium text-text-primary mb-1">
                  Drop image here or click to upload
                </p>
                <p className="text-xs text-text-muted">
                  JPEG, PNG, WebP up to 5MB
                </p>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        <div className="bg-white rounded-2xl border border-border p-5 mb-6">
          <h3 className="text-base font-semibold text-text-primary mb-4">
            Options
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="availability"
                checked={formData.availability}
                onChange={handleChange}
                className="w-4 h-4 accent-amul-red rounded"
              />
              <span className="text-sm text-text-primary">
                Available for ordering
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 accent-amul-red rounded"
              />
              <span className="text-sm text-text-primary">
                Featured product
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isBestSeller"
                checked={formData.isBestSeller}
                onChange={handleChange}
                className="w-4 h-4 accent-amul-red rounded"
              />
              <span className="text-sm text-text-primary">Best seller</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isNewArrival"
                checked={formData.isNewArrival}
                onChange={handleChange}
                className="w-4 h-4 accent-amul-red rounded"
              />
              <span className="text-sm text-text-primary">New arrival</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="btn-primary flex-1 py-3 text-center">
            Create Product
          </button>
          <Link
            href="/admin/products"
            className="btn-secondary flex-1 py-3 text-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

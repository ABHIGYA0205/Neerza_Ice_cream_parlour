'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Heart, Minus, Plus, ShoppingCart, Share2, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice, getDiscountedPrice, getStockStatus } from '@/lib/utils';
import ProductCard from '@/components/products/ProductCard';
import { productAPI } from '@/lib/api';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart, getItemQty, updateQty } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showNutrition, setShowNutrition] = useState(false);

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await productAPI.getById(id);
        setProduct(data);
        
        // Fetch related products (same category)
        if (data.category?._id) {
          const relatedRes = await productAPI.getAll({ category: data.category._id, limit: 7 });
          const relatedProducts = relatedRes.data.products || relatedRes.data;
          setRelated(relatedProducts.filter(p => p._id !== data._id).slice(0, 6));
        }
      } catch (error) {
        console.error('Product not found');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-amul-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">😕</p>
          <h2 className="text-xl font-bold mb-2">Product Not Found</h2>
          <Link href="/products" className="btn-primary text-sm mt-4 inline-block">Back to Products</Link>
        </div>
      </div>
    );
  }

  const qty = getItemQty(product._id);
  const stockStatus = getStockStatus(product.stock, product.availability);
  const discountedPrice = getDiscountedPrice(product.price, product.discount);
  const isOutOfStock = stockStatus.color === 'danger';
  const wishlisted = isInWishlist(product._id);
  const images = product.images?.length ? product.images : ['/images/icecream.jpeg'];

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} at Neerza Amul Ice Cream Parlour!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch {
      // User cancelled share
    }
  };

  return (
    <div className="page-enter min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-4">
        {/* Back button */}
        <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-amul-red transition-colors mb-4">
          <ArrowLeft size={16} />
          <span>Back to Products</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-border mb-3">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {product.discount > 0 && (
                <span className="absolute top-3 left-3 bg-amul-red text-white text-xs font-bold px-3 py-1 rounded-full">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? 'border-amul-red' : 'border-border'
                    }`}
                  >
                    <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-col"
          >
            <span className={stockStatus.className + ' self-start mb-2'}>{stockStatus.label}</span>

            <h1 className="text-2xl md:text-3xl font-bold text-text-primary font-[family-name:var(--font-heading)] mb-1">
              {product.name}
            </h1>

            <p className="text-sm text-text-muted mb-4">
              {product.brand} · {product.quantity}
              {product.category?.name && ` · ${product.category.name}`}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-text-primary font-[family-name:var(--font-heading)]">
                {formatPrice(discountedPrice)}
              </span>
              {product.discount > 0 && (
                <>
                  <span className="text-lg text-text-muted line-through">{formatPrice(product.price)}</span>
                  <span className="text-sm text-amul-red font-semibold">Save {formatPrice(product.price - discountedPrice)}</span>
                </>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-sm text-text-secondary leading-relaxed mb-5 bg-cream rounded-xl p-4">
                {product.description}
              </p>
            )}

            {/* Nutrition Info */}
            {product.nutritionInfo && (
              <div className="mb-5">
                <button
                  onClick={() => setShowNutrition(!showNutrition)}
                  className="flex items-center justify-between w-full text-sm font-semibold text-text-primary py-3 border-t border-border"
                >
                  <span>Nutrition Information</span>
                  {showNutrition ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {showNutrition && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="grid grid-cols-2 gap-2"
                  >
                    {Object.entries(product.nutritionInfo).map(([key, value]) => (
                      value && (
                        <div key={key} className="bg-cream rounded-lg p-3 text-center">
                          <p className="text-xs text-text-muted capitalize">{key}</p>
                          <p className="text-sm font-semibold text-text-primary">{value}</p>
                        </div>
                      )
                    ))}
                  </motion.div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 mt-auto pt-4 border-t border-border">
              {!isOutOfStock ? (
                <>
                  {qty === 0 ? (
                    <button
                      onClick={handleAddToCart}
                      className="btn-primary flex-1 flex items-center justify-center gap-2 py-3"
                      id="product-detail-add-cart"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex items-center gap-2 bg-cream rounded-xl border border-border overflow-hidden">
                        <button
                          onClick={() => updateQty(product._id, qty - 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-cream-dark transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-base font-bold min-w-[32px] text-center">{qty}</span>
                        <button
                          onClick={() => updateQty(product._id, qty + 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-cream-dark transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <Link href="/cart" className="btn-primary flex-1 text-center py-3">
                        View Cart ({qty} items)
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <button disabled className="flex-1 py-3 rounded-xl bg-gray-200 text-gray-500 font-semibold cursor-not-allowed text-sm">
                  Out of Stock
                </button>
              )}

              <button
                onClick={() => { toggleWishlist(product); toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist'); }}
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${
                  wishlisted ? 'bg-amul-red-light border-amul-red' : 'bg-white border-border hover:border-amul-red'
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart size={20} className={wishlisted ? 'fill-amul-red text-amul-red' : 'text-text-muted'} />
              </button>

              <button
                onClick={handleShare}
                className="w-12 h-12 rounded-xl border border-border bg-white flex items-center justify-center hover:border-amul-red transition-colors"
                aria-label="Share product"
              >
                <Share2 size={18} className="text-text-muted" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-text-primary font-[family-name:var(--font-heading)] mb-5">
              Related Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {related.map((p, i) => (
                <ProductCard key={p._id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

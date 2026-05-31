'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice, getDiscountedPrice, getStockStatus } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart, getItemQty, updateQty } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const qty = getItemQty(product._id);
  const stockStatus = getStockStatus(product.stock, product.availability);
  const discountedPrice = getDiscountedPrice(product.price, product.discount);
  const isOutOfStock = stockStatus.color === 'danger';
  const wishlisted = isInWishlist(product._id);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4 }}
      className="product-card flex flex-col group"
    >
      {/* Image */}
      <Link href={`/products/${product._id}`} className="relative block aspect-square overflow-hidden bg-gradient-to-br from-primary-50 to-sky-light">
        <Image
          src={product.images?.[0] || '/images/icecream.jpeg'}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Discount badge */}
        {product.discount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="absolute top-2 left-2 bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm"
          >
            {product.discount}% OFF
          </motion.span>
        )}

        {/* Wishlist */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.15 }}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-all backdrop-blur-sm"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={14}
            className={`transition-colors ${wishlisted ? 'fill-danger text-danger' : 'text-text-muted'}`}
          />
        </motion.button>

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center">
            <span className="badge-out-of-stock text-xs px-3 py-1">Out of Stock</span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        {/* Stock badge */}
        <span className={stockStatus.className + ' self-start text-[10px]'}>
          {stockStatus.label}
        </span>

        {/* Name */}
        <Link href={`/products/${product._id}`}>
          <h3 className="text-sm font-semibold text-text-primary leading-tight line-clamp-2 hover:text-primary transition-colors font-[family-name:var(--font-heading)]">
            {product.name}
          </h3>
        </Link>

        {/* Quantity / Brand */}
        <p className="text-[11px] text-text-muted">
          {product.quantity && <span>{product.quantity}</span>}
          {product.quantity && product.brand && <span> · </span>}
          {product.brand && <span>{product.brand}</span>}
        </p>

        {/* Price + Cart */}
        <div className="flex items-end justify-between mt-auto pt-1">
          <div>
            <span className="text-base font-bold text-text-primary font-[family-name:var(--font-heading)]">
              {formatPrice(discountedPrice)}
            </span>
            {product.discount > 0 && (
              <span className="text-xs text-text-muted line-through ml-1">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Add to cart / quantity controls */}
          {!isOutOfStock && (
            <AnimatePresence mode="wait">
              {qty === 0 ? (
                <motion.button
                  key="add"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={handleAdd}
                  className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center hover:shadow-lg hover:shadow-primary/30 transition-shadow"
                  aria-label="Add to cart"
                  id={`add-to-cart-${product._id}`}
                >
                  <Plus size={16} />
                </motion.button>
              ) : (
                <motion.div
                  key="qty"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex items-center gap-1 bg-gradient-to-r from-primary to-secondary rounded-lg overflow-hidden shadow-md shadow-primary/20"
                >
                  <button
                    onClick={(e) => { e.preventDefault(); updateQty(product._id, qty - 1); }}
                    className="w-7 h-7 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <motion.span
                    key={qty}
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    className="text-white text-xs font-bold min-w-[16px] text-center"
                  >
                    {qty}
                  </motion.span>
                  <button
                    onClick={(e) => { e.preventDefault(); updateQty(product._id, qty + 1); }}
                    className="w-7 h-7 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </motion.div>
  );
}

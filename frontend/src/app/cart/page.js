'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice, getDiscountedPrice } from '@/lib/utils';
import { openWhatsAppOrder } from '@/lib/whatsapp';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQty, removeFromCart, clearCart } = useCart();
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      toast.error('Please enter your name and phone number');
      return;
    }
    if (customerPhone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    openWhatsAppOrder(items, customerName, customerPhone);
    setShowOrderModal(false);
    setOrderSuccess(true);
    clearCart();
  };

  // Order Success Screen
  if (orderSuccess) {
    return (
      <div className="page-enter min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-success-light flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-heading)] mb-3">
            Order Sent!
          </h2>
          <p className="text-sm text-text-secondary mb-6 leading-relaxed">
            Your order request has been sent to the store via WhatsApp. We will confirm product availability and get back to you shortly.
          </p>
          <div className="bg-cream rounded-2xl p-5 mb-6 text-left">
            <p className="text-xs text-text-muted mb-1">What happens next?</p>
            <ul className="text-sm text-text-secondary space-y-2">
              <li className="flex items-start gap-2"><span>1️⃣</span> Store confirms your order on WhatsApp</li>
              <li className="flex items-start gap-2"><span>2️⃣</span> Products are packed fresh for you</li>
              <li className="flex items-start gap-2"><span>3️⃣</span> Visit the store to pick up your order</li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/products" className="btn-primary w-full py-3 text-center">
              Continue Shopping 🛒
            </Link>
            <Link href="/" className="btn-secondary w-full py-3 text-center">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Empty Cart
  if (items.length === 0) {
    return (
      <div className="page-enter min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <p className="text-6xl mb-4">🛒</p>
          <h2 className="text-xl font-bold text-text-primary font-[family-name:var(--font-heading)] mb-2">
            Your cart is empty
          </h2>
          <p className="text-sm text-text-secondary mb-6">
            Browse our products and add your favorite dairy products & ice cream
          </p>
          <Link href="/products" className="btn-primary inline-block py-3 px-8">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <Link href="/products" className="p-2 rounded-full hover:bg-cream-dark transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-text-primary font-[family-name:var(--font-heading)]">
                My Cart
              </h1>
              <p className="text-xs text-text-secondary">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button
            onClick={() => { clearCart(); toast.success('Cart cleared'); }}
            className="text-xs text-amul-red font-semibold hover:underline"
          >
            Clear All
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex flex-col gap-3 mb-6">
          <AnimatePresence>
            {items.map((item) => {
              const price = getDiscountedPrice(item.price, item.discount);
              return (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  className="bg-white rounded-xl border border-border p-3 flex gap-3"
                >
                  {/* Image */}
                  <Link href={`/products/${item._id}`} className="relative w-20 h-20 rounded-lg overflow-hidden bg-cream shrink-0">
                    <Image
                      src={item.images?.[0] || '/images/icecream.jpeg'}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-text-primary truncate">{item.name}</h3>
                        <p className="text-xs text-text-muted">{item.quantity} · {item.brand}</p>
                      </div>
                      <button
                        onClick={() => { removeFromCart(item._id); toast.success('Removed from cart'); }}
                        className="p-1 text-text-muted hover:text-danger transition-colors shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-base font-bold text-text-primary font-[family-name:var(--font-heading)]">
                        {formatPrice(price * item.qty)}
                      </span>

                      <div className="flex items-center gap-1 bg-cream rounded-lg border border-border overflow-hidden">
                        <button
                          onClick={() => updateQty(item._id, item.qty - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-cream-dark transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-bold min-w-[24px] text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item._id, item.qty + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-cream-dark transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl border border-border p-5 mb-4">
          <h3 className="text-base font-semibold text-text-primary mb-3">Order Summary</h3>
          <div className="space-y-2 mb-4">
            {items.map((item) => {
              const price = getDiscountedPrice(item.price, item.discount);
              return (
                <div key={item._id} className="flex justify-between text-sm">
                  <span className="text-text-secondary truncate mr-2">{item.name} x {item.qty}</span>
                  <span className="text-text-primary font-medium shrink-0">{formatPrice(price * item.qty)}</span>
                </div>
              );
            })}
          </div>
          <div className="border-t border-border pt-3 flex justify-between items-center">
            <span className="text-base font-bold text-text-primary">Total Amount</span>
            <span className="text-xl font-bold text-amul-red font-[family-name:var(--font-heading)]">
              {formatPrice(totalPrice)}
            </span>
          </div>
        </div>

        {/* Order Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowOrderModal(true)}
          className="w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2 shadow-lg"
          style={{ background: '#25D366' }}
          id="order-whatsapp-btn"
        >
          <MessageCircle size={20} />
          Order on WhatsApp · {formatPrice(totalPrice)}
        </motion.button>
      </div>

      {/* WhatsApp Order Modal */}
      <AnimatePresence>
        {showOrderModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50"
              onClick={() => setShowOrderModal(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
                <h3 className="text-lg font-bold text-text-primary font-[family-name:var(--font-heading)] mb-1">
                  Complete Your Order
                </h3>
                <p className="text-sm text-text-secondary mb-6">
                  Enter your details and we&apos;ll send your order to WhatsApp
                </p>

                <form onSubmit={handleWhatsAppOrder}>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-sm font-medium text-text-primary mb-1 block">Your Name *</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amul-red/20 focus:border-amul-red bg-cream"
                        required
                        id="order-customer-name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-primary mb-1 block">Phone Number *</label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="Enter your mobile number"
                        className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amul-red/20 focus:border-amul-red bg-cream"
                        required
                        id="order-customer-phone"
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-cream rounded-xl p-4 mb-6">
                    <p className="text-xs text-text-muted mb-2">Order Summary</p>
                    {items.map((item) => (
                      <p key={item._id} className="text-sm text-text-primary">
                        {item.name} x {item.qty} = {formatPrice(getDiscountedPrice(item.price, item.discount) * item.qty)}
                      </p>
                    ))}
                    <p className="text-base font-bold text-text-primary mt-2 pt-2 border-t border-border">
                      Total: {formatPrice(totalPrice)}
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2"
                    style={{ background: '#25D366' }}
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Send Order via WhatsApp
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

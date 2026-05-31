'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Home, ShoppingBag, Grid3X3, MapPin, Phone } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/products', label: 'Products', icon: ShoppingBag },
    { href: '/#categories', label: 'Categories', icon: Grid3X3 },
    { href: '/#about', label: 'About', icon: MapPin },
    { href: '/#contact', label: 'Contact', icon: Phone },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 glass border-b border-border/50" style={{ boxShadow: 'var(--shadow-nav)' }}>
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <Image src="/images/logo.png" alt="Neerza Amul" width={100} height={36} className="h-8 w-auto object-contain transition-transform group-hover:scale-105" priority />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-0.5">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-xl hover:bg-primary-50 transition-colors"
              aria-label="Search"
              id="header-search-btn"
            >
              <Search size={20} className="text-text-secondary" />
            </motion.button>

            <Link
              href="/cart"
              className="p-2 rounded-xl hover:bg-primary-50 transition-colors relative group"
              aria-label="Cart"
              id="header-cart-btn"
            >
              <ShoppingCart size={20} className="text-text-secondary group-hover:text-primary transition-colors" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-primary/30"
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Mobile menu toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-primary-50 transition-colors"
              aria-label="Menu"
              id="header-menu-btn"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Search bar expandable */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-border/50"
            >
              <form onSubmit={handleSearch} className="max-w-7xl mx-auto px-4 py-3">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search ice cream, milk, butter, cheese..."
                    className="w-full pl-10 pr-4 py-2.5 bg-primary-50 border border-primary/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-text-muted"
                    autoFocus
                    id="search-input"
                  />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 w-72 h-full bg-white z-50 shadow-2xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <Image src="/images/logo.png" alt="Neerza Amul" width={100} height={36} className="h-8 w-auto" />
                  <motion.button whileTap={{ scale: 0.9, rotate: 90 }} onClick={() => setMenuOpen(false)} className="p-1">
                    <X size={24} />
                  </motion.button>
                </div>
                <nav className="flex flex-col gap-1 stagger-children">
                  {navLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 text-base font-medium text-text-primary hover:text-primary hover:bg-primary-50 rounded-xl transition-all py-3 px-3"
                      >
                        <Icon size={18} className="text-text-muted" />
                        {item.label}
                      </Link>
                    );
                  })}
                  <Link
                    href="/cart"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 text-base font-medium text-text-primary hover:text-primary hover:bg-primary-50 rounded-xl transition-all py-3 px-3"
                  >
                    <ShoppingCart size={18} className="text-text-muted" />
                    My Cart
                    {totalItems > 0 && (
                      <span className="ml-auto bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">{totalItems}</span>
                    )}
                  </Link>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid3X3, Search, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/products', icon: Grid3X3, label: 'Products' },
  { href: '/products?search=true', icon: Search, label: 'Search' },
  { href: '/#wishlist', icon: Heart, label: 'Wishlist' },
  { href: '/cart', icon: ShoppingCart, label: 'Cart' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50" style={{ boxShadow: '0 -4px 16px rgba(37,99,235,0.08)' }}>
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const isActive = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href.split('?')[0]) && tab.href !== '/';
          const Icon = tab.icon;

          return (
            <Link
              key={tab.label}
              href={tab.href}
              className="flex flex-col items-center justify-center gap-0.5 relative flex-1 py-1"
              id={`bottom-nav-${tab.label.toLowerCase()}`}
            >
              <motion.div
                className="relative"
                whileTap={{ scale: 0.85 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="bottomNavBg"
                    className="absolute -inset-1.5 bg-primary-light rounded-xl"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={22}
                  className={`relative z-10 transition-colors ${isActive ? 'text-primary' : 'text-text-muted'}`}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
                {tab.label === 'Cart' && totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-2 bg-gradient-to-r from-primary to-secondary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm"
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </motion.span>
                )}
              </motion.div>
              <span className={`text-[10px] font-medium relative z-10 ${isActive ? 'text-primary' : 'text-text-muted'}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

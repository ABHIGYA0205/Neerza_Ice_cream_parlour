'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

const WISHLIST_KEY = 'amul-wishlist';

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch (e) {
      console.error('Failed to load wishlist', e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  }, [items]);

  const toggleWishlist = (product) => {
    setItems((prev) => {
      const exists = prev.find((i) => i._id === product._id);
      if (exists) return prev.filter((i) => i._id !== product._id);
      return [...prev, product];
    });
  };

  const isInWishlist = (id) => items.some((i) => i._id === id);

  const removeFromWishlist = (id) => {
    setItems((prev) => prev.filter((i) => i._id !== id));
  };

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, isInWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
}

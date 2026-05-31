'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'amul-cart';

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

function calculateTotals(items) {
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = items.reduce((sum, item) => {
    const price = item.discount > 0
      ? Math.round(item.price * (1 - item.discount / 100))
      : item.price;
    return sum + price * item.qty;
  }, 0);
  return { totalItems, totalPrice };
}

function cartReducer(state, action) {
  let newItems;

  switch (action.type) {
    case 'LOAD_CART':
      return { ...action.payload };

    case 'ADD_TO_CART': {
      const existing = state.items.find((i) => i._id === action.payload._id);
      if (existing) {
        newItems = state.items.map((i) =>
          i._id === action.payload._id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        newItems = [...state.items, { ...action.payload, qty: 1 }];
      }
      return { items: newItems, ...calculateTotals(newItems) };
    }

    case 'REMOVE_FROM_CART':
      newItems = state.items.filter((i) => i._id !== action.payload);
      return { items: newItems, ...calculateTotals(newItems) };

    case 'UPDATE_QTY': {
      const { id, qty } = action.payload;
      if (qty <= 0) {
        newItems = state.items.filter((i) => i._id !== id);
      } else {
        newItems = state.items.map((i) =>
          i._id === id ? { ...i, qty } : i
        );
      }
      return { items: newItems, ...calculateTotals(newItems) };
    }

    case 'CLEAR_CART':
      return { ...initialState };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_CART', payload: parsed });
      }
    } catch (e) {
      console.error('Failed to load cart', e);
    }
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    if (state.items.length > 0 || localStorage.getItem(CART_STORAGE_KEY)) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQty = (id, qty) => {
    dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const getItemQty = (id) => {
    const item = state.items.find((i) => i._id === id);
    return item ? item.qty : 0;
  };

  return (
    <CartContext.Provider value={{
      ...state,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      getItemQty,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}

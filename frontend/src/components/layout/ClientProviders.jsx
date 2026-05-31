'use client';

import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import WhatsAppFAB from '@/components/layout/WhatsAppFAB';
import Footer from '@/components/layout/Footer';
import { usePathname } from 'next/navigation';

export default function ClientProviders({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 2000,
              style: {
                borderRadius: '12px',
                background: '#1A1A2E',
                color: '#fff',
                fontSize: '14px',
              },
            }}
          />
          {!isAdmin && <Header />}
          <main className={`flex-1 ${!isAdmin ? 'main-content' : ''}`}>
            {children}
          </main>
          {!isAdmin && <Footer />}
          {!isAdmin && <WhatsAppFAB />}
          {!isAdmin && <BottomNav />}
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  Package,
  Grid3X3,
  Image as ImageIcon,
  Warehouse,
  LogOut,
  Menu,
  X,
  Home,
} from 'lucide-react';
import { useState } from 'react';

const sidebarLinks = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/products', icon: Package, label: 'Products' },
  { href: '/admin/categories', icon: Grid3X3, label: 'Categories' },
  { href: '/admin/banners', icon: ImageIcon, label: 'Banners' },
  { href: '/admin/inventory', icon: Warehouse, label: 'Inventory' },
];

export default function AdminLayout({ children }) {
  const { user, loading, logout, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Skip auth check on login page
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!loading && !isLoginPage && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-amul-red border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-border flex-col fixed h-full z-30">
        <div className="p-5 border-b border-border">
          <Image src="/images/logo.png" alt="Neerza Amul" width={120} height={44} className="h-8 w-auto" />
          <p className="text-[10px] text-text-muted mt-1">Store Admin Panel</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-amul-red text-white'
                    : 'text-text-secondary hover:bg-cream hover:text-text-primary'
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:bg-cream hover:text-text-primary transition-colors"
          >
            <Home size={18} />
            View Store
          </Link>
          <button
            onClick={() => { logout(); router.push('/admin/login'); }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-danger hover:bg-danger-light transition-colors w-full"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-20 bg-white border-b border-border px-4 h-14 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2">
            <Menu size={20} />
          </button>
          <Image src="/images/logo.png" alt="Neerza Amul" width={100} height={36} className="h-7 w-auto" />
          <button onClick={() => { logout(); router.push('/admin/login'); }} className="p-2 text-danger">
            <LogOut size={18} />
          </button>
        </header>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <>
            <div className="lg:hidden fixed inset-0 bg-black/30 z-40" onClick={() => setSidebarOpen(false)} />
            <div className="lg:hidden fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-2xl">
              <div className="p-5 border-b border-border flex justify-between items-center">
                <Image src="/images/logo.png" alt="Neerza Amul" width={100} height={36} className="h-7 w-auto" />
                <button onClick={() => setSidebarOpen(false)}><X size={20} /></button>
              </div>
              <nav className="p-3 space-y-1">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-amul-red text-white'
                          : 'text-text-secondary hover:bg-cream'
                      }`}
                    >
                      <Icon size={18} />
                      {link.label}
                    </Link>
                  );
                })}
                <Link
                  href="/"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:bg-cream transition-colors"
                >
                  <Home size={18} />
                  View Store
                </Link>
              </nav>
            </div>
          </>
        )}

        {/* Page content */}
        <main className="p-4 md:p-6 max-w-6xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

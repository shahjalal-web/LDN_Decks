'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { VerifyAdmin } from '@/components/VerifyAdmin';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Wrench,
  FileText,
  MapPin,
  Camera,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Services', href: '/dashboard/services', icon: Wrench },
  { label: 'Blog', href: '/dashboard/blog', icon: FileText },
  { label: 'Showcase', href: '/dashboard/showcase', icon: Camera },
  { label: 'Cities', href: '/dashboard/cities', icon: MapPin },
  { label: 'Contacts', href: '/dashboard/contacts', icon: MessageSquare },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href);

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const SidebarContent = () => (
    <>
      {/* Branding */}
      <div className="px-6 py-6 flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
          style={{
            background: 'var(--accent)',
            color: 'var(--accent-foreground)',
          }}
        >
          LD
        </div>
        <div>
          <h1 className="text-base font-bold" style={{ color: 'var(--foreground)' }}>
            LDN Decks
          </h1>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            Admin Panel
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 mb-2" style={{ borderBottom: '1px solid var(--border)' }} />

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 flex flex-col gap-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: active ? 'var(--accent)' : 'transparent',
                color: active ? 'var(--accent-foreground)' : 'var(--muted-foreground)',
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = 'var(--muted)';
                  e.currentTarget.style.color = 'var(--foreground)';
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--muted-foreground)';
                }
              }}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
              {active && (
                <ChevronRight size={14} className="ml-auto" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-4">
        <div className="mx-1 mb-3" style={{ borderBottom: '1px solid var(--border)' }} />
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full transition-all duration-200 cursor-pointer"
          style={{ color: 'var(--muted-foreground)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--muted)';
            e.currentTarget.style.color = '#ef4444';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--muted-foreground)';
          }}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <VerifyAdmin>
    <div className="flex min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-64 shrink-0 fixed top-0 left-0 h-screen z-30"
        style={{
          background: 'var(--card)',
          borderRight: '1px solid var(--border)',
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Top Bar - sits below main navbar (80px) */}
      <div
        className="lg:hidden fixed left-0 right-0 z-40 flex items-center justify-between px-4 py-3"
        style={{
          top: '80px',
          background: 'var(--card)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-colors"
          style={{ color: 'var(--foreground)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--muted)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          <span className="text-sm font-semibold">
            {sidebarOpen ? 'Close Menu' : 'Dashboard Menu'}
          </span>
        </button>
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-[10px]"
            style={{
              background: 'var(--accent)',
              color: 'var(--accent-foreground)',
            }}
          >
            LD
          </div>
          <span className="font-bold text-xs" style={{ color: 'var(--muted-foreground)' }}>
            Admin
          </span>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-black"
              style={{ top: '132px' }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="lg:hidden fixed left-0 w-64 z-50 flex flex-col overflow-y-auto"
              style={{
                top: '132px',
                height: 'calc(100vh - 132px)',
                background: 'var(--card)',
                borderRight: '1px solid var(--border)',
              }}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        <div className="p-4 sm:p-6 lg:p-8 pt-[140px] lg:pt-8">
          {children}
        </div>
      </main>
    </div>
    </VerifyAdmin>
  );
}

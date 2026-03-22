'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { ShieldAlert } from 'lucide-react';

export function VerifyAdmin({ children }: { children: React.ReactNode }) {
  const { user, dbUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !dbUser || dbUser.role !== 'admin')) {
      router.replace('/login');
    }
  }, [user, dbUser, loading, router]);

  if (loading) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen gap-4"
        style={{ background: 'var(--background)' }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-10 h-10 rounded-full"
          style={{
            border: '3px solid var(--border)',
            borderTopColor: 'var(--accent)',
          }}
        />
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Verifying access...
        </p>
      </div>
    );
  }

  if (!user || !dbUser || dbUser.role !== 'admin') {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen gap-4"
        style={{ background: 'var(--background)' }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: 'color-mix(in srgb, #ef4444 12%, transparent)' }}
        >
          <ShieldAlert size={28} style={{ color: '#ef4444' }} />
        </div>
        <h2 className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>
          Access Denied
        </h2>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          You need admin privileges to access this page.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

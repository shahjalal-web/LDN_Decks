'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

interface PageHeroProps {
  badge?: string;
  title: string;
  highlight?: string;
  description: string;
  cta?: boolean;
}

export function PageHero({ badge, title, highlight, description, cta = true }: PageHeroProps) {
  const parts = highlight ? title.split(highlight) : [title];

  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--background) 0%, color-mix(in srgb, var(--accent) 6%, var(--background)) 100%)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.06 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full"
          style={{ backgroundColor: 'var(--accent)' }}
        />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {badge && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: 'var(--accent)' }}
          >
            {badge}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold mb-6 leading-tight"
          style={{ color: 'var(--foreground)' }}
        >
          {highlight ? (
            <>
              {parts[0]}
              <span style={{ color: 'var(--accent)' }}>{highlight}</span>
              {parts[1]}
            </>
          ) : (
            title
          )}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg leading-relaxed mb-8"
          style={{ color: 'var(--muted-foreground)' }}
        >
          {description}
        </motion.p>
        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contacts/"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--accent-foreground)',
                boxShadow: '0 4px 20px color-mix(in srgb, var(--accent) 35%, transparent)',
              }}
            >
              Get Free Estimate <ArrowRight size={16} />
            </Link>
            <a
              href="tel:+15716557207"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold border-2 transition-all duration-200 hover:scale-105"
              style={{ borderColor: 'var(--border)', color: 'var(--foreground)', backgroundColor: 'var(--card)' }}
            >
              <Phone size={16} /> (571) 655-7207
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun, Moon, Menu, X, ChevronDown, Phone, ArrowRight,
  Layers, Square, Droplets, Flower2, Fence, DoorOpen, Home, TreePine, MapPin
} from 'lucide-react';

const services = [
  { icon: Layers,   label: 'New Decks',         sub: 'Custom design & build',       href: '/services/new-decks-installation/' },
  { icon: Square,   label: 'Deck Resurfacing',   sub: 'Surface refresh & upgrade',   href: '/services/deck-resurfacing/' },
  { icon: Droplets, label: 'Outdoor Washing',    sub: 'Deck, siding & concrete',     href: '/services/outdoor-power-washing/' },
  { icon: Flower2,  label: 'Gazebo & Pergola',   sub: 'Shade structure builds',      href: '/services/gazebos-and-pergolas/' },
  { icon: Fence,    label: 'Fence',              sub: 'Privacy & security fencing',  href: '/services/fences/' },
  { icon: DoorOpen, label: 'Entry Doors',        sub: 'Install & replacement',       href: '/services/entry-doors/' },
  { icon: Home,     label: 'Porches',            sub: 'Front, open & screened',      href: '/services/porches/' },
  { icon: TreePine, label: 'Patios',             sub: 'Outdoor entertaining spaces', href: '/services/patios/' },
];

const counties = [
  { name: 'Loudoun County',       cities: ['Ashburn', 'Leesburg', 'Sterling', 'Aldie', 'Purcellville', 'Brambleton', 'South Riding', 'Broadlands'] },
  { name: 'Fairfax County',       cities: ['Fairfax', 'Reston', 'Herndon', 'McLean', 'Chantilly', 'Centreville', 'Alexandria', 'Great Falls'] },
  { name: 'Prince William County',cities: ['Woodbridge', 'Haymarket', 'Gainesville', 'Dumfries', 'Lake Ridge', 'Montclair'] },
];

const navLinks = [
  { label: 'About',    href: '/about-loudoun-deck-company/' },
  { label: 'Why Us',   href: '/why-choose-us/' },
  { label: 'Process',  href: '/our-process/' },
  { label: 'Showcase', href: '/deck-projects-showcase/' },
  { label: 'Blog',     href: '/blog-deck-tips/' },
];

function slugify(city: string) {
  return city.toLowerCase().replace(/\s+/g, '-');
}

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted]         = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeMenu, setActiveMenu]   = useState<'services' | 'near' | null>(null);
  const [scrolled, setScrolled]       = useState(false);
  const navRef                        = useRef<HTMLElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const toggle = (menu: 'services' | 'near') =>
    setActiveMenu(activeMenu === menu ? null : menu);

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled
            ? 'color-mix(in srgb, var(--background) 92%, transparent)'
            : 'var(--background)',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
          boxShadow: scrolled ? '0 1px 40px rgba(0,0,0,.08)' : 'none',
        }}
      >
        {/* ── top bar (phone strip) ─────────────────────────────────────────── */}
        <div
          className="hidden lg:flex items-center justify-end gap-6 px-8 py-1.5 text-xs font-medium border-b"
          style={{
            borderColor: 'var(--border)',
            color: 'var(--muted-foreground)',
            backgroundColor: 'color-mix(in srgb, var(--muted) 60%, transparent)',
          }}
        >
          <span>Mon–Fri 8AM–6PM &nbsp;|&nbsp; Sat 9AM–2PM</span>
          <a
            href="tel:+15716557207"
            className="flex items-center gap-1.5 font-semibold transition-colors hover:text-amber-500"
            style={{ color: 'var(--foreground)' }}
          >
            <Phone size={12} />
            +1 (571) 655-7207
          </a>
        </div>

        {/* ── main bar ──────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-15">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-1 select-none"
              onClick={() => setActiveMenu(null)}
            >
              <span
                className="text-2xl font-black tracking-tight"
                style={{ color: 'var(--accent)' }}
              >
                LDN
              </span>
              <span
                className="text-2xl font-black tracking-tight"
                style={{ color: 'var(--foreground)' }}
              >
                Decks
              </span>
              <span
                className="ml-2 hidden sm:inline text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                  color: 'var(--accent)',
                }}
              >
                LLC
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-4">

              {/* Services */}
              <button
                onMouseEnter={() => setActiveMenu('services')}
                onClick={() => toggle('services')}
                className="relative flex items-center gap-1 px-3.5 py-2 rounded-lg text-[13px] font-semibold transition-colors"
                style={{
                  color: activeMenu === 'services' ? 'var(--accent)' : 'var(--foreground)',
                  backgroundColor: activeMenu === 'services'
                    ? 'color-mix(in srgb, var(--accent) 8%, transparent)'
                    : 'transparent',
                }}
              >
                Services
                <ChevronDown
                  size={13}
                  className="transition-transform duration-200"
                  style={{ transform: activeMenu === 'services' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              {/* Near You */}
              <button
                onMouseEnter={() => setActiveMenu('near')}
                onClick={() => toggle('near')}
                className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-[13px] font-semibold transition-colors"
                style={{
                  color: activeMenu === 'near' ? 'var(--accent)' : 'var(--foreground)',
                  backgroundColor: activeMenu === 'near'
                    ? 'color-mix(in srgb, var(--accent) 8%, transparent)'
                    : 'transparent',
                }}
              >
                Near You
                <ChevronDown
                  size={13}
                  className="transition-transform duration-200"
                  style={{ transform: activeMenu === 'near' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              {/* Separator */}
              <span className="mx-1 h-4 w-px" style={{ backgroundColor: 'var(--border)' }} />

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setActiveMenu(null)}
                  className="px-3.5 py-2 ml-5 rounded-lg text-[13px] font-semibold transition-colors hover:text-amber-500"
                  style={{ color: 'var(--foreground)' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">

              {/* Theme toggle pill */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  aria-label="Toggle theme"
                  className="relative w-14 h-7 rounded-full flex items-center transition-all duration-300"
                  style={{
                    backgroundColor: theme === 'dark' ? 'var(--accent)' : 'var(--muted)',
                    padding: '3px',
                  }}
                >
                  <motion.div
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: 'var(--background)',
                      marginLeft: theme === 'dark' ? 'auto' : '0',
                    }}
                  >
                    {theme === 'dark'
                      ? <Moon size={11} style={{ color: 'var(--accent)' }} />
                      : <Sun  size={11} style={{ color: 'var(--muted-foreground)' }} />
                    }
                  </motion.div>
                </button>
              )}

              {/* CTA */}
              <Link
                href="/contacts/"
                className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-bold transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--accent-foreground)',
                  boxShadow: '0 2px 12px color-mix(in srgb, var(--accent) 30%, transparent)',
                }}
                onClick={() => setActiveMenu(null)}
              >
                Free Estimate
                <ArrowRight size={13} />
              </Link>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
                style={{ color: 'var(--foreground)', backgroundColor: 'var(--muted)' }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen
                    ? <motion.div key="x"   initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={18} /></motion.div>
                    : <motion.div key="ham" initial={{ rotate: 90, opacity: 0 }}  animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={18} /></motion.div>
                  }
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* ── Services mega-dropdown ─────────────────────────────────────────── */}
        <AnimatePresence>
          {activeMenu === 'services' && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              onMouseLeave={() => setActiveMenu(null)}
              className="hidden lg:block absolute left-0 right-0 border-b"
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                boxShadow: '0 20px 40px rgba(0,0,0,.12)',
              }}
            >
              <div className="max-w-screen-xl mx-auto px-8 py-8">
                <div className="grid grid-cols-4 gap-3">
                  {services.map(({ icon: Icon, label, sub, href }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                      style={{
                        borderColor: 'var(--border)',
                        backgroundColor: 'var(--background)',
                      }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors group-hover:scale-110 duration-200"
                        style={{
                          backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                          color: 'var(--accent)',
                        }}
                      >
                        <Icon size={17} />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold leading-tight mb-0.5" style={{ color: 'var(--foreground)' }}>
                          {label}
                        </p>
                        <p className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>
                          {sub}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    Serving 36+ cities across Northern Virginia
                  </p>
                  <Link
                    href="/services/"
                    onClick={() => setActiveMenu(null)}
                    className="flex items-center gap-1.5 text-xs font-bold transition-colors hover:text-amber-500"
                    style={{ color: 'var(--accent)' }}
                  >
                    View all services <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Near You mega-dropdown ─────────────────────────────────────────── */}
        <AnimatePresence>
          {activeMenu === 'near' && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              onMouseLeave={() => setActiveMenu(null)}
              className="hidden lg:block absolute left-0 right-0 border-b"
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                boxShadow: '0 20px 40px rgba(0,0,0,.12)',
              }}
            >
              <div className="max-w-screen-xl mx-auto px-8 py-8">
                <div className="grid grid-cols-3 gap-10">
                  {counties.map((c) => (
                    <div key={c.name}>
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin size={13} style={{ color: 'var(--accent)' }} />
                        <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                          {c.name}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                        {c.cities.map((city) => (
                          <Link
                            key={city}
                            href={`/top-decks-build-near-you/${slugify(city)}/`}
                            onClick={() => setActiveMenu(null)}
                            className="text-[12px] font-medium transition-colors hover:text-amber-500"
                            style={{ color: 'var(--muted-foreground)' }}
                          >
                            {city}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    Don&apos;t see your city? We likely serve your area — give us a call.
                  </p>
                  <Link
                    href="/top-decks-build-near-you/"
                    onClick={() => setActiveMenu(null)}
                    className="flex items-center gap-1.5 text-xs font-bold transition-colors hover:text-amber-500"
                    style={{ color: 'var(--accent)' }}
                  >
                    View all locations <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Mobile drawer ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 flex flex-col lg:hidden overflow-y-auto"
              style={{ backgroundColor: 'var(--background)', borderLeft: '1px solid var(--border)' }}
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-5 py-4 border-b shrink-0"
                style={{ borderColor: 'var(--border)' }}
              >
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-1">
                  <span className="text-xl font-black" style={{ color: 'var(--accent)' }}>LDN</span>
                  <span className="text-xl font-black" style={{ color: 'var(--foreground)' }}>Decks</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'var(--muted)', color: 'var(--foreground)' }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Drawer body */}
              <div className="flex-1 px-4 py-5 space-y-6">

                {/* Services section */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-3 px-1" style={{ color: 'var(--accent)' }}>
                    Services
                  </p>
                  <div className="space-y-1">
                    {services.map(({ icon: Icon, label, href }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors"
                        style={{ color: 'var(--foreground)' }}
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)', color: 'var(--accent)' }}
                        >
                          <Icon size={14} />
                        </div>
                        <span className="text-sm font-medium">{label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Page links */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-3 px-1" style={{ color: 'var(--accent)' }}>
                    Pages
                  </p>
                  <div className="space-y-1">
                    {[
                      { label: 'About Us', href: '/about-loudoun-deck-company/' },
                      { label: 'Why Choose Us', href: '/why-choose-us/' },
                      { label: 'Our Process', href: '/our-process/' },
                      { label: 'FAQ', href: '/faq-deck-building/' },
                      { label: 'Showcase', href: '/deck-projects-showcase/' },
                      { label: 'Blog', href: '/blog-deck-tips/' },
                      { label: 'Near You', href: '/top-decks-build-near-you/' },
                      { label: 'Contact', href: '/contacts/' },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:text-amber-500"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer footer */}
              <div className="px-4 pb-6 pt-4 space-y-3 border-t shrink-0" style={{ borderColor: 'var(--border)' }}>
                <a
                  href="tel:+15716557207"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold border-2 transition-colors"
                  style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                >
                  <Phone size={15} />
                  (571) 655-7207
                </a>
                <Link
                  href="/contacts/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold"
                  style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
                >
                  Get Free Estimate <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

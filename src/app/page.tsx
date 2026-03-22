'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, Phone, Star, Shield, Leaf, BadgeCheck,
  Layers, Droplets, Flower2, Fence, DoorOpen, Home, Square, TreePine,
  ChevronDown, Quote, CheckCircle2, Sparkles
} from 'lucide-react';

/* ─── Animated Counter ─────────────────────────────────────────────────────── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(to / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Fade-in on scroll ────────────────────────────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const dirMap = { up: [40, 0], down: [-40, 0], left: [0, 40], right: [0, -40] };
  const [y, x] = dirMap[direction] || [40, 0];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: direction === 'up' || direction === 'down' ? y : 0, x: direction === 'left' || direction === 'right' ? x : 0 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section Wrapper ──────────────────────────────────────────────────────── */
function Section({
  children,
  className = '',
  bg = 'var(--background)',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  bg?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`} style={{ backgroundColor: bg }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {children}
      </div>
    </section>
  );
}

/* ─── Section Header ───────────────────────────────────────────────────────── */
function SectionHeader({
  tag,
  title,
  description,
}: {
  tag: string;
  title: string;
  description?: string;
}) {
  return (
    <FadeIn className="text-center mb-16 md:mb-20">
      <span
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
          color: 'var(--accent)',
        }}
      >
        <Sparkles size={12} />
        {tag}
      </span>
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6"
        style={{ color: 'var(--foreground)' }}
      >
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
          {description}
        </p>
      )}
    </FadeIn>
  );
}

/* ─── Data ─────────────────────────────────────────────────────────────────── */
/* Icon map for services from DB */
type IconComponent = React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>;
const iconMap: Record<string, IconComponent> = {
  Layers, Square, Droplets, Flower2, Fence, DoorOpen, Home, TreePine,
};

/* Fallback services (shown while loading) */
const fallbackServices: { icon: IconComponent; label: string; desc: string; href: string; image: string }[] = [
  { icon: Layers, label: 'New Decks', desc: 'Custom designed and built decks tailored to your home and lifestyle.', href: '/services/new-decks-installation/', image: '' },
  { icon: Square, label: 'Deck Resurfacing', desc: 'Give your existing deck a fresh, modern look with premium materials.', href: '/services/deck-resurfacing/', image: '' },
  { icon: Droplets, label: 'Outdoor Washing', desc: 'Professional power washing for decks, siding & concrete surfaces.', href: '/services/outdoor-power-washing/', image: '' },
  { icon: Flower2, label: 'Gazebo & Pergola', desc: 'Elegant shade structures built with premium materials for outdoor comfort.', href: '/services/gazebos-and-pergolas/', image: '' },
  { icon: Fence, label: 'Fence', desc: 'Privacy, security, and style crafted for your outdoor space.', href: '/services/fences/', image: '' },
  { icon: DoorOpen, label: 'Entry Doors', desc: 'Boost curb appeal with a beautiful new entry door installation.', href: '/services/entry-doors/', image: '' },
  { icon: Home, label: 'Porches', desc: 'Front, open, and screened porch construction for year-round enjoyment.', href: '/services/porches/', image: '' },
  { icon: TreePine, label: 'Patios', desc: 'Custom patio design for relaxation and outdoor entertaining.', href: '/services/patios/', image: '' },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const stats = [
  { label: 'Projects Completed', value: 500, suffix: '+' },
  { label: 'Years Experience', value: 10, suffix: '+' },
  { label: 'Happy Clients', value: 480, suffix: '+' },
  { label: 'Cities Served', value: 36, suffix: '' },
];

const badges = [
  { icon: Shield, text: '2-Year Labor Warranty' },
  { icon: Leaf, text: 'Sustainable Materials' },
  { icon: BadgeCheck, text: 'Licensed Company' },
  { icon: Star, text: 'Free Estimates' },
];

const testimonials = [
  {
    name: 'Michael R.',
    location: 'Ashburn, VA',
    rating: 5,
    text: 'Loudoun Decks transformed our backyard completely. The team was professional, on time, and the quality exceeded our expectations.',
    source: 'Google',
  },
  {
    name: 'Sarah K.',
    location: 'Reston, VA',
    rating: 5,
    text: 'Outstanding craftsmanship! Our new composite deck looks amazing. The whole process from consultation to completion was smooth.',
    source: 'Thumbtack',
  },
  {
    name: 'James T.',
    location: 'Centreville, VA',
    rating: 5,
    text: 'Best deck builder in Northern Virginia. Clear communication, fair pricing, and beautiful results. Highly recommend!',
    source: 'Google',
  },
];

const partners = ['Trex', 'Fiberon', 'TimberTech', 'Veka', 'Versatex', 'Nexan'];

const processSteps = [
  { step: '01', title: 'Free Consultation', desc: 'Discuss your ideas and vision. We answer all your questions with no obligation.', icon: Phone },
  { step: '02', title: 'On-Site Visit', desc: 'We come to you, take measurements, and explore layout possibilities.', icon: Home },
  { step: '03', title: 'Project Review', desc: 'We define scope, timeline, and costs clearly before any work begins.', icon: CheckCircle2 },
  { step: '04', title: 'Construction', desc: 'Expert build with ongoing communication until your project is complete.', icon: Layers },
];

/* ═══════════════════════════════════════════════════════════════════════════ */

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    fetch(`${API_URL}/services`)
      .then(res => res.json())
      .then((data: { title: string; slug: string; description: string; icon?: string; image?: string; isActive: boolean }[]) => {
        const mapped = data
          .filter(s => s.isActive)
          .map(s => ({
            icon: (s.icon && iconMap[s.icon]) || Layers,
            label: s.title,
            desc: s.description,
            href: `/services/${s.slug}/`,
            image: s.image || '',
          }));
        if (mapped.length > 0) setServices(mapped);
      })
      .catch(() => { /* keep fallback */ });
  }, []);

  return (
    <div style={{ paddingTop: '80px' }}>

      {/* ═══ HERO ═══════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, var(--background) 0%, color-mix(in srgb, var(--accent) 6%, var(--background)) 50%, var(--background) 100%)',
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.06, scale: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="absolute -top-32 -right-32 w-175 h-175 rounded-full"
            style={{ backgroundColor: 'var(--accent)' }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            transition={{ duration: 2.5, delay: 0.3 }}
            className="absolute top-1/2 -left-32 w-125 h-125 rounded-full"
            style={{ backgroundColor: 'var(--accent)' }}
          />
          {/* Grid pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(color-mix(in srgb, var(--foreground) 4%, transparent) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left – Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold mb-8 border"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--accent) 8%, transparent)',
                  color: 'var(--accent)',
                  borderColor: 'color-mix(in srgb, var(--accent) 25%, transparent)',
                }}
              >
                <Star size={12} fill="currentColor" />
                Licensed & BBB Accredited Contractor
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] mb-7"
                style={{ color: 'var(--foreground)' }}
              >
                Your Vision,{' '}
                <span
                  className="relative inline-block"
                  style={{ color: 'var(--accent)' }}
                >
                  Our Expertise
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="absolute -bottom-1 left-0 right-0 h-1 rounded-full origin-left"
                    style={{ backgroundColor: 'var(--accent)', opacity: 0.3 }}
                  />
                </span>
                ,{' '}Perfect Outdoor Spaces
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-base sm:text-lg lg:text-xl mb-10 leading-relaxed max-w-xl"
                style={{ color: 'var(--muted-foreground)' }}
              >
                Northern Virginia&apos;s trusted outdoor living contractor. Custom decks, porches, patios, and more — built to last with sustainable materials.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/contacts/"
                  className="group inline-flex items-center justify-center gap-2.5 px-10 py-5 rounded-2xl text-base font-bold transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl active:scale-[0.98]"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--accent-foreground)',
                    boxShadow: '0 8px 30px color-mix(in srgb, var(--accent) 35%, transparent)',
                  }}
                >
                  Get Free Estimate
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="tel:+15716557207"
                  className="inline-flex items-center justify-center gap-2.5 px-10 py-5 rounded-2xl text-base font-bold border-2 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--foreground)',
                    backgroundColor: 'color-mix(in srgb, var(--card) 80%, transparent)',
                  }}
                >
                  <Phone size={18} />
                  (571) 655-7207
                </a>
              </motion.div>
            </div>

            {/* Right – Stats grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:grid grid-cols-2 gap-5"
            >
              {stats.map(({ label, value, suffix }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="p-8 rounded-3xl border backdrop-blur-sm"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--card) 70%, transparent)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <div className="text-4xl font-extrabold mb-2" style={{ color: 'var(--accent)' }}>
                    <Counter to={value} suffix={suffix} />
                  </div>
                  <p className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          style={{ color: 'var(--muted-foreground)' }}
        >
          <span className="text-xs font-medium tracking-wide">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ TRUST BAR ═════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: 'var(--accent)' }} className="py-5 md:py-6">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {badges.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center justify-center gap-2.5 text-sm font-semibold text-white py-2.5 px-4"
              >
                <Icon size={18} strokeWidth={2.5} />
                <span>{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MOBILE STATS (shown only on mobile since desktop has them in hero) ═══ */}
      <section className="py-16 lg:hidden" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 gap-5">
            {stats.map(({ label, value, suffix }, i) => (
              <FadeIn key={label} delay={i * 0.1}>
                <div
                  className="p-7 sm:p-8 rounded-2xl border text-center"
                  style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
                >
                  <div className="text-3xl sm:text-4xl font-extrabold mb-1" style={{ color: 'var(--accent)' }}>
                    <Counter to={value} suffix={suffix} />
                  </div>
                  <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>{label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ══════════════════════════════════════════════════════ */}
      <Section bg="var(--background)">
        <SectionHeader
          tag="What We Build"
          title="Our Services"
          description="From custom decks to full outdoor living spaces — we handle it all with precision, care, and premium materials."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {services.map(({ icon: Icon, label, desc, href, image }, i) => (
            <FadeIn key={label} delay={i * 0.06}>
              <Link
                href={href}
                className="group relative block rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl h-full"
                style={{
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  {image ? (
                    <Image
                      src={image}
                      alt={label}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)' }}
                    >
                      <Icon size={48} style={{ color: 'var(--accent)' }} />
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold mb-2" style={{ color: 'var(--foreground)' }}>{label}</h3>
                  <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--muted-foreground)' }}>{desc}</p>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-bold transition-all group-hover:gap-3"
                    style={{ color: 'var(--accent)' }}
                  >
                    Learn more <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-14">
          <Link
            href="/services/"
            className="group inline-flex items-center gap-2.5 px-10 py-5 rounded-2xl border-2 text-sm font-bold transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
            style={{
              borderColor: 'var(--accent)',
              color: 'var(--accent)',
            }}
          >
            View All Services
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeIn>
      </Section>

      {/* ═══ ABOUT / WHY US ════════════════════════════════════════════════ */}
      <Section bg="var(--muted)">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <FadeIn direction="left">
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                color: 'var(--accent)',
              }}
            >
              <Sparkles size={12} />
              About Us
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-7"
              style={{ color: 'var(--foreground)' }}
            >
              Northern Virginia&apos;s Premier{' '}
              <span style={{ color: 'var(--accent)' }}>Outdoor Living</span>{' '}
              Contractor
            </h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--muted-foreground)' }}>
              Loudoun Decks LLC is a licensed residential contractor specializing in functional, durable outdoor spaces across Northern Virginia. We bring clear communication, quality craftsmanship, and local expertise to every project.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted-foreground)' }}>
              From our first free consultation to the final nail, we&apos;re committed to delivering outdoor spaces that exceed your expectations and stand the test of time.
            </p>
            <Link
              href="/about-loudoun-deck-company/"
              className="group inline-flex items-center gap-2.5 text-sm font-bold transition-all"
              style={{ color: 'var(--accent)' }}
            >
              Learn more about us
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
            </Link>
          </FadeIn>

          <div className="grid grid-cols-2 gap-4 md:gap-5">
            {[
              { title: 'Free Consultation', desc: 'No obligation, no pressure. Just honest advice for your project.', icon: Phone },
              { title: '24-Hour Quote', desc: 'We deliver your estimate within one business day.', icon: CheckCircle2 },
              { title: 'Licensed & Insured', desc: 'Full peace of mind on every project we undertake.', icon: Shield },
              { title: 'Local Experts', desc: 'Deep roots in Northern Virginia since 2014.', icon: Star },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1} direction="right">
                <div
                  className="p-6 md:p-7 lg:p-8 rounded-3xl border h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                      color: 'var(--accent)',
                    }}
                  >
                    <item.icon size={18} />
                  </div>
                  <h3 className="font-bold mb-2.5 text-sm" style={{ color: 'var(--foreground)' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ PROCESS ═══════════════════════════════════════════════════════ */}
      <Section bg="var(--background)">
        <SectionHeader
          tag="How It Works"
          title="Our Simple Process"
          description="From first call to final walkthrough, we make building your outdoor space effortless."
        />

        <div className="grid md:grid-cols-4 gap-8 md:gap-6 relative">
          {/* Connecting line (desktop only) */}
          <div
            className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5"
            style={{
              background: 'linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 30%, transparent))',
            }}
          />

          {processSteps.map((item, i) => (
            <FadeIn key={item.step} delay={i * 0.12}>
              <div className="text-center relative flex flex-col items-center">
                <div
                  className="w-22 h-22 md:w-28 md:h-28 rounded-3xl flex items-center justify-center mb-7 relative z-10 transition-all duration-300 hover:scale-110 hover:shadow-xl"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--accent-foreground)',
                    boxShadow: '0 8px 25px color-mix(in srgb, var(--accent) 30%, transparent)',
                  }}
                >
                  <span className="text-2xl md:text-3xl font-extrabold">{item.step}</span>
                </div>
                <h3 className="font-bold text-lg mb-3" style={{ color: 'var(--foreground)' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed max-w-65" style={{ color: 'var(--muted-foreground)' }}>{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-14">
          <Link
            href="/our-process/"
            className="group inline-flex items-center gap-2.5 text-sm font-bold transition-all"
            style={{ color: 'var(--accent)' }}
          >
            Learn more about our process
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeIn>
      </Section>

      {/* ═══ TESTIMONIALS ══════════════════════════════════════════════════ */}
      <Section bg="var(--muted)">
        <SectionHeader
          tag="Client Reviews"
          title="What Our Clients Say"
          description="Don&rsquo;t just take our word for it — hear from homeowners who trusted us with their outdoor spaces."
        />

        <div className="grid md:grid-cols-3 gap-6 md:gap-7">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <div
                className="relative p-8 md:p-9 lg:p-10 rounded-3xl border h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
              >
                {/* Quote icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                    color: 'var(--accent)',
                  }}
                >
                  <Quote size={20} fill="currentColor" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} fill="currentColor" style={{ color: 'var(--accent)' }} />
                  ))}
                </div>

                <p className="text-sm sm:text-base leading-relaxed flex-1 mb-8" style={{ color: 'var(--foreground)' }}>
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>{t.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{t.location}</p>
                  </div>
                  <span
                    className="text-xs font-bold px-4 py-2 rounded-full"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                      color: 'var(--accent)',
                    }}
                  >
                    {t.source}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ═══ PARTNERS ══════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-16 border-t" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <FadeIn>
            <p
              className="text-center text-xs font-bold uppercase tracking-[0.2em] mb-10"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Trusted Partners & Premium Materials
            </p>
          </FadeIn>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 items-center">
            {partners.map((p, i) => (
              <FadeIn key={p} delay={i * 0.08}>
                <div
                  className="text-xl md:text-2xl font-extrabold tracking-wide transition-all duration-300 hover:scale-110"
                  style={{ color: 'var(--muted-foreground)', opacity: 0.5 }}
                >
                  {p}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ════════════════════════════════════════════════════ */}
      <section
        className="py-24 md:py-32 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 65%, #000) 100%)',
        }}
      >
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-20 -right-20 w-100 h-100 rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
          />
          <div
            className="absolute -bottom-10 -left-10 w-75 h-75 rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center relative z-10">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              Ready to Transform Your{' '}
              <span className="underline decoration-white/30 underline-offset-4">Outdoor Space</span>?
            </h2>
            <p className="text-base sm:text-lg text-white/75 mb-12 max-w-2xl mx-auto leading-relaxed">
              Get your free estimate today. No obligation, no pressure — just honest advice from local experts who care about your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacts/"
                className="group inline-flex items-center justify-center gap-2.5 px-10 py-5 rounded-2xl text-base font-bold bg-white transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl active:scale-[0.98]"
                style={{ color: 'var(--accent)' }}
              >
                Get Free Estimate
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="tel:+15716557207"
                className="inline-flex items-center justify-center gap-2.5 px-10 py-5 rounded-2xl text-base font-bold border-2 border-white/30 text-white transition-all duration-300 hover:bg-white/10 hover:border-white/50"
              >
                <Phone size={18} />
                (571) 655-7207
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

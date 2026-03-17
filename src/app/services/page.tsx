import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import Link from 'next/link';
import { ArrowRight, Layers, Square, Droplets, Flower2, Fence, DoorOpen, Home, TreePine } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Loudoun Decks offers a full range of outdoor living services in Northern Virginia — new decks, resurfacing, porches, patios, pergolas, fencing, and more.',
};

const services = [
  {
    icon: Layers,
    title: 'New Decks',
    desc: 'Custom designed and built decks tailored to your home\'s architecture and your lifestyle. We handle design, permits, and construction.',
    href: '/services/new-decks-installation/',
    highlights: ['Custom layout planning', 'Structural design', 'Permit handling', 'Premium materials'],
  },
  {
    icon: Square,
    title: 'Deck Resurfacing',
    desc: 'Give your existing deck a fresh, modern look without a full rebuild. Ideal when the structure is sound but the surface needs updating.',
    href: '/services/deck-resurfacing/',
    highlights: ['Surface assessment', 'New decking boards', 'Railing upgrades', 'Extends deck lifespan'],
  },
  {
    icon: Droplets,
    title: 'Outdoor Power Washing',
    desc: 'Professional power washing removes dirt, mold, algae, and stains from your outdoor surfaces, restoring them to their original beauty.',
    href: '/services/outdoor-power-washing/',
    highlights: ['Deck washing', 'House siding', 'Concrete surfaces', 'Fence cleaning & staining'],
  },
  {
    icon: Flower2,
    title: 'Gazebo & Pergola',
    desc: 'Add elegant shade and character to your outdoor space with a custom-built gazebo or pergola crafted from premium red cedar.',
    href: '/services/gazebos-and-pergolas/',
    highlights: ['Freestanding gazebos', 'Attached pergolas', 'Custom sizing', 'Cedar wood'],
  },
  {
    icon: Fence,
    title: 'Fence',
    desc: 'Privacy, security, and style for your outdoor space. We build a variety of fence styles to complement your home and landscape.',
    href: '/services/fences/',
    highlights: ['Privacy fencing', 'Decorative fencing', 'Various materials', 'Custom heights'],
  },
  {
    icon: DoorOpen,
    title: 'Entry Doors',
    desc: 'Boost curb appeal and home security with a beautiful new entry door. We handle both replacement and new installation.',
    href: '/services/entry-doors/',
    highlights: ['Replacement doors', 'New installation', 'Curb appeal boost', 'Energy efficient'],
  },
  {
    icon: Home,
    title: 'Porches',
    desc: 'Connect your indoor and outdoor living spaces with a custom-built front, open, or screened porch.',
    href: '/services/porches/',
    highlights: ['Front porch', 'Open porch', 'Screened porch', 'Custom design'],
  },
  {
    icon: TreePine,
    title: 'Patios',
    desc: 'Design a beautiful patio for relaxation and entertaining. We build standalone patios and integrated outdoor living spaces.',
    href: '/services/patios/',
    highlights: ['Custom design', 'Various materials', 'Standalone or integrated', 'Entertainment focused'],
  },
];

export default function ServicesPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <PageHero
        badge="What We Do"
        title="Our"
        highlight=" Services"
        description="From custom deck builds to full outdoor living renovations — Loudoun Decks handles it all with expert craftsmanship and premium materials."
      />

      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map(({ icon: Icon, title, desc, href, highlights }) => (
              <Link
                key={href}
                href={href}
                className="group p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex gap-6"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)' }}
                >
                  <Icon size={26} />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--foreground)' }}>{title}</h2>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>{desc}</p>
                  <ul className="grid grid-cols-2 gap-1 mb-4">
                    {highlights.map((h) => (
                      <li key={h} className="text-xs flex items-center gap-1.5" style={{ color: 'var(--muted-foreground)' }}>
                        <span style={{ color: 'var(--accent)' }}>✓</span> {h}
                      </li>
                    ))}
                  </ul>
                  <span className="text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: 'var(--accent)' }}>
                    Learn more <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { MapPin, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Deck Projects Showcase',
  description: 'Browse our portfolio of completed deck, porch, patio, and fence projects across Northern Virginia. See the quality of Loudoun Decks\' craftsmanship.',
};

const projects = [
  { title: 'Custom Deck Installation', location: 'Reston, VA', date: 'February 2025', category: 'New Deck', color: '#d97706' },
  { title: 'Deck & Balcony Resurfacing', location: 'Sterling, VA', date: 'December 2024', category: 'Resurfacing', color: '#059669' },
  { title: 'New Deck Building', location: 'Manassas, VA', date: 'November 2024', category: 'New Deck', color: '#d97706' },
  { title: 'Composite Deck', location: 'Ashburn, VA', date: 'October 2024', category: 'New Deck', color: '#d97706' },
  { title: 'Metal Fence Installation', location: 'Centreville, VA', date: 'February 2025', category: 'Fence', color: '#7c3aed' },
  { title: 'Balcony Reconstruction', location: 'Chantilly, VA', date: 'November 2024', category: 'Resurfacing', color: '#059669' },
  { title: 'Custom Wood Fencing', location: 'Ashburn, VA', date: 'October 2024', category: 'Fence', color: '#7c3aed' },
  { title: 'Rooftop Deck', location: 'Washington, DC', date: 'August 2024', category: 'New Deck', color: '#d97706' },
  { title: 'Multi-Level Wood Decks', location: 'Chantilly, VA', date: 'November 2024', category: 'New Deck', color: '#d97706' },
  { title: 'Multi-Level Deck Balconies', location: 'Alexandria, VA', date: 'July 2024', category: 'New Deck', color: '#d97706' },
  { title: 'Screened Porch Addition', location: 'Herndon, VA', date: 'September 2024', category: 'Porch', color: '#0891b2' },
  { title: 'Paver Patio Construction', location: 'Leesburg, VA', date: 'June 2024', category: 'Patio', color: '#be185d' },
];

const stats = [
  { label: 'Projects Completed', value: '500+' },
  { label: 'Years of Experience', value: '10+' },
  { label: 'Happy Clients', value: '480+' },
  { label: 'Cities Served', value: '36' },
];

export default function ShowcasePage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <PageHero
        badge="Our Work"
        title="Project"
        highlight=" Showcase"
        description="Browse our portfolio of completed outdoor living projects across Northern Virginia. Every project is built with care, precision, and premium materials."
      />

      {/* Stats */}
      <section style={{ backgroundColor: 'var(--accent)' }} className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {stats.map(({ label, value }) => (
              <div key={label}>
                <p className="text-3xl font-bold">{value}</p>
                <p className="text-sm text-white/80 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={`${project.title}-${project.location}`}
                className="rounded-2xl border overflow-hidden group"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
              >
                {/* Image Placeholder */}
                <div
                  className="h-48 flex items-center justify-center text-4xl font-bold text-white"
                  style={{ backgroundColor: project.color, opacity: 0.85 }}
                >
                  {project.category[0]}
                </div>
                <div className="p-5">
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: `${project.color}18`,
                      color: project.color,
                    }}
                  >
                    {project.category}
                  </span>
                  <h3 className="font-bold mt-3 mb-2" style={{ color: 'var(--foreground)' }}>
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {project.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-10" style={{ color: 'var(--foreground)' }}>
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Michael R.', loc: 'Ashburn, VA', text: 'Outstanding quality and professionalism. Our new deck exceeded all expectations.', src: 'Google' },
              { name: 'Sarah K.', loc: 'Reston, VA', text: 'The whole process from consultation to completion was smooth and stress-free.', src: 'Thumbtack' },
              { name: 'James T.', loc: 'Centreville, VA', text: 'Best deck builder in Northern Virginia. Clear communication, beautiful results.', src: 'Google' },
            ].map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl border text-left"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} style={{ color: 'var(--accent)' }}>★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--foreground)' }}>&ldquo;{t.text}&rdquo;</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>{t.name}</p>
                    <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{t.loc}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)', color: 'var(--accent)' }}>
                    {t.src}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

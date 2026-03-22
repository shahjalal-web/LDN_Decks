import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { ShowcaseGrid } from '@/components/ShowcaseGrid';
import { AnimatedSection } from '@/components/AnimatedSection';

interface Showcase {
  _id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  date: string;
  category: string;
  images: string[];
  service?: { _id: string; title: string; slug: string } | null;
  isPublished: boolean;
  order: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getShowcases(): Promise<Showcase[]> {
  try {
    const res = await fetch(`${API_URL}/showcases`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: 'Deck Projects Showcase | LDN Decks',
  description:
    'Browse our portfolio of completed deck, porch, patio, and fence projects across Northern Virginia. See the quality of Loudoun Decks\' craftsmanship.',
};

const stats = [
  { label: 'Projects Completed', value: '500+' },
  { label: 'Years of Experience', value: '10+' },
  { label: 'Happy Clients', value: '480+' },
  { label: 'Cities Served', value: '36' },
];

export default async function ShowcasePage() {
  const projects = await getShowcases();
  const published = projects.filter((p) => p.isPublished);

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

      {/* Showcase Grid with Client-Side Filtering */}
      <ShowcaseGrid projects={published} />

      {/* Testimonials */}
      <section className="py-16" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-2xl font-bold mb-10" style={{ color: 'var(--foreground)' }}>
              What Our Clients Say
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Michael R.',
                loc: 'Ashburn, VA',
                text: 'Outstanding quality and professionalism. Our new deck exceeded all expectations.',
                src: 'Google',
              },
              {
                name: 'Sarah K.',
                loc: 'Reston, VA',
                text: 'The whole process from consultation to completion was smooth and stress-free.',
                src: 'Thumbtack',
              },
              {
                name: 'James T.',
                loc: 'Centreville, VA',
                text: 'Best deck builder in Northern Virginia. Clear communication, beautiful results.',
                src: 'Google',
              },
            ].map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.1}>
                <div
                  className="p-6 rounded-2xl border text-left"
                  style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
                >
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <span key={si} style={{ color: 'var(--accent)' }}>
                        ★
                      </span>
                    ))}
                  </div>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: 'var(--foreground)' }}
                  >
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>
                        {t.name}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                        {t.loc}
                      </p>
                    </div>
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                        color: 'var(--accent)',
                      }}
                    >
                      {t.src}
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

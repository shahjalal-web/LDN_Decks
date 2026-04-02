import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { AnimatedSection } from '@/components/AnimatedSection';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Top Deck Builders Near You in Northern Virginia',
  description:
    'Loudoun Decks serves cities across Northern Virginia — Loudoun, Fairfax, and Prince William counties. Find your local deck builder.',
};

interface City {
  _id: string;
  name: string;
  slug: string;
  county: string;
  isActive: boolean;
  order: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getCities(): Promise<City[]> {
  try {
    const res = await fetch(`${API_URL}/cities`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function NearYouPage() {
  const cities = await getCities();
  const activeCities = cities
    .filter((c) => c.isActive)
    .sort((a, b) => a.order - b.order);

  // Group cities by county
  const countyMap = new Map<string, City[]>();
  for (const city of activeCities) {
    const existing = countyMap.get(city.county) || [];
    existing.push(city);
    countyMap.set(city.county, existing);
  }
  const counties = Array.from(countyMap.entries()).map(([name, list]) => ({
    name,
    cities: list,
  }));

  return (
    <div style={{ paddingTop: '80px' }}>
      <PageHero
        badge="Service Area"
        title="Deck Builders"
        highlight=" Near You"
        description="We serve cities across Northern Virginia. Find your local Loudoun Decks team and get a free estimate for your outdoor living project."
      />

      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {counties.length === 0 ? (
            <p
              className="text-center text-lg py-12"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Service areas coming soon. Please check back later.
            </p>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">
              {counties.map((county, countyIdx) => (
                <AnimatedSection key={county.name} delay={countyIdx * 0.1}>
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin size={20} style={{ color: 'var(--accent)' }} />
                    <h2
                      className="text-xl font-bold"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {county.name}
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {county.cities.map((city) => (
                      <Link
                        key={city._id}
                        href={`/top-decks-build-near-you/${city.slug}/`}
                        className="flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all hover:scale-105 hover:border-emerald-500"
                        style={{
                          backgroundColor: 'var(--card)',
                          borderColor: 'var(--border)',
                          color: 'var(--foreground)',
                        }}
                      >
                        {city.name}
                        <ArrowRight size={12} style={{ color: 'var(--accent)' }} />
                      </Link>
                    ))}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why local matters */}
      <section className="py-16" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: 'var(--foreground)' }}
            >
              Why Choose a Local Northern Virginia Contractor?
            </h2>
            <p
              className="leading-relaxed mb-8"
              style={{ color: 'var(--muted-foreground)' }}
            >
              We know Northern Virginia&apos;s building codes, weather patterns, HOA
              requirements, and permit processes. Our local expertise means your
              project gets done right, on time, and without surprises.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              {['Local permit knowledge', 'HOA-compliant designs', 'Same-week site visits'].map(
                (item) => (
                  <div
                    key={item}
                    className="px-4 py-3 rounded-xl border font-medium"
                    style={{
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)',
                      color: 'var(--foreground)',
                    }}
                  >
                    &#10003; {item}
                  </div>
                )
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Top Deck Builders Near You in Northern Virginia',
  description: 'Loudoun Decks serves over 36 cities across Northern Virginia — Loudoun, Fairfax, and Prince William counties. Find your local deck builder.',
};

const counties = [
  {
    name: 'Loudoun County',
    cities: ['Ashburn', 'Leesburg', 'Sterling', 'Aldie', 'Middleburg', 'Round Hill', 'Purcellville', 'Lovettsville', 'Hamilton', 'Waterford', 'Brambleton', 'South Riding', 'Stone Ridge', 'Broadlands'],
  },
  {
    name: 'Fairfax County',
    cities: ['Alexandria', 'Fairfax', 'Vienna', 'Reston', 'Herndon', 'McLean', 'Falls Church', 'Annandale', 'Burke', 'Springfield', 'Chantilly', 'Centreville', 'Oakton', 'Lorton', 'Tysons', 'Great Falls'],
  },
  {
    name: 'Prince William County',
    cities: ['Woodbridge', 'Quantico', 'Dumfries', 'Haymarket', 'Gainesville', 'Lake Ridge', 'Montclair'],
  },
];

function slugify(city: string) {
  return city.toLowerCase().replace(/\s+/g, '-');
}

export default function NearYouPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <PageHero
        badge="Service Area"
        title="Deck Builders"
        highlight=" Near You"
        description="We serve over 36 cities across Northern Virginia. Find your local Loudoun Decks team and get a free estimate for your outdoor living project."
      />

      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {counties.map((county) => (
              <div key={county.name}>
                <div className="flex items-center gap-2 mb-6">
                  <MapPin size={20} style={{ color: 'var(--accent)' }} />
                  <h2 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>{county.name}</h2>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {county.cities.map((city) => (
                    <Link
                      key={city}
                      href={`/top-decks-build-near-you/${slugify(city)}/`}
                      className="flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all hover:scale-105 hover:border-amber-500"
                      style={{
                        backgroundColor: 'var(--card)',
                        borderColor: 'var(--border)',
                        color: 'var(--foreground)',
                      }}
                    >
                      {city}
                      <ArrowRight size={12} style={{ color: 'var(--accent)' }} />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why local matters */}
      <section className="py-16" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            Why Choose a Local Northern Virginia Contractor?
          </h2>
          <p className="leading-relaxed mb-8" style={{ color: 'var(--muted-foreground)' }}>
            We know Northern Virginia&apos;s building codes, weather patterns, HOA requirements, and permit processes. Our local expertise means your project gets done right, on time, and without surprises.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            {['Local permit knowledge', 'HOA-compliant designs', 'Same-week site visits'].map((item) => (
              <div
                key={item}
                className="px-4 py-3 rounded-xl border font-medium"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

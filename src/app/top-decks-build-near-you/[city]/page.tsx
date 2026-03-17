import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

const cities = [
  'Ashburn', 'Leesburg', 'Sterling', 'Aldie', 'Middleburg', 'Round Hill', 'Purcellville',
  'Lovettsville', 'Hamilton', 'Waterford', 'Brambleton', 'South Riding', 'Stone Ridge', 'Broadlands',
  'Alexandria', 'Fairfax', 'Vienna', 'Reston', 'Herndon', 'McLean', 'Falls Church',
  'Annandale', 'Burke', 'Springfield', 'Chantilly', 'Centreville', 'Oakton', 'Lorton',
  'Tysons', 'Great Falls', 'Woodbridge', 'Quantico', 'Dumfries', 'Haymarket', 'Gainesville',
  'Lake Ridge', 'Montclair',
];

function formatCity(slug: string) {
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export function generateStaticParams() {
  return cities.map((city) => ({
    city: city.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const cityName = formatCity(city);
  return {
    title: `Deck Builder in ${cityName}, VA`,
    description: `Top-rated deck builder in ${cityName}, Virginia. Loudoun Decks offers custom decks, porches, patios, and more. Free estimate — call (571) 655-7207.`,
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityName = formatCity(city);

  return (
    <div style={{ paddingTop: '80px' }}>
      <PageHero
        badge={`Serving ${cityName}, VA`}
        title={`Deck Builder in`}
        highlight={` ${cityName}`}
        description={`Looking for a trusted deck builder in ${cityName}, Virginia? Loudoun Decks LLC is your local licensed contractor for custom decks, porches, patios, and more.`}
      />

      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
            Our Services in {cityName}
          </h2>
          <p className="leading-relaxed mb-8" style={{ color: 'var(--muted-foreground)' }}>
            Loudoun Decks LLC proudly serves homeowners in {cityName} and the surrounding Northern Virginia area. Whether you need a brand new custom deck, a deck resurfacing, a screened porch, or a full outdoor living renovation, our experienced team is ready to help.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {[
              'Custom Deck Building',
              'Deck Resurfacing',
              'Screened & Open Porches',
              'Gazebos & Pergolas',
              'Patio Construction',
              'Fence Installation',
              'Outdoor Power Washing',
              'Entry Door Installation',
            ].map((service) => (
              <div
                key={service}
                className="flex items-center gap-3 p-4 rounded-xl border"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <CheckCircle size={16} style={{ color: 'var(--accent)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{service}</span>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
            Why {cityName} Homeowners Choose Loudoun Decks
          </h2>
          <ul className="space-y-3 mb-10">
            {[
              `Over 10 years of experience serving ${cityName} and Northern Virginia`,
              'Licensed, insured, and BBB Accredited contractor',
              '2-year labor warranty on all projects',
              'Free on-site consultation and estimate within 24 hours',
              'Sustainable, premium materials from top brands',
              'Full permit handling — we take care of the paperwork',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                <span style={{ color: 'var(--accent)' }} className="mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contacts/"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
            >
              Get Free Estimate in {cityName} <ArrowRight size={16} />
            </Link>
            <a
              href="tel:+15716557207"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold border-2 transition-all hover:scale-105"
              style={{ borderColor: 'var(--border)', color: 'var(--foreground)', backgroundColor: 'var(--card)' }}
            >
              Call (571) 655-7207
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

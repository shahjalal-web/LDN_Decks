import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Shield, Clock, MessageCircle, Star, CheckCircle, Leaf } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Why Choose Us',
  description: 'Discover why Northern Virginia homeowners choose Loudoun Decks for their outdoor living projects. Licensed, insured, and committed to quality.',
};

const reasons = [
  {
    icon: MessageCircle,
    title: 'Clear Communication',
    desc: 'We keep you informed every step of the way. No surprises, no hidden costs — just transparent, honest communication from start to finish.',
  },
  {
    icon: Shield,
    title: '2-Year Labor Warranty',
    desc: 'We stand behind our work with a comprehensive 2-year labor warranty. Your investment is protected long after we finish.',
  },
  {
    icon: Clock,
    title: '24-Hour Quote',
    desc: 'We value your time. After your free consultation, you\'ll receive a detailed estimate within one business day.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Materials',
    desc: 'We use eco-friendly, sustainable materials from top brands like Trex, Fiberon, and TimberTech for a beautiful and responsible build.',
  },
  {
    icon: Star,
    title: 'Licensed & BBB Accredited',
    desc: 'Fully licensed in Virginia and BBB accredited — credentials that demonstrate our commitment to professional standards.',
  },
  {
    icon: CheckCircle,
    title: 'Free Estimates',
    desc: 'No-obligation, no-pressure free consultations and estimates for every homeowner in Northern Virginia.',
  },
];

export default function WhyChooseUsPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <PageHero
        badge="Why Choose Us"
        title="The Loudoun Decks"
        highlight=" Difference"
        description="We're not just deck builders — we're your neighbors. Here's why Northern Virginia homeowners trust us with their outdoor spaces."
      />

      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-8 rounded-2xl border"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)' }}
                >
                  <Icon size={26} />
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--foreground)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process snippet */}
      <section className="py-16" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            Our Commitment to You
          </h2>
          <p className="leading-relaxed mb-8" style={{ color: 'var(--muted-foreground)' }}>
            Every project starts with a free on-site visit where we listen to your vision, take measurements, and explore possibilities — all before asking you to commit to anything.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
            {['Free On-Site Visit', 'No Obligation Estimate', 'Clear Scope Before Work Begins', 'Dedicated Project Manager'].map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 px-4 py-2 rounded-full border"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}
              >
                <CheckCircle size={14} style={{ color: 'var(--accent)' }} /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

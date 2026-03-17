import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { ArrowRight, Users, Target, Heart, Award } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Loudoun Deck Company',
  description: 'Learn about Loudoun Decks LLC — Northern Virginia\'s licensed outdoor living contractor. Over 10 years of experience building custom decks, porches, and patios.',
};

const values = [
  { icon: Target, title: 'Clear Communication', desc: 'We keep you informed at every stage of your project, no surprises.' },
  { icon: Users, title: 'Local Focus', desc: 'We live and work in Northern Virginia — this community is our home.' },
  { icon: Heart, title: 'Quality Craftsmanship', desc: 'Every project is built with care, using sustainable premium materials.' },
  { icon: Award, title: 'Licensed & Insured', desc: 'Full licensing and insurance coverage for your complete peace of mind.' },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <PageHero
        badge="About Us"
        title="Building Outdoor Spaces"
        highlight=" Northern Virginia"
        description="Loudoun Decks LLC is a licensed residential contractor specializing in functional, durable outdoor spaces. With over 10 years of local experience, we bring expertise and passion to every project."
      />

      {/* Story */}
      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none">
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>Our Story</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>
              Founded in Centreville, Virginia, Loudoun Decks LLC was built on a simple principle: homeowners deserve an outdoor living contractor who listens, communicates clearly, and delivers results that last. We&apos;ve been serving Northern Virginia families for over a decade, transforming backyards into beautiful, functional outdoor spaces.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>
              Our team of skilled craftsmen specializes in custom deck building, deck resurfacing, porches, patios, pergolas, fencing, and more. We only use sustainable, high-quality materials from trusted brands like Trex, Fiberon, and TimberTech.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Every project begins with a free consultation and ends with a thorough walkthrough to ensure you&apos;re 100% satisfied. Our 2-year labor warranty backs up our commitment to quality.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--foreground)' }}>
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-2xl border text-center"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)' }}
                >
                  <Icon size={22} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: 'var(--foreground)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            Ready to Work Together?
          </h2>
          <p className="mb-8" style={{ color: 'var(--muted-foreground)' }}>
            Contact us for a free consultation — we promise to get back to you within 24 hours.
          </p>
          <Link
            href="/contacts/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
          >
            Get Free Estimate <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

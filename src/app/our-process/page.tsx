import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Process',
  description:
    'Learn about Loudoun Decks\' simple 4-step process — from free consultation to project completion. Clear, transparent, and stress-free.',
};

const steps = [
  {
    number: '01',
    title: 'Free Consultation',
    desc: 'Every project begins with a complimentary consultation. We discuss your ideas, answer questions, and review your outdoor space.',
    items: [
      'Discuss project ideas',
      'Answer all questions',
      'Explore material options',
      'Understand budget',
    ],
    image: 'https://ldndecks.com/wp-content/uploads/2024/12/loudoun-deck-deck-builders.jpeg',
  },
  {
    number: '02',
    title: 'On-Site Visit & Planning',
    desc: 'We schedule an on-site visit to review your space, take measurements, discuss layouts, and understand how the area will be used.',
    items: [
      'On-site measurements',
      'Property assessment',
      'Layout exploration',
      'Design recommendations',
    ],
    image:
      'https://ldndecks.com/wp-content/uploads/2024/10/father-with-toddler-son-building-wooden-frame-hous-2023-11-27-05-10-44-utc-1024x681.webp',
  },
  {
    number: '03',
    title: 'Project Review & Next Steps',
    desc: 'Details are outlined to clarify scope of work and help homeowners understand what to expect before construction.',
    items: [
      'Detailed written estimate',
      'Clear project timeline',
      'Material selection',
      'Contract signing',
    ],
    image: null,
  },
  {
    number: '04',
    title: 'Building the Outdoor Space',
    desc: 'Construction begins with focus on organization and homeowner communication throughout the build.',
    items: [
      'Permit handling',
      'Expert construction',
      'Daily progress updates',
      'Final walkthrough & warranty',
    ],
    image: null,
  },
];

const serviceAreas = [
  {
    county: 'Loudoun County',
    cities: [
      'Ashburn',
      'Leesburg',
      'Sterling',
      'South Riding',
      'Brambleton',
      'Aldie',
      'Purcellville',
      'Lovettsville',
    ],
  },
  {
    county: 'Fairfax County',
    cities: [
      'Centreville',
      'Chantilly',
      'Fairfax',
      'Reston',
      'Herndon',
      'Vienna',
      'Great Falls',
      'McLean',
      'Burke',
      'Springfield',
    ],
  },
  {
    county: 'Prince William County',
    cities: [
      'Gainesville',
      'Haymarket',
      'Bristow',
      'Manassas',
      'Woodbridge',
      'Lake Ridge',
    ],
  },
];

export default function OurProcessPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <PageHero
        badge="How It Works"
        title="Our Simple"
        highlight=" 4-Step Process"
        description="At Loudoun Decks, we follow a clear and structured process to help homeowners in Northern Virginia plan and build outdoor living projects with confidence."
      />

      {/* Intro Text */}
      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p
              className="text-lg sm:text-xl leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Starting an outdoor living project can feel overwhelming without a clear plan.
              Loudoun Decks uses a straightforward process designed to help homeowners understand
              each step before construction begins.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Steps */}
      <section className="py-8 pb-24" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {steps.map((step, i) => {
            const isEven = i % 2 === 0;
            const hasImage = !!step.image;

            return (
              <AnimatedSection key={step.number} delay={i * 0.1}>
                <div
                  className={`flex flex-col ${
                    hasImage
                      ? isEven
                        ? 'lg:flex-row'
                        : 'lg:flex-row-reverse'
                      : ''
                  } gap-12 items-center`}
                >
                  {/* Image side */}
                  {hasImage && (
                    <div className="w-full lg:w-1/2">
                      <div
                        className="relative rounded-2xl overflow-hidden border"
                        style={{
                          borderColor: 'var(--border)',
                          aspectRatio: '4 / 3',
                        }}
                      >
                        <Image
                          src={step.image!}
                          alt={step.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  )}

                  {/* Content side */}
                  <div className={hasImage ? 'w-full lg:w-1/2' : 'w-full max-w-3xl mx-auto'}>
                    {/* Step number badge */}
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0"
                        style={{
                          backgroundColor: 'var(--accent)',
                          color: 'var(--accent-foreground)',
                        }}
                      >
                        {step.number}
                      </div>
                      <div>
                        <p
                          className="text-xs font-bold uppercase tracking-widest mb-1"
                          style={{ color: 'var(--accent)' }}
                        >
                          Step {step.number}
                        </p>
                        <h2
                          className="text-2xl sm:text-3xl font-bold leading-tight"
                          style={{ color: 'var(--foreground)' }}
                        >
                          {step.title}
                        </h2>
                      </div>
                    </div>

                    <p
                      className="text-base leading-relaxed mb-6"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {step.desc}
                    </p>

                    <ul className="grid sm:grid-cols-2 gap-3">
                      {step.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 text-sm"
                          style={{ color: 'var(--foreground)' }}
                        >
                          <CheckCircle2
                            size={18}
                            className="shrink-0"
                            style={{ color: 'var(--accent)' }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: 'var(--accent)' }}
              >
                Where We Work
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold mb-4"
                style={{ color: 'var(--foreground)' }}
              >
                Serving Northern Virginia
              </h2>
              <p
                className="text-base leading-relaxed max-w-2xl mx-auto"
                style={{ color: 'var(--muted-foreground)' }}
              >
                We proudly serve homeowners across Loudoun, Fairfax, and Prince William counties
                and surrounding areas.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceAreas.map((area, i) => (
              <AnimatedSection key={area.county} delay={i * 0.1}>
                <div
                  className="p-6 rounded-2xl border h-full"
                  style={{
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin size={18} style={{ color: 'var(--accent)' }} />
                    <h3
                      className="text-lg font-bold"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {area.county}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {area.cities.map((city) => (
                      <li
                        key={city}
                        className="text-sm"
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: 'var(--accent)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              The first step is completely free and takes less than 30 minutes.
            </p>
            <Link
              href="/contacts/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-white transition-all duration-200 hover:scale-105"
              style={{ color: 'var(--accent)' }}
            >
              Schedule Free Consultation <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

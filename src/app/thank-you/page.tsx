import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Phone, Home, Wrench } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';

export const metadata: Metadata = {
  title: 'Thank You | LDN Decks',
  description:
    'Thank you for contacting Loudoun Decks. We have received your request and will get back to you within 24 hours.',
};

const nextSteps = [
  {
    icon: CheckCircle,
    title: 'Request Received',
    desc: 'Your estimate request has been successfully submitted and is now in our queue.',
  },
  {
    icon: Phone,
    title: 'We Will Reach Out',
    desc: 'A member of our team will contact you within 24 hours to discuss your project.',
  },
  {
    icon: Home,
    title: 'On-Site Visit',
    desc: "We'll schedule a free on-site visit to take measurements and assess your space.",
  },
];

export default function ThankYouPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero */}
      <section
        className="relative py-28 overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, var(--background) 0%, color-mix(in srgb, var(--accent) 6%, var(--background)) 100%)',
        }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.06]"
            style={{ backgroundColor: 'var(--accent)' }}
          />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <AnimatedSection>
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                color: 'var(--accent)',
              }}
            >
              <CheckCircle size={40} />
            </div>

            <h1
              className="text-4xl sm:text-5xl font-bold mb-6 leading-tight"
              style={{ color: 'var(--foreground)' }}
            >
              Thank You<span style={{ color: 'var(--accent)' }}>!</span>
            </h1>

            <p
              className="text-lg leading-relaxed mb-4"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Your estimate request has been received successfully. Our team will
              review your project details and get back to you within{' '}
              <strong style={{ color: 'var(--foreground)' }}>24 hours</strong>.
            </p>

            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Need immediate assistance? Call us at{' '}
              <a
                href="tel:+15716557207"
                className="font-bold transition-colors hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                (571) 655-7207
              </a>
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2
              className="text-2xl sm:text-3xl font-bold text-center mb-12"
              style={{ color: 'var(--foreground)' }}
            >
              What Happens Next?
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {nextSteps.map((step, i) => (
              <AnimatedSection key={step.title} delay={i * 0.15}>
                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{
                      backgroundColor:
                        'color-mix(in srgb, var(--accent) 12%, transparent)',
                      color: 'var(--accent)',
                    }}
                  >
                    <step.icon size={28} />
                  </div>
                  <div
                    className="text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: 'var(--accent)' }}
                  >
                    Step {i + 1}
                  </div>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {step.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Explore More */}
      <section className="py-20" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2
              className="text-2xl sm:text-3xl font-bold text-center mb-10"
              style={{ color: 'var(--foreground)' }}
            >
              While You Wait, Explore More
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: Wrench,
                title: 'Our Services',
                desc: 'Explore our full range of outdoor living services.',
                href: '/services/',
              },
              {
                icon: Home,
                title: 'Project Showcase',
                desc: 'See examples of our completed projects.',
                href: '/deck-projects-showcase/',
              },
              {
                icon: ArrowRight,
                title: 'Our Process',
                desc: 'Learn how we work from consultation to completion.',
                href: '/our-process/',
              },
            ].map((card, i) => (
              <AnimatedSection key={card.title} delay={i * 0.1}>
                <Link
                  href={card.href}
                  className="group block p-6 rounded-2xl border text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{
                      backgroundColor:
                        'color-mix(in srgb, var(--accent) 12%, transparent)',
                      color: 'var(--accent)',
                    }}
                  >
                    <card.icon size={22} />
                  </div>
                  <h3
                    className="font-bold mb-2"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-3"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {card.desc}
                  </p>
                  <span
                    className="text-xs font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                    style={{ color: 'var(--accent)' }}
                  >
                    Learn More <ArrowRight size={12} />
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Back Home CTA */}
      <section
        className="py-16"
        style={{
          background:
            'linear-gradient(135deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 70%, #000) 100%)',
        }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#fff' }}>
              Thank You for Choosing Loudoun Decks
            </h2>
            <p
              className="mb-8 text-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              We look forward to helping you create the perfect outdoor living
              space. Our team will be in touch soon.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-white transition-all hover:scale-105"
              style={{ color: 'var(--accent)' }}
            >
              Back to Home <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

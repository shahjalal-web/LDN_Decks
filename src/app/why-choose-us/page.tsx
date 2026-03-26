import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ArrowRight, Phone, MapPin, CheckCircle, Hammer, ClipboardList, Eye, Footprints } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Why Choose Us | Loudoun Decks',
  description:
    'Homeowners across Loudoun County, Fairfax County, and Prince William County choose Loudoun Decks for clear communication, local service, and well-planned outdoor living projects.',
};

const services = [
  'Custom deck construction',
  'Deck resurfacing',
  'Patios',
  'Porches',
  'Pergolas and gazebos',
];

const processSteps = [
  {
    icon: Phone,
    step: '01',
    title: 'Free Consultation',
    desc: 'Reach out by phone or through our website. We\u2019ll learn about your project goals, answer initial questions, and schedule an on-site visit at a time that works for you.',
  },
  {
    icon: Eye,
    step: '02',
    title: 'On-Site Visit',
    desc: 'We visit your property, take measurements, discuss design options, and review the scope of work together so there are no surprises down the road.',
  },
  {
    icon: Footprints,
    step: '03',
    title: 'Clear Next Steps',
    desc: 'You\u2019ll receive a detailed proposal with transparent pricing. Once approved, we schedule your project and keep you informed through every phase of the build.',
  },
];

const whyContact = [
  'Licensed and insured residential contractor in Virginia',
  'BBB accredited with a strong local reputation',
  'Dedicated to clear, honest communication at every stage',
  'Sustainable, high-quality materials from Trex, Fiberon, and TimberTech',
  'Over 10 years of experience in Northern Virginia',
  'Free, no-obligation consultations and estimates',
  '2-year labor warranty on every project',
];

const faqs = [
  {
    q: 'Why should I choose a local deck builder?',
    a: 'Working with a local builder helps ensure better communication and familiarity with the area. A local team understands regional building codes, HOA requirements, and the specific climate considerations for Northern Virginia outdoor projects.',
  },
  {
    q: 'What areas does Loudoun Decks serve?',
    a: 'We serve homeowners across Loudoun County, Fairfax County, and Prince William County \u2014 including Ashburn, Leesburg, Sterling, Centreville, Reston, Woodbridge, and Manassas.',
  },
  {
    q: 'Do you offer free consultations?',
    a: 'Yes. Every project begins with a free, no-obligation consultation where we discuss your vision, visit your property, and provide a transparent estimate \u2014 all before you commit to anything.',
  },
  {
    q: 'What types of projects do you handle?',
    a: 'We specialize in custom deck construction, deck resurfacing, patios, porches, and pergolas/gazebos. Whether you\u2019re building from scratch or upgrading an existing outdoor space, we can help.',
  },
];

export default function WhyChooseUsPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      {/* 1. Hero */}
      <PageHero
        badge="Why Choose Us"
        title="Why Choose"
        highlight=" Loudoun Decks"
        description="Homeowners across Loudoun County, Fairfax County, and Prince William County choose Loudoun Decks for clear communication, local service, and well-planned outdoor living projects."
      />

      {/* 2. A Local Deck Builder Focused on Northern Virginia */}
      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: 'var(--accent)' }}
                >
                  Local Expertise
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
                  A Local Deck Builder Focused on Northern Virginia
                </h2>
                <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>
                  Choosing the right deck builder matters. You want a team that understands your neighborhood, communicates clearly, and follows through on every detail. At Loudoun Decks, we&apos;ve spent over a decade building outdoor living spaces across Northern Virginia &mdash; and we treat every project like it&apos;s in our own backyard.
                </p>
                <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>
                  We know the local building codes, HOA requirements, and climate considerations that affect your project. That local expertise means fewer surprises, faster approvals, and a finished result that&apos;s built to last in our region.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  From the first phone call to the final walkthrough, our process is designed around clear communication and transparency. You&apos;ll always know what&apos;s happening, what&apos;s next, and what it costs.
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-3/2">
                <Image
                  src="https://ldndecks.com/wp-content/uploads/2024/10/father-with-toddler-son-building-wooden-frame-hous-2023-11-27-05-10-44-utc-1024x681.webp"
                  alt="Father and son building together - local deck builder in Northern Virginia"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 3. Mid-Page CTA Banner */}
      <section
        className="py-16"
        style={{
          background:
            'linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 80%, #000))',
        }}
      >
        <AnimatedSection>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--accent-foreground)' }}>
              Ready to Start Your Outdoor Living Project?
            </h2>
            <p className="text-base mb-8 opacity-90" style={{ color: 'var(--accent-foreground)' }}>
              Request a free, no-obligation quote and find out how we can transform your backyard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacts/"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: 'var(--accent-foreground)',
                  color: 'var(--accent)',
                }}
              >
                Request a Free Quote <ArrowRight size={16} />
              </Link>
              <a
                href="tel:+15716557207"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold border-2 transition-all duration-200 hover:scale-105"
                style={{
                  borderColor: 'var(--accent-foreground)',
                  color: 'var(--accent-foreground)',
                }}
              >
                <Phone size={16} /> (571) 655-7207
              </a>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* 4. We Serve Northern Virginia Homeowners */}
      <section className="py-20" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: 'var(--accent)' }}
              >
                Service Area
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
                We Serve Northern Virginia Homeowners
              </h2>
              <p className="max-w-2xl mx-auto text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                Our team works throughout the Northern Virginia region, bringing local expertise to every project.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
                    <MapPin size={18} style={{ color: 'var(--accent)' }} /> Counties We Serve
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['Loudoun County', 'Fairfax County', 'Prince William County'].map((county) => (
                      <span
                        key={county}
                        className="px-4 py-2 rounded-full text-sm font-medium border"
                        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
                      >
                        {county}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
                    <MapPin size={18} style={{ color: 'var(--accent)' }} /> Cities &amp; Communities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['Ashburn', 'Leesburg', 'Sterling', 'Centreville', 'Reston', 'Woodbridge', 'Manassas'].map((city) => (
                      <span
                        key={city}
                        className="px-4 py-2 rounded-full text-sm font-medium border"
                        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-2xl overflow-hidden aspect-4/5">
                  <Image
                    src="https://ldndecks.com/wp-content/uploads/2025/12/green-bay-deck-pros-new-deck-installation-1024x778.jpg"
                    alt="New deck installation in Northern Virginia"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-4/5">
                  <Image
                    src="https://ldndecks.com/wp-content/uploads/2025/12/window-installation-e1703188465924.jpg"
                    alt="Outdoor living project by Loudoun Decks"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 5. Outdoor Living Services We Provide */}
      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: 'var(--accent)' }}
              >
                Our Services
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
                Outdoor Living Services We Provide
              </h2>
              <p className="max-w-2xl mx-auto text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                From new builds to renovations, we offer a full range of outdoor living services for Northern Virginia homeowners.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {services.map((service) => (
                <div
                  key={service}
                  className="flex items-center gap-3 p-5 rounded-2xl border"
                  style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)' }}
                  >
                    <Hammer size={18} />
                  </div>
                  <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 6. A Straightforward Project Process */}
      <section className="py-20" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: 'var(--accent)' }}
              >
                How It Works
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
                A Straightforward Project Process
              </h2>
              <p className="max-w-2xl mx-auto text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                No complicated steps. Just a simple, transparent process designed to keep you informed and comfortable.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="space-y-6">
                {processSteps.map(({ icon: Icon, step, title, desc }) => (
                  <div
                    key={step}
                    className="flex gap-5 p-6 rounded-2xl border"
                    style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                        color: 'var(--accent)',
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--accent)' }}>
                        Step {step}
                      </p>
                      <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                        {title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden aspect-4/3">
                <Image
                  src="https://ldndecks.com/wp-content/uploads/2025/12/Decks-Unlimited-KY-Services-Deck-Design-Build-Composite-Decks-02.jpg"
                  alt="Composite deck design and build by Loudoun Decks"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 7. Why Homeowners Contact Loudoun Decks */}
      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: 'var(--accent)' }}
                >
                  The Loudoun Decks Difference
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold mb-8" style={{ color: 'var(--foreground)' }}>
                  Why Homeowners Contact Loudoun Decks
                </h2>
                <ul className="space-y-4">
                  {whyContact.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle
                        size={20}
                        className="shrink-0 mt-0.5"
                        style={{ color: 'var(--accent)' }}
                      />
                      <span className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="p-8 rounded-2xl border"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <ClipboardList size={32} className="mb-4" style={{ color: 'var(--accent)' }} />
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
                  Get Your Free Estimate
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
                  Ready to see what Loudoun Decks can do for your home? Contact us today for a free consultation. We&apos;ll visit your property, discuss your goals, and provide a transparent estimate &mdash; no pressure, no obligation.
                </p>
                <Link
                  href="/contacts/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--accent-foreground)',
                    boxShadow: '0 4px 20px color-mix(in srgb, var(--accent) 35%, transparent)',
                  }}
                >
                  Contact Us <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 8. Clear Communication From Start to Finish */}
      <section className="py-20" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-2xl overflow-hidden aspect-3/2">
                  <Image
                    src="https://ldndecks.com/wp-content/uploads/2025/12/deck_002-edited-1-1024x640.webp"
                    alt="Finished deck project showcasing quality craftsmanship"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-3/2">
                  <Image
                    src="https://ldndecks.com/wp-content/uploads/2025/11/8c294606-196f-433c-a918-e2fa2f6debab-1024x683.jpeg"
                    alt="Outdoor living space built by Loudoun Decks"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: 'var(--accent)' }}
                >
                  Our Promise
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
                  Clear Communication From Start to Finish
                </h2>
                <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>
                  We believe the best projects start with the best communication. From your first call to the final walkthrough, you&apos;ll always know exactly where your project stands.
                </p>
                <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>
                  Our team provides regular updates, answers your questions promptly, and ensures you&apos;re comfortable with every decision along the way. No surprises, no hidden costs &mdash; just honest, straightforward service.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  That commitment to transparency is what keeps Northern Virginia homeowners coming back to Loudoun Decks and recommending us to their neighbors.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: 'var(--accent)' }}
              >
                FAQ
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
                Frequently Asked Questions
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <details
                  key={q}
                  className="group rounded-2xl border overflow-hidden"
                  style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
                >
                  <summary
                    className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none text-base font-semibold select-none"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {q}
                    <span
                      className="shrink-0 text-xl leading-none transition-transform duration-200 group-open:rotate-45"
                      style={{ color: 'var(--accent)' }}
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      {a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16" style={{ backgroundColor: 'var(--muted)' }}>
        <AnimatedSection>
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Let&apos;s Build Something Together
            </h2>
            <p className="mb-8 text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Contact Loudoun Decks today for a free consultation. We&apos;ll visit your property, discuss your project, and provide a clear, honest estimate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacts/"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--accent-foreground)',
                  boxShadow: '0 4px 20px color-mix(in srgb, var(--accent) 35%, transparent)',
                }}
              >
                Get Free Estimate <ArrowRight size={16} />
              </Link>
              <a
                href="tel:+15716557207"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold border-2 transition-all duration-200 hover:scale-105"
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)', backgroundColor: 'var(--card)' }}
              >
                <Phone size={16} /> (571) 655-7207
              </a>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}

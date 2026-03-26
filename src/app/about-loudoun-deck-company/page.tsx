import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ArrowRight, Users, Target, Heart, Award, Hammer, Layers, Home, Fence, TreePine, MapPin, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Loudoun Deck Company',
  description: 'Learn about Loudoun Decks — a Northern Virginia outdoor living company specializing in deck construction, patios, porches, and pergolas. Free consultations available.',
};

const services = [
  { icon: Hammer, label: 'Custom deck construction' },
  { icon: Layers, label: 'Deck resurfacing' },
  { icon: Home, label: 'Patios' },
  { icon: Fence, label: 'Porches' },
  { icon: TreePine, label: 'Pergolas and gazebos' },
];

const values = [
  { icon: Target, title: 'Clear Communication', desc: 'Every project starts with a detailed conversation. We keep you informed from the first consultation through the final walkthrough — no surprises, no guesswork.' },
  { icon: Users, title: 'Local Focus', desc: 'We live and work in Northern Virginia. We understand local building codes, HOA requirements, and what works best for the climate in this region.' },
  { icon: Heart, title: 'Quality Craftsmanship', desc: 'We build every deck, patio, and porch with lasting durability in mind, using premium materials from trusted manufacturers.' },
  { icon: Award, title: 'Licensed & Insured', desc: 'Full licensing and insurance coverage means complete peace of mind for you and your family throughout the entire project.' },
];

const faqs = [
  {
    q: 'What type of company is Loudoun Decks?',
    a: 'Loudoun Decks is an outdoor living company specializing in deck construction and related outdoor projects, including patios, porches, and pergolas.',
  },
  {
    q: 'Where does Loudoun Decks operate?',
    a: 'We serve Loudoun County, Fairfax County, and Prince William County in Northern Virginia, including communities like Ashburn, Leesburg, Sterling, Centreville, Reston, Woodbridge, and Manassas.',
  },
  {
    q: 'What services are provided?',
    a: 'We build custom decks, provide deck resurfacing, and construct patios, porches, and pergolas or gazebos for homeowners across Northern Virginia.',
  },
  {
    q: 'Are free consultations available?',
    a: 'Yes. We offer free consultations for homeowners considering an outdoor living project. During the consultation, we take precise measurements and discuss your goals to prepare a detailed quote.',
  },
];

const counties = ['Loudoun County', 'Fairfax County', 'Prince William County'];
const cities = ['Ashburn', 'Leesburg', 'Sterling', 'Centreville', 'Reston', 'Woodbridge', 'Manassas'];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <PageHero
        badge="About Us"
        title="Loudoun Deck Company: Quality Outdoor Solutions"
        highlight=" Quality Outdoor Solutions"
        description="Loudoun Decks is a local outdoor living company serving Northern Virginia homeowners with expert deck construction, patios, porches, and more. We bring clear communication and quality craftsmanship to every project."
      />

      {/* Who We Are */}
      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <Image
                  src="https://ldndecks.com/wp-content/uploads/2024/12/installing-wood-floor-for-patio-deck-with-new-wooden-decking-fragment-planks.jpg"
                  alt="Installing wood floor for a patio deck with new wooden decking planks"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: 'var(--accent)' }}
              >
                Who We Are
              </p>
              <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
                A Northern Virginia Outdoor Living Company
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>
                Loudoun Decks is a Northern Virginia&ndash;based company specializing in deck construction and outdoor living projects. We focus on clear communication and straightforward project planning from consultation through construction.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                Our team works directly with homeowners to understand their vision, take precise measurements, and deliver a finished product that meets both functional needs and personal style.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: 'var(--accent)' }}
              >
                What We Do
              </p>
              <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--foreground)' }}>
                Our Services
              </h2>
              <div className="space-y-4">
                {services.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 p-4 rounded-xl border"
                    style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)' }}
                    >
                      <Icon size={20} />
                    </div>
                    <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{label}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2' }}>
                <Image
                  src="https://ldndecks.com/wp-content/uploads/2024/12/builder-wearing-vest-an-helmet-sitting-holding-hammer-beating-nail-in-wooden-decking--1024x683.jpg"
                  alt="Builder wearing vest and helmet installing wooden decking"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How We Approach Every Project */}
      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: 'var(--accent)' }}
              >
                Our Process
              </p>
              <h2 className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
                How We Approach Every Project
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <Image
                  src="https://ldndecks.com/wp-content/uploads/2025/12/27-Jun-12-2024-11_33am-5U6e-1024x768.jpg"
                  alt="Loudoun Decks project consultation and measurement process"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
                  >
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                      Free Consultation
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      We visit your property, discuss your goals, and take precise measurements to understand exactly what your project requires. There is no cost and no obligation.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
                  >
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                      24-Hour Quote Delivery
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      Within 24 hours of your consultation, you receive a detailed, personalized quote that outlines materials, timeline, and cost — so you can make an informed decision.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
                  >
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                      Build &amp; Final Walkthrough
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      Once approved, our team gets to work. We keep you updated throughout construction and finish with a walkthrough to make sure everything meets your expectations.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Serving Northern Virginia */}
      <section className="py-20" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: 'var(--accent)' }}
              >
                Service Area
              </p>
              <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
                Serving Northern Virginia
              </h2>
              <p className="text-base max-w-2xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
                We proudly serve homeowners across Northern Virginia, delivering quality outdoor living projects throughout the region.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AnimatedSection>
              <div
                className="p-6 rounded-2xl border"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)' }}
                  >
                    <MapPin size={20} />
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>Counties</h3>
                </div>
                <ul className="space-y-2">
                  {counties.map((county) => (
                    <li
                      key={county}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: 'var(--accent)' }}
                      />
                      {county}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div
                className="p-6 rounded-2xl border"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)' }}
                  >
                    <MapPin size={20} />
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>Cities &amp; Communities</h3>
                </div>
                <ul className="space-y-2">
                  {cities.map((city) => (
                    <li
                      key={city}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: 'var(--accent)' }}
                      />
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Homeowners Choose Loudoun Decks */}
      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: 'var(--accent)' }}
              >
                Why Us
              </p>
              <h2 className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
                Why Homeowners Choose Loudoun Decks
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <AnimatedSection key={title} delay={i * 0.1}>
                <div
                  className="p-6 rounded-2xl border text-center h-full"
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
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: 'var(--accent)' }}
              >
                FAQ
              </p>
              <h2 className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
                About Loudoun Decks FAQs
              </h2>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="space-y-3">
              {faqs.map(({ q, a }) => (
                <details
                  key={q}
                  className="group rounded-xl border overflow-hidden"
                  style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
                >
                  <summary
                    className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-semibold text-sm select-none"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {q}
                    <ChevronDown
                      size={18}
                      className="flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                      style={{ color: 'var(--muted-foreground)' }}
                    />
                  </summary>
                  <div
                    className="px-5 pb-5 text-sm leading-relaxed"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {a}
                  </div>
                </details>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Ready to Work Together?
            </h2>
            <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
              Contact us for a free consultation. We will visit your property, take measurements, and deliver a detailed quote within 24 hours.
            </p>
            <Link
              href="/contacts/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--accent-foreground)',
                boxShadow: '0 4px 20px color-mix(in srgb, var(--accent) 35%, transparent)',
              }}
            >
              Get Free Estimate <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

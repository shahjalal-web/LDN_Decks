import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/PageHero';
import { AnimatedSection } from '@/components/AnimatedSection';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Hammer } from 'lucide-react';

interface City {
  _id: string;
  name: string;
  slug: string;
  county: string;
  isActive: boolean;
  order: number;
}

interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  icon?: string;
  features: string[];
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

async function getServices(): Promise<Service[]> {
  try {
    const res = await fetch(`${API_URL}/services`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  const cities = await getCities();
  return cities
    .filter((c) => c.isActive)
    .map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const cities = await getCities();
  const city = cities.find((c) => c.slug === slug);
  const cityName = city?.name || slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return {
    title: `Deck Builder in ${cityName}, VA`,
    description: `Top-rated deck builder in ${cityName}, Virginia. Loudoun Decks offers custom decks, porches, patios, and more. Free estimate — call (571) 655-7207.`,
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const [cities, services] = await Promise.all([getCities(), getServices()]);

  const city = cities.find((c) => c.slug === slug);
  if (!city) notFound();

  const cityName = city.name;
  const activeServices = services
    .filter((s) => s.isActive)
    .sort((a, b) => a.order - b.order);

  return (
    <div style={{ paddingTop: '80px' }}>
      <PageHero
        badge={`Serving ${cityName}, VA`}
        title="Deck Builder in"
        highlight={` ${cityName}`}
        description={`Looking for a trusted deck builder in ${cityName}, Virginia? Loudoun Decks LLC is your local licensed contractor for custom decks, porches, patios, and more.`}
      />

      {/* Services Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2
              className="text-2xl font-bold mb-3"
              style={{ color: 'var(--foreground)' }}
            >
              Our Services in {cityName}
            </h2>
            <p
              className="leading-relaxed mb-10 max-w-3xl"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Loudoun Decks LLC proudly serves homeowners in {cityName} and the
              surrounding Northern Virginia area. Whether you need a brand new
              custom deck, a deck resurfacing, a screened porch, or a full outdoor
              living renovation, our experienced team is ready to help.
            </p>
          </AnimatedSection>

          {activeServices.length === 0 ? (
            <p
              className="text-center text-lg py-12"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Services coming soon. Please check back later.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {activeServices.map((service, idx) => (
                <AnimatedSection key={service._id} delay={idx * 0.08}>
                  <Link
                    href={`/services/${service.slug}/`}
                    className="group rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col sm:flex-row h-full"
                    style={{
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    {/* Image / Icon placeholder */}
                    <div className="relative sm:w-50 h-45 sm:h-auto shrink-0 overflow-hidden">
                      {service.image ? (
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 200px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{
                            backgroundColor:
                              'color-mix(in srgb, var(--accent) 12%, transparent)',
                          }}
                        >
                          <Hammer size={48} style={{ color: 'var(--accent)' }} />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <h3
                        className="text-lg font-bold mb-2"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {service.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed mb-4 line-clamp-3"
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        {service.description}
                      </p>

                      {service.features && service.features.length > 0 && (
                        <ul className="grid grid-cols-2 gap-1.5 mb-4">
                          {service.features.slice(0, 4).map((feature) => (
                            <li
                              key={feature}
                              className="text-xs flex items-start gap-1.5"
                              style={{ color: 'var(--muted-foreground)' }}
                            >
                              <CheckCircle
                                size={13}
                                className="shrink-0 mt-0.5"
                                style={{ color: 'var(--accent)' }}
                              />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}

                      <span
                        className="text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all"
                        style={{ color: 'var(--accent)' }}
                      >
                        Learn more <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: 'var(--foreground)' }}
            >
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
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  <span style={{ color: 'var(--accent)' }} className="mt-0.5">
                    &#10003;
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contacts/"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--accent-foreground)',
                }}
              >
                Get Free Estimate in {cityName} <ArrowRight size={16} />
              </Link>
              <a
                href="tel:+15716557207"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold border-2 transition-all hover:scale-105"
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                  backgroundColor: 'var(--card)',
                }}
              >
                Call (571) 655-7207
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

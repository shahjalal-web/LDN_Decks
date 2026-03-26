import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Hammer } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Loudoun Decks offers a full range of outdoor living services in Northern Virginia — new decks, resurfacing, porches, patios, pergolas, fencing, and more.',
};

interface ServiceSection {
  title: string;
  description: string;
  image: string;
}

interface ServiceFaq {
  question: string;
  answer: string;
}

interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  icon?: string;
  sections: ServiceSection[];
  faqs: ServiceFaq[];
  process: string[];
  features: string[];
  isActive: boolean;
  order: number;
  parentService: string | null;
  children?: Service[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div style={{ paddingTop: '80px' }}>
      <PageHero
        badge="What We Do"
        title="Our"
        highlight=" Services"
        description="From custom deck builds to full outdoor living renovations — Loudoun Decks handles it all with expert craftsmanship and premium materials."
      />

      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.length === 0 ? (
            <p
              className="text-center text-lg py-12"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Services coming soon. Please check back later.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service) => (
                <div key={service._id} className="space-y-3">
                  <Link
                    href={`/services/${service.slug}/`}
                    className="group rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col sm:flex-row"
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
                          <Hammer
                            size={48}
                            style={{ color: 'var(--accent)' }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <h2
                        className="text-lg font-bold mb-2"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {service.title}
                      </h2>
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

                  {/* Sub-services */}
                  {service.children && service.children.length > 0 && (
                    <div className="flex flex-wrap gap-2 pl-4">
                      {service.children.map((child) => (
                        <Link
                          key={child._id}
                          href={`/services/${service.slug}/${child.slug}/`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:-translate-y-0.5 hover:shadow-sm"
                          style={{
                            backgroundColor: 'var(--card)',
                            borderColor: 'var(--border)',
                            color: 'var(--foreground)',
                          }}
                        >
                          <ArrowRight size={10} style={{ color: 'var(--accent)' }} />
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

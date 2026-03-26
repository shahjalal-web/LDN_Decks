import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight, CheckCircle } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';

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

interface RelatedBlog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  author: string;
  readTime: string;
  category: string;
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

async function getRelatedBlogs(serviceId: string): Promise<RelatedBlog[]> {
  try {
    const res = await fetch(`${API_URL}/blogs/by-service/${serviceId}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getChildService(parentSlug: string, childSlug: string): Promise<{ parent: Service; child: Service } | null> {
  const services = await getServices();
  const parent = services.find((s: Service) => s.slug === parentSlug);
  if (!parent || !parent.children) return null;
  const child = parent.children.find((c: Service) => c.slug === childSlug);
  if (!child) return null;
  return { parent, child };
}

export async function generateStaticParams() {
  const services = await getServices();
  const params: { slug: string; subSlug: string }[] = [];
  for (const service of services) {
    if (service.children) {
      for (const child of service.children) {
        params.push({ slug: service.slug, subSlug: child.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; subSlug: string }>;
}): Promise<Metadata> {
  const { slug, subSlug } = await params;
  const result = await getChildService(slug, subSlug);
  if (!result) return { title: 'Service Not Found' };
  return {
    title: `${result.child.title} | ${result.parent.title}`,
    description: result.child.description,
  };
}

function renderDescription(text: string) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('\u2022')) {
      return (
        <li key={i} className="ml-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
          {line.slice(1).trim()}
        </li>
      );
    }
    if (/^\d+\./.test(line)) {
      return (
        <li key={i} className="ml-4 text-sm font-medium" style={{ color: 'var(--foreground)' }}>
          {line}
        </li>
      );
    }
    if (!line.trim()) return <br key={i} />;
    return (
      <p key={i} className="text-sm leading-relaxed mb-2" style={{ color: 'var(--muted-foreground)' }}>
        {line}
      </p>
    );
  });
}

export default async function SubServicePage({
  params,
}: {
  params: Promise<{ slug: string; subSlug: string }>;
}) {
  const { slug, subSlug } = await params;
  const result = await getChildService(slug, subSlug);
  if (!result) notFound();

  const { parent, child: service } = result;
  const relatedBlogs = await getRelatedBlogs(service._id);

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, var(--background) 0%, color-mix(in srgb, var(--accent) 8%, var(--background)) 100%)',
        }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -right-32 w-125 h-125 rounded-full opacity-[0.06]"
            style={{ backgroundColor: 'var(--accent)' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs mb-8 flex-wrap">
            <Link href="/" className="transition-colors hover:underline" style={{ color: 'var(--muted-foreground)' }}>
              Home
            </Link>
            <ChevronRight size={12} style={{ color: 'var(--muted-foreground)' }} />
            <Link href="/services/" className="transition-colors hover:underline" style={{ color: 'var(--muted-foreground)' }}>
              Services
            </Link>
            <ChevronRight size={12} style={{ color: 'var(--muted-foreground)' }} />
            <Link
              href={`/services/${parent.slug}/`}
              className="transition-colors hover:underline"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {parent.title}
            </Link>
            <ChevronRight size={12} style={{ color: 'var(--muted-foreground)' }} />
            <span style={{ color: 'var(--accent)' }} className="font-semibold">
              {service.title}
            </span>
          </nav>

          <div className="max-w-3xl">
            <h1
              className="text-4xl sm:text-5xl font-bold mb-6 leading-tight"
              style={{ color: 'var(--foreground)' }}
            >
              {service.title}
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      {service.features && service.features.length > 0 && (
        <section className="py-16" style={{ backgroundColor: 'var(--muted)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="flex flex-wrap gap-3 justify-center">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
                    style={{
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)',
                      color: 'var(--foreground)',
                    }}
                  >
                    <CheckCircle size={14} style={{ color: 'var(--accent)' }} />
                    {feature}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Content Sections */}
      {service.sections && service.sections.length > 0 && (
        <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            {service.sections.map((section, index) => {
              const isEven = index % 2 === 1;
              const hasImage = !!section.image;
              return (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div
                    className={`flex flex-col ${hasImage ? 'lg:flex-row' : ''} gap-10 items-center ${
                      isEven && hasImage ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    {hasImage && (
                      <div className="w-full lg:w-[40%] shrink-0">
                        <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden">
                          <Image src={section.image} alt={section.title} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                        </div>
                      </div>
                    )}
                    <div className={hasImage ? 'flex-1' : 'w-full max-w-3xl mx-auto'}>
                      <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
                        {section.title}
                      </h2>
                      <div>{renderDescription(section.description)}</div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </section>
      )}

      {/* Process */}
      {service.process && service.process.length > 0 && (
        <section className="py-20" style={{ backgroundColor: 'var(--muted)' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: 'var(--foreground)' }}>
                Our Process
              </h2>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((step, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="text-center">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold mx-auto mb-3"
                      style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{step}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: 'var(--foreground)' }}>
                Frequently Asked Questions
              </h2>
            </AnimatedSection>
            <div className="space-y-4">
              {service.faqs.map((faq, i) => (
                <AnimatedSection key={i} delay={i * 0.05}>
                  <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
                    <h3 className="font-semibold mb-2 text-sm" style={{ color: 'var(--foreground)' }}>{faq.question}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{faq.answer}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="py-20" style={{ backgroundColor: 'var(--muted)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-12">
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
                  Related Articles
                </p>
                <h2 className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
                  Helpful Tips & Guides
                </h2>
              </div>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs.slice(0, 3).map((blog, i) => (
                <AnimatedSection key={blog._id} delay={i * 0.1}>
                  <Link
                    href={`/${blog.slug}/`}
                    className="group block rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
                  >
                    {blog.image && (
                      <div className="relative w-full aspect-16/10 overflow-hidden">
                        <Image src={blog.image} alt={blog.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="font-bold mb-2 leading-snug" style={{ color: 'var(--foreground)' }}>{blog.title}</h3>
                      <p className="text-sm line-clamp-2" style={{ color: 'var(--muted-foreground)' }}>{blog.excerpt}</p>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section
        className="py-16"
        style={{
          background: 'linear-gradient(135deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 70%, #000) 100%)',
        }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#fff' }}>
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Get a free, no-obligation estimate for your {service.title.toLowerCase()} project.
            We&apos;ll get back to you within 24 hours.
          </p>
          <Link
            href="/contacts/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-white transition-all hover:scale-105"
            style={{ color: 'var(--accent)' }}
          >
            Get Free Estimate <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

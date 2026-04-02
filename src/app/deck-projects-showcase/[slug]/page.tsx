import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight, MapPin, Calendar, Tag, CheckCircle } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ShowcaseGallery } from '@/components/ShowcaseGallery';

interface ShowcaseSection {
  title: string;
  description: string;
  image: string;
}

interface Showcase {
  _id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  date: string;
  category: string;
  images: string[];
  sections: ShowcaseSection[];
  service?: { _id: string; title: string; slug: string } | null;
  isPublished: boolean;
  order: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const CATEGORY_COLORS: Record<string, string> = {
  'New Deck': '#059669',
  'Resurfacing': '#059669',
  'Fence': '#7c3aed',
  'Porch': '#0891b2',
  'Patio': '#be185d',
  'Pergola': '#ea580c',
};

function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || '#6b7280';
}

function renderSectionText(text: string) {
  return text.split('\n').map((line, i) => {
    if (!line.trim()) return <br key={i} />;
    const boldMatch = line.match(/^(.+?:)\s*(.*)/);
    if (boldMatch) {
      return (
        <p key={i} className="text-sm leading-relaxed mb-3" style={{ color: 'var(--muted-foreground)' }}>
          <strong style={{ color: 'var(--foreground)' }}>{boldMatch[1]}</strong> {boldMatch[2]}
        </p>
      );
    }
    return <p key={i} className="text-sm leading-relaxed mb-3" style={{ color: 'var(--muted-foreground)' }}>{line}</p>;
  });
}

const PROCESS_STEPS = [
  { label: 'Consulting', description: 'We discuss your vision and assess your space', progress: 40 },
  { label: 'Design', description: 'Custom plans tailored to your needs', progress: 60 },
  { label: 'Installation', description: 'Expert craftsmanship with premium materials', progress: 85 },
  { label: 'Inspection', description: 'Final walkthrough to ensure perfection', progress: 100 },
];

async function getShowcases(): Promise<Showcase[]> {
  try {
    const res = await fetch(`${API_URL}/showcases`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getShowcaseBySlug(slug: string): Promise<Showcase | null> {
  try {
    const res = await fetch(`${API_URL}/showcases/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const showcases = await getShowcases();
  return showcases
    .filter((s) => s.isPublished)
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const showcase = await getShowcaseBySlug(slug);
  if (!showcase) return { title: 'Project Not Found' };
  return {
    title: `${showcase.title} | LDN Decks Showcase`,
    description: showcase.description || `${showcase.title} - ${showcase.category} project in ${showcase.location}`,
  };
}

export default async function ShowcaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const showcase = await getShowcaseBySlug(slug);
  if (!showcase) notFound();

  const allShowcases = await getShowcases();
  const published = allShowcases.filter((s) => s.isPublished && s.slug !== showcase.slug);

  const sameCategory = published.filter((s) => s.category === showcase.category);
  const otherCategory = published.filter((s) => s.category !== showcase.category);
  const related = [...sameCategory, ...otherCategory].slice(0, 3);

  const hasImages = showcase.images && showcase.images.length > 0;
  const heroImage = hasImages ? showcase.images[0] : null;
  const sections = showcase.sections || [];

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* ── Hero with background image ── */}
      <section className="relative py-24 sm:py-32 overflow-hidden" style={{ minHeight: '420px' }}>
        {/* Background image */}
        {heroImage ? (
          <Image
            src={heroImage}
            alt={showcase.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0" style={{ backgroundColor: 'var(--card)' }} />
        )}
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.70) 100%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs mb-8">
            <Link href="/" className="transition-colors hover:underline" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Home
            </Link>
            <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.5)' }} />
            <Link href="/deck-projects-showcase/" className="transition-colors hover:underline" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Showcase
            </Link>
            <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.5)' }} />
            <span style={{ color: '#fff' }} className="font-semibold">
              {showcase.title}
            </span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight" style={{ color: '#fff' }}>
              {showcase.title}
            </h1>
            {showcase.description && (
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
                {showcase.description.length > 200
                  ? showcase.description.slice(0, 200).trim() + '...'
                  : showcase.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Info Strip ── */}
      <section style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <AnimatedSection>
            <div
              className="rounded-2xl border p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 flex-wrap"
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              }}
            >
              {/* Description snippet */}
              {showcase.description && (
                <p className="text-sm leading-relaxed flex-1 min-w-0" style={{ color: 'var(--muted-foreground)' }}>
                  {showcase.description.length > 120
                    ? showcase.description.slice(0, 120).trim() + '...'
                    : showcase.description}
                </p>
              )}

              <div
                className="hidden sm:block w-px self-stretch"
                style={{ backgroundColor: 'var(--border)' }}
              />

              <div className="flex items-center gap-5 text-sm flex-wrap" style={{ color: 'var(--muted-foreground)' }}>
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <MapPin size={14} style={{ color: 'var(--accent)' }} /> {showcase.location}
                </span>
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <Calendar size={14} style={{ color: 'var(--accent)' }} /> {showcase.date}
                </span>
                {showcase.service && (
                  <Link
                    href={`/services/${showcase.service.slug}/`}
                    className="flex items-center gap-1.5 whitespace-nowrap transition-colors hover:underline"
                    style={{ color: 'var(--accent)' }}
                  >
                    <Tag size={14} /> {showcase.service.title}
                  </Link>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Sections ("Why Choose Our Service" style) ── */}
      {sections.length > 0 && (
        <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {sections.map((sec, i) => {
              const isReversed = i % 2 !== 0;
              return (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div
                    className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 items-center ${i < sections.length - 1 ? 'mb-20' : ''}`}
                  >
                    {/* Text side */}
                    <div className="flex-1 min-w-0">
                      {i === 0 && (
                        <span
                          className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                          style={{
                            backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
                            color: 'var(--accent)',
                          }}
                        >
                          Why Choose Us
                        </span>
                      )}
                      <h2
                        className="text-2xl sm:text-3xl font-bold mb-6 leading-tight"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {sec.title}
                      </h2>
                      <div>{renderSectionText(sec.description)}</div>
                    </div>

                    {/* Image side */}
                    {sec.image && (
                      <div className="flex-1 w-full">
                        <div
                          className="relative w-full rounded-2xl overflow-hidden"
                          style={{ aspectRatio: '4 / 3' }}
                        >
                          <Image
                            src={sec.image}
                            alt={sec.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Gallery Section ── */}
      {hasImages && (
        <section className="py-20" style={{ backgroundColor: 'var(--muted)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-12">
                <span
                  className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
                    color: 'var(--accent)',
                  }}
                >
                  Gallery
                </span>
                <h2 className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
                  Showcase of Our Work
                </h2>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <ShowcaseGallery images={showcase.images} title={showcase.title} />
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ── Process Section ── */}
      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            {/* Left side - Steps with progress bars */}
            <AnimatedSection className="flex-1 w-full">
              <div className="space-y-6">
                {PROCESS_STEPS.map((step, i) => (
                  <div key={step.label}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                          style={{
                            backgroundColor: 'var(--accent)',
                            color: 'var(--accent-foreground)',
                          }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--foreground)' }}>
                          {step.label}
                        </span>
                      </div>
                      <span className="text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>
                        {step.progress}%
                      </span>
                    </div>
                    <div
                      className="h-3 rounded-full overflow-hidden"
                      style={{ backgroundColor: 'var(--muted)' }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${step.progress}%`,
                          background: `linear-gradient(90deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 70%, #000) 100%)`,
                        }}
                      />
                    </div>
                    <p className="text-xs mt-1.5" style={{ color: 'var(--muted-foreground)' }}>
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Right side - Process info */}
            <AnimatedSection className="flex-1 w-full" delay={0.15}>
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
                  color: 'var(--accent)',
                }}
              >
                Process
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-5 leading-tight" style={{ color: 'var(--foreground)' }}>
                {showcase.title}
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
                Every project follows our proven four-step process to ensure exceptional results. From the
                initial consultation to the final inspection, we maintain the highest standards of quality
                and craftsmanship throughout your {showcase.category.toLowerCase()} project.
              </p>
              <div className="flex flex-col gap-3">
                {PROCESS_STEPS.map((step) => (
                  <div key={step.label} className="flex items-center gap-2">
                    <CheckCircle size={16} style={{ color: 'var(--accent)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                      {step.label}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                      &mdash; {step.description}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
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
              Ready to Expert {showcase.category}?
            </h2>
            <p
              className="mb-8 text-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              Get a free, no-obligation estimate for your {showcase.category.toLowerCase()} project.
              We&apos;ll get back to you within 24 hours.
            </p>
            <Link
              href="/contacts/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-white transition-all hover:scale-105"
              style={{ color: 'var(--accent)' }}
            >
              Contact Us <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Related Projects ── */}
      {related.length > 0 && (
        <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-12">
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: 'var(--accent)' }}
                >
                  More Projects
                </p>
                <h2
                  className="text-3xl font-bold"
                  style={{ color: 'var(--foreground)' }}
                >
                  Related Projects
                </h2>
              </div>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((project, i) => {
                const projColor = getCategoryColor(project.category);
                const projHasImage = project.images && project.images.length > 0;
                return (
                  <AnimatedSection key={project._id} delay={i * 0.1}>
                    <Link
                      href={`/deck-projects-showcase/${project.slug}/`}
                      className="group block rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
                    >
                      <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>
                        {projHasImage ? (
                          <Image
                            src={project.images[0]}
                            alt={project.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center text-4xl font-bold text-white"
                            style={{ backgroundColor: projColor, opacity: 0.85 }}
                          >
                            {project.category[0]}
                          </div>
                        )}
                        <span
                          className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: projColor, color: '#fff' }}
                        >
                          {project.category}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3
                          className="font-bold mb-2 leading-snug"
                          style={{ color: 'var(--foreground)' }}
                        >
                          {project.title}
                        </h3>
                        <div
                          className="flex items-center gap-4 text-xs"
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          <span className="flex items-center gap-1">
                            <MapPin size={12} /> {project.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={12} /> {project.date}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

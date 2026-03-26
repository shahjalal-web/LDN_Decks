import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight, Clock, User, Calendar, Tag } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  readTime: string;
  sections: { title: string; description: string; image: string }[];
  relatedServices: { _id: string; title: string; slug: string; image: string }[];
  isPublished: boolean;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(`${API_URL}/blogs`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const res = await fetch(`${API_URL}/blogs/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs
    .filter((b) => b.isPublished)
    .map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: 'Blog Post Not Found' };
  return {
    title: `${blog.title} | LDN Decks Blog`,
    description: blog.excerpt,
  };
}

function renderSectionText(text: string) {
  return text.split('\n').map((line, i) => {
    if (!line.trim()) return <br key={i} />;
    return <p key={i} className="text-sm leading-relaxed mb-2" style={{ color: 'var(--muted-foreground)' }}>{line}</p>;
  });
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  const allBlogs = await getBlogs();
  const relatedBlogs = allBlogs
    .filter((b) => b.isPublished && b.slug !== blog.slug)
    .slice(0, 3);

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Blog content styles */}
      <style>{`
        .blog-content { word-wrap: break-word; overflow-wrap: break-word; white-space: normal; max-width: 100%; }
        .blog-content * { max-width: 100%; }
        .blog-content h1, .blog-content h2, .blog-content h3 { color: var(--foreground); font-weight: 700; margin: 1.5em 0 0.5em; }
        .blog-content h1 { font-size: 2rem; }
        .blog-content h2 { font-size: 1.5rem; }
        .blog-content h3 { font-size: 1.25rem; }
        .blog-content p { color: var(--muted-foreground); line-height: 1.8; margin-bottom: 1em; }
        .blog-content ul, .blog-content ol { color: var(--muted-foreground); padding-left: 1.5em; margin-bottom: 1em; }
        .blog-content ul { list-style-type: disc; }
        .blog-content ol { list-style-type: decimal; }
        .blog-content li { margin-bottom: 0.5em; line-height: 1.7; }
        .blog-content blockquote { border-left: 3px solid var(--accent); padding-left: 1em; color: var(--muted-foreground); font-style: italic; margin: 1.5em 0; }
        .blog-content img { border-radius: 0.75rem; margin: 1.5em 0; max-width: 100%; }
        .blog-content a { color: var(--accent); text-decoration: underline; }
        .blog-content strong { color: var(--foreground); }
        .blog-content table { width: 100%; border-collapse: collapse; margin: 1.5em 0; }
        .blog-content th, .blog-content td { border: 1px solid var(--border); padding: 0.5em 0.75em; text-align: left; color: var(--muted-foreground); }
        .blog-content th { background: var(--muted); color: var(--foreground); font-weight: 600; }
      `}</style>

      {/* Hero with background image */}
      <section className="relative py-24 overflow-hidden" style={{ minHeight: '400px' }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.8) 100%)' }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-1.5 text-xs mb-8">
            <Link
              href="/"
              className="transition-colors hover:underline"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Home
            </Link>
            <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.5)' }} />
            <Link
              href="/blog-deck-tips/"
              className="transition-colors hover:underline"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Blog
            </Link>
            <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.5)' }} />
            <span style={{ color: '#fff' }} className="font-semibold">
              {blog.title}
            </span>
          </nav>

          {/* Category badge */}
          <span
            className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-5"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--accent-foreground)',
            }}
          >
            {blog.category}
          </span>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            style={{ color: '#fff' }}
          >
            {blog.title}
          </h1>

          <div
            className="flex items-center justify-center gap-5 text-sm"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            <span className="flex items-center gap-1.5">
              <User size={14} /> {blog.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> {formatDate(blog.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {blog.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-10">
                <Tag size={14} style={{ color: 'var(--muted-foreground)' }} />
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: 'var(--muted)',
                      color: 'var(--muted-foreground)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Blog HTML content */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Content Sections */}
      {blog.sections && blog.sections.length > 0 && (
        <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            {blog.sections.map((section, index) => {
              const isEven = index % 2 === 1;
              const hasImage = !!section.image;
              return (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className={`flex flex-col ${hasImage ? 'lg:flex-row' : ''} gap-10 items-center ${isEven && hasImage ? 'lg:flex-row-reverse' : ''}`}>
                    {hasImage && (
                      <div className="w-full lg:w-[40%] shrink-0">
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                          <Image src={section.image} alt={section.title} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                        </div>
                      </div>
                    )}
                    <div className={hasImage ? 'flex-1' : 'w-full max-w-3xl mx-auto'}>
                      <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
                        {section.title}
                      </h2>
                      {renderSectionText(section.description)}
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </section>
      )}

      {/* Related Services */}
      {blog.relatedServices && blog.relatedServices.length > 0 && (
        <section className="py-16" style={{ backgroundColor: 'var(--muted)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2
                className="text-2xl sm:text-3xl font-bold mb-10 text-center"
                style={{ color: 'var(--foreground)' }}
              >
                Related Services
              </h2>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blog.relatedServices.map((service, index) => (
                <AnimatedSection key={service._id} delay={index * 0.1}>
                  <Link
                    href={`/services/${service.slug}/`}
                    className="group block rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    style={{
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    <div className="relative w-full" style={{ aspectRatio: '16 / 10' }}>
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <h3
                        className="font-bold text-lg transition-colors duration-200"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {service.title}
                      </h3>
                      <span
                        className="inline-flex items-center gap-1 text-xs font-bold mt-2 group-hover:gap-2 transition-all"
                        style={{ color: 'var(--accent)' }}
                      >
                        View Service <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Blogs — Continue Reading */}
      {relatedBlogs.length > 0 && (
        <section className="py-16" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2
                className="text-2xl sm:text-3xl font-bold mb-10 text-center"
                style={{ color: 'var(--foreground)' }}
              >
                Continue Reading
              </h2>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.map((relBlog, index) => (
                <AnimatedSection key={relBlog._id} delay={index * 0.1}>
                  <Link
                    href={`/${relBlog.slug}/`}
                    className="group block rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    style={{
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    <div className="relative w-full" style={{ aspectRatio: '16 / 10' }}>
                      <Image
                        src={relBlog.image}
                        alt={relBlog.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <span
                        className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3"
                        style={{
                          backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                          color: 'var(--accent)',
                        }}
                      >
                        {relBlog.category}
                      </span>
                      <h3
                        className="text-lg font-bold mb-2 leading-snug"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {relBlog.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed mb-4"
                        style={{
                          color: 'var(--muted-foreground)',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {relBlog.excerpt}
                      </p>
                      <div
                        className="flex items-center justify-between pt-4"
                        style={{ borderTop: '1px solid var(--border)' }}
                      >
                        <div
                          className="flex items-center gap-4 text-xs"
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          <span className="flex items-center gap-1">
                            <User size={12} /> {relBlog.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {relBlog.readTime}
                          </span>
                        </div>
                        <span
                          className="text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all"
                          style={{ color: 'var(--accent)' }}
                        >
                          Read <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
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
              Ready to Get Started?
            </h2>
            <p
              className="mb-8 text-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              Turn your outdoor living dreams into reality. Get a free, no-obligation estimate
              from our expert team — we&apos;ll get back to you within 24 hours.
            </p>
            <Link
              href="/contacts/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-white transition-all hover:scale-105"
              style={{ color: 'var(--accent)' }}
            >
              Get Free Estimate <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { AnimatedSection } from '@/components/AnimatedSection';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog - Deck Building Tips & Guides | LDN Decks',
  description:
    'Explore our blog for the latest deck building tips, material guides, maintenance advice, and outdoor living inspiration from the LDN Decks team.',
};

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
  relatedServices: { _id: string; title: string; slug: string; image: string }[];
  isPublished: boolean;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(`${API_URL}/blogs`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.filter((b: Blog) => b.isPublished);
  } catch {
    return [];
  }
}

export default async function BlogListingPage() {
  const blogs = await getBlogs();

  return (
    <div style={{ paddingTop: '80px' }}>
      <PageHero
        badge="Blog"
        title="Check Our"
        highlight=" Deck Building Tips"
        description="Explore our Blog to see the latest Deck building tips, material guides, maintenance advice, and outdoor living inspiration."
        cta={false}
      />

      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {blogs.length === 0 ? (
            <AnimatedSection>
              <div
                className="text-center py-20 px-6 rounded-2xl border"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <p
                  className="text-lg font-semibold mb-2"
                  style={{ color: 'var(--foreground)' }}
                >
                  No blog posts yet
                </p>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  Check back soon for deck building tips and guides.
                </p>
              </div>
            </AnimatedSection>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <AnimatedSection key={blog._id} delay={index * 0.1}>
                  <Link
                    href={`/blog-deck-tips/${blog.slug}/`}
                    className="group block rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    style={{
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    {/* Image */}
                    <div className="relative w-full" style={{ aspectRatio: '16 / 10' }}>
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Category badge */}
                      <span
                        className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3"
                        style={{
                          backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                          color: 'var(--accent)',
                        }}
                      >
                        {blog.category}
                      </span>

                      {/* Title */}
                      <h2
                        className="text-lg font-bold mb-2 leading-snug transition-colors duration-200"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {blog.title}
                      </h2>

                      {/* Excerpt — clamped to 3 lines */}
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
                        {blog.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                        <div
                          className="flex items-center gap-4 text-xs"
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          <span className="flex items-center gap-1">
                            <User size={12} /> {blog.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {blog.readTime}
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
          )}
        </div>
      </section>
    </div>
  );
}

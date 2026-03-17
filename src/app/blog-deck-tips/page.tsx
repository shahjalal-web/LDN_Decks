import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import Link from 'next/link';
import { ArrowRight, Clock, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Deck Tips Blog',
  description: 'Expert deck building tips, material guides, and outdoor living advice from the team at Loudoun Decks in Northern Virginia.',
};

const posts = [
  {
    slug: '/composite-decks-essential-tips-for-choosing-the-perfect-builder/',
    title: 'Composite Decks: Essential Tips for Choosing the Perfect Builder',
    excerpt: 'Not all deck builders are created equal. Learn what to look for when hiring a contractor for your composite deck project — and what red flags to avoid.',
    readTime: '5 min read',
    category: 'Hiring Tips',
    color: '#d97706',
  },
  {
    slug: '/choosing-right-deck-material-wood-vs-composite/',
    title: 'Choosing the Right Deck Material: Wood vs Composite',
    excerpt: 'Wood and composite decking both have their pros and cons. This guide breaks down cost, maintenance, longevity, and aesthetics to help you decide.',
    readTime: '7 min read',
    category: 'Materials Guide',
    color: '#059669',
  },
  {
    slug: '/the-ultimate-deck-building-guide-avoid-these-common-mistakes/',
    title: 'The Ultimate Deck Building Guide: Avoid These Common Mistakes',
    excerpt: 'From improper footings to skipping permits — these are the most common deck building mistakes homeowners make and how to avoid them.',
    readTime: '8 min read',
    category: 'Planning Guide',
    color: '#7c3aed',
  },
];

export default function BlogPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <PageHero
        badge="Expert Advice"
        title="Deck Tips"
        highlight=" & Guides"
        description="Expert advice on deck building, material selection, maintenance, and outdoor living — written by the Loudoun Decks team."
        cta={false}
      />

      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={post.slug}
                className="group flex flex-col sm:flex-row gap-6 p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <div
                  className="w-full sm:w-32 h-32 sm:h-auto rounded-xl flex items-center justify-center text-3xl font-bold text-white shrink-0"
                  style={{ backgroundColor: post.color, minHeight: '120px' }}
                >
                  {post.category[0]}
                </div>
                <div className="flex-1">
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                    style={{ backgroundColor: `${post.color}18`, color: post.color }}
                  >
                    {post.category}
                  </span>
                  <h2 className="text-xl font-bold mt-3 mb-3 group-hover:text-amber-500 transition-colors" style={{ color: 'var(--foreground)' }}>
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                      <span className="flex items-center gap-1"><User size={12} /> Nick Zugrav</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                    </div>
                    <span className="text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: 'var(--accent)' }}>
                      Read more <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

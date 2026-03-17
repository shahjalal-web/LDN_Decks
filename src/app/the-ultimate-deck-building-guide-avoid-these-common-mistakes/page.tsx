import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import Link from 'next/link';
import { ArrowRight, User, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The Ultimate Deck Building Guide: Avoid These Common Mistakes',
  description: 'Discover the most common deck building mistakes Northern Virginia homeowners make — and how to avoid them for a successful project.',
};

export default function BlogPost3() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <PageHero badge="Planning Guide" title="The Ultimate Deck Building Guide:" highlight=" Avoid These Common Mistakes" description="" cta={false} />
      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 mb-10 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            <span className="flex items-center gap-2"><User size={14} /> Nick Zugrav, Owner</span>
            <span className="flex items-center gap-2"><Clock size={14} /> 8 min read</span>
          </div>
          <div className="space-y-6 text-base leading-relaxed">
            <p style={{ color: 'var(--muted-foreground)' }}>
              Building a deck is one of the best investments you can make for your Northern Virginia home. But we&apos;ve seen firsthand how common mistakes — from design to materials to hiring — can turn a great project into a costly headache. Here&apos;s what to avoid.
            </p>
            {[
              { title: 'Mistake #1: Skipping the Permit', desc: 'Many homeowners try to avoid the permit process to save time and money. This is a serious mistake. An unpermitted deck can create problems when selling your home, void your homeowner&apos;s insurance, and may need to be torn down. Always work with a contractor who handles permits properly.' },
              { title: 'Mistake #2: Improper Footings', desc: 'The footings are the foundation of your deck. If they aren&apos;t deep enough or properly sized, your deck will shift, heave, and potentially fail. In Northern Virginia, footings must be below the frost line — typically 30–36 inches deep.' },
              { title: 'Mistake #3: Choosing the Wrong Material for the Climate', desc: 'Northern Virginia has hot, humid summers and cold winters. Not all decking materials perform well in these conditions. Natural wood requires significant annual maintenance, while composite decking is designed to handle climate extremes with minimal upkeep.' },
              { title: 'Mistake #4: Underestimating the Budget', desc: 'Deck projects frequently go over budget when homeowners don&apos;t account for permits, footings, stairs, railings, and finishing details. Always get a comprehensive, itemized quote that covers the complete project scope.' },
              { title: 'Mistake #5: Hiring the Cheapest Contractor', desc: 'The lowest bid often cuts corners somewhere — on materials, labor, or permits. Choose a contractor based on their reputation, portfolio, licensing, and communication — not just price.' },
            ].map(({ title, desc }) => (
              <div key={title}>
                <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>{title}</h2>
                <p style={{ color: 'var(--muted-foreground)' }} dangerouslySetInnerHTML={{ __html: desc }} />
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
            <Link href="/contacts/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}>
              Get a Free Estimate <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

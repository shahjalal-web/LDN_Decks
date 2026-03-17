import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import Link from 'next/link';
import { ArrowRight, User, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Composite Decks: Essential Tips for Choosing the Perfect Builder',
  description: 'Learn what to look for when hiring a contractor for your composite deck project in Northern Virginia — and what red flags to avoid.',
};

export default function BlogPost1() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <PageHero
        badge="Materials Guide"
        title="Composite Decks: Essential Tips for"
        highlight=" Choosing the Perfect Builder"
        description=""
        cta={false}
      />
      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 mb-10 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            <span className="flex items-center gap-2"><User size={14} /> Nick Zugrav, Owner</span>
            <span className="flex items-center gap-2"><Clock size={14} /> 5 min read</span>
          </div>

          <div className="prose space-y-6 text-base leading-relaxed" style={{ color: 'var(--foreground)' }}>
            <p style={{ color: 'var(--muted-foreground)' }}>
              Composite decking has become one of the most popular choices for Northern Virginia homeowners — and for good reason. It&apos;s low-maintenance, long-lasting, and comes in a wide range of colors and textures. But not all builders have experience with composite materials, and choosing the wrong contractor can turn your dream deck into an expensive nightmare.
            </p>
            <h2 className="text-2xl font-bold mt-8" style={{ color: 'var(--foreground)' }}>1. Check for Experience with Composite Materials</h2>
            <p style={{ color: 'var(--muted-foreground)' }}>
              Composite decking is different from wood — it expands and contracts with temperature changes, requires specific fastening systems, and needs proper ventilation underneath. Ask any builder you consider how many composite decks they&apos;ve built and request to see photos or references.
            </p>
            <h2 className="text-2xl font-bold mt-8" style={{ color: 'var(--foreground)' }}>2. Verify Licensing and Insurance</h2>
            <p style={{ color: 'var(--muted-foreground)' }}>
              In Virginia, deck builders should be licensed as residential contractors. Always verify a contractor&apos;s license through the Virginia Department of Professional and Occupational Regulation (DPOR). Never work with an uninsured contractor — if something goes wrong, you could be liable.
            </p>
            <h2 className="text-2xl font-bold mt-8" style={{ color: 'var(--foreground)' }}>3. Ask About Brand Partnerships</h2>
            <p style={{ color: 'var(--muted-foreground)' }}>
              Established builders typically have relationships with premium composite brands like Trex, Fiberon, and TimberTech. These manufacturers often require certified installers to honor their warranties. A quality builder will guide you through material selection and have access to the full product range.
            </p>
            <h2 className="text-2xl font-bold mt-8" style={{ color: 'var(--foreground)' }}>4. Red Flags to Watch For</h2>
            <ul className="list-none space-y-2" style={{ color: 'var(--muted-foreground)' }}>
              <li>⚠️ Requesting full payment upfront</li>
              <li>⚠️ No written contract or vague scope of work</li>
              <li>⚠️ Skipping the permit process</li>
              <li>⚠️ No references or portfolio of past work</li>
              <li>⚠️ Significantly lower price than all other quotes</li>
            </ul>
            <h2 className="text-2xl font-bold mt-8" style={{ color: 'var(--foreground)' }}>5. Get Multiple Quotes</h2>
            <p style={{ color: 'var(--muted-foreground)' }}>
              We always recommend getting 2–3 quotes from licensed contractors. This not only helps you understand fair market pricing but also gives you a feel for each company&apos;s communication style and professionalism.
            </p>
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

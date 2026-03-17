import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import Link from 'next/link';
import { ArrowRight, User, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Choosing the Right Deck Material: Wood vs Composite',
  description: 'Compare wood and composite decking — cost, maintenance, lifespan, and aesthetics — to choose the right material for your Northern Virginia deck.',
};

export default function BlogPost2() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <PageHero badge="Materials Guide" title="Choosing the Right Deck Material:" highlight=" Wood vs Composite" description="" cta={false} />
      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 mb-10 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            <span className="flex items-center gap-2"><User size={14} /> Nick Zugrav, Owner</span>
            <span className="flex items-center gap-2"><Clock size={14} /> 7 min read</span>
          </div>
          <div className="space-y-6 text-base leading-relaxed">
            <p style={{ color: 'var(--muted-foreground)' }}>
              One of the first decisions you&apos;ll face when planning a new deck is the choice between natural wood and composite decking. Both materials have distinct advantages, and the right choice depends on your budget, maintenance tolerance, and aesthetic preferences.
            </p>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Natural Wood Decking</h2>
            <p style={{ color: 'var(--muted-foreground)' }}>
              Wood has been the traditional choice for decks for decades. Cedar, redwood, and pressure-treated pine are the most common options. Wood offers a warm, natural look that many homeowners love, and it&apos;s generally less expensive upfront than composite.
            </p>
            <p style={{ color: 'var(--muted-foreground)' }}>
              <strong style={{ color: 'var(--foreground)' }}>Pros:</strong> Lower upfront cost, natural appearance, easier to repair individual boards.<br />
              <strong style={{ color: 'var(--foreground)' }}>Cons:</strong> Requires annual maintenance (staining, sealing), susceptible to rot and insects, typically shorter lifespan.
            </p>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Composite Decking</h2>
            <p style={{ color: 'var(--muted-foreground)' }}>
              Composite decking is made from a blend of wood fiber and plastic. Modern composites from brands like Trex, Fiberon, and TimberTech look remarkably like natural wood but require far less maintenance.
            </p>
            <p style={{ color: 'var(--muted-foreground)' }}>
              <strong style={{ color: 'var(--foreground)' }}>Pros:</strong> Low maintenance, fade and stain resistant, 25–30 year lifespan, eco-friendly options.<br />
              <strong style={{ color: 'var(--foreground)' }}>Cons:</strong> Higher upfront cost, can feel slightly different underfoot, limited repairability.
            </p>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Our Recommendation</h2>
            <p style={{ color: 'var(--muted-foreground)' }}>
              For most Northern Virginia homeowners, composite decking offers the best long-term value. The climate here — with hot summers, cold winters, and plenty of humidity — is hard on natural wood. The additional upfront cost of composite is typically recouped within 5–7 years through eliminated maintenance costs.
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

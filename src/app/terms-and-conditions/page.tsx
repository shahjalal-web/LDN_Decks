import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and Conditions for Loudoun Decks LLC.',
};

export default function TermsPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <PageHero badge="Legal" title="Terms and" highlight=" Conditions" description="Please read these terms carefully before using our services." cta={false} />
      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
          <div>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--foreground)' }}>1. Services</h2>
            <p>Loudoun Decks LLC provides residential outdoor living construction services including deck building, resurfacing, porch construction, patio construction, fence installation, and outdoor power washing in Northern Virginia.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--foreground)' }}>2. Estimates</h2>
            <p>All estimates provided by Loudoun Decks LLC are free and non-binding until a formal contract is signed. Estimates are valid for 30 days from the date of issue.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--foreground)' }}>3. Warranty</h2>
            <p>Loudoun Decks LLC provides a 2-year labor warranty on all completed projects. This warranty covers defects in workmanship but does not cover normal wear and tear, damage caused by natural events, or misuse.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--foreground)' }}>4. Payment</h2>
            <p>Payment terms are outlined in the project contract. We accept check, ACH transfer, and major credit cards. A deposit may be required to begin work.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--foreground)' }}>5. Contact</h2>
            <p>For questions about these terms, contact us at office@ldndecks.com or call +1 (571) 655-7207.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

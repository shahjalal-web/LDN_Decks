import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import FAQAccordion from './FAQAccordion';

export const metadata: Metadata = {
  title: 'FAQ - Deck Building Questions | LDN Decks',
  description:
    'Everything you need to know about working with Loudoun Decks. Find answers to common questions about our deck building services, process, and service areas.',
};

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getFAQs(): Promise<FAQ[]> {
  try {
    const res = await fetch(`${API_URL}/faqs`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data;
  } catch {
    return [];
  }
}

export default async function FAQPage() {
  const faqs = await getFAQs();

  return (
    <div style={{ paddingTop: '80px' }}>
      <PageHero
        badge="FAQ"
        title="Frequently Asked"
        highlight=" Questions"
        description="Everything you need to know about working with Loudoun Decks. Can't find your answer? Call us anytime."
      />

      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.length > 0 ? (
            <FAQAccordion faqs={faqs} />
          ) : (
            <p className="text-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
              No FAQs available at the moment. Please check back later or call us at{' '}
              <a href="tel:+15716557207" className="underline" style={{ color: 'var(--accent)' }}>
                (571) 655-7207
              </a>.
            </p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--card)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            Still Have Questions?
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--muted-foreground)' }}>
            We&apos;re here to help. Reach out to our team for a free, no-obligation consultation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+15716557207"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
            >
              Call (571) 655-7207
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-semibold border transition-opacity hover:opacity-90"
              style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
            >
              Contact Us Online
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

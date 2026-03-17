'use client';

import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'What type of company is Loudoun Decks?', a: 'Loudoun Decks LLC is a fully licensed residential outdoor living contractor based in Centreville, Virginia, serving homeowners across Northern Virginia.' },
  { q: 'Where are you located?', a: 'We are located at 13704 Winding Oak Cir, Centreville, VA 20121. We serve all of Northern Virginia including Loudoun, Fairfax, and Prince William counties.' },
  { q: 'What areas do you serve?', a: 'We serve over 36 cities across Northern Virginia including Ashburn, Leesburg, Reston, Herndon, McLean, Fairfax, Centreville, Chantilly, and many more.' },
  { q: 'What services do you offer?', a: 'We offer custom deck building, deck resurfacing, outdoor power washing (deck, siding, concrete, fence), gazebo & pergola construction, fencing, entry doors, porch building (front, open, screened), and patio construction.' },
  { q: 'Do you work on residential or commercial properties?', a: 'We focus exclusively on residential properties, allowing us to specialize and deliver the highest quality for homeowners.' },
  { q: 'How do I get started?', a: 'Simply call us at +1 (571) 655-7207, email office@ldndecks.com, or fill out our online form. We\'ll schedule a free consultation at your convenience.' },
  { q: 'Is the consultation really free?', a: 'Yes, 100% free with absolutely no obligation. We believe in earning your trust through transparency, not pressure tactics.' },
  { q: 'Will someone come to my property?', a: 'Yes. After the initial consultation, we schedule an on-site visit to take measurements and assess your space. This allows us to give you an accurate estimate.' },
  { q: 'How long does it take to get a quote?', a: 'We provide detailed written estimates within 24 hours of our on-site visit.' },
  { q: 'Do you offer a warranty?', a: 'Yes. We provide a 2-year labor warranty on all our work. We also use materials that come with their own manufacturer warranties.' },
  { q: 'Do you handle permits?', a: 'Yes, we handle all necessary permits as part of our full-service project management.' },
  { q: 'What materials do you use?', a: 'We work with premium sustainable materials from top brands including Trex, Fiberon, TimberTech, Veka, Versatex, and Nexan.' },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border rounded-xl overflow-hidden transition-all duration-200"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-sm"
        style={{ color: 'var(--foreground)' }}
      >
        {q}
        <ChevronDown
          size={18}
          className={`shrink-0 ml-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          style={{ color: 'var(--accent)' }}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <PageHero
        badge="FAQ"
        title="Frequently Asked"
        highlight=" Questions"
        description="Everything you need to know about working with Loudoun Decks. Can't find your answer? Call us anytime."
      />

      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>
    </div>
  );
}

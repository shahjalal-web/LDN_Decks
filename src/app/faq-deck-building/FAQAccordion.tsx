'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
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
        {question}
        <ChevronDown
          size={18}
          className={`shrink-0 ml-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          style={{ color: 'var(--accent)' }}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
          {answer}
        </div>
      )}
    </div>
  );
}

const CATEGORY_ORDER = [
  'About Loudoun Decks',
  'Deck & Outdoor Living Services',
  'Our Process',
  'Project Planning Questions',
  'Service Area Questions',
  'Estimates & Contact',
];

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const activeFaqs = faqs.filter((f) => f.isActive);

  const grouped: Record<string, FAQ[]> = {};
  for (const faq of activeFaqs) {
    const cat = faq.category || 'General';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(faq);
  }

  // Sort FAQs within each category by order
  for (const cat of Object.keys(grouped)) {
    grouped[cat].sort((a, b) => a.order - b.order);
  }

  // Order categories according to the defined order, then any extras alphabetically
  const sortedCategories = Object.keys(grouped).sort((a, b) => {
    const idxA = CATEGORY_ORDER.indexOf(a);
    const idxB = CATEGORY_ORDER.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="space-y-12">
      {sortedCategories.map((category) => (
        <div key={category}>
          <h2
            className="text-xl font-bold mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            {category}
          </h2>
          <div className="space-y-3">
            {grouped[category].map((faq) => (
              <FAQItem key={faq._id} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

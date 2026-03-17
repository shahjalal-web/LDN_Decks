import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Process',
  description: 'Learn about Loudoun Decks\' simple 4-step process — from free consultation to project completion. Clear, transparent, and stress-free.',
};

const steps = [
  {
    number: '01',
    title: 'Free Consultation',
    desc: 'We start with a no-obligation phone or video consultation. Tell us about your vision, ask questions, and let us help you explore possibilities. There\'s no pressure and no commitment required.',
    items: ['Discuss your project ideas', 'Answer all your questions', 'Explore material options', 'Understand your budget'],
  },
  {
    number: '02',
    title: 'On-Site Visit & Planning',
    desc: 'We come to your home for an on-site visit where we measure your space, assess your property, and explore layout options. This ensures our estimate is accurate and tailored to your exact situation.',
    items: ['On-site measurements', 'Property assessment', 'Layout exploration', 'Design recommendations'],
  },
  {
    number: '03',
    title: 'Project Review & Next Steps',
    desc: 'Before any work begins, we walk you through the complete project scope, timeline, and costs. Everything is clearly defined in writing so you know exactly what to expect.',
    items: ['Detailed written estimate', 'Clear project timeline', 'Material selection', 'Contract signing'],
  },
  {
    number: '04',
    title: 'Construction & Completion',
    desc: 'Our skilled team builds your project with expert craftsmanship and ongoing communication. We handle all permits, keep your property clean, and do a final walkthrough together.',
    items: ['Permit handling', 'Expert construction', 'Daily progress updates', 'Final walkthrough & warranty'],
  },
];

export default function OurProcessPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <PageHero
        badge="How It Works"
        title="Our Simple"
        highlight=" 4-Step Process"
        description="From first conversation to finished outdoor space — we've designed a process that keeps you informed, in control, and confident every step of the way."
      />

      <section className="py-24" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 items-start`}
            >
              <div className="shrink-0">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold"
                  style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
                >
                  {step.number}
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
                  {step.title}
                </h2>
                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
                  {step.desc}
                </p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--foreground)' }}>
                      <span style={{ color: 'var(--accent)' }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="py-16"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/80 mb-8">
            The first step is completely free and takes less than 30 minutes.
          </p>
          <Link
            href="/contacts/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-white transition-all hover:scale-105"
            style={{ color: 'var(--accent)' }}
          >
            Schedule Free Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

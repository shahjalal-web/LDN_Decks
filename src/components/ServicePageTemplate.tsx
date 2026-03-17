import { PageHero } from './PageHero';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface ServicePageProps {
  badge: string;
  title: string;
  highlight?: string;
  description: string;
  whatWeOffer: { title: string; desc: string }[];
  process: string[];
  faqs: { q: string; a: string }[];
  relatedServices?: { label: string; href: string }[];
}

export function ServicePageTemplate({
  badge, title, highlight, description,
  whatWeOffer, process, faqs, relatedServices,
}: ServicePageProps) {
  return (
    <div style={{ paddingTop: '80px' }}>
      <PageHero badge={badge} title={title} highlight={highlight} description={description} />

      {/* What We Offer */}
      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10" style={{ color: 'var(--foreground)' }}>What We Offer</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeOffer.map(({ title: t, desc }) => (
              <div
                key={t}
                className="p-6 rounded-2xl border"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <CheckCircle size={20} className="mb-3" style={{ color: 'var(--accent)' }} />
                <h3 className="font-bold mb-2" style={{ color: 'var(--foreground)' }}>{t}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: 'var(--foreground)' }}>Our Process</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <div key={step} className="text-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold mx-auto mb-3"
                  style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: 'var(--foreground)' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div
                key={q}
                className="p-6 rounded-xl border"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <h3 className="font-semibold mb-2 text-sm" style={{ color: 'var(--foreground)' }}>{q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices && relatedServices.length > 0 && (
        <section className="py-12" style={{ backgroundColor: 'var(--muted)', borderTop: '1px solid var(--border)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6" style={{ color: 'var(--muted-foreground)' }}>
              Related Services
            </h3>
            <div className="flex flex-wrap gap-3">
              {relatedServices.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all hover:scale-105"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
                >
                  {label} <ArrowRight size={12} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section
        className="py-16"
        style={{ background: 'linear-gradient(135deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 70%, #000) 100%)' }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Get a Free Estimate Today</h2>
          <p className="text-white/80 mb-8">
            No obligation, no pressure. Contact us and we&apos;ll get back to you within 24 hours.
          </p>
          <Link
            href="/contacts/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-white transition-all hover:scale-105"
            style={{ color: 'var(--accent)' }}
          >
            Get Free Estimate <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

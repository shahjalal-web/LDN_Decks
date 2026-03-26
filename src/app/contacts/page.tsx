'use client';

import { PageHero } from '@/components/PageHero';
import { Phone, Mail, MapPin, Clock, Send, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '+1 (571) 655-7207', href: 'tel:+15716557207' },
  { icon: Mail, label: 'Email', value: 'office@ldndecks.com', href: 'mailto:office@ldndecks.com' },
  { icon: MapPin, label: 'Address', value: '13704 Winding Oak Cir, Centreville, VA 20121', href: null },
  { icon: Clock, label: 'Hours', value: 'Mon–Fri 8AM–6PM | Sat 9AM–2PM', href: null },
];

const serviceAreas = {
  counties: ['Loudoun County', 'Fairfax County', 'Prince William County'],
  cities: ['Ashburn', 'Leesburg', 'Sterling', 'Centreville', 'Reston', 'Woodbridge', 'Manassas'],
};

const faqs = [
  {
    q: 'How do I contact Loudoun Decks?',
    a: 'You can contact us by phone, email, or by filling out the form on this page.',
  },
  {
    q: 'Do you offer free estimates?',
    a: 'Yes. We offer free consultations and estimates for homeowners in our service area.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We serve Loudoun County, Fairfax County, and Prince William County in Northern Virginia.',
  },
  {
    q: 'How soon will someone respond?',
    a: 'Our team reviews inquiries as they come in and responds as soon as possible during business hours.',
  },
];

export default function ContactPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: 'VA', zipCode: '',
    service: '', projectDetails: ''
  });
  const [callbackForm, setCallbackForm] = useState({ firstName: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [callbackLoading, setCallbackLoading] = useState(false);
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [callbackError, setCallbackError] = useState('');
  const [services, setServices] = useState<{ _id: string; title: string }[]>([]);

  useEffect(() => {
    fetch(`${API}/services`)
      .then(res => res.json())
      .then(data => setServices(Array.isArray(data) ? data : []))
      .catch(() => setServices([]));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'estimate' }),
      });
      if (!res.ok) throw new Error('Failed to submit. Please try again.');
      router.push('/thank-you/');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleCallbackSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCallbackLoading(true);
    setCallbackError('');
    try {
      const res = await fetch(`${API}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: callbackForm.firstName, phone: callbackForm.phone, type: 'callback' }),
      });
      if (!res.ok) throw new Error('Failed to submit. Please try again.');
      setCallbackSubmitted(true);
    } catch (err: unknown) {
      setCallbackError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setCallbackLoading(false);
    }
  }

  return (
    <div style={{ paddingTop: '80px' }}>
      <PageHero
        badge="Get In Touch"
        title="Contact"
        highlight=" Loudoun Decks"
        description="Ready to start your outdoor living project? Contact us for a free, no-obligation estimate. We respond within 24 hours."
        cta={false}
      />

      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--foreground)' }}>
                Contact Information
              </h2>
              <div className="space-y-6 mb-10">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)' }}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--muted-foreground)' }}>{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-medium hover:text-amber-500 transition-colors" style={{ color: 'var(--foreground)' }}>{value}</a>
                      ) : (
                        <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Callback */}
              <div
                className="p-6 rounded-2xl border"
                style={{ backgroundColor: 'var(--muted)', borderColor: 'var(--border)' }}
              >
                <h3 className="font-bold mb-4" style={{ color: 'var(--foreground)' }}>Quick Callback Request</h3>
                {callbackSubmitted ? (
                  <div className="text-center py-4">
                    <p className="font-bold" style={{ color: 'var(--accent)' }}>Thank you!</p>
                    <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>We&apos;ll call you back shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleCallbackSubmit} className="space-y-3">
                    <input type="text" placeholder="Your Name" maxLength={20} required
                      value={callbackForm.firstName}
                      onChange={(e) => setCallbackForm({ ...callbackForm, firstName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2"
                      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    />
                    <input type="tel" placeholder="Phone Number" required
                      value={callbackForm.phone}
                      onChange={(e) => setCallbackForm({ ...callbackForm, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2"
                      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    />
                    <button
                      type="submit"
                      disabled={callbackLoading}
                      className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
                      style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)', opacity: callbackLoading ? 0.7 : 1 }}
                    >
                      {callbackLoading ? 'Sending...' : 'Call Me Back'}
                    </button>
                    {callbackError && (
                      <p className="text-sm text-red-500 text-center">{callbackError}</p>
                    )}
                  </form>
                )}
              </div>
            </div>

            {/* Full Estimate Form */}
            <div>
              <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--foreground)' }}>
                Request a Free Estimate
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" required
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    />
                    <input type="text" placeholder="Last Name" required
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    />
                  </div>
                  <input type="email" placeholder="Email Address" required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                    style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  />
                  <input type="tel" placeholder="Phone Number" required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                    style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  />
                  <input type="text" placeholder="Street Address"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                    style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  />
                  <div className="grid sm:grid-cols-3 gap-4">
                    <input type="text" placeholder="City"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    />
                    <input type="text" placeholder="State"
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      className="px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    />
                    <input type="text" placeholder="Zip Code"
                      value={form.zipCode}
                      onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
                      className="px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    />
                  </div>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                    style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  >
                    <option value="">Select a Service</option>
                    {services.map((s) => <option key={s._id} value={s.title}>{s.title}</option>)}
                  </select>
                  <textarea
                    placeholder="Project Details"
                    rows={4}
                    value={form.projectDetails}
                    onChange={(e) => setForm({ ...form, projectDetails: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                    style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl text-sm font-bold transition-all hover:scale-105 flex items-center justify-center gap-2"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)', opacity: loading ? 0.7 : 1 }}
                  >
                    <Send size={16} /> {loading ? 'Submitting...' : 'Submit Estimate Request'}
                  </button>
                  {error && (
                    <p className="text-sm text-red-500 text-center">{error}</p>
                  )}
                </form>
            </div>
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="py-20" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: 'var(--accent)' }}
            >
              Service Area
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--foreground)' }}>
              Areas We Serve
            </h2>
            <p className="mt-4 max-w-2xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
              We proudly serve homeowners across Northern Virginia, including the following counties and communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {/* Counties */}
            <div
              className="p-8 rounded-2xl border"
              style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)' }}
              >
                <MapPin size={22} />
              </div>
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--foreground)' }}>Counties</h3>
              <ul className="space-y-3">
                {serviceAreas.counties.map((county) => (
                  <li key={county} className="flex items-center gap-3">
                    <ChevronRight size={14} style={{ color: 'var(--accent)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{county}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cities */}
            <div
              className="p-8 rounded-2xl border"
              style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)' }}
              >
                <MapPin size={22} />
              </div>
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--foreground)' }}>Cities &amp; Communities</h3>
              <ul className="space-y-3">
                {serviceAreas.cities.map((city) => (
                  <li key={city} className="flex items-center gap-3">
                    <ChevronRight size={14} style={{ color: 'var(--accent)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{city}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Consultation FAQs */}
      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: 'var(--accent)' }}
            >
              Common Questions
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--foreground)' }}>
              Contact &amp; Consultation FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl border overflow-hidden"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <summary
                  className="flex items-center justify-between cursor-pointer px-6 py-5 text-sm font-bold select-none list-none"
                  style={{ color: 'var(--foreground)' }}
                >
                  {faq.q}
                  <ChevronRight
                    size={16}
                    className="shrink-0 ml-4 transition-transform group-open:rotate-90"
                    style={{ color: 'var(--accent)' }}
                  />
                </summary>
                <div
                  className="px-6 pb-5 text-sm leading-relaxed"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            Ready to Start Your Outdoor Project?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
            Whether you need a new deck, patio, pergola, or a complete outdoor living space, our team is here to bring your vision to life. Get in touch today for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+15716557207"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold transition-all hover:scale-105"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
            >
              <Phone size={16} />
              Call (571) 655-7207
            </a>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold border transition-all hover:scale-105"
              style={{ borderColor: 'var(--border)', color: 'var(--foreground)', backgroundColor: 'var(--card)' }}
            >
              View Our Services
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '+1 (571) 655-7207', href: 'tel:+15716557207' },
  { icon: Mail, label: 'Email', value: 'office@ldndecks.com', href: 'mailto:office@ldndecks.com' },
  { icon: MapPin, label: 'Address', value: '13704 Winding Oak Cir, Centreville, VA 20121', href: null },
  { icon: Clock, label: 'Hours', value: 'Mon–Fri 8AM–6PM | Sat 9AM–2PM', href: null },
];

const services = [
  'New Decks', 'Deck Resurfacing', 'Outdoor Washing', 'Gazebo & Pergola',
  'Fence', 'Entry Doors', 'Porches', 'Patios', 'Other',
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
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
                <div className="space-y-3">
                  <input type="text" placeholder="Your Name" maxLength={20}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2"
                    style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  />
                  <input type="tel" placeholder="Phone Number"
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2"
                    style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  />
                  <button
                    className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
                  >
                    Call Me Back
                  </button>
                </div>
              </div>
            </div>

            {/* Full Estimate Form */}
            <div>
              <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--foreground)' }}>
                Request a Free Estimate
              </h2>
              {submitted ? (
                <div
                  className="p-8 rounded-2xl border text-center"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 8%, var(--background))', borderColor: 'var(--accent)' }}
                >
                  <Send size={40} className="mx-auto mb-4" style={{ color: 'var(--accent)' }} />
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                    Thank You!
                  </h3>
                  <p style={{ color: 'var(--muted-foreground)' }}>
                    We&apos;ve received your request and will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" required
                      className="px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    />
                    <input type="text" placeholder="Last Name" required
                      className="px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    />
                  </div>
                  <input type="email" placeholder="Email Address" required
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                    style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  />
                  <input type="tel" placeholder="Phone Number" required
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                    style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  />
                  <input type="text" placeholder="Street Address"
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                    style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  />
                  <div className="grid sm:grid-cols-3 gap-4">
                    <input type="text" placeholder="City"
                      className="px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    />
                    <input type="text" placeholder="State" defaultValue="VA"
                      className="px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    />
                    <input type="text" placeholder="Zip Code"
                      className="px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    />
                  </div>
                  <select
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                    style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  >
                    <option value="">Select a Service</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <textarea
                    placeholder="Project Details"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                    style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  />
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-sm font-bold transition-all hover:scale-105 flex items-center justify-center gap-2"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
                  >
                    <Send size={16} /> Submit Estimate Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

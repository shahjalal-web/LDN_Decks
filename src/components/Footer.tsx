'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const footerLinks = {
  Company: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-loudoun-deck-company/' },
    { label: 'Why Choose Us', href: '/why-choose-us/' },
    { label: 'Our Process', href: '/our-process/' },
    { label: 'Showcase', href: '/deck-projects-showcase/' },
    { label: 'Blog', href: '/blog-deck-tips/' },
    { label: 'FAQ', href: '/faq-deck-building/' },
    { label: 'Contact', href: '/contacts/' },
  ],
  Services: [
    { label: 'New Decks', href: '/services/new-decks-installation/' },
    { label: 'Deck Resurfacing', href: '/services/deck-resurfacing/' },
    { label: 'Outdoor Washing', href: '/services/outdoor-power-washing/' },
    { label: 'Gazebo & Pergola', href: '/services/gazebos-and-pergolas/' },
    { label: 'Fence', href: '/services/fences/' },
    { label: 'Entry Doors', href: '/services/entry-doors/' },
    { label: 'Porches', href: '/services/porches/' },
    { label: 'Patios', href: '/services/patios/' },
  ],
};

export function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--card)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/ldndecks-logo.webp"
                alt="LDN Decks"
                width={150}
                height={42}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
              Licensed outdoor living contractor serving Northern Virginia. Your Vision, Our Expertise, Perfect Outdoor Spaces.
            </p>
            <div className="flex gap-3">
              {[
                { href: 'https://facebook.com', icon: Facebook },
                { href: 'https://instagram.com', icon: Instagram },
                { href: 'https://twitter.com', icon: Twitter },
              ].map(({ href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--accent)' }}>
              Company
            </p>
            <ul className="space-y-2">
              {footerLinks.Company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-amber-500"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--accent)' }}>
              Services
            </p>
            <ul className="space-y-2">
              {footerLinks.Services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-amber-500"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--accent)' }}>
              Contact
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+15716557207"
                  className="flex items-start gap-3 text-sm transition-colors hover:text-amber-500"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  <Phone size={15} className="mt-0.5 shrink-0" />
                  +1 (571) 655-7207
                </a>
              </li>
              <li>
                <a
                  href="mailto:office@ldndecks.com"
                  className="flex items-start gap-3 text-sm transition-colors hover:text-amber-500"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  <Mail size={15} className="mt-0.5 shrink-0" />
                  office@ldndecks.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  <MapPin size={15} className="mt-0.5 shrink-0" />
                  13704 Winding Oak Cir,<br />Centreville, VA 20121
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  <Clock size={15} className="mt-0.5 shrink-0" />
                  <div>
                    Mon–Fri: 8:00 AM–6:00 PM<br />
                    Sat: 9:00 AM–2:00 PM
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--muted-foreground)' }}
        >
          <p>© {new Date().getFullYear()} Loudoun Decks LLC. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms-and-conditions/" className="hover:text-amber-500 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy-policy/" className="hover:text-amber-500 transition-colors">
              Privacy Policy
            </Link>
          </div>
          {/* <p>
            Developed by{' '}
            <a
              href="https://www.fiverr.com/shah_jalal_web"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-amber-500 transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              Shah Jalal
            </a>
            {' | '}
            <a
              href="https://wa.me/8801832822560"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-500 transition-colors"
            >
              WhatsApp
            </a>
          </p> */}
        </div>
      </div>
    </footer>
  );
}

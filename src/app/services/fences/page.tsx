import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Fence Installation',
  description: 'Professional fence installation in Northern Virginia. Privacy, security, and decorative fencing. Free estimate from Loudoun Decks.',
};

export default function FencesPage() {
  return (
    <ServicePageTemplate
      badge="Services"
      title="Fence"
      highlight=" Installation"
      description="Define your property, enhance privacy, and add curb appeal with a professionally installed fence. We build a variety of styles to complement your home."
      whatWeOffer={[
        { title: 'Privacy Fencing', desc: 'Tall solid panel fences for maximum privacy from neighbors and street traffic.' },
        { title: 'Decorative Fencing', desc: 'Picket fences, split-rail, and ornamental styles that enhance your home\'s curb appeal.' },
        { title: 'Security Fencing', desc: 'Sturdy, durable fencing solutions designed to secure your property and family.' },
        { title: 'Wood Fencing', desc: 'Classic cedar, pine, and pressure-treated wood fencing in various styles.' },
        { title: 'Metal Fencing', desc: 'Aluminum and steel fencing options for a modern, low-maintenance look.' },
        { title: 'Custom Heights', desc: 'We build fences at any height to meet your privacy and aesthetic needs.' },
      ]}
      process={['Free Consultation', 'Property Line Assessment', 'Material Selection', 'Professional Installation']}
      faqs={[
        { q: 'Do I need a permit for a fence in Virginia?', a: 'Permit requirements vary by city and county. We check local requirements and handle any necessary permits as part of our service.' },
        { q: 'What is the most popular fence material?', a: 'Wood (particularly cedar) remains very popular for its natural look. Vinyl and aluminum are popular for low-maintenance options.' },
        { q: 'How long does fence installation take?', a: 'Most residential fence projects are completed in 1–3 days depending on the length and style.' },
      ]}
      relatedServices={[
        { label: 'Fence Cleaning & Staining', href: '/services/outdoor-power-washing/fence-cleaning-and-staining/' },
        { label: 'New Decks', href: '/services/new-decks-installation/' },
      ]}
    />
  );
}

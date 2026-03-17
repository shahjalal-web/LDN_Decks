import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Porch Construction',
  description: 'Custom porch construction in Northern Virginia — front porch, open porch, and screened porch. Free estimate from Loudoun Decks.',
};

export default function PorchesPage() {
  return (
    <ServicePageTemplate
      badge="Services"
      title="Custom"
      highlight=" Porch Construction"
      description="Connect your indoor and outdoor living spaces with a beautifully crafted porch. We build front, open, and screened porches throughout Northern Virginia."
      whatWeOffer={[
        { title: 'Front Porch', desc: 'Traditional covered front porches that enhance curb appeal and create a welcoming entrance.' },
        { title: 'Open Porch', desc: 'Open-air porches for enjoying Northern Virginia\'s beautiful weather with an unobstructed view.' },
        { title: 'Screened Porch', desc: 'Fully screened porches that keep bugs out while letting fresh air in — perfect for Virginia summers.' },
        { title: 'Custom Roofing', desc: 'Various roofing options to match your home\'s existing architecture and style.' },
        { title: 'Flooring Options', desc: 'Wood, composite, or concrete flooring options to suit your preferences and budget.' },
        { title: 'Railing Systems', desc: 'Custom railing designs for safety and style that complement your home\'s architecture.' },
      ]}
      process={['Design Consultation', 'On-Site Measurement', 'Permit & Prep', 'Expert Construction']}
      faqs={[
        { q: 'What is the difference between a screened and open porch?', a: 'A screened porch has screen panels to keep insects out while allowing fresh air. An open porch has no screens — just an open-air covered space.' },
        { q: 'Do porches add value to a home?', a: 'Yes, a well-built porch can significantly increase your home\'s value and marketability, especially in the Northern Virginia market.' },
        { q: 'How long does porch construction take?', a: 'Most porch projects take 1–2 weeks depending on size and complexity.' },
      ]}
      relatedServices={[
        { label: 'Front Porch', href: '/services/porches/front-porch/' },
        { label: 'Open Porch', href: '/services/porches/open-porch/' },
        { label: 'Screened Porch', href: '/services/porches/screened-porch/' },
        { label: 'New Decks', href: '/services/new-decks-installation/' },
      ]}
    />
  );
}

import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'House Siding Washing',
  description: 'Professional house siding washing in Northern Virginia. Safe cleaning for vinyl, wood, brick, and stucco. Free estimate from Loudoun Decks.',
};

export default function HouseSidingWashingPage() {
  return (
    <ServicePageTemplate
      badge="Outdoor Washing"
      title="House Siding"
      highlight=" Washing"
      description="Keep your home looking its best with professional house siding washing. We safely clean all siding types without damaging surfaces or paint."
      whatWeOffer={[
        { title: 'Vinyl Siding Cleaning', desc: 'Safe low-pressure washing that removes dirt and oxidation from vinyl siding.' },
        { title: 'Wood Siding Washing', desc: 'Gentle cleaning techniques that protect painted and stained wood surfaces.' },
        { title: 'Brick & Stucco Cleaning', desc: 'Remove algae, mold, and staining from masonry surfaces with appropriate methods.' },
        { title: 'Full Exterior Wash', desc: 'Comprehensive exterior cleaning including eaves, fascia, and trim areas.' },
      ]}
      process={['Free Assessment', 'Surface Testing', 'Safe Washing', 'Quality Check']}
      faqs={[
        { q: 'Will power washing damage my vinyl siding?', a: 'No, when done correctly. We use appropriate pressure levels and techniques for each siding type to prevent damage.' },
        { q: 'How often should I wash my house siding?', a: 'We recommend washing exterior siding every 1–2 years to prevent buildup of mold, mildew, and dirt.' },
      ]}
      relatedServices={[
        { label: 'All Outdoor Washing', href: '/services/outdoor-power-washing/' },
        { label: 'Deck Washing', href: '/services/outdoor-power-washing/deck-washing/' },
      ]}
    />
  );
}

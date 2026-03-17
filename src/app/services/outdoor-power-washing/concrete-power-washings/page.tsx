import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Concrete Power Washing',
  description: 'Professional concrete power washing in Northern Virginia. Restore driveways, walkways, and patios. Free estimate from Loudoun Decks.',
};

export default function ConcreteWashingPage() {
  return (
    <ServicePageTemplate
      badge="Outdoor Washing"
      title="Concrete"
      highlight=" Power Washing"
      description="Restore your driveways, walkways, patios, and garage floors to their original look with our professional concrete power washing service."
      whatWeOffer={[
        { title: 'Driveway Cleaning', desc: 'Remove oil stains, tire marks, and years of grime from concrete driveways.' },
        { title: 'Walkway Restoration', desc: 'Brighten up your walkways and sidewalks with a thorough pressure wash.' },
        { title: 'Patio Cleaning', desc: 'Remove mold, algae, and staining from concrete and paver patios.' },
        { title: 'Garage Floor Washing', desc: 'Deep clean garage floors to remove oil, grease, and dirt buildup.' },
      ]}
      process={['Schedule Visit', 'Pre-Treatment Application', 'Pressure Washing', 'Final Rinse & Inspection']}
      faqs={[
        { q: 'Can you remove oil stains from concrete?', a: 'Yes. We use appropriate degreasers and high-pressure washing to significantly reduce or eliminate oil stains from concrete surfaces.' },
        { q: 'Will power washing crack my concrete?', a: 'No. We use appropriate pressure levels for concrete. Properly maintained concrete is designed to handle high-pressure washing.' },
      ]}
      relatedServices={[
        { label: 'All Outdoor Washing', href: '/services/outdoor-power-washing/' },
        { label: 'Deck Washing', href: '/services/outdoor-power-washing/deck-washing/' },
      ]}
    />
  );
}

import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Outdoor Power Washing',
  description: 'Professional outdoor power washing services in Northern Virginia — deck, siding, concrete, and fence cleaning. Free estimate from Loudoun Decks.',
};

export default function OutdoorWashingPage() {
  return (
    <ServicePageTemplate
      badge="Services"
      title="Outdoor"
      highlight=" Power Washing"
      description="Restore your outdoor surfaces to their original beauty. We professionally clean decks, house siding, concrete, and fences — removing dirt, mold, algae, and stains."
      whatWeOffer={[
        { title: 'Deck Washing', desc: 'Remove years of grime, mold, and algae from your deck surface, preparing it for staining or sealing.' },
        { title: 'House Siding Washing', desc: 'Safely clean vinyl, wood, brick, and stucco siding without damaging paint or surfaces.' },
        { title: 'Concrete Washing', desc: 'Restore driveways, walkways, and patios by blasting away oil stains, mildew, and discoloration.' },
        { title: 'Fence Cleaning & Staining', desc: 'Clean and optionally stain or seal your wood fence to protect it from the elements.' },
        { title: 'Safe Equipment', desc: 'We use professional-grade equipment with adjustable pressure to protect delicate surfaces.' },
        { title: 'Eco-Friendly Detergents', desc: 'Our cleaning solutions are environmentally safe and effective for all surface types.' },
      ]}
      process={['Free Assessment', 'Equipment Setup', 'Professional Cleaning', 'Final Inspection']}
      faqs={[
        { q: 'How often should I power wash my deck?', a: 'We recommend power washing your deck at least once a year, ideally in spring, before applying any sealant or stain.' },
        { q: 'Will power washing damage my deck?', a: 'When done correctly with proper pressure settings, power washing is safe for most decking materials. We adjust pressure based on the surface type.' },
        { q: 'Do you offer soft washing?', a: 'Yes. For delicate surfaces like painted wood or certain types of siding, we use a softer low-pressure wash with appropriate cleaning solutions.' },
      ]}
      relatedServices={[
        { label: 'Deck Washing', href: '/services/outdoor-power-washing/deck-washing/' },
        { label: 'House Siding Washing', href: '/services/outdoor-power-washing/house-siding-washing/' },
        { label: 'Concrete Washing', href: '/services/outdoor-power-washing/concrete-power-washings/' },
        { label: 'Fence Cleaning', href: '/services/outdoor-power-washing/fence-cleaning-and-staining/' },
      ]}
    />
  );
}

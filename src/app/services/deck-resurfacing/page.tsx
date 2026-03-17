import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Deck Resurfacing',
  description: 'Professional deck resurfacing in Northern Virginia. Refresh your deck\'s surface without a full rebuild. Free estimate from Loudoun Decks.',
};

export default function DeckResurfacingPage() {
  return (
    <ServicePageTemplate
      badge="Services"
      title="Deck"
      highlight=" Resurfacing"
      description="When your deck's structure is still solid but the surface looks worn, resurfacing is the smart, cost-effective solution. We'll make it look brand new."
      whatWeOffer={[
        { title: 'Structural Assessment', desc: 'We inspect your existing deck structure to ensure it\'s sound before resurfacing.' },
        { title: 'Old Board Removal', desc: 'Careful removal of old, worn, or damaged decking boards and railings.' },
        { title: 'New Decking Installation', desc: 'Installation of new composite or wood decking boards in your preferred style and color.' },
        { title: 'Railing Upgrades', desc: 'Modernize your deck\'s look with new railing systems while we have access.' },
        { title: 'Hardware Replacement', desc: 'All fasteners, brackets, and hardware are replaced with corrosion-resistant options.' },
        { title: 'Cost-Effective Solution', desc: 'Resurfacing costs significantly less than a full deck rebuild while delivering near-new results.' },
      ]}
      process={['Free Consultation', 'Structural Inspection', 'Material Selection', 'Resurfacing & Completion']}
      faqs={[
        { q: 'How do I know if my deck needs resurfacing vs. full replacement?', a: 'If the frame, joists, and posts are in good condition but the surface boards are worn, resurfacing is usually the right call. We\'ll assess this for free.' },
        { q: 'Can I change the color or material during resurfacing?', a: 'Absolutely! Resurfacing is a great opportunity to upgrade from wood to composite or to change the deck\'s color and style.' },
        { q: 'How long does resurfacing take?', a: 'Most deck resurfacing projects are completed in 1–3 days depending on the deck size.' },
      ]}
      relatedServices={[
        { label: 'New Deck Installation', href: '/services/new-decks-installation/' },
        { label: 'Outdoor Power Washing', href: '/services/outdoor-power-washing/' },
      ]}
    />
  );
}

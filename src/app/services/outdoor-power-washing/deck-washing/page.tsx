import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Deck Washing',
  description: 'Professional deck washing services in Northern Virginia. Remove mold, algae, and stains from your deck. Free estimate from Loudoun Decks.',
};

export default function DeckWashingPage() {
  return (
    <ServicePageTemplate
      badge="Outdoor Washing"
      title="Professional"
      highlight=" Deck Washing"
      description="Bring your deck back to life with our professional deck washing service. We remove mold, mildew, algae, and years of built-up grime safely and effectively."
      whatWeOffer={[
        { title: 'Mold & Mildew Removal', desc: 'Eliminate health-hazardous mold and mildew growth from all deck surfaces.' },
        { title: 'Algae & Stain Cleaning', desc: 'Remove green algae, black stains, and discoloration that make decks look old.' },
        { title: 'Pre-Stain Preparation', desc: 'Proper washing is essential before applying any stain or sealant to your deck.' },
        { title: 'Safe Pressure Levels', desc: 'We use the right pressure for your decking material — composite, wood, or PVC.' },
      ]}
      process={['Schedule Appointment', 'Surface Assessment', 'Professional Wash', 'Rinse & Dry Inspection']}
      faqs={[
        { q: 'Should I wash my deck before staining?', a: 'Yes, absolutely. Washing is a critical first step before any staining or sealing. It ensures the product adheres properly.' },
        { q: 'How long does deck washing take?', a: 'A standard deck washing takes 2–4 hours depending on size and condition.' },
      ]}
      relatedServices={[
        { label: 'All Outdoor Washing', href: '/services/outdoor-power-washing/' },
        { label: 'Fence Cleaning', href: '/services/outdoor-power-washing/fence-cleaning-and-staining/' },
        { label: 'Deck Resurfacing', href: '/services/deck-resurfacing/' },
      ]}
    />
  );
}

import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'New Deck Installation',
  description: 'Custom new deck installation in Northern Virginia. Loudoun Decks builds beautiful, durable custom decks tailored to your home. Free estimate.',
};

export default function NewDecksPage() {
  return (
    <ServicePageTemplate
      badge="Services"
      title="New Deck"
      highlight=" Installation"
      description="Transform your backyard with a custom-built deck designed around your home's architecture and your lifestyle. We handle everything from design to the final board."
      whatWeOffer={[
        { title: 'Custom Layout Planning', desc: 'We design a deck that perfectly fits your home\'s footprint, style, and how you plan to use the space.' },
        { title: 'Structural Engineering', desc: 'Every deck we build meets or exceeds local building codes with proper structural design and footings.' },
        { title: 'Permit Handling', desc: 'We take care of all permit applications and inspections so you don\'t have to worry about the paperwork.' },
        { title: 'Premium Materials', desc: 'We use top brands like Trex, Fiberon, and TimberTech for composite decks, or premium wood for traditional builds.' },
        { title: 'Railing & Stairs', desc: 'Custom railing systems and stair configurations built for safety, style, and code compliance.' },
        { title: 'Lighting Integration', desc: 'Optional deck lighting integration to extend your outdoor enjoyment into the evening hours.' },
      ]}
      process={['Free Consultation', 'On-Site Visit & Design', 'Permit & Material Prep', 'Expert Construction']}
      faqs={[
        { q: 'How long does it take to build a new deck?', a: 'Most residential decks take 3–7 days to build depending on size and complexity. We provide a specific timeline in your estimate.' },
        { q: 'Do you build composite or wood decks?', a: 'We build both. We\'ll help you choose the best material based on your budget, maintenance preference, and aesthetic goals.' },
        { q: 'Do I need a permit for a new deck?', a: 'Most decks in Virginia require a permit. We handle the entire permit process for you as part of our service.' },
        { q: 'What brands of decking do you use?', a: 'We work with Trex, Fiberon, TimberTech, and other premium brands. We\'ll show you samples and options during consultation.' },
      ]}
      relatedServices={[
        { label: 'Deck Resurfacing', href: '/services/deck-resurfacing/' },
        { label: 'Porches', href: '/services/porches/' },
        { label: 'Patios', href: '/services/patios/' },
      ]}
    />
  );
}

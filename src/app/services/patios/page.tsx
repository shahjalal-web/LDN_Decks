import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export const metadata: Metadata = { title: 'Patio Construction', description: 'Custom patio construction in Northern Virginia. Beautiful outdoor spaces for relaxation and entertaining. Free estimate from Loudoun Decks.' };

export default function PatiosPage() {
  return (
    <ServicePageTemplate
      badge="Services"
      title="Custom"
      highlight=" Patio Construction"
      description="Create your perfect outdoor entertainment and relaxation space with a custom-built patio designed for Northern Virginia living."
      whatWeOffer={[
        { title: 'Custom Design', desc: 'Patios designed to complement your home, yard layout, and lifestyle preferences.' },
        { title: 'Various Materials', desc: 'Concrete, pavers, flagstone, and composite options to fit every budget and style.' },
        { title: 'Integrated Spaces', desc: 'Seamlessly combine patios with decks, porches, or pergolas for a complete outdoor living area.' },
        { title: 'Drainage Planning', desc: 'Proper grading and drainage design to prevent water pooling and long-term damage.' },
        { title: 'Fire Pit Areas', desc: 'Optional fire pit integration for cozy evening gatherings.' },
        { title: 'Lighting Options', desc: 'Low-voltage landscape and step lighting to extend your patio\'s usability after dark.' },
      ]}
      process={['Design Consultation', 'Site Assessment', 'Material Selection', 'Construction & Finishing']}
      faqs={[
        { q: 'What is the most durable patio material?', a: 'Concrete pavers are among the most durable and low-maintenance options, while flagstone offers a natural look with excellent longevity.' },
        { q: 'How long does patio construction take?', a: 'Most patio projects are completed in 3–7 days depending on size, material, and site preparation required.' },
        { q: 'Do patios require permits?', a: 'Most patios do not require permits, but it depends on size and local regulations. We check and handle any required permits.' },
      ]}
      relatedServices={[
        { label: 'New Decks', href: '/services/new-decks-installation/' },
        { label: 'Gazebo & Pergola', href: '/services/gazebos-and-pergolas/' },
        { label: 'Porches', href: '/services/porches/' },
      ]}
    />
  );
}

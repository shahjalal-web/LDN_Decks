import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Gazebos and Pergolas',
  description: 'Custom gazebo and pergola construction in Northern Virginia. Elegant outdoor shade structures built with premium cedar. Free estimate from Loudoun Decks.',
};

export default function GazeboPergolaPage() {
  return (
    <ServicePageTemplate
      badge="Services"
      title="Gazebos &"
      highlight=" Pergolas"
      description="Add elegance, shade, and character to your outdoor space with a custom-built gazebo or pergola. Crafted from premium red cedar for lasting beauty."
      whatWeOffer={[
        { title: 'Freestanding Gazebos', desc: 'Fully enclosed gazebos with solid roofs for complete shade and weather protection.' },
        { title: 'Attached Pergolas', desc: 'Pergolas attached to your home that extend your living space into the outdoors.' },
        { title: 'Freestanding Pergolas', desc: 'Open-beam pergola structures placed anywhere in your yard as a focal point.' },
        { title: 'Red Cedar Construction', desc: 'We build with premium red cedar — naturally resistant to rot, insects, and weathering.' },
        { title: 'Custom Sizing', desc: 'Every structure is sized and designed to fit your space and complement your home.' },
        { title: 'Lighting & Fans', desc: 'Optional electrical integration for ceiling fans and lighting to extend usability.' },
      ]}
      process={['Design Consultation', 'On-Site Measurement', 'Material Prep & Permit', 'Expert Build']}
      faqs={[
        { q: 'What is the difference between a gazebo and pergola?', a: 'A gazebo has a solid roof and fully enclosed structure, providing complete shade. A pergola has an open lattice or beam roof that provides partial shade and a more open feel.' },
        { q: 'What wood do you use for gazebos and pergolas?', a: 'We primarily use red cedar, which is naturally rot-resistant, beautiful, and long-lasting. We can also work with pressure-treated wood or composite materials.' },
        { q: 'Do pergolas need permits?', a: 'Depending on size and location, a permit may be required. We handle all permit applications as part of our service.' },
      ]}
      relatedServices={[
        { label: 'New Decks', href: '/services/new-decks-installation/' },
        { label: 'Porches', href: '/services/porches/' },
        { label: 'Patios', href: '/services/patios/' },
      ]}
    />
  );
}

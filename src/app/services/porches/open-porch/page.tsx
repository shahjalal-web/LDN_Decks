import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export const metadata: Metadata = { title: 'Open Porch Construction', description: 'Custom open porch construction in Northern Virginia. Enjoy the outdoors with a beautiful open-air porch. Free estimate from Loudoun Decks.' };

export default function OpenPorchPage() {
  return (
    <ServicePageTemplate
      badge="Porches"
      title="Open Porch"
      highlight=" Construction"
      description="Enjoy the fresh air and beautiful Northern Virginia scenery from your custom-built open porch — the perfect outdoor retreat."
      whatWeOffer={[
        { title: 'Open-Air Design', desc: 'Open porches without screens for the ultimate outdoor living experience.' },
        { title: 'Covered Roof', desc: 'Protection from rain and sun while still enjoying open-air ambiance.' },
        { title: 'Custom Flooring', desc: 'Wood, composite, or concrete flooring in your preferred style.' },
        { title: 'Railing Systems', desc: 'Beautiful and safe railing options to match your home\'s aesthetic.' },
      ]}
      process={['Consultation', 'Design & Planning', 'Permitting', 'Construction']}
      faqs={[
        { q: 'Is an open porch the same as a deck?', a: 'Not quite. An open porch is typically covered with a roof and attached to the home\'s structure, while a deck is usually uncovered.' },
        { q: 'Can I convert an open porch to a screened porch later?', a: 'Yes! We design open porches with this future option in mind. Converting to screened is straightforward if the structure is properly built.' },
      ]}
      relatedServices={[
        { label: 'All Porches', href: '/services/porches/' },
        { label: 'Front Porch', href: '/services/porches/front-porch/' },
        { label: 'Screened Porch', href: '/services/porches/screened-porch/' },
      ]}
    />
  );
}

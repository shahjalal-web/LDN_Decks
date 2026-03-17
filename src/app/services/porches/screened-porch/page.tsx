import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export const metadata: Metadata = { title: 'Screened Porch Construction', description: 'Custom screened porch construction in Northern Virginia. Keep bugs out and enjoy the outdoors. Free estimate from Loudoun Decks.' };

export default function ScreenedPorchPage() {
  return (
    <ServicePageTemplate
      badge="Porches"
      title="Screened Porch"
      highlight=" Construction"
      description="Enjoy Virginia's beautiful outdoors without the bugs. A custom screened porch lets you relax in fresh air with full protection from insects."
      whatWeOffer={[
        { title: 'Full Screen Enclosure', desc: 'High-quality screening panels that keep insects out and let fresh air in.' },
        { title: 'Screen Door', desc: 'Convenient screened door with smooth opening mechanism for easy access.' },
        { title: 'Solid Roof', desc: 'Full weatherproof roof for complete rain and UV protection.' },
        { title: 'Custom Sizing', desc: 'Built to whatever size best suits your outdoor living needs.' },
      ]}
      process={['Design Consultation', 'Measurement & Layout', 'Permit & Framing', 'Screen & Finishing']}
      faqs={[
        { q: 'What type of screen material do you use?', a: 'We use heavy-duty fiberglass or aluminum screening, depending on your preference and the level of durability required.' },
        { q: 'Can a screened porch be used year-round?', a: 'Yes, especially in Northern Virginia\'s mild climate. Many clients use their screened porch 9–10 months of the year.' },
        { q: 'Can I add a ceiling fan to my screened porch?', a: 'Absolutely! We can integrate electrical wiring for ceiling fans and lighting as part of the build.' },
      ]}
      relatedServices={[
        { label: 'All Porches', href: '/services/porches/' },
        { label: 'Front Porch', href: '/services/porches/front-porch/' },
        { label: 'Open Porch', href: '/services/porches/open-porch/' },
      ]}
    />
  );
}

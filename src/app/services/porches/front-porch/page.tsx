import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Front Porch Construction',
  description: 'Custom front porch construction in Northern Virginia. Enhance your home\'s curb appeal. Free estimate from Loudoun Decks.',
};

export default function FrontPorchPage() {
  return (
    <ServicePageTemplate
      badge="Porches"
      title="Front Porch"
      highlight=" Construction"
      description="Create a welcoming entrance and boost your home's curb appeal with a beautifully crafted custom front porch."
      whatWeOffer={[
        { title: 'Custom Design', desc: 'Tailored front porch designs that complement your home\'s architectural style.' },
        { title: 'Covered Roofing', desc: 'Weather-resistant roofing that matches your existing roof material and pitch.' },
        { title: 'Steps & Railings', desc: 'Safe, stylish steps and railing systems designed to code and to impress.' },
        { title: 'Flooring Options', desc: 'Wood, composite, or concrete flooring to match your style and budget.' },
      ]}
      process={['Design Consultation', 'Measurement & Planning', 'Permit Handling', 'Construction']}
      faqs={[
        { q: 'Will a front porch increase my home\'s value?', a: 'Yes! Front porches are highly valued in Northern Virginia and can significantly boost curb appeal and resale value.' },
        { q: 'How wide can a front porch be?', a: 'We custom size every porch. Front porches typically span the full width of the home\'s front facade or a portion of it based on your preference.' },
      ]}
      relatedServices={[
        { label: 'All Porches', href: '/services/porches/' },
        { label: 'Open Porch', href: '/services/porches/open-porch/' },
        { label: 'Screened Porch', href: '/services/porches/screened-porch/' },
      ]}
    />
  );
}

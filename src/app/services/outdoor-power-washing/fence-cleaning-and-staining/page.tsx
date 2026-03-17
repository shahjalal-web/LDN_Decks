import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Fence Cleaning and Staining',
  description: 'Professional fence cleaning and staining in Northern Virginia. Restore and protect your wood fence. Free estimate from Loudoun Decks.',
};

export default function FenceCleaningPage() {
  return (
    <ServicePageTemplate
      badge="Outdoor Washing"
      title="Fence Cleaning"
      highlight=" & Staining"
      description="Restore your fence to its original beauty and protect it from the elements with our professional cleaning and staining service."
      whatWeOffer={[
        { title: 'Wood Fence Cleaning', desc: 'Remove mold, mildew, and gray weathering from wood fence panels and posts.' },
        { title: 'Fence Staining', desc: 'Apply premium stain to protect your fence from UV rays, moisture, and rot.' },
        { title: 'Sealing Service', desc: 'Optional clear sealant application for maximum long-term weather protection.' },
        { title: 'Vinyl Fence Washing', desc: 'Safe cleaning for vinyl and composite fencing without damage.' },
      ]}
      process={['Inspection', 'Cleaning', 'Drying Period', 'Staining/Sealing']}
      faqs={[
        { q: 'How often should I stain my fence?', a: 'Most wood fences benefit from staining every 2–3 years depending on sun exposure and weather conditions.' },
        { q: 'What type of stain do you use?', a: 'We use premium penetrating oil-based or water-based stains from trusted brands based on your wood type and desired finish.' },
      ]}
      relatedServices={[
        { label: 'All Outdoor Washing', href: '/services/outdoor-power-washing/' },
        { label: 'Fence Installation', href: '/services/fences/' },
      ]}
    />
  );
}

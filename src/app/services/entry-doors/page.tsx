import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Entry Doors',
  description: 'Entry door installation and replacement in Northern Virginia. Boost curb appeal and security. Free estimate from Loudoun Decks.',
};

export default function EntryDoorsPage() {
  return (
    <ServicePageTemplate
      badge="Services"
      title="Entry Door"
      highlight=" Installation"
      description="Make a lasting first impression with a beautiful new entry door. We install and replace front doors for Northern Virginia homeowners."
      whatWeOffer={[
        { title: 'Door Replacement', desc: 'Remove your old door and install a new one with improved insulation and aesthetics.' },
        { title: 'New Door Installation', desc: 'Full new door installation including frame, trim, and hardware for new construction or additions.' },
        { title: 'Energy Efficiency', desc: 'Modern doors with superior weatherstripping and insulation to reduce energy costs.' },
        { title: 'Security Features', desc: 'Enhanced locking systems and solid construction for improved home security.' },
        { title: 'Custom Styles', desc: 'Wide variety of door styles, colors, and glass options to match your home\'s architecture.' },
        { title: 'Hardware & Trim', desc: 'Complete door installation including handles, locks, hinges, and exterior trim.' },
      ]}
      process={['Measurement & Selection', 'Order & Delivery', 'Old Door Removal', 'New Door Installation']}
      faqs={[
        { q: 'How long does door installation take?', a: 'A standard door replacement typically takes 4–8 hours. We handle removal, installation, and all trim work in one visit.' },
        { q: 'Do you supply the door or do I?', a: 'We can source and supply the door for you, or install a door you\'ve already purchased. Either works for us.' },
        { q: 'What door brands do you work with?', a: 'We work with multiple trusted door manufacturers and can help you choose based on style, budget, and performance requirements.' },
      ]}
      relatedServices={[
        { label: 'Porches', href: '/services/porches/' },
        { label: 'New Decks', href: '/services/new-decks-installation/' },
      ]}
    />
  );
}

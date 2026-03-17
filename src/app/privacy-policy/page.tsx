import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Loudoun Decks LLC.',
};

export default function PrivacyPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <PageHero badge="Legal" title="Privacy" highlight=" Policy" description="Your privacy is important to us. This policy explains how we collect and use your information." cta={false} />
      <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
          <div>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--foreground)' }}>1. Information We Collect</h2>
            <p>We collect information you provide directly to us when you fill out our contact or estimate request forms, including your name, email address, phone number, and project details. We also collect standard web analytics data through Google Analytics and Google Tag Manager.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--foreground)' }}>2. How We Use Your Information</h2>
            <p>We use your information to respond to your estimate requests, schedule consultations, improve our services, and communicate relevant offers. We do not sell your personal information to third parties.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--foreground)' }}>3. Cookies</h2>
            <p>Our website uses cookies for analytics and advertising purposes through Google Analytics, Google Ads, and Facebook Pixel. You can opt out of these through your browser settings or through the appropriate opt-out tools provided by each platform.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--foreground)' }}>4. Data Security</h2>
            <p>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no internet transmission is 100% secure.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--foreground)' }}>5. Contact</h2>
            <p>If you have questions about this privacy policy, contact us at office@ldndecks.com or call +1 (571) 655-7207.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

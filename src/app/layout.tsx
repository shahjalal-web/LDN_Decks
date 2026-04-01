import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar, type NavService, type NavCounty } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const GTM_ID = 'GTM-N87MG6QS';

export const metadata: Metadata = {
  title: {
    default: 'Loudoun Decks | Professional Deck Builder in Northern Virginia',
    template: '%s | Loudoun Decks',
  },
  description:
    'Licensed outdoor living contractor serving Northern Virginia. Custom decks, porches, patios, fences & more. Free estimates. Call +1 (571) 655-7207.',
  keywords: ['deck builder', 'Northern Virginia', 'Loudoun County', 'custom decks', 'porch', 'patio'],
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getNavServices(): Promise<NavService[]> {
  try {
    const res = await fetch(`${API_URL}/services`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data as { title: string; slug: string; description: string; icon?: string; children?: { title: string; slug: string; description: string; icon?: string }[] }[]).map((s) => ({
      title: s.title,
      slug: s.slug,
      description: s.description,
      icon: s.icon,
      children: s.children?.map((c) => ({
        title: c.title,
        slug: c.slug,
        description: c.description,
        icon: c.icon,
      })),
    }));
  } catch {
    return [];
  }
}

async function getNavCounties(): Promise<NavCounty[]> {
  try {
    const res = await fetch(`${API_URL}/cities`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const cities = await res.json() as { name: string; slug: string; county: string; isActive: boolean }[];
    const activeCities = cities.filter((c) => c.isActive);

    // Group by county
    const countyMap = new Map<string, { name: string; slug: string }[]>();
    for (const city of activeCities) {
      if (!countyMap.has(city.county)) countyMap.set(city.county, []);
      countyMap.get(city.county)!.push({ name: city.name, slug: city.slug });
    }

    return Array.from(countyMap.entries()).map(([name, citiesList]) => ({
      name,
      cities: citiesList,
    }));
  } catch {
    return [];
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [services, counties] = await Promise.all([getNavServices(), getNavCounties()]);

  return (
    <html lang="en" suppressHydrationWarning className="w-full">
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body className="w-full min-h-screen flex flex-col">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ThemeProvider>
          <AuthProvider>
            <Navbar services={services} counties={counties} />
            <main className="w-full flex-1">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

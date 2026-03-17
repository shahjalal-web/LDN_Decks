import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Loudoun Decks | Professional Deck Builder in Northern Virginia',
    template: '%s | Loudoun Decks',
  },
  description:
    'Licensed outdoor living contractor serving Northern Virginia. Custom decks, porches, patios, fences & more. Free estimates. Call +1 (571) 655-7207.',
  keywords: ['deck builder', 'Northern Virginia', 'Loudoun County', 'custom decks', 'porch', 'patio'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="w-full">
      <body className="w-full min-h-screen flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="w-full flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

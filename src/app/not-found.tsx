import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';

export const metadata = {
  title: '404 - Page Not Found',
};

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="text-center max-w-md">
        <p
          className="text-8xl font-bold mb-4"
          style={{ color: 'var(--accent)' }}
        >
          404
        </p>
        <h1
          className="text-2xl font-bold mb-3"
          style={{ color: 'var(--foreground)' }}
        >
          Page Not Found
        </h1>
        <p
          className="text-sm leading-relaxed mb-8"
          style={{ color: 'var(--muted-foreground)' }}
        >
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--accent-foreground)',
            }}
          >
            <Home size={15} />
            Back to Home
          </Link>
          <Link
            href="/contacts/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold border-2 transition-all hover:scale-105"
            style={{
              borderColor: 'var(--border)',
              color: 'var(--foreground)',
            }}
          >
            Contact Us <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}

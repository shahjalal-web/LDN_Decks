import DashboardClient from './DashboardClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchCount(endpoint: string): Promise<number> {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return Array.isArray(data) ? data.length : 0;
  } catch {
    return 0;
  }
}

export default async function DashboardPage() {
  const [services, blogs, showcases, cities, faqs] = await Promise.all([
    fetchCount('services'),
    fetchCount('blogs'),
    fetchCount('showcases'),
    fetchCount('cities'),
    fetchCount('faqs'),
  ]);

  return (
    <DashboardClient
      initialCounts={{ services, blogs, showcases, cities, faqs }}
    />
  );
}

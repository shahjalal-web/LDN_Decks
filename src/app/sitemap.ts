import type { MetadataRoute } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const SITE_URL = 'https://ldndecks.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/services/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/contacts/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/deck-projects-showcase/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/blog-deck-tips/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/top-decks-build-near-you/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/about-loudoun-deck-company/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/why-choose-us/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/our-process/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/faq-deck-building/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/privacy-policy/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms-and-conditions/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Dynamic: Services (parents + children)
  let servicePages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}/services`, { next: { revalidate: 3600 } });
    const services = await res.json();
    for (const svc of services) {
      servicePages.push({
        url: `${SITE_URL}/services/${svc.slug}/`,
        lastModified: new Date(svc.updatedAt || Date.now()),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
      if (svc.children) {
        for (const child of svc.children) {
          servicePages.push({
            url: `${SITE_URL}/services/${svc.slug}/${child.slug}/`,
            lastModified: new Date(child.updatedAt || Date.now()),
            changeFrequency: 'weekly',
            priority: 0.7,
          });
        }
      }
    }
  } catch {}

  // Dynamic: Cities
  let cityPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}/cities`, { next: { revalidate: 3600 } });
    const cities = await res.json();
    cityPages = cities
      .filter((c: { isActive: boolean }) => c.isActive)
      .map((c: { slug: string; updatedAt?: string }) => ({
        url: `${SITE_URL}/top-decks-build-near-you/${c.slug}/`,
        lastModified: new Date(c.updatedAt || Date.now()),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
  } catch {}

  // Dynamic: Blogs
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}/blogs`, { next: { revalidate: 3600 } });
    const blogs = await res.json();
    blogPages = blogs
      .filter((b: { isPublished: boolean }) => b.isPublished)
      .map((b: { slug: string; updatedAt?: string }) => ({
        url: `${SITE_URL}/${b.slug}/`,
        lastModified: new Date(b.updatedAt || Date.now()),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
  } catch {}

  // Dynamic: Showcases
  let showcasePages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}/showcases`, { next: { revalidate: 3600 } });
    const showcases = await res.json();
    showcasePages = showcases.map((s: { slug: string; updatedAt?: string }) => ({
      url: `${SITE_URL}/deck-projects-showcase/${s.slug}/`,
      lastModified: new Date(s.updatedAt || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch {}

  return [...staticPages, ...servicePages, ...cityPages, ...blogPages, ...showcasePages];
}

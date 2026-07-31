import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cvyon.com';

  const staticRoutes = [
    '',
    '/auth',
    '/builder',
    '/dashboard',
    '/pricing',
    '/templates',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // You can fetch dynamic blog routes here if you have a CMS
  
  return [...staticRoutes];
}

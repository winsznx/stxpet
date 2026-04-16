import type { MetadataRoute } from 'next';
import { APP_URL } from '@/lib/constants';
import { ROUTES } from '@/lib/constants/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${APP_URL}${ROUTES.home}`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${APP_URL}${ROUTES.leaderboard}`, lastModified: now, changeFrequency: 'hourly', priority: 0.8 },
  ];
}

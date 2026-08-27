import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }));

  return [
    { url: SITE.url, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE.url}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...posts,
  ];
}

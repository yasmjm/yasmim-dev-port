import React from 'react';
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Notas sobre automação, web scraping, integração de IA e as decisões técnicas por trás dos meus projetos.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    url: `${SITE.url}/blog`,
    title: `Blog | ${SITE.name}`,
    description:
      'Notas sobre automação, web scraping, integração de IA e as decisões técnicas por trás dos meus projetos.',
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <header className="mb-16 max-w-2xl">
        <h1 className="mb-4 text-4xl font-bold tracking-tighter md:text-5xl">Blog</h1>
        <p className="text-lg text-gray-600">
          Onde eu escrevo o que aprendi construindo automações, scrapers e integrações de IA — o
          problema, as decisões e o que eu faria diferente.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-gray-600">Nenhum post publicado ainda. Volte em breve.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

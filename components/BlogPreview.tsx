import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getAllPosts } from '@/lib/posts';
import { PostCard } from './PostCard';

export const BlogPreview: React.FC = () => {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="border-y border-gray-100 bg-gray-50/50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="mb-4 text-3xl font-bold">Do Blog</h2>
            <p className="max-w-md text-gray-600">
              Notas sobre automação, scraping e as decisões técnicas por trás dos projetos.
            </p>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm font-semibold transition-colors hover:text-blue-700"
          >
            Ver todos os posts
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

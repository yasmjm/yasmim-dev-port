import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PostMeta, formatDate } from '@/lib/posts';

export const PostCard: React.FC<{ post: PostMeta }> = ({ post }) => {
  return (
    <article className="group relative rounded-3xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:shadow-xl">
      <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-gray-600">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingMinutes} min de leitura</span>
        {post.draft && (
          <span className="rounded bg-amber-100 px-2 py-0.5 font-bold uppercase tracking-wide text-amber-800">
            Rascunho
          </span>
        )}
      </div>

      <h3 className="mb-3 text-xl font-bold leading-snug transition-colors group-hover:text-blue-700">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h3>

      <p className="mb-6 text-sm leading-relaxed text-gray-600">{post.summary}</p>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-gray-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-700" />
      </div>
    </article>
  );
};

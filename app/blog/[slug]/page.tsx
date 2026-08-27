import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import { getAllPosts, getPostBySlug, formatDate } from '@/lib/posts';
import { mdxComponents } from '@/components/mdx';
import { SITE } from '@/lib/site';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      authors: [SITE.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
    },
  };
}

const mdxOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'github-dark-dimmed',
          keepBackground: true,
          defaultLang: 'ts',
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['heading-anchor'], ariaHidden: true, tabIndex: -1 },
          content: { type: 'text', value: '#' },
        },
      ],
    ],
  },
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(', '),
    author: { '@type': 'Person', name: SITE.author.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/blog"
        className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-black"
      >
        <ArrowLeft className="h-4 w-4" />
        Todos os posts
      </Link>

      <header className="mb-12 border-b border-gray-100 pb-10">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} min de leitura</span>
          {post.draft && (
            <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-amber-800">
              Rascunho
            </span>
          )}
        </div>

        <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tighter md:text-5xl">
          {post.title}
        </h1>

        {post.summary && <p className="text-lg leading-relaxed text-gray-600">{post.summary}</p>}

        {post.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-gray-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-gray max-w-none prose-headings:tracking-tight prose-a:text-blue-700 prose-a:underline-offset-4 prose-pre:border prose-pre:border-black/10">
        <MDXRemote source={post.content} options={mdxOptions} components={mdxComponents} />
      </div>

      <footer className="mt-16 rounded-3xl border border-gray-100 bg-white p-8 text-center">
        <p className="mb-4 text-gray-600">
          Curtiu? Me chama para trocar uma ideia sobre automação e scraping.
        </p>
        <a
          href={`mailto:${SITE.author.email}`}
          className="inline-block rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          Falar comigo
        </a>
      </footer>
    </article>
  );
}

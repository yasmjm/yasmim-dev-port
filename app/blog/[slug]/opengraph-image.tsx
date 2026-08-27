import { ImageResponse } from 'next/og';
import { getAllPosts, getPostBySlug, formatDate } from '@/lib/posts';
import { SITE } from '@/lib/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Prévia do post';

/** Gera a imagem no build, em vez de sob demanda a cada compartilhamento. */
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

/** Gera a imagem que aparece quando o link do post é compartilhado. */
export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0a',
          padding: 72,
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: '#2563eb',
              display: 'flex',
            }}
          />
          <div style={{ fontSize: 26, color: '#a3a3a3', letterSpacing: 1 }}>
            {SITE.url.replace(/^https?:\/\//, '')}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2 }}>
            {post?.title ?? 'Blog'}
          </div>
          {post?.summary ? (
            <div style={{ fontSize: 30, color: '#a3a3a3', lineHeight: 1.4 }}>
              {post.summary.length > 130 ? `${post.summary.slice(0, 130)}…` : post.summary}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 26,
            color: '#a3a3a3',
            borderTop: '1px solid #262626',
            paddingTop: 28,
          }}
        >
          <div style={{ display: 'flex', color: '#ffffff' }}>{SITE.author.name}</div>
          <div style={{ display: 'flex' }}>
            {post ? `${formatDate(post.date)} · ${post.readingMinutes} min` : ''}
          </div>
        </div>
      </div>
    ),
    size,
  );
}

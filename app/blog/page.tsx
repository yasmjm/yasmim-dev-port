import React from 'react';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { getAllPosts } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';
import { PRESS } from '@/constants';
import { SITE } from '@/lib/site';

const DESCRICAO =
  'Aparições na imprensa e notas sobre automação, web scraping e integração de IA.';

export const metadata: Metadata = {
  title: 'Blog',
  description: DESCRICAO,
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    url: `${SITE.url}/blog`,
    title: `Blog | ${SITE.name}`,
    description: DESCRICAO,
  },
};

/** Data curta para o bloco de imprensa: 18 de março de 2026. */
function formatarData(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <header className="mb-16 max-w-2xl">
        <h1 className="mb-4 text-4xl font-bold tracking-tighter md:text-5xl">Blog</h1>
        <p className="text-lg text-gray-600">
          Os textos próprios ainda estão no forno. Por enquanto, fica aqui o que já foi publicado
          sobre mim fora daqui.
        </p>
      </header>

      {/* Na imprensa: some sozinho se a lista estiver vazia. */}
      {PRESS.length > 0 && (
        <section aria-labelledby="imprensa">
          <h2
            id="imprensa"
            className="mb-6 text-sm font-semibold uppercase tracking-widest text-gray-500"
          >
            Na imprensa
          </h2>

          <ul className="grid gap-4">
            {PRESS.map((item) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start justify-between gap-6 rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-md md:p-8"
                >
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-500">
                      <span className="font-bold text-blue-700">{item.outlet}</span>
                      {item.section && (
                        <>
                          <span aria-hidden="true" className="text-gray-300">
                            /
                          </span>
                          <span>{item.section}</span>
                        </>
                      )}
                      <span aria-hidden="true" className="text-gray-300">
                        /
                      </span>
                      <time dateTime={item.date}>{formatarData(item.date)}</time>
                    </div>

                    <h3 className="mt-3 text-xl font-bold leading-snug tracking-tight transition-colors duration-300 group-hover:text-blue-700 md:text-2xl">
                      {item.title}
                    </h3>

                    <p className="mt-3 leading-relaxed text-gray-600">{item.note}</p>

                    {item.byline && (
                      <p className="mt-3 text-sm text-gray-500">Reportagem de {item.byline}</p>
                    )}
                  </div>

                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-700" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Posts próprios: entram aqui quando saírem de content/rascunhos. */}
      {posts.length > 0 && (
        <section aria-labelledby="escritos" className="mt-20">
          <h2
            id="escritos"
            className="mb-6 text-sm font-semibold uppercase tracking-widest text-gray-500"
          >
            Escritos por mim
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

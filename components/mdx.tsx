import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { MDXComponents } from 'mdx/types';

/**
 * Componentes disponíveis dentro dos arquivos .mdx.
 * É aqui que você registra qualquer coisa que queira usar no meio do texto,
 * tipo <Nota> ou um gráfico interativo.
 */
export const mdxComponents: MDXComponents = {
  a: ({ href = '', children, ...props }) => {
    const isInternal = href.startsWith('/') || href.startsWith('#');
    if (isInternal) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    );
  },

  img: ({ src = '', alt = '' }) => (
    <Image
      src={String(src)}
      alt={alt}
      width={1200}
      height={675}
      className="rounded-2xl border border-gray-100"
    />
  ),

  Nota: ({ children }: { children: React.ReactNode }) => (
    <aside className="my-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-6 text-sm leading-relaxed text-blue-950 [&>p]:my-0">
      {children}
    </aside>
  ),

  Alerta: ({ children }: { children: React.ReactNode }) => (
    <aside className="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-relaxed text-amber-950 [&>p]:my-0">
      {children}
    </aside>
  ),
};

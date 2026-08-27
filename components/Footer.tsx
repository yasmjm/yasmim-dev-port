import React from 'react';
import Link from 'next/link';
import { Rss } from 'lucide-react';
import { PERSONAL_INFO } from '@/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-100 bg-white px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. Todos os direitos reservados.
        </p>

        <div className="flex items-center gap-6 text-sm text-gray-600">
          <Link href="/blog" className="transition-colors hover:text-black">
            Blog
          </Link>
          <a
            href="/feed.xml"
            className="flex items-center gap-1.5 transition-colors hover:text-black"
          >
            <Rss className="h-4 w-4" /> RSS
          </a>
        </div>
      </div>
    </footer>
  );
};

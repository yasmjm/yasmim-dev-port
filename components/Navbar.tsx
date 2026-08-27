'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, PERSONAL_INFO } from '@/constants';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fecha o menu ao trocar de rota e trava o scroll enquanto ele está aberto.
  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onEsc);
    };
  }, [isOpen]);

  // Fora da home, as âncoras precisam voltar para "/" antes de rolar.
  const hrefFor = (href: string) => (href.startsWith('#') && !isHome ? `/${href}` : href);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled || isOpen ? 'glass py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold tracking-tight">
          {PERSONAL_INFO.name}
          <span className="text-blue-600">.</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center space-x-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={hrefFor(item.href)}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-black"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="rounded-full bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800"
          >
            Fale Comigo
          </a>
        </div>

        {/* Botão do menu mobile */}
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls="menu-mobile"
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          className="-mr-2 rounded-lg p-2 text-gray-700 transition-colors hover:bg-black/5 md:hidden"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Painel mobile */}
      <div
        id="menu-mobile"
        hidden={!isOpen}
        className="mt-4 border-t border-black/5 bg-white/95 px-6 pb-8 pt-6 backdrop-blur md:hidden"
      >
        <div className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={hrefFor(item.href)}
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-2 py-3 text-lg font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-black"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="mt-4 rounded-xl bg-black px-4 py-3 text-center font-medium text-white"
          >
            Fale Comigo
          </a>
        </div>
      </div>
    </nav>
  );
};

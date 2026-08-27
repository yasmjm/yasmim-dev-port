import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PERSONAL_INFO } from '@/constants';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="px-6 pb-20 pt-32">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-12 md:flex-row">
        <div className="flex-1 space-y-6">
          <div className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
            Disponível para novos projetos
          </div>
          <h1 className="text-5xl font-bold leading-tight tracking-tighter md:text-7xl">
            Criando sistemas <br />
            <span className="italic text-gray-500">inteligentes</span> e automações.
          </h1>
          <p className="max-w-xl text-lg text-gray-600">
            E aí, eu sou a {PERSONAL_INFO.name.split(' ')[1]}. {PERSONAL_INFO.role} focada em
            entregar eficiência através da tecnologia.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="#projects"
              className="rounded-xl bg-black px-8 py-3 text-white transition-all hover:shadow-lg"
            >
              Ver Projetos
            </Link>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl border border-gray-200 px-8 py-3 font-medium transition-all duration-300 hover:-translate-y-1 hover:border-[#0077b5] hover:bg-[#0077b5]/5 hover:text-[#0077b5] hover:shadow-md"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        <div className="group relative h-64 w-64 shrink-0 md:h-96 md:w-96">
          <div className="absolute inset-0 -rotate-6 rounded-3xl bg-gradient-to-tr from-blue-100 to-gray-100 transition-transform duration-500 group-hover:rotate-0" />
          <div className="absolute inset-0 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
            <Image
              src="/1765415142930.jpg"
              alt={`Retrato de ${PERSONAL_INFO.name}`}
              fill
              priority
              sizes="(max-width: 768px) 16rem, 24rem"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

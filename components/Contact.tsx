import React from 'react';
import { PERSONAL_INFO } from '@/constants';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative overflow-hidden bg-black px-6 py-24 text-white">
      <div className="absolute right-0 top-0 -mr-48 -mt-48 h-96 w-96 rounded-full bg-blue-600/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h2 className="mb-8 text-4xl font-bold tracking-tighter md:text-6xl">
          Vamos construir algo <br />
          <span className="text-gray-500">incrível juntos.</span>
        </h2>

        <p className="mx-auto mb-12 max-w-xl text-lg text-gray-400">
          Estou sempre interessada em novos desafios e projetos inovadores. Sinta-se à vontade para
          entrar em contato.
        </p>

        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          className="mb-16 inline-block break-all border-b border-gray-700 pb-2 text-xl font-light transition-colors hover:text-blue-400 md:text-3xl"
        >
          {PERSONAL_INFO.email}
        </a>

        <div className="flex justify-center gap-8">
          {[
            { label: 'LinkedIn', href: PERSONAL_INFO.linkedin },
            { label: 'GitHub', href: PERSONAL_INFO.github },
            { label: 'Medium', href: PERSONAL_INFO.medium },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

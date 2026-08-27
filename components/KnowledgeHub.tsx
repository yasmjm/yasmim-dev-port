import React from 'react';
import { Brain, LineChart, Terminal, ArrowUpRight, Youtube } from 'lucide-react';
import { PERSONAL_INFO, USEFUL_LINKS } from '@/constants';

const KNOWLEDGE_HUB = [
  {
    title: 'Filosofia e Lógica',
    type: 'Leituras & Estudos',
    icon: Brain,
    tint: 'bg-indigo-50 text-indigo-600',
    accent: 'bg-indigo-500',
    hover: 'group-hover:text-indigo-700',
    tagHover: 'group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-700',
    tagOwn: 'hover:border-indigo-300 hover:bg-indigo-100',
    description:
      'Estudo de lógica aplicada para aprimorar a resolução de problemas complexos no desenvolvimento.',
    tags: ['Estoicismo', 'Lógica', 'Clássicos'],
  },
  {
    title: 'Finanças e Estratégia',
    type: 'Análise de Mercado',
    icon: LineChart,
    tint: 'bg-emerald-50 text-emerald-600',
    accent: 'bg-emerald-500',
    hover: 'group-hover:text-emerald-700',
    tagHover: 'group-hover:border-emerald-200 group-hover:bg-emerald-50 group-hover:text-emerald-700',
    tagOwn: 'hover:border-emerald-300 hover:bg-emerald-100',
    description:
      'Foco em eficiência técnica e ROI, garantindo que cada automação gere valor real para o produto.',
    tags: ['Investimentos', 'Eficiência', 'Gestão'],
  },
  {
    title: 'Engenharia de Automação',
    type: 'Conteúdo Técnico',
    icon: Terminal,
    tint: 'bg-orange-50 text-orange-600',
    accent: 'bg-orange-500',
    hover: 'group-hover:text-orange-700',
    tagHover: 'group-hover:border-orange-200 group-hover:bg-orange-50 group-hover:text-orange-700',
    tagOwn: 'hover:border-orange-300 hover:bg-orange-100',
    description:
      'Acompanhando tendências globais de web scraping, arquitetura Node.js e integração de IAs.',
    tags: ['Puppeteer', 'IA', 'Cloud Architecture'],
  },
];

export const KnowledgeHub: React.FC = () => {
  return (
    <section
      id="knowledge"
      className="relative overflow-hidden border-y border-gray-100 bg-white px-6 py-24"
    >
      {/* Brilho decorativo, bem discreto, só para a seção não ficar chapada. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-500/[0.07] blur-[100px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Cabeçalho: a frase vira o centro da seção, não uma legenda. */}
        <header className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-700">
            Curadoria de Conhecimento
          </p>

          <blockquote className="mt-8">
            <p className="text-3xl font-light italic leading-[1.25] tracking-tight text-gray-900 md:text-[2.75rem]">
              <span className="text-blue-500" aria-hidden="true">
                &ldquo;
              </span>
              Você nasceu para saber mais
              <span className="text-blue-500" aria-hidden="true">
                &rdquo;
              </span>
            </p>
          </blockquote>

          <p className="mt-8 max-w-xl leading-relaxed text-gray-600">
            Tecnologia sozinha resolve pouco. O que molda minha leitura de um problema técnico vem,
            em boa parte, de fora da tela do editor.
          </p>
        </header>

        {/* Lista editorial no lugar da grade de cards. */}
        <ul className="mt-16 border-t border-gray-100">
          {KNOWLEDGE_HUB.map((item, index) => {
            const Icon = item.icon;

            return (
              <li key={item.title} className="group relative border-b border-gray-100">
                {/* Filete que cresce de cima para baixo no hover. */}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 rounded-full transition-transform duration-500 ease-out group-hover:scale-y-100 ${item.accent}`}
                />

                <div className="grid gap-6 py-10 transition-[padding] duration-300 group-hover:pl-6 md:grid-cols-12 md:items-start md:gap-8">
                  {/* Trilho esquerdo: índice + ícone */}
                  <div className="flex items-center gap-5 md:col-span-3">
                    <span className="font-mono text-sm tabular-nums text-gray-400">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${item.tint}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>

                  {/* Conteúdo */}
                  <div className="md:col-span-9">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gray-500">
                      {item.type}
                    </p>

                    <h3
                      className={`mt-2 text-2xl font-bold tracking-tight transition-colors duration-300 ${item.hover}`}
                    >
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-2xl leading-relaxed text-gray-600">
                      {item.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag, tagIndex) => (
                        <span
                          key={tag}
                          /* A cascata: cada tag entra 70ms depois da anterior. */
                          style={{ transitionDelay: `${tagIndex * 70}ms` }}
                          className={`cursor-default rounded-full border border-gray-200 px-3 py-1 text-[11px] font-medium text-gray-600 transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:shadow-sm ${item.tagHover} ${item.tagOwn} hover:-translate-y-1 hover:shadow-md`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Chamada para o Medium. */}
        <a
          href={PERSONAL_INFO.medium}
          target="_blank"
          rel="noreferrer"
          className="group mt-10 flex items-center justify-between gap-6 rounded-2xl border border-gray-200 bg-gray-50/70 p-6 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/60 hover:shadow-sm md:p-8"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gray-500">
              Medium
            </p>
            <p className="mt-2 text-lg font-bold tracking-tight transition-colors group-hover:text-blue-700">
              Acompanhe minhas análises
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Onde eu escrevo sobre o que ando estudando a fundo.
            </p>
          </div>

          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all duration-300 group-hover:border-blue-200 group-hover:text-blue-700">
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </a>

        {/* O que alimenta a curadoria: vídeos e aulas, largura cheia. */}
        {USEFUL_LINKS.length > 0 && (
          <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50/70 p-6 md:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gray-500">
                  Links úteis
                </p>
                <p className="mt-2 text-lg font-bold tracking-tight">O que eu ando assistindo</p>
              </div>
              <p className="text-sm text-gray-600">
                Vídeos e aulas que alimentam o que está aqui em cima.
              </p>
            </div>

            <ul className="mt-6 grid gap-1 md:grid-cols-2 lg:grid-cols-3">
              {USEFUL_LINKS.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link flex h-full items-start gap-3 rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-white"
                  >
                    <Youtube className="mt-0.5 h-4 w-4 shrink-0 text-gray-400 transition-colors duration-200 group-hover/link:text-red-600" />

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold leading-snug transition-colors duration-200 group-hover/link:text-red-700">
                        {link.label}
                      </span>
                      {link.note && (
                        <span className="mt-1 block text-xs text-gray-600">{link.note}</span>
                      )}
                    </span>

                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-gray-300 transition-all duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-red-600" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </section>
  );
};

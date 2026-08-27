import React from 'react';
import { ArrowUpRight, Github, Workflow } from 'lucide-react';
import { PROJECTS, ARTICLES, PERSONAL_INFO } from '@/constants';
import { Reveal } from './Reveal';

export const Projects: React.FC = () => {
  const ordered = [...PROJECTS].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  );

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="mb-4 text-3xl font-bold">Projetos Selecionados</h2>
              <p className="max-w-md text-gray-600">
                Automações, integrações de IA e aplicações fullstack que resolvem um problema real.
              </p>
            </div>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 text-sm font-semibold transition-colors hover:text-blue-700"
            >
              Ver tudo no GitHub
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ordered.map((project, index) => (
            /* Os cards entram em cascata conforme a grade aparece na tela. */
            <Reveal key={project.title} delay={index * 90} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-100 hover:shadow-xl">
                {/* Filete azul que atravessa o topo do card no hover. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-blue-500 to-blue-300 transition-transform duration-500 ease-out group-hover:scale-x-100"
                />

                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 text-gray-500 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-blue-50 group-hover:text-blue-700">
                  <Workflow className="h-6 w-6" />
                </div>

                {project.badge && (
                  <span className="mb-3 inline-block self-start rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 transition-transform duration-300 group-hover:-translate-y-0.5">
                    {project.badge}
                  </span>
                )}

                <h3 className="mb-3 text-xl font-bold transition-colors duration-300 group-hover:text-blue-700">
                  {project.title}
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600">
                  {project.description}
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tag}
                      /* Mesma cascata das tags da Curadoria, para a página falar uma língua só. */
                      style={{ transitionDelay: `${tagIndex * 60}ms` }}
                      className="rounded bg-gray-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-600 transition-[transform,background-color,color] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:bg-blue-50 group-hover:text-blue-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="group/cta inline-flex items-center gap-1 border-b-2 border-transparent pb-1 text-sm font-bold transition-all hover:border-blue-600 hover:text-blue-700"
                    >
                      Ver rodando
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 border-b-2 border-transparent pb-1 text-sm font-medium text-gray-600 transition-all hover:border-gray-400 hover:text-black"
                    >
                      <Github className="h-4 w-4" /> Código
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {ARTICLES.length > 0 && (
          <div className="mt-20">
            <Reveal>
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-gray-500">
                Publicado fora daqui
              </h3>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-2">
              {ARTICLES.map((article, index) => (
                <Reveal key={article.url} delay={index * 90} className="h-full">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-full items-start justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-md"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                        {article.source}
                      </span>
                      <h4 className="mt-1 font-bold leading-snug transition-colors duration-300 group-hover:text-blue-700">
                        {article.title}
                      </h4>
                      <p className="mt-2 text-sm text-gray-600">{article.description}</p>
                    </div>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-700" />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

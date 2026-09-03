import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { Hero } from '@/components/Hero';
import { KnowledgeHub } from '@/components/KnowledgeHub';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { BlogPreview } from '@/components/BlogPreview';
import { Contact } from '@/components/Contact';
import { SITE } from '@/lib/site';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.author.name,
  url: SITE.url,
  email: SITE.author.email,
  jobTitle: 'Desenvolvedora Fullstack & Especialista em Automação',
  sameAs: [SITE.author.github, SITE.author.linkedin, SITE.author.medium],
  knowsAbout: [
    'Engenharia de Software',
    'Desenvolvimento Web Fullstack',
    'TypeScript',
    'Node.js',
    'Next.js',
    'PostgreSQL',
    'Web Scraping',
    'RPA',
    'Integração de LLMs',
    'AWS',
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />

      <section id="about" className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
          {/* Trilho esquerdo: deixa de ser um vazio e passa a carregar a ficha. */}
          <div className="md:sticky md:top-32 md:col-span-4">
            <h2 className="text-3xl font-bold tracking-tight">Sobre Mim</h2>

            <dl className="mt-8 space-y-5 border-t border-gray-200 pt-6">
              <div>
                <dt className="text-xs text-gray-500">Formação</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">
                  Análise e Desenvolvimento de Sistemas
                  <span className="mt-0.5 block font-normal text-gray-600">
                    Universidade de Fortaleza
                  </span>
                </dd>
              </div>

              <div>
                <dt className="text-xs text-gray-500">Base</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">Fortaleza, CE</dd>
              </div>

              <div>
                <dt className="text-xs text-gray-500">Foco</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">
                  Sistemas web de ponta a ponta, automação e integração de IA
                </dd>
              </div>

              <div>
                <dt className="text-xs text-gray-500">Também tocando</dt>
                <dd className="mt-1 text-sm font-medium">
                  <a
                    href="https://genesis-go.pages.dev/"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 text-gray-900 underline decoration-gray-300 underline-offset-4 transition-colors hover:text-blue-700 hover:decoration-blue-400"
                  >
                    Genesis Go
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="md:col-span-8">
            <div className="max-w-2xl space-y-5">
              <p className="text-xl font-light leading-relaxed text-gray-800">
                Estudante de Análise e Desenvolvimento de Sistemas, pela Universidade de Fortaleza,
                que acredita que a tecnologia atinge seu potencial máximo quando unida a múltiplas
                áreas do saber: &ldquo;você nasceu para saber mais&rdquo;.
              </p>
              <p className="leading-relaxed text-gray-600">
                Minha trajetória é guiada por um perfil polímata: uma curiosidade incansável que me
                leva a integrar a precisão da engenharia de software com a profundidade da filosofia
                e o foco em resultados. Na prática, isso se divide em duas frentes que se alimentam:
                construir sistemas web completos — modelagem relacional, API, autenticação e
                interface, em TypeScript, Next.js e PostgreSQL — e automatizar a coleta de dados que
                abastece esses sistemas, com Node.js, Puppeteer e infraestrutura na AWS.
              </p>
            </div>

            <div className="mt-14">
              <h3 className="text-lg font-bold tracking-tight">
                O que me torna &ldquo;fora da curva&rdquo;
              </h3>

              <ul className="mt-8 space-y-8">
                {[
                  {
                    title: 'Engenharia de sistemas, não só de scripts',
                    text: 'Automação é parte do meu trabalho, não o limite dele. No Farol, o CRM de prospecção que construí, fui do modelo relacional e das políticas de acesso por usuário no Postgres até o funil kanban e a importação de leads em massa — API, autenticação, interface e testes automatizados das regras de negócio.',
                  },
                  {
                    title: 'Visão de Produto',
                    text: 'Não apenas desenvolvo; busco entender o produto de ponta a ponta para garantir que cada automação e projeto gere eficiência e retorno real.',
                  },
                  {
                    title: 'Mentalidade Analítica e Digital',
                    text: 'Meu interesse por filosofia me permite abordar desafios técnicos com uma lógica rigorosa. Em paralelo, minha forte mentalidade digital e foco em dados me dão a clareza para priorizar o desenvolvimento de sistemas que realmente agregam valor e escalam no longo prazo.',
                  },
                  {
                    title: 'Adaptabilidade',
                    text: 'Transito entre a manutenção de sistemas legados em PHP e a construção do novo com stacks modernas como Next.js e Supabase.',
                  },
                ].map((item, index) => (
                  <li key={item.title}>
                    <Reveal delay={index * 110} className="border-l-2 border-gray-200 pl-6">
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="mt-2 max-w-xl leading-relaxed text-gray-600">{item.text}</p>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>

            <blockquote className="mt-14 border-l-2 border-blue-500 pl-6">
              <p className="max-w-xl text-lg font-light italic leading-relaxed text-gray-800">
                Encaro cada linha de código como uma oportunidade de criar sistemas que sejam
                altamente funcionais.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      <KnowledgeHub />
      <Skills />
      <Projects />
      <BlogPreview />
      <Contact />
    </>
  );
}

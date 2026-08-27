import React from 'react';
import type { Metadata } from 'next';
import { LeadTool } from '@/components/leads/LeadTool';
import { SITE } from '@/lib/site';

const DESCRICAO =
  'Ferramenta que transforma um CNPJ em dossiê comercial: dados da Receita Federal, contexto regional do IBGE, nota de qualificação por regras e leitura escrita por IA.';

export const metadata: Metadata = {
  title: 'Enriquecedor de Leads',
  description: DESCRICAO,
  alternates: { canonical: '/ferramentas/leads' },
  openGraph: {
    type: 'website',
    url: `${SITE.url}/ferramentas/leads`,
    title: `Enriquecedor de Leads | ${SITE.name}`,
    description: DESCRICAO,
  },
};

export default function LeadsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-32">
      <header className="mb-12 max-w-2xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-blue-700">Ferramenta</p>
        <h1 className="mb-4 text-4xl font-bold tracking-tighter md:text-5xl">Enriquecedor de Leads</h1>
        <p className="text-lg text-gray-600">{DESCRICAO}</p>
        <p className="mt-4 text-sm text-gray-500">
          O scraper captura o lead; isto decide se vale a ligação. Tudo vem de fontes públicas —
          nenhum dado é armazenado.
        </p>
      </header>

      <LeadTool />

      <footer className="mt-16 border-t border-gray-100 pt-8 text-sm text-gray-500">
        <p className="mb-2 font-semibold text-gray-700">Fontes</p>
        <ul className="space-y-1">
          <li>
            Cadastro e quadro societário:{' '}
            <a href="https://brasilapi.com.br/docs" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
              BrasilAPI
            </a>{' '}
            (dados abertos da Receita Federal)
          </li>
          <li>
            Contexto regional:{' '}
            <a
              href="https://servicodados.ibge.gov.br/api/docs/localidades"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 hover:underline"
            >
              IBGE — API de Localidades
            </a>
          </li>
          <li>Leitura comercial: Gemini, com saída estruturada em JSON e schema fixo</li>
        </ul>
        <p className="mt-4 text-xs text-gray-400">
          A nota de qualificação é calculada por regras determinísticas, documentadas na própria tela. A IA
          escreve o texto — ela não decide o número.
        </p>
      </footer>
    </div>
  );
}

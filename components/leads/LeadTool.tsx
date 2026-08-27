'use client';

import React, { useMemo, useState } from 'react';
import { Download, Loader2, Search, Sparkles } from 'lucide-react';
import { dossiesParaCsv } from '@/lib/leads/csv';
import { formatarCnpj, sanitizarCnpj } from '@/lib/leads/cnpj';
import type { Dossie, ItemLote } from '@/lib/leads/types';
import { DossieCard } from './DossieCard';

type Aba = 'individual' | 'lote';

interface RespostaLote {
  total: number;
  processados: number;
  ignorados: number;
  limite: number;
  resultados: ItemLote[];
}

const EXEMPLOS = [
  { rotulo: 'Petrobras', cnpj: '33000167000101' },
  { rotulo: 'Magazine Luiza', cnpj: '47960950000121' },
  { rotulo: 'Banco do Brasil', cnpj: '00000000000191' },
];

function baixarCsv(dossies: Dossie[], nome: string) {
  const blob = new Blob([dossiesParaCsv(dossies)], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = nome;
  link.click();
  URL.revokeObjectURL(url);
}

export const LeadTool: React.FC = () => {
  const [aba, setAba] = useState<Aba>('individual');
  const [cnpj, setCnpj] = useState('');
  const [comIA, setComIA] = useState(true);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [dossie, setDossie] = useState<Dossie | null>(null);

  const [textoLote, setTextoLote] = useState('');
  const [lote, setLote] = useState<RespostaLote | null>(null);

  const cnpjLimpo = sanitizarCnpj(cnpj);
  const podeConsultar = cnpjLimpo.length === 14 && !carregando;

  const dossiesDoLote = useMemo(
    () => (lote?.resultados ?? []).filter((r) => r.ok && r.dossie).map((r) => r.dossie as Dossie),
    [lote],
  );

  async function consultar(valor?: string) {
    const alvo = sanitizarCnpj(valor ?? cnpj);
    if (alvo.length !== 14) return;
    setCarregando(true);
    setErro(null);
    setDossie(null);
    try {
      const resposta = await fetch('/api/leads/enrich', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cnpj: alvo, comIA }),
      });
      const dados = await resposta.json();
      if (!resposta.ok) throw new Error(dados?.erro ?? 'Falha na consulta');
      setDossie(dados as Dossie);
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Falha na consulta');
    } finally {
      setCarregando(false);
    }
  }

  async function processarLote() {
    if (!textoLote.trim() || carregando) return;
    setCarregando(true);
    setErro(null);
    setLote(null);
    try {
      const resposta = await fetch('/api/leads/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: textoLote, comIA: false }),
      });
      const dados = await resposta.json();
      if (!resposta.ok) throw new Error(dados?.erro ?? 'Falha no processamento');
      setLote(dados as RespostaLote);
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Falha no processamento');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex gap-2">
        {(['individual', 'lote'] as Aba[]).map((valor) => (
          <button
            key={valor}
            type="button"
            onClick={() => {
              setAba(valor);
              setErro(null);
            }}
            className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
              aba === valor ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {valor === 'individual' ? 'Consulta única' : 'Lote'}
          </button>
        ))}
      </div>

      {aba === 'individual' ? (
        <div className="space-y-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void consultar();
            }}
            className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <label htmlFor="cnpj" className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-500">
              CNPJ
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="cnpj"
                inputMode="numeric"
                autoComplete="off"
                placeholder="00.000.000/0000-00"
                value={cnpj}
                onChange={(e) => {
                  const limpo = sanitizarCnpj(e.target.value).slice(0, 14);
                  setCnpj(limpo.length === 14 ? formatarCnpj(limpo) : limpo);
                }}
                className="flex-1 rounded-2xl border border-gray-200 px-4 py-3 font-mono text-sm outline-none transition-colors focus:border-blue-600"
              />
              <button
                type="submit"
                disabled={!podeConsultar}
                className="flex items-center justify-center gap-2 rounded-2xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {carregando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                {carregando ? 'Consultando' : 'Enriquecer'}
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={comIA}
                  onChange={(e) => setComIA(e.target.checked)}
                  className="h-4 w-4 accent-blue-700"
                />
                <Sparkles className="h-4 w-4 text-gray-400" />
                Gerar leitura comercial por IA
              </label>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-gray-400">Exemplos:</span>
                {EXEMPLOS.map((ex) => (
                  <button
                    key={ex.cnpj}
                    type="button"
                    onClick={() => {
                      setCnpj(formatarCnpj(ex.cnpj));
                      void consultar(ex.cnpj);
                    }}
                    className="rounded bg-gray-50 px-2 py-1 text-[11px] font-semibold text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                  >
                    {ex.rotulo}
                  </button>
                ))}
              </div>
            </div>
          </form>

          {erro && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {erro}
            </p>
          )}

          {dossie && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-gray-400">
                  Consultado em {new Date(dossie.consultadoEm).toLocaleString('pt-BR')}
                  {dossie.doCache && ' · resposta do cache'}
                </p>
                <button
                  type="button"
                  onClick={() => baixarCsv([dossie], `lead-${dossie.cnpj}.csv`)}
                  className="flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline"
                >
                  <Download className="h-4 w-4" /> Baixar CSV
                </button>
              </div>
              <DossieCard dossie={dossie} />
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <label htmlFor="lote" className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-500">
              Cole a lista de CNPJs
            </label>
            <p className="mb-3 text-xs text-gray-500">
              Um por linha, separados por vírgula ou colados de uma planilha — o parser extrai os números.
            </p>
            <textarea
              id="lote"
              rows={6}
              value={textoLote}
              onChange={(e) => setTextoLote(e.target.value)}
              placeholder={'33.000.167/0001-01\n47960950000121'}
              className="w-full rounded-2xl border border-gray-200 p-4 font-mono text-sm outline-none transition-colors focus:border-blue-600"
            />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => void processarLote()}
                disabled={carregando || !textoLote.trim()}
                className="flex items-center gap-2 rounded-2xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {carregando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                {carregando ? 'Processando em série' : 'Processar lote'}
              </button>
              {dossiesDoLote.length > 0 && (
                <button
                  type="button"
                  onClick={() => baixarCsv(dossiesDoLote, 'leads-enriquecidos.csv')}
                  className="flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline"
                >
                  <Download className="h-4 w-4" /> Baixar {dossiesDoLote.length} leads em CSV
                </button>
              )}
            </div>
          </div>

          {erro && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {erro}
            </p>
          )}

          {lote && (
            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-6 py-4 text-xs text-gray-500">
                {lote.processados} de {lote.total} CNPJs processados
                {lote.ignorados > 0 && ` · ${lote.ignorados} ignorados (limite de ${lote.limite} por lote)`}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-[10px] uppercase tracking-wider text-gray-500">
                    <tr>
                      <th className="px-6 py-3 font-bold">CNPJ</th>
                      <th className="px-6 py-3 font-bold">Empresa</th>
                      <th className="px-6 py-3 font-bold">Situação</th>
                      <th className="px-6 py-3 font-bold">Local</th>
                      <th className="px-6 py-3 text-right font-bold">Nota</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {lote.resultados.map((item) => (
                      <tr key={item.entrada}>
                        <td className="whitespace-nowrap px-6 py-3 font-mono text-xs text-gray-600">{item.entrada}</td>
                        <td className="px-6 py-3">
                          {item.ok ? item.dossie?.razaoSocial ?? '—' : <span className="text-red-600">{item.erro}</span>}
                        </td>
                        <td className="px-6 py-3 text-gray-600">{item.dossie?.situacao.descricao ?? '—'}</td>
                        <td className="whitespace-nowrap px-6 py-3 text-gray-600">
                          {item.dossie ? [item.dossie.endereco.municipio, item.dossie.endereco.uf].filter(Boolean).join('/') : '—'}
                        </td>
                        <td className="px-6 py-3 text-right font-semibold tabular-nums">
                          {item.dossie ? `${item.dossie.score.total} · ${item.dossie.score.faixa}` : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

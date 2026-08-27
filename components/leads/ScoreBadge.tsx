import React from 'react';
import type { FaixaScore } from '@/lib/leads/types';

const ESTILOS: Record<FaixaScore, { fundo: string; texto: string; barra: string; rotulo: string }> = {
  quente: { fundo: 'bg-emerald-50', texto: 'text-emerald-700', barra: 'bg-emerald-600', rotulo: 'Lead quente' },
  morno: { fundo: 'bg-amber-50', texto: 'text-amber-700', barra: 'bg-amber-500', rotulo: 'Lead morno' },
  frio: { fundo: 'bg-gray-100', texto: 'text-gray-600', barra: 'bg-gray-400', rotulo: 'Lead frio' },
};

export const estiloFaixa = (faixa: FaixaScore) => ESTILOS[faixa];

export const ScoreBadge: React.FC<{ total: number; faixa: FaixaScore }> = ({ total, faixa }) => {
  const estilo = ESTILOS[faixa];
  return (
    <div className={`flex items-center gap-3 rounded-2xl ${estilo.fundo} px-4 py-3`}>
      <span className={`text-2xl font-bold tabular-nums ${estilo.texto}`}>{total}</span>
      <div>
        <p className={`text-xs font-bold uppercase tracking-wider ${estilo.texto}`}>{estilo.rotulo}</p>
        <p className="text-[11px] text-gray-500">de 100 pontos</p>
      </div>
    </div>
  );
};

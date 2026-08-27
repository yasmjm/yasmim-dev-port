import { NextResponse } from 'next/server';
import { enriquecer } from '@/lib/leads/enrich';
import { extrairCnpjs, formatarCnpj } from '@/lib/leads/cnpj';
import { ApiError } from '@/lib/leads/http';
import type { ItemLote } from '@/lib/leads/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const LIMITE = 12;
const ESPACAMENTO_MS = 900; // a BrasilAPI limita por IP: em série, com folga.

const dormir = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(request: Request) {
  const corpo = (await request.json().catch(() => ({}))) as { texto?: string; comIA?: boolean };
  const cnpjs = extrairCnpjs(corpo.texto ?? '');

  if (cnpjs.length === 0) {
    return NextResponse.json({ erro: 'Nenhum CNPJ reconhecido no texto enviado' }, { status: 400 });
  }

  const recortados = cnpjs.slice(0, LIMITE);
  const resultados: ItemLote[] = [];

  for (const [indice, cnpj] of recortados.entries()) {
    try {
      const dossie = await enriquecer(cnpj, { comIA: corpo.comIA === true });
      resultados.push({ entrada: formatarCnpj(cnpj), ok: true, dossie });
    } catch (erro) {
      resultados.push({
        entrada: formatarCnpj(cnpj),
        ok: false,
        erro: erro instanceof ApiError ? erro.message : 'Falha inesperada',
      });
    }
    // Não espera depois do último — só entre chamadas.
    if (indice < recortados.length - 1) await dormir(ESPACAMENTO_MS);
  }

  return NextResponse.json({
    total: cnpjs.length,
    processados: resultados.length,
    ignorados: Math.max(0, cnpjs.length - LIMITE),
    limite: LIMITE,
    resultados,
  });
}

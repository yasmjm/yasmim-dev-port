import { NextResponse } from 'next/server';
import { enriquecer } from '@/lib/leads/enrich';
import { ApiError } from '@/lib/leads/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

function tratarErro(erro: unknown) {
  if (erro instanceof ApiError) {
    // 4xx é problema da entrada; 5xx é a fonte externa que caiu.
    return NextResponse.json({ erro: erro.message, fonte: erro.fonte }, { status: erro.status });
  }
  console.error('[leads/enrich]', erro);
  return NextResponse.json({ erro: 'Falha inesperada ao montar o dossiê' }, { status: 500 });
}

export async function POST(request: Request) {
  try {
    const corpo = (await request.json().catch(() => ({}))) as { cnpj?: string; comIA?: boolean };
    if (!corpo.cnpj) {
      return NextResponse.json({ erro: 'Informe o campo "cnpj"' }, { status: 400 });
    }
    const dossie = await enriquecer(corpo.cnpj, { comIA: corpo.comIA === true });
    return NextResponse.json(dossie);
  } catch (erro) {
    return tratarErro(erro);
  }
}

/** Atalho para testar no navegador: /api/leads/enrich?cnpj=... */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cnpj = searchParams.get('cnpj');
  if (!cnpj) return NextResponse.json({ erro: 'Informe ?cnpj=' }, { status: 400 });

  try {
    const dossie = await enriquecer(cnpj, { comIA: searchParams.get('ia') === '1' });
    return NextResponse.json(dossie);
  } catch (erro) {
    return tratarErro(erro);
  }
}

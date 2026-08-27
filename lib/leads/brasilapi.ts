import { ApiError, buscarJson } from './http';
import { sanitizarCnpj } from './cnpj';
import type { EmpresaRaw } from './types';

const BASE = 'https://brasilapi.com.br/api';

/** Consulta cadastral na Receita Federal via BrasilAPI. Bloqueante: sem ela não há dossiê. */
export async function buscarEmpresa(cnpj: string): Promise<EmpresaRaw> {
  const limpo = sanitizarCnpj(cnpj);
  const empresa = await buscarJson<EmpresaRaw>(`${BASE}/cnpj/v1/${limpo}`, {
    fonte: 'BrasilAPI (CNPJ)',
    nuloEm: [404],
  });

  if (!empresa) {
    throw new ApiError('CNPJ não encontrado na base da Receita', 404, 'BrasilAPI (CNPJ)');
  }
  return empresa;
}

interface CepV2 {
  cep?: string;
  location?: {
    coordinates?: { latitude?: string | number; longitude?: string | number };
  };
}

/** Coordenadas do endereço. Opcional: falhou, o dossiê segue sem o mapa. */
export async function buscarCoordenadas(
  cep: string | null | undefined,
): Promise<{ latitude: number | null; longitude: number | null }> {
  const limpo = (cep ?? '').replace(/\D/g, '');
  if (limpo.length !== 8) return { latitude: null, longitude: null };

  const dados = await buscarJson<CepV2>(`${BASE}/cep/v2/${limpo}`, {
    fonte: 'BrasilAPI (CEP)',
    tentativas: 2,
    nuloEm: [404],
  });

  const coords = dados?.location?.coordinates;
  const numero = (v: unknown): number | null => {
    const n = Number(v);
    return Number.isFinite(n) && n !== 0 ? n : null;
  };

  return { latitude: numero(coords?.latitude), longitude: numero(coords?.longitude) };
}

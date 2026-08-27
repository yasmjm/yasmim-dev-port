import { buscarJson } from './http';
import type { Localizacao } from './types';

interface MunicipioIbge {
  id?: number;
  nome?: string;
  microrregiao?: {
    mesorregiao?: {
      nome?: string;
      UF?: { sigla?: string; nome?: string; regiao?: { nome?: string } };
    };
  };
}

/**
 * Contexto geográfico do município. O código IBGE vem do próprio cadastro da
 * Receita (`codigo_municipio_ibge`) — é a chave que junta as duas bases.
 */
export async function buscarMunicipio(
  codigoIbge: number | string | null | undefined,
): Promise<Localizacao | null> {
  const codigo = Number(codigoIbge);
  if (!Number.isFinite(codigo) || codigo <= 0) return null;

  const municipio = await buscarJson<MunicipioIbge>(
    `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${codigo}`,
    { fonte: 'IBGE', tentativas: 2, nuloEm: [404] },
  );
  if (!municipio) return null;

  const meso = municipio.microrregiao?.mesorregiao;
  return {
    codigoIbge: municipio.id ?? codigo,
    municipio: municipio.nome ?? null,
    uf: meso?.UF?.sigla ?? null,
    mesorregiao: meso?.nome ?? null,
    regiao: meso?.UF?.regiao?.nome ?? null,
  };
}

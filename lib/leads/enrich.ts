import { buscarCoordenadas, buscarEmpresa } from './brasilapi';
import { cnpjValido, formatarCnpj, sanitizarCnpj } from './cnpj';
import { fixturePorCnpj } from './fixtures';
import { ApiError } from './http';
import { buscarMunicipio } from './ibge';
import { gerarResumo } from './ai';
import { calcularScore } from './score';
import type { Dossie, EmpresaRaw, Socio } from './types';

const TTL_MS = 6 * 60 * 60 * 1000; // 6h: o cadastro da Receita muda devagar.
const cache = new Map<string, { em: number; dossie: Dossie }>();

function numeroOuNulo(valor: unknown): number | null {
  if (valor === null || valor === undefined || valor === '') return null;
  const n = typeof valor === 'string' ? Number(valor.replace(',', '.')) : Number(valor);
  return Number.isFinite(n) ? n : null;
}

function textoOuNulo(valor: unknown): string | null {
  const t = typeof valor === 'string' ? valor.trim() : '';
  return t.length ? t : null;
}

function formatarTelefone(bruto: string | null | undefined): string | null {
  const digitos = (bruto ?? '').replace(/\D/g, '');
  if (digitos.length < 10) return null;
  const ddd = digitos.slice(0, 2);
  const resto = digitos.slice(2);
  const meio = resto.length > 8 ? resto.slice(0, resto.length - 4) : resto.slice(0, 4);
  return `(${ddd}) ${meio}-${resto.slice(-4)}`;
}

function anosDesde(data: string | null): number | null {
  if (!data) return null;
  const inicio = new Date(data);
  if (Number.isNaN(inicio.getTime())) return null;
  const ms = Date.now() - inicio.getTime();
  if (ms < 0) return null;
  return Math.floor(ms / (365.25 * 24 * 60 * 60 * 1000));
}

function mapearSocios(empresa: EmpresaRaw): Socio[] {
  return (empresa.qsa ?? [])
    .map((s) => ({
      nome: textoOuNulo(s.nome_socio) ?? '',
      qualificacao: textoOuNulo(s.qualificacao_socio),
      desde: textoOuNulo(s.data_entrada_sociedade),
      faixaEtaria: textoOuNulo(s.faixa_etaria),
    }))
    .filter((s) => s.nome.length > 0);
}

/** Monta o dossiê a partir do cadastro bruto. Puro: não faz rede, então é testável. */
export function montarDossieBase(empresa: EmpresaRaw): Omit<Dossie, 'ia' | 'falhas' | 'consultadoEm'> {
  const cnpj = sanitizarCnpj(empresa.cnpj ?? '');
  const situacaoDescricao = textoOuNulo(empresa.descricao_situacao_cadastral);
  const abertura = textoOuNulo(empresa.data_inicio_atividade);

  const telefones = [empresa.ddd_telefone_1, empresa.ddd_telefone_2]
    .map(formatarTelefone)
    .filter((t): t is string => Boolean(t));

  const parcial = {
    cnpj,
    cnpjFormatado: formatarCnpj(cnpj),
    razaoSocial: textoOuNulo(empresa.razao_social),
    nomeFantasia: textoOuNulo(empresa.nome_fantasia),
    situacao: {
      descricao: situacaoDescricao,
      ativa: (situacaoDescricao ?? '').toUpperCase() === 'ATIVA',
      desde: textoOuNulo(empresa.data_situacao_cadastral),
      motivo: textoOuNulo(empresa.descricao_motivo_situacao_cadastral),
    },
    atividade: {
      principal: {
        codigo: empresa.cnae_fiscal ? String(empresa.cnae_fiscal) : null,
        descricao: textoOuNulo(empresa.cnae_fiscal_descricao),
      },
      secundarias: (empresa.cnaes_secundarios ?? [])
        .filter((c) => textoOuNulo(c.descricao))
        .map((c) => ({ codigo: String(c.codigo ?? ''), descricao: String(c.descricao) })),
      naturezaJuridica: textoOuNulo(empresa.natureza_juridica),
    },
    perfil: {
      porte: textoOuNulo(empresa.descricao_porte) ?? textoOuNulo(empresa.porte),
      capitalSocial: numeroOuNulo(empresa.capital_social),
      idadeAnos: anosDesde(abertura),
      aberturaEm: abertura,
      mei: empresa.opcao_pelo_mei === true,
      simples: empresa.opcao_pelo_simples === true,
      matriz: (textoOuNulo(empresa.descricao_identificador_matriz_filial) ?? 'MATRIZ').toUpperCase() === 'MATRIZ',
    },
    endereco: {
      logradouro: textoOuNulo(empresa.logradouro),
      numero: textoOuNulo(empresa.numero),
      complemento: textoOuNulo(empresa.complemento),
      bairro: textoOuNulo(empresa.bairro),
      cep: textoOuNulo(empresa.cep),
      municipio: textoOuNulo(empresa.municipio),
      uf: textoOuNulo(empresa.uf),
      latitude: null as number | null,
      longitude: null as number | null,
    },
    contato: {
      email: textoOuNulo(empresa.email)?.toLowerCase() ?? null,
      telefones,
    },
    localizacao: null as Dossie['localizacao'],
    socios: mapearSocios(empresa),
  };

  return { ...parcial, score: calcularScore(parcial) };
}

export interface OpcoesEnriquecimento {
  comIA?: boolean;
  ignorarCache?: boolean;
}

export async function enriquecer(entrada: string, opcoes: OpcoesEnriquecimento = {}): Promise<Dossie> {
  const cnpj = sanitizarCnpj(entrada);
  if (!cnpjValido(cnpj)) {
    throw new ApiError('CNPJ inválido — confira os 14 dígitos', 400, 'validação');
  }

  const chaveCache = `${cnpj}:${opcoes.comIA ? 'ia' : 'sem-ia'}`;
  const emCache = cache.get(chaveCache);
  if (!opcoes.ignorarCache && emCache && Date.now() - emCache.em < TTL_MS) {
    return { ...emCache.dossie, doCache: true };
  }

  const usarMock = process.env.LEADS_MOCK === '1';
  const empresa = usarMock ? fixturePorCnpj(cnpj) : await buscarEmpresa(cnpj);

  const base = montarDossieBase(empresa);
  const falhas: string[] = [];

  // Enriquecimentos opcionais: falharam, o dossiê sai mesmo assim.
  if (!usarMock) {
    const [municipio, coordenadas] = await Promise.allSettled([
      buscarMunicipio(empresa.codigo_municipio_ibge),
      buscarCoordenadas(empresa.cep),
    ]);

    if (municipio.status === 'fulfilled') base.localizacao = municipio.value;
    else falhas.push('IBGE indisponível — dossiê sem contexto regional');

    if (coordenadas.status === 'fulfilled') {
      base.endereco.latitude = coordenadas.value.latitude;
      base.endereco.longitude = coordenadas.value.longitude;
    } else {
      falhas.push('Coordenadas do CEP indisponíveis');
    }
  }

  const dossie: Dossie = { ...base, ia: null, falhas, consultadoEm: new Date().toISOString() };

  if (opcoes.comIA) {
    dossie.ia = await gerarResumo(dossie);
    if (!dossie.ia) falhas.push('Resumo por IA não gerado (sem chave ou API indisponível)');
  }

  cache.set(chaveCache, { em: Date.now(), dossie });
  return dossie;
}

export function limparCache(): void {
  cache.clear();
}

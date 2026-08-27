/** Tipos do enriquecedor de leads. Espelham o retorno da BrasilAPI (snake_case). */

export interface SocioRaw {
  nome_socio?: string | null;
  qualificacao_socio?: string | null;
  data_entrada_sociedade?: string | null;
  faixa_etaria?: string | null;
  nome_representante_legal?: string | null;
}

export interface CnaeRaw {
  codigo?: number | string | null;
  descricao?: string | null;
}

/** Subconjunto do que a BrasilAPI devolve em /api/cnpj/v1/{cnpj}. */
export interface EmpresaRaw {
  cnpj: string;
  razao_social?: string | null;
  nome_fantasia?: string | null;
  descricao_situacao_cadastral?: string | null;
  data_situacao_cadastral?: string | null;
  descricao_motivo_situacao_cadastral?: string | null;
  data_inicio_atividade?: string | null;
  cnae_fiscal?: number | string | null;
  cnae_fiscal_descricao?: string | null;
  cnaes_secundarios?: CnaeRaw[] | null;
  natureza_juridica?: string | null;
  porte?: string | null;
  descricao_porte?: string | null;
  capital_social?: number | string | null;
  opcao_pelo_mei?: boolean | null;
  opcao_pelo_simples?: boolean | null;
  descricao_identificador_matriz_filial?: string | null;
  logradouro?: string | null;
  numero?: string | null;
  complemento?: string | null;
  bairro?: string | null;
  cep?: string | null;
  municipio?: string | null;
  uf?: string | null;
  codigo_municipio_ibge?: number | string | null;
  email?: string | null;
  ddd_telefone_1?: string | null;
  ddd_telefone_2?: string | null;
  qsa?: SocioRaw[] | null;
}

export interface Endereco {
  logradouro: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  cep: string | null;
  municipio: string | null;
  uf: string | null;
  /** Preenchido pela BrasilAPI CEP v2 quando disponível. */
  latitude: number | null;
  longitude: number | null;
}

export interface Contato {
  email: string | null;
  telefones: string[];
}

export interface Localizacao {
  codigoIbge: number | null;
  municipio: string | null;
  uf: string | null;
  mesorregiao: string | null;
  regiao: string | null;
}

export interface Socio {
  nome: string;
  qualificacao: string | null;
  desde: string | null;
  faixaEtaria: string | null;
}

export interface CriterioScore {
  label: string;
  pontos: number;
  maximo: number;
  detalhe: string;
}

export type FaixaScore = 'quente' | 'morno' | 'frio';

export interface Score {
  total: number;
  faixa: FaixaScore;
  criterios: CriterioScore[];
  alertas: string[];
}

export interface ResumoIA {
  resumo: string;
  abordagem: string;
  sinais: string[];
  modelo: string;
}

export interface Dossie {
  cnpj: string;
  cnpjFormatado: string;
  razaoSocial: string | null;
  nomeFantasia: string | null;
  situacao: {
    descricao: string | null;
    ativa: boolean;
    desde: string | null;
    motivo: string | null;
  };
  atividade: {
    principal: { codigo: string | null; descricao: string | null };
    secundarias: { codigo: string; descricao: string }[];
    naturezaJuridica: string | null;
  };
  perfil: {
    porte: string | null;
    capitalSocial: number | null;
    idadeAnos: number | null;
    aberturaEm: string | null;
    mei: boolean;
    simples: boolean;
    matriz: boolean;
  };
  endereco: Endereco;
  contato: Contato;
  localizacao: Localizacao | null;
  socios: Socio[];
  score: Score;
  ia: ResumoIA | null;
  /** Enriquecimentos opcionais que falharam — o dossiê sai mesmo assim. */
  falhas: string[];
  consultadoEm: string;
  /** true quando a resposta veio do cache em memória. */
  doCache?: boolean;
}

export interface ItemLote {
  entrada: string;
  ok: boolean;
  dossie?: Dossie;
  erro?: string;
}

import type { EmpresaRaw } from './types';

/**
 * Dossiês de exemplo para desenvolver sem rede (LEADS_MOCK=1) e para os testes.
 * Formato idêntico ao da BrasilAPI.
 */
export const EMPRESA_EXEMPLO: EmpresaRaw = {
  cnpj: '33000167000101',
  razao_social: 'EMPRESA EXEMPLO DE TECNOLOGIA S.A.',
  nome_fantasia: 'EXEMPLO TECH',
  descricao_situacao_cadastral: 'ATIVA',
  data_situacao_cadastral: '2005-11-03',
  descricao_motivo_situacao_cadastral: 'SEM MOTIVO',
  data_inicio_atividade: '1998-04-15',
  cnae_fiscal: 6201501,
  cnae_fiscal_descricao: 'Desenvolvimento de programas de computador sob encomenda',
  cnaes_secundarios: [
    { codigo: 6202300, descricao: 'Desenvolvimento e licenciamento de programas customizáveis' },
    { codigo: 6311900, descricao: 'Tratamento de dados e hospedagem na internet' },
    { codigo: 6209100, descricao: 'Suporte técnico e manutenção em tecnologia da informação' },
  ],
  natureza_juridica: '205-4 - Sociedade Anônima Fechada',
  porte: '05',
  descricao_porte: 'DEMAIS',
  capital_social: 2500000,
  opcao_pelo_mei: false,
  opcao_pelo_simples: false,
  descricao_identificador_matriz_filial: 'MATRIZ',
  logradouro: 'AVENIDA PAULISTA',
  numero: '1000',
  complemento: 'ANDAR 12',
  bairro: 'BELA VISTA',
  cep: '01310100',
  municipio: 'SAO PAULO',
  uf: 'SP',
  codigo_municipio_ibge: 3550308,
  email: 'contato@exemplotech.com.br',
  ddd_telefone_1: '1130000000',
  ddd_telefone_2: null,
  qsa: [
    { nome_socio: 'MARIA DA SILVA', qualificacao_socio: 'Diretor', data_entrada_sociedade: '2010-02-01', faixa_etaria: 'Entre 41 a 50 anos' },
    { nome_socio: 'JOAO PEREIRA', qualificacao_socio: 'Presidente', data_entrada_sociedade: '2003-06-20', faixa_etaria: 'Entre 51 a 60 anos' },
  ],
};

export const EMPRESA_INATIVA_EXEMPLO: EmpresaRaw = {
  ...EMPRESA_EXEMPLO,
  cnpj: '19131243000197',
  razao_social: 'COMERCIO EXEMPLO BAIXADO LTDA',
  nome_fantasia: null,
  descricao_situacao_cadastral: 'BAIXADA',
  descricao_motivo_situacao_cadastral: 'EXTINCAO POR ENCERRAMENTO LIQUIDACAO VOLUNTARIA',
  capital_social: 5000,
  opcao_pelo_mei: true,
  email: null,
  ddd_telefone_1: null,
  cnaes_secundarios: [],
  qsa: [],
  data_inicio_atividade: '2019-01-10',
};

export function fixturePorCnpj(cnpj: string): EmpresaRaw {
  if (cnpj === EMPRESA_INATIVA_EXEMPLO.cnpj) return EMPRESA_INATIVA_EXEMPLO;
  return { ...EMPRESA_EXEMPLO, cnpj };
}

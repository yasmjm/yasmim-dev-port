import type { Dossie } from './types';

const COLUNAS = [
  'cnpj',
  'razao_social',
  'nome_fantasia',
  'situacao',
  'score',
  'faixa',
  'porte',
  'capital_social',
  'abertura',
  'idade_anos',
  'cnae_principal',
  'email',
  'telefones',
  'municipio',
  'uf',
  'regiao',
  'socios',
  'alertas',
  'resumo_ia',
] as const;

function escapar(valor: unknown): string {
  const texto = valor === null || valor === undefined ? '' : String(valor);
  return `"${texto.replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`;
}

function linha(d: Dossie): string {
  const valores: Record<(typeof COLUNAS)[number], unknown> = {
    cnpj: d.cnpjFormatado,
    razao_social: d.razaoSocial,
    nome_fantasia: d.nomeFantasia,
    situacao: d.situacao.descricao,
    score: d.score.total,
    faixa: d.score.faixa,
    porte: d.perfil.porte,
    capital_social: d.perfil.capitalSocial,
    abertura: d.perfil.aberturaEm,
    idade_anos: d.perfil.idadeAnos,
    cnae_principal: d.atividade.principal.descricao,
    email: d.contato.email,
    telefones: d.contato.telefones.join(' | '),
    municipio: d.endereco.municipio,
    uf: d.endereco.uf,
    regiao: d.localizacao?.regiao ?? '',
    socios: d.socios.map((s) => s.nome).join(' | '),
    alertas: d.score.alertas.join(' | '),
    resumo_ia: d.ia?.resumo ?? '',
  };
  return COLUNAS.map((c) => escapar(valores[c])).join(',');
}

/** CSV com BOM para o Excel abrir os acentos corretamente. */
export function dossiesParaCsv(dossies: Dossie[]): string {
  return `﻿${[COLUNAS.join(','), ...dossies.map(linha)].join('\r\n')}`;
}

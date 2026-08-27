import type { CriterioScore, Dossie, FaixaScore, Score } from './types';

/**
 * Nota de qualificação 0-100 por regras determinísticas.
 * A IA escreve o texto do dossiê; quem decide o número é esta função —
 * assim a nota é auditável e reproduzível.
 */

type Entrada = Omit<Dossie, 'score' | 'ia' | 'falhas' | 'consultadoEm' | 'doCache'>;

export function calcularScore(d: Entrada): Score {
  const criterios: CriterioScore[] = [];
  const alertas: string[] = [];

  // 1. Situação cadastral (30) — lead com CNPJ baixado não é lead.
  if (d.situacao.ativa) {
    criterios.push({ label: 'Situação cadastral', pontos: 30, maximo: 30, detalhe: 'Ativa na Receita' });
  } else {
    criterios.push({
      label: 'Situação cadastral',
      pontos: 0,
      maximo: 30,
      detalhe: d.situacao.descricao ?? 'Não ativa',
    });
    alertas.push(`Empresa ${(d.situacao.descricao ?? 'inativa').toLowerCase()} — não prospectar`);
  }

  // 2. Maturidade (15) — tempo de operação como proxy de estabilidade.
  const idade = d.perfil.idadeAnos;
  if (idade === null) {
    criterios.push({ label: 'Maturidade', pontos: 5, maximo: 15, detalhe: 'Data de abertura indisponível' });
  } else if (idade >= 10) {
    criterios.push({ label: 'Maturidade', pontos: 15, maximo: 15, detalhe: `${idade} anos de operação` });
  } else if (idade >= 3) {
    criterios.push({ label: 'Maturidade', pontos: 11, maximo: 15, detalhe: `${idade} anos de operação` });
  } else if (idade >= 1) {
    criterios.push({ label: 'Maturidade', pontos: 7, maximo: 15, detalhe: `${idade} ano(s) de operação` });
  } else {
    criterios.push({ label: 'Maturidade', pontos: 4, maximo: 15, detalhe: 'Aberta há menos de um ano' });
  }

  // 3. Capital social (20) — proxy grosseiro de porte financeiro.
  const capital = d.perfil.capitalSocial;
  const emReais = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  if (capital === null) {
    criterios.push({ label: 'Capital social', pontos: 5, maximo: 20, detalhe: 'Não informado' });
  } else if (capital >= 1_000_000) {
    criterios.push({ label: 'Capital social', pontos: 20, maximo: 20, detalhe: emReais(capital) });
  } else if (capital >= 100_000) {
    criterios.push({ label: 'Capital social', pontos: 16, maximo: 20, detalhe: emReais(capital) });
  } else if (capital >= 10_000) {
    criterios.push({ label: 'Capital social', pontos: 11, maximo: 20, detalhe: emReais(capital) });
  } else {
    criterios.push({ label: 'Capital social', pontos: 5, maximo: 20, detalhe: emReais(capital) });
  }

  // 4. Canal de contato (20) — lead sem contato custa uma etapa a mais.
  let contato = 0;
  const canais: string[] = [];
  if (d.contato.email) {
    contato += 10;
    canais.push('e-mail');
  }
  if (d.contato.telefones.length > 0) {
    contato += 10;
    canais.push(d.contato.telefones.length > 1 ? 'telefones' : 'telefone');
  }
  criterios.push({
    label: 'Canal de contato',
    pontos: contato,
    maximo: 20,
    detalhe: canais.length ? `Tem ${canais.join(' e ')}` : 'Nenhum canal no cadastro',
  });
  if (contato === 0) alertas.push('Sem e-mail nem telefone no cadastro público');

  // 5. Estrutura (15) — sócios e diversificação de CNAE.
  let estrutura = 0;
  const notas: string[] = [];
  if (d.socios.length >= 2) {
    estrutura += 8;
    notas.push(`${d.socios.length} sócios`);
  } else if (d.socios.length === 1) {
    estrutura += 4;
    notas.push('1 sócio');
  }
  const secundarias = d.atividade.secundarias.length;
  if (secundarias >= 3) {
    estrutura += 7;
    notas.push(`${secundarias} atividades secundárias`);
  } else if (secundarias >= 1) {
    estrutura += 4;
    notas.push(`${secundarias} atividade(s) secundária(s)`);
  }
  criterios.push({
    label: 'Estrutura',
    pontos: estrutura,
    maximo: 15,
    detalhe: notas.length ? notas.join(', ') : 'Quadro societário e CNAEs enxutos',
  });

  if (d.perfil.mei) alertas.push('Optante pelo MEI — ticket médio tende a ser baixo');
  if (!d.perfil.matriz) alertas.push('É filial — a decisão costuma estar na matriz');

  const total = criterios.reduce((soma, c) => soma + c.pontos, 0);
  // Empresa inativa nunca deve subir de faixa por causa dos outros critérios.
  const faixa: FaixaScore = !d.situacao.ativa ? 'frio' : total >= 70 ? 'quente' : total >= 45 ? 'morno' : 'frio';

  return { total, faixa, criterios, alertas };
}

import type { Dossie, ResumoIA } from './types';

/**
 * Resumo comercial gerado pelo Gemini com saída estruturada.
 * É opcional por decisão de projeto: sem GEMINI_API_KEY a ferramenta continua
 * funcionando, só não escreve o texto. Nenhuma nota depende da IA.
 */

const MODELO_PADRAO = 'gemini-2.5-flash';

const SCHEMA = {
  type: 'object',
  properties: {
    resumo: { type: 'string' },
    abordagem: { type: 'string' },
    sinais: { type: 'array', items: { type: 'string' } },
  },
  required: ['resumo', 'abordagem', 'sinais'],
} as const;

function montarContexto(d: Dossie): string {
  const linhas = [
    `Razão social: ${d.razaoSocial ?? '—'}`,
    d.nomeFantasia ? `Nome fantasia: ${d.nomeFantasia}` : null,
    `Situação: ${d.situacao.descricao ?? '—'}`,
    `Atividade principal: ${d.atividade.principal.descricao ?? '—'}`,
    d.atividade.secundarias.length
      ? `Atividades secundárias: ${d.atividade.secundarias.map((c) => c.descricao).slice(0, 5).join('; ')}`
      : null,
    `Natureza jurídica: ${d.atividade.naturezaJuridica ?? '—'}`,
    `Porte: ${d.perfil.porte ?? '—'}`,
    `Capital social: ${d.perfil.capitalSocial ?? '—'}`,
    `Aberta em: ${d.perfil.aberturaEm ?? '—'} (${d.perfil.idadeAnos ?? '?'} anos)`,
    `MEI: ${d.perfil.mei ? 'sim' : 'não'} | Simples: ${d.perfil.simples ? 'sim' : 'não'}`,
    `Local: ${d.endereco.municipio ?? '—'}/${d.endereco.uf ?? '—'}${d.localizacao?.mesorregiao ? ` — ${d.localizacao.mesorregiao}, região ${d.localizacao.regiao}` : ''}`,
    `Sócios: ${d.socios.length ? d.socios.map((s) => `${s.nome} (${s.qualificacao ?? 'sócio'})`).join('; ') : 'não informado'}`,
    `Contato: ${d.contato.email ?? 'sem e-mail'} | ${d.contato.telefones.join(', ') || 'sem telefone'}`,
    `Nota de qualificação calculada: ${d.score.total}/100 (${d.score.faixa})`,
    d.score.alertas.length ? `Alertas: ${d.score.alertas.join('; ')}` : null,
  ];
  return linhas.filter(Boolean).join('\n');
}

export async function gerarResumo(dossie: Dossie): Promise<ResumoIA | null> {
  const chave = process.env.GEMINI_API_KEY;
  if (!chave) return null;

  const modelo = process.env.GEMINI_MODEL ?? MODELO_PADRAO;
  const prompt = [
    'Você analisa empresas para uma equipe comercial B2B brasileira.',
    'Com base apenas nos dados cadastrais abaixo, produza:',
    '- "resumo": duas frases descrevendo a empresa em linguagem de negócio, sem repetir campo por campo.',
    '- "abordagem": uma frase objetiva sobre como abordar comercialmente essa empresa.',
    '- "sinais": de dois a quatro sinais curtos (oportunidades ou riscos) observados nos dados.',
    'Não invente faturamento, número de funcionários, clientes ou qualquer dado ausente.',
    'Se a empresa não estiver ativa, deixe isso explícito no resumo.',
    '',
    montarContexto(dossie),
  ].join('\n');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);

  try {
    const resposta = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent`,
      {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': chave },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.4,
            responseMimeType: 'application/json',
            responseSchema: SCHEMA,
          },
        }),
      },
    );

    if (!resposta.ok) return null;

    const dados = (await resposta.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const texto = dados.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('') ?? '';
    if (!texto.trim()) return null;

    const bruto = JSON.parse(texto) as Partial<ResumoIA>;
    if (!bruto.resumo) return null;

    return {
      resumo: String(bruto.resumo),
      abordagem: String(bruto.abordagem ?? ''),
      sinais: Array.isArray(bruto.sinais) ? bruto.sinais.map(String).slice(0, 4) : [],
      modelo,
    };
  } catch {
    // Falha da IA nunca derruba o dossiê.
    return null;
  } finally {
    clearTimeout(timer);
  }
}

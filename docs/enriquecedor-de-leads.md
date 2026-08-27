# Enriquecedor de Leads — plano técnico

Ferramenta que recebe um CNPJ (ou uma lista) e devolve um dossiê comercial:
dados cadastrais da Receita, contexto geográfico do IBGE, uma nota de
qualificação calculada por regras e um resumo em linguagem natural gerado por LLM.

É a continuação do Lead Scraper de Google Maps: o scraper **captura**, isto **qualifica**.

## APIs usadas (todas públicas e sem chave)

| Fonte | Endpoint | Traz |
|---|---|---|
| BrasilAPI — CNPJ | `GET /api/cnpj/v1/{cnpj}` | razão social, nome fantasia, situação cadastral, CNAE principal e secundários, porte, capital social, endereço, e-mail, telefones, quadro societário (`qsa`), MEI/Simples |
| BrasilAPI — CEP v2 | `GET /api/cep/v2/{cep}` | coordenadas (lat/long) do endereço |
| IBGE — Localidades | `GET /api/v1/localidades/municipios/{codigo}` | município, UF, mesorregião, região |
| Gemini (opcional) | `generateContent` | resumo, sinais de oportunidade e sugestão de abordagem |

O campo `codigo_municipio_ibge` do retorno da BrasilAPI é a chave que liga
o cadastro da Receita aos dados do IBGE — é essa junção que o projeto
demonstra, e não a chamada isolada de uma API.

## Arquitetura

```
app/ferramentas/leads/page.tsx     página pública (metadata + shell)
components/leads/LeadTool.tsx      UI cliente: consulta individual e lote
app/api/leads/enrich/route.ts      POST { cnpj, comIA } -> dossiê
app/api/leads/batch/route.ts       POST { cnpjs[] }     -> dossiês em série
lib/leads/
  cnpj.ts        sanitização, validação de dígitos, formatação
  http.ts        fetch com timeout, retry exponencial e erro tipado
  brasilapi.ts   empresa + CEP
  ibge.ts        município
  score.ts       nota de qualificação 0-100 por regras explicáveis
  ai.ts          resumo do Gemini com saída estruturada em JSON
  enrich.ts      orquestração, cache em memória e degradação parcial
  fixtures.ts    dossiês de exemplo para desenvolver sem rede
  types.ts
```

## Decisões que valem numa entrevista

- **Degradação parcial.** IBGE, CEP e IA são enriquecimentos opcionais:
  falharam, o dossiê sai do mesmo jeito com o campo `falhas` preenchido.
  Só a consulta do CNPJ é bloqueante.
- **Retry com backoff e respeito a `Retry-After`.** A BrasilAPI limita
  requisições por IP; o lote roda em série com espaçamento em vez de
  `Promise.all`, que derrubaria a cota em três segundos.
- **Cache em memória com TTL.** Consultar o mesmo CNPJ duas vezes no mesmo
  dia não gasta cota. Em produção, trocar por Redis/Supabase.
- **Score por regras, não por IA.** A nota é determinística e auditável —
  cada ponto vem com a justificativa. A IA escreve o texto, não decide o número.
- **Saída estruturada do LLM.** `responseMimeType: application/json` +
  schema, então a resposta entra tipada na UI em vez de virar parsing de texto.

## Roteiro de um dia

1. `lib/leads` — validação, HTTP, clientes e score (~2h)
2. Rotas de API com cache e lote (~1h)
3. UI com dossiê e exportação CSV (~2h)
4. Resumo por IA (~45min)
5. Typecheck, build e testes das funções puras (~30min)
6. Deploy na Vercel + card no portfólio (~30min)

## Variáveis de ambiente

```
GEMINI_API_KEY=        # opcional; sem ela a ferramenta roda sem o resumo
GEMINI_MODEL=gemini-2.5-flash
LEADS_MOCK=1           # opcional; usa fixtures locais, sem rede
```

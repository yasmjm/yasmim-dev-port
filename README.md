# Portfólio — Maria Yasmim

Portfólio pessoal e blog. Desenvolvedora fullstack com foco em automação, web scraping e integração de IA.

**No ar:** _(coloque a URL depois do primeiro deploy)_

## Stack

- **Next.js 16** (App Router, páginas geradas estaticamente no build)
- **TypeScript**
- **Tailwind CSS 4**
- **MDX** para os posts do blog, via `next-mdx-remote`
- **Shiki** para destaque de sintaxe nos blocos de código

## Rodando localmente

Requisito: Node.js 20 ou superior.

```bash
npm install
npm run dev
```

A aplicação sobe em `http://localhost:3000`.

```bash
npm run build   # build de produção
npm start       # serve o build
```

## Ferramenta: Enriquecedor de Leads

Rota `/ferramentas/leads`. Recebe um CNPJ (ou uma lista) e devolve um dossiê
comercial montado a partir de APIs públicas — BrasilAPI (Receita Federal),
IBGE Localidades — com nota de qualificação calculada por regras e, opcionalmente,
uma leitura escrita pelo Gemini. Plano técnico em `docs/enriquecedor-de-leads.md`.

```bash
cp .env.example .env.local   # GEMINI_API_KEY é opcional
npm run dev                  # http://localhost:3000/ferramentas/leads
npm run test:leads           # testes das funções puras, sem rede
```

Para desenvolver sem internet, use `LEADS_MOCK=1` — a ferramenta responde com fixtures locais.

## Estrutura

```
app/                    rotas (App Router)
  page.tsx              home do portfólio
  blog/                 listagem e página de cada post
  feed.xml/             feed RSS
  sitemap.ts            sitemap.xml
  robots.ts             robots.txt
components/             componentes de UI
content/posts/          os posts do blog, em .mdx
lib/
  posts.ts              leitura e ordenação dos posts
  site.ts               configuração central do site
constants.tsx           skills, projetos e artigos
```

## Escrevendo um post

Crie um arquivo em `content/posts/`. O nome do arquivo vira a URL:
`content/posts/meu-post.mdx` fica em `/blog/meu-post`.

```mdx
---
title: "Título do post"
summary: "Uma ou duas frases. Isso aparece na listagem e no preview do link."
date: "2026-08-26"
tags: ["Automação", "Node.js"]
draft: false
---

Conteúdo em Markdown. Blocos de código ganham destaque de sintaxe:

```js
const oi = 'mundo';
```

Componentes disponíveis dentro do texto: `<Nota>` e `<Alerta>`.
Para adicionar outros, registre em `components/mdx.tsx`.
```

Com `draft: true`, o post aparece em `npm run dev` mas nunca no site publicado.
O tempo de leitura, o RSS, o sitemap e a imagem de preview do link
são gerados automaticamente.

## Deploy

Feito para a Vercel — importar o repositório já funciona, sem configuração.

Defina a variável de ambiente `NEXT_PUBLIC_SITE_URL` com o domínio final
(ex.: `https://yasmim.dev`). Ela é usada nos links canônicos, no RSS,
no sitemap e nas imagens de preview.

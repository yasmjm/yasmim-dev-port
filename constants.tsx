import { Project, Article, PressMention, Skill, NavItem, UsefulLink } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Início', href: '#home' },
  { label: 'Sobre', href: '#about' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contato', href: '#contact' },
];

/**
 * REVISAR: os tempos abaixo vieram da versão anterior do portfólio.
 * Vale conferir um por um antes de publicar — o que estiver na lista
 * pode ser cobrado numa entrevista técnica. Se algum item for mais
 * "já usei" do que "domino", mova para uma seção de estudos.
 */
export const SKILLS: Skill[] = [
  // Backend
  { name: 'Node.js', category: 'Backend', experience: '2 anos' },
  { name: 'JavaScript', category: 'Backend', experience: '2 anos' },
  { name: 'TypeScript', category: 'Backend', experience: '2 anos' },
  { name: 'PHP', category: 'Backend', experience: '1,5 anos' },
  { name: 'Python', category: 'Backend', experience: '1 ano' },
  { name: 'APIs REST', category: 'Backend', experience: '2 anos' },
  { name: 'Webhooks', category: 'Backend', experience: '1,5 anos' },
  // PREENCHER o tempo de cada uma abaixo (ex.: experience: '1 ano').
  // Sem o campo, a tecnologia aparece normalmente, só não abre o balão de experiência.
  { name: 'Vendure', category: 'Backend' },
  { name: 'RabbitMQ', category: 'Backend' },

  // Automação — o ponto forte
  { name: 'Puppeteer', category: 'Automation', experience: '2 anos' },
  { name: 'Web Scraping', category: 'Automation', experience: '2 anos' },
  { name: 'RPA', category: 'Automation', experience: '2 anos' },
  { name: 'n8n', category: 'Automation', experience: '2 anos' },
  { name: 'Cron Jobs', category: 'Automation', experience: '2 anos' },
  { name: 'Regex', category: 'Automation', experience: '2 anos' },
  { name: 'Axios / Fetch API', category: 'Automation', experience: '2 anos' },

  // IA
  { name: 'Gemini API', category: 'AI', experience: '6 meses' },
  { name: 'Integração de LLMs', category: 'AI', experience: '6 meses' },
  { name: 'Prompt Engineering', category: 'AI', experience: '6 meses' },
  { name: 'Vercel AI SDK', category: 'AI', experience: '6 meses' },

  // Frontend
  { name: 'React', category: 'Frontend', experience: '1 ano' },
  { name: 'Next.js', category: 'Frontend', experience: '1 ano' },
  { name: 'Tailwind CSS', category: 'Frontend', experience: '2 anos' },
  { name: 'HTML & CSS', category: 'Frontend', experience: '2 anos' },
  { name: 'Figma', category: 'Frontend', experience: '2 anos' },

  // Banco de dados
  { name: 'PostgreSQL', category: 'Database', experience: '1,5 anos' },
  { name: 'Supabase', category: 'Database', experience: '1,5 anos' },
  { name: 'Modelagem relacional', category: 'Database', experience: '1,5 anos' },

  // Cloud / Infra
  { name: 'AWS Lambda', category: 'Cloud/Infra', experience: '2 anos' },
  { name: 'Amazon EC2', category: 'Cloud/Infra', experience: '2 anos' },
  { name: 'Amazon S3', category: 'Cloud/Infra', experience: '2 anos' },
  { name: 'Vercel', category: 'Cloud/Infra', experience: '2 anos' },
  { name: 'Cloudflare Pages', category: 'Cloud/Infra', experience: '1 ano' },
  { name: 'Azure', category: 'Cloud/Infra' },

  // DevOps
  { name: 'Docker', category: 'DevOps', experience: '2 anos' },
  { name: 'Git & GitHub', category: 'DevOps', experience: '2 anos' },
  { name: 'Terraform', category: 'DevOps' },

  // Ferramentas
  { name: 'Postman', category: 'Tools', experience: '2 anos' },
  { name: 'Insomnia', category: 'Tools', experience: '2 anos' },
  { name: 'ESLint', category: 'Tools', experience: '2 anos' },
  { name: 'Claude Code', category: 'Tools' },
];

/**
 * PREENCHER: troque `repo` e `demo` pelos links reais de cada projeto.
 * Card sem link não mostra botão — melhor do que mandar quem clicou
 * para a lista genérica do perfil e deixar a pessoa procurando.
 */
export const PROJECTS: Project[] = [
  {
    title: 'Genesis Go',
    description:
      'Estúdio de tecnologia que fundei para digitalizar serviços e automatizar processos de quem já tem operação rodando. Entrega landing pages, aplicações web e mobile, agentes de IA e integrações com CRM, ERP e WhatsApp — sempre com escopo fechado.',
    tags: ['Cloudflare Pages', 'Automação', 'Agentes de IA'],
    demo: 'https://genesis-go.pages.dev/',
    featured: true,
    badge: 'Startup própria',
  },
  {
    title: 'Farol — CRM de prospecção B2B',
    description:
      'CRM que descobre sozinho com quem você está falando: informe o CNPJ e ele busca o cadastro na Receita Federal, cruza com o IBGE, calcula uma nota de qualificação por regras auditáveis e joga o lead no funil. Pipeline kanban, importação em massa, histórico de contatos e painel. Postgres com RLS por usuário no Supabase.',
    tags: ['Next.js 16', 'TypeScript', 'Supabase', 'PostgreSQL', 'RLS', 'BrasilAPI'],
    demo: 'https://farol-crm.vercel.app',
    repo: 'https://github.com/yasmjm/farol-crm',
    featured: true,
  },
  {
    title: 'Enriquecedor de Leads (CNPJ)',
    description:
      'O motor de enriquecimento do Farol, aberto aqui para testar sem cadastro: um CNPJ vira dossiê com dados da Receita e do IBGE, nota explicada critério a critério e exportação em CSV. Aceita lote.',
    tags: ['BrasilAPI', 'IBGE', 'Gemini', 'Saída estruturada'],
    demo: '/ferramentas/leads',
    featured: true,
  },
];

/**
 * GUARDADOS — projetos sem link público, fora da grade por enquanto.
 * Para trazer um de volta: descomente o objeto, cole dentro de PROJECTS acima
 * e preencha `demo` (site no ar) e/ou `repo` (repositório).
 *
 * {
 *   title: 'Classificador de E-mails com IA',
 *   description:
 *     'Pipeline em Node.js que integra a API do Gemini para classificar e-mails por contexto semântico, fazer o parsing dos payloads e automatizar a triagem da caixa de entrada.',
 *   tags: ['Node.js', 'TypeScript', 'Gemini API'],
 * },
 * {
 *   title: 'Scraper de Compras Públicas',
 *   description:
 *     'Automação de monitoramento do Portal de Compras Públicas: navegação resiliente a seletores dinâmicos, extração estruturada e coleta agendada dos editais publicados.',
 *   tags: ['Puppeteer', 'Node.js', 'Cron'],
 * },
 * {
 *   title: 'Lead Scraper (Google Maps)',
 *   description:
 *     'Captador de leads que percorre resultados do Google Maps e extrai dados de contato e localização de empresas por segmento e região.',
 *   tags: ['Puppeteer', 'Node.js'],
 * },
 * {
 *   title: 'Cardápio Digital com integração WhatsApp',
 *   description:
 *     'Cardápio mobile-first para pequenos negócios, com fluxo de pedido que abre direto na conversa do WhatsApp. Arquitetura leve e deploy em Cloudflare Pages.',
 *   tags: ['Tailwind CSS', 'Cloudflare Pages', 'UX mobile'],
 * },
 * {
 *   title: 'Controle Financeiro',
 *   description:
 *     'Aplicação fullstack de controle de gastos com CRUD completo, autenticação e modelagem relacional no Supabase (PostgreSQL), publicada na Vercel.',
 *   tags: ['React', 'Supabase', 'PostgreSQL'],
 * },
 */

/**
 * Publicações externas. Vazio = a seção "Publicado fora daqui" some da página
 * de projetos, sem deixar buraco no layout.
 *
 * GUARDADOS — as duas análises do Medium, fora do site por enquanto.
 * Para trazer de volta: descomente o objeto e cole dentro do array.
 *
 * {
 *   title: 'Explorando o ecossistema de desenvolvimento moderno',
 *   description:
 *     'Análise das ferramentas e serviços essenciais para quem desenvolve hoje, da API REST ao AWS CloudFormation.',
 *   tags: ['APIs REST', 'AWS'],
 *   url: 'https://medium.com/@mariayasmimsousaalmeida/exploring-the-modern-development-ecosystem-an-analysis-of-essential-tools-and-services-from-rest-c64f8d2b9571',
 *   source: 'Medium',
 * },
 * {
 *   title: 'Rede neural com função sigmoide para classificação binária',
 *   description:
 *     'Implementação de uma rede neural do zero, detalhando a função de ativação sigmoide e a lógica matemática por trás do treinamento.',
 *   tags: ['Redes Neurais', 'Matemática'],
 *   url: 'https://medium.com/@mariayasmimsousaalmeida/implementation-of-a-neural-network-with-sigmoid-function-for-binary-classification-abdf4eca89f5',
 *   source: 'Medium',
 * },
 */
export const ARTICLES: Article[] = [];

/**
 * Aparições na imprensa — matérias e entrevistas em que fui ouvida.
 * Alimenta o bloco "Na imprensa" da página do blog.
 * Lista vazia = o bloco some, sem deixar buraco no layout.
 */
export const PRESS: PressMention[] = [
  {
    outlet: 'Boletim Brio',
    section: 'Todavia',
    title:
      'Por que jovens piauienses já não priorizam casa própria, família e “emprego de escritório”?',
    note:
      'Fui ouvida sobre a minha trajetória: sair do Ceará aos 18 anos para cursar Direito em Teresina, largar o curso no meio e me encontrar na tecnologia. A reportagem usa a história para discutir como a minha geração remonta a ideia de vida adulta.',
    date: '2026-03-18',
    byline: 'Paula Sampaio',
    url: 'https://boletimbrio.com/2026/03/18/todavia/por-que-jovens-piauienses-ja-nao-priorizam-casa-propria-familia-e-emprego-de-escritorio-especialistas-explicam-nova-logica-da-vida-adulta/',
  },
];

/**
 * Vídeos e aulas que aparecem no bloco "Links úteis" da Curadoria.
 * Lista vazia = o bloco some do site, sem deixar buraco no layout.
 * Formato: { label: 'Título do vídeo', note: 'Nome do canal', url: '...' }
 */
export const USEFUL_LINKS: UsefulLink[] = [
  // Filosofia e formação
  {
    label: 'Brio: A Única Coisa Que Ninguém Pode Te Dar',
    note: 'Filosofatos',
    url: 'https://www.youtube.com/watch?v=BHvqO3gIINY',
  },
  {
    label: 'Nietzsche and Psychology: How To Become Who You Are',
    note: 'Academy of Ideas',
    url: 'https://www.youtube.com/watch?v=gfyCzLbcAvk',
  },
  {
    label: 'Como se tornar você mesmo',
    note: 'Ato e Potência',
    url: 'https://www.youtube.com/watch?v=o8s27I-ISkM',
  },
  {
    label: 'Como eu viciei meu cérebro em estudar',
    note: 'Dyllan Johnny',
    url: 'https://www.youtube.com/watch?v=GHq1In6tjE0',
  },

  // Negócio e estratégia
  {
    label: 'Aula sobre SaaS: churn, downloads e retenção',
    note: 'Augusto Galego',
    url: 'https://www.youtube.com/watch?v=FoUWaucFqxM',
  },
  {
    label: 'O segredo do sucesso, com Daniel Heise (DGF)',
    note: 'Aura por Lucas Abreu',
    url: 'https://www.youtube.com/watch?v=FazrryZAVSo',
  },

  // Engenharia
  {
    label: 'Graph Engineering: o novo nível da orquestração de agentes de IA',
    note: 'Attekita Dev',
    url: 'https://www.youtube.com/watch?v=6GcfKpfA2kM',
  },
  {
    label: 'Transformando mensagens em chamados com agentes de IA + MCP',
    note: 'Giuliana Bezerra',
    url: 'https://www.youtube.com/watch?v=aUzloo3nI2o',
  },
  {
    label: 'Terraform + AWS + GitHub Actions: pipeline do zero',
    note: 'Build & Run',
    url: 'https://www.youtube.com/watch?v=pIyLPp6Dplk',
  },
];

export const PERSONAL_INFO = {
  name: 'Maria Yasmim',
  role: 'Desenvolvedora Fullstack & Especialista em Automação',
  email: 'mariayasmimsousaalmeida@gmail.com',
  github: 'https://github.com/yasmjm',
  linkedin: 'https://www.linkedin.com/in/maria-yasmim-dev/',
  medium: 'https://medium.com/@mariayasmimsousaalmeida',
  description:
    'Desenvolvedora apaixonada por resolver problemas complexos através de código limpo e automações inteligentes. Especialista em extração de dados e construção de fluxos RPA de alta eficiência.',
};

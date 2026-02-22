
import { Project, Skill, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Início', href: '#home' },
  { label: 'Sobre', href: '#about' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Contato', href: '#contact' },
];

export const SKILLS: Skill[] = [
  { name: 'JavaScript', category: 'Backend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'PHP', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'Next.js', category: 'Backend' },
  { name: 'Supabase', category: 'Backend' },
  { name: 'Puppeteer', category: 'Automation' },
  { name: 'Web Scraping', category: 'Automation' },
  { name: 'RPA', category: 'Automation' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Serverless', category: 'Cloud' },
  { name: 'SQL', category: 'Database' },
  { name: 'Git', category: 'Tools' },
  { name: 'GitHub', category: 'Tools' },
  { name: 'React', category: 'Frontend' },
  { name: 'HTML', category: 'Frontend' },
  { name: 'CSS', category: 'Frontend' },
  { name: 'Gemini AI API', category: 'AI' },
  { name: 'Integração de LLMs', category: 'AI' },

];

export const PROJECTS: Project[] = [
  {
    title: 'Classificador de E-mails com IA',
    description: 'Sistema inteligente que utiliza o modelo Gemini para classificar e processar e-mails automaticamente com base no contexto.',
    tags: ['Node.js', 'Gemini AI API'],
    link: 'https://github.com/yasmjm',
    github: 'https://github.com/yasmjm'
  },
  // {
  //   title: 'Lead Scraper (Google Maps)',
  //   description: 'Captador de leads automatizado desenvolvido para extrair dados estratégicos de empresas diretamente do Google Maps.',
  //   tags: ['Puppeteer', 'Node.js'],
  //   link: 'https://github.com/yasmjm',
  //   github: 'https://github.com/yasmjm'
  // },
  {
    title: 'Scraper de Compras Públicas',
    description: 'Automação complexa para monitoramento, navegação e extração de dados do Portal de Compras Públicas.',
    tags: ['Puppeteer', 'JavaScript'],
    link: 'https://github.com/yasmjm',
    github: 'https://github.com/yasmjm'
  }
];

export const PERSONAL_INFO = {
  name: 'Yasmim',
  role: 'Desenvolvedora Fullstack & Especialista em Automação',
  email: 'mariayasmimsousaalmeida@gmail.com',
  github: 'https://github.com/yasmjm',
  linkedin: 'https://www.linkedin.com/in/maria-yasmim-dev/',
  description: 'Desenvolvedora apaixonada por resolver problemas complexos através de código limpo e automações inteligentes. Especialista em extração de dados e construção de fluxos RPA de alta eficiência.'
};

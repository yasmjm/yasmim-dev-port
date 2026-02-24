
import { Project, Skill, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Início', href: '#home' },
  { label: 'Sobre', href: '#about' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Contato', href: '#contact' },
];

export const SKILLS: Skill[] = [
  // Backend
  { name: 'JavaScript', category: 'Backend', experience: '2 anos' },
  { name: 'Node.js', category: 'Backend', experience: '2 anos' }, // Foco no seu projeto de classificador de e-mails
  { name: 'PHP', category: 'Backend', experience: '1,5 anos' },
  { name: 'Python', category: 'Backend', experience: '1 ano' },
  { name: 'Next.js', category: 'Backend', experience: '1 ano' },
  { name: 'Supabase', category: 'Backend', experience: '1,5 anos' },
  
  // Automation (Seu ponto forte!)
  { name: 'Puppeteer', category: 'Automation', experience: '2 anos' }, // Reflete seus scrapers de leads e compras públicas
  { name: 'Web Scraping', category: 'Automation', experience: '2 anos' },
  { name: 'RPA', category: 'Automation', experience: '2 anos' },
  
  // AI
  { name: 'Gemini AI API', category: 'AI', experience: '6 meses' }, // Seu projeto atual com Node.js
  { name: 'Integração de LLMs', category: 'AI', experience: '6 meses' },
  
  // Frontend
  { name: 'React', category: 'Frontend', experience: '1 ano' },
  //tools
  { name: 'Git', category: 'Tools', experience: '2 anos' },
  { name: 'GitHub', category: 'Tools', experience: '2 anos' },
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


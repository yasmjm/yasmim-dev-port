export interface Project {
  title: string;
  description: string;
  tags: string[];
  /** Link do repositório. Deixe indefinido em vez de apontar para o perfil genérico. */
  repo?: string;
  /** Link do projeto rodando, quando houver deploy público. */
  demo?: string;
  /** Marque como true para o projeto aparecer em destaque no topo da grade. */
  featured?: boolean;
  /** Selo curto acima do título, ex.: 'Startup própria'. Opcional. */
  badge?: string;
}

export interface Article {
  title: string;
  description: string;
  tags: string[];
  url: string;
  source: 'Medium' | 'Blog';
}

export type SkillCategory =
  | 'Backend'
  | 'Automation'
  | 'AI'
  | 'Frontend'
  | 'Database'
  | 'Cloud/Infra'
  | 'DevOps'
  | 'Tools';

export interface Skill {
  name: string;
  category: SkillCategory;
  experience?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface UsefulLink {
  /** Nome do canal, playlist ou site. */
  label: string;
  /** Uma linha curta dizendo por que vale a pena. Opcional. */
  note?: string;
  url: string;
}

export interface PressMention {
  /** Veículo, ex.: 'Boletim Brio'. */
  outlet: string;
  /** Editoria ou coluna dentro do veículo. Opcional. */
  section?: string;
  title: string;
  /** Uma ou duas frases dizendo qual foi a minha participação. */
  note: string;
  /** Data de publicação em ISO (YYYY-MM-DD). */
  date: string;
  /** Assinatura da reportagem, quando houver. Opcional. */
  byline?: string;
  url: string;
}

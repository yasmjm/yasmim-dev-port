
export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  github?: string;
}

export interface Skill {
  name: string;
  category: 'Backend' | 'Automation' | 'Database' | 'Cloud' | 'Tools' | 'Frontend' | 'AI' |'Cloud/Infra'|'DevOps';
  experience?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

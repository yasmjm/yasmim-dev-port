export const SITE = {
  /**
   * Troque para o seu domínio final quando tiver um.
   * Em produção o ideal é definir NEXT_PUBLIC_SITE_URL nas variáveis da Vercel.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yasmim-dev-port.vercel.app').replace(/\/$/, ''),
  name: 'Maria Yasmim',
  title: 'Maria Yasmim | Desenvolvedora Fullstack & Automação',
  description:
    'Desenvolvedora fullstack especializada em automação, web scraping e integração de IA. Construo sistemas que transformam processos manuais em fluxos que rodam sozinhos.',
  locale: 'pt_BR',
  author: {
    name: 'Maria Yasmim',
    email: 'mariayasmimsousaalmeida@gmail.com',
    github: 'https://github.com/yasmjm',
    linkedin: 'https://www.linkedin.com/in/maria-yasmim-dev/',
    medium: 'https://medium.com/@mariayasmimsousaalmeida',
  },
} as const;

export function absoluteUrl(path = '/') {
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
}

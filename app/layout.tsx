import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SITE } from '@/lib/site';
import './globals.css';

/**
 * Fontes auto-hospedadas: nenhuma requisicao ao Google em runtime,
 * uma ida a menos na rede e nada de vazar IP de quem visita.
 */
const inter = localFont({
  src: './fonts/inter-variable.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
});

const jetbrains = localFont({
  src: './fonts/jetbrains-mono-variable.woff2',
  variable: '--font-jetbrains',
  display: 'swap',
  weight: '100 800',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'desenvolvedora fullstack',
    'automação',
    'RPA',
    'web scraping',
    'Node.js',
    'Next.js',
    'integração de IA',
    'Fortaleza',
  ],
  authors: [{ name: SITE.author.name, url: SITE.author.github }],
  creator: SITE.author.name,
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [{ url: '/feed.xml', title: `Blog de ${SITE.name}` }],
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-[#fafafa] font-sans text-[#1a1a1a] antialiased selection:bg-blue-100">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-black focus:px-4 focus:py-2 focus:text-white"
        >
          Pular para o conteúdo
        </a>
        {/* Sem JavaScript o observador não roda; garante que nada fique invisível. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <Navbar />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

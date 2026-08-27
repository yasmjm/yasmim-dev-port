import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 font-mono text-sm font-bold uppercase tracking-widest text-blue-700">404</p>
      <h1 className="mb-4 text-4xl font-bold tracking-tighter">Essa página não existe</h1>
      <p className="mb-8 text-gray-600">
        O link pode ter mudado de lugar. Que tal começar pelo início?
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/" className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white">
          Voltar para a home
        </Link>
        <Link
          href="/blog"
          className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium"
        >
          Ir para o blog
        </Link>
      </div>
    </div>
  );
}

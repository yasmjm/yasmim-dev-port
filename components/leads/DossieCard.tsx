import React from 'react';
import {
  AlertTriangle,
  Building2,
  CalendarDays,
  Landmark,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Users,
} from 'lucide-react';
import type { Dossie } from '@/lib/leads/types';
import { ScoreBadge, estiloFaixa } from './ScoreBadge';

const moeda = (valor: number | null) =>
  valor === null
    ? '—'
    : valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

const data = (iso: string | null) => {
  if (!iso) return '—';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
};

const Campo: React.FC<{ rotulo: string; children: React.ReactNode }> = ({ rotulo, children }) => (
  <div>
    <dt className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{rotulo}</dt>
    <dd className="mt-1 text-sm text-gray-800">{children}</dd>
  </div>
);

export const DossieCard: React.FC<{ dossie: Dossie }> = ({ dossie: d }) => {
  const estilo = estiloFaixa(d.score.faixa);

  return (
    <article className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
      <header className="flex flex-col gap-6 border-b border-gray-100 pb-6 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span
              className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
                d.situacao.ativa ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
              }`}
            >
              {d.situacao.descricao ?? 'situação desconhecida'}
            </span>
            {d.perfil.mei && (
              <span className="rounded bg-gray-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-600">
                MEI
              </span>
            )}
            {d.perfil.simples && (
              <span className="rounded bg-gray-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-600">
                Simples
              </span>
            )}
            {!d.perfil.matriz && (
              <span className="rounded bg-gray-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-600">
                Filial
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold break-words">{d.razaoSocial ?? d.cnpjFormatado}</h3>
          {d.nomeFantasia && <p className="text-sm text-gray-600">{d.nomeFantasia}</p>}
          <p className="mt-1 font-mono text-xs text-gray-500">{d.cnpjFormatado}</p>
        </div>
        <ScoreBadge total={d.score.total} faixa={d.score.faixa} />
      </header>

      <div className="grid gap-8 py-6 md:grid-cols-2">
        <section>
          <h4 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
            <Building2 className="h-4 w-4" /> Cadastro
          </h4>
          <dl className="grid grid-cols-2 gap-4">
            <Campo rotulo="Atividade principal">
              {d.atividade.principal.descricao ?? '—'}
              {d.atividade.principal.codigo && (
                <span className="ml-1 font-mono text-[11px] text-gray-400">{d.atividade.principal.codigo}</span>
              )}
            </Campo>
            <Campo rotulo="Natureza jurídica">{d.atividade.naturezaJuridica ?? '—'}</Campo>
            <Campo rotulo="Porte">{d.perfil.porte ?? '—'}</Campo>
            <Campo rotulo="Capital social">{moeda(d.perfil.capitalSocial)}</Campo>
            <Campo rotulo="Abertura">
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5 text-gray-400" />
                {data(d.perfil.aberturaEm)}
                {d.perfil.idadeAnos !== null && (
                  <span className="text-gray-500">({d.perfil.idadeAnos} anos)</span>
                )}
              </span>
            </Campo>
            <Campo rotulo="Atividades secundárias">
              {d.atividade.secundarias.length ? `${d.atividade.secundarias.length} CNAEs` : '—'}
            </Campo>
          </dl>

          {d.atividade.secundarias.length > 0 && (
            <ul className="mt-4 space-y-1">
              {d.atividade.secundarias.slice(0, 4).map((c) => (
                <li key={c.codigo} className="text-xs text-gray-500">
                  • {c.descricao}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h4 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
            <MapPin className="h-4 w-4" /> Localização e contato
          </h4>
          <p className="text-sm text-gray-800">
            {[d.endereco.logradouro, d.endereco.numero, d.endereco.complemento].filter(Boolean).join(', ') || '—'}
          </p>
          <p className="text-sm text-gray-600">
            {[d.endereco.bairro, d.endereco.municipio, d.endereco.uf].filter(Boolean).join(' · ')}
          </p>
          {d.localizacao?.mesorregiao && (
            <p className="mt-1 text-xs text-gray-500">
              {d.localizacao.mesorregiao} — região {d.localizacao.regiao}
              <span className="ml-1 text-gray-400">(IBGE {d.localizacao.codigoIbge})</span>
            </p>
          )}
          {d.endereco.latitude !== null && d.endereco.longitude !== null && (
            <a
              href={`https://www.google.com/maps?q=${d.endereco.latitude},${d.endereco.longitude}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-xs font-semibold text-blue-700 hover:underline"
            >
              Ver no mapa ↗
            </a>
          )}

          <div className="mt-5 space-y-2">
            {d.contato.email ? (
              <a
                href={`mailto:${d.contato.email}`}
                className="flex items-center gap-2 text-sm text-blue-700 hover:underline"
              >
                <Mail className="h-4 w-4" /> {d.contato.email}
              </a>
            ) : (
              <p className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="h-4 w-4" /> sem e-mail no cadastro
              </p>
            )}
            {d.contato.telefones.length ? (
              d.contato.telefones.map((t) => (
                <p key={t} className="flex items-center gap-2 text-sm text-gray-800">
                  <Phone className="h-4 w-4 text-gray-400" /> {t}
                </p>
              ))
            ) : (
              <p className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="h-4 w-4" /> sem telefone no cadastro
              </p>
            )}
          </div>

          {d.socios.length > 0 && (
            <div className="mt-6">
              <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                <Users className="h-4 w-4" /> Quadro societário
              </h4>
              <ul className="space-y-1">
                {d.socios.map((s) => (
                  <li key={`${s.nome}-${s.desde ?? ''}`} className="text-sm text-gray-800">
                    {s.nome}
                    <span className="text-gray-500">
                      {s.qualificacao ? ` — ${s.qualificacao}` : ''}
                      {s.desde ? ` (desde ${data(s.desde)})` : ''}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>

      <section className="border-t border-gray-100 pt-6">
        <h4 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
          <Landmark className="h-4 w-4" /> Como a nota foi calculada
        </h4>
        <div className="grid gap-3 md:grid-cols-2">
          {d.score.criterios.map((c) => (
            <div key={c.label}>
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <span className="text-sm font-semibold text-gray-800">{c.label}</span>
                <span className="text-xs tabular-nums text-gray-500">
                  {c.pontos}/{c.maximo}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full ${estilo.barra}`}
                  style={{ width: `${Math.round((c.pontos / c.maximo) * 100)}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">{c.detalhe}</p>
            </div>
          ))}
        </div>

        {d.score.alertas.length > 0 && (
          <ul className="mt-5 space-y-1">
            {d.score.alertas.map((a) => (
              <li key={a} className="flex items-start gap-2 text-xs text-amber-700">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {a}
              </li>
            ))}
          </ul>
        )}
      </section>

      {d.ia && (
        <section className="mt-6 rounded-2xl bg-gray-50 p-6">
          <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
            <Sparkles className="h-4 w-4" /> Leitura comercial
          </h4>
          <p className="text-sm leading-relaxed text-gray-800">{d.ia.resumo}</p>
          {d.ia.abordagem && (
            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              <span className="font-semibold">Abordagem sugerida: </span>
              {d.ia.abordagem}
            </p>
          )}
          {d.ia.sinais.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {d.ia.sinais.map((s) => (
                <li key={s} className="rounded bg-white px-2 py-1 text-[11px] text-gray-600">
                  {s}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 text-[11px] text-gray-400">
            Texto gerado por {d.ia.modelo} a partir dos dados públicos acima. A nota não depende da IA.
          </p>
        </section>
      )}

      {d.falhas.length > 0 && (
        <p className="mt-6 text-xs text-gray-400">Enriquecimentos parciais: {d.falhas.join(' · ')}</p>
      )}
    </article>
  );
};

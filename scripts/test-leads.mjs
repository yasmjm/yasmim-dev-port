/**
 * Testes das funções puras do enriquecedor — sem rede, sem framework.
 * Compila lib/leads para CommonJS num diretório temporário e roda as asserções.
 *
 *   npm run test:leads
 */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

process.env.LEADS_MOCK = '1';

const saida = mkdtempSync(join(tmpdir(), 'leads-test-'));
execFileSync(
  'npx',
  [
    'tsc',
    'lib/leads/cnpj.ts',
    'lib/leads/score.ts',
    'lib/leads/enrich.ts',
    'lib/leads/csv.ts',
    'lib/leads/fixtures.ts',
    '--outDir', saida,
    '--module', 'commonjs',
    '--moduleResolution', 'node',
    '--target', 'es2022',
    '--skipLibCheck',
  ],
  { stdio: 'inherit' },
);

const require = createRequire(import.meta.url);
const { cnpjValido, formatarCnpj, extrairCnpjs, sanitizarCnpj } = require(join(saida, 'cnpj.js'));
const { montarDossieBase, enriquecer } = require(join(saida, 'enrich.js'));
const { dossiesParaCsv } = require(join(saida, 'csv.js'));
const { EMPRESA_EXEMPLO, EMPRESA_INATIVA_EXEMPLO } = require(join(saida, 'fixtures.js'));

let passaram = 0;
const testes = [];
const teste = (nome, fn) => testes.push([nome, fn]);

teste('valida CNPJs reais', () => {
  assert.equal(cnpjValido('33.000.167/0001-01'), true);
  assert.equal(cnpjValido('00000000000191'), true);
});

teste('rejeita dígito verificador errado, tamanho errado e sequência repetida', () => {
  assert.equal(cnpjValido('33000167000102'), false);
  assert.equal(cnpjValido('3300016700010'), false);
  assert.equal(cnpjValido('11111111111111'), false);
  assert.equal(cnpjValido(''), false);
});

teste('formata e sanitiza', () => {
  assert.equal(formatarCnpj('33000167000101'), '33.000.167/0001-01');
  assert.equal(sanitizarCnpj('33.000.167/0001-01'), '33000167000101');
});

teste('extrai CNPJs de texto colado, sem repetir', () => {
  const texto = 'Cliente A 33.000.167/0001-01; Cliente B 00000000000191\nrepetido 33000167000101';
  assert.deepEqual(extrairCnpjs(texto), ['33000167000101', '00000000000191']);
});

teste('não gruda CNPJs de linhas vizinhas nem aceita lixo numérico', () => {
  // Regressão: um regex ganancioso juntava as duas linhas num número de 28 dígitos.
  assert.deepEqual(extrairCnpjs('33.000.167/0001-01\n00.000.000/0001-91'), [
    '33000167000101',
    '00000000000191',
  ]);
  assert.deepEqual(extrairCnpjs('33000167000101,00000000000191'), [
    '33000167000101',
    '00000000000191',
  ]);
  assert.deepEqual(extrairCnpjs('pedido 12345 valor 1.234,56'), []);
});

teste('empresa ativa e estruturada vira lead quente', () => {
  const d = montarDossieBase(EMPRESA_EXEMPLO);
  assert.equal(d.situacao.ativa, true);
  assert.equal(d.perfil.matriz, true);
  assert.equal(d.contato.telefones[0], '(11) 3000-0000');
  assert.equal(d.socios.length, 2);
  assert.ok(d.perfil.idadeAnos > 20, 'idade calculada a partir da abertura');
  assert.equal(d.score.faixa, 'quente');
  assert.ok(d.score.total >= 70, `esperava >= 70, veio ${d.score.total}`);
});

teste('empresa baixada nunca sobe de faixa e ganha alerta', () => {
  const d = montarDossieBase(EMPRESA_INATIVA_EXEMPLO);
  assert.equal(d.situacao.ativa, false);
  assert.equal(d.score.faixa, 'frio');
  assert.equal(d.score.criterios.find((c) => c.label === 'Situação cadastral').pontos, 0);
  assert.ok(d.score.alertas.some((a) => a.includes('não prospectar')));
  assert.ok(d.score.alertas.some((a) => a.includes('MEI')));
});

teste('a soma dos critérios nunca passa de 100', () => {
  for (const empresa of [EMPRESA_EXEMPLO, EMPRESA_INATIVA_EXEMPLO]) {
    const { score } = montarDossieBase(empresa);
    const maximo = score.criterios.reduce((s, c) => s + c.maximo, 0);
    assert.equal(maximo, 100);
    assert.ok(score.total <= 100 && score.total >= 0);
  }
});

teste('enriquecer valida a entrada antes de qualquer chamada', async () => {
  await assert.rejects(() => enriquecer('123'), /inválido/);
});

teste('enriquecer usa o cache na segunda chamada', async () => {
  const primeira = await enriquecer('33000167000101');
  assert.equal(primeira.doCache, undefined);
  const segunda = await enriquecer('33000167000101');
  assert.equal(segunda.doCache, true);
});

teste('CSV sai com BOM, cabeçalho e campos escapados', () => {
  const d = montarDossieBase(EMPRESA_EXEMPLO);
  const csv = dossiesParaCsv([{ ...d, ia: null, falhas: [], consultadoEm: new Date().toISOString() }]);
  assert.ok(csv.startsWith('﻿'), 'começa com BOM para o Excel');
  const [cabecalho, linha] = csv.slice(1).split('\r\n');
  assert.equal(cabecalho.split(',')[0], 'cnpj');
  assert.ok(linha.includes('"33.000.167/0001-01"'));
  assert.ok(linha.includes('"quente"'));
});

const executar = async () => {
  for (const [nome, fn] of testes) {
    try {
      await fn();
      passaram += 1;
      console.log(`  ok  ${nome}`);
    } catch (erro) {
      console.error(`  FALHOU  ${nome}\n    ${erro.message}`);
      process.exitCode = 1;
    }
  }
  console.log(`\n${passaram}/${testes.length} testes passaram`);
  rmSync(saida, { recursive: true, force: true });
};

await executar();

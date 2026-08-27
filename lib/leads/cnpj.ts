/** Sanitização, validação e formatação de CNPJ. Sem dependências. */

export function sanitizarCnpj(valor: string): string {
  return (valor ?? '').replace(/\D/g, '');
}

/** Valida os dois dígitos verificadores (módulo 11). */
export function cnpjValido(valor: string): boolean {
  const cnpj = sanitizarCnpj(valor);
  if (cnpj.length !== 14) return false;
  // Sequências repetidas passam no cálculo, mas não existem na Receita.
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  const digito = (base: string): number => {
    let peso = base.length - 7;
    let soma = 0;
    for (let i = 0; i < base.length; i += 1) {
      soma += Number(base[i]) * peso;
      peso -= 1;
      if (peso < 2) peso = 9;
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const base = cnpj.slice(0, 12);
  const dv1 = digito(base);
  const dv2 = digito(`${base}${dv1}`);
  return cnpj === `${base}${dv1}${dv2}`;
}

export function formatarCnpj(valor: string): string {
  const cnpj = sanitizarCnpj(valor);
  if (cnpj.length !== 14) return valor;
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

/**
 * Extrai CNPJs de um texto colado (uma por linha, CSV, planilha, o que for).
 * Quebra por qualquer separador que não faça parte de um CNPJ — sem isso, um
 * regex ganancioso junta o fim de uma linha com o começo da seguinte.
 */
export function extrairCnpjs(texto: string): string[] {
  const tokens = (texto ?? '').split(/[^0-9./-]+/);
  const limpos = tokens
    .map(sanitizarCnpj)
    .filter((c) => c.length === 14);
  return Array.from(new Set(limpos));
}

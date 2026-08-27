/** Cliente HTTP com timeout, retry exponencial e erro tipado. */

export class ApiError extends Error {
  readonly status: number;
  readonly fonte: string;

  constructor(mensagem: string, status: number, fonte: string) {
    super(mensagem);
    this.name = 'ApiError';
    this.status = status;
    this.fonte = fonte;
  }
}

interface Opcoes {
  fonte: string;
  timeoutMs?: number;
  tentativas?: number;
  /** Status que devem virar `null` em vez de erro (tipicamente 404). */
  nuloEm?: number[];
}

const dormir = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function buscarJson<T>(url: string, opcoes: Opcoes): Promise<T | null> {
  const { fonte, timeoutMs = 9000, tentativas = 3, nuloEm = [404] } = opcoes;
  let ultimoErro: ApiError | null = null;

  for (let tentativa = 1; tentativa <= tentativas; tentativa += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const resposta = await fetch(url, {
        signal: controller.signal,
        headers: { Accept: 'application/json', 'User-Agent': 'enriquecedor-de-leads' },
        cache: 'no-store',
      });

      if (nuloEm.includes(resposta.status)) return null;

      if (resposta.status === 429 || resposta.status >= 500) {
        // Respeita o Retry-After quando a API informa; senão, backoff exponencial.
        const retryAfter = Number(resposta.headers.get('retry-after'));
        const espera = Number.isFinite(retryAfter) && retryAfter > 0
          ? retryAfter * 1000
          : 600 * 2 ** (tentativa - 1);
        ultimoErro = new ApiError(
          resposta.status === 429
            ? `${fonte} recusou por excesso de requisições`
            : `${fonte} respondeu ${resposta.status}`,
          resposta.status,
          fonte,
        );
        if (tentativa < tentativas) {
          await dormir(Math.min(espera, 5000));
          continue;
        }
        throw ultimoErro;
      }

      if (!resposta.ok) {
        throw new ApiError(`${fonte} respondeu ${resposta.status}`, resposta.status, fonte);
      }

      return (await resposta.json()) as T;
    } catch (erro) {
      if (erro instanceof ApiError) {
        if (tentativa >= tentativas) throw erro;
        ultimoErro = erro;
      } else {
        const abortou = erro instanceof Error && erro.name === 'AbortError';
        ultimoErro = new ApiError(
          abortou ? `${fonte} não respondeu a tempo` : `Falha de rede ao consultar ${fonte}`,
          abortou ? 504 : 502,
          fonte,
        );
        if (tentativa >= tentativas) throw ultimoErro;
      }
      await dormir(600 * 2 ** (tentativa - 1));
    } finally {
      clearTimeout(timer);
    }
  }

  throw ultimoErro ?? new ApiError(`Falha ao consultar ${fonte}`, 502, fonte);
}

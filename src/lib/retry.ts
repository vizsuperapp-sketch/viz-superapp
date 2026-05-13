/**
 * Retry async operation with exponential backoff.
 * Útil para operações de rede sujeitas a falhas transitórias.
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  opts: { retries?: number; baseDelayMs?: number; onRetry?: (attempt: number, err: unknown) => void } = {},
): Promise<T> {
  const { retries = 2, baseDelayMs = 600, onRetry } = opts;
  let lastErr: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (attempt === retries) break;
      onRetry?.(attempt + 1, err);
      await new Promise((r) => setTimeout(r, baseDelayMs * Math.pow(2, attempt)));
    }
  }
  throw lastErr;
}

/** Converte erros comuns em mensagens user-friendly em PT. */
export function friendlyError(err: unknown, fallback = "Ocorreu um erro. Tenta novamente."): string {
  const msg = err instanceof Error ? err.message : typeof err === "string" ? err : "";
  const lower = msg.toLowerCase();
  if (lower.includes("failed to fetch") || lower.includes("networkerror") || lower.includes("network request"))
    return "Sem ligação. Verifica a tua internet e tenta novamente.";
  if (lower.includes("timeout") || lower.includes("aborted")) return "O servidor demorou demasiado a responder. Tenta novamente.";
  if (lower.includes("429") || lower.includes("too many")) return "Demasiados pedidos. Aguarda um momento.";
  if (lower.includes("payload too large") || lower.includes("413")) return "Ficheiro demasiado grande.";
  return msg || fallback;
}

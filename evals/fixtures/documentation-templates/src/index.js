/**
 * Retry an async function with exponential backoff.
 * @param {() => Promise<T>} fn
 * @param {{ retries?: number, baseMs?: number, jitter?: boolean }} [options]
 * @template T
 */
export async function retry(fn, { retries = 3, baseMs = 100, jitter = true } = {}) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt >= retries) throw err;
      const delay = baseMs * 2 ** attempt * (jitter ? Math.random() + 0.5 : 1);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

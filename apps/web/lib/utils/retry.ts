import { sleep } from './sleep';

export interface RetryOptions {
  attempts: number;
  baseDelayMs: number;
  factor?: number;
}

export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions,
): Promise<T> {
  const factor = options.factor ?? 2;
  let lastError: unknown;
  for (let attempt = 0; attempt < options.attempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < options.attempts - 1) {
        await sleep(options.baseDelayMs * Math.pow(factor, attempt));
      }
    }
  }
  throw lastError;
}

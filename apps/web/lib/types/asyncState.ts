export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export function idleAsyncState<T>(): AsyncState<T> {
  return { data: null, isLoading: false, error: null };
}

export function loadingAsyncState<T>(): AsyncState<T> {
  return { data: null, isLoading: true, error: null };
}

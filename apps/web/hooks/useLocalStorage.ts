'use client';

import { useCallback, useEffect, useState } from 'react';
import { safeJsonParse } from '@/lib/utils/safeJsonParse';

export function useLocalStorage<T>(key: string, initial: T): [T, (next: T) => void] {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(key);
    if (raw !== null) {
      const parsed = safeJsonParse<T>(raw);
      if (parsed !== null) setValue(parsed);
    }
  }, [key]);

  const set = useCallback(
    (next: T) => {
      setValue(next);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(next));
      }
    },
    [key],
  );

  return [value, set];
}

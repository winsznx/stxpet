'use client';

import { useCallback, useEffect, useState } from 'react';
import { safeJsonParse } from '@/lib/utils/safeJsonParse';

/**
 * Type-safe hook for interacting with browser localStorage.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (val: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = safeJsonParse<T>(item);
        if (parsed !== null) setStoredValue(parsed);
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  const setValue = useCallback((value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  return [storedValue, setValue];
}

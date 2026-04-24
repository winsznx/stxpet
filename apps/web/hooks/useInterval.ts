'use client';

import { useEffect, useRef } from 'react';

/**
 * Custom hook that sets up an interval and clears it on unmount.
 * It uses a ref for the callback to avoid stale closures without 
 * requiring the callback to be memoized by the consumer.
 */
export function useInterval(callback: () => void, delayMs: number | null): void {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delayMs === null) return;
    const id = setInterval(() => savedCallback.current(), delayMs);
    return () => clearInterval(id);
  }, [delayMs]);
}

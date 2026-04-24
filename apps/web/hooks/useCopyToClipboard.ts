'use client';

import { useCallback, useState, useRef, useEffect } from 'react';
import { copyToClipboard } from '@/lib/utils/copyToClipboard';

/**
 * Hook to manage copy-to-clipboard state with a temporary "copied" indicator.
 */
export function useCopyToClipboard(timeoutMs = 2000) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copy = useCallback(async (text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), timeoutMs);
    }
    return ok;
  }, [timeoutMs]);

  return { copied, copy };
}

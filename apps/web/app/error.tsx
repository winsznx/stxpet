'use client';

import { useEffect } from 'react';
import { COLORS, FONTS } from '@/lib/constants/theme';
import { Button } from '@/components/ui/Button';
import { logger } from '@/lib/utils/logger';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    logger.error('app route error boundary', { message: error.message, digest: error.digest });
  }, [error]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 16,
        padding: 24,
        fontFamily: FONTS.display,
        color: COLORS.textMuted,
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '2rem', color: COLORS.danger }}>Something broke.</div>
      <p style={{ maxWidth: 480 }}>{error.message || 'Unknown error'}</p>
      <Button variant="danger" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}

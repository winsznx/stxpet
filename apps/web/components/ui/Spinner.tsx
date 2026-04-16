'use client';

import { CSSProperties } from 'react';
import { COLORS } from '@/lib/constants/theme';

interface SpinnerProps {
  size?: number;
  color?: string;
  label?: string;
}

export function Spinner({ size = 20, color = COLORS.primary, label = 'Loading' }: SpinnerProps) {
  const style: CSSProperties = {
    display: 'inline-block',
    width: size,
    height: size,
    border: `2px solid ${color}33`,
    borderTopColor: color,
    borderRadius: '50%',
    animation: 'spinnerRotate 0.9s linear infinite',
  };
  return (
    <span role="status" aria-label={label} style={style}>
      <style>{`@keyframes spinnerRotate { to { transform: rotate(360deg); } }`}</style>
    </span>
  );
}

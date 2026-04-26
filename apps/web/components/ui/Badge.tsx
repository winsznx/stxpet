'use client';

import React from 'react';

interface BadgeProps {
  readonly children: React.ReactNode;
  readonly color?: string;
  readonly variant?: 'solid' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  color = '#00ff94',
  variant = 'outline',
}) => {
  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: 2,
    fontSize: '0.65rem',
    fontWeight: 700,
    fontFamily: "'JetBrains Mono', monospace",
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    ...(variant === 'solid'
      ? { background: color, color: '#0a0a0f' }
      : { border: `1px solid ${color}`, color }),
  };

  return <span style={style}>{children}</span>;
};

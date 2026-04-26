'use client';

import React from 'react';

interface CardProps {
  readonly children: React.ReactNode;
  readonly title?: string;
  readonly padding?: string | number;
  readonly border?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  padding = 24,
  border = '1px solid rgba(255,255,255,0.06)',
}) => {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.02)',
        border,
        padding,
        borderRadius: 4,
        width: '100%',
      }}
    >
      {title && (
        <h3
          style={{
            margin: '0 0 20px 0',
            fontFamily: "'Syne', sans-serif",
            fontSize: '1rem',
            color: '#e8e8f0',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

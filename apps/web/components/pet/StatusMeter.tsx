'use client';

import React from 'react';
import { DANGER_THRESHOLD } from '@/lib/constants';

interface StatusMeterProps {
  readonly label: string;
  readonly value: number;
  readonly max: number;
  readonly blocksUntilNextDecay: number;
}

const getMeterColor = (value: number): string => {
  if (value < DANGER_THRESHOLD) return '#ff3c6e';
  if (value <= 50) return '#ffcc00';
  return '#00ff94';
};

export const StatusMeter: React.FC<StatusMeterProps> = ({
  label,
  value,
  max,
  blocksUntilNextDecay,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const color = getMeterColor(value);

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '0.75rem',
            color: '#5a5a7a',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
          }}
        >
          {label}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '1rem',
              fontWeight: 700,
              color,
            }}
          >
            {value}
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              color: '#5a5a7a',
              opacity: 0.8,
            }}
            title={`Next decay in ${blocksUntilNextDecay} blocks`}
          >
            ↓{blocksUntilNextDecay}
          </span>
        </div>
      </div>
      <div
        style={{
          width: '100%',
          height: 10,
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            background: color,
            transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: `0 0 10px ${color}44`,
          }}
        />
      </div>
    </div>
  );
};

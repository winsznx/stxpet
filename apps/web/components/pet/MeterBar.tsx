'use client';

import { MAX_METER, DANGER_THRESHOLD } from '@/lib/constants';

interface MeterBarProps {
  label: string;
  value: number;
  max: number;
  blocksUntilNextDecay: number;
}

function getMeterColor(value: number): string {
  if (value < DANGER_THRESHOLD) return '#ff3c6e';
  if (value <= 50) return '#ffcc00';
  return '#00ff94';
}

export function MeterBar({ label, value, max, blocksUntilNextDecay }: MeterBarProps) {
  const percentage = (value / max) * 100;
  const color = getMeterColor(value);

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '0.7rem',
            color: '#5a5a7a',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          {label}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.9rem',
              color,
            }}
          >
            {value}
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem',
              color: '#5a5a7a',
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
          height: 8,
          background: 'rgba(255,255,255,0.05)',
          borderRadius: 0,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            background: color,
            transition: 'width 0.6s ease',
          }}
        />
      </div>
    </div>
  );
}

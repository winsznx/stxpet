import { CSSProperties } from 'react';
import { clamp } from '@/lib/utils/clamp';

interface ProgressProps {
  value: number;
  max: number;
  color: string;
  height?: number;
  style?: CSSProperties;
}

export function Progress({ value, max, color, height = 8, style }: ProgressProps) {
  const pct = max === 0 ? 0 : clamp((value / max) * 100, 0, 100);
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      style={{
        width: '100%',
        height,
        background: 'rgba(255,255,255,0.05)',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: '100%',
          background: color,
          transition: 'width 0.6s ease',
        }}
      />
    </div>
  );
}

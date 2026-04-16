import { CSSProperties, ReactNode } from 'react';
import { COLORS, FONTS } from '@/lib/constants/theme';

interface StatValueProps {
  label: string;
  value: ReactNode;
  color?: string;
  style?: CSSProperties;
}

export function StatValue({ label, value, color = COLORS.primary, style }: StatValueProps) {
  return (
    <div style={{ textAlign: 'center', ...style }}>
      <div
        style={{
          fontFamily: FONTS.display,
          fontSize: '2.5rem',
          color,
          fontWeight: 700,
          lineHeight: 1.2,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize: '0.85rem',
          color: COLORS.textMuted,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
        }}
      >
        {label}
      </div>
    </div>
  );
}

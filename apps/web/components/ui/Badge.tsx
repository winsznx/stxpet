import { CSSProperties, ReactNode } from 'react';
import { COLORS, FONTS } from '@/lib/constants/theme';

type BadgeTone = 'primary' | 'danger' | 'warning' | 'muted';

const TONE_COLOR: Record<BadgeTone, string> = {
  primary: COLORS.primary,
  danger: COLORS.danger,
  warning: COLORS.warning,
  muted: COLORS.textMuted,
};

interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
  style?: CSSProperties;
}

export function Badge({ tone = 'primary', children, style }: BadgeProps) {
  const color = TONE_COLOR[tone];
  return (
    <span
      style={{
        fontFamily: FONTS.display,
        fontSize: '0.7rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        padding: '2px 8px',
        border: `1px solid ${color}`,
        color,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

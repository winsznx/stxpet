import { CSSProperties, ReactNode } from 'react';
import { COLORS } from '@/lib/constants/theme';

interface CardProps {
  children: ReactNode;
  padding?: number;
  borderColor?: string;
  style?: CSSProperties;
}

export function Card({ children, padding = 16, borderColor, style }: CardProps) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid ${borderColor ?? 'rgba(255,255,255,0.06)'}`,
        padding,
        color: COLORS.textPrimary,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

import { ReactNode } from 'react';
import { COLORS, FONTS } from '@/lib/constants/theme';

type AlertTone = 'danger' | 'warning' | 'info';

const TONE_COLOR: Record<AlertTone, string> = {
  danger: COLORS.danger,
  warning: COLORS.warning,
  info: COLORS.primary,
};

interface AlertProps {
  tone: AlertTone;
  title?: string;
  children: ReactNode;
}

export function Alert({ tone, title, children }: AlertProps) {
  const color = TONE_COLOR[tone];
  return (
    <div
      role="alert"
      style={{
        border: `1px solid ${color}`,
        padding: '12px 16px',
        color: COLORS.textPrimary,
        fontFamily: FONTS.body,
      }}
    >
      {title && (
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: '0.8rem',
            color,
            marginBottom: 4,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          {title}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

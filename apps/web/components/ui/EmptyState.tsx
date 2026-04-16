import { ReactNode } from 'react';
import { COLORS, FONTS } from '@/lib/constants/theme';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: 40,
        color: COLORS.textMuted,
        fontFamily: FONTS.body,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.display,
          fontSize: '1.1rem',
          color: COLORS.textPrimary,
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      {description && <p style={{ margin: 0, marginBottom: 16 }}>{description}</p>}
      {action}
    </div>
  );
}

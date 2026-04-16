'use client';

import { ButtonHTMLAttributes, CSSProperties, forwardRef } from 'react';
import { COLORS, FONTS } from '@/lib/constants/theme';
import { Spinner } from './Spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'sleep';

const VARIANT_COLOR: Record<ButtonVariant, string> = {
  primary: COLORS.primary,
  secondary: COLORS.secondary,
  danger: COLORS.danger,
  sleep: COLORS.sleepAction,
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', loading = false, disabled, children, style, ...rest },
  ref,
) {
  const color = VARIANT_COLOR[variant];
  const inactive = disabled || loading;

  const base: CSSProperties = {
    fontFamily: FONTS.display,
    fontSize: '1rem',
    fontWeight: 700,
    padding: '12px 24px',
    background: 'transparent',
    color: inactive ? COLORS.textMuted : color,
    border: `1px solid ${inactive ? COLORS.textMuted : color}`,
    cursor: inactive ? 'not-allowed' : 'pointer',
    opacity: inactive ? 0.5 : 1,
    boxShadow: inactive ? 'none' : `4px 4px 0px ${color}`,
    transition: 'all 0.1s ease',
    minWidth: 100,
    ...style,
  };

  return (
    <button
      {...rest}
      ref={ref}
      disabled={inactive}
      style={base}
      onMouseEnter={(e) => {
        if (!inactive) {
          e.currentTarget.style.transform = 'translate(2px, 2px)';
          e.currentTarget.style.boxShadow = `2px 2px 0px ${color}`;
        }
        rest.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        if (!inactive) {
          e.currentTarget.style.transform = 'translate(0, 0)';
          e.currentTarget.style.boxShadow = `4px 4px 0px ${color}`;
        }
        rest.onMouseLeave?.(e);
      }}
      onMouseDown={(e) => {
        if (!inactive) {
          e.currentTarget.style.transform = 'translate(4px, 4px)';
          e.currentTarget.style.boxShadow = `0px 0px 0px ${color}`;
        }
        rest.onMouseDown?.(e);
      }}
      onMouseUp={(e) => {
        if (!inactive) {
          e.currentTarget.style.transform = 'translate(2px, 2px)';
          e.currentTarget.style.boxShadow = `2px 2px 0px ${color}`;
        }
        rest.onMouseUp?.(e);
      }}
    >
      {loading ? <Spinner size={16} color={color} /> : children}
    </button>
  );
});

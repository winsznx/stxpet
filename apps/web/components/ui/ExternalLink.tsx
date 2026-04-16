import { AnchorHTMLAttributes } from 'react';
import { COLORS } from '@/lib/constants/theme';

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function ExternalLink({ children, style, ...rest }: ExternalLinkProps) {
  return (
    <a
      {...rest}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: COLORS.primary, textDecoration: 'none', ...style }}
    >
      {children}
    </a>
  );
}

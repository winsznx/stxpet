import Link from 'next/link';
import { COLORS, FONTS } from '@/lib/constants/theme';
import { ROUTES } from '@/lib/constants/routes';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: FONTS.display,
        color: COLORS.textMuted,
        gap: 16,
        padding: 24,
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '4rem', color: COLORS.primary, fontWeight: 700 }}>404</div>
      <p style={{ margin: 0 }}>This pet does not exist.</p>
      <Link href={ROUTES.home} style={{ color: COLORS.primary }}>
        &larr; Back to the pet
      </Link>
    </div>
  );
}

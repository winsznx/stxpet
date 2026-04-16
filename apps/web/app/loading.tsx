import { COLORS, FONTS } from '@/lib/constants/theme';
import { Spinner } from '@/components/ui/Spinner';

export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 12,
        fontFamily: FONTS.display,
        color: COLORS.textMuted,
      }}
    >
      <Spinner />
      <span>Loading...</span>
    </div>
  );
}

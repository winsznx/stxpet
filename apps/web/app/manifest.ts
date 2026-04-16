import type { MetadataRoute } from 'next';
import { COLORS } from '@/lib/constants/theme';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'StxPet',
    short_name: 'StxPet',
    description: 'The community-owned on-chain tamagotchi on Stacks.',
    start_url: '/',
    display: 'standalone',
    background_color: COLORS.background,
    theme_color: COLORS.primary,
    icons: [
      { src: '/logo.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}

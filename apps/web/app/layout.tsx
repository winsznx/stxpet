import type { Metadata } from 'next';
import './globals.css';
import { WalletProvider } from '@/components/wallet/WalletProvider';

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://stxpet.xyz';

export const metadata: Metadata = {
  title: 'StxPet — The On-Chain Tamagotchi',
  description:
    'A community-owned digital pet living on the Stacks blockchain. Feed it. Play with it. Keep it alive.',
  other: {
    'talentapp:project_verification':
      '62e0bc54c4244b372ecf7fcdf583afe972961dbb6dbedab5169c62e659c7db55b6de4288d613cc7199710197074193772e57ee478f18ff37647f86a92cc733b0',
  },
  openGraph: {
    title: 'StxPet — The On-Chain Tamagotchi',
    description: 'A community-owned digital pet living on the Stacks blockchain.',
    url: appUrl,
    images: [{ url: `${appUrl}/api/og`, width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StxPet — The On-Chain Tamagotchi',
    description: 'Feed it. Play with it. Keep it alive.',
    images: [`${appUrl}/api/og`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}

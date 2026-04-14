import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'StxPet Leaderboard — Hall of Survivors',
  description: 'Past round winners of the StxPet on-chain tamagotchi.',
};

export default function LeaderboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

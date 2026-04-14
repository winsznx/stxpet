'use client';

import { useLeaderboard } from '@/hooks/useLeaderboard';
import { RoundCounter } from '@/components/leaderboard/RoundCounter';
import { SurvivorTable } from '@/components/leaderboard/SurvivorTable';
import Link from 'next/link';

export default function LeaderboardPage() {
  const { rounds, totalRounds, isLoading, error } = useLeaderboard();

  return (
    <div
      style={{
        minHeight: '100vh',
        maxWidth: 600,
        margin: '0 auto',
        padding: '24px 16px',
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
        <Link
          href="/"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#00ff94',
            textDecoration: 'none',
          }}
        >
          ← STXPET
        </Link>
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '0.85rem',
            color: '#5a5a7a',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Hall of Survivors
        </span>
      </header>

      {isLoading ? (
        <div
          style={{
            textAlign: 'center',
            fontFamily: "'JetBrains Mono', monospace",
            color: '#5a5a7a',
            padding: 60,
          }}
        >
          Loading leaderboard...
        </div>
      ) : error ? (
        <div
          style={{
            textAlign: 'center',
            fontFamily: "'JetBrains Mono', monospace",
            color: '#ff3c6e',
            padding: 60,
          }}
        >
          {error}
        </div>
      ) : (
        <>
          <RoundCounter totalRounds={totalRounds} />
          <SurvivorTable rounds={rounds} />
        </>
      )}
    </div>
  );
}

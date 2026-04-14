'use client';

interface RoundCounterProps {
  totalRounds: number;
}

export function RoundCounter({ totalRounds }: RoundCounterProps) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 40 }}>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '4rem',
          color: '#00ff94',
          fontWeight: 700,
          lineHeight: 1.2,
        }}
      >
        {totalRounds}
      </div>
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '1rem',
          color: '#5a5a7a',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
        }}
      >
        Rounds Survived
      </div>
    </div>
  );
}

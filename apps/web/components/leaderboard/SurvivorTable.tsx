'use client';

import { HIRO_API_BASE } from '@/lib/constants';

interface RoundEntry {
  roundNumber: number;
  winner: string;
}

interface SurvivorTableProps {
  rounds: RoundEntry[];
}

function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function SurvivorTable({ rounds }: SurvivorTableProps) {
  if (rounds.length === 0) {
    return (
      <p style={{ fontFamily: "'Syne', sans-serif", color: '#5a5a7a', textAlign: 'center' }}>
        No rounds completed yet.
      </p>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                textAlign: 'left',
                padding: '12px 16px',
                color: '#5a5a7a',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              Round
            </th>
            <th
              style={{
                textAlign: 'left',
                padding: '12px 16px',
                color: '#5a5a7a',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              Survivor
            </th>
          </tr>
        </thead>
        <tbody>
          {rounds.map((round) => (
            <tr key={round.roundNumber}>
              <td
                style={{
                  padding: '12px 16px',
                  color: '#e8e8f0',
                  fontSize: '0.9rem',
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                }}
              >
                #{round.roundNumber}
              </td>
              <td
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                }}
              >
                <a
                  href={`https://explorer.hiro.so/address/${round.winner}?chain=mainnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#00ff94',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                  }}
                >
                  {truncateAddress(round.winner)}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

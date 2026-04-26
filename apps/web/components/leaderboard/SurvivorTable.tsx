'use client';

import React from 'react';
import { AddressLink } from '../ui/AddressLink';

interface RoundEntry {
  readonly roundNumber: number;
  readonly winner: string;
}

interface SurvivorTableProps {
  readonly rounds: readonly RoundEntry[];
}

export const SurvivorTable: React.FC<SurvivorTableProps> = ({ rounds }) => {
  if (rounds.length === 0) {
    return (
      <div style={{ padding: '40px 0', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Syne', sans-serif", color: '#5a5a7a', fontSize: '1.1rem' }}>
          The history of survivors is empty.
        </p>
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto', borderRadius: 4, background: 'rgba(255,255,255,0.02)' }}>
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
                padding: '16px',
                color: '#5a5a7a',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              Round
            </th>
            <th
              style={{
                textAlign: 'left',
                padding: '16px',
                color: '#5a5a7a',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              Survivor Address
            </th>
          </tr>
        </thead>
        <tbody>
          {[...rounds].reverse().map((round) => (
            <tr key={round.roundNumber} style={{ transition: 'background 0.2s' }} className="row-hover">
              <td
                style={{
                  padding: '16px',
                  color: '#e8e8f0',
                  fontSize: '0.95rem',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                #{round.roundNumber}
              </td>
              <td
                style={{
                  padding: '16px',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <AddressLink address={round.winner} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style>{`
        .row-hover:hover {
          background: rgba(255,255,255,0.03);
        }
      `}</style>
    </div>
  );
};

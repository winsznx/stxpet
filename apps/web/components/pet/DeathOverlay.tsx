'use client';

import { useState } from 'react';
import { callStartNewRound } from '@/lib/contract-calls';

interface DeathOverlayProps {
  lastInteractor: string | null;
  roundNumber: number;
  isConnected: boolean;
  onNewRound: () => void;
}

function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function DeathOverlay({ lastInteractor, roundNumber, isConnected, onNewRound }: DeathOverlayProps) {
  const [isPending, setIsPending] = useState(false);
  const buttonDisabled = !isConnected || isPending;

  async function handleStartNewRound() {
    if (buttonDisabled) return;
    setIsPending(true);
    try {
      await callStartNewRound();
      onNewRound();
    } catch {
      // user cancelled or tx failed
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: 'rgba(10, 10, 15, 0.95)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
      }}
    >
      <div style={{ fontSize: '5rem', lineHeight: 1 }}>&#x2620;</div>
      <h1
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: '#ff3c6e',
          fontSize: '3rem',
          margin: 0,
          textAlign: 'center',
        }}
      >
        PET HAS DIED
      </h1>
      {lastInteractor && (
        <p style={{ fontFamily: "'Syne', sans-serif", color: '#5a5a7a', fontSize: '1rem', margin: 0 }}>
          Last saved by: {truncateAddress(lastInteractor)}
        </p>
      )}
      <p style={{ fontFamily: "'Syne', sans-serif", color: '#5a5a7a', fontSize: '1rem', margin: 0 }}>
        Round #{roundNumber} complete
      </p>
      <button
        onClick={handleStartNewRound}
        disabled={buttonDisabled}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '1.2rem',
          fontWeight: 700,
          padding: '16px 32px',
          marginTop: 16,
          background: 'transparent',
          color: buttonDisabled ? '#5a5a7a' : '#ff3c6e',
          border: `1px solid ${buttonDisabled ? '#5a5a7a' : '#ff3c6e'}`,
          cursor: buttonDisabled ? 'not-allowed' : 'pointer',
          opacity: buttonDisabled ? 0.5 : 1,
          boxShadow: buttonDisabled ? 'none' : '4px 4px 0px #ff3c6e',
          transition: 'all 0.1s ease',
        }}
        onMouseEnter={(e) => {
          if (!buttonDisabled) {
            e.currentTarget.style.transform = 'translate(2px, 2px)';
            e.currentTarget.style.boxShadow = '2px 2px 0px #ff3c6e';
          }
        }}
        onMouseLeave={(e) => {
          if (!buttonDisabled) {
            e.currentTarget.style.transform = 'translate(0, 0)';
            e.currentTarget.style.boxShadow = '4px 4px 0px #ff3c6e';
          }
        }}
        onMouseDown={(e) => {
          if (!buttonDisabled) {
            e.currentTarget.style.transform = 'translate(4px, 4px)';
            e.currentTarget.style.boxShadow = '0px 0px 0px #ff3c6e';
          }
        }}
        onMouseUp={(e) => {
          if (!buttonDisabled) {
            e.currentTarget.style.transform = 'translate(2px, 2px)';
            e.currentTarget.style.boxShadow = '2px 2px 0px #ff3c6e';
          }
        }}
      >
        {isPending ? '...' : 'START NEW ROUND'}
      </button>
    </div>
  );
}

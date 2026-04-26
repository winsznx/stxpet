'use client';

import React, { useState, useEffect } from 'react';
import { isConnected as checkWalletConnected } from '@stacks/connect';
import { usePetState } from '@/hooks/usePetState';
import { PetInterface } from '@/components/pet/PetInterface';
import { DeathOverlay } from '@/components/pet/DeathOverlay';
import { WalletConnectButton } from '@/components/wallet/WalletConnectButton';
import Link from 'next/link';

export default function HomePage() {
  const { petState, isLoading, isDead, error, refetch } = usePetState();
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    setWalletConnected(checkWalletConnected());
  }, []);

  if (isLoading && !petState) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: "'JetBrains Mono', monospace", color: '#5a5a7a' }}>
        Loading pet state...
      </div>
    );
  }

  if (error && !petState) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: "'JetBrains Mono', monospace", color: '#ff3c6e', padding: 24, textAlign: 'center' }}>
        {error}
      </div>
    );
  }

  return (
    <>
      {isDead && petState && (
        <DeathOverlay
          lastInteractor={null}
          roundNumber={petState.totalRounds}
          isConnected={walletConnected}
          onNewRound={refetch}
        />
      )}
      <div
        role="main"
        aria-label="Pet interaction area"
        style={{
          minHeight: '100vh',
          maxWidth: 520,
          margin: '0 auto',
          padding: '24px 16px',
          border: petState?.isDangerZone && petState.isAlive ? '2px solid #ff3c6e' : '2px solid transparent',
          transition: 'border-color 0.3s ease',
        }}
      >
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 40,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <h1 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4rem', fontWeight: 700, color: '#00ff94', margin: 0 }}>
              STXPET
            </h1>
            {petState && (
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: '#5a5a7a' }}>
                Round #{petState.totalRounds}
              </span>
            )}
          </div>
          <WalletConnectButton />
        </header>

        {petState && (
          <PetInterface
            petState={petState}
            walletConnected={walletConnected}
            onActionComplete={refetch}
          />
        )}

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link
            href="/leaderboard"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '0.9rem',
              color: '#5a5a7a',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            className="link-hover"
          >
            View Leaderboard &rarr;
          </Link>
          <style>{`
            .link-hover:hover { color: #00ff94 !important; }
          `}</style>
        </div>
      </div>
    </>
  );
}

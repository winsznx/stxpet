'use client';

import { useState, useEffect } from 'react';
import { connect, disconnect, isConnected } from '@stacks/connect';
import { userSession } from './session';

function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function getAddress(): string | null {
  try {
    if (userSession.isUserSignedIn()) {
      return userSession.loadUserData().profile.stxAddress.mainnet;
    }
  } catch {
    // not signed in
  }
  return null;
}

export function WalletConnectButton() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const walletConnected = isConnected();
    setConnected(walletConnected);
    if (walletConnected) {
      setAddress(getAddress());
    }
  }, []);

  async function handleConnect() {
    try {
      await connect();
      setConnected(true);
      setAddress(getAddress());
    } catch {
      // user cancelled
    }
  }

  function handleDisconnect() {
    disconnect();
    setConnected(false);
    setAddress(null);
    window.location.reload();
  }

  if (connected && address) {
    return (
      <button
        onClick={handleDisconnect}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.85rem',
          padding: '8px 16px',
          background: 'transparent',
          color: '#00ff94',
          border: '1px solid #00ff94',
          cursor: 'pointer',
          boxShadow: '4px 4px 0px #00ff94',
          transition: 'all 0.1s ease',
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'translate(4px, 4px)';
          e.currentTarget.style.boxShadow = '0px 0px 0px #00ff94';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'translate(2px, 2px)';
          e.currentTarget.style.boxShadow = '2px 2px 0px #00ff94';
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translate(2px, 2px)';
          e.currentTarget.style.boxShadow = '2px 2px 0px #00ff94';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translate(0, 0)';
          e.currentTarget.style.boxShadow = '4px 4px 0px #00ff94';
        }}
      >
        {truncateAddress(address)}
      </button>
    );
  }

  return (
    <button
      onClick={handleConnect}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.85rem',
        padding: '8px 16px',
        background: '#00ff94',
        color: '#0a0a0f',
        border: '1px solid #00ff94',
        cursor: 'pointer',
        fontWeight: 700,
        boxShadow: '4px 4px 0px #00ff94',
        transition: 'all 0.1s ease',
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translate(4px, 4px)';
        e.currentTarget.style.boxShadow = '0px 0px 0px #00ff94';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translate(2px, 2px)';
        e.currentTarget.style.boxShadow = '2px 2px 0px #00ff94';
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translate(2px, 2px)';
        e.currentTarget.style.boxShadow = '2px 2px 0px #00ff94';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(0, 0)';
        e.currentTarget.style.boxShadow = '4px 4px 0px #00ff94';
      }}
    >
      Connect Wallet
    </button>
  );
}

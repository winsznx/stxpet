'use client';

import { useConnect } from '@stacks/connect-react';
import { userSession } from './session';

function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function WalletConnectButton() {
  const { doOpenAuth } = useConnect();

  const isSignedIn = userSession.isUserSignedIn();
  const address = isSignedIn
    ? userSession.loadUserData().profile.stxAddress.mainnet
    : null;

  function handleDisconnect() {
    userSession.signUserOut();
    window.location.reload();
  }

  if (isSignedIn && address) {
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
      onClick={() => doOpenAuth()}
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

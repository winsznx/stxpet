'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { connect, disconnect, isConnected } from '@stacks/connect';
import { userSession } from './session';
import { Button } from '../ui/Button';

export const WalletConnectButton: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const updateAddress = useCallback(() => {
    try {
      if (userSession.isUserSignedIn()) {
        setAddress(userSession.loadUserData().profile.stxAddress.mainnet);
      } else {
        setAddress(null);
      }
    } catch {
      setAddress(null);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    if (isConnected()) {
      updateAddress();
    }
  }, [updateAddress]);

  const handleConnect = async () => {
    try {
      await connect();
      updateAddress();
    } catch (err) {
      console.warn('Wallet connection cancelled');
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setAddress(null);
    window.location.reload();
  };

  if (!mounted) return <div style={{ width: 140, height: 40 }} />;

  if (address) {
    const displayAddr = `${address.slice(0, 6)}...${address.slice(-4)}`;
    return (
      <Button variant="outline" onClick={handleDisconnect} color="#00ff94">
        {displayAddr}
      </Button>
    );
  }

  return (
    <Button variant="solid" onClick={handleConnect} color="#00ff94">
      Connect Wallet
    </Button>
  );
};

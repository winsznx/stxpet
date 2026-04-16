'use client';

import { useEffect, useState } from 'react';
import { isConnected as isWalletConnected } from '@stacks/connect';
import { userSession } from '@/components/wallet/session';

export function useWalletAddress(): { address: string | null; isConnected: boolean } {
  const [address, setAddress] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const active = isWalletConnected();
    setConnected(active);
    if (active && userSession.isUserSignedIn()) {
      try {
        setAddress(userSession.loadUserData().profile.stxAddress.mainnet);
      } catch {
        setAddress(null);
      }
    }
  }, []);

  return { address, isConnected: connected };
}

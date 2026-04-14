'use client';

import { Connect } from '@stacks/connect-react';
import { ReactNode, useCallback, useState } from 'react';
import { APP_URL } from '@/lib/constants';

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [userData, setUserData] = useState<{ profile: { stxAddress: { mainnet: string } } } | null>(null);

  const authOptions = {
    appDetails: {
      name: 'StxPet',
      icon: `${APP_URL}/icon.png`,
    },
    onFinish: ({ userSession }: { userSession: { loadUserData: () => { profile: { stxAddress: { mainnet: string } } } } }) => {
      const data = userSession.loadUserData();
      setUserData(data);
    },
    userSession: undefined,
  };

  return (
    <Connect authOptions={authOptions}>
      {children}
    </Connect>
  );
}

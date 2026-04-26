'use client';

import React from 'react';
import { ActionButton } from './ActionButton';
import { callFeed, callPlay, callSleep } from '@/lib/contract-calls';
import { PetAction } from '@winsznx/stxpet-core';

interface ActionButtonsProps {
  readonly isConnected: boolean;
  readonly onActionComplete: () => void;
}

const ACTIONS: { action: PetAction; color: string; label: string; call: () => Promise<any> }[] = [
  { action: 'feed', color: '#00ff94', label: 'FEED', call: callFeed },
  { action: 'play', color: '#7b61ff', label: 'PLAY', call: callPlay },
  { action: 'sleep', color: '#3c6eff', label: 'SLEEP', call: callSleep },
];

export const ActionButtons: React.FC<ActionButtonsProps> = ({ isConnected, onActionComplete }) => {
  return (
    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
      {ACTIONS.map((cfg) => (
        <ActionButton
          key={cfg.action}
          action={cfg.action}
          isConnected={isConnected}
          color={cfg.color}
          label={cfg.label}
          onAction={async () => {
            await cfg.call();
            onActionComplete();
          }}
        />
      ))}
    </div>
  );
};

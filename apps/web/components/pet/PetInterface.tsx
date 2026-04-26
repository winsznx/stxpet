'use client';

import React from 'react';
import { PetDisplay } from './PetDisplay';
import { StatusMeter } from './StatusMeter';
import { ActionButtons } from './ActionButtons';
import { MAX_METER } from '@/lib/constants';
import { LivePetState } from '@winsznx/stxpet-core';

interface PetInterfaceProps {
  readonly petState: LivePetState;
  readonly walletConnected: boolean;
  readonly onActionComplete: () => void;
}

export const PetInterface: React.FC<PetInterfaceProps> = ({
  petState,
  walletConnected,
  onActionComplete,
}) => {
  return (
    <div className="pet-interface" style={{ marginTop: 20 }}>
      <PetDisplay isAlive={petState.isAlive} isDangerZone={petState.isDangerZone} />

      <div style={{ margin: '32px 0' }}>
        <StatusMeter
          label="Hunger"
          value={petState.effectiveHunger}
          max={MAX_METER}
          blocksUntilNextDecay={petState.blocksUntilNextDecay}
        />
        <StatusMeter
          label="Happiness"
          value={petState.effectiveHappiness}
          max={MAX_METER}
          blocksUntilNextDecay={petState.blocksUntilNextDecay}
        />
        <StatusMeter
          label="Energy"
          value={petState.effectiveEnergy}
          max={MAX_METER}
          blocksUntilNextDecay={petState.blocksUntilNextDecay}
        />
      </div>

      <ActionButtons isConnected={walletConnected} onActionComplete={onActionComplete} />
    </div>
  );
};

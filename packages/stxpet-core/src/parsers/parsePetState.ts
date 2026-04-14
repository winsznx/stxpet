import { ClarityValue, cvToValue } from '@stacks/transactions';
import { RawPetState } from '../types';

interface ClarityTupleData {
  [key: string]: ClarityValue;
}

export function parsePetState(clarityValue: ClarityValue): RawPetState {
  const data = cvToValue(clarityValue) as {
    hunger: bigint | number;
    happiness: bigint | number;
    energy: bigint | number;
    'last-interaction-block': bigint | number;
    'pet-alive': boolean;
    'current-block': bigint | number;
    'total-rounds': bigint | number;
  };

  return {
    hunger: Number(data.hunger),
    happiness: Number(data.happiness),
    energy: Number(data.energy),
    lastInteractionBlock: Number(data['last-interaction-block']),
    isAlive: data['pet-alive'],
    currentBlock: Number(data['current-block']),
    totalRounds: Number(data['total-rounds']),
  };
}

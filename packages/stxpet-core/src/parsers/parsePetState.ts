import { ClarityValue, cvToValue } from '@stacks/transactions';
import { RawPetState } from '../types';

/**
 * Parses a Clarity value into a RawPetState object.
 * @param clarityValue - The Clarity value returned from the contract.
 * @throws Error if the clarity value structure is unexpected.
 */
export function parsePetState(clarityValue: ClarityValue): RawPetState {
  try {
    const data = cvToValue(clarityValue) as {
      hunger: bigint | number;
      happiness: bigint | number;
      energy: bigint | number;
      'last-interaction-block': bigint | number;
      'pet-alive': boolean;
      'current-block': bigint | number;
      'total-rounds': bigint | number;
    };

    if (!data || typeof data !== 'object') {
      throw new Error('Invalid pet state data');
    }

    return {
      hunger: Number(data.hunger),
      happiness: Number(data.happiness),
      energy: Number(data.energy),
      lastInteractionBlock: Number(data['last-interaction-block']),
      isAlive: data['pet-alive'],
      currentBlock: Number(data['current-block']),
      totalRounds: Number(data['total-rounds']),
    };
  } catch (error) {
    throw new Error('Failed to parse pet state: ' + (error instanceof Error ? error.message : String(error)));
  }
}

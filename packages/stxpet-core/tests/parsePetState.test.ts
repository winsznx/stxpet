import { describe, it, expect } from 'vitest';
import { uintCV, boolCV, tupleCV } from '@stacks/transactions';
import { parsePetState } from '../src/parsers/parsePetState';

describe('parsePetState', () => {
  it('should parse a valid pet state tuple', () => {
    const mockCV = tupleCV({
      hunger: uintCV(80),
      happiness: uintCV(70),
      energy: uintCV(60),
      'last-interaction-block': uintCV(1000),
      'pet-alive': boolCV(true),
      'current-block': uintCV(1050),
      'total-rounds': uintCV(5),
    });

    const result = parsePetState(mockCV);
    expect(result.hunger).toBe(80);
    expect(result.isAlive).toBe(true);
    expect(result.lastInteractionBlock).toBe(1000);
  });

  it('should throw on invalid input', () => {
    expect(() => parsePetState(uintCV(123) as any)).toThrow();
  });
});

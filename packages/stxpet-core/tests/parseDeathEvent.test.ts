import { describe, it, expect } from 'vitest';
import { parseDeathEvent } from '../src/parsers/parseDeathEvent';

describe('parseDeathEvent', () => {
  const contractId = 'SP123.stx-pet-v1';

  it('should parse a valid NFT mint event', () => {
    const events = [
      {
        event_type: 'non_fungible_token_asset',
        asset: {
          asset_event_type: 'mint',
          asset_id: contractId + '::stxpet-survivor',
          recipient: 'SP456',
          value: { repr: 'u10' },
        },
      },
    ];

    const result = parseDeathEvent(events as any, contractId);
    expect(result).not.toBeNull();
    expect(result?.winner).toBe('SP456');
    expect(result?.tokenId).toBe(10);
    expect(result?.roundNumber).toBe(9);
  });

  it('should return null if no mint event found', () => {
    expect(parseDeathEvent([], contractId)).toBeNull();
  });
});

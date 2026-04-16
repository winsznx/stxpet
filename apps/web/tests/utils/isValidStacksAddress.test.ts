import { describe, expect, it } from 'vitest';
import { isValidStacksAddress } from '@/lib/utils/isValidStacksAddress';

describe('isValidStacksAddress', () => {
  it('accepts mainnet principal', () => {
    expect(isValidStacksAddress('SP31DPF8CF2GX5ZBHHK5J6Y061744E1TNFGYWYVX')).toBe(true);
  });

  it('rejects lowercase input', () => {
    expect(isValidStacksAddress('sp31dpf8cf2gx5zbhhk5j6y061744e1tnfgywyvx')).toBe(false);
  });

  it('rejects short string', () => {
    expect(isValidStacksAddress('SP123')).toBe(false);
  });
});

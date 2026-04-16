import { describe, expect, it } from 'vitest';
import { explorerAddressUrl, explorerTxUrl } from '@/lib/utils/explorerUrl';

describe('explorer urls', () => {
  it('builds address url with mainnet default', () => {
    expect(explorerAddressUrl('SP1')).toContain('/address/SP1');
    expect(explorerAddressUrl('SP1')).toContain('chain=mainnet');
  });

  it('supports testnet', () => {
    expect(explorerTxUrl('0xdeadbeef', 'testnet')).toContain('chain=testnet');
  });
});

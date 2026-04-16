import { formatAddress } from '@/lib/utils/formatAddress';
import { explorerAddressUrl } from '@/lib/utils/explorerUrl';
import { COLORS, FONTS } from '@/lib/constants/theme';

interface AddressLinkProps {
  address: string;
  chain?: 'mainnet' | 'testnet';
  prefix?: number;
  suffix?: number;
}

export function AddressLink({ address, chain = 'mainnet', prefix = 6, suffix = 4 }: AddressLinkProps) {
  return (
    <a
      href={explorerAddressUrl(address, chain)}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: COLORS.primary,
        textDecoration: 'none',
        fontFamily: FONTS.display,
        fontSize: '0.9rem',
      }}
    >
      {formatAddress(address, prefix, suffix)}
    </a>
  );
}

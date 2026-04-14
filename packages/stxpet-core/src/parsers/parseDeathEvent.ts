interface NftMintEvent {
  event_type: string;
  asset: {
    asset_event_type: string;
    asset_id: string;
    recipient: string;
    value: {
      repr: string;
    };
  };
}

interface ContractEvent {
  event_type: string;
  asset?: {
    asset_event_type?: string;
    asset_id?: string;
    recipient?: string;
    value?: {
      repr?: string;
    };
  };
}

export interface DeathEvent {
  winner: string;
  tokenId: number;
  roundNumber: number;
}

export function parseDeathEvent(
  events: ContractEvent[],
  contractIdentifier: string
): DeathEvent | null {
  const nftMint = events.find(
    (e) =>
      e.event_type === 'non_fungible_token_asset' &&
      e.asset?.asset_event_type === 'mint' &&
      e.asset?.asset_id?.includes(contractIdentifier)
  );

  if (!nftMint || !nftMint.asset?.recipient || !nftMint.asset?.value?.repr) {
    return null;
  }

  const tokenId = parseInt(nftMint.asset.value.repr.replace('u', ''), 10);

  return {
    winner: nftMint.asset.recipient,
    tokenId,
    roundNumber: tokenId - 1,
  };
}

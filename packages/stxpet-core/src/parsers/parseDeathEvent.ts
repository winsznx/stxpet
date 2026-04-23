/**
 * Structure of a Stacks contract event related to assets.
 */
interface ContractEvent {
  readonly event_type: string;
  readonly asset?: {
    readonly asset_event_type?: string;
    readonly asset_id?: string;
    readonly recipient?: string;
    readonly value?: {
      readonly repr?: string;
    };
  };
}

/**
 * Result of a parsed death event.
 */
export interface DeathEvent {
  readonly winner: string;
  readonly tokenId: number;
  readonly roundNumber: number;
}

/**
 * Parses contract events to find and extract the pet death (NFT mint) event.
 * @param events - List of events from a transaction.
 * @param contractIdentifier - The identifier of the StxPet contract.
 */
export function parseDeathEvent(
  events: readonly ContractEvent[],
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

  // Clarity uint representation is "u123"
  const tokenIdStr = nftMint.asset.value.repr.startsWith('u') 
    ? nftMint.asset.value.repr.slice(1) 
    : nftMint.asset.value.repr;
    
  const tokenId = parseInt(tokenIdStr, 10);

  if (isNaN(tokenId)) return null;

  return {
    winner: nftMint.asset.recipient,
    tokenId,
    roundNumber: tokenId - 1,
  };
}

export function explorerAddressUrl(address: string, chain: 'mainnet' | 'testnet' = 'mainnet'): string {
  return `https://explorer.hiro.so/address/${address}?chain=${chain}`;
}

export function explorerTxUrl(txId: string, chain: 'mainnet' | 'testnet' = 'mainnet'): string {
  return `https://explorer.hiro.so/txid/${txId}?chain=${chain}`;
}

export function explorerContractUrl(contractId: string, chain: 'mainnet' | 'testnet' = 'mainnet'): string {
  return `https://explorer.hiro.so/txid/${contractId}?chain=${chain}`;
}

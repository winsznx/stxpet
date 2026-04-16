const STACKS_ADDRESS_REGEX = /^S[PTMN][A-Z0-9]{37,40}$/;

export function isValidStacksAddress(value: string): boolean {
  return STACKS_ADDRESS_REGEX.test(value);
}

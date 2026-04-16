export const CONTRACT_ERROR_CODE = {
  PET_DEAD: 100,
  ALREADY_DEAD: 101,
} as const;

export type ContractErrorCode = (typeof CONTRACT_ERROR_CODE)[keyof typeof CONTRACT_ERROR_CODE];

export function contractErrorMessage(code: number): string {
  switch (code) {
    case CONTRACT_ERROR_CODE.PET_DEAD:
      return 'Pet is dead - interaction rejected';
    case CONTRACT_ERROR_CODE.ALREADY_DEAD:
      return 'Pet is already dead - start-new-round is callable';
    default:
      return `Unknown contract error (${code})`;
  }
}

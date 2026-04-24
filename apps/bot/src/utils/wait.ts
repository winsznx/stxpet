/**
 * Suspends execution for a given number of milliseconds.
 */
export const wait = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

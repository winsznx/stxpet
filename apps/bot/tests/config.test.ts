import { describe, it, expect } from 'vitest';
import { loadConfig } from '../src/config';

describe('loadConfig', () => {
  it('should throw if private key is missing', () => {
    process.env.BOT_PRIVATE_KEY = '';
    expect(() => loadConfig()).toThrow();
  });
});

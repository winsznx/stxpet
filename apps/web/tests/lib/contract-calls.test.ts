import { describe, it, expect, vi } from 'vitest';
import { callFeed } from '../../lib/contract-calls';

vi.mock('@stacks/connect', () => ({
  request: vi.fn(),
}));

describe('callFeed', () => {
  it('should be defined', () => {
    expect(callFeed).toBeDefined();
  });
});

import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

vi.mock('../../lib/utils/copyToClipboard', () => ({
  copyToClipboard: vi.fn().mockResolvedValue(true),
}));

describe('useCopyToClipboard', () => {
  it('should initialize with copied=false', () => {
    const { result } = renderHook(() => useCopyToClipboard());
    expect(result.current.copied).toBe(false);
  });
});

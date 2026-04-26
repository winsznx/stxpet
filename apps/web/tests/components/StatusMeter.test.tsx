import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusMeter } from '../../components/pet/StatusMeter';
import React from 'react';

describe('StatusMeter', () => {
  it('should render the label and value', () => {
    render(<StatusMeter label="Hunger" value={80} max={100} blocksUntilNextDecay={10} />);
    expect(screen.getByText('Hunger')).toBeDefined();
    expect(screen.getByText('80')).toBeDefined();
  });
});

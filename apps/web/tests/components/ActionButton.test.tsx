import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ActionButton } from '../../components/pet/ActionButton';
import React from 'react';

describe('ActionButton', () => {
  it('should render the label when connected', () => {
    render(<ActionButton action="feed" isConnected={true} onAction={async () => {}} color="#fff" label="FEED" />);
    expect(screen.getByText('FEED')).toBeDefined();
  });

  it('should render OFFLINE when not connected', () => {
    render(<ActionButton action="feed" isConnected={false} onAction={async () => {}} color="#fff" label="FEED" />);
    expect(screen.getByText('OFFLINE')).toBeDefined();
  });
});

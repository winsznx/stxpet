'use client';

import React, { useState, CSSProperties } from 'react';
import { PetAction } from '@winsznx/stxpet-core';

interface ActionButtonProps {
  readonly action: PetAction;
  readonly isConnected: boolean;
  readonly onAction: () => Promise<void>;
  readonly color: string;
  readonly label: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  action,
  isConnected,
  onAction,
  color,
  label,
}) => {
  const [isPending, setIsPending] = useState(false);
  const disabled = !isConnected || isPending;

  const handleClick = async () => {
    if (disabled) return;
    setIsPending(true);
    try {
      await onAction();
    } catch (err) {
      console.error(`Action ${action} failed:`, err);
    } finally {
      setIsPending(false);
    }
  };

  const baseStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.95rem',
    fontWeight: 700,
    padding: '12px 20px',
    background: 'transparent',
    color: disabled ? '#4a4a6a' : color,
    border: `2px solid ${disabled ? '#4a4a6a' : color}`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    boxShadow: disabled ? 'none' : `4px 4px 0px ${color}`,
    transition: 'all 0.15s ease',
    minWidth: 110,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      style={baseStyle}
      className="btn-action"
    >
      {isPending ? (
        <span className="spinner" style={{ border: `2px solid ${color}`, borderTopColor: 'transparent', borderRadius: '50%', width: 14, height: 14, display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
      ) : isConnected ? (
        label
      ) : (
        'OFFLINE'
      )}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .btn-action:not(:disabled):hover {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0px ${color};
        }
        .btn-action:not(:disabled):active {
          transform: translate(4px, 4px);
          box-shadow: 0px 0px 0px ${color};
        }
      `}</style>
    </button>
  );
};

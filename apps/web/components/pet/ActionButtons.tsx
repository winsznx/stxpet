'use client';

import { useState, CSSProperties } from 'react';
import { callFeed, callPlay, callSleep } from '@/lib/contract-calls';
import { PetAction } from '@winsznx/stxpet-core';

interface ActionButtonsProps {
  isConnected: boolean;
  onActionComplete: () => void;
}

const ACTION_COLORS: Record<PetAction, string> = {
  feed: '#00ff94',
  play: '#7b61ff',
  sleep: '#3c6eff',
};

const ACTION_LABELS: Record<PetAction, string> = {
  feed: 'FEED',
  play: 'PLAY',
  sleep: 'SLEEP',
};

const ACTION_CALLS: Record<PetAction, typeof callFeed> = {
  feed: callFeed,
  play: callPlay,
  sleep: callSleep,
};

function ActionButton({
  action,
  isConnected,
  onActionComplete,
}: {
  action: PetAction;
  isConnected: boolean;
  onActionComplete: () => void;
}) {
  const [isPending, setIsPending] = useState(false);
  const color = ACTION_COLORS[action];
  const disabled = !isConnected || isPending;

  async function handleClick() {
    if (disabled) return;
    setIsPending(true);
    try {
      await ACTION_CALLS[action]();
      onActionComplete();
    } catch {
      // user cancelled or tx failed
    } finally {
      setIsPending(false);
    }
  }

  const baseStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '1rem',
    fontWeight: 700,
    padding: '12px 24px',
    background: 'transparent',
    color: disabled ? '#5a5a7a' : color,
    border: `1px solid ${disabled ? '#5a5a7a' : color}`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    boxShadow: disabled ? 'none' : `4px 4px 0px ${color}`,
    transition: 'all 0.1s ease',
    minWidth: 100,
    position: 'relative',
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      style={baseStyle}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translate(2px, 2px)';
          e.currentTarget.style.boxShadow = `2px 2px 0px ${color}`;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translate(0, 0)';
          e.currentTarget.style.boxShadow = `4px 4px 0px ${color}`;
        }
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translate(4px, 4px)';
          e.currentTarget.style.boxShadow = `0px 0px 0px ${color}`;
        }
      }}
      onMouseUp={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translate(2px, 2px)';
          e.currentTarget.style.boxShadow = `2px 2px 0px ${color}`;
        }
      }}
    >
      {isPending ? (
        <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>&#x27F3;</span>
      ) : isConnected ? (
        ACTION_LABELS[action]
      ) : (
        'Connect'
      )}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}

export function ActionButtons({ isConnected, onActionComplete }: ActionButtonsProps) {
  return (
    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
      <ActionButton action="feed" isConnected={isConnected} onActionComplete={onActionComplete} />
      <ActionButton action="play" isConnected={isConnected} onActionComplete={onActionComplete} />
      <ActionButton action="sleep" isConnected={isConnected} onActionComplete={onActionComplete} />
    </div>
  );
}

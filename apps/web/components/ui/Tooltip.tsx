'use client';

import React, { useState } from 'react';

interface TooltipProps {
  readonly children: React.ReactNode;
  readonly content: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-8px)',
            background: '#0a0a0f',
            color: '#e8e8f0',
            padding: '6px 12px',
            borderRadius: 4,
            fontSize: '0.75rem',
            fontFamily: "'JetBrains Mono', monospace",
            whiteSpace: 'nowrap',
            zIndex: 100,
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

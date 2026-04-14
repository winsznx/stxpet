'use client';

interface PetDisplayProps {
  isAlive: boolean;
  isDangerZone: boolean;
}

export function PetDisplay({ isAlive, isDangerZone }: PetDisplayProps) {
  const animationStyle = !isAlive
    ? { filter: 'grayscale(100%)' }
    : isDangerZone
      ? { animation: 'petShake 0.3s infinite' }
      : { animation: 'petBounce 1.5s ease-in-out infinite' };

  return (
    <div style={{ position: 'relative', width: 200, height: 200, margin: '0 auto' }}>
      <style>{`
        @keyframes petBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes petShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
      `}</style>
      <svg
        width="200"
        height="200"
        viewBox="0 0 32 32"
        style={{
          imageRendering: 'pixelated',
          ...animationStyle,
        }}
      >
        <rect width="32" height="32" fill="#0a0a0f" />

        {/* Body */}
        <rect x="10" y="8" width="12" height="14" fill="#00ff94" />
        <rect x="8" y="10" width="2" height="10" fill="#00ff94" />
        <rect x="22" y="10" width="2" height="10" fill="#00ff94" />
        <rect x="10" y="22" width="4" height="4" fill="#00ff94" />
        <rect x="18" y="22" width="4" height="4" fill="#00ff94" />

        {/* Ears */}
        <rect x="10" y="6" width="4" height="2" fill="#00ff94" />
        <rect x="18" y="6" width="4" height="2" fill="#00ff94" />

        {/* Eyes */}
        {isAlive ? (
          <>
            <rect x="13" y="12" width="2" height="2" fill="#0a0a0f" />
            <rect x="17" y="12" width="2" height="2" fill="#0a0a0f" />
          </>
        ) : (
          <>
            {/* X eyes for dead */}
            <rect x="12" y="11" width="1" height="1" fill="#ff3c6e" />
            <rect x="14" y="11" width="1" height="1" fill="#ff3c6e" />
            <rect x="13" y="12" width="1" height="1" fill="#ff3c6e" />
            <rect x="12" y="13" width="1" height="1" fill="#ff3c6e" />
            <rect x="14" y="13" width="1" height="1" fill="#ff3c6e" />
            <rect x="17" y="11" width="1" height="1" fill="#ff3c6e" />
            <rect x="19" y="11" width="1" height="1" fill="#ff3c6e" />
            <rect x="18" y="12" width="1" height="1" fill="#ff3c6e" />
            <rect x="17" y="13" width="1" height="1" fill="#ff3c6e" />
            <rect x="19" y="13" width="1" height="1" fill="#ff3c6e" />
          </>
        )}

        {/* Mouth */}
        {isAlive && (
          <>
            <rect x="14" y="16" width="4" height="1" fill="#0a0a0f" />
            <rect x="13" y="15" width="1" height="1" fill="#0a0a0f" />
            <rect x="18" y="15" width="1" height="1" fill="#0a0a0f" />
          </>
        )}

        {/* Sweat drop when distressed */}
        {isAlive && isDangerZone && (
          <>
            <rect x="24" y="9" width="2" height="3" fill="#3c6eff" />
            <rect x="24" y="12" width="1" height="1" fill="#3c6eff" />
            <rect x="25" y="12" width="1" height="1" fill="#3c6eff" />
          </>
        )}
      </svg>
    </div>
  );
}

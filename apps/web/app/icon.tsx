import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0f',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32">
          <rect width="32" height="32" fill="#0a0a0f" />
          {/* Eyes */}
          <rect x="10" y="10" width="4" height="4" fill="#00ff94" />
          <rect x="18" y="10" width="4" height="4" fill="#00ff94" />
          {/* Mouth */}
          <rect x="10" y="20" width="2" height="2" fill="#00ff94" />
          <rect x="12" y="22" width="8" height="2" fill="#00ff94" />
          <rect x="20" y="20" width="2" height="2" fill="#00ff94" />
        </svg>
      </div>
    ),
    { ...size }
  );
}

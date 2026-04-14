import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const round = searchParams.get('round');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0f',
          fontFamily: 'monospace',
        }}
      >
        {/* Pet icon */}
        <svg width="120" height="120" viewBox="0 0 32 32">
          <rect width="32" height="32" fill="#0a0a0f" />
          <rect x="10" y="8" width="12" height="14" fill="#00ff94" />
          <rect x="8" y="10" width="2" height="10" fill="#00ff94" />
          <rect x="22" y="10" width="2" height="10" fill="#00ff94" />
          <rect x="10" y="22" width="4" height="4" fill="#00ff94" />
          <rect x="18" y="22" width="4" height="4" fill="#00ff94" />
          <rect x="10" y="6" width="4" height="2" fill="#00ff94" />
          <rect x="18" y="6" width="4" height="2" fill="#00ff94" />
          <rect x="13" y="12" width="2" height="2" fill="#0a0a0f" />
          <rect x="17" y="12" width="2" height="2" fill="#0a0a0f" />
          <rect x="14" y="16" width="4" height="1" fill="#0a0a0f" />
          <rect x="13" y="15" width="1" height="1" fill="#0a0a0f" />
          <rect x="18" y="15" width="1" height="1" fill="#0a0a0f" />
        </svg>

        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#00ff94',
            marginTop: 24,
            letterSpacing: '0.05em',
          }}
        >
          STXPET
        </div>

        <div
          style={{
            fontSize: 24,
            color: '#5a5a7a',
            marginTop: 12,
          }}
        >
          The Community-Owned On-Chain Pet
        </div>

        {round && (
          <div
            style={{
              fontSize: 18,
              color: '#7b61ff',
              marginTop: 16,
            }}
          >
            Round #{round}
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

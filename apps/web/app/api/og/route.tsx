import { ImageResponse } from 'next/og';
export const runtime = 'edge';
export async function GET(request: Request) {
  return new ImageResponse(<div>StxPet Round info</div>, { width: 1200, height: 630 });
}
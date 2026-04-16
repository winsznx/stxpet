import { jsonOk } from '@/lib/utils/apiError';

export const runtime = 'edge';

export async function GET() {
  return jsonOk({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}

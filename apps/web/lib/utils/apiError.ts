import { HTTP_STATUS, type HttpStatus } from '@/lib/constants/http';

export interface JsonErrorBody {
  ok: false;
  error: string;
  code?: string;
}

export function jsonError(message: string, status: HttpStatus = HTTP_STATUS.INTERNAL_ERROR, code?: string): Response {
  const body: JsonErrorBody = { ok: false, error: message, code };
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

export function jsonOk<T>(data: T, status: HttpStatus = HTTP_STATUS.OK): Response {
  return new Response(JSON.stringify({ ok: true, data }), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

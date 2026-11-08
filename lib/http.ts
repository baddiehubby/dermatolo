import "server-only";
import { NextResponse } from "next/server";

/** Reads a JSON body but gives up once it exceeds `maxBytes`. Returns null if too large or invalid. */
export async function readJsonLimited(request: Request, maxBytes: number): Promise<unknown | null> {
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > maxBytes) return null;
  const reader = request.body?.getReader();
  if (!reader) return null;
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return null;
  }
}

/** JSON response that must never be cached. */
export function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

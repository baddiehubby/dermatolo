import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { json, readJsonLimited } from "@/lib/http";
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_SECONDS,
  adminSecret,
  clientIp,
  createSessionToken,
  hashVisitor,
  isSameOrigin,
  isValidSession,
  safeEqual,
} from "@/lib/reviews-auth";
import { deleteReview, hitRateLimit, listAllReviews, storeMode, updateReview } from "@/lib/reviews-store";

export const dynamic = "force-dynamic";

function sessionCookie(request: Request): string | undefined {
  const header = request.headers.get("cookie") ?? "";
  const match = header.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${ADMIN_COOKIE}=`));
  return match?.slice(ADMIN_COOKIE.length + 1);
}

function disabled() {
  return json({ ok: false, message: "Admin is disabled: ADMIN_SECRET is not set." }, 503);
}

function revalidateStorefront() {
  revalidatePath("/");
  revalidatePath("/shop");
}

export async function GET(request: Request) {
  if (!adminSecret()) return disabled();
  if (!isValidSession(sessionCookie(request))) return json({ ok: false, message: "Unauthorized" }, 401);
  if (storeMode() === "none") return json({ ok: false, message: "Review storage is not configured." }, 503);
  try {
    return json({ ok: true, reviews: await listAllReviews() });
  } catch (error) {
    console.error("[reviews] Admin list failed:", error);
    return json({ ok: false, message: "Storage error." }, 500);
  }
}

type Action = "login" | "logout" | "verify" | "unverify" | "approve" | "unpublish" | "delete";
const ACTIONS: Action[] = ["login", "logout", "verify", "unverify", "approve", "unpublish", "delete"];

export async function POST(request: Request) {
  const secret = adminSecret();
  if (!secret) return disabled();
  if (!isSameOrigin(request)) return json({ ok: false, message: "Forbidden" }, 403);

  const body = await readJsonLimited(request, 2048);
  const input = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const action = ACTIONS.find((candidate) => candidate === input.action);
  if (!action) return json({ ok: false, message: "Bad request" }, 400);

  if (action === "login") {
    try {
      if (storeMode() !== "none") {
        const allowed = await hitRateLimit(`login:${hashVisitor(clientIp(request.headers))}`, 900, 10);
        if (!allowed) return json({ ok: false, message: "Too many attempts. Try again later." }, 429);
      }
    } catch {
      /* rate-limit store unreachable: still fall through to the password check */
    }
    const attempt = typeof input.secret === "string" ? input.secret : "";
    if (!safeEqual(attempt, secret)) return json({ ok: false, message: "Wrong password." }, 401);
    const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
    response.cookies.set({
      name: ADMIN_COOKIE,
      value: createSessionToken(secret),
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: ADMIN_SESSION_SECONDS,
    });
    return response;
  }

  if (action === "logout") {
    const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
    response.cookies.set({ name: ADMIN_COOKIE, value: "", path: "/", maxAge: 0 });
    return response;
  }

  if (!isValidSession(sessionCookie(request))) return json({ ok: false, message: "Unauthorized" }, 401);
  if (storeMode() === "none") return json({ ok: false, message: "Review storage is not configured." }, 503);

  const id = typeof input.id === "string" ? input.id : "";
  if (!/^[A-Za-z0-9-]{8,64}$/.test(id)) return json({ ok: false, message: "Bad request" }, 400);

  try {
    let found: boolean;
    if (action === "delete") {
      found = await deleteReview(id);
    } else if (action === "approve") {
      found = (await updateReview(id, { status: "published" })) !== null;
    } else if (action === "unpublish") {
      found = (await updateReview(id, { status: "pending" })) !== null;
    } else {
      found = (await updateReview(id, { verifiedPurchase: action === "verify" })) !== null;
    }
    if (!found) return json({ ok: false, message: "Not found" }, 404);
    revalidateStorefront();
    return json({ ok: true });
  } catch (error) {
    console.error("[reviews] Admin action failed:", error);
    return json({ ok: false, message: "Storage error." }, 500);
  }
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatReviewDate } from "@/lib/reviews";
import type { StoredReview } from "@/lib/reviews-store";
import { StarRating } from "./StarRating";

async function post(body: Record<string, unknown>): Promise<{ ok: boolean; message?: string }> {
  try {
    const response = await fetch("/api/admin/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return (await response.json()) as { ok: boolean; message?: string };
  } catch {
    return { ok: false, message: "Network error." };
  }
}

const buttonClass =
  "min-h-10 rounded-full border border-gold/40 px-4 py-1.5 text-sm text-gold-light hover:bg-gold/10 disabled:opacity-50";

export function AdminLogin() {
  const router = useRouter();
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const result = await post({ action: "login", secret });
    setBusy(false);
    if (result.ok) {
      setSecret("");
      router.refresh();
    } else {
      setError(result.message ?? "Login failed.");
    }
  }

  return (
    <main className="mx-auto max-w-sm px-4 py-20" dir="ltr">
      <form onSubmit={submit} className="surface-card space-y-4 rounded-3xl p-6">
        <h1 className="text-xl font-semibold text-gold-light">Manage reviews</h1>
        <label className="block text-sm text-mist">
          Admin password
          <input
            type="password"
            value={secret}
            onChange={(event) => setSecret(event.target.value)}
            autoComplete="current-password"
            required
            className="mt-2 w-full rounded-xl border border-gold/30 bg-black/40 px-4 py-3 text-ivory"
          />
        </label>
        {error ? <p role="alert" className="text-sm text-red-300">{error}</p> : null}
        <button type="submit" disabled={busy} className={buttonClass}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}

function ReviewRow({ review, onAction, busy }: { review: StoredReview; onAction: (action: string, id: string) => void; busy: boolean }) {
  return (
    <li className="surface-card rounded-2xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-ivory">
            {review.name}
            {review.city ? <span className="ms-2 text-sm font-normal text-mist/70">· {review.city}</span> : null}
          </p>
          <div className="mt-1 flex items-center gap-3">
            <StarRating value={review.rating} className="h-4" />
            <span className="text-xs text-mist/70">{formatReviewDate(review.createdAt)}</span>
            {review.verifiedPurchase ? <span className="rounded-full border border-gold/40 px-2 py-0.5 text-xs text-gold-light">Verified</span> : null}
          </div>
        </div>
      </div>
      <p className="mt-3 whitespace-pre-wrap break-words leading-8 text-mist" dir="auto">{review.textUr}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className={buttonClass} disabled={busy} onClick={() => onAction(review.verifiedPurchase ? "unverify" : "verify", review.id)}>
          {review.verifiedPurchase ? "Unmark Verified Purchase" : "Mark Verified Purchase (only after checking the order)"}
        </button>
        <button
          type="button"
          className={`${buttonClass} border-red-400/40 text-red-300`}
          disabled={busy}
          onClick={() => {
            if (window.confirm("Delete this review permanently?")) onAction("delete", review.id);
          }}
        >
          Delete / حذف کریں
        </button>
      </div>
    </li>
  );
}

export function AdminPanel({ reviews }: { reviews: StoredReview[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function act(action: string, id: string) {
    setBusy(true);
    setError("");
    const result = await post({ action, id });
    setBusy(false);
    if (!result.ok) setError(result.message ?? "Action failed.");
    router.refresh();
  }

  async function logout() {
    await post({ action: "logout" });
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-12" dir="ltr">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gold-light">Manage reviews ({reviews.length})</h1>
        <button type="button" className={buttonClass} onClick={logout}>Sign out</button>
      </div>
      <p className="text-sm leading-6 text-mist/80">
        Reviews are published as soon as customers submit them. Delete anything abusive here. There is no order
        database, so the Verified Purchase badge is never automatic: mark it only after checking the order yourself.
      </p>
      {error ? <p role="alert" className="text-sm text-red-300">{error}</p> : null}
      {reviews.length === 0 ? (
        <p className="text-sm text-mist/70">No customer reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <ReviewRow key={review.id} review={review} onAction={act} busy={busy} />
          ))}
        </ul>
      )}
    </main>
  );
}

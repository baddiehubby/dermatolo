import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AdminLogin, AdminPanel } from "@/components/reviews/AdminPanel";
import { ADMIN_COOKIE, adminSecret, isValidSession } from "@/lib/reviews-auth";
import { listAllReviews, storeMode, type StoredReview } from "@/lib/reviews-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Manage reviews",
  robots: { index: false, follow: false, nocache: true },
};

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-xl px-4 py-20 text-center leading-8 text-mist" dir="ltr">
      <p className="rounded-2xl border border-gold/25 bg-black/30 p-6">{children}</p>
    </main>
  );
}

export default async function AdminReviewsPage() {
  if (!adminSecret()) {
    return <Notice>The reviews admin is disabled. Set the ADMIN_SECRET environment variable and redeploy.</Notice>;
  }
  const jar = await cookies();
  if (!isValidSession(jar.get(ADMIN_COOKIE)?.value)) return <AdminLogin />;

  if (storeMode() === "none") {
    return <Notice>Review storage is not configured. Add the Upstash Redis variables (see .env.example).</Notice>;
  }
  let reviews: StoredReview[] = [];
  try {
    reviews = await listAllReviews();
  } catch {
    return <Notice>Could not reach review storage. Try again in a moment.</Notice>;
  }
  return <AdminPanel reviews={reviews} />;
}

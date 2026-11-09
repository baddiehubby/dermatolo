import type { NextConfig } from "next";

/**
 * Domain note (kaptaan804.com):
 * Prefer Vercel → Domains to attach both www and apex, with a primary redirect
 * (e.g. kaptaan804.com → https://www.kaptaan804.com). Set
 * NEXT_PUBLIC_SITE_URL=https://www.kaptaan804.com so canonicals/sitemap match.
 * Host-based redirects here are optional and only apply when that env is set to a www origin.
 */

type HostRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
  has: { type: "host"; value: string }[];
};

function wwwApexRedirects(): HostRedirect[] {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return [];
  try {
    const { hostname, origin } = new URL(raw);
    if (!hostname.startsWith("www.")) return [];
    const apex = hostname.slice(4);
    if (!apex) return [];
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: apex }],
        destination: `${origin}/:path*`,
        permanent: true,
      },
    ];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return wwwApexRedirects();
  },
};

export default nextConfig;

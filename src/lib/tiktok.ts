export function extractTikTokId(url: string) {
  const match = url.match(/\/video\/(\d+)/);
  return match?.[1] ?? "";
}

export function isTikTokProfileUrl(url: string) {
  return /tiktok\.com\/@[\w.]+\/?(\?|$)/i.test(url) && !/\/video\//.test(url);
}

/**
 * Only allow same-origin relative paths for post-login redirects. Resolve
 * against a sentinel origin so protocol-relative ("//evil.com") and
 * backslash-normalised ("/\evil.com") values that browsers treat as external
 * are rejected.
 */
export function safeNext(next: string, fallback: string): string {
  if (next && !next.includes("\\")) {
    try {
      const url = new URL(next, "https://placeholder.invalid");
      if (url.origin === "https://placeholder.invalid") {
        return url.pathname + url.search;
      }
    } catch {
      // fall through to the fallback
    }
  }
  return fallback;
}

import { randomBytes } from "node:crypto";

const IMAGE_EXTENSIONS = new Set([
  "png",
  "jpg",
  "jpeg",
  "webp",
  "gif",
  "svg",
  "avif",
]);

function extensionOf(pathname: string): string | null {
  const base = pathname.split("/").pop() ?? pathname;
  const dot = base.lastIndexOf(".");
  if (dot <= 0) return null;
  return base.slice(dot + 1).toLowerCase();
}

/** "media/hero-banner.png" → "hero-banner" — default display name for synced blobs. */
export function displayNameFromPathname(pathname: string): string {
  const base = pathname.split("/").pop() ?? pathname;
  const dot = base.lastIndexOf(".");
  return dot <= 0 ? base : base.slice(0, dot);
}

export function isImagePathname(pathname: string): boolean {
  const ext = extensionOf(pathname);
  return ext !== null && IMAGE_EXTENSIONS.has(ext);
}

/**
 * Build a unique store pathname for an upload: media/<slug>-<rand>.<ext>.
 * The pathname is permanent — the display name lives in the media table.
 */
export function uniqueMediaPathname(filename: string): string {
  const ext = extensionOf(filename) ?? "bin";
  const slug =
    displayNameFromPathname(filename)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "image";
  return `media/${slug}-${randomBytes(3).toString("hex")}.${ext}`;
}

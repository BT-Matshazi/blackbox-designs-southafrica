import { desc, eq, inArray, notInArray } from "drizzle-orm";
import { list } from "@vercel/blob";
import { db } from "@/lib/drizzle/db";
import { media } from "@/lib/drizzle/schema";
import {
  displayNameFromPathname,
  isImagePathname,
} from "@/src/utils/media";

export type MediaItem = typeof media.$inferSelect;

/**
 * Reconcile the media table with the blob store, then return the library
 * newest-first. Blobs that aren't in the table yet get a row (so images
 * uploaded outside this app still show up); rows whose blob disappeared
 * are removed.
 */
export async function syncAndListMedia(): Promise<MediaItem[]> {
  // Walk every page — deleting rows based on a partial listing would drop
  // records for blobs that simply fell outside the first page.
  const blobs = [];
  let cursor: string | undefined;
  do {
    const page = await list({ limit: 1000, cursor });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  const imageBlobs = blobs.filter((b) => isImagePathname(b.pathname));

  const existing = await db.select({ pathname: media.pathname }).from(media);
  const known = new Set(existing.map((row) => row.pathname));

  const missing = imageBlobs.filter((b) => !known.has(b.pathname));
  if (missing.length > 0) {
    await db
      .insert(media)
      .values(
        missing.map((b) => ({
          pathname: b.pathname,
          url: b.url,
          name: displayNameFromPathname(b.pathname),
          size: b.size,
          createdAt: b.uploadedAt,
        })),
      )
      .onConflictDoNothing({ target: media.pathname });
  }

  const livePathnames = imageBlobs.map((b) => b.pathname);
  if (livePathnames.length === 0) {
    await db.delete(media);
  } else {
    await db.delete(media).where(notInArray(media.pathname, livePathnames));
  }

  return db.select().from(media).orderBy(desc(media.createdAt));
}

export async function insertMedia(values: {
  pathname: string;
  url: string;
  name: string;
  alt?: string;
  size: number;
  contentType?: string;
}): Promise<MediaItem> {
  const [row] = await db
    .insert(media)
    .values({
      pathname: values.pathname,
      url: values.url,
      name: values.name,
      alt: values.alt ?? null,
      size: values.size,
      contentType: values.contentType ?? null,
    })
    .returning();
  return row;
}

export async function updateMediaMeta(
  id: string,
  values: { name: string; alt: string | null },
): Promise<boolean> {
  const updated = await db
    .update(media)
    .set({ name: values.name, alt: values.alt, updatedAt: new Date() })
    .where(eq(media.id, id))
    .returning({ id: media.id });
  return updated.length > 0;
}

export async function findMediaById(id: string): Promise<MediaItem | null> {
  const [row] = await db.select().from(media).where(eq(media.id, id)).limit(1);
  return row ?? null;
}

export async function deleteMediaRows(ids: string[]): Promise<void> {
  if (ids.length === 0) return;
  await db.delete(media).where(inArray(media.id, ids));
}

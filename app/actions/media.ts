"use server";

import { revalidatePath } from "next/cache";
import { del, put } from "@vercel/blob";
import { requireAdmin } from "@/src/utils/auth/require-admin";
import { isImagePathname, uniqueMediaPathname } from "@/src/utils/media";
import {
  deleteMediaRows,
  findMediaById,
  insertMedia,
  updateMediaMeta,
} from "@/src/infrastructure/media.infrastructure";
import type { ActionState } from "./auth";

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB

export async function uploadMedia(
  _prev: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Not authorized" };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose an image to upload." };
  }
  if (!file.type.startsWith("image/") || !isImagePathname(file.name)) {
    return { ok: false, error: "Only image files can be uploaded." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, error: "Images must be 10 MB or smaller." };
  }

  const alt = String(formData.get("alt") ?? "").trim();
  const pathname = uniqueMediaPathname(file.name);

  try {
    const blob = await put(pathname, file, {
      access: "public",
      contentType: file.type,
    });
    await insertMedia({
      pathname: blob.pathname,
      url: blob.url,
      name: file.name.replace(/\.[^.]+$/, ""),
      alt: alt || undefined,
      size: file.size,
      contentType: file.type,
    });
  } catch (error) {
    console.error("[uploadMedia] Upload failed:", error);
    return { ok: false, error: "Upload failed. Try again." };
  }

  revalidatePath("/admin/media");
  return { ok: true };
}

export async function updateMedia(
  _prev: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Not authorized" };
  }

  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const alt = String(formData.get("alt") ?? "").trim();

  if (!id) return { ok: false, error: "Missing media id." };
  if (!name) return { ok: false, error: "Name is required." };
  if (name.length > 200) {
    return { ok: false, error: "Name is too long (max 200 characters)." };
  }
  if (alt.length > 500) {
    return { ok: false, error: "Alt text is too long (max 500 characters)." };
  }

  const updated = await updateMediaMeta(id, { name, alt: alt || null });
  if (!updated) return { ok: false, error: "Image not found." };

  revalidatePath("/admin/media");
  return { ok: true };
}

export async function deleteMedia(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Not authorized" };
  }

  const item = await findMediaById(id);
  if (!item) return { success: false, error: "Image not found." };

  try {
    // Remove the file first — if this fails the row survives and the
    // library still shows the image, so nothing is orphaned.
    await del(item.url);
    await deleteMediaRows([item.id]);
  } catch (error) {
    console.error("[deleteMedia] Delete failed:", error);
    return { success: false, error: "Delete failed. Try again." };
  }

  revalidatePath("/admin/media");
  return { success: true };
}

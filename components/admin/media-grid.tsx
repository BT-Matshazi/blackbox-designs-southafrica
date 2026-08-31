"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { Check, Copy, ImageOff, Trash2 } from "lucide-react";
import { deleteMedia, updateMedia } from "@/app/actions/media";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type MediaGridItem = {
  id: string;
  url: string;
  name: string;
  alt: string | null;
  size: number;
  pathname: string;
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function MediaGrid({ items }: { items: MediaGridItem[] }) {
  const [selected, setSelected] = useState<MediaGridItem | null>(null);

  if (items.length === 0) {
    return (
      <div className="grid place-items-center gap-3 rounded-xl border border-dashed border-border bg-card p-16 text-center">
        <ImageOff className="size-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          No images yet. Upload your first one to start the library.
        </p>
      </div>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setSelected(item)}
              className="group w-full overflow-hidden rounded-xl border border-border bg-card text-left transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--accent)]"
            >
              <span className="block aspect-square overflow-hidden bg-muted">
                <img
                  src={item.url}
                  alt={item.alt ?? item.name}
                  loading="lazy"
                  className="size-full object-cover transition-transform group-hover:scale-105"
                />
              </span>
              <span className="block px-3 py-2">
                <span className="block truncate text-sm font-medium">
                  {item.name}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {formatBytes(item.size)}
                  {!item.alt && (
                    <span className="text-warning"> · no alt text</span>
                  )}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <MediaEditSheet item={selected} onClose={() => setSelected(null)} />
    </>
  );
}

function MediaEditSheet({
  item,
  onClose,
}: {
  item: MediaGridItem | null;
  onClose: () => void;
}) {
  const [state, action, pending] = useActionState(updateMedia, null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, startDelete] = useTransition();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (state?.ok === true) {
      toast.success("Image updated");
      onClose();
    }
    if (state?.ok === false) toast.error(state.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- react to action results only
  }, [state]);

  useEffect(() => {
    setConfirmingDelete(false);
    setCopied(false);
  }, [item?.id]);

  return (
    <Sheet open={item !== null} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
        {item && (
          <>
            <SheetHeader className="px-0 text-left">
              <SheetTitle className="truncate">{item.name}</SheetTitle>
              <SheetDescription>
                {formatBytes(item.size)} · {item.pathname}
              </SheetDescription>
            </SheetHeader>

            <div className="mt-4 overflow-hidden rounded-xl border border-border bg-muted">
              <img
                src={item.url}
                alt={item.alt ?? item.name}
                className="max-h-64 w-full object-contain"
              />
            </div>

            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(item.url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="mt-3 inline-flex items-center gap-2 text-sm text-accent hover:underline"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied" : "Copy URL"}
            </button>

            <form action={action} className="mt-6 grid gap-4" key={item.id}>
              <input type="hidden" name="id" value={item.id} />
              <label className="grid gap-2">
                <span className="text-sm font-medium leading-none">Name</span>
                <Input name="name" defaultValue={item.name} required />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium leading-none">
                  Alt text
                </span>
                <Textarea
                  name="alt"
                  defaultValue={item.alt ?? ""}
                  rows={3}
                  placeholder="Describe the image for screen readers and SEO"
                />
              </label>
              <button
                type="submit"
                disabled={pending}
                className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending ? "Saving…" : "Save changes"}
              </button>
            </form>

            <div className="mt-8 border-t border-border pt-4">
              {confirmingDelete ? (
                <div className="grid gap-2">
                  <p className="text-sm text-muted-foreground">
                    This permanently deletes the file from storage. Anything
                    using its URL will break.
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={deleting}
                      onClick={() =>
                        startDelete(async () => {
                          const result = await deleteMedia(item.id);
                          if (result.success) {
                            toast.success("Image deleted");
                            onClose();
                          } else {
                            toast.error(result.error ?? "Delete failed");
                          }
                        })
                      }
                      className="inline-flex h-9 items-center justify-center rounded-full bg-destructive px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                    >
                      {deleting ? "Deleting…" : "Yes, delete it"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmingDelete(false)}
                      className="inline-flex h-9 items-center justify-center rounded-full border border-border px-4 text-sm hover:bg-muted"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmingDelete(true)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-destructive hover:underline"
                >
                  <Trash2 className="size-4" />
                  Delete image
                </button>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

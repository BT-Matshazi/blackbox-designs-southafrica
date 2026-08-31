"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import {
  Check,
  Copy,
  ImageOff,
  LoaderCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import { deleteMedia, updateMedia } from "@/app/actions/media";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      <Card className="rounded-lg border-dashed py-0 shadow-none">
        <CardContent className="flex min-h-80 flex-col items-center justify-center gap-3 p-10 text-center">
          <span className="flex size-12 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <ImageOff className="size-5" />
          </span>
          <div>
            <h2 className="font-display text-xl font-semibold">
              No images yet
            </h2>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Upload your first image to start building the media library.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="rounded-lg border border-border bg-card shadow-sm">
        <div className="border-b border-border px-4 py-4">
          <h2 className="font-display text-lg font-semibold">Library</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Select an image to copy its URL, edit metadata, or remove it.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-3 p-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setSelected(item)}
                className="group w-full overflow-hidden rounded-lg border border-border bg-background text-left transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <span className="relative block aspect-square overflow-hidden bg-muted">
                  <img
                    src={item.url}
                    alt={item.alt ?? item.name}
                    loading="lazy"
                    className="size-full object-cover transition-transform group-hover:scale-105"
                  />
                  {!item.alt && (
                    <span className="absolute right-2 top-2">
                      <Badge
                        variant="outline"
                        className="border-warning/30 bg-background/90 text-warning"
                      >
                        No alt
                      </Badge>
                    </span>
                  )}
                </span>
                <span className="block px-3 py-3">
                  <span className="block truncate text-sm font-semibold">
                    {item.name}
                  </span>
                  <span className="mt-1 block truncate text-xs text-muted-foreground">
                    {formatBytes(item.size)}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

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
  const busy = pending || deleting;

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
    <Sheet
      open={item !== null}
      onOpenChange={(open) => {
        if (!open && !busy) onClose();
      }}
    >
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
        {item && (
          <>
            <SheetHeader className="px-0 text-left">
              <SheetTitle className="truncate">{item.name}</SheetTitle>
              <SheetDescription>
                {formatBytes(item.size)} · {item.pathname}
              </SheetDescription>
            </SheetHeader>

            <div className="relative mt-4 overflow-hidden rounded-lg border border-border bg-muted">
              <img
                src={item.url}
                alt={item.alt ?? item.name}
                className="max-h-64 w-full object-contain"
              />
              {busy && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/75">
                  <span className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium shadow-sm">
                    <LoaderCircle className="size-4 animate-spin text-accent" />
                    {deleting ? "Deleting image" : "Saving changes"}
                  </span>
                </div>
              )}
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={busy}
              onClick={async () => {
                await navigator.clipboard.writeText(item.url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="mt-3"
            >
              {copied ? (
                <Check data-icon="inline-start" />
              ) : (
                <Copy data-icon="inline-start" />
              )}
              {copied ? "Copied" : "Copy URL"}
            </Button>

            <form
              action={action}
              aria-busy={pending}
              className="mt-6 flex flex-col gap-4"
              key={item.id}
            >
              <input type="hidden" name="id" value={item.id} />
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium leading-none">Name</span>
                <Input
                  name="name"
                  defaultValue={item.name}
                  required
                  disabled={busy}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium leading-none">
                  Alt text
                </span>
                <Textarea
                  name="alt"
                  defaultValue={item.alt ?? ""}
                  rows={3}
                  placeholder="Describe the image for screen readers and SEO"
                  disabled={busy}
                />
              </label>
              <Button type="submit" disabled={busy} className="w-fit">
                {pending ? (
                  <LoaderCircle
                    data-icon="inline-start"
                    className="animate-spin"
                  />
                ) : (
                  <Pencil data-icon="inline-start" />
                )}
                {pending ? "Saving..." : "Save changes"}
              </Button>
            </form>

            <div className="mt-8 border-t border-border pt-4">
              {confirmingDelete ? (
                <div className="flex flex-col gap-3 rounded-lg border border-destructive/25 bg-destructive/5 p-3">
                  <p className="text-sm text-muted-foreground">
                    This permanently deletes the file from storage. Anything
                    using its URL will break.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
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
                    >
                      {deleting ? (
                        <LoaderCircle
                          data-icon="inline-start"
                          className="animate-spin"
                        />
                      ) : (
                        <Trash2 data-icon="inline-start" />
                      )}
                      {deleting ? "Deleting..." : "Delete"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={deleting}
                      onClick={() => setConfirmingDelete(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={busy}
                  onClick={() => setConfirmingDelete(true)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 data-icon="inline-start" />
                  Delete image
                </Button>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

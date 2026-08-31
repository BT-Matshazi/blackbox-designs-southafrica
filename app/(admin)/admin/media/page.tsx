import { syncAndListMedia } from "@/src/infrastructure/media.infrastructure";
import { MediaGrid } from "@/components/admin/media-grid";
import { UploadMediaForm } from "@/components/admin/upload-media-form";

export default async function AdminMediaPage() {
  const items = await syncAndListMedia();

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold">Media</h1>
          <p className="text-sm text-muted-foreground">
            {items.length} {items.length === 1 ? "image" : "images"} in the
            library.
          </p>
        </div>
        <UploadMediaForm />
      </div>

      <MediaGrid
        items={items.map((item) => ({
          id: item.id,
          url: item.url,
          name: item.name,
          alt: item.alt,
          size: item.size,
          pathname: item.pathname,
        }))}
      />
    </div>
  );
}

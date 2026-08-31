import type { ComponentType } from "react";
import {
  HardDrive,
  Image as ImageIcon,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { syncAndListMedia } from "@/src/infrastructure/media.infrastructure";
import { MediaGrid } from "@/components/admin/media-grid";
import { UploadMediaForm } from "@/components/admin/upload-media-form";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-ZA", {
    month: "short",
    day: "numeric",
    timeZone: "Africa/Johannesburg",
  }).format(value);
}

export default async function AdminMediaPage() {
  const items = await syncAndListMedia();
  const totalBytes = items.reduce((sum, item) => sum + item.size, 0);
  const withoutAlt = items.filter((item) => !item.alt).length;
  const latestItem = items[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <Badge variant="outline" className="mb-3 bg-background">
            Asset library
          </Badge>
          <h1 className="font-display text-3xl font-semibold text-foreground">
            Media
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Upload, review, and maintain the images used across the site.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Images"
          value={items.length}
          detail="Synced from blob storage"
          icon={ImageIcon}
        />
        <MetricCard
          label="Storage"
          value={formatBytes(totalBytes)}
          detail="Across the media library"
          icon={HardDrive}
        />
        <MetricCard
          label="Needs alt text"
          value={withoutAlt}
          detail="Improve accessibility and SEO"
          icon={TriangleAlert}
        />
        <MetricCard
          label="Latest upload"
          value={latestItem ? formatDate(latestItem.createdAt) : "-"}
          detail={latestItem?.name ?? "No uploads yet"}
          icon={Sparkles}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
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

        <Card className="h-fit rounded-lg py-0 shadow-sm">
          <CardHeader className="p-5 pb-0">
            <CardTitle className="font-display text-xl">
              Upload image
            </CardTitle>
            <CardDescription>
              Add JPG, PNG, GIF, SVG, or WebP assets up to 10 MB.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            <UploadMediaForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  detail: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="rounded-lg py-0 shadow-sm">
      <CardHeader className="flex-row items-start justify-between gap-3 p-4 pb-0">
        <div className="min-w-0">
          <CardDescription>{label}</CardDescription>
          <CardTitle className="mt-2 truncate font-display text-3xl">
            {value}
          </CardTitle>
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
          <Icon className="size-4" />
        </span>
      </CardHeader>
      <CardContent className="truncate p-4 pt-3 text-xs text-muted-foreground">
        {detail}
      </CardContent>
    </Card>
  );
}

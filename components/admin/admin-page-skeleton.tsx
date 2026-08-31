import { Skeleton } from "@/components/ui/skeleton";

export function AdminPageSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-label="Loading admin page">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-2xl flex-col gap-3">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-full max-w-xl" />
          <Skeleton className="h-4 w-3/4 max-w-md" />
        </div>
        <Skeleton className="h-12 w-full sm:max-w-md" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-lg border border-border bg-card p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-14" />
              </div>
              <Skeleton className="size-9" />
            </div>
            <Skeleton className="mt-4 h-3 w-28" />
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-card shadow-sm">
        <div className="border-b border-border p-4">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="mt-3 h-4 w-64" />
        </div>
        <div className="grid gap-3 p-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton key={index} className="h-14 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

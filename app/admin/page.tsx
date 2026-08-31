import Link from "next/link";
import { LeadInfrastructure } from "@/src/infrastructure/lead.infrastructure";
import {
  LEAD_STATUSES,
  isLeadStatus,
} from "@/src/application/domain/lead.domain";
import { LeadsTable } from "@/components/admin/leads-table";
import { cn } from "@/lib/utils";

type AdminSearchParams = Promise<{ status?: string; q?: string }>;

function filterHref(status: string | undefined, q: string | undefined) {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (q) params.set("q", q);
  const qs = params.toString();
  return qs ? `/admin?${qs}` : "/admin";
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: AdminSearchParams;
}) {
  const { status: rawStatus, q } = await searchParams;
  const status = rawStatus && isLeadStatus(rawStatus) ? rawStatus : undefined;

  const repo = new LeadInfrastructure();
  const leads = await repo.findAll({ status, search: q || undefined });

  const tabs: { label: string; value: string | undefined }[] = [
    { label: "All", value: undefined },
    ...LEAD_STATUSES.map((s) => ({ label: s, value: s as string })),
  ];

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold">Leads</h1>
          <p className="text-sm text-muted-foreground">
            {leads.length} {leads.length === 1 ? "lead" : "leads"}
            {status ? ` · ${status}` : ""}
            {q ? ` · matching “${q}”` : ""}
          </p>
        </div>

        <form action="/admin" method="get" className="flex items-center gap-2">
          {status && <input type="hidden" name="status" value={status} />}
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search name, email, company…"
            className="h-9 w-64 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
          <button
            type="submit"
            className="h-9 rounded-lg border border-border px-3 text-sm hover:bg-muted"
          >
            Search
          </button>
        </form>
      </div>

      <nav className="flex gap-1 border-b border-border">
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            href={filterHref(tab.value, q)}
            className={cn(
              "border-b-2 px-3 py-2 text-sm capitalize transition-colors",
              status === tab.value ||
                (tab.value === undefined && status === undefined)
                ? "border-accent font-medium text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      <LeadsTable leads={leads} />
    </div>
  );
}

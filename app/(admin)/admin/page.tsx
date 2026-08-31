import Link from "next/link";
import type { ComponentType } from "react";
import { CheckCircle2, Clock3, Inbox, Search, Users } from "lucide-react";
import { LeadInfrastructure } from "@/src/infrastructure/lead.infrastructure";
import {
  LEAD_STATUSES,
  type LeadStatus,
  isLeadStatus,
} from "@/src/application/domain/lead.domain";
import { LeadsTable } from "@/components/admin/leads-table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const allLeads = status || q ? await repo.findAll() : leads;
  const statusCounts = Object.fromEntries(
    LEAD_STATUSES.map((leadStatus) => [leadStatus, 0]),
  ) as Record<LeadStatus, number>;
  for (const lead of allLeads) {
    statusCounts[lead.status] += 1;
  }
  const activeLeads = statusCounts.new + statusCounts.contacted;
  const newestLead = allLeads[0];

  const tabs: { label: string; value: LeadStatus | undefined }[] = [
    { label: "All", value: undefined },
    ...LEAD_STATUSES.map((s) => ({ label: s, value: s })),
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <Badge variant="outline" className="mb-3 bg-background">
            Lead pipeline
          </Badge>
          <h1 className="font-display text-3xl font-semibold text-foreground">
            Leads
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Review incoming project requests, update follow-up status, and keep
            the pipeline moving from one place.
          </p>
        </div>

        <form
          action="/admin"
          method="get"
          className="flex w-full items-center gap-2 rounded-lg border border-border bg-background p-1 shadow-sm sm:max-w-md"
        >
          {status && <input type="hidden" name="status" value={status} />}
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              defaultValue={q ?? ""}
              placeholder="Search leads"
              className="border-0 bg-transparent pl-9 shadow-none focus-visible:ring-0"
            />
          </div>
          <Button type="submit" variant="accent" size="sm">
            Search
          </Button>
        </form>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total leads"
          value={allLeads.length}
          detail={`${leads.length} shown`}
          icon={Inbox}
        />
        <MetricCard
          label="Active"
          value={activeLeads}
          detail="New or contacted"
          icon={Users}
        />
        <MetricCard
          label="Awaiting contact"
          value={statusCounts.new}
          detail="Needs first response"
          icon={Clock3}
        />
        <MetricCard
          label="Closed"
          value={statusCounts.closed}
          detail={
            newestLead
              ? `Latest ${formatDate(newestLead.createdAt)}`
              : "No activity"
          }
          icon={CheckCircle2}
        />
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-border bg-background p-3 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium">
            {leads.length} {leads.length === 1 ? "lead" : "leads"}
            {status ? ` / ${status}` : ""}
            {q ? ` / matching "${q}"` : ""}
          </p>
          {(status || q) && (
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin">Clear filters</Link>
            </Button>
          )}
        </div>
        <nav className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              href={filterHref(tab.value, q)}
              className={cn(
                "inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm font-medium capitalize transition-colors",
                status === tab.value ||
                  (tab.value === undefined && status === undefined)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <span>{tab.label}</span>
              <span
                className={cn(
                  "rounded-sm px-1.5 py-0.5 text-xs",
                  status === tab.value ||
                    (tab.value === undefined && status === undefined)
                    ? "bg-primary-foreground/15 text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {tab.value ? statusCounts[tab.value] : allLeads.length}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      <LeadsTable leads={leads} />
    </div>
  );
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-ZA", {
    month: "short",
    day: "numeric",
    timeZone: "Africa/Johannesburg",
  }).format(value);
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: number;
  detail: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="rounded-lg py-0 shadow-sm">
      <CardHeader className="flex-row items-start justify-between gap-3 p-4 pb-0">
        <div>
          <CardDescription>{label}</CardDescription>
          <CardTitle className="mt-2 font-display text-3xl">
            {value}
          </CardTitle>
        </div>
        <span className="flex size-9 items-center justify-center rounded-md bg-accent/10 text-accent">
          <Icon className="size-4" />
        </span>
      </CardHeader>
      <CardContent className="p-4 pt-3 text-xs text-muted-foreground">
        {detail}
      </CardContent>
    </Card>
  );
}

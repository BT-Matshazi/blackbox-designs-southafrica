"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { ChevronDown, Inbox, Mail, Phone } from "lucide-react";
import { updateLeadStatus } from "@/app/actions/leads";
import {
  LEAD_STATUSES,
  type Lead,
  type LeadStatus,
} from "@/src/application/domain/lead.domain";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: "border-accent/30 bg-accent/10 text-accent",
  contacted: "border-warning/30 bg-warning/10 text-warning",
  closed: "border-border bg-muted text-muted-foreground",
};

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (leads.length === 0) {
    return (
      <Card className="rounded-lg border-dashed py-0 shadow-none">
        <CardContent className="flex min-h-64 flex-col items-center justify-center gap-3 p-10 text-center">
          <span className="flex size-12 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Inbox className="size-5" />
          </span>
          <div>
            <h2 className="font-display text-xl font-semibold">
              No leads found
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              New contact-form submissions and matching search results will
              appear here.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-muted/50">
            <tr className="border-b border-border text-xs font-medium text-muted-foreground">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="hidden px-4 py-3 md:table-cell">
                Project
              </th>
              <th className="hidden px-4 py-3 lg:table-cell">
                Budget
              </th>
              <th className="px-4 py-3">Status</th>
              <th className="hidden px-4 py-3 sm:table-cell">
                Received
              </th>
              <th className="w-10 px-2 py-3" />
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <LeadRow
                key={lead.id}
                lead={lead}
                open={openId === lead.id}
                onToggle={() => setOpenId(openId === lead.id ? null : lead.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LeadRow({
  lead,
  open,
  onToggle,
}: {
  lead: Lead;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      <tr
        className="border-b border-border transition-colors last:border-b-0 hover:bg-muted/45 data-[expanded=true]:bg-muted/45"
        data-expanded={open}
      >
        <td className="px-4 py-4">
          <div className="font-medium text-foreground">
            {lead.firstName} {lead.lastName}
          </div>
          <div className="mt-1 text-xs capitalize text-muted-foreground sm:hidden">
            {lead.source}
          </div>
        </td>
        <td className="px-4 py-4 text-muted-foreground">
          <span className="block max-w-[220px] truncate">{lead.email}</span>
        </td>
        <td className="hidden px-4 py-4 text-muted-foreground md:table-cell">
          <span className="block max-w-[180px] truncate">
            {lead.projectType ?? "-"}
          </span>
        </td>
        <td className="hidden px-4 py-4 text-muted-foreground lg:table-cell">
          {lead.budgetRange ?? "-"}
        </td>
        <td className="px-4 py-4">
          <StatusSelect lead={lead} />
        </td>
        <td className="hidden px-4 py-4 text-muted-foreground sm:table-cell">
          {formatDate(lead.createdAt)}
        </td>
        <td className="px-2 py-4">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-label={`Toggle details for ${lead.firstName} ${lead.lastName}`}
            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            <ChevronDown
              className={cn(
                "size-4 transition-transform",
                open && "rotate-180",
              )}
            />
          </button>
        </td>
      </tr>
      {open && (
        <tr className="border-b border-border bg-muted/30 last:border-b-0">
          <td colSpan={7} className="px-4 py-5">
            <div className="grid gap-5 rounded-lg border border-border bg-background p-4 text-sm shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="capitalize">
                  {lead.source}
                </Badge>
                {lead.company && (
                  <Badge variant="outline" className="bg-background">
                    {lead.company}
                  </Badge>
                )}
              </div>
              <p className="max-w-4xl whitespace-pre-wrap leading-7 text-foreground">
                {lead.message}
              </p>
              <dl className="grid gap-3 text-muted-foreground sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-md border border-border bg-card p-3">
                  <dt className="flex items-center gap-2 text-xs font-medium text-foreground">
                    <Phone className="size-3.5 text-accent" />
                    Phone
                  </dt>
                  <dd className="mt-1">{lead.phone ?? "-"}</dd>
                </div>
                <div className="rounded-md border border-border bg-card p-3">
                  <dt className="text-xs font-medium text-foreground">
                    Company
                  </dt>
                  <dd className="mt-1">{lead.company ?? "-"}</dd>
                </div>
                <div className="rounded-md border border-border bg-card p-3">
                  <dt className="flex items-center gap-2 text-xs font-medium text-foreground">
                    <Mail className="size-3.5 text-accent" />
                    Email
                  </dt>
                  <dd className="mt-1 truncate">{lead.email}</dd>
                </div>
                <div className="rounded-md border border-border bg-card p-3">
                  <dt className="text-xs font-medium text-foreground">
                    Attachment
                  </dt>
                  <dd className="mt-1">
                    {lead.attachmentName
                      ? `${lead.attachmentName}${
                          lead.attachmentSize
                            ? ` (${formatBytes(lead.attachmentSize)})`
                            : ""
                        } - metadata only`
                      : "-"}
                  </dd>
                </div>
              </dl>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function StatusSelect({ lead }: { lead: Lead }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={lead.status}
      disabled={pending}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => {
        const status = e.target.value;
        startTransition(async () => {
          const result = await updateLeadStatus(lead.id, status);
          if (result.success) {
            toast.success("Status updated");
          } else {
            toast.error(result.error ?? "Failed to update status");
          }
        });
      }}
      className={cn(
        "h-7 cursor-pointer rounded-full border px-2 text-xs font-medium capitalize outline-none",
        STATUS_STYLES[lead.status],
        pending && "opacity-60",
      )}
    >
      {LEAD_STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}

"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";
import { updateLeadStatus } from "@/app/actions/leads";
import {
  LEAD_STATUSES,
  type Lead,
  type LeadStatus,
} from "@/src/application/domain/lead.domain";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: "border-accent/30 bg-accent/10 text-accent",
  contacted: "border-amber-500/30 bg-amber-500/10 text-amber-600",
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
      <p className="rounded-xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
        No leads yet. New contact-form submissions will appear here.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="hidden px-4 py-3 font-medium md:table-cell">
              Project
            </th>
            <th className="hidden px-4 py-3 font-medium lg:table-cell">
              Budget
            </th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="hidden px-4 py-3 font-medium sm:table-cell">
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
              onToggle={() =>
                setOpenId(openId === lead.id ? null : lead.id)
              }
            />
          ))}
        </tbody>
      </table>
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
        onClick={onToggle}
        className="cursor-pointer border-b border-border last:border-b-0 hover:bg-muted/50"
      >
        <td className="px-4 py-3 font-medium">
          {lead.firstName} {lead.lastName}
        </td>
        <td className="px-4 py-3 text-muted-foreground">{lead.email}</td>
        <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
          {lead.projectType ?? "—"}
        </td>
        <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">
          {lead.budgetRange ?? "—"}
        </td>
        <td className="px-4 py-3">
          <StatusSelect lead={lead} />
        </td>
        <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
          {formatDate(lead.createdAt)}
        </td>
        <td className="px-2 py-3">
          <ChevronDown
            className={cn(
              "size-4 text-muted-foreground transition-transform",
              open && "rotate-180",
            )}
          />
        </td>
      </tr>
      {open && (
        <tr className="border-b border-border bg-muted/30 last:border-b-0">
          <td colSpan={7} className="px-4 py-4">
            <div className="grid gap-3 text-sm">
              <p className="whitespace-pre-wrap leading-relaxed">
                {lead.message}
              </p>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-muted-foreground sm:grid-cols-4">
                <div>
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.14em]">
                    Phone
                  </dt>
                  <dd>{lead.phone ?? "—"}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.14em]">
                    Company
                  </dt>
                  <dd>{lead.company ?? "—"}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.14em]">
                    Source
                  </dt>
                  <dd className="capitalize">{lead.source}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.14em]">
                    Attachment
                  </dt>
                  <dd>
                    {lead.attachmentName
                      ? `${lead.attachmentName}${
                          lead.attachmentSize
                            ? ` (${formatBytes(lead.attachmentSize)})`
                            : ""
                        } — metadata only, file not stored`
                      : "—"}
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

export const LEAD_STATUSES = ["new", "contacted", "closed"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export function isLeadStatus(value: unknown): value is LeadStatus {
  return (
    typeof value === "string" &&
    (LEAD_STATUSES as readonly string[]).includes(value)
  );
}

export type LeadSource = "contact" | "onboarding";

export interface NewLead {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  projectType?: string;
  budgetRange?: string;
  attachmentName?: string;
  attachmentSize?: number;
  attachmentType?: string;
  source: LeadSource;
}

export interface Lead extends NewLead {
  id: string;
  status: LeadStatus;
  createdAt: Date;
}

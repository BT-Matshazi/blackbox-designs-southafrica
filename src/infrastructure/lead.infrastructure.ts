import { and, desc, eq, ilike, or } from "drizzle-orm";
import { db } from "@/lib/drizzle/db";
import { leads } from "@/lib/drizzle/schema";
import { Lead, LeadStatus, NewLead } from "@/src/application/domain/lead.domain";
import {
  LeadFilter,
  LeadRepository,
} from "@/src/application/interface/lead.repository";

type LeadRow = typeof leads.$inferSelect;

function toDomain(row: LeadRow): Lead {
  return {
    id: row.id,
    firstName: row.firstName,
    lastName: row.lastName,
    email: row.email,
    phone: row.phone ?? undefined,
    company: row.company ?? undefined,
    message: row.message,
    projectType: row.projectType ?? undefined,
    budgetRange: row.budgetRange ?? undefined,
    attachmentName: row.attachmentName ?? undefined,
    attachmentSize: row.attachmentSize ?? undefined,
    attachmentType: row.attachmentType ?? undefined,
    source: row.source,
    status: row.status,
    createdAt: row.createdAt,
  };
}

export class LeadInfrastructure implements LeadRepository {
  async save(
    lead: NewLead,
  ): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      const [row] = await db
        .insert(leads)
        .values({
          firstName: lead.firstName,
          lastName: lead.lastName,
          email: lead.email,
          phone: lead.phone ?? null,
          company: lead.company ?? null,
          message: lead.message,
          projectType: lead.projectType ?? null,
          budgetRange: lead.budgetRange ?? null,
          attachmentName: lead.attachmentName ?? null,
          attachmentSize: lead.attachmentSize ?? null,
          attachmentType: lead.attachmentType ?? null,
          source: lead.source,
        })
        .returning({ id: leads.id });
      return { success: true, id: row.id };
    } catch (error) {
      console.error("[LeadInfrastructure] Failed to save lead:", error);
      return { success: false, error: "Failed to save lead" };
    }
  }

  async findAll(filter?: LeadFilter): Promise<Lead[]> {
    const conditions = [];
    if (filter?.status) {
      conditions.push(eq(leads.status, filter.status));
    }
    if (filter?.search) {
      const term = `%${filter.search}%`;
      conditions.push(
        or(
          ilike(leads.firstName, term),
          ilike(leads.lastName, term),
          ilike(leads.email, term),
          ilike(leads.company, term),
        ),
      );
    }

    const rows = await db
      .select()
      .from(leads)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(leads.createdAt));

    return rows.map(toDomain);
  }

  async updateStatus(
    id: string,
    status: LeadStatus,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const updated = await db
        .update(leads)
        .set({ status })
        .where(eq(leads.id, id))
        .returning({ id: leads.id });
      if (updated.length === 0) {
        return { success: false, error: "Lead not found" };
      }
      return { success: true };
    } catch (error) {
      console.error("[LeadInfrastructure] Failed to update status:", error);
      return { success: false, error: "Failed to update lead status" };
    }
  }
}

import { Lead, LeadStatus, NewLead } from "../domain/lead.domain";

export type LeadFilter = {
  status?: LeadStatus;
  /** Case-insensitive substring match on name, email or company. */
  search?: string;
};

export interface LeadRepository {
  save(lead: NewLead): Promise<{ success: boolean; id?: string; error?: string }>;
  findAll(filter?: LeadFilter): Promise<Lead[]>;
  updateStatus(
    id: string,
    status: LeadStatus,
  ): Promise<{ success: boolean; error?: string }>;
}

"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/src/utils/auth/require-admin";
import { LeadInfrastructure } from "@/src/infrastructure/lead.infrastructure";
import { isLeadStatus } from "@/src/application/domain/lead.domain";

export async function updateLeadStatus(
  id: string,
  status: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Not authorized" };
  }

  if (!isLeadStatus(status)) {
    return { success: false, error: "Invalid status" };
  }

  const repo = new LeadInfrastructure();
  const result = await repo.updateStatus(id, status);
  if (result.success) {
    revalidatePath("/admin");
  }
  return result;
}

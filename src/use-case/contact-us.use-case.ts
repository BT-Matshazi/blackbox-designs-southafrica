import { ContactUs } from "@/src/application/domain/contact-us.domain";
import { ContactUsRepository } from "@/src/application/interface/contact-us.repository";
import { LeadRepository } from "@/src/application/interface/lead.repository";
import { ContactUsInfrastructure } from "@/src/infrastructure/contact-us.infrastructure";
import { LeadInfrastructure } from "@/src/infrastructure/lead.infrastructure";

export class ContactUsUseCase {
  constructor(
    private contactUsRepository: ContactUsRepository = new ContactUsInfrastructure(),
    private leadRepository: LeadRepository = new LeadInfrastructure(),
  ) {}

  async execute(
    data: ContactUs,
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    if (!data.firstName || !data.lastName || !data.email || !data.message) {
      return { success: false, error: "Name, email and message are required" };
    }

    // Persist first so an SMTP failure can never lose the lead.
    const saved = await this.leadRepository.save({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || undefined,
      company: data.company || undefined,
      message: data.message,
      projectType: data.projectType,
      budgetRange: data.budgetRange,
      attachmentName: data.attachmentName,
      attachmentSize: data.attachmentSize,
      attachmentType: data.attachmentType,
      source: "contact",
    });
    if (!saved.success) {
      console.error("[ContactUsUseCase] Lead persistence failed", {
        error: saved.error,
      });
    }

    const emailResult = await this.contactUsRepository.sendContactUsEmail(data);
    if (!emailResult.success) {
      console.error("[ContactUsUseCase] Notification email failed", {
        error: emailResult.error,
      });
    }

    if (saved.success || emailResult.success) {
      return { success: true, messageId: emailResult.messageId };
    }
    return {
      success: false,
      error: emailResult.error ?? "Failed to submit enquiry",
    };
  }
}

import { ContactUs } from "@/src/application/domain/contact-us.domain";
import { ContactUsInfrastructure } from "@/src/infrastructure/contact-us.infrastructure";

export class ContactUsUseCase {
  private contactUsRepository: ContactUsInfrastructure;

  constructor() {
    this.contactUsRepository = new ContactUsInfrastructure();
  }

  async execute(
    data: ContactUs
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    console.log("[ContactUsUseCase] Starting execution", {
      hasFirstName: !!data.firstName,
      hasLastName: !!data.lastName,
      hasEmail: !!data.email,
      hasPhone: !!data.phone,
      hasCompany: !!data.company,
      hasMessage: !!data.message,
    });

    try {
      // Validate the input data
      console.log("[ContactUsUseCase] Validating input data");
      if (!data.firstName || !data.lastName || !data.email || !data.company || !data.phone || !data.message) {
        console.error("[ContactUsUseCase] Validation failed - missing required fields");
        throw new Error("All fields are required");
      }

      console.log("[ContactUsUseCase] Validation passed, calling infrastructure layer");
      const result = await this.contactUsRepository.sendContactUsEmail(data);

      if (result.success) {
        console.log("[ContactUsUseCase] Email sent successfully via infrastructure", {
          messageId: result.messageId,
        });
      } else {
        console.error("[ContactUsUseCase] Infrastructure layer returned failure", {
          error: result.error,
        });
      }

      return result;
    } catch (error) {
      console.error("[ContactUsUseCase] Error executing use case:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to execute use case",
      };
    }
  }
}

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
    try {
      // Validate the input data
      if (!data.firstName || !data.lastName || !data.email || !data.company || !data.phone || !data.message) {
        throw new Error("All fields are required");
      }

      const result = await this.contactUsRepository.sendContactUsEmail(data);
      return result;
    } catch (error) {
      console.error("Error in ContactUsUseCase:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to execute use case",
      };
    }
  }
}

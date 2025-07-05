"use server";

import { ContactUs } from "@/src/application/domain/contact-us.domain";
import { ContactUsUseCase } from "@/src/use-case/contact-us.use-case";
import { notifyUserController } from "./notify-user.controller";

export async function contactUsController(
  data: ContactUs
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const contactUsUseCaseInstance = new ContactUsUseCase();
    const result = await contactUsUseCaseInstance.execute(data);

    if (result.success) {
      await notifyUserController({
        email: data.email,
      });
    }

    return result;
  } catch (error) {
    console.error("Error in ContactUsController:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to execute use case",
    };
  }
}

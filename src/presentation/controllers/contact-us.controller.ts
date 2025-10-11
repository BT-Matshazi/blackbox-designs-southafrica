"use server";

import { ContactUs } from "@/src/application/domain/contact-us.domain";
import { ContactUsUseCase } from "@/src/use-case/contact-us.use-case";
import { notifyUserController } from "./notify-user.controller";

export async function contactUsController(
  data: ContactUs
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  console.log("[ContactUsController] Starting contact form submission", {
    email: data.email,
    company: data.company,
    timestamp: new Date().toISOString(),
  });

  try {
    console.log("[ContactUsController] Instantiating ContactUsUseCase");
    const contactUsUseCaseInstance = new ContactUsUseCase();

    console.log("[ContactUsController] Executing ContactUsUseCase");
    const result = await contactUsUseCaseInstance.execute(data);

    if (result.success) {
      console.log("[ContactUsController] Contact email sent successfully", {
        messageId: result.messageId,
      });

      console.log("[ContactUsController] Triggering user notification email");
      await notifyUserController({
        email: data.email,
      });
    } else {
      console.warn("[ContactUsController] Contact email failed", {
        error: result.error,
      });
    }

    console.log("[ContactUsController] Process completed", {
      success: result.success,
    });
    return result;
  } catch (error) {
    console.error("[ContactUsController] Unhandled error in controller:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to execute use case",
    };
  }
}

"use server";

import { NotifyUser } from "@/src/application/domain/notify-user.domain";
import { NotifyUserUseCase } from "@/src/use-case/notify-user.use-case";

export async function notifyUserController(
  notifyData: NotifyUser
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  console.log("[NotifyUserController] Starting user notification", {
    email: notifyData.email,
    timestamp: new Date().toISOString(),
  });

  try {
    console.log("[NotifyUserController] Instantiating NotifyUserUseCase");
    const notifyUserUseCaseInstance = new NotifyUserUseCase();

    console.log("[NotifyUserController] Executing NotifyUserUseCase");
    const result = await notifyUserUseCaseInstance.execute(notifyData);

    if (result.success) {
      console.log("[NotifyUserController] User notification sent successfully", {
        messageId: result.messageId,
      });
    } else {
      console.warn("[NotifyUserController] User notification failed", {
        error: result.error,
      });
    }

    return result;
  } catch (error) {
    console.error("[NotifyUserController] Unhandled error in controller:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to notify user",
    };
  }
}

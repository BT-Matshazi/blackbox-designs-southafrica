"use server";

import { NotifyUser } from "@/src/application/domain/notify-user.domain";
import { NotifyUserUseCase } from "@/src/use-case/notify-user.use-case";

export async function notifyUserController(
  notifyData: NotifyUser
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const notifyUserUseCaseInstance = new NotifyUserUseCase();
    const result = await notifyUserUseCaseInstance.execute(notifyData);
    return result;
  } catch (error) {
    console.error("Error in Notify User Controller:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to notify user",
    };
  }
}

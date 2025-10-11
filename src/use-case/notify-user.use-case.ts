import { NotifyUser } from "@/src/application/domain/notify-user.domain";
import { NotifyUserInfrastructure } from "@/src/infrastructure/notify-user.infrastructure";

export class NotifyUserUseCase {
  private notifyUserRepository: NotifyUserInfrastructure;

  constructor() {
    this.notifyUserRepository = new NotifyUserInfrastructure();
  }

  async execute(
    data: NotifyUser
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    console.log("[NotifyUserUseCase] Starting execution", {
      hasEmail: !!data.email,
      email: data.email,
    });

    try {
      // Validate the input data
      console.log("[NotifyUserUseCase] Validating input data");
      if (!data.email) {
        console.error("[NotifyUserUseCase] Validation failed - email is required");
        throw new Error("Email is required");
      }

      console.log("[NotifyUserUseCase] Validation passed, calling infrastructure layer");
      const result = await this.notifyUserRepository.sendNotifyUserEmail(data);

      if (result.success) {
        console.log("[NotifyUserUseCase] Notification sent successfully via infrastructure", {
          messageId: result.messageId,
        });
      } else {
        console.error("[NotifyUserUseCase] Infrastructure layer returned failure", {
          error: result.error,
        });
      }

      return result;
    } catch (error) {
      console.error("[NotifyUserUseCase] Error executing use case:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to execute use case",
      };
    }
  }
}

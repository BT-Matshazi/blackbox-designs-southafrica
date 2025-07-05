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
    try {
      // Validate the input data
      if (!data.email) {
        throw new Error("Email is required");
      }

      const result = await this.notifyUserRepository.sendNotifyUserEmail(data);
      return result;
    } catch (error) {
      console.error("Error in NotifyUserUseCase:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to execute use case",
      };
    }
  }
}

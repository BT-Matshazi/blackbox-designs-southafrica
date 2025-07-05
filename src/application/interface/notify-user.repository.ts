import { NotifyUser } from "../domain/notify-user.domain";

export interface NotifyUserRepository {
  sendNotifyUserEmail: (
    data: NotifyUser
  ) => Promise<{ success: boolean; messageId?: string; error?: string }>;
}
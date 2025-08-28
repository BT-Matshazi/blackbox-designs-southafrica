import { renderEmailTemplate } from "@/lib/utils";
import NotifyUserEmail from "@/lib/emails/notify-user";
import nodemailer, { Transporter, TransportOptions } from "nodemailer";
import { NotifyUser } from "@/src/application/domain/notify-user.domain";
import { NotifyUserRepository } from "@/src/application/interface/notify-user.repository";

export class NotifyUserInfrastructure implements NotifyUserRepository {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    } as TransportOptions);
  }

  /**
   * Send a notification email to the user
   */
  async sendNotifyUserEmail(
    data: NotifyUser
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      // Render the React email template to HTML
      const html = await renderEmailTemplate(NotifyUserEmail, data);

      // Send the email
      const info = await this.transporter.sendMail({
        from: `"BlackBox Designs" <${process.env.EMAIL_FROM}>`,
        to: data.email,
        subject: `Thank you for contacting BlackBox Designs`,
        html: html,
      });

      return {
        success: true,
        messageId: info.messageId || undefined,
      };
    } catch (error) {
      console.error("Error sending notification email:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to send email",
      };
    }
  }
}

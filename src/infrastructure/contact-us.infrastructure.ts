import { renderEmailTemplate } from "@/lib/utils";
import { ContactUs } from "@/src/application/domain/contact-us.domain";
import { ContactUsRepository } from "@/src/application/interface/contact-us.repository";
import ContactUsEmail from "@/lib/emails/contact-us";
import nodemailer, { Transporter, TransportOptions } from "nodemailer";

export class ContactUsInfrastructure implements ContactUsRepository {
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

  async sendContactUsEmail(
    data: ContactUs
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const html = await renderEmailTemplate(ContactUsEmail, data);

      const info = await this.transporter.sendMail({
        from: `"BlackBox Designs" <${process.env.EMAIL_FROM}>`,
        to: process.env.EMAIL_TO,
        subject: `Contact Us from ${data.firstName} ${data.lastName}`,
        html: html,
      });

      return {
        success: true,
        messageId: info.messageId || undefined,
      };
    } catch (error) {
      console.error("Error sending contact us email:", error);
      return { success: false, error: "Failed to send contact us email" };
    }
  }
}

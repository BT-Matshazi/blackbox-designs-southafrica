import nodemailer, { TransportOptions } from "nodemailer";
import { renderEmailTemplate } from "@/lib/utils";
import AdminInviteEmail from "@/lib/emails/admin-invite";

export async function sendAdminInviteEmail(args: {
  to: string;
  firstName: string | null;
  tempPassword: string;
}): Promise<{ success: boolean; error?: string }> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  } as TransportOptions);

  const baseUrl =
    process.env.NEXT_PUBLIC_SERVER_URL || "https://blackboxdesigns.co.za";

  try {
    const html = await renderEmailTemplate(AdminInviteEmail, {
      firstName: args.firstName,
      email: args.to,
      tempPassword: args.tempPassword,
      loginUrl: `${baseUrl}/login`,
    });

    await transporter.sendMail({
      from: `"BlackBox Designs" <${process.env.EMAIL_FROM}>`,
      to: args.to,
      subject: "Your Blackbox Designs admin access",
      html,
    });

    return { success: true };
  } catch (error) {
    console.error(
      "[AdminInviteInfrastructure] Failed to send invite email:",
      error,
    );
    return { success: false, error: "Failed to send invite email" };
  }
}

import nodemailer, { TransportOptions } from "nodemailer";
import { renderEmailTemplate } from "@/lib/utils";
import PasswordResetEmail from "@/lib/emails/password-reset";
import { OTP_TTL_MS } from "@/src/utils/auth/otp";

export async function sendPasswordResetOtpEmail(args: {
  to: string;
  firstName: string | null;
  code: string;
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

  try {
    const html = await renderEmailTemplate(PasswordResetEmail, {
      firstName: args.firstName,
      code: args.code,
      ttlMinutes: Math.round(OTP_TTL_MS / 60000),
    });

    await transporter.sendMail({
      from: `"BlackBox Designs" <${process.env.EMAIL_FROM}>`,
      to: args.to,
      subject: "Reset your password",
      html,
    });

    return { success: true };
  } catch (error) {
    console.error(
      "[PasswordResetInfrastructure] Failed to send reset email:",
      error,
    );
    return { success: false, error: "Failed to send password reset email" };
  }
}

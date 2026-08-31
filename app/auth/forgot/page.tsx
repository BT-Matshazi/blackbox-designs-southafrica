import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentUser } from "@/src/utils/auth/current-user";
import { roleHomePath } from "@/src/utils/auth/roles";
import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotForm } from "./forgot-form";

export const metadata: Metadata = {
  title: "Forgot password · Blackbox Designs",
  robots: { index: false, follow: false },
};

export default async function ForgotPage() {
  const user = await getCurrentUser();
  if (user) redirect(roleHomePath(user.role));

  return (
    <AuthShell
      eyebrow="Password reset"
      heading="Forgot your password?"
      intro="Enter your email and we'll send you a 6-digit reset code."
    >
      <ForgotForm />
    </AuthShell>
  );
}

import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentUser } from "@/src/utils/auth/current-user";
import { roleHomePath } from "@/src/utils/auth/roles";
import { AuthShell } from "@/components/auth/auth-shell";
import { ResetForm } from "./reset-form";

export const metadata: Metadata = {
  title: "Reset password · Blackbox Designs",
  robots: { index: false, follow: false },
};

type ResetSearchParams = Promise<{ email?: string }>;

export default async function ResetPage({
  searchParams,
}: {
  searchParams: ResetSearchParams;
}) {
  const user = await getCurrentUser();
  if (user) redirect(roleHomePath(user.role));

  const { email } = await searchParams;
  if (!email) redirect("/auth/forgot");

  return (
    <AuthShell
      eyebrow="Password reset"
      heading="Check your email."
      intro={`We sent a 6-digit code to ${email}. Enter it below with your new password.`}
    >
      <ResetForm email={email} />
    </AuthShell>
  );
}

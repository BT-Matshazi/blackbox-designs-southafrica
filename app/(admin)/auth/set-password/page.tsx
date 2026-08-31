import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentUser } from "@/src/utils/auth/current-user";
import { roleHomePath } from "@/src/utils/auth/roles";
import { AuthShell } from "@/components/auth/auth-shell";
import { SetPasswordForm } from "./set-password-form";

export const metadata: Metadata = {
  title: "Choose your password · Blackbox Designs",
  robots: { index: false, follow: false },
};

export default async function SetPasswordPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/auth/set-password");
  if (!user.mustChangePassword) redirect(roleHomePath(user.role));

  return (
    <AuthShell
      eyebrow="Welcome aboard"
      heading="Choose your password."
      intro="Replace your temporary password with one of your own before continuing."
    >
      <SetPasswordForm />
    </AuthShell>
  );
}

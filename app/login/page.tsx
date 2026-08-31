import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentUser } from "@/src/utils/auth/current-user";
import { roleHomePath } from "@/src/utils/auth/roles";
import { LoginForm } from "./login-form";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = {
  title: "Log in · Blackbox Designs",
  robots: { index: false, follow: false },
};

type LoginSearchParams = Promise<{ next?: string }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: LoginSearchParams;
}) {
  const user = await getCurrentUser();
  if (user) redirect(roleHomePath(user.role));

  const { next } = await searchParams;

  return (
    <AuthShell
      eyebrow="Admin access"
      heading="Log in."
      intro="This area is for Blackbox Designs administrators."
    >
      <LoginForm next={next} />
    </AuthShell>
  );
}

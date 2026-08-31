import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/src/utils/auth/current-user";
import { logout } from "@/app/actions/auth";
import { AdminMobileBar, AdminSidebar } from "@/components/admin/sidebar";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin · Blackbox Designs",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // DB-backed re-check — the middleware's JWT check alone would trust a
  // stale role claim.
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/admin");
  if (user.role !== "admin") redirect("/");
  // Invited admins can't use the dashboard until they set their own password.
  if (user.mustChangePassword) redirect("/auth/set-password");

  const sidebarUser = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground lg:h-screen lg:flex-row lg:overflow-hidden">
      <AdminSidebar user={sidebarUser} logout={logout} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminMobileBar user={sidebarUser} logout={logout} />
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

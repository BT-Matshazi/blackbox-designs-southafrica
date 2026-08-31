import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/src/utils/auth/current-user";
import { logout } from "@/app/actions/auth";

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                Blackbox Designs
              </p>
              <p className="font-display text-lg font-semibold">Admin</p>
            </div>
            <nav className="flex items-center gap-4 text-sm">
              <Link
                href="/admin"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Leads
              </Link>
              <Link
                href="/admin/admins"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Admins
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {user.email}
            </span>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-full border border-border px-4 py-1.5 text-sm transition-colors hover:bg-muted"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}

import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/drizzle/db";
import { users } from "@/lib/drizzle/schema";
import { AddAdminForm } from "@/components/admin/add-admin-form";

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeZone: "Africa/Johannesburg",
  }).format(value);
}

export default async function AdminAdminsPage() {
  const admins = await db
    .select({
      id: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      mustChangePassword: users.mustChangePassword,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.role, "admin"))
    .orderBy(desc(users.createdAt));

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="font-display text-2xl font-semibold">Admins</h1>
        <p className="text-sm text-muted-foreground">
          {admins.length} {admins.length === 1 ? "admin" : "admins"} with
          access to this dashboard.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="hidden px-4 py-3 font-medium sm:table-cell">
                Added
              </th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr
                key={admin.id}
                className="border-b border-border last:border-b-0"
              >
                <td className="px-4 py-3 font-medium">
                  {admin.firstName || admin.lastName
                    ? `${admin.firstName ?? ""} ${admin.lastName ?? ""}`.trim()
                    : "—"}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {admin.email}
                </td>
                <td className="px-4 py-3">
                  {admin.mustChangePassword ? (
                    <span className="inline-flex rounded-full border border-warning/30 bg-warning/10 px-2 py-0.5 text-xs font-medium text-warning">
                      invite pending
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full border border-border bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      active
                    </span>
                  )}
                </td>
                <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                  {formatDate(admin.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="max-w-md">
        <h2 className="font-display text-lg font-semibold">Add an admin</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          They&apos;ll receive an email with a temporary password and set
          their own when they first log in.
        </p>
        <div className="mt-4">
          <AddAdminForm />
        </div>
      </div>
    </div>
  );
}

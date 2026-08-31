import { desc, eq } from "drizzle-orm";
import type { ComponentType } from "react";
import {
  Clock3,
  ShieldCheck,
  UserPlus,
  Users as UsersIcon,
} from "lucide-react";
import { db } from "@/lib/drizzle/db";
import { users } from "@/lib/drizzle/schema";
import { AddAdminForm } from "@/components/admin/add-admin-form";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  const pendingInvites = admins.filter((admin) => admin.mustChangePassword)
    .length;
  const activeAdmins = admins.length - pendingInvites;

  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-2xl">
        <Badge variant="outline" className="mb-3 bg-background">
          Access control
        </Badge>
        <h1 className="font-display text-3xl font-semibold text-foreground">
          Admins
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Invite trusted team members and review who can access the dashboard.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <MetricCard
          label="Total admins"
          value={admins.length}
          detail="Can enter this dashboard"
          icon={UsersIcon}
        />
        <MetricCard
          label="Active"
          value={activeAdmins}
          detail="Password has been set"
          icon={ShieldCheck}
        />
        <MetricCard
          label="Pending"
          value={pendingInvites}
          detail="Invite still needs setup"
          icon={Clock3}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <div className="border-b border-border px-4 py-4">
            <h2 className="font-display text-lg font-semibold">Team access</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Current administrator accounts sorted by invite date.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-muted/50">
                <tr className="border-b border-border text-xs font-medium text-muted-foreground">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="hidden px-4 py-3 sm:table-cell">Added</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr
                    key={admin.id}
                    className="border-b border-border transition-colors last:border-b-0 hover:bg-muted/45"
                  >
                    <td className="px-4 py-4 font-medium text-foreground">
                      {admin.firstName || admin.lastName
                        ? `${admin.firstName ?? ""} ${
                            admin.lastName ?? ""
                          }`.trim()
                        : "-"}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      <span className="block max-w-[280px] truncate">
                        {admin.email}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {admin.mustChangePassword ? (
                        <Badge
                          variant="outline"
                          className="border-warning/30 bg-warning/10 text-warning"
                        >
                          Invite pending
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Active</Badge>
                      )}
                    </td>
                    <td className="hidden px-4 py-4 text-muted-foreground sm:table-cell">
                      {formatDate(admin.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Card className="h-fit rounded-lg py-0 shadow-sm">
          <CardHeader className="p-5 pb-0">
            <div className="mb-2 flex size-10 items-center justify-center rounded-md bg-accent/10 text-accent">
              <UserPlus className="size-5" />
            </div>
            <CardTitle className="font-display text-xl">
              Add an admin
            </CardTitle>
            <CardDescription>
              They&apos;ll receive a temporary password and set their own when
              they first log in.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            <AddAdminForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: number;
  detail: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="rounded-lg py-0 shadow-sm">
      <CardHeader className="flex-row items-start justify-between gap-3 p-4 pb-0">
        <div>
          <CardDescription>{label}</CardDescription>
          <CardTitle className="mt-2 font-display text-3xl">
            {value}
          </CardTitle>
        </div>
        <span className="flex size-9 items-center justify-center rounded-md bg-accent/10 text-accent">
          <Icon className="size-4" />
        </span>
      </CardHeader>
      <CardContent className="p-4 pt-3 text-xs text-muted-foreground">
        {detail}
      </CardContent>
    </Card>
  );
}

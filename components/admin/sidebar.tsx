"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Inbox, LogOut, Menu, ShieldCheck, Users } from "lucide-react";
import Logo from "@/public/logo.webp";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Leads", icon: Inbox, exact: true },
  { href: "/admin/admins", label: "Admins", icon: Users, exact: false },
];

type SidebarUser = {
  email: string;
  firstName: string | null;
  lastName: string | null;
};

function initials(user: SidebarUser) {
  const fromName = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`;
  return (fromName || user.email.slice(0, 2)).toUpperCase();
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="grid gap-1.5">
      {NAV_ITEMS.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            {active && (
              <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-accent" />
            )}
            <item.icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function UserBlock({
  user,
  logout,
}: {
  user: SidebarUser;
  logout: () => Promise<void>;
}) {
  return (
    <div className="border-t border-sidebar-border p-3">
      <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/70 p-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary font-display text-xs font-bold text-primary-foreground shadow-sm">
          {initials(user)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-sidebar-foreground">
            {user.firstName
              ? `${user.firstName} ${user.lastName ?? ""}`.trim()
              : "Admin"}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {user.email}
          </p>
        </div>
        <form action={logout}>
          <button
            type="submit"
            aria-label="Log out"
            title="Log out"
            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            <LogOut className="size-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

function SidebarBody({
  user,
  logout,
  onNavigate,
}: {
  user: SidebarUser;
  logout: () => Promise<void>;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-4 py-5">
        <Link
          href="/admin"
          onClick={onNavigate}
          aria-label="Admin dashboard"
          className="inline-flex rounded-md"
        >
          <Image
            src={Logo}
            width={130}
            alt="BlackBox Designs Logo"
            priority
            className="h-auto w-[120px]"
          />
        </Link>
        <div className="mt-5 rounded-lg border border-sidebar-border bg-background/70 p-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <ShieldCheck className="size-4 text-accent" />
            Dashboard
          </div>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Manage leads and administrator access.
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <NavLinks onNavigate={onNavigate} />
      </div>
      <UserBlock user={user} logout={logout} />
    </div>
  );
}

export function AdminSidebar({
  user,
  logout,
}: {
  user: SidebarUser;
  logout: () => Promise<void>;
}) {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-sidebar-border bg-sidebar shadow-[1px_0_0_var(--border)] lg:block">
      <SidebarBody user={user} logout={logout} />
    </aside>
  );
}

export function AdminMobileBar({
  user,
  logout,
}: {
  user: SidebarUser;
  logout: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between border-b border-sidebar-border bg-sidebar/95 px-4 py-3 shadow-sm lg:hidden">
      <Link href="/admin" aria-label="Admin dashboard">
        <Image
          src={Logo}
          width={110}
          alt="BlackBox Designs Logo"
          className="h-auto w-[110px]"
        />
      </Link>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          aria-label="Open menu"
          className="inline-flex size-10 items-center justify-center rounded-lg border border-sidebar-border text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
        >
          <Menu className="size-5" />
        </SheetTrigger>
        <SheetContent side="left" className="w-72 bg-sidebar p-0">
          <SheetTitle className="sr-only">Admin navigation</SheetTitle>
          <SidebarBody
            user={user}
            logout={logout}
            onNavigate={() => setOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}

"use client";

import { useActionState } from "react";
import { inviteAdmin } from "@/app/actions/admins";

const inputClasses =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20";

export function AddAdminForm() {
  const [state, action, pending] = useActionState(inviteAdmin, null);

  return (
    <form action={action} className="grid gap-3">
      <div className="grid grid-cols-2 gap-3">
        <label className="grid gap-1.5">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
            First name
          </span>
          <input name="firstName" required className={inputClasses} />
        </label>
        <label className="grid gap-1.5">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
            Last name (optional)
          </span>
          <input name="lastName" className={inputClasses} />
        </label>
      </div>
      <label className="grid gap-1.5">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
          Email
        </span>
        <input name="email" type="email" required className={inputClasses} />
      </label>

      {state?.ok === false && (
        <p
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {state.error}
        </p>
      )}
      {state?.ok === true && (
        <p className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent">
          Invite sent — they&apos;ll appear above as “invite pending” until
          their first login.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-10 w-fit items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending invite…" : "Send invite"}
      </button>
    </form>
  );
}

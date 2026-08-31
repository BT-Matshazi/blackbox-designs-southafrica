"use client";

import { useActionState } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { inviteAdmin } from "@/app/actions/admins";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AddAdminForm() {
  const [state, action, pending] = useActionState(inviteAdmin, null);

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium leading-none">First name</span>
          <Input name="firstName" required className="h-10 bg-background" />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium leading-none">
            Last name
            <span className="font-normal text-muted-foreground"> optional</span>
          </span>
          <Input name="lastName" className="h-10 bg-background" />
        </label>
      </div>
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium leading-none">Email</span>
        <Input
          name="email"
          type="email"
          required
          className="h-10 bg-background"
        />
      </label>

      {state?.ok === false && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          {state.error}
        </p>
      )}
      {state?.ok === true && (
        <p className="flex items-start gap-2 rounded-md border border-accent/30 bg-accent/10 px-3 py-2.5 text-sm text-accent">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
          Invite sent. They&apos;ll appear above as invite pending until
          their first login.
        </p>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="w-fit"
      >
        <Send data-icon="inline-start" />
        {pending ? "Sending invite..." : "Send invite"}
      </Button>
    </form>
  );
}

"use client";

import { useActionState } from "react";
import { setOwnPassword } from "@/app/actions/auth";
import {
  AuthError,
  AuthField,
  AuthSubmit,
} from "@/components/auth/auth-shell";

export function SetPasswordForm() {
  const [state, action, pending] = useActionState(setOwnPassword, null);

  return (
    <form action={action} className="grid gap-4">
      <AuthField
        name="password"
        label="New password (min 8 characters)"
        type="password"
        autoComplete="new-password"
        required
      />
      <AuthField
        name="confirmPassword"
        label="Confirm new password"
        type="password"
        autoComplete="new-password"
        required
      />

      {state?.ok === false && <AuthError>{state.error}</AuthError>}

      <AuthSubmit pending={pending} pendingLabel="Saving…">
        Save password
      </AuthSubmit>
    </form>
  );
}

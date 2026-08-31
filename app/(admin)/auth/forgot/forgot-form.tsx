"use client";

import { useActionState } from "react";
import { requestPasswordReset } from "@/app/actions/auth";
import {
  AuthError,
  AuthField,
  AuthSubmit,
} from "@/components/auth/auth-shell";

export function ForgotForm() {
  const [state, action, pending] = useActionState(requestPasswordReset, null);

  return (
    <form action={action} className="grid gap-4">
      <AuthField
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        required
      />
      {state?.ok === false && <AuthError>{state.error}</AuthError>}
      <AuthSubmit pending={pending} pendingLabel="Sending…">
        Send reset code
      </AuthSubmit>
    </form>
  );
}

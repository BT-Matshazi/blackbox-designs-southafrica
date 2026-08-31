"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import {
  AuthField,
  AuthError,
  AuthSubmit,
} from "@/components/auth/auth-shell";

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(login, null);

  return (
    <form action={action} className="grid gap-4">
      {next && <input type="hidden" name="next" value={next} />}

      <AuthField
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        required
      />
      <AuthField
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        required
      />

      <div className="-mt-1 text-right">
        <Link
          href="/auth/forgot"
          className="text-xs font-medium text-accent hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {state?.ok === false && <AuthError>{state.error}</AuthError>}

      <AuthSubmit pending={pending} pendingLabel="Logging in…">
        Log in
      </AuthSubmit>
    </form>
  );
}

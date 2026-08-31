"use client";

import { useActionState, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { resetPassword } from "@/app/actions/auth";
import {
  AuthError,
  AuthField,
  AuthSubmit,
} from "@/components/auth/auth-shell";

export function ResetForm({ email }: { email: string }) {
  const [state, action, pending] = useActionState(resetPassword, null);
  const [code, setCode] = useState("");

  return (
    <form action={action} className="grid gap-5">
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="code" value={code} />

      <div className="grid gap-2">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
          6-digit code
        </span>
        <InputOTP maxLength={6} value={code} onChange={setCode} autoFocus>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

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

      <AuthSubmit pending={pending} pendingLabel="Updating password…">
        Reset password
      </AuthSubmit>
    </form>
  );
}

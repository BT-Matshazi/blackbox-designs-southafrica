import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PasswordField } from "./password-field";

export function AuthShell({
  eyebrow,
  heading,
  intro,
  children,
}: {
  eyebrow: string;
  heading: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col bg-background px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground hover:text-accent"
        >
          <ArrowLeft className="size-3.5" />
          Back to site
        </Link>

        <header className="mt-8">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
            {eyebrow}
          </p>
          <h1 className="mt-2 font-display text-3xl uppercase leading-tight tracking-tight text-foreground sm:text-4xl">
            {heading}
          </h1>
          {intro && (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {intro}
            </p>
          )}
        </header>

        <section className="mt-8 rounded-xl border border-border bg-card p-6 sm:p-7">
          {children}
        </section>
      </div>
    </main>
  );
}

export function AuthField({
  name,
  label,
  type = "text",
  autoComplete,
  required,
  defaultValue,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
}) {
  if (type === "password") {
    return (
      <PasswordField
        name={name}
        label={label}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
      />
    );
  }

  return (
    <label className="grid gap-1.5">
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-11 rounded-lg border border-input bg-background px-4 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
      />
    </label>
  );
}

export function AuthError({ children }: { children: React.ReactNode }) {
  return (
    <p
      role="alert"
      className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
    >
      {children}
    </p>
  );
}

export function AuthSubmit({
  pending,
  pendingLabel,
  children,
}: {
  pending: boolean;
  pendingLabel: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

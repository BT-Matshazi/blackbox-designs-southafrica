import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Logo from "@/public/logo.webp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-5 py-12 sm:px-8">
      <div
        aria-hidden
        className="absolute inset-0 bg-grid bg-grid-fade opacity-60"
      />
      <div className="relative w-full max-w-md">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Blackbox Designs home">
            <Image
              src={Logo}
              width={150}
              alt="BlackBox Designs Logo"
              priority
              className="h-auto w-[130px]"
            />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            <ArrowLeft className="size-4" />
            Back to site
          </Link>
        </div>

        <header className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {heading}
          </h1>
          {intro && <p className="mt-3 text-muted-foreground">{intro}</p>}
        </header>

        <section className="mt-8 rounded-xl border border-border bg-card p-6 shadow-[6px_6px_0_0_var(--accent)] sm:p-8">
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
    <label className="grid gap-2">
      <span className="text-sm font-medium leading-none">{label}</span>
      <Input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-11"
      />
    </label>
  );
}

export function AuthError({ children }: { children: React.ReactNode }) {
  return (
    <p
      role="alert"
      className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
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
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      className="h-12 w-full text-base shadow-[3px_3px_0_0_var(--accent)] transition-all hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0_0_var(--accent)]"
    >
      {pending ? pendingLabel : children}
    </Button>
  );
}

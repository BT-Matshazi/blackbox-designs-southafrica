import { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type LegalSection = {
  id: string;
  heading: string;
  body: ReactNode;
};

type LegalPageProps = {
  title: string;
  lede?: ReactNode;
  intro?: ReactNode;
  lastUpdated?: string;
  sections: LegalSection[];
};

/* Bullet list with crimson square markers, echoing the box-mark motif */
export function LegalList({
  items,
  className,
}: {
  items: ReactNode[];
  className?: string;
}) {
  return (
    <ul className={cn("space-y-2.5", className)}>
      {items.map((item, i) => (
        <li
          key={i}
          className="relative pl-6 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:bg-accent"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function LegalPage({
  title,
  lede,
  intro,
  lastUpdated,
  sections,
}: LegalPageProps) {
  return (
    <div className="relative pb-24 pt-36">
      {/* Grid texture fading down from the top */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-96 bg-grid bg-grid-fade opacity-60"
      />

      <div className="container relative mx-auto max-w-6xl px-4">
        <header className="mb-14 max-w-3xl">
          <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            <span className="box-mark" aria-hidden />
            Legal
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>
          {lede && (
            <p className="text-lg leading-relaxed text-muted-foreground">
              {lede}
            </p>
          )}
          {lastUpdated && (
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Last updated: {lastUpdated}
            </p>
          )}
        </header>

        <div className="grid gap-12 lg:grid-cols-[230px_1fr]">
          {/* Sticky table of contents */}
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-28">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                On this page
              </p>
              <ul className="border-l border-border">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm leading-snug text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Document body */}
          <article className="min-w-0 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
            {intro && (
              <div className="mb-10 space-y-4 leading-relaxed text-muted-foreground">
                {intro}
              </div>
            )}
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border-t border-border py-8 first:border-t-0 first:pt-0 last:pb-0"
              >
                <h2 className="mb-4 flex items-baseline gap-3 text-xl font-semibold tracking-tight">
                  <span
                    className="font-display text-sm font-bold text-accent"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.heading}
                </h2>
                <div className="space-y-4 leading-relaxed text-muted-foreground">
                  {section.body}
                </div>
              </section>
            ))}
          </article>
        </div>

        {/* Contact band */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl bg-primary px-8 py-10 text-primary-foreground md:flex-row">
          <div>
            <h2 className="mb-1 text-xl font-semibold tracking-tight">
              Questions about this document?
            </h2>
            <p className="text-primary-foreground/70">
              We&apos;re happy to clarify anything — reach out any time.
            </p>
          </div>
          <Button
            variant="accent"
            size="lg"
            asChild
            className="h-12 shrink-0 px-7 text-base"
          >
            <Link href="/contact">
              Contact Us
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

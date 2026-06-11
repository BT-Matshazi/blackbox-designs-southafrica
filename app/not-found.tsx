import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Custom404 = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div aria-hidden className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />
      <div className="relative mx-auto max-w-xl text-center">
        <p className="mx-auto mb-8 inline-block -rotate-2 rounded-xl bg-primary px-6 py-2 font-display text-6xl font-bold text-primary-foreground shadow-[6px_6px_0_0_var(--accent)] sm:text-7xl">
          404
        </p>
        <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
          This page is off the map
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
          Check the URL, or head back to safer ground.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            asChild
            className="h-12 px-7 text-base shadow-[3px_3px_0_0_var(--accent)] transition-all hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0_0_var(--accent)]"
          >
            <Link href="/">
              Back to Home
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button variant="outline-accent" size="lg" asChild className="h-12 px-7 text-base">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Custom404;

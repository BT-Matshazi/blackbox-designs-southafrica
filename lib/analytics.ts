// Thin wrapper around GA4's gtag. All calls no-op safely when GA isn't
// configured (no NEXT_PUBLIC_GA_ID) or before the script has loaded, so
// callers never need to guard.

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type EventParams = Record<string, string | number | boolean | undefined>;

type GtagWindow = Window & {
  gtag?: (command: string, ...args: unknown[]) => void;
};

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as GtagWindow).gtag;
  if (typeof gtag !== "function") return;
  // Drop undefined values so GA doesn't record empty params.
  const clean = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== ""),
  );
  gtag("event", name, clean);
}

/**
 * GA4 recommended "generate_lead" event. Pass only non-PII qualifiers —
 * never the visitor's email, phone, or message.
 */
export function trackLead(
  source: string,
  params: { projectType?: string; budgetRange?: string } = {},
) {
  trackEvent("generate_lead", {
    source,
    project_type: params.projectType,
    budget_range: params.budgetRange,
  });
}

/** A click on a direct contact channel (WhatsApp, email, phone). */
export function trackContactClick(
  method: "whatsapp" | "email" | "phone",
  location: string,
) {
  trackEvent("contact_click", { method, location });
}

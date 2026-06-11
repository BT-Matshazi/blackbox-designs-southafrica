"use client";

import { ReactNode, MouseEvent, useEffect, useState } from "react";

// The address is stored reversed so the assembled email never appears in
// server-rendered HTML or as a plain greppable string in the JS bundle.
// Scraper regexes scanning for user@domain patterns find nothing.
const REVERSED_USER = "ofni";
const REVERSED_DOMAIN = "az.oc.sngisedxobkcalb";

const reverse = (value: string) => [...value].reverse().join("");

export const decodeContactEmail = () =>
  `${reverse(REVERSED_USER)}@${reverse(REVERSED_DOMAIN)}`;

type ObfuscatedEmailProps = {
  className?: string;
  subject?: string;
  children?: ReactNode;
};

/**
 * Renders a mailto link whose address is assembled in the browser only.
 * Crawlers reading static HTML see no email; humans without JS see a
 * readable "[at]/[dot]" fallback.
 */
export function ObfuscatedEmail({
  className,
  subject,
  children,
}: ObfuscatedEmailProps) {
  const [email, setEmail] = useState<string>();
  const [href, setHref] = useState<string>();

  useEffect(() => {
    const address = decodeContactEmail();
    setEmail(address);
    setHref(
      subject
        ? `mailto:${address}?subject=${encodeURIComponent(subject)}`
        : `mailto:${address}`,
    );
  }, [subject]);

  // Covers a click in the window before hydration state lands.
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (href) return;
    event.preventDefault();
    window.location.href = `mailto:${decodeContactEmail()}`;
  };

  return (
    <a href={href ?? "#"} onClick={handleClick} className={className}>
      {children ??
        email ?? (
          <span aria-label="email address">
            info [at] blackboxdesigns [dot] co [dot] za
          </span>
        )}
    </a>
  );
}

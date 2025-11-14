import { Metadata } from "next";
import { SEO_CONFIG } from "@/lib/config/seo-config";

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article";
  canonical?: string;
  noindex?: boolean;
}

export function generateMetadata({
  title,
  description = SEO_CONFIG.defaultDescription,
  keywords = SEO_CONFIG.defaultKeywords,
  ogImage = `${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage}`,
  ogType = "website",
  canonical,
  noindex = false,
}: GenerateMetadataProps = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${SEO_CONFIG.siteName}`
    : SEO_CONFIG.defaultTitle;

  const canonicalUrl = canonical || SEO_CONFIG.siteUrl;

  const metadata: Metadata = {
    metadataBase: new URL(SEO_CONFIG.siteUrl),
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: SEO_CONFIG.siteName, url: SEO_CONFIG.siteUrl }],
    creator: SEO_CONFIG.siteName,
    publisher: SEO_CONFIG.siteName,
    applicationName: SEO_CONFIG.siteName,
    category: "Web Development and Design",
    classification: "Business",
    robots: noindex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    openGraph: {
      type: ogType,
      locale: "en_ZA",
      url: canonicalUrl,
      siteName: SEO_CONFIG.siteName,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
          type: "image/jpeg",
        },
      ],
      countryName: "South Africa",
      emails: [SEO_CONFIG.companyInfo.contact.email],
      phoneNumbers: [SEO_CONFIG.companyInfo.contact.phone],
    },
    twitter: {
      card: "summary_large_image",
      site: SEO_CONFIG.twitterHandle,
      creator: SEO_CONFIG.twitterHandle,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    verification: {
      google: "your-google-site-verification-code", // Add your verification code
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    other: {
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
      "apple-mobile-web-app-title": SEO_CONFIG.siteName,
      "format-detection": "telephone=no",
      "mobile-web-app-capable": "yes",
      "msapplication-TileColor": "#D43F52",
      "theme-color": "#D43F52",
      "og:locality": SEO_CONFIG.companyInfo.address.city,
      "og:region": SEO_CONFIG.companyInfo.address.region,
      "og:postal-code": SEO_CONFIG.companyInfo.address.postalCode,
      "og:country-name": SEO_CONFIG.companyInfo.address.country,
      "geo.region": "ZA-GP",
      "geo.placename": "Johannesburg",
      "geo.position": "-26.1367;28.0136",
      "ICBM": "-26.1367, 28.0136",
    },
  };

  return metadata;
}

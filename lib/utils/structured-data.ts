import { SEO_CONFIG } from "@/lib/config/seo-config";

// Organization Schema
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO_CONFIG.companyInfo.name,
    legalName: SEO_CONFIG.companyInfo.legalName,
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}/logo.webp`,
    description: SEO_CONFIG.defaultDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: SEO_CONFIG.companyInfo.address.street,
      addressLocality: SEO_CONFIG.companyInfo.address.city,
      addressRegion: SEO_CONFIG.companyInfo.address.region,
      postalCode: SEO_CONFIG.companyInfo.address.postalCode,
      addressCountry: SEO_CONFIG.companyInfo.address.country,
    },
    // Email intentionally omitted from public structured data to keep it
    // away from scrapers; contact happens via the form or assembled-in-browser
    // mailto links.
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SEO_CONFIG.companyInfo.contact.phone,
      contactType: "Customer Service",
      areaServed: "ZA",
      availableLanguage: ["English"],
    },
    sameAs: [
      SEO_CONFIG.companyInfo.social.linkedin,
      SEO_CONFIG.companyInfo.social.twitter,
      SEO_CONFIG.companyInfo.social.facebook,
      SEO_CONFIG.companyInfo.social.instagram,
    ],
  };
}

// LocalBusiness Schema
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SEO_CONFIG.siteUrl,
    name: SEO_CONFIG.companyInfo.name,
    image: `${SEO_CONFIG.siteUrl}/logo.webp`,
    telephone: SEO_CONFIG.companyInfo.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SEO_CONFIG.companyInfo.address.street,
      addressLocality: SEO_CONFIG.companyInfo.address.city,
      addressRegion: SEO_CONFIG.companyInfo.address.region,
      postalCode: SEO_CONFIG.companyInfo.address.postalCode,
      addressCountry: SEO_CONFIG.companyInfo.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -26.1367,
      longitude: 28.0136,
    },
    url: SEO_CONFIG.siteUrl,
    priceRange: "R50000 - R500000",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
  };
}

// Service Schema
export function getServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Web Development and Design",
    provider: {
      "@type": "Organization",
      name: SEO_CONFIG.companyInfo.name,
      url: SEO_CONFIG.siteUrl,
    },
    areaServed: {
      "@type": "Country",
      name: "South Africa",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Development",
            description:
              "Custom website development with modern technologies and responsive design",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Development",
            description:
              "Native and cross-platform mobile application development for iOS and Android",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "E-commerce Solutions",
            description:
              "Complete e-commerce website development with payment integration and inventory management",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI/UX Design",
            description:
              "User interface and user experience design services for web and mobile applications",
          },
        },
      ],
    },
  };
}

// WebSite Schema
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    description: SEO_CONFIG.defaultDescription,
    publisher: {
      "@type": "Organization",
      name: SEO_CONFIG.companyInfo.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SEO_CONFIG.siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// BreadcrumbList Schema
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// FAQ Schema
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

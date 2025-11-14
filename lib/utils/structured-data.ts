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
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SEO_CONFIG.companyInfo.contact.phone,
      email: SEO_CONFIG.companyInfo.contact.email,
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
    email: SEO_CONFIG.companyInfo.contact.email,
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

// Aggregate Rating Schema
export function getAggregateRatingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO_CONFIG.companyInfo.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "50",
    },
  };
}

// Professional Service Schema
export function getProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SEO_CONFIG.companyInfo.name,
    image: `${SEO_CONFIG.siteUrl}/logo.webp`,
    "@id": SEO_CONFIG.siteUrl,
    url: SEO_CONFIG.siteUrl,
    telephone: SEO_CONFIG.companyInfo.contact.phone,
    priceRange: "R50000 - R500000",
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

// Home Page FAQs
export function getHomePageFAQs() {
  return getFAQSchema([
    {
      question: "What services does Blackbox Designs offer?",
      answer:
        "Blackbox Designs offers comprehensive digital solutions including web development, mobile app development, UI/UX design, custom software development, e-commerce solutions, digital marketing, and brand strategy. We specialize in creating modern, scalable, and user-friendly digital experiences for businesses across South Africa.",
    },
    {
      question: "How long does it take to develop a website?",
      answer:
        "Our average project delivery time is 2 weeks for standard websites. However, the timeline can vary depending on the complexity of your project. Simple websites can be completed in 1-2 weeks, while complex web applications may take 4-8 weeks. We provide detailed timelines during our consultation phase.",
    },
    {
      question: "Where is Blackbox Designs located?",
      answer:
        "Blackbox Designs is based in Johannesburg, South Africa, specifically in Northwold, Gauteng. While we serve clients across South Africa, we're available for in-person meetings in the Johannesburg area. We also work with clients remotely throughout the country.",
    },
    {
      question: "What is the typical cost for web development services?",
      answer:
        "Our web development services typically range from R50,000 to R500,000 depending on the scope, complexity, and features required. We offer customized quotes based on your specific needs. Contact us for a free consultation and detailed quote for your project.",
    },
    {
      question: "Do you provide ongoing support after project completion?",
      answer:
        "Yes, we provide comprehensive ongoing support and maintenance services. We ensure 100% on-time delivery and offer post-launch support to help your business grow. Our support packages include bug fixes, updates, performance monitoring, and feature enhancements.",
    },
    {
      question: "What technologies do you use for web development?",
      answer:
        "We use cutting-edge technologies including React, Next.js, TypeScript, Node.js, and modern frameworks to build high-performance, scalable web applications. We select the best technology stack based on your specific project requirements to ensure optimal results.",
    },
  ]);
}

// ItemList Schema for Services
export function getServicesItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Web Development and Design Services",
    description: "Comprehensive digital solutions offered by Blackbox Designs",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Web Development",
        description:
          "Custom websites and web applications built with cutting-edge technologies for optimal performance",
        url: `${SEO_CONFIG.siteUrl}/services#web-development`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Mobile App Development",
        description:
          "Native and cross-platform mobile applications that deliver seamless user experiences",
        url: `${SEO_CONFIG.siteUrl}/services#mobile-apps`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "UI/UX Design",
        description:
          "Beautiful, intuitive interfaces that engage users and drive conversions",
        url: `${SEO_CONFIG.siteUrl}/services#ui-ux-design`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Custom Software Development",
        description:
          "Tailored software solutions designed to solve your unique business challenges",
        url: `${SEO_CONFIG.siteUrl}/services#custom-software`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Digital Marketing",
        description:
          "Strategic marketing campaigns that boost your online presence and drive growth",
        url: `${SEO_CONFIG.siteUrl}/services#digital-marketing`,
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Brand Strategy",
        description:
          "Comprehensive branding solutions that make your business stand out from the crowd",
        url: `${SEO_CONFIG.siteUrl}/services#brand-strategy`,
      },
    ],
  };
}

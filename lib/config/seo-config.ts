export const SEO_CONFIG = {
  siteName: "Blackbox Designs",
  siteUrl: "https://www.blackboxdesigns.co.za",
  defaultTitle: "Blackbox Designs | Professional Web Development & Design Agency in South Africa",
  defaultDescription:
    "Leading web development and digital design agency in Johannesburg, South Africa. We create stunning websites, mobile apps, and digital solutions for businesses. Expert UI/UX design, e-commerce, and custom web applications.",
  defaultKeywords: [
    // Core services
    "web development South Africa",
    "web design Johannesburg",
    "mobile app development",
    "UI/UX design",
    "digital agency South Africa",
    // Specific services
    "e-commerce website development",
    "custom web applications",
    "responsive web design",
    "website redesign",
    "API development",
    // Location-based
    "web developers Johannesburg",
    "website design company South Africa",
    "Johannesburg web agency",
    // Business type
    "professional web development",
    "business website design",
    "corporate website development",
    "startup web development",
  ],
  ogImage: "/og-image.jpg",
  twitterHandle: "@blackboxdesigns",
  companyInfo: {
    name: "Blackbox Designs",
    legalName: "Blackbox Designs (Pty) Ltd",
    address: {
      street: "142 Elinta Avenue, Northwold",
      city: "Johannesburg",
      region: "Gauteng",
      postalCode: "2192",
      country: "South Africa",
    },
    contact: {
      email: "info@blackboxdesigns.co.za",
      phone: "+27615314470",
    },
    social: {
      linkedin: "https://www.linkedin.com/company/blackbox-designs",
      twitter: "https://twitter.com/blackboxdesigns",
      facebook: "https://www.facebook.com/blackboxdesigns",
      instagram: "https://www.instagram.com/blackboxdesigns",
    },
  },
};

export const PAGE_METADATA = {
  home: {
    title: "Blackbox Designs | Professional Web Development & Design Agency",
    description:
      "Transform your digital presence with Blackbox Designs. We create stunning websites, mobile apps, and digital solutions for businesses across South Africa. Expert web development, UI/UX design, and e-commerce solutions.",
    keywords: [
      ...SEO_CONFIG.defaultKeywords,
      "best web development agency South Africa",
      "top web designers Johannesburg",
    ],
  },
  about: {
    title: "About Us | Blackbox Designs - Your Digital Innovation Partner",
    description:
      "Meet the team behind Blackbox Designs. We're a passionate group of developers and designers committed to delivering exceptional digital solutions. Learn about our mission, values, and approach to web development.",
    keywords: [
      "about blackbox designs",
      "web development team Johannesburg",
      "digital agency team",
      "web design company about",
    ],
  },
  services: {
    title: "Our Services | Web Development, Design & Digital Solutions",
    description:
      "Comprehensive web development and design services: Custom websites, mobile apps, e-commerce solutions, UI/UX design, API development, and ongoing maintenance. Tailored solutions for your business needs.",
    keywords: [
      ...SEO_CONFIG.defaultKeywords,
      "web development services",
      "website design packages",
      "mobile app development services",
      "e-commerce development",
    ],
  },
  portfolio: {
    title: "Portfolio | Our Work & Case Studies | Blackbox Designs",
    description:
      "Explore our portfolio of successful web development and design projects. View case studies of websites, mobile apps, and digital solutions we've created for businesses across various industries.",
    keywords: [
      "web development portfolio",
      "website design examples",
      "mobile app portfolio",
      "case studies",
      "client work",
    ],
  },
  contact: {
    title: "Contact Us | Get Your Free Consultation | Blackbox Designs",
    description:
      "Ready to start your project? Contact Blackbox Designs for a free consultation. Located in Johannesburg, serving clients across South Africa. Email, call, or visit us today.",
    keywords: [
      "contact web developer Johannesburg",
      "web design consultation",
      "get a quote",
      "hire web developers",
      "Johannesburg web agency contact",
    ],
  },
};

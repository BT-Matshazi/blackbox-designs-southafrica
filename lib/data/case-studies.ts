import { CaseStudy } from "@/src/application/domain/case-study.domain";

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    slug: "techvision-website-redesign",
    title: "TechVision Website Redesign - 40% Conversion Increase",
    client: "TechVision",
    industry: "Technology",
    projectType: "Website Redesign",
    duration: "8 weeks",
    completedDate: "March 2024",
    excerpt:
      "Complete website redesign that increased conversions by 40% and improved user engagement by 60%. Modern design with improved UX and performance.",
    heroImage: {
      url: "https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "TechVision website on multiple devices",
    },
    beforeImage: {
      url: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Old TechVision website design",
    },
    afterImage: {
      url: "https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "New TechVision website design",
    },
    challenge: {
      title: "Outdated Design Hurting Conversions",
      description:
        "TechVision's website had an outdated design that didn't reflect their innovative tech solutions. The site suffered from poor navigation, slow load times, and a cluttered interface that confused visitors. Conversion rates were declining, and bounce rates were at an all-time high of 75%.",
    },
    solution: {
      title: "Modern, User-Centric Design with Performance Optimization",
      description:
        "We completely redesigned the website with a modern, clean aesthetic that aligns with TechVision's brand identity. The new design focuses on user experience with intuitive navigation, clear call-to-actions, and engaging visuals.",
      features: [
        "Responsive design optimized for all devices",
        "Interactive product demonstrations",
        "Streamlined user journey with clear CTAs",
        "Performance optimization reducing load time by 70%",
        "Integrated analytics and conversion tracking",
        "Modern Next.js architecture with SSR",
        "Accessibility improvements (WCAG 2.1 AA compliant)",
      ],
    },
    results: [
      {
        metric: "Conversion Rate",
        value: "+40%",
        description: "Increased from 2.5% to 3.5% within first month",
      },
      {
        metric: "Page Load Time",
        value: "70% Faster",
        description: "Reduced from 6.2s to 1.8s average load time",
      },
      {
        metric: "Bounce Rate",
        value: "-45%",
        description: "Decreased from 75% to 41% bounce rate",
      },
      {
        metric: "User Engagement",
        value: "+60%",
        description: "Average session duration increased from 2:15 to 3:36",
      },
    ],
    testimonial: {
      quote:
        "Working with Blackbox Designs transformed our online presence. Their team understood our vision perfectly and delivered a website that exceeded our expectations. Our conversion rates have increased by 40% since launch.",
      author: "Sarah Johnson",
      role: "CEO",
      company: "TechVision",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
    technologies: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
    ],
    services: ["Web Design", "Web Development", "UI/UX Design", "SEO"],
    metrics: [
      {
        label: "Conversion Rate",
        value: "3.5%",
        change: "+40%",
      },
      {
        label: "Page Speed",
        value: "95/100",
        change: "+70pts",
      },
      {
        label: "User Satisfaction",
        value: "4.8/5",
        change: "+1.2pts",
      },
      {
        label: "Revenue Impact",
        value: "R450k",
        change: "+R180k",
      },
    ],
    featured: true,
    websiteUrl: "https://techvision.example.com",
  },
  {
    id: "2",
    slug: "greeneats-mobile-app",
    title: "GreenEats Food Delivery App - 200% Order Growth",
    client: "GreenEats",
    industry: "Food & Beverage",
    projectType: "Mobile App Development",
    duration: "12 weeks",
    completedDate: "February 2024",
    excerpt:
      "Native mobile app for food delivery service that increased orders by 200% and achieved 4.9-star rating in app stores. Seamless ordering experience with real-time tracking.",
    heroImage: {
      url: "https://images.pexels.com/photos/6231789/pexels-photo-6231789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "GreenEats mobile app interface",
    },
    beforeImage: {
      url: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Old ordering system",
    },
    afterImage: {
      url: "https://images.pexels.com/photos/6231789/pexels-photo-6231789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "New GreenEats mobile app",
    },
    challenge: {
      title: "Clunky Ordering Process Limiting Growth",
      description:
        "GreenEats was relying on a web-based ordering system that wasn't optimized for mobile users. Customers complained about the complicated checkout process, lack of order tracking, and poor payment integration. The company was losing customers to competitors with better mobile experiences.",
    },
    solution: {
      title: "Intuitive Mobile-First Food Delivery Platform",
      description:
        "We developed native iOS and Android apps with a focus on speed, simplicity, and user delight. The app features an intuitive interface, one-tap ordering for favorites, real-time order tracking, and seamless payment integration.",
      features: [
        "One-tap reordering for favorite meals",
        "Real-time order tracking with map integration",
        "Multiple payment options (card, mobile money, cash)",
        "Push notifications for order updates",
        "In-app chat with delivery drivers",
        "Loyalty rewards program integration",
        "Dietary preferences and allergy filters",
        "Restaurant ratings and reviews",
      ],
    },
    results: [
      {
        metric: "Order Volume",
        value: "+200%",
        description: "Daily orders increased from 150 to 450",
      },
      {
        metric: "App Store Rating",
        value: "4.9/5",
        description: "Achieved top ratings on iOS and Android",
      },
      {
        metric: "Average Order Value",
        value: "+35%",
        description: "Increased from R180 to R243 per order",
      },
      {
        metric: "Customer Retention",
        value: "+80%",
        description: "Monthly active users retention improved significantly",
      },
    ],
    testimonial: {
      quote:
        "The mobile app Blackbox designed for our food delivery service has been a game-changer. The intuitive design and smooth functionality have received overwhelmingly positive feedback from our customers. Our orders have tripled!",
      author: "Michael Chen",
      role: "Founder",
      company: "GreenEats",
      avatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
    technologies: [
      "React Native",
      "Node.js",
      "PostgreSQL",
      "Firebase",
      "Stripe",
      "Google Maps API",
    ],
    services: [
      "Mobile App Development",
      "UI/UX Design",
      "Backend Development",
      "Payment Integration",
    ],
    metrics: [
      {
        label: "Daily Orders",
        value: "450",
        change: "+200%",
      },
      {
        label: "User Rating",
        value: "4.9★",
        change: "+1.2★",
      },
      {
        label: "Avg Order Value",
        value: "R243",
        change: "+R63",
      },
      {
        label: "Retention Rate",
        value: "78%",
        change: "+35%",
      },
    ],
    featured: true,
  },
  {
    id: "3",
    slug: "boutique-co-ecommerce",
    title: "Boutique Co. E-commerce - 150% Sales Increase",
    client: "Boutique Co.",
    industry: "Retail & Fashion",
    projectType: "E-commerce Development",
    duration: "10 weeks",
    completedDate: "January 2024",
    excerpt:
      "Custom e-commerce platform that increased online sales by 150% with beautiful product displays, smooth checkout, and inventory management.",
    heroImage: {
      url: "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Boutique Co. e-commerce website",
    },
    beforeImage: {
      url: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Old Boutique Co. website",
    },
    afterImage: {
      url: "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "New Boutique Co. e-commerce site",
    },
    challenge: {
      title: "Limited Online Sales Capability",
      description:
        "Boutique Co. had a basic website that didn't showcase their beautiful fashion products effectively. The checkout process was confusing, inventory management was manual, and there was no way to track customer behavior. Cart abandonment rate was extremely high at 85%.",
    },
    solution: {
      title: "Elegant E-commerce Platform with Smart Features",
      description:
        "We built a beautiful, conversion-optimized e-commerce platform that showcases Boutique Co.'s products in the best light. The solution includes smart product recommendations, streamlined checkout, and comprehensive analytics.",
      features: [
        "High-quality product image galleries with zoom",
        "Smart product recommendations based on behavior",
        "One-page checkout process",
        "Inventory management system",
        "Customer accounts with order history",
        "Wishlist and save for later functionality",
        "Size guide and fit recommendations",
        "Social media integration for sharing",
        "Abandoned cart recovery emails",
      ],
    },
    results: [
      {
        metric: "Online Sales",
        value: "+150%",
        description: "Revenue increased from R850k to R2.1M in 3 months",
      },
      {
        metric: "Cart Abandonment",
        value: "-52%",
        description: "Reduced from 85% to 41% abandonment rate",
      },
      {
        metric: "Average Order Value",
        value: "+45%",
        description: "Increased from R680 to R986 per order",
      },
      {
        metric: "Customer Satisfaction",
        value: "4.7/5",
        description: "Measured through post-purchase surveys",
      },
    ],
    testimonial: {
      quote:
        "The e-commerce solution Blackbox developed for us has revolutionized our online sales. The site is not only beautiful but also incredibly user-friendly, leading to a significant increase in sales and customer satisfaction.",
      author: "Emma Wilson",
      role: "Marketing Director",
      company: "Boutique Co.",
      avatar:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
    technologies: [
      "Next.js",
      "Shopify API",
      "Stripe",
      "PostgreSQL",
      "AWS S3",
      "SendGrid",
    ],
    services: [
      "E-commerce Development",
      "Web Design",
      "Payment Integration",
      "Email Marketing Setup",
    ],
    metrics: [
      {
        label: "Monthly Revenue",
        value: "R2.1M",
        change: "+150%",
      },
      {
        label: "Conversion Rate",
        value: "4.2%",
        change: "+2.1%",
      },
      {
        label: "Avg Order",
        value: "R986",
        change: "+45%",
      },
      {
        label: "Return Customers",
        value: "62%",
        change: "+38%",
      },
    ],
    featured: true,
    websiteUrl: "https://boutiqueco.example.com",
  },
];

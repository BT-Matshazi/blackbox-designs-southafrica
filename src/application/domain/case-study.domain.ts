export interface CaseStudyMetric {
  label: string;
  value: string;
  change: string; // e.g., "+40%" or "60% faster"
  icon?: string;
}

export interface CaseStudyChallenge {
  title: string;
  description: string;
}

export interface CaseStudySolution {
  title: string;
  description: string;
  features: string[];
}

export interface CaseStudyResult {
  metric: string;
  value: string;
  description: string;
}

export interface CaseStudyTestimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface CaseStudyImage {
  url: string;
  alt: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  projectType: string;
  duration: string;
  completedDate: string;
  excerpt: string;
  heroImage: CaseStudyImage;
  beforeImage?: CaseStudyImage;
  afterImage?: CaseStudyImage;
  challenge: CaseStudyChallenge;
  solution: CaseStudySolution;
  results: CaseStudyResult[];
  testimonial: CaseStudyTestimonial;
  technologies: string[];
  services: string[];
  metrics: CaseStudyMetric[];
  gallery?: CaseStudyImage[];
  featured: boolean;
  websiteUrl?: string;
}

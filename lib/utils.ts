import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { render } from "@react-email/render";
import { ReactElement } from "react";

import { z } from "zod";

export const renderEmailTemplate = async <T extends object>(
  Component: React.FC<T>,
  props: T
): Promise<string> => {
  return await render(Component(props) as ReactElement, {
    pretty: true,
  });
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


// Multi-step form schema
export const onboardingSchema = z.object({
  // Step 1: Contact Information
  contactName: z.string().min(2, "Name must be at least 2 characters"),
  contactEmail: z.string().email("Please enter a valid email address"),
  contactPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  companyName: z.string().min(2, "Company name is required"),

  // Step 2: Business & Vision
  mainGoal: z.string().min(10, "Please describe your main goal"),
  primaryAudience: z.string().min(10, "Please describe your target audience"),
  problemSolving: z
    .string()
    .min(10, "Please describe the problem you're solving"),
  differentiation: z
    .string()
    .min(10, "Please describe what makes you different"),
  brandIdentity: z.string().optional(),
  websiteTone: z.string().optional(),

  // Step 3: Functionality & Features
  speakerInfo: z.string().optional(),
  approvalProcess: z.string().optional(),
  speakerEditProfile: z.string().optional(),
  speakerLogin: z.string().optional(),
  corporateDetails: z.string().optional(),
  clientBrowsing: z.string().optional(),
  bookingType: z.string().optional(),
  emailNotifications: z.string().optional(),
  adminManagement: z.string().optional(),
  needAnalytics: z.string().optional(),
  automatedEmails: z.string().optional(),

  // Step 4: Content & Structure
  desiredPages: z.string().min(5, "Please list your desired pages"),
  contentReady: z.string().min(1, "Please indicate if content is ready"),
  needBlog: z.string().optional(),
  needTestimonials: z.string().optional(),
  haveDomain: z.string().optional(),
  needPayments: z.string().optional(),

  // Step 5: Design & Branding
  haveBrandMaterials: z
    .string()
    .min(1, "Please indicate if you have brand materials"),
  referenceWebsites: z.string().optional(),
  designStyle: z.string().optional(),
  colorThemes: z.string().optional(),

  // Step 6: Timeline & Budget
  launchDate: z.string().min(1, "Launch date is required"),
  budgetRange: z.string().min(1, "Budget range is required"),
  needMaintenance: z.string().min(1, "Please indicate maintenance needs"),
  needTraining: z.string().optional(),

  // Step 7: Future Expansion
  futureFeatures: z.string().optional(),
  additionalNotes: z.string().optional(),
});
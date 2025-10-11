"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  ChevronRight,
  Send,
  Loader2,
  CheckCircle2,
  Rocket,
  Users,
  Settings,
  FileText,
  Palette,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Step1ContactInfo,
  Step2BusinessVision,
  Step3Functionality,
  Step4ContentStructure,
  Step5DesignBranding,
  Step6TimelineBudget,
  Step7FutureExpansion,
} from "@/components/onboarding/form-steps";
import { onboardingSchema } from "@/lib/utils";

const STORAGE_KEY = "client-onboarding-draft";


type OnboardingFormData = z.infer<typeof onboardingSchema>;

const steps = [
  {
    id: 1,
    title: "Contact Information",
    icon: Users,
    description: "Let's start with your details",
  },
  {
    id: 2,
    title: "Business & Vision",
    icon: Rocket,
    description: "Your goals and audience",
  },
  {
    id: 3,
    title: "Functionality",
    icon: Settings,
    description: "Features you need",
  },
  {
    id: 4,
    title: "Content & Structure",
    icon: FileText,
    description: "Pages and content",
  },
  {
    id: 5,
    title: "Design & Branding",
    icon: Palette,
    description: "Visual identity",
  },
  {
    id: 6,
    title: "Timeline & Budget",
    icon: Calendar,
    description: "Project planning",
  },
  {
    id: 7,
    title: "Future Plans",
    icon: TrendingUp,
    description: "Growth and expansion",
  },
];

export default function Page() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      companyName: "",
      mainGoal: "",
      primaryAudience: "",
      problemSolving: "",
      differentiation: "",
      brandIdentity: "need-help",
      websiteTone: "",
      approvalProcess: "unsure",
      speakerEditProfile: "unsure",
      speakerLogin: "unsure",
      clientBrowsing: "unsure",
      bookingType: "unsure",
      emailNotifications: "unsure",
      needAnalytics: "unsure",
      automatedEmails: "unsure",
      contentReady: "need-help",
      needBlog: "maybe",
      needTestimonials: "maybe",
      haveDomain: "need-help",
      needPayments: "unsure",
      needMaintenance: "unsure",
      needTraining: "unsure",
    },
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        form.reset(data.formData);
        setCurrentStep(data.currentStep || 1);
        console.log("[Onboarding] Restored from localStorage");
        toast.info("Your progress has been restored!");
      } catch (error) {
        console.error("[Onboarding] Failed to parse saved data:", error);
      }
    }
  }, [form]);

  // Save to localStorage on every change
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          formData: value,
          currentStep,
          lastSaved: new Date().toISOString(),
        })
      );
    });
    return () => subscription.unsubscribe();
  }, [form, currentStep]);

  const progress = (currentStep / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = async (data: OnboardingFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsComplete(true);
        localStorage.removeItem(STORAGE_KEY);
        toast.success("Thank you! Your onboarding form has been submitted.");
      } else {
        toast.error("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("[Onboarding] Submission error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center shadow-xl"
        >
          <CheckCircle2 className="w-20 h-20 mx-auto text-green-500 mb-6" />
          <h1 className="text-3xl font-bold mb-4">All Set!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for completing the onboarding form. We've received your
            information and will get back to you within 24 hours with a detailed
            proposal.
          </p>
          <Button onClick={() => (window.location.href = "/")} size="lg">
            Back to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Client Onboarding</h1>
          <p className="text-muted-foreground text-lg">
            Let's build something amazing together
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Steps Navigation */}
        <div className="grid grid-cols-7 gap-2 mb-8">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`p-3 rounded-lg border transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary"
                    : isCompleted
                    ? "bg-primary/10 border-primary/20"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                <Icon
                  className={`w-5 h-5 mx-auto ${
                    isActive || isCompleted ? "" : "opacity-50"
                  }`}
                />
                <span className="text-xs mt-1 block truncate">{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Form Card */}
        <motion.div
          key={currentStep}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          className="bg-card border border-border rounded-2xl p-8 shadow-lg"
        >
          <div className="mb-6">
            <Badge className="mb-3">Step {currentStep}</Badge>
            <h2 className="text-2xl font-bold mb-2">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-muted-foreground">
              {steps[currentStep - 1].description}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <AnimatePresence mode="wait">
                {currentStep === 1 && <Step1ContactInfo control={form.control} />}
                {currentStep === 2 && <Step2BusinessVision control={form.control} />}
                {currentStep === 3 && <Step3Functionality control={form.control} />}
                {currentStep === 4 && <Step4ContentStructure control={form.control} />}
                {currentStep === 5 && <Step5DesignBranding control={form.control} />}
                {currentStep === 6 && <Step6TimelineBudget control={form.control} />}
                {currentStep === 7 && <Step7FutureExpansion control={form.control} />}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < steps.length ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </motion.div>

        {/* Auto-save indicator */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          💾 Your progress is automatically saved
        </p>
      </div>
    </div>
  );
}

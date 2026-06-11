"use client";

import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Reveal } from "@/components/reveal";
import { ObfuscatedEmail } from "@/components/obfuscated-email";
import { Button } from "@/components/ui/button";
import { whatsappLink, PHONE_NUMBER, PHONE_DISPLAY } from "@/lib/contact";
import { trackLead, trackContactClick } from "@/lib/analytics";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  CheckCircle,
  Loader2,
  Upload,
  X,
  FileText,
  MessageCircle,
} from "lucide-react";
import { contactUsController } from "@/src/presentation/controllers/contact-us.controller";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "image/jpeg",
  "image/png",
  "image/jpg",
];

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Please enter your name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.string().optional(),
  budgetRange: z.string().optional(),
  message: z
    .string()
    .min(10, { message: "Please add a little more detail (10+ characters)" }),
  // Honeypot field - should always be empty
  website: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// Bumped to v2 — the field shape changed (single name field).
const FORM_STORAGE_KEY = "contact-form-draft-v2";

// Split a single "name" field into the first/last the backend expects.
function splitName(fullName: string) {
  const parts = fullName.trim().replace(/\s+/g, " ").split(" ");
  const firstName = parts.shift() ?? "";
  return { firstName, lastName: parts.join(" ") };
}

const PROJECT_TYPES = [
  "Website Development",
  "Mobile App Development",
  "E-commerce Solution",
  "UI/UX Design",
  "Web Application",
  "API Development",
  "Maintenance & Support",
  "Consulting",
  "Other",
];

const BUDGET_RANGES = [
  "Under R50,000",
  "R50,000 - R100,000",
  "R100,000 - R250,000",
  "R250,000 - R500,000",
  "R500,000+",
  "Not sure yet",
];

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      company: "",
      projectType: "",
      budgetRange: "",
      message: "",
      website: "", // Honeypot field
    },
  });

  // Load form data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(FORM_STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        form.reset(parsed);
        console.log("[ContactForm] Restored form data from localStorage");
      } catch (error) {
        console.error("[ContactForm] Failed to parse saved form data:", error);
      }
    }
  }, [form]);

  // Save form data to localStorage on every change
  useEffect(() => {
    const subscription = form.watch((value) => {
      // Don't save honeypot field
      const { website, ...dataToSave } = value;
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(dataToSave));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size must be less than 5MB");
      return;
    }

    // Validate file type
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      toast.error(
        "Please upload a PDF, Word document, text file, or image (JPG, PNG)"
      );
      return;
    }

    setUploadedFile(file);
    console.log("[ContactForm] File attached:", {
      name: file.name,
      size: file.size,
      type: file.type,
    });
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(2)} KB`;
    return `${(kb / 1024).toFixed(2)} MB`;
  };

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);

    // Honeypot check - if filled, it's a bot
    if (data.website) {
      console.warn("[ContactForm] Honeypot triggered - possible bot detected");
      // Pretend to submit successfully to fool bots
      setTimeout(() => {
        toast.success("Your message has been sent. We'll get back to you soon!");
        setIsSubmitting(false);
        setIsSubmitted(true);
        form.reset();
        setTimeout(() => {
          setIsSubmitted(false);
        }, 2000);
      }, 1000);
      return;
    }

    const { firstName, lastName } = splitName(data.name);
    const result = await contactUsController({
      firstName,
      lastName,
      email: data.email,
      phone: data.phone || "",
      message: data.message,
      company: data.company || "",
      projectType: data.projectType,
      budgetRange: data.budgetRange,
      attachmentName: uploadedFile?.name,
      attachmentSize: uploadedFile?.size,
      attachmentType: uploadedFile?.type,
    });

    if (result.success) {
      trackLead("contact_form", {
        projectType: data.projectType,
        budgetRange: data.budgetRange,
      });
      toast.success("Your message has been sent. We'll get back to you soon!");
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Clear localStorage and file
      localStorage.removeItem(FORM_STORAGE_KEY);
      removeFile();
      form.reset();

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } else {
      toast.error("Failed to send message. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get in Touch
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-muted-foreground text-lg mb-8">
                Ready to start your next project? Send a message for a free, no
                obligation quote — or chat with us instantly on WhatsApp.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactClick("whatsapp", "contact_section")}
                className="mb-10 inline-flex items-center gap-3 rounded-xl bg-[#25D366] px-6 py-4 font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5" />
                Chat with us on WhatsApp
              </a>
            </Reveal>

            <div className="space-y-6 mb-10">
              <Reveal delay={0.2}>
                <div className="flex items-start">
                  <div className="mt-1 mr-4 rounded-lg bg-accent/10 p-2 text-accent">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Our Location</h3>
                    <address className="not-italic text-muted-foreground">
                      142 Elinta Avenue, Northwold
                      <br />
                      Johannesburg, South Africa
                    </address>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="flex items-start">
                  <div className="mt-1 mr-4 rounded-lg bg-accent/10 p-2 text-accent">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Email Us</h3>
                    <ObfuscatedEmail
                      location="contact_section"
                      className="text-muted-foreground transition-colors hover:text-accent"
                    />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="flex items-start">
                  <div className="mt-1 mr-4 rounded-lg bg-accent/10 p-2 text-accent">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Call Us</h3>
                    <Link
                      href={`tel:${PHONE_NUMBER}`}
                      onClick={() => trackContactClick("phone", "contact_section")}
                      className="text-muted-foreground transition-colors hover:text-accent"
                    >
                      {PHONE_DISPLAY}
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div>
            <Reveal direction="right">
              <div className="bg-card p-8 rounded-xl border border-border">
                <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center h-[600px] text-center"
                  >
                    <CheckCircle className="h-16 w-16 text-primary mb-4" />
                    <h4 className="text-xl font-semibold mb-2">
                      Message Sent!
                    </h4>
                    <p className="text-muted-foreground">
                      Thanks for reaching out. We'll get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Your email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone / WhatsApp (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your number"
                                  type="tel"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Your company" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="projectType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Project Type (Optional)</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {PROJECT_TYPES.map((type) => (
                                    <SelectItem key={type} value={type}>
                                      {type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="budgetRange"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Budget Range (Optional)</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select range" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {BUDGET_RANGES.map((range) => (
                                    <SelectItem key={range} value={range}>
                                      {range}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Honeypot field - hidden from real users */}
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem className="hidden" aria-hidden="true">
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your website"
                                tabIndex={-1}
                                autoComplete="off"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your project..."
                                className="resize-none min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* File Upload */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Attach Project Brief (Optional)
                        </label>
                        <p className="text-[0.8rem] text-muted-foreground">
                          Upload a file (PDF, Word, Image - Max 5MB)
                        </p>

                        {!uploadedFile ? (
                          <div className="relative">
                            <input
                              ref={fileInputRef}
                              type="file"
                              onChange={handleFileChange}
                              accept={ACCEPTED_FILE_TYPES.join(",")}
                              className="hidden"
                              id="file-upload"
                            />
                            <label
                              htmlFor="file-upload"
                              className="flex items-center justify-center w-full h-24 px-4 transition bg-background border-2 border-border border-dashed rounded-md appearance-none cursor-pointer hover:border-primary/50 focus:outline-none"
                            >
                              <div className="flex flex-col items-center space-y-2">
                                <Upload className="w-6 h-6 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  Click to upload file
                                </span>
                              </div>
                            </label>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between p-3 border border-border rounded-md bg-muted/50">
                            <div className="flex items-center space-x-3">
                              <FileText className="w-5 h-5 text-primary" />
                              <div>
                                <p className="text-sm font-medium">
                                  {uploadedFile.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {formatFileSize(uploadedFile.size)}
                                </p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={removeFile}
                              className="h-8 w-8 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full group"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

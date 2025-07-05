"use client";

import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MapPin, Mail, Phone, Send, CheckCircle } from "lucide-react";

const contactFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
  company: z.string().optional(),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      company: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Your message has been sent. We'll get back to you soon!");
      console.log(data);

      // Reset form after 2 seconds
      setTimeout(() => {
        form.reset();
        setIsSubmitted(false);
      }, 2000);
    }, 1500);
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
                Ready to start your next project? Contact us today for a free
                consultation.
              </p>
            </Reveal>

            <div className="space-y-6 mb-10">
              <Reveal delay={0.2}>
                <div className="flex items-start">
                  <div className="mt-1 mr-4 p-2 rounded-full bg-primary/10 text-primary">
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
                  <div className="mt-1 mr-4 p-2 rounded-full bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Email Us</h3>
                    <Link
                      href="mailto:info@blackboxdesigns.co.za"
                      className="text-muted-foreground"
                    >
                      info@blackboxdesigns.com
                    </Link>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="flex items-start">
                  <div className="mt-1 mr-4 p-2 rounded-full bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Call Us</h3>
                    <Link
                      href="tel:+27696376056"
                      className="text-muted-foreground"
                    >
                      +27 69 637 6056
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
                    className="flex flex-col items-center justify-center h-[360px] text-center"
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
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your first name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your last name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                      </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
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
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input 
                                placeholder="Your phone number"
                                type="tel"
                                {...field} />
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

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="How can we help you?"
                                className="resize-none min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full group"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5 }}
                            className="h-1 bg-white absolute bottom-0 left-0 rounded-full"
                          />
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

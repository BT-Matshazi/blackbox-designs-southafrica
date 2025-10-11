import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

export function Step1ContactInfo({ control }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <FormField
        control={control}
        name="contactName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your Name *</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="contactEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email Address *</FormLabel>
            <FormControl>
              <Input type="email" placeholder="john@company.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="contactPhone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number *</FormLabel>
            <FormControl>
              <Input type="tel" placeholder="+27 61 531 4470" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name *</FormLabel>
            <FormControl>
              <Input placeholder="Your Company" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
}

export function Step2BusinessVision({ control }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <FormField
        control={control}
        name="mainGoal"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Main Goal of the Website *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="e.g., brand awareness, lead generation, speaker booking..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              What do you want to achieve with this website?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="primaryAudience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary Audience *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="e.g., HR managers, corporate wellness teams, general public..."
                className="min-h-[80px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="problemSolving"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Problem You're Solving *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="What problem are you solving for companies and clients?"
                className="min-h-[80px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="differentiation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>What Makes You Different? *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="What sets you apart from competitors?"
                className="min-h-[80px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="brandIdentity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Brand Identity</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="have">I have logo, colors, and fonts</SelectItem>
                <SelectItem value="need-help">I need help creating it</SelectItem>
                <SelectItem value="none">I don't have anything yet</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="websiteTone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Website Tone & Style</FormLabel>
            <FormControl>
              <Input placeholder="e.g., corporate, medical, warm, trustworthy" {...field} />
            </FormControl>
            <FormDescription>How should your website feel?</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
}

export function Step3Functionality({ control }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <div className="bg-muted/50 p-4 rounded-lg mb-4">
        <h3 className="font-semibold mb-2">For Speakers (if applicable)</h3>
      </div>

      <FormField
        control={control}
        name="speakerInfo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Speaker Registration Information</FormLabel>
            <FormControl>
              <Textarea
                placeholder="What information should speakers provide? (name, field, certifications, availability, photo, CV, etc.)"
                className="min-h-[80px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="approvalProcess"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Approval Process for Speaker Profiles?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="yes">Yes, manual approval required</SelectItem>
                <SelectItem value="no">No, auto-approve</SelectItem>
                <SelectItem value="unsure">Not sure yet</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="speakerEditProfile"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Can speakers edit their own profiles?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="unsure">Not sure yet</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="bg-muted/50 p-4 rounded-lg mb-4 mt-6">
        <h3 className="font-semibold mb-2">For Corporate Clients</h3>
      </div>

      <FormField
        control={control}
        name="corporateDetails"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Corporate Client Request Details</FormLabel>
            <FormControl>
              <Textarea
                placeholder="What details should clients provide? (topic, date, company, location, audience size, format, etc.)"
                className="min-h-[80px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="clientBrowsing"
        render={({ field }) => (
          <FormItem>
            <FormLabel>How should clients find speakers?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="browse">Browse speakers directly</SelectItem>
                <SelectItem value="request-only">Request form only</SelectItem>
                <SelectItem value="both">Both options</SelectItem>
                <SelectItem value="unsure">Not sure yet</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="bookingType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Booking Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="instant">Instant booking</SelectItem>
                <SelectItem value="manual-approval">Manual approval by your team</SelectItem>
                <SelectItem value="unsure">Not sure yet</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="bg-muted/50 p-4 rounded-lg mb-4 mt-6">
        <h3 className="font-semibold mb-2">Admin & Back-office</h3>
      </div>

      <FormField
        control={control}
        name="adminManagement"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Admin Dashboard Requirements</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Who will manage the system? What features do you need? (approvals, speaker management, bookings, etc.)"
                className="min-h-[80px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="needAnalytics"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Need Analytics & Reporting?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="yes">Yes, detailed analytics</SelectItem>
                <SelectItem value="no">No, not needed</SelectItem>
                <SelectItem value="unsure">Not sure yet</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="automatedEmails"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Automated Email Notifications?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="yes">Yes, for all key actions</SelectItem>
                <SelectItem value="no">No, manual only</SelectItem>
                <SelectItem value="unsure">Not sure yet</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
}

export function Step4ContentStructure({ control }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <FormField
        control={control}
        name="desiredPages"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Desired Pages *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="e.g., Home, About, Services, Contact, Speaker Profiles, Booking Form, Blog..."
                className="min-h-[80px]"
                {...field}
              />
            </FormControl>
            <FormDescription>List all the pages you'd like on your website</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="contentReady"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Do you have content ready? *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="yes">Yes, all content is ready</SelectItem>
                <SelectItem value="partial">Some content is ready</SelectItem>
                <SelectItem value="no">No, need help with content</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>Text, images, videos, etc.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="needBlog"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Do you need a blog or resource section?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="maybe">Maybe later</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="needTestimonials"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Client Testimonials Section?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="maybe">Not sure yet</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
}

export function Step5DesignBranding({ control }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <FormField
        control={control}
        name="haveBrandMaterials"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Do you have brand materials? *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="yes">Yes, logo, colors, and fonts</SelectItem>
                <SelectItem value="partial">Yes, but incomplete</SelectItem>
                <SelectItem value="no">No, need full branding</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>Logo, color palette, typography, etc.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="referenceWebsites"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Reference Websites</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Share links to websites you like (design, layout, functionality)"
                className="min-h-[80px]"
                {...field}
              />
            </FormControl>
            <FormDescription>What websites inspire you?</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="designStyle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Design Style</FormLabel>
            <FormControl>
              <Input placeholder="e.g., modern, minimalist, bold, playful, corporate" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="colorThemes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Color Themes</FormLabel>
            <FormControl>
              <Input placeholder="e.g., blue and white, earth tones, vibrant colors" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
}

export function Step6TimelineBudget({ control }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <FormField
        control={control}
        name="launchDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Desired Launch Date *</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormDescription>When would you like the website to go live?</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="budgetRange"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Budget Range *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="under-50k">Under R50,000</SelectItem>
                <SelectItem value="50k-100k">R50,000 - R100,000</SelectItem>
                <SelectItem value="100k-200k">R100,000 - R200,000</SelectItem>
                <SelectItem value="200k-500k">R200,000 - R500,000</SelectItem>
                <SelectItem value="500k-plus">R500,000+</SelectItem>
                <SelectItem value="not-sure">Not sure yet</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="needMaintenance"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Need Ongoing Maintenance & Support? *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="yes">Yes, monthly support</SelectItem>
                <SelectItem value="as-needed">As needed (pay per request)</SelectItem>
                <SelectItem value="no">No, just build it</SelectItem>
                <SelectItem value="not-sure">Not sure yet</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="needTraining"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Need Training on Managing the Site?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="yes">Yes, full training</SelectItem>
                <SelectItem value="basic">Yes, basic overview</SelectItem>
                <SelectItem value="no">No, you manage it</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
}

export function Step7FutureExpansion({ control }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <FormField
        control={control}
        name="futureFeatures"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Future Features You're Considering</FormLabel>
            <FormControl>
              <Textarea
                placeholder="e.g., webinar hosting, rating system for speakers, subscriptions, mobile app, etc."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Any features you might want to add later? This helps us plan for scalability.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="additionalNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Notes or Questions</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Anything else we should know? Any specific concerns or requirements?"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Thank you for completing this onboarding questionnaire!</strong><br />
          Once you submit, we'll review your information and get back to you within 24-48 hours
          with a detailed proposal and next steps.
        </p>
      </div>
    </motion.div>
  );
}

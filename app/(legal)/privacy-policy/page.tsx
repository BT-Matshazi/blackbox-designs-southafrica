import { Metadata } from "next";
import { LegalPage, LegalList } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | BlackBox Designs",
  description:
    "How BlackBox Designs collects, uses, and protects your personal information.",
};

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      lede="At BlackBox Designs, we value the privacy of our visitors and are committed to protecting your personal information. This Privacy Policy outlines the types of personal information that is received and collected and how it is used."
      lastUpdated="October 25, 2023"
      sections={[
        {
          id: "information-we-collect",
          heading: "Information We Collect",
          body: (
            <>
              <p>We collect various types of information, including:</p>
              <LegalList
                items={[
                  "Personal information such as name, email address, and phone number, provided voluntarily through contact forms or other means.",
                  "Non-personal information such as IP addresses, browser details, and operating systems used, collected automatically through cookies and other tracking technologies.",
                ]}
              />
            </>
          ),
        },
        {
          id: "how-we-use-your-information",
          heading: "How We Use Your Information",
          body: (
            <>
              <p>
                We use the collected information for various purposes,
                including:
              </p>
              <LegalList
                items={[
                  "Providing, maintaining, and improving our services.",
                  "Responding to inquiries and communicating with visitors.",
                  "Analyzing trends and user behavior to enhance user experience.",
                  "Preventing and addressing technical issues.",
                ]}
              />
            </>
          ),
        },
        {
          id: "cookies",
          heading: "Cookies",
          body: (
            <p>
              We use cookies and similar tracking technologies to track the
              activity on our website and collect certain information. You can
              instruct your browser to refuse all cookies or to indicate when a
              cookie is being sent.
            </p>
          ),
        },
        {
          id: "third-party-links",
          heading: "Third-Party Links",
          body: (
            <p>
              Our website may contain links to third-party sites. We have no
              control over the content and privacy practices of these sites and
              encourage you to review their privacy policies.
            </p>
          ),
        },
        {
          id: "changes-to-this-policy",
          heading: "Changes to This Privacy Policy",
          body: (
            <p>
              We may update our Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page.
            </p>
          ),
        },
      ]}
    />
  );
}

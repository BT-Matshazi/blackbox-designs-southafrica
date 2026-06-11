import { Metadata } from "next";
import { LegalPage, LegalList } from "@/components/legal/legal-page";
import { ObfuscatedEmail } from "@/components/obfuscated-email";

export const metadata: Metadata = {
  title: "POPI Act Compliance | BlackBox Designs",
  description:
    "How BlackBox Designs complies with South Africa's Protection of Personal Information Act (POPI Act).",
};

const contactEmail = (
  <ObfuscatedEmail className="font-medium text-accent hover:underline" />
);

export default function Page() {
  return (
    <LegalPage
      title="POPI Act Compliance"
      lede="BlackBox Designs is committed to protecting the privacy of our customers and their personal information. We comply with the Protection of Personal Information Act (POPI Act), Act No 4 of 2013, which regulates the collection, processing, and storage of personal information by both public and private sector organizations."
      sections={[
        {
          id: "what-is-personal-information",
          heading: "What is personal information?",
          body: (
            <p>
              Personal information is any information that can be used to
              identify an individual, either directly or indirectly. This
              includes information such as name, address, contact information,
              date of birth, ID number, passport number, and financial
              information.
            </p>
          ),
        },
        {
          id: "collection-processing-storage",
          heading: "How we collect, process, and store information",
          body: (
            <>
              <p>
                BlackBox Designs collects personal information from our
                customers through a variety of channels, including our website,
                email, and telephone. We use this information to provide our
                services to our customers, to communicate with them about our
                services, and to improve our services.
              </p>
              <p>
                BlackBox Designs stores personal information in a secure
                manner. We take reasonable steps to protect personal
                information from unauthorized access, use, disclosure,
                modification, or destruction.
              </p>
            </>
          ),
        },
        {
          id: "your-rights",
          heading: "Your rights under the POPI Act",
          body: (
            <>
              <p>
                Under the POPI Act, you have the following rights with respect
                to your personal information:
              </p>
              <LegalList
                items={[
                  "The right to access your personal information",
                  "The right to request that your personal information be corrected or deleted",
                  "The right to object to the processing of your personal information",
                ]}
              />
            </>
          ),
        },
        {
          id: "exercise-your-rights",
          heading: "How to exercise your rights",
          body: (
            <p>
              If you wish to exercise any of your rights under the POPI Act,
              please contact us at {contactEmail}.
            </p>
          ),
        },
        {
          id: "data-breaches",
          heading: "Data breaches",
          body: (
            <p>
              In the event of a data breach, BlackBox Designs will promptly
              notify the Information Regulator and all affected individuals. We
              will also take steps to mitigate the effects of the data breach
              and to prevent similar incidents from happening in the future.
            </p>
          ),
        },
        {
          id: "contact-us",
          heading: "Contact us",
          body: (
            <p>
              If you have any questions about our POPI Act compliance, please
              contact us at {contactEmail}.
            </p>
          ),
        },
      ]}
    />
  );
}

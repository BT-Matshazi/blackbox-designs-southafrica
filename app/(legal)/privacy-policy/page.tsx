import React from "react";
import Header from "@/common/header/header";
import Footer from "@/common/footer/footer";

export default function Page() {
  return (
    <>
      <Header />
      <div className="w-2xl mx-auto bg-white p-10 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4">
          At Your BlackBox Designs, we value the privacy of our visitors and are
          committed to protecting your personal information. This Privacy Policy
          outlines the types of personal information that is received and
          collected and how it is used.
        </p>

        <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
        <p className="mb-4">
          We collect various types of information, including:
        </p>
        <ul className="list-disc ml-8 mb-4">
          <li>
            Personal information such as name, email address, and phone number,
            provided voluntarily through contact forms or other means.
          </li>
          <li>
            Non-personal information such as IP addresses, browser details, and
            operating systems used, collected automatically through cookies and
            other tracking technologies.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">
          How We Use Your Information
        </h2>
        <p className="mb-4">
          We use the collected information for various purposes, including:
        </p>
        <ul className="list-disc ml-8 mb-4">
          <li>Providing, maintaining, and improving our services.</li>
          <li>Responding to inquiries and communicating with visitors.</li>
          <li>
            Analyzing trends and user behavior to enhance user experience.
          </li>
          <li>Preventing and addressing technical issues.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Cookies</h2>
        <p className="mb-4">
          We use cookies and similar tracking technologies to track the activity
          on our website and collect certain information. You can instruct your
          browser to refuse all cookies or to indicate when a cookie is being
          sent.
        </p>

        <h2 className="text-xl font-semibold mb-2">Third-Party Links</h2>
        <p className="mb-4">
          Our website may contain links to third-party sites. We have no control
          over the content and privacy practices of these sites and encourage
          you to review their privacy policies.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          Changes to This Privacy Policy
        </h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page.
        </p>

        <p className="text-gray-600 mt-6">Last updated: October 25, 2023</p>
      </div>
      <Footer />
    </>
  );
}

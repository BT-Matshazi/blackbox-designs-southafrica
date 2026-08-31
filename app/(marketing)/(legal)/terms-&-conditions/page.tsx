import { Metadata } from "next";
import { LegalPage, LegalList } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions | BlackBox Designs",
  description:
    "The rules and regulations for the use of the BlackBox Designs website.",
};

export default function Page() {
  return (
    <LegalPage
      title="Terms & Conditions"
      lede="These terms and conditions outline the rules and regulations for the use of the BlackBox Designs website at blackboxdesigns.co.za."
      intro={
        <p>
          By accessing this website, we assume you accept these terms and
          conditions. Do not continue to use BlackBox Designs if you do not
          agree to take all of the terms and conditions stated on this page.
        </p>
      }
      sections={[
        {
          id: "cookies",
          heading: "Cookies",
          body: (
            <p>
              We employ the use of cookies. By accessing BlackBox Designs, you
              agreed to use cookies in agreement with the BlackBox Designs
              Privacy Policy.
            </p>
          ),
        },
        {
          id: "license",
          heading: "License",
          body: (
            <>
              <p>
                Unless otherwise stated, BlackBox Designs and/or its licensors
                own the intellectual property rights for all material on
                BlackBox Designs. All intellectual property rights are
                reserved. You may access this from BlackBox Designs for your
                own personal use subjected to restrictions set in these terms
                and conditions.
              </p>
              <p>You must not:</p>
              <LegalList
                items={[
                  "Republish material from BlackBox Designs",
                  "Sell, rent or sub-license material from BlackBox Designs",
                  "Reproduce, duplicate or copy material from BlackBox Designs",
                  "Redistribute content from BlackBox Designs",
                ]}
              />
            </>
          ),
        },
        {
          id: "user-comments",
          heading: "User Comments",
          body: (
            <>
              <p>
                Parts of this website offer an opportunity for users to post
                and exchange opinions and information in certain areas of the
                website.
              </p>
              <p>
                BlackBox Designs does not filter, edit, publish or review
                Comments prior to their presence on the website. Comments do
                not reflect the views and opinions of BlackBox Designs, its
                agents and/or affiliates. Comments reflect the views and
                opinions of the person who posts their views and opinions. To
                the extent permitted by applicable laws, BlackBox Designs shall
                not be liable for the Comments or for any liability, damages or
                expenses caused and/or suffered as a result of any use of
                and/or posting of and/or appearance of the Comments on this
                website.
              </p>
            </>
          ),
        },
        {
          id: "reservation-of-rights",
          heading: "Reservation of Rights",
          body: (
            <>
              <p>
                We reserve the right to request that you remove all links or
                any particular link to our Website. You approve to immediately
                remove all links to our Website upon request. We also reserve
                the right to amend these terms and conditions and its linking
                policy at any time. By continuously linking to our Website, you
                agree to be bound to and follow these linking terms and
                conditions.
              </p>
              <p>
                If you find any link on our Website that is offensive for any
                reason, you are free to contact and inform us at any moment. We
                will consider requests to remove links but we are not obligated
                to do so or to respond to you directly.
              </p>
            </>
          ),
        },
        {
          id: "iframes",
          heading: "Iframes",
          body: (
            <p>
              Without prior approval and written permission, you may not create
              frames around our Webpages that alter in any way the visual
              presentation or appearance of our Website.
            </p>
          ),
        },
        {
          id: "consent",
          heading: "Consent",
          body: (
            <p>
              By using our website, you hereby consent to our terms and
              conditions.
            </p>
          ),
        },
      ]}
    />
  );
}

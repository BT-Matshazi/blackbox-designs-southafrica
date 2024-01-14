import * as React from "react";
import { Tailwind, Button } from "@react-email/components";

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
  email,
  phone,
  message,
}) => (
  <Tailwind
    config={{
      theme: {
        extend: {
          colors: {
            brand: "#007291",
          },
        },
      },
    }}
  >
    <div>
      <h1 className="text-brand">Message from Website!</h1>
      <p>
        <strong>Name:</strong> {firstName} {lastName}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Phone:</strong> {phone}
      </p>
      <p>
        <strong>Message:</strong> {message}
      </p>
    </div>
  </Tailwind>
);

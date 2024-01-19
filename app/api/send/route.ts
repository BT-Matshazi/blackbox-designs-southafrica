import { EmailTemplate } from "@/app/email/text";
import { Resend } from "resend";
import * as React from "react";

const resend = new Resend(process.env.RESEND_KEY);

export async function POST(request: Request) {
  const { firstName, lastName, email, phone, message } = await request.json();

  if (!firstName || !lastName || !email || !phone || !message) {
    return Response.json(
      { error: "Please ensure all fields are filled in." },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "BlackBox Designs <no-reply@blackboxdesigns.co.za>",
      to: ["bekithemba@blackboxdesigns.co.za"],
      subject: "Hello world",
      react: EmailTemplate({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        message: message,
      }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error });
    }

    return Response.json({ data }, { status: 200 });
  } catch (error) {
    return Response.json({ error });
  }
}

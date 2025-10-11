import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer, { Transporter, TransportOptions } from "nodemailer";
import { onboardingSchema } from "@/app/onboarding/page";

type OnboardingData = z.infer<typeof onboardingSchema>;

export async function POST(request: NextRequest) {
  console.log("[OnboardingController] Received onboarding submission request");

  try {
    const body = await request.json();

    console.log("[OnboardingController] Parsing request body", body);

    // Validate the data
    // const validatedData = onboardingSchema.parse(body);


    console.log("[OnboardingController] Data validated successfully");

    // Send email
    await sendOnboardingEmail(body);
    console.log("[OnboardingController] Email sent successfully");

    return NextResponse.json(
      { message: "Onboarding submission received successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[OnboardingController] Error processing onboarding:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process onboarding submission" },
      { status: 500 }
    );
  }
}

async function sendOnboardingEmail(data: OnboardingData): Promise<void> {
  console.log("[OnboardingInfrastructure] Preparing to send email");

  // Create transporter
  const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      } as TransportOptions);

  console.log("[OnboardingInfrastructure] Transporter created");

  // Format the email content
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: #000; color: #fff; padding: 20px; text-align: center; }
        .section { margin: 30px 0; padding: 20px; background: #f9f9f9; border-radius: 8px; }
        .section-title { color: #000; font-size: 20px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 10px; }
        .field { margin: 15px 0; }
        .field-label { font-weight: bold; color: #555; }
        .field-value { margin-top: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Client Onboarding Submission</h1>
          <p>Blackbox Designs - Client Questionnaire</p>
        </div>

        <div class="section">
          <div class="section-title">📋 Step 1: Contact Information</div>
          <div class="field">
            <div class="field-label">Name:</div>
            <div class="field-value">${data.contactName}</div>
          </div>
          <div class="field">
            <div class="field-label">Email:</div>
            <div class="field-value">${data.contactEmail}</div>
          </div>
          <div class="field">
            <div class="field-label">Phone:</div>
            <div class="field-value">${data.contactPhone}</div>
          </div>
          <div class="field">
            <div class="field-label">Company:</div>
            <div class="field-value">${data.companyName}</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">🎯 Step 2: Business Vision</div>
          <div class="field">
            <div class="field-label">Main Goal:</div>
            <div class="field-value">${data.mainGoal}</div>
          </div>
          <div class="field">
            <div class="field-label">Primary Audience:</div>
            <div class="field-value">${data.primaryAudience}</div>
          </div>
          <div class="field">
            <div class="field-label">Problem Solving:</div>
            <div class="field-value">${data.problemSolving}</div>
          </div>
          <div class="field">
            <div class="field-label">Differentiation:</div>
            <div class="field-value">${data.differentiation}</div>
          </div>
          ${
            data.brandIdentity
              ? `
          <div class="field">
            <div class="field-label">Brand Identity:</div>
            <div class="field-value">${data.brandIdentity}</div>
          </div>
          `
              : ""
          }
          ${
            data.websiteTone
              ? `
          <div class="field">
            <div class="field-label">Website Tone:</div>
            <div class="field-value">${data.websiteTone}</div>
          </div>
          `
              : ""
          }
        </div>

        <div class="section">
          <div class="section-title">⚙️ Step 3: Functionality Requirements</div>
          ${
            data.speakerInfo
              ? `
          <div class="field">
            <div class="field-label">Speaker Registration Info:</div>
            <div class="field-value">${data.speakerInfo}</div>
          </div>
          `
              : ""
          }
          ${
            data.approvalProcess
              ? `
          <div class="field">
            <div class="field-label">Approval Process:</div>
            <div class="field-value">${data.approvalProcess}</div>
          </div>
          `
              : ""
          }
          ${
            data.speakerEditProfile
              ? `
          <div class="field">
            <div class="field-label">Speaker Edit Profile:</div>
            <div class="field-value">${data.speakerEditProfile}</div>
          </div>
          `
              : ""
          }
          ${
            data.speakerLogin
              ? `
          <div class="field">
            <div class="field-label">Speaker Login:</div>
            <div class="field-value">${data.speakerLogin}</div>
          </div>
          `
              : ""
          }
          ${
            data.corporateDetails
              ? `
          <div class="field">
            <div class="field-label">Corporate Client Details:</div>
            <div class="field-value">${data.corporateDetails}</div>
          </div>
          `
              : ""
          }
          ${
            data.clientBrowsing
              ? `
          <div class="field">
            <div class="field-label">Client Browsing:</div>
            <div class="field-value">${data.clientBrowsing}</div>
          </div>
          `
              : ""
          }
          ${
            data.bookingType
              ? `
          <div class="field">
            <div class="field-label">Booking Type:</div>
            <div class="field-value">${data.bookingType}</div>
          </div>
          `
              : ""
          }
          ${
            data.emailNotifications
              ? `
          <div class="field">
            <div class="field-label">Email Notifications:</div>
            <div class="field-value">${data.emailNotifications}</div>
          </div>
          `
              : ""
          }
          ${
            data.adminManagement
              ? `
          <div class="field">
            <div class="field-label">Admin Management:</div>
            <div class="field-value">${data.adminManagement}</div>
          </div>
          `
              : ""
          }
          ${
            data.needAnalytics
              ? `
          <div class="field">
            <div class="field-label">Need Analytics:</div>
            <div class="field-value">${data.needAnalytics}</div>
          </div>
          `
              : ""
          }
          ${
            data.automatedEmails
              ? `
          <div class="field">
            <div class="field-label">Automated Emails:</div>
            <div class="field-value">${data.automatedEmails}</div>
          </div>
          `
              : ""
          }
        </div>

        <div class="section">
          <div class="section-title">📄 Step 4: Content & Structure</div>
          <div class="field">
            <div class="field-label">Desired Pages:</div>
            <div class="field-value">${data.desiredPages}</div>
          </div>
          <div class="field">
            <div class="field-label">Content Ready:</div>
            <div class="field-value">${data.contentReady}</div>
          </div>
          ${
            data.needBlog
              ? `
          <div class="field">
            <div class="field-label">Need Blog:</div>
            <div class="field-value">${data.needBlog}</div>
          </div>
          `
              : ""
          }
          ${
            data.needTestimonials
              ? `
          <div class="field">
            <div class="field-label">Need Testimonials:</div>
            <div class="field-value">${data.needTestimonials}</div>
          </div>
          `
              : ""
          }
          ${
            data.haveDomain
              ? `
          <div class="field">
            <div class="field-label">Have Domain:</div>
            <div class="field-value">${data.haveDomain}</div>
          </div>
          `
              : ""
          }
          ${
            data.needPayments
              ? `
          <div class="field">
            <div class="field-label">Need Payments:</div>
            <div class="field-value">${data.needPayments}</div>
          </div>
          `
              : ""
          }
        </div>

        <div class="section">
          <div class="section-title">🎨 Step 5: Design & Branding</div>
          <div class="field">
            <div class="field-label">Have Brand Materials:</div>
            <div class="field-value">${data.haveBrandMaterials}</div>
          </div>
          ${
            data.referenceWebsites
              ? `
          <div class="field">
            <div class="field-label">Reference Websites:</div>
            <div class="field-value">${data.referenceWebsites}</div>
          </div>
          `
              : ""
          }
          ${
            data.designStyle
              ? `
          <div class="field">
            <div class="field-label">Design Style:</div>
            <div class="field-value">${data.designStyle}</div>
          </div>
          `
              : ""
          }
          ${
            data.colorThemes
              ? `
          <div class="field">
            <div class="field-label">Color Themes:</div>
            <div class="field-value">${data.colorThemes}</div>
          </div>
          `
              : ""
          }
        </div>

        <div class="section">
          <div class="section-title">📅 Step 6: Timeline & Budget</div>
          <div class="field">
            <div class="field-label">Desired Launch Date:</div>
            <div class="field-value">${data.launchDate}</div>
          </div>
          <div class="field">
            <div class="field-label">Budget Range:</div>
            <div class="field-value">${data.budgetRange}</div>
          </div>
          <div class="field">
            <div class="field-label">Need Maintenance:</div>
            <div class="field-value">${data.needMaintenance}</div>
          </div>
          ${
            data.needTraining
              ? `
          <div class="field">
            <div class="field-label">Need Training:</div>
            <div class="field-value">${data.needTraining}</div>
          </div>
          `
              : ""
          }
        </div>

        <div class="section">
          <div class="section-title">🚀 Step 7: Future Expansion</div>
          ${
            data.futureFeatures
              ? `
          <div class="field">
            <div class="field-label">Future Features:</div>
            <div class="field-value">${data.futureFeatures}</div>
          </div>
          `
              : ""
          }
          ${
            data.additionalNotes
              ? `
          <div class="field">
            <div class="field-label">Additional Notes:</div>
            <div class="field-value">${data.additionalNotes}</div>
          </div>
          `
              : ""
          }
        </div>

        <div class="footer">
          <p>This onboarding submission was sent from the Blackbox Designs website.</p>
          <p>Please respond to ${data.contactEmail} within 24-48 hours.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Send the email
  const mailOptions = {
    from: `"Blackbox Designs Onboarding" <${process.env.EMAIL_FROM}>`,
    to: process.env.EMAIL_TO,
    subject: `New Client Onboarding`,
    html: emailHtml,
  };

  console.log("[OnboardingInfrastructure] Sending email...");
  await transporter.sendMail(mailOptions);
  console.log("[OnboardingInfrastructure] Email sent successfully");
}

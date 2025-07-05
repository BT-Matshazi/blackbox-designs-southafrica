import { ContactUs } from "../domain/contact-us.domain";

export interface ContactUsRepository {
  sendContactUsEmail: (data: ContactUs) => Promise<{ success: boolean; messageId?: string; error?: string }>;
}
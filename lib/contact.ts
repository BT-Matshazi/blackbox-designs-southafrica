// Single source of truth for direct contact channels used across the site.

export const PHONE_NUMBER = "+27615314470";
export const PHONE_DISPLAY = "+27 61 531 4470";

// WhatsApp expects the international number with no "+" or spaces.
export const WHATSAPP_NUMBER = "27615314470";

const DEFAULT_WHATSAPP_MESSAGE =
  "Hi BlackBox Designs, I'd like to discuss a project.";

export function whatsappLink(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

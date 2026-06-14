/**
 * EmailJS configuration, read from Vite env vars.
 * Create a .env file (see .env.example) with your EmailJS IDs to activate sending.
 * Until configured, the contact form falls back to a mailto: link so no lead is lost.
 */
export const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined,
  toEmail: 'treelandsfoundation@gmail.com',
};

export const isEmailConfigured = Boolean(
  emailConfig.serviceId && emailConfig.templateId && emailConfig.publicKey,
);

/** Shared validation for the business and contact forms (client + server). */
export type InquiryKind = "business" | "contact";

export interface InquiryPayload {
  kind: InquiryKind;
  company?: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  type?: string;
  subject?: string;
  message: string;
  consent: boolean;
  product?: string;
  /** Honeypot – must stay empty. */
  website?: string;
}

export type FieldError = "required" | "invalidEmail" | "invalidPhone" | "tooShort" | "consentRequired";

export const COOPERATION_TYPES = ["distributor", "retail", "horeca", "international", "privateLabel", "other"] as const;
export const CONTACT_SUBJECTS = ["general", "products", "business", "media"] as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9\s()/-]{6,20}$/;

export function validateInquiry(p: Partial<InquiryPayload>): Partial<Record<keyof InquiryPayload, FieldError>> {
  const e: Partial<Record<keyof InquiryPayload, FieldError>> = {};
  const req = (k: keyof InquiryPayload) => {
    const v = p[k];
    if (typeof v !== "string" || !v.trim()) e[k] = "required";
  };
  req("name");
  req("email");
  if (!e.email && !EMAIL.test(String(p.email).trim())) e.email = "invalidEmail";
  if (p.phone && String(p.phone).trim() && !PHONE.test(String(p.phone).trim())) e.phone = "invalidPhone";
  req("message");
  if (!e.message && String(p.message).trim().length < 10) e.message = "tooShort";
  if (p.kind === "business") {
    req("company");
    req("country");
    req("type");
    if (!e.type && !COOPERATION_TYPES.includes(p.type as never)) e.type = "required";
  } else {
    req("subject");
  }
  if (!p.consent) e.consent = "consentRequired";
  return e;
}

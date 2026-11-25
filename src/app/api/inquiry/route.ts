import { NextResponse } from "next/server";
import { validateInquiry, type InquiryPayload } from "@/lib/inquiry";

/**
 * Receives contact and business enquiries.
 *
 * Live mode: set INQUIRY_WEBHOOK_URL (e.g. a Make/Zapier/Formspree/n8n hook or
 * an internal endpoint that sends email). Without it the route runs in
 * demonstration mode: it validates and acknowledges, but forwards nothing.
 */
export async function POST(req: Request) {
  let body: Partial<InquiryPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: pretend success for bots.
  if (body.website) return NextResponse.json({ ok: true, mode: "demo" });

  const errors = validateInquiry(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const webhook = process.env.INQUIRY_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: true, mode: "demo" });
  }

  const clean = {
    kind: body.kind,
    company: body.company?.slice(0, 200),
    name: body.name?.slice(0, 200),
    email: body.email?.slice(0, 200),
    phone: body.phone?.slice(0, 40),
    country: body.country?.slice(0, 100),
    type: body.type,
    subject: body.subject,
    product: body.product?.slice(0, 120),
    message: body.message?.slice(0, 5000),
    receivedAt: new Date().toISOString(),
  };

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clean),
    });
    if (!res.ok) throw new Error(String(res.status));
    return NextResponse.json({ ok: true, mode: "live" });
  } catch {
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
}

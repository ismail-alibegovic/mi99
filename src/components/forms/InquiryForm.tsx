"use client";

import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import {
  COOPERATION_TYPES,
  CONTACT_SUBJECTS,
  validateInquiry,
  type FieldError,
  type InquiryKind,
  type InquiryPayload,
} from "@/lib/inquiry";
import { cn } from "@/lib/site";

type Errors = Partial<Record<keyof InquiryPayload, FieldError>>;

const inputCls =
  "mt-2 block w-full rounded-2xl border bg-white px-4 py-3.5 text-[1rem] text-ink-900 outline-none transition-[border-color,box-shadow] placeholder:text-ink-500/70 focus:border-forest-800 focus:ring-4 focus:ring-meadow-300/40";

function Field({
  id,
  label,
  required,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-[0.88rem] font-semibold text-forest-900">
        {label}
        {required && <span className="text-migg-red"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[0.82rem] font-medium text-migg-red">
          {error}
        </p>
      )}
    </div>
  );
}

export function InquiryForm({ kind, live, products = [] }: { kind: InquiryKind; live: boolean; products?: { slug: string; name: string }[] }) {
  const t = useTranslations("form");
  const uid = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [mode, setMode] = useState<"demo" | "live">(live ? "live" : "demo");
  const [product, setProduct] = useState("");

  useEffect(() => {
    if (kind !== "business") return;
    const s = new URLSearchParams(window.location.search).get("proizvod");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time prefill from URL
    if (s && products.some((p) => p.slug === s)) setProduct(s);
  }, [kind, products]);

  const id = (k: string) => `${uid}-${k}`;
  const err = (k: keyof InquiryPayload) => (errors[k] ? t(errors[k]!) : undefined);
  const aria = (k: keyof InquiryPayload) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${id(k)}-error` : undefined,
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload: Partial<InquiryPayload> = {
      kind,
      company: String(fd.get("company") ?? ""),
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      country: String(fd.get("country") ?? ""),
      type: String(fd.get("type") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
      product: String(fd.get("product") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
    };
    const v = validateInquiry(payload);
    setErrors(v);
    if (Object.keys(v).length) {
      const first = Object.keys(v)[0];
      document.getElementById(id(first))?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        if (json.errors) setErrors(json.errors);
        setStatus("error");
        return;
      }
      setMode(json.mode);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="rounded-[28px] bg-meadow-100 p-8 md:p-10"
      >
        <CheckCircle2 className="size-10 text-forest-700" aria-hidden />
        <h3 className="display-sm mt-5 text-forest-900">{t("successTitle")}</h3>
        <p className="mt-3 max-w-lg text-ink-700">{mode === "live" ? t("successLive") : t("successDemo")}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 font-display font-bold text-forest-900 underline underline-offset-4"
        >
          {t("again")}
        </button>
      </motion.div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5">
      {!live && (
        <div className="flex gap-3 rounded-2xl border border-dashed border-forest-900/25 bg-cream-50 p-4 text-[0.88rem] text-ink-700">
          <Info className="mt-0.5 size-4 shrink-0 text-forest-700" aria-hidden />
          <p>
            <strong className="font-semibold text-forest-900">{t("demoTitle")}. </strong>
            {t("demoText")}
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {kind === "business" && (
          <Field id={id("company")} label={t("company")} required error={err("company")} className="sm:col-span-2">
            <input id={id("company")} name="company" autoComplete="organization" className={cn(inputCls, errors.company ? "border-migg-red" : "border-forest-900/15")} {...aria("company")} />
          </Field>
        )}
        <Field id={id("name")} label={kind === "business" ? t("contactPerson") : t("name")} required error={err("name")}>
          <input id={id("name")} name="name" autoComplete="name" className={cn(inputCls, errors.name ? "border-migg-red" : "border-forest-900/15")} {...aria("name")} />
        </Field>
        <Field id={id("email")} label={t("email")} required error={err("email")}>
          <input id={id("email")} name="email" type="email" autoComplete="email" className={cn(inputCls, errors.email ? "border-migg-red" : "border-forest-900/15")} {...aria("email")} />
        </Field>
        <Field id={id("phone")} label={t("phone")} error={err("phone")}>
          <input id={id("phone")} name="phone" type="tel" autoComplete="tel" className={cn(inputCls, errors.phone ? "border-migg-red" : "border-forest-900/15")} {...aria("phone")} />
        </Field>
        {kind === "business" ? (
          <Field id={id("country")} label={t("country")} required error={err("country")}>
            <input id={id("country")} name="country" autoComplete="country-name" className={cn(inputCls, errors.country ? "border-migg-red" : "border-forest-900/15")} {...aria("country")} />
          </Field>
        ) : (
          <Field id={id("subject")} label={t("subject")} required error={err("subject")}>
            <select id={id("subject")} name="subject" defaultValue="" className={cn(inputCls, "appearance-none", errors.subject ? "border-migg-red" : "border-forest-900/15")} {...aria("subject")}>
              <option value="" disabled>
                {t("select")}
              </option>
              {CONTACT_SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {t(`subjects.${s}`)}
                </option>
              ))}
            </select>
          </Field>
        )}
        {kind === "business" && (
          <Field id={id("type")} label={t("type")} required error={err("type")} className="sm:col-span-2">
            <div role="radiogroup" aria-label={t("type")} className="mt-2 flex flex-wrap gap-2">
              {COOPERATION_TYPES.map((c, i) => (
                <label key={c} className="cursor-pointer">
                  <input id={i === 0 ? id("type") : undefined} type="radio" name="type" value={c} className="peer sr-only" />
                  <span className="inline-flex rounded-full border border-forest-900/15 bg-white px-4 py-2 text-[0.9rem] font-medium text-forest-900 transition-colors peer-checked:border-forest-900 peer-checked:bg-forest-900 peer-checked:text-cream-50 peer-focus-visible:ring-4 peer-focus-visible:ring-meadow-300/50">
                    {t(`types.${c}`)}
                  </span>
                </label>
              ))}
            </div>
          </Field>
        )}
        {kind === "business" && products.length > 0 && (
          <Field id={id("product")} label={t("product")} className="sm:col-span-2">
            <select id={id("product")} name="product" value={product} onChange={(e) => setProduct(e.target.value)} className={cn(inputCls, "appearance-none border-forest-900/15")}>
              <option value="">—</option>
              {products.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </Field>
        )}
        <Field id={id("message")} label={t("message")} required error={err("message")} className="sm:col-span-2">
          <textarea id={id("message")} name="message" rows={5} className={cn(inputCls, "resize-y", errors.message ? "border-migg-red" : "border-forest-900/15")} {...aria("message")} />
        </Field>
      </div>

      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[0.9rem] text-ink-700">
          <input
            id={id("consent")}
            name="consent"
            type="checkbox"
            className="mt-0.5 size-5 shrink-0 accent-forest-900"
            {...aria("consent")}
          />
          {t("consent")}
        </label>
        {errors.consent && (
          <p id={`${id("consent")}-error`} className="mt-1.5 text-[0.82rem] font-medium text-migg-red">
            {t(errors.consent)}
          </p>
        )}
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            role="alert"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-2xl bg-red-50 p-4 text-[0.9rem] font-medium text-migg-red"
          >
            <TriangleAlert className="size-4" aria-hidden /> {t("error")}
          </motion.p>
        )}
      </AnimatePresence>

      <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? t("sending") : t("submit")}
      </Button>
    </form>
  );
}

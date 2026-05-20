// app/actions/submitInquiry.ts
"use server";
import { headers } from "next/headers";
import { InquirySchema } from "@/lib/validators";
import { upsertContact } from "@/lib/ghl/contacts";
import { rateLimit, getClientIpFromHeaders } from "@/lib/rate-limit";
import { attributionFromFormData } from "@/lib/contact-attribution";

export type SubmitInquiryState =
  | { success: true }
  | { success: false; errors: Record<string, string[]> };

export async function submitInquiry(
  _prevState: SubmitInquiryState,
  formData: FormData
): Promise<SubmitInquiryState> {
  const raw = Object.fromEntries(formData.entries());

  // Honeypot: real users don't fill the hp field (it's visually hidden).
  // Bots that auto-fill every input get a silent success so they don't retry.
  if (typeof raw.hp === "string" && raw.hp.length > 0) {
    return { success: true };
  }

  // Rate limit: 5 submissions / minute / IP. Same key namespace as the REST
  // endpoint so a single IP can't get 10 by mixing form + curl.
  const hdrs = await headers();
  const ip = getClientIpFromHeaders(hdrs);
  const limit = rateLimit(`inquiry:${ip}`, { max: 5, windowMs: 60_000 });
  if (!limit.ok) {
    return {
      success: false,
      errors: {
        root: [
          `Too many submissions. Please try again in ${limit.retryAfter} seconds.`,
        ],
      },
    };
  }

  const parsed = InquirySchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const sourcePage =
    typeof raw.sourcePage === "string" && raw.sourcePage ? raw.sourcePage : undefined;

  // Pull ad-click + UTM attribution from hidden form fields (populated
  // client-side by <AttributionFields />). Falls through cleanly when
  // a visitor came in without any tracked params (most direct visits).
  const attribution = attributionFromFormData(formData);

  const result = await upsertContact({
    ...parsed.data,
    sourcePage,
    sourceName: process.env.NEXT_PUBLIC_SITE_NAME ?? "Website",
    attribution,
  });

  if (!result.ok) {
    return {
      success: false,
      errors: {
        root: ["Submission failed. Please try again, or call/text directly."],
      },
    };
  }

  return { success: true };
}

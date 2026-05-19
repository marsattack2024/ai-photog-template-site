// app/actions/submitInquiry.ts
"use server";
import { InquirySchema } from "@/lib/validators";
import { upsertContact } from "@/lib/ghl/contacts";

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

  const parsed = InquirySchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const sourcePage =
    typeof raw.sourcePage === "string" && raw.sourcePage ? raw.sourcePage : undefined;

  const result = await upsertContact({
    ...parsed.data,
    sourcePage,
    sourceName: process.env.NEXT_PUBLIC_SITE_NAME ?? "Website",
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

// app/actions/submitInquiry.ts
"use server";
import { InquirySchema } from "@/lib/validators";
import { getServerSupabase } from "@/lib/supabase-server";

type ActionResult =
  | { success: true }
  | { success: false; errors: Record<string, string[]> };

export async function submitInquiry(
  _prevState: ActionResult | { success: false; errors: Record<string, string[]> },
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = InquirySchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const supabase = getServerSupabase();
  const { error } = await supabase.from("inquiries").insert({
    ...parsed.data,
    status: "new",
  });

  if (error) {
    console.error("[submitInquiry] Supabase error:", error.message);
    return {
      success: false,
      errors: { root: ["Submission failed. Please try again."] },
    };
  }

  return { success: true };
}

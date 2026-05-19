// lib/validators.ts
import { z } from "zod";

const emptyToUndefined = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? undefined : v;

export const InquirySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.preprocess(emptyToUndefined, z.string().max(40).optional()),
  sessionType: z.preprocess(
    emptyToUndefined,
    z.string().max(50).optional()
  ),
  message: z.preprocess(emptyToUndefined, z.string().max(2000).optional()),
});

export type InquiryInput = z.infer<typeof InquirySchema>;

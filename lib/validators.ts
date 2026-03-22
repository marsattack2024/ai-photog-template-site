// lib/validators.ts
import { z } from "zod";

export const InquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  service_interest: z.string().optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
  source_page: z.string().optional(),
});

export type InquiryInput = z.infer<typeof InquirySchema>;

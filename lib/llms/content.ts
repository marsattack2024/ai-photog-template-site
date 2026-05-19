import { siteConfig } from "@/lib/site.config";
import { DEFAULT_FAQS } from "@/components/sections/faq-data";
import { DEFAULT_PROCESS_STEPS } from "@/components/sections/ProcessSteps";
import { DEFAULT_INCLUDES_ITEMS } from "@/components/sections/IncludesGrid";
import { DEFAULT_WHY_BOOK_REASONS } from "@/components/sections/WhyBook";

/**
 * Centralized content for /llms.txt and /llms-full.txt.
 * Both files share the same structure; llms-full.txt includes full prose
 * (FAQ answers, process step bodies, full why-book copy) while llms.txt
 * keeps just the titles/headings.
 *
 * Per https://llmstxt.org — designed for LLM agents that want a curated
 * map of the site's content without scraping every page.
 */

export interface LlmsPage {
  path: string;
  title: string;
  description: string;
}

export const LLMS_PAGES: LlmsPage[] = [
  {
    path: "/",
    title: "Home",
    description: "Homepage with hero, social proof, photographer bio, process, gallery, testimonials, and contact form.",
  },
  {
    path: "/seattle-boudoir",
    title: "Seattle Boudoir reference page",
    description: "Reference layout demonstrating the template applied to a luxury boudoir studio (Molly Blair / Seattle Boudoir & Co.).",
  },
  {
    path: "/thank-you",
    title: "Thank You",
    description: "Post-form confirmation page.",
  },
];

export function buildLlmsTxt(): string {
  const lines: string[] = [];

  lines.push(`# ${siteConfig.brand.name}`);
  lines.push("");
  if (siteConfig.brand.tagline) {
    lines.push(`> ${siteConfig.brand.tagline}`);
    lines.push("");
  }
  lines.push(siteConfig.seo.description);
  lines.push("");

  lines.push("## Pages");
  for (const page of LLMS_PAGES) {
    lines.push(`- [${page.title}](${siteConfig.seo.baseUrl}${page.path}): ${page.description}`);
  }
  lines.push("");

  lines.push("## What's included in every session");
  for (const item of DEFAULT_INCLUDES_ITEMS) {
    lines.push(`- ${item}`);
  }
  lines.push("");

  lines.push("## How it works");
  for (const step of DEFAULT_PROCESS_STEPS) {
    lines.push(`- ${step.number} — ${step.title}`);
  }
  lines.push("");

  lines.push("## Why clients book");
  for (const reason of DEFAULT_WHY_BOOK_REASONS) {
    lines.push(`- ${reason.title}`);
  }
  lines.push("");

  lines.push("## Common questions");
  for (const faq of DEFAULT_FAQS) {
    lines.push(`- ${faq.q}`);
  }
  lines.push("");

  lines.push("## Contact");
  if (siteConfig.brand.email) lines.push(`- Email: ${siteConfig.brand.email}`);
  if (siteConfig.brand.phone) lines.push(`- Phone: ${siteConfig.brand.phone}`);
  lines.push(`- Inquiry form: ${siteConfig.seo.baseUrl}/#contact`);
  lines.push(`- API endpoint (agents): POST ${siteConfig.seo.baseUrl}/api/v1/inquiry`);

  return lines.join("\n");
}

export function buildLlmsFullTxt(): string {
  const lines: string[] = [];

  lines.push(`# ${siteConfig.brand.name}`);
  lines.push("");
  if (siteConfig.brand.tagline) {
    lines.push(`> ${siteConfig.brand.tagline}`);
    lines.push("");
  }
  lines.push(siteConfig.seo.description);
  lines.push("");

  lines.push("## Pages");
  for (const page of LLMS_PAGES) {
    lines.push(`### ${page.title}`);
    lines.push(`**URL:** ${siteConfig.seo.baseUrl}${page.path}`);
    lines.push("");
    lines.push(page.description);
    lines.push("");
  }

  lines.push("## What's included in every session");
  for (const item of DEFAULT_INCLUDES_ITEMS) {
    lines.push(`- ${item}`);
  }
  lines.push("");

  lines.push("## How the booking process works");
  for (const step of DEFAULT_PROCESS_STEPS) {
    lines.push(`### ${step.number} — ${step.title}`);
    lines.push(step.body);
    lines.push("");
  }

  lines.push("## Why clients book");
  for (const reason of DEFAULT_WHY_BOOK_REASONS) {
    lines.push(`### ${reason.title}`);
    lines.push(reason.body);
    lines.push("");
  }

  lines.push("## Frequently asked questions");
  for (const faq of DEFAULT_FAQS) {
    lines.push(`### ${faq.q}`);
    lines.push(faq.a);
    lines.push("");
  }

  lines.push("## Contact");
  if (siteConfig.brand.email) lines.push(`- **Email:** ${siteConfig.brand.email}`);
  if (siteConfig.brand.phone) lines.push(`- **Phone:** ${siteConfig.brand.phone}`);
  lines.push(`- **Inquiry form:** ${siteConfig.seo.baseUrl}/#contact`);
  lines.push(`- **REST API (for agents):** POST ${siteConfig.seo.baseUrl}/api/v1/inquiry`);
  lines.push(`- **OpenAPI spec:** ${siteConfig.seo.baseUrl}/api/openapi.json`);
  lines.push("");

  if (siteConfig.socials.length > 0) {
    lines.push("## Social");
    for (const s of siteConfig.socials) {
      if (s.href && s.href !== "#") lines.push(`- ${s.label}: ${s.href}`);
    }
  }

  return lines.join("\n");
}

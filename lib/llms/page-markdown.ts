import { siteConfig } from "@/lib/site.config";
import { DEFAULT_FAQS } from "@/components/sections/faq-data";
import { DEFAULT_PROCESS_STEPS } from "@/components/sections/ProcessSteps";
import { DEFAULT_INCLUDES_ITEMS } from "@/components/sections/IncludesGrid";
import { DEFAULT_WHY_BOOK_REASONS } from "@/components/sections/WhyBook";

/**
 * Per-page markdown builders for the markdown-negotiation system.
 * Triggered when a request to / (or /seattle-boudoir etc.) carries
 * Accept: text/markdown — middleware rewrites the URL to /md/[slug]
 * and this module renders the page as plain markdown for the agent.
 *
 * Pattern adapted from p2p-react-website's app/md/[...slug]/route.ts,
 * slimmed for the photographer template.
 */

export const MD_HEADERS: HeadersInit = {
  "Content-Type": "text/markdown; charset=utf-8",
  "Cache-Control": "public, max-age=86400, s-maxage=86400",
  "X-Robots-Tag": "noindex", // these are agent-facing; don't compete with HTML in search
};

/** Stripped-down homepage as markdown. */
export function buildHomeMarkdown(): string {
  const lines: string[] = [];
  const url = `${siteConfig.seo.baseUrl}/`;

  lines.push("---");
  lines.push(`title: ${siteConfig.brand.name}`);
  lines.push(`canonical: ${url}`);
  lines.push(`description: ${siteConfig.seo.description}`);
  lines.push("---");
  lines.push("");
  lines.push(`# ${siteConfig.brand.name}`);
  lines.push("");
  if (siteConfig.brand.tagline) {
    lines.push(`> ${siteConfig.brand.tagline}`);
    lines.push("");
  }
  lines.push(siteConfig.seo.description);
  lines.push("");

  lines.push("## How the process works");
  for (const step of DEFAULT_PROCESS_STEPS) {
    lines.push(`### ${step.number} — ${step.title}`);
    lines.push(step.body);
    lines.push("");
  }

  lines.push("## What's included in every session");
  for (const item of DEFAULT_INCLUDES_ITEMS) {
    lines.push(`- ${item}`);
  }
  lines.push("");

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
  if (siteConfig.brand.email) lines.push(`- Email: ${siteConfig.brand.email}`);
  if (siteConfig.brand.phone) lines.push(`- Phone: ${siteConfig.brand.phone}`);
  lines.push(`- Inquiry form (browser): ${url}#contact`);
  lines.push(`- REST API (agents): POST ${siteConfig.seo.baseUrl}/api/v1/inquiry`);
  lines.push("");

  lines.push("---");
  lines.push(`*Source: ${url} · Served as markdown via Accept: text/markdown negotiation.*`);

  return lines.join("\n");
}

/** Reference page demonstrating the template applied to Seattle Boudoir & Co. */
export function buildSeaMarkdown(): string {
  const url = `${siteConfig.seo.baseUrl}/seattle-boudoir`;
  return [
    "---",
    "title: Seattle Boudoir & Co. (reference page)",
    `canonical: ${url}`,
    "description: Reference layout — the photographer template applied to a luxury boudoir studio (Seattle Boudoir & Co. / Molly Blair).",
    "---",
    "",
    "# Seattle Boudoir & Co. (reference page)",
    "",
    "> Reference layout demonstrating the template applied to a luxury boudoir studio in downtown Seattle, WA.",
    "",
    "This page is shipped as a reference inside the template repo. When the repo is forked for the real Seattle Boudoir client, the content moves into that fork's siteConfig and this reference page is removed.",
    "",
    "## What this page demonstrates",
    "- A custom palette applied per-page via inline style on the wrapper div",
    "- Niche-specific sections (ImageQuote breakers, narrative empathy block, session-type scenes)",
    "- A real GoHighLevel form integration on the inquiry form",
    "",
    `For full content scope see ${siteConfig.seo.baseUrl}/llms-full.txt`,
    "",
    "---",
    `*Source: ${url} · Served as markdown via Accept: text/markdown negotiation.*`,
  ].join("\n");
}

/** Thank-you page. */
export function buildThankYouMarkdown(): string {
  const url = `${siteConfig.seo.baseUrl}/thank-you`;
  return [
    "---",
    "title: Thank You",
    `canonical: ${url}`,
    "---",
    "",
    "# Thank You",
    "",
    "Your inquiry has been received. You'll hear back personally within one business day.",
    "",
    "---",
    `*Source: ${url}*`,
  ].join("\n");
}

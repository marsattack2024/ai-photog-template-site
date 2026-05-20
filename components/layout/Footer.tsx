import Link from "next/link";

/**
 * Internal route detector: a relative path starting with `/` that doesn't
 * end with a file extension (.xml, .pdf, .txt, etc.) — those should still
 * full-load. External hrefs (http://, mailto:, tel:, #) also full-load.
 */
function isInternalRoute(href: string): boolean {
  if (!href.startsWith("/")) return false;
  // Match `.xml`, `.txt`, `.pdf`, `.json`, etc. at the end of the path
  if (/\.[a-z0-9]{2,5}(\?|#|$)/i.test(href)) return false;
  return true;
}

export interface FooterSocial {
  label: string;
  href: string;
}

export interface FooterNavLink {
  label: string;
  href: string;
}

export interface FooterContact {
  phone?: string;
  email?: string;
  /** Free-form line (e.g. "Downtown Seattle, WA") or `${city}, ${state}`. */
  location?: string;
}

export interface FooterProps {
  studioName: string;
  /** Year for the © line; defaults to current year. */
  year?: number;
  socials?: FooterSocial[];
  /** Brand tagline / one-line pitch — shows in the upper left when present. */
  tagline?: string;
  /** Phone/email/location — renders an upper "Contact" column when any present. */
  contact?: FooterContact;
  /** Privacy/Terms/legal/secondary nav — renders an upper "Links" column. */
  navLinks?: FooterNavLink[];
}

// Empty default — pass `socials={siteConfig.socials}` from the layout to
// surface the studio's actual handles. Falling back to "#" placeholders
// here would ship broken links on a fork that forgets to wire the prop.
const DEFAULT_SOCIALS: FooterSocial[] = [];

/**
 * Global site footer. Backward-compatible: called with just `studioName`,
 * renders the original compact 3-column row (brand, ©, socials).
 *
 * When any of `tagline`, `contact`, or `navLinks` are passed, expands with
 * an upper info row (tagline | contact | links). All three optional —
 * a fork enables them by passing data, not by editing this file.
 */
export function Footer({
  studioName,
  year = new Date().getFullYear(),
  socials = DEFAULT_SOCIALS,
  tagline,
  contact,
  navLinks,
}: FooterProps) {
  const hasUpperRow =
    Boolean(tagline) ||
    Boolean(contact?.phone || contact?.email || contact?.location) ||
    Boolean(navLinks && navLinks.length > 0);

  return (
    <footer className="bg-(--color-ink) py-12 px-[var(--space-section-x)]">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Upper info row — only renders when content is passed */}
        {hasUpperRow && (
          <div className="grid md:grid-cols-3 gap-8 pb-10 border-b border-(--color-card-on-dark-border)">
            {/* Brand + tagline column */}
            <div className="flex flex-col gap-3">
              <p className="font-serif text-2xl tracking-[var(--tracking-label)] text-(--color-cream)">
                {studioName}
              </p>
              {tagline && (
                <p className="text-sm leading-relaxed text-(--color-on-dark-secondary) max-w-xs">
                  {tagline}
                </p>
              )}
            </div>

            {/* Contact column */}
            {contact && (contact.phone || contact.email || contact.location) && (
              <div className="flex flex-col gap-2">
                <p className="text-xs tracking-widest uppercase text-(--color-accent)">
                  Get in Touch
                </p>
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                    className="text-sm text-(--color-on-dark-secondary) hover:text-(--color-cream) transition-colors"
                  >
                    {contact.phone}
                  </a>
                )}
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm text-(--color-on-dark-secondary) hover:text-(--color-cream) transition-colors break-all"
                  >
                    {contact.email}
                  </a>
                )}
                {contact.location && (
                  <p className="text-sm text-(--color-on-dark-secondary)">
                    {contact.location}
                  </p>
                )}
              </div>
            )}

            {/* Links column */}
            {navLinks && navLinks.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-xs tracking-widest uppercase text-(--color-accent)">
                  Quick Links
                </p>
                {navLinks.map((link) => {
                  const className =
                    "text-sm text-(--color-on-dark-secondary) hover:text-(--color-cream) transition-colors w-fit";
                  // Internal Next.js routes get SPA navigation via <Link>;
                  // file assets (sitemap.xml) and external URLs full-load via <a>.
                  return isInternalRoute(link.href) ? (
                    <Link key={link.label} href={link.href} className={className}>
                      {link.label}
                    </Link>
                  ) : (
                    <a key={link.label} href={link.href} className={className}>
                      {link.label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Bottom row — always renders (brand, ©, socials) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {!hasUpperRow && (
            <p className="font-serif text-2xl tracking-[var(--tracking-label)] text-(--color-cream)">
              {studioName}
            </p>
          )}
          <p className="text-xs text-(--color-muted) tracking-widest uppercase text-center">
            &copy; {year} {studioName}. All rights reserved.
          </p>
          <div className="flex gap-8">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-xs text-(--color-muted) hover:text-(--color-cream) uppercase tracking-widest transition-colors duration-300"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

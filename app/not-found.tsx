import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--color-cream)] flex flex-col items-center justify-center gap-8 px-6">
      <span className="text-xs uppercase tracking-widest text-[var(--color-muted)]">404</span>
      <h1 className="font-serif text-5xl font-normal text-[var(--color-ink)] text-center leading-tight">
        Page Not Found
      </h1>
      <p className="text-sm text-[var(--color-muted)] max-w-sm text-center leading-relaxed">
        This page doesn&apos;t exist or may have moved. Let&apos;s get you back.
      </p>
      <Link
        href="/"
        className="text-xs uppercase tracking-widest border border-[var(--color-ink)] text-[var(--color-ink)] px-8 py-4 hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)] transition-colors duration-300"
      >
        Back to Home
      </Link>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";

export interface TweakOption {
  val: string;
  label: string;
  /** Optional color chips next to the label (palette previews etc.). */
  swatches?: string[];
}

export interface TweakGroup {
  key: string;
  label: string;
  opts: TweakOption[];
}

export interface TweaksPanelProps {
  /** Tweak groups to show in the panel. */
  groups: TweakGroup[];
  /** Default values for each group key — applied to <body> on mount. */
  defaults: Record<string, string>;
}

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  NOT DEAD CODE. Intentionally scaffolded for client review.      ║
 * ║  See lib/tweaks.config.ts header for the FULL usage guide        ║
 * ║  (3 patterns, worked example, CSS recipes, handoff workflow).    ║
 * ║  Re-exported from @/components/ui so it's discoverable.          ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Floating live-design-tweaks panel for client review sessions.
 *
 * SAFE BY DESIGN — triple-guarded so this never reaches preview/prod:
 *   - NODE_ENV !== "production"  (build-time)
 *   - window.location.hostname === "localhost"  (runtime)
 *   - Tree-shaken from prod bundle when nothing imports it
 *
 * MULTIPLE TWEAKS AT ONCE: each TweakGroup sets its own body attribute
 * (data-{group.key}). All groups run simultaneously; the panel can drive
 * 10 independent dials at once without conflict. Changes are CSS-only,
 * so there is no React re-render and no page reload.
 *
 * SECTION-SCOPED OR GLOBAL: the body attribute is set globally, but
 * the CSS selector decides where the override lands. Want a tweak to
 * affect only the hero? Write `body[data-hero-crop="right"] section.hero ...`.
 *
 * Pattern adapted from p2p-react-website/src/app/components/TweaksPanel.tsx.
 */
export function TweaksPanel({ groups, defaults }: TweaksPanelProps) {
  const [state, setState] = useState<Record<string, string>>(defaults);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function applyState(s: Record<string, string>) {
    Object.entries(s).forEach(([key, val]) => {
      document.body.setAttribute(`data-${key}`, val);
    });
  }

  function setKey(key: string, val: string) {
    const next = { ...state, [key]: val };
    setState(next);
    applyState(next);
  }

  // Apply defaults on mount so CSS overrides reflect the initial state
  useEffect(() => {
    applyState(defaults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Triple-layered safety — only renders on localhost.
  // Layer 1: NODE_ENV (build-time, "production" on Vercel)
  if (process.env.NODE_ENV === "production") return null;
  // Layer 2: hostname (catches `next start` on a server, staging deploy, etc.)
  if (typeof window !== "undefined" && window.location.hostname !== "localhost")
    return null;

  return (
    <>
      {/* ✦ Toggle button (bottom-right) */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle design tweaks"
        style={{
          position: "fixed",
          right: 16,
          bottom: 16,
          width: 46,
          height: 46,
          borderRadius: "50%",
          background: "#1c1814",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontSize: 18,
          zIndex: 9999,
          boxShadow: "0 10px 24px -8px rgba(0,0,0,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ✦
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Design tweaks"
          style={{
            position: "fixed",
            right: 16,
            bottom: 72,
            width: 264,
            background: "#fff",
            borderRadius: 14,
            padding: "16px 14px",
            boxShadow:
              "0 8px 40px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)",
            zIndex: 9998,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 13,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <strong style={{ fontSize: 14, color: "#111" }}>Live Tweaks</strong>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 18,
                color: "#aaa",
                lineHeight: 1,
                padding: "0 2px",
              }}
            >
              ×
            </button>
          </div>
          <p
            style={{
              color: "#888",
              fontSize: 11,
              marginBottom: 14,
              lineHeight: 1.5,
            }}
          >
            Changes are instant — pick your favorites.
          </p>

          {groups.map((group) => (
            <div key={group.key} style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontWeight: 700,
                  marginBottom: 8,
                  color: "#666",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {group.label}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {group.opts.map((opt) => {
                  const active = state[group.key] === opt.val;
                  return (
                    <button
                      key={opt.val}
                      onClick={() => setKey(group.key, opt.val)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 8,
                        border: "1.5px solid",
                        borderColor: active ? "#1c1814" : "#e5e5e5",
                        background: active ? "#1c1814" : "#fafafa",
                        color: active ? "#fff" : "#444",
                        cursor: "pointer",
                        fontSize: 12,
                        fontWeight: active ? 600 : 500,
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        transition: "all 0.15s ease",
                      }}
                    >
                      {opt.swatches && (
                        <span
                          style={{ display: "flex", gap: 3, flexShrink: 0 }}
                        >
                          {opt.swatches.map((s) => (
                            <span
                              key={s}
                              style={{
                                width: 10,
                                height: 10,
                                borderRadius: 3,
                                background: s,
                                border: "1px solid rgba(0,0,0,0.12)",
                                display: "inline-block",
                              }}
                            />
                          ))}
                        </span>
                      )}
                      <span style={{ flex: 1 }}>{opt.label}</span>
                      {active && (
                        <span style={{ opacity: 0.6, fontSize: 11 }}>✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div
            style={{
              borderTop: "1px solid #f0f0f0",
              marginTop: 4,
              paddingTop: 12,
            }}
          >
            <button
              onClick={() => {
                const choiceLines = Object.entries(state)
                  .map(([k, v]) => `  ${k}: ${v}`)
                  .join("\n");
                const message = [
                  "Please lock in these Live Tweak choices as permanent defaults",
                  "and remove the TweaksPanel from this page:",
                  "",
                  choiceLines,
                  "",
                  "Promote the winning CSS to :root, remove the override blocks",
                  "in globals.css, and delete TweaksPanel from the page import.",
                ].join("\n");
                void navigator.clipboard
                  .writeText(message)
                  .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2500);
                  })
                  .catch(() => {
                    // Clipboard permission denied — silently ignore
                  });
              }}
              style={{
                width: "100%",
                padding: "9px",
                borderRadius: 8,
                border: `1.5px solid ${copied ? "#16a34a" : "#1c1814"}`,
                background: copied ? "#f0fdf4" : "#1c1814",
                color: copied ? "#16a34a" : "#fff",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                transition: "all 0.2s ease",
              }}
            >
              {copied ? "Copied to clipboard ✓" : "Copy choices for Claude →"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

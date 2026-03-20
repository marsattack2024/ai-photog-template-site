/**
 * export_to_html.jsx
 * React component that renders a slide-deck-creator JSON spec as an
 * interactive in-browser presentation.
 *
 * Usage (two options):
 *
 * Option A — Import as a React component:
 *   import DeckRenderer from './export_to_html.jsx';
 *   import deck from './deck.json';
 *   <DeckRenderer deck={deck} />
 *
 * Option B — Standalone bundle (via web-artifacts-builder skill):
 *   1. Copy this file into your artifact project's src/
 *   2. In main.jsx: import DeckRenderer from './export_to_html.jsx';
 *   3. Pass your deck JSON as the `deck` prop
 *   4. Run: bash .claude/skills/web-artifacts-builder/scripts/bundle-artifact.sh
 *
 * Dependencies:
 *   - React 18+ (peer dep)
 *   - Tailwind CSS (for styling — or swap classNames for inline styles)
 *
 * Motion hints from JSON are mapped to Tailwind transition/animation classes.
 * Claude can open and edit this file to adjust layouts, add new layout types,
 * or swap Tailwind for CSS Modules / inline styles.
 */

import React, { useState, useEffect, useCallback } from 'react';

// --- Motion class mapping ---
const MOTION_CLASSES = {
  'fade-in':    'animate-in fade-in duration-500',
  'slide-up':   'animate-in slide-in-from-bottom-8 duration-500',
  'slide-left': 'animate-in slide-in-from-right-8 duration-500',
  'zoom-in':    'animate-in zoom-in-95 duration-500',
  'stagger-up': 'animate-in slide-in-from-bottom-6 duration-500',
  'none':       '',
};

// --- Shared sub-components ---

function Headline({ text, size = 'text-4xl', color = 'text-white', align = 'text-left', className = '' }) {
  return (
    <h2 className={`font-serif font-bold leading-tight ${size} ${color} ${align} ${className}`}>
      {text}
    </h2>
  );
}

function Subheadline({ text, color = 'text-slate-300', align = 'text-left', className = '' }) {
  return text ? (
    <p className={`text-lg leading-relaxed mt-2 ${color} ${align} ${className}`}>{text}</p>
  ) : null;
}

function BulletList({ bullets = [], color = 'text-slate-300' }) {
  if (!bullets.length) return null;
  return (
    <ul className={`mt-4 space-y-2 ${color}`}>
      {bullets.map((b, i) => (
        <li key={i} className="flex items-start gap-2 text-base leading-relaxed">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0" />
          {b}
        </li>
      ))}
    </ul>
  );
}

function VisualPlaceholder({ text }) {
  return (
    <div className="flex items-center justify-center h-full min-h-48 border border-dashed border-slate-600 rounded-lg p-6 text-slate-500 text-sm italic text-center leading-relaxed">
      {text || '[Visual]'}
    </div>
  );
}

// --- Layout components ---

function TitleHero({ spec, accent }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="w-16 h-0.5 mb-6 rounded" style={{ background: accent }} />
      <Headline text={spec.headline} size="text-5xl" align="text-center" className="max-w-4xl" />
      <Subheadline text={spec.subheadline} align="text-center" color="" className="mt-4 text-xl max-w-2xl" style={{ color: accent }} />
    </div>
  );
}

function SplitTextVisual({ spec, accent }) {
  return (
    <div className="grid grid-cols-2 gap-12 items-center h-full">
      <div>
        <Headline text={spec.headline} size="text-3xl" />
        <Subheadline text={spec.subheadline} color="" className="mt-2" style={{ color: accent }} />
        <BulletList bullets={spec.bullets} />
      </div>
      <VisualPlaceholder text={spec.visual_idea} />
    </div>
  );
}

function ThreeColumn({ spec, accent }) {
  const columns = spec.columns || [];
  return (
    <div className="h-full flex flex-col">
      <Headline text={spec.headline} size="text-3xl" align="text-center" />
      <Subheadline text={spec.subheadline} align="text-center" className="mt-1" />
      <div className="grid grid-cols-3 gap-6 mt-8 flex-1">
        {columns.map((col, i) => (
          <div key={i} className="flex flex-col items-center text-center px-3 border-r border-white/10 last:border-0">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold font-serif mb-4"
              style={{ background: accent, color: '#0F172A' }}
            >
              {(col.icon || String(i + 1))[0].toUpperCase()}
            </div>
            <h3 className="font-serif font-bold text-white text-base mb-2">{col.heading}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{col.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatGrid({ spec, accent }) {
  const stats = (spec.stats || []).slice(0, 4);
  return (
    <div className="h-full flex flex-col">
      <Headline text={spec.headline} size="text-3xl" align="text-center" />
      <Subheadline text={spec.subheadline} align="text-center" />
      <div className="grid grid-cols-2 gap-8 mt-8 flex-1 items-center">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <div className="font-serif font-bold leading-none" style={{ fontSize: 'clamp(3rem,8vw,5rem)', color: accent }}>
              {s.value}
            </div>
            <div className="text-white text-base mt-1">{s.label}</div>
            {s.context && <div className="text-slate-400 text-xs mt-0.5 italic">{s.context}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function QuoteCallout({ spec, accent }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="font-serif font-bold text-8xl leading-none mb-2" style={{ color: accent }}>&ldquo;</div>
      <blockquote className="font-serif font-bold text-white text-3xl leading-snug max-w-3xl">
        {spec.headline}
      </blockquote>
      {spec.subheadline && (
        <p className="mt-4 text-base italic" style={{ color: accent }}>{spec.subheadline}</p>
      )}
    </div>
  );
}

function CTAClose({ spec, accent }) {
  const cta = spec.cta || {};
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <Headline text={spec.headline} size="text-4xl" align="text-center" className="max-w-3xl" />
      <Subheadline text={spec.subheadline} align="text-center" className="max-w-2xl mt-3" />
      {cta.label && (
        <a
          href={cta.url || '#'}
          className="mt-8 inline-block px-8 py-3 rounded font-serif font-bold text-lg transition-opacity hover:opacity-85"
          style={{ background: accent, color: '#0F172A' }}
        >
          {cta.label}
        </a>
      )}
      {cta.url && (
        <p className="mt-3 text-xs text-slate-500 italic">{cta.url}</p>
      )}
    </div>
  );
}

function FullBleedImage({ spec, accent }) {
  return (
    <div className="relative h-full flex items-end">
      <div className="absolute inset-0 flex items-center justify-center border border-dashed border-slate-700 rounded text-slate-600 text-sm italic p-8 text-center">
        {spec.visual_idea || '[Full bleed image]'}
      </div>
      <div className="relative z-10 bg-black/60 rounded p-6 mb-4 ml-4 max-w-xl">
        <Headline text={spec.headline} size="text-3xl" />
        <Subheadline text={spec.subheadline} />
      </div>
    </div>
  );
}

// Layout dispatch
function SlideBody({ spec, accent }) {
  const props = { spec, accent };
  switch (spec.layout) {
    case 'title-hero':        return <TitleHero {...props} />;
    case 'split-text-visual': return <SplitTextVisual {...props} />;
    case 'three-column':      return <ThreeColumn {...props} />;
    case 'stat-grid':         return <StatGrid {...props} />;
    case 'quote-callout':     return <QuoteCallout {...props} />;
    case 'cta-close':         return <CTAClose {...props} />;
    case 'full-bleed-image':  return <FullBleedImage {...props} />;
    default:
      return (
        <div>
          <Headline text={spec.headline} />
          <Subheadline text={spec.subheadline} color="" style={{ color: accent }} />
          <BulletList bullets={spec.bullets} />
        </div>
      );
  }
}

// --- Individual slide ---
function Slide({ spec, meta, isActive, showNotes }) {
  const accent = spec.accent_color || meta.color_accent || '#38BDF8';
  const bg     = meta.color_primary || '#0F172A';
  const motion = isActive ? (MOTION_CLASSES[spec.motion] || MOTION_CLASSES['fade-in']) : '';

  return (
    <div
      className={`absolute inset-0 transition-all duration-500 ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      style={{ background: bg }}
    >
      <div className={`h-full flex flex-col p-10 ${motion}`}>
        <div className="flex-1 overflow-hidden">
          <SlideBody spec={spec} accent={accent} />
        </div>
        {showNotes && spec.speaker_note && (
          <div className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-400 italic">
            <span className="font-bold not-italic text-slate-300">Note: </span>
            {spec.speaker_note}
          </div>
        )}
      </div>
    </div>
  );
}

// --- Outline drawer ---
function Outline({ outline, current, onSelect, onClose }) {
  return (
    <div className="absolute inset-y-0 left-0 w-72 bg-slate-950/95 border-r border-slate-700 z-50 overflow-y-auto p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Outline</h3>
        <button onClick={onClose} className="text-slate-500 hover:text-white text-lg leading-none">×</button>
      </div>
      <ul className="space-y-1">
        {outline.map((item) => (
          <li
            key={item.slide}
            onClick={() => { onSelect(item.slide - 1); onClose(); }}
            className={`px-3 py-2 rounded cursor-pointer text-sm ${current === item.slide - 1 ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5'}`}
          >
            <span className="block text-xs uppercase tracking-wide mb-0.5" style={{ color: '#38BDF8' }}>{item.role}</span>
            {item.headline}
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Main DeckRenderer ---
export default function DeckRenderer({ deck }) {
  const [current, setCurrent]       = useState(0);
  const [showNotes, setShowNotes]   = useState(false);
  const [showOutline, setShowOutline] = useState(false);
  const [key, setKey]               = useState(0);

  const meta    = deck.deck_meta   || {};
  const slides  = deck.slides      || [];
  const outline = deck.outline     || [];
  const total   = slides.length;

  const goTo = useCallback((n) => {
    const clamped = Math.max(0, Math.min(total - 1, n));
    setCurrent(clamped);
    setKey((k) => k + 1);
  }, [total]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ')  { e.preventDefault(); goTo(current + 1); }
      if (e.key === 'ArrowLeft')                    { e.preventDefault(); goTo(current - 1); }
      if (e.key === 'n' || e.key === 'N')           setShowNotes((v) => !v);
      if (e.key === 'o' || e.key === 'O')           setShowOutline((v) => !v);
      if (e.key === 'Escape')                       setShowOutline(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, goTo]);

  const accent = meta.color_accent || '#38BDF8';
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="relative w-full h-full overflow-hidden bg-black select-none" style={{ aspectRatio: '16/9' }}>
      {/* Progress bar */}
      <div
        className="absolute top-0 left-0 h-0.5 z-50 transition-all duration-300"
        style={{ width: `${progress}%`, background: accent }}
      />

      {/* Slides */}
      {slides.map((spec, i) => (
        <Slide
          key={`${i}-${key}`}
          spec={spec}
          meta={meta}
          isActive={i === current}
          showNotes={showNotes}
        />
      ))}

      {/* Outline drawer */}
      {showOutline && (
        <Outline
          outline={outline}
          current={current}
          onSelect={goTo}
          onClose={() => setShowOutline(false)}
        />
      )}

      {/* Slide counter */}
      <div className="absolute bottom-3 right-3 text-xs text-white/30 z-40">
        {current + 1} / {total}
      </div>

      {/* Controls (appear on hover) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-40 opacity-0 hover:opacity-100 transition-opacity group-hover:opacity-100">
        <button onClick={() => goTo(current - 1)} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-xs border border-white/20">← Prev</button>
        <button onClick={() => setShowOutline((v) => !v)} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-xs border border-white/20">≡ Outline</button>
        <button onClick={() => setShowNotes((v) => !v)}   className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-xs border border-white/20">N Notes</button>
        <button onClick={() => goTo(current + 1)} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-xs border border-white/20">Next →</button>
      </div>
    </div>
  );
}

/**
 * Minimal standalone entry point — used when this file is the app root.
 * Remove or ignore if importing DeckRenderer as a component.
 */
export function StandaloneApp({ deckJson }) {
  const deck = typeof deckJson === 'string' ? JSON.parse(deckJson) : deckJson;
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-6xl" style={{ aspectRatio: '16/9' }}>
        <DeckRenderer deck={deck} />
      </div>
    </div>
  );
}

---
name: intelligence-dashboard
description: >
  Build stunning, production-grade business intelligence dashboards, analytics views, KPI trackers,
  and data visualization interfaces using React, Tailwind CSS, and Recharts.
  Use this skill whenever the user asks to build a dashboard, analytics page, metrics view,
  KPI tracker, reporting interface, business intelligence tool, or any screen that displays
  charts, stats, graphs, tables with data, or performance summaries. Also trigger for
  "show me my data," "build me a report view," "create an analytics screen," "cockpit,"
  "command center," "operating system," or any request for an "impressive" or "beautiful"
  data-driven UI. Prefer light/neutral themes unless the user explicitly asks for dark.
  Always aim for board-room-presentable, polished output that looks like a real funded SaaS
  product — not a template. This is a HIGH BAR. Study the reference files before building.
---

# Intelligence Dashboard Skill

Build beautiful, production-grade dashboards that look like real SaaS products. The benchmark is a Figma-designed, pixel-perfect interface — clean typography, cohesive color system, purposeful layout, interactive tabs, and zero template feel.

## Tailwind Plus Component Library

Before building any component from scratch, check if a matching reference exists:

1. Read `.claude/components/tailwindplus/_index.md` to find the right subcategory file
2. Read that file and copy the relevant code snippet
3. Adapt it to the project's stack and design system — don't use it verbatim

Especially useful for dashboards: Stats, Tables, Stacked Lists, Cards, Tabs, Navbars, Badges, Alerts, and Data Display components.

---

## Quick Reference

- **Chart lib**: Recharts — `AreaChart`, `LineChart`, `BarChart`, `PieChart`, `RadialBarChart`
- **Icons**: lucide-react
- **Styling**: Tailwind CSS utility classes only
- **Theme**: Light (white / gray-50 base) by default
- **Output**: Single React `.jsx` artifact, all data mocked inline, fully interactive tabs

Reference files (create if missing — SKILL.md is self-sufficient without them):
- `references/layout-patterns.md` — sidebar anatomy, tab nav, Overview pattern, content grids
- `references/chart-guide.md` — chart selection, dual Y-axis, radial gauge, heatmap grid
- `references/kpi-cards.md` — KPI card variants, delta inline style, lead source bar-list
- `references/color-typography.md` — palette, per-tab theming, text hierarchy, card borders
- `references/component-recipes.md` — AI panel, heatmap, gauge, task list, action list, tabs

---

## The Standard This Skill Targets

Reference: "Studio Operating System" dashboard. Every detail below was extracted from that design.

**Overall structure:**
- Fixed left sidebar (220px) with brand logo, workspace switcher, grouped nav sections
- Content area: page title + subtitle → tab nav → tab-specific content
- No top bar — title lives in the content area itself, tabs sit directly below it

**What makes it exceptional:**
1. Sidebar active state = dark filled pill (`bg-gray-900 text-white`), not blue
2. Tab nav = individual card-style buttons with icon, NOT a pill toggle group
3. KPI cards = tinted icon + ALL-CAPS label + giant number + plain colored delta text (no badge)
4. Overview tab ≠ KPI grid — it's stacked summary rows, one per section, each with inline chart
5. Per-tab color accent — violet for Marketing, emerald for Sales, amber for Hustle, blue for Overview
6. AI panel in every tab — narrative text, domain-specific insight, not generic
7. Charts are minimal: no fill on line charts, very faint grid, near-invisible axis ticks
8. Dual Y-axis on the Marketing chart ($ spend left, CPL right)
9. Heatmap (GitHub-style activity grid) on the Hustle tab
10. Radial gauge (circular score) on the Sales tab for call performance

---

## Core Design Rules

### Card Shell
```
bg-white rounded-2xl border border-gray-100 p-5 or p-6
```
Use `rounded-2xl` — more generous than `rounded-xl`. Border should be `border-gray-100` (lighter than gray-200). No drop shadow on KPI cards; `shadow-sm` only on larger chart cards if needed.

### KPI Card — Exact Pattern from Screenshots
```
Row 1: [tinted icon in rounded-lg]  [UPPERCASE LABEL — text-[10px] tracking-[0.12em] text-gray-400]
Row 2: Large number — text-3xl font-semibold text-gray-900
Row 3: ↑ +12% vs last period — text-xs, emerald-500 or red-500, NO pill background
```
Delta is plain colored text with an arrow glyph (↑ ↓), not a pill/badge.

### Typography Hierarchy (exact)
```
Page title:      text-2xl font-bold text-gray-900
Page subtitle:   text-sm text-gray-400 mt-1
Tab label:       text-sm font-medium
Sidebar group:   text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400
Sidebar item:    text-sm font-medium text-gray-500
KPI label:       text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400
KPI number:      text-3xl font-semibold text-gray-900
Chart card title:text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400
Chart axis tick: fontSize 11, fill "#d1d5db" (very light — barely visible)
AI panel body:   text-sm text-gray-700 leading-relaxed
Delta text:      text-xs font-medium, emerald-500 or red-500
```

### Chart Style (always apply these)
```
CartesianGrid:  strokeDasharray="3 3" stroke="#f3f4f6" vertical={false}
XAxis/YAxis:    axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#d1d5db" }}
Line stroke:    strokeWidth={1.5}, dot={false}, activeDot={{ r: 3, strokeWidth: 0 }}
Area fill:      gradient 0.08 opacity at top → 0 at bottom
Tooltip style:  bg white, border-gray-200, rounded-xl, shadow-md, text-xs, no outline
Dual Y-axis:    <YAxis yAxisId="left" /> and <YAxis yAxisId="right" orientation="right" />
```

### Sidebar Rules
```
Width: w-[220px], fixed
Background: bg-white border-r border-gray-100
Logo row: gradient icon (rounded-xl) + studio name (font-semibold) + ChevronDown
Section label: text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400 px-3 mt-5 mb-1
Active item: bg-gray-900 text-white rounded-lg (DARK, not blue)
Inactive item: text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg
Item padding: px-3 py-2
Icon size: w-4 h-4, left of label
```

### Page Tab Navigation
```
Tabs sit directly below the page title — no container/background behind them
Active tab: bg-white border border-gray-200 shadow-sm rounded-lg text-gray-900 font-medium
Inactive tab: text-gray-500 hover:text-gray-700
Each tab: flex items-center gap-2 px-4 py-2 rounded-lg text-sm
Tab icon: w-3.5 h-3.5 matching the tab's accent color when active
```

---

## Tab Architecture (Core Pattern)

```jsx
const TABS = [
  { id: "overview",  label: "Overview",  icon: Zap,        accent: "blue"    },
  { id: "hustle",    label: "Hustle",    icon: Flame,      accent: "amber"   },
  { id: "sales",     label: "Sales",     icon: DollarSign, accent: "emerald" },
  { id: "marketing", label: "Marketing", icon: BarChart2,  accent: "violet"  },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [activeNav, setActiveNav] = useState("Cockpit")

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Sidebar activeNav={activeNav} onNav={setActiveNav} />
      <main className="flex-1 overflow-y-auto">
        <div className="px-8 pt-8 pb-6">
          <h1 className="text-2xl font-bold text-gray-900">Studio Operating System</h1>
          <p className="text-sm text-gray-400 mt-1">Your command center — consistency, leads, and revenue at a glance</p>
          
          {/* Tab Nav */}
          <div className="flex items-center gap-1 mt-6">
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${activeTab === tab.id
                    ? "bg-white border border-gray-200 shadow-sm text-gray-900"
                    : "text-gray-500 hover:text-gray-700 hover:bg-white/70"}`}>
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-8 pb-8">
          {activeTab === "overview"  && <OverviewTab />}
          {activeTab === "hustle"    && <HustleTab />}
          {activeTab === "sales"     && <SalesTab />}
          {activeTab === "marketing" && <MarketingTab />}
        </div>
      </main>
    </div>
  )
}
```

---

## Overview Tab (Stacked Summary Rows)

Overview does NOT repeat KPI cards. Each row = one major section summary:

```jsx
function OverviewTab() {
  return (
    <div className="space-y-4">
      <SummaryRow
        section="MARKETING" subtitle="Attraction & Analytics"
        icon={BarChart2} accent="violet"
        hero="177" heroSub="New leads this period"
        stats={[{ label: "Avg CPL", value: "$29" }]}
        delta="+$4 vs last period" isPositive={false}
        chartData={marketingChartData} chartColor="#8b5cf6"
      />
      <SummaryRow
        section="SALES" subtitle="Cash & Conversion"
        icon={DollarSign} accent="emerald"
        hero="$33,773" heroSub="Revenue this period"
        stats={[{ label: "Close rate", value: "40%" }, { label: "Bookings", value: "45" }]}
        delta="+15%" isPositive={true}
        chartData={salesChartData} chartColor="#10b981"
      />
      <SummaryRow
        section="HUSTLE" subtitle="The Human Operator"
        icon={Flame} accent="amber"
        hero="3" heroSub="Day streak (best: 14)"
        stats={[{ label: "Completion rate", value: "28%" }, { label: "Perfect days", value: "27" }]}
        chartData={heatmapPreview} isHeatmap={true}
      />
    </div>
  )
}

function SummaryRow({ section, subtitle, icon: Icon, accent, hero, heroSub, stats, delta, isPositive, chartData, chartColor, isHeatmap }) {
  const accentColors = {
    violet: { bg: "bg-violet-50", text: "text-violet-500" },
    emerald: { bg: "bg-emerald-50", text: "text-emerald-500" },
    amber:   { bg: "bg-amber-50",   text: "text-amber-500"  },
    blue:    { bg: "bg-blue-50",    text: "text-blue-500"   },
  }
  const c = accentColors[accent]
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-8">
      <div className="w-80 flex-shrink-0">
        <div className="flex items-center gap-2.5 mb-4">
          <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center`}>
            <Icon className={`w-4 h-4 ${c.text}`} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">{section}</p>
            <p className="text-xs text-gray-400">{subtitle}</p>
          </div>
        </div>
        <p className="text-3xl font-semibold text-gray-900">{hero}</p>
        <p className="text-xs text-gray-400 mt-0.5 mb-3">{heroSub}</p>
        <div className="flex items-center gap-5">
          {stats.map(s => (
            <div key={s.label}>
              <p className="text-sm font-semibold text-gray-900">{s.value}</p>
              <p className="text-[11px] text-gray-400">{s.label}</p>
            </div>
          ))}
          {delta && (
            <span className={`text-xs font-medium ${isPositive ? "text-emerald-500" : "text-red-500"}`}>
              {isPositive ? "↑" : "↓"} {delta}
            </span>
          )}
        </div>
      </div>
      <div className="flex-1 h-28">
        {/* chart or heatmap preview */}
      </div>
    </div>
  )
}
```

---

## Quality Checklist

- [ ] Sidebar: dark active state, section group labels, logo with workspace switcher chevron
- [ ] Tabs: individual card-style buttons with icon + label, complete content switch per tab
- [ ] KPI cards: tinted icon + uppercase label + large number + plain delta text (no pill badge)
- [ ] Charts: `axisLine={false}` `tickLine={false}`, axis tick `fill="#d1d5db"`, faint grid
- [ ] Line charts: `strokeWidth={1.5}` `dot={false}` — clean minimal lines, no fill
- [ ] Dual Y-axis when two different units on one chart (e.g. $ spend + CPL $)
- [ ] AI/insight panel in each relevant tab with specific, realistic narrative text
- [ ] Overview tab = stacked summary rows, NOT a KPI card grid
- [ ] Per-tab accent color applied to icons, delta text, chart strokes
- [ ] Hustle tab includes heatmap + streak stats + task checklist
- [ ] Sales tab includes radial gauge for performance score
- [ ] Marketing tab includes lead source bar-list + AI alerts feed
- [ ] All cards: `rounded-2xl border border-gray-100`
- [ ] Mock data: real dates, plausible numbers, domain-appropriate labels

---

## Anti-Patterns

| Wrong | Right |
|---|---|
| Delta as pill/badge with background | Plain colored text: `↑ +12% vs last period` |
| `rounded-xl` | `rounded-2xl` |
| Blue as the only accent color | Per-tab accent: violet, emerald, amber, blue |
| Generic "Dashboard" as page title | Branded: "Studio Operating System" |
| No AI panel | Every tab has an insight or alert card |
| Active sidebar = blue bg | Active sidebar = `bg-gray-900 text-white` |
| Tabs in a pill/toggle container | Individual card-style buttons |
| Overview = same KPI grid as other tabs | Overview = stacked summary rows with inline charts |
| Bright saturated area fills | Gradient: 0.08 opacity top → 0 bottom |
| Fake placeholder data ("Item 1", "$1000") | Realistic: actual names, dates, plausible figures |

---

## When Working in the P2P Ads Generator Codebase

The tokens above are correct for standalone dashboard artifacts (`.jsx` demos, Figma-to-code).
When building inside `src/` of this Next.js app, apply these overrides instead:

### Chart Library Override
**Do not use raw Recharts.** Import from shadcn/ui chart primitives:
```tsx
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
```
`ChartContainer` handles CSS-var theming (`var(--chart-1)`, `var(--chart-2)`) and responsive sizing.
Canonical example: `src/components/charts/UsageAreaChart.tsx`

### Token Overrides

| Element | This Skill (generic) | This Project |
|---|---|---|
| KPI number | `text-3xl font-semibold` | `text-[28px] tracking-tight tabular-nums` |
| KPI label | `text-[10px] tracking-[0.12em]` | `text-[11px] tracking-[0.08em] text-gray-400` |
| Section header | `text-2xl font-bold` | `text-[15px] font-semibold text-gray-900` |
| Page title | `text-2xl font-bold` | `text-[22px] tracking-tight text-gray-900` |
| Card border | `border border-gray-100` | `shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_6px_rgba(0,0,0,0.04)]` |
| Page background | `bg-gray-50` | `bg-[#fafafa]` |
| Card corners | `rounded-2xl` | `rounded-xl` |

### KPI Grid Pattern (Connected Tiles)
For admin-style multi-stat grids, use the Tailwind UI gap-px pattern — NOT individual cards:
```tsx
<dl className="grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4 rounded-xl overflow-hidden">
  {items.map(item => (
    <div key={item.label} className="flex flex-col gap-1.5 bg-white px-5 py-5">
      <div className="flex items-center gap-2.5">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.iconBg}`}>
          <item.icon className={`h-4 w-4 ${item.iconColor}`} />
        </div>
        <dt className="text-[11px] uppercase tracking-[0.08em] text-gray-400">{item.label}</dt>
      </div>
      <dd className="text-[28px] tracking-tight text-gray-900 tabular-nums">{item.value}</dd>
    </div>
  ))}
</dl>
```
Canonical example: `src/app/(admin)/admin/stats/page.tsx`

### Layout Shell
This app uses viewport-lock layout. Every new page/tab must follow the chain:
```
h-screen overflow-hidden   ← layout root
  flex-1 overflow-auto     ← scrollable main area
    px-8 py-7              ← content padding INSIDE the scroll container, not on the shell
```
Do NOT use `min-h-screen` or put padding on the layout shell.
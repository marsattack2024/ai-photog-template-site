---
name: measurement-plan
description: Phase 4 of marketing workflow. Creates measurement and analytics plan with metrics, attribution, UTM strategy, and kill criteria.
user-invocable: true
allowed-tools: Read, Write, Glob
argument-hint: <product/service description>
---

# Measurement Plan

Product/Service: $ARGUMENTS

## Prerequisites
Read these first:
- `docs/funnel-architecture.md` — conversion metrics, funnel stages
- `docs/market-research.md` — for context on what we're measuring

## Process
1. Read template at `docs/templates/marketing/measurement-plan.md`
2. Design the measurement framework
3. Write to `docs/measurement-plan.md`

## Required Deliverables

### Primary Metric
- Metric name (e.g., "Cost per qualified lead")
- Target number with timeframe (e.g., "$25 CPL within 30 days")
- Why this metric matters most

### Secondary Metrics (3-5)
For each: name, target, measurement method. Examples:
- Landing page conversion rate (target: 3-5%)
- Email open rate (target: 25-35%)
- Email click-through rate (target: 3-5%)
- Ad click-through rate (target: 1-2%)
- Customer acquisition cost

### Attribution Method
- Which model (first-touch, last-touch, multi-touch, or simple)
- Tools to use (GA4, pixel tracking, UTM parameters)

### UTM Structure
- Naming convention: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`
- Examples for each channel (paid ads, email, organic)
- Documentation for team consistency

### Test Duration & Sample Size
- Minimum test duration before evaluating
- Minimum sample size per variant for statistical significance
- How to calculate (or rule of thumb)

### Kill Criteria
- When to stop a campaign (specific thresholds)
- When to pivot the approach
- When to scale up

## Verification
- All metrics have specific target numbers
- UTM convention has concrete examples
- Kill criteria use numbers, not vibes

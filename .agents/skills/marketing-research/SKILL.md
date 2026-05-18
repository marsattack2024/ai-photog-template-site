---
name: marketing-research
description: Phase 1 of marketing workflow. Conducts market research including competitors, positioning, objections, and emotional triggers.
user-invocable: true
allowed-tools: Read, Write, Glob, Grep
argument-hint: <product/service description>
---

# Market Research

Product/Service: $ARGUMENTS

## Process
1. Read template at `docs/templates/marketing/market-research.md`
2. Research and analyze the market for this product/service
3. Write findings to `docs/market-research.md`

## Required Deliverables
- **5+ Competitors**: Name, URL, positioning, strengths, weaknesses, pricing model
- **Target Persona**: Specific person (name, age, job title, daily routine, biggest frustration, what they've tried, why it failed)
- **3 Positioning Angles**: How this product differentiates. Each angle needs: hook, proof point, emotional trigger
- **5+ Objections**: What the target persona would say to resist buying. Each needs a response strategy.
- **3+ Dominant Emotions**: Fear, desire, or frustration triggers with specific scenarios

## Verification
- No section left empty or with placeholder text
- Persona is a specific person, not a demographic range
- Objections are realistic, not strawmen
- Emotions reference specific situations, not abstractions

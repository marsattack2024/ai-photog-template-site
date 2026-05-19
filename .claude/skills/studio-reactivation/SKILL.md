---
name: studio-reactivation
description: "Run a complete dead lead reactivation campaign for any portrait photography studio — blast copy, lead bucketing, follow-up sequences for each response type, and event invitation bridge for maybes. Use whenever a photographer asks to reactivate old leads, wake up a dead CRM, run a $20K Friday, text their list, send a reactivation campaign, recover unbooked leads, or says things like 'I have a bunch of leads that never booked,' 'I want to reach back out to my old inquiries,' 'how do I fill my calendar from leads I already have,' 'my CRM is full of cold leads,' 'I want to text my list,' 'how do I get old leads to book,' or 'I paid for these leads and nothing happened.' Also trigger when a new studio client is onboarded and has any existing leads — reactivation is the first campaign to run before spending a dollar on new ads. Genre-aware. Works for boudoir, newborn, maternity, family, branding, wedding, and senior studios."
---

# Studio Reactivation System

You are running a dead lead reactivation campaign for a portrait photography studio. Your job is to produce the complete system — blast copy, bucketing instructions, and follow-up sequences for every response type — built around the P2P Revenue Formula.

**Revenue Formula position:** This system moves Booking Rate. Every lead in the CRM was already paid for. Reactivation converts them at near-zero cost. Run this before any new ad spend.

**Rule: Never invent testimonials, numbers, or results. If proof is needed and none exists, flag it with [TODO: confirm with studio].**

---

## Before You Start: Stage Dispatch

| Stage | Output | Reference File |
|-------|--------|----------------|
| 1 — Intake | Studio profile + lead pool summary | (inline below) |
| 2 — Blast Copy | Text + email for the full list | `references/copy-templates.md` |
| 3 — Bucketing | Response sorting guide + per-bucket instructions | `references/bucketing-guide.md` |
| 4 — Maybe Sequence | Event invitation or standard follow-up for soft yeses | `references/copy-templates.md` |
| 5 — Long-Term Bridge | How unbooked leads re-enter nurture | `references/bucketing-guide.md` |

Load the relevant reference file at each stage. Do not work from memory.

---

## Session Opener

When this skill activates:

"Let's reactivate your lead list. This is usually the fastest money in your business — leads you already paid for, sitting untouched. We're going to reach out to all of them, sort the responses into buckets, and build a follow-up plan for each one.

First, a few quick questions about your list."

Then immediately begin Stage 1.

---

## Stage 1 — Intake

Collect the following. Ask conversationally — not as a form. Two to three questions at a time max.

**Required fields:**

- studio_name
- genre (boudoir / newborn / maternity / family / branding / wedding / senior / other)
- crm_lead_count (approximate — "I have about 300 leads" is fine)
- lead_age (how old are most of these leads? last 6 months / 6-18 months / 18 months+ / mixed)
- last_contact_method (never contacted / texted once / emailed only / full follow-up sequence ran)
- session_fee (approximate — used to frame the offer in the blast)
- has_booking_event (yes/no — does the studio want to run a Group Bonanza preview event for maybes?)

**If has_booking_event is yes:** Flag that Stage 4 will produce event invitation copy instead of standard follow-up. Reference the studio-booking-event skill for the full event build.

**Handling unknowns:**
- Unknown lead count → "Even a rough estimate works — 50, 200, 500?"
- Unknown last contact → assume never properly followed up. Note it.
- Unknown session fee → ask for a range. Use mid-range for copy.

**Mid-campaign entry (blast already sent):**
If the studio has already sent a reactivation blast, skip Stage 2. Ask: "What did the responses look like — how many yeses, maybes, and no responses did you get?" Then jump directly to Stage 3 bucketing with the responses they have. The copy templates are still available for the maybe sequence in Stage 4.

After intake, confirm the profile before Stage 2:

"Here's what I have: [studio name], [genre], [lead count] leads, most of them [age range], last contacted by [method]. Ready to build the campaign?"

---

## Stage 2 — Blast Copy

Load `references/copy-templates.md` before writing any copy.

Produce three assets:
1. The reactivation text (primary touch — sent first)
2. The reactivation email (sent same day or next day)
3. The subject line bank (5 options for the email)

**Rules for blast copy:**
- The text is personal. First name, no links, no booking pressure. Its only job is to get a reply.
- The email is slightly warmer and can include a soft CTA (reply to this email, not a booking link).
- No discounts in the blast. The offer comes later, to maybes only, not the entire list.
- Tone matches the genre. Boudoir = empathetic and personal. Newborn = timing-aware. Family = seasonal and legacy. Branding = ROI-aware.
- Never mass-blast more than 200 contacts per day to avoid spam flags. Note this in the output.

After producing copy, show it and ask: "Does this match the voice you use with clients? Anything to adjust before we build the bucketing guide?"

---

## Stage 3 — Bucketing

Load `references/bucketing-guide.md` before writing instructions.

Every response to the blast falls into one of four buckets. Produce the bucketing guide customized to this studio's genre and CRM stage names if known.

**Bucket 1 — Direct Yes**
They're ready. Close normally. Use the studio's standard consultation script. No special offer needed.

Output: One-line instruction. "Move to consultation scheduled. Call within 2 hours of response."

**Bucket 2 — Maybe / Soft Yes**
"I'm still thinking about it." "The timing is almost right." "Tell me more." "I've been meaning to reach out."

This is the largest bucket and the most valuable. These leads need a next step that isn't another phone call — the standard follow-up already failed on them.

Output: Customized maybe-response copy + decision fork:
- If has_booking_event = yes → event invitation sequence (Stage 4A)
- If has_booking_event = no → standard soft follow-up sequence (Stage 4B)

**Bucket 3 — Not Right Now**
Timing is genuinely wrong. Life circumstances. Not a no — a pause.

Output: One brief response text + instruction to move to long-term nurture. No more active follow-up. Weekly email list. Quarterly reactivation.

**Bucket 4 — Hard No / No Response**
Explicit no, or no response after 3 attempts over 5 days.

Output: Instruction to move to email-only. Do not remove from list. Flag for next quarterly reactivation. Note: no response is not a no — it is a not-yet.

---

## Stage 4A — Maybe Sequence (Event Invitation)

Use when has_booking_event = yes.

Load `references/copy-templates.md` — Event Invitation section.

Produce:
1. Personal event invitation text (sent after maybe response)
2. Event invitation email (sent same day)
3. RSVP confirmation text
4. 48-hour reminder text
5. Day-of reminder text

Copy is personalized to the studio's genre and the specific lead's earlier inquiry where possible (e.g., "You reached out a while back about a boudoir session" not a generic "you inquired").

Flag: Full event build (offer stack, event structure, landing page) lives in the studio-booking-event skill. This stage produces only the invite sequence that bridges reactivation to the event.

---

## Stage 4B — Maybe Sequence (Standard Follow-Up)

Use when has_booking_event = no.

Produce a 5-message sequence over 14 days for maybes who didn't get an event invitation:

- Day 1: Warm response to their "maybe" — acknowledge, don't push
- Day 3: Value deposit — share a client story or result relevant to their objection
- Day 7: Soft ask — "The timing might be right now. Want to talk?"
- Day 10: Social proof — a testimonial or transformation that speaks to their hesitation
- Day 14: Final reach — "I don't want to keep bugging you. But I'd hate for you to miss this. Last message unless I hear from you."

All copy is genre-specific. Load the genre section of `references/copy-templates.md`.

---

## Stage 5 — Long-Term Bridge

After the campaign clears, every unbooked lead re-enters one of two tracks:

**Track A — Active Nurture (Bucket 2 and 3)**
Weekly email list. At minimum: one value email per week, one seasonal offer per quarter, one personal check-in text per month. These are hares and tortoises. They will book. The studio's job is to stay top-of-mind until they do.

Output: 3-sentence instruction on how to tag and segment these leads in their CRM.

**Track B — Quarterly Reactivation (Bucket 4)**
Every 90 days, pull the no-response bucket and run a mini blast. New message, new angle, new seasonal hook. Some of these become hares on the second or third contact.

Output: One-paragraph reminder and calendar note to run this quarterly.

Close Stage 5 with:

"Your reactivation campaign is ready. Here's a summary of what we built: [list outputs]. The first message goes out tomorrow — no more than 200 contacts per day. Watch for replies, sort them into buckets, and run each sequence. This is the fastest revenue in your business right now."

---

## Revenue Formula Callout (Include in Every Summary)

"Before you spend another dollar on ads, work this list. If you have [lead_count] leads and your average sale is [average_sale or genre benchmark], converting just 2% of this list produces [math]. That's revenue from leads you already paid for."

Use these genre benchmarks if average sale is unknown:
- Boudoir: $1,500 — $3,500
- Newborn: $1,200 — $2,500
- Family: $800 — $2,000
- Branding: $1,000 — $3,000
- Wedding: $2,500 — $5,000+

---

## Companion Skills

- **studio-booking-event** — Full Group Bonanza build for Bucket 2 maybes
- **studio-gtm-strategy** — Stage 0 of GTM strategy forks here before new ad spend
- **facebook-ad-engine** — If reactivation exhausts the list, next step is new lead generation

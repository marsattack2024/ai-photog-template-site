---
name: studio-booking-event
description: "Build a complete Booking Event (Group Bonanza) system for any portrait photography studio — a live in-studio preview night that converts warm leads and maybes into booked sessions in a single evening. Produces the event structure, three-tier offer stack, all invite copy, RSVP landing page copy, same-night close scripts, and post-event follow-up sequences. Use whenever a photographer wants to run a live booking event, studio preview night, open house, in-person campaign, group demo, or says things like 'I want to bring leads into the studio,' 'how do I convert my maybes,' 'I want to do a group event,' 'run a preview night,' 'fill my calendar from one event,' 'Group Bonanza,' 'studio open house,' or 'how do I close leads who won't book over the phone.' Also trigger when the studio-reactivation skill has produced a bucket of maybes and the studio wants to convert them in person. Works for boudoir, newborn, maternity, family, branding, and senior studios. Genre-aware."
---

# Studio Booking Event System

You are building a live in-studio booking event for a portrait photography studio — the Group Bonanza. Your job is to produce the complete system: entry point identification, event blueprint, three-tier offer stack, all copy assets, and the post-event follow-up machine.

**Revenue Formula position:** This system primarily moves Booking Rate — it converts leads that ads, quizzes, and phone consultations couldn't close. In the cold traffic version (Entry Point 2 and 4), it also moves Leads.

**Rule: Never invent testimonials, numbers, or results. Flag anything unverified with [TODO: confirm with studio].**

**Output format:** Use `deliverable-format`. Default to Google-Doc-ready
Markdown for the event plan, offer stack, RSVP copy, scripts, and follow-up
handoff. Create a Google Doc only when the connector is available and the user
wants a shareable review artifact.

---

## Stage Dispatch

| Stage | Output | Reference File |
|-------|--------|----------------|
| 1 — Intake | Studio profile + entry point selection | (inline below) |
| 2 — Event Blueprint | Custom event runsheet with timing | `stages/02-event-blueprint.md` |
| 3 — Offer Stack | Three-tier offer built for this studio | `stages/03-offer-stack.md` |
| 4 — Copy Assets | All invite, landing page, and follow-up copy | `stages/04-copy-assets.md` |
| 5 — Post-Event System | No-show sequence + non-converter follow-up | `stages/04-copy-assets.md` |

Load each stage file before executing. Do not work from memory.

---

## Session Opener

"Let's build your Booking Event. This is the system that closes the leads your phone can't — by letting them watch a real session before they decide anything.

By the end of this build you'll have a complete runsheet for the night, a three-tier offer stack, every piece of copy from the first invite to the post-event follow-up, and a landing page structure for RSVPs.

A few quick questions to start."

Then immediately begin Stage 1.

---

## Stage 1 — Intake

Collect these fields conversationally. Two to three questions at a time.

**Required fields:**

- studio_name
- genre (boudoir / newborn / maternity / family / branding / senior)
- entry_point (see below)
- lead_source_size (how many leads are available to invite — from CRM, referrals, or cold traffic)
- session_fee (used to frame the Tier 1 gift voucher offer)
- average_sale (used for offer math — use genre benchmark if unknown)
- has_past_client_model (yes/no — does the studio have a willing past client to be the model, or will they use someone else?)
- event_date (confirmed or TBD — needed for copy)
- venue (at the studio / rented space / TBD)

**Entry Point Selection — ask directly:**

"How are people finding out about this event? Are you inviting leads from your existing list, running ads to get new people in, using it as a launch for a new studio, or having past clients bring friends?"

| Entry Point | Description |
|-------------|-------------|
| 1 — Reactivation | Inviting maybes and cold leads from existing CRM |
| 2 — New Studio Launch | No list — cold traffic ad fills the event |
| 3 — Ongoing CRM | Monthly/recurring event fed by unbooked funnel leads |
| 4 — Referral | Past clients bring guests |

Multiple entry points can run simultaneously (e.g., reactivation maybes + a referral push + a cold ad).

**Handling unknowns:**
- Unknown average sale → use genre benchmarks: boudoir $2,000, newborn $1,500, family $1,200, branding $1,500
- Unknown event date → use [date TBD] in copy and flag for studio to fill in
- No past client model → note it; the event still works with a friend or referral model, but flag that a past client's story is stronger

After intake, confirm:

"Here's what I have: [studio name], [genre], running a [entry point] Booking Event on [date or TBD] for [lead count] invited guests. Session fee [X], average sale [Y]. Ready to build?"

---

## Companion Skills

- **studio-reactivation** — Produces the Bucket 2 maybe pool that feeds Entry Point 1
- **studio-gtm-strategy** — Full acquisition system; this event is a standalone conversion layer within it
- **facebook-ad-engine** — Ad copy for Entry Point 2 (cold traffic) and Entry Point 4 (referral)
- **landing-page-builder** — Production HTML for the RSVP page

# Stage 0 — Reactivation Check

## Purpose

Before building a new marketing system, check whether the studio already has leads that can be converted at near-zero cost. This is the highest-ROI move available to any studio with an existing CRM. Running new ads before exhausting existing leads wastes money.

**Revenue Formula position:** Reactivation moves Booking Rate using leads already on the Leads line. It costs nothing but time. Every booking from this campaign is pure margin.

---

## The Check

Ask the studio one question after collecting their basic info in Stage 1:

"Before we build your full marketing system — do you have any existing leads in a CRM or contact list? Even old ones that never booked?"

**If yes:** Route immediately. Do not skip this.

**If no:** Proceed to Stage 1 normally.

---

## Routing Logic

### Path A — Has Existing Leads → Run Reactivation First

**Trigger conditions (any one of these):**
- Studio has 50+ unbooked leads in a CRM
- Studio has a contact list from past inquiries (even spreadsheet or DMs)
- Studio ran ads before but "nothing happened"
- Studio says "I have leads but they never booked"
- Studio has run a previous campaign with opt-ins that didn't convert

**What to say:**

"Before we spend anything on new ads, there's a faster move. You have [X] leads that already expressed interest — they raised their hand and you paid to get them. Reactivating that list costs nothing and typically converts at 2-5%. At your average sale, that's [$math] in potential revenue before we run a single new ad.

I want to run the reactivation campaign first. It usually takes 1-2 weeks to work through and pays for everything else we build.

Ready to do that before we go to Stage 1?"

**If they say yes:** Activate the `studio-reactivation` skill. Complete the reactivation campaign. Return to Stage 1 after the blast has gone out and first responses have been sorted.

**If they prefer to build the full system first:** Note the existing leads. Add a reactivation reminder to the Stage 8 summary. Flag it as the first execution priority once the system is live.

---

### Path B — No Existing Leads → Proceed Normally

No existing lead pipeline. Stage 0 is complete. Move to Stage 1 — Studio Discovery.

Brief acknowledgment: "Got it — we're building from scratch. That's fine. Let's start with your studio."

---

### Path C — Leads Exist But Studio Is Mid-Campaign

Studio has already sent a reactivation blast and has responses coming in.

**What to say:**

"Sounds like you've already started — good. Let's make sure you're working those responses correctly before we build anything new. Activate the `studio-reactivation` skill and jump to Stage 3 — Bucketing. Sort what you have, run the maybe sequence, then come back here for the full GTM build."

---

## Revenue Math (Show This Every Time Existing Leads Exist)

Pull lead_count and use genre average sale benchmarks from the reactivation skill if actual average sale is unknown.

"You have [lead_count] leads. Converting 2% produces [lead_count × 0.02] bookings. At [average_sale], that's [$math] before we touch a new ad campaign. That's not a maybe — studios run this regularly and recover $20K-$50K from lists they thought were dead."

---

## Context Object Updates

After Stage 0, add to the studio context object:

```
existing_leads: [yes/no]
lead_count: [number or estimate]
reactivation_status: [not started / in progress / complete]
reactivation_revenue_estimate: [$math]
```

This carries forward into the Stage 8 summary so the final implementation plan accounts for where the studio is in their reactivation campaign.

---

## Handoff to Stage 1

Once Stage 0 is resolved — either reactivation is underway or confirmed not applicable — proceed:

"Now let's build the system that keeps filling your pipeline with new leads. Tell me your studio name and website URL."

Then load `stages/01-studio-discovery.md`.

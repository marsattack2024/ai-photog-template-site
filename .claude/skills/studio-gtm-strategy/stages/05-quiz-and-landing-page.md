# Stage 5: Quiz Inquiry Machine & Landing Page

This is the primary lead capture system. Not a contact form. Not a "book now" button. A Quiz Inquiry Machine that educates, handles objections, showcases the studio's USP, and pre-sells — all before the photographer ever picks up the phone.

Load `references/quiz-templates.md` for genre-specific templates.

## Part A: The Quiz Inquiry Machine

### How It Works

The quiz is an interactive Q&A that lives as an exit popup on the website AND as a standalone page you run ads to.

**Structure:**
1. **Welcome/Title Slide:** Headline with offer ("Claim Your $[X] Credit Toward Your Session and Albums! Can You Get [3-5] Right?")
2. **Question Slides:** 3-5 questions that address the genre's biggest objections
3. **Statement Slides:** After each question, a 150+ word statement educates and showcases the studio's USP
4. **"Fair Enough" Slide:** If they say no to the offer, this slide acknowledges hesitation and encourages reconsideration
5. **Lead Capture:** Name, email, phone number — in exchange for the voucher/credit
6. **Optional:** "Why do you want to do this?" open-ended question (gives phone call context, may slightly reduce completion)

### Choosing Questions

Do NOT pick generic questions. Pick the 3-5 objections that, when answered, let you showcase something unique about this studio.

**The formula: Major objection + this studio's specific answer = a reason to book here and nobody else.**

Pull directly from the Stage 3 Objection-Handling Map (the "Quiz Statement Angle" column).

Every photographer can say "no modeling experience needed." But if THIS studio has a 90-minute guided session with a dedicated posing coach — that's the statement slide. Every newborn studio can say "we provide outfits." But if THIS studio has a curated wardrobe with 200 hand-selected pieces — that's the benefit worth highlighting.

### Statement Slide Rules

Each statement slide must be:
- **Minimum 150 words** — this is the education and trust-building
- **Genre-specific** — address the real fear behind the question
- **USP-loaded** — mention this studio's specific differentiator in the answer
- **Warm and confident** — coach energy, not salesperson
- **Ends with a reinforcement** of why this studio is different

### The "Fair Enough" Slide

This is for people who take the quiz but decline the offer. Instead of losing them:

"Fair enough! Choosing a [genre] photographer is a big decision, and I want you to feel 100% confident. Here's what I can tell you: [1-2 sentences about what makes this studio special]. When you're ready to explore whether this is right for you, we'll be here. [Soft CTA — 'Check availability' or 'Learn more about the experience']"

Recovery rate: 10-15% of people who initially said "no" come back through the Fair Enough slide.

### Quiz Output

Produce a complete Typeform-ready blueprint:

```
QUIZ BLUEPRINT: [Studio Name] — [Genre] Quiz Inquiry Machine

TITLE SLIDE:
Headline: "[Offer headline — e.g., 'Claim Your $100 Credit! Can You Get 4/4 Right?']"
Subheadline: "[Brief description of what they'll learn]"
Image direction: [what photo to use]

QUESTION 1: [Question text]
Options:
a. [Wrong answer — humorous]
b. [Wrong answer — common misconception]
c. [Wrong answer — another misconception]
d. [Correct answer — maps to studio's strength]

STATEMENT 1: (150+ words)
[Full statement text — educates, handles the objection, showcases USP]

QUESTION 2: [Question text]
[Same format...]

STATEMENT 2: (150+ words)
[Full statement text...]

[Repeat for 3-5 questions]

OFFER SLIDE:
"Great news — you got [X] out of [Y] right! To celebrate, here's your [offer]. [CTA to claim]"

FAIR ENOUGH SLIDE:
[Full Fair Enough text — 100+ words]

LEAD CAPTURE:
- Email (required)
- First name (required)
- Phone number (required)
- "Why are you interested in [genre] photography?" (optional)

REDIRECT AFTER COMPLETION:
-> Thank-you page with: video, scheduler, investment context, social proof
```

### Where the Quiz Lives

- **Exit popup** on every page of the website (homepage, portfolio, about, blog) — triggers on browse time or exit intent
- **Standalone page** — dedicated URL for linking from ads, social media, email campaigns
- **Website navigation** — "Take the Quiz" or "Get Your $[X] Credit" button in the main nav bar
- **Exception:** Not on campaign-specific landing pages that already have a targeted offer

## Part B: The Landing Page

The landing page is where ads send traffic. It can either embed the quiz directly or drive to the quiz as the CTA.

### The 8-Section Architecture

**Freedom level: LOW.** Follow this exact order.

#### 1. Hero Section (above the fold)
- Headline: Matches the ad hook (message match rule)
- Subheadline: The USP statement or positioning from Stage 3
- Hero image placeholder (best portfolio piece for this genre)
- Primary CTA button ("Take the Quiz" or "Claim Your $[X] Credit")
- Optional: Google rating stars, client count, "As seen in"

#### 2. Problem Agitation
- 3-5 bullet points using 3 AM Thoughts from Stage 3 ("you" language)
- End with: "Sound familiar? You're not alone — and there's a better way."

#### 3. The Studio Difference (Insight Section)
- "Here's what most [genre] studios get wrong..."
- 2-3 paragraphs positioning this studio's approach as different
- Use the competitor gap from Stage 1
- Build authority before the pitch

#### 4. The Experience (How It Works)
- Step 1: Take the quiz / Book your consultation
- Step 2: Your personalized session (mention key USP elements — wardrobe, styling, guided posing)
- Step 3: Your reveal — see your images and choose your favorites
- 1-2 sentences each. Simplicity reduces friction.

#### 5. Social Proof
- 2-3 testimonials from the social proof inventory
- Name, photo placeholder, specific quote
- At least one formatted as Story Proof ("I almost didn't...")
- If no testimonials available: [TODO: add testimonial] and instruct photographer to collect

#### 6. Portfolio Preview
- 4-6 image placeholders with direction on what to show
- Genre-appropriate (boudoir: variety of body types and styles; newborn: different setups; family: candid + posed mix)

#### 7. FAQ / Objection Handling
- Top 5 objections from Stage 3 as expandable FAQ
- Use the ad hook versions of each answer (concise, confident)

#### 8. Final CTA
- Restate headline or variation
- CTA button (same as hero)
- Offer reminder
- Optional: "Limited to [X] sessions per month" (only if true)

### HTML Artifact Requirements

- Self-contained single HTML file with inline CSS
- Mobile-first responsive (flexbox/grid, no fixed widths)
- System font stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- Primary CTA color as CSS variable
- All images as placeholder divs with descriptive text
- HTML comments marking each section
- No navigation menu
- CTA button in sections 1, 4, and 8 minimum
- Max content width: 720px centered
- Body text: 18px, line-height 1.6

## Stage 5 Output

1. **Quiz Inquiry Machine Blueprint** — Complete Typeform-ready document with all questions, statements, Fair Enough slide, offer, and lead capture flow
2. **Landing Page** — HTML artifact with all 8 sections, quiz CTA integration, mobile-responsive

**Revenue Formula connection:** This stage is the primary Leads lever — the quiz converts 3-5x more visitors than a contact form. It also improves Booking Rate because quiz leads are pre-educated and pre-sold by the time the phone rings.

## Phase 2 Complete

Output updated **Context Handoff Block** with quiz questions and landing page headline added. "Creative assets are done. Phase 3 is the automation layer — follow-up sequences, phone script, and your implementation plan. Ready?"

## Quality Gate

- [ ] Quiz has 3-5 objection-based questions (not personality quiz fluff)
- [ ] Every statement slide is 150+ words
- [ ] Every statement slide showcases a studio-specific USP element
- [ ] "Fair Enough" slide included
- [ ] Offer/incentive clearly stated on title slide
- [ ] Lead capture collects name + email + phone
- [ ] Landing page headline matches strongest ad hook
- [ ] All 8 landing page sections present in order
- [ ] Single CTA throughout (quiz or consultation)
- [ ] Testimonials use real quotes or clearly marked TODO
- [ ] HTML is self-contained, mobile-first
- [ ] Context Handoff Block updated

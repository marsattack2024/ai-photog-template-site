---
name: typeform-quiz-popup-builder
description: builds genre-agnostic typeform quiz popups for photography studios using a challenge-style, offer-driven format. use when chatgpt needs to create, rewrite, review, or improve a quiz popup for boudoir, newborn, maternity, family, branding, headshots, wedding, senior, or other photography genres, especially when the quiz should feel like a can-you-get-this-right challenge that addresses objections, teaches the prospect something useful, and helps them claim a specific offer.
---

Build the quiz in the photographer's voice, follow the exact quiz structure in this skill, and keep the output practical for immediate use in Typeform.

## Workflow

Follow this sequence every time:

1. Gather the required inputs using `references/input-questions.md`.
2. Resolve the exact offer before drafting. Do not quietly invent, assume, or downgrade the offer.
3. Review the photographer's website to extract positioning, tone, offers, process details, FAQ-style reassurance, products, privacy language, and booking flow.
4. Combine the website findings with any pasted context from the user.
5. Identify the strongest objections, myths, anxieties, differentiators, and desire angles.
6. Choose the four strongest main-question angles using the challenge-style rules in `references/build-spec.md`.
7. Draft the full quiz using the exact output order in `references/output-template.md`.
8. Add four extra optional example questions that fit the same studio but are not required in the main build.
9. Write a short thank-you page and a short follow-up email.
10. Self-check against `references/build-spec.md` before finalizing.

## Required behavior

- Always build for Typeform.
- Always start by collecting the required inputs unless the user already supplied them.
- Always ask what the offer is unless the user has already provided it clearly.
- Always review the website when a URL is provided.
- Stay genre agnostic. Keep the challenge-style quiz structure consistent, then adapt objections, proof, and differentiators to the studio's genre.
- Use original copy only. Never plagiarize or closely mimic example language.
- Make a best-effort draft when the website is thin, but clearly label assumptions.
- Prefer clarity, conversion, and momentum over flourish.
- Use a friendly, confidence-building, trust-building tone.
- Use humor only in obviously wrong answer options, and keep it light.
- Keep statement slides concise. Target about 70 to 100 words. Do not exceed 100 words unless the user explicitly changes the rule.
- Default to a mix of answer formats across the quiz when it improves flow: standard multiple choice, select-all-that-apply, and true-or-false can all be used.
- Prefer at least one format variation such as a select-all-that-apply question or a true-or-false question when it fits naturally.
- Do not start statement slides with phrases like `The best answer is`. Start with a short bolded headline-style transition, then continue into the body copy.
- When useful, include an `all of the above` answer if multiple listed features or benefits are all true and the reveal will strengthen the studio's value.
- Default to 4 main questions.
- Always include 4 additional example questions after the main quiz.
- Keep the thank-you page short.
- Keep the follow-up email short.
- Do not generate implementation code unless the user asks for it.

## House style for this quiz type

The main quiz should usually feel like a challenge the prospect wants to get right, not a survey about personal preferences.

Use questions that feel answerable and reward the lead with a small aha moment.

Prefer these question types:
- misconception or myth checks
- objection-handling questions
- trust-building questions
- differentiator or value-reveal questions
- practical best-answer questions such as timing, planning, process, or products

Avoid these as the default main-question style unless the user explicitly wants them:
- what do you prefer
- what matters most to you
- how do you feel about
- open-ended opinion prompts dressed up as quiz questions

At least 3 of the 4 main questions should usually have a clear best answer.
The lead should feel like the quiz is helping them learn something useful while moving them closer to booking.
Use answer-type variety to keep the quiz from feeling repetitive, but do not force novelty when simple multiple choice is stronger.

## Offer handling

The offer is a first-class input.

- Ask for the exact offer early.
- Title slide and offer slide should reflect the real offer.
- If the user has not provided the offer, do not quietly proceed as though it is known.
- Either ask for it or use a clearly labeled placeholder such as `[INSERT OFFER: $100 off session fee / free consultation / album credit / VIP waitlist access]`.
- Never invent a guarantee, discount, credit, turnaround time, or policy as a hard fact.

## Quiz structure rules

Use the structure and field order from `references/output-template.md` exactly.

Required sections:
- input summary
- website insights
- welcome offer title slide
- claim slide
- 4 main questions with answer choices and statement slides
- offer slide
- fair enough slide
- additional information collection
- 4 optional example questions
- short thank-you page copy
- short follow-up email

## Content rules

- Include a title slide, offer slide, and claim slide every time.
- Include a fair enough slide every time.
- Frame questions around objections, concerns, features, benefits, or desired outcomes, with a bias toward challenge-style questions rather than survey-style prompts.
- Answer options should usually include 3 to 5 choices for standard multiple choice, but select-all-that-apply and true-or-false are also allowed when they improve the quiz.
- Include at least one clearly reassuring or clearly correct answer when relevant.
- Wrong answers can be playful, but do not make the brand sound unserious.
- Statement slides should open with a short bolded headline-style sentence instead of formulaic phrasing such as `The best answer is`. Then explain the reasoning, reduce anxiety, increase trust, and move the lead closer to booking.
- Avoid generic filler. Mention specific studio differentiators whenever the website supports them.
- If the website reveals products such as albums, wall art, digitals, styling, wardrobe, hair and makeup, prep guides, privacy controls, payment plans, or timeline guidance, use those details where relevant.
- If the website reveals privacy, consent, or image-use language, use that in privacy-related questions.
- If the website does not support a claim, soften the wording instead of inventing proof.

## Decision guidance for weak inputs

If the user gives minimal context:
- Use the website as the main source of truth.
- Infer likely objections from the genre and website copy.
- State a short assumption note in the input summary.
- Still produce the full deliverable.

If the offer is missing:
- Ask for it first whenever the workflow allows.
- If the user explicitly wants a best-effort draft without more back-and-forth, use a clearly labeled placeholder offer.

If the user gives strong context that conflicts with the website:
- Prioritize direct user instructions.
- Use the website mainly for tone, specificity, and proof points.

## References

Use these files as needed:
- `references/input-questions.md` for required intake questions
- `references/build-spec.md` for hard rules and quality checks
- `references/output-template.md` for the exact output structure
- `references/website-research.md` for website research and genre-specific angle ideas
- `references/quiz-style-examples.md` for annotated pattern examples across genres
- `references/question-patterns.md` for reusable challenge-style question frameworks

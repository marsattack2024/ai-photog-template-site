# RSA Copy Framework

Produce responsive search ad assets that are varied, compliant, and matched to search intent.

## Headline Requirements

Create 15 headlines. Each must be 30 characters or fewer.

Include:

1. Brand/studio name if short enough.
2. Main genre keyword.
3. Location keyword.
4. CTA.
5. Process benefit.
6. Product benefit.
7. Proof if verified.
8. Objection answer.
9. Offer if verified.
10. Dynamic keyword insertion if useful.
11. Location insertion if useful.
12. Short differentiator.
13. Secondary service.
14. Consult or inquiry angle.
15. Emotional outcome.

## Headline Roles

Use role labels in output:

- Keyword
- Location
- CTA
- Benefit
- Proof
- Objection
- Offer
- DKI
- Location insertion
- Brand
- Product
- Process

## Dynamic Keyword Insertion

Use sparingly. Default maximum: 3 to 4 headlines out of 15.

Format:
`{KeyWord:Default Text}`

Rules:
- Default text must make sense if Google cannot insert a keyword.
- Do not use DKI in sensitive or awkward lines.
- Avoid lines that could create false claims when combined with user queries.

## Location Insertion

Format:
`{LOCATION(City):Default City}`

Rules:
- Use only in headlines.
- Use when the campaign targets multiple nearby cities.
- Avoid in descriptions.

## Description Requirements

Create 4 descriptions. Each must be 90 characters or fewer.

Each description should do a different job:

1. Main value proposition + CTA.
2. Objection answer + process reassurance.
3. Product/result + location relevance.
4. Offer or consultation angle.

## Tone

Use direct, search-friendly language. Google Ads are not where you get poetic. The prospect is searching with intent. Match that intent clearly.

Good:
- "Private boudoir portraits with guided posing and professional hair and makeup."
- "Book a calm newborn session with gentle posing and a cozy studio."

Weak:
- "Where memories become art forever."
- "Experience the magic of timeless storytelling."

## Character Counting

Always include character counts in the final table when producing assets.

Counting reminders:
- Spaces count.
- Braces in DKI/location insertion count as characters in the asset field.
- Punctuation counts.
- Google may show inserted text differently, but the submitted asset must fit.

## Proof Rules

Only use:
- exact review counts if provided
- awards if provided
- years in business if provided
- published/featured claims if provided
- all-female team if provided
- certified newborn photographer if provided

If proof is promising but unverified, write a safer version and add `<!-- TODO: confirm -->`.

Unsafe:
- "#1 Boudoir Studio"
- "Best Newborn Photographer"
- "Guaranteed Gorgeous Photos"

Safer:
- "Private Boudoir Studio"
- "Newborn Portrait Studio"
- "Guided Photo Session"

## Pinning Guidance

Avoid pinning by default. Pin only when:

- Brand/legal wording must always show.
- The offer must always show.
- The account requires location or compliance language.

If pinning, explain what to pin and why.


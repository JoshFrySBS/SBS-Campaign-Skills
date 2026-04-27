---
name: tov
description: Generate your Tone of Voice document from the strategy document produced by /strategy. The TOV doc becomes the source of truth for all your campaign copy. Run after /strategy.
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - AskUserQuestion
---

# Tone of Voice Document Generator

You generate a complete Tone of Voice document for the user's own business based on their strategy document. The TOV document becomes the source of truth for all outreach copy going forward.

You are a TRANSFORMER, not a creator. You read the strategy document and reformat/deepen the tone-related content into the standalone TOV document. You never invent tone characteristics that were not captured during the strategy call. If information is missing, you flag gaps rather than filling them with assumptions.

This skill is for the user building a TOV for their **own business**. They will sign it off themselves by adding their real writing examples.

---

## Before Starting

**Ask which context this TOV is for (which client, or SBS internal) before any file operations.** The TOV document will be written to `SBS-Internal-Shared/<context>/strategy/` where `<context>` is `clients/<client-name>` or `sbs`.

1. Read the context CLAUDE.md at `SBS-Internal-Shared/<context>/CLAUDE.md` if it exists (business context and brand voice rules).
2. Read `SBS Campaign Skills/COPY_RULES.md` (shared) for the baseline copy and tone rules.
3. Read `SBS Campaign Skills/.claude/skills/tov/reference/tov-document-format.md` (shared) for the output format. The final TOV document must match this structure.
4. Confirm the business name (used in the filename - typically the same name used in the strategy document).
5. Read the strategy document at `SBS-Internal-Shared/<context>/strategy/{name}_Strategy_Document.md`. If it's not there, ask the user where it lives or suggest they run `/strategy` first.
6. Scan `SBS-Internal-Shared/<context>/strategy/` for any other relevant docs (prior TOV drafts, knowledge base notes).

---

## What You Need From the Strategy Document

The strategy document's Tone of Voice section (Section 10) should contain a tone synthesis with:

- Identity and positioning
- Register (formal/semi-formal/casual)
- Tone traits (3-6 with descriptions)
- Content Must Be / Must Not Be
- Hard Rules
- Proof Points (hero result, methodology, testimonials, proof style)
- CTA Style
- Per-ICP notes (register shifts per buyer type)

If any of these are missing or thin, flag them clearly in the output with `[GAP - needs follow-up before copy]` rather than guessing.

---

## Output

**File:** `SBS-Internal-Shared/<context>/strategy/{name}_Tone_Of_Voice_Document.md`

Generate a markdown document with 13 sections following `SBS Campaign Skills/.claude/skills/tov/reference/tov-document-format.md` exactly. The format file contains the full structure, placeholders, and SBS baseline content for each section.

If `SBS-Internal-Shared/<context>/strategy/` does not exist, create it before writing the file.

---

## Section-by-Section Instructions

Use the format reference as your structural guide. These notes cover what content to pull from where.

### Section 1: Who [Business] Is
Identity paragraph. Pull from:
- Strategy Section 2 (Offer Clarity) - plain English description of what they do
- Tone synthesis - positioning (peer/advisor/expert)
- Strategy Section 7 (Differentiator) + tone proof points - track record, methodology, hero stat
- Tone synthesis - named methodology or framework if they have one

Should read like a brief anyone writing copy could scan in 30 seconds and understand who this person is.

### Section 2: Tone Traits
Table with 4-6 traits drawn from the tone synthesis. These must come from what the user actually said, not generic role-based defaults. Each description is a single sentence explaining what the trait means in practice for copy.

### Section 3: Content Must Be
Include the baseline items from the format reference. Add business-specific items from the tone synthesis.

### Section 4: Content Must NOT Be
Include the baseline items. Add business-specific anti-patterns from "words they would never use" in the tone synthesis.

### Section 5: Hard Rules
Include the SBS baseline non-negotiables from the format reference. Add any business-specific non-negotiables from the tone synthesis.

### Section 6: Real Writing Examples
Leave as the `[YOUR INPUT NEEDED]` placeholder. Do not attempt to write examples on the user's behalf - these must be their own real messages.

### Section 7: Calls to Action
**Use these:** Generate 4-6 business-specific soft CTAs based on the user's natural CTA style. They should sound like how the user would naturally end a message.

**Never use:** Include the baseline never-use list from the format reference. Add business-specific items if captured.

### Section 8: Proof Points and Anchors
Table pulling from strategy Section 7 (Differentiator) + tone synthesis proof points. Include:
- Hero result/case study (with usage guidance)
- Named methodology/framework (if they have one)
- Key testimonials (with context on when to use each)
- Referral/trust signals
- Practical differentiators

Each row must tell the copy writer not just WHAT the proof point is, but WHEN and HOW to use it naturally.

### Section 9: Primary ICP Tone
For the primary ICP from strategy Section 1:
- "How to write to [ICP]" bullets - draw from per-ICP notes in tone synthesis
- "Example lines for [ICP]" - generate 5-6 lines in the user's voice demonstrating register, hedge language, and proof usage

### Section 10: Secondary ICP Tone
Only include if the strategy identified a secondary ICP. Same structure as Section 9. If no secondary ICP, omit this section entirely and renumber Section 11 onward as needed - or keep numbering but mark "Not applicable".

### Section 11: Poke-the-Bear Lines
Per ICP. 8-10 lines for primary ICP, 5 for secondary. Rules:
- Short (under 10 words ideal)
- Question format
- Pokes at a specific pain from the strategy document
- Sounds like the user talking to a peer
- Matches the per-ICP register from the tone synthesis

### Section 12: Strategic Angles
Draw from the strategy document's Strategic Angles section, but **rewrite every hook** to match the user's tone. The hooks should sound like the user wrote them, not like generic copy.

### Section 13: Personalisation Patterns
Draw from the strategy document's Personalisation Logic section. Rewrite all example lines to match the user's hedge language, CTA style, and register.

---

## After Generating

Give the user this summary:

> "TOV document generated at `SBS-Internal-Shared/<context>/strategy/{name}_Tone_Of_Voice_Document.md`.
>
> **Before using it for copy:**
> 1. Read through the whole document. Edit anything that doesn't sound like you.
> 2. Check for any `[GAP]` flags - these are sections where the strategy didn't capture enough detail. Add what's missing.
> 3. **Section 6 is the most important.** Paste 3-5 real messages you have actually sent (DMs, emails, LinkedIn messages, proposal excerpts). This teaches AI your actual voice better than any rules.
> 4. Confirm the tone traits and hard rules feel right.
>
> **Next step:** Run `/share-doc` with the path to your TOV document to view it as a properly-formatted Google Doc - much easier to review, edit, and keep to hand than raw markdown.
>
> Once you are happy with it, this becomes the source of truth for every campaign email, personalisation line, and AI prompt you run."

---

## Key Principles

- **Transform, don't create.** Every section should trace back to something captured in the strategy document.
- **Flag gaps, don't fill them.** Missing info gets `[GAP - needs follow-up]`, not assumptions.
- **Sound like the user.** Every example line, hook, and CTA should match their voice, not a generic SBS default tone.
- **The format reference is the template.** Structure, depth, and format should match `reference/tov-document-format.md`.
- **The user signs it off.** This is a draft until they add their writing examples and confirm the tone traits.

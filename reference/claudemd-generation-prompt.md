# CLAUDE.md Generation Prompt

Use this prompt to create your CLAUDE.md from your GTM knowledge base and onboarding documents. Open Claude Code in your business folder and paste this prompt. It will read your documents, ask you any questions it needs answered, and generate a CLAUDE.md tailored to how you work.

---

## The Prompt

Copy and paste this into Claude Code:

```
Read all the documents in my Business Docs folder (knowledge base, onboarding guide, operating principles, and anything else in there) and also read the reference docs in sbs-campaign-skills (PIPELINE.md, COPY_RULES.md, and the files in reference/ and rules/).

Then create a CLAUDE.md in the root of this folder that covers:

1. **Who I am** -- my name, role, and what I do day-to-day at Side by Side
2. **What Side by Side does** -- summarise the business (keep it to 3-4 sentences, focused on what matters for running campaigns)
3. **My responsibilities** -- what I own and what I'm accountable for (outbound campaigns, lead sourcing, Clay pipeline management, campaign performance)
4. **Target ICPs** -- summarise each ICP I'll be targeting. Include the key qualifying signals, company size, industry, and what makes someone a good fit vs a bad fit. Pull this directly from the knowledge base
5. **Voice and tone rules** -- extract the email copy rules and voice guidelines. Include: British English, contractions always, no em dashes, under 90 words, soft CTAs only, hedge language. These are non-negotiable
6. **Campaign workflow** -- the step-by-step flow I follow: source in Clay, run prompts, filter, export, build campaigns, push to Instantly, analyse results
7. **Tools I use** -- Clay, Instantly, Claude Code, the SBS Campaign Skills folder and what each tool does in the workflow
8. **What I never do** -- list the hard rules: never discuss pricing in detail, never promise specific results, never use American tone, never use em dashes, never sound like an AI

IMPORTANT: Before writing the CLAUDE.md, ask me any questions you need answered to fill this out properly. For example: my full name, which ICPs I'm focused on first, which Instantly workspace I'll be using, any specific campaigns I'm starting with, or anything else that's missing from the documents. Don't leave gaps -- ask me first so the CLAUDE.md is complete from the start.

Format it cleanly with markdown headers. Keep it practical and direct. This file is read by Claude Code every session so it needs to give Claude everything it needs to help me do my job.
```

---

## After Generating

Review the CLAUDE.md and:
1. Check all the sections are accurate and complete
2. Add any personal context Claude should know (your background, your working style)
3. Make sure the ICP sections match what Josh has briefed you on
4. Save it in the root of your business folder (not inside sbs-campaign-skills)

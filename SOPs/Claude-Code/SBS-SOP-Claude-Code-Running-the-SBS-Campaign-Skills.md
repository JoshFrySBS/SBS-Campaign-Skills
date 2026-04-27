# SBS SOP — Claude Code — Running the SBS Campaign Skills

**Owner:** Cyprian (GTM Manager)

**Last Updated:** 2026-04-24

**Tools Required:** Claude Code, the `SBS Campaign Skills` folder (provided by Josh), a root project folder with `.claude` set up, Clay account with a configured source table, Instantly account with API access, Google Drive (for share-doc review), a strategy document for the ICP or client you're running.

---

## Purpose

Run the full SBS outbound pipeline — source, research, qualify, personalise, send, analyse — through Claude Code skills instead of doing anything manually, so every campaign ships with prompts scored to 8 out of 10 or better.

## When to Use

Every time you build or run a campaign for SBS or a client. This is the default way to execute. Do not write copy, segment leads, or write prompts by hand.

## Before You Start

- Root working folder is set up with the `.claude` folder in it
- `SBS Campaign Skills/` folder is sitting inside the root, untouched and unrenamed
- `Business Docs/` folder is in the root containing onboarding docs, knowledge base, GTM knowledge base
- `CLAUDE.md` exists at the root and has been kept up to date
- A `strategy/` folder exists with a strategy document for the ICP or client you're about to run
- Clay account is logged in with your source table loaded
- Instantly account is logged in with API access confirmed

## Steps

**Step 1: Open Claude Code in your root folder.**
Always launch from the project root so Claude can read `CLAUDE.md`, the `Business Docs/` knowledge base, and `SBS Campaign Skills/`. This context is what makes the skills work.

**Step 2: Do not rename or edit anything inside `SBS Campaign Skills/`.**
The folder is read-only from your side. Any campaign-specific work (clients, new ICPs, strategy docs) lives in its own root-level folder. If you rename the skills folder, the update process breaks.

**Step 3: Run the prompt-adapter skill against your strategy document.**
Invoke the prompt-adapter skill and point it at the strategy doc for the ICP or client. The base prompts are already scored 8 to 9 out of 10. The skill adapts them to the new ICP while keeping that quality bar. Output lands in the adapted_prompts folder as `prompt.text` and `prompt.schema`.

**Step 4: Paste the adapted prompt and schema into Clay.**
Copy `prompt.text` into Clay's prompt field. Copy `prompt.schema` into Clay's schema field. These are two separate fields — never combine them into one or Clay will fail to parse the output.

**Step 5: Run 10 rows in Clay as a test.**
Never run the full table first. Ten rows is enough to see if the adapted prompt is performing.

**Step 6: Copy the 10 rows of output back into Claude Code as JSON.**
Paste the Clay output into the Claude Code chat. Ask Claude to score the prompt output against the rubric.

**Step 7: Iterate until the prompt scores 8 out of 10 or higher.**
If the score is below 8, ask Claude to suggest prompt improvements, paste the improved prompt back into Clay, re-run 10 rows, re-score. Keep looping until you hit the 8 bar. Do not run the full table below that threshold.

**Step 8: Run the full Clay table.**
Once the prompt is at 8 or above, run Clay against the full source list. Let it complete before moving on.

**Step 9: Export the Clay results as CSV and place it in the `clay-exports/` folder.**
This is where the campaign-builder skill looks for input.

**Step 10: Run the campaign-builder skill.**
It reads the strategy, reads the adapted prompts, reads the CSV, segments leads into priority / prospect / pass, writes hyper-personalised copy with spintax, checks against spam words, and saves drafts into the drafts folder. You do not segment CSVs by hand, and you do not write sequences by hand.

**Step 11: Review drafts in the Claude Code chat.**
If the copy looks broadly right, move to the next step. If it feels off, feed that back to Claude and regenerate before sharing.

**Step 12: Share-doc the drafts for final edit.**
Run the share-doc skill on the draft campaign so it becomes a readable Google Doc. See [SBS SOP — Claude Code — Using Share Doc](../Claude-Code/SBS-SOP-Claude-Code-Using-Share-Doc.md). Edit tone and voice in Google Docs, not in Claude Code markdown — it's faster and more accurate.

**Step 13: Paste your edits back into Claude Code.**
Tell Claude something like "these are my edits, apply the same voice across the rest of the leads". Claude learns the pattern and refreshes the other drafts.

**Step 14: Let the campaign-builder push everything to Instantly.**
The skill pushes leads, sequences, and schedule into Instantly automatically through the API. You do not export a CSV and upload it manually.

**Step 15: Launch the campaign in Instantly.**
Sanity-check the campaign (sequences, schedule, account assignment) then launch.

**Step 16: After the campaign is running, run the campaign-analyser skill.**
It pulls results from the Instantly API and gives you performance against the original leads and copy that went out.

**Step 17: Save learnings into `CLAUDE.md` or Notion.**
If a prompt variant, segmentation rule, or copy angle performs well, capture it so the next campaign benefits.

**Step 18: If you get stuck, run the guide skill.**
The guide skill knows every SBS Campaign Skill and walks you through step by step. It's the safety net.

## Common Mistakes

- Using any other AI (ChatGPT, Gemini, etc.) for campaign work. Only Claude Code has access to the skills, the knowledge base, and your CLAUDE.md. Using anything else gives worse output and breaks the system.
- Renaming or editing anything inside `SBS Campaign Skills/`. This breaks the update process. Josh keeps the mother version on his machine and can restore, but it causes delay.
- Skipping the 10-row test in Clay. You burn credits and get bad data at scale.
- Running a prompt that hasn't been scored to 8 out of 10. The whole quality bar depends on this.
- Writing email sequences or segmenting CSVs manually. The campaign-builder does both, better and faster.
- Editing draft copy inside Claude Code markdown instead of share-doc'ing it into Google Docs first. It's painful to read and painful to edit.
- Launching a campaign without running campaign-analyser on the previous one. You lose the learning loop.
- Ignoring what the skills save to disk. They're meant to write files — let them.

## Done Checklist

- Adapted prompt scored 8 out of 10 or higher
- Clay table run in full and exported to `clay-exports/`
- Drafts generated by campaign-builder, reviewed, and edited via share-doc
- Leads and sequences pushed to Instantly
- Campaign launched
- Analyser report generated for the previous campaign (if any) and learnings captured
- `CLAUDE.md` updated if anything new was learned

## Loom Recording

Source recordings:
- Cyprian welcome & onboarding call — 2026-04-15 (`Dropbox/SidebySide/Call Recordings/Edited/2026-04-15-cyprian-welcome-onboarding-call/`)
- Weekly sync — 2026-04-24 (`Dropbox/SidebySide/Call Recordings/Edited/2026-04-24-sbs-weekly-sync/`)

Dedicated Loom walkthrough: [TBD — record and link here once filmed]

---

## Open items to confirm with Josh

- Automating the Clay ↔ Claude handoff so prompts and test rows move without copy-paste. Josh said this is too difficult at this stage but is working on it.
- How to structure folders for multiple simultaneous client campaigns inside the same Claude Code workspace.
- Rollback process if an SBS Campaign Skills update breaks something mid-campaign.

# SBS SOP — Claude Code — Using Share Doc

**Owner:** Cyprian (GTM Manager)

**Last Updated:** 2026-04-24

**Tools Required:** Claude Code with the `share-doc` skill installed (part of SBS Campaign Skills), a Google account with Drive access, the n8n share-doc workflow active (already set up on Josh's side).

---

## Purpose

Turn any markdown that Claude Code has generated into a formatted, readable, editable Google Doc — so you can make manual edits, share it with Josh for review, or hand it to a client, then feed your edits back into Claude.

## When to Use

Run share-doc whenever you want to review, edit, or share a document that currently lives as markdown inside Claude Code. In practice that means:

- After the campaign-builder skill produces draft email copy and you want to make voice / tone edits before sending to Instantly
- After plan-mode gives you a plan and you want Josh to review or comment on it
- When you've drafted a strategy document, proposal, contract, or SOP and someone else needs to read it
- Any time you want to do manual edits (tone, phrasing, your own voice) on content Claude has written — it's always faster to edit in Google Docs than in markdown
- When sending a document to a client for review

## Before You Start

- The content you want to share already exists as a markdown file or as output in the Claude Code chat
- You're logged into Google Drive on the same account the share-doc skill is configured against
- You know who the document is for (Josh, a client, internal only) so you can title it correctly

## Steps

**Step 1: Generate the content in Claude Code first.**
Run whatever skill produced it — campaign-builder, strategy, proposal, contract, SOP creator, plan-mode. Do not create content directly in Google Docs. Claude Code is the source of truth.

**Step 2: Review the markdown output in the chat.**
Scan it for anything obviously wrong. If it's fundamentally off, ask Claude to regenerate before sharing. Share-doc is for polish, not for rescuing bad first drafts.

**Step 3: Ask Claude to share-doc the file.**
Something like "share-doc this draft" or "run share-doc on `<path>`" works. Give it a title in the format `SBS — [What the document is] — [Name / Client / Campaign]`, for example `SBS — Draft Campaign Copy — Aeterna Power`.

**Step 4: Wait for the Google Doc link.**
The skill converts the markdown through Pandoc and creates the Google Doc with "anyone with link can view" permissions. It returns the link in the chat.

**Step 5: Open the Google Doc and edit manually.**
This is the whole point. Tweak voice, tighten copy, fix anything that sounds too AI. Do this in plain Google Docs typing — it's faster than prompting Claude to rewrite.

**Step 6: Share the link with whoever needs to see it.**
- If it's for Josh: drop the link in Slack or the weekly sync note
- If it's for a client: make sure the wording is finalised before sharing
- If it's internal only: keep the link for your own reference

**Step 7: Feed your edits back into Claude Code.**
Copy the edited content from Google Docs, paste it back into Claude Code, and tell Claude: "these are my edits, apply the same voice / changes across the rest of the copy" (or across the other leads, or to the rest of the sequence, depending on context). This is the step most people forget — without it, Claude doesn't learn your changes and keeps producing the same AI draft next time.

**Step 8: Re-run share-doc if you want to produce a clean final version.**
After Claude refreshes the rest of the output based on your edits, you can share-doc the updated version so there's a single canonical Google Doc.

## Common Mistakes

- Editing campaign copy or long drafts as raw markdown inside Claude Code. It's unreadable and painful. Share-doc first, then edit in Google Docs.
- Forgetting Step 7 — making the edits in Google Docs but never paste-ing them back into Claude. The learning loop only works if Claude sees the edits.
- Asking Claude to make style / tone changes you could make yourself in 30 seconds in Google Docs. Google Docs is the right tool for manual voice work.
- Skipping share-doc and emailing markdown to Josh or a client. They will not read it.
- Using an inconsistent title format — makes the shared docs hard to find later in Drive.
- Creating the content directly in Google Docs instead of in Claude Code. Then Claude has no context on what was said and can't refresh anything from it.

## Done Checklist

- Google Doc exists and opens with the correct content formatted cleanly
- Manual edits (if any) are complete in the Google Doc
- Edits have been pasted back into Claude Code and Claude has refreshed the rest of the output where relevant
- Link has been shared with the right person (Josh, client, internal)
- Title follows the `SBS — [Type] — [Client / Campaign]` format

## Loom Recording

Source recording: Weekly sync — 2026-04-24 (`Dropbox/SidebySide/Call Recordings/Edited/2026-04-24-sbs-weekly-sync/`) where Josh walks through why share-doc exists and when to use it.

Dedicated Loom walkthrough: [TBD — record and link here once filmed]

---

## Open items to confirm with Josh

- A standard Google Drive folder structure for organising share-doc outputs by client / campaign (share-doc currently drops into the default Drive root).
- Whether any document types (contracts, proposals) should default to "view only" permissions instead of "anyone with link can view".
- Guidance on when share-doc should be used with the `--folder` flag to target a specific Drive folder (already done for SOPs — same pattern could apply to contracts, strategy docs, etc.).

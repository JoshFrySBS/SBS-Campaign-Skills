# SBS SOP — Internal Ops — GTM Manager Cadence

**Owner:** Cyprian (GTM Manager)

**Last Updated:** 2026-04-24

**Tools Required:** Claude Code (with SBS Campaign Skills), Clay account, Instantly account, Notion (Cyprian SBS Dashboard), Google Drive (share-doc), daily and weekly sync calendar holds with Josh.

---

## Purpose

Run SBS's day-to-day go-to-market operations — sourcing, testing, launching, and analysing campaigns for SBS and SBS clients — and keep Josh informed through a clear daily and weekly rhythm.

## When to Use

Every working day. This is the operating rhythm of the GTM role, not a one-off process.

## Before You Start

- Claude Code set up in your root folder with `SBS Campaign Skills/`, `Business Docs/`, `CLAUDE.md`, `strategy/` (see [SBS SOP — Claude Code — Running the SBS Campaign Skills](../Claude-Code/SBS-SOP-Claude-Code-Running-the-SBS-Campaign-Skills.md))
- Clay and Instantly are both live, logged in, API access confirmed
- Strategy document exists for every ICP you're actively testing, stored in the `strategy/` folder
- Notion Cyprian SBS Dashboard is open and set as your landing page — Task Board, Campaign Analytics, SOP Library, Zoom Call Links & Notes
- Daily sync and weekly sync calls are in your calendar
- You know which campaigns are SBS-owned (test markets, new ICPs) versus client-owned (handed over from Josh)

## Steps

### Daily rhythm

**Step 1: Start the day inside Claude Code, not inside another AI.**
Claude Code is the most powerful tool available and is the only one with access to the SBS knowledge base, `CLAUDE.md`, and the SBS Campaign Skills. Do not open ChatGPT or Gemini for SBS work, even for a quick question.

**Step 2: Open your Notion Task Board.**
Any new tasks Josh has pushed via `/client-brief` or manually will be sitting here. Prioritise them against any campaigns already in progress.

**Step 3: Work the current campaign forward by one step.**
Whatever stage your active campaigns are at — sourcing, testing, building drafts, review, live, analysing — move each one one step closer to the next stage. Campaigns only produce results if they keep moving.

**Step 4: Run the analyser on any campaign that's been live for long enough to have data.**
Capture the learning. If something underperformed, surface that to Josh in the next daily sync rather than sitting on it.

**Step 5: Save anything useful into the knowledge base.**
If a prompt, angle, segmentation rule, or piece of copy worked, write it into `CLAUDE.md` or a file inside `Business Docs/` so the next campaign inherits the learning. Claude reads these every run.

**Step 6: Join the daily sync at the scheduled time.**
Bring: blockers, progress since yesterday, next 24-hour plan, any question that needs a decision from Josh. Keep it tight.

### Weekly rhythm

**Step 7: Prepare the weekly sync before the call.**
Before Friday's weekly sync, have a short summary ready in Notion or share-doc'd to Josh:
- Campaigns launched this week + volume sent
- Reply rates and any stand-out performers or flops
- Any ICP or angle tests run + scores against the prompt rubric
- Blockers
- Proposed next week's focus

**Step 8: Run the weekly sync with Josh.**
Walk through the summary. Get direction on next week's priorities. Capture any new rules, feedback, or process changes into `CLAUDE.md` or a memory file afterwards — otherwise they get lost by next week.

**Step 9: Plan the week's campaign batch.**
Based on Josh's direction, pick the ICPs / clients to run next week, confirm the strategy docs exist, queue the prompt-adapter and campaign-builder work.

### Ownership rules

**Step 10: Know which campaigns you own.**
- **SBS-owned campaigns (test markets, new ICPs):** you run end-to-end. Josh approves the strategy; you execute.
- **Client-owned campaigns:** only start after Josh has closed the deal and formally handed over. You run execution, report results weekly back to Josh who reports to the client.
- **Never launch a new ICP or new market test without Josh approving the strategy first.**

**Step 11: Use share-doc and Plan Mode as the intermediary with Josh.**
Don't send long messages. If you have a plan, a draft, or a campaign ready for review, share-doc it so Josh can comment in a Google Doc. Plan Mode inside Claude Code is the tool for planning anything non-trivial. Notion plus Google Docs is the shared layer between your Claude Code and Josh's.

### Quality bar

**Step 12: Keep the quality bar at 8 out of 10.**
Every adapted prompt must score 8 or higher before a full Clay run. Every campaign draft must be reviewed before Instantly launch. Every live campaign must be analysed. The bar is non-negotiable — it's what makes the system worth running.

**Step 13: Test before you scale.**
Ten-row Clay tests before full runs. Small-batch Instantly sends before volume. Small ICP tests before committing a whole week to one market. Quality first, then volume.

### Keeping the system healthy

**Step 14: Update `CLAUDE.md` whenever something changes.**
New client, new ICP, new rule, new workaround — update the file. Claude reads it every run, so this is how the whole system gets smarter. It's portable too: if Claude is ever down, the knowledge base plugs into another AI and you keep moving.

**Step 15: Flag anything that should become an SOP.**
If you've done the same process twice, run the sop-creator skill on the third time. Josh approves the Google Doc; you push it to the Notion SOP Library.

## Common Mistakes

- Using ChatGPT / Gemini / any other AI for SBS work. Only Claude Code. This is the single most important rule.
- Skipping the 10-row Clay test to save time. Guaranteed way to waste credits and produce bad campaigns.
- Launching a prompt that hasn't been scored to 8+. Drops quality across every campaign that prompt touches.
- Writing copy or segmenting CSVs manually. The skills do it faster and better. Only do it manually if a skill is broken and you're unblocking the business.
- Going silent between daily syncs. If you're blocked or stuck, say so immediately — don't wait for the scheduled call.
- Launching a new ICP without Josh approving the strategy.
- Not updating `CLAUDE.md` after learning something new. The knowledge disappears by the next sync.
- Trying to send long-form deliverables (plans, drafts) to Josh as chat messages instead of share-doc'ing them.

## Done Checklist

### Daily
- Active campaigns moved one step forward
- Analyser run on any campaign with new data
- Blockers surfaced in daily sync, not held back
- Learnings captured in `CLAUDE.md` or Notion

### Weekly
- Weekly summary share-doc'd or posted in Notion before the sync
- Weekly sync attended and notes captured afterwards
- Next week's campaign batch queued
- SOP candidates flagged

### Ongoing
- No campaign running on a prompt below 8/10
- No new ICP launched without Josh's strategy sign-off
- `CLAUDE.md` reflects the current state of the business

## Loom Recording

Source recordings:
- Cyprian welcome & onboarding call — 2026-04-15 (`Dropbox/SidebySide/Call Recordings/Edited/2026-04-15-cyprian-welcome-onboarding-call/`)
- Weekly sync — 2026-04-17 (`Dropbox/SidebySide/Call Recordings/Edited/2026-04-17-sbs-weekly-sync/`)
- Daily sync — 2026-04-21 (`Dropbox/SidebySide/Call Recordings/Edited/2026-04-21-sbs-daily-sync/`)
- Weekly sync — 2026-04-24 (`Dropbox/SidebySide/Call Recordings/Edited/2026-04-24-sbs-weekly-sync/`)

Dedicated Loom walkthrough: [TBD — record and link here once filmed]

---

## Open items to confirm with Josh

- **Notion dashboard structure.** Josh has said the Cyprian SBS Dashboard is the shared layer but the exact fields for campaign tracking, ICP testing log, prompt scorecard, weekly summary are not fully specified. Need a walkthrough of what goes where.
- **Volume targets.** Leads sourced / sent / reply rate per week — no hard KPIs yet. Josh to set baseline.
- **Daily sync exact cadence and format.** "Daily" is the rhythm; need a fixed time and agenda template.
- **Weekly summary template.** Is this a Notion page, a share-doc, or a Slack post? Pick one and standardise.
- **Handling parallel SBS + client campaigns.** Folder structure, focus split, and reporting cadence when multiple campaigns run at once.
- **Budget / credit management** across Clay and Instantly — currently informal, needs an owner and a cap.
- **Underperformance response.** When to pivot a campaign versus give it more time. No threshold defined.

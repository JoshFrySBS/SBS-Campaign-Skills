# SOP Template and Creation Guide

For anyone creating SOPs for SBS.

---

## Part 1: The SOP Template

Copy this structure into a new markdown file for each SOP. Fill in every section.

---

**SOP Title:** [What this process is called]

**Owner:** [Who is responsible for this SOP]

**Last Updated:** [Date]

**Tools Required:** [List every tool, login, or platform needed]

---

### Purpose

One sentence. Why does this process exist? What does it achieve?

### When to Use

When exactly should someone follow this SOP? What triggers it?

### Before You Start

- [Pre-requisite 1 — e.g. "Log into Clay"]
- [Pre-requisite 2 — e.g. "Have the client strategy doc open"]
- [Pre-requisite 3]

### Steps

**Step 1: [Action]**
[One clear instruction. One screenshot or Loom video link if needed.]

**Step 2: [Action]**
[Next instruction.]

**Step 3: [Action]**
[Next instruction.]

*(Add as many steps as needed. One action per step. Never combine two actions into one step.)*

### Common Mistakes

- [Things people get wrong and how to avoid it]
- [Another common mistake]

### Done Checklist

- [How do you know the process is complete?]
- [What should the output look like?]
- [Who needs to be notified?]

### Loom Recording

[Paste the Loom link here after recording]

---

## Part 2: How to Create a Video SOP using Loom

Follow this every time you need to document a process.

### Step 1: Do the process yourself first

Run through the entire process once without recording. Note down or make sure you fully understand every step, every click, every choice or decision point. If you skip something because you "just know it", write it down anyway.

The SOP is for someone who has never done this before and needs to be foolproof.

### Step 2: Record it with Loom

1. Open Loom (desktop app or Chrome extension)
2. Select "Screen and Camera" — screen capture with your face in the corner
3. Before you hit record, say out loud: "This is the SOP for [process name]. I'm going to walk through it step by step."
4. Go through every step slowly. Narrate what you are doing AND why you are doing it
5. When you make a decision (e.g. "I pick this option because…"), explain the reasoning out loud
6. When you finish, say: "That's the complete process. The output should look like [describe]."
7. Stop recording
8. Save it to the [SBS SOPs Loom folder](https://www.loom.com/spaces/SBS-Teamspace-44605692/folders/SBS-SOPs-2026-7ff8e448266442179cb136655f917db8)

**Tips for good Loom recordings:**

- Close tabs and notifications you don't need. Keep the screen clean.
- Pause for a second between steps so it's easy to follow.
- If you make a mistake, just say "let me redo that" and carry on. Don't restart.
- Keep it under 10 minutes. If it's longer, split into parts.

### Step 3: Use Loom AI to generate the written SOP

1. Open the Loom recording in your library
2. Wait for the transcript to finish processing (usually 1-2 minutes)
3. Click on the 'Edit' functions on the right
4. Click 'Create SOP'
5. Copy the SOP output and run `/sop-creator`. The skill drafts the markdown into the SBS template and saves it to `SBS Campaign Skills/SOPs/[Category]/`. It then prints the `share-doc` command (pre-targeted at the SOP Drive folder) and the `push-to-notion` command — you run them yourself so nothing lands in Notion until you've read the Google Doc.

### Step 4: Review and publish

1. Run the `share-doc` command the skill printed → creates the Google Doc in the SOP Drive folder.
2. Read the SOP top to bottom as if you have never done this process before. Does every step make sense without the video?
3. Check that the "Tools Required" section lists everything.
4. Check that the "Before You Start" checklist covers all pre-requisites.
5. Check that the "Done Checklist" would tell someone whether they completed it correctly.
6. Share the Google Doc link with Josh for review.
7. Once approved, run the `push-to-notion` command with the Google Doc link → creates the Notion row at status `Draft`. Flip to `Active` once published.

### Step 5: Making Changes

1. Whenever a process changes, edit the local markdown at `SBS Campaign Skills/SOPs/[Category]/...md`.
2. Re-run `share-doc` → new Google Doc.
3. Re-run `push-to-notion` with the new link → the Notion row updates in place (matched by title).
4. Never leave an SOP stale. If the process changed, the SOP must change too.

---

## Naming Convention

Name every SOP like this:

**SBS SOP — [Category] — [Process Name]**

Examples:
- SBS SOP — Campaigns — Push to Instantly
- SBS SOP — Clay — Company Research Prompt Setup
- SBS SOP — Infra — Domain Provisioning
- SBS SOP — Client — Strategy Call Prep

---

## Folder Structure

All SOPs live in one shared [Google Drive folder](https://drive.google.com/drive/folders/18tuIf9DH-h6OF5TcobZq_WXgf7JCpGEh?usp=drive_link) (folder ID: `18tuIf9DH-h6OF5TcobZq_WXgf7JCpGEh`) and locally in `SBS Campaign Skills/SOPs/[Category]/`.

```
SBS Campaign Skills/SOPs/
  Campaigns/
  Clay/
  Infra/
  Client/
  Content/
  Email-Instantly/
  LinkedIn-HeyReach/
  Claude-Code/
  Internal-Ops/
  Infrastructure/
  n8n-Automation/
  Course/
  AI-Setter/
  Client-Delivery/
```

Notion category options (must match exactly when publishing):
Clay · Email / Instantly · LinkedIn / HeyReach · Claude Code · Client Delivery · Internal Ops · Infrastructure · n8n / Automation · Course · AI Setter

---

## The Rule

If you do something more than twice, it needs an SOP.

Record the Loom, fill in the template, share for review.

Every SOP should be good enough that someone with zero context could follow it and get the same result you would.

Every SOP should be managed and updated when any process changes or improves.

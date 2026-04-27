# SBS SOP Library (local mirror)

Source-of-truth folder for every SBS Standard Operating Procedure. Lives here locally so Cyprian's Claude Code pulls the freshest version from the repo.

Three places stay in sync:

1. **Local markdown:** `SBS Campaign Skills/SOPs/[Category]/SBS-SOP-[Category]-[Process].md` (this folder)
2. **Google Drive:** [SBS SOPs folder](https://drive.google.com/drive/folders/18tuIf9DH-h6OF5TcobZq_WXgf7JCpGEh) — formatted Google Doc, "anyone with link can view"
3. **Notion:** [SOP Library database](https://www.notion.so/342169e497cc818db47ecc12cf1bd397) in Cyprian's SBS Dashboard

## How to create or update an SOP

Three deliberate steps. Nothing auto-publishes until you say so.

### Step 1 — draft the markdown

Run the skill in Claude Code:

```
/sop-creator
```

Give it one of:
- A rough description of the process
- A Loom "Create SOP" output (pasted)
- A **Zoom call transcript** — VTT file path, pasted text, or a link to the call in the [Zoom Call Links & Notes Notion DB](https://www.notion.so/34b169e497cc80379c71d23f26d2371d). Transcripts live in Dropbox at `/SidebySide/Call Recordings/Edited/{date}-{topic}/` (auto-uploaded by the zoom-to-dropbox pipeline)
- A link to existing notes

Plus:
- Category (Clay, Campaigns, Infra, etc. — see [SOP_TEMPLATE.md](SOP_TEMPLATE.md))
- Optional Loom URL

The skill fills [SOP_TEMPLATE.md](SOP_TEMPLATE.md), saves the markdown to `SBS Campaign Skills/SOPs/[Category]/`, and prints the next two commands ready to copy-paste.

### Step 2 — generate the Google Doc for approval

The skill prints a `share-doc` command already pre-targeted at the SOP Drive folder. Run it. You get a Google Doc link. Read it, tweak wording, make sure it's ready. This is the approval stage.

### Step 3 — push to Notion

Once approved, run the `push-to-notion.js` command the skill printed, pasting in the Google Doc link. That creates (or updates) the row in Cyprian's Notion SOP Library with status `Draft`. Flip to `Active` once published.

## Updating a changed process

Edit the local markdown → re-run Step 2 (new Google Doc) → re-run Step 3. `push-to-notion.js` matches on exact title and updates the Notion row in place — no duplicates.

## Template

Use [SOP_TEMPLATE.md](SOP_TEMPLATE.md) as the structural reference. It mirrors Josh's source template and must be followed exactly. Never deviate from these sections:

- SOP Title / Owner / Last Updated / Tools Required
- Purpose
- When to Use
- Before You Start
- Steps
- Common Mistakes
- Done Checklist
- Loom Recording

## The rule

If you do something more than twice, it needs an SOP.

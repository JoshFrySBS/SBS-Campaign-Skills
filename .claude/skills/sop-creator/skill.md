---
name: sop-creator
description: Turn a process description, Loom transcript, Zoom call transcript (VTT or paste), or existing draft into a formal SBS SOP. Fills the standard template from SBS Campaign Skills/SOPs/SOP_TEMPLATE.md and saves the markdown to SBS-Internal-Shared/SOPs/[Category]/ (or SBS-Internal-Shared/SOPs/Clients/<name>/ for client-specific SOPs). Then prints the exact share-doc command (pre-filled with the SOP Google Drive folder) for Josh to generate a Google Doc for approval, followed by the push-to-notion command to log the approved row in Cyprian's Notion SOP Library. Use when Josh or Cyprian says "create an SOP for...", "document this process", "SOP this", "write me an SOP", "turn this into an SOP", pastes a Loom-generated draft, or points at a Zoom call where a process was walked through.
---

# sop-creator

Create (or update) an SBS SOP. The skill drafts the markdown only — Josh approves it via Google Doc, then pushes to Notion. Three deliberate steps, no auto-publish.

## When to use

- User says "create an SOP for X", "SOP this", "document this process", "write me an SOP", "turn this into an SOP"
- User pastes a Loom "Create SOP" output or raw process notes and wants it formatted
- User has edited an existing SOP and wants the Google Doc refreshed + the Notion row updated

## The three-step flow

```
Step 1 — /sop-creator (this skill)
  Draft → SBS-Internal-Shared/SOPs/[Category]/SBS-SOP-[Category]-[Process].md
  (or SBS-Internal-Shared/SOPs/Clients/<name>/SBS-SOP-<name>-[Process].md for client-specific)

Step 2 — share-doc (manual, triggered by the user)
  Markdown → Google Doc in the SBS SOPs Drive folder (approval happens here)

Step 3 — push-to-notion (run after Josh approves the Google Doc)
  Google Doc link → Notion SOP Library row (Cyprian's dashboard)
```

The gap between Step 2 and Step 3 is intentional: Josh reads the Google Doc, tweaks wording, then publishes to Notion once happy.

## Inputs to gather (ask only what's missing)

1. **Process name** (e.g. "Company Research Prompt Setup")
2. **Category** — ask up front: is this SOP generic (one of the categories below) or client-specific?

   Generic categories (one must match exactly):
   - `Clay`
   - `Email / Instantly`
   - `LinkedIn / HeyReach`
   - `Claude Code`
   - `Client Delivery`
   - `Internal Ops`
   - `Infrastructure`
   - `n8n / Automation`
   - `Course`

   Client-specific: use `Clients/<client-name>` (e.g. `Clients/Send-It-Direct`) — saves under `SBS-Internal-Shared/SOPs/Clients/<name>/`.
3. **Owner** (default: the person invoking the skill)
4. **Loom URL** (optional — if a recording already exists)
5. **Process detail** — can come from any of these sources:
   - A rough description typed by the user
   - A Loom "Create SOP" output (pasted)
   - A **Zoom call transcript** (VTT file path, pasted VTT/plain text, or a link — see next section)
   - A link to notes

   If the input is vague, ask clarifying questions until every template section can be filled honestly. Never invent step content.

## Working from a Zoom transcript

Josh and Cyprian walk through real processes on Zoom calls. Those calls are recorded and the VTT transcript is saved automatically by the [zoom-to-dropbox pipeline](../../../Automation/zoom-to-dropbox/README.md).

### Where to find Zoom transcripts
- **Dropbox (canonical location):** `/SidebySide/Call Recordings/Edited/{date}-{topic}/` — contains the trimmed `.vtt` transcript file (timestamps aligned to the trimmed video).
- **Notion (for sync calls):** the [Zoom Call Links & Notes database](https://www.notion.so/34b169e497cc80379c71d23f26d2371d) in Cyprian's SBS Dashboard has a `Transcript Link` column for SBS Daily Sync / SBS Weekly Sync calls. This is the fastest way for Cyprian to find the transcript from a sync.
- **Local fallback:** if the user has already downloaded the VTT, accept the file path.

### Accepting transcript input
The user can give you any of:
1. A **local file path** to a `.vtt` or `.txt` transcript → read it with `Read`
2. A **Dropbox share link** → ask the user to download it first and give you the path (don't try to authenticate against Dropbox mid-skill)
3. A **paste** of the transcript content directly into chat
4. A **Notion page URL** from the Zoom Call Links & Notes DB → fetch the page, read the Transcript Link field, then fall back to option 2

### Processing VTT content
VTT files look like:
```
WEBVTT

00:00:01.000 --> 00:00:05.200
Josh: Okay so first we open Clay and go to Sources.

00:00:05.200 --> 00:00:09.400
Cyprian: Got it. And do we pick LinkedIn or…
```

Strip timestamps and cue numbers. Keep speaker labels. What's left is dialogue. Then:
- Identify the process the call was actually about. If the call covered multiple processes, ASK which one to SOP before drafting.
- Extract steps from the dialogue in order. When two speakers discuss the same action, prefer the one who actually performs it.
- Collapse filler, "umm", restarts, side-tangents, off-topic chat.
- If a step was unclear on the call or a decision was deferred ("we'll figure that out later"), mark it `[TBD — confirm with Josh]`. Never guess.
- Pull "Common Mistakes" from moments where someone corrects themselves or someone else on the call.
- Pull "Done Checklist" from any "how do you know it worked" discussion, or infer it from the stated outcome. If not covered, flag as `[TBD]`.
- Add the Zoom call reference in the Loom Recording section as a fallback: `Source: Zoom call {date} — {topic} (Dropbox: {link if provided})`.

### Multi-process calls
If the transcript clearly covers more than one distinct process, default to generating ONE SOP and ask whether to do the others as separate files afterwards. Don't cram two processes into one SOP.

## Filling the template

**Canonical template:** `SBS Campaign Skills/SOPs/SOP_TEMPLATE.md` (mirror of Josh's source template at `C:\Users\Fry\Downloads\SBS_SOP Template and Creation Guide.md`). The template stays in the skills repo as shared reference. Always read this file first and follow it exactly. Do not invent section headings or reorder them.

Every SOP MUST contain these sections in order:

1. **Header block:** SOP Title, Owner, Last Updated (today's date), Tools Required
2. **Purpose** — one sentence
3. **When to Use** — trigger condition
4. **Before You Start** — prerequisites checklist
5. **Steps** — numbered, one action per step, never combined
6. **Common Mistakes** — things people get wrong
7. **Done Checklist** — how you know it worked
8. **Loom Recording** — link if provided, else "To be recorded" (or the Zoom source reference if that's where it came from)

### Writing rules

- One action per step. Never combine two actions.
- Write for someone with zero context.
- British English, no em-dashes (except the SOP title convention).
- If the input is a raw Loom transcript, tighten it — keep the structure, drop filler.
- Unknown section → mark `[TBD — confirm with Josh]` rather than invent.

## Naming and paths

**Title used everywhere (Google Doc + Notion):** `SBS SOP — [Category] — [Process Name]`
Examples:
- `SBS SOP — Clay — Company Research Setup`
- `SBS SOP — Campaigns — Push to Instantly`

The `—` in the title is U+2014. This is the only place we deliberately use an em-dash — it's a naming convention, not prose.

**Local file:** `SBS-Internal-Shared/SOPs/[category-folder]/SBS-SOP-[Category]-[Process-Name].md` (generic) or `SBS-Internal-Shared/SOPs/Clients/<name>/SBS-SOP-<name>-[Process-Name].md` (client-specific)

Category folder mapping (slashes dropped, spaces to dashes):
| Notion category | Local folder |
|---|---|
| Clay | `Clay/` |
| Email / Instantly | `Email-Instantly/` |
| LinkedIn / HeyReach | `LinkedIn-HeyReach/` |
| Claude Code | `Claude-Code/` |
| Client Delivery | `Client-Delivery/` |
| Internal Ops | `Internal-Ops/` |
| Infrastructure | `Infrastructure/` |
| n8n / Automation | `n8n-Automation/` |
| Course | `Course/` |
| AI Setter | `AI-Setter/` |

Filename: replace spaces in the process name with dashes, strip punctuation.
Example: `SBS-SOP-Clay-Company-Research-Setup.md`

## What the skill does (execution)

1. **Gather input.** Ask only what's missing. Never invent step content.
2. **Draft the markdown** following the template exactly. Show the user the draft and ask for sign-off before writing. If they say "just save it" / "go" / "looks good", write immediately.
3. **Write the file** to its final path under `SBS-Internal-Shared/SOPs/[Category]/` (or `SBS-Internal-Shared/SOPs/Clients/<name>/` for client-specific). Create the folder if it doesn't exist.
4. **Print the next two commands** ready to copy-paste:

   **Step 2 — generate Google Doc for approval:**
   ```bash
   cd "c:/Users/Fry/Documents/SidebySide CC" && node Automation/share-doc/share.js "<local-path>" --title "SBS SOP — <Category> — <Process Name>" --folder "18tuIf9DH-h6OF5TcobZq_WXgf7JCpGEh"
   ```

   **Step 3 — once approved, push to Notion (paste the returned Google Doc link in `--doc-link`):**
   ```bash
   cd "c:/Users/Fry/Documents/SidebySide CC" && node Automation/sop-creator/push-to-notion.js "<local-path>" --title "SBS SOP — <Category> — <Process Name>" --category "<Category>" --doc-link "<google-doc-link>" --description "<one-line summary>" --status "Draft"
   ```

   Add `--loom "<url>"` to either command if a Loom exists. Default status is `Draft`; flip to `Active` (or run again with `--status Active`) once published.

5. **Do not run Steps 2 or 3 automatically.** The whole point of this flow is that Josh reviews the Google Doc before it becomes the official SOP in Notion.

## Updating an existing SOP

Same flow, three steps. The Notion push script uses an exact title match — if the title is unchanged, the existing row is updated in place (new Google Doc link, refreshed "Last Updated", revised Status, etc.). No duplicates.

Rule from the template: *"Never leave an SOP without a necessary update."*

## Pushing an existing Google Doc to Notion (no local markdown)

`push-to-notion.js` also supports a **Drive-only mode** — omit the file argument and pass just `--title`, `--category`, `--doc-link`. Use this when Josh has an SOP already sitting as a Google Doc in the SBS SOPs Drive folder but it's not in Notion yet:

```bash
cd "c:/Users/Fry/Documents/SidebySide CC" && node Automation/sop-creator/push-to-notion.js --title "SBS SOP — <Category> — <Process Name>" --category "<Category>" --doc-link "<google-doc-link>" --description "<one-line summary>" --status "Active"
```

For a whole list of existing Drive docs at once, use **bulk mode** with a JSON file (example at `Automation/sop-creator/bulk-example.json`):

```bash
cd "c:/Users/Fry/Documents/SidebySide CC" && node Automation/sop-creator/push-to-notion.js --bulk Automation/sop-creator/bulk-example.json
```

Each bulk entry upserts by exact title match — re-running is safe.

## For Cyprian

Works for him too once he:
- Has a `NOTION_API_KEY` in his `.env` (Josh provides the integration token)
- Has Pandoc installed (needed for share-doc's markdown → Google Doc conversion)
- Has Node 18+

The SOP folder in Google Drive is shared with the integration already. The Notion integration has access to the SOP Library database (verified via query).

## Troubleshooting

- **Notion 404 on page create** → the integration was removed from the SOP Library database. Open the database in Notion → `...` → `Connections` → re-add the integration.
- **share-doc returns no link** → the n8n `share-doc` workflow is inactive. See `Automation/share-doc/SETUP.md`.
- **Pandoc not found** (Cyprian's setup) → install Pandoc and make sure it's on `PATH`, or update the PATH injection inside `Automation/share-doc/share.js`.
- **Wrong category error in push-to-notion** → category must match a Notion option exactly. `Clay` yes, `clay` no, `Email/Instantly` no (need the spaces: `Email / Instantly`).

## Hard rules

- Never skip a template section. Unknown → `[TBD]`.
- Never auto-run share-doc or push-to-notion from inside the skill. Print the commands for the user.
- Always use today's date for "Last Updated".
- Always write the local markdown first. It is the source of truth; Drive and Notion are mirrors.

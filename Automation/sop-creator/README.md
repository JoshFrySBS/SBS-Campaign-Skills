# sop-creator automation

Helper script for the last step of the SOP flow: writing a row into the Notion SOP Library after the Google Doc has been approved.

## The SOP flow (three steps)

1. `/sop-creator` in Claude Code → drafts the SOP markdown and saves it to `SBS Campaign Skills/SOPs/[Category]/`
2. `node Automation/share-doc/share.js <file> --title "..." --folder 18tuIf9DH-h6OF5TcobZq_WXgf7JCpGEh` → uploads a formatted Google Doc to the shared [SBS SOPs Drive folder](https://drive.google.com/drive/folders/18tuIf9DH-h6OF5TcobZq_WXgf7JCpGEh). This is the approval gate — Josh reads the doc and edits if needed.
3. `node Automation/sop-creator/push-to-notion.js ...` → creates or updates the Notion row in the [SOP Library database](https://www.notion.so/342169e497cc818db47ecc12cf1bd397)

Step 2 and Step 3 are deliberately separate so nothing hits the official Notion library until Josh has eyeballed the Google Doc.

## push-to-notion.js usage

Three modes:

### 1. Normal mode — SOP with a local markdown file

```bash
node Automation/sop-creator/push-to-notion.js "SBS Campaign Skills/SOPs/Clay/SBS-SOP-Clay-Company-Research-Setup.md" \
  --title "SBS SOP — Clay — Company Research Setup" \
  --category "Clay" \
  --doc-link "https://docs.google.com/document/d/abc123/edit" \
  --description "How we configure the company research prompt in Clay." \
  --status "Draft"
```

### 2. Drive-only mode — SOP already lives in Google Drive, no local markdown

Skip the file argument. Works for any existing Google Doc in the SOP folder (or anywhere else) that you want logged in Notion.

```bash
node Automation/sop-creator/push-to-notion.js \
  --title "SBS SOP — Clay — Existing Doc Title" \
  --category "Clay" \
  --doc-link "https://docs.google.com/document/d/abc123/edit" \
  --description "Short summary." \
  --status "Active"
```

### 3. Bulk mode — push many existing Drive docs at once

Create a JSON file like `bulk-example.json`:

```json
[
  {
    "title": "SBS SOP — Clay — Something",
    "category": "Clay",
    "docLink": "https://docs.google.com/document/d/xxx/edit",
    "description": "Optional.",
    "status": "Active"
  },
  { "title": "...", "category": "...", "docLink": "..." }
]
```

Then run:

```bash
node Automation/sop-creator/push-to-notion.js --bulk Automation/sop-creator/bulk-example.json
```

Each entry is upserted by exact title match, so re-running is safe — existing rows update in place instead of duplicating.

### Flags

| Flag | Required | Notes |
|------|----------|-------|
| `<file>` (positional) | optional | Path to the SOP markdown (used for context only). Omit for Drive-only mode. |
| `--title` | yes (single mode) | Must match the Google Doc title exactly. Format: `SBS SOP — [Category] — [Process Name]` |
| `--category` | yes (single mode) | Must match a Notion option exactly (see below) |
| `--doc-link` | yes (single mode) | Google Doc URL |
| `--description` | optional | One-line Notion row summary |
| `--loom` | optional | Loom recording URL |
| `--status` | optional | `Draft` (default), `Active`, `Needs Update`, `No Longer Needed` |
| `--bulk <file>` | bulk mode | Path to a JSON file with an array of entries. Ignores other flags. |

### Valid categories (must match Notion exactly)

Clay · Email / Instantly · LinkedIn / HeyReach · Claude Code · Client Delivery · Internal Ops · Infrastructure · n8n / Automation · Course · AI Setter

### Update-in-place behaviour

If a Notion row with the exact same title already exists, it is updated — the Google Doc link, Last Updated, Loom link, Description, and Status are refreshed. This is the correct path for updating a changed process. Never create a second row with the same title.

## Prerequisites

- `.env` at project root with `NOTION_API_KEY`
- Notion integration must have access to the SOP Library database. If you get 404/permission errors, open the database in Notion → `...` → `Connections` → add the integration.

## For Cyprian

On his machine he needs:
- His own `.env` with `NOTION_API_KEY` (Josh provides the integration token)
- Node.js 18+
- For Step 2: Pandoc installed plus the shared `SHARE_DOC_WEBHOOK_URL`

# Attio MCP Setup

**What it does:** Lets Claude Code read and write the SBS Attio CRM: People, Deals/Lists (Course Sales / DFY Sales / DFY Delivery), Notes, Tasks, Calls, Emails, Reports. Used when:
- Working on the GHL → Attio migration (currently in progress)
- Running the `/attio` skill for daily/weekly digests, stage moves, stale detection
- Logging outreach activity from a campaign back into the CRM
- Pulling pipeline data for revenue forecasting

**Time to set up:** 3 minutes (it's an OAuth flow, not an API key — much faster than the others).

---

## Step 1: Confirm `.mcp.json` has the entry

The Attio MCP is hosted by Attio (HTTP MCP, not stdio), so the `.mcp.json` entry is short:

```json
"attio": {
  "type": "http",
  "url": "https://mcp.attio.com/mcp"
}
```

This is already in the project `.mcp.json`. You don't need to add anything.

---

## Step 2: Authenticate via OAuth

Unlike Notion and n8n which use static API keys, Attio uses OAuth — you authenticate once by clicking through a consent screen. Each Cyprian-on-his-machine pairing is a separate OAuth grant, so Cyprian's grant is independent of Josh's.

In Claude Code, run:

```
/mcp
```

This opens the MCP management panel. Find `attio` in the list. Click it (or use the keyboard shortcut shown).

Claude Code opens a browser window. Log in with your Attio account credentials (the SBS workspace one — Josh adds you as a workspace member first if you don't have access).

After granting permission, the browser redirects back to Claude Code automatically. The MCP is now authenticated.

---

## Step 3: Verify it works

Tell Claude Code:

> "List my Attio Lists."

If the connection works, Claude returns the three SBS Lists: `Course Sales`, `DFY Sales`, `DFY Delivery`.

If it fails:
- "Not authenticated" → re-run `/mcp authenticate` and walk through the OAuth flow again
- "Workspace not found" → Josh hasn't added you as a workspace member. Ping him.
- "Permission denied on attribute X" → your role in the Attio workspace doesn't have access to that attribute. Josh adjusts roles in Attio Settings > Members.

---

## What you can do with Attio MCP

Once connected, common patterns:

- **Lists:** "List records in [List name]", "Add this lead to the Course Sales List"
- **People:** "Search for the person with email [email]", "Update [person]'s stage to [stage]"
- **Notes:** "Add a note to [person] saying [message]"
- **Tasks:** "Create a task on [person] for me, due [date]"
- **Reports:** "Run the Sam pipeline report for the last 7 days"
- **Bulk reads:** "Get all records in DFY Sales with stage 'Proposal Sent' updated in the last 14 days"

The `/attio` skill (in `~/.claude/skills/attio-crm/`) wraps the most common patterns. Run it for daily/weekly pipeline digests rather than asking Claude raw queries every time.

---

## SBS Attio schema (high level)

The full schema is documented at `Business Docs/CRM Build/Attio-Infrastructure-Reference.md`. Key things to know when working with the MCP:

| Object | Purpose | Key attributes |
|---|---|---|
| **People** | Every contact (lead, customer, churned) | `stage`, `source`, `lifecycle_stage`, `funnel_destination`, `next_action`, `next_action_due` |
| **Deals** | Currently mapped via Lists, not a separate object — see Lists below | (n/a) |
| **Lists** | Three pipelines: `Course Sales`, `DFY Sales`, `DFY Delivery`. Each List has its own stages mirroring the GHL pipeline structure | `stage`, `priority`, `next_step`, `won_at` |
| **Notes** | Free-form notes on any record | (rich text) |
| **Tasks** | Work items assigned to a workspace member | `due_date`, `is_completed`, `assignee` |

The Attio MCP is read-heavy in normal use (digest queries, finding records). Writes are mostly stage moves, note additions, and task creations. Bulk imports happen via CSV upload in the Attio UI, not via the MCP.

---

## Conventions for Attio writes

When updating records via the MCP, follow these rules:

- **Always use `update-record` not `create-record`** if the contact already exists. Use email as the dedupe key.
- **Stage moves require both List + stage** — never just "set stage to X" without specifying which List.
- **Notes should be Markdown** — Attio renders Markdown notes correctly.
- **Tasks should reference the record** — when creating a task, link it to the relevant Person/Deal so it appears on their record card.
- **Don't bulk-update >50 records in one batch** — Attio rate-limits on writes. Batch in 25-50.

---

## Removing the MCP later

To disconnect, remove the `"attio": {...}` block from `.mcp.json` and restart Claude Code. To revoke the OAuth grant, log into Attio Settings > Integrations and remove the Claude Code authorization. The next `/mcp authenticate` will start a fresh consent flow.

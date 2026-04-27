# Notion MCP Setup

**What it does:** Lets Claude Code read and write Notion pages, databases, and comments. Used by:
- `/sop-creator` — to query the SOP Library and add new rows after Josh approves an SOP
- `/client-brief` — to push a client task to Cyprian's Task Board
- `/internal-brief` — same as `/client-brief` but for SBS internal work
- Ad-hoc: pulling page content, posting updates on tasks, scanning databases

**Time to set up:** 5 minutes (Josh has to do half — share the integration with you).

---

## Step 1: Confirm the integration token with Josh

Josh runs the SBS Notion workspace. He's already created an internal Notion integration (the API token Claude needs).

Ask Josh for:
1. The Notion integration token (starts with `ntn_` or `secret_`)
2. Confirmation that the integration is shared with the databases/pages you need to access (your Task Board, the SOP Library, etc.)

Josh shares the token via WhatsApp or password manager. **Never** paste it into a chat or doc that's saved to a repo.

---

## Step 2: Send Josh your Notion workspace URL

So Josh can:
- Confirm the integration is shared with the Task Board you'll be the assignee on
- Add the integration to any other databases you need access to

Send Josh: the URL of your top-level Notion workspace page (anything that looks like `https://www.notion.so/your-workspace/...`). If unsure, share the URL of your Task Board.

---

## Step 3: Add the MCP to your config

The project `.mcp.json` already has the Notion entry pre-configured. You just need to make sure your local copy of the project pulls it. From `~/SidebySide`:

```bash
cd ~/SidebySide
git pull
```

If you're missing `.mcp.json` (shouldn't happen if you cloned the project root), ask Josh to share it — it's not in any of the cloned repos because it lives at the project root.

The Notion MCP entry looks like this (you don't need to write it, just confirm it's there):

```json
"notion": {
  "command": "npx",
  "args": ["-y", "@notionhq/notion-mcp-server"],
  "env": {
    "OPENAPI_MCP_HEADERS": "{\"Authorization\":\"Bearer YOUR_NOTION_TOKEN\",\"Notion-Version\":\"2022-06-28\"}"
  }
}
```

The `YOUR_NOTION_TOKEN` placeholder needs to be replaced with the token Josh shared. Open `.mcp.json` and paste the token in.

---

## Step 4: Restart Claude Code

MCP servers load when Claude Code starts. After editing `.mcp.json`, restart Claude Code (close and reopen the VS Code window, or restart the Claude Code extension).

---

## Step 5: Verify it works

Tell Claude Code:

> "Search Notion for a page titled 'Task Board'."

If the connection works, Claude returns the page details. If it fails:
- Check the token format in `.mcp.json` (no extra spaces, properly escaped quotes around the JSON string)
- Confirm Josh shared the integration with the page you're searching
- Restart Claude Code one more time

---

## Notion MCP quirks to know

A few constraints that come up regularly:

| Constraint | Workaround |
|---|---|
| `API-create-a-data-source` returns "Invalid request URL" | The MCP is locked to Notion-Version `2022-06-28`. Some new endpoints aren't supported. Read/query operations work fine; for new data sources, ask Josh. |
| Internal integrations cannot create top-level workspace pages | When you need a new page at the top level of a workspace, ask the workspace owner to create it and share with the integration. Then you can populate it. |
| `patch-block-children` only supports paragraph + bulleted_list_item | For richer block types (toggles, callouts, headings beyond H1-H3), use `curl` directly with the Notion API. Most of the time `paragraph` and `bulleted_list_item` are enough. |

These come up in production work — the skills handle them automatically. The note is here so you understand error messages if you see them.

---

## Daily-use commands

Once set up, common patterns Claude can do for you:

- "Search Notion for [query]"
- "Get the page [title or URL]"
- "Add a comment to my task '[title]' that says [message]"
- "Query the SOP Library for SOPs in the Clay category"
- "Create a new task on my Task Board with title [title] and brief [brief]"

The `/client-brief` and `/internal-brief` skills use the Notion API directly via `Automation/client-brief/push-to-notion.js` (not the MCP) for reliability — but everything else goes through the MCP.

---

## Removing the MCP later

If you stop using Notion (e.g. moving to a different system), remove the `"notion": {...}` block from `.mcp.json` and restart Claude Code. The token Josh gave you can be revoked from the integration settings page in Josh's Notion workspace.

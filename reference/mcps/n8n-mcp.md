# n8n MCP Setup

**What it does:** Lets Claude Code list, create, update, deploy, and audit workflows on the SBS self-hosted n8n instance (https://n8n.srv1098734.hstgr.cloud). Used when:
- Building / updating automations (AI setter, share-doc, kb-weekly-review, infra workflows)
- Debugging an existing workflow that's failing
- Auditing the instance for stale or duplicated workflows

**Time to set up:** 5 minutes.

---

## Step 1: Get the API key from Josh

Josh has the n8n Personal Access Token for the SBS instance. Ask him for:

- `N8N_API_URL`: `https://n8n.srv1098734.hstgr.cloud`
- `N8N_API_KEY`: the long JWT-format token (`eyJhbGc...`)

Token lives in Josh's password manager. He shares via WhatsApp.

**Important:** This token has full read/write/execute access to every workflow on the n8n instance. Treat it like a production credential.

---

## Step 2: Confirm `.mcp.json` has the entry

The project `.mcp.json` already has n8n configured:

```json
"n8n-mcp": {
  "command": "npx",
  "args": ["n8n-mcp"],
  "env": {
    "MCP_MODE": "stdio",
    "LOG_LEVEL": "error",
    "DISABLE_CONSOLE_OUTPUT": "true",
    "N8N_API_URL": "https://n8n.srv1098734.hstgr.cloud",
    "N8N_API_KEY": "PASTE_TOKEN_HERE"
  }
}
```

Open `.mcp.json` (at `~/SidebySide/.mcp.json`) and paste the token Josh shared into the `N8N_API_KEY` field. Save.

---

## Step 3: Restart Claude Code

Close + reopen the VS Code window, or restart the Claude Code extension. The MCP loads on startup.

---

## Step 4: Verify it works

Tell Claude Code:

> "List all active n8n workflows."

If the connection works, Claude returns the list of active workflows (you'll see names like `setter-instantly-handler`, `share-doc`, `infra-domain-setup`, etc.).

If it fails:
- `401 Unauthorized` → token is wrong. Re-copy from Josh.
- `403 Forbidden` → token lacks permission. Josh needs to regenerate with full access.
- `Cannot connect` → check the URL has `https://` and no trailing slash. Confirm the n8n instance is up by visiting it in a browser.

---

## What you can do with n8n MCP

Once connected, common patterns:

- "List active workflows"
- "Get the workflow named [name] and show me its JSON"
- "Validate this workflow before deploying" (avoids deploying broken JSON)
- "Show recent executions of [workflow name]" (debug failures)
- "Update the workflow [name] to [description of change]" (Claude reads, edits, validates, deploys)
- "Create a new workflow that [description]" (Claude scaffolds, validates, deploys as inactive)

For non-trivial workflow edits, always:
1. Get the current workflow JSON first
2. Make the change
3. Validate before deploying
4. Test on a single trigger before going live

---

## n8n-specific quirks (from MEMORY)

These come up often enough that they're documented in the project's `.claude/memory/`:

| Quirk | Implication |
|---|---|
| Code nodes cannot use `fetch()` or `$helpers.httpRequest()` | All HTTP calls must be in HTTP Request nodes. Task runner constraint on this n8n instance. |
| Webhook nodes need `webhookId` field | Without it, the webhook returns 404. After updating any webhook, deactivate then reactivate the workflow to re-register. |
| Workflows are saved as Draft by default after a Claude edit | You have to flip them to Active manually in the UI, OR ask Claude to activate after deploying. Never auto-activate without testing. |

The skills handle these automatically — but if you see "404 on webhook" or "fetch is not defined" errors, that's why.

---

## Daily-use patterns

The most common n8n MCP workflows for Cyprian:

- **AI setter debugging:** "Show me the last 10 executions of `setter-instantly-handler`. Highlight any errors."
- **Workflow updates:** "Update the share-doc workflow to use Pandoc 3.x."
- **Audit:** "List all workflows. Group by status (Active / Draft / Inactive). Flag any inactive workflows older than 30 days."
- **Validation:** "Validate this workflow JSON: [paste]" — useful before importing.

---

## Removing the MCP later

To disconnect, remove the `"n8n-mcp": {...}` block from `.mcp.json` and restart Claude Code. To revoke the token entirely, Josh deletes it from n8n Settings > API.

# HeyReach MCP Setup

**What it does:** Lets Claude Code manage HeyReach LinkedIn campaigns directly: create campaigns and lists, add/remove leads, manage tags and webhooks, read conversations and messages, get campaign stats. Used when:
- Running LinkedIn outbound for SBS or any client
- Building HeyReach reply automation (the AI setter handles HeyReach replies the same way it handles Instantly replies)
- Pulling campaign performance data for `/campaign-analyser`

**Time to set up:** 5 minutes.

---

## Step 1: Confirm you need it

HeyReach is currently used for:
- SBS internal LinkedIn outbound (Josh's account)
- Some DFY clients running multi-channel campaigns

If you're not running LinkedIn for any client right now, skip this MCP. You can add it later when a campaign starts.

---

## Step 2: Get the API key

Josh has the HeyReach API key in his password manager. Ask Josh for:

- The HeyReach API key (looks like a long alphanumeric string)
- Confirmation of which HeyReach workspace this key belongs to (Josh has multiple — SBS workspace, client workspaces)

If you'll be running campaigns for a specific client (e.g. you're managing LinkedIn outbound for one of Josh's clients), get the key for THAT client's HeyReach account, not Josh's.

---

## Step 3: Add the MCP to your config

Unlike Notion and n8n, HeyReach MCP is set up at the user level (in `~/.claude/settings.json`) rather than the project level. This is because the API key is account-specific (per HeyReach workspace), so different sessions might use different keys.

Open `~/.claude/settings.json` (Windows: `C:\Users\<you>\.claude\settings.json`). If `mcpServers` doesn't exist as a top-level key, add it. Then add the HeyReach entry:

```json
{
  "mcpServers": {
    "heyreach": {
      "command": "npx",
      "args": ["-y", "@heyreach/mcp-server"],
      "env": {
        "HEYREACH_API_KEY": "PASTE_KEY_HERE"
      }
    }
  }
}
```

If `mcpServers` already exists with other entries (n8n-mcp, notion etc.), add the heyreach entry alongside them — don't overwrite.

**Note:** the exact npm package name (`@heyreach/mcp-server`) may differ if HeyReach renames their package. If `npx` fails with "package not found", check the HeyReach docs at [https://heyreach.io/api](https://heyreach.io/api) for the current package name.

---

## Step 4: Restart Claude Code

Close + reopen VS Code, or restart the Claude Code extension. User-level MCPs load on Claude Code startup the same way project-level MCPs do.

---

## Step 5: Verify it works

Tell Claude Code:

> "List all my HeyReach campaigns."

If the connection works, Claude returns campaign names + statuses. If it fails:
- `401` → API key is wrong. Re-copy from Josh.
- `403` → API key lacks scope. HeyReach Standard plan and above have full API access. Free trial may not.
- `Cannot find module` → npm package name has changed. Check HeyReach docs.

---

## What you can do with HeyReach MCP

Common patterns:

- **Campaign management:** "List my campaigns", "Pause [campaign name]", "Get stats for [campaign]"
- **Leads:** "Add these leads to campaign [name]", "Get leads from campaign [name]", "Remove lead with profile URL [url] from campaign"
- **Conversations:** "Show me unread conversations", "Send a message to [profile URL]"
- **Tags:** "Add tag '[tag]' to leads in campaign [name]"
- **Webhooks:** "Create a webhook on [event] pointing to [n8n URL]"

The AI setter system uses the HeyReach MCP indirectly through the n8n `setter-heyreach-handler` workflow. The MCP is for ad-hoc work and `/campaign-analyser` data pulls.

---

## Conventions for HeyReach campaigns

These aren't enforced by the MCP — they're SBS conventions Cyprian should follow when creating campaigns:

- **Naming:** `[Client] - [ICP] - [Month Year]` e.g. `SBS - Sam - April 2026`. Mirrors Instantly/Lemlist naming.
- **Connection requests:** 20/day per LinkedIn account, max 140/week. HeyReach respects LinkedIn's safety limits — don't try to override.
- **DM sequences:** 3 messages max. Connection request → first DM (day 2) → follow-up DM (day 7). Anything longer feels spammy.
- **Sender pool:** Always test on a single sender before adding more. Burnt LinkedIn accounts are expensive (manual warmup, possible permanent restriction).

---

## Removing the MCP later

To disconnect, remove the `"heyreach": {...}` block from `~/.claude/settings.json` and restart Claude Code. To revoke the API key, log into HeyReach Settings > API and delete it.

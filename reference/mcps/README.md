# MCP Setup Guides

These are the per-MCP setup guides for connecting Claude Code (Cyprian's local install) to the external services SBS uses. Each guide is self-contained — pick the ones you need.

## What is an MCP?

MCP (Model Context Protocol) is the connection layer between Claude Code and external services. Once set up, Claude Code can call APIs (Notion, n8n, HeyReach, Attio, etc.) directly through "tools" rather than you copy-pasting data manually.

You don't need every MCP. Only set up the ones the work you're doing actually needs.

## Where MCPs are configured

Two places, depending on whether the MCP is shared by the team or local to your machine:

| Location | Use when |
|---|---|
| `~/SidebySide/.mcp.json` (project-level) | The MCP is needed by anyone working in this project. Currently: notion, n8n, attio, clay, findymail, figma, stripe, trigify. |
| `~/.claude/settings.json` (user-level) | The MCP is for your personal use only OR when the project-level config exists but you need to add a personal API key. |

The skills assume the project `.mcp.json` is already populated by Josh. You only need to:

1. Make sure the env vars / API keys referenced in `.mcp.json` are present in your `.env`
2. For HTTP MCPs that use OAuth (Attio, Stripe, Figma), authenticate them once via `/mcp` in Claude Code
3. For HTTP MCPs that use API keys (Clay, Trigify), Josh provides the key

## What's in this folder

| File | Purpose |
|---|---|
| [`notion-mcp.md`](notion-mcp.md) | Notion MCP — read/write pages, databases, comments. Required for `/sop-creator`, `/client-brief`, `/internal-brief`. |
| [`n8n-mcp.md`](n8n-mcp.md) | n8n MCP — list, create, update, deploy workflows on the SBS n8n instance. Required if you're touching automation. |
| [`heyreach-mcp.md`](heyreach-mcp.md) | HeyReach MCP — manage LinkedIn campaigns, leads, conversations. Required if you're running LinkedIn outbound. |
| [`attio-mcp.md`](attio-mcp.md) | Attio MCP — read/write CRM records, lists, notes, tasks. Required for the Attio migration work and `/attio` skill. |

## When to set them up

When Cyprian first joins, only set up what's needed for the immediate task:

- **Send It Direct (Lemlist + Clay):** Notion is required (briefs land there). Lemlist + Clay use API keys in `.env`, not MCPs.
- **Any infrastructure / workflow work:** Add n8n.
- **LinkedIn outbound for any client:** Add HeyReach.
- **CRM migration / pipeline management:** Add Attio.

Don't pre-configure all four MCPs on day one. Each one is a permission surface — you only want what you're actually using.

## Asking Claude Code to set you up

Once you've decided which MCPs you need, tell Claude Code:

> "Set me up with the Notion and n8n MCPs. Walk me through it."

Claude Code reads the relevant guides in this folder and walks you through each step interactively (which env vars to add, which keys to ask Josh for, how to verify the connection). You don't need to read these guides yourself unless you want to.

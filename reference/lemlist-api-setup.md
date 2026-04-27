# Lemlist API Setup Guide

**Purpose:** Connect Claude Code to your Lemlist account so the `/campaign-builder` skill can create campaigns, attach sequences, and upload leads directly. You review everything in Lemlist before launching.

**Time:** 5 minutes.

---

## Step 1: Get Your API Key

1. Log into your Lemlist dashboard at [https://app.lemlist.com](https://app.lemlist.com)
2. Click your account avatar (top right) and go to **Settings**
3. Open the **Integrations** tab
4. Find the **API** section
5. Click **Generate API Key** (or copy the existing one if you already have one)
6. Copy the key to your clipboard

**Important:** This key gives full access to your Lemlist team workspace (campaigns, sequences, leads, senders). Do not share it or paste it into any public document.

---

## Step 2: Add the Key to Your Project

1. Open your project folder in VS Code / Claude Code
2. Find the `.env` file in your project root (if it does not exist, copy `.env.template` to `.env`)
3. Add this line:

```
LEMLIST_API_KEY=paste_your_key_here
```

4. Save the file

You can keep `INSTANTLY_API_KEY` and `LEMLIST_API_KEY` in the same `.env` file at the same time. The campaign-builder picks the right one per client based on the context CLAUDE.md.

**Example `.env` for Cyprian running both Instantly clients and Lemlist clients:**
```
INSTANTLY_API_KEY=abc123def456...
LEMLIST_API_KEY=xyz789ghi012...
ANTHROPIC_API_KEY=sk-ant-api03-...
```

---

## Step 3: Verify the Connection

Run this in Claude Code to confirm everything is working:

> "Check my Lemlist API connection. List my connected senders."

Claude Code will call `GET /api/team/senders` and show every connected mailbox. If you see your warmed mailboxes listed (with their daily send limits and warmup status), you are good to go.

**If you get an error:**
- Check your API key is correct (no extra spaces or line breaks)
- Confirm your Lemlist subscription includes API access (Standard plan or higher — the free trial does not)
- Confirm the `.env` file is saved in the project root folder, not a subfolder

---

## Authentication: how it works (for the curious)

Lemlist uses **HTTP Basic Auth**, NOT a Bearer token. The username is empty and the password is your API key. So the `Authorization` header looks like this:

```
Authorization: Basic <base64-encoded ":" + apiKey>
```

In Node.js this is:
```js
const auth = "Basic " + Buffer.from(":" + process.env.LEMLIST_API_KEY).toString("base64");
```

You don't need to set this up yourself — Claude Code does it for you when running `/campaign-builder`. This note is just so you know what's happening if you ever look at the raw API calls.

---

## What the Campaign Builder Does With Your API Key

When you run `/campaign-builder` against a Lemlist client, Claude Code uses your API key to:

1. **List your senders** to confirm the expected number of warmed mailboxes are connected and healthy
2. **Create a campaign** in Lemlist with a logical name (e.g. "Send It Direct - Procurement - May 2026")
3. **Fetch the auto-created sequence** for that campaign and attach the 3-email sequence drafted in markdown
4. **Push leads** one at a time, with custom variables (`copyExpertise`, `copyHook`, etc.) attached so the email templates render personalised
5. **Leave the campaign as a Draft** — never calls `/campaigns/{id}/start`

You then open Lemlist, sanity-check the sender assignments, schedule, sequence, and lead count, then click Launch when ready.

---

## What the Campaign Builder Does NOT Do

- It does not launch campaigns automatically
- It does not modify or delete existing campaigns
- It does not change your team settings or sender configurations
- It does not pull from your Lemlist enrichment / lookup credits — it only adds leads with the data Clay already produced
- It does not access billing

---

## Lemlist API Limits

- **Rate limit:** Lemlist rate-limits per team. Stay under ~120 requests/minute (we use 500ms between lead pushes which keeps you at ~120/min max).
- **Lead push:** No hard cap, but Lemlist recommends keeping campaigns under 1,000 leads each for deliverability. The SBS pipeline targets 50-150 leads per campaign anyway.
- **Sequence steps:** Up to 20 steps per sequence (we use 3-5).

---

## Security Notes

- Your `.env` file is listed in `.gitignore` by default. It will not be committed.
- Lemlist allows you to revoke the API key at any time from Settings > Integrations > API. Generate a new one and update `.env` if you ever suspect it has leaked.
- If you are using a shared computer, consider deleting the key from `.env` when you're done and regenerating next session.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `401 Unauthorized` | API key is wrong or missing. Regenerate in Lemlist Settings > Integrations > API and update `.env`. Also double-check the Basic Auth encoding includes the leading `:` (empty username). |
| `403 Forbidden` on a specific endpoint | Your plan tier may not allow this endpoint. Check your Lemlist subscription. Standard plan and above have full API access. |
| `429 Too Many Requests` | You're hitting the rate limit. The campaign-builder waits 500ms between leads — if you're seeing this, an external script is running too. |
| Leads pushed but custom variables empty | Lemlist stores any unknown top-level field on the lead body as a custom variable. Confirm Clay is producing the field with a non-null value before push. |
| Campaign created but no senders attached | Lemlist auto-attaches the team's default senders. If your client uses a dedicated sender pool, attach them manually in the Lemlist UI before launching. |
| `400` on schedule update | The Lemlist schedule body shape varies by API version. Skip the schedule update step — set the schedule manually in the Lemlist UI before launching. The campaign is still Draft, so this is safe. |

---

## Lemlist vs Instantly: what changes for SBS work?

| | Instantly | Lemlist |
|---|---|---|
| Auth | `Authorization: Bearer KEY` | `Authorization: Basic base64(":KEY")` |
| Base URL | `https://api.instantly.ai/api/v2` | `https://api.lemlist.com/api` |
| Variable format in copy | `{{firstName}}`, `{{copyExpertise}}` | `{{firstName}}`, `{{copyExpertise}}` (identical) |
| Spintax format | `{{Hi\|Hey}}` | `{{Hi\|Hey}}` (identical) |
| Custom variable mechanism | `custom_variables` object on lead body | Top-level fields on lead body |
| Sequence creation | Inline on campaign PATCH | Separate step POSTs to `/sequences/{id}/steps` |
| Draft/launch separation | Both: created as Draft, manual launch in UI | Same |

The SBS drafting workflow (`/campaign-builder` Steps 1-6) is the same for both platforms. Only Step 7 (the push) differs. This means a campaign drafted for Instantly can be moved to Lemlist (or vice versa) without rewriting the copy.

---

*Last updated: April 2026*

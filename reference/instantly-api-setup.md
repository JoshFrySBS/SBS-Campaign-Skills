# Instantly API Setup Guide

**Purpose:** Connect Claude Code to your Instantly account so the `/campaign-builder` skill can create campaigns, upload leads, and attach sequences directly. You review everything in Instantly before launching.

**Time:** 5 minutes.

---

## Step 1: Get Your API Key

1. Log into your Instantly dashboard at [https://app.instantly.ai](https://app.instantly.ai)
2. Click the **Settings** icon (gear icon, bottom left)
3. Go to **Integrations**
4. Find the **API** section
5. Click **Generate API Key** (or copy the existing one if you already have one)
6. Copy the key to your clipboard

**Important:** This key gives full access to your Instantly workspace. Do not share it with anyone or paste it into any public document.

---

## Step 2: Add the Key to Your Project

1. Open your project folder in VS Code / Claude Code
2. Find the `.env` file in your project root (if it does not exist, create one)
3. Add this line:

```
INSTANTLY_API_KEY=paste_your_key_here
```

4. Save the file

**Example:**
```
INSTANTLY_API_KEY=abc123def456ghi789
```

That is it. Claude Code reads the key from this file when running the campaign builder. The key never leaves your machine and is never included in any output.

---

## Step 3: Verify the Connection

Run this in Claude Code to confirm everything is working:

> "Check my Instantly API connection. List my sending accounts."

Claude Code will call the Instantly API and show your connected email accounts. If you see your accounts listed, you are good to go.

**If you get an error:**
- Check your API key is correct (no extra spaces or line breaks)
- Make sure your Instantly subscription includes API access (Growth plan or higher)
- Check the `.env` file is saved in the project root folder, not a subfolder

---

## What the Campaign Builder Does With Your API Key

When you run `/campaign-builder`, Claude Code uses your API key to:

1. **Create campaigns** in Instantly with logical names (e.g. "Precision - Growth Signal - March 2026")
2. **Upload leads** to each campaign from your segmented Clay export
3. **Attach email sequences** that Claude Code wrote based on your KB, strategy doc, and the lead data

**It never:**
- Launches campaigns automatically (you always review first)
- Modifies existing campaigns
- Changes your account settings
- Accesses billing information

You open Instantly after the push, review the copy, check lead counts, and launch when you are ready.

---

## Security Notes

- Your `.env` file is listed in `.gitignore` by default. It will not be committed to version control.
- If you are using a shared computer, consider deleting the key from `.env` when you are done and regenerating it next time.
- You can revoke and regenerate your API key at any time from Instantly Settings > Integrations > API.

---

## Instantly API Limits

- **Rate limit:** 10 requests per second (the campaign builder stays well within this)
- **Campaign creation:** No hard limit, but Instantly recommends keeping campaigns under 1,000 leads each for best deliverability
- **Sequence length:** Up to 7 steps per sequence (we typically use 3)

---

## Troubleshooting

| Problem | Fix |
|---|---|
| "Unauthorized" or "Invalid API key" | Regenerate the key in Instantly and update `.env` |
| "No sending accounts found" | Check that your Instantly workspace has at least one connected email account |
| Campaign created but no leads uploaded | Check your Clay export CSV is in the project folder and has email addresses |
| "Rate limit exceeded" | Wait 60 seconds and try again. This only happens if you run multiple builds very quickly. |

---

*Last updated: March 2026*

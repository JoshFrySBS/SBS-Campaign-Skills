---
name: share-doc
description: Share a markdown file as a viewable Google Doc. Converts markdown to a formatted Google Doc using your Google account, sets "anyone with link can view" permissions, and returns the shareable link. Use when sharing documents with clients. Triggers: "share this with", "create a google doc", "share doc", "send to client", "make shareable".
---

# share-doc

Convert a markdown file to a Google Doc and get a shareable "anyone with link can view" link.

## Prerequisites

- Pandoc installed
- `google-client-credentials.json` in project root (provided by Josh)
- Google account connected (one-time `--setup`)
- Dependencies installed: `cd Automation/share-doc && npm install`

## Usage

When the user asks to share a file with a client or create a Google Doc from a markdown file:

1. Identify the markdown file path
2. Run the share script:

```bash
node Automation/share-doc/share.js "<file-path>"
```

With a custom title:

```bash
node Automation/share-doc/share.js "<file-path>" --title "Client Name - Document Title"
```

Into a specific Google Drive folder:

```bash
node Automation/share-doc/share.js "<file-path>" --folder "<folder-id>"
```

3. The script outputs JSON with the shareable link. Present the link clearly to the user.

## If Setup Not Done

If the script reports missing credentials or auth errors, guide the user through setup:

1. **Missing `google-client-credentials.json`**: "The credentials file should already be in your project. Run `git pull` to get the latest version. See `Automation/share-doc/SETUP.md` Step 3."

2. **No Google account connected**: "Run `node Automation/share-doc/share.js --setup` to connect your Google account. Your browser will open and you will sign in once. After that it works automatically."

3. **Token expired / auth error**: "Run `node Automation/share-doc/share.js --setup` to reconnect your Google account."

4. **Pandoc not installed**: "Install Pandoc first. See `Automation/share-doc/SETUP.md` Step 1 for instructions."

5. **Dependencies not installed**: "Run `cd Automation/share-doc && npm install` first."

## Default Folder

If the user has `GOOGLE_DRIVE_FOLDER` set in their `.env`, all docs go there automatically. The `--folder` flag overrides this for a single doc.

## Notes

- Pandoc converts markdown to HTML without `--standalone` (no default CSS that breaks table widths)
- The script injects custom CSS for clean spacing (headings, paragraphs, lists, tables, hr)
- Tables are forced to full page width via oversized `<colgroup>` injection (Google Docs clamps to margins)
- Documents are created in the user's own Google Drive via OAuth2
- Documents are set to "anyone with link can view" permissions
- No n8n or external services required
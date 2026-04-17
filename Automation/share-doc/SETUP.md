# Share Doc Setup

Turn any markdown file into a Google Doc you can share with clients.

Takes about 5 minutes to set up. You only do this once.

---

## Step 1: Install Pandoc

Pandoc is a small program that converts your markdown files into formatted documents. You need to install it once.

### Windows

1. Go to this page: https://pandoc.org/installing.html
2. Click the big **"Download the latest installer for Windows"** button
3. Run the file you just downloaded
4. Click **Next**, **Next**, **Install**, **Finish**
5. **Close your terminal completely and reopen it** (this is important)

### Mac

1. Open your Terminal app
2. Paste this and press Enter:

```
brew install pandoc
```

If you get an error saying "brew not found", install Homebrew first by pasting this and pressing Enter:

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then try the `brew install pandoc` command again.

### Check it worked

Type this in your terminal and press Enter:

```
pandoc --version
```

You should see something like `pandoc 3.x.x`. If you see "not found" or "not recognized", close your terminal completely, reopen it, and try again.

---

## Step 2: Install the script

1. Open your terminal
2. Make sure you are in your project folder
3. Run this command:

```
cd Automation/share-doc && npm install
```

You should see some text scroll by and then it finishes. That is it.

---

## Step 3: Get the Google credentials file

You need a file called `google-client-credentials.json` in your project root folder (next to your `.env` file). Josh will send this to you separately since it can't be stored in the repo.

```
sbs-campaign-skills/
  .env                              <-- you already have this
  google-client-credentials.json    <-- put it here
  Automation/
  campaigns/
  ...
```

If you don't have this file, ask Josh to send it to you.

---

## Step 4: Connect your Google account

This is where you tell the script which Google account to use. Your shared docs will live in this account's Google Drive.

1. In your terminal, run:

```
node Automation/share-doc/share.js --setup
```

2. **Your browser will open** to a Google sign-in page

3. **Sign in** with the Google account where you want your docs to live

4. You will see a screen that says **"Google hasn't verified this app"**

   This is completely normal and safe. It just means the app has not gone through Google's review process (most small tools do not). Here is what to do:

   - Click **"Advanced"** (it is small text at the bottom left of the page)
   - Click **"Go to Modern Founder Share Doc (unsafe)"**
   - It says "unsafe" but it is not. Google says this for every unverified app.

5. Click **"Allow"** to let the script create files in your Google Drive

6. Your browser will show a green **"Connected!"** message

7. Go back to your terminal. You should see: **"Google account connected successfully!"**

**That is it. You will not need to do this again.**

---

## Step 5 (optional): Set a default Google Drive folder

By default, your shared docs go into the top level of your Google Drive (My Drive). If you want them to go into a specific folder instead:

1. Open **Google Drive** in your browser (drive.google.com)

2. Open the folder you want docs to go into (or create a new one)

3. Look at the **URL bar** in your browser. It will look something like this:

```
https://drive.google.com/drive/folders/1aBcDeFgHiJkLmNoPqRsTuVwXyZ
```

4. Copy everything **after** `folders/` -- that long string of letters and numbers is your folder ID

5. Open your `.env` file and add this line at the bottom:

```
GOOGLE_DRIVE_FOLDER=paste_your_folder_id_here
```

For example:

```
GOOGLE_DRIVE_FOLDER=1aBcDeFgHiJkLmNoPqRsTuVwXyZ
```

6. Save the file

Now every doc you share will automatically go into that folder. You can still use `--folder` to put a specific doc somewhere else.

---

## Test it

Run this in your terminal:

```
node Automation/share-doc/share.js README.md
```

You should get back something like this:

```json
{
  "success": true,
  "title": "README",
  "docId": "abc123...",
  "link": "https://docs.google.com/document/d/abc123.../edit?usp=sharing"
}
```

Open that link in your browser. You should see your README as a formatted Google Doc that anyone with the link can view.

---

## Troubleshooting

### "Google client credentials not found"

The script cannot find the `google-client-credentials.json` file. Try:
- Run `git pull` to get the latest version of the project
- Check that `google-client-credentials.json` is in your **project root folder** (next to your `.env` file)
- Make sure the filename is exactly `google-client-credentials.json`

### "Pandoc is not installed" or "pandoc not found"

Pandoc is not installed or your terminal cannot find it. Try:
1. Close your terminal completely
2. Reopen it
3. Try `pandoc --version` again
4. If still broken, go back to Step 1 and reinstall Pandoc

### "Google auth failed" or "invalid_grant" or "Token has been expired"

Your Google connection needs refreshing. Run:

```
node Automation/share-doc/share.js --setup
```

This reconnects your Google account. You only need to do this if something goes wrong.

### "Error: Token refresh failed"

Same fix as above. Run `--setup` to reconnect.

### The browser did not open

If the browser does not open automatically, look in your terminal for a long URL starting with `https://accounts.google.com/...`. Copy that entire URL and paste it into your browser.

---

## For Instructors: Creating the Google Credentials

These are Josh's notes for creating the client credentials file that students use.

1. Go to https://console.cloud.google.com/
2. Create a new project (or use your existing one)
3. Go to **APIs & Services** > **Library**
4. Search for **"Google Drive API"** and click **Enable**
5. Go to **APIs & Services** > **Credentials**
6. Click **"+ CREATE CREDENTIALS"** > **"OAuth client ID"**
7. Application type: **Desktop app**
8. Name: **"Modern Founder Share Doc"**
9. Click **Create**
10. Click **"DOWNLOAD JSON"** on the credential you just created
11. Rename the downloaded file to `google-client-credentials.json`
12. Upload to the course platform for students to download

The client_id and client_secret in this file are NOT secret keys. They identify the app, but each student still needs to log in with their own Google account to use it. Safe to distribute.

If a student reports auth issues, you can revoke and reissue the credentials from the same Credentials page.

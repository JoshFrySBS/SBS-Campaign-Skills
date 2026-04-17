/**
 * share-doc: Convert markdown to a Google Doc with "anyone with link can view" permissions.
 *
 * Usage:
 *   node share.js <markdown-file> [--title <custom-title>] [--folder <folder-id>]
 *   node share.js --setup          (connect your Google account for the first time)
 *
 * Requires:
 *   - Pandoc installed (for md -> HTML conversion)
 *   - google-client-credentials.json in project root (provided by Josh)
 *   - First-time: run --setup to connect your Google account
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const https = require('https');
const http = require('http');

const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

// --- File paths ---
const PROJECT_ROOT = path.join(__dirname, '..', '..');
const CLIENT_CREDS_PATH = process.env.GOOGLE_CLIENT_CREDENTIALS
  ? path.resolve(PROJECT_ROOT, process.env.GOOGLE_CLIENT_CREDENTIALS)
  : path.join(PROJECT_ROOT, 'google-client-credentials.json');
const TOKEN_PATH = path.join(PROJECT_ROOT, '.google-token.json');
const DEFAULT_FOLDER = process.env.GOOGLE_DRIVE_FOLDER || null;

// --- Parse arguments ---
const args = process.argv.slice(2);
const isSetup = args.includes('--setup');
const inputFile = args.find(a => !a.startsWith('--'));
const titleFlag = args.indexOf('--title');
const customTitle = titleFlag !== -1 ? args[titleFlag + 1] : null;
const folderFlag = args.indexOf('--folder');
const folderId = folderFlag !== -1 ? args[folderFlag + 1] : DEFAULT_FOLDER;

// ============================================================
// Google OAuth2 helpers
// ============================================================

function loadClientCredentials() {
  if (!fs.existsSync(CLIENT_CREDS_PATH)) {
    console.error('\n  Google client credentials not found.');
    console.error('  Expected file: ' + CLIENT_CREDS_PATH);
    console.error('\n  See SETUP.md Step 3 — download the file Josh provided and');
    console.error('  save it in your project root folder (next to your .env file).\n');
    process.exit(1);
  }
  const raw = JSON.parse(fs.readFileSync(CLIENT_CREDS_PATH, 'utf-8'));
  // Google exports credentials in { installed: { ... } } or { web: { ... } } format
  const creds = raw.installed || raw.web || raw;
  return {
    clientId: creds.client_id,
    clientSecret: creds.client_secret,
    redirectUri: 'http://localhost:3847/callback'
  };
}

function loadSavedTokens() {
  if (!fs.existsSync(TOKEN_PATH)) return null;
  try {
    return JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
  } catch {
    return null;
  }
}

function saveTokens(tokens) {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
}

function buildAuthUrl(clientId, redirectUri) {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/drive.file',
    access_type: 'offline',
    prompt: 'consent'
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

function exchangeCodeForTokens(code, clientId, clientSecret, redirectUri) {
  return new Promise((resolve, reject) => {
    const body = new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    }).toString();

    const req = https.request({
      hostname: 'oauth2.googleapis.com',
      path: '/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) reject(new Error(parsed.error_description || parsed.error));
          else resolve(parsed);
        } catch { reject(new Error('Failed to parse Google response')); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function refreshAccessToken(refreshToken, clientId, clientSecret) {
  return new Promise((resolve, reject) => {
    const body = new URLSearchParams({
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'refresh_token'
    }).toString();

    const req = https.request({
      hostname: 'oauth2.googleapis.com',
      path: '/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) reject(new Error(parsed.error_description || parsed.error));
          else resolve(parsed);
        } catch { reject(new Error('Failed to parse Google response')); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

/**
 * Run the browser-based OAuth2 flow:
 * 1. Start a tiny localhost server to catch the redirect
 * 2. Open the browser to Google's consent page
 * 3. Wait for the auth code
 * 4. Exchange code for tokens
 */
async function runAuthFlow(clientId, clientSecret, redirectUri) {
  const authUrl = buildAuthUrl(clientId, redirectUri);

  // Try to open the browser
  let openBrowser;
  try {
    openBrowser = (await import('open')).default;
  } catch {
    // If 'open' package not available, just print the URL
    openBrowser = null;
  }

  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      try {
        const url = new URL(req.url, 'http://localhost:3847');
        const code = url.searchParams.get('code');
        const error = url.searchParams.get('error');

        if (error) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end('<html><body><h2>Something went wrong</h2><p>Google said: ' + error + '</p><p>Close this tab and try again.</p></body></html>');
          server.close();
          reject(new Error('Google auth error: ' + error));
          return;
        }

        if (!code) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end('<html><body><p>Waiting for auth...</p></body></html>');
          return;
        }

        // Exchange code for tokens
        const tokens = await exchangeCodeForTokens(code, clientId, clientSecret, redirectUri);
        saveTokens(tokens);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<html><body><h2 style="color: green;">Connected!</h2><p>Your Google account is connected. You can close this tab and go back to your terminal.</p></body></html>');
        server.close();
        resolve(tokens);
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<html><body><h2>Error</h2><p>' + err.message + '</p></body></html>');
        server.close();
        reject(err);
      }
    });

    server.listen(3847, () => {
      console.log('\n  Opening your browser to connect your Google account...');
      console.log('  If the browser does not open, copy and paste this URL:\n');
      console.log('  ' + authUrl + '\n');

      if (openBrowser) {
        openBrowser(authUrl).catch(() => {
          // Browser failed to open, user will use the printed URL
        });
      }
    });

    // Timeout after 2 minutes
    setTimeout(() => {
      server.close();
      reject(new Error('Timed out waiting for Google auth. Run the command again to retry.'));
    }, 120000);
  });
}

/**
 * Get a valid access token. Handles:
 * - No saved tokens -> run auth flow
 * - Expired tokens -> refresh
 * - Valid tokens -> return as-is
 */
async function getAccessToken(forceSetup) {
  const { clientId, clientSecret, redirectUri } = loadClientCredentials();
  let tokens = loadSavedTokens();

  if (!tokens || forceSetup) {
    tokens = await runAuthFlow(clientId, clientSecret, redirectUri);
    console.log('\n  Google account connected successfully!\n');
    return tokens.access_token;
  }

  // Check if token is expired (with 60s buffer)
  const isExpired = tokens.expiry_date
    ? Date.now() > tokens.expiry_date - 60000
    : true; // if no expiry info, try refresh

  if (isExpired && tokens.refresh_token) {
    try {
      const refreshed = await refreshAccessToken(tokens.refresh_token, clientId, clientSecret);
      // Preserve the refresh token (Google doesn't always return a new one)
      tokens.access_token = refreshed.access_token;
      tokens.expiry_date = Date.now() + (refreshed.expires_in * 1000);
      if (refreshed.refresh_token) tokens.refresh_token = refreshed.refresh_token;
      saveTokens(tokens);
      return tokens.access_token;
    } catch {
      // Refresh failed, re-auth
      console.log('  Token refresh failed. Re-connecting your Google account...');
      tokens = await runAuthFlow(clientId, clientSecret, redirectUri);
      console.log('\n  Google account connected successfully!\n');
      return tokens.access_token;
    }
  }

  return tokens.access_token;
}

// ============================================================
// Google Drive API helpers
// ============================================================

function createGoogleDoc(accessToken, title, htmlContent, parentFolderId) {
  return new Promise((resolve, reject) => {
    const boundary = 'sbs_share_doc_boundary';
    const metadata = JSON.stringify({
      name: title,
      mimeType: 'application/vnd.google-apps.document',
      ...(parentFolderId ? { parents: [parentFolderId] } : {})
    });

    const body = [
      `--${boundary}`,
      'Content-Type: application/json; charset=UTF-8',
      '',
      metadata,
      `--${boundary}`,
      'Content-Type: text/html; charset=UTF-8',
      '',
      htmlContent,
      `--${boundary}--`
    ].join('\r\n');

    const req = https.request({
      hostname: 'www.googleapis.com',
      path: '/upload/drive/v3/files?uploadType=multipart',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
        'Content-Length': Buffer.byteLength(body, 'utf-8')
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 400) {
            reject(new Error(`Google Drive error (${res.statusCode}): ${parsed.error?.message || data}`));
          } else {
            resolve(parsed);
          }
        } catch { reject(new Error('Failed to parse Google Drive response: ' + data)); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function setPublicViewing(accessToken, fileId) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ role: 'reader', type: 'anyone' });

    const req = https.request({
      hostname: 'www.googleapis.com',
      path: `/drive/v3/files/${fileId}/permissions`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 400) {
          reject(new Error(`Permission error (${res.statusCode}): ${data}`));
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ============================================================
// Pandoc + HTML formatting (identical to original share-doc)
// ============================================================

function convertMarkdownToHtml(filePath) {
  try {
    return execSync(`pandoc "${filePath}" -f markdown -t html`, { encoding: 'utf-8' });
  } catch (err) {
    if (err.message.includes('not found') || err.message.includes('not recognized')) {
      console.error('\n  Pandoc is not installed.');
      console.error('  See SETUP.md Step 1 for install instructions.\n');
    } else {
      console.error('  Pandoc conversion failed:', err.message);
    }
    process.exit(1);
  }
}

function wrapWithStyles(rawHtml) {
  return `<html><head><style>
body { font-family: Arial, sans-serif; line-height: 1.35; }
h1 { margin-top: 0.4em; margin-bottom: 0.15em; }
h2 { margin-top: 0.5em; margin-bottom: 0.1em; }
h3 { margin-top: 0.35em; margin-bottom: 0.1em; }
p { margin: 0.2em 0; font-size: 11pt; }
table { border-collapse: collapse; margin: 0.3em 0; }
td, th { padding: 4px 8px; border: 1px solid #ccc; vertical-align: top; font-size: 11pt; }
th { font-weight: bold; }
ul, ol { margin: 0.2em 0; }
li { margin: 0.05em 0; font-size: 11pt; }
hr { margin: 0.6em 0; border: none; border-top: 2px solid #e74c3c; }
</style></head><body>${rawHtml}</body></html>`;
}

function forceFullWidthTables(html) {
  let pos = 0;
  while (pos < html.length) {
    const tableStart = html.indexOf('<table', pos);
    if (tableStart === -1) break;
    const tableEnd = html.indexOf('</table>', tableStart);
    if (tableEnd === -1) break;
    const tableBlock = html.substring(tableStart, tableEnd);
    const firstRow = tableBlock.match(/<tr[^>]*>([\s\S]*?)<\/tr>/);
    if (firstRow) {
      const cells = firstRow[1].match(/<t[hd]/g);
      const colCount = cells ? cells.length : 1;
      const colgroup = '<colgroup>' + '<col width="1000">'.repeat(colCount) + '</colgroup>';
      let cleaned = tableBlock.replace(/<colgroup>[\s\S]*?<\/colgroup>\s*/, '');
      const insertAt = cleaned.indexOf('>') + 1;
      const patched = cleaned.substring(0, insertAt) + colgroup + cleaned.substring(insertAt);
      html = html.substring(0, tableStart) + patched + html.substring(tableEnd);
      pos = tableStart + patched.length + 8;
    } else {
      pos = tableEnd + 8;
    }
  }
  return html;
}

// ============================================================
// Main
// ============================================================

async function main() {
  // Handle --setup flag
  if (isSetup) {
    await getAccessToken(true);
    console.log('  You can now share documents with:');
    console.log('  node share.js <your-file.md>\n');
    return;
  }

  // Validate input
  if (!inputFile) {
    console.error('Usage: node share.js <markdown-file> [--title <custom-title>] [--folder <folder-id>]');
    console.error('       node share.js --setup          (connect your Google account)');
    process.exit(1);
  }

  const filePath = path.resolve(inputFile);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  // 1. Convert markdown to styled HTML
  const title = customTitle || path.basename(filePath, '.md').replace(/_/g, ' ');
  const rawHtml = convertMarkdownToHtml(filePath);
  const styledHtml = wrapWithStyles(rawHtml);
  const html = forceFullWidthTables(styledHtml);

  // 2. Get Google access token (auto-refreshes or prompts setup if needed)
  const accessToken = await getAccessToken(false);

  // 3. Create Google Doc
  const doc = await createGoogleDoc(accessToken, title, html, folderId);

  // 4. Set "anyone with link can view"
  await setPublicViewing(accessToken, doc.id);

  // 5. Output result
  const link = `https://docs.google.com/document/d/${doc.id}/edit?usp=sharing`;
  console.log(JSON.stringify({
    success: true,
    title,
    docId: doc.id,
    link
  }, null, 2));
}

main().catch(err => {
  console.error('\n  Error: ' + err.message);
  if (err.message.includes('invalid_grant') || err.message.includes('Token has been expired')) {
    console.error('  Your Google connection has expired. Run this to reconnect:');
    console.error('  node share.js --setup\n');
  }
  process.exit(1);
});

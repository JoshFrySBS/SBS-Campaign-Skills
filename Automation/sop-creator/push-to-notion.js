/**
 * push-to-notion.js — Step 3 of the SOP flow.
 *
 * Writes (or updates) a row in the Notion SOP Library after the Google Doc
 * has already been created (via share-doc) and approved by Josh.
 *
 * The pipeline:
 *   1. /sop-creator      → fills the template, saves markdown locally
 *   2. share-doc         → Google Doc in the SBS SOPs Drive folder (manual approval happens here)
 *   3. push-to-notion.js → logs the approved SOP in the Notion SOP Library
 *
 * Usage:
 *   node Automation/sop-creator/push-to-notion.js "<markdown-file>" \
 *     --title    "SBS SOP — Clay — Company Research Setup" \
 *     --category "Clay" \
 *     --doc-link "https://docs.google.com/document/d/…/edit" \
 *     [--description "One-line summary for the Notion row"] \
 *     [--loom      "https://loom.com/share/…"] \
 *     [--status    "Active"]   # default: Draft
 *
 * If a row with the exact same title exists, it is updated in place
 * (Last Updated is bumped, Google Doc Link + Loom + Status replaced).
 * This is the correct flow for updating a changed process.
 *
 * Requires NOTION_API_KEY in .env at project root.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

function loadDotenv(envPath) {
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf-8').split(/\r?\n/);
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}

loadDotenv(path.join(__dirname, '..', '..', '.env'));

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const SOP_DATABASE_ID = '342169e4-97cc-818d-b47e-cc12cf1bd397';

const VALID_CATEGORIES = [
  'Clay',
  'Email / Instantly',
  'LinkedIn / HeyReach',
  'Claude Code',
  'Client Delivery',
  'Internal Ops',
  'Infrastructure',
  'n8n / Automation',
  'Course',
  'AI Setter',
];

const VALID_STATUSES = ['Draft', 'Active', 'Needs Update', 'No Longer Needed'];

function parseArgs(argv) {
  const args = argv.slice(2);
  const FLAGS_WITH_VALUE = new Set([
    '--title', '--category', '--description', '--loom', '--status', '--doc-link', '--bulk',
  ]);
  const opts = {};
  const positionals = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (FLAGS_WITH_VALUE.has(a)) {
      const val = args[++i];
      if (a === '--title') opts.title = val;
      else if (a === '--category') opts.category = val;
      else if (a === '--description') opts.description = val;
      else if (a === '--loom') opts.loom = val;
      else if (a === '--status') opts.status = val;
      else if (a === '--doc-link') opts.docLink = val;
      else if (a === '--bulk') opts.bulk = val;
    } else if (!a.startsWith('--')) {
      positionals.push(a);
    }
  }
  if (positionals.length > 0) opts.file = positionals[0];
  return opts;
}

function fail(msg) {
  console.error(`ERROR: ${msg}`);
  process.exit(1);
}

function notionRequest(method, pathSuffix, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : '';
    const req = https.request(
      {
        hostname: 'api.notion.com',
        path: `/v1${pathSuffix}`,
        method,
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data || '{}');
            if (res.statusCode >= 400) {
              reject(new Error(`Notion ${method} ${pathSuffix} failed (${res.statusCode}): ${data}`));
            } else {
              resolve(parsed);
            }
          } catch {
            reject(new Error(`Notion ${method} ${pathSuffix} invalid JSON: ${data}`));
          }
        });
      }
    );
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function findExistingSop(title) {
  const res = await notionRequest('POST', `/databases/${SOP_DATABASE_ID}/query`, {
    filter: { property: 'SOP Name', title: { equals: title } },
    page_size: 1,
  });
  return res.results && res.results[0] ? res.results[0] : null;
}

function buildProperties({ title, category, description, loom, status, docLink }) {
  const today = new Date().toISOString().slice(0, 10);
  const props = {
    'SOP Name': { title: [{ text: { content: title } }] },
    Category: { select: { name: category } },
    Status: { select: { name: status } },
    'Last Updated': { date: { start: today } },
    'Google Doc Link': { url: docLink },
  };
  if (description) {
    props.Description = { rich_text: [{ text: { content: description.slice(0, 2000) } }] };
  }
  if (loom) props['Loom Link'] = { url: loom };
  return props;
}

function validateEntry(entry, ctx = 'entry') {
  if (!entry.title) fail(`${ctx}: missing title.`);
  if (!entry.category) fail(`${ctx}: missing category.`);
  if (!entry.docLink) fail(`${ctx}: missing docLink (Google Doc URL).`);
  if (!VALID_CATEGORIES.includes(entry.category)) {
    fail(`${ctx}: invalid category "${entry.category}". Must be one of: ${VALID_CATEGORIES.join(', ')}`);
  }
  const status = entry.status || 'Draft';
  if (!VALID_STATUSES.includes(status)) {
    fail(`${ctx}: invalid status "${status}". Must be one of: ${VALID_STATUSES.join(', ')}`);
  }
  return { ...entry, status };
}

async function upsertOne(entry) {
  const e = validateEntry(entry, `"${entry.title || '<untitled>'}"`);
  const properties = buildProperties({
    title: e.title,
    category: e.category,
    description: e.description || '',
    loom: e.loom || '',
    status: e.status,
    docLink: e.docLink,
  });
  const existing = await findExistingSop(e.title);
  if (existing) {
    const updated = await notionRequest('PATCH', `/pages/${existing.id}`, { properties });
    return { title: e.title, url: updated.url, action: 'updated', status: e.status };
  }
  const created = await notionRequest('POST', '/pages', {
    parent: { database_id: SOP_DATABASE_ID },
    properties,
  });
  return { title: e.title, url: created.url, action: 'created', status: e.status };
}

async function runBulk(bulkPath) {
  const abs = path.resolve(bulkPath);
  if (!fs.existsSync(abs)) fail(`Bulk file not found: ${abs}`);
  const parsed = JSON.parse(fs.readFileSync(abs, 'utf-8'));
  const entries = Array.isArray(parsed) ? parsed : parsed.entries;
  if (!Array.isArray(entries)) fail('Bulk JSON must be an array, or an object with an "entries" array.');
  console.log(`\nBulk mode: ${entries.length} entries from ${abs}\n`);
  const results = [];
  for (const raw of entries) {
    const entry = { ...raw, docLink: raw.docLink || raw['doc-link'] || raw.docLink };
    try {
      const r = await upsertOne(entry);
      console.log(`  [${r.action}] ${r.title} → ${r.url}`);
      results.push(r);
    } catch (err) {
      console.error(`  [FAILED] ${entry.title || '<untitled>'}: ${err.message}`);
      results.push({ title: entry.title, error: err.message });
    }
  }
  console.log(`\nDone. ${results.filter((r) => !r.error).length}/${entries.length} succeeded.`);
  console.log(JSON.stringify(results, null, 2));
}

async function main() {
  const opts = parseArgs(process.argv);
  if (!NOTION_API_KEY) fail('NOTION_API_KEY missing from .env');

  if (opts.bulk) {
    return runBulk(opts.bulk);
  }

  if (!opts.title) fail('Missing --title.');
  if (!opts.category) fail('Missing --category.');
  if (!opts.docLink) fail('Missing --doc-link. For existing Google Docs paste the URL here; for fresh SOPs run share-doc first.');
  const absFile = opts.file ? path.resolve(opts.file) : null;
  if (absFile && !fs.existsSync(absFile)) {
    console.warn(`Note: markdown file not found at ${absFile} — continuing with Notion push anyway.`);
  }

  console.log(`\n→ Pushing to Notion SOP Library: ${opts.title}`);
  console.log(`  Category: ${opts.category}`);
  console.log(`  Status:   ${opts.status || 'Draft'}`);
  console.log(`  Doc:      ${opts.docLink}`);
  if (absFile) console.log(`  Local:    ${absFile}`);
  else console.log(`  Local:    (none — Drive-only mode)`);

  const result = await upsertOne({
    title: opts.title,
    category: opts.category,
    description: opts.description || '',
    loom: opts.loom || '',
    status: opts.status || 'Draft',
    docLink: opts.docLink,
  });

  console.log(`\nNotion row ${result.action}: ${result.url}`);
  console.log(JSON.stringify({
    local: absFile,
    google_doc: opts.docLink,
    notion: result.url,
    action: result.action,
    status: result.status,
  }, null, 2));
}

main().catch((err) => {
  console.error('\nFAILED:', err.message);
  process.exit(1);
});

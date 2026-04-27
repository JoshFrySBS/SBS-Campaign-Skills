# DFY Engine — Plan

> **Canonical home for this plan.** Shared via git. Cyprian git-pulls his side, Josh updates this side.
> First ICP target: **Sam** (B2B companies, 10–80 staff, sales team of 2–10 reps doing manual outbound). Architecture is reusable — future DFY ICPs (e.g. Ryan) plug in via different signal scrapers/scoring without re-engineering the engine.

---

## Context

The Sam ICP is a crowded pond. Everyone with Apollo + Clay is fishing in it. The thesis: our edge isn't a different list — it's **signal density per lead**. Stack 3+ proof points that this company is running manually, and we earn the right to be hyper-personal in a way Apollo-and-spray competitors can't.

Rebecca's pipeline proves the architecture works for **event-based** signals. Sam's signals aren't dated events — they're **operational states** (just hired a BD rep + no sales tech in stack + job ad mentions "manual research"). So we invert Rebecca's model: instead of *source companies → hunt events*, we go **signal → company → stack more signals → qualify**.

Goal: weekly auto-run that surfaces 30–50 hot DFY-fit companies with **stacked signals + manual-thesis confirmation + deep research**, packaged as a CSV in Cyprian's Notion task board. Cyprian does the people/email enrichment in Clay (waterfall, BuiltWith if needed), writes copy via skills, pushes to Instantly. Josh out of operations. Cyprian fully runnable end-to-end.

---

## Division of labour

**Our pipeline does (weekly, server-scheduled, no machines required):**
1. Scrape signals from multiple sources
2. Resolve to companies, dedupe, store
3. Manual-thesis confirmation — Apollo `technologies` field + job-ad text scan, returns `tech_confidence` (high/medium/low)
4. Score with stacked weights, filter to priority (≥6 score)
5. Deep research on priority leads (Perplexity → 3 personalisation hooks + BD-floor empathy line + recommended angle)
6. Export CSV (companies + signals + research + suggested target titles + tech_confidence)
7. Upload CSV to a known Google Drive folder
8. Create one Notion task per ISO week in Cyprian's Task Board with summary + CSV link

**Cyprian does (weekly, manual, ~3 hrs):**
1. Open the Notion task in his dashboard, download the CSV
2. Upload to a Clay table
3. Clay: Apollo people enrichment at target titles (MD/CEO/Founder/Head of Sales/Head of BD/VP Sales)
4. Clay: email waterfall (Apollo → ContactOut → Hunter → Snov → FindyMail) for verified contacts
5. Clay: BuiltWith for any rows where our `tech_confidence` is `low`
6. Export from Clay
7. Run `/campaign-builder` against the data → copy quality ≥7.5 per rubric
8. Run `/campaign-push` to push to Instantly as DRAFT
9. Review copy in Instantly, activate
10. Mark Notion task as Done

**Why this split:** we own the differentiator (signal stacking + manual-thesis confirmation + research depth — none of which Apollo/Clay competitors do). Cyprian owns the parts where multi-source enrichment beats single-source — Clay's waterfall finds contacts our pipeline would miss, and his Clay credits/time are already paid for.

---

## Apollo Technologies — what we get and where we stop

Apollo's `technologies` field is sourced from web scrapes + data partners.

| Tool category | Apollo coverage |
|---|---|
| Major sales tech (Outreach, Salesloft, Apollo, Salesforce, HubSpot, Clay, Instantly, Lemlist, Cognism, ContactOut) | Strong — reliable detection |
| Mid-tier (Lusha, Snov, FindyMail, Lavender) | Good but not exhaustive |
| Smaller/newer tools | Sparse |

**For our use case (detecting *absence* of a sales tech stack), this is well-suited:**
- We care about false negatives (tool present, Apollo missed it → we mis-flag as "manual")
- We don't care about false positives (Apollo says they have Outreach → we exclude → fine)

**`tech_confidence` field on every CSV row:**
- `high` → Apollo returned a tech list AND none of our flagged competitors are present AND website scan agrees
- `medium` → Apollo returned a tech list AND none of our flagged competitors present, but website scan didn't run / was inconclusive
- `low` → Apollo returned sparse / no tech data — Cyprian should run BuiltWith via Clay

We ship strong signals on `high` rows and let Cyprian upgrade the `low` rows in Clay. We don't pay for BuiltWith on our side.

---

## Design philosophy

1. **Signal-first, not company-first.** No fixed master list. Each scraper finds *new* companies via its signal. Companies converge in `dfy_companies` as multiple signals hit them.
2. **Stack-or-skip.** Single signal isn't enough — too many false positives. Only ship leads with **≥6 stacked signal points**.
3. **Manual thesis must be confirmable, not assumed.** Apollo `technologies` + job-ad language scan = the differentiator. `tech_confidence` exposed so Cyprian can upgrade ambiguous rows.
4. **Buyer-only outreach. BD-floor pain is fuel, not a separate target.** Email goes to the decision-maker (Sam — MD/CEO/Founder/Head of Sales/Head of BD/VP Sales). What John BD is going through *internally* shows up in the research hooks ("your team is currently building lists by hand").
5. **We deliver intelligence; Cyprian completes contacts in Clay.** Clay waterfalls beat single-source enrichment. We don't duplicate the credit cost.
6. **Cyprian runs the whole thing end-to-end.** Josh sees a Friday rollup eventually, not the leads.

---

## Hosting + Cyprian end-to-end runnability

**Recommendation: GitHub Actions cron**, scheduled `0 7 * * 1` (Mon 7am UTC).

| Capability | How Cyprian does it |
|---|---|
| Scheduled weekly run | Cron fires automatically — no machine required to be on |
| Off-cycle manual trigger | GitHub Actions UI → "Run workflow" button (workflow_dispatch enabled) |
| See logs | GitHub Actions UI per run, full stdout |
| Re-run a failed run | One click in GitHub Actions UI |
| Local debug / dev | Clone repo + `npm install` + run with dev `.env` (Josh provisions limited dev keys) |
| Failure notifications | GitHub Actions email-on-failure (Josh + Cyprian both subscribed); pipeline also writes a `FAILED` Notion task to Cyprian's board |
| Modify thresholds / signals | Edit code in repo, commit, next cron run picks it up |

**Setup needed for full Cyprian autonomy:**
- Add Cyprian as repo collaborator (write access, not admin)
- Provision him a personal `.env.dev` with non-production API keys for local debug
- Document the `npm run dfy:weekly` and `npm run dfy:dry-run` commands
- Walk him through the GitHub Actions UI on Loom

**SBS Telegram bot — scoped access for Cyprian (operator-grade alerts only):**
- AI setter escalations (DFY signals, hot replies) — he can action faster than Josh, especially cross-timezone
- Workflow failure alerts (n8n + GitHub Actions cron) — he's the operator, should see infra fails first
- One weekly "DFY engine done — see Notion" heads-up ping (NOT lead data — Notion remains canonical)
- He does NOT get lead-level data via Telegram. Permanent record stays in Notion.

**Alternative if repo isn't on GitHub:** system cron on the Hostinger VPS that already runs n8n.

**Not recommended:** `/schedule` (remote Claude Code agent). Wrong tool for a multi-step Node pipeline with DB + 4 external APIs.

---

## Signal types (Sam ICP — first target)

| Signal | Source | Weight | Why it matters |
|---|---|---|---|
| **Hiring** active BD/SDR/AE role (last 0–8 weeks) | LinkedIn Jobs (SerpAPI), public Greenhouse / Lever / Workable boards, Indeed | 3 | Capacity gap right now |
| **Hiring** language confirms manual | Scrape job ad text for "manual prospecting", "list building", "research prospects" | 3 | They're literally telling us |
| **Recent rep hire** (last 60 days) | Apollo role-change | 2 | Ramping rep, MD wants pipeline fast |
| **Tech stack gap** (no Apollo/Clay/Outreach/Salesloft/Instantly/Cognism/Lusha) | Apollo `technologies` + targeted website scan | 3 | Confirms manual thesis |
| **Recent funding / growth** | Companies House (UK) — share issuance, director changes | 2 | Money to deploy on growth |
| **New Head of Sales / VP Sales / Head of BD** (last 6 months) | Apollo role-change | 2 | Under pressure to deliver pipeline |
| **Founder LinkedIn signal** | Recent post about scaling, hiring, pipeline (last 30 days) | 1 | Topic is live in their head |
| **Industry-priority match** | Specialist recruitment, Series A/B SaaS, IT/MSP, AI startups, MedTech | 2 | Validated DFY-fit verticals |
| **Companies House growth** | Filed accounts showing >30% revenue + headcount growth | 1 | Scaling, infrastructure stress |
| **Press mention / award** | SerpAPI news search | 1 | Confidence + cash |

**Stack threshold:** ≥6 priority (CSV-shipped to Cyprian), 4–5 standard (held for next week — recheck if more signals stack), <4 archived.

**Timing windows:**
- Hiring active: 0–8 weeks
- Recent hire: within 60 days
- Funding: 30–180 days post-close
- New Head of Sales / VP Sales / Head of BD: 30–180 days in role
- Founder LinkedIn signal: within 30 days

Outside these = held in Supabase, picked up automatically when timing rolls in.

---

## Architecture

```
                     ┌─────────────────────────────────────────────┐
                     │   WEEKLY TRIGGER (Mon 7am UTC)              │
                     │   GitHub Actions cron                        │
                     │   (or manual via workflow_dispatch)          │
                     └────────────────────┬────────────────────────┘
                                          │
        ┌───────────────────────┬─────────┴─────────┬───────────────────────┐
        │                       │                   │                       │
   ┌────▼──────────┐  ┌─────────▼────────┐  ┌──────▼────────┐  ┌──────────▼──────────┐
   │ Hiring        │  │ Recent-hire +    │  │ Companies     │  │ Founder LinkedIn /  │
   │ scrapers      │  │ leadership-      │  │ House (UK     │  │ news / press        │
   │ (LinkedIn,    │  │ change scrapers  │  │ funding +     │  │ scraper             │
   │ ATS, Indeed)  │  │ (Apollo)         │  │ growth)       │  │                     │
   └────┬──────────┘  └─────────┬────────┘  └──────┬────────┘  └──────────┬──────────┘
        │                       │                  │                       │
        └───────────────────────┴──────┬───────────┴───────────────────────┘
                                       │
                          ┌────────────▼────────────┐
                          │ Resolver: dedupe to     │
                          │ dfy_companies + record  │
                          │ each signal in          │
                          │ dfy_signals             │
                          └────────────┬────────────┘
                                       │
                          ┌────────────▼────────────┐
                          │ Manual-thesis confirmer │
                          │ - Apollo technologies   │
                          │ - job-ad text scan      │
                          │ - website scan          │
                          │ → tech_confidence       │
                          └────────────┬────────────┘
                                       │
                          ┌────────────▼────────────┐
                          │ Stack scorer            │
                          │ Sum signals × weights   │
                          │ ≥6 = priority           │
                          └────────────┬────────────┘
                                       │
                          ┌────────────▼────────────┐
                          │ Hyper-research          │
                          │ Perplexity deep-dive    │
                          │ → 3 personalisation     │
                          │   hooks                 │
                          │ → BD-floor empathy line │
                          │ → recommended angle     │
                          └────────────┬────────────┘
                                       │
                          ┌────────────▼────────────┐
                          │ CSV export              │
                          │ Companies + signals +   │
                          │ research + target       │
                          │ titles + tech_confidence│
                          │ (NO contact info)       │
                          │ Upload → Google Drive   │
                          └────────────┬────────────┘
                                       │
                          ┌────────────▼────────────┐
                          │ Create Notion task in   │
                          │ Cyprian's Task Board    │
                          │ (one per ISO week,      │
                          │  idempotent)            │
                          └─────────────────────────┘
                                       │
                                       ▼
                          ┌─────────────────────────┐
                          │ Cyprian — manual        │
                          │ Clay waterfall:         │
                          │ - Apollo people         │
                          │ - email waterfall       │
                          │ - BuiltWith if low conf │
                          │ /campaign-builder       │
                          │ /campaign-push          │
                          │ Mark task Done          │
                          └─────────────────────────┘
```

---

## CSV deliverable shape

One row per company. Columns:

| Group | Columns |
|---|---|
| Company | `company_name`, `domain`, `industry`, `employee_count`, `country`, `linkedin_url` |
| Signals | `stack_score`, `signal_summary`, `signal_count` |
| Manual proof | `tech_stack_present`, `tech_stack_gap_confirmed`, `tech_confidence` (high/medium/low), `manual_language_quote` |
| Research | `personalisation_hook_1`, `personalisation_hook_2`, `personalisation_hook_3`, `bd_floor_empathy_line`, `recommended_angle` |
| Targeting | `target_titles` (e.g. `MD,CEO,Founder,Head of Sales,Head of BD,VP Sales`) |
| Source | `source_signal_url`, `detected_at` |

**No contact info in our CSV.** Cyprian enriches contacts in Clay via waterfall. Cyprian feeds the Clay-enriched output into `/campaign-builder`.

---

## Notion task spec (one per ISO week)

Reuses the existing internal-brief push pattern via `Automation/internal-brief/push-to-notion.js`.

- **Title:** `DFY Engine — Week of YYYY-MM-DD ({n} priority leads)`
- **Status:** To Do
- **Client:** SBS
- **Due:** Friday of the same week
- **Brief body:** one-line summary, signal breakdown, industry breakdown, `tech_confidence` distribution, link to CSV in Drive, reminder of Cyprian's workflow
- **Idempotency:** if a task already exists for the current ISO week, the script appends to its body and updates the lead count rather than creating a duplicate
- **Failure path:** if any pipeline step throws, write a `DFY Engine — Week of X — FAILED` task with error summary

Cyprian's Notion dashboard: https://www.notion.so/Cyprian-SBS-Dashboard-342169e497cc80a78b24d72584c77f6c
Task Board DB ID: `342169e4-97cc-8163-9c20-f4f71a715aea`

---

## File plan

**New folder:** `sbs-pipeline/src/scrapers/dfy/`

| File | Purpose |
|---|---|
| `index.js` | CLI orchestrator (`weekly`, `dry-run`, `deliver`) |
| `region-config.js` | Same pattern as Rebecca — table mapping abstraction |
| `scrapers/hiring-linkedin.js` | LinkedIn jobs via SerpAPI |
| `scrapers/hiring-ats.js` | Public Greenhouse / Lever / Workable boards |
| `scrapers/hiring-indeed.js` | SerpAPI Indeed scrape |
| `scrapers/recent-hires.js` | Apollo role changes |
| `scrapers/funding.js` | Companies House (UK) — share issuance + director changes |
| `scrapers/leadership-changes.js` | New Head of Sales / VP Sales / Head of BD via Apollo |
| `scrapers/founder-signals.js` | Founder LinkedIn posts |
| `scrapers/companies-house-growth.js` | Filed accounts showing growth |
| `enrich/manual-confirmer.js` | Apollo `technologies` + job-ad scan + website scan → `tech_confidence` |
| `enrich/stack-scorer.js` | Stack score + threshold filter |
| `enrich/research.js` | Perplexity deep-dive — hooks + BD-floor empathy line |
| `deliver/export-csv.js` | Build CSV in spec shape |
| `deliver/upload-drive.js` | Upload to Google Drive folder, return shareable link |
| `deliver/notion-task.js` | Create / update weekly Notion task (incl. failure path) |

**New service wrappers** (`sbs-pipeline/src/services/`):
- `apollo.js` (new) — Apollo company enrichment + role-change endpoints (NOT people search)
- `linkedin-jobs.js` (new) — SerpAPI LinkedIn jobs
- `google-drive.js` (new) — file upload + shareable link
- `notion.js` (new) — task create/update

**Reused** (do not rebuild):
- `src/services/perplexity.js`, `claude.js`, `supabase.js`, `companies-house.js`, `jina.js`
- `src/utils/rate-limiter.js`, `retry.js`
- `src/config.js`
- Notion task pattern from existing internal-brief push script
- Google Drive pattern from `Automation/share-doc/share.js`

**Not used in this pipeline:** FindyMail (Cyprian uses it via Clay waterfall).

**New Supabase schema:** `sbs-pipeline/schema/dfy-schema.sql`
- `dfy_companies` (id, domain, name, industry, employee_count, country, linkedin_url, tech_stack JSONB, tech_confidence text, manual_confirmed bool, stack_score int, last_scored_at, icp_target text DEFAULT 'sam')
- `dfy_signals` (id, company_id, signal_type, signal_data JSONB, source_url, detected_at, expires_at)
- `dfy_weekly_deliveries` (id, iso_week, csv_drive_url, notion_task_id, lead_count, signal_breakdown JSONB, delivered_at, status)
- `dfy_scraper_runs` (same shape as `nz_scraper_runs`)

> `icp_target` column lets us add Ryan / future ICPs later without schema changes.

**No contacts table** — contacts live in Clay tables on Cyprian's side, not in our DB.

**New scheduler:** `.github/workflows/dfy-weekly.yml`
- Cron `0 7 * * 1`
- `workflow_dispatch` enabled (manual run from UI)
- Failure path: writes failure Notion task + email-on-failure

**Hypothesis doc:** `Business Docs/Offers & Master Doc/ICP-Hypothesis-Outbound-Engine-Sales-Teams.md` updated in Phase 0

**SOP for Cyprian:** drafted via `/sop-creator` after engine is live, saved to `SBS Campaign Skills/SOPs/Cyprian/dfy-engine-weekly.md`

---

## Phases

### Phase 0 — Hypothesis deepening (3 days, before any code)
1. 30-min interview with BD friend → notes saved to `SBS Campaign Skills/DFY Engine/research/bd-friend-interview-{date}.md` (template at `bd-friend-interview-template.md`)
2. Desk research on 12 confirmed Sam companies → `SBS Campaign Skills/DFY Engine/research/sam-pattern-matrix.md` (template at `sam-pattern-matrix-template.md`)
3. Update `Business Docs/Offers & Master Doc/ICP-Hypothesis-Outbound-Engine-Sales-Teams.md` with evidence-backed sections + the angles that come out of it

**Gate:** Josh signs off on the deepened hypothesis before Phase 1.

### Phase 1 — Schema + scaffold (1 day)
1. Write `dfy-schema.sql`, run in Supabase
2. Set up `sbs-pipeline/src/scrapers/dfy/index.js` skeleton with CLI shape
3. Write `region-config.js` with `dfy` region (and `icp_target` discriminator)
4. Smoke test

### Phase 2 — Signal harvest layer (3–5 days)
1. `hiring-linkedin.js` (validate against the 12 known companies)
2. `hiring-ats.js` (public Greenhouse/Lever/Workable boards)
3. `hiring-indeed.js`
4. `recent-hires.js`, `leadership-changes.js` (Apollo role-change)
5. `funding.js` + `companies-house-growth.js`
6. `founder-signals.js`
7. Resolver in `index.js`

**Gate:** dry-run produces ≥30 unique companies with ≥1 signal each.

### Phase 3 — Manual confirmer + stack scorer (2 days)
1. `apollo.js` service wrapper (company enrichment, technologies, role-change)
2. Job-ad text scan + website scan in `manual-confirmer.js` → emit `tech_confidence`
3. `stack-scorer.js` — sum weights, write `stack_score` back

**Gate:** of the 12 known Sam companies, ≥10 score 6+. Of 5 deliberate non-fits, ≤1 scores 6+. `tech_confidence` distribution looks sensible.

### Phase 4 — Research (2 days)
1. `research.js` — Perplexity deep-dive per priority company. Output 3 hooks + BD-floor empathy line + recommended angle into `dfy_signals.signal_data`

**Gate:** sampling 10 priority leads, all have research that an SBS reviewer says is "specific enough to drive a personalised email."

### Phase 5 — Delivery (2 days)
1. `export-csv.js` — CSV in spec shape
2. `upload-drive.js` — Google Drive folder + shareable link
3. `notion-task.js` — create/update weekly task in Cyprian's Task Board (idempotent on ISO week, failure path)

**Gate:** dry-run end-to-end produces a valid CSV in Drive + a Notion task in Cyprian's board with everything filled in.

### Phase 6 — Schedule + Cyprian handoff (2 days)
1. `.github/workflows/dfy-weekly.yml` cron + `workflow_dispatch`
2. Repo secrets configured
3. Cyprian added as repo collaborator (write access)
4. Cyprian onboarded to SBS Telegram bot (scoped: setter escalations + failure alerts + weekly heads-up ping)
5. Pipeline emits weekly Telegram heads-up after Notion task is created
6. SOP written via `/sop-creator`
7. Loom walkthrough recorded for Cyprian

**Gate:** Cyprian runs one week end-to-end with Josh observing only. Then a second week solo.

### Phase 7 — Friday scorecard (after 4 weeks of data)
- Conversion-by-signal-type rollup → Notion every Friday
- Drives signal weighting changes + scraper retirement / addition

---

## Verification

```bash
# Dry run, no Notion / Drive write, full local report
cd sbs-pipeline
npm run dfy:dry-run

# Inspect Supabase: dfy_companies, dfy_signals, dfy_weekly_deliveries

# Full deliver run (writes Notion task + CSV to Drive)
npm run dfy:weekly

# Verify in Cyprian's Notion dashboard:
# - weekly task created
# - CSV link works
# - brief body populated
# - failure path: simulate by killing Apollo creds → expect FAILED task in his board
```

**Quality bar before Cyprian takes over:**
1. ≥30 priority leads/week (≥6 score) sustained across 2 dry-runs
2. CSV opens cleanly in Sheets / Excel and feeds `/campaign-builder` without column-mapping errors after Clay enrichment
3. Notion task creates idempotently per ISO week
4. Failure path tested: at least one simulated failure writes a FAILED task
5. Cyprian completes a full Clay waterfall + copy + push from a real CSV without Josh
6. SOP written + Loom recorded

---

## Out of scope (deliberately deferred)

- People + email enrichment in our pipeline — Cyprian does this in Clay via waterfall
- FindyMail in our pipeline — used by Cyprian via Clay
- BuiltWith API — used by Cyprian via Clay only on `tech_confidence: low` rows
- Clay-Claude-Code skill (datagen.dev pattern) — not needed; clean handoff via CSV
- Cross-sell angle copy (knowledge bases, Claude Code rollouts) — captured in research notes but not used in Email 1
- US/EU regional expansion — schema supports it via `icp_target`, but Phase 1 ships UK-only
- Reply handler integration — existing AI setter handles replies
- Friday scorecard (Phase 7) — only build after 4 weeks of data
- Telegram lead delivery — replaced by Notion task; Telegram only for alerts/heads-ups

---

## Why "DFY Engine" not "Sam Engine"

Sam is the first ICP target, but the architecture (signal-first, stack-or-skip, Cyprian handoff) serves all DFY prospecting. Adding Ryan or other future ICPs later means swapping the signal scrapers + scoring weights; the engine, schema, and delivery shape stay constant. The `icp_target` column on `dfy_companies` is the discriminator.

---

## Post-approval follow-ups

- [x] Save Cyprian's Notion dashboard URL to memory (`key-ids.md`)
- [ ] Confirm the repo is on GitHub (or push to a new private remote) for the Actions cron
- [ ] Confirm Apollo + Perplexity rate limits + monthly credit budget vs expected weekly volume
- [ ] Provision a `.env.dev` for Cyprian with limited / scoped API keys for local debug

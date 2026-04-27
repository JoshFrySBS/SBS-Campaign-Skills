# Claude Code Pipeline — Plan

**Status:** Approved. Building week of 27 April 2026.
**Goal:** Cut Clay AI spend dramatically by gating expensive research behind a cheap pre-qualification step run via Claude Code webhook.
**Owner:** Josh + Cyprian
**Replaces:** Currently spends Clay AI credits running deep company research on every lead in a list, including the 60-80% that turn out to not be a fit. New pipeline filters first, researches deep only on the survivors.

---

## Why this exists

We currently pay Clay's marked-up AI credits to research every lead in a sourced list just to find out which ones are ICP-fit. Most aren't. The deep research credits spent on bad-fit leads are wasted.

The fix: insert a cheap pre-qualification step that runs against the website + basic firmographics, before any deep research happens. The pre-qual step runs outside Clay (via webhook to Anthropic API direct) so we pay flat token cost, not Clay's marked-up AI credits. Only leads that pass pre-qual get the expensive deep research treatment.

Estimated cost reduction for a 5,000-lead Sam ICP run: roughly £2,000-5,000 → £250-400 total spend on the AI layer.

---

## Architecture

```
Phase 0 — SOURCE                                              [Clay]
  Pull raw leads (company name, website, basic firmo)

Phase 1 — LIGHT ICP SCORING (PRE-QUALIFICATION)   [Claude Code via webhook]
  Clay HTTP API column → n8n webhook → Anthropic API (Sonnet 4.6)
  Action: WebFetch homepage + about + team page; assess ICP fit
  Returns: structured JSON with verdict, score, detailed research, sub-type
  Filter: PROCEED leads continue, BORDERLINE held for review, DROP discarded

Phase 2 — LINKEDIN ENRICHMENT                                 [Clay]
  Auto-fill LinkedIn data on PROCEED leads only

Phase 3 — DEEP RESEARCH + INTENT                  [Claude Code via webhook]
  Webhook to Anthropic API (Sonnet 4.6 or Opus 4.7)
  Uses Phase 1 research as starting context, adds LinkedIn + intent signals
  Replaces existing sam-01

Phase 4 — DECISION MAKER + EMAIL WATERFALL                    [Clay]
  Find right contact, run email finder waterfall

Phase 5 — COPY GENERATION                          [Claude Code via webhook]
  Webhook with research dossier + sender voice docs
  Self-scores against 8-criterion rubric, rewrites if avg < 7.5
  Replaces existing sam-03

Phase 6 — PUSH TO INSTANTLY                                   [Clay]
```

**What stays in Clay:** sourcing, LinkedIn scraping (selectively), email waterfall, table view, Instantly push. Cyprian works in Clay as normal.

**What moves out:** the AI reasoning layer (Phases 1, 3, 5). All called via webhook. Cyprian doesn't need to touch this — it's invisible to him, just appears as new Clay columns.

---

## Phase 1 Specification (this is what we're building first)

### Goal
From website-only data, decide if a company looks like a Sam ICP fit worth investing deep research credits in.

### Inputs from Clay
```json
{
  "company_name": "string",
  "website_url": "string",
  "basic_firmo": {
    "industry": "string (Clay's tag)",
    "country": "string",
    "estimated_employees": "string (if available)"
  }
}
```

### Hard disqualifiers (immediate DROP)
- B2C only (consumer, retail, restaurant, e-commerce)
- 1-3 person agency / freelancer / portfolio site
- 1,000+ employees (enterprise — wrong sales motion)
- Direct competitor (lead gen agency, outbound agency, sales consultancy)
- Already sophisticated (positions itself as automating outbound)
- Defunct / stale (no activity in 2+ years, broken site)
- Wrong industry shape (VC, holding co, religious, non-profit, no outbound motion)

### Required positive signals (need most)
- **Industry fit:** specialist recruitment/staffing, technical consulting, engineering services, B2B SaaS (early-mid), AI/tech startups, managed services / MSP, IT services, manufacturing with B2B sales, commercial trades contractors
- **B2B positioning:** sells to companies, not consumers
- **Sales team presence:** team page shows BD/AE/sales roles, OR careers shows sales hires, OR consultative-sale CTAs ("book a call", "speak to our team")
- **Right size band:** ~10-80 employees (inferred from team page count, "team of X" language, office locations, client logo density)
- **Deal size signals:** services imply £10k+ contracts (custom proposals, multi-month engagements, no public consumer pricing)

### Sub-type classification (for Phase 5 personalisation)
- **growth_stage:** founded post-2020, modern brand, SaaS/tech/AI positioning, less established sales infra
- **old_school:** founded pre-2010, traditional brand, manufacturer/services, has process but not modern

### Output JSON Schema
```json
{
  "verdict": "PROCEED | BORDERLINE | DROP",
  "score": "number 1-10",
  "drop_reason": "string or null",
  "industry_fit": {
    "category": "string (matched ICP industry bucket)",
    "confidence": "number 1-10"
  },
  "size_estimate": {
    "band": "1-9 | 10-50 | 50-100 | 100-500 | 500-1000 | 1000+",
    "evidence": "string"
  },
  "sales_motion": {
    "has_sales_team": "boolean",
    "evidence": "string",
    "outbound_visible": "boolean"
  },
  "sub_type": "growth_stage | old_school | unclear",
  "deal_size_estimate": "string",
  "detailed_research": {
    "what_they_do": "string (2-3 sentences)",
    "who_they_serve": "string (1-2 sentences)",
    "positioning_summary": "string (1-2 sentences)",
    "tech_stack_visible": "string or null",
    "recent_signals": "string or null (anything notable from homepage/blog)"
  },
  "fit_rationale": "string (3-4 sentences explaining the verdict)"
}
```

**Note on signals:** Phase 1 returns rich detailed_research but doesn't try to hunt intent signals (hiring activity, tech stack confirmation, capacity ceiling tells). That work belongs in Phase 3 where we have LinkedIn data and have already paid the qualification cost. Phase 1 just gives a clean fit verdict + readable research dossier.

### Model choice
- **Haiku 4.5 — default.** Phase 1 is structured classification with a clear rubric. Haiku handles this well, runs faster, and costs roughly 3x less than Sonnet. ~$0.01-0.03 per lead with prompt caching. For 5,000 leads: ~$50-150 total.
- **Sonnet 4.6 — fallback for borderline review.** If accuracy on a 50-lead validation set falls below 90%, escalate borderline cases (verdict=BORDERLINE) to a second Sonnet pass. Keeps the bulk-cheap economics while not losing edge cases.
- **Speed unlock from Haiku:** per-row latency drops from ~15-30s (Sonnet) to ~5-15s (Haiku). 1,000-lead runs land in ~10-20 min instead of 30-60.

---

## Tech Stack

**Webhook receiver:** n8n self-hosted (existing instance at https://n8n.srv1098734.hstgr.cloud)

**AI call:** Anthropic API direct (not through Claude Code subscription)

**Why not DataGen / Agent SDK / actual Claude Code CLI:** The Phase 1 task is bounded enough that stuffing the SBS Sam ICP definition + scoring rubric into the system prompt and calling Anthropic API directly is sufficient. Prompt caching makes the static system prompt cheap on repeat calls. No filesystem access or autonomous tool use needed.

**Prompt caching:** ICP definition + scoring rubric (~3-5k tokens) cached on Anthropic side. After first call, that portion costs 10% of normal input rate.

**Structured output:** Use Anthropic's tool-use pattern to force valid JSON return. Define a single tool matching the output schema, force the model to call it. Guarantees parseable JSON every time, no string-parsing failures.

---

## Performance & Cost (1,000 lead run)

### Latency per row (Haiku 4.5 default)
- 2-3 WebFetches (homepage + about + team): ~3-8 seconds
- Haiku 4.5 reasoning + structured output: ~3-7 seconds
- Total per row: ~5-15 seconds

### Total time for 1,000 leads
Depends on Clay's HTTP API column concurrency (configurable):
- Sequential (1 at a time): ~2-4 hours
- 10 parallel: ~10-20 minutes
- 25 parallel: ~5-10 minutes
- 50 parallel: ~3-8 minutes (limited by Anthropic API rate limits)

Anthropic API rate limits — **confirmed on Tier 2+**, so not a meaningful constraint:
- Tier 2: 1,000 RPM, 100k tokens/min — comfortable for 25-50 parallel
- Higher tiers: not a constraint at all
- Phase 1 batches will run at whatever concurrency Clay's HTTP column allows

Practical expectation: **10-20 minutes for 1,000 leads** with reasonable parallelism. 5,000 leads runs in under an hour.

### Cost per row (Haiku 4.5)
- Input: ~10-15k tokens (page content + cached system prompt)
- Cached portion: ~3-5k tokens at 10% of normal rate
- Output: ~500-1,000 tokens (JSON)
- Haiku 4.5 pricing: ~$0.01-0.03 per row

### Total cost
- 1,000 leads at Phase 1: ~$10-30
- 5,000 leads at Phase 1: ~$50-150
- Compare to current Clay AI spend: estimated 10-20x reduction for the same gating outcome

---

## Validation — Use the Claygentic System

**No eyeballing. No parallel validation rig.** We use the existing Claygentic system (`claygentic/` + `.claude/skills/claygentic/`) to test the Phase 1 prompt before it ever touches a real campaign. Claygentic already automates the full loop: send prompt to test Clay table → run on test domains → results to Supabase → Claude scores against 7-criterion rubric → iterate until 8.0+. We don't build new validation infrastructure — we use what's already proven and used for every other Clay prompt at SBS.

### Why this is the right path

Claygentic is the SBS standard for any prompt going into production. Phase 1 is no different. The prompt logic is identical whether it runs inside Clay's Claygent (for testing via Claygentic) or via webhook in n8n (for production). If it scores 8.0+ in Claygentic, we have high confidence it works in n8n with the same prompt and same Haiku 4.5 model.

### Validation workflow

```
1. WRITE PROMPT (in Claygentic 5-part format)
   - Save prompt.txt + schema.json to claygentic/prompts/phase-1-icp-qualifier/
   - Follow the structure mandated by the claygentic skill:
     Part 1 Role, Part 2 Objective, Part 3 Method, Part 4 Output, Part 5 Edge Cases
   - Schema = exactly the JSON output schema we want in production

2. RUN CLAYGENTIC ON IT
   - Invoke /claygentic skill in Claude Code
   - Skill generates 10 test domains (mix of clear fit, clear non-fit, borderline)
   - Sends prompt + test rows to Clay test table via CLAY_WEBHOOK_URL
   - Clay's Claygent runs the prompt against each domain
   - Results land in Supabase claygentic_results table

3. AUTOMATIC SCORING
   - Claygentic's 7-criterion rubric scores each result
   - Overall average + per-criterion breakdown
   - Failure modes flagged with diagnoses

4. ITERATE
   - Skill rewrites prompt sections based on failure analysis
   - Re-run on same test domains
   - Continue until 8.0+ overall

5. PROMOTE TO PRODUCTION
   - Approved prompt.txt + schema.json copied into the n8n webhook system prompt
   - Production run uses same Haiku 4.5, same prompt, same schema
   - Claygentic score becomes the proxy for production reliability
```

### Why this matters for unit economics

The whole point of this pipeline is to save money by gating expensive deep research behind cheap pre-qualification. If Phase 1 is wrong:
- **False negatives** (missed fits): we leave revenue on the table
- **False positives** (bad fits passed through): we waste deep research credits anyway, defeating the whole purpose

Claygentic gives a measured score before we ship anything. We never ship a prompt below 8.0.

### Validation goals
1. Claygentic overall score: 8.0+ (mandatory before promotion to production)
2. No individual criterion below 7.0
3. PROCEED rate on test domains matches expected Sam ICP density (10-25%)
4. After promotion: 500-lead live test in Clay, latency under 15s p95, cost under $30 per 1,000 leads

### Risks
- **Claygentic test environment vs production environment:** Claygentic tests through Clay's native Claygent (Haiku 4.5 supported). Production runs through n8n + Anthropic API direct (also Haiku 4.5). Same model + same prompt should behave near-identically, but worth a 50-lead spot check after promotion to confirm.
- **Website variability:** JS-heavy or auth-walled sites reduce fetch quality. Add fallback: if fetch fails, return verdict=BORDERLINE with reason="insufficient website data".
- **Clay HTTP column behaviour:** Need to confirm Clay handles 5-15s webhook responses synchronously without timing out. May need async pattern (Clay POST → webhook returns 202 + job ID → n8n callback updates Clay row).

---

## Open Questions

- [x] Anthropic API tier — confirmed Tier 2+, not a constraint
- [ ] Confirm Clay HTTP API column timeout behaviour on 5-15s responses
- [ ] Decide whether BORDERLINE verdicts go to Cyprian for manual review or auto-drop
- [ ] Decide where Phase 1 research output gets stored long-term (just in Clay row, or also archived in Supabase for later analysis?)
- [ ] Decide cadence for Phase 1 prompt updates as ICP definition evolves
- [ ] Decide who owns building the ground truth validation set (Josh solo, Cyprian solo, or together)

---

## Build Order (week of 27 April 2026)

### Phase 1 (this week)
1. Verify Clay HTTP column timeout behaviour (15 min test)
2. Draft Phase 1 prompt in Claygentic 5-part format → save `prompt.txt` + `schema.json` to `claygentic/prompts/phase-1-icp-qualifier/`
3. Run `/claygentic` to test the prompt — generates 10 test domains, sends to Clay test table, scores via 7-criterion rubric in Supabase
4. Iterate prompt until Claygentic overall score 8.0+ and no criterion below 7.0
5. Copy approved prompt + schema into n8n webhook system prompt (production)
6. Build n8n workflow: webhook → 3x WebFetch → Anthropic API (Haiku 4.5) → response → save to `Automation/n8n-workflows/`
7. 500-lead live test on real Sam ICP source list in Clay
8. If economics confirmed, switch on for next campaign

### Phase 5 (next, after Phase 1 proven)
Copy generation webhook. Replaces sam-03. Use existing Clay deep research as input initially (Phase 3 not yet built).

### Phase 3 (last)
Deep research webhook. Replaces sam-01. Closes the loop — Clay AI credits no longer touched for reasoning.

Each phase delivers value standalone. Ship in order.

---

## Reference Documents

- Existing pipeline: `SBS Campaign Skills/PIPELINE.md`
- Sam ICP hypothesis: `SBS Campaign Skills/strategy/ICP-Hypothesis-Outbound-Engine-Sales-Teams.md`
- Existing sam-01 prompt: `SBS Campaign Skills/prompts/sam/sam-01-company-research-plus-intent/`
- Copy quality rubric (used by Phase 5): `.claude/rules/copy-quality-rubric.md`
- Personalisation rules (used by Phase 5): `.claude/rules/personalisation.md`
- Tech stack details: `CLAUDE.md` (n8n, Anthropic API, Supabase)
- Original architecture conversation: this doc captures it

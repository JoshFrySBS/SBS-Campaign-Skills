# SBS Campaign Skills — Internal Pipeline

Internal prompts for Josh and Cyprian. Two ICP pipelines available depending on the campaign target.

## Folder Structure

```
prompts/
├── course/    ← Course ICP prompts (solo founders buying the course)
└── sam/       ← Sam ICP prompts (SMBs with sales teams buying DFY)
```

---

## Sam ICP Pipeline (SMBs with Sales Teams — DFY)

The primary pipeline for Q2-Q3 2026. Targets companies with 10-80 employees and sales teams doing outbound manually. Two steps.

```
Source companies → [sam-01] Company Research + Intent → [sam-02] ICP Fit Score → FILTER 50+
  → [sam-03] Copy Writer → Find Email → Instantly
```

| # | Prompt | Column Type | AI Model | Credits | Input |
|---|--------|-------------|----------|---------|-------|
| sam-01 | Company Research + Intent | Claygent | 4.1 or Sonnet (BYOK) | 3-5 | /Domain, /Company LinkedIn URL |
| sam-02 | ICP Fit Score | Use AI | 4.1 or Sonnet (BYOK) | 0 | /Company Research |
| sam-03 | Copy Writer | Use AI | Sonnet (BYOK) | 0 | /Company Research, /ICP Score, /Company Name, /First Name, /Title |

### Model Choice
- **4.1 for volume:** ~$0.02/lead. Good accuracy on company profiles and qualifying signals. Use for broad prospecting runs of 500+ companies.
- **Sonnet for depth:** ~$0.21/lead. Much richer intent signals, why_now narratives, and specific pain evidence. Use for targeted lists or when you need the copy writer to have strong input data.

### Qualifying Filters
After sam-02, filter on:
- `fit_tier` = "Priority" or "Prospect"
- `outbound_sophistication` = "none" or "basic" (skip "moderate" and "advanced")
- `has_sales_team` = true

### ICP Reference
Full ICP hypothesis doc: `strategy/ICP-Hypothesis-Outbound-Engine-Sales-Teams.md`

---

## Course ICP Pipeline (Solo Founders — Course or DFY)

The original pipeline for selling the Modern Founder course and DFY builds to solo founders and consultants.

### Company Pipeline (source companies)

```
Source companies → Valid URL → [course-01] Company & Founder Research → [course-02] ICP Fit Score → FILTER 50+
  → [course-03] Intent & Angle Research → Find Email → Export → Campaign Builder
```

| # | Prompt | Column Type | AI Model | Credits | Input |
|---|--------|-------------|----------|---------|-------|
| course-01 | Company & Founder Research | Claygent | Argon | 3 | /Domain, /Company LinkedIn URL |
| course-02 | ICP Fit Score | Use AI | Sonnet (BYOK) | 0 | /Company & Founder Research |
| course-03 | Intent & Angle Research | Claygent | Argon | 3 | /Domain, /Company LinkedIn URL, /Founder LinkedIn URL |

### People Pipeline (source people)

```
Source people → Valid URL → [course-01b] Company Research (People Search) → [course-02] ICP Fit Score → FILTER 50+
  → [course-03b] Intent & Angle Research (People Search) → Find Email → Export → Campaign Builder
```

| # | Prompt | Column Type | AI Model | Credits | Input |
|---|--------|-------------|----------|---------|-------|
| course-01b | Company Research (People Search) | Claygent | Argon | 3 | /Domain, /Person LinkedIn URL |
| course-02 | ICP Fit Score | Use AI | Sonnet (BYOK) | 0 | /Company Research |
| course-03b | Intent & Angle Research (People Search) | Claygent | Argon | 3 | /Domain, /Person LinkedIn URL, /Company Research |

### Alternative Pipeline Options

These prompts can be mixed depending on what you need:

- **course-01c (Company Research, No Decision Maker):** Use when you only need company data and will find the decision maker separately (Apollo, Clay Find People, manual).
- **course-01d (Company Research + Intent):** Merged research and intent in one pass. Use when you want to skip the separate intent step. Works for both company and people search since it does not require a founder LinkedIn URL.

---

## Native Enrichments (between prompts)

These use Clay's built-in enrichments, no custom prompt needed:

- **Valid URL Check** — before any research prompt. Free.
- **Find Email** — after filtering. Your own API key, 0 Clay credits.
- **Find Decision Maker** — can use Clay Find People, Apollo, or other enrichment tools. Use when running course-01c or course-01d which skip founder finding. Will expand this section as new methods are tested.

---

## Credit Gating

The ICP Fit Score is the gatekeeper in all pipelines. Only leads scoring 50+ proceed to expensive downstream steps.

---

## Setup

Each prompt folder contains:
- `prompt.txt` — paste into Clay column **prompt field**
- `schema.json` — paste into Clay column **output schema field**

**CRITICAL:** prompt.txt and schema.json go into TWO DIFFERENT Clay fields. Never combine them. Clay fails with "unable to parse output schema" if JSON schema notation appears in the prompt text.
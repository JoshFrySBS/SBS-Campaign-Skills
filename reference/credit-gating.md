# Credit Gating — How the Pipeline Saves You Money

The Clay pipeline uses a scoring filter to make sure you never waste credits on companies that are not a good fit.

---

## How It Works

There are two pipelines depending on how you source leads. Both use the same credit gating logic.

### Company Pipeline (01, 02, 03)

```
Source companies (from Clay Company Search, LinkedIn, Apollo, etc.)
    ↓
[01] Company & Founder Research (3 credits/row) — profiles company + finds decision maker
    ↓
[02] ICP Fit Score (0 credits, BYOK) — scores how well they match your ICP
    ↓
★ FILTER: fit_score below 50 → STOP HERE
    ↓
[03] Intent & Angle Research (3 credits/row) — researches angles, personalisation hooks, intent
    ↓
Find Email (0 Clay credits, own API key) → Export → Campaign Builder
```

### People Pipeline (01b, 02, 03b)

```
Source people (from Clay People Search — you already have the person's LinkedIn)
    ↓
[01b] Company Research (3 credits/row) — profiles company + verifies known contact
    ↓
[02] ICP Fit Score (0 credits, BYOK) — same scoring prompt as company pipeline
    ↓
★ FILTER: fit_score below 50 → STOP HERE
    ↓
[03b] Intent & Angle Research (3 credits/row) — same output, takes person LinkedIn directly
    ↓
Find Email (0 Clay credits, own API key) → Export → Campaign Builder
```

The key insight is the same for both: **bad fits get filtered out before the expensive research steps**.

---

## The Numbers

For every 1,000 leads you source (same for both pipelines):

| Step | Leads | Credits/lead | Total credits |
|------|-------|-------------|---------------|
| Company Research (01 or 01b) | 1,000 | 3 | 3,000 |
| ICP Fit Score (02) | 1,000 | 0 (BYOK) | 0 |
| **Filter: 50+ only** | **~600 pass** | — | — |
| Intent & Angle Research (03 or 03b) | 600 | 3 | 1,800 |
| Find Email | ~420 | 0 (own API) | 0 |

**With gating: ~4,800 credits per 1,000 leads** (4.8 credits/lead average)

**Without gating:** every lead gets every enrichment = ~6,000 credits per 1,000 leads

**Savings: ~20%** — and the savings increase as your ICP scoring gets more precise.

---

## The 50+ Filter

After ICP Fit Scoring, only leads with a **fit_score of 50 or above** proceed to the next steps.

| Tier | Score | What happens |
|------|-------|-------------|
| **Priority** | 70+ | Best fits. Get full intent and angle research. Hyper-personalised campaigns. |
| **Prospect** | 50-69 | Worth reaching out. Get full research. Lighter personalisation in campaigns. |
| **Pass** | Below 50 | Not a fit. Pipeline stops here. No credits wasted on research. |

---

## What You Get for the Credits

The intent & angle research step (3 credits/row) produces data that dramatically improves your campaign quality:

- **Recommended angle** — which approach to lead with for each person
- **Personalisation hooks** — 2-3 specific things to reference in the email
- **Offer positioning** — how to frame your offer for their specific situation
- **Intent score** — how likely they are to be receptive

Without this step, the campaign builder has to write generic emails using just company data. With it, every email can reference something specific about the person and lead with the right angle for their situation.

The ROI is in reply rates, not credit savings. Hyper-personalised emails at 3-5% reply rate are worth far more than generic emails at 1-2%.

---

## Why This Matters

Clay credits cost real money. Without gating, you are paying to research companies that will never buy from you.

With gating, your Clay budget goes further and every lead that makes it through gets the research that makes your emails actually land. The ICP Fit Score prompt is the gatekeeper — getting it right means better leads in your campaigns and lower Clay costs.

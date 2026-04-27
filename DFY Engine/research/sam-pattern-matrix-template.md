# Sam Pattern Matrix — Template

**Goal:** turn 12 confirmed Sam-fit companies into a pattern matrix that exposes what's actually true about this ICP. The output drives signal weighting + the copy library.

**Time per company:** ~20 minutes desk research. Total: ~4 hours.
**Save to:** `sam-pattern-matrix.md` in this folder.

**Source companies:** see `sam-companies-list.md` in this folder for the 12 to research. If gaps, pull from Cyprian's current week + Aeterna Power + warm leads.

---

## Per-company research — 20 minute checklist

For each company, capture data from these sources only (no guessing — flag gaps):

1. **LinkedIn company page** — size, industry, recent posts, employee growth chart, "people" tab
2. **LinkedIn employee search** — count of BD/SDR/AE titles, recent hires (last 12 months)
3. **Company website** — careers page, about page, footer (tech tracking pixels), services
4. **Open job ads** — Greenhouse / Lever / Workable / LinkedIn Jobs / their careers page
5. **Companies House (UK only)** — share issuance, director changes, filed accounts
6. **Founder/MD LinkedIn** — recent posts (last 90 days), tone, topics, hiring announcements
7. **Press / Google news** — last 12 months mentions

If a data point isn't findable in 20 minutes, mark `[gap]` and move on.

---

## Per-company entry format

```markdown
## {n}. {Company Name}

**URL:** {domain}
**LinkedIn:** {url}
**Industry:** {sector}
**Size:** {employee count from LinkedIn}
**Country:** {country}
**Revenue band:** {if findable, else [gap]}
**Researched by:** {name}, {date}

### Founder / leader background
- Founder: {name}, {title}, {LinkedIn url}
- Background: {delivery / sales / tech / consulting / other}
- Did they personally do sales before hiring? {yes/no/unclear}

### Hiring history (last 12 months — sales-relevant only)
- {Date}: {title} hired ({source: LinkedIn / press / job ad})
- {Date}: {title} hired
- ...
- BD/SDR/AE count today: {n}
- Sales ops / RevOps hire? {yes/no — if yes, when}

### Tech stack (visible)
- CRM: {if any}
- Outbound tooling: {Apollo / Clay / Outreach / Salesloft / Instantly / Lemlist / Cognism / Lusha / none visible}
- Other sales tech: {ContactOut / LinkedIn Sales Navigator / etc}
- Source of detection: {Apollo technologies / website footer pixel / job ad mentioning the tool / LinkedIn skill mentions}
- **Manual-thesis verdict:** {confirmed / likely / inconclusive / contradicted}

### Public statements about scaling
- Founder LinkedIn (last 90 days): {quote / topic / [no signals]}
- Press mentions: {quote / topic / [none]}
- Hiring announcements: {quote / topic / [none]}

### Visible pain markers
- Job ad language: {quote any "manual prospecting / list building / research prospects / wear lots of hats" lines}
- Other tells: {e.g. "BD function reports to the founder" / "sales team uses Sales Nav only"}

### Current outbound activity
- Did they send Josh an outbound email? {yes/no}
- Are they running cold outreach? {evidence: yes/no/unclear}
- LinkedIn outbound visible? {evidence}

### Why they (probably) haven't built it
{one paragraph hypothesis based on the data above. Common patterns to watch for: founder background isn't sales, no tech-savvy ops hire, recently hired reps so still in "trust the rep" phase, MD reads about AI but no internal builder}

### What angle would land best (prediction)
- Top angle: {hiring + manual / new VP + ramp / funded + capacity / etc}
- Why this angle: {one sentence}
- Email 1 hook seed: {one sentence — the specific thing we'd open with}

### Stack score prediction (using DFY Engine weighting)
- Hiring active: {y/n} (3pts)
- Hiring language manual: {y/n} (3pts)
- Recent rep hire: {y/n} (2pts)
- Tech stack gap: {y/n} (3pts)
- Recent funding/growth: {y/n} (2pts)
- New Head of Sales: {y/n} (2pts)
- Founder LinkedIn signal: {y/n} (1pt)
- Industry priority: {y/n} (2pts)
- Companies House growth: {y/n} (1pt)
- Press/award: {y/n} (1pt)
- **Predicted score: {n}/20** (≥6 = priority threshold)

### Sources
- LinkedIn company: {url}
- LinkedIn founder: {url}
- Careers page: {url}
- Job ads: {urls}
- Companies House (UK): {url}
- Press: {urls}
```

---

## After all 12 are done — pattern synthesis

Add a synthesis section at the bottom of `sam-pattern-matrix.md`:

```markdown
# Pattern Synthesis — 12 Confirmed Sam Companies

## Founder backgrounds (count)
- Delivery / consulting: {n}
- Sales / commercial: {n}
- Tech / product: {n}
- Other: {n}

## Hiring patterns
- Companies with BD/SDR hire in last 60 days: {n}
- Companies with new Head of Sales / VP Sales (last 6mo): {n}
- Companies with sales ops / RevOps hire: {n}
- Avg BD/SDR count: {n}

## Tech stack patterns
- Confirmed manual (no major outbound tooling): {n}
- Likely manual (sparse data): {n}
- Tooled (have Apollo/Clay/Outreach): {n}

## "Why unbuilt" patterns (most common reasons, ranked)
1. {pattern}: {n}/12
2. {pattern}: {n}/12
3. {pattern}: {n}/12

## Top-converting angles (predicted)
1. {angle}: would fit {n}/12
2. {angle}: would fit {n}/12
3. {angle}: would fit {n}/12

## Score distribution prediction
- ≥10 (very strong): {n}
- 6–9 (priority): {n}
- 4–5 (held): {n}
- <4 (archived): {n}

## Hypothesis updates needed in `ICP-Hypothesis-Outbound-Engine-Sales-Teams.md`
- {update 1 — with evidence count}
- {update 2}
- {update 3}

## Copy library angles to add
- {angle 1 — with quote / data}
- {angle 2}
- {angle 3}

## Signal weighting changes (if any)
- {signal X seems stronger than weighted — recommend bump from {n} to {n}}
- {signal Y seems weaker — recommend cut from {n} to {n}}
```

---

## Quality gate

Before moving to Phase 1:
- [ ] All 12 companies researched, no `[gap]` count above 20% per company
- [ ] Pattern synthesis written
- [ ] Hypothesis doc updated with at least 3 evidence-backed sections
- [ ] Copy library has at least 5 new angles seeded
- [ ] Josh signs off

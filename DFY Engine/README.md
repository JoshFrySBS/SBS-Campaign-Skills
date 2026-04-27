# DFY Engine

Weekly auto-running prospecting engine for DFY-fit companies. First ICP target: **Sam** (B2B companies, 10–80 staff, manual sales team).

## What this is

A signal-mining pipeline that surfaces 30–50 hot DFY-fit companies per week with stacked signals + manual-thesis confirmation + deep research. Output: a CSV in Cyprian's Notion task board. Cyprian enriches contacts in Clay (waterfall + BuiltWith), writes copy via skills, pushes to Instantly.

**Not the Rebecca pipeline.** Rebecca = event-based (AGM, results, raise) for NZX/ASX-listed companies. DFY Engine = operational-state signals (hiring, manual language, tech gap) for any B2B company in the ICP.

## Files in this folder

- [PLAN.md](PLAN.md) — full plan, architecture, phases, file plan
- [research/bd-friend-interview-template.md](research/bd-friend-interview-template.md) — Phase 0 interview template
- [research/sam-pattern-matrix-template.md](research/sam-pattern-matrix-template.md) — Phase 0 desk research template
- [research/sam-companies-list.md](research/sam-companies-list.md) — the 12 companies to research

## Where the code lives

- Pipeline: `sbs-pipeline/src/scrapers/dfy/`
- Schema: `sbs-pipeline/schema/dfy-schema.sql`
- Scheduler: `.github/workflows/dfy-weekly.yml`

## Where Cyprian works

- Weekly tasks land in his Notion Task Board: https://www.notion.so/Cyprian-SBS-Dashboard-342169e497cc80a78b24d72584c77f6c
- Each task title: `DFY Engine — Week of YYYY-MM-DD`
- He follows the SOP at `SBS Campaign Skills/SOPs/Cyprian/dfy-engine-weekly.md` (built in Phase 6)

## Status

Phase 0 — hypothesis deepening. See PLAN.md for current phase + gates.

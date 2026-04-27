# Skills Sync Audit — MFS vs SCS

Generated: 2026-04-27

- **MFS** = `Modern Founder Skills/.claude/skills/` (student-facing, public)
- **SCS** = `SBS Campaign Skills/.claude/skills/` (operator-facing, Cyprian)

Skills in both repos can drift intentionally. SCS skills have `SBS-Internal-Shared/<context>/` paths and operator-tone language; MFS skills have student-tone language. Use this report to spot the **unintended** drift — bug fixes or improvements made in MFS that should be ported to SCS.

## Skills only in MFS

_None._

## Skills only in SCS

- `sop-creator` — operator-only skill, intentionally not in student repo
- `workspace` — operator-only skill, intentionally not in student repo

**Action:** none. These should stay SCS-only.

## Skills in both — content drift

| Skill | Identical? | Drift (lines) | MFS lines | SCS lines | MFS mtime | SCS mtime |
|---|---|---|---|---|---|---|
| `guide` | no | 313 | 343 | 198 | 2026-04-21 | 2026-04-27 |
| `strategy` | no | 118 | 767 | 834 | 2026-04-21 | 2026-04-27 |
| `campaign-builder` | no | 97 | 505 | 647 | 2026-04-15 | 2026-04-27 |
| `personalisation` | no | 46 | 244 | 191 | 2026-04-21 | 2026-04-27 |
| `tov` | no | 21 | 153 | 155 | 2026-04-21 | 2026-04-27 |
| `prompt-adapter` | no | 19 | 221 | 223 | 2026-04-15 | 2026-04-27 |
| `campaign-analyser` | no | 11 | 304 | 306 | 2026-03-30 | 2026-04-27 |
| `share-doc` | yes | 0 | 67 | 67 | 2026-04-09 | 2026-04-16 |

Drift is rendered as the count of lines present in one but missing in the other. Order by drift descending.

## How to act on drift

For each drifted skill above, ask: **why is it different?**

- **Path adaptations** (`Client Docs/` → `SBS-Internal-Shared/<context>/`, `prompts/base/` → `prompts/sam/`): intended. Leave SCS as-is.
- **Tone adaptations** (student tutor → operator colleague): intended. Leave SCS as-is.
- **New section, bug fix, or improvement only in MFS**: port to SCS, preserving the SCS path/tone adaptations.
- **New section in SCS only**: port to MFS only if it benefits students too. Otherwise leave.

Run this audit before each MFS → SCS sync or after any non-trivial skill edit. The goal is to catch silent regressions where Josh fixes a bug in MFS and forgets the same fix is needed in SCS.

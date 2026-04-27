# Modern Founder Skills

Your AI-powered campaign system. 3 Clay prompts that find, score, and research your prospects. 4 Claude Code skills that adapt your prompts, write your campaigns, analyse your results, and personalise your copy.

---

## Installation

### 1. Create Your Business Folder

Create a folder named after your business (e.g. `MyBusiness`) in your Documents. Inside it, create a `Business Docs` folder for your knowledge base and other files.

### 2. Install Git

**Windows:** Download from [git-scm.com/download/win](https://git-scm.com/download/win) and run the installer. Accept all defaults.

**Mac:** Open Terminal and run `xcode-select --install`, then follow the prompts.

### 3. Clone the Repository

Open your business folder in Antigravity (File > Open Folder), then open the terminal (Terminal > New Terminal) and clone:
```
git clone https://github.com/JoshFrySBS/modern-founder-skills.git
```

No GitHub account needed. The repo is public.

### 4. Install Your Skills

Open Claude Code and ask it:
```
Copy the skills from modern-founder-skills into my .claude folder
```

Your folder will look like this:
```
MyBusiness/
  .claude/skills/           <-- Claude copies these here for you
  CLAUDE.md                 <-- your business brain (Josh helps you create this)
  Business Docs/
  modern-founder-skills/    <-- the repo lives here
```

### 5. Get Updates

When Josh pushes updates (new prompts, improved skills, bug fixes):
```
cd modern-founder-skills
git pull
```

Then ask Claude to copy the updated skills:
```
Copy the updated skills from modern-founder-skills into my .claude folder
```

---

## What's in This Package

### Clay Prompts (`prompts/sam/` and `prompts/course/`)
Production-ready prompts for your Clay lead scoring pipeline. Two ICP pipelines:

- **`prompts/sam/`** — Sam pipeline. Targeting SMBs with sales teams (the primary DFY pipeline).
- **`prompts/course/`** — Course pipeline. Targeting solo founders.

Each pipeline has the same three-prompt shape:

| # | Prompt | What it does |
|---|--------|-------------|
| 01 | Company & Founder Research | Profiles companies AND finds the founder/decision maker. Extracts services, revenue signals, founder details, content activity, and employment status. |
| 02 | ICP Fit Score | Scores how well each lead matches your ideal client profile. 7 dimensions, 0-100 scale. Automatic disqualifiers for bad fits. |
| 03 | Intent & Angle Research | Finds the best approach angle, generates personalisation hooks, and creates the copy variables that go into your email templates. |

### Claude Code Skills (`.claude/skills/`)

| Skill | What it does |
|-------|-------------|
| `/prompt-adapter` | Adapts each base Clay prompt to your specific business, then guides you through testing and scoring until the results are solid. |
| `/campaign-builder` | Takes your Clay export, segments leads, writes email sequences in your voice, spam checks everything, and pushes to Instantly. |
| `/campaign-analyser` | Reads your Instantly campaign results, analyses the leads + copy + outcomes together, and tells you exactly what to fix. |
| `/personalisation` | Helps you design the personalisation logic for your copy variables and how they flow into your emails. |

### Reference Docs (`reference/`)
- **spam-words.md** -- Words that trigger spam filters. The campaign builder checks against this automatically.
- **clay-prompt-rules.md** -- How Clay prompts work. The golden rule: prompt and schema are always separate.
- **credit-gating.md** -- How the pipeline saves you money by filtering bad fits before expensive enrichments.
- **instantly-api-setup.md** -- How to connect Claude Code to your Instantly account (5 minutes).

### Rules (`rules/`)
- **personalisation.md** -- The principles behind good personalisation. Infer, never state.
- **copy-quality-rubric.md** -- How emails are scored for quality. 8 criteria, 1-10 scale.

### Other Docs
- **PIPELINE.md** -- The full Clay pipeline flow, prompt details, and tier definitions.
- **COPY_RULES.md** -- How every email and copy variable is structured. Tone, word count, CTA rules.
- **SKILL_SYNC_AUDIT.md** -- Generated report comparing this repo's skills to the public Modern Founder Skills repo. Regenerate with `node Automation/skills-sync/audit.js > SBS\ Campaign\ Skills/SKILL_SYNC_AUDIT.md` from the project root. Helps Josh spot unintended drift between operator-facing and student-facing skills.

---

## Setup Checklist

Complete these before using the skills:

### 1. Software
- [ ] **Git** installed (see Installation above)
- [ ] **Claude Code** installed (via the VS Code extension)
- [ ] **Claude Pro account** ($20/month minimum) at [console.anthropic.com](https://console.anthropic.com)
- [ ] **Anthropic API key** created and credit added ($5-10 to start)
- [ ] **Instantly account** with API access (Growth plan or higher)
- [ ] **Clay account** (free plan for testing, paid plan for full campaigns)

### 2. API Keys
- [ ] Copy `.env.example` to `.env`
- [ ] Add your Instantly API key (see `reference/instantly-api-setup.md`)
- [ ] Add your Anthropic API key

### 3. Your Business Context
- [ ] **Knowledge base** built using the mega-prompt template (from Josh)
- [ ] **CLAUDE.md** created from your knowledge base -- save this in your parent project folder (not inside this folder)
- [ ] **Strategy document** from your strategy call with Josh -- save to `strategy/`

### 4. Clay Table
- [ ] Clay table created with columns for each of the 3 prompts
- [ ] Filter set up at the 50+ gate (after ICP Fit Score)
- [ ] Each prompt adapted to your business using `/prompt-adapter`

---

## The Workflow

This is the order you follow. Each step builds on the last.

### Phase 1: Adapt Your Prompts
```
/prompt-adapter
```
Run this for each of the 3 base prompts. It reads your strategy doc and business context, asks you questions, then rewrites the prompt for your specific ICP and market. Then it guides you through testing in Clay until the quality scores 8.0+.

**Start with 01-company-founder-research.** Everything downstream depends on good research data.

### Phase 2: Run Your Clay Pipeline
Set up your Clay table with the adapted prompts. Source leads. Run the pipeline. The scoring filters will automatically keep the good fits and discard the rest.

### Phase 3: Build Your Campaigns
```
/campaign-builder
```
Export your scored leads from Clay as a CSV. Drop it into `clay-exports/`. Run the campaign builder. It segments your leads, writes email sequences in your voice, spam checks everything, and saves drafts for your review.

Review the drafts in `campaigns/drafts/`. When you are happy, move the folder to `campaigns/approved/` and tell Claude to push to Instantly.

### Phase 4: Analyse and Improve
```
/campaign-analyser
```
After your campaigns have been running for 1-2 weeks, run the analyser. It reads your Instantly results directly, looks at the leads and copy alongside the outcomes, and tells you what to fix.

### Phase 5: Refine Your Personalisation
```
/personalisation
```
Use this anytime to refine how your emails are personalised. It helps you design better copy variables and shows you how they flow from Clay through to your email templates.

---

## Folder Guide

| Folder | What goes here |
|--------|---------------|
| `prompts/sam/` | Sam pipeline base prompts (SMBs with sales teams). Do not edit these directly. |
| `prompts/course/` | Course pipeline base prompts (solo founders). Do not edit these directly. |
| `SBS-Internal-Shared/<context>/prompts/adapted/` | Your personalised versions (created by `/prompt-adapter`). Lives in the internal-shared repo, scoped per client or SBS internal. |
| `strategy/` | Your strategy document from Josh's call. |
| `clay-exports/` | CSV exports from your Clay table. Drop them here for `/campaign-builder`. |
| `campaigns/drafts/` | Draft campaigns created by `/campaign-builder`. Review before approving. |
| `campaigns/approved/` | Move approved drafts here. Claude pushes these to Instantly. |
| `reference/` | Setup guides, spam words, and Clay rules. Read these when you need them. |
| `rules/` | Personalisation and copy rules. The skills read these automatically. |

---

## Quick Start

Already set up? Here is the fastest path to your first campaign:

1. Run `git pull` to make sure you have the latest version
2. Drop a Clay CSV export into `clay-exports/`
3. Run `/campaign-builder`
4. Review the drafts in `campaigns/drafts/`
5. Move approved folders to `campaigns/approved/`
6. Tell Claude to push to Instantly
7. Open Instantly, review, and launch when ready

---

## Troubleshooting

**"Claude doesn't know about my business"**
Your CLAUDE.md needs to be in the parent folder (one level up from this folder). Claude Code reads the nearest CLAUDE.md up the directory tree.

**"The campaign builder can't find my Clay export"**
Make sure the CSV is in the `clay-exports/` folder inside this project, not somewhere else on your computer.

**"Instantly push failed"**
Check your API key in `.env`. Make sure there are no extra spaces. See `reference/instantly-api-setup.md` for the full troubleshooting guide.

**"My Clay prompt results are poor quality"**
Run `/prompt-adapter` and go through the testing loop. Paste your Clay results back and let it score them. It will tell you exactly what to fix.

**"I want to change how my emails are personalised"**
Run `/personalisation` to redesign your copy variables. Then update your company-research prompt with `/prompt-adapter`.

**"git pull says there are conflicts"**
This usually means you edited a file inside `SBS Campaign Skills/` directly (it's read-only). Run `git stash` to save your changes, then `git pull`, then `git stash pop` to put your changes back. If in doubt, ask Josh.

---

## Extra Costs

| Tool | Cost | Notes |
|------|------|-------|
| Claude Pro | $20/month | Powers the AI skills. Pro is all you need. |
| Claude API | ~$5-10 per campaign batch | For campaign generation. Negligible. |
| Instantly | $97/month | Email sending platform. |
| Clay | Varies by plan | Free plan for testing. Paid for full campaigns. |
| Mailbox fees | ~$4/mailbox/month | Your sending email accounts. |

---

*Built by Side by Side | hello@sidebysidesystems.com*

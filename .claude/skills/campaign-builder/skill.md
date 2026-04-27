<!--
Skill: campaign-builder
Trigger: /campaign-builder
Purpose: Take a Clay CSV export, segment leads by tier, use all available research to write genuinely personal email sequences, spam check, add spintax to Email 1, and save drafts for review. When approved, push to Instantly via API.
-->

# Campaign Builder

You build cold email campaigns from Clay lead data. You read the student's voice, segment their leads, write personalised sequences, check for spam, add spintax, and save everything as drafts for review. When the student approves, you push to Instantly.

---

## Before You Start

**Ask which context the user is in (which client, or SBS internal) before any file operations.** Default writes go to `SBS-Internal-Shared/<context>/<folder>/` where `<context>` is `clients/<client-name>` or `sbs`. Read the context CLAUDE.md at `SBS-Internal-Shared/<context>/CLAUDE.md` for that work's voice rules, offer details, and CTAs.

1. Read the context CLAUDE.md (`SBS-Internal-Shared/<context>/CLAUDE.md`) for voice rules, offer details, and CTAs
2. Read `COPY_RULES.md` for email structure and variable rules
3. Read `rules/personalisation.md` for personalisation principles
4. Read `rules/copy-quality-rubric.md` — you will score every email against this before saving drafts
5. Read `reference/spam-words.md` — you will check every email against this
6. Check `.env` for `INSTANTLY_API_KEY` (needed for the push step, not for drafting)

---

## Step 1: Find and Read the Clay Export

Look in `SBS-Internal-Shared/<context>/clay-exports/` for the most recent CSV file. Read it and summarise:
- Total lead count
- Distribution by fit_tier (Priority / Prospect / Pass)
- Distribution by recommended_angle (which angles are most common)
- Distribution by intent_score ranges if available
- **Every column in the CSV is potential personalisation material.** Read ALL column headers and scan the data. The Clay pipeline may produce dozens of fields -- company research, founder data, scoring dimensions, angles, hooks, copy variables. Use everything that helps you write a better email.
- Common high-value columns to look for:
  - **Copy variables**: copyExpertise, copyBusinessDescriptor, copyClientDescriptor, copyHook, personalised_line
  - **Angle data**: recommended_angle, personalisation_hooks, offer_positioning, intent_score, angle_reasoning
  - **Company research**: value_proposition, services, business_type, revenue_signals, deal_size, client_types, lead_gen_visible
  - **Founder data**: founder_name, founder_title, content_activity, audience_size, years_independent, location
  - **Scoring**: fit_score, fit_tier, dimension_scores, reasoning, red_flags

Tell the student what you found. Ask if they want to proceed with the full list or a subset.

**Skip any leads with fit_tier = Pass or fit_score below 50.** These are not worth emailing.

---

## Step 2: Segment the Leads

Segment using fit_tier AND the intent/angle data:

| Segment | Criteria | Copy approach |
|---------|----------|---------------|
| **Priority** | fit_tier = Priority (70+) | The best leads. Use every piece of data available to write the most personal email possible. |
| **Prospect** | fit_tier = Prospect (50-69) | Good leads. Use whatever data is available -- some Prospects may have rich data, some may not. Write the best email the data allows. |

**The rule: always scan all available data for every lead, regardless of tier.** A Prospect with rich research data should get a deeply personal email. A Priority with thin data should still get the best email the data allows. The tier determines how aggressively you pursue them in follow-ups, not how much effort you put into the copy.

**Sub-segmentation by angle:** If you have enough leads (15+) in a tier, consider grouping by recommended_angle. This lets you write angle-specific sequences:
- All "referral_dependency" leads get a sequence leading with the referral pain
- All "inbound_plateau" leads get a sequence acknowledging their content effort
- All "recently_independent" leads get a sequence about the early days of going solo

Keep segments to 2-4 maximum. More segments means more work for diminishing returns.

---

## Step 3: Write Email Sequences

For each segment, write a 3-email sequence.

### Your Job: Write Genuinely Personal Emails

You have rich research data from Clay for every lead. Your job is to USE it -- all of it. Read every field for each lead (or segment) and think: "If I were writing this email by hand after spending 10 minutes on their website and LinkedIn, what would I say?"

The ANGLE and 4Ps methods below are frameworks to guide structure, NOT rigid templates to fill in. Use them as starting points, then let the actual research data shape the email. If the data suggests a completely different angle or opening, follow the data. The best cold emails feel like one human wrote to another after genuinely looking at their work.

**The creative process for each email:**
1. Read ALL the research data for this lead/segment -- company, founder, services, scoring reasoning, angle reasoning, hooks, red flags, everything
2. Ask yourself: what is the most interesting or compelling thing about this person's situation? What would make them think "this person actually looked at my business"?
3. Write the email around THAT, not around a formula
4. Check it against the rules (word count, tone, CTAs) after writing, not before

### Pain-Led Writing

Use the ANGLE approach (when you have a timing trigger) or the 4Ps approach (when leading with inference) as principles, not rigid templates. Both approaches share the same goal: make the email 80% about the reader and their situation, 20% about the sender and the solution.

The email should dig into their pain, show you understand their world, and subtly position the sender as someone who solves that problem. The reader should feel understood, not pitched.

Write the email first, check it against the rules second. The only non-negotiable rules are: under 90 words, soft CTAs, hedge language, and it must feel like a human wrote it.

### No Technical Details in Emails

NEVER name specific tools (Clay, Instantly, HeyReach, Lemlist, etc.) in outreach emails. NEVER describe the build process, list features, or explain how the system works. These are implementation details for a call, not a cold email. Instead, describe outcomes in plain language: "a system that fills your pipeline", "qualified conversations every week without the manual work."

### Honesty Rules

NEVER claim experience with an industry the sender has not worked in. "Most recruitment firms I work with" is a lie if there are no recruitment clients. Use general framing instead: "most businesses your size", "teams I've worked with."

NEVER imply the sender has dozens of clients. If they have 2-3 proof points, use them honestly. Lean on pain and insight instead of fabricated credibility.

### Banned Openers

NEVER start an email with any variation of: "Saw...", "Noticed...", "Came across...", "Found your profile...", "Checked out your site...", or any sentence that tells the reader how you found them. These are generic, overused, and instantly signal cold email.

Lead with the INSIGHT, not the discovery. Jump straight into what you know about their situation.

- Bad: "Came across {{companyName}}. Looks like you do great work."
- Good: "Premium creative work for businesses. I imagine with that level of service you only need a couple of projects to have a great quarter."

### Temporal Accuracy

Research data contains events and signals but not always dates. Before referencing any event:
- Mergers, acquisitions, funding rounds: frame as completed events ("since bringing in [company]" not "now that you're merging")
- Job postings: may be filled by the time the email sends. Use broader framing ("scaling the team" not "you're currently hiring a BDR")
- Growth signals and awards: reference as achievements, not events in progress
- General rule: if you are not certain something is happening RIGHT NOW, frame it as something that HAS happened or IS GENERALLY TRUE
- NEVER fabricate a timeline

### Proof Point Re-engineering

The student's proof points from their strategy doc may not perfectly match every lead's situation. Your job is to RE-ENGINEER the framing so the reader sees themselves in the result.

Rules:
- Reshape the context around the proof to mirror the reader's situation. If the proof came from a solo founder but you are writing to a company with a sales team, frame the result in team terms (output per month, pipeline generated, conversations per week) rather than mentioning "solo founder."
- NEVER fabricate proof points. Use only what the student has. The numbers must stay accurate. Only the framing changes.
- NEVER mention details about the proof point client that would break relevance. If the reader runs a recruitment firm with 40 employees, do not tell them about a "solo creative consultant." Tell them about "a consultancy that built £325k pipeline from 5,000 emails."
- Match the proof to the reader's specific gap. If they are hiring, frame proof as cost vs hiring. If they are scaling, frame it as growth. If they lack tools, frame it as going from manual to systematic.

### Sequence Structure

**Email 1 -- Primary angle**
- Word count: under 90 words, ideally under 80
- **SPINTAX REQUIRED:** Every paragraph must have at least one spintax variation
- **Use ALL available research data to personalise.** Don't just use the copy variables -- read every column in the CSV for each lead. The more specific data points you weave in, the more personal the email feels. Copy variables ({{copyExpertise}}, {{copyBusinessDescriptor}}, {{copyHook}}) are the minimum, not the ceiling.
  - Personalisation hooks: weave into the opening or body naturally
  - Company/founder research: services, business type, content activity, years independent -- anything that shows you understand their world
  - Offer positioning: use to frame the CTA specifically for them
  - Scoring reasoning and red flags: these tell you what is interesting about this lead's situation
- Subject lines: 3 A/B/C variants. These must feel like an internal note or a message from someone they're already working with. Focus on the specific topic of the email, not the company name. Examples: "the range expansion", "d2c vs amazon", "the online experience", "the conversion path", "messaging across the range". NEVER use the company name alone as a subject. NEVER sound salesy. The subject should make them think "what's this about?" not "oh, another pitch."
- Sign off with the student's first name (from CLAUDE.md)

**For Priority leads — the ENTIRE email must be hyper-personalised, not just the first line.**

You have rich data from Clay for every Priority lead. USE ALL OF IT. The whole point of the research pipeline is that you can write emails that feel like you personally looked at their business. A compliment in the opening line followed by a generic pitch is a waste of everything the research uncovered.

For each Priority lead, read EVERY field in their CSV row. Don't cherry-pick -- read it all. Then use the most compelling data points throughout the email. Common high-value fields include:
- `personalised_line` -- use as inspiration but go deeper, don't just paste it
- `angle_reasoning` -- tells you exactly WHY this angle was chosen and what evidence supports it
- `personalisation_hooks` -- specific observations ready to weave in
- `value_proposition`, `services` -- what they do and how they describe it
- `revenue_signals` -- specific achievements, client wins, scale indicators
- `offer_positioning` -- how to frame the CTA for this specific person
- `content_activity`, `audience_size` -- their current marketing situation
- `years_independent`, `business_type` -- their stage and identity
- `reasoning`, `red_flags` -- from ICP scoring, tells you what is notable about their situation

But don't limit yourself to this list. If the CSV has columns you haven't seen before, read them. If someone's services list reveals something interesting, use it. If their location combined with their niche tells a story, tell it. Use your initiative.

**The email structure for Priority leads:**

Before writing, you must do this mental exercise: read the strategy document (the sender's offer, expertise, deliverables, proof points, how they work) AND the lead's research data side by side. Ask yourself: "If this person hired the sender tomorrow, what EXACTLY would they work on together? What specific problem would get solved? What would the outcome look like?" THAT is what the email is about.

The email is not "here's what I noticed about you" + "here's what I do." It's "here's how what I do would solve YOUR specific thing." The reader should feel like the sender has already started thinking about their project.

1. **Opening (1-2 lines):** Reference a specific achievement or strength. The compliment opens the door and establishes that you've looked at their work. Keep it tight.

2. **The engineered connection (2-3 lines):** This is the core of the email. Take the specific gap from the research and connect it to the specific way the sender helps. Use hedge language to infer, not state. Normalise by referencing what most people in their position experience.
   - Read the sender's strategy doc: what do they actually deliver? How do they work? What outcomes do they create?
   - Read the lead's research: what's the specific gap? What's the conversion opportunity?
   - Engineer the connection: "the gap I can see" + "how what I do would close it" + "what that would mean for your business"
   - This should feel like a preview of working together, not a sales pitch.

3. **Proof matched to their situation (1-2 lines):** One result that mirrors what they'd get. The proof should feel like "this is what happened when someone in your exact position worked with me." If you can frame it as "same products, just [what changed]" — that's powerful because it shows the fix is strategy, not starting over.

4. **Value CTA (1-2 lines):** Offer something specific that continues the thinking you've started. "Happy to share a few thoughts on where [their specific gap] could convert harder." The CTA should:
   - Promise specific value (ideas, thoughts — not a call)
   - Reference their specific gap (not generic)
   - Feel like the sender has already done the thinking and is offering to share it
   - Make saying yes feel like receiving value, not giving up time

**The test for every email:** Does it read like the sender has already started thinking about how they'd work with this person? If it reads like a template with their name dropped in, rewrite it. If it reads like a mini-consultation preview, it's ready.

**Positioning rule:** Frame the offer as building on what they already have, not fixing what is broken. Nobody thinks their business is bad. Position the sender as someone who helps them get MORE from what they have built -- more conversations, more clients, more leverage from their expertise. Read the student's CLAUDE.md and strategy doc to understand how THEIR offer should be positioned.

**The inference model (this is the philosophy behind every email):**

Cold email works through inference, not telling. You never state the problem. You infer it using hedge language, and the reader fills in the gap themselves.

- **NEVER tell:** "Your brand messaging is disconnected across your range"
- **ALWAYS infer:** "I imagine the messaging hasn't quite kept pace with the range"

- **NEVER tell:** "Your Amazon listing is broken"
- **ALWAYS infer:** "I took a quick look at the Amazon listing and it's a different experience entirely"

- **NEVER tell:** "Your website doesn't convert well"
- **ALWAYS infer:** "Most founders I talk to find the website doesn't quite convert the way the product deserves"

The pattern: **hedge language + normalisation + specific observation.**

- Hedge: "I imagine", "I'd guess", "curious if", "most founders I talk to find"
- Normalise: "it's what happens when the product outgrows the brand", "most founders hit this point"
- Specific: reference the actual data from the research — the Amazon gap, the range expansion, the funding raise

The reader should think three things:
1. "This person looked at my business specifically" (from the specific observations)
2. "They're not criticising me, they're understanding my situation" (from the hedge language)
3. "They might be able to help me get more from what I've built" (from the proof and CTA)

If the email makes them defensive, it fails. If it makes them curious, it wins.

**Every paragraph should contain something specific to THIS person.** If you could swap the company name and the email still works, it is not personalised enough. Rewrite it.

**For Prospect leads:** Same creative process as Priority. Read all available data, find the most compelling angle, write the best email the data allows. If a Prospect has rich research data, use it all. Copy variables are the floor, not the ceiling.

**Email 2 — Follow-up (day 3)**
- Reply thread format (subject: "re: [Email 1 subject]")
- Adds proof, testimonial, or deeper value
- Word count: under 110 words
- **NO spintax** (this is a reply thread)
- End with PS line if appropriate

**Email 3 — Breakup (day 5)**
- Reply thread format
- Short, soft close
- Word count: under 75 words
- **NO spintax**
- "If this isn't relevant just let me know and I won't reach out again"

### Copy Rules (follow these exactly)

- British English always. Contractions always (isn't, wouldn't, don't — never "is not", "would not")
- No em-dashes. Ever.
- No emojis, no bolding, no italics
- Short lines, white space between paragraphs
- Hedge language: "I can imagine", "I'd guess", "typically", "most [descriptors] I speak to"
- CTAs must OFFER VALUE, not ask for judgement. Good CTAs promise something specific related to their gap:
  - "Happy to share a few thoughts on where [specific thing] could work harder"
  - "I'd be happy to put together a couple of ideas on [their specific gap]"
  - "Happy to send through some thoughts on getting more from [channel/area]"
- NEVER use passive CTAs: "Does this sound relevant?", "Worth a chat?", "Is this something you're thinking about?" — these ask the reader to make a judgement instead of offering them something
- NEVER use: "Let's jump on a call", "Can I get 15 minutes?", "I'd love to connect", "Book a time here"
- No spam words — check every email against `reference/spam-words.md`

### Spintax Rules

- **Only Email 1 gets spintax**
- **Every paragraph in Email 1 must have at least one spintax**
- Double bracket format only: `{{option A|option B}}`
- Never use single brackets: `{x|y}` is WRONG
- Spintax should feel natural — vary greetings, hedge phrases, transitional words
- Examples: `{{Hi|Hey}}`, `{{I can imagine|I'd guess}}`, `{{transform your quarter|have a great quarter}}`, `{{Happy to share more if useful|Would this be relevant to you}}`

### Variable Format in Emails

- camelCase in Instantly: `{{firstName}}`, `{{companyName}}`, `{{copyExpertise}}`, `{{copyBusinessDescriptor}}`, `{{copyHook}}`
- Never snake_case in email copy
- Strip legal suffixes from company names (Ltd, Inc, LLC)
- Strip parentheses from job titles
- All variables lowercase when not a proper noun

---

## Step 4: Spam Check

Check every email subject line and body against `reference/spam-words.md`.

- **High severity words:** Replace immediately. Never use in cold email.
- **Medium severity words:** Replace if there are 2+ in one email. One on its own is usually fine.
- **Low severity words:** Fine on their own. Flag only if stacked with other triggers.

If you find spam words, replace them with safer alternatives and note what you changed.

---

## Step 4b: Score Every Email Against the Copy Quality Rubric

Before saving drafts, score each Email 1 against `rules/copy-quality-rubric.md`. The 8 criteria:

1. **Opening line** — does it reference something specific and unique to this person?
2. **Pain specificity** — does it name their exact gap from the research, not a generic assumption?
3. **Research depth** — how many paragraphs contain something specific to this lead?
4. **Offer clarity** — is it clear what you do and why it matters to THEM?
5. **Proof relevance** — is the social proof matched to their specific gap?
6. **Curiosity created** — would they want to reply, not just acknowledge?
7. **Brevity** — is every word earning its place?
8. **Tone and voice** — does it sound like the person it's from?

**Target: 7.5+ average.** If any email scores below 7.5, rewrite it before saving. Identify the weakest criteria and improve them.

Present the score table alongside each draft so the student can see the quality assessment.

**The golden rule: if you could swap the company name and the email still works, it is not personalised enough. Rewrite it.**

---

## Step 5: Save Drafts

For each segment, save to `SBS-Internal-Shared/<context>/campaigns/drafts/[date]-[segment]/`:

### sequence.md
```markdown
# [Campaign Name] — [Segment] Sequence

## Email 1 — [angle description]

**Subject lines (A/B/C):**
- A: [subject]
- B: [subject]
- C: [subject]

**Body:**

[Full email with spintax and variables]

---

## Email 2 — [description]

**Subject:** re: [Email 1 subject]

**Body:**

[Full email, no spintax]

---

## Email 3 — [description]

**Subject:** re: [Email 1 subject]

**Body:**

[Full email, no spintax]

---

## Rules
- Spintax: Email 1 only. Every paragraph.
- No spam words: checked against reference/spam-words.md
- Variables: camelCase in Instantly
- Status: Draft. Never auto-activate.

## Variable Mapping

| CSV Column | Instantly Variable |
|---|---|
| first_name | {{firstName}} |
| company_name | {{companyName}} |
| [etc] | [etc] |

## Campaign Settings
- Schedule: Mon-Fri, 09:00-17:00
- Timezone: Europe/Isle_of_Man
- Delay Email 2: 3 days
- Delay Email 3: 5 days
```

### campaign-settings.json
```json
{
  "campaign_name": "MF_[Segment]_[MonthYear]",
  "schedule": "Mon-Fri, 09:00-17:00",
  "timezone": "Europe/Isle_of_Man",
  "sequence_delays": [0, 3, 5],
  "lead_count": [number],
  "segment": "[segment name]",
  "created": "[date]"
}
```

### leads.csv
Filtered leads for this segment only, with all columns needed for Instantly variables.

---

## Step 6: Present for Review

Show the student:
1. A summary of segments and lead counts
2. The full Email 1 for each segment (this is the most important email)
3. Any spam words that were found and replaced
4. Spintax count per paragraph in Email 1
5. Word counts for each email

Tell the user: "Review the drafts in `SBS-Internal-Shared/<context>/campaigns/drafts/`. When you are happy with a segment, move its folder to `SBS-Internal-Shared/<context>/campaigns/approved/` and tell me to push it to Instantly."

---

## Step 7: Push Approved Campaigns to Instantly

When the student says a campaign is approved:

1. Check `SBS-Internal-Shared/<context>/campaigns/approved/` for the approved folder
2. Read the sequence.md and campaign-settings.json
3. Read the leads.csv

### API Calls

**Create the campaign:**
```
POST https://api.instantly.ai/api/v2/campaigns
Headers:
  Authorization: Bearer {INSTANTLY_API_KEY}
  Content-Type: application/json
Body:
{
  "name": "[campaign_name from settings]",
  "campaign_schedule": {
    "schedules": [{
      "name": "Default",
      "timing": {
        "from": "09:00",
        "to": "17:00"
      },
      "days": {
        "0": true,
        "1": true,
        "2": true,
        "3": true,
        "4": true,
        "5": false,
        "6": false
      },
      "timezone": "Europe/Isle_of_Man"
    }]
  }
}
```

Save the returned campaign ID.

**Add sequences and sending accounts:**

**CRITICAL: Email body formatting.** Instantly renders plain text. To get visible spacing between paragraphs, you MUST insert `\n\n` (two newlines) between each paragraph in the JSON body string. A single `\n` creates a line break but no visible gap. Every paragraph must be separated by `\n\n` so the email doesn't arrive as a wall of text.

Example body format in JSON:
```
"body": "{{Hi|Hey}} {{firstName}},\n\n[First paragraph with spintax...]\n\n[Second paragraph...]\n\n[Third paragraph...]\n\n[Sign off]"
```

```
PATCH https://api.instantly.ai/api/v2/campaigns/{campaign_id}
Headers:
  Authorization: Bearer {INSTANTLY_API_KEY}
  Content-Type: application/json
Body:
{
  "email_list": ["[sending account emails - fetch from GET /api/v2/accounts first]"],
  "sequences": [{
    "steps": [
      {"type": "email", "delay": 0, "variants": [{"subject": "[subject A]", "body": "[email 1 body with \\n\\n between paragraphs]"}, {"subject": "[subject B]", "body": "[email 1 body]"}, {"subject": "[subject C]", "body": "[email 1 body]"}]},
      {"type": "email", "delay": 3, "variants": [{"subject": "re: {{subject}}", "body": "[email 2 body with \\n\\n between paragraphs]"}]},
      {"type": "email", "delay": 5, "variants": [{"subject": "re: {{subject}}", "body": "[email 3 body with \\n\\n between paragraphs]"}]}
    ]
  }]
}
```

**Add leads (one at a time):**
```
POST https://api.instantly.ai/api/v2/leads
Headers:
  Authorization: Bearer {INSTANTLY_API_KEY}
  Content-Type: application/json
Body:
{
  "campaign": "[campaign_id]",
  "email": "[lead email]",
  "first_name": "[first_name]",
  "last_name": "[last_name]",
  "company_name": "[company_name]",
  "custom_variables": {
    "copyExpertise": "[value]",
    "copyBusinessDescriptor": "[value]",
    "copyClientDescriptor": "[value]",
    "copyHook": "[value]"
  }
}
```

Wait 300ms between each lead request to respect rate limits.

**NEVER activate the campaign automatically.** Always leave it as a draft. Tell the student: "Your campaign is in Instantly as a draft. Open Instantly, review everything, and launch when you are ready."

### After Push

Save campaign metadata:
```json
{
  "campaign_id": "[id from API]",
  "campaign_name": "[name]",
  "lead_count": [number],
  "segment": "[segment]",
  "pushed_at": "[timestamp]",
  "status": "draft"
}
```

Append to `SBS-Internal-Shared/<context>/campaigns/approved/[folder]/campaign-metadata.json`.

Tell the student: "Done. [X] leads pushed to Instantly as '[campaign name]'. It is sitting there as a draft. Open Instantly, check the sequences and lead data look right, and launch when you are ready."

---

## Tone

Clear, confident, non-technical. These are business consultants, not marketers. Walk them through each step. Celebrate when the copy is strong. Be honest when something needs work. Always explain the reasoning behind copy decisions — "I led with the pain point because your signal data shows these companies are actively struggling with pipeline consistency."
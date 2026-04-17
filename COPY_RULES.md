# Copy Rules — How We Write Cold Outreach

These rules govern how every copy variable and email template is structured.
They come from extensive iteration and testing. Follow them exactly.

---

## Core Philosophy

Personalisation means showing you understand someone's world, not proving you read their website. Never state the obvious. Infer it.

Bad: "I can see you're helping executives through high-stakes decisions"
Good: "When you're helping executives through high-stakes decisions, your own pipeline tends to run on whatever time is left over"

The first states a fact. The second shows empathy. The reader thinks "this person gets it" not "this person looked me up."

---

## Variable Rules

Every copy variable must be ready to paste directly into an email template. No rewriting, no interpretation. It goes from Clay export straight into Instantly as a merge field.

### copy_expertise
- 1-2 words, prefer 1
- The field or discipline, NOT the business model
- Must sound natural after "your level of ___ expertise"
- Gold standard: "enterprise sales", "brand strategy", "leadership coaching"
- Bad: "marketing and digital" (filler "and"), "communications talent" (business model not field)

### copy_client_descriptor
- 1-2 words, prefer 1
- Simple plural noun, one clear group of people
- Must sound natural after "most experts selling to ___"
- When in doubt, go broader. "Entrepreneurs" beats "b2b entrepreneurs and consultants"
- Gold standard: "sales teams", "executives", "entrepreneurs"
- Bad: "entrepreneurs and professionals" ("and" splits focus), "business leaders" (too vague)

### copy_business_descriptor
- 1-2 words, prefer 1
- Professional identity, not business model
- Must sound natural after "I teach ___ how to build their own pipeline"
- Gold standard: "sales trainers", "strategy consultants", "data consultants"
- Bad: "community builders" (model not identity), "talent matchmakers" (activity not profession)

### copy_hook
- Max 8 words
- Always starts with "when you're"
- Describes what the founder's day-to-day work actually involves
- This is the FIRST HALF of a sentence. The template adds the consequence
- Must sound natural before ", your own pipeline tends to run on whatever time is left over"
- Gold standard: "when you're deep in enterprise data projects", "when you're helping executives through high-stakes decisions"
- Bad: "when you're deep in enterprise data projects building epm systems and analytics dashboards" (too specific, too long)

---

## Email Rules

### Word count
- Email 1: under 95 words
- Email 2: under 110 words (carries more weight, has proof link)
- Email 3: under 75 words

### Tone
- British English always
- Contractions always (isn't, wouldn't, don't). Never write "is not", "would not"
- Never use em dashes
- Never sound like an AI or a marketer
- Calm, collected, human. Never desperate, never salesy
- Hedge language: "I can imagine", "tends to", "most experts I speak to"

### Structure
- Short lines, white space between paragraphs
- No emojis, no bolding, no italics
- Soft CTAs only: "Happy to share more if useful", "Worth a look?"
- Never ask for time or a meeting directly

### What never goes in cold email
- Exact pricing (unless it's a lead magnet or low-ticket offer)
- Unrealistic claims or hype
- American-style directness ("Let's jump on a call", "I'd love to connect")
- Em dashes
- Forward slashes in any variable or text

---

## Personalisation Rules

### The "when you're" pattern
The most effective personalisation line follows this structure:

"When you're [doing their specific work], [consequence for their pipeline]"

The first half (copy_hook) comes from the company research prompt. The second half is fixed in the template. This works because:
1. It shows you understand what their work actually feels like
2. It connects their reality to the problem you solve
3. It never states "I looked at your website and saw that you..."

### Never state, always infer
- Bad: "I can see you do brand strategy for tech startups"
- Good: "When you're deep in a client rebrand, finding the next project tends to fall off the list"

Both show you know what they do. The second shows you understand what it costs them.

### One concept per variable
Every variable should contain exactly one idea. If you need "and" to connect two things, pick the stronger one and drop the other.

- Bad: "b2b salespeople and saas founders"
- Good: "salespeople"

### Simplicity beats specificity
A slightly broad variable that reads naturally is better than a hyper-specific one that sounds forced.

- Bad: "mid-to-large companies needing communications talent"
- Good: "enterprises"

### The read-aloud test
Before approving any copy variable, read the full email sentence aloud with the variable inserted. If it sounds like something a human would say in conversation, keep it. If it sounds like a database field or a LinkedIn bio, rewrite it.

---

## ICP Scoring Rules

### Who we want (Priority)
- Solo founder, 1-5 employees
- Sells expertise to businesses (any form)
- Early to mid-stage (0-7 years, sweet spot 0-3)
- No strong personal brand driving inbound
- Referral-dependent
- Can afford £2,000

### Who we don't want (automatic Pass)
- Competitors: anyone selling cold outreach, outbound lead gen, email marketing systems, or teaching cold outreach
- Large firms: 16+ employees or multi-partner structures
- B2C, product, SaaS, or execution-only services
- Strong personal brands with large followings already driving inbound

### Tier names
- **Priority** (70+): reach out first, email + LinkedIn
- **Prospect** (50-69): worth reaching out, email only
- **Pass** (below 50): not a fit, do not contact

---

## Formatting Rules for All Text Fields

- Always lowercase for acronyms: "b2b" not "B2B", "saas" not "SaaS"
- Never use forward slashes. Write "and" or "or" instead
- No trailing punctuation on variables
- No category labels or jargon
- Maximum 2 client types in client_types field. Prefer 1 word

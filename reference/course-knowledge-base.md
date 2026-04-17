# Modern Founder -- Course Knowledge Base

Everything Josh teaches about cold outreach, distilled into one reference. The guide skill reads this to answer student questions accurately and in Josh's voice.

This combines core principles from the course material with live coaching insights from group calls and the updated tooling (Claude Code skills, 3-prompt Clay pipeline).

---

## The Philosophy

### Quality Over Quantity
Modern outreach has shifted from blasting thousands of emails to sending fewer, highly qualified, highly personalised messages. You don't need a massive list. Many founders only need 2-3 new clients to transform their quarter. Better to reach 100 qualified people than 10,000 random ones.

### Progress Over Perfection
Don't endlessly polish before launching. Your first campaign is a learning tool, not a masterpiece. The real improvements come AFTER you launch, because that's when you get real data. Ship with 80% confidence and iterate from there.

### It's Always About Them, Never About You
Every line of every email should focus on their world, their pain, their situation. Not your offer, your features, or your credentials. The sale follows naturally when they see you understand them.

### The System Improves After Launch
Don't aim for perfection before going live. Launch, collect data, learn what works, adjust. Everything before launch is theory. Everything after launch is evidence.

---

## The Pipeline (How It All Connects)

```
Source leads (Clay)
  > [01] Company & Founder Research (profiles company + finds decision maker)
  > [02] ICP Fit Score (scores across 7 dimensions, filters bad fits)
  > FILTER: only 50+ proceed
  > [03] Intent & Angle Research (finds approach angle + generates copy variables)
  > Find Email (enrichment)
  > Export CSV
  > /campaign-builder in Claude Code (writes personalised email sequences)
  > Push to Instantly
  > Send campaigns
  > Monitor and reply in Unibox
  > /campaign-analyser (diagnose what's working)
  > Improve and repeat
```

Each prompt in Clay is a column in your table. Data flows left to right. The filter after ICP scoring stops bad leads from wasting credits on expensive research.

---

## Clay

### Why Clay
Clay is the "adapter" -- a central hub where data sources, enrichment tools, and AI qualification all connect. Without Clay, you're manually uploading and downloading CSVs between tools, losing data, and spending hours on work that should take minutes. Clay lets you source, qualify, enrich, and personalise in one workflow.

### The Adapter Metaphor
Think of Clay as a power strip with many plugs around it. Your lead sources plug in one side, your enrichment tools (Find Email, Claude API) plug in, and out the other end comes campaign-ready data. One workflow, no manual handoffs.

### Getting Started
Your very first task is to validate that your ICP exists on Clay in sufficient quantity. This takes 30-60 minutes on the free plan:
1. Use Find Companies (B2B) or Google Maps (local businesses)
2. Filter by industry, location, company size
3. If 1,000+ results: you have plenty of runway
4. If 500-1,000: workable, but may need to expand later
5. Below 500: use the escalation method (alternative sources plugged into Clay)

### Key Rules for Clay Prompts
- **One objective per prompt.** Don't ask a Claygent to research AND score AND find emails. One job per column.
- **Prompt and schema are ALWAYS separate.** Never put JSON schema inside the prompt text. This is the most common mistake and it causes Clay errors.
- **Give examples** of expected output in the prompt.
- **Say "no explanations, no quotation marks"** to keep output clean.
- **Set max cost limits** on Claygent columns to prevent spinning wheels.
- **Test on 10 rows first.** Always. Then check the results manually before running the full list. If results are unreliable at 10, they'll be unreliable at 1,000.

### Clay Credit Management
- Use your own API keys (Claude, Find Email) instead of Clay's managed accounts. This saves 60-90% on enrichment costs.
- Find Email with your own key: 1 token per email. Clay managed: 2 credits.
- Claude with your own key: actual token cost (pennies). Clay managed: 3 credits per row.
- The ICP filter at step 02 saves roughly 27% of total credits by stopping bad leads before expensive research.

### Common Clay Mistakes
- **Over-filtering at source:** Too many filters upstream eliminates good prospects. Use industry + location + company size as your main levers. Leave revenue and funding blank (unreliable data).
- **Employee count column:** Only about 75% accurate due to LinkedIn discrepancies. Don't rely on it for ICP decisions. Let the ICP scoring prompt handle qualification based on actual research.
- **Not testing incrementally:** Claygents are accurate about 75% of the time. Test on 10-20 rows, iterate the prompt, then scale. Never run 1,000 rows on an untested prompt.
- **Tables on auto-run:** When dropping leads into a Clay table with enrichment columns, make sure auto-run is OFF. Control when enrichments run to avoid wasting credits.

### The Escalation Method
If your ICP doesn't exist on Clay in sufficient quantity (rare), plug an external source (Apollo, industry-specific databases) INTO Clay instead. Clay stays as the adapter -- you still qualify, enrich, and clean inside Clay. The output is identical: campaign-ready leads.

---

## ICP Scoring

### The 7 Dimensions
1. **Founder Fit** (0-15): Solo founder or small owner-operator? Hands-on enough to learn and run the system?
2. **Service Fit** (0-15): Sells expertise to other businesses? High-ticket (only needs 2-3 new clients to transform their quarter)?
3. **Independence** (0-15): Is this their full-time livelihood? Not a side project alongside employment?
4. **Growth Stage** (0-15): At a stage where outbound would help? Not already sorted with strong inbound?
5. **Outbound Need** (0-15): No visible lead generation system? Likely relying on referrals?
6. **Deal Readiness** (0-15): Can afford the investment and would act? Evidence of real trading?
7. **Founder Quality** (0-10): Findable, real, verified? Current and active at the company?

### Automatic Disqualifiers
These override everything and result in a Pass (score 0):
- Competitors (sells cold email/outbound services)
- Employed elsewhere (consultancy is a side project)
- Volume low-ticket businesses (many small engagements, cold outreach isn't cost-effective)
- Data protection/privacy specialists (reputationally risky to cold email them)
- Founder not found or profile is fake

### Scoring Is for Segmentation, Not Just Filtering
Don't just use ICP scores to exclude leads. Use them to segment and choose different copy angles. A lead scoring 45 with great personalised copy can outperform a lead scoring 100 with generic copy. Scoring tells you HOW to approach them, not just WHETHER to approach them.

### Test on Known Companies
Before scaling, manually check 10 companies you KNOW are good fits and make sure the prompt says yes. If it says no to any, debug why. Then check 10 you know are bad fits and make sure it says no. This catches prompt issues before they waste credits.

---

## Copy and Email

### The Core Rule
Under 90 words. Ideally under 80. Every word must earn its place.

### The Inference Model
Cold email works through inference, not telling. You never state the problem directly. You infer it using hedge language, and the reader fills in the gap themselves.

- **NEVER tell:** "Your pipeline is inconsistent"
- **ALWAYS infer:** "I'd guess most of your work comes through referrals and word of mouth"

The pattern: **hedge language + normalisation + specific observation.**
- Hedge: "I imagine", "I'd guess", "typically", "most [type] I speak to"
- Normalise: "it's what happens when delivery takes priority", "most founders hit this point"
- Specific: reference actual research data about their business

The reader should think three things:
1. "This person looked at my business specifically"
2. "They're not criticising me, they're understanding my situation"
3. "They might be able to help"

### The ANGLE Method
Use when you have specific trigger data or signals. Five stages that build curiosity:
1. **Attention** -- Hook explaining why you're reaching out NOW
2. **Need** -- The priority this creates for them
3. **Gain** -- Cost of not addressing it (Before-After-Bridge)
4. **Leverage** -- Social proof, one relevant result
5. **Exchange** -- Soft CTA offering value

### The 4Ps Method
Use when you have good research but limited signals. More direct, research-backed:
1. **Person** -- Show you know who they are (observable facts, inferred)
2. **Pain** -- The likely pain point that follows from who they are
3. **Prescription** -- One line on what you help with
4. **Proof + Promise** -- One relevant result + soft CTA

### These Are Guides, Not Gospel
You can mix elements from both methods, skip steps, or structure the email differently if the research data calls for it. The only non-negotiable rules are: under 90 words, soft CTAs, hedge language, and it must feel like a human wrote it.

### Personalisation Philosophy
Personalisation should be "sprinkles" throughout the email, not the whole message. Copy variables (expertise, business descriptor, client descriptor, hook) show you understand their world without being creepy.

**The rule: infer, never state.**
- Good: "When you're deep in client rebrands, your own pipeline tends to run on whatever time is left over"
- Bad: "I can see from your website you do brand strategy consulting"

**Describe the consequence, not the activity.** Show you understand what their work COSTS them (pipeline runs on leftovers), not what it IS (you do brand strategy).

**One concept per variable.** If you need "and", pick the stronger one.

**The read-aloud test.** If you wouldn't say it at a pub, don't put it in an email.

### Copy Variables
These are short phrases generated for each lead that slot into email templates as merge fields:
- `copyExpertise` -- 1-2 words, their field/discipline. Fits: "your level of ___ expertise"
- `copyClientDescriptor` -- 1-2 words, who they serve. Fits: "most experts selling to ___"
- `copyBusinessDescriptor` -- 1-2 words, their identity. Fits: "most ___ I speak to"
- `copyHook` -- max 8 words starting with "when you're busy". Fits: "___, your own pipeline tends to run on whatever time is left over"
- `personalised_line` -- 1-2 sentences referencing something specific about this person

These are generated by the Intent & Angle Research prompt (step 03 in Clay). They flow through to Instantly as merge fields.

### Sequence Structure
**Email 1** -- The money email. All the conversion weight is here. If it doesn't land in the inbox and create curiosity, the rest doesn't matter.
- Every paragraph must have spintax ({{option A|option B}})
- Must have copy variables for personalisation
- 3 subject line variants (A/B/C) that feel like internal notes, not sales pitches

**Email 2** (day 3) -- Reply thread. Adds proof, testimonial, or deeper value. Can include one link (case study, Loom, website). Under 110 words. No spintax.

**Email 3** (day 5-7) -- Breakup. Short, soft close. Under 75 words. No spintax. "If this isn't relevant, just let me know and I won't reach out again."

### Subject Lines
Must feel like an internal note between colleagues. Focus on the specific topic, not the company name. Good: "the range expansion", "d2c vs amazon", "the pipeline gap". Bad: "Quick question for [Company]", "Opportunity for you".

### Spintax Rules
- Only Email 1 gets spintax
- Every paragraph must have at least one
- Double brackets only: {{option A|option B}}
- Never single brackets: {x|y} is WRONG
- Spintax prevents Gmail from flagging identical copy from the same sending account

### Spam Words
Check every email against the spam words list (reference/spam-words.md). High severity words must be replaced immediately. Medium severity words are fine individually but dangerous when stacked. Use MailMeteor or the built-in spam check.

### Soft CTAs Only
- Good: "Happy to share more if useful", "Would this be relevant?", "Happy to put together a few thoughts on [specific thing]"
- Bad: "Let's jump on a call", "Can I get 15 minutes?", "Book a time here", "Worth a chat?"
- CTAs should OFFER VALUE, not ask for a judgement or time commitment

---

## Instantly

### The Essentials
- Send Monday to Friday, 9am-6pm in your audience's timezone
- Day limit = mailbox count x 30 (12 mailboxes = 360 emails/day)
- Open tracking: OFF (bad for deliverability)
- Stop sending on reply: ON
- Never activate campaigns automatically -- always leave as draft, review, then launch manually

### Unibox Is Where Sales Happen
All the sourcing, qualifying, and copy work leads to one moment: someone replies. Your response in Unibox determines the outcome.

**Three rules:**
1. **Always reply from Unibox.** Never forward to your personal email. Never reply from Gmail. This flags your infrastructure.
2. **Check daily, respond fast.** Speed to lead directly correlates with conversion. They replied to a cold email -- that's a big deal. Don't make them wait.
3. **Verify AI categorisation.** Instantly's AI marks replies as interested/not interested/other. It's not always right. Read the full message. Some "not interested" replies are actually objections to handle.

### Health Score Monitoring
Review mailbox health scores weekly. Below 80% = immediately tag "below 80%" and remove from active sending. Let them warm up. Once back to 90%+, re-enter campaigns. This is preventative maintenance, not emergency response.

### Deliverability
- New email addresses need about 30 days of warmup before heavy sending
- Instantly's deliverability score is unreliable -- don't obsess over it
- Trust the infrastructure setup: proper warmup, spintax, no spam words, no links in Email 1
- Email 1 landing in the inbox is everything. Once it lands, Emails 2 and 3 almost always reach the inbox too.

---

## The Offer

### What Makes a Good Offer
A cold email offer must create genuine curiosity. It must show you understand their specific problem and present clear, transformational value that's different from everything else.

### How to Know Your Offer Needs Fixing
- No positive replies at all: look at offer AND targeting
- Only confused/wrong-fit replies: targeting issue
- Copy over 90 words: too wordy
- Doesn't solve a clear problem: needs rework
- Doesn't create curiosity: won't work
- No clear next step: needs a CTA

### The Hard Part of Cold Email
The hardest part isn't list quality, deliverability, or sequencing. It's the offer and copy positioning. Getting the direct sell right in the email is what takes time. Push through with focused, uninterrupted work.

---

## AI in the System

### Claude is the AI Brain
All AI in this system uses Claude (Anthropic). For Clay AI columns, use your own Anthropic API key (BYOK) instead of Clay's managed credits. For Claude Code skills, Claude Pro handles everything.

### Setting Up Claude API for Clay
1. Create account at console.anthropic.com
2. Create an API key
3. In Clay Settings > Connections, add Anthropic
4. Paste key, test connection (green = success)
5. Set spending limits in Anthropic billing ($30-50 for first campaign, auto-recharge at $5)

### AI Gets You 80% There
Claude generates options, not final copy. Your job is to curate, refine, and make it sound like you. Read everything aloud. If it doesn't sound like something you'd say, rewrite it. AI sometimes removes small words that make you sound human ("that", "could", etc.). Always review for natural speech.

### Iterative Process
Treat prompts as iterative, not one-shot. Test results in Clay, refine the prompt, test again. Read the reasoning outputs. Check the scoring logic. Iterate until you're confident, then scale.

---

## Reply Handling

### A Reply Is an Opt-In
If someone replies to a cold email, that's technically them opting in. You can then add them to your email list as an interested lead and follow up with broader content (with unsubscribe links in warm email settings).

### Out-of-Office Replies
Statistical noise. Don't panic. Set reminders to follow up after they return. Getting 5 out of 70 is unlucky but normal.

### No Reply But Connected on LinkedIn
Note these people. They're a future outreach pool when circumstances change. You never know when a signal will trigger their need.

### Looms and Case Studies
Don't pre-record Looms and bundle them in your sequence. Create them on-demand after someone replies positively. A personalised Loom created specifically for a responding lead is far more powerful than a generic one in a sequence.

---

## Common Mistakes

### 1. Perfectionism Before Launch
Students stress about deliverability scores, lead magnet capture pages, and variant testing when they should just launch. The data from a live campaign teaches more than any amount of pre-launch tinkering.

### 2. Over-Engineering Personalisation
Students worry their personalisation will look "creepy". The answer: personalisation should be sprinkles, not the whole message. Show you understand their world. Don't show you've been stalking them.

### 3. Blaming the List
When campaigns don't perform, students often blame "bad list" first. Josh's priority order: Offer > Copy > Segmentation > List Quality. Fix the offer and copy before blaming the leads.

### 4. One-Size-Fits-All Campaigns
"One size fits all campaigns don't really work anymore. People are wise to it." Segment by angle, score tier, or offer fit. Different leads need different approaches.

### 5. Adding Unnecessary Complexity
Trying to use LinkedIn member counts, revenue data (unreliable), or stacking too many filters. Nail the company research prompt and let the ICP scoring do the heavy lifting.

### 6. Not Planning for Reply Volume
Replies scale faster than your ability to handle them. Plan for this before scaling send volume. Quality responses to interested leads matter more than sending more emails.

---

## The 30-Day Sprint

### Week 1: ICP Validation
- Validate your ICP exists on Clay (30-60 minutes on free plan)
- This unblocks everything. Don't skip it.

### Week 2: Lead Sourcing and Clay Setup
- Set up Clay table with the 3 prompts
- Integrate API keys (Claude, Find Email)
- Run enrichments on 10 test rows
- Iterate until results look right
- This is the longest week (2-2.5 hours)

### Week 3: Offer and Copy
- Use strategy doc + Claude to draft copy
- Expect iteration -- AI won't spit out perfect copy
- Read everything aloud
- Bring draft to group call for feedback

### Week 4: Setup and Launch
- Populate copy into Instantly
- Verify sequences, spintax, variables
- Review and launch
- Campaign live = win

### Total Time: 4-5 hours per week for 4 weeks

### What Winning Looks Like at Day 30
- ICP validated with real data
- Clay table working and personalised to your business
- Offer clear, helpful, problem-focused
- Campaign live in Instantly
- A system that you actually understand and own

---

## Multi-Channel (LinkedIn + Email)

LinkedIn outreach (via HeyReach) is a supporting touch, not the main selling channel.

- **LinkedIn = warm-up touch.** Simple connection request. No selling in the DM.
- **Email = selling channel.** The email does the work. LinkedIn just gets your name in front of them.
- Keep LinkedIn DMs extremely simple. "Something really simple, and then let the email do the selling."
- Don't send a generic sales pitch as a connection message. That's "gonna be useless."

---

## Key Principles (Quick Reference)

1. Under 90 words. Under 80 is better.
2. Soft CTAs only. Never ask for time directly.
3. Infer, never state. Hedge language always.
4. Research before copy. Can't personalise what you don't know.
5. Test 10 rows before scaling to 1,000.
6. Email 1 in the inbox is everything.
7. Speed to lead beats perfect copy.
8. Unibox is where the sale happens.
9. Progress over perfection. Launch, then improve.
10. The system improves after launch, not before.

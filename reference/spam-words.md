# Cold Email Spam Word List

**Purpose:** Reference list for the `/campaign-builder` skill. Claude Code checks all generated copy against this before pushing to Instantly. Replaces external spam checkers like MailMeteor.

**How it works:** The campaign builder scans every email subject line and body against these words/phrases. Flagged items get replaced with safer alternatives automatically. Students can also run a manual check on any copy.

**Severity levels:**
- **High** - Almost always triggers filters. Never use in cold email.
- **Medium** - Risky in combination with other signals. Avoid where possible, especially in subject lines.
- **Low** - Fine on its own but contributes to overall spam score when stacked with other triggers.

**Rule of thumb:** One medium-severity word in an otherwise clean email is usually fine. Two or more medium words, or any high-severity word, and you are asking for trouble.

---

## 1. Sales and Pitch Language

Words that signal unsolicited selling. Especially damaging in subject lines.

| Word / Phrase | Severity | Notes |
|---|---|---|
| I wanted to reach out | High | Overused opener, pattern-matched by filters |
| touching base | High | Recognised follow-up spam phrase |
| circling back | High | Follow-up spam signal |
| following up | Medium | Common follow-up subject, flagged at scale |
| just checking in | Medium | Hollow filler, filter-trained |
| I hope this email finds you well | High | Textbook spam opener |
| hope you are doing well | High | Same |
| I came across your profile | High | Classic cold outreach opener |
| I came across your company | High | Same |
| I noticed your company | High | Templated personalisation signal |
| I was looking at your website | High | Same |
| I wanted to connect | High | LinkedIn-style outreach signal |
| let's connect | High | Overused CTA |
| schedule a call | High | Direct sales CTA, inbox-level trigger |
| book a meeting | High | Same |
| jump on a call | High | Cold email CTA pattern |
| get on a call | High | Same |
| hop on a call | High | Same |
| let's jump on a quick call | High | High-frequency cold email phrase |
| would love to chat | Medium | Salesy, pattern-matched |
| I'd love to connect | Medium | Overused |
| worth a chat | High | Overused B2B closer (also breaks SBS voice rules) |
| mutual fit | Medium | BD-speak, signals mass outreach |
| synergies | Medium | Corporate jargon |
| value proposition | Medium | Marketing/pitch signal |
| game changer | Medium | Hype language |
| revolutionary | Medium | Hype signal |
| industry-leading | Medium | Marketing puffery |
| world-class | Medium | Same |
| best-in-class | Medium | Same |
| cutting-edge | Low | Cliche, signals templated copy |
| state-of-the-art | Low | Same |
| disruptive | Low | Overused startup language |

---

## 2. Urgency and Pressure Language

Manufactured urgency is a primary spam filter signal. Any pressure phrase is high risk.

| Word / Phrase | Severity | Notes |
|---|---|---|
| act now | High | Classic urgency trigger |
| limited time | High | Urgency signal |
| limited time offer | High | Direct filter match |
| don't miss out | High | FOMO pressure |
| expires soon | High | Urgency trigger |
| last chance | High | Same |
| today only | High | Time pressure |
| offer expires | High | Same |
| now or never | High | Pressure signal |
| urgent | High | Direct spam filter keyword |
| respond ASAP | High | Pressure + caps risk |
| time sensitive | High | Urgency signal |
| time is running out | High | Same |
| before it's too late | High | Pressure language |
| don't delay | High | Classic trigger |
| once in a lifetime | High | Hype + urgency |
| exclusive offer | High | Urgency + offer signal |
| this week only | High | Time pressure |
| immediately | Medium | Urgency indicator |

---

## 3. Financial and Money Language

High-risk because they overlap with financial scam patterns.

| Word / Phrase | Severity | Notes |
|---|---|---|
| make money | High | Core spam trigger |
| earn money | High | Same |
| million dollars | High | Financial hype |
| six figures | High | Hype signal |
| seven figures | High | Same |
| double your revenue | High | Hype + financial promise |
| triple your income | High | Same |
| passive income | High | Strong spam association |
| cash | High | Consumer spam overlap |
| ROI guarantee | High | Promise + guarantee combo |
| guaranteed results | High | Promise trigger |
| guaranteed ROI | High | Same |
| no risk | High | False assurance signal |
| risk-free | High | Classic trigger |
| money-back guarantee | High | Consumer spam pattern |
| save big | High | Consumer spam |
| lowest price | High | Price competition signal |
| mortgage | High | Consumer spam overlap |
| loan | High | Same |
| generate revenue | Medium | Moderate signal in cold email |
| increase revenue | Medium | Same |
| profit | Medium | Moderate signal |
| investment | Medium | Financial trigger |
| refund | Medium | Associated with financial spam |
| save up to | Medium | Discount + percentage combo |
| best price | Medium | Price competition |
| price drop | Medium | Promotional trigger |
| 100k / £100k (in subject lines) | Medium | Revenue claim, triggers in subjects |

---

## 4. Free Offers and Giveaways

"Free" is one of the most consistently flagged words across all spam filter systems.

| Word / Phrase | Severity | Notes |
|---|---|---|
| free (in subject line) | High | Primary spam trigger |
| free trial | High | Classic trigger |
| free demo | High | High signal in B2B cold email |
| free consultation | High | Same |
| free access | High | Trigger word combo |
| free report | High | Same |
| free gift | High | Consumer spam classic |
| free offer | High | Same |
| giveaway | High | High signal |
| prize | High | Lottery/giveaway association |
| winner | High | Same |
| you've been selected | High | Phishing/prize pattern |
| claim your | High | Same |
| claim now | High | Urgency + prize combo |
| complimentary | Medium | Soft version of "free," still flagged |
| no cost | Medium | Avoidance of "free" that filters catch |
| at no charge | Medium | Same |
| bonus | Medium | Associated with free offers |
| sign up | Medium | Promotional conversion CTA |
| gift | Low | Moderate signal |

---

## 5. Excessive Claims and Promises

Results promises are particularly damaging for B2B outreach selling consulting or services.

| Word / Phrase | Severity | Notes |
|---|---|---|
| guaranteed | High | Core promise trigger |
| 100% guaranteed | High | Same, amplified |
| overnight results | High | Hype promise |
| results in X days | High | Time-bound promise |
| we can guarantee | High | Promise signal |
| I guarantee | High | Same |
| skyrocket | High | Hype verb |
| explode your | High | Same |
| secret | High | Classic spam word |
| secret method | High | Same |
| loophole | High | High spam association |
| proven results | Medium | Claim signal |
| proven system | Medium | Same |
| as seen on | Medium | Social proof bait |
| as featured in | Medium | Same |
| you will get | Medium | Outcome promise |
| dramatically | Medium | Hype intensifier |
| crush it | Medium | Bro-marketing language |
| scale fast | Medium | Hype phrase |
| unfair advantage | Medium | Hype signal |
| hack / growth hack | Medium | Overused, increasingly flagged |
| hidden | Medium | Spam association |

---

## 6. B2B Agency and Consulting Patterns

Phrases that show up specifically in agency/consulting cold email. Filters and recipients have learned to associate these with mass prospecting.

| Word / Phrase | Severity | Notes |
|---|---|---|
| I help [niche] companies get [result] | High | Extremely overused positioning line |
| we work with companies like yours | High | Generic mass-email phrase |
| I came across your LinkedIn | High | Templated personalisation signal |
| quick question (subject line) | High | Overused subject line bait |
| just a quick note | High | Same |
| we specialise in helping | Medium | Pitch opener signal |
| we've helped companies like | Medium | Social proof bait in templates |
| relevant to your role | Medium | Generic personalisation failure |
| are you the right person | Medium | Classic delegating CTA |
| who handles X at your company | Medium | Same |
| open to a conversation | Medium | Soft-sell CTA that is now heavily used |
| is this on your radar | Medium | Overused faux-casual CTA |
| does this resonate | Medium | Same |
| wanted to share something with you | Medium | Pitch setup phrase |
| relevant to what you're working on | Medium | Generic personalisation failure |
| case study (in subject) | Low | Can trigger when combined with other signals |
| I'll keep this brief | Low | Signals awareness of being intrusive |
| you probably get a lot of emails | Low | Same |
| I know you're busy | Low | Same |
| not sure if this is relevant | Low | Hedging that signals mass send |

---

## 7. Formatting and Structural Triggers

Patterns spam filters detect at a technical/structural level, separate from word matching.

| Trigger | Severity | Notes |
|---|---|---|
| ALL CAPS in subject line | High | Shouting = spam signal |
| ALL CAPS words in body | High | Same |
| Multiple exclamation marks (!!!) | High | Excitement signal = spam |
| Multiple question marks (???) | High | Spam pattern |
| Dollar/pound signs ($$$, £££) | High | Financial hype |
| More than one link in a cold email | High | Link density signal |
| HTML-heavy email (images, tables, buttons) | High | HTML ratio triggers |
| Mismatched link URL and display text | High | Phishing signal |
| Shortened URLs (bit.ly, tinyurl) | High | Link obfuscation |
| Attachments on first cold send | High | Malware association |
| Re: or Fwd: prefix on non-reply email | High | Deceptive pattern |
| Single exclamation mark in subject | Medium | Moderate risk, context-dependent |
| Excessive emoji in subject | Medium | Consumer pattern, flagged in B2B |
| Unsubscribe link (in truly cold email) | Medium | Signals bulk sending platform |
| Subject line over 60 characters | Low | Truncation and engagement patterns |

---

## 8. Action CTAs and Promotional Language

| Word / Phrase | Severity | Notes |
|---|---|---|
| click here | High | Generic CTA trigger |
| click below | High | Same |
| buy now | High | Direct purchase CTA |
| order now | High | Same |
| promotion | High | Self-identifies as promotional |
| special offer | High | Same |
| coupon | High | Consumer spam classic |
| visit our website | Medium | Promotional signal |
| subscribe | Medium | Mailing list association |
| unsubscribe | Medium | Bulk email signal in cold context |
| discount | Medium | Promotional trigger |
| deal | Medium | Same |
| opt in / opt out | Medium | Mailing list language |
| solution | Low | Overused B2B marketing word |
| leverage | Low | Corporate jargon |

---

## SBS-Specific Reminders

These are not spam words but SBS voice rules that also improve deliverability:

1. **Under 90 words per email** (ideally under 80). Shorter emails have better deliverability.
2. **Plain text only.** No images, no HTML formatting, no bold/italic in cold emails.
3. **One link maximum.** Ideally zero links in the first email of a sequence.
4. **No tracking pixels on initial sends.** These come later once warmth is established.
5. **Soft CTAs only.** "Would this be useful?" passes filters better than "Book a call now."
6. **Hedge language.** "Guessing", "typically", "I imagine" reads as human, not automated.
7. **No em-dashes.** SBS rule, but also avoids unusual punctuation that some filters flag.
8. **British English throughout.** Consistent voice = human signal to filters.

---

*Last updated: March 2026*
*Sources: Instantly.ai deliverability guidance, Gmail/Outlook filter documentation, Lemlist research, Woodpecker, Hunter.io, and cold email practitioner resources.*

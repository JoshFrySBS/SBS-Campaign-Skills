# Copy Quality Rubric

Score every cold email against these 8 criteria before sending. Each criterion is scored 1-10.
Target: **7.5+ average** before approving. Below 7.5, rewrite.

Used by:
- `/campaign-builder` — scores its own output before saving drafts
- `/campaign-analyser` — scores sent copy when diagnosing campaign performance

---

## The 8 Criteria

### 1. Opening Line (1-10)
**Does the first line prove you actually looked at their business?**

- 9-10: References a specific achievement, project, or milestone unique to them. Could only be written for this person. ("Great Taste Award, £150K raised, 10+ countries. Fighter Shots clearly has serious product-market fit.")
- 7-8: References something real but slightly generic. Could apply to a few similar companies. ("A solid wellness brand with national distribution.")
- 4-6: Generic compliment that could be anyone. ("Looks like you've built something impressive.")
- 1-3: No personalisation. Template opener. ("I wanted to reach out about your business.")

**The test:** Could you swap in a different company name and the line still works? If yes, it scores below 7.

### 2. Pain Point Specificity (1-10)
**Does the email name a specific gap or problem from the research, not a generic assumption?**

- 9-10: Names an exact gap found in the research data. ("Amazon listing has missing images, no reviews — feels like a different brand entirely." / "Template website doesn't match the fact you're selling across D2C, Amazon, and retail simultaneously.")
- 7-8: References a real category of problem but not their specific instance. ("Most founders find the brand doesn't keep up with growth.")
- 4-6: Generic pain that could apply to anyone in any industry. ("I imagine growing a business is challenging.")
- 1-3: No pain point addressed. Just a pitch.

**The test:** Does the reader think "how did they know that?" If yes, it scores 8+. If they think "yeah that's true of everyone", it's a 6.

### 3. Research Depth (1-10)
**How much of the available research data is actually used in the email?**

- 9-10: Multiple data points woven throughout. Opening uses one insight, pain paragraph uses another, proof is matched to their situation. Every paragraph contains something specific to this person.
- 7-8: 2-3 data points used but mostly in the opening. Middle paragraphs become more generic.
- 4-6: Only the first line is personalised. Rest is a template.
- 1-3: Research data available but not used. Generic email.

**The test:** Count how many paragraphs contain something that could ONLY apply to this specific lead. If it's every paragraph, score 9+. If it's just the first line, score 5.

### 4. Offer Relevance (1-10)
**Is the offer framed around THEIR specific conversion gap, not generic branding?**

- 9-10: The offer directly addresses a specific conversion or revenue opportunity the research uncovered. The reader sees exactly how this applies to their business. ("Your range has expanded but the brand messaging doesn't connect them — tightening that would make every product launch convert better." / "Your Amazon listing isn't getting the same experience as your D2C — closing that gap would mean more revenue from traffic you're already getting.")
- 7-8: The offer is relevant to their situation but framed generically. ("I help brands convert better.")
- 4-6: The offer is about "branding" or "design" in general. Doesn't connect to a specific business outcome they'd care about.
- 1-3: The offer feels irrelevant to their situation. They'd think "why are you emailing me?"

**The test:** Would the reader think "yes, that's exactly what I need right now" or "my brand is fine, thanks"? If the email leads with redesigning or rebranding, it will get the second response. If it leads with a specific conversion gap or revenue opportunity, it gets the first.

**Critical rule:** Never position the offer as "your brand needs fixing." Position it as "your brand is working but there's more to squeeze out of it." The sell is conversion optimisation and messaging tightening, not a rebrand. Nobody thinks their own brand is bad.

### 5. Proof Relevance (1-10)
**Is the social proof matched to their specific situation?**

- 9-10: Proof point directly mirrors their gap. Amazon conversion problem → cite Amazon conversion lift. Brand-revenue gap → cite revenue increase from brand work. The reader sees themselves in the result.
- 7-8: Proof is relevant to their general category but not their specific problem.
- 4-6: Proof is impressive but unrelated to their situation. ("I helped generate £200k in pipeline" when talking to a CPG founder about packaging.)
- 1-3: No proof, or proof that undermines credibility (wrong industry, wrong scale).

**The test:** Would the reader think "that's exactly what I need" or "cool but that's not my problem"?

### 6. Curiosity Created (1-10)
**Does the email make them want to reply, not just acknowledge?**

- 9-10: Creates a genuine open loop. The reader wants to know more because you named something specific they haven't solved yet. The CTA invites a conversation, not a commitment.
- 7-8: Interesting enough to consider replying. CTA is soft but the hook could be stronger.
- 4-6: Informative but no pull to respond. Reads like a newsletter, not a conversation starter.
- 1-3: Pushy or boring. Reader either feels sold to or feels nothing.

**The test:** Read the email and ask "would I reply to this?" Not out of politeness, but because I actually want to hear more.

### 7. Brevity (1-10)
**Is every word earning its place?**

- 9-10: Under 90 words and nothing feels missing. Every sentence drives toward the CTA. No filler, no throat-clearing, no repetition.
- 7-8: 90-120 words but justified. Extra words add specificity, not padding. Could cut 10-15 words without losing meaning.
- 4-6: 120-150 words. Paragraphs repeat the same point in different ways. Needs editing.
- 1-3: 150+ words. Reader gives up before the CTA.

**Note for Priority leads:** Hyper-personalised emails often run 100-120 words because every paragraph references specific research. This is acceptable IF every word earns its place. Score based on whether words are wasted, not just word count.

### 8. Tone and Voice (1-10)
**Does it sound like the person it's supposed to come from?**

- 9-10: Reads exactly like the sender would write. Correct formality level, natural language, consistent with their voice examples. Would pass the "did a human write this?" test.
- 7-8: Close but slightly off. Maybe too formal, too casual, or a phrase that doesn't fit.
- 4-6: Clearly AI-generated. Stiff language, corporate phrasing, or American tone when it should be British.
- 1-3: Sounds like a different person entirely. Generic AI slop.

**The test:** Read it aloud in the sender's voice. Does it sound natural? Would they actually say this?

---

## How to Score

### For the Campaign Builder (before saving drafts):
1. Write the email
2. Score all 8 criteria (1-10)
3. Calculate the average
4. If average is below 7.5, identify the weakest criteria and rewrite
5. Present the score alongside the draft so the student can see the quality

### For the Campaign Analyser (diagnosing sent campaigns):
1. Read the copy that was sent
2. Score all 8 criteria
3. If copy quality is below 7.5, the campaign performance problem might be the copy itself — not the leads or the targeting
4. Identify which criteria are weakest and recommend specific rewrites

---

## Scoring Table Format

Present scores like this:

```
| Criterion | Score | Notes |
|-----------|-------|-------|
| Opening line | 9 | References Great Taste Award + 10 countries specifically |
| Pain specificity | 8 | Names template website and multi-channel differentiation gap |
| Research depth | 9 | Every paragraph uses different research data point |
| Offer clarity | 8 | Matched proof to their channel situation |
| Proof relevance | 9 | 18% conversion lift maps directly to their Amazon gap |
| Curiosity | 8 | Open loop on whether brand is holding back sales |
| Brevity | 7 | 117 words — justified by specificity but could tighten |
| Tone | 8 | Warm, peer-to-peer, matches sender voice |
| **Average** | **8.3** | **Ready to send** |
```

---

## Benchmarks

| Average | Verdict |
|---------|---------|
| 8.5+ | Excellent. Send with confidence. |
| 7.5-8.4 | Good. Ready to send. Minor improvements possible. |
| 6.5-7.4 | Needs work. Identify weakest criteria and rewrite those sections. |
| Below 6.5 | Significant rewrite needed. Probably too generic — go back to the research data. |

---

## The Golden Rule

If you could swap the company name and the email still makes sense, the copy is not personalised enough. Every Priority email should be so specific that it could only have been written for that one person.

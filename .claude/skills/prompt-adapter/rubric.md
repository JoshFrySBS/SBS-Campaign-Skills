# Clay Prompt Quality Rubric

Score every Clay AI result against these 7 criteria. Each criterion is scored 1-10.
A prompt is ready for production when the average score across 5-10 test companies is **8.0 or above**.

---

## The 7 Criteria

### 1. Accuracy (1-10)
**Is the data correct?**

- 9-10: All facts verifiable, nothing fabricated, matches what you can see on the website/LinkedIn
- 7-8: Mostly correct, minor details slightly off but nothing misleading
- 4-6: Some incorrect data mixed in with correct data
- 1-3: Fabricated information, wrong company details, hallucinated facts

**What to check:** Compare key facts (services, employee count, industry) against the actual website and LinkedIn page. If something looks too specific to be real and you cannot verify it, it is probably fabricated.

### 2. Completeness (1-10)
**Did the agent find ALL the data points you asked for?**

- 9-10: Every field populated where data genuinely exists
- 7-8: Most fields populated, 1-2 missing that could have been found
- 4-6: Several fields missing that were available on the website/LinkedIn
- 1-3: Most fields empty or null despite data being available

**What to check:** Count the null fields. Then check the source (website, LinkedIn) to see if that data actually exists. Nulls are fine when data genuinely is not available. Nulls are bad when the agent missed something obvious.

### 3. Specificity (1-10)
**Are the answers specific to THIS company, or generic boilerplate?**

- 9-10: Every answer clearly describes this specific company, not a template
- 7-8: Mostly specific, 1-2 fields feel slightly generic
- 4-6: Mix of specific and generic answers
- 1-3: Could describe any company in the industry, nothing unique

**What to check:** Read each field and ask: "Could this answer apply to 50 other companies?" If yes, it is too generic. Good specificity means you could identify the company from the data alone.

### 4. Format Compliance (1-10)
**Does the output match the JSON schema exactly?**

- 9-10: Perfect match to schema. Correct types, field names, no extra fields
- 7-8: Minor formatting issues (e.g. string where array expected) but data is usable
- 4-6: Multiple type mismatches or unexpected field names
- 1-3: Output does not resemble the schema at all

**What to check:** Compare the JSON output against the schema file. Are booleans actually booleans (not "true" as a string)? Are arrays actually arrays? Are enum values from the allowed list?

### 5. Edge Handling (1-10)
**How does the agent handle companies with limited information?**

- 9-10: Returns null gracefully for genuinely missing data, never guesses or fabricates
- 7-8: Mostly handles edges well, occasionally fills in plausible-but-unverified data
- 4-6: Sometimes fabricates data for missing fields instead of returning null
- 1-3: Invents data rather than admitting it cannot find it

**What to check:** Test with at least one company that has a minimal website or limited LinkedIn presence. A good prompt returns null for what it cannot find. A bad prompt makes things up.

### 6. Efficiency (1-10)
**How many steps did the agent take? (Claygent prompts only)**

- 9-10: Under 5 steps. Got what it needed quickly.
- 7-8: 5-8 steps. Reasonable but could be tighter.
- 4-6: 8-12 steps. Revisiting pages unnecessarily or taking detours.
- 1-3: 12+ steps. Wandering around, inefficient, wasting credits.

**What to check:** Look at the agent step count in Clay. More steps = more credits and slower results. If the agent visits the same page twice or visits pages that are not relevant, the prompt needs tightening.

**Note:** For "Use AI" prompts (like ICP Fit Score), this criterion is less relevant since there are no agent steps. Score based on whether the reasoning is efficient and direct instead.

### 7. Actionability (1-10)
**Can this data be used directly in outreach without manual cleanup?**

- 9-10: Every field is ready to use as-is. Copy variables read naturally in email templates.
- 7-8: Mostly usable, 1-2 fields need minor tweaking
- 4-6: Several fields need manual rewriting before they can go into emails
- 1-3: Output needs significant cleanup to be useful

**What to check:** For copy variables (copy_expertise, copy_business_descriptor, etc.), paste them into the email template and read it aloud. Does it sound natural? Would you send it? For scoring fields, are the numbers reasonable and the reasoning clear?

---

## How to Score

1. Run the adapted prompt on 5-10 test companies in Clay
2. For each company, score all 7 criteria (1-10)
3. Calculate the average score per company (sum of 7 scores / 7)
4. Calculate the overall average across all companies

**Target: 8.0+ overall average**

| Overall Average | Verdict |
|----------------|---------|
| 8.0+ | Ready for production. Run your full list. |
| 7.0-7.9 | Close but needs refinement. Focus on the weakest criteria. |
| 6.0-6.9 | Significant issues. Identify the pattern and rewrite the relevant section. |
| Below 6.0 | Major rewrite needed. Review the prompt structure against the base version. |

---

## How to Get Results from Clay

1. Run the prompt on a test company in Clay
2. Click the cell with the AI result to expand it
3. You will see the JSON output
4. Copy the full JSON (Ctrl+A, Ctrl+C in the expanded view)
5. Paste it back into Claude Code

Give a mix of results: one company you think scored well, one that scored poorly, and one in the middle. This gives the best picture of how the prompt performs across different types of companies.
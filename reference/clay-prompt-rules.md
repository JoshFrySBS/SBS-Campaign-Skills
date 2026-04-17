# Clay Prompt Rules

Rules for writing and editing Clay AI prompts. Follow these exactly.

---

## The Golden Rule: Prompt and Schema Are Separate

Clay has TWO fields for AI columns:
1. **Prompt** — plain text instructions for the AI
2. **Output Schema** — JSON schema defining the output format

**NEVER put JSON schema inside the prompt text.** This causes "unable to parse output schema" errors. They are always two separate things.

When you adapt a prompt, you will always save two files:
- `prompt.txt` — the instructions
- `schema.json` — the output format

When you paste into Clay:
- Paste the prompt into the prompt field
- Paste the schema into the output schema field

---

## The 5-Part Prompt Structure

Every good Clay prompt follows this structure:

### 1. Role
Who the AI is. One sentence.
> "You are a B2B company research analyst."

### 2. Objective
What it needs to do. One sentence.
> "Build a company profile using the company's website and LinkedIn page."

### 3. Method
Step-by-step instructions. Numbered list. Be specific about what pages to visit and what to look for.
> "1. Visit the company website. Read the homepage, about page, and services page."

### 4. Rules
Hard constraints. What to never do, how to handle edge cases, null handling.
> "If data is unavailable, return null. Never guess or fabricate."

### 5. Output Format
A description of what to return. Refer to the schema for exact field definitions.
> "Return a JSON object matching the output schema with all fields populated."

---

## Null Handling

- If data genuinely cannot be found, return `null`
- Never guess or fabricate data to fill a field
- Never return empty strings — use `null`
- A null is always better than a wrong answer

---

## Prompt Length

Keep prompts under 500 words. Longer prompts confuse the AI and waste credits. If you need more detail, put it in the field descriptions in the schema, not in the prompt.

---

## Column Types in Clay

| Type | How it works | Credits | Best for |
|------|-------------|---------|----------|
| **Claygent** | AI agent that browses the web, visits pages, extracts data | 3 credits/row | Company research, founder finding, signal detection |
| **Use AI (BYOK)** | AI processes data already in your table, no web browsing | 0 credits (uses your API key) | Scoring, classification, synthesis |

**Claygent** prompts tell the agent WHERE to look (which URLs, which pages).
**Use AI** prompts tell the AI WHAT to do with data that is already in the table.

---

## Testing Prompts

1. Run on 5-10 test companies (mix of good fits, bad fits, and companies with limited data)
2. Check each result against the 7-criterion rubric
3. Target an average score of 8.0+
4. If below 8.0, identify the weakest criteria and refine
5. Re-run and re-score until quality is solid

Use `/prompt-adapter` to guide you through this process.

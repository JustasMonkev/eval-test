# Trial Task: Evals & Prompt Engineering

## Context

Sintra.ai provides AI "helpers" that assist small business owners with various tasks. **Soshie** is our social media helper — she generates posts for Instagram, LinkedIn, Twitter/X, and Facebook based on business context and user requests.

Your task is to build a small evaluation pipeline for Soshie's post generation capability.

---

## What We Provide

1. **Mock Soshie prompt** (`mock_soshie_prompt.md`) — A simplified version of Soshie's system prompt
2. **Mock business profiles** (`mock_business_profiles.json`) — 5 sample businesses with varying levels of context

---

## What You Deliver

### 1. Evaluation Dataset

A set of test cases that evaluate Soshie's output quality. You decide the structure, scope, and what to test for.

### 2. Working Evaluation Pipeline

Run your test cases against the prompt and grade the outputs. Use whatever tools you prefer — custom scripts, OpenAI Evals, Langfuse, Braintrust, or anything else. We just need to be able to access and review your results.

### 3. Improved Prompt

Based on what your evals reveal, iterate on the mock Soshie prompt. Show before/after eval scores.

### 4. Walkthrough (Loom or similar)

A short video (10-15 min max) where you:

- Explain your thinking — why you designed the eval this way
- Walk through your test cases and grading criteria
- Show results and what they reveal
- Explain what you changed in the prompt and why
- Discuss what you'd improve or expand with more time

Don't worry about production quality — we're evaluating your work, not your video skills. Pauses, umms, and unscripted thinking are totally fine.

---

## Guidance

Good evals test whether the model actually used what it was given and did what was asked.

Some failure modes to consider:

- Outputs that are too generic — could apply to any business
- Specific details provided by the user get ignored
- Tone doesn't match the audience or platform
- Format isn't appropriate for the requested platform
- The actual request gets lost or misinterpreted

This isn't an exhaustive list — part of your job is figuring out what matters and how to test for it.

We're not looking for "this sounds good" judgments — we want specific, testable criteria.

---

## Logistics

- **Time budget**: 3-4 hours
- **Deliverable format**: However you prefer to share (GitHub, Google Drive, Notion, etc.) — just make sure we can access everything
- **Questions**: If anything is unclear, document your assumptions and proceed

---

Good luck!

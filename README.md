# Soshie Eval

A promptfoo evaluation suite for testing Soshie, a social media assistant that helps small business owners create social media posts.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm
- OpenAI API key

## Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:

```
OPENAI_API_KEY=your-api-key-here
```

## Project Structure

```
soshie-eval/
├── data/
│   └── business-profiles.json    # Sample business data for tests
├── prompts/
│   ├── soshie-prompt-v1.md       # Prompt version 1
│   └── soshie-prompt-v2.md       # Prompt version 2
├── tests/
│   ├── types.ts                  # TypeScript type definitions
│   ├── content-tests.ts          # Content quality tests
│   ├── security-tests.ts         # Security & prompt injection tests
│   └── edge-cases.ts             # Edge case tests
├── index.ts                      # Test case generator entry point
├── promptfooconfig.yaml          # Promptfoo configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json
```

## Running Evaluations

Run the full evaluation suite:

```bash
npm run eval
```

This executes promptfoo with:
- GPT-5-mini as the grader
- 16 concurrent evaluations
- Results output to `results.json`

## Viewing Test Case Count

To see how many test cases are generated:

```bash
npm run test-case-count
```

## Test Categories

### Content Tests
Tests for post quality, relevance, and platform appropriateness.

### Security Tests
Tests for:
- Prompt injection resistance
- Data exfiltration prevention
- Jailbreak attempts
- Competitor attack requests

### Edge Cases
Tests for unusual inputs and boundary conditions.

## Configuration

The evaluation is configured in `promptfooconfig.yaml`:

- **Prompts**: Located in `prompts/` directory
- **Provider**: OpenAI GPT-5-nano with temperature 0
- **Tests**: Generated dynamically from `index.ts`

## Adding New Tests

1. Create test functions in the appropriate file under `tests/`
2. Export them and import in `index.ts`
3. Follow the `TestCase` interface defined in `tests/types.ts`

Example test case structure:

```typescript
{
  description: 'Test description',
  vars: {
    BUSINESS_DATA: JSON.stringify(businessData),
    REQUEST: 'User request here',
  },
  assert: [
    {
      type: 'llm-rubric',
      value: 'Expected behavior description',
      metric: 'category/metric-name',
      threshold: 0.8
    }
  ]
}
```

## Results

After running evaluations, results are saved to `results.json`. You can also view them in the promptfoo web UI:

```bash
npx promptfoo view
```

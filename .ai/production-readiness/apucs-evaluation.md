# APUCS Evaluation Specification

**Status**: Research-only shadow evaluation  
**Algorithm**: Anchor-Preserving, Uncertainty-Constrained Simplification (APUCS)  
**Source Basis**: NONI technical patterns and supplied IDD  
**User-visible behavior**: Unchanged until evaluation and IP gates pass

## Objective

Measure whether a candidate simplification is easier to read without losing source meaning, protected document anchors, or provenance.

## Synthetic Corpus

The initial corpus must contain synthetic, non-personal documents across four MVP classes:

| Class | Required cases |
|---|---|
| Insurance | renewal deadline, premium change, network condition, negation |
| Financial | balance, unusual charge, account identifier, dispute instruction |
| Government | amount due, installment dates, exemption condition |
| Legal | named agent, effective date, conditional authority, revocation language |

Each case must include:

- `sourceText`
- `protectedAnchors`
- `requiredActions`
- `sourceReferences`
- `humanNotes`
- one or more candidate outputs

No real documents or personal data may be placed in the corpus.

## Metrics

### Protected anchor recall

\[
Recall_A = \frac{|A_{source} \cap A_{candidate}|}{|A_{source}|}
\]

Release target: 1.0 for deadlines, amounts, obligations, negations, and conditions.

### Readability

Use a transparent Flesch–Kincaid-style estimate for the shadow harness. Treat it as a screening signal, not a comprehension proof.

### Token-distribution divergence

Use a smoothed Jensen–Shannon divergence proxy for the shadow harness. This is not a factuality proof; it identifies large lexical distribution shifts for review.

### Provenance coverage

\[
Coverage_P = \frac{\text{candidate claims with source references}}{\text{candidate claims}}
\]

The current string-only API cannot provide full provenance. Therefore, the initial harness reports provenance as `not_available` rather than falsely claiming coverage.

## Human Evaluation Gate

For each candidate, reviewers score independently from 1–5:

1. Meaning preservation
2. Simplicity
3. Fluency
4. Actionability
5. Trust and source clarity

A candidate cannot replace the placeholder until:

- Protected-anchor recall is 100%.
- No unsupported dates, amounts, deadlines, obligations, or negations occur.
- Human meaning-preservation median is at least 4/5.
- Human simplicity median is at least 4/5.
- No critical contradiction is found.
- Output is reproducible for fixed inputs and configuration.
- IP/patent review is complete or written research-only authorization exists.

## Shadow-Only Rule

The harness evaluates outputs from the current placeholder and future candidates. It must not change the API response or select a new simplifier. The current `plainLanguageSimplifier.js` remains provisional.

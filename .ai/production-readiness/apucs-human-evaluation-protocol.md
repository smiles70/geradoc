# APUCS Human Evaluation Protocol

**Status**: Protocol ready; evaluation not yet conducted  
**Mode**: Research-only, shadow outputs, no production user exposure

## Purpose

Evaluate candidate simplifications separately for meaning preservation, simplicity, fluency, actionability, and trust. Automatic metrics are screening signals only.

## Safeguards

- Use synthetic or approved de-identified documents.
- Do not collect medical diagnoses, cognitive assessments, or unnecessary personal information.
- Obtain informed consent before any participant session.
- Participants may stop at any time without penalty.
- Do not describe telemetry as a medical or cognitive diagnosis.
- Consider ethics/IRB review before recruiting seniors for formal research.

## Evaluation Design

1. Randomize document/candidate order.
2. Blind reviewers to algorithm identity.
3. Show source and candidate with source references.
4. Score each candidate independently.
5. Collect free-text error explanations.
6. Record anchor, action, contradiction, and provenance errors separately.
7. Do not expose candidate output through the production API.

## Rubric

Score each category from 1 to 5:

| Category | 1 | 3 | 5 |
|---|---|---|---|
| Meaning preservation | Meaning changed or unsafe | Mostly preserved with concern | Fully preserved |
| Simplicity | Harder or equally difficult | Some improvement | Clearly easier |
| Fluency | Unclear or ungrammatical | Understandable with issues | Natural and clear |
| Actionability | Actions missing or misleading | Partially useful | Actions are clear and safe |
| Trust/provenance | Cannot verify source | Some source support | Every important claim is traceable |

## Pass Criteria

- Meaning-preservation median ≥ 4/5.
- Simplicity median ≥ 4/5.
- No critical contradiction.
- No lost protected anchors.
- No unsupported obligation, deadline, amount, or condition.
- Reviewers can identify the source for every important claim.

## Reporting

Report per document class and overall:

- Median and interquartile range by rubric category.
- Critical error count.
- Protected-anchor failures.
- Action failures.
- Reviewer disagreement.
- Candidate configuration and output digest.

A passing human evaluation does not establish patentability, legal clearance, clinical safety, or production readiness.

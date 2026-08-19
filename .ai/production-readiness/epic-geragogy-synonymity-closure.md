# Epic — Idempotent Geragogy Synonymity Closure

**Portfolio ID**: GERAGOGY-SYN-001  
**Process**: v9.5  
**Status**: POC Rubric Implemented; Production/Calibrated Closure Pending  
**Scope**: Safe POC transformation using approved glossary/thesaurus agreement; calibrated APUCS activation remains separate

## Objective

Create a deterministic geragogy transformation pipeline that changes wording only when a glossary and thesaurus independently agree that the replacement is synonymous in the same domain, language, grammatical role, polarity, and obligation context.

## Non-goals

- Free-form summarization
- Unapproved advice generation
- Inference of facts not present in the source
- Changing dates, amounts, entities, conditions, negations, or obligations
- Treating a generic thesaurus as authoritative by itself
- Production APUCS activation

## Pipeline

```text
source text
  → segment/proposition extraction
  → protected-anchor detection
  → glossary candidate lookup
  → thesaurus candidate lookup
  → cross-agreement
  → semantic-preservation rubric
  → idempotent candidate transform
  → anchor/provenance/advice validation
  → accept or REVIEW/fallback
```

## Semantic-preservation rubric

A word change is eligible only if every rule passes:

```text
R1 exact source span is known
R2 source and replacement have the same language
R3 source and replacement have the same domain profile
R4 source and replacement have the same part of speech
R5 glossary explicitly approves the pair
R6 thesaurus independently supports the pair
R7 polarity is unchanged
R8 condition scope is unchanged
R9 obligation/permission strength is unchanged
R10 protected anchors are unchanged
R11 source provenance is retained
R12 applying the transform twice produces the same result
```

### Rejection rules

Reject and retain source text when:

- Only the thesaurus agrees.
- Only the glossary agrees.
- The replacement changes obligation strength.
- The replacement changes negation or condition scope.
- The replacement touches a date, amount, entity, identifier, or legal phrase.
- The replacement is ambiguous in the active domain.
- The replacement is not idempotent.
- Provenance cannot be retained.

## Closure epics

### SYN-001 — Versioned glossary

- [ ] Domain/language/version metadata.
- [ ] Approved source/replacement pairs.
- [ ] Part of speech and domain labels.
- [ ] Protected-term exclusions.
- [ ] Glossary hash in result metadata.

### SYN-002 — Thesaurus cross-agreement

- [ ] Versioned thesaurus adapter.
- [ ] Independent support signal.
- [ ] No single-source acceptance.
- [ ] Adapter can be replaced without changing validators.
- [ ] Unsupported lookup routes to source fallback.

### SYN-003 — Semantic-preservation validator

- [ ] Anchor preservation.
- [ ] Negation/condition preservation.
- [ ] Obligation-strength preservation.
- [ ] Advice-boundary preservation.
- [ ] Provenance mapping.
- [ ] Domain/language/POS agreement.

### SYN-004 — Idempotent transformation engine

- [ ] Canonical replacement direction.
- [ ] No replacement cycles.
- [ ] Stable ordering.
- [ ] `T(T(x)) === T(x)` tests.
- [ ] Original/source text retained.
- [ ] Rejected candidates fallback safely.

### SYN-005 — Geragogy output integration

- [ ] Orientation remains source-grounded.
- [ ] Key information remains unchanged.
- [ ] Actions/deadlines remain unchanged.
- [ ] Simple/Standard transformations use only accepted candidates.
- [ ] Detailed/Original remain available.
- [ ] REVIEW explains rejected/uncertain changes.

### SYN-006 — Cross-agreement regression matrix

- [ ] English fixtures.
- [ ] Spanish fixtures.
- [ ] Insurance/financial/government/legal domains.
- [ ] Positive synonym cases.
- [ ] False-synonym cases.
- [ ] Negation cases.
- [ ] Condition cases.
- [ ] Obligation cases.
- [ ] Dates/amounts/entities/identifiers.
- [ ] Repeated-run graph/result hash.

## Example accepted transformation

```text
source:      The provider shall utilize the form prior to submission.
standard:    The provider must use the form before submission.
```

Only accepted if the glossary and thesaurus agree that:

```text
shall ↔ must
utilize ↔ use
prior to ↔ before
```

and the validator confirms that the obligation and timing remain unchanged.

## Example rejected transformation

```text
source:      You may appeal the decision within 30 days.
unsafe:      You must appeal the decision within 30 days.
```

Reject because permission became obligation.

## Technical closure gate

```text
[ ] Glossary and thesaurus are versioned
[ ] Cross-agreement is required
[ ] Protected anchors are unchanged
[ ] Conditions, negations, and obligations are unchanged
[ ] Provenance is preserved
[ ] Transform is idempotent
[ ] Rejected candidates fallback to source
[ ] English and Spanish test fixtures exist
[ ] Geragogy output remains complete and source-grounded
[ ] APUCS remains shadow-only unless separately approved
```

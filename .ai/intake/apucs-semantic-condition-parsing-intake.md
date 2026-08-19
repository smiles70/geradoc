# Intake — Full Semantic Condition Parsing, Calibrated APUCS, and Deferred Approval Gates

**Intake ID**: APUCS-SEMANTIC-001  
**Date**: August 19, 2026  
**Process**: v9.5  
**Status**: Intake accepted for technical planning; legal/IP, human-equivalence review, and production-release approval explicitly deferred

## 1. Request

Close the remaining semantic safety gap by implementing a source-grounded parser and transformation pipeline that preserves:

- Conditions
- Negation
- Obligation strength
- Permission
- Dates
- Amounts
- Entities
- Identifiers
- Exceptions
- Provenance

Then use a versioned glossary and external thesaurus signal to permit only approved synonymity changes that are idempotent and source-grounded.

## 2. Novelty/IP summary — non-legal technical record

Existing APUCS materials describe a proposed joint architecture involving:

```text
protected anchors
+ source provenance
+ uncertainty-aware presentation control
+ constrained transformation
+ REVIEW routing
+ stability/hysteresis
+ audit/reproducibility
```

The current technical record explicitly states that it does **not** determine:

- Patentability
- Novelty as a legal conclusion
- Inventorship
- Ownership/assignment
- Freedom to operate
- Claim scope
- Whether supplied IDD material is filed, pending, granted, or enforceable

The technical novelty hypothesis is therefore recorded only as:

```text
Potentially differentiating joint combination:
source-grounded protected-anchor preservation
+ uncertainty-aware presentation control
+ constrained, provenance-retaining transformation
```

This is a research hypothesis, not a legal conclusion.

## 3. Free English dictionary/thesaurus candidates

### Candidate A — FreeDictionaryAPI

```text
https://freedictionaryapi.com/
```

Fetched documentation confirms:

- No API key required.
- 1,000 requests/hour/IP rate limit.
- English Wiktionary-sourced data.
- CC BY-SA 4.0 data license.
- Attribution/link-back requirements to Wiktionary and FreeDictionaryAPI.
- API response includes source/license metadata.

This is suitable as a research/Poc dictionary signal only after attribution and share-alike obligations are reviewed for the intended distribution.

Use case:

- Definitions
- Part of speech
- Synonyms/antonyms
- Sense selection
- Word-level explanation support

### Candidate B — Datamuse

```text
https://www.datamuse.com/api/
```

Fetched documentation confirms Datamuse is a read-only word-finding API with synonym, antonym, part-of-speech, and context-related queries. It is currently available without an API token, but the official page states that an API key will be required starting January 1, 2027, with a 100,000-request/day/API-key limit. Treat availability and terms as time-sensitive.

Use case:

- Independent thesaurus signal
- Synonym candidate generation
- Part-of-speech filtering
- Antonym rejection

Do not use similarity output alone to transform text. It must pass glossary, sense, domain, POS, polarity, condition, obligation, anchor, and provenance gates.

### Candidate C — WordNet offline data

```text
https://wordnet.princeton.edu/
```

The search results identify WordNet as an offline synonym resource with a WordNet 3.0 license that permits use subject to its notice/disclaimer terms. Confirm the license and attribution requirements for the intended distribution before bundling it.

Use case:

- Reproducible offline synonym signal
- Stable local test fixtures
- No runtime external API dependency

### Candidate D — Merriam-Webster API

```text
https://www.dictionaryapi.com/
https://dictionaryapi.com/info/terms-of-service.htm
```

The search results state that the free API is limited to non-commercial use, 1,000 queries/day per reference, and two reference APIs. It requires registration and a key. It is not assumed suitable for production ClarityDoc without a separate terms/licensing decision.

## 4. Recommended POC choice

For the deterministic POC:

```text
Primary offline thesaurus signal: WordNet-compatible local fixture/data
Dictionary/definition fixture: curated versioned glossary
Optional research cross-check: Datamuse while its current terms permit
```

The POC must store:

- Source name
- Version
- License/terms URL
- Query timestamp if external
- Candidate response hash
- Sense/POS selected
- Glossary decision
- Final rubric decision

No external service should receive user document text. Send isolated candidate words only, or use offline data.

## 5. Technical epics

### SEM-001 — Condition and proposition parsing

- [ ] Segment propositions.
- [ ] Parse if/unless/only-if/when/except/until/after/before clauses.
- [ ] Parse negation and double negation.
- [ ] Parse must/may/should/required/allowed/prohibited strength.
- [ ] Parse dates, amounts, entities, identifiers, and exceptions.
- [ ] Retain source spans and page references.

### SEM-002 — Protected semantic anchors

- [ ] Canonical typed anchors.
- [ ] Anchor equality and normalization.
- [ ] Condition-scope identity.
- [ ] Negation identity.
- [ ] Obligation/permission identity.
- [ ] Exception identity.
- [ ] Candidate rejection on anchor drift.

### SEM-003 — Glossary/thesaurus sense agreement

- [ ] Versioned glossary.
- [ ] Independent dictionary/thesaurus adapters.
- [ ] Sense/POS/domain agreement.
- [ ] Antonym and related-word rejection.
- [ ] External response caching only under approved terms.
- [ ] Offline fallback.

### SEM-004 — Idempotent candidate transformation

- [ ] Canonical replacement direction.
- [ ] No replacement cycles.
- [ ] `T(T(x)) === T(x)`.
- [ ] Stable candidate hash.
- [ ] Provenance mapping.
- [ ] Safe source fallback.

### SEM-005 — Calibrated APUCS activation

- [ ] Candidate registry.
- [ ] Weighted objective.
- [ ] Domain/language/modality calibration profiles.
- [ ] Drift monitoring.
- [ ] Feature flag.
- [ ] Baseline fallback.
- [ ] REVIEW state.

### SEM-006 — Human semantic-equivalence review

- [ ] Deferred intake only.
- [ ] Blinded source/candidate comparison protocol.
- [ ] Anchor/condition/negation/obligation review.
- [ ] Senior comprehensibility review.
- [ ] No production activation based on automated metrics alone.

### SEM-007 — Legal/IP review

- [ ] Deferred intake only.
- [ ] Confirm source document status and filing information.
- [ ] Determine inventorship/assignment.
- [ ] Review prior art and claim scope.
- [ ] Review dictionary/thesaurus licenses and terms.
- [ ] Freedom-to-operate review.

### SEM-008 — Production release approval

- [ ] Deferred intake only.
- [ ] Technical gates pass.
- [ ] Human-equivalence gate passes.
- [ ] Accessibility gate passes.
- [ ] Legal/IP gate passes.
- [ ] Operations/rollback gate passes.
- [ ] Feature-flag rollout and rollback verified.

## 6. Semantic preservation rubric

A replacement is accepted only when all pass:

```text
same language
same domain
same sense
same part of speech
same polarity
same condition scope
same obligation/permission strength
same exception behavior
protected anchors unchanged
source provenance retained
idempotence proven
```

Example rejection:

```text
Source:  You may appeal within 30 days.
Change:  You must appeal within 30 days.
Result:  REJECT — permission became obligation.
```

## 7. Scope and deferrals

This intake authorizes technical planning and POC research implementation only.

Explicitly deferred:

```text
legal/IP approval
human semantic-equivalence review
calibration approval
production release approval
```

The user-visible system must remain baseline/source-preserving until those gates are separately closed.

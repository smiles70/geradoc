# APUCS Novelty and IP Technical Summary

**Date**: August 19, 2026  
**Status**: Technical research summary; not legal advice

## Technical novelty hypothesis

The documented APUCS research direction proposes a possible joint combination of:

```text
protected source anchors
+ provenance-retaining transformation
+ uncertainty-aware presentation control
+ constrained candidate selection
+ REVIEW routing
+ stability/hysteresis
+ reproducible audit records
```

The potential differentiator is the combination and interaction of these elements for source-grounded document transformation, not any individual element in isolation.

## What is not established

This repository does not establish:

- Legal novelty
- Patentability
- Inventorship
- Ownership or assignment
- Freedom to operate
- Claim scope
- Filing or grant status
- Non-infringement
- Commercial rights to external dictionary/thesaurus data

The existing APUCS disclosure explicitly identifies these as open counsel/inventor decisions.

## Technical implementation status

```text
APUCS specification:       research-defined
APUCS implementation:     shadow candidate
POC synonymity rubric:     implemented
Glossary/thesaurus gate:   implemented with curated POC pairs
Calibrated activation:     not enabled
User-visible APUCS:        not enabled
```

## External language-data options

### FreeDictionaryAPI

```text
https://freedictionaryapi.com/
```

Official documentation fetched August 19, 2026 states:

- Wiktionary-sourced data
- CC BY-SA 4.0
- No API key
- 1,000 requests/hour/IP
- Attribution/link-back requirements
- Source/license metadata in responses

### Datamuse

```text
https://www.datamuse.com/api/
```

Official documentation states:

- Read-only word-finding API
- Synonym, antonym, POS, and contextual queries
- No API token currently required
- API key required beginning January 1, 2027
- 100,000 requests/day/API-key limit after that change

### WordNet

```text
https://wordnet.princeton.edu/
```

A local WordNet-compatible dataset may provide a reproducible thesaurus signal. License notices and attribution must be retained and reviewed before distribution.

## Safe technical recommendation

Use external language resources only as an independent candidate signal:

```text
glossary approval
+ dictionary/thesaurus sense/POS/domain agreement
+ protected-anchor validation
+ condition/negation/obligation validation
+ provenance
+ idempotence
→ accept candidate
```

Never send document text to an external word service. Send isolated terms only or use offline data.

## Deferred gates

The following remain intentionally deferred:

- Legal/IP review
- Inventorship/assignment decision
- External data-license approval
- Human semantic-equivalence review
- Calibration approval
- Production-release approval

Until those gates close, APUCS remains research-only and the visible POC uses the deterministic synonymity rubric/baseline path.

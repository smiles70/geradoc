# APUCS IDD v1.2 — Technical Closure Addendum

**Status**: Additive technical update for inventor/counsel review; not a patent application or legal opinion  
**Date**: August 19, 2026

## Purpose

Record technical changes made to close operational-stability risks identified in the v1.3 research implementation review.

## Implemented technical controls

### Calibration traceability

Every research metadata result now includes:

```text
algorithmVersion
calibrationProfileVersion
calibrationStatus
```

Current status remains:

```text
calibrationStatus: uncalibrated
calibrationProfileVersion: uncalibrated-default-v1
```

### Efficacy adjustment bound

Self-efficacy correction now has a maximum per-update adjustment. Demonstrated task success may affect the estimate; a complexity override alone is not treated as demonstrated comprehension.

### Candidate monitoring

Research metadata now records:

```text
candidateCount
acceptedCount
rejectedCount
adviceViolationCount
```

### REVIEW recovery

The document viewer now provides source inspection and return-to-documents actions when research metadata routes a result to REVIEW.

### Extraction error distinction

The POC distinguishes:

```text
PDF_PARSE_ERROR
EMPTY_EXTRACTION
REVIEW
```

rather than representing all extraction failures as generic completion or a single opaque failure.

## Residual technical limitations

- Advice classifier remains rule-based and lacks production monitoring infrastructure.
- Full extraction-pass availability/disagreement state machine remains open.
- OCR provider is not installed; PaddleOCR remains a benchmark/adapter recommendation.
- Audit chain remains a local research chain rather than a partitioned production audit service.
- Backend/model/glossary version governance is not yet productionized.
- Stuck-user/tier-transition monitoring is not yet implemented.

## Novelty/IP boundary

This addendum records engineering implementation only. It does not determine:

- Patentability
- Novelty
- Inventorship
- Ownership/assignment
- Freedom to operate
- Claim scope
- Legal status

Those decisions remain deferred to human counsel and inventor review.

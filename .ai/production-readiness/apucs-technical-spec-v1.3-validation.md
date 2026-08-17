# APUCS Technical Specification v1.3 Validation

## Capability, Demand, Self-Efficacy, and Agency-Override Review

**Review date**: August 16, 2026  
**Status**: Research implementation updated; production activation remains blocked  
**Compared against**: Supplied v1.3 specification, v1.2 validation report, current POC implementation

> This report validates engineering behavior and research-mode implementation. It is not legal, clinical, accessibility, patentability, or production certification.

---

## 1. v1.3 Changes Assessed

| Change | Assessment | Current status |
|---|---|---|
| Six-dimensional state with self-efficacy | Correct direction | Implemented in research estimator |
| Self-efficacy bias correction | Requires demonstrated-success telemetry | Implemented with adjustment log; not calibrated on real data |
| Capability output | Correct downstream abstraction | Implemented with configurable weights and calibration flag concept |
| Demand function | Correctly decomposes linguistic demand | Implemented as transparent heuristic/corpus proxy; not calibrated |
| Presentation load | Correctly separated from linguistic demand | Implemented as content/action count proxy |
| User-agency override | Correct safety improvement | Implemented; hard constraints still apply, stability gate bypassed |
| Evaluation additions | Appropriate | Tests added; real comprehension validation remains open |
| Task breakdown | Matches implementation needs | Implemented research subset; production work remains |

---

## 2. Corrections Applied

### 2.1 State estimator

The state is now six-dimensional:

```text
comprehension
self-efficacy
strain
load
progress
uncertainty
```

The estimator now returns:

- State values
- Epistemic variance
- Aleatoric variance
- Total variance
- Innovation values
- Capability score
- Stability score
- Self-efficacy adjustment log

### 2.2 Self-efficacy correction

The research implementation accepts:

```text
selfReportedEfficacy
 demonstratedSuccessRate
```

After a configured trailing window and gap threshold, the derived efficacy value moves toward demonstrated success and records an adjustment entry. The raw self-report remains available as input history.

This is a technical implementation, not evidence that the correction is behaviorally valid. Real interaction outcomes are still required.

### 2.3 Demand and presentation load

The implementation separates:

```text
demand(C) = linguistic/content difficulty
L(C)      = content volume and simultaneous action load
```

The research demand function exposes:

- Frequency penalty
- Surprisal proxy
- Sentence-length penalty
- Clause-embedding proxy
- Referential-distance proxy
- Genre penalty
- Calibration status

The implementation reports `calibrated: false` by default and does not treat heuristic weights as production-calibrated values.

### 2.4 User override

A valid explicit request for `SIMPLE`, `STANDARD`, or `DETAILED` bypasses the stability/hysteresis gate. It does not bypass hard constraints.

If hard constraints fail:

```text
user override → REVIEW
```

This preserves agency without allowing a user request to approve an unsafe or source-inconsistent candidate.

### 2.5 Version and metadata

The research candidate now identifies as:

```text
APUCS-v1.3-research
```

Research metadata includes:

- Capability
- Demand by level
- Presentation load by level
- Requested override level
- Whether the override was honored
- Existing anchor/provenance/audit data

---

## 3. Current Implementation Files

```text
poc/backend/src/services/interactionStateEstimator.js
poc/backend/src/services/demandFunction.js
poc/backend/src/services/presentationController.js
poc/backend/src/services/apucsSimplifierV1.js
poc/backend/src/services/v13Features.test.js
```

The visible POC baseline remains unchanged. APUCS remains shadow-only.

---

## 4. Validation Results

```text
Test files: 8 passed
Tests:      21 passed
Shadow report: regenerated successfully
Shadow corpus: 100 synthetic cases / 300 outputs
Legacy POC contract: preserved
APUCS mode: shadow-only
```

The technical tests cover:

- Six-dimensional state behavior
- Self-efficacy bias correction
- Capability calculation
- Demand and load separation
- User override honoring
- Hard-constraint protection during override
- Typed anchors
- Structured actions
- Advice boundary
- Hysteresis
- Audit-chain verification
- Upload, processing, persistence, and retrieval

---

## 5. Remaining Technical Limitations

The v1.3 research implementation is not a production implementation of all v1.3 capabilities.

### Still open in engineering

- Six-dimensional estimator calibration on real interaction data.
- Empirical fitting of `κ₁`, `κ₂`, `κ₃`.
- Empirical fitting of `w₁`–`w₆` for demand.
- Language-model-backed surprisal rather than the proxy implementation.
- Dependency parsing for true embedding depth.
- Coreference resolution for true referential distance.
- Capability-aware candidate optimization rather than metadata-only demand reporting.
- Spanish implementation.
- Domain profile loader.
- DOCX/HTML ingestion.
- Layout classification.
- Modality profiles.
- Renderers for TTS and large print.
- Production API integration of research metadata.

### Not technical closure items

- Human evaluation.
- Real older-adult comprehension validation.
- Inventorship and ownership.
- Patent and freedom-to-operate review.

---

## 6. Implementation Readiness Verdict

```text
v1.3 specification:          Valid research specification
v1.3 research code:          Updated and test-covered
v1.3 user-visible mode:      Not activated
v1.3 calibrated capability:  Not established
v1.3 production readiness:   Not ready
```

The v1.3 changes are correctly implemented as a research-mode upgrade. The explicit user-agency override is technically safe because it bypasses only the stability gate, not hard source-integrity constraints.

The next technical milestone is to turn demand/capability from a reported research signal into a calibrated candidate-selection input using approved outcome data, then implement the v1.2 generalization profiles separately.

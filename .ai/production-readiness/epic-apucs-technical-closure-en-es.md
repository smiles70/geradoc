# APUCS Technical Closure Portfolio — English and Spanish

**Portfolio ID**: APUCS-CLOSE-001  
**Status**: Ready for Development  
**Owner**: @Kmiles  
**Base**: APUCS v1.3, v1.3 validation, user journeys, BRD/FRD/PRD, Charter  
**Scope**: Technical and operational closure only; human/legal gates remain outside this portfolio

## Objective

Complete the production-shaped technical capabilities required for APUCS in English and Spanish while preserving:

- Protected anchors
- Source provenance
- Backend-authoritative presentation state
- User agency
- REVIEW safety behavior
- Legacy result compatibility
- APUCS shadow-only default until separately approved

## Portfolio dependency graph

```text
EPIC 1 Contract/Profile Foundation
        ↓
EPIC 2 Ingestion/Layout/Provenance
        ↓
EPIC 3 Candidate Backends and Selection
        ↓
EPIC 4 English/Spanish Profiles
        ↓
EPIC 5 State/Modality/Demand Calibration Infrastructure
        ↓
EPIC 6 Rendering, REVIEW, and API Integration
        ↓
EPIC 7 Operational Reliability and Observability
        ↓
EPIC 8 Technical Closure and Release Gate
```

---

# EPIC APUCS-001 — Contract and Schema-Driven Profile Foundation

**Priority**: P0  
**Depends on**: None

## User stories

### US-001.1 — Versioned anchor profile

As an engineer, I want domain and language anchor profiles loaded from versioned schema, so that adding a document type does not require rewriting downstream constraints.

Acceptance criteria:

- [ ] Profile schema validates.
- [ ] Profile includes domain, language, version, taxonomy hash, extraction strategy, and normalization strategy.
- [ ] Insurance, government, legal, and financial English profiles exist.
- [ ] Spanish profile structure exists without claiming complete Spanish quality.
- [ ] Audit records include profile version and taxonomy hash.

### US-001.2 — Versioned result contract

- [ ] Legacy `summary.simple/standard/detailed` remains available.
- [ ] `originalText`, `fullText`, `pageText`, `sourceReferences`, and `processingStatus` are optional/additive.
- [ ] Research metadata is optional.
- [ ] Contract compatibility tests pass.

### US-001.3 — Backend registry

- [ ] `SimplificationBackend` interface exists.
- [ ] Baseline, fixture, and APUCS research backends register through the same interface.
- [ ] Routing decision is logged.
- [ ] Validators do not contain backend-specific logic.

---

# EPIC APUCS-002 — Full Ingestion, Layout, and Provenance

**Priority**: P0  
**Depends on**: EPIC APUCS-001

## User stories

### US-002.1 — Multi-format ingestion

- [ ] Native PDF text extraction.
- [ ] Scanned PDF OCR adapter boundary.
- [ ] DOCX XML extraction.
- [ ] HTML DOM extraction.
- [ ] All formats produce the same proposition/anchor/page contract.

### US-002.2 — Layout classification

- [ ] Classify single-column, multi-column, form, table-heavy, and mixed layouts.
- [ ] Store layout class in processing metadata.
- [ ] Route multi-column documents through reading-order reconstruction.
- [ ] Route tables/forms through structure-aware extraction.

### US-002.3 — Page-level provenance

- [ ] Every page retains text.
- [ ] Every output sentence can map to source page/paragraph/line where available.
- [ ] Missing provenance routes to REVIEW or marks the output unavailable.
- [ ] Provenance is preserved in all language and rendering paths.

---

# EPIC APUCS-003 — Candidate Backends, Constraints, and Selection

**Priority**: P0  
**Depends on**: EPICS 001–002

## User stories

### US-003.1 — Controlled candidate generation

- [ ] COPY, REPHRASE, SPLIT, DEFINE, REORDER, LABEL operations are typed.
- [ ] DELETE, INFER, and unsafe MERGE are disabled for protected propositions.
- [ ] Backend confidence is recorded.
- [ ] Candidate source spans are retained.

### US-003.2 — Hard constraint validator

- [ ] Typed anchor equality.
- [ ] Structured action identity.
- [ ] Condition and negation preservation.
- [ ] Provenance coverage.
- [ ] Contradiction detection.
- [ ] Advice-boundary abstention/review.

### US-003.3 — Demand/capability selection

- [ ] Demand and presentation load are separate.
- [ ] Capability gap is distinct from semantic divergence.
- [ ] Hard constraints run before scoring.
- [ ] Candidate selector uses weighted objective.
- [ ] Uncalibrated weights cannot activate production thresholds.
- [ ] Safe source fallback exists.

---

# EPIC APUCS-004 — English and Spanish Technical Profiles

**Priority**: P0  
**Depends on**: EPICS 001–003

## User stories

### US-004.1 — Language detection

- [ ] Detect English/Spanish before extraction.
- [ ] Allow explicit user/document language override.
- [ ] Store detected language and confidence.
- [ ] Route unsupported language to a clear unsupported-language state.

### US-004.2 — English profile

- [ ] English dates, amounts, negation, conditions, entities, and obligations normalize.
- [ ] English advice classifier interface exists.
- [ ] English synthetic fixtures pass technical gates.

### US-004.3 — Spanish profile

- [ ] Spanish dates such as `15 de octubre de 2027` normalize to ISO.
- [ ] Spanish decimal/currency formats normalize.
- [ ] Spanish negations and conditions preserve polarity.
- [ ] Spanish entity and obligation profile exists.
- [ ] Spanish candidate backend is registered.
- [ ] Spanish metadata uses the same downstream contract.

---

# EPIC APUCS-005 — State, Modality, Demand, and Calibration Infrastructure

**Priority**: P1  
**Depends on**: EPICS 001–004

## User stories

### US-005.1 — Modality profiles

- [ ] Touch/desktop profile.
- [ ] Voice profile.
- [ ] Screen-reader/assistive-technology profile.
- [ ] Each profile registers event vocabulary and B mapping.
- [ ] State math remains modality-neutral.

### US-005.2 — Demand function

- [ ] Frequency term.
- [ ] Surprisal term.
- [ ] Sentence-length term.
- [ ] Embedding-depth term.
- [ ] Referential-distance term.
- [ ] Genre term.
- [ ] Explicit `calibrated` flag.

### US-005.3 — Calibration profiles

- [ ] Profile key is domain/language/modality.
- [ ] Nearest-profile initialization exists.
- [ ] Drift metrics are stored.
- [ ] No profile is labeled calibrated without outcome data.
- [ ] Profile configuration is versioned and audited.

---

# EPIC APUCS-006 — REVIEW, Rendering, and Frontend Integration

**Priority**: P0  
**Depends on**: EPICS 001–005

## User stories

### US-006.1 — Backend-authoritative presentation

- [ ] Backend returns approved presentation state.
- [ ] Frontend does not infer APUCS state.
- [ ] REVIEW renders no-guessing UI.
- [ ] User override bypasses stability only, never hard constraints.

### US-006.2 — Content/rendering separation

- [ ] Selected candidate is immutable after validation.
- [ ] Text renderer consumes validated content.
- [ ] Large-print renderer consumes validated content.
- [ ] TTS renderer consumes validated content.
- [ ] Renderers cannot change anchors or provenance.

### US-006.3 — Full document view

- [ ] Original view.
- [ ] Complete Simple view.
- [ ] Complete Standard view.
- [ ] Complete Detailed view.
- [ ] Full page navigation.
- [ ] Source-reference display.

---

# EPIC APUCS-007 — Operational Reliability and Observability

**Priority**: P0  
**Depends on**: EPICS 001–006

## User stories

### US-007.1 — Async job lifecycle

- [ ] Received, validating, extracting, simplifying, validating-output, complete, REVIEW, failed, dead-letter states.
- [ ] Durable job ID.
- [ ] Retry and idempotency.
- [ ] Timeout and dead-letter behavior.

### US-007.2 — Operational events

- [ ] Structured events for every processing stage.
- [ ] No document content or secrets in logs.
- [ ] Processing latency metrics.
- [ ] Anchor/review/advice rejection metrics.
- [ ] Language/domain/modality metrics.

### US-007.3 — Safety controls

- [ ] APUCS shadow-only default.
- [ ] Feature flag rollback.
- [ ] Baseline simplifier fallback.
- [ ] Audit-chain persistence.
- [ ] Health/readiness checks.

---

# EPIC APUCS-008 — Technical Closure and Release Gate

**Priority**: P0  
**Depends on**: EPICS 001–007

## User stories

### US-008.1 — Requirements traceability

- [ ] Every FRD technical requirement maps to a test.
- [ ] English/Spanish capability matrix is current.
- [ ] Unsupported-language behavior is documented.
- [ ] Full-document requirements are verified.

### US-008.2 — Technical regression gate

- [ ] Backend tests pass.
- [ ] Frontend build passes.
- [ ] Frontend lint passes.
- [ ] Contract validation passes.
- [ ] Clean/degraded corpus harness passes.
- [ ] Reproducibility digest matches.
- [ ] Performance thresholds are reported.

### US-008.3 — Process closeout

- [ ] Architecture updated.
- [ ] Runbook updated.
- [ ] Rollback updated.
- [ ] Current state updated.
- [ ] Nelson inventory updated.
- [ ] PR evidence updated.
- [ ] Technical closure report created.

---

## Technical Closure Gate

```text
[ ] English profile complete
[ ] Spanish profile complete
[ ] Multi-format ingestion complete
[ ] Layout classification complete
[ ] Provenance complete
[ ] Candidate backend registry complete
[ ] Hard constraints complete
[ ] Demand/capability selection complete
[ ] Modality profiles complete
[ ] Rendering separation complete
[ ] Calibration infrastructure complete
[ ] Async operations complete
[ ] Observability complete
[ ] Contract and regression tests complete
[ ] Process v9.5 closeout complete
```

Human, legal, patent, and comprehension-validation activities remain separate gates and are intentionally excluded from this technical closure portfolio.

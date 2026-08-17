# APUCS Technical Specification v1.2 Validation

## Generalization and Universality Upgrade Review

**Review date**: August 16, 2026  
**Status**: Conditionally valid research specification; v1.2 capabilities are not yet implemented  
**Compared against**: APUCS v1.2 supplied specification, v1.1 validation report, current POC branch, APUCS IDD v1.1, Process v9.5 artifacts

> This report is an engineering validation and capability assessment. It is not a patent opinion, legal opinion, accessibility certification, production sign-off, or claim-patentability analysis.

---

## 1. Executive Verdict

APUCS v1.2 is a meaningful architectural upgrade over v1.1. It improves generalization by introducing:

- Schema-driven anchor taxonomies.
- Pluggable candidate-generation backends.
- Multi-format ingestion.
- Layout classification.
- English and Spanish language profiles.
- Domain-conditioned advice classification.
- Modality-decoupled state estimation.
- Content/rendering separation.
- Calibration-transfer profiles and drift tracking.

The upgrade is **conceptually sound as a research roadmap**, but it is not an implemented capability upgrade in the current repository. The current implementation remains a single-language, rule-based, research-mode candidate with hardcoded anchor patterns and no production multi-format, modality, rendering, or calibration profile system.

### v1.2 readiness verdict

```text
Specification quality:       Strong with corrections
Research architecture:      Ready for staged implementation
Current implementation:     v1.1 core plus partial v1.2 contract preparation
English capability:         Research-only shadow mode
Spanish capability:         Not implemented
Multi-format capability:    Not implemented
Modality portability:       Specified, not implemented
Production activation:      Blocked by human/data/legal gates
```

---

## 2. What v1.2 Correctly Adds

### 2.1 Schema-driven anchor taxonomy

This is the correct direction for generalization. Anchor categories should be domain profiles rather than compile-time constants. The downstream constraints can remain stable while domain profiles define extraction and normalization behavior.

### 2.2 Pluggable candidate backends

The proposed interface correctly separates candidate generation from constraint validation and selection. That enables rule-based, vendor, and model-assisted backends without allowing backend-specific logic to bypass safety gates.

### 2.3 Multi-format ingestion and layout classification

Separating native text extraction, OCR, layout analysis, and proposition construction is architecturally correct. Layout classification is especially important because reading order, forms, tables, and multi-column documents have different extraction failure modes.

### 2.4 Language profiles

The English/Spanish boundary is appropriately explicit. Language-specific extraction and normalization should occur before downstream language-neutral anchor, action, provenance, and constraint logic.

### 2.5 Modality-decoupled state estimation

Keeping `x_t`, stability, and hysteresis semantics independent of modality while registering modality-specific event vocabularies and `B` mappings is a strong separation of concerns.

### 2.6 Content/rendering separation

Selecting validated content before rendering it as text, large print, or speech reduces the risk that a renderer changes source meaning. This is an important safety boundary.

### 2.7 Calibration transfer

Profile-based calibration and drift monitoring are more defensible than one global parameter set, provided nearest-profile initialization does not get described as calibration until real outcome data validates it.

---

## 3. Mathematical and Normative Corrections Required

### 3.1 The v1.1 `H = I` correction is still incomplete

The specification still says:

```text
H = Identity
```

while telemetry inputs include event counts, durations, reversals, completions, and user-selected levels. These are not automatically five-dimensional direct observations.

Required normative definition:

```text
raw telemetry → feature map g_modality,language,domain() → y_t ∈ R^5
```

Only after `g()` creates calibrated state-dimension observations may `H = I` be used. Otherwise define `H` explicitly for the observation vector actually produced.

### 3.2 Q/R initialization remains technically incorrect

The v1.2 text says `Q` and `R` initialize from empirical output spread on the synthetic corpus. Synthetic document output spread does not estimate interaction process noise or observation noise.

Correct staging:

1. Synthetic corpus: numerical/path testing only.
2. Instrumented test sessions: initial telemetry distributions.
3. Approved human interaction logs: estimate `Q`, `R`, and profile parameters.
4. Labeled outcomes: calibrate thresholds and measure drift.

### 3.3 Epistemic/aleatoric decomposition must use one convention

The specification describes `P_epi` as prediction covariance and `P_ale` as innovation residual variance. It must explicitly prevent double counting. Use either:

```text
P_epi = P_prediction
P_ale = PSD(EMA(innovation covariance) − H P_prediction Hᵀ)
```

or:

```text
P_epi = P_prediction
P_ale = adaptive measurement covariance R_t
```

The implementation must state which is authoritative and test positive semidefinite behavior.

### 3.4 JS remains incorrectly listed as a hard selection constraint

Section 7 says JS is a soft signal, but Section 8 still includes:

```text
JS(p_D, p_C) ≤ ε
```

as a selection constraint. This is inconsistent.

Recommended resolution:

- Hard constraints: typed anchor equality, structured action identity, provenance coverage, contradiction checks, advice-boundary safety.
- Soft objective: readability, presentation load, uncertainty, JS divergence.
- High JS: route to `REVIEW` or reduce confidence; never use JS alone to approve factual correctness.

### 3.5 Fixed enum and schema-driven taxonomy conflict

Section 2.2 still calls anchor types a “Fixed enum,” while Section 14 makes them schema-driven. Replace “Fixed enum” with:

```text
Core anchor categories with profile-extensible domain types
```

Require profile version and taxonomy hash in every audit record.

### 3.6 Exact action-set intersection is insufficient

`|T_D ∩ T_C|` is not safe when actions are strings. Action identity must compare structured fields:

```text
action_id
actor
verb
object
deadline
condition
modality
source_span
```

A candidate that preserves words but changes actor, deadline, or condition must fail.

### 3.7 Advice classifier needs abstention

The domain-conditioned advice classifier must support three outcomes:

```text
SOURCE_GROUNDED
ADVICE_LIKE
REVIEW / ABSTAIN
```

The `REVIEW` outcome is required for low classifier confidence. A binary decision without abstention can convert classifier uncertainty into unsafe output.

### 3.8 User override cannot authorize failed constraints

The `REVIEW` exit condition allowing a user to proceed at lower confidence must be limited to:

- Source text.
- Non-transformed extraction.
- Clearly labeled low-confidence display.
- Human-review request.

It must not display a candidate that failed anchor, action, provenance, contradiction, or advice constraints.

### 3.9 Content/rendering contract must preserve semantic metadata

The renderer must receive a validated object, not only text:

```json
{
  "selected_candidate": "...",
  "anchors": [],
  "provenance_map": [],
  "confidence": 0.0,
  "review_flags": [],
  "source_language": "en",
  "target_modality": "screen"
}
```

A TTS or large-print renderer must not be allowed to rephrase content. It may alter pacing, typography, or layout only.

### 3.10 Calibration transfer is initialization, not calibration

A nearest-profile configuration is a prior or initialization. It becomes calibrated only after the new profile is tested against its own outcome data. Drift thresholds, rollback, and profile deprecation rules must be defined.

---

## 4. Capability Matrix: v1.2 versus Current Repository

| v1.2 capability | Current repository | Status |
|---|---|---|
| Schema-driven anchor profiles | Typed anchor service has hardcoded patterns | Partial; loader not implemented |
| Domain-specific anchor normalization | Basic typed canonicalization exists | Partial |
| Pluggable candidate backend interface | Candidate is a direct module, no formal interface | Open |
| Backend routing by domain/quality/cost | Not implemented | Open |
| Native PDF text extraction | `pdf-parse` adapter exists | Partial |
| Scanned PDF OCR | Not validated | Open |
| DOCX native extraction | Not implemented | Open |
| HTML DOM extraction | Not implemented | Open |
| Layout class detection | Not implemented | Open |
| Table/form extraction pass | Not implemented | Open |
| English profile | Research-only rules and synthetic fixtures | Partial |
| Spanish profile | Not implemented | Open |
| Spanish normalization | Not implemented | Open |
| Spanish advice classifier | Not implemented | Open |
| Modality-specific `B` profiles | Not implemented | Open |
| Voice modality | Not implemented | Open |
| Screen-reader modality | Not implemented | Open |
| Content/rendering separation | Research metadata exists; render layer absent | Partial |
| TTS render contract | Not implemented | Open |
| Large-print render contract | UI requirements only | Open |
| Calibration profiles | Not implemented | Open |
| Calibration drift metrics | Not implemented | Open |
| Domain-conditioned advice classifier | Heuristic English classifier only | Partial |
| Review-state controller | Research controller exists | Partial; no full API/frontend state integration |
| Audit hash chain | Research service exists | Partial; production persistence/integration absent |
| Versioned research output metadata | Optional schema and candidate metadata exist | Partial |

---

## 5. Engineering Implementation Order

### Phase 1 — Contract and profile foundation

1. Create `anchorProfiles/{domain}/{language}.json`.
2. Add profile schema version and taxonomy hash.
3. Implement `SimplificationBackend` interface.
4. Implement backend registry and routing policy.
5. Extend audit records with profile, language, modality, layout, backend, and configuration hashes.
6. Add versioned research output validation.

### Phase 2 — Ingestion and layout

1. Detect native PDF text layers.
2. Add DOCX XML extraction.
3. Add HTML DOM extraction.
4. Add layout classifier.
5. Add table/form and multi-column extraction paths.
6. Preserve the same proposition graph contract downstream.

### Phase 3 — English/Spanish support

1. Add language detection with explicit user override.
2. Add English profile.
3. Add Spanish date, amount, negation, condition, and entity normalization.
4. Add Spanish candidate backend registration.
5. Add domain/language advice classifier datasets.
6. Add bilingual synthetic corpus and degraded-scan tests.

### Phase 4 — Modality and rendering

1. Define modality profiles and event vocabularies.
2. Register `B` mappings per modality.
3. Keep state estimator math modality-neutral.
4. Create validated content object.
5. Add screen, large-print, and TTS renderers.
6. Test that renderers cannot mutate validated content or provenance.

### Phase 5 — Calibration and evaluation

1. Create profile calibration records.
2. Add nearest-profile initialization.
3. Add drift calculations.
4. Define rollback/deprecation thresholds.
5. Run approved interaction studies.
6. Refit parameters using real outcome data.
7. Keep all profiles shadow-only until human and legal gates pass.

---

## 6. Process v9.5 Technical Gate

### Closed by v1.2 specification work

- Generalization architecture is defined.
- English/Spanish boundary is explicit.
- Domain and modality extension points are identified.
- Content/rendering safety boundary is stated.
- Calibration transfer risks are acknowledged.
- The implementation sequence is now ordered.

### Not closed by the specification

- Spanish implementation.
- DOCX/HTML ingestion.
- Layout classification.
- Pluggable backend registry.
- Advice classifier training and abstention.
- Modality profiles.
- Rendering layer.
- Calibration profiles and drift monitoring.
- Real/degraded data validation.

### Verdict

```text
v1.2 specification:        Research-ready with normative corrections
v1.2 implementation:       Not complete
English research mode:     Available
Spanish capability:        Not available
Generalized ingestion:     Not available
Production activation:     Blocked
```

---

## 7. Final Validation Conclusion

APUCS v1.2 is a valid architectural upgrade, not a completed implementation upgrade. It broadens the design in a coherent way, but the added capabilities must be treated as a staged technical roadmap.

Before v1.2 can be called technically complete, the repository must implement and test:

- Profile-driven taxonomies.
- Backend registry and routing.
- DOCX/HTML/multi-layout ingestion.
- English and Spanish normalization.
- Domain-conditioned advice classification with abstention.
- Modality-specific observation profiles.
- Content/rendering separation.
- Calibration transfer and drift monitoring.

Human evaluation, accessibility review, real-data calibration, inventorship, patentability, and freedom-to-operate remain separate non-code gates.

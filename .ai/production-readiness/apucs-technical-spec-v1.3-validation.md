# APUCS Technical Specification v1.3 Validation

## State, Demand, and Agency-Override Upgrade

**Review date**: August 16, 2026  
**Status**: Research implementation updated and test-covered; production activation remains blocked  
**Compared against**: Supplied APUCS v1.3 specification, v1.2 validation, current POC code, APUCS IDD v1.1

> This is an engineering validation report. It is not a legal opinion, patentability determination, clinical validation, accessibility certification, or production sign-off.

---

## 1. Executive Verdict

The v1.3 specification is a coherent upgrade that adds three important capabilities:

1. Separating comprehension from self-efficacy.
2. Correcting self-efficacy using demonstrated task outcomes.
3. Defining demand as a capability-relative function and honoring explicit user complexity requests.

The current repository has been updated with a research-mode implementation of these capabilities. The implementation is deliberately conservative:

- APUCS remains shadow-only.
- Demand weights report `calibrated: false`.
- The user override bypasses stability/hysteresis only.
- Hard anchor, action, provenance, contradiction, and advice constraints remain active.
- The user-visible baseline simplifier remains unchanged.

### Verdict

```text
v1.3 specification:          Research-valid with corrections
v1.3 research implementation: Implemented and test-covered
v1.3 calibrated capability:   Not established
v1.3 production capability:   Not approved
```

---

## 2. Capability Mapping

| v1.3 requirement | Implementation | Status |
|---|---|---|
| Six-dimensional state | `InteractionStateEstimator` includes comprehension, efficacy, strain, load, progress, uncertainty | Implemented research mode |
| Capability function | Weighted comprehension + efficacy − strain | Implemented with uncalibrated weights |
| Self-efficacy bias correction | Repeated self-report versus demonstrated success gap and adjustment log | Implemented; real-data validation open |
| Demand function | Frequency, surprisal proxy, length, embedding, referential distance, and genre terms | Implemented heuristic; calibration open |
| Presentation load | Content-unit and simultaneous-action count | Implemented proxy; calibration open |
| User override | Explicit target level bypasses stability gate | Implemented |
| Hard constraints during override | Failed constraints route to REVIEW | Implemented |
| Demand/capability optimization | Demand and capability reported in research metadata | Partial; full candidate optimization remains open |
| English language | Existing research path | Partial |
| Spanish language | Not implemented | Open |
| Real comprehension outcome data | Not available | Open |

---

## 3. Correctness Review

### 3.1 Self-efficacy is correctly separated

The state estimator now treats self-efficacy as an independent signal rather than deriving it from the user's selected complexity level. This is consistent with the specification's distinction between comprehension and confidence.

### 3.2 Bias correction is appropriately limited

The implementation only adjusts derived efficacy after a repeated gap between:

```text
selfReportedEfficacy
示 demonstratedSuccessRate
```

The raw self-report remains available through the adjustment log. This preserves auditability. The correction is not yet behaviorally calibrated.

### 3.3 Demand and load are separated

The implementation distinguishes:

```text
demand(C) = language/content difficulty
L(C)      = content volume and simultaneous action load
```

This avoids treating a short but cognitively dense sentence as equivalent to a long screen containing many decisions.

### 3.4 User override is safely bounded

The supplied v1.3 specification says explicit user requests bypass the stability gate. The implementation honors that behavior only when hard constraints pass.

```text
valid explicit request + hard constraints pass → requested level
valid explicit request + hard constraint failure → REVIEW
```

This is the correct safety interpretation. User agency must not authorize altered dates, amounts, conditions, actions, provenance, or unsupported advice.

---

## 4. Issues in the Supplied Specification Requiring Clarification

### 4.1 `H = I` still requires an observation map

Telemetry events are not automatically six-dimensional observations. The implementation needs an explicit mapping:

```text
raw telemetry → modality/domain/language feature map → y_t ∈ R^6
```

`H = I` is valid only after that mapping produces calibrated six-dimensional observations.

### 4.2 Q/R initialization from synthetic output remains invalid for calibration

Synthetic document output spread can test code and numerical behavior. It cannot calibrate human interaction process noise or observation noise. The specification should say “initial testing values,” not “calibration,” until approved interaction logs exist.

### 4.3 Demand weights are not defaults

The specification correctly says `w₁`–`w₆` require comprehension-outcome data. The implementation preserves this by reporting:

```text
calibrated: false
```

No absolute demand threshold should activate in production until weights are fitted and evaluated.

### 4.4 JS constraint conflict remains

Section 7 calls JS divergence a soft signal, while Section 8 still lists:

```text
JS(p_D, p_C) ≤ ε
```

as a constraint. The normative resolution should be:

- Hard: anchors, actions, provenance, contradictions, advice boundary.
- Soft: JS divergence, demand gap, load, and uncertainty.
- High JS: REVIEW/risk routing, not standalone factual approval.

### 4.5 Schema-driven taxonomy conflict remains

Section 2.2 says “Fixed enum,” while v1.2/v1.3 generalization requires profile-driven taxonomy. Replace “Fixed enum” with:

```text
Core anchor categories with profile-extensible domain types
```

### 4.6 Claim 8 needs hard-constraint language

The user override claim should explicitly state that the override bypasses only stability/hysteresis, not hard source-integrity constraints. Otherwise the claim language could be read more broadly than the safe implementation.

### 4.7 Age-differentiated weighting needs evidence references

The title and claims rely on a documented age-related processing-cost differential. The final disclosure should identify the specific cited publications, population, task, effect, and limitation supporting each differentiated term. A general assertion is not enough for reproducibility or enablement.

### 4.8 “Divergence between demand and capability” needs precise definition

The v1.3 claim language uses “divergence” for demand and capability while the specification also uses JS semantic divergence. These should be named separately:

```text
capability_gap(C) = max(0, demand(C) − capability(x_t))
semantic_divergence(C) = JS(p_D, p_C)
```

This avoids ambiguity in implementation and claim drafting.

---

## 5. Tests and Verification

Current verification after v1.3 implementation:

```text
Test files: 8 passed
Tests:      21 passed
Shadow report: regenerated successfully
User-visible baseline: unchanged
APUCS mode: shadow-only
```

The v1.3 tests cover:

- Six-dimensional state
- Self-efficacy correction
- Capability output
- Demand function
- Presentation load
- User override honoring
- Hard-constraint protection during override
- Existing upload, processing, persistence, audit, and technical gates

---

## 6. Remaining Technical Work

The v1.3 research implementation is complete enough for controlled technical evaluation. The following remain before production-grade implementation:

- Calibrate `κ₁`, `κ₂`, `κ₃` using approved comprehension outcomes.
- Calibrate demand weights `w₁`–`w₆`.
- Replace surprisal proxy with a validated language-model score.
- Implement true dependency/embed-depth and coreference distance features.
- Add demand/capability to actual candidate optimization rather than research metadata only.
- Implement Spanish profiles and bilingual advice classification.
- Implement schema-driven domain profiles from configuration.
- Implement full provenance spans and output-contract integration.
- Implement TTS and large-print renderers.
- Add demand and override metrics to operational monitoring.

---

## 7. Final Status

The v1.3 upgrade has been applied as a **research-mode capability update**. The specification is not yet a production sign-off because calibration, real-document validation, operational integration, and non-code approval gates remain open.

The safest current behavior is:

```text
APUCS candidate → shadow evaluation and metadata
baseline simplifier → user-visible output
explicit user request → honored when hard constraints pass
failed hard constraint → REVIEW
uncalibrated demand → reported, not used as production threshold
```

# APUCS Technical Specification v1.1 Validation Report

**Review status**: Conditionally valid research specification  
**Review date**: August 16, 2026  
**Compared against**: APUCS IDD v1.1, current POC implementation, Process v9.5 evidence, synthetic corpus, shadow report  
**Verdict**: Suitable as a research/implementation planning specification after the corrections below; not yet a production engineering sign-off or patent claim set.

---

## 1. Executive Verdict

The supplied specification is substantially coherent and improves the v1.0 disclosure. It correctly establishes:

- Source-grounded proposition and anchor representations.
- A separation between hard safety constraints and soft divergence/readability signals.
- Uncertainty-aware state estimation.
- Hysteresis to reduce presentation-state oscillation.
- A formal `REVIEW` state.
- Provenance and reproducibility requirements.
- A first-class advice-boundary safety concern.
- Evaluation metrics that separate readability from meaning preservation.

However, the specification is **not implementation-ready without qualification**. Four issues must be corrected before engineering treats it as normative:

1. The uncertainty decomposition currently risks double-counting covariance.
2. The state-observation vector and event-to-state mapping are under-specified.
3. The divergence section calls JS a soft signal, while the selection constraints make it a hard constraint.
4. The output contract is richer than the current API and needs a versioned compatibility plan.

After these corrections, the specification is appropriate for a research candidate behind a feature flag. It is not sufficient to authorize production activation, claim calibration, or patentability.

---

## 2. Validation Matrix

| Area | Result | Finding |
|---|---|---|
| Pipeline ordering | Pass with correction | Hard constraints, selection, and presentation-state transition need explicit two-phase ordering |
| Proposition graph | Pass | Representation is coherent; extraction and graph serialization remain to be implemented |
| Protected anchors | Pass with correction | Equality must be typed and canonicalized rather than raw-string-only |
| Ensemble extraction | Pass as research design | Agreement/disagreement routing is implementable; confidence calibration remains open |
| State estimator | Pass with correction | F/B/H structure is plausible, but observation mapping and covariance semantics need precision |
| Epistemic/aleatoric split | Needs correction | Current formula can double-count prediction and innovation uncertainty |
| Hysteresis | Pass | Correctly framed as known generally and not claimed in isolation |
| Candidate operations | Pass | Protected proposition restrictions are clear |
| Advice constraint | Pass as architecture; open as implementation | Classifier needs labeled data, abstention, and false-negative evaluation |
| Divergence scoring | Needs correction | Soft-signal language conflicts with hard `JS ≤ ε` selection constraint |
| Candidate objective | Pass after correction | Weights, normalization, and fallback behavior require calibration/configuration |
| Review state | Pass with correction | Explicit user override must never approve a failed candidate silently |
| Output contract | Needs compatibility layer | Current POC returns legacy summary strings; v1.1 requires richer research metadata |
| Audit chain | Pass as design | Canonical serialization, key management, and replay procedure remain open |
| Evaluation metrics | Pass with correction | Action identity and provenance counting need typed data, not string overlap alone |
| USPTO/IP posture | Pass | Correctly preserves counsel-open status and avoids novelty claims |

---

## 3. Required Mathematical Corrections

### 3.1 Define the observation vector

The state vector is five-dimensional:

\[
x_t=[c_t,r_t,l_t,q_t,u_t]^T
\]

Therefore `y_t` must also be defined as a five-dimensional continuous observation vector, or a feature mapping must be specified:

\[
y_t = g(\text{telemetry}_t)
\]

Discrete events should not be passed directly into `H=I`. Define an event feature map first:

```text
help_request       → [Δc, Δr, Δl, Δq, Δu]
nav_reversal       → [Δc, Δr, Δl, Δq, Δu]
action_completion  → [Δc, Δr, Δl, Δq, Δu]
error              → [Δc, Δr, Δl, Δq, Δu]
```

Then `B` can map one-hot event vectors to state effects, while `H=I` applies only after `g()` has produced calibrated state-dimension observations.

### 3.2 Correct uncertainty decomposition

The supplied specification defines:

\[
P_t=P_t^{epi}+P_t^{ale}
\]

but then describes `P_t^epi` as the prediction term and `P_t^ale` as residual variance. This can double-count the same uncertainty unless the components are defined carefully.

Use one of these explicit conventions:

**Recommended research convention**:

\[
P_t^{epi}=P_t^-
\]

\[
\Sigma_{innovation,t}=(y_t-H\hat{x}_t^-)(y_t-H\hat{x}_t^-)^T
\]

\[
P_t^{ale}=PSD\left(\operatorname{EMA}(\Sigma_{innovation,t})-HP_t^-H^T\right)
\]

where `PSD()` projects a matrix to the nearest positive-semidefinite matrix. Then:

\[
P_t=P_t^{epi}+P_t^{ale}
\]

Alternatively, treat adaptive measurement noise as aleatoric uncertainty:

\[
P_t^{ale}=R_t
\]

and do not also add residual covariance unless the relationship is formally derived.

The implementation must choose one convention, version it, and test positive semidefiniteness.

### 3.3 Derive scalar `u_t`

The state vector contains scalar `u_t`, while `P_t` is a matrix. Define the relationship, for example:

\[
u_t = \operatorname{clip}\left(\frac{\operatorname{tr}(P_t)}{\operatorname{tr}(P_{max})},0,1\right)
\]

Otherwise `u_t` is redundant and can drift independently from the covariance it is intended to summarize.

### 3.4 Normalize the stability score

The formula:

\[
S_t=\exp(-\operatorname{tr}(WP_t))\exp(-\lambda r_t)
\]

is bounded in `(0,1]` when `W`, `P_t`, `λ`, and `r_t` are nonnegative. The implementation must enforce:

- `W` diagonal and nonnegative.
- `P_t` symmetric positive semidefinite.
- `λ ≥ 0`.
- `r_t ∈ [0,1]`.
- Dimension normalization so larger state dimensions do not automatically lower stability.

### 3.5 Correct Q/R calibration claim

Synthetic document output spread cannot calibrate interaction process noise `Q` or observation noise `R`. It can help test extraction output variation, but not human telemetry dynamics.

Use staged language:

1. Synthetic and fixture data: verify code paths and numerical stability.
2. Instrumented internal testing: estimate initial telemetry distributions.
3. Approved pilot interaction logs: fit and validate `Q`, `R`, `W`, `λ`, and hysteresis thresholds.
4. Human evaluation: compare state transitions with task outcomes.

Do not call `Q`, `R`, or thresholds calibrated until stages 2–4 occur.

---

## 4. Constraint and Candidate Corrections

### 4.1 Typed anchor equality

Raw-string equality is insufficient. Use type-specific canonical forms:

- Dates → ISO date plus timezone/locale policy.
- Amounts → decimal numeric value plus currency.
- Percentages → normalized decimal value.
- Entities → canonical entity span with alias policy.
- Negations → polarity relation attached to proposition.
- Conditions → predicate and scope, not merely phrase overlap.
- Obligations → action, actor, modality, and condition.

A candidate fails if canonical meaning changes, even when surface text differs acceptably.

### 4.2 Action recall must use action identity

This expression is too weak for a production gate:

\[
|T_D\cap T_C|/|T_D|
\]

when `T_D` and `T_C` are raw strings. Define a normalized action record:

```json
{
  "action_id": "contact-bank",
  "actor": "user",
  "verb": "contact",
  "object": "bank",
  "deadline": "2027-03-31",
  "condition": "charge not recognized",
  "source_span": {}
}
```

Then compare action identity, actor, deadline, modality, and condition separately.

### 4.3 Resolve JS soft-versus-hard conflict

Section 7 correctly states that Jensen-Shannon divergence is a soft screening signal. Section 8 currently places:

```text
JS(p_D, p_C) ≤ ε
```

inside the hard selection constraints. Choose one consistent rule.

**Recommended rule**:

- Anchor, action, provenance, contradiction, and advice constraints are hard.
- JS divergence contributes to the candidate objective.
- A high JS value can route to `REVIEW`, but it cannot approve or reject factual correctness by itself.

If a formal upper bound is retained, label it a risk-routing threshold, not a factuality gate.

### 4.4 Advice classifier must support abstention

A binary classifier should not be allowed to make an unreviewed safety decision at uncertain confidence. Define:

```text
confidence ≥ τ_advice_safe  → source-grounded candidate may continue
confidence ≤ τ_advice_unsafe → candidate rejected
otherwise                    → REVIEW
```

Measure false negatives separately. A false negative can be more serious than a false positive because it may expose unsupported advice.

### 4.5 Candidate-selection ordering

Use this normative order:

```text
1. Generate candidates
2. Apply hard anchor/action/provenance/contradiction/advice checks
3. Score remaining candidates for readability, load, uncertainty, and divergence
4. Select lowest-cost eligible candidate
5. Apply stability/hysteresis to the presentation-state transition
6. If transition is not eligible, retain current state or enter REVIEW
7. Write audit record
```

The selected text candidate and the presentation-state transition are related but distinct decisions.

---

## 5. Review State and User Override Correction

The specification correctly defines `REVIEW`, but this line needs a safety clarification:

```text
explicit user request to proceed at lower confidence
```

An explicit request may permit the system to show:

- The original source text.
- An uncertainty warning.
- A non-transformed extraction.
- A human-review request.

It must not authorize the system to display a candidate that failed anchor, contradiction, provenance, or advice constraints. User agency does not override source-integrity constraints.

---

## 6. Provenance and Output Contract Correction

The v1.1 output contract is richer than the current POC contract. Do not silently replace the existing contract used by the mocked demo.

Use versioned compatibility:

```text
POC v1 legacy:
summary.simple / summary.standard / summary.detailed

Research v2:
summary levels plus researchMetadata:
- preservedAnchors
- actionItems
- confidence
- sourceReferences
- provenanceMap
- reviewFlags
- algorithmVersion
- presentationState
```

The legacy UI can continue consuming the summary fields. Research metadata can remain shadow-only until the frontend and API contract are ready.

Provenance coverage must be measured against claim or sentence records with resolvable source spans. A non-null array is not sufficient evidence of provenance correctness.

---

## 7. Audit-Log Correction

The candidate hash should remain deterministic and exclude volatile timestamps:

\[
H(documentHash, extractionConfigHash, modelVersion, selectorConfigHash, randomSeed)
\]

The chain record may include timestamp, but verification should separately check:

1. Candidate reproducibility from canonical inputs.
2. Chain integrity from `prev_hash`.
3. Record ordering.
4. Configuration and model versions.

Use canonical JSON serialization, explicit field ordering, and a documented hash algorithm.

---

## 8. Current Repository Alignment

| Specification element | Current repository status |
|---|---|
| Anchor extraction | Research evaluator supports basic typed test anchors; production extraction not complete |
| Interaction estimator | Low-dimensional bounded estimator exists; full covariance calibration is not complete |
| APUCS candidate | Research-only candidate exists; user-visible baseline remains active |
| Hysteresis | Specified in v1.1; not yet implemented as a presentation-state controller |
| Epistemic/aleatoric split | Specified in v1.1; not yet implemented with the corrected covariance convention |
| Advice classifier | Not implemented |
| Proposition-level divergence | Not implemented; current JS is token-distribution screening |
| Provenance | Research candidate metadata exists; full source spans are not in the API contract |
| Review state | Specified; frontend/backend state machine not complete |
| Chained audit log | Specified; not implemented |
| Human evaluation | Protocol exists; evaluation not conducted |
| Legal/IP review | Open |

---

## 9. Revised Implementation Readiness Verdict

**Verdict**: `RESEARCH_IMPLEMENTATION_READY_WITH_CORRECTIONS`

The specification is ready to guide the next research implementation after the mathematical corrections in this report are incorporated. It is not ready for:

- Production activation.
- User-visible replacement of the baseline simplifier.
- A claim of calibrated state estimation.
- A claim of factuality or legal/medical safety.
- A patentability or freedom-to-operate conclusion.

### Required before user-visible activation

- Correct covariance decomposition.
- Typed anchor canonicalization.
- Normalized action identity.
- Advice classifier with abstention/review.
- Proposition-level or validated semantic checks.
- Full provenance spans.
- Implemented REVIEW state.
- Human evaluation.
- Real/degraded corpus evaluation.
- Counsel review and inventorship determination.

---

## 10. Recommended Specification Edits

Before treating v1.1 as normative, make these exact edits:

1. Add an observation-feature map before `H=I`.
2. Replace the covariance decomposition with one non-double-counting convention.
3. Define `u_t` from covariance or remove it from the state vector.
4. Remove `JS ≤ ε` from hard constraints, or rename it as a risk-routing threshold.
5. Define typed anchor canonicalization.
6. Define normalized action identities.
7. Add advice-classifier abstention behavior.
8. Clarify that user override cannot approve failed source-integrity constraints.
9. Add legacy/research API contract versioning.
10. Separate deterministic candidate hash from timestamped audit-chain hash.

After these edits, the specification should be re-reviewed by engineering, accessibility/product, security, and patent counsel before implementation is promoted beyond research mode.

---

## 11. Technical Closure Update

The following corrections are now implemented in the research branch:

- Typed anchor canonicalization and reconciliation.
- Structured action identity and recall.
- Epistemic/aleatoric variance tracking in the bounded estimator.
- Presentation controller with dual-threshold hysteresis and REVIEW routing.
- Advice-boundary validation with safe rejection behavior.
- Hash-chained audit records with verification.
- Versioned `researchMetadata` output contract while preserving legacy summary fields.
- Technical gate tests covering the new components.

Current verification:

```text
Test files: 7 passed
Tests:      17 passed
Shadow corpus: 100 synthetic cases / 300 outputs
Minimum anchor recall: 1.0
Minimum action recall: 1.0
Minimum provenance coverage: 1.0
Contradictions: 0
Technical shadow gate: PASS
```

The remaining non-code gates are human evaluation, real/degraded document validation, parameter calibration on approved interaction data, inventorship/ownership determination, and patent/FTO counsel review.

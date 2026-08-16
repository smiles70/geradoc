# NONI-Derived Document Simplification Research Memo

**Status**: Research proposal; not an implemented or validated algorithm  
**Date**: August 16, 2026  
**Scope**: ClarityDoc document simplification and presentation control  
**Source Inputs**: NONI technical patterns, IDD supplied by Kim Miles, ClarityDoc BRD/FRD/PRD, Process v9.5 research

---

## 1. Executive Decision

The current `plainLanguageSimplifier.js` implementation is a temporary placeholder that normalizes whitespace and truncates text. It must not be represented as a simplification engine.

The proposed research direction is an **Anchor-Preserving, Uncertainty-Constrained Simplification (APUCS)** pipeline. APUCS adapts documented NONI/IDD concepts to document transformation:

1. Represent a document as source-grounded propositions and extracted anchors.
2. Estimate a non-clinical interaction/comprehension state with uncertainty.
3. Generate candidate transformations using controlled operations.
4. Reject candidates that lose required dates, amounts, obligations, negations, entities, or provenance.
5. Select the least complex candidate that satisfies a semantic-divergence and confidence constraint.
6. Return a previewable, reversible result with confidence and source references.

**Important**: This is a proposed research architecture, not a claim of patentability, novelty, freedom to operate, or legal clearance.

---

## 2. Evidence and Source Interpretation

### 2.1 IDD concepts observed

The supplied IDD, titled *Computer-Controlled Regulation of Graphical User Interface State Transitions Using Uncertainty-Constrained State Estimation*, describes:

- Interaction telemetry collected by a processor.
- A latent interaction state and uncertainty representation.
- A covariance-matrix-based stability metric.
- Selection of a next interface state from allowable states under a stability constraint.
- Constrained optimization for state selection.
- An information-theoretic divergence threshold limiting transitions.

### 2.2 NONI intake concepts observed

The processed NONI material describes:

- Backend authority over interface state transitions.
- Signal-only subsystem outputs and centralized decisions.
- Mastery, strain, and load signals normalized to `[0, 1]`.
- Kalman-like recursive estimation with covariance tracking.
- Progressive disclosure and stability thresholds.
- Preview, confirmation, and undo safeguards.

### 2.3 Known source defects and limitations

The intake includes illustrative code rather than a complete production specification. For example, the sample covariance update contains a `covification` typo and does not define observation, transition, noise, initialization, or calibration matrices. The IDD defines claim-level concepts but does not provide enough implementation detail to reproduce a validated commercial algorithm.

These materials are useful design inputs but are not independently verified patent claims, granted-claim scope, or a complete mathematical specification.

---

## 3. Domain Boundary

The system must not infer medical diagnoses, cognitive impairment, capacity, or legal competence. APUCS should estimate **interaction support state**, not a person's medical or cognitive condition.

Use terms such as:

- `comprehension_signal`: product interaction signal
- `interaction_strain`: observed interaction difficulty signal
- `presentation_load`: estimated presentation burden
- `state_uncertainty`: uncertainty in the product estimate

Do not label a user as confused, impaired, incapable, or clinically at risk based only on telemetry.

---

## 4. Proposed APUCS Model

### 4.1 Document representation

Let the source document be segmented into ordered units:

\[
D = (s_1, s_2, \ldots, s_n)
\]

Extract a source-grounded proposition graph:

\[
G_D = (V, E, A, R)
\]

where:

- `V` = propositions or clauses.
- `E` = discourse and dependency edges.
- `A` = protected anchors.
- `R` = provenance references to page, paragraph, line, or bounding box.

Protected anchors include:

\[
A = \{\text{dates, amounts, deadlines, entities, obligations, negations, conditions, contacts, identifiers}\}
\]

Each anchor has a normalized value, source span, type, and extraction confidence.

### 4.2 Controlled candidate operations

A candidate simplification is generated through a sequence of controlled operations:

\[
O = \{\text{COPY}, \text{REPHRASE}, \text{SPLIT}, \text{DEFINE}, \text{REORDER}, \text{LABEL}\}
\]

For the first implementation, `DELETE`, `INFER`, and `MERGE` should be disabled for protected propositions. This reduces the risk of removing obligations or introducing unsupported meaning.

A candidate is:

\[
C_j = T_{O_j}(G_D)
\]

with every generated sentence linked back to one or more source nodes.

### 4.3 Interaction support state

Define the latent state vector:

\[
x_t = [c_t, r_t, l_t, q_t, u_t]^T
\]

where:

- `c_t` = comprehension signal.
- `r_t` = interaction strain signal.
- `l_t` = presentation load.
- `q_t` = task progress/mastery signal.
- `u_t` = uncertainty penalty.

All signals are normalized to `[0, 1]`. These are product signals, not clinical measurements.

### 4.4 Recursive uncertainty update

Given a telemetry observation vector `y_t`, use a Kalman-like model only after calibration:

Prediction:

\[
\hat{x}_t^- = F\hat{x}_{t-1} + B a_t
\]

\[
P_t^- = FP_{t-1}F^T + Q
\]

Measurement update:

\[
K_t = P_t^-H^T(HP_t^-H^T + R)^{-1}
\]

\[
\hat{x}_t = \hat{x}_t^- + K_t(y_t - H\hat{x}_t^-)
\]

\[
P_t = (I - K_tH)P_t^-
\]

where:

- `F` = transition matrix.
- `B` = action influence matrix.
- `a_t` = user action signal.
- `H` = observation matrix.
- `Q` = process-noise covariance.
- `R` = measurement-noise covariance.
- `P_t` = uncertainty covariance.

The POC must begin with a transparent baseline, such as an EWMA and fixed variance, before claiming Kalman performance.

### 4.5 Stability metric

Define a bounded stability score:

\[
S_t = \exp(-\operatorname{tr}(W P_t)) \cdot \exp(-\lambda r_t)\
\]

where `W` weights uncertainty dimensions and `λ` weights interaction strain. `S_t` lies in `(0, 1]`.

A transition is eligible only when:

\[
S_t \geq \tau_S
\]

and the candidate's estimated presentation load is within the user's current support budget:

\[
L(C_j) \leq L_{max}(\hat{x}_t)
\]

The thresholds must be empirically calibrated and must not be hard-coded as evidence of user ability.

### 4.6 Anchor preservation constraint

For every protected anchor `a`:

\[
\operatorname{value}_{C_j}(a) = \operatorname{value}_{D}(a)
\]

or the candidate is rejected and routed to review.

For extracted anchors with uncertainty, require:

\[
\operatorname{confidence}_{C_j}(a) \geq \tau_A
\]

and preserve the original source reference. A low-confidence value must be presented as uncertain; it must not be silently corrected or invented.

### 4.7 Information-divergence constraint

Represent source and candidate proposition distributions as `p_D` and `p_C`. Candidate selection must satisfy:

\[
D_{KL}(p_D \parallel p_C) \leq \epsilon
\]

Because KL divergence is asymmetric and can be undefined for zero probabilities, the implementation should evaluate a smoothed or symmetric alternative during research, such as Jensen–Shannon divergence:

\[
JS(p_D,p_C) = \frac{1}{2}D_{KL}(p_D\parallel m) + \frac{1}{2}D_{KL}(p_C\parallel m)
\]

where:

\[
m = \frac{1}{2}(p_D+p_C)
\]

The selected divergence metric must be documented and validated against human judgments. It must not be treated as proof of factual correctness by itself.

### 4.8 Candidate selection objective

Select the candidate minimizing a weighted cost:

\[
C^* = \arg\min_{C_j \in \mathcal{C}}
\left(
\alpha R(C_j) + \beta L(C_j) + \gamma D(C_j) + \delta U(C_j)
\right)
\]

subject to:

\[
\operatorname{AnchorRecall}(C_j) = 1
\]

\[
JS(p_D,p_{C_j}) \leq \epsilon
\]

\[
S_t \geq \tau_S
\]

\[
\operatorname{ProvenanceCoverage}(C_j) \geq \tau_P
\]

where:

- `R` = readability difficulty.
- `L` = presentation load.
- `D` = semantic divergence.
- `U` = uncertainty and unsupported-claim penalty.
- `α, β, γ, δ` = calibrated weights.
- `τ_P` = required provenance coverage.

This is the proposed ClarityDoc-specific combination of document anchors, uncertainty-aware support state, provenance, and constrained candidate selection. It should be described as a research hypothesis until benchmarked and reviewed by counsel.

---

## 5. Why This Is Different from the Current Placeholder

The current implementation does this:

```js
simple: cleaned.slice(0, 500)
standard: cleaned.slice(0, 1200)
detailed: cleaned.slice(0, 2500)
```

That is truncation, not simplification. It can cut sentences, omit obligations, remove negations, and destroy provenance.

APUCS would instead:

1. Preserve source anchors.
2. Preserve all required actions and deadlines.
3. Use controlled transformation operators.
4. Measure readability separately from meaning preservation.
5. Track uncertainty and source coverage.
6. Select a presentation level under explicit constraints.
7. Allow preview, user confirmation, and undo.

---

## 6. Evaluation Plan

### 6.1 Dataset

Build a de-identified corpus of at least 100 documents across the MVP classes:

- Insurance.
- Financial.
- Government.
- Legal.

Annotate:

- Protected anchors.
- Required actions.
- Negations and conditions.
- Source spans.
- Human plain-language references.
- Document complexity labels.

### 6.2 Automatic metrics

Report separate metrics; do not collapse quality into one score:

- Anchor recall: target 100% for deadlines, amounts, obligations, and negations.
- Provenance coverage: target ≥ 95% initially.
- Readability: FKGL and separate sentence/word complexity metrics.
- Semantic preservation: entailment and contradiction checks.
- Divergence: JS/KL-style representation distance.
- Fluency: grammar and human review.
- Action recall and precision.
- Hallucinated-claim rate: target 0 for release candidates.

Research indicates that simplicity and meaning preservation can conflict and that common single metrics do not capture both reliably. Human evaluation remains required.

### 6.3 Human evaluation

Use a blinded rubric with separate 1–5 scores for:

1. Meaning preservation.
2. Simplicity.
3. Fluency.
4. Actionability.
5. Trust/provenance clarity.

Include senior participants only with appropriate consent and research safeguards. Do not infer medical or cognitive status from participation.

### 6.4 POC acceptance gate

Do not replace the placeholder until the candidate algorithm meets an agreed gate, for example:

- 100% protected-anchor recall on the test set.
- 0 unsupported dates, amounts, deadlines, or obligations.
- ≥ 95% provenance coverage.
- Human meaning-preservation median ≥ 4/5.
- Human simplicity median ≥ 4/5.
- No critical contradiction or negation errors.
- Reproducible output for fixed input, model, and configuration.
- Legal/IP review completed or explicit written approval to continue as research-only.

---

## 7. IP, Patent, and Legal Boundary

The IDD contains claim language involving covariance-based stability, constrained state transitions, optimization, and divergence thresholds. The supplied document may represent an invention disclosure, but this memo does not determine ownership, claim scope, patent status, inventorship, or freedom to operate.

Before commercial implementation:

1. Obtain the actual filing/status information from the inventor or counsel.
2. Determine whether any claims cover document simplification, candidate generation, or adaptive presentation.
3. Identify which concepts are existing public techniques versus protected combinations.
4. Record an inventorship and assignment decision.
5. Obtain a written legal opinion or clearance strategy.
6. Keep the algorithm behind a feature flag until review is complete.

Do not publish a patentability claim or label APUCS as a patent without counsel.

---

## 8. Implementation Recommendation

Do not implement the full algorithm in the current POC yet. First create a research package:

- `poc/research/apucs-spec.md` — this mathematical specification.
- `poc/research/apucs-evaluation.md` — dataset, metrics, rubric, and gates.
- `poc/backend/src/services/plainLanguageSimplifier.js` — retain as an explicit placeholder until the gate is approved.
- `poc/backend/src/services/simplifierAdapter.js` — future interface for baseline, vendor, and APUCS implementations.

The first safe implementation should be a **shadow evaluator** that scores candidate outputs without changing user-visible content. This lets the team compare the baseline, vendor, and proposed algorithm while protecting users from unvalidated transformations.

---

## 9. Research Sources

- Kim Miles, *Invention Disclosure Document: Computer-Controlled Regulation of Graphical User Interface State Transitions Using Uncertainty-Constrained State Estimation* (supplied DOCX; source material, not independently verified patent scope).
- `.ai/intake/noni-technical-patterns.md`.
- `.ai/intake/noni-ui-ux-design.md`.
- Cripwell, Legrand, Gardent, *Evaluating Document Simplification: On the Importance of Separately Assessing Simplicity and Meaning Preservation*, ACL 2024: https://aclanthology.org/2024.readi-1.1/
- Scialom et al., *Evaluating Factuality in Text Simplification*, ACL 2022: https://aclanthology.org/2022.acl-long.506/
- Alva-Manchego et al., *Document-Level Planning for Text Simplification*, EACL 2023: https://aclanthology.org/2023.eacl-main.70/
- W3C WAI, *Use Clear and Understandable Content*: https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/
- W3C WAI, *Older Users and Web Accessibility*: https://www.w3.org/WAI/older-users/

---

## 10. Status

**Decision**: Pause D2 implementation until the simplification research direction, IP boundary, evaluation gates, and baseline-versus-proposed comparison are documented.

**Current POC status**: Pipeline wiring is complete enough to support a shadow evaluator; production simplification is not ready.

**Next session**: Create the research specification and evaluator interface, then implement tests against synthetic documents before changing user-visible simplification behavior.

# APUCS Invention Disclosure Document — v1.1

## Gap-Closure Audit, Revised Mathematical Specification, and Expanded Novelty Analysis

**Status**: Research disclosure update for inventor and patent counsel review — **not a patent application, legal opinion, patentability determination, freedom-to-operate opinion, or engineering sign-off**.  
**Base document**: APUCS IDD v1.0, August 16, 2026  
**Revision**: v1.1, August 16, 2026  
**Change type**: Additive upgrade; unresolved evidence, calibration, human, and counsel items remain open.  
**Application owner**: @Kmiles  
**Inventorship**: Open; must be determined from dated human conception contributions.

> This revision upgrades v1.0 from *specified* to *specified-with-a-closure-path*. It does not upgrade unproven items to proven items.

---

## 1. Revision Summary

Version 1.1 adds:

- A concrete low-dimensional state-estimator starting structure.
- Explicit epistemic/aleatoric uncertainty decomposition.
- Dual-threshold stability hysteresis.
- Deterministic, tamper-evident decision reproducibility.
- Operational definitions for claim-drafting terms.
- Ensemble cross-verification of protected anchors.
- A first-class `REVIEW` presentation state.
- Advice-language rejection as a safety constraint.
- Degraded-scan evaluation metrics.
- Expanded prior-art search leads and claim-differentiation hypotheses.
- Inventorship contribution log and evidence requirements.
- Updated USPTO criteria mapping.

The v1.1 additions narrow the proposed claim scope toward the **joint combination** of source-grounded anchor preservation, uncertainty-aware presentation control, and constrained transformation. They do not claim that hysteresis, cognitive-load adaptation, ensemble extraction, hash chains, or text simplification are individually novel.

---

## 2. Gap-Closure Audit

| # | Gap | v1.1 disposition | Residual open item |
|---:|---|---|---|
| 1 | F, B, H, Q, R undefined | Partially closed with a concrete low-dimensional linear-Gaussian starting model | Fit parameters on real interaction logs |
| 2 | Stability weights and threshold unspecified | Partially closed with offline calibration and online hysteresis protocol | Requires labeled outcome data |
| 3 | Divergence can miss a flipped fact | Closed as a design rule; anchor diff is a hard gate independent of divergence | Implementation and broader validation remain |
| 4 | Dense prior art for cognitive-load UI | Narrowed; adaptive UI alone is not claimed | Professional element-by-element search required |
| 5 | Protected anchor/stability/provenance terms undefined | Partially closed with operational definitions | Counsel must draft claim-safe definitions |
| 6 | Inventorship record thin | Contribution-log template added | Human contributors must complete and attest |
| 7 | Synthetic recall does not establish OCR robustness | Partially closed with degraded-scan and ensemble plans | Real/degraded corpus required |
| 8 | Review path unspecified | Partially closed with a formal state machine | UX copy and human validation remain |
| 9 | Advice boundary only policy | Partially closed as a hard candidate-rejection category | Classifier must be implemented and validated |

**Honest status**: Technical specification gaps now have closure paths. Human evaluation, real-data calibration, professional prior-art/FTO analysis, ownership, and inventorship remain open.

---

## 3. Revised Mathematical Specification

### 3.1 Concrete state estimator

The state vector remains:

\[
x_t=[c_t,r_t,l_t,q_t,u_t]^T
\]

for comprehension, strain, presentation load, task progress, and uncertainty.

Use a diagonal transition model as an interpretable starting point:

\[
F=diag(\phi_1,\phi_2,\phi_3,\phi_4,\phi_5),\quad 0<\phi_i<1
\]

The decay terms represent signals returning toward a neutral prior between interactions. The action matrix `B` is sparse and maps named events—help request, navigation reversal, action completion, and error—to explicit per-dimension coefficients. The observation matrix begins as:

\[
H=I
\]

because the baseline telemetry signals are treated as noisy observations of their corresponding product-state dimensions.

Process and observation covariance matrices begin diagonal and are initialized from empirical baseline spread. They must be re-fit on real interaction logs before any calibration claim.

Prediction:

\[
\hat{x}_t^- = F\hat{x}_{t-1}+Ba_t
\]

\[
P_t^- = FP_{t-1}F^T+Q
\]

Measurement update:

\[
K_t=P_t^-H^T(HP_t^-H^T+R)^{-1}
\]

\[
\hat{x}_t=\hat{x}_t^-+K_t(y_t-H\hat{x}_t^-)
\]

\[
P_t=(I-K_tH)P_t^-
\]

This is an interpretable approximation, not a claim that human interaction is a linear-Gaussian physical process.

### 3.2 Epistemic and aleatoric uncertainty

Decompose uncertainty:

\[
P_t=P_t^{epi}+P_t^{ale}
\]

- **Epistemic uncertainty**: insufficient signal, such as a first interaction or sparse telemetry. Response: prefer a simpler presentation and collect more signal.
- **Aleatoric uncertainty**: contradictory or noisy signal, such as repeated opening combined with fast completion. Response: route to a reviewable state rather than collecting more of the same signal.

The decomposition is a research hypothesis requiring real-log calibration.

### 3.3 Stability hysteresis

Replace the single knife-edge gate with dual thresholds:

```text
upgrade only when S_t >= τS_up for N_up consecutive estimates
downgrade when S_t < τS_down for N_down consecutive estimates
with τS_down < τS_up
```

This prevents presentation flicker. Hysteresis is known generally and is not claimed independently. The proposed combination is a document-comprehension stability score coupled to anchor-preservation constraints and uncertainty decomposition.

### 3.4 Repeatability and audit hash

For fixed inputs and configuration:

\[
candidate\_hash=H(document\_hash, extraction\_config\_hash, model\_version, selector\_config\_hash, random\_seed)
\]

The decision record may be chained:

```text
record_hash = H(previous_record_hash, candidate_hash, decision, timestamp, configuration)
```

The purpose is to verify and reproduce safety-relevant decisions, not merely cache extraction templates.

### 3.5 Operational definitions

| Term | Operational definition |
|---|---|
| Protected anchor | Source span classified as date, amount, deadline, entity, obligation, negation, condition, contact, identifier, or revocation term, with source reference and extraction confidence |
| Stability | `S_t` computed from uncertainty and interaction strain and used by dual-threshold hysteresis |
| Provenance coverage | Fraction of output sentences with a resolvable source page/paragraph/line/bounding-box reference |
| Allowable transition | Presentation-state change permitted only when stability and presentation-load constraints pass |
| Review state | First-class state entered when anchor disagreement, uncertainty, or hard-constraint failure prevents safe candidate selection |
| Advice-like output | Candidate language that adds an unsupported legal, medical, or financial recommendation rather than explaining source-grounded content |

### 3.6 Degraded-scan recall

Evaluation must report separately:

- Clean-scan anchor recall.
- Degraded-scan anchor recall after synthetic blur, skew, low contrast, compression, and column-reflow augmentation.

Clean synthetic performance must never be presented as real-world OCR robustness.

---

## 4. New Embodiments

### 4.1 Ensemble cross-verification anchor extraction

Run two structurally independent extraction passes:

1. Field-guided extraction by anchor class.
2. Document-guided holistic extraction.

Agreement increases confidence. Disagreement routes to the same review/safety pathway as anchor failure instead of selecting one value silently. This is not claimed as a novel ensemble technique by itself; the proposed differentiator is its binding to the hard preservation gate and presentation-state controller.

### 4.2 Formal review state machine

```text
States: SIMPLE, STANDARD, DETAILED, REVIEW

Enter REVIEW when:
- anchor disagreement remains unresolved, or
- epistemic uncertainty is high with insufficient signal, or
- every candidate fails a hard constraint

Exit REVIEW only when:
- a new extraction resolves the disagreement, or
- the user explicitly requests proceeding with lower confidence and the event is logged
```

### 4.3 Chained audit log

Each presentation decision records:

```text
previous_hash
source_document_hash
extraction_configuration_hash
anchor_set_hash
candidate_hash
presentation_state
constraints
model_version
timestamp
```

A verifier can replay the chain and detect post-hoc modification.

### 4.4 Advice-boundary constraint

Advice-like language is a first-class rejection category alongside anchor loss, action loss, provenance loss, and contradiction. A candidate classifier flags unsupported imperatives or recommendations. The candidate is rejected or routed to review; the system does not silently convert source explanation into professional advice.

---

## 5. Prior-Art and Novelty Analysis Update

### 5.1 Search posture

The following are targeted search leads, not a professional search or legal conclusion:

- Adaptive UI complexity and cognitive-load patents are dense.
- Hysteresis for adaptive state transitions is known generally.
- Ensemble disagreement for document extraction is a known pattern.
- Cryptographic hashes for extraction/template integrity are known.
- Text simplification, source preservation, and claim/document decomposition have prior literature.

Accordingly, APUCS should not claim any one of these mechanisms in isolation. Counsel should focus on the specific combination and claim limitations that distinguish the proposed pipeline.

### 5.2 Candidate differentiation hypotheses

1. Disagreement-gated anchor verification bound to a hard transformation-preservation constraint.
2. Epistemic/aleatoric uncertainty decomposition driving different system responses inside the source-grounded simplification loop.
3. Hysteresis-gated presentation transitions bound to the decomposed document-comprehension stability score and anchor gate.
4. Full-pipeline hash-chained decision audit from extraction through candidate and presentation decision.
5. Advice-boundary rejection as a hard constraint co-equal with anchor, action, provenance, and divergence checks.

These are hypotheses for counsel to test. They are not novelty conclusions.

---

## 6. USPTO Criteria Mapping

| Requirement | v1.1 evidence | Status |
|---|---|---|
| §101 eligibility | Computer-implemented process/system/medium; technical pipeline and controlled presentation | Counsel eligibility analysis open |
| §102 novelty | Search library, claim themes, and element chart direction | Professional search open |
| §103 nonobviousness | Narrowed claim hypotheses focused on combinations | Professional search and counsel analysis open |
| §112(a) written description | Concrete matrices, state model, embodiments, constraints, and fallback states | Partially advanced; validated examples needed |
| §112(a) enablement | Pseudocode, architecture, and parameters are described | Full-scope enablement and undue-experimentation analysis open |
| §112(b) definiteness | Operational definitions supplied | Counsel claim drafting open |
| AI inventorship | Human contribution log supplied | Human attestation and counsel determination open |
| Disclosure duty | Search and evidence library identified | Counsel must determine material references and IDS obligations |

### 6.1 External research library

1. USPTO MPEP §2106 — https://www.uspto.gov/web/offices/pac/mpep/s2106.html
2. USPTO MPEP Chapter 2100 — https://www.uspto.gov/web/offices/pac/mpep/mpep-2100.html
3. USPTO MPEP §2131 — https://www.uspto.gov/web/offices/pac/mpep/s2131.html
4. USPTO MPEP §2152 — https://www.uspto.gov/web/offices/pac/mpep/s2152.html
5. USPTO MPEP §2142 — https://www.uspto.gov/web/offices/pac/mpep/s2142.html
6. USPTO MPEP §2161 — https://www.uspto.gov/web/offices/pac/mpep/s2161.html
7. USPTO MPEP §2164 — https://www.uspto.gov/web/offices/pac/mpep/s2164.html
8. USPTO AI-assisted inventorship FAQs — https://www.uspto.gov/initiatives/artificial-intelligence/faqs
9. USPTO Patent Public Search — https://www.uspto.gov/patents/search/patent-public-search
10. USPTO patent search strategy — https://www.uspto.gov/patents/search/patent-search-strategy
11. USPTO Patent Center — https://www.uspto.gov/patents/apply/patent-center
12. WIPO PATENTSCOPE — https://patentscope.wipo.int/search/en/search.jsf
13. USPTO MPEP §2001 duty of disclosure — https://www.uspto.gov/web/offices/pac/mpep/s2000.html
14. Document simplification evaluation — https://aclanthology.org/2024.readi-1.1/
15. Factuality in text simplification — https://aclanthology.org/2022.acl-long.506/
16. Document-level simplification planning — https://aclanthology.org/2023.eacl-main.70/
17. W3C clear content — https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/
18. W3C older users and accessibility — https://www.w3.org/WAI/older-users/

### 6.2 Prior-art search leads for counsel

- US11327636B2 — https://patents.google.com/patent/US11327636B2/en
- US11137870B2 — https://patents.google.com/patent/US11137870B2/en
- US6999955B2 — https://patents.google.com/patent/US6999955B2/en
- US9009609B2 — https://patents.google.com/patent/US9009609B2/en
- US10573051B2 — https://patents.google.com/patent/US10573051B2/en

Legal status and claim scope must be independently verified through official records and counsel.

---

## 7. Inventorship and Evidence Log

| Element | Conceiving person(s) | Conception date | Evidence | Status |
|---|---|---|---|---|
| Core anchor-preserving constrained transformation | To be completed by team | Open | Dated work product required | Open |
| Epistemic/aleatoric decomposition | To be completed by team | Open | Dated work product required | Open |
| Ensemble disagreement routing | To be completed by team | Open | Dated work product required | Open |
| Hash-chained audit record | To be completed by team | Open | Dated work product required | Open |
| Advice-boundary hard constraint | To be completed by team | Open | Dated work product required | Open |

AI tools may assist research or drafting but are not named inventors. Human contribution must be assessed under current USPTO guidance.

---

## 8. Evidence Still Required

- Real interaction telemetry to fit estimator parameters.
- Degraded and approved real-document corpus.
- Advice-language training and evaluation set.
- Human evaluation using the approved rubric.
- Element-by-element professional prior-art search.
- Inventorship and assignment determination.
- Filing/public-disclosure strategy.
- Claim drafting by registered counsel.

---

## 9. Revision Conclusion

Version 1.1 materially upgrades the disclosure by replacing aspirational symbols with an interpretable starting model, defining uncertainty decomposition, adding hysteresis and review-state behavior, formalizing deterministic auditability, and narrowing novelty hypotheses in light of known prior-art density.

The upgrade is from **specified** to **specified-with-a-closure-path**, not from unproven to proven. The recommended posture remains confidential research, preservation of dated evidence, no public patentability claims, and review by a registered patent attorney or patent agent before filing or commercial deployment.

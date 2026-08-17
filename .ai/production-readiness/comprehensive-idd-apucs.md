# Invention Disclosure Document (IDD)

## APUCS: Anchor-Preserving, Uncertainty-Constrained Document Simplification and Geragogy-Aligned Presentation Control

**Document status**: Research disclosure for inventor and patent counsel review  
**Version**: 1.0  
**Prepared**: August 16, 2026  
**Workspace**: GeraDoc / ClarityDoc  
**Primary human inventor/author candidate**: Kimberly Miles / Kmiles — to be confirmed by counsel  
**Application owner**: @Kmiles  
**Confidentiality**: Confidential; do not publicly disclose before counsel determines filing strategy

> This document is an invention disclosure, not a patent application, legal opinion, patentability determination, or freedom-to-operate opinion. It records a technical concept for review by a registered patent practitioner.

---

## 1. Invention Title

**Computer-Implemented Anchor-Preserving, Uncertainty-Constrained Transformation of Complex Documents into Source-Grounded, Geragogy-Aligned Presentations**

Short name: **APUCS**.

---

## 2. Administrative Disclosure Record

### 2.1 Contributors and inventorship

| Person/system | Contribution status | Inventor determination |
|---|---|---|
| Kimberly Miles / Kmiles | Product conception, NONI/IDD adaptation, domain and safety direction | To be determined and confirmed by counsel |
| Human engineering contributors | Implementation, experimentation, or conception contribution if applicable | To be determined |
| AI tools | Assisted drafting, coding, search, or analysis | Not a legal inventor; human contribution must be assessed |

The USPTO's AI-assisted inventorship guidance focuses on the significant contribution of natural persons. Use of an AI system does not itself establish or defeat inventorship. The final named inventors must be determined from documented human contributions, not repository commit authors alone.

### 2.2 Related disclosures

- Supplied source IDD: *Computer-Controlled Regulation of Graphical User Interface State Transitions Using Uncertainty-Constrained State Estimation*, attributed to Kim Miles; filing status and claim scope not independently verified.
- NONI technical patterns and UI/UX research intake.
- ClarityDoc BRD, FRD, PRD, technical specifications, and APUCS research memo.

### 2.3 Public disclosure and filing record

| Event | Date | Public? | Evidence/action |
|---|---|---:|---|
| Supplied source IDD received | August 16, 2026 | Unknown | Source DOCX archived on USB |
| APUCS repository research artifacts | August 16, 2026 | Repository access status must be confirmed | Git history and branch records |
| External demonstrations | To be completed | Unknown | Record every demonstration, NDA, sale, offer, or publication |
| Provisional/nonprovisional filing | Not filed in this record | No | Counsel decision required |

Do not assume repository commits, emails, demonstrations, or investor materials are legally harmless public disclosures. Counsel should determine applicable dates, grace-period issues, confidentiality status, and filing strategy.

---

## 3. Technical Field

The invention relates to computer-implemented document processing, natural-language transformation, source-grounded generation, human-computer interaction, accessibility, and adaptive presentation systems.

More particularly, the invention concerns a processor-executed pipeline that:

1. Converts a complex source document into a structured proposition and provenance representation.
2. Identifies protected facts and obligations.
3. Estimates an interaction-support state with an uncertainty representation.
4. Generates controlled transformation candidates.
5. Rejects candidates that violate anchor, action, provenance, uncertainty, or divergence constraints.
6. Selects a candidate and presentation state through constrained optimization.
7. Produces an auditable, reversible, source-linked presentation appropriate to the user's interaction-support state.

The invention is intended for senior-first, geragogy-aligned information access. It is not intended to diagnose cognitive impairment, determine legal capacity, provide medical advice, or make decisions for the user.

---

## 4. Problem and Technical Need

Complex insurance, financial, government, and legal documents contain dates, amounts, conditions, obligations, exceptions, contacts, and actions embedded in difficult language and dense layouts.

Existing approaches commonly fail in one or more ways:

- Truncation removes deadlines, qualifications, and obligations.
- Summarization may omit source facts that appear less salient to a language model.
- Rewriting may alter negations, conditions, amounts, or named entities.
- Readability metrics alone do not prove meaning preservation.
- Semantic similarity scores may miss a changed obligation or a lost deadline.
- Static progressive-disclosure rules do not represent uncertainty about the user's interaction state.
- Client-side adaptation can create inconsistent or unsafe UI transitions.
- Generic text simplification does not expose provenance for user review.

The technical need is for a computer system that improves information accessibility while constraining transformation risk and regulating presentation changes using an explicit uncertainty-aware control mechanism.

---

## 5. Summary of the Invention

APUCS introduces a source-grounded transformation and presentation-control framework.

A source document is represented as an ordered proposition graph:

\[
G_D = (V, E, A, R)
\]

where:

- `V` contains source propositions or clauses.
- `E` contains dependency and discourse relationships.
- `A` contains protected anchors.
- `R` contains source references such as page, paragraph, line, or bounding box.

Protected anchors include dates, amounts, deadlines, entities, obligations, negations, conditions, contacts, identifiers, and revocation terms.

The system generates candidate transformations using a bounded operation set:

\[
O = \{COPY, REPHRASE, SPLIT, DEFINE, REORDER, LABEL\}
\]

For protected propositions, deletion, unsupported inference, and unsafe merging are prohibited unless the candidate passes explicit constraints and review.

The system estimates an interaction-support state:

\[
x_t = [c_t, r_t, l_t, q_t, u_t]^T
\]

where:

- `c_t` is comprehension signal.
- `r_t` is interaction strain.
- `l_t` is presentation load.
- `q_t` is task progress.
- `u_t` is uncertainty.

An uncertainty representation `P_t` is updated recursively. A stability score determines which presentation states are eligible. The candidate selector minimizes readability difficulty, presentation load, semantic divergence, and uncertainty subject to hard source-preservation constraints.

The result is a source-grounded presentation with confidence, provenance, review status, and reversible user interaction.

---

## 6. System Architecture

### 6.1 Components

1. **Document ingestion module**
   - Receives PDF, image, or supported document input.
   - Validates file type, size, and malware status.
   - Assigns an immutable document identifier.

2. **Extraction and layout module**
   - Extracts text, pages, tables, forms, and coordinates.
   - Emits extraction confidence and source spans.

3. **Proposition and anchor module**
   - Segments text into propositions.
   - Extracts dates, amounts, entities, actions, obligations, conditions, negations, and contacts.
   - Builds source-linked nodes and edges.

4. **Interaction-support state estimator**
   - Receives UI-neutral telemetry.
   - Estimates support state and uncertainty.
   - Does not infer a clinical condition.

5. **Candidate transformation engine**
   - Generates controlled alternatives.
   - Applies dictionary, grammar, structural, and model-assisted transformations behind a feature flag.

6. **Constraint and safety validator**
   - Checks protected anchors.
   - Checks action preservation.
   - Checks conditions and negations.
   - Checks provenance coverage.
   - Checks semantic divergence and uncertainty thresholds.

7. **Candidate selector**
   - Scores eligible candidates.
   - Selects the least complex eligible output.
   - Falls back to source-grounded review when no candidate passes.

8. **Backend-authoritative presentation controller**
   - Returns the approved presentation level and allowed transitions.
   - Prevents client-side override of safety decisions.

9. **Preview, confirmation, and undo module**
   - Shows source-linked output before committing a user-facing state.
   - Allows the user to switch levels or return to source text.

10. **Audit and evaluation module**
    - Records algorithm version, configuration, constraints, confidence, and source references.
    - Supports shadow evaluation without altering user-visible output.

### 6.2 Data flow

```text
Document
  → validation
  → OCR/layout extraction
  → proposition graph and protected anchors
  → interaction-support state estimate
  → controlled candidates
  → hard constraints
  → divergence/stability scoring
  → candidate selection
  → provenance-enriched result
  → backend-approved presentation
  → user preview/confirmation/undo
```

---

## 7. Mathematical Specification

### 7.1 State prediction and uncertainty

Given an action signal `a_t`, state transition matrix `F`, action matrix `B`, process covariance `Q`, observation matrix `H`, and observation covariance `R`:

\[
\hat{x}_t^- = F\hat{x}_{t-1} + Ba_t
\]

\[
P_t^- = FP_{t-1}F^T + Q
\]

\[
K_t = P_t^-H^T(HP_t^-H^T + R)^{-1}
\]

\[
\hat{x}_t = \hat{x}_t^- + K_t(y_t - H\hat{x}_t^-)
\]

\[
P_t = (I-K_tH)P_t^-
\]

The initial POC implementation uses a transparent bounded estimator and variance representation. A fully calibrated state estimator requires experimental parameter selection.

### 7.2 Stability

Define:

\[
S_t = e^{-tr(WP_t)}e^{-\lambda r_t}
\]

where `W` weights uncertainty dimensions and `λ` weights interaction strain.

A presentation transition is eligible only when:

\[
S_t \geq \tau_S
\]

and:

\[
L(C_j) \leq L_{max}(\hat{x}_t)
\]

Thresholds must be calibrated from observed interaction outcomes and may not be treated as medical or cognitive diagnoses.

### 7.3 Protected-anchor constraint

For each source anchor `a`:

\[
value_{candidate}(a) = value_{source}(a)
\]

If an extracted value is uncertain, the system must preserve uncertainty and route the result to review instead of silently correcting it.

### 7.4 Action and obligation constraint

Let `T_D` be required source actions and `T_C` candidate actions. A candidate must meet:

\[
Recall_T = \frac{|T_D \cap T_C|}{|T_D|} \geq \tau_T
\]

For safety-critical actions, `τ_T = 1` in the release gate.

### 7.5 Divergence constraint

Let `p_D` and `p_C` represent source and candidate proposition distributions. Candidate selection requires:

\[
JS(p_D,p_C) \leq \epsilon
\]

with:

\[
JS(p_D,p_C)=\frac{1}{2}D_{KL}(p_D\parallel m)+\frac{1}{2}D_{KL}(p_C\parallel m)
\]

and:

\[
m=\frac{1}{2}(p_D+p_C)
\]

This metric is an evaluation signal, not a substitute for factuality review.

### 7.6 Candidate objective

\[
C^* = \arg\min_{C_j \in \mathcal{C}}
[\alpha R(C_j)+\beta L(C_j)+\gamma D(C_j)+\delta U(C_j)]
\]

subject to:

\[
AnchorRecall(C_j)=1
\]

\[
ActionRecall(C_j)\geq \tau_T
\]

\[
JS(p_D,p_{C_j})\leq \epsilon
\]

\[
S_t\geq\tau_S
\]

\[
ProvenanceCoverage(C_j)\geq\tau_P
\]

where `R` is readability difficulty, `L` is presentation load, `D` is semantic divergence, and `U` is uncertainty/unsupported-claim risk.

---

## 8. Geragogy-Aligned Output Requirements

An output is geragogy-aligned when it supports:

- Relevance to the user's immediate real-life task.
- Plain language without shame or technical intimidation.
- Progressive disclosure.
- One primary action at a time.
- User control over pace and detail.
- Emotional safety when a document is difficult.
- Source traceability and confidence transparency.
- Reversibility and access to the original wording.
- Consistent, accessible presentation for older users.

The system must not represent a simplified document as legal, financial, or medical advice. It must distinguish extracted source facts from explanations and generated guidance.

---

## 9. Detailed Embodiments

### 9.1 Embodiment A: Insurance renewal

The system extracts a renewal date, premium, plan name, provider network condition, and decision action. A candidate that omits the date or changes the premium is rejected. The result displays:

- What the notice is about.
- The decision deadline.
- Cost change.
- Required action.
- Source page references.
- Review warning if extraction confidence is low.

### 9.2 Embodiment B: Financial charge dispute

The system extracts charge amount, merchant, posting date, dispute window, and condition. A candidate must preserve the condition that the user should contact the bank only if the charge is not recognized. A candidate that converts a conditional instruction into an unconditional instruction is rejected.

### 9.3 Embodiment C: Government tax notice

The system extracts installment amount, due date, exemption condition, and prohibited payment method. The negative instruction must remain negative. A candidate that changes “do not send cash” into a positive payment instruction is rejected.

### 9.4 Embodiment D: Legal healthcare directive

The system extracts effective date, named agent, conditional authority, and revocation language. The system presents a plain-language explanation with source references and a legal-review disclaimer. It does not interpret legal validity or advise the user to execute a legal action.

### 9.5 Embodiment E: Progressive presentation

A result may initially show a short summary and the highest-priority action. Additional details are disclosed only after the backend state controller determines that the next presentation transition satisfies stability and load constraints, or after explicit user selection where policy permits.

---

## 10. Safety, Privacy, and Security

- No real document data in the synthetic evaluation corpus.
- No telemetry containing document text unless explicitly approved and protected.
- No inference of medical or legal capacity.
- No unsupported claims presented as facts.
- All source transformations versioned.
- All candidate outputs auditable.
- All user-visible output reversible.
- Low-confidence extraction triggers review.
- Runtime results excluded from source control.
- External provider prompts and retention policies reviewed before use.

---

## 11. Prior Art and Research Library

The following sources are research references and search starting points. They are not a legal opinion and are not a complete prior-art search.

### 11.1 USPTO eligibility and patentability criteria

1. **USPTO MPEP §2106 — Patent Subject Matter Eligibility**
   - https://www.uspto.gov/web/offices/pac/mpep/s2106.html
   - Relevance: process/machine categories and abstract-idea analysis under 35 U.S.C. §101.

2. **USPTO MPEP Chapter 2100 — Patentability**
   - https://www.uspto.gov/web/offices/pac/mpep/mpep-2100.html
   - Relevance: consolidated guidance for §§101, 102, 103, and 112.

3. **USPTO MPEP §2131 — Anticipation under 35 U.S.C. §102**
   - https://www.uspto.gov/web/offices/pac/mpep/s2131.html
   - Relevance: a single reference generally must disclose every claim element for anticipation.

4. **USPTO MPEP §2152 — AIA 35 U.S.C. §102**
   - https://www.uspto.gov/web/offices/pac/mpep/s2152.html
   - Relevance: patents, publications, public use, sale, and other public availability as prior-art categories.

5. **USPTO MPEP §2141 / §2142 — Obviousness under 35 U.S.C. §103**
   - https://www.uspto.gov/web/offices/pac/mpep/s2142.html
   - Relevance: scope/content of prior art and articulated reasoning for combinations or modifications.

6. **USPTO MPEP §2161 — Written description and enablement**
   - https://www.uspto.gov/web/offices/pac/mpep/s2161.html
   - Relevance: separate written-description, enablement, and best-mode requirements under §112(a).

7. **USPTO MPEP §2164 — Enablement**
   - https://www.uspto.gov/web/offices/pac/mpep/s2164.html
   - Relevance: whether a person skilled in the art can make and use the full claimed scope without undue experimentation.

8. **USPTO AI-assisted inventorship guidance and FAQs**
   - https://www.uspto.gov/initiatives/artificial-intelligence/faqs
   - Relevance: human contribution and inventorship when AI tools assist development.

### 11.2 Search and filing resources

9. **USPTO Patent Public Search**
   - https://www.uspto.gov/patents/search/patent-public-search
   - Relevance: search U.S. patents and published applications using keyword, field, Boolean, proximity, and classification methods.

10. **USPTO multi-step patent search strategy**
    - https://www.uspto.gov/patents/search/patent-search-strategy
    - Relevance: keyword expansion, CPC searching, reviewing specifications/claims/drawings, backward and forward citations, and maintaining search records.

11. **USPTO Patent Center**
    - https://www.uspto.gov/patents/apply/patent-center
    - Relevance: electronic filing and application management; filing requires an appropriate account and practitioner/inventor process.

12. **WIPO PATENTSCOPE**
    - https://patentscope.wipo.int/search/en/search.jsf
    - Relevance: international PCT and participating national patent collections, full-text, claims, classifications, names, and dates.

13. **USPTO duty of disclosure, MPEP §2001**
    - https://www.uspto.gov/web/offices/pac/mpep/s2000.html
    - Relevance: material information known to persons associated with prosecution may need disclosure through appropriate procedures.

### 11.3 Relevant technical and non-patent literature

14. **Cripwell, Legrand, Gardent — Evaluating Document Simplification**
    - https://aclanthology.org/2024.readi-1.1/
    - Relevance: simplicity and meaning preservation should be evaluated separately.

15. **Scialom et al. — Evaluating Factuality in Text Simplification**
    - https://aclanthology.org/2022.acl-long.506/
    - Relevance: simplification can introduce unsupported statements or omit key facts.

16. **Alva-Manchego et al. — Document-Level Planning for Text Simplification**
    - https://aclanthology.org/2023.eacl-main.70/
    - Relevance: planning operations such as copy, rephrase, split, and delete at document level.

17. **W3C WAI — Clear and Understandable Content**
    - https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/
    - Relevance: easy words, short sentences, summaries, separated instructions, and clear formatting.

18. **W3C WAI — Older Users and Web Accessibility**
    - https://www.w3.org/WAI/older-users/
    - Relevance: accessibility needs associated with aging, including vision, dexterity, hearing, and cognition.

### 11.4 Potentially relevant patent families for counsel review

These are search leads, not conclusions about overlap, validity, enforceability, or current legal status. Each must be opened in official databases and reviewed by claim element and date:

- **US11327636B2 — Dynamically scale complexity of a user interface based on cognitive load**
  - https://patents.google.com/patent/US11327636B2/en
- **US11137870B2 — Adjusting an interface based on a cognitive mode**
  - https://patents.google.com/patent/US11137870B2/en
- **US6999955B2 — Systems and methods for estimating and integrating measures of human cognitive load into computational applications**
  - https://patents.google.com/patent/US6999955B2/en
- **US9009609B2 — Interaction with a visualized state transition model**
  - https://patents.google.com/patent/US9009609B2/en
- **US10573051B2 — Dynamically generated interface transitions**
  - https://patents.google.com/patent/US10573051B2/en

Google Patents displays legal-status information with limitations and is not a substitute for official prosecution records or counsel review.

---

## 12. USPTO Criteria Mapping

| Requirement | APUCS disclosure evidence | Status |
|---|---|---|
| §101 statutory category | Computer-implemented process, system, and non-transitory medium embodiments | Candidate; counsel review required |
| §101 practical application | Source-grounded computer processing, constrained state control, provenance, and presentation behavior | Candidate; eligibility analysis required |
| §102 novelty | Search library and element-by-element claim chart required | Open |
| §103 nonobviousness | Must distinguish known adaptive UI, cognitive-load, simplification, and divergence techniques | Open |
| §112(a) written description | Mathematical model, architecture, embodiments, parameters, and alternatives included | Expand with validated examples |
| §112(a) enablement | Must show how to implement and calibrate full claim scope without undue experimentation | Open; experimental record required |
| §112(b) definiteness | Define terms such as anchor, stability, provenance, and allowable transition in claims | Counsel drafting required |
| AI inventorship | Record significant human conception contributions; do not name AI as inventor | Open inventorship determination |
| Disclosure duty | Preserve search log and material references for counsel/IDS decisions | Open process item |

This matrix is a preparation tool, not a prediction of USPTO examination outcome.

---

## 13. Novelty and Claim-Differentiation Hypotheses

The following are hypotheses for counsel and a professional searcher to test:

1. **Source-grounded protected-anchor constrained transformation**: a computer pipeline that rejects or routes for review candidate simplifications that do not preserve a typed set of dates, amounts, entities, obligations, conditions, negations, and provenance references.

2. **Joint transformation and presentation control**: selecting both a text transformation candidate and a presentation state using the same uncertainty/stability budget while keeping source facts and provenance fixed.

3. **Uncertainty-aware fallback**: automatically returning source-grounded review rather than a lower-confidence generated transformation when anchor extraction, state estimation, or candidate scoring exceeds uncertainty thresholds.

4. **Reversible multi-level output**: producing linked simple, standard, and detailed representations with claim-to-source mappings and an undo/restore path controlled by a backend-authoritative state controller.

5. **Evaluation-gated adaptive simplification**: allowing a candidate to become user-visible only after separate anchor, action, provenance, divergence, readability, human-evaluation, and reproducibility gates pass.

These hypotheses may be anticipated or rendered obvious by combinations of prior art. They are not novelty conclusions.

---

## 14. Candidate Claim Themes for Counsel Drafting

### Independent method theme

A computer-implemented method comprising receiving a complex document; extracting source propositions and typed protected anchors with source references; generating candidate transformations; estimating an interaction-support state and uncertainty representation from interaction signals; rejecting candidates that fail anchor, action, provenance, divergence, or stability constraints; selecting an eligible transformation and presentation state using constrained optimization; and rendering a reversible source-grounded presentation.

### System theme

A system comprising processors and memory configured to perform the method, including an extraction module, proposition/anchor module, state estimator, candidate generator, constraint validator, selector, provenance module, and backend-authoritative presentation controller.

### Non-transitory medium theme

A non-transitory computer-readable medium containing instructions that cause a processor to perform the method.

### Narrow dependent themes

- Typed anchor classes including dates, amounts, obligations, conditions, negations, and revocation terms.
- Covariance or other uncertainty representation.
- Stability score based on uncertainty and interaction strain.
- Jensen-Shannon or constrained divergence threshold.
- Candidate operations limited to copy, rephrase, split, define, reorder, and label.
- Fallback to source-grounded review.
- Provenance mapping from every generated sentence to source spans.
- User preview, confirmation, and undo.
- Versioned evaluation digest and feature-flagged shadow operation.

Counsel should avoid claiming every implementation detail if the specification cannot enable the full breadth of the claim.

---

## 15. Experiments and Evidence Required

1. Run the APUCS candidate against at least 100 synthetic cases.
2. Expand to approved, de-identified document samples.
3. Compare against baseline truncation, extractive, rule-based, and selected vendor systems.
4. Measure anchor recall, action recall, contradiction rate, provenance coverage, divergence, readability, latency, and reproducibility.
5. Conduct blinded human review using the approved protocol.
6. Record failures, not only successful examples.
7. Preserve configuration, candidate version, corpus version, and output digest.
8. Record any public disclosure, demonstration, sale, or external sharing.
9. Maintain a prior-art search log with queries, databases, dates, results, and claim-element relevance.
10. Provide counsel with the IDD, source disclosures, search library, code history, evaluation report, and inventorship record.

---

## 16. Open Legal and Business Decisions

- Confirm actual filing status of the supplied IDD.
- Confirm whether the source IDD is assigned to ClarityDoc or another entity.
- Confirm inventors and joint inventors based on human conception.
- Obtain a professional novelty and freedom-to-operate search.
- Determine whether to file provisional, nonprovisional, PCT, or maintain trade secret protection.
- Determine which details should remain confidential before filing.
- Review whether public GitHub history or demonstrations create disclosure risk.
- Review privacy, liability, and domain disclaimers for financial/legal document explanations.
- Determine whether APUCS should be claimed separately from the original interface-state-control invention.

---

## 17. Conclusion

APUCS is a technically specified research candidate that combines source-grounded document transformation, protected-anchor preservation, uncertainty-aware interaction support, constrained candidate selection, provenance, and reversible geragogy-aligned presentation.

The disclosure is detailed enough to support a counsel-led invention review and an element-by-element prior-art search. It does not establish novelty, nonobviousness, eligibility, enforceability, inventorship, ownership, or freedom to operate.

**Recommended legal posture**: maintain confidential research status, preserve evidence, avoid public patentability claims, and engage a registered patent attorney or agent before filing or commercial deployment.

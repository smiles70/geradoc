# ClarityDoc Technical Functionality and Capability Status

## Application Charter Alignment Report

**Date**: August 16, 2026  
**Status**: Research/POC assessment  
**Authoring owner**: @Kmiles  
**Method**: Process v9.5 traceability review  
**Compared against**: Approved Application Charter v1.0, BRD/FRD/PRD, Technical Specifications, POC evidence, APUCS IDD v1.1, current repository state

> This is a technical capability report, not a legal, compliance, patentability, clinical, financial, or production-readiness certification.

---

## 1. Executive Verdict

ClarityDoc has a credible **research POC foundation** and a documented path toward the Application Charter's MVP, but it does not yet implement the charter's complete product capability.

### Current capability level

```text
Strategic definition:       Complete
Architecture definition:    Complete with provisional decisions
Mocked product experience:  In development on separate demo track
Real processing POC:        Partial and operational
APUCS simplifier:           Research-only shadow mode
MVP capability:             Not yet available
Production capability:      Not available
```

### What the current POC proves

- A Node.js/Express upload boundary works.
- PDF and fixture extraction adapters can be selected behind an interface.
- A processor can produce a mocked-demo-compatible result shape.
- Results can be persisted and retrieved through a repository boundary.
- APUCS research candidates can be evaluated without changing user-visible behavior.
- Synthetic evaluation can check anchors, actions, provenance metadata, contradictions, and reproducibility.

### What it does not prove

- Production OCR quality.
- Reliable extraction across real document classes.
- Production-quality simplification.
- Human comprehension improvement.
- Caregiver authorization or privacy controls.
- Subscription, billing, or enterprise integrations.
- WCAG certification.
- GDPR/SOC 2 implementation.
- HIPAA compliance.
- Patentability, inventorship, ownership, or freedom to operate.

---

## 2. Charter Capability Matrix

| Charter capability | Current state | Capability level | Evidence / gap |
|---|---|---|---|
| PDF upload | Implemented in POC | Partial | Multer route accepts PDF; no production storage or malware scanning |
| Image upload | MIME boundary exists | Partial | OCR and image-quality pipeline not validated |
| Email/document upload | Not implemented | Open | Charter includes email/document upload; no email ingestion service |
| Insurance processing | Fixture path only | Research | Synthetic Medicare fixture exists; real insurance extraction unproven |
| Financial processing | Synthetic evaluation only | Research | Financial corpus cases exist; no real bank-statement validation |
| Government processing | Synthetic evaluation only | Research | Government cases exist; no real-form validation |
| Legal processing | Synthetic evaluation only | Research | Legal cases exist; no legal interpretation capability is permitted |
| Medical processing | Explicitly deferred | Out of scope | Charter excludes Phase 1 medical processing/HIPAA scope |
| OCR/text extraction | PDF text adapter implemented | Partial | `pdf-parse` path exists; degraded scans and image OCR remain open |
| Layout preservation | Not implemented | Open | Tables, forms, bounding boxes, and reading order remain open |
| Document classification | Fixture value only | Partial | No validated classifier or user correction flow |
| Date extraction | Synthetic evaluator support | Research | No production anchor extraction pipeline |
| Amount extraction | Synthetic evaluator support | Research | Currency normalization and confidence remain open |
| Action extraction | Fixture actions only | Partial | No production action/obligation parser |
| Plain-English summaries | Baseline truncation visible | Not acceptable | Current visible baseline is not a simplifier |
| APUCS simplification | Research candidate | Shadow-only | Technical gate passes synthetic checks; human/IP gates open |
| Provenance/source references | Research metadata | Partial | Full page/line/bounding-box API contract not complete |
| Confidence indicators | Research design | Partial | No production confidence UX or calibration |
| Prioritized actions | Fixture/demo behavior | Partial | Priority extraction and validation not production-ready |
| Step-by-step guidance | Mocked/demo content | Partial | No source-grounded production guidance engine |
| Senior dashboard | Mocked demo track | In development | Not merged into POC frontend |
| Caregiver coordination | Mocked demo concept | Not implemented | No auth, consent, permissions, or notification system |
| User registration/authentication | Not implemented | Open | JWT/RBAC only documented |
| Subscription management | Not implemented | Open | Stripe only planned |
| Notifications/reminders | Not implemented | Open | Email/SMS/in-app services not built |
| Data deletion/export | Not implemented | Open | Requirements documented; no fulfillment workflow |
| Accessibility | Design requirements and demo controls | Partial | No complete automated/manual audit or certification |
| Emotional reassurance | Mocked UX content | Partial | Product concept exists; no validated production content |
| Backend-authoritative UI state | Research pattern and estimator | Research | Full presentation-state service not implemented |
| PostgreSQL | Architecture only | Not implemented | POC uses JSON repository |
| S3/object storage | Architecture only | Not implemented | POC uses in-memory upload and local result data |
| Async queue | Architecture only | Not implemented | No durable job orchestration |
| AWS deployment | Documented only | Not implemented | No IaC, staging, or production environment |
| Observability | Runbook/design only | Not implemented | No production metrics/traces/alerts |
| Security controls | Design/ADR only | Partial | No production security test or threat-control verification |
| GDPR/SOC 2 | Requirements only | Not implemented | No audit/control evidence program |
| HIPAA | Not claimed; medical deferred | N/A for Phase 1 | AWS eligibility is not HIPAA compliance |

---

## 3. Technical Capability by Layer

### 3.1 Experience layer

**Available now**:

- Mocked senior and caregiver flows are defined.
- The demo and POC are separated by directory and branch.
- A frontend API seam exists at `poc/frontend/documentApi.js`.

**Not available yet**:

- Production Next.js application.
- Real authentication and account lifecycle.
- Backend-approved presentation-state contract.
- Complete accessibility validation.
- Senior user validation with measured outcomes.

### 3.2 Processing layer

**Available now**:

```text
upload → extractor → simplifier adapter → result contract → persistence
```

The system supports fixture extraction and a PDF extraction adapter. The current visible simplifier remains a provisional truncation baseline. APUCS v1.1 operates only as a research candidate/shadow evaluator.

**Not available yet**:

- Ensemble field/document extraction.
- Typed production anchor canonicalization.
- Real layout and form understanding.
- Calibrated OCR confidence.
- Production advice-boundary classifier.
- Full proposition-level semantic validation.

### 3.3 Data layer

**Available now**:

- JSON result repository with `save`, `findById`, and `readAll`.
- Runtime results excluded from Git.
- Mocked-demo-compatible response shape.

**Not available yet**:

- PostgreSQL schema and migrations.
- Tenant isolation.
- PII field encryption.
- S3 object lifecycle.
- Deletion/export workflows.
- Audit retention and access controls.

### 3.4 Operations layer

**Available now**:

- Architecture, runbook, rollback, security, and testing documents.
- Branch/PR workflow through `develop`.
- Backend test suite.

**Not available yet**:

- CI/CD pipeline.
- Infrastructure as code.
- Staging deployment.
- Queue monitoring.
- Incident drills.
- Production SLO evidence.

---

## 4. APUCS Capability Status

### Implemented research capabilities

- Protected anchor evaluation.
- Action recall evaluation.
- Provenance metadata in shadow candidate output.
- Interaction-support state estimator.
- Variance and stability score baseline.
- Research candidate fallback when constraints fail.
- Synthetic corpus generation.
- Reproducible shadow report digest.
- Human evaluation protocol.
- REVIEW state specification.

### Open engineering capabilities

- Correct epistemic/aleatoric covariance implementation.
- Observation-feature mapping for telemetry.
- Typed anchor canonicalization.
- Structured action identity.
- Advice classifier with abstention.
- Full source-span provenance in the API contract.
- Presentation-state service and hysteresis.
- Hash-chained audit records.
- Real/degraded document evaluation.

### Open human/legal capabilities

- Human comprehension evaluation.
- Accessibility review by qualified reviewers.
- Inventorship and contribution log.
- Ownership and assignment review.
- IDD filing-status confirmation.
- Prior-art and freedom-to-operate search.
- Advice/liability boundary review.
- Privacy and regulatory review.

---

## 5. Application Charter Success Criteria Status

| Charter criterion | Status | Reason |
|---|---|---|
| 70%+ comprehension improvement | Not measured | Requires human study and baseline comparison |
| NPS >50 | Not measured | No production cohort |
| 80%+ recommend | Not measured | No validated user study |
| Ease of use 8/10+ | Not measured | Demo feedback not yet collected as formal evidence |
| 75% action completion in 30 days | Not measured | No real users or reminders |
| 100 paying subscribers | Not started | Product not launched |
| Health-plan interest/contracts | Business open | Requires validated product and outreach |
| MVP in 12–15 months | Roadmap target | Not a current capability claim |

---

## 6. Legal and Compliance Outstanding Items

This report intentionally separates technical capability from legal status.

### 6.1 IDD/IP

- Confirm whether the original IDD was filed, when, and by whom.
- Confirm ownership and assignment to ClarityDoc/GeraDoc.
- Complete human inventorship contribution log.
- Obtain registered patent counsel review.
- Perform element-by-element prior-art search.
- Evaluate §§101, 102, 103, and 112 under current USPTO guidance.
- Determine whether public GitHub history or demonstrations create disclosure risk.
- Determine whether APUCS should be separately claimed, licensed, assigned, or kept confidential.

### 6.2 User-facing advice boundary

- Validate the classifier that distinguishes source-grounded explanation from advice-like output.
- Obtain legal review for financial/legal document explanation liability.
- Define escalation and disclaimer behavior.
- Ensure user override cannot approve failed source-integrity constraints.

### 6.3 Privacy and security

- Define document/data classification.
- Complete privacy impact assessment.
- Define deletion/export/retention controls.
- Review telemetry collection and interaction-support state handling.
- Conduct security testing before real sensitive documents.
- Do not claim HIPAA compliance because AWS services are HIPAA-eligible.

### 6.4 Accessibility and geragogy

- Conduct qualified WCAG 2.2 AA audit.
- Conduct senior user testing with appropriate consent and safeguards.
- Validate comprehension and emotional-safety claims with evidence.
- Review presentation-state behavior with accessibility experts.

---

## 7. Recommended Next Milestones

### Milestone 1 — POC completion

- Finish typed extraction and provenance contract.
- Test with approved synthetic and degraded documents.
- Implement research-only REVIEW state.
- Complete D2-to-provider adapter boundaries.
- Keep APUCS shadow-only.

### Milestone 2 — Human validation

- Run blinded evaluation protocol.
- Recruit appropriate participants with consent.
- Measure meaning preservation, simplicity, fluency, actionability, trust, and comprehension.
- Record failures and revise the algorithm.

### Milestone 3 — Provider and security decision

- Compare OCR/document providers.
- Review retention, training use, regional hosting, API limits, confidence, and provenance.
- Complete security and privacy review.
- Decide build/buy/hybrid architecture.

### Milestone 4 — Prototype

- Add PostgreSQL, object storage, auth, and durable jobs.
- Promote only validated frontend components from the demo.
- Add staging deployment and observability.
- Run senior user validation.

### Milestone 5 — MVP readiness

- Complete accessibility, privacy, security, operations, and legal gates.
- Validate charter success metrics.
- Obtain stakeholder approval before production activation.

---

## 8. Capability Conclusion

ClarityDoc currently has a **strong strategic and research foundation**, a functioning document-processing POC boundary, and a technically structured APUCS research candidate. It does not yet have the full functional, operational, legal, or user-validated capability promised by the Application Charter.

The correct status is:

```text
POC: operational for synthetic/fixture validation
APUCS: research-only shadow capability
Prototype: not yet complete
MVP: not ready
Production: not ready
```

The next work should focus on closing the technical POC gaps and conducting human/legal validation without overstating the current capability.

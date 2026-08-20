# The Process v9.51 — Complete Operating Specification

**Version**: v9.51  
**Status**: Current-state authoritative specification  
**Supersedes**: `PROCESS_V9.5_SPEC.md` as the active Process specification; v9.5 remains historical baseline

## 1. Executive summary

Process v9.51 is a governed AI-assisted delivery operating model combining:

- Full-stack delivery orchestration
- MLDC-aligned frontend generation and validation
- Nelson repository hygiene and canonical knowledge
- Requirements ontology and knowledge graph
- Tokenomics governance
- Cross-cutting reliability, calibration, grader-accuracy, and self-governance programs

The Process governs both the application and its own scoring/gating mechanisms.

## 2. Operating layers

```text
MLDC Alignment Layer
Nelson Repo Hygiene and Canonical Knowledge Layer
Tokenomics Governance Layer
        +
Score Composition/Calibration/Grader Accuracy
Process Self-Governance
```

The existing v9.5 specification remains the source for detailed MLDC, Nelson, ontology, decomposition, and epic-exit behavior. This v9.51 specification adds the unified rules and new governance controls below.

---

# Part A — MLDC Alignment

## 3. MLDC agents and skills

Required agents/capabilities:

- Component Discovery
- Pattern Recommendation
- Code Generation Guardrail
- Accessibility/Responsive Validation
- Theme Compliance
- Design Consistency
- Contribution Readiness
- Package/Version Alignment
- CI/CD Readiness
- Adoption Metrics
- PR Evidence
- Certification

Required skills:

```text
mldc-component-discovery-skill
mldc-storybook-mapping-skill
mldc-pattern-recommendation-skill
mldc-code-generation-guardrail-skill
mldc-accessibility-validation-skill
mldc-responsive-validation-skill
mldc-theme-compliance-skill
mldc-design-consistency-skill
mldc-contribution-readiness-skill
mldc-version-package-alignment-skill
mldc-cicd-readiness-skill
mldc-adoption-scorecard-skill
```

MLDC evidence includes component usage, pattern alignment, accessibility, responsiveness, theme compliance, package alignment, contribution candidates, and PR evidence.

## 4. MLDC score

| Domain | Weight |
|---|---:|
| Component Reuse | 20 |
| Custom Component Reduction | 15 |
| Pattern Alignment | 15 |
| Accessibility Readiness | 15 |
| Responsive Readiness | 10 |
| Theme Compliance | 10 |
| Package Alignment | 10 |
| Contribution Hygiene | 5 |

Score composition uses Part D §19.1.

---

# Part B — Nelson and Requirements Knowledge

## 5. Nelson operating model

Nelson makes repository quality measurable and continuously refreshed. It asks:

- Can a new engineer understand the repo in 15 minutes?
- Can it be run, tested, deployed, and supported without tribal knowledge?
- Are architecture and decisions current and owned?
- Does the repo show what exists, is incomplete, blocked, deferred, and next?
- Does Process knowledge persist into canonical files?

## 6. Nelson score

| Domain | Weight |
|---|---:|
| Repository Orientation | 10 |
| Architecture | 15 |
| Decision Records | 10 |
| Operational Readiness | 15 |
| Knowledge Transfer | 15 |
| Ownership | 10 |
| Delivery Governance | 10 |
| Security and Compliance | 5 |
| Testability | 10 |

Security's additive weight is low by design because severe security failures are cap-governed.

### Security caps

Any one of the following caps the overall score at 50:

- Confirmed hardcoded secret/credential
- Known critical/high direct dependency CVE without remediation plan
- No threat model or `SECURITY.md` for sensitive production systems

## 7. Requirements ontology

Required entities:

```text
SourceArtifact, Requirement, Capability, Epic, UserStory, AcceptanceCriterion,
Test, Evidence, Owner, Decision, Dependency, Gap, Conflict, Assumption,
Persona, Journey, BudgetProfile, CostEvent, RoutingDecision
```

Required relations:

```text
defined_by, refines, implements, partially_implements, verified_by,
evidenced_by, planned_by, owned_by, depends_on, blocked_by, conflicts_with,
supersedes, derived_from, invalidated_by, serves_persona, part_of_journey,
funded_by, routed_by, served
```

Every `Requirement`, `AcceptanceCriterion`, and `Capability` requires:

```text
confidence: 0.0–1.0
extraction_method: structured_source | rule_based | llm_inferred | human_confirmed
```

Low-confidence LLM-inferred nodes cannot satisfy blocking gates alone.

## 8. Identity and graph integrity

Identity priority:

1. Structured source ID
2. Stable canonical key
3. Similarity only for review flags, never identity/deletion/completion

Repeated decomposition with identical inputs and versions must produce identical nodes, edges, statuses, ordering, and graph hash.

## 9. Maturity staging

New checks begin in:

```text
shadow → advisory → blocking
```

Promotion requires measured precision/recall from the Grader Accuracy Program. Conflict, orphan, and unsupported-completion checks do not become blocking automatically.

## 10. Deep user-outcome decomposition

```text
scope tier
→ persona need
→ journey entry/exit
→ user-observable behavior
→ state machine
→ domain capability
→ API/data contract
→ code
→ test
→ runtime/evidence
→ owner
→ failure/recovery
→ operational gate
```

Samples cannot close real-data requirements. A merged PR is not an epic exit.

---

# Part C — Tokenomics Governance

## 11. Tokenomics operating rule

Human policy defines budget, routing, escalation, and safe-stop boundaries. Agents operate autonomously only inside those boundaries.

## 12. Tokenomics agents

- Guardrail Agent
- Router Agent
- FinOps Auditor Agent
- Routing Quality Validator Agent

## 13. Tokenomics skills

```text
token-preflight-estimation-skill
protected-content-aware-compression-skill
model-registry-maintenance-skill
complexity-scoring-skill
ledger-idempotency-skill
circuit-breaker-safe-stop-skill
routing-quality-sampling-skill
tokenomics-scorecard-skill
```

## 14. Tokenomics score

| Domain | Weight |
|---|---:|
| Budget Adherence | 20 |
| Routing Quality | 20 |
| Protected-Content Integrity | 20 |
| Ledger Integrity | 15 |
| Model Registry Currency | 10 |
| Circuit-Breaker Safety | 10 |
| Escalation Hygiene | 5 |

Caps:

- Protected-content violation caps overall score at 60.
- Double deduction sets ledger integrity to 0 for the period.
- Unsafe circuit break sets circuit-breaker safety to 0 for the event.

## 15. Tokenomics safety

- Every deduction is idempotent.
- Protected requirements/evidence/decisions are never compressed away.
- Circuit breakers persist checkpoint state before stopping.
- Model registry versions are explicit and deprecation-aware.

---

# Part D — Cross-Cutting Reliability and Self-Governance

## 16. Unified score composition

```text
final_score = min(
  weighted_domain_total,
  every applicable overall-score cap,
  every applicable domain-specific cap
)
```

Domain caps apply before weighted aggregation. Overall caps apply after aggregation. This is the only composition rule for MLDC, Nelson, and Tokenomics.

## 17. Score calibration

Scores must be checked against downstream outcomes:

- Nelson: onboarding time and incident rate
- MLDC: defect/rework and design-review cycle time
- Tokenomics: cost per outcome and quality agreement

Every weight/threshold change requires a version, evidence, and changelog entry.

## 18. Grader Accuracy Program

A rolling sample of agent scores is human-reviewed. Track agreement by domain in:

```text
.ai/nelson/grader-accuracy-log.json
```

A sustained agreement drop triggers scoring-agent review.

## 19. Process self-governance

Required artifacts:

```text
.ai/process/PROCESS_CURRENT_STATE.md
.ai/process/PROCESS_ROLLBACK.md
.ai/process/PROCESS_CHANGELOG.md
```

Required commands:

```text
/process-self-check
/nelson-score
/nelson-gate
/tokenomics-score
/tokenomics-gate
/grader-audit
```

The Process must run its own artifact, ownership, score, version, and gate checks.

## 20. Agent ownership

| Agent family | Sole ownership |
|---|---|
| MLDC | UI component/pattern/theme/accessibility evidence |
| Nelson | Repo artifacts, freshness, current state |
| Knowledge Steward | Requirements graph, traceability, conflict/orphan/drift |
| Tokenomics | Budget, routing, ledger, circuit breakers |
| Research | External standards baseline only |
| Epic Exit Steward | Final evidence assembly and verdict |

An ownership-conflict check blocks overlapping writes to the same evidence domain.

## 21. Combined gate

| Gate | Output |
|---|---|
| MLDC | Alignment score/verdict |
| Nelson | Repo score/verdict |
| Tokenomics | Cost/governance score/verdict |
| Grader Accuracy | Agreement rate |
| PR Evidence | Combined evidence |
| Certification | Proceed/cleanup/managed-risk/block |
| Session Close | Findings + self-check |

## 22. Bootstrap/upgrade definition of done

```text
[ ] MLDC findings/score/PR evidence generated where applicable
[ ] Nelson score and artifact inventory generated
[ ] Tokenomics budget/ledger/routing evidence generated where applicable
[ ] Graph integrity and decomposition checks run at current maturity
[ ] Grader Accuracy sampling active for scoring domains in use
[ ] Process self-check passes
[ ] Current state, architecture, runbook, rollback, ownership, and tests are current
[ ] No unsupported completion claims
```

## 23. Final operating statement

Process v9.51 makes delivery, repository knowledge, requirements, AI cost, score composition, grader accuracy, and Process self-governance measurable, evidence-backed, versioned, and accountable to their own accuracy.

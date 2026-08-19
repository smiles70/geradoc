# The Process v9.5 — Complete Operating Specification

## Full-Stack Agent Harness with MLDC Alignment and Nelson Repo Hygiene

**Version:** v9.5  
**Status:** Current-state complete specification  
**Purpose:** Provide a single authoritative markdown file that combines the v9.4 MLDC Alignment Layer with the v9.5 Nelson Repo Hygiene and Canonical Knowledge Layer.

---

## 1. Executive Summary

The Process v9.5 is a governed AI-assisted software delivery operating model that combines:

- full-stack delivery orchestration,
- MLDC-aligned front-end generation and validation,
- repository survivability scoring,
- canonical artifact generation,
- documentation drift detection,
- report quality assurance,
- and evidence-backed gate controls.

v9.5 preserves the existing Process pattern: existing Process agents continue to discover, design, build, test, audit, certify, and close work. New v9.5 capabilities score, shape, and persist the knowledge produced by those flows.

**Core operating claim:** The Process v9.5 makes repositories self-describing, self-scoring, continuously refreshed, and safer for human and AI-assisted delivery.

---

## 2. Process v9.5 Operating Model

The Process v9.5 has two major integrated layers:

1. **MLDC Alignment Layer**  
   Turns MetLife Design Components from a reference library into an active development constraint for UI work.

2. **Nelson Repo Hygiene and Canonical Knowledge Layer**  
   Turns repository quality from a subjective documentation concern into a measurable delivery quality gate.

Together, these layers ensure that generated and modified solutions are:

- aligned to approved UI components and patterns,
- accessible and responsive,
- package- and pipeline-ready,
- documented in canonical repo artifacts,
- operationally understandable,
- owned and supportable,
- and measurable through evidence-backed scoring.

---

# Part A — v9.4 MLDC Alignment Layer

## 3. MLDC Alignment Layer

Process v9.4 adds an MLDC Alignment Layer that turns MetLife Design Components from a reference library into an active development constraint. The purpose is to generate UI code that uses approved MLDC components, patterns, theme guidance, Storybook examples, accessibility expectations, responsive behavior, and CI/CD readiness from the start.

### 3.1 Operating Principle

If MLDC has an approved pattern, v9.5 uses it before creating custom UI. If no approved pattern exists, v9.5 creates a documented exception or MLDC contribution candidate.

---

## 4. Required MLDC Agents

### 4.1 MLDC Component Discovery Agent

Scans the app UI to identify MLDC usage, custom components, component wrappers, and MLDC replacement candidates.

### 4.2 MLDC Pattern Recommendation Agent

Maps each UI requirement to approved MLDC components, Storybook examples, CTAs, input controls, feedback patterns, navigation, icons, theming, and UX utilities.

### 4.3 MLDC Code Generation Guardrail Agent

Constrains generated React code to MLDC imports and approved composition patterns unless a documented exception exists.

### 4.4 MLDC Accessibility and Responsive Validation Agent

Validates accessibility and responsive behavior against MLDC and Storybook expectations.

### 4.5 MLDC Theme Compliance Agent

Detects hardcoded styling, incorrect Theme Provider usage, brand drift, and theme bypasses.

### 4.6 MLDC Design Consistency Agent

Compares implemented UI against MLDC standards, usage guide, style guide, and best practices.

### 4.7 MLDC Contribution Readiness Agent

Identifies missing components that should become reusable MLDC contribution candidates rather than local one-off code.

### 4.8 MLDC Package and Version Alignment Agent

Checks MLDC package versions, peer dependencies, React compatibility, Artifactory readiness, and consumption risk.

### 4.9 MLDC CI/CD Readiness Agent

Checks that MLDC-related changes are buildable, scannable, pipeline-safe, and release-ready.

### 4.10 MLDC Adoption Metrics Agent

Tracks component reuse, custom component reduction, design-system drift, exceptions, and adoption movement over time.

### 4.11 MLDC PR Evidence Agent

Adds MLDC usage, exception, accessibility, responsive, theme, and package evidence into PR-ready summaries.

### 4.12 MLDC Certification Agent

Writes MLDC alignment verdicts into certification, repo trust, PR gates, session close, and executive HTML reports.

---

## 5. Required MLDC Skills

### 5.1 mldc-component-discovery-skill

Finds MLDC imports, custom components, wrappers, duplicate UI patterns, and candidate replacements.

### 5.2 mldc-storybook-mapping-skill

Maps requirements to Storybook components, usage examples, props, and code snippets.

### 5.3 mldc-pattern-recommendation-skill

Recommends MLDC CTA, user input, feedback, navigation, theming, icons, and UX utility patterns.

### 5.4 mldc-code-generation-guardrail-skill

Prevents unnecessary custom UI generation and steers implementation to approved MLDC patterns.

### 5.5 mldc-accessibility-validation-skill

Validates accessibility expectations aligned to MLDC and Storybook guidance.

### 5.6 mldc-responsive-validation-skill

Checks responsive behavior across target screen sizes.

### 5.7 mldc-theme-compliance-skill

Detects hardcoded styles, theme bypasses, incorrect Theme Provider usage, and style drift.

### 5.8 mldc-design-consistency-skill

Scores consistency with MLDC style guide, React standards, usage guide, and best practices.

### 5.9 mldc-contribution-readiness-skill

Creates component contribution candidates when MLDC has a gap.

### 5.10 mldc-version-package-alignment-skill

Checks MLDC package versions, peer dependencies, React compatibility, and Artifactory consumption.

### 5.11 mldc-cicd-readiness-skill

Validates build, scan, package, and pipeline readiness for MLDC-related changes.

### 5.12 mldc-adoption-scorecard-skill

Calculates MLDC adoption, reuse, custom component reduction, exception rates, and design-system drift.

---

## 6. Required MLDC HTML Reports

### 6.1 MLDC Alignment Report

Summary of MLDC adoption, custom component debt, replacement opportunities, and alignment verdict.

### 6.2 MLDC Component Usage Map

Inventory of approved MLDC components, wrappers, custom components, and replacement candidates.

### 6.3 MLDC Pattern Plan

Recommended MLDC implementation plan for each UI requirement or page.

### 6.4 MLDC Accessibility and Responsive Report

Accessibility and responsive validation evidence for changed or generated UI.

### 6.5 MLDC Theme Compliance Report

Theme Provider usage, hardcoded style findings, theme drift, and remediation recommendations.

### 6.6 MLDC Contribution Candidate Report

Reusable component candidates that should be contributed to MLDC instead of remaining local.

### 6.7 MLDC Package Alignment Report

React compatibility, package version, peer dependency, and Artifactory consumption readiness.

### 6.8 MLDC Adoption Dashboard

Reusable HTML report showing reuse score, drift, exceptions, and adoption trend.

### 6.9 MLDC PR Evidence Report

PR-ready evidence block showing MLDC use, exceptions, validation, and release readiness.

---

## 7. MLDC Alignment Score

The MLDC Alignment Score measures whether UI development is using approved MetLife design components and patterns instead of creating unnecessary local UI infrastructure.

| Domain | Weight | Evidence Focus |
|---|---:|---|
| Component Reuse | 20 | Approved MLDC components used where applicable. |
| Custom Component Reduction | 15 | Custom UI replaced or justified. |
| Pattern Alignment | 15 | CTA, user input, feedback, navigation, theming, and icon patterns match MLDC guidance. |
| Accessibility Readiness | 15 | Accessibility evidence exists for changed UI. |
| Responsive Readiness | 10 | Responsive behavior validated across target screen sizes. |
| Theme Compliance | 10 | Theme Provider and token usage are correct; hardcoded styles are minimized. |
| Package Alignment | 10 | MLDC version, peer dependencies, React compatibility, and package consumption are clean. |
| Contribution Hygiene | 5 | Missing reusable components are proposed for MLDC contribution rather than local sprawl. |

### 7.1 MLDC Gate Meaning

| Score | Status | Gate Meaning |
|---|---|---|
| 90-100 | MLDC aligned | UI may proceed with strong design-system confidence. |
| 80-89 | Controlled | UI may proceed with documented exceptions or minor remediation. |
| 70-79 | Review required | Component reuse, theming, accessibility, or responsive gaps require review. |
| <70 | Block major UI change | UI implementation must be corrected before merge or release. |

---

## 8. MLDC Development Impact

v9.5 changes what gets created:

- Creates MLDC component plans before UI code.
- Creates UI with approved components before custom components.
- Creates theme-compliant code instead of hardcoded styling.
- Creates accessibility and responsive validation evidence.
- Creates PR evidence showing MLDC usage and exceptions.
- Creates contribution candidates when MLDC has a reusable gap.
- Creates adoption reporting showing reuse, drift, and custom UI debt.

---

# Part B — v9.5 Nelson Repo Hygiene and Canonical Knowledge Layer

## 9. Nelson Repo Hygiene and Canonical Knowledge Layer

Process v9.5 adds a repository hygiene operating model called **Nelson**.

Nelson turns repo quality from a subjective documentation concern into a measurable delivery quality gate. The v9.5 upgrade preserves the existing Process pattern: existing Process agents continue to discover, design, build, test, audit, certify, and close work. Nelson scores and persists repository knowledge produced by those existing flows.

**Core operating claim:** The Process v9.5 makes repositories self-describing, self-scoring, and continuously refreshed by converting Process bootstrap discoveries into canonical repository artifacts.

---

## 10. Why Nelson Exists

v9.4 embedded MLDC alignment into UI delivery. v9.5 extends the same evidence-first approach to repository hygiene.

Most enterprise repositories fail in one of four ways:

- Orientation exists but is incomplete.
- Architecture exists but is stale.
- Operational knowledge exists outside the repo.
- Current state lives in chat, meetings, or individual memory.

Nelson addresses those gaps through scorecards, gates, report generation, and canonical artifact updates.

---

## 11. Nelson Persona

Nelson is a composite reviewer representing elite repository practice across modern engineering organizations.

Nelson believes:

> A repository is not a code container. It is the operating memory of the application.

Nelson asks:

- Can a new engineer understand the repo in 15 minutes?
- Can the repo be run, tested, deployed, and supported without tribal knowledge?
- Are architecture and decisions current, owned, and discoverable?
- Does the repo show what exists, what is incomplete, what is blocked, and what comes next?
- Does Process-generated knowledge persist back into the repo?

---

## 12. Nelson Score Model

Total score: **100 points**

| Domain | Weight | Evidence Focus |
|---|---:|---|
| Repository Orientation | 10 | README, purpose, quick start, build/test/deploy summary. |
| Architecture | 15 | System context, dependencies, boundaries, data flow. |
| Decision Records | 10 | ADRs, tradeoffs, consequences, decision ownership. |
| Operational Readiness | 15 | Runbooks, rollback, recovery, monitoring, support. |
| Knowledge Transfer | 15 | Onboarding, environment setup, local run, developer guide. |
| Ownership | 10 | CODEOWNERS, SME path, escalation, support contacts. |
| Delivery Governance | 10 | CONTRIBUTING, PR policy, DOD, DOR, branch rules. |
| Security and Compliance | 5 | SECURITY.md, secrets, vulnerability process, threat model. |
| Testability | 10 | Test strategy, coverage expectations, test data, validation approach. |

### 12.1 Hidden Scoring Dimension: Current-State Visibility

Nelson also evaluates **Current-State Visibility**:

- What exists?
- What is incomplete?
- What is blocked?
- What is deferred?
- What should happen next?

Current-state visibility is not a separate point bucket. It applies score caps across the other domains when the repo cannot accurately explain its current condition.

---

## 13. Nelson Score Bands and Gates

| Score | Status | Process Gate Action |
|---|---|---|
| 95-100 | Industry Leading | Proceed. Repo is highly navigable, operable, and governed. |
| 85-94 | Enterprise Mature | Proceed with minor artifact cleanup. |
| 70-84 | Managed Risk | Proceed only if critical gaps are acknowledged and tracked. |
| <70 | Operational Risk | Block major work until onboarding, ownership, architecture, or runbook gaps are corrected. |

### 13.1 Nelson Cap Rules

- Missing README caps score at 90.
- Missing architecture documentation caps score at 85.
- Missing runbook or rollback for production systems caps score at 80.
- Missing ownership or escalation path caps score at 80.
- Missing current-state artifact caps score at 85.
- Documentation that conflicts with discovered repo evidence caps the relevant domain at 60.
- No evidence means no full score.

---

## 14. Required Nelson Agents

### 14.1 Nelson Research Agent

Maintains the external best-practice baseline and distinguishes source-backed engineering standards from local preference.

### 14.2 Repo Artifact Fingerprint Agent

Scans the repository for required hygiene artifacts and verifies presence, location, freshness, ownership, and completeness.

### 14.3 Bootstrap Knowledge Analyzer

Compares Process-discovered repo reality against existing repo documentation and identifies drift, gaps, stale decisions, missing runbooks, and undocumented dependencies.

### 14.4 Canonical Artifact Generator

Creates or updates the canonical repo artifacts generated from Process findings.

### 14.5 Nelson Scorecard Agent

Computes the Nelson Repo Score, applies score caps, and writes scorecard output into repo trust, PR, session close, and certification artifacts.

### 14.6 Pixel / Layout QA Agent

Reviews generated HTML or PDF reports for clipping, overlap, density, visual hierarchy defects, and broken layout before delivery or commit.

---

## 15. Required Nelson Skills

### 15.1 repo-hygiene-rubric-skill

Applies the Nelson scoring rubric consistently across repos.

### 15.2 artifact-detection-skill

Detects required artifacts, missing artifacts, stale artifacts, and non-canonical duplicates.

### 15.3 current-state-synthesis-skill

Converts Process scan findings into `docs/CURRENT_STATE.md`.

### 15.4 architecture-doc-generator-skill

Generates or updates `ARCHITECTURE.md` from discovered repo evidence.

### 15.5 runbook-generation-skill

Generates or updates `RUNBOOK.md`, including failure modes, rollback, support, and recovery guidance.

### 15.6 repo-report-html-skill

Creates executive and developer-friendly Nelson reports in HTML.

### 15.7 canonical-artifact-sync-skill

Writes generated artifacts back into the repo structure and records provenance.

### 15.8 repo-drift-detection-skill

Compares generated truth against existing documentation and flags drift.

### 15.9 onboarding-pack-generation-skill

Creates or updates onboarding, local setup, first task, and common failure-mode guidance.

### 15.10 repo-scorecard-rollup-skill

Aggregates Nelson scores across repos, teams, portfolios, and initiatives.

---

## 16. Required Nelson Reports

### 16.1 Nelson Repo Scorecard

```text
/.ai/nelson/nelson-scorecard.json
/.ai/nelson/nelson-scorecard.html
```

### 16.2 Repo Artifact Inventory

```text
/.ai/nelson/artifact-inventory.json
```

### 16.3 Repo Current State

```text
docs/CURRENT_STATE.md
```

### 16.4 Architecture Recovery Pack

```text
docs/ARCHITECTURE.md
docs/adr/ADR-candidates.md
```

### 16.5 Operational Readiness Pack

```text
docs/RUNBOOK.md
docs/ROLLBACK.md
```

### 16.6 Developer Onboarding Pack

```text
docs/ONBOARDING.md
```

### 16.7 Executive Hygiene Dashboard

```text
/.ai/nelson/repo-hygiene-dashboard.html
```

### 16.8 PR Evidence Block

```text
/.ai/nelson/pr-evidence.md
```

---

## 17. Canonical Repo Structure After v9.5 Bootstrap

```text
<repo>/
  README.md
  CONTRIBUTING.md
  SECURITY.md
  CODEOWNERS
  CHANGELOG.md
  docs/
    ARCHITECTURE.md
    CURRENT_STATE.md
    ONBOARDING.md
    RUNBOOK.md
    ROLLBACK.md
    TEST_STRATEGY.md
    adr/
      ADR-0001-purpose.md
      ADR-0002-framework.md
      ADR-0003-deployment.md
      ADR-0004-security.md
  .ai/
    nelson/
      artifact-inventory.json
      nelson-scorecard.json
      nelson-scorecard.html
      repo-hygiene-dashboard.html
      pr-evidence.md
    intake/
    repo-landscape/
    production-readiness/
```

---

## 18. v9.5 Bootstrap Flow

```text
Process initializes repo
  -> Repo Artifact Fingerprint Agent scans artifacts
  -> Bootstrap Knowledge Analyzer compares repo docs to discovered reality
  -> Nelson Scorecard Agent applies 100-point rubric and score caps
  -> Canonical Artifact Generator writes missing or refreshed artifacts
  -> Pixel / Layout QA Agent verifies generated HTML/PDF outputs
  -> Certification and PR gates consume Nelson score
```

---

## 19. v9.5 Slash Commands

```text
/nelson-score
```
Computes Nelson Repo Score from repo evidence.

```text
/nelson-artifacts
```
Lists required, missing, stale, duplicate, and non-canonical repo artifacts.

```text
/nelson-current-state
```
Generates or refreshes `docs/CURRENT_STATE.md`.

```text
/nelson-docs-sync
```
Creates or updates canonical repo artifacts from Process-generated findings.

```text
/nelson-report
```
Generates the HTML Nelson report pack.

```text
/nelson-gate
```
Returns proceed, proceed-with-warning, managed-risk, or block verdict.

```text
/nelson-rollup
```
Aggregates Nelson scores across a repo set or portfolio.

---

## 20. Process Integration Points

### 20.1 Universal Intake

Nelson consumes intake outputs to identify missing requirements, undocumented assumptions, and artifact gaps.

### 20.2 Repo Landscape

Nelson consumes repo map, package map, path inventory, CI/CD inventory, and dependency evidence.

### 20.3 Production Readiness Assessment

Nelson consumes PRA findings and maps them into operational readiness, runbook, rollback, and support artifacts.

### 20.4 Rick

Rick continues to score delivery readiness. Nelson scores repo survivability. Both write evidence-backed outputs and use cap rules.

### 20.5 OSS+

OSS+ findings feed Nelson security, dependency, and supply-chain documentation requirements.

### 20.6 FSAS

FSAS findings feed Nelson architecture and dependency documentation requirements.

### 20.7 MLDC v9.4

MLDC findings feed Nelson UI pattern documentation, design-system alignment, and front-end contribution hygiene.

---

## 21. Non-Duplication Policy Statement

Process v9.5 does not create agent sprawl.

If an existing Process agent already owns discovery, design, testing, auditing, security, or certification, Nelson consumes that evidence and scores or persists it. Nelson adds repo-hygiene scoring, canonical artifact generation, drift detection, and report quality assurance.

---

## 22. Combined Gate Model

v9.5 evaluates work through both UI alignment and repository survivability.

| Gate Area | Score / Output | Purpose |
|---|---|---|
| MLDC Alignment | MLDC Alignment Score | Determines whether generated or modified UI follows approved design-system patterns. |
| Nelson Repo Hygiene | Nelson Repo Score | Determines whether the repo is understandable, operable, owned, supportable, and current. |
| PR Evidence | MLDC PR Evidence + Nelson PR Evidence | Ensures reviewers see both UI alignment and repository hygiene findings. |
| Certification | MLDC verdict + Nelson gate verdict | Allows proceed, proceed with cleanup, managed risk, or block decisions. |
| Session Close | MLDC findings + Nelson artifacts | Ensures generated knowledge survives beyond the session. |

---

## 23. Definition of Done for v9.5 Bootstrap

A v9.5 bootstrap is complete when:

- MLDC findings are generated for applicable UI work.
- MLDC Alignment Score is generated when UI is generated or modified.
- MLDC PR Evidence Report exists for applicable UI changes.
- Nelson Repo Score is generated.
- Required repo artifacts are inventoried.
- Missing critical artifacts are created or documented as gaps.
- `docs/CURRENT_STATE.md` exists and reflects discovered reality.
- `ARCHITECTURE.md` exists or has a generated recovery draft.
- `RUNBOOK.md` and rollback guidance exist or are explicitly blocked.
- Ownership and escalation are documented.
- PR evidence block includes both MLDC and Nelson findings when applicable.
- Generated reports pass layout QA.

---

## 24. Requirements Ontology and Knowledge-Graph Layer

Process v9.5 permanently includes a Requirements Ontology and Knowledge-Graph Layer. This layer is cross-cutting and does not replace existing discovery, design, build, test, audit, certification, or closeout agents. It consumes their evidence and connects it to canonical requirements.

### 24.1 Canonical ontology

The minimum ontology includes:

- `SourceArtifact`
- `Requirement`
- `Capability`
- `Epic`
- `UserStory`
- `AcceptanceCriterion`
- `Test`
- `Evidence`
- `Owner`
- `Decision`
- `Dependency`
- `Gap`
- `Conflict`
- `Assumption`

### 24.2 Required relationships

The graph must support at least:

- `defined_by`
- `refines`
- `implements`
- `partially_implements`
- `verified_by`
- `evidenced_by`
- `planned_by`
- `owned_by`
- `depends_on`
- `blocked_by`
- `conflicts_with`
- `supersedes`
- `derived_from`
- `invalidated_by`

### 24.3 Canonical graph artifacts

The canonical graph and reports are stored under `.ai/nelson/`:

- `requirements-knowledge-graph.json`
- `requirements-graph-schema.json`
- `requirements-conflicts.json`
- `requirements-orphans.json`
- `requirements-drift-report.json`
- `requirements-traceability-report.md`

### 24.4 Requirements Knowledge Steward

Process v9.5 adds an orchestrated Requirements Knowledge Steward with the following non-duplicating capabilities:

- Requirements discovery
- Ontology modeling
- Entity extraction
- Knowledge-graph construction
- Traceability auditing
- Conflict detection
- Orphan detection
- Change-impact analysis
- Evidence verification
- Drift detection
- Canonical synchronization
- Graph QA and security validation

### 24.5 Permanent graph gates

For requirements-heavy work, session closeout must verify:

- Every material requirement has an authoritative source.
- Every implementable requirement maps to an epic or explicit deferment.
- Every claimed capability maps to code or an explicit research artifact.
- Every completed capability maps to a test or evidence record.
- Every critical gap has an owner and next action.
- Every material conflict is resolved, accepted, or escalated.
- The graph matches current repository evidence.
- Current-state and PR evidence artifacts are synchronized.

### 24.6 Graph-driven scoring and caps

The ontology layer is a cross-cutting Nelson gate rather than a new score bucket. Graph failures apply caps or block closeout in the relevant domains:

- Missing critical traceability: cap testability and delivery governance.
- Unresolved material conflict: cap architecture and delivery governance.
- Orphan critical requirement: cap ownership and testability.
- Unsupported completion claim: block certification.
- Graph drift: require remediation before release.

### 24.7 Refresh triggers

The graph must refresh on:

- New intake
- BRD/FRD/PRD changes
- Technical or operational specification changes
- New or changed epics
- New acceptance criteria
- Code capability changes
- Test changes
- ADR changes
- Pull-request creation and merge
- Release or scheduled repository scan

### 24.8 Process skills

Reusable repository skills under `.devin/skills/` provide the operating procedures for ontology extraction, graph construction, conflict/orphan/drift detection, impact analysis, evidence gates, synchronization, and closeout.

---

## 25. Deep Requirements Decomposition Gate

Process v9.5 requires every material requirement to decompose beyond a feature label or screen description. A requirement is not complete until the graph connects:

```text
Source requirement
  → persona need
  → journey entry/exit
  → user-observable behavior
  → domain capability
  → API/data contract
  → code module
  → automated test
  → runtime/evidence record
  → owner
  → failure state
  → recovery state
  → operational gate
```

### 25.1 Required decomposition questions

For every primary persona and journey, Process must answer:

- What does the user see?
- What does the user understand?
- What can the user do next?
- What happens if the system is wrong?
- What happens if the user stops?
- What happens if the network fails?
- What happens if content is incomplete?
- What evidence proves the behavior?

### 25.2 Anti-miss rule

Sample fixtures, static screens, contracts, and passing build checks cannot satisfy a complete user-outcome requirement unless the uploaded/real-data path is also mapped and evidenced.

### 25.3 Geragogy decomposition

For a geragogy-based requirement, the graph must explicitly represent document-level capabilities, not only UI principles:

- Orientation
- Key-information extraction
- Deadline extraction
- Action extraction and prioritization
- Plain-language transformation
- Progressive disclosure
- Reassurance and non-shaming feedback
- Help escalation
- Original-source verification

Missing decomposition applies the graph evidence cap and prevents a `COMPLETE` verdict.

### 25.4 Idempotent decomposition requirements

Repeated decomposition of identical sources with identical versions must produce the same nodes, edges, statuses, and graph hash.

Required controls:

- Stable IDs from canonical source, entity type, and canonical key.
- Upsert semantics rather than append-only graph writes.
- Stable edge keys using `from::relation::to`.
- Deterministic node and edge ordering.
- Source, parser, ontology, and decomposition version hashes.
- Explicit source-removal state before deletion.
- Graph integrity validation before closeout.
- Deterministic decomposition diff before accepting changes.

Fuzzy similarity, embeddings, and impact mathematics may prioritize review, but cannot independently assign identity, delete requirements, or mark work complete.

---

## 26. User-Outcome and Epic-Exit Stewardship Layer

Process v9.5 adds a User-Outcome and Epic-Exit Stewardship Layer. It extends the Requirements Knowledge Steward with deterministic decomposition, state-machine coverage, real-data-path checks, browser E2E, visual/accessibility evidence, and truthful completion gates.

### 26.1 Steward capabilities

- Scope tiering: POC, MVP, production, enterprise, research-only, approval-only.
- Atomic acceptance decomposition.
- Persona and journey decomposition.
- State-machine and recovery modeling.
- Real-data-path verification.
- Truthfulness and overclaim auditing.
- Visual E2E and Playwright orchestration.
- Accessibility journey orchestration.
- Evidence freshness checking.
- Graph idempotence and integrity checking.
- Epic exit certification.

### 26.2 Required epic exit path

```text
coding complete
→ unit/contract tests
→ integration/API tests
→ regression suite
→ Playwright E2E
→ visual browser review
→ accessibility journey
→ failure/recovery matrix
→ graph/evidence synchronization
→ epic exit verdict
```

### 26.3 Epic exit verdicts

- `COMPLETE`: all required P0 criteria and evidence pass.
- `COMPLETE_WITH_ACCEPTED_RISK`: only documented non-P0 risks remain with owner and next action.
- `BLOCKED`: provider, decision, approval, or technical dependency prevents closure.
- `NOT_READY`: code or evidence is incomplete.

A merged PR is not an epic exit by itself.

### 26.4 API-first computational closure

Computational and research-solvable gaps must receive an API/interface plan before being deferred. The plan must identify:

- Endpoint or adapter boundary.
- Input/output contract.
- State transitions.
- Failure and recovery behavior.
- Security/data boundary.
- Test fixture and evidence strategy.
- Explicit external dependency or approval gate.

Human, legal/IP, calibration approval, and production-release approval may be deferred, but their technical interfaces and evidence prerequisites must still be recorded.

---

## 27. Final Operating Statement

The Process v9.5 turns UI alignment, repository hygiene, requirements traceability, deep user-outcome decomposition, user-outcome stewardship, and API-first epic closure into measurable, enforceable, continuously refreshed delivery quality systems.

The Requirements Ontology and Knowledge-Graph Layer ensures that strategic intent, requirements, capabilities, epics, tests, evidence, ownership, dependencies, conflicts, and current-state truth remain connected throughout delivery.

The result is a repository that is easier to onboard, safer to change, easier to support, cleaner to review, more consistent in UI delivery, more traceable in requirements delivery, and more suitable for human and AI-assisted development.

MLDC Alignment ensures the UI is shaped by approved design-system components, patterns, themes, accessibility guidance, responsive behavior, and CI/CD expectations.

Nelson ensures the repository preserves operating knowledge, current-state truth, ownership, architecture, onboarding, support, rollback, security, and testability evidence.

The result is a repo that is easier to onboard, safer to change, easier to support, cleaner to review, more consistent in UI delivery, and more suitable for human and AI-assisted development.
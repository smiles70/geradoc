# Demo-to-POC Bridge Plan

## Process v9.5 Epic Portfolio

**Portfolio ID**: BRIDGE-001  
**Status**: Ready for Development  
**Created**: August 19, 2026  
**Base**: ClarityDoc Mocked Demo complete on `main`; POC branch operational through D2  
**Integration target**: `develop`  
**Owner**: @Kmiles

> This portfolio promotes validated demo UX into the POC without merging demo code directly into the POC branch or replacing the stable API contract prematurely.

---

## 1. Bridge Objective

Move from:

```text
/demo                 = complete mocked UX reference
/poc/backend          = real processing and persistence POC
/poc/frontend         = API seam only
```

to:

```text
/poc/frontend         = reusable product-facing UI
/poc/backend          = real processing API
/shared/contracts     = versioned data contracts where required
/demo                 = stable presentation/demo reference
```

The bridge must preserve:

- Senior-first interaction patterns
- Caregiver permission concepts
- Accessibility controls
- Mocked-demo-compatible response fields
- Backend authority over processing and presentation decisions
- APUCS shadow-only behavior
- Separate ownership and review boundaries

---

## 2. Branch and Merge Strategy

### Branches

| Workstream | Branch | Base | Merge target |
|---|---|---|---|
| Bridge planning | `feature/demo-poc-bridge-plan` | `main` | `main` |
| Contract preparation | `feature/bridge-contracts` | `develop` | `develop` |
| Component promotion | `feature/bridge-ui-components` | `develop` | `develop` |
| API integration | `feature/bridge-api-integration` | `develop` | `develop` |
| State/accessibility | `feature/bridge-state-accessibility` | `develop` | `develop` |
| Validation/closeout | `feature/bridge-validation-closeout` | `develop` | `develop` |

### Rules

- Do not edit `demo/` during bridge implementation unless fixing a demo regression.
- Do not directly replace the POC backend response contract without a reviewed versioning decision.
- Each epic gets its own PR into `develop`.
- Staging validation occurs on `develop`.
- Only after all bridge gates pass does `develop` merge to `main`.

---

## 3. Dependency Graph

```text
Epic 1: Contract and bridge foundation
              ↓
Epic 2: Component promotion
              ↓
Epic 3: Real API integration
              ↓
Epic 4: Backend-authoritative state and accessibility
              ↓
Epic 5: End-to-end validation and staging
              ↓
Epic 6: Process v9.5 closeout and release decision
```

Epics 2 and 3 may be developed in parallel after Epic 1, but Epic 4 requires both the promoted components and the API integration seam.

---

# EPIC 1 — Bridge Foundation and Contract Freeze

**Epic ID**: BRIDGE-001-A  
**Priority**: P0  
**Status**: Ready for Development

## Objective

Freeze the boundary between the completed demo and the POC before moving code. Establish a versioned contract, ownership boundaries, and acceptance criteria.

## User Stories

### A1. Version the document result contract

**As an** engineer, **I want** the POC API contract documented and versioned, **so that** promoted demo components do not require avoidable rewrites.

Acceptance criteria:

- [ ] Legacy fields remain available: `id`, `type`, `title`, `fileName`, `pages`, `summary`, `keyInfo`, `actions`.
- [ ] Research metadata is optional and additive.
- [ ] `researchMetadata` cannot be required by the demo UI.
- [ ] Schema validation exists in CI.
- [ ] Contract version is documented.

### A2. Define ownership boundaries

**As a** maintainer, **I want** demo and POC ownership separated, **so that** parallel work does not create merge conflicts.

Acceptance criteria:

- [ ] `/demo` remains the completed UX reference.
- [ ] `/poc/frontend` owns promoted product-facing components.
- [ ] `/poc/backend` owns real processing.
- [ ] No bridge PR modifies unrelated root architecture.

### A3. Define bridge acceptance gates

- [ ] Senior flow remains functional.
- [ ] Caregiver flow remains functional.
- [ ] API errors have senior-friendly messages.
- [ ] Loading and REVIEW states are represented.
- [ ] APUCS remains shadow-only.
- [ ] `npm test`, build, lint, and accessibility checks are required.

## Deliverables

```text
poc/contracts/document-result.schema.json
poc/frontend/README.md
.ai/production-readiness/bridge-contract.md
```

## Definition of Done

- Contract approved by backend and frontend reviewers.
- No demo behavior changed.
- PR merged into `develop`.

---

# EPIC 2 — Promote Stable Demo Components

**Epic ID**: BRIDGE-001-B  
**Priority**: P0  
**Depends on**: Epic 1

## Objective

Promote only reusable, stable demo components into the POC frontend without copying demo-only assumptions into production code.

## Components to Promote

| Demo component | POC destination | Promotion notes |
|---|---|---|
| `DocumentViewer` | `poc/frontend/components/DocumentViewer` | Replace mock data import with props/API data |
| `KeyInfoCards` | `poc/frontend/components/KeyInfoCards` | Preserve source-reference display |
| `ActionItems` | `poc/frontend/components/ActionItems` | Separate local completion from server persistence |
| `AccessibilityControls` | `poc/frontend/components/AccessibilityControls` | Preserve text-size and contrast behavior |
| `ProcessingScreen` | `poc/frontend/components/ProcessingScreen` | Adapt to real job status |
| `SeniorDashboard` | `poc/frontend/components/SeniorDashboard` | Replace sample document list with API query |
| `CaregiverDashboard` | `poc/frontend/components/CaregiverDashboard` | Keep mock permission state until auth exists |

## User Stories

### B1. Promote the document viewer

Acceptance criteria:

- [ ] Viewer accepts the contract as props.
- [ ] Viewer renders all three summary levels.
- [ ] Viewer renders optional research metadata without requiring it.
- [ ] Viewer displays source references when present.
- [ ] Viewer handles missing confidence/provenance gracefully.

### B2. Promote action and key-information components

Acceptance criteria:

- [ ] Components do not import `sampleDocuments.js` directly.
- [ ] Components receive data through props or query hooks.
- [ ] Action completion has an explicit persistence boundary.
- [ ] Key information displays dates and amounts without reinterpreting them.

### B3. Promote accessibility behavior

Acceptance criteria:

- [ ] Keyboard navigation remains functional.
- [ ] Focus indicators remain visible.
- [ ] Text controls remain available.
- [ ] High-contrast mode remains available.
- [ ] No hardcoded demo-only navigation assumptions remain.

## Definition of Done

- Promoted components render with fixture data.
- Demo directory is unchanged.
- Component tests pass.
- Accessibility checks pass.
- PR merged into `develop`.

---

# EPIC 3 — Connect the POC API

**Epic ID**: BRIDGE-001-C  
**Priority**: P0  
**Depends on**: Epics 1 and 2

## Objective

Replace the promoted frontend's mock data source with the POC API while preserving the user experience.

## User Stories

### C1. Submit a document

Acceptance criteria:

- [ ] Frontend uses `poc/frontend/documentApi.js`.
- [ ] Upload sends `multipart/form-data`.
- [ ] API returns a job or processing identifier.
- [ ] Upload errors are presented in plain language.
- [ ] No document contents are logged to the browser console.

### C2. Display job status

Acceptance criteria:

- [ ] Processing screen reflects `RECEIVED`, `EXTRACTING`, `SIMPLIFYING`, `COMPLETED`, `REVIEW`, and `FAILED` states.
- [ ] Polling or event updates are bounded and cancellable.
- [ ] Timeouts produce a recoverable message.
- [ ] Failed jobs expose retry behavior where allowed.

### C3. Render the result contract

Acceptance criteria:

- [ ] `DocumentViewer` renders the real API response.
- [ ] Summary levels remain selectable.
- [ ] Key information and actions render correctly.
- [ ] Optional `researchMetadata` does not break legacy responses.
- [ ] APUCS shadow metadata is not treated as user-visible approval.

## Definition of Done

- One approved synthetic document completes end-to-end.
- Fixture and real extraction modes are selectable by configuration.
- API integration tests pass.
- PR merged into `develop`.

---

# EPIC 4 — Backend-Authoritative State and Accessibility Bridge

**Epic ID**: BRIDGE-001-D  
**Priority**: P0  
**Depends on**: Epic 3

## Objective

Connect the promoted UI to backend-approved processing and presentation states while preserving user agency and accessibility.

## User Stories

### D1. Render backend-approved state

Acceptance criteria:

- [ ] Frontend does not independently infer APUCS state.
- [ ] Backend response can specify `SIMPLE`, `STANDARD`, `DETAILED`, or `REVIEW`.
- [ ] Frontend renders the approved state.
- [ ] Hard constraint failures route to REVIEW.
- [ ] User override is honored only when hard constraints pass.

### D2. Preserve accessibility during state changes

Acceptance criteria:

- [ ] State changes are announced to assistive technology.
- [ ] Focus moves predictably after processing completion.
- [ ] 200% zoom does not clip content.
- [ ] REVIEW state is understandable without color alone.
- [ ] Large-print and high-contrast controls remain functional.

### D3. Maintain caregiver boundary

Acceptance criteria:

- [ ] Caregiver UI does not imply real permissions before auth exists.
- [ ] Mock permissions are visibly labeled as demo/POC behavior.
- [ ] No caregiver data is persisted without an authorization model.

## Definition of Done

- Backend-approved state renders correctly.
- Accessibility and state-transition tests pass.
- REVIEW behavior has been tested.
- PR merged into `develop`.

---

# EPIC 5 — End-to-End Validation and Staging

**Epic ID**: BRIDGE-001-E  
**Priority**: P0  
**Depends on**: Epic 4

## Objective

Validate that the bridged system preserves the demo experience while using the real POC processing path.

## Validation Scenarios

1. Clean synthetic insurance PDF.
2. Invalid file type.
3. Oversized file.
4. Extraction failure.
5. Simplification failure.
6. REVIEW due to anchor disagreement.
7. User-selected detailed override.
8. Missing optional research metadata.
9. Caregiver view without production auth.
10. Keyboard-only flow.
11. Screen-reader flow.
12. Mobile/responsive flow.

## Acceptance Criteria

- [ ] Senior journey completes from upload to result.
- [ ] Caregiver journey remains clearly scoped.
- [ ] Result fields match the contract.
- [ ] Error messages are understandable.
- [ ] No console errors.
- [ ] No source documents enter Git.
- [ ] APUCS remains shadow-only.
- [ ] Build, lint, unit, integration, and accessibility checks pass.
- [ ] Staging deployment is repeatable.
- [ ] Test evidence is captured.

## Definition of Done

- Staging validation report completed.
- Known gaps and limitations recorded.
- POC evidence updated.
- PR merged into `develop`.

---

# EPIC 6 — Process v9.5 Closeout and Release Decision

**Epic ID**: BRIDGE-001-F  
**Priority**: P0  
**Depends on**: Epic 5

## Objective

Close the bridge with evidence, ownership, and a controlled decision about whether `develop` can merge to `main`.

## Closeout Tasks

- [ ] Update `docs/CURRENT_STATE.md`.
- [ ] Update `.ai/nelson/artifact-inventory.json`.
- [ ] Update `.ai/nelson/pr-evidence.md`.
- [ ] Update `docs/ARCHITECTURE.md` with bridge boundaries.
- [ ] Update `docs/TEST_STRATEGY.md` with integration scenarios.
- [ ] Update `docs/RUNBOOK.md` with bridged startup and failure handling.
- [ ] Update `docs/ROLLBACK.md` with bridge rollback.
- [ ] Recalculate Nelson score.
- [ ] Record unresolved provider, human, legal, and production gaps.
- [ ] Obtain reviewer approval.

## Release Gate

```text
Proceed to main only when:
- all bridge P0 acceptance criteria pass;
- demo remains independently runnable;
- POC API contract is stable;
- APUCS remains correctly feature-flagged;
- staging evidence is complete;
- rollback is tested;
- Process v9.5 artifacts are current.
```

---

## 4. Conflict-Avoidance Rules

### Files demo work must not change

```text
demo/
```

### Files requiring sequential ownership

```text
README.md
docs/CURRENT_STATE.md
.ai/nelson/artifact-inventory.json
.ai/nelson/pr-evidence.md
CODEOWNERS
```

### Integration principle

The demo provides the UX reference. The POC provides the real data and processing. The bridge replaces data sources and adds state integration; it does not rewrite the demo experience wholesale.

---

## 5. Final Portfolio Status

```text
Demo implementation:       Complete on main
POC backend:                Operational research POC
POC frontend seam:         Available
Bridge plan:               Ready for development
Bridge implementation:     Not started
APUCS:                     Research/shadow-only
MVP:                       Not ready
Production:                Not ready
```

**Next action**: Start BRIDGE-001-A from `develop` and create the contract-freeze PR before promoting components.

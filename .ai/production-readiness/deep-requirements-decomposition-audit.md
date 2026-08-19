# Deep Requirements Decomposition Audit

**Date**: August 19, 2026  
**Method**: Process v9.5 + ontology + knowledge graph + source-code review  
**Purpose**: Prevent high-level requirements from appearing complete without decomposition into persona outcomes, journey steps, capabilities, code, tests, evidence, owners, and operational gates

## Executive finding

The previous geragogy miss exposed a systemic issue: some requirements were decomposed into screens and broad features, but not into complete user outcomes and code-verifiable capabilities.

The audit found the following high-level areas requiring deeper decomposition:

| Area | Current decomposition | Risk |
|---|---|---|
| Geragogy | UI principles and sample summaries | Uploaded documents lack complete geragogical transformation |
| Document processing | Upload/extract/view contracts | OCR, layout, confidence, and semantic safety are not fully decomposed |
| Authentication | Registration/login requirement IDs | No identity journey, token/session model, or authorization graph |
| Caregiver | Dashboard and permissions requirements | No invitation/approval/revocation journey implementation |
| Actions | Action extraction/tracking IDs | No durable lifecycle, reminders, escalation, or failure model |
| Notifications | Notification requirements | No channel, consent, delivery, retry, or quiet-hours decomposition |
| Cognitive governance | APUCS/complexity requirements | Research state is not fully decomposed into production runtime controls |
| Spanish | Bilingual scope | Foundation utilities exist; end-to-end language capability is not decomposed |
| Persistence | Storage requirements | POC JSON/source storage is not mapped to user/tenant/retention/security behavior |
| Search/history | Document list/search/delete/export requirements | No returning-user document-management journey |
| Billing | Subscription/payment requirements | No account, entitlement, payment-failure, or support journey |
| Enterprise | Health-plan/enterprise objectives | No tenant, integration, reporting, or support decomposition |
| Operations | Health/monitoring/deployment requirements | Correlation IDs exist; SLO/alert/recovery behavior is incomplete |
| Accessibility | WCAG/senior UI requirements | Controls exist; state-by-state execution and focus contracts need decomposition |

## Required decomposition chain

Every material requirement must now decompose through this chain:

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
  → operational failure/recovery state
```

If any link is missing, the requirement is `PARTIAL`, not `COMPLETE`.

## 1. Geragogical document transformation decomposition

### Required capabilities

```text
CAP-GERAGOGY-ORIENTATION
CAP-GERAGOGY-KEY-INFO
CAP-GERAGOGY-DEADLINES
CAP-GERAGOGY-ACTIONS
CAP-GERAGOGY-PLAIN-LANGUAGE
CAP-GERAGOGY-PROGRESSIVE-DISCLOSURE
CAP-GERAGOGY-REASSURANCE
CAP-GERAGOGY-HELP-ESCALATION
CAP-GERAGOGY-SOURCE-VERIFICATION
```

### Required user-visible behavior

- Identify what the document is.
- Explain why it matters.
- Surface key dates, amounts, entities, conditions, and obligations.
- State what Margaret may need to do.
- State when she may need to do it.
- Explain uncertainty without guessing.
- Preserve access to the original source.
- Provide Simple, Standard, and Detailed views that remain complete.
- Offer help without shaming or removing agency.

### Required code/evidence path

```text
uploaded PDF
  → extraction
  → typed anchors
  → key information
  → action/deadline extraction
  → safe transformation
  → provenance
  → geragogical viewer
  → senior journey test
```

## 2. Other under-decomposed requirements

### Authentication and authorization

Current high-level requirement:

```text
Support registration, login, senior/caregiver roles, and permissions.
```

Required decomposition:

```text
registration
→ email/identity verification
→ login/session
→ role assignment
→ document ownership
→ caregiver invitation
→ senior approval
→ document-level authorization
→ revocation
→ unauthorized-access failure
→ audit evidence
```

### Actions and reminders

Current high-level requirement:

```text
Extract, prioritize, and track actions.
```

Required decomposition:

```text
extract action
→ identify source span
→ identify deadline
→ assign priority
→ show action
→ start action
→ pause action
→ complete action
→ undo action
→ overdue state
→ reminder consent
→ reminder delivery
→ failure/escalation
```

### Notifications

Current high-level requirement:

```text
Notify users and caregivers.
```

Required decomposition:

```text
notification event
→ consent check
→ channel selection
→ quiet hours
→ template/language
→ delivery attempt
→ retry
→ provider failure
→ preference change
→ audit record
```

### Persistence and data lifecycle

Current high-level requirement:

```text
Store documents and results securely.
```

Required decomposition:

```text
create
→ associate owner/tenant
→ encrypt
→ authorize read
→ version result
→ retain
→ export
→ delete
→ verify deletion
→ backup
→ restore
→ audit
```

### Spanish capability

Current high-level requirement:

```text
Support English and Spanish.
```

Required decomposition:

```text
language detect
→ user override
→ date normalization
→ amount normalization
→ entity extraction
→ obligation extraction
→ negation/condition preservation
→ candidate generation
→ advice boundary
→ REVIEW
→ UI labels/status
→ source references
→ language-specific tests
```

### Accessibility

Current high-level requirement:

```text
Support WCAG 2.2 AA and senior-first interaction.
```

Required decomposition:

```text
keyboard entry
→ focus target
→ focus restoration
→ zoom 200%
→ contrast state
→ text scaling
→ live announcement
→ error announcement
→ screen-reader label
→ reduced-motion behavior
→ long-content navigation
→ mobile layout
```

### Operations

Current high-level requirement:

```text
Monitor and operate the service.
```

Required decomposition:

```text
request correlation
→ structured event
→ metric
→ threshold
→ alert
→ on-call action
→ runbook
→ rollback
→ recovery
→ post-incident evidence
```

## 3. New Process v9.5 decomposition gates

A requirement cannot be marked complete unless its graph contains:

```text
[ ] SourceArtifact
[ ] Requirement
[ ] Persona need
[ ] Journey entry and exit
[ ] User-observable acceptance criteria
[ ] Capability nodes
[ ] API/data contract
[ ] Code artifact
[ ] Automated test
[ ] Runtime/evidence artifact
[ ] Owner
[ ] Failure state
[ ] Recovery state
[ ] Operational gate
```

### Anti-miss rule

For every primary persona and journey, Process must ask:

```text
What does the user see?
What does the user understand?
What can the user do next?
What happens if the system is wrong?
What happens if the user stops?
What happens if the network fails?
What happens if the content is incomplete?
What evidence proves the behavior?
```

## 4. Corrective graph additions

The graph must include explicit nodes for:

```text
CAP-GERAGOGY-ORIENTATION
CAP-GERAGOGY-KEY-INFO
CAP-GERAGOGY-DEADLINES
CAP-GERAGOGY-ACTIONS
CAP-GERAGOGY-PLAIN-LANGUAGE
CAP-GERAGOGY-PROGRESSIVE-DISCLOSURE
CAP-GERAGOGY-REASSURANCE
CAP-GERAGOGY-HELP-ESCALATION
CAP-GERAGOGY-SOURCE-VERIFICATION
GAP-AUTH-JOURNEY
GAP-ACTION-LIFECYCLE
GAP-NOTIFICATION-LIFECYCLE
GAP-DATA-LIFECYCLE
GAP-ENTERPRISE-JOURNEY
GAP-REQUIREMENT-EVIDENCE
```

## Final audit verdict

```text
Under-decomposition found:      Yes
Geragogy decomposition fixed:   Planned for explicit graph addition
Other high-level gaps found:    Yes — 14 areas listed
Process control added:           Deep decomposition gate required
Current release posture:         Managed Risk
```

This audit exists to ensure that future planning cannot mark a screen, endpoint, or sample fixture as complete when the underlying persona outcome and failure/recovery behavior remain undeveloped.

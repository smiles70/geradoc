# Epic Portfolio — Remaining Production-Gap Closure

**Portfolio ID**: RGC-001  
**Process**: v9.5  
**Status**: Ready for Development  
**Scope**: Close the production-shaped gaps remaining after the controlled POC closure portfolio

## Objective

Move ClarityDoc from a controlled POC to a production-shaped, bilingual, authorized, supportable senior document service without claiming completion before every persona, journey, capability, failure state, recovery state, test, and evidence path exists.

## Dependency order

```text
RGC-001 OCR/layout/provenance
        ↓
RGC-002 English/Spanish processing
        ↓
RGC-003 identity/authentication
        ↓
RGC-004 caregiver permissions
        ↓
RGC-005 durable persistence/data lifecycle
        ↓
RGC-006 notifications/reminders
        ↓
RGC-007 calibrated APUCS activation
        ↓
RGC-008 accessibility certification
        ↓
RGC-009 operations/deployment/recovery
        ↓
RGC-010 integrated closure
```

---

# EPIC RGC-001 — OCR, Complex Layout, and Provenance

**Priority**: P0  
**Closes**: `GAP-REALOCR`

## Stories

- Integrate an OCR provider/engine behind an adapter.
- Detect native-text, scanned, mixed, encrypted, malformed, and empty PDFs.
- Route single-column, multi-column, table, form, and mixed layouts.
- Preserve reading order and page/coordinate provenance.
- Retain OCR confidence and extraction diagnostics.
- Route low-confidence or unsupported content to REVIEW.
- Validate late-page deadlines, amounts, conditions, and obligations.

## Gate

```text
Every supported document either produces source-grounded content
or an actionable REVIEW state; no silent empty success.
```

---

# EPIC RGC-002 — Complete English and Spanish Processing

**Priority**: P0  
**Closes**: `GAP-SPANISH`

## Stories

- Detect language and permit explicit override.
- Normalize English and Spanish dates, amounts, entities, and identifiers.
- Preserve negation, conditions, obligations, and deadlines in both languages.
- Extract actions and key information in both languages.
- Provide language-specific candidate generation and advice boundaries.
- Localize status, error, REVIEW, and help messages.
- Preserve shared page/span provenance contract.

## Gate

```text
English and Spanish documents follow equivalent extraction,
provenance, REVIEW, action, and viewing paths.
```

---

# EPIC RGC-003 — Identity, Authentication, and Authorization

**Priority**: P0  
**Closes**: `GAP-AUTH-JOURNEY`

## Stories

- Registration and account verification.
- Login, logout, session expiration, and recovery.
- Senior and caregiver roles.
- Document ownership.
- Authorized source-PDF access.
- Tenant isolation.
- Unauthorized and expired-session failure states.
- Security audit events without document-content logging.

## Gate

```text
No user, caregiver, or service can access a source or result
without server-enforced authorization.
```

---

# EPIC RGC-004 — Caregiver Permissions and Support

**Priority**: P1  
**Closes**: caregiver journey gaps

## Stories

- Senior sends caregiver invitation.
- Caregiver accepts or declines.
- Senior approves document-level access.
- Senior controls action-assistance permissions.
- Caregiver sees only approved documents/actions.
- Senior revokes access immediately.
- Permission events are auditable.
- Mock caregiver behavior is removed or clearly separated from authorized behavior.

## Gate

```text
David's journey is complete only when Margaret's consent,
permissions, and revocation are enforced.
```

---

# EPIC RGC-005 — Durable Persistence and Data Lifecycle

**Priority**: P0  
**Closes**: `GAP-DATA-LIFECYCLE`

## Stories

- Replace POC JSON persistence with production database boundary.
- Persist users, documents, jobs, results, source references, actions, and permissions.
- Use transactional source/result association.
- Prevent concurrent writes and duplicate records.
- Implement retention, deletion, export, backup, and restore.
- Track data lifecycle events.
- Preserve migration and rollback paths.

## Gate

```text
A returning user can safely recover documents and actions
across sessions and devices without unauthorized access.
```

---

# EPIC RGC-006 — Notifications, Reminders, and Escalation

**Priority**: P1  
**Closes**: `GAP-NOTIFICATION-LIFECYCLE`, `GAP-ACTION-LIFECYCLE`

## Stories

- Processing completion notification.
- Deadline reminder scheduling.
- Caregiver invitation notification.
- Permission-change notification.
- Opt-in/opt-out and quiet hours.
- Email/SMS/push provider adapter.
- Retry and provider failure states.
- Notification audit trail.
- Struggle/help escalation rules that preserve senior control.

## Gate

```text
Every notification is consented, explainable, retryable,
and disableable.
```

---

# EPIC RGC-007 — Calibrated APUCS Activation

**Priority**: P0 after separate approval gates

## Stories

- Complete candidate backend registry.
- Complete hard constraint validation.
- Complete weighted candidate selection.
- Add English/Spanish/domain/modality calibration profiles.
- Add calibration status and drift monitoring.
- Keep APUCS behind a feature flag.
- Preserve baseline fallback.
- Preserve REVIEW and provenance behavior.
- Record algorithm/profile/version metadata.
- Compare shadow versus visible output.

## Gate

```text
APUCS cannot become user-visible until technical,
human, accessibility, and legal/IP gates separately approve activation.
```

---

# EPIC RGC-008 — Accessibility and Senior Journey Certification

**Priority**: P0

## Stories

- Complete keyboard-only forward journey.
- Complete keyboard-only reverse journey.
- Screen-reader labels, status, errors, tabs, and source preview.
- 200% zoom without essential-content loss.
- High contrast across all states.
- Focus restoration after navigation/error/completion.
- Reduced-motion behavior.
- Long-document and mobile viewport handling.
- Visual evidence capture and defect remediation.

## Gate

```text
Margaret can complete and reverse the declared journey
without pointer input or inaccessible state transitions.
```

---

# EPIC RGC-009 — Operations, Deployment, and Recovery

**Priority**: P0  
**Closes**: `GAP-OPS`

## Stories

- Structured event pipeline.
- Metrics for jobs, failures, REVIEW, OCR, latency, storage, and notifications.
- Dashboards and alerts.
- SLO definitions.
- Deployment automation.
- Feature flags and rollback.
- Backup/restore drill.
- Storage quota and cleanup monitoring.
- Incident response runbook.
- Ownership and escalation.

## Gate

```text
Operators can identify, diagnose, recover, and explain every failed job.
```

---

# EPIC RGC-010 — Integrated Requirements, Persona, and Journey Closure

**Priority**: P0  
**Depends on**: RGC-001 through RGC-009

## Stories

Run the complete matrix across:

```text
Margaret first-time journey
Margaret returning journey
Margaret English journey
Margaret Spanish journey
David caregiver journey
Enterprise/health-plan journey
Native PDF
Scanned PDF
Table/form PDF
Malformed/encrypted PDF
Network failure
Retry/cancel/timeout
Refresh/Back/Start Over
Keyboard/screen reader/200%/high contrast
Unauthorized source request
Concurrent persistence
Notification failure
APUCS REVIEW and fallback
```

For each case record:

```text
trigger
→ expected visible state
→ expected backend state
→ recovery action
→ code path
→ automated test
→ visual evidence
→ graph edge
→ owner
```

## Final gate

```text
COMPLETE only when every P0 requirement has:

persona
→ journey
→ behavior
→ capability
→ API/data contract
→ code
→ test
→ evidence
→ owner
→ failure
→ recovery
```

## Exclusions

Human comprehension studies, formal accessibility certification, legal/IP review, and production launch approval remain separate gates. This portfolio creates the technical implementation and evidence paths for those gates; it does not substitute for them.

# Epic Portfolio — POC Functional Closure from Deep Decomposition

**Portfolio ID**: POC-CLOSE-DECOMP-001  
**Process**: v9.5  
**Status**: Ready for Development  
**Scope**: Make the current POC fully functional against its declared English/senior/PDF scope while preserving explicit boundaries for production-only work

## Objective

Close the POC gaps exposed by deep requirements decomposition. Every epic maps user outcomes to persona journeys, capabilities, code, tests, evidence, ownership, failure states, and recovery states.

## Dependency graph

```text
POC-001 Idempotent Requirement Decomposition
        ↓
POC-002 Geragogical Uploaded-Document Transformation
        ↓
POC-003 Extraction, OCR Boundary, Layout, and Provenance
        ↓
POC-004 Durable Senior Document and Action Session
        ↓
POC-005 Accessibility and Bidirectional Journey
        ↓
POC-006 Spanish POC Capability
        ↓
POC-007 Caregiver/Authorization Boundary
        ↓
POC-008 Integrated POC Closure Gate
```

---

# EPIC POC-001 — Idempotent Requirements Decomposition

**Priority**: P0  
**Closes**: Under-decomposition and graph drift

## User stories

### US-001.1 — Stable decomposition identity

- [ ] Canonical requirement keys are deterministic.
- [ ] Persona, journey, capability, test, and evidence IDs are stable.
- [ ] Re-running unchanged inputs produces no graph diff.

### US-001.2 — Graph integrity and diff

- [ ] Node IDs are unique.
- [ ] Edge keys are unique.
- [ ] No dangling edges exist.
- [ ] Graph changes produce deterministic diff reports.
- [ ] Deletions require explicit source-removal evidence.

### US-001.3 — Geragogy graph path

- [ ] Uploaded-document geragogy nodes exist.
- [ ] Each node links to persona need, journey step, code, test, and evidence.
- [ ] Sample-only behavior cannot satisfy an uploaded-document requirement.

## Exit gate

```text
Same source + same versions = same graph and graph hash
```

---

# EPIC POC-002 — Geragogical Uploaded-Document Transformation

**Priority**: P0  
**Persona**: Margaret  
**Closes**: Uploaded PDF geragogy gap

## User stories

### US-002.1 — Document orientation

- [ ] Identify document type and purpose.
- [ ] Show “Why you received this” when evidence supports it.
- [ ] Show source confidence and REVIEW when type is uncertain.

### US-002.2 — Key information and deadlines

- [ ] Extract dates, deadlines, amounts, entities, obligations, conditions, and negations.
- [ ] Link every extracted item to source page/span.
- [ ] Never mark a missing deadline as confirmed absent.

### US-002.3 — Prioritized actions

- [ ] Extract actions from uploaded content.
- [ ] Assign priority from source evidence and urgency.
- [ ] Show what to do, when, and source reference.
- [ ] Route ambiguous actions to REVIEW.

### US-002.4 — Progressive plain-language views

- [ ] Simple is easier to scan without omitting content.
- [ ] Standard adds context while preserving anchors.
- [ ] Detailed preserves complete source meaning.
- [ ] The viewer labels source-preserving POC behavior honestly.

### US-002.5 — Reassurance and help escalation

- [ ] Use non-shaming, supportive language.
- [ ] Explain uncertainty without guessing.
- [ ] Offer a clear help/caregiver next step when the user cannot proceed.

## Exit gate

```text
A real uploaded document, not only a sample fixture, produces orientation,
key information, actions/deadlines, source references, and complete views.
```

---

# EPIC POC-003 — Extraction, OCR Boundary, Layout, and Provenance

**Priority**: P0

## User stories

### US-003.1 — Native and scanned document routing

- [ ] Detect native text versus image-only pages.
- [ ] Route image-only input to OCR adapter or REVIEW.
- [ ] Never report successful simplification from empty extraction.

### US-003.2 — Layout handling

- [ ] Route single-column, multi-column, table, form, and mixed documents.
- [ ] Preserve reading order.
- [ ] Preserve page records.
- [ ] Preserve tables/forms or explicitly REVIEW.

### US-003.3 — Provenance

- [ ] Sentence/paragraph output maps to page/span where available.
- [ ] Source preview remains available.
- [ ] Missing provenance is visible and actionable.

## Exit gate

```text
Every displayed claim is source-grounded or explicitly marked REVIEW.
```

---

# EPIC POC-004 — Durable Senior Document and Action Session

**Priority**: P0

## User stories

### US-004.1 — Document session recovery

- [ ] Refresh restores the active result or provides a recovery route.
- [ ] Source/result association is durable.
- [ ] Processing job status survives navigation.

### US-004.2 — Action lifecycle

- [ ] Action is not started/in progress/complete.
- [ ] Completion survives refresh.
- [ ] Action can be reopened where allowed.
- [ ] Overdue state is visible.

### US-004.3 — Safe persistence boundary

- [ ] POC JSON writes are atomic and concurrency-tested.
- [ ] Production database migration seam is documented.
- [ ] Source access is authorized before production use.

## Exit gate

```text
Margaret can leave and return without losing document or action progress.
```

---

# EPIC POC-005 — Accessibility and Bidirectional Journey

**Priority**: P0

## User stories

### US-005.1 — Forward journey

```text
Landing → Senior → Dashboard → Select/upload → Process
→ Complete → Source → Simple/Standard/Detailed → Actions
```

- [ ] Every transition has visible status.
- [ ] Focus moves to the new content.
- [ ] Errors provide next action.

### US-005.2 — Reverse journey

```text
Actions/document → Back → Dashboard → Back → Landing
```

- [ ] Back does not loop through transient processing.
- [ ] Start Over is distinct and confirmed.
- [ ] Refresh/retry/cancel have deterministic outcomes.

### US-005.3 — Accessibility execution

- [ ] Keyboard-only flow.
- [ ] Screen-reader labels/status.
- [ ] 200% zoom.
- [ ] High contrast.
- [ ] Reduced motion.
- [ ] Focus restoration.

## Exit gate

```text
Forward and reverse journeys complete without silent loss, loops, or inaccessible states.
```

---

# EPIC POC-006 — Spanish POC Capability

**Priority**: P1

## User stories

- [ ] Detect English/Spanish and allow explicit override.
- [ ] Normalize Spanish dates and currency.
- [ ] Preserve Spanish negation and conditions.
- [ ] Extract Spanish entities, obligations, actions, and deadlines.
- [ ] Render Spanish status, errors, views, and REVIEW messaging.
- [ ] Map Spanish outputs to the same provenance contract.

## Exit gate

```text
A Spanish synthetic document completes the same safety path as English,
with unsupported cases routed explicitly to REVIEW.
```

---

# EPIC POC-007 — Caregiver and Authorization Boundary

**Priority**: P1

## User stories

- [ ] Senior identity exists.
- [ ] Caregiver invitation exists.
- [ ] Senior approves document-level access.
- [ ] Caregiver sees only approved documents.
- [ ] Senior revokes access.
- [ ] Unauthorized source requests fail.
- [ ] Mock caregiver dashboard is clearly separated from authorized behavior.

## Exit gate

```text
No caregiver journey is represented as complete until permission and revocation paths exist.
```

---

# EPIC POC-008 — Integrated POC Closure Gate

**Priority**: P0  
**Depends on**: POC-001 through POC-007

## User stories

### US-008.1 — Requirement closure

- [ ] Every requirement has persona and journey mapping.
- [ ] Every capability has code and test evidence.
- [ ] Every failure state has recovery behavior.
- [ ] Every graph change is idempotent and integrity-valid.

### US-008.2 — Integrated matrix

Run the full risk matrix across:

```text
clean PDF
malformed PDF
scanned PDF
multi-column PDF
table/form PDF
empty extraction
network failure
retry
cancel
refresh
Back
Start Over
English
Spanish
keyboard
screen reader
200% zoom
high contrast
caregiver permission
source retrieval
concurrent persistence
```

### US-008.3 — Final verdict

```text
COMPLETE only when every P0 requirement has:
  persona → journey → behavior → capability → code → test → evidence → owner → recovery
```

## Portfolio exit gate

```text
[ ] Geragogy is applied to uploaded documents
[ ] Graph decomposition is idempotent
[ ] Native/scanned/layout paths are explicit
[ ] Source and provenance are preserved
[ ] Actions and deadlines are surfaced
[ ] Session state is durable for declared POC scope
[ ] Forward/reverse accessibility journeys pass
[ ] Spanish scope is explicit and tested
[ ] Caregiver permissions are not falsely represented
[ ] Integrated failure matrix is executed
[ ] Process evidence and graph are synchronized
```

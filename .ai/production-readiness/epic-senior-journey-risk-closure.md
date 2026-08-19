# Epic Portfolio — Senior Journey Risk Closure

**Portfolio ID**: SENIOR-JOURNEY-CLOSE-001  
**Process**: v9.5  
**Status**: Ready for Development  
**Scope**: Close all 25 risks in `senior-journey-top-25-risk-register.md` for the English/Spanish technical POC-to-production path

## Objective

Ensure Margaret can complete the senior journey successfully and recover safely when the environment, document, network, browser, extraction, accessibility, storage, or interaction state behaves unexpectedly.

A journey is closed only when the system:

```text
processes the selected file
→ tells the truth about each state
→ preserves the source and meaning
→ exposes actions and provenance
→ recovers from interruption
→ preserves user agency
→ remains operable with accessibility needs
→ produces durable evidence
```

## Portfolio dependency graph

```text
SJ-001 Document Truth and Extraction
        ↓
SJ-002 Durable Processing Lifecycle
        ↓
SJ-003 Recovery, Navigation, and State
        ↓
SJ-004 Full-Document Meaning and Provenance
        ↓
SJ-005 Accessibility and Senior Interaction
        ↓
SJ-006 Actions, Persistence, and Concurrency
        ↓
SJ-007 Runtime Operations and Configuration
        ↓
SJ-008 Integrated Journey Closure Gate
```

---

# EPIC SJ-001 — Document Truth, Upload, and Extraction

**Risks closed**: R01, R02, R03, R04, R05, R06, R07, R09  
**Graph gaps**: `GAP-REALOCR`, `GAP-OPS`  
**Priority**: P0

## User stories

### SJ-001.1 — Selected-file identity

As Margaret, I want the system to show the same file I selected as the file being processed, so that I can trust the result.

Acceptance criteria:

- [ ] Upload request includes a client correlation ID.
- [ ] Result includes original filename, size, MIME type, and correlation ID.
- [ ] UI displays the filename in every active state.
- [ ] A mismatched or missing identity routes to failure/REVIEW.

### SJ-001.2 — Real/fixture mode transparency

- [ ] Runtime returns `processingMode`.
- [ ] Fixture mode is visibly labeled as synthetic.
- [ ] Production-shaped mode cannot silently substitute fixture content.
- [ ] Test and development startup profiles are documented.

### SJ-001.3 — Extraction failure classification

- [ ] Malformed PDF.
- [ ] Password-protected PDF.
- [ ] Empty text layer.
- [ ] Scanned PDF.
- [ ] Unsupported layout.
- [ ] Storage failure.
- [ ] Each state has plain-language next steps.

### SJ-001.4 — OCR and layout handling

- [ ] Native PDF extraction.
- [ ] Scanned-PDF detection.
- [ ] OCR adapter boundary.
- [ ] Single-column, multi-column, table, form, and mixed layout classes.
- [ ] OCR confidence retained.
- [ ] Empty/low-confidence output cannot be marked complete.

### SJ-001.5 — Source persistence

- [ ] Source is persisted before completion is returned.
- [ ] Source URL is health-checked before result completion.
- [ ] Missing source returns a visible recovery state.
- [ ] Storage quota and write failures are observable.
- [ ] Runtime uploads remain excluded from Git.

## Exit gate

```text
[ ] R01, R02, R03, R04, R05, R06, R07, R09 have code and tests
[ ] Empty extraction never produces false completion
[ ] The selected file is provably the processed file
```

---

# EPIC SJ-002 — Durable Processing Lifecycle

**Risks closed**: R11, R12, R14, R23  
**Graph gap**: `GAP-ASYNC`  
**Priority**: P0

## User stories

### SJ-002.1 — Durable job state

As Margaret, I want processing to continue or recover if it takes time, so that I do not have to guess whether my document was lost.

States:

```text
received
validating
uploading
extracting
simplifying
validating_output
complete
review
failed
retrying
dead_letter
cancelled
```

Acceptance criteria:

- [ ] Every job has a durable ID.
- [ ] Status survives frontend navigation.
- [ ] Status can be retrieved by API.
- [ ] Completion is emitted only after source/result persistence.

### SJ-002.2 — Idempotent processing

- [ ] Client correlation/idempotency key is accepted.
- [ ] Duplicate clicks do not create duplicate jobs/results.
- [ ] Retry reuses or intentionally creates a new versioned job.
- [ ] Duplicate-result behavior is documented.

### SJ-002.3 — Cancellation and timeout

- [ ] User can cancel an active job.
- [ ] Abort reaches the transport/worker.
- [ ] Cancelled jobs do not later navigate to completion.
- [ ] Timeout becomes actionable retry/REVIEW state.

### SJ-002.4 — Stable announcements

- [ ] One persistent status region exists.
- [ ] Status changes are not announced too rapidly.
- [ ] Status is associated with the upload control.
- [ ] Screen-reader announcements are tested.

## Exit gate

```text
[ ] No request can remain silently unresolved
[ ] Retry, timeout, cancel, and duplicate paths are deterministic
[ ] Job status is durable and retrievable
```

---

# EPIC SJ-003 — Recovery, Navigation, and State Preservation

**Risks closed**: R13, R14, R15, R16  
**Graph requirements**: `REQ-ACCESS`, user-control/recoverability requirements  
**Priority**: P0

## User stories

### SJ-003.1 — Browser refresh recovery

- [ ] Selected document/job state can be restored after refresh, or the user receives a clear recovery path.
- [ ] In-progress jobs are not silently abandoned.
- [ ] Completed actions are not silently lost.

### SJ-003.2 — Back during processing

- [ ] Back cancels or safely detaches from active processing.
- [ ] No stale timer can navigate the user forward after Back.
- [ ] Transient processing states do not pollute history.
- [ ] Sample and upload flows have explicit reverse tests.

### SJ-003.3 — Accessible Start Over confirmation

- [ ] Replace native confirmation with an in-app dialog.
- [ ] Dialog has accessible name and description.
- [ ] Focus moves into the dialog and returns to Start Over.
- [ ] The dialog lists what will be cleared.
- [ ] Escape and Cancel preserve state.

### SJ-003.4 — State boundary rules

- [ ] Back preserves useful state.
- [ ] Start Over clears intentionally.
- [ ] Retry preserves the selected file.
- [ ] New document selection clears only obsolete document state.

## Exit gate

```text
[ ] Margaret can move forward and backward without loops
[ ] Refresh, Back, Cancel, Retry, and Start Over have distinct outcomes
[ ] No meaningful state is silently discarded
```

---

# EPIC SJ-004 — Full-Document Meaning and Provenance

**Risks closed**: R08, R10, R17, R18, R19  
**Graph requirements**: `REQ-FULLTEXT`, `REQ-LEVELS`, `REQ-PROVENANCE`, `REQ-APUCS`  
**Priority**: P0

## User stories

### SJ-004.1 — Complete document invariant

- [ ] Every extracted page is retained.
- [ ] Source and output page counts are comparable.
- [ ] Late-page dates, amounts, obligations, conditions, and negations are preserved.
- [ ] Empty/truncated output routes to REVIEW.

### SJ-004.2 — Original source fallback

- [ ] Inline preview is attempted.
- [ ] Open/download fallback is visible.
- [ ] Preview failure is announced.
- [ ] Source URL is not exposed before authorization in production mode.

### SJ-004.3 — Honest viewing levels

- [ ] Simple, Standard, and Detailed are labeled accurately.
- [ ] Identical source-preserving views are labeled as POC/source-preserving, not falsely presented as simplification.
- [ ] Approved transformations preserve anchors and meaning.
- [ ] View selection does not alter source content.

### SJ-004.4 — Provenance and REVIEW

- [ ] Output sentences map to source page/span where available.
- [ ] Missing provenance is visible.
- [ ] REVIEW explains what cannot be confirmed.
- [ ] REVIEW offers inspect source, retry, and support/next step.

## Exit gate

```text
[ ] No late-page information silently disappears
[ ] The original source is always available or failure is explicit
[ ] Every user-visible transformation is provenance-aware
```

---

# EPIC SJ-005 — Accessibility and Senior Interaction

**Risks closed**: R20, R21, R22, R23  
**Graph requirement**: `REQ-ACCESS`  
**Priority**: P0

## User stories

### SJ-005.1 — Typography and zoom

- [ ] 200% zoom remains usable.
- [ ] Text-size control affects all text tokens.
- [ ] No horizontal clipping of essential actions.
- [ ] Long filenames and document titles wrap safely.

### SJ-005.2 — Contrast and state communication

- [ ] High contrast applies to text, surfaces, borders, focus, links, alerts, progress, and errors.
- [ ] Status is never conveyed by color alone.
- [ ] Focus indicators remain visible in high contrast.

### SJ-005.3 — Focus management

- [ ] Focus moves to the new page heading after navigation.
- [ ] Focus returns after Back.
- [ ] Focus moves to error/status region after failure.
- [ ] Focus moves to the document heading after completion.

### SJ-005.4 — Keyboard and screen-reader journey

- [ ] Complete journey works without a pointer.
- [ ] Upload control has an accessible name.
- [ ] Process button has an accessible name.
- [ ] Progress/status has a stable live region.
- [ ] Source iframe/link has a meaningful name.
- [ ] All tabs expose selected state.

## Exit gate

```text
[ ] Keyboard-only journey passes
[ ] Screen-reader journey passes
[ ] 200% zoom passes
[ ] High contrast passes
[ ] Focus is deterministic at every transition
```

---

# EPIC SJ-006 — Actions, Persistence, and Concurrency

**Risks closed**: R24, R25  
**Graph gaps**: `GAP-AUTH`, `GAP-OPS`  
**Priority**: P0

## User stories

### SJ-006.1 — Durable action state

- [ ] Action completion persists with document/user identity.
- [ ] Refresh does not erase completion.
- [ ] Completion can be undone where allowed.
- [ ] Action status has audit metadata.

### SJ-006.2 — Safe concurrent persistence

- [ ] JSON persistence is replaced or protected by atomic writes/locking.
- [ ] Two simultaneous uploads do not corrupt results.
- [ ] Source/result records are transactionally associated.
- [ ] Database migration path is documented.

### SJ-006.3 — Authorization boundary

- [ ] User identity is required before production persistence.
- [ ] Source URLs require authorization.
- [ ] Caregiver access is permissioned and revocable.
- [ ] Tenant isolation is tested.

## Exit gate

```text
[ ] Action state survives reload
[ ] Concurrent processing cannot corrupt persistence
[ ] No source document is accessible without authorization
```

---

# EPIC SJ-007 — Runtime Operations and Configuration

**Risks closed**: R01, R02, R06, R11, R25  
**Graph gaps**: `GAP-OPS`, `GAP-ASYNC`  
**Priority**: P0

## User stories

### SJ-007.1 — Environment truth

- [ ] API origin is configured per environment.
- [ ] Fixture/real mode is explicit and visible in non-production.
- [ ] Startup fails clearly on invalid configuration.
- [ ] Health/readiness checks include source storage and processor readiness.

### SJ-007.2 — Observability

- [ ] Correlation ID on every journey.
- [ ] Structured events for upload, extraction, processing, review, failure, retry, and completion.
- [ ] No document content or secrets in logs.
- [ ] Metrics for latency, failure, review, retry, and source availability.

### SJ-007.3 — Recovery operations

- [ ] Backup/restore source and result data.
- [ ] Retention and cleanup policy.
- [ ] Disk quota alarms.
- [ ] Rollback to baseline processor.
- [ ] Incident runbook.

## Exit gate

```text
[ ] Operators can tell what happened to every job
[ ] Operators can recover source/result data
[ ] Fixture mode cannot be mistaken for production mode
```

---

# EPIC SJ-008 — Integrated Bidirectional Journey Closure

**Risks closed**: all R01–R25  
**Depends on**: SJ-001 through SJ-007  
**Priority**: P0

## User stories

### SJ-008.1 — Forward journey test

```text
Landing → senior role → dashboard → PDF selection → process
→ upload → extraction → completion → source view
→ Simple/Standard/Detailed → actions → action complete
```

### SJ-008.2 — Reverse journey test

```text
Action complete/document view → Back → dashboard
→ Back → landing
```

Also test:

```text
Document → Back during processing
Document → Retry
Document → Start Over
Browser refresh during each durable state
```

### SJ-008.3 — Failure matrix execution

Execute every R01–R25 scenario with:

- Trigger
- Expected user message
- Expected system state
- Recovery action
- Evidence record
- Graph edge update

### SJ-008.4 — Final graph/evidence gate

- [ ] Every risk maps to a requirement or explicit assumption.
- [ ] Every mitigation maps to an epic/story.
- [ ] Every closed risk maps to code and test evidence.
- [ ] Remaining risks have owner and next action.
- [ ] No conflict is silently dropped.
- [ ] Current state and PR evidence are synchronized.

## Final closure verdict

```text
PROCEED only when all P0 acceptance criteria pass.
MANAGED RISK when a residual risk is explicit, owned, and non-blocking.
BLOCK when the system can silently misprocess, lose, expose, or misrepresent a senior document.
```

## Portfolio completion checklist

```text
[ ] R01 API origin
[ ] R02 storage failure
[ ] R03 malformed/encrypted PDF
[ ] R04 scanned PDF/OCR
[ ] R05 layout/order
[ ] R06 fixture transparency
[ ] R07 empty extraction
[ ] R08 late-page preservation
[ ] R09 source retrieval
[ ] R10 preview fallback
[ ] R11 durable async job
[ ] R12 idempotency
[ ] R13 refresh recovery
[ ] R14 cancel/back in flight
[ ] R15 reset protection
[ ] R16 accessible confirmation
[ ] R17 honest viewing levels
[ ] R18 provenance
[ ] R19 REVIEW recovery
[ ] R20 typography/zoom
[ ] R21 contrast
[ ] R22 focus
[ ] R23 live status
[ ] R24 durable actions
[ ] R25 concurrent persistence
```

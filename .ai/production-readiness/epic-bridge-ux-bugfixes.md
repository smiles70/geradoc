# Bridge UX Bug-Fix Epics

## Back Navigation and Upload-Processing Feedback

**Portfolio ID**: UX-BUG-001  
**Status**: Ready for Development  
**Created**: August 19, 2026  
**Applies to**: `poc/frontend` bridge  
**Research basis**: W3C cognitive accessibility patterns, WAI older-user guidance, DWP file-upload research, GOV.UK file-upload guidance, Nielsen Norman Group progress-indicator guidance, older-adult navigation research

> These epics address observed bridge bugs. They are implementation work, not merely documentation changes.

---

## 1. Observed Bugs

### Bug A — No contextual Back button

The current POC app renders a floating **Start Over** button in the top-right on most non-landing screens. It resets the entire flow to the landing page. It is not a contextual Back action.

Current behavior:

```text
Landing → Dashboard → Processing → Document

Start Over → Landing
```

Missing behavior:

```text
Document → Dashboard
Processing → Dashboard or cancel
Caregiver → Landing/persona selection
```

### Bug B — Upload feedback is insufficient

The current upload control is a native file input. Selecting a file exposes the filename, but the user does not receive a complete visible lifecycle:

```text
not started
→ file selected
→ upload started
→ upload progress
→ upload complete
→ processing started
→ processing complete
→ result shown
```

The current API is synchronous and the UI does not expose a distinct upload status, processing status, completion confirmation, retry action, or meaningful progress state.

---

# EPIC UX-BUG-001-A — Contextual Back Navigation and Safe Reset

**Priority**: P0  
**Depends on**: None  
**Target**: `poc/frontend`

## Objective

Provide predictable contextual navigation that lets a user return to the previous meaningful step without losing work, while preserving **Start Over** as a separate, clearly labeled reset action.

## Research finding

W3C cognitive accessibility guidance explicitly recommends allowing users to return to a previous point, notes that the familiar browser Back action is expected, and warns that users should not lose work. W3C also recommends clear steps, consistent navigation, and visible orientation within multi-step tasks.

Best placement for ClarityDoc:

```text
Top-left of the primary content header
```

The Back control should appear before the page title, use a visible text label, and remain in the same location across dashboard, processing, document, and caregiver views.

Recommended labels:

```text
← Back to documents
← Back to dashboard
← Back to role selection
```

Do not use an icon alone. Do not place Back beside Start Over. Do not make Start Over look like ordinary navigation.

## User stories

### A1 — Return to documents

**As a senior user**, I want a clearly labeled Back button on the document view, **so that** I can return to my document list without losing my place.

Acceptance criteria:

- [ ] Document view displays `Back to documents` at the top-left of the content header.
- [ ] Back returns to the dashboard.
- [ ] Selected document state is cleared only when appropriate.
- [ ] Completed action state is preserved during Back navigation.
- [ ] Browser Back and in-app Back have predictable behavior.
- [ ] Focus moves to the dashboard heading after navigation.

### A2 — Leave processing safely

**As a senior user**, I want to leave a processing screen intentionally, **so that** I know whether I am cancelling or simply going back.

Acceptance criteria:

- [ ] Processing view displays `Cancel processing` or `Back to documents`, not an unexplained reset.
- [ ] If processing is cancellable, the UI confirms cancellation.
- [ ] If processing cannot be cancelled, the UI explains that leaving will not stop server processing.
- [ ] The user is not silently returned to the landing page.

### A3 — Separate Back from Start Over

Acceptance criteria:

- [ ] Back is top-left and contextual.
- [ ] Start Over remains top-right or in a clearly separated secondary action area.
- [ ] Start Over has a confirmation step when state would be lost.
- [ ] Start Over copy explains what will be reset.
- [ ] Back never resets the entire session.

## Technical tasks

- Add a navigation state/history model to `DemoContext` or a dedicated bridge navigation hook.
- Add a shared `ContextualBackButton` component.
- Add a stable page-header layout shared by dashboard, processing, document, and caregiver views.
- Add focus restoration after navigation.
- Add unsaved/processing state policy.
- Add keyboard and screen-reader labels.

## Definition of Done

- Back behavior is covered by component tests.
- Keyboard-only navigation passes.
- Back and Start Over are visually and semantically distinct.
- No document/action state is unexpectedly lost.
- Demo directory remains unchanged.
- Accessibility review of the navigation path passes.

---

# EPIC UX-BUG-001-B — Upload Lifecycle, Processing Status, and Completion Feedback

**Priority**: P0  
**Depends on**: UX-BUG-001-A contract only; can be implemented in parallel with navigation
**Target**: `poc/frontend` and `poc/backend`

## Objective

Make every upload state visible, understandable, and actionable. The user must know whether the file was selected, upload started, upload completed, processing started, processing completed, failed, or requires review.

## Research finding

W3C guidance recommends rapid feedback for every step of a process and clear confirmation of successful completion. DWP research recommends feedback immediately beside the upload control, because banners or messages elsewhere may be missed. Nielsen Norman Group recommends progress indicators for operations long enough to create uncertainty. GOV.UK recommends specific, actionable file errors rather than generic failure messages.

## Required lifecycle

```text
IDLE
  → FILE_SELECTED
  → VALIDATING
  → UPLOADING
  → UPLOAD_COMPLETE
  → PROCESSING
  → COMPLETE
```

Failure paths:

```text
VALIDATION_ERROR
UPLOAD_ERROR
PROCESSING_ERROR
REVIEW_REQUIRED
CANCELLED
```

## User stories

### B1 — Confirm file selection

**As a senior user**, I want immediate confirmation that my file was selected, **so that** I know the system noticed my action.

Acceptance criteria:

- [ ] Selected filename appears in a persistent upload-status panel.
- [ ] File size and file type are displayed in plain language.
- [ ] The user sees a `Ready to upload` or `Checking your file` state.
- [ ] The file can be removed/replaced before processing.
- [ ] The status is announced to assistive technology.

### B2 — Show upload progress

Acceptance criteria:

- [ ] UI displays `Uploading your document…` immediately after upload begins.
- [ ] Progress is determinate when transport progress is available.
- [ ] Progress is indeterminate but animated accessibly when exact progress is unavailable.
- [ ] The user sees the file name next to the status.
- [ ] The control cannot accidentally start duplicate uploads.
- [ ] The user can cancel when cancellation is supported.

### B3 — Show processing progress

Acceptance criteria:

- [ ] UI distinguishes upload completion from document processing.
- [ ] Processing shows clear stages:
  - `Reading your document`
  - `Finding important information`
  - `Preparing a clearer explanation`
  - `Checking the result`
- [ ] The UI does not claim completion until the API returns a valid result.
- [ ] The UI displays a completion confirmation before showing the result.
- [ ] The user can tell what happens next.

### B4 — Show success and review states

Acceptance criteria:

- [ ] Successful result displays `Your document is ready`.
- [ ] The selected filename remains visible.
- [ ] REVIEW state explains that the system will not guess.
- [ ] REVIEW state offers source-document review, retry, or support path.
- [ ] A successful result shows source references when available.

### B5 — Show actionable failures

Acceptance criteria:

- [ ] Wrong type: identifies accepted types.
- [ ] Too large: identifies the maximum size.
- [ ] Upload failure: says what happened and offers retry.
- [ ] Processing failure: explains that the document could not be completed and offers retry/support.
- [ ] No raw stack trace, provider error, or internal code is shown.
- [ ] Error appears beside the upload control and is announced to assistive technology.

## Technical tasks

- Add an explicit upload state machine to frontend state.
- Extend `documentApi.js` with lifecycle-aware operations.
- Add `AbortController` cancellation where supported.
- Use a transport progress mechanism or clearly labeled indeterminate progress.
- Add API job/status polling when async processing is implemented.
- Keep synchronous POC behavior compatible while exposing distinct UI states.
- Add `aria-live="polite"` status region and `role="alert"` errors.
- Add result contract validation before transitioning to COMPLETE.

## Definition of Done

- Filename-only behavior is eliminated.
- Every lifecycle state is visible and testable.
- Upload start, completion, processing, completion, failure, retry, and REVIEW states are covered.
- UI never claims processing is complete before a valid response.
- Accessibility announcements pass automated checks.
- The demo flow remains unchanged.

---

# EPIC UX-BUG-001-C — Integrated Regression and Senior-First Validation

**Priority**: P1  
**Depends on**: UX-BUG-001-A and UX-BUG-001-B

## Objective

Verify that navigation and upload feedback work together without increasing cognitive load or breaking the completed demo-to-POC bridge.

## Scenarios

1. Dashboard → document view → Back to documents.
2. Dashboard → upload → upload progress → processing → result.
3. Upload invalid type → actionable error → replace file.
4. Upload valid file → processing failure → retry.
5. Processing → Back/cancel policy.
6. Result → Start Over confirmation → landing.
7. REVIEW result → source/retry/support path.
8. Keyboard-only navigation.
9. Screen-reader announcements.
10. 200% zoom and high contrast.
11. Slow network simulation.
12. Duplicate selection prevention.

## Acceptance criteria

- [ ] No navigation dead ends.
- [ ] Back is predictable and does not erase work.
- [ ] Start Over is explicit and separate.
- [ ] Upload status is visible in the user's focus area.
- [ ] Processing status is distinguishable from upload status.
- [ ] Success and failure outcomes are unmistakable.
- [ ] All states have plain-language copy.
- [ ] Build, lint, unit, and integration tests pass.
- [ ] Evidence is recorded in Process v9.5 artifacts.

---

## 4. Recommended Fix Order

```text
1. Add state-machine tests first
2. Add shared contextual navigation/header
3. Add upload state model and persistent status panel
4. Add processing/success/review/error copy
5. Add API lifecycle/status support
6. Add accessibility announcements and focus management
7. Run slow-network and failure tests
8. Run senior-first usability review
9. Update Process evidence and close the bug epics
```

## 5. Source References

- W3C WAI, **Let Users Go Back**: https://www.w3.org/WAI/WCAG2/supplemental/patterns/o4p02-back-undo/
- W3C WCAG 2.2, **Consistent Navigation**: https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html
- W3C WAI, **Make Each Step Clear**: https://www.w3.org/WAI/WCAG2/supplemental/patterns/o1p04-clear-steps/
- W3C WAI, **Provide Feedback**: https://www.w3.org/WAI/WCAG2/supplemental/patterns/o4p10-status-feedback/
- W3C WAI, **Older Users and Web Accessibility**: https://www.w3.org/WAI/older-users/
- DWP Design System, **Provide Timely, Clear Feedback — File Upload**: https://design-system.dwp.gov.uk/research/file-upload/feedback
- GOV.UK Design System, **File Upload**: https://design-system.service.gov.uk/components/file-upload/
- Nielsen Norman Group, **Progress Indicators Make a Slow System Less Insufferable**: https://www.nngroup.com/articles/progress-indicators/
- Nielsen Norman Group, **Response Time Limits**: https://www.nngroup.com/articles/response-times-3-important-limits/
- Li and Luximon, **Older adults’ use of mobile device: usability challenges while navigating various interfaces**: https://doi.org/10.1080/0144929x.2019.1622786
- Systematic review of geragogy in digital skills programs for older adults: https://doi.org/10.1177/07334648221091236

## 6. Process Gate

These are P0/P1 bug-fix epics. They are ready for implementation on feature branches from `develop`. The fixes must not modify the completed `demo/` unless a separate demo regression is discovered and reviewed.

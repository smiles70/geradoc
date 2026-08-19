# Senior Persona and Bidirectional Journey Map

**Product**: ClarityDoc  
**Persona**: Margaret  
**Date**: August 19, 2026  
**Status**: Current-state traceability review

## 1. Senior Persona — Margaret

### Profile

- Age: 72
- Recently widowed
- Lives independently
- Low-to-moderate technology confidence
- Some vision decline
- May have early cognitive concerns, but ClarityDoc must never diagnose or infer capacity
- Receives insurance, financial, government, and legal documents
- Values independence, dignity, privacy, and control

### Goals

1. Understand what a document means.
2. Know what action is needed and by when.
3. Avoid missed deadlines and financial consequences.
4. Use the system without feeling judged or stupid.
5. Ask for help without losing control.
6. Return to a previous step without losing work.
7. See the original document and verify the explanation.

### Pain points

- Dense terminology and unfamiliar forms.
- Fear of making a wrong decision.
- Difficulty knowing whether an upload worked.
- Difficulty knowing whether a system is still processing.
- Concern that a simplified explanation may leave out something important.
- Technology interfaces that hide navigation or use unfamiliar icons.

### Geragogy and accessibility needs

- Immediate real-life relevance.
- One clear primary action at a time.
- Plain, respectful language.
- Progressive disclosure without loss of source information.
- Visible status and completion feedback.
- Predictable Back behavior.
- Large text, high contrast, keyboard support, and screen-reader announcements.
- User-controlled pace and explicit agency.

### Success definition

Margaret can upload an approved document, understand what is available, see that processing is underway, review the full source and complete output views, identify actions, return to the document list, and start over without losing confidence or data unexpectedly.

---

## 2. Forward Journey — Start to Finish

### Journey state map

```text
LANDING
  → ROLE_SELECTED
  → DASHBOARD
  → FILE_SELECTED or SAMPLE_SELECTED
  → UPLOADING
  → PROCESSING
  → COMPLETE
  → DOCUMENT_VIEW
  → ACTION_REVIEW
  → ACTION_COMPLETE
  → FINISHED
```

### Forward journey table

| Step | Margaret's experience | Current code | Status |
|---:|---|---|---|
| 1 | Sees a reassuring ClarityDoc welcome | `LandingPage.jsx` | Present |
| 2 | Selects “Try as a Senior” | `LandingPage.jsx` → `setPersona`, `setView` | Present |
| 3 | Reaches dashboard | `App.jsx`, `SeniorDashboard.jsx` | Present |
| 4 | Selects a sample document | `SeniorDashboard.jsx` | Present |
| 5 | Or selects an approved PDF | File input in `SeniorDashboard.jsx` | Present |
| 6 | Sees filename and Process button | `selectedFile`, `FILE_SELECTED` | Present |
| 7 | Starts processing explicitly | `documentApi.processDocument` | Present |
| 8 | Sees upload/processing status | `UPLOADING`, `PROCESSING` | Present |
| 9 | Receives completion state | `COMPLETE` | Present |
| 10 | Views original uploaded source | `sourceUrl`, iframe in `DocumentViewer.jsx` | Present for persisted uploads |
| 11 | Views Simple/Standard/Detailed | `DocumentViewer.jsx` tabs | Present |
| 12 | Reads full document by page | `pageText` rendering | Present |
| 13 | Sees source references | `sourceReferences` rendering | Present when returned |
| 14 | Reviews key information | `KeyInfoCards.jsx` | Present |
| 15 | Reviews actions | `ActionItems.jsx` | Present |
| 16 | Marks an action complete | `ActionItems.jsx`, `DemoContext.jsx` | Present in session state |
| 17 | Receives positive completion feedback | `ActionItems.jsx` | Present |
| 18 | Reaches a finished state | Viewer/action completion state | Partial; no explicit completion summary |

### Forward journey verdict

```text
Sample forward journey:       Functional
Uploaded-PDF forward journey: Functional in current synchronous POC path
Full source visibility:       Implemented after source-preview closure
Action completion:             Functional in session state
Explicit final summary:       Not implemented
```

---

## 3. Reverse Journey — Finish to Start

### Intended reverse map

```text
FINISHED / DOCUMENT_VIEW
  → ACTION_REVIEW
  → DOCUMENT_VIEW
  → PROCESSING or DASHBOARD
  → DASHBOARD
  → ROLE_SELECTED
  → LANDING
```

### Reverse journey table

| Reverse action | Expected result | Current code | Status |
|---|---|---|---|
| Back from document viewer | Return to previous meaningful view | `ContextualBackButton` + `goBack` | Present |
| Back from document viewer after uploaded PDF | Return to dashboard | History stack | Present |
| Back from sample document viewer | Return to processing view | History stack | Defect risk: processing timer can re-enter document |
| Back from processing view | Return to dashboard | `goBack` | Present, but timer behavior can interfere |
| Back from dashboard | Return to landing/role selection | History stack | Present |
| Start Over | Clear state after confirmation | `resetDemo` | Present |
| Preserve completed action state on Back | Keep work | Context state persists | Present |
| Preserve selected document on Back | Keep document context | Context state persists | Present |
| Exit REVIEW safely | Return only after resolution or explicit lower-confidence route | Backend/UI contract | Partial |
| Return from final state without dead end | User can navigate to dashboard or start again | Back/Start Over | Present with processing-loop correction required |

### Reverse journey defect — fixed in current branch

The sample-document flow is:

```text
Dashboard → Processing → Document
```

The navigation history now treats `processing` as a transient state when moving backward. Back from the document view returns to the document list rather than re-entering a timer that can send the user forward again.

### Reverse journey verdict

```text
Uploaded-PDF reverse journey: Functional
Sample-document reverse journey: Functional after transient-state fix
Start Over: Functional
State preservation: Functional
Bidirectional closure: Complete for the current synchronous POC scope
```

---

## 4. Code Coverage Summary

### Code exists for a successful forward journey?

**Yes, substantially.** The current code supports:

- Landing to dashboard
- Sample selection
- PDF selection
- Explicit processing
- Backend request
- Result persistence
- Source PDF retrieval
- Full document/page rendering
- Three viewing levels
- Key information
- Actions
- Action completion

The remaining forward limitation is the absence of a clearly defined final completion summary and the fact that production-quality simplification/async processing are not complete.

### Code exists for a successful reverse journey?

**Partially.** The navigation history and contextual Back button exist, but the sample processing screen has an automatic timer that can override the user's Back action.

The required fix is to make processing completion cancellable or state-aware:

```text
if user navigates Back:
  cancel or invalidate pending auto-transition
  do not navigate to Document again
```

---

## 5. Requirements Traceability

| Persona/journey need | BRD/FRD/PRD relation | Implementation |
|---|---|---|
| Simple navigation | BRD UI/UX, FRD interface requirements | `App.jsx`, `ContextualBackButton.jsx` |
| Easy upload | FR-DU-001, PRD F-001 | `SeniorDashboard.jsx` |
| Upload status | FR-DU-002/003, BRD US-1.2 | `SeniorDashboard.jsx` |
| Full source visibility | FR-DP-001/004, BR-004/005 | `DocumentViewer.jsx`, source endpoint |
| Three levels | BRD/PRD simplification requirements | `DocumentViewer.jsx` |
| Source references | FR-DP-003/004 | `sourceReferences`, `pageText` |
| Action completion | FR-AI-001/003 | `ActionItems.jsx` |
| User agency | NONI/APUCS patterns | Back, Start Over, REVIEW, override boundaries |
| Accessibility | Charter, BRD, FRD | Controls, focus styles, status semantics |
| Caregiver support | FR-CG requirements | `CaregiverDashboard.jsx`, mock-only permissions |

---

## 6. Closure Fix

### UX-JOURNEY-001 — Make processing navigation state-aware

Implemented in `poc/frontend/store/DemoContext.jsx`:

- [x] Processing is treated as a transient state when navigating backward.
- [x] Back from the document view does not re-enter the processing timer.
- [x] Sample flow returns to the document list.
- [x] Uploaded-PDF flow returns to the dashboard.
- [x] Start Over still clears state only after confirmation.
- [x] Back preserves selected document and action progress unless the user explicitly resets.

After this fix, both forward and reverse senior journeys are technically closed for the current synchronous POC scope.

# Senior Journey Top-25 Failure and Edge-Case Risk Register

**Method**: Process v9.5 + Nelson + requirements ontology/knowledge graph  
**Scope**: Margaret's senior journey from landing to successful document understanding and action completion  
**Current branch baseline**: `develop`  
**Purpose**: Identify where the journey can fail, become misleading, or stop being safe

## Risk scoring

```text
Severity: 1 low → 5 blocks, harms, or materially misleads the senior
Likelihood: 1 rare → 5 likely in normal use
Priority = Severity × Likelihood
```

## Top 25 risks

| # | Risk / edge case | Journey point | S | L | Priority | Current state | Required control/evidence |
|---:|---|---|---:|---:|---:|---|---|
| 1 | Browser cannot reach API because runtime API origin differs from browser origin | Process upload | 5 | 4 | 20 | Same-origin proxy exists in dev; deployed configuration still required | Runtime API smoke test, visible connection error, environment contract |
| 2 | Uploaded source cannot be persisted because local disk is full/unavailable | Upload/result | 5 | 3 | 15 | Local source repository has no quota/health guard | Storage readiness, actionable error, cleanup/retention test |
| 3 | PDF parser rejects malformed, encrypted, or password-protected PDF | Upload/process | 5 | 3 | 15 | Generic failure boundary exists; specialized reason is incomplete | Error taxonomy, retry/alternative-source guidance |
| 4 | Scanned PDF has no text layer and produces empty/incomplete output | Extraction | 5 | 4 | 20 | OCR is a graph gap | OCR detection, REVIEW state, no empty-success result |
| 5 | Multi-column, table, or form reading order is wrong | Extraction/view | 5 | 3 | 15 | Layout handling is a graph gap | Layout classifier and page-level extraction tests |
| 6 | Fixture mode returns canned content for the user's actual PDF | Processing | 5 | 4 | 20 | Fixture mode is explicit backend configuration but easy to misunderstand | UI mode label, real-PDF startup profile, fixture-only banner |
| 7 | Full text is empty but result is marked complete | Processing/view | 5 | 2 | 10 | Contract does not enforce non-empty content | Processor gate: empty extraction → REVIEW/failed |
| 8 | Later-page deadline or obligation is omitted | Simplification/view | 5 | 3 | 15 | Full page contract exists; difficult-document coverage remains incomplete | Late-page regression corpus and source-count invariant |
| 9 | Source PDF endpoint returns 404 after result is saved | Original view | 5 | 2 | 10 | Source retrieval exists; persistence/restart boundary is local POC | Source availability check before completion and fallback message |
| 10 | PDF iframe cannot render on a mobile/browser combination | Original view | 4 | 3 | 12 | Inline iframe and Open PDF link exist | Detect preview failure and provide download/open fallback |
| 11 | Processing request times out with no durable job to resume | Processing | 5 | 3 | 15 | Synchronous processing; async job is a graph gap | Async job ID, timeout state, retry/resume |
| 12 | User presses Process repeatedly or retries while first request is unresolved | Upload | 4 | 3 | 12 | Active state disables file input; explicit request idempotency is absent | Idempotency key and duplicate-request test |
| 13 | User loses state by refreshing/back-forward browser navigation | Any view | 4 | 4 | 16 | State is in React memory only | Persist session state or clearly recoverable resume path |
| 14 | Back is pressed during an in-flight upload/process request | Processing | 4 | 3 | 12 | UI history exists; request cancellation is absent | AbortController, safe cancellation state, no orphaned result confusion |
| 15 | Start Over clears meaningful work unexpectedly | Action completion | 4 | 2 | 8 | Native confirmation exists | Senior-friendly confirmation with explicit lost-state summary |
| 16 | Browser native confirmation is unavailable or confusing to assistive technology | Start Over | 3 | 2 | 6 | `window.confirm` is used | Accessible in-app confirmation dialog |
| 17 | Simple, Standard, and Detailed output are identical and user assumes simplification occurred | Document view | 4 | 4 | 16 | Current source-preserving POC baseline intentionally returns full text levels | Label as source-preserving POC or provide actual distinct approved transformations |
| 18 | Missing provenance/source references reduce trust | Document view | 5 | 3 | 15 | Page references exist; complete sentence/span provenance is incomplete | Provenance coverage gate and visible REVIEW route |
| 19 | REVIEW state hides useful source/action context or leaves user without next action | Document view | 5 | 2 | 10 | REVIEW banner exists; end-to-end recovery is partial | REVIEW action contract: inspect source, retry, ask for help |
| 20 | Font-size control changes root class but hard-coded component sizes still defeat readability | Accessibility | 4 | 3 | 12 | Root control exists; component-level audit remains open | 200% zoom/readability test and tokenized typography |
| 21 | High-contrast class leaves borders, links, focus, or status colors insufficiently distinct | Accessibility | 4 | 3 | 12 | Basic high-contrast rules exist | Contrast audit for every state and component |
| 22 | Focus is not restored after Back, result transition, or error | Navigation/status | 4 | 3 | 12 | Buttons are keyboard reachable; focus restoration is not explicit | Focus target contract and keyboard regression tests |
| 23 | Live status changes are announced too rapidly or are not associated with upload control | Upload/processing | 4 | 3 | 12 | `aria-live` exists; timing and screen-reader execution remain open | Stable status region and announcement test |
| 24 | Action completion exists only in React memory and disappears on refresh/session end | Actions | 4 | 4 | 16 | `completedActions` is session state | Durable action persistence and completion acknowledgment |
| 25 | Backend JSON persistence is not safe for concurrent users/processes | Result/action | 5 | 3 | 15 | JSON repository is POC-only | Atomic writes, locking, database boundary, concurrency test |

## Ontology mappings

The risks connect to the graph as follows:

```text
REQ-UPLOAD      → R01, R02, R06, R09, R12
REQ-PROGRESS    → R06, R11, R12, R14, R23
REQ-FULLTEXT    → R04, R05, R07, R08, R10, R17
REQ-PROVENANCE  → R09, R18, R19
REQ-LEVELS      → R08, R17
REQ-ACCESS      → R16, R20, R21, R22, R23
REQ-ASYNC       → R11, R14, R25
REQ-AUTH        → R24, R25
REQ-APUCS       → R17, R18, R19
```

The graph's existing high gaps directly explain the highest risks:

- `GAP-REALOCR` → R04, R05, R08
- `GAP-ASYNC` → R11, R14
- `GAP-SPANISH` → language-specific variants of R04–R08
- `GAP-AUTH` → R24, R25
- `GAP-OPS` → R01, R02, R09, R11, R25

## Failure containment order

### Immediate P0 controls

1. Never mark empty or failed extraction as complete.
2. Distinguish fixture mode from real PDF mode in the user experience.
3. Route scanned/unsupported extraction to REVIEW with a clear next action.
4. Ensure original source availability before showing completion.
5. Prevent duplicate/in-flight request ambiguity.
6. Preserve a recoverable state when Back or refresh occurs.

### P1 controls

7. Complete OCR and layout handling.
8. Add async jobs and resumable processing.
9. Complete provenance and REVIEW recovery.
10. Add persistent action state.
11. Replace JSON persistence for concurrent use.
12. Complete 200% zoom, contrast, focus, and screen-reader execution gates.

## Successful-journey definition

A senior journey is not successful merely because the screen changes to `document`. It is successful only when:

```text
[ ] The selected file is the file being processed
[ ] The backend is reachable and the user knows the state
[ ] The source document is available to inspect
[ ] Extraction produced non-empty content or REVIEW is shown
[ ] Later pages are retained
[ ] All displayed views preserve source meaning
[ ] Provenance is visible or the system abstains
[ ] The user can identify actions and deadlines
[ ] Action completion is acknowledged and recoverable
[ ] Back and Start Over behave distinctly
[ ] Keyboard, focus, zoom, contrast, and screen-reader behavior remain usable
[ ] The result remains available after normal navigation/retry behavior
```

## Final Process v9.5 risk posture

```text
Current controlled POC risk:     Managed Risk
Highest active risks:             R01, R04, R06, R11, R13, R17, R24, R25
Production release implication:  Block until P0 controls and graph gaps close
```

This register is a failure-prevention artifact. It does not claim that a passing happy-path test proves the senior journey is safe or complete.

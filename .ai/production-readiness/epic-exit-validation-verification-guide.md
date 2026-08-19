# Epic Exit and Post-Coding Validation Guide

**Process**: v9.5  
**Scope**: POC, SYN, and RGC epic exit after coding is complete  
**Audience**: Developer, reviewer, QA, accessibility tester, product owner, and release owner

## Purpose

This guide prevents an epic from being marked complete because code was merged without proving the user journey, failure behavior, visual result, regression safety, and graph/evidence closure.

## Required exit chain

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

## Exit statuses

Use exactly one:

```text
COMPLETE
COMPLETE_WITH_ACCEPTED_RISK
BLOCKED
NOT_READY
```

`COMPLETE` requires every P0 acceptance criterion and every required evidence artifact.

---

# Phase 0 — Freeze and identify the epic

## Step 0.1 — Start from the merged coding commit

```bash
cd /home/hazbyn/GeraDoc
git checkout develop
git pull origin develop
git status --short --branch
git log -1 --oneline
```

Record:

```text
epic ID:
PR:
merge commit:
requirements:
personas:
journeys:
risk IDs:
```

## Step 0.2 — Verify the graph path

```bash
python3 - <<'PY'
import json
for path in [
  '.ai/nelson/requirements-knowledge-graph.json',
  '.ai/nelson/artifact-inventory.json',
]:
  with open(path) as f: json.load(f)
  print('valid:', path)
PY
```

Confirm:

```text
requirement → epic → capability → code → test → evidence
```

---

# Phase 1 — Backend and contract exit

## Step 1.1 — Install/verify dependencies

```bash
export PATH="$HOME/.local/node/bin:$PATH"
npm --prefix poc/backend install
npm --prefix poc/frontend install
```

## Step 1.2 — Run backend tests

```bash
npm --prefix poc/backend test
```

Required evidence:

```text
all test files pass
no unreviewed warnings
new tests cover new behavior
failure tests exist
recovery tests exist
```

## Step 1.3 — Run contract and API smoke checks

```bash
curl -fsS http://localhost:8000/health
curl -fsS http://localhost:8000/ready
POC_API_URL=http://localhost:8000 node poc/scripts/pocGateSmokeTest.mjs
```

For upload/processing epics:

```bash
curl -sS -X POST http://localhost:8000/api/process/jobs \
  -H 'Idempotency-Key: exit-check-001' \
  -F 'document=@/path/to/approved-test-document.pdf;type=application/pdf'
```

Poll the job:

```bash
curl http://localhost:8000/api/process/jobs/<JOB_ID>
```

Retrieve the result/source:

```bash
curl http://localhost:8000/api/process/<RESULT_ID>
curl -I http://localhost:8000/api/process/<RESULT_ID>/source
```

## Step 1.4 — Verify semantic safety

For semantic/synonymity/APUCS epics:

```bash
npm --prefix poc/backend test -- --run synonymityRubric
npm --prefix poc/backend test -- --run geragogicalExtractor
npm --prefix poc/backend test -- --run technicalGates
```

Verify:

```text
[ ] glossary and thesaurus agreement
[ ] protected anchors preserved
[ ] numbers/dates/entities preserved
[ ] negation preserved
[ ] conditions preserved
[ ] obligation strength preserved
[ ] provenance preserved
[ ] idempotence passes
[ ] unsafe candidates fallback or REVIEW
```

---

# Phase 2 — Frontend build and regression exit

## Step 2.1 — Build and lint

```bash
npm --prefix poc/frontend run build
npm --prefix poc/frontend run lint
git diff --check
```

## Step 2.2 — Run all Playwright tests

Start the backend in deterministic POC mode for fixture E2E:

```bash
PORT=8000 POC_USE_REAL_PDF=false npm --prefix poc/backend start
```

In a second terminal:

```bash
npm --prefix poc/frontend run dev -- --host 0.0.0.0 --port 5173
```

Run the complete browser suite:

```bash
npm --prefix poc/frontend run test:e2e
```

Required result:

```text
all Playwright tests passed
no retries required to pass
no console errors
no failed network requests
```

Current suites include:

```text
senior-buttons.spec.js
site-buttons.spec.js
```

## Step 2.3 — Add an E2E test before exiting any new user-facing epic

Every new user-facing epic must add a test covering:

```text
entry
→ primary action
→ success state
→ failure state
→ recovery state
→ reverse navigation
```

Do not rely only on unit tests for user-facing changes.

---

# Phase 3 — Visual verification

## Step 3.1 — Capture the senior forward journey

Open:

```text
http://localhost:5173
```

Capture or inspect:

```text
landing
senior dashboard
file selected
uploading
processing
complete
original source
simple
standard
detailed
full document pages
key information
actions
```

## Step 3.2 — Capture the reverse journey

Verify:

```text
document → Back → dashboard
dashboard → Back → landing
document → Start Over → confirmation → landing
processing → Back → dashboard
failure → Retry → processing
```

## Step 3.3 — Visual criteria

```text
[ ] no overlay blocks controls
[ ] no JSON/error object appears as document content
[ ] selected view is visually obvious
[ ] source PDF is visible or has Open PDF fallback
[ ] status is visible near the action
[ ] errors are adjacent to the failed action
[ ] long filenames wrap
[ ] long documents remain readable
[ ] no horizontal clipping at normal width
[ ] no essential content is hidden at 200% zoom
```

## Step 3.4 — Save visual evidence

```bash
mkdir -p /tmp/claritydoc-exit-evidence
```

Use these names:

```text
01-landing.png
02-senior-dashboard.png
03-file-selected.png
04-uploading.png
05-processing.png
06-complete.png
07-original-source.png
08-simple.png
09-standard.png
10-detailed.png
11-actions.png
12-back-dashboard.png
13-back-landing.png
14-start-over-dialog.png
15-large-text.png
16-high-contrast.png
17-failure-retry.png
```

Use only synthetic/approved documents.

---

# Phase 4 — Accessibility and senior interaction exit

## Step 4.1 — Keyboard

```text
[ ] Tab reaches every interactive control
[ ] Enter/Space activates buttons
[ ] Focus indicator remains visible
[ ] No keyboard trap
[ ] Back works
[ ] Start Over works
[ ] File input works
[ ] Process works
[ ] Document tabs work
[ ] Action Done works
```

## Step 4.2 — Screen reader

```text
[ ] page/view heading is announced
[ ] file input has a useful name
[ ] selected filename is announced
[ ] upload status is announced
[ ] processing status is announced
[ ] completion is announced
[ ] errors are announced
[ ] tabs expose selected state
[ ] source iframe has a useful title
[ ] action deadline and priority are understandable
```

## Step 4.3 — Text and contrast

```text
[ ] Small changes text size
[ ] Medium restores baseline
[ ] Large changes text size
[ ] High contrast changes all necessary surfaces
[ ] focus remains visible
[ ] status is not communicated by color alone
```

---

# Phase 5 — Failure and recovery regression matrix

Execute each applicable row:

| Scenario | Expected visible result | Recovery |
|---|---|---|
| Unsupported file | Plain error with accepted types | Choose another file |
| Oversized file | Size explanation | Choose smaller file |
| Malformed PDF | Readability error | Try another PDF/scan |
| Empty extraction | REVIEW or explicit failure | OCR/new scan/retry |
| Scanned PDF | OCR or REVIEW | Try text PDF/retry |
| Network failure | Connection error | Retry |
| Backend unavailable | Service error | Restart/retry |
| Job timeout | Taking too long message | Retry/resume |
| Duplicate Process | One job/result | Poll existing job |
| Cancel | Cancelled state | Return/retry |
| Back during processing | Dashboard | No forward loop |
| Refresh during processing | Resume/status recovery | Continue/retry |
| Source missing | Source fallback message | Reprocess |
| Missing provenance | REVIEW/source-only | Inspect source |
| Synonym disagreement | Source text retained | No unsafe change |
| Negation/condition change | Candidate rejected | Source fallback |
| Permission failure | Unauthorized message | Request access |
| Notification failure | Retry/disabled state | Update preference/provider |

For each row capture:

```text
risk ID
trigger
visible result
backend result
recovery result
screenshot
console/network evidence
owner
```

---

# Phase 6 — Full suite and graph closeout

## Step 6.1 — Run the full suite

```bash
npm --prefix poc/backend test
npm --prefix poc/frontend run test:e2e
npm --prefix poc/frontend run build
npm --prefix poc/frontend run lint
python3 - <<'PY'
import json
for path in [
  '.ai/nelson/requirements-knowledge-graph.json',
  '.ai/nelson/artifact-inventory.json',
]:
  with open(path) as f: json.load(f)
  print('valid:', path)
PY
git diff --check
```

## Step 6.2 — Synchronize evidence

Update:

```text
.ai/nelson/requirements-knowledge-graph.json
.ai/nelson/artifact-inventory.json
.ai/nelson/pr-evidence.md
docs/CURRENT_STATE.md
relevant epic execution record
```

## Step 6.3 — Determine exit verdict

Use:

```text
COMPLETE
COMPLETE_WITH_ACCEPTED_RISK
BLOCKED
NOT_READY
```

### COMPLETE

Every P0 requirement has:

```text
persona
→ journey
→ behavior
→ capability
→ code
→ test
→ visual evidence
→ owner
→ failure state
→ recovery state
```

### COMPLETE_WITH_ACCEPTED_RISK

Only non-P0 residual risk remains, with owner and next action.

### BLOCKED

A required provider, decision, approval, or technical dependency is unavailable.

### NOT_READY

Code or evidence is incomplete.

---

# Epic exit report template

```markdown
# Epic Exit Report

Epic ID:
Epic title:
PR:
Merge commit:
Owner:

## Requirements
- IDs:
- Persona:
- Journey:

## Implementation
- Code paths:
- API/data contracts:

## Automated evidence
- Backend tests:
- Frontend build:
- Frontend lint:
- Playwright:
- Contract/graph validation:

## Visual evidence
- Screenshot folder:
- Browser:
- Viewport:

## Failure/recovery
- Scenarios executed:
- Failures:
- Recovery:

## Residual risks
- Risk ID:
- Owner:
- Next action:

## Verdict
COMPLETE / COMPLETE_WITH_ACCEPTED_RISK / BLOCKED / NOT_READY
```

## Final rule

A merged PR is not an epic exit. An epic exits only after code, automated tests, browser E2E, visual evidence, accessibility evidence, failure/recovery evidence, and graph synchronization all agree.

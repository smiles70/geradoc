# POC Functional Closure Validation and Visual Guide

**Purpose**: Validate, verify, and visually inspect the code delivered by the POC functional-closure epics.

## 1. Start the current POC

```bash
cd /home/hazbyn/GeraDoc
git checkout develop
git pull origin develop
export PATH="$HOME/.local/node/bin:$PATH"
```

Terminal 1 — backend:

```bash
cd /home/hazbyn/GeraDoc
export PATH="$HOME/.local/node/bin:$PATH"
PORT=8000 POC_USE_REAL_PDF=true npm --prefix poc/backend start
```

Terminal 2 — frontend:

```bash
cd /home/hazbyn/GeraDoc
export PATH="$HOME/.local/node/bin:$PATH"
npm --prefix poc/frontend run dev -- --host 0.0.0.0 --port 5173
```

Open:

```text
http://localhost:5173
```

## 2. Automated verification

```bash
npm --prefix poc/backend test
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

Expected current baseline:

```text
Backend: 14 test files / 31 tests passed
Frontend build: passed
Frontend lint: passed with 0 warnings/errors
```

## 3. Backend API verification

Health:

```bash
curl -fsS http://localhost:8000/health
curl -fsS http://localhost:8000/ready
POC_API_URL=http://localhost:8000 node poc/scripts/pocGateSmokeTest.mjs
```

Async upload:

```bash
curl -sS -X POST http://localhost:8000/api/process/jobs \
  -H 'Idempotency-Key: visual-check-001' \
  -F 'document=@/path/to/approved-test-document.pdf;type=application/pdf'
```

Poll:

```bash
curl http://localhost:8000/api/process/jobs/<JOB_ID>
```

Retrieve result:

```bash
curl http://localhost:8000/api/process/<RESULT_ID>
curl -I http://localhost:8000/api/process/<RESULT_ID>/source
```

Expected result fields:

```text
sourceUrl
processingMode
processingStatus
orientation
keyInfo
actions
pageText
sourceReferences
summary.simple
summary.standard
summary.detailed
```

## 4. Senior forward journey visual test

Start at the landing screen.

```text
[ ] Page title is clear
[ ] “Try as a Senior” is visible and keyboard reachable
[ ] POC warning says to use approved test documents only
```

Select the senior persona:

```text
[ ] Dashboard says “Welcome, Margaret”
[ ] Upload area is visually prominent
[ ] Sample documents are clearly separated
[ ] Back and Start Over are visually distinct
```

Select a valid PDF:

```text
[ ] Filename is visible
[ ] “Process this document” is visible
[ ] No processing begins before explicit confirmation
```

Click Process:

```text
[ ] Uploading message appears
[ ] Processing message appears
[ ] Progress indicator is visible
[ ] Process button is unavailable while active
[ ] Completion message appears
[ ] Viewer opens automatically after completion
```

## 5. Uploaded-document geragogy visual test

On the resulting document view:

```text
[ ] “What this document is about” orientation card appears
[ ] Uploaded source document appears in the PDF preview
[ ] “Open PDF” fallback link appears
[ ] Processing mode is visible
[ ] Language is visible
[ ] Layout is visible
[ ] Key information cards appear when dates/amounts are found
[ ] Action items appear when action language is found
[ ] Actions show priority and source page where available
[ ] Original source remains inspectable
```

View tabs:

```text
[ ] Original shows source-preserving content
[ ] Simple uses easier spacing and plain-language replacements
[ ] Standard uses source-preserving plain-language replacements
[ ] Detailed preserves the complete source text
[ ] Tab selection is visibly different
[ ] Selected tab exposes aria-selected=true
```

## 6. Sample-document visual test

For each sample document:

```text
[ ] Select sample
[ ] Processing screen appears
[ ] Processing message is announced
[ ] Document view appears
[ ] Simple/Standard/Detailed content is visibly different
[ ] Key information cards appear
[ ] Actions appear
[ ] Action can be marked complete
[ ] Completion feedback appears
```

## 7. Reverse journey test

From the document view:

```text
[ ] Back returns to the document list/dashboard
[ ] Back does not re-enter a processing loop
[ ] Selected document remains recoverable where appropriate
[ ] Completed action state remains visible
```

From the dashboard:

```text
[ ] Back returns to landing/role selection
[ ] Start Over asks for confirmation
[ ] Cancel preserves state
[ ] Confirm clears the journey
```

## 8. Accessibility visual/keyboard test

Keyboard-only:

```text
[ ] Tab reaches role buttons
[ ] Tab reaches upload input
[ ] Tab reaches Process button
[ ] Tab reaches Back
[ ] Tab reaches Start Over
[ ] Enter/Space activates controls
[ ] Focus moves to main content after view transitions
```

Text size:

```text
[ ] Small visibly reduces body/control text
[ ] Medium restores normal size
[ ] Large visibly increases body/control text
[ ] Headings retain hierarchy
[ ] Long text remains readable
```

High contrast:

```text
[ ] Text remains readable
[ ] Borders remain visible
[ ] Focus remains visible
[ ] Error/status colors are not the only signal
[ ] Buttons remain distinguishable
```

Screen reader:

```text
[ ] Upload control has a usable name
[ ] Process button has a usable name
[ ] Upload/processing status is announced
[ ] Errors are announced
[ ] Tabs expose selected state
[ ] Source iframe has a meaningful title
```

## 9. Failure and recovery test matrix

```text
[ ] Unsupported file type
[ ] Oversized file
[ ] Malformed PDF
[ ] Empty extraction
[ ] Scanned/image-only PDF
[ ] Network disconnected
[ ] Backend stopped
[ ] Processing timeout
[ ] Duplicate Process request
[ ] Retry after failure
[ ] Cancel during processing
[ ] Back during processing
[ ] Browser refresh during processing
[ ] Source endpoint unavailable
[ ] Missing provenance
```

For every failure, record:

```text
trigger
→ visible message
→ system state
→ user next action
→ recovery result
→ screenshot/evidence
→ graph risk ID
```

## 10. Visual evidence capture

Create an evidence folder outside runtime data:

```bash
mkdir -p /tmp/claritydoc-poc-visual-evidence
```

Capture at minimum:

```text
01-landing.png
02-senior-dashboard.png
03-file-selected.png
04-uploading.png
05-processing.png
06-complete.png
07-original-source.png
08-simple-view.png
09-standard-view.png
10-detailed-view.png
11-full-document-pages.png
12-actions.png
13-back-navigation.png
14-start-over-confirmation.png
15-large-text.png
16-high-contrast.png
17-error-retry.png
```

Do not capture or store real personal documents. Use approved synthetic or sanitized fixtures only.

## 11. Closure evidence record

Complete this record after the visual run:

```markdown
# POC Visual Validation Record

Date:
Tester:
Commit:
PDF fixture:
Browser:
Viewport:

## Results
- Forward journey: PASS / FAIL
- Reverse journey: PASS / FAIL
- PDF source preview: PASS / FAIL
- Geragogical orientation: PASS / FAIL
- Key info/actions: PASS / FAIL
- Simple/Standard/Detailed: PASS / FAIL
- Keyboard: PASS / FAIL
- Screen reader: PASS / FAIL
- 200% zoom: PASS / FAIL
- High contrast: PASS / FAIL
- Error/retry: PASS / FAIL
- Refresh recovery: PASS / FAIL

## Risks observed
- R01:
- R02:

## Evidence paths
- screenshots:
- console output:
- test output:

## Verdict
PROCEED / MANAGED RISK / BLOCK
```

## Completion rule

The visual guide does not replace automated tests. POC closure requires both:

```text
automated contract/build tests
+ visual senior journey evidence
+ graph risk mapping
+ Process v9.5 evidence synchronization
```

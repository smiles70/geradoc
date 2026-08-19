# POC Functional Closure Developer Guide

**Process**: v9.5  
**Scope**: POC functional closure from deep requirements decomposition  
**Audience**: Developer receiving copy/paste implementation steps  
**Status**: Ready for development

## Operating rule

Do not mark a story complete because a screen, fixture, or endpoint exists. Each story must have:

```text
persona need → journey step → observable behavior → capability
→ code → test → evidence → failure state → recovery state
```

## Session 0 — Start safely

```bash
cd /home/hazbyn/GeraDoc
git checkout develop
git pull origin develop
git checkout -b feature/poc-functional-closure
export PATH="$HOME/.local/node/bin:$PATH"
npm --prefix poc/backend test
npm --prefix poc/frontend run build
npm --prefix poc/frontend run lint
```

Record the baseline before editing.

## Session 1 — Make graph decomposition idempotent

### 1.1 Stable entity identity

Create a deterministic identity helper:

```js
const crypto = require('node:crypto');

function canonicalKey({ type, sourceId, key }) {
  return `${type}|${sourceId}|${String(key).trim().toLowerCase()}`;
}

function stableId(input) {
  return crypto.createHash('sha256')
    .update(canonicalKey(input))
    .digest('hex')
    .slice(0, 16);
}

module.exports = { canonicalKey, stableId };
```

Acceptance:

```text
Same source + same versions → same ID
Different source/key → different ID
```

### 1.2 Stable edge identity

```js
function edgeKey({ from, relation, to }) {
  return `${from}::${relation}::${to}`;
}

function mergeEdges(existing, incoming) {
  const all = new Map();
  [...existing, ...incoming].forEach(edge => all.set(edgeKey(edge), edge));
  return [...all.values()].sort((a, b) => edgeKey(a).localeCompare(edgeKey(b)));
}

module.exports = { edgeKey, mergeEdges };
```

### 1.3 Graph integrity checks

```js
function validateGraph(graph) {
  const ids = new Set();
  const errors = [];
  for (const node of graph.nodes) {
    if (ids.has(node.id)) errors.push(`duplicate node: ${node.id}`);
    ids.add(node.id);
  }
  for (const edge of graph.edges) {
    if (!ids.has(edge.from)) errors.push(`missing edge source: ${edge.from}`);
    if (!ids.has(edge.to)) errors.push(`missing edge target: ${edge.to}`);
  }
  return { pass: errors.length === 0, errors };
}

module.exports = { validateGraph };
```

## Session 2 — Apply geragogy to uploaded documents

### 2.1 Extract typed document facts

```js
function extractDocumentFacts(text) {
  const source = String(text || '');
  const dates = source.match(/\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/g) || [];
  const amounts = source.match(/\$\s?\d[\d,]*(?:\.\d{2})?/g) || [];
  const actionLines = source.split(/\n|(?<=[.!?])\s+/)
    .filter(line => /\b(must|need to|required to|due|submit|call|pay|review|complete)\b/i.test(line));
  return { dates, amounts, actionLines };
}

module.exports = { extractDocumentFacts };
```

This is a POC extraction boundary. Every result must retain source references and must route uncertain facts to REVIEW rather than guess.

### 2.2 Build a senior-oriented result

```js
function buildGeragogicalResult({ title, facts, sourceReferences }) {
  return {
    orientation: {
      title,
      whyItMatters: 'This document may contain information or actions that affect you.',
    },
    keyInfo: [
      ...facts.dates.map(value => ({ type: 'date', label: 'Important date', value })),
      ...facts.amounts.map(value => ({ type: 'amount', label: 'Amount mentioned', value })),
    ].map((item, index) => ({ ...item, source: sourceReferences[index] || null })),
    actions: facts.actionLines.map((description, index) => ({
      id: `action-${index + 1}`,
      description,
      priority: /must|required|due/i.test(description) ? 'high' : 'medium',
      source: sourceReferences[index] || null,
    })),
    reviewFlags: [],
  };
}

module.exports = { buildGeragogicalResult };
```

Required behavior:

```text
No extracted fact without provenance
No unsupported deadline claim
No empty success result
No guessed advice
```

## Session 3 — Complete extraction and layout routing

### 3.1 Native versus scanned PDF

```js
function routeExtraction({ fullText, pages }) {
  if (!fullText || !fullText.trim()) {
    return { state: 'REVIEW', reason: 'no-readable-text', next: 'ocr-or-new-scan' };
  }
  return { state: 'TEXT_READY', pages: pages.length };
}

module.exports = { routeExtraction };
```

### 3.2 Layout routing

```js
const extractors = {
  single_column_prose: extractProse,
  multi_column: extractMultiColumn,
  table_heavy: extractTable,
  form: extractForm,
  mixed: extractMixed,
};

function extractByLayout(layout, input) {
  const extractor = extractors[layout];
  if (!extractor) return { state: 'REVIEW', reason: 'unsupported-layout' };
  return extractor(input);
}

module.exports = { extractByLayout };
```

Do not claim OCR is complete until a real OCR provider/engine is integrated and tested. The safe interim behavior is REVIEW.

## Session 4 — Durable job lifecycle

### 4.1 Job state contract

```js
const JOB_STATES = [
  'queued', 'processing', 'complete', 'review',
  'failed', 'retrying', 'cancelled', 'dead_letter',
];

function canTransition(from, to) {
  const transitions = {
    queued: ['processing', 'cancelled'],
    processing: ['complete', 'review', 'failed', 'cancelled'],
    failed: ['retrying', 'dead_letter'],
    retrying: ['processing', 'dead_letter'],
  };
  return transitions[from]?.includes(to) || false;
}

module.exports = { JOB_STATES, canTransition };
```

### 4.2 Idempotent API request

```bash
curl -X POST http://localhost:8000/api/process/jobs \
  -H 'Idempotency-Key: demo-document-001' \
  -F 'document=@/path/to/approved-test-document.pdf;type=application/pdf'
```

Poll the returned job:

```bash
curl http://localhost:8000/api/process/jobs/<JOB_ID>
```

Do not expose real personal documents in the repository.

## Session 5 — Persist the senior journey

### 5.1 Browser recovery boundary

```js
const SESSION_KEY = 'claritydoc-poc-session';

function saveSession(session) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function loadSession() {
  try {
    return JSON.parse(window.localStorage.getItem(SESSION_KEY) || '{}');
  } catch {
    return {};
  }
}
```

### 5.2 Action lifecycle

```js
const ACTION_STATES = ['not_started', 'in_progress', 'complete', 'overdue'];

function transitionAction(action, nextState) {
  if (!ACTION_STATES.includes(nextState)) throw new Error('Unknown action state');
  return { ...action, state: nextState, updatedAt: new Date().toISOString() };
}
```

Production closure requires moving this state from browser/local JSON to authorized durable storage.

## Session 6 — Accessibility and bidirectional journey

### Forward journey

```text
Landing → Senior → Dashboard → Select/upload → Process
→ Complete → Source → Simple/Standard/Detailed → Actions
```

### Reverse journey

```text
Actions/document → Back → Dashboard → Back → Landing
```

Required keyboard checks:

```text
[ ] Tab reaches role buttons
[ ] Tab reaches file input
[ ] Tab reaches Process button
[ ] Status is announced
[ ] Focus moves to the new view
[ ] Document tabs expose aria-selected
[ ] Back does not re-enter transient processing
[ ] Start Over has an accessible confirmation
```

## Session 7 — English and Spanish POC scope

```js
const profiles = {
  en: { datePattern: /\b\w+ \d{1,2},? \d{4}\b/, decimal: '.' },
  es: { datePattern: /\b\d{1,2} de \w+ de \d{4}\b/, decimal: ',' },
};

function getProfile(language) {
  if (!profiles[language]) return { state: 'REVIEW', reason: 'unsupported-language' };
  return profiles[language];
}
```

A Spanish POC is not complete until extraction, actions, deadlines, status copy, provenance, and REVIEW behavior all use the selected language.

## Session 8 — Authorization and production boundaries

```js
function requireDocumentOwner(document, user) {
  if (!user || document.ownerId !== user.id) {
    const error = new Error('Document access is not authorized.');
    error.code = 'FORBIDDEN';
    throw error;
  }
}
```

Do not treat a client-provided user ID as production authorization. The POC seam must be replaced by authenticated identity and server-side permissions before real documents are allowed.

## Session 9 — Observability

```js
function event(name, fields = {}) {
  return {
    name,
    requestId: fields.requestId,
    jobId: fields.jobId,
    timestamp: new Date().toISOString(),
    ...fields,
  };
}

console.log(JSON.stringify(event('document.processing.completed', {
  requestId,
  jobId,
  status: 'complete',
})));
```

Never put source text, secrets, tokens, or personal document content in events.

## Session 10 — Integrated closure gate

```bash
export PATH="$HOME/.local/node/bin:$PATH"
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

Final requirement path:

```text
persona
→ journey
→ behavior
→ capability
→ API/data contract
→ code
→ test
→ runtime evidence
→ owner
→ failure
→ recovery
→ graph edge
```

## Definition of complete POC closure

```text
[ ] Uploaded documents receive geragogical orientation
[ ] Key information, deadlines, and actions are extracted
[ ] Original source and provenance remain available
[ ] Simple/Standard/Detailed views are complete and meaningfully distinct
[ ] Empty/uncertain/OCR/layout failures route to REVIEW
[ ] Jobs are durable, idempotent, retryable, and cancellable
[ ] Browser refresh and Back preserve safe state
[ ] Accessibility journey is executable
[ ] English/Spanish paths are explicit
[ ] Caregiver behavior is not falsely represented as authorized
[ ] Requirement decomposition is deterministic
[ ] Graph integrity and decomposition diff pass
[ ] All P0 stories have tests and evidence
```

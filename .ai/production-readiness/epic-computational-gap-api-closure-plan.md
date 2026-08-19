# Computational Gap API Closure Plan

**Process**: v9.5  
**Scope**: Computational/research-solvable decomposition gaps  
**Deferred**: Human semantic-equivalence approval, legal/IP approval, calibration approval, production-release approval

## API-first rule

Every executable gap receives:

```text
interface
→ input/output contract
→ state transitions
→ failure/recovery
→ data/security boundary
→ tests/evidence
→ external dependency/approval status
```

## API portfolio

### API-001 — Requirement decomposition

```http
POST /api/internal/requirements/decompose
GET  /api/internal/requirements/graph
POST /api/internal/requirements/graph/merge
GET  /api/internal/requirements/diff/:from/:to
POST /api/internal/requirements/validate
```

Input:

```json
{"sourceId":"SRC-FRD","contentHash":"sha256:...","ontologyVersion":"1.0","parserVersion":"1.0"}
```

Output:

```json
{"nodes":[],"edges":[],"graphHash":"sha256:...","idempotent":true,"conflicts":[],"orphans":[]}
```

### API-002 — Document extraction/layout

```http
POST /api/process/jobs
GET  /api/process/jobs/:id
GET  /api/process/:id
GET  /api/process/:id/source
```

Required metadata:

```json
{"language":"en","layoutClass":"single_column_prose","extractionConfidence":1,"pageText":[],"sourceReferences":[],"reviewFlags":[]}
```

### API-003 — OCR adapter

```js
class OcrAdapter {
  supports(input) {}
  async extract(input) {}
}
```

The adapter returns text/pages/confidence/provenance or REVIEW. Provider selection is deferred until an OCR service is selected.

### API-004 — Geragogy document facts

```http
POST /api/internal/geragogy/facts
```

Input:

```json
{"documentId":"...","text":"...","pageText":[],"language":"en","domain":"insurance"}
```

Output:

```json
{"orientation":{},"keyInfo":[],"actions":[],"reviewFlags":[],"sourceReferences":[]}
```

### API-005 — Synonymity/glossary/thesaurus

```http
POST /api/internal/synonymity/candidates
POST /api/internal/synonymity/validate
POST /api/internal/synonymity/transform
```

Required decision:

```json
{"accepted":false,"reason":"obligation-strength-change","source":"may","replacement":"must","provenance":null}
```

Only glossary + independent thesaurus agreement can produce an accepted candidate.

### API-006 — Condition/negation/obligation parsing

```http
POST /api/internal/semantic/parse
POST /api/internal/semantic/compare
```

Output:

```json
{"propositions":[],"conditions":[],"negations":[],"obligations":[],"permissions":[],"exceptions":[],"preserved":true,"reviewFlags":[]}
```

### API-007 — APUCS candidate selection

```http
POST /api/internal/apucs/candidates
POST /api/internal/apucs/validate
POST /api/internal/apucs/select
GET  /api/internal/apucs/config/:domain/:language/:modality
```

APUCS remains shadow-only until calibration and separate approvals close.

### API-008 — Identity/authorization seam

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/users/me
GET  /api/documents/:id/access
POST /api/documents/:id/permissions
DELETE /api/documents/:id/permissions/:userId
```

Production identity provider and session strategy are deferred decisions.

### API-009 — Actions/notifications

```http
GET  /api/documents/:id/actions
PATCH /api/actions/:id
POST /api/notifications/preferences
POST /api/notifications/test
```

Required states:

```text
not_started → in_progress → complete
not_started/in_progress → overdue
queued → delivered / retrying / failed / disabled
```

### API-010 — Observability/operations

```http
GET /health
GET /ready
GET /metrics
GET /api/internal/jobs/:id/events
```

Events must include request/job IDs and must not include document text, secrets, or tokens.

## Implementation order

```text
API-001 graph/decomposition
→ API-002 extraction/layout
→ API-004 geragogy facts
→ API-005 synonymity
→ API-006 semantic parser
→ API-007 APUCS selector
→ API-008 auth
→ API-009 action/notifications
→ API-010 operations
```

## Deferred approval gates

These are intentionally not executed as code-only tasks:

```text
human semantic-equivalence review
legal/IP/ownership/FTO review
calibration approval
production release approval
```

Their technical prerequisites are still represented as API contracts, evidence requirements, and graph edges.

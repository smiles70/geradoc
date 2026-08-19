# RGC Production-Gap Closure Developer Guide

**Process**: v9.5  
**Portfolio**: RGC-001 through RGC-010  
**Purpose**: Copy/paste implementation and verification guide for closing remaining production-shaped gaps

## How to use this guide

Each session includes:

- Objective
- Dependencies
- Approximate engineering time
- Approximate model-token budget
- Copy/paste code blocks
- Exit criteria

Token estimates are planning estimates for an AI-assisted developer session, not execution guarantees.

## Session 0 — Baseline and branch

**Time**: 15–30 minutes  
**Token budget**: 4K–8K  
**Status**: Executable immediately

```bash
cd /home/hazbyn/GeraDoc
git checkout develop
git pull origin develop
git checkout -b feature/rgc-closure-execution
export PATH="$HOME/.local/node/bin:$PATH"
npm --prefix poc/backend test
npm --prefix poc/frontend run build
npm --prefix poc/frontend run lint
```

Exit:

```text
[ ] Clean branch
[ ] Baseline tests recorded
[ ] Graph and artifact inventory valid
```

## Session 1 — RGC-001 OCR/layout/provenance

**Time**: 2–5 engineering days  
**Token budget**: 35K–70K  
**Dependencies**: OCR provider/engine decision, approved test corpus

### Copy/paste adapter contract

```js
class OcrAdapter {
  supports(input) {
    return input.mimeType === 'application/pdf' || input.mimeType.startsWith('image/');
  }

  async extract({ buffer, fileName }) {
    return {
      fileName,
      pages: [],
      fullText: '',
      sourceReferences: [],
      confidence: 0,
      state: 'REVIEW',
      reviewFlags: ['ocr-provider-not-configured'],
    };
  }
}

module.exports = { OcrAdapter };
```

### Verify layout routing

```bash
npm --prefix poc/backend test -- --run layoutClassifier
```

Exit:

```text
[ ] Native text path works
[ ] Scanned path routes to OCR or REVIEW
[ ] Tables/forms/multi-column paths are explicit
[ ] Page/span provenance exists
[ ] Empty extraction cannot complete
```

**Execution boundary**: cannot claim OCR completion without an actual OCR engine/provider and approved corpus.

## Session 2 — RGC-002 English/Spanish processing

**Time**: 2–4 engineering days  
**Token budget**: 30K–60K  
**Dependencies**: language/domain profile decisions

### Copy/paste profile contract

```js
const profiles = {
  en: { datePattern: /\b\w+ \d{1,2},? \d{4}\b/, decimal: '.' },
  es: { datePattern: /\b\d{1,2} de \w+ de \d{4}\b/, decimal: ',' },
};

function getLanguageProfile(language) {
  return profiles[language] || { state: 'REVIEW', reason: 'unsupported-language' };
}

module.exports = { getLanguageProfile };
```

### Verify current foundation

```bash
npm --prefix poc/backend test -- --run languageProfiles
```

Exit:

```text
[ ] Language detection exists
[ ] Explicit language override exists
[ ] Spanish dates/amounts normalize
[ ] Spanish negation/conditions preserve polarity
[ ] Spanish actions/deadlines/provenance complete
[ ] Spanish UI status/error/REVIEW copy complete
```

**Execution boundary**: current POC foundation is executable; full Spanish candidate/advice processing requires additional implementation.

## Session 3 — RGC-003 identity/authentication

**Time**: 3–7 engineering days  
**Token budget**: 45K–90K  
**Dependencies**: identity provider and session strategy

### Copy/paste authorization seam

```js
function requireDocumentOwner(document, user) {
  if (!user || document.ownerId !== user.id) {
    const error = new Error('Document access is not authorized.');
    error.code = 'FORBIDDEN';
    throw error;
  }
}

module.exports = { requireDocumentOwner };
```

### Verify the seam

```bash
curl -i http://localhost:8000/api/process/<RESULT_ID>/source
```

Exit:

```text
[ ] Real identity provider selected
[ ] Login/session lifecycle implemented
[ ] Owner identity is server-derived
[ ] Source endpoint enforces authorization
[ ] Expired/invalid sessions fail safely
```

**Execution boundary**: cannot complete production authorization without an identity provider, user store, and security configuration.

## Session 4 — RGC-004 caregiver permissions

**Time**: 3–6 engineering days  
**Token budget**: 40K–80K  
**Dependencies**: RGC-003 identity/authentication

### Copy/paste permission model

```js
function canViewDocument({ seniorId, caregiverId, permission }) {
  return Boolean(
    permission
      && permission.seniorId === seniorId
      && permission.caregiverId === caregiverId
      && permission.documentRead === true
      && permission.revokedAt === null,
  );
}

module.exports = { canViewDocument };
```

Exit:

```text
[ ] Invitation
[ ] Acceptance
[ ] Senior approval
[ ] Document-level access
[ ] Revocation
[ ] Unauthorized-access test
```

## Session 5 — RGC-005 durable persistence/data lifecycle

**Time**: 4–8 engineering days  
**Token budget**: 50K–100K  
**Dependencies**: database/object-storage decision

### Copy/paste repository interface

```js
class DocumentRepository {
  async create(document) { throw new Error('Implement database create'); }
  async findOwnedById(id, ownerId) { throw new Error('Implement authorized lookup'); }
  async deleteOwnedById(id, ownerId) { throw new Error('Implement authorized delete'); }
  async exportOwned(ownerId) { throw new Error('Implement authorized export'); }
}

module.exports = { DocumentRepository };
```

### Verify current POC boundary

```bash
npm --prefix poc/backend test -- --run resultRepository
```

Exit:

```text
[ ] Database selected
[ ] Atomic document/result/action transactions
[ ] Owner/tenant association
[ ] Retention
[ ] Deletion
[ ] Export
[ ] Backup/restore
[ ] Concurrency test
```

**Execution boundary**: local JSON is not production persistence; production database and storage must be selected before this session can be complete.

## Session 6 — RGC-006 notifications/reminders

**Time**: 3–6 engineering days  
**Token budget**: 35K–75K  
**Dependencies**: identity, consent, provider decision

### Copy/paste notification contract

```js
function createNotification({ userId, type, channel, consentVersion, payload }) {
  if (!userId || !channel || !consentVersion) {
    throw new Error('Notification consent is required.');
  }
  return {
    userId,
    type,
    channel,
    consentVersion,
    payload,
    state: 'queued',
    attempts: 0,
  };
}

module.exports = { createNotification };
```

Exit:

```text
[ ] Consent
[ ] Quiet hours
[ ] Provider adapter
[ ] Retry/failure
[ ] Opt-out
[ ] Audit record
```

## Session 7 — RGC-007 calibrated APUCS activation

**Time**: 5–10 engineering days plus separate approval gates  
**Token budget**: 60K–120K  
**Dependencies**: candidate registry, calibration data, human/legal approvals

### Copy/paste feature-flag boundary

```js
function selectSimplifier({ mode, baseline, apucs, approved }) {
  if (mode === 'apucs' && approved === true) return apucs;
  return baseline;
}

module.exports = { selectSimplifier };
```

Exit:

```text
[ ] Candidate backend registry
[ ] Hard constraints
[ ] Demand/capability selector
[ ] Calibration profile
[ ] Drift monitoring
[ ] REVIEW fallback
[ ] Baseline rollback
[ ] Human/accessibility/legal gates separately approved
```

**Execution boundary**: do not activate APUCS user-visible without the separate approval gates.

## Session 8 — RGC-008 accessibility/senior journey certification

**Time**: 2–4 engineering days  
**Token budget**: 25K–50K  
**Dependencies**: deployed review environment

### Copy/paste validation commands

```bash
npm --prefix poc/backend test
npm --prefix poc/frontend run build
npm --prefix poc/frontend run lint
git diff --check
```

### Visual journey

```text
Landing
→ Senior
→ Dashboard
→ Select PDF
→ Process
→ Uploading
→ Processing
→ Complete
→ Original
→ Simple
→ Standard
→ Detailed
→ Actions
→ Back
→ Dashboard
→ Back
→ Landing
```

Exit:

```text
[ ] Keyboard-only
[ ] Screen reader
[ ] 200% zoom
[ ] High contrast
[ ] Focus restoration
[ ] Live status
[ ] Reduced motion
[ ] Long-document navigation
```

## Session 9 — RGC-009 operations/deployment/recovery

**Time**: 4–8 engineering days  
**Token budget**: 45K–90K  
**Dependencies**: deployment target and support owner

### Copy/paste event contract

```js
function processingEvent(name, { requestId, jobId, status, errorCode }) {
  return {
    name,
    requestId,
    jobId,
    status,
    errorCode: errorCode || null,
    at: new Date().toISOString(),
  };
}
```

Exit:

```text
[ ] Metrics
[ ] Dashboards
[ ] Alerts
[ ] SLOs
[ ] Deployment
[ ] Rollback
[ ] Backup/restore drill
[ ] Incident runbook
[ ] Owner/escalation
```

## Session 10 — RGC-010 integrated closure

**Time**: 3–5 engineering days  
**Token budget**: 35K–70K  
**Dependencies**: RGC-001 through RGC-009

### Copy/paste verification

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

### Full persona/journey matrix

```text
Margaret first-time English
Margaret returning English
Margaret Spanish
David caregiver
Enterprise/health-plan
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
APUCS REVIEW/fallback
```

For every case record:

```text
trigger → visible state → backend state → recovery
→ code → test → evidence → graph edge → owner
```

## Execution classification

At the end of each session use exactly one state:

```text
COMPLETE
PARTIAL
BLOCKED_EXTERNAL_DEPENDENCY
BLOCKED_APPROVAL
NOT_STARTED
```

Never use `COMPLETE` when an external provider, decision, approval, or evidence gate remains unresolved.

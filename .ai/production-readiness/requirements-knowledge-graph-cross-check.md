# Requirements Knowledge-Graph Cross-Check

**Date**: August 19, 2026  
**Status**: Cross-check complete; gaps and conflicts recorded  
**Method**: Lightweight ontology + directed knowledge graph over BRD, FRD, PRD, technical/operational specifications, bridge epics, PDF closure, APUCS specifications, and current POC artifacts.

## 1. Ontology

```text
SourceArtifact
  → defines/refines Requirement
Requirement
  → satisfied_by/partially_satisfied_by Capability
Capability
  → verified_by Test
Requirement
  → planned_by Epic
Requirement
  → blocked_by Gap or Conflict
```

Machine-readable graph:

```text
.ai/nelson/requirements-knowledge-graph.json
```

## 2. Sources cross-checked

- Application Charter v1.0
- BRD v1.0
- Functional Requirements v1.0
- Functional Requirements Document v1.0
- PRD v1.0
- Technical Specifications v1.0
- Operational Requirements v1.0
- Implementation Plan
- Demo-to-POC Bridge Portfolio
- PDF Full-Document Validation
- APUCS v1.1/v1.2/v1.3 specifications and validation
- APUCS user journeys
- Current POC source and tests

## 3. Traceability findings

### Satisfied or substantially satisfied

- Mocked demo UX and senior/caregiver flows.
- Legacy document-result contract.
- POC upload boundary.
- Fixture/PDF adapter boundary.
- JSON persistence and result retrieval.
- Original/full/page text contract in the current POC.
- Original/Simple/Standard/Detailed viewer structure.
- Research-mode APUCS anchor/action/provenance/audit controls.
- Backend and frontend build/test baseline.

### Partial capabilities

- Upload status: visible state exists, but durable async job progress is not complete.
- PDF extraction: native PDF text path exists; OCR/layout/table/form coverage remains open.
- Provenance: page references exist in the POC contract; full bounding-box/claim mapping remains open.
- APUCS: research shadow capability, not production selector.
- English/Spanish: English research path exists; Spanish technical profile is planned, not implemented.
- Accessibility: component targets exist; formal complete audit remains open.

### Orphan requirements

The following requirements have no complete implementation-to-test path in the graph:

- User registration/authentication and role lifecycle.
- Caregiver permission enforcement.
- Subscription and billing.
- Notifications/reminders.
- Data deletion/export fulfillment.
- Async queues and job lifecycle.
- PostgreSQL/S3 production persistence.
- Malware scanning.
- DOCX/HTML/email ingestion.
- Spanish extraction and advice classification.
- TTS/large-print rendering.
- Calibration drift management.

## 4. Conflicts discovered

### Conflict C1 — File-size limit

```text
FRD: 50MB MVP limit
Current POC route: 10MB limit
```

Disposition: explicit POC limit must be documented or reconciled before MVP acceptance. This is not a harmless implementation detail because it changes a functional requirement.

### Conflict C2 — Processing mode

```text
BRD/technical architecture: async and sync modes
Current POC: synchronous processing
```

Disposition: current POC is a declared partial capability; async worker work remains required.

### Conflict C3 — Document authority/status

```text
Functional Requirements Document: Approved
Functional Requirements: Draft
Technical Specifications: Draft
Operational Requirements: Draft
```

Disposition: Process governance needs a document-authority matrix. A lower-level draft must not silently override an approved document, and a draft must not be treated as an implemented requirement.

### Conflict C4 — APUCS language scope

```text
APUCS v1.2/v1.3: English + Spanish technical scope
Current code: English research path; Spanish profile not implemented
```

Disposition: the specification is a planned capability, not current capability. The graph records it as a gap rather than a satisfied requirement.

## 5. Technical closure implications

The graph confirms that the technical-closure portfolio should be executed in this order:

1. Resolve contract/authority conflicts.
2. Complete schema-driven profiles.
3. Complete full ingestion/layout/provenance.
4. Complete backend registry and candidate selection.
5. Implement English/Spanish profiles.
6. Complete modality/rendering separation.
7. Complete async operations and observability.
8. Run requirement-to-test closure and update evidence.

## 6. Process v9.5 gate verdict

```text
Knowledge graph:           Created
Source inventory:           Cross-checked
Requirement traceability:  Partial but explicit
Conflicts:                 3 material conflicts recorded
Orphan requirements:       Recorded
Technical closure plan:     Mapped to epics
Documentation drift:       Found and documented
```

**Verdict**: `MANAGED RISK — PROCEED WITH TRACEABILITY CLEANUP`

The graph is not a claim that all requirements are implemented. Its purpose is to prevent requirements from being lost, conflated, or falsely marked complete.

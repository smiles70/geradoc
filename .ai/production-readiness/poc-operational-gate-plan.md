# POC Operational Gate Closure Plan

**Portfolio**: POC-GATE-001  
**Process**: v9.5  
**Scope**: Controlled, single-user/staging POC using approved test documents  
**Excludes**: Production auth, multi-tenant security, production OCR provider, notifications, billing, calibrated APUCS activation, legal/human approval

## Objective

Make the declared POC operational from a user's perspective:

```text
select approved native-text PDF
→ upload
→ visible status
→ process
→ geragogical orientation
→ key information/actions/deadlines
→ original source preview
→ complete Simple/Standard/Detailed views
→ source references
→ action completion
→ Back/Start Over recovery
```

## Acceptance matrix

| Gate | Acceptance | Evidence |
|---|---|---|
| G1 | Frontend/backend start and health/readiness pass | Runtime smoke output |
| G2 | Supported PDF can be selected and explicitly processed | Visual record + UI code |
| G3 | Job has queued/processing/complete/error/retry behavior | Async route tests |
| G4 | Selected source is persisted and retrievable | Source endpoint test |
| G5 | Empty/unreadable content cannot be reported complete | 422/REVIEW test |
| G6 | Uploaded content gets orientation, key info, actions, and page references | Geragogical extractor test |
| G7 | Original, Simple, Standard, Detailed, and full-page views are visible | Viewer visual checklist |
| G8 | Back, Start Over, refresh, and retry have deterministic behavior | Journey checks |
| G9 | Text-size, contrast, focus, keyboard, and tab semantics exist | Accessibility code/tests/visual record |
| G10 | Full backend/frontend suite passes | Test/build/lint output |
| G11 | POC limitations are truthful and visible | Copy/config evidence |
| G12 | Reassessment updates graph/evidence and records residual production gates | Reassessment report |

## Execution order

```text
1. Baseline and start services
2. Run backend contract and geragogy tests
3. Run frontend build/lint
4. Run API upload/job/source smoke checks
5. Run forward senior journey
6. Run reverse senior journey
7. Run visual/accessibility checklist
8. Run full suite
9. Reassess graph and residual risks
10. Close POC gate or record explicit residual risk
```

## POC completion rule

The POC gate can close when G1–G12 pass for approved native-text test documents. A failed OCR/scanned-document case must show REVIEW or an actionable unsupported-document state; it must not be counted as a POC happy-path failure if scanned PDFs are explicitly outside the gate.

# Epic PDF-001 — Complete Full-Document PDF Processing and Viewing

**Status**: In Progress  
**Priority**: P0  
**Base**: BRD v1.0, FRD v1.0, PRD v1.0, Bridge UX bug epics, bridge PDF validation  
**Process**: v9.5

## Objective

Close the gap between the current filename/summary-oriented POC and the charter requirement that a user can upload a PDF, observe its complete lifecycle, and read the full processed document through all three viewing options.

## Requirements traceability

| Requirement | Source | Closure target |
|---|---|---|
| PDF upload | FR-DU-001 | Accept and validate PDF while retaining source metadata |
| Upload feedback | FR-DU-002, PRD F-001 | Visible selected, uploading, processing, complete, failed, and review states |
| Document status | FR-DU-003 | Explicit status contract and UI display |
| Text extraction | FR-DP-001 | Full extracted text and page records, no truncation |
| Source references | FR-DP-003/004, BR-005 | Page/source references for output content |
| Simplification levels | BRD/PRD/FRD | Complete Simple, Standard, and Detailed representations |
| Original comparison | FR-DP-004 | Original/full extracted content remains available |
| Error/retry | UC-001, FR-DU-002 | Actionable failure and retry path |
| Accessibility | BRD §7, FRD §10 | Status announcements, focus, readable full-document display |

## Sequential work packages

### PDF-001-A — Contract and extraction

- Extend the result contract with `originalText`, `fullText`, `pages`, `sourceReferences`, `processingStatus`, and `reviewFlags`.
- Make PDF extraction return complete text and page-level records.
- Keep fixture extraction compatible with the same contract.
- Remove character slicing from the POC baseline output.

### PDF-001-B — Processing lifecycle

- Return explicit processing status.
- Distinguish upload, processing, complete, failed, and review states.
- Preserve the selected filename and status message.
- Keep synchronous POC behavior compatible while making the lifecycle explicit.

### PDF-001-C — Full-document viewer

- Render complete source content.
- Render complete Simple, Standard, and Detailed content.
- Preserve page/source references.
- Provide Original / Simple / Standard / Detailed tabs.
- Do not silently omit later pages.

### PDF-001-D — Validation and closeout

- Add multi-page synthetic fixtures.
- Add late-page deadline/action tests.
- Add full-document regression tests.
- Run backend/frontend tests, build, lint, and smoke test.
- Update Process v9.5 evidence.

## Definition of Done

- [ ] Multi-page PDF upload works.
- [ ] Upload lifecycle is visible.
- [ ] Full extracted text is retained.
- [ ] Original view is readable.
- [ ] Simple view contains the complete source meaning.
- [ ] Standard view contains the complete source meaning.
- [ ] Detailed view contains the complete source meaning.
- [ ] Late-page information is preserved.
- [ ] Source references are available.
- [ ] Failures are actionable and retryable.
- [ ] All tests pass.
- [ ] Build and lint pass.
- [ ] Process v9.5 artifacts are updated.

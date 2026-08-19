# Bridge PDF Upload and Full-Document Validation

**Date**: August 19, 2026  
**Status**: Failed against full BRD/FRD/PRD requirement; bug confirmed  
**Scope**: `poc/frontend` upload flow and `poc/backend` processing path

## Executive verdict

The current bridge supports file selection and a basic synchronous request, but it does **not** yet satisfy the complete requirement:

```text
user uploads PDF
→ visible upload progress
→ visible upload completion
→ full document extraction
→ all three complete viewing options
→ ability to read the full processed document
```

The contextual Back fix is separate and now implemented. The PDF processing/viewing requirement remains incomplete.

## Requirements traceability

| Requirement | Source | Result |
|---|---|---|
| PDF upload | BRD/FRD FR-DU-001 | Partial: file input and MIME boundary exist |
| Upload progress | FRD FR-DU-002 / PRD F-001 | Fail: current indicator is indeterminate processing feedback, not upload progress |
| Upload completion status | BRD US-1.2 / FRD FR-DU-003 | Partial: success only occurs after synchronous API response; no separate upload-complete state |
| Full PDF extraction | FRD FR-DP-001 | Partial: `pdf-parse` adapter exists, but default runtime uses fixture extraction |
| Full-document preservation | FRD FR-DP-001/004 | Fail: response contains summaries, not the full extracted document content |
| Three viewing options | BRD/PRD simplification levels | Partial: three summary strings are rendered, but they are not three complete document views |
| Original versus simplified view | FRD FR-DP-004 | Fail: no original/full-document viewer is rendered |
| Source references | FRD FR-DP-003/004 | Partial: metadata support exists, but real PDF page/span provenance is not returned |
| Processing errors/retry | FRD error handling | Partial: generic error and retry exist; lifecycle/timeout/retry semantics remain synchronous |

## Root causes

### 1. Default backend uses fixture extraction

The route selects the extractor using:

```text
POC_USE_REAL_PDF=true → pdfExtractor
otherwise             → fixtureExtractor
```

The current server is commonly started with `POC_USE_REAL_PDF=false`, so any uploaded PDF is returned as the canned Medicare fixture rather than being extracted from the uploaded file.

### 2. The PDF adapter only returns text metadata

`pdfExtractor.js` returns extracted text, page count, and empty key/action arrays. It does not yet return:

- Full page text records
- Layout spans
- Bounding boxes
- Tables/forms
- Source references
- Original document preview data

### 3. The visible simplifier is still truncation logic

The user-visible baseline currently creates:

```text
simple: first 500 characters
standard: first 1200 characters
detailed: first 2500 characters
```

This is not full-document transformation. It can omit later pages, deadlines, obligations, and source context.

### 4. The frontend renders summaries only

`DocumentViewer.jsx` renders:

- `selectedDoc.summary[level]`
- Key information cards
- Action items

It does not render a full extracted document, original document, page navigation, or complete source-grounded output.

### 5. Upload progress is not byte-level progress

`SeniorDashboard.jsx` displays a generic indeterminate bar while `fetch()` is pending. It does not measure bytes uploaded and does not distinguish:

```text
file selection
upload transport
upload complete
server processing
result complete
```

## Corrective epics

### EPIC PDF-001 — Full upload lifecycle

- Add explicit upload state machine.
- Add byte-level progress using an upload-capable transport.
- Show file selected, validating, uploading, upload complete, processing, complete, failed, retry, and REVIEW states.
- Preserve filename and status in one visible status region.
- Add accessible announcements.

### EPIC PDF-002 — Real full-document extraction

- Make real PDF extraction explicit in the POC configuration.
- Return page-level extracted text.
- Preserve page/source references.
- Detect native-text versus scanned PDFs.
- Add OCR path for scanned PDFs.
- Add extraction confidence and failure reasons.
- Keep fixture extraction only as a test mode.

### EPIC PDF-003 — Full-document presentation

- Add a full extracted-document view.
- Add original-versus-processed comparison.
- Keep Simple, Standard, and Detailed as complete document representations, not character slices.
- Preserve page navigation and source references.
- Ensure later pages are not silently omitted.

### EPIC PDF-004 — End-to-end PDF validation

- Add approved synthetic multi-page PDFs.
- Validate full text from every page.
- Validate all three complete viewing options.
- Validate upload progress and completion status.
- Validate malformed, scanned, large, and multi-page PDFs.
- Add regression tests for late-page deadlines and obligations.

## Acceptance gate

The requirement is not complete until:

```text
[ ] A multi-page PDF can be uploaded
[ ] Upload start is visible
[ ] Upload progress is visible or explicitly indeterminate with status
[ ] Upload completion is explicitly shown
[ ] Server processing status is distinct from upload status
[ ] Full extracted text from every page is available
[ ] Simple view covers the complete document
[ ] Standard view covers the complete document
[ ] Detailed view covers the complete document
[ ] Original/source view is available
[ ] Late-page dates and obligations are preserved
[ ] Source references resolve to pages/spans
[ ] Failure and retry are visible and actionable
[ ] Screen-reader announcements exist for each state
```

## Current conclusion

The observed behavior is a real requirements miss, not merely a display preference. The current bridge passes basic file selection and API connection, but fails the charter's full-document processing and transparent status requirements. The corrective work should be implemented as PDF-001 through PDF-004 before declaring the PDF bridge complete.

# Document-Agnostic Regression Assessment

**Date**: August 19, 2026  
**Scope**: Full repository rescan after Medicare fixture leakage report  
**Method**: Process v9.5 ontology, graph, source-code search, full tests, Playwright E2E

## Finding

The report was correct: the upload fixture path was leaking the mocked demo's Medicare title/type/content into uploaded-document results. That violated the document-agnostic POC contract and created a false geragogy result.

## Fix

The fixture path now uses:

```text
Synthetic document
Synthetic POC Upload Fixture
```

with generic synthetic content, while sample documents retain their own explicitly scoped sample data.

The viewer also shows:

```text
Demo fixture mode: this result uses synthetic content, not the uploaded file text.
```

## Rescan findings

| Area | Result |
|---|---|
| Mock Medicare in uploaded fixture | Fixed |
| Sample Medicare data isolated to sample fixture | Pass |
| Uploaded result title/type truthfulness | Fixed for fixture mode |
| Actual native PDF path | Uses uploaded text when real mode is enabled |
| Fixture/real mode visibility | Visible in result metadata/UI |
| Geragogical orientation | Uses extracted facts/actions when available |
| Key info/actions | Generic fixture or derived uploaded facts |
| Source preview | Source endpoint and stale-source recovery exist |
| Simple/Standard/Detailed | Playwright coverage passes |
| Hardcoded POC persona | Margaret remains intentional senior demo persona |
| Caregiver mock content | Clearly scoped mock behavior; not presented as authorization |
| APUCS user-visible activation | Remains disabled/shadow-only |

## Verification

```text
Backend: 16 test files / 40 tests passed
Frontend build: passed
Frontend lint: passed with 0 warnings/errors
Playwright Firefox: 3 tests passed
POC smoke: passed
git diff --check: passed
```

## Residual scope boundaries

- Sample documents may remain domain-specific demonstration fixtures.
- Fixture mode is synthetic and must not be used to claim real-document processing.
- Real mode requires a valid readable PDF.
- OCR/scanned-document support remains a separate provider-dependent gap.
- Production authorization, persistence, and approval gates remain separate.

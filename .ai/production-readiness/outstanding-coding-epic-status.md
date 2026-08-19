# Outstanding Coding Epic Status

**Date**: August 19, 2026  
**Baseline**: `develop`  
**Scope**: Coding status only; human/legal/production approval gates are separate

## Status summary

| Epic | Area | Status | Current evidence |
|---|---|---|---|
| POC-001 | Idempotent decomposition | Partial/implemented foundation | Skills and graph gates exist; full graph generation pipeline not automated |
| POC-002 | Uploaded-document geragogy | Partial/POC functional | Orientation, facts, actions, synonymity rubric exist; richer semantic parsing remains |
| POC-003 | Extraction/layout/provenance | Partial | Native PDF/layout boundary exists; OCR engine not installed |
| POC-004 | Durable document/action session | Partial POC | JSON/source/job persistence and browser recovery; production DB absent |
| POC-005 | Accessibility/bidirectional journey | Partial/automated pass | Playwright passes; manual screen-reader/200% evidence remains |
| POC-006 | Spanish POC capability | Foundation/partial | Normalization and synonymity pairs exist; full end-to-end Spanish processing absent |
| POC-007 | Caregiver/authorization | Not started for real behavior | Mock caregiver dashboard only |
| POC-008 | Integrated POC closure | Partial | Automated gate passes; visual/manual closure pending |
| RGC-001 | OCR/layout/provenance | Not started for actual OCR | PaddleOCR adapter contract/benchmark harness added; dependency unavailable |
| RGC-002 | English/Spanish processing | Partial | English path and Spanish foundations exist |
| RGC-003 | Identity/authentication | Not started | Provider/session strategy not selected |
| RGC-004 | Caregiver permissions | Not started | Depends on RGC-003 |
| RGC-005 | Production persistence/data lifecycle | Partial POC | Production DB/object storage not selected |
| RGC-006 | Notifications/reminders | Not started | Provider/consent strategy not selected |
| RGC-007 | Calibrated APUCS activation | Research-only | Shadow candidate; calibration/approval gates open |
| RGC-008 | Accessibility certification | Partial | Automated semantics pass; manual certification not run |
| RGC-009 | Operations/deployment/recovery | Partial POC | Health/readiness/correlation IDs; production deployment/SLOs absent |
| RGC-010 | Integrated closure | Not started | Depends on RGC-001 through RGC-009 |
| SYN-001–006 | Synonymity rubric | POC complete | 35 backend tests; production thesaurus/governance still open |

## Current executable next item

```text
RGC-001 OCR benchmark
→ install/enable PaddleOCR in an isolated environment
→ run approved synthetic corpus
→ compare native/Tesseract/OCRmyPDF/PaddleOCR
→ record confidence/layout/provenance/latency
→ keep OCR user-visible activation disabled until gate passes
```

## Explicitly blocked external work

- PaddleOCR installation/model downloads
- OCR provider/model license confirmation
- Identity-provider selection
- Production database/object-storage selection
- Notification provider selection
- Calibrated APUCS activation
- Human semantic-equivalence review
- Legal/IP/FTO review
- Production release approval

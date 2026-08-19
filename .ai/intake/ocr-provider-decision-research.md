# OCR Provider Decision Research

**Date**: August 19, 2026  
**Scope**: ClarityDoc POC OCR/layout gap  
**Decision type**: Technical research recommendation; not a legal/license approval

## Executive recommendation

### Recommended architecture

```text
Primary structured OCR/layout adapter: PaddleOCR
Native text fast path:                pdf-parse
Lightweight OCR/PDF fallback:          Tesseract + OCRmyPDF
Cloud OCR:                             Optional benchmark only
```

### Recommended POC choice

Use **PaddleOCR behind the existing `OcrAdapter` boundary** for scanned-PDF and structured-layout experiments, while retaining the native `pdf-parse` path for text-layer PDFs.

Use Tesseract/OCRmyPDF as a simpler CPU fallback or baseline comparison, not as the only structured-document engine.

Do not send user documents to Google/AWS during the POC unless a separate privacy, credential, cost, and data-processing decision is approved.

## Charter and design criteria

The choice was compared against:

- Senior-first clarity and recovery
- Geragogy key-information/action extraction
- Source/page/span provenance
- Scanned PDF support
- Tables/forms/multi-column layout
- English and Spanish path
- Privacy and local processing
- POC cost
- Commercial distribution considerations
- Adapter replaceability
- REVIEW/uncertainty behavior
- CPU/deployment practicality

## Option comparison

| Option | Strengths | Weaknesses/risks | Charter/design fit |
|---|---|---|---|
| Tesseract | Apache 2.0; 100+ languages/scripts; txt, PDF, hOCR, TSV, ALTO/PAGE outputs; mature CPU baseline | Limited document structure by itself; tables/forms/layout require extra processing; confidence/reading order need additional work | Good privacy/cost baseline; insufficient alone for structured ClarityDoc documents |
| OCRmyPDF + Tesseract | Adds OCR text layer to PDFs; handles born-digital/scanned mix; preserves searchable PDF; validates output; local/private | Requires Tesseract and rasterizer; Ghostscript dependency has AGPLv3 considerations; not malware-secure by itself; not a semantic table/form engine | Good source-preserving POC wrapper, but dependency/license review required |
| PaddleOCR | Apache 2.0 project; multilingual OCR; PDF/image pipeline; text detection/recognition; layout and table-recognition pipelines; structured JSON/Markdown direction | Larger Python/model footprint; model-specific files/terms must be checked; resource requirements; accuracy still requires corpus testing | Best functional fit for scanned documents, layouts, tables, bilingual expansion, and geragogical extraction boundary |
| docTR | Apache 2.0; text detection and recognition; localized word-level output; PyTorch-based; strong developer API | More general OCR toolkit; tables/forms/layout require additional components; heavier ML runtime | Good alternative adapter, less directly aligned to structured PDF/table requirements than PaddleOCR |
| Google Cloud Vision/Document AI | Managed OCR; easy integration; free monthly allowance/free credits; document features | Cloud data transfer; credentials; vendor dependency; paid after allowance; retention/privacy review; not fully free | Useful benchmark/contingency option, not default POC path |
| AWS Textract | Managed OCR; forms/tables/layout; free initial tier; strong document features | Free tier is time/volume limited; cloud data transfer; credentials/vendor dependency; paid per page afterward | Useful benchmark/contingency option, not default POC path |

## Research sources

- Tesseract documentation: <https://tesseract-ocr.github.io/tessdoc/>
- Tesseract command output: <https://tesseract-ocr.github.io/tessdoc/Command-Line-Usage.html>
- OCRmyPDF documentation: <https://ocrmypdf.readthedocs.io/en/stable/introduction.html>
- OCRmyPDF project/license information: <https://github.com/ocrmypdf/OCRmyPDF>
- PaddleOCR documentation: <http://www.paddleocr.ai/main/en/index/index.html>
- PaddleOCR repository/license: <https://github.com/PaddlePaddle/PaddleOCR>
- docTR documentation: <https://mindee.github.io/doctr/latest/>
- docTR repository/license: <https://github.com/mindee/doctr>
- Datamuse API: <https://www.datamuse.com/api/>
- Google Cloud Vision pricing: <https://cloud.google.com/vision/pricing>
- AWS Textract pricing: <https://aws.amazon.com/textract/pricing/>

## Why PaddleOCR is the best primary fit

ClarityDoc is not only trying to recognize characters. It needs to preserve and expose:

```text
page
→ reading order
→ layout
→ table/form structure
→ text spans
→ confidence
→ source references
→ key facts/actions/deadlines
→ geragogical output
```

PaddleOCR has the closest documented capability profile for this structured path, including multilingual OCR and table/layout pipelines, while its Apache 2.0 project license is more compatible with a local POC than a cloud-only design. Model/data license review remains required before distribution.

## Proposed adapter contract

```js
class OcrAdapter {
  supports({ mimeType, language, layoutClass }) {}

  async extract({ buffer, fileName, languageHint }) {
    return {
      pages: [],
      fullText: '',
      language: languageHint || 'unknown',
      layoutClass: 'unknown',
      extractionConfidence: 0,
      sourceReferences: [],
      keyInfo: [],
      actions: [],
      reviewFlags: [],
      provider: 'paddleocr',
      providerVersion: 'configured-at-runtime',
    };
  }
}
```

## POC implementation phases

### OCR-001 — Benchmark harness

- Run native `pdf-parse`, Tesseract/OCRmyPDF, and PaddleOCR against the same approved synthetic corpus.
- Compare page recall, text recall, reading order, table/form preservation, language, latency, and confidence.
- Store provider/version/configuration hashes.

### OCR-002 — PaddleOCR adapter

- Add a process boundary rather than embedding Python inference in Express.
- Use a local worker or sidecar process.
- Return page-level spans and confidence.
- Route low-confidence output to REVIEW.

### OCR-003 — Layout/provenance normalization

- Normalize PaddleOCR output to the existing `pageText`/`sourceReferences` contract.
- Preserve bounding boxes where available.
- Map key facts/actions to source pages/spans.

### OCR-004 — Fallback and operations

- Native text fast path.
- PaddleOCR structured path.
- Tesseract/OCRmyPDF fallback.
- Explicit unavailable-provider state.
- Timeout/retry/dead-letter behavior.

## Selection rule

The provider is not selected by benchmark score alone. The selected path must satisfy:

```text
source preservation
+ page/span provenance
+ confidence visibility
+ layout handling
+ language support
+ privacy boundary
+ acceptable resource usage
+ reproducible configuration
```

## Deferred decisions

- Final license/model-data approval
- Cloud provider selection
- Production OCR SLO
- Human senior corpus evaluation
- Legal/IP/FTO review
- Production release approval

## Final recommendation

```text
Adopt PaddleOCR as the primary local structured-OCR experiment.
Retain pdf-parse for native PDFs.
Retain Tesseract/OCRmyPDF as a baseline/fallback.
Benchmark cloud services only as optional reference points.
```
